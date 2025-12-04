const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkRouteStructure() {
  try {
    console.log('🔍 Checking route structure...\n');

    // Get one route with all relationships
    const route = await prisma.route.findFirst({
      include: {
        stops: true,
        schedules: true,
        trips: true,
        feedbacks: true,
        incidents: true
      }
    });

    if (route) {
      console.log('📋 Route structure:');
      console.log('ID:', route.id);
      console.log('Name:', route.name);
      console.log('Code:', route.code);
      console.log('Distance:', route.distanceKm);
      console.log('Direct stops:', route.stops?.length || 0);
      console.log('Schedules:', route.schedules?.length || 0);
      
      if (route.stops && route.stops.length > 0) {
        console.log('\n🚏 Direct Stops:');
        route.stops.forEach((stop, index) => {
          console.log(`${index + 1}. ${stop.name} - ${stop.area || 'No area'} (Order: ${stop.stopOrder || 'N/A'})`);
        });
      }
    }

    // Also check RouteStop model directly
    const routeStops = await prisma.routeStop.findMany({
      take: 5,
      include: {
        route: true,
        stop: true
      }
    });

    console.log(`\n📍 RouteStop entries: ${routeStops.length}`);
    routeStops.forEach((rs, index) => {
      console.log(`${index + 1}. Route: ${rs.route.name} -> Stop: ${rs.stop.name}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkRouteStructure();