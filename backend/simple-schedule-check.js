const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkSchedules() {
  try {
    console.log('⏰ Checking schedules...\n');

    // Get total count first
    const scheduleCount = await prisma.schedule.count();
    console.log(`Total schedules: ${scheduleCount}\n`);

    // Get sample schedules
    const schedules = await prisma.schedule.findMany({
      take: 10,
      include: {
        route: {
          select: {
            code: true,
            name: true
          }
        }
      }
    });

    if (schedules.length > 0) {
      console.log('📋 Sample Schedule Details:');
      schedules.forEach((schedule, index) => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = schedule.dayOfWeek !== null ? dayNames[schedule.dayOfWeek] : 'N/A';
        
        console.log(`${index + 1}. Route: ${schedule.route?.name || schedule.route?.code || 'N/A'}`);
        console.log(`   Day: ${dayName} | Departure: ${schedule.departureTime} | Arrival: ${schedule.arrivalTime || 'N/A'}`);
        console.log(`   Frequency: ${schedule.frequencyMinutes || 'N/A'} minutes\n`);
      });
    }

    // Get schedule summary by day
    const schedulesByDay = await prisma.schedule.groupBy({
      by: ['dayOfWeek'],
      _count: {
        id: true
      }
    });

    console.log('📊 Schedules by Day:');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    schedulesByDay.forEach(day => {
      const dayName = day.dayOfWeek !== null ? dayNames[day.dayOfWeek] : 'N/A';
      console.log(`${dayName}: ${day._count.id} schedules`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchedules();