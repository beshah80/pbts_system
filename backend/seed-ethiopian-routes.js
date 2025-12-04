const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedEthiopianRoutes() {
  try {
    console.log('🚌 Seeding Real Ethiopian Bus Routes...\n');

    // Clear existing data
    await prisma.routeStop.deleteMany({});
    await prisma.schedule.deleteMany({});
    await prisma.stop.deleteMany({});
    await prisma.route.deleteMany({});
    await prisma.bus.deleteMany({});
    console.log('🗑️ Cleared existing route/stop data');

    // Real Ethiopian bus routes (common Addis Ababa routes)
    const ethiopianRoutes = [
      { from: 'Meskel Square', to: 'Bole Airport', code: 'R001' },
      { from: 'Mercato', to: 'Piazza', code: 'R002' },
      { from: 'Arat Kilo', to: 'Kaliti', code: 'R003' },
      { from: 'Stadium', to: 'Mexico', code: 'R004' },
      { from: 'Shiromeda', to: 'Gotera', code: 'R005' },
      { from: 'Kazanchis', to: 'Sarbet', code: 'R006' },
      { from: 'Legehar', to: 'Kotebe', code: 'R007' },
      { from: 'Sidist Kilo', to: 'Akaki', code: 'R008' }
    ];

    // Addis Ababa coordinates for stops
    const stopCoordinates = {
      'Meskel Square': { lat: 9.0084, lng: 38.7648 },
      'Bole Airport': { lat: 8.9806, lng: 38.7992 },
      'Mercato': { lat: 9.0342, lng: 38.7441 },
      'Piazza': { lat: 9.0411, lng: 38.7469 },
      'Arat Kilo': { lat: 9.0378, lng: 38.7578 },
      'Kaliti': { lat: 8.9234, lng: 38.7123 },
      'Stadium': { lat: 9.0156, lng: 38.7589 },
      'Mexico': { lat: 9.0234, lng: 38.7512 },
      'Shiromeda': { lat: 9.0445, lng: 38.7234 },
      'Gotera': { lat: 8.9876, lng: 38.8123 },
      'Kazanchis': { lat: 9.0289, lng: 38.7634 },
      'Sarbet': { lat: 9.0567, lng: 38.7890 },
      'Legehar': { lat: 9.0123, lng: 38.7456 },
      'Kotebe': { lat: 9.0789, lng: 38.8234 },
      'Sidist Kilo': { lat: 9.0345, lng: 38.7567 },
      'Akaki': { lat: 8.8934, lng: 38.7234 }
    };

    let routeCount = 0;
    let stopCount = 0;
    let busCount = 0;

    for (const routeData of ethiopianRoutes) {
      // Create stops
      const originStop = await prisma.stop.create({
        data: {
          name: routeData.from,
          code: `ST${String(stopCount + 1).padStart(3, '0')}`,
          latitude: stopCoordinates[routeData.from]?.lat || 9.0 + Math.random() * 0.1,
          longitude: stopCoordinates[routeData.from]?.lng || 38.7 + Math.random() * 0.1
        }
      });

      const destStop = await prisma.stop.create({
        data: {
          name: routeData.to,
          code: `ST${String(stopCount + 2).padStart(3, '0')}`,
          latitude: stopCoordinates[routeData.to]?.lat || 9.0 + Math.random() * 0.1,
          longitude: stopCoordinates[routeData.to]?.lng || 38.7 + Math.random() * 0.1
        }
      });

      // Create route
      const route = await prisma.route.create({
        data: {
          code: routeData.code,
          name: `${routeData.from} - ${routeData.to}`,
          originStopId: originStop.id,
          destinationStopId: destStop.id,
          distanceKm: Math.random() * 15 + 5,
          operatingFrom: '05:30',
          operatingTo: '22:00'
        }
      });

      // Create route-stop relationships
      await prisma.routeStop.create({
        data: {
          routeId: route.id,
          stopId: originStop.id,
          sequence: 1,
          distanceFromStartKm: 0
        }
      });

      await prisma.routeStop.create({
        data: {
          routeId: route.id,
          stopId: destStop.id,
          sequence: 2,
          distanceFromStartKm: Math.random() * 15 + 5
        }
      });

      // Create 1-2 buses per route
      const busTypes = ['ANBESSA', 'SHEGER', 'VELOCITY'];
      const busesForRoute = Math.floor(Math.random() * 2) + 1;
      
      for (let i = 0; i < busesForRoute; i++) {
        await prisma.bus.create({
          data: {
            plateNumber: `ET-${String(busCount + 1).padStart(3, '0')}-AA`,
            fleetNumber: `${busTypes[busCount % 3]}-${String(busCount + 1).padStart(3, '0')}`,
            ownership: busTypes[busCount % 3],
            status: 'AVAILABLE',
            capacity: [45, 50, 55][Math.floor(Math.random() * 3)],
            manufacturer: ['Isuzu', 'Hyundai', 'Mercedes'][Math.floor(Math.random() * 3)],
            modelYear: 2018 + Math.floor(Math.random() * 6)
          }
        });
        busCount++;
      }

      // Create schedules
      const departureTimes = ['06:00', '07:00', '08:00', '12:00', '17:00', '18:00'];
      for (const time of departureTimes) {
        await prisma.schedule.create({
          data: {
            routeId: route.id,
            dayOfWeek: 1,
            departureTime: time,
            arrivalTime: addMinutes(time, Math.floor(Math.random() * 60) + 30),
            frequencyMinutes: 30
          }
        });
      }

      routeCount++;
      stopCount += 2;
      console.log(`✅ Created route: ${route.name}`);
    }

    console.log(`\n🎉 Successfully seeded:`);
    console.log(`📍 ${routeCount} Ethiopian routes`);
    console.log(`🚏 ${stopCount} stops with real coordinates`);
    console.log(`🚌 ${busCount} buses`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

function addMinutes(time, minutes) {
  const [hours, mins] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

seedEthiopianRoutes();