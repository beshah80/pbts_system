const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkStops() {
  try {
    console.log('🚏 Checking stops in database...\n');

    const stops = await prisma.stop.findMany({});
    console.log(`Total stops: ${stops.length}\n`);

    if (stops.length > 0) {
      console.log('📋 Stop Details:');
      stops.forEach((stop, index) => {
        console.log(`${index + 1}. Name: ${stop.name} | Code: ${stop.code || 'N/A'} | Area: ${stop.area || 'N/A'} | Terminal: ${stop.isTerminal ? 'Yes' : 'No'}`);
      });
    } else {
      console.log('❌ No stops found in database');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkStops();