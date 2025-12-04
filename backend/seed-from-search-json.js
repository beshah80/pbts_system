const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function seedFromSearchJson() {
  try {
    console.log('🔄 Reading search.json for real Ethiopian transport data...\n');

    // Read search.json
    const searchJsonPath = path.join(__dirname, '../asset/search.json');
    const searchData = JSON.parse(fs.readFileSync(searchJsonPath, 'utf8'));
    
    console.log('📊 Processing search.json data...');
    console.log('Data structure:', typeof searchData);
    console.log('Is array:', Array.isArray(searchData));
    
    // Handle different JSON structures
    let routeData = [];
    if (Array.isArray(searchData)) {
      routeData = searchData;
    } else if (searchData.routes && Array.isArray(searchData.routes)) {
      routeData = searchData.routes;
    } else if (typeof searchData === 'object') {
      // Convert object to array of routes
      routeData = Object.keys(searchData).map(key => {
        const value = searchData[key];
        if (typeof value === 'object' && value.to) {
          return { from: key, ...value };
        } else if (typeof value === 'string') {
          return { from: key, to: value };
        } else {
          return { from: key, to: String(value) };
        }
      });
    }

    console.log(`📍 Found ${routeData.length} route entries in search.json`);
    
    if (routeData.length === 0) {
      console.log('❌ No route data found in search.json');
      return;
    }

    // Show first few entries to understand structure
    console.log('\n📋 Sample data structure:');
    routeData.slice(0, 3).forEach((item, index) => {
      console.log(`${index + 1}.`, JSON.stringify(item, null, 2));
    });

    // Clear existing data
    console.log('\n🗑️ Clearing existing route data...');
    await prisma.routeStop.deleteMany({});
    await prisma.schedule.deleteMany({});
    await prisma.stop.deleteMany({});
    await prisma.route.deleteMany({});

    // Process routes from search.json
    let routeCount = 0;
    let stopCount = 0;
    const processedRoutes = [];
    const processedStops = new Map(); // To avoid duplicate stops

    for (const item of routeData.slice(0, 20)) { // Limit to first 20 for testing
      try {
        // Extract route information
        const fromLocation = item.from || item.origin || item.start;
        const toLocation = item.to || item.destination || item.end;
        const distance = item.distance || item.distanceKm || item.dist;
        const duration = item.duration || item.time || item.travelTime;
        const fare = item.fare || item.price || item.cost;

        if (!fromLocation || !toLocation) {
          console.log(`⚠️ Skipping invalid route:`, item);
          continue;
        }

        console.log(`\n✅ Processing: ${fromLocation} → ${toLocation}`);
        
        // Create or get origin stop
        let originStop;
        if (processedStops.has(fromLocation)) {
          originStop = processedStops.get(fromLocation);
        } else {
          originStop = await prisma.stop.create({
            data: {
              name: fromLocation,
              code: `ST${String(stopCount + 1).padStart(3, '0')}`,
              latitude: getLocationLatitude(fromLocation),
              longitude: getLocationLongitude(fromLocation)
            }
          });
          processedStops.set(fromLocation, originStop);
          stopCount++;
        }

        // Create or get destination stop
        let destStop;
        if (processedStops.has(toLocation)) {
          destStop = processedStops.get(toLocation);
        } else {
          destStop = await prisma.stop.create({
            data: {
              name: toLocation,
              code: `ST${String(stopCount + 1).padStart(3, '0')}`,
              latitude: getLocationLatitude(toLocation),
              longitude: getLocationLongitude(toLocation)
            }
          });
          processedStops.set(toLocation, destStop);
          stopCount++;
        }

        // Create route with real data from search.json
        const route = await prisma.route.create({
          data: {
            code: `R${String(routeCount + 1).padStart(3, '0')}`,
            name: `${fromLocation} - ${toLocation}`,
            originStopId: originStop.id,
            destinationStopId: destStop.id,
            distanceKm: parseFloat(distance) || Math.random() * 20 + 5,
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
            distanceFromStartKm: parseFloat(distance) || Math.random() * 20 + 5
          }
        });

        // Create schedules
        const departureTimes = ['06:00', '07:00', '08:00', '12:00', '17:00', '18:00'];
        for (const time of departureTimes) {
          await prisma.schedule.create({
            data: {
              routeId: route.id,
              dayOfWeek: 1,
              departureTime: time,
              arrivalTime: addMinutes(time, parseInt(duration) || 30),
              frequencyMinutes: 30
            }
          });
        }

        processedRoutes.push(route);
        routeCount++;
        
        console.log(`   Distance: ${distance || 'calculated'}`);
        console.log(`   Duration: ${duration || 'calculated'} min`);
        console.log(`   Fare: ${fare || 'default'} ETB`);

      } catch (error) {
        console.error(`❌ Error processing route:`, error.message);
      }
    }

    console.log(`\n🎉 Successfully seeded from search.json:`);
    console.log(`📍 ${routeCount} routes created`);
    console.log(`🚏 ${stopCount} unique stops created`);
    console.log(`⏰ ${routeCount * 6} schedules created`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Helper functions
function getLocationLatitude(location) {
  const locationMap = {
    'meskel square': 9.0084,
    'bole airport': 8.9806,
    'mercato': 9.0342,
    'piazza': 9.0411,
    'kazanchis': 9.0289,
    'arat kilo': 9.0378
  };
  return locationMap[location.toLowerCase()] || (9.0 + Math.random() * 0.1);
}

function getLocationLongitude(location) {
  const locationMap = {
    'meskel square': 38.7648,
    'bole airport': 38.7992,
    'mercato': 38.7441,
    'piazza': 38.7469,
    'kazanchis': 38.7634,
    'arat kilo': 38.7578
  };
  return locationMap[location.toLowerCase()] || (38.7 + Math.random() * 0.1);
}

function addMinutes(time, minutes) {
  const [hours, mins] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

seedFromSearchJson();