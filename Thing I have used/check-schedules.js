const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkSchedules() {
  try {
    console.log('⏰ Checking schedules in database...\n');

    const schedules = await prisma.schedule.findMany({
      include: {
        route: true
      }
    });

    console.log(`Total schedules: ${schedules.length}\n`);

    if (schedules.length > 0) {
      console.log('📋 Schedule Details:');
      schedules.forEach((schedule, index) => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = schedule.dayOfWeek !== null ? dayNames[schedule.dayOfWeek] : 'N/A';
        
        console.log(`${index + 1}. Route: ${schedule.route?.name || schedule.route?.code || 'N/A'} | Day: ${dayName} | Departure: ${schedule.departureTime} | Arrival: ${schedule.arrivalTime || 'N/A'} | Frequency: ${schedule.frequencyMinutes || 'N/A'} min`);
      });
    } else {
      console.log('❌ No schedules found in database');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchedules();