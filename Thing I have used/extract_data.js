const fs = require('fs');
const path = require('path');

console.log('Starting extraction script...');

// Parse CSV to JSON
function parseCSV(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return [];
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.trim().split('\n');
        if (lines.length === 0) return [];

        const headers = lines[0].split(',').map(h => h.trim().replace(/\r/g, ''));

        return lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/\r/g, ''));
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            return obj;
        });
    } catch (error) {
        console.error(`Error parsing ${filePath}:`, error.message);
        return [];
    }
}

// Calculate distance between two GPS coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

const baseDir = process.cwd();
const outputDir = path.join(baseDir, 'mongodb_data');

console.log(`Base directory: ${baseDir}`);
console.log(`Output directory: ${outputDir}`);

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Load all stops first
console.log('[1/4] Loading Stops...');
const anbesaStopsRaw = parseCSV(path.join(baseDir, 'asset/anbesa_bus/stops.txt'));
const shegerStopsRaw = parseCSV(path.join(baseDir, 'asset/sheger_bus/stops.txt'));

const stopsMap = new Map();
[...anbesaStopsRaw, ...shegerStopsRaw].forEach(stop => {
    if (stop.stop_id && !stopsMap.has(stop.stop_id)) {
        stopsMap.set(stop.stop_id, {
            stopId: stop.stop_id,
            stopName: stop.stop_name,
            latitude: parseFloat(stop.stop_lat) || 0,
            longitude: parseFloat(stop.stop_lon) || 0,
        });
    }
});
console.log(`   ✓ ${stopsMap.size} unique stops loaded`);

// 2. Load trips
console.log('[2/4] Loading Trips...');
const anbesaTrips = parseCSV(path.join(baseDir, 'asset/anbesa_bus/trips.txt'));
const shegerTrips = parseCSV(path.join(baseDir, 'asset/sheger_bus/trips.txt'));

const tripToRoute = new Map();
[...anbesaTrips, ...shegerTrips].forEach(trip => {
    if (trip.trip_id && trip.route_id) {
        tripToRoute.set(trip.trip_id, trip.route_id);
    }
});
console.log(`   ✓ ${tripToRoute.size} trips mapped`);

// 3. Build routes with stops
console.log('[3/4] Building Routes with Stops...');
const anbesaRoutesRaw = parseCSV(path.join(baseDir, 'asset/anbesa_bus/routes.txt'));
const shegerRoutesRaw = parseCSV(path.join(baseDir, 'asset/sheger_bus/routes.txt'));
const anbesaStopTimes = parseCSV(path.join(baseDir, 'asset/anbesa_bus/stop_times.txt'));
const shegerStopTimes = parseCSV(path.join(baseDir, 'asset/sheger_bus/stop_times.txt'));

const routeInfoMap = new Map();
[...anbesaRoutesRaw, ...shegerRoutesRaw].forEach(route => {
    if (route.route_id) {
        routeInfoMap.set(route.route_id, {
            routeId: route.route_short_name || route.route_id,
            routeName: route.route_long_name || route.route_short_name,
            operator: route.route_id.length > 8 && parseInt(route.route_id) < 11000000 ? "ANBESSA" : "SHEGER",
        });
    }
});

const routeStopsGrouped = new Map();
[...anbesaStopTimes, ...shegerStopTimes].forEach(st => {
    const routeId = tripToRoute.get(st.trip_id);
    if (!routeId) return;

    if (!routeStopsGrouped.has(routeId)) {
        routeStopsGrouped.set(routeId, []);
    }

    routeStopsGrouped.get(routeId).push({
        stopId: st.stop_id,
        sequence: parseInt(st.stop_sequence) || 0,
    });
});

const routesWithStops = [];
const allStops = [];
const allRouteStops = [];
let routeStopCounter = 0;
const processedStopIds = new Set();

routeStopsGrouped.forEach((stopsList, routeIdRaw) => {
    const routeInfo = routeInfoMap.get(routeIdRaw);
    if (!routeInfo) return;

    const uniqueStops = [];
    const seen = new Set();

    stopsList.sort((a, b) => a.sequence - b.sequence)
        .forEach(s => {
            const key = `${s.stopId}-${s.sequence}`;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueStops.push(s);
            }
        });

    let totalDistance = 0;
    const stops = [];

    uniqueStops.forEach((stop, idx) => {
        const stopData = stopsMap.get(stop.stopId);
        if (!stopData) return;

        let distToNext = 0;
        if (idx < uniqueStops.length - 1) {
            const nextStopData = stopsMap.get(uniqueStops[idx + 1].stopId);
            if (nextStopData) {
                distToNext = calculateDistance(
                    stopData.latitude, stopData.longitude,
                    nextStopData.latitude, nextStopData.longitude
                );
            }
        }

        stops.push({
            sequence: idx + 1,
            stopId: stopData.stopId,
            stopName: stopData.stopName,
            latitude: stopData.latitude,
            longitude: stopData.longitude,
            distanceFromStart: Math.round(totalDistance * 100) / 100,
            distanceToNext: Math.round(distToNext * 100) / 100,
            estimatedTimeFromStart: (idx + 1) * 2,
        });

        if (!processedStopIds.has(stopData.stopId)) {
            processedStopIds.add(stopData.stopId);
            allStops.push({
                stopId: stopData.stopId,
                stopName: stopData.stopName,
                latitude: stopData.latitude,
                longitude: stopData.longitude,
                createdAt: new Date(),
            });
        }

        allRouteStops.push({
            routeStopId: `RS${String(++routeStopCounter).padStart(6, '0')}`,
            routeId: routeInfo.routeId,
            stopId: stopData.stopId,
            sequence: idx + 1,
            distanceFromStart: Math.round(totalDistance * 100) / 100,
            distanceToNext: Math.round(distToNext * 100) / 100,
            estimatedTimeFromStart: (idx + 1) * 2,
            createdAt: new Date(),
        });

        totalDistance += distToNext;
    });

    routesWithStops.push({
        routeId: routeInfo.routeId,
        routeName: routeInfo.routeName,
        operator: routeInfo.operator,
        totalDistance: Math.round(totalDistance * 100) / 100,
        estimatedDuration: stops.length * 2,
        numberOfStops: stops.length,
        stops: stops,
        isActive: true,
        createdAt: new Date(),
    });
});

console.log(`   ✓ ${routesWithStops.length} routes processed`);

// 4. Export
console.log('[4/4] Exporting Data...');

try {
    fs.writeFileSync(path.join(outputDir, 'routes_with_stops.json'), JSON.stringify(routesWithStops, null, 2));
    console.log('   ✓ routes_with_stops.json created');

    fs.writeFileSync(path.join(outputDir, '01_routes.json'), JSON.stringify(routesWithStops.map(r => {
        const { stops, ...rest } = r;
        return rest;
    }), null, 2));
    console.log('   ✓ 01_routes.json created');

    fs.writeFileSync(path.join(outputDir, '02_stops.json'), JSON.stringify(allStops, null, 2));
    console.log('   ✓ 02_stops.json created');

    fs.writeFileSync(path.join(outputDir, '03_route_stops.json'), JSON.stringify(allRouteStops, null, 2));
    console.log('   ✓ 03_route_stops.json created');

    console.log('DONE!');
} catch (err) {
    console.error('Error writing files:', err);
}
