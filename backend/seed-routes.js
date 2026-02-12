"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const info_json_1 = __importDefault(require("../asset/info.json"));
const prisma = new client_1.PrismaClient();
async function seedRoutes() {
    console.log('Starting route data import...');
    // Clear existing data
    await prisma.routeStop.deleteMany();
    await prisma.stop.deleteMany();
    await prisma.route.deleteMany();
    console.log('Cleared existing route data');
    // Collect all unique stops
    const stopMap = new Map();
    const routes = info_json_1.default;
    // First pass: collect all stops
    routes.forEach(route => {
        route.stops.forEach(stop => {
            if (!stopMap.has(stop.id)) {
                stopMap.set(stop.id, stop);
            }
        });
    });
    // Create stops
    const stopCreatePromises = Array.from(stopMap.values()).map(stop => prisma.stop.create({
        data: {
            staticId: stop.id,
            name: stop.name,
            latitude: stop.lat,
            longitude: stop.lon,
            type: stop.is_terminal ? 'TERMINAL' : 'BUS_STOP',
            isActive: true,
        }
    }));
    console.log(`Creating ${stopCreatePromises.length} stops...`);
    const createdStops = await Promise.all(stopCreatePromises);
    // Create a map from staticId to database ID
    const stopIdMap = new Map();
    createdStops.forEach(stop => {
        stopIdMap.set(stop.staticId, stop.id);
    });
    // Create routes and route stops
    for (const route of routes) {
        // Calculate total distance
        const totalDistance = route.stops.reduce((sum, stop) => sum + (stop.distance_from_previous || 0), 0);
        // Estimate duration (assuming average speed of 30 km/h)
        const avgSpeedKmh = 30;
        const estimatedDuration = Math.round((totalDistance / 1000) / avgSpeedKmh * 60);
        // Create route
        const createdRoute = await prisma.route.create({
            data: {
                staticId: route.id,
                routeNumber: route.shortName,
                name: route.longName,
                startLocation: route.from,
                endLocation: route.to,
                distance: totalDistance,
                estimatedDuration: estimatedDuration,
                farePrice: 15, // Default fare in ETB
                isActive: false, // Will be activated when driver is assigned
            }
        });
        // Create route stops
        let cumulativeTime = 0;
        const routeStopPromises = route.stops.map(stop => {
            // Calculate time from start (assuming 2 minutes per km)
            const distanceFromPrevious = stop.distance_from_previous || 0;
            cumulativeTime += Math.round((distanceFromPrevious / 1000) * 2);
            return prisma.routeStop.create({
                data: {
                    routeId: createdRoute.id,
                    stopId: stopIdMap.get(stop.id),
                    order: stop.sequence,
                    timeFromStart: cumulativeTime,
                }
            });
        });
        await Promise.all(routeStopPromises);
        console.log(`Created route: ${route.shortName} - ${route.longName}`);
    }
    console.log('Route data import completed successfully!');
}
async function main() {
    try {
        await seedRoutes();
    }
    catch (error) {
        console.error('Error importing route data:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
});
