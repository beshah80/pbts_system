const fs = require('fs');
const path = require('path');

// Helper function to parse CSV
function parseCSV(filepath) {
    const content = fs.readFileSync(filepath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().replace('\r', ''));

    return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace('\r', ''));
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        return obj;
    });
}

// Helper to calculate distance between two GPS points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

console.log('========================================');
console.log('PBTS DATA EXTRACTION - REAL DATA');
console.log('========================================\n');

//===========================================
// 1. EXTRACT ROUTES
//===========================================
console.log('1. EXTRACTING ROUTES...\n');

const anbesaRoutes = parseCSV('d:/Education/pbts_system/asset/anbesa_bus/routes.txt');
const shegerRoutes = parseCSV('d:/Education/pbts_system/asset/sheger_bus/routes.txt');

const routes = [];

anbesaRoutes.forEach(route => {
    if (route.route_id) {
        routes.push({
            routeId: route.route_short_name || route.route_id,
            routeName: route.route_long_name,
            operator: "ANBESSA",
            routeColor: route.route_color || "1779c2",
            isActive: true,
            createdAt: new Date().toISOString(),
            // totalDistance and estimatedDuration will be calculated later
        });
    }
});

shegerRoutes.forEach(route => {
    if (route.route_id) {
        routes.push({
            routeId: route.route_short_name || route.route_id,
            routeName: route.route_long_name,
            operator: "SHEGER",
            routeColor: route.route_color || "1779c2",
            isActive: true,
            createdAt: new Date().toISOString(),
        });
    }
});

console.log(`✓ Extracted ${routes.length} routes`);
console.log(`  - ANBESSA: ${anbesaRoutes.length} routes`);
console.log(`  - SHEGER: ${shegerRoutes.length} routes\n`);

//===========================================
// 2. EXTRACT STOPS
//===========================================
console.log('2. EXTRACTING STOPS...\n');

const anbesaStops = parseCSV('d:/Education/pbts_system/asset/anbesa_bus/stops.txt');
const shegerStops = parseCSV('d:/Education/pbts_system/asset/sheger_bus/stops.txt');

const stopsMap = new Map();

[...anbesaStops, ...shegerStops].forEach(stop => {
    if (stop.stop_id && !stopsMap.has(stop.stop_id)) {
        stopsMap.set(stop.stop_id, {
            stopId: stop.stop_id,
            stopName: stop.stop_name,
            latitude: parseFloat(stop.stop_lat) || 0,
            longitude: parseFloat(stop.stop_lon) || 0,
            createdAt: new Date().toISOString(),
        });
    }
});

const stops = Array.from(stopsMap.values());

console.log(`✓ Extracted ${stops.length} unique stops\n`);

//===========================================
// 3. EXTRACT ROUTE-STOPS RELATIONSHIPS
//===========================================
console.log('3. EXTRACTING ROUTE-STOP RELATIONSHIPS...\n');

const anbesaStopTimes = parseCSV('d:/Education/pbts_system/asset/anbesa_bus/stop_times.txt');
const shegerStopTimes = parseCSV('d:/Education/pbts_system/asset/sheger_bus/stop_times.txt');
const anbesaTrips = parseCSV('d:/Education/pbts_system/asset/anbesa_bus/trips.txt');
const shegerTrips = parseCSV('d:/Education/pbts_system/asset/sheger_bus/trips.txt');

// Build trip to route mapping
const tripToRoute = new Map();
[...anbesaTrips, ...shegerTrips].forEach(trip => {
    tripToRoute.set(trip.trip_id, trip.route_id);
});

// Group stop times by route
const routeStopsMap = new Map();

[...anbesaStopTimes, ...shegerStopTimes].forEach(stopTime => {
    const routeId = tripToRoute.get(stopTime.trip_id);
    if (!routeId) return;

    if (!routeStopsMap.has(routeId)) {
        routeStopsMap.set(routeId, []);
    }

    routeStopsMap.get(routeId).push({
        stopId: stopTime.stop_id,
        sequence: parseInt(stopTime.stop_sequence) || 0,
        tripId: stopTime.trip_id,
        arrivalTime: stopTime.arrival_time,
        departureTime: stopTime.departure_time,
    });
});

// Create route_stops with distance calculations
const routeStops = [];
let routeStopCounter = 0;

routeStopsMap.forEach((stopsList, routeId) => {
    // Get unique stops for this route sorted by sequence
    const uniqueStops = [];
    const seenStops = new Map();

    stopsList
        .sort((a, b) => a.sequence - b.sequence)
        .forEach(stop => {
            const key = `${stop.stopId}-${stop.sequence}`;
            if (!seenStops.has(key)) {
                seenStops.set(key, true);
                uniqueStops.push(stop);
            }
        });

    // Calculate distances
    let totalDistance = 0;
    uniqueStops.forEach((stop, index) => {
        const stopData = stopsMap.get(stop.stopId);
        if (!stopData) return;

        let distanceToNext = 0;
        if (index < uniqueStops.length - 1) {
            const nextStop = uniqueStops[index + 1];
            const nextStopData = stopsMap.get(nextStop.stopId);
            if (nextStopData) {
                distanceToNext = calculateDistance(
                    stopData.latitude, stopData.longitude,
                    nextStopData.latitude, nextStopData.longitude
                );
            }
        }

        routeStops.push({
            routeStopId: `RS${String(++routeStopCounter).padStart(6, '0')}`,
            routeId: routes.find(r => r.routeId.includes(routeId.substring(0, 5)))?.routeId || routeId,
            stopId: stop.stopId,
            sequence: stop.sequence,
            distanceFromStart: totalDistance,
            distanceToNext: distanceToNext,
            estimatedTimeFromStart: index * 2, // Rough estimate: 2 min per stop
            createdAt: new Date().toISOString(),
        });

        totalDistance += distanceToNext;
    });
});

console.log(`✓ Created ${routeStops.length} route-stop relationships\n`);

//===========================================
// 4. UPDATE ROUTES WITH TOTAL DISTANCE
//===========================================
console.log('4. CALCULATING ROUTE DISTANCES...\n');

routes.forEach(route => {
    const routeStopsList = routeStops.filter(rs => rs.routeId === route.routeId);
    const totalDistance = routeStopsList.reduce((sum, rs) => sum + rs.distanceToNext, 0);
    const estimatedDuration = routeStopsList.length * 2; // 2 minutes per stop

    route.totalDistance = Math.round(totalDistance * 100) / 100; // Round to 2 decimals
    route.estimatedDuration = estimatedDuration;
});

console.log(`✓ Updated routes with distance and duration data\n`);

//===========================================
// 5. GENERATE MONGODB INSERT SCRIPTS
//===========================================
console.log('5. GENERATING MONGODB INSERT SCRIPTS...\n');

const outputDir = 'd:/Education/pbts_system/mongodb_data';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Save Routes
fs.writeFileSync(
    path.join(outputDir, '01_routes.json'),
    JSON.stringify(routes, null, 2)
);
console.log(`✓ Saved ${routes.length} routes to 01_routes.json`);

// Save Stops
fs.writeFileSync(
    path.join(outputDir, '02_stops.json'),
    JSON.stringify(stops, null, 2)
);
console.log(`✓ Saved ${stops.length} stops to 02_stops.json`);

// Save Route-Stops
fs.writeFileSync(
    path.join(outputDir, '03_route_stops.json'),
    JSON.stringify(routeStops, null, 2)
);
console.log(`✓ Saved ${routeStops.length} route-stops to 03_route_stops.json`);

//===========================================
// 6. GENERATE MONGOIMPORT COMMANDS
//===========================================
const importScript = `#!/bin/bash
# MongoDB Import Script for PBTS System
# Run this script to import all data into MongoDB

echo "Importing PBTS data into MongoDB..."

# Import Routes
mongoimport --db pbts_system --collection routes --file 01_routes.json --jsonArray

# Import Stops
mongoimport --db pbts_system --collection stops --file 02_stops.json --jsonArray

# Import Route-Stops
mongoimport --db pbts_system --collection route_stops --file 03_route_stops.json --jsonArray

echo "✓ Import complete!"
echo "Total imported:"
echo "  - Routes: ${routes.length}"
echo "  - Stops: ${stops.length}"
echo "  - Route-Stops: ${routeStops.length}"
`;

fs.writeFileSync(path.join(outputDir, 'import.sh'), importScript);
console.log(`✓ Generated import script\n`);

//===========================================
// 7. GENERATE SUMMARY REPORT
//===========================================
const summary = {
    extractionDate: new Date().toISOString(),
    statistics: {
        routes: {
            total: routes.length,
            byOperator: {
                ANBESSA: routes.filter(r => r.operator === 'ANBESSA').length,
                SHEGER: routes.filter(r => r.operator === 'SHEGER').length,
            }
        },
        stops: {
            total: stops.length,
            withGPS: stops.filter(s => s.latitude && s.longitude).length,
        },
        routeStops: {
            total: routeStops.length,
            avgStopsPerRoute: Math.round(routeStops.length / routes.length),
        }
    },
    files: [
        '01_routes.json',
        '02_stops.json',
        '03_route_stops.json',
        'import.sh',
    ]
};

fs.writeFileSync(
    path.join(outputDir, 'README.md'),
    `# PBTS MongoDB Data Extraction Report

**Extraction Date:** ${summary.extractionDate}

## Statistics

### Routes
- **Total:** ${summary.statistics.routes.total}
- **ANBESSA:** ${summary.statistics.routes.byOperator.ANBESSA}
- **SHEGER:** ${summary.statistics.routes.byOperator.SHEGER}

### Stops
- **Total:** ${summary.statistics.stops.total}
- **With GPS Coordinates:** ${summary.statistics.stops.withGPS}

### Route-Stops
- **Total:** ${summary.statistics.routeStops.total}
- **Average Stops per Route:** ${summary.statistics.routeStops.avgStopsPerRoute}

## Files Generated

${summary.files.map(f => `- \`${f}\``).join('\n')}

## Import Instructions

### Using mongoimport:
\`\`\`bash
cd d:/Education/pbts_system/mongodb_data
bash import.sh
\`\`\`

### Or manually:
\`\`\`bash
mongoimport --db pbts_system --collection routes --file 01_routes.json --jsonArray
mongoimport --db pbts_system --collection stops --file 02_stops.json --jsonArray
mongoimport --db pbts_system --collection route_stops --file 03_route_stops.json --jsonArray
\`\`\`

## Next Steps

1. Create indexes as defined in the database design document
2. Add sample admin, driver, and passenger users as needed
3. Create sample schedules using the real routes and stops
`
);

console.log('\n========================================');
console.log('EXTRACTION COMPLETE!');
console.log('========================================\n');
console.log(`Output directory: ${outputDir}`);
console.log(`\nFiles generated:`);
summary.files.forEach(f => console.log(`  - ${f}`));
console.log(`\nTotal records extracted:`);
console.log(`  - Routes: ${routes.length}`);
console.log(`  - Stops: ${stops.length}`);
console.log(`  - Route-Stops: ${routeStops.length}`);
console.log('\n========================================\n');
