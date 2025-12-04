const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function seedRealData() {
  try {
    console.log('🚌 Seeding Real Ethiopian Bus Data...\n');

    // Read search.json data
    const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../asset/search.json'), 'utf8'));
    
    // Handle different JSON structures
    let searchData = [];
    if (Array.isArray(rawData)) {
      searchData = rawData;
    } else if (rawData.routes && Array.isArray(rawData.routes)) {
      searchData = rawData.routes;
    } else if (rawData.data && Array.isArray(rawData.data)) {
      searchData = rawData.data;
    } else {
      // Create from object keys if it's an object
      searchData = Object.keys(rawData).map(key => ({ from: key, to: rawData[key] }));
    }
    
    console.log(`📊 Found ${searchData.length} routes in search.json`);

    // Clear existing data
    await prisma.routeStop.deleteMany({});
    await prisma.schedule.deleteMany({});
    await prisma.stop.deleteMany({});
    await prisma.route.deleteMany({});
    await prisma.bus.deleteMany({});
    console.log('🗑️ Cleared existing route/stop data');

    // Create routes and stops from search.json
    let routeCount = 0;
    let stopCount = 0;
    let busCount = 0;

    const routesToProcess = searchData.slice(0, 10);
    for (const routeData of routesToProcess) {
      // Create route
      const route = await prisma.route.create({
        data: {
          code: `R${String(routeCount + 1).padStart(3, '0')}`,
          name: `${routeData.from} - ${routeData.to}`,
          originStopId: '', // Will update after creating stops
          destinationStopId: '', // Will update after creating stops
          distanceKm: Math.random() * 20 + 5, // Random distance 5-25km
          operatingFrom: '05:30',
          operatingTo: '22:00'
        }
      });

      // Create origin stop
      const originStop = await prisma.stop.create({
        data: {
          name: routeData.from,
          code: `ST${String(stopCount + 1).padStart(3, '0')}`,
          latitude: Math.random() * 0.1 + 8.9, // Addis Ababa area
          longitude: Math.random() * 0.1 + 38.7
        }
      });

      // Create destination stop
      const destStop = await prisma.stop.create({
        data: {
          name: routeData.to,
          code: `ST${String(stopCount + 2).padStart(3, '0')}`,
          latitude: Math.random() * 0.1 + 9.0,
          longitude: Math.random() * 0.1 + 38.8
        }
      });

      // Update route with stop IDs
      await prisma.route.update({
        where: { id: route.id },
        data: {
          originStopId: originStop.id,
          destinationStopId: destStop.id
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
          distanceFromStartKm: Math.random() * 20 + 5
        }
      });

      // Create 1-2 buses per route (realistic assignment)
      const busesForRoute = Math.floor(Math.random() * 2) + 1;
      const busTypes = ['ANBESSA', 'SHEGER', 'VELOCITY'];
      
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

      // Create schedules for this route
      const departureTimes = ['06:00', '07:00', '08:00', '12:00', '17:00', '18:00'];
      for (const time of departureTimes) {
        await prisma.schedule.create({
          data: {
            routeId: route.id,
            dayOfWeek: 1, // Monday
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
    console.log(`📍 ${routeCount} routes`);
    console.log(`🚏 ${stopCount} stops`);
    console.log(`🚌 ${busCount} buses`);
    console.log(`⏰ ${routeCount * 6} schedules`);

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

seedRealData();