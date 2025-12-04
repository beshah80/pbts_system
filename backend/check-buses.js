const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkBuses() {
  try {
    console.log('🚌 Checking buses in database...\n');

    const buses = await prisma.bus.findMany({});
    console.log(`Total buses: ${buses.length}`);

    if (buses.length > 0) {
      console.log('\n📋 Bus Details:');
      buses.forEach((bus, index) => {
        console.log(`${index + 1}. Plate: ${bus.plateNumber} | Fleet: ${bus.fleetNumber} | Owner: ${bus.ownership} | Status: ${bus.status}`);
      });
    } else {
      console.log('❌ No buses found in database');
    }

    const routes = await prisma.route.findMany({});
    console.log(`\n📍 Total routes: ${routes.length}`);

    const stops = await prisma.stop.findMany({});
    console.log(`🚏 Total stops: ${stops.length}`);

    const schedules = await prisma.schedule.findMany({});
    console.log(`⏰ Total schedules: ${schedules.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkBuses();