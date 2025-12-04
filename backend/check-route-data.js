const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkRouteData() {
  try {
    console.log('🔍 Checking Meskel Square - Bole Airport route data...\n');

    const route = await prisma.route.findFirst({
      where: {
        name: 'Meskel Square - Bole Airport'
      }
    });

    if (route) {
      console.log('📋 Route Details:');
      console.log(`Name: ${route.name}`);
      console.log(`Code: ${route.code}`);
      console.log(`Distance (distanceKm): ${route.distanceKm} km`);
      console.log(`Operating: ${route.operatingFrom} - ${route.operatingTo}`);
      console.log(`Origin Stop ID: ${route.originStopId}`);
      console.log(`Destination Stop ID: ${route.destinationStopId}`);
    } else {
      console.log('❌ Route not found');
    }

    // Check schedules for this route
    if (route) {
      const schedules = await prisma.schedule.findMany({
        where: { routeId: route.id }
      });
      console.log(`\n⏰ Schedules: ${schedules.length}`);
      schedules.forEach(schedule => {
        console.log(`- ${schedule.departureTime} (Day ${schedule.dayOfWeek})`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkRouteData();