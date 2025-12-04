const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const prisma = new PrismaClient();

// Function to read CSV file
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// Read GTFS data
const loadGTFSData = async () => {
  try {
    console.log('📂 Loading GTFS data...');
    
    // Read Anbessa Bus data
    const anbessaRoutes = await readCSV(path.join(__dirname, '../asset/anbesa_bus/routes.txt'));
    const anbessaStops = await readCSV(path.join(__dirname, '../asset/anbesa_bus/stops.txt'));
    const anbessaTrips = await readCSV(path.join(__dirname, '../asset/anbesa_bus/trips.txt'));
    const anbessaStopTimes = await readCSV(path.join(__dirname, '../asset/anbesa_bus/stop_times.txt'));
    
    // Read Sheger Bus data
    const shegerRoutes = await readCSV(path.join(__dirname, '../asset/sheger_bus/routes.txt'));
    const shegerStops = await readCSV(path.join(__dirname, '../asset/sheger_bus/stops.txt'));
    const shegerTrips = await readCSV(path.join(__dirname, '../asset/sheger_bus/trips.txt'));
    const shegerStopTimes = await readCSV(path.join(__dirname, '../asset/sheger_bus/stop_times.txt'));

    console.log('✅ GTFS data loaded successfully');
    
    return {
      anbessa: {
        routes: anbessaRoutes,
        stops: anbessaStops,
        trips: anbessaTrips,
        stopTimes: anbessaStopTimes
      },
      sheger: {
        routes: shegerRoutes,
        stops: shegerStops,
        trips: shegerTrips,
        stopTimes: shegerStopTimes
      }
    };
  } catch (error) {
    console.error('❌ Error loading GTFS data:', error);
    throw error;
  }
};

// Process GTFS data into a format suitable for our database
const processGTFSData = (gtfsData) => {
  console.log('🔄 Processing GTFS data...');
  
  // Process Anbessa routes
  const anbesaRoutes = gtfsData.anbessa.routes.map(route => ({
    routeId: route.route_short_name,
    routeName: route.route_long_name,
    fleet: 'ANBESSA'
  }));
  
  // Process Sheger routes
  const shegerRoutes = gtfsData.sheger.routes.map(route => ({
    routeId: route.route_short_name,
    routeName: route.route_long_name,
    fleet: 'SHEGER'
  }));

  // Combine and deduplicate stops
  const allStops = [
    ...gtfsData.anbessa.stops.map(stop => ({
      stopId: stop.stop_id,
      stopName: stop.stop_name,
      stopNameAmharic: stop.stop_name, // Add Amharic names if available
      latitude: parseFloat(stop.stop_lat),
      longitude: parseFloat(stop.stop_lon)
    })),
    ...gtfsData.sheger.stops.map(stop => ({
      stopId: stop.stop_id,
      stopName: stop.stop_name,
      stopNameAmharic: stop.stop_name, // Add Amharic names if available
      latitude: parseFloat(stop.stop_lat),
      longitude: parseFloat(stop.stop_lon)
    }))
  ].filter((stop, index, self) => 
    index === self.findIndex(s => s.stopId === stop.stopId)
  );

  // Process stop times and trips to get route-stop relationships
  const routeStops = [];
  
  // Process Anbessa route stops
  gtfsData.anbessa.trips.forEach(trip => {
    const route = gtfsData.anbessa.routes.find(r => r.route_id === trip.route_id);
    if (!route) return;
    
    const stopsForTrip = gtfsData.anbessa.stopTimes
      .filter(st => st.trip_id === trip.trip_id)
      .sort((a, b) => parseInt(a.stop_sequence) - parseInt(b.stop_sequence));
    
    stopsForTrip.forEach((stopTime, index) => {
      routeStops.push({
        routeId: route.route_short_name,
        stopId: stopTime.stop_id,
        sequence: parseInt(stopTime.stop_sequence)
      });
    });
  });
  
  // Process Sheger route stops
  gtfsData.sheger.trips.forEach(trip => {
    const route = gtfsData.sheger.routes.find(r => r.route_id === trip.route_id);
    if (!route) return;
    
    const stopsForTrip = gtfsData.sheger.stopTimes
      .filter(st => st.trip_id === trip.trip_id)
      .sort((a, b) => parseInt(a.stop_sequence) - parseInt(b.stop_sequence));
    
    stopsForTrip.forEach((stopTime, index) => {
      routeStops.push({
        routeId: route.route_short_name,
        stopId: stopTime.stop_id,
        sequence: parseInt(stopTime.stop_sequence)
      });
    });
  });

  console.log('✅ GTFS data processed successfully');
  
  return {
    routes: [...anbesaRoutes, ...shegerRoutes],
    stops: allStops,
    routeStops
  };
};

async function clearDatabase() {
  console.log('🗑️ Clearing existing data...');
  
  await prisma.schedule.deleteMany({});
  await prisma.bus.deleteMany({});
  await prisma.routeStop.deleteMany({});
  await prisma.route.deleteMany({});
  await prisma.stop.deleteMany({});
  await prisma.driver.deleteMany({});
  
  console.log('✅ Database cleared');
}

async function seedStops(stops) {
  console.log(`🚏 Seeding ${stops.length} bus stops...`);
  
  for (const stop of stops) {
    await prisma.stop.upsert({
      where: { stopId: stop.stopId },
      update: {
        stopName: stop.stopName,
        stopNameAmharic: stop.stopNameAmharic,
        latitude: stop.latitude,
        longitude: stop.longitude
      },
      create: {
        stopId: stop.stopId,
        stopName: stop.stopName,
        stopNameAmharic: stop.stopNameAmharic,
        latitude: stop.latitude,
        longitude: stop.longitude,
        landmarks: []
      }
    });
  }
  
  console.log(`✅ Created/Updated ${stops.length} bus stops`);
}

async function seedRoutes(routes) {
  console.log(`🛣️ Seeding ${routes.length} bus routes...`);
  
  for (const route of routes) {
    const [startLocation, endLocation] = route.routeName.split(' ↔ ');
    
    await prisma.route.upsert({
      where: { routeId: route.routeId },
      update: {
        routeName: route.routeName,
        startLocation,
        endLocation: endLocation || startLocation,
        distance: Math.floor(Math.random() * 15) + 5, // 5-20 km
        estimatedDuration: Math.floor(Math.random() * 50) + 30, // 30-80 min
        fare: Math.floor(Math.random() * 15) + 5, // 5-20 ETB
        isActive: true
      },
      create: {
        routeId: route.routeId,
        routeName: route.routeName,
        startLocation,
        endLocation: endLocation || startLocation,
        distance: Math.floor(Math.random() * 15) + 5, // 5-20 km
        estimatedDuration: Math.floor(Math.random() * 50) + 30, // 30-80 min
        fare: Math.floor(Math.random() * 15) + 5, // 5-20 ETB
        isActive: true
      }
    });
  }
  
  console.log(`✅ Created/Updated ${routes.length} routes`);
}

async function seedRouteStops(routeStops) {
  console.log(`📍 Seeding route-stop relationships...`);
  
  for (const rs of routeStops) {
    await prisma.routeStop.upsert({
      where: {
        routeId_stopId: {
          routeId: rs.routeId,
          stopId: rs.stopId
        }
      },
      update: {
        sequence: rs.sequence
      },
      create: {
        routeId: rs.routeId,
        stopId: rs.stopId,
        sequence: rs.sequence
      }
    });
  }
  
  console.log(`✅ Created/Updated ${routeStops.length} route-stop relationships`);
}

async function seedBuses(routes) {
  console.log('🚌 Seeding buses...');
  
  const fleetBuses = {
    SHEGER: [
      { model: 'Yutong ZK6126HGA', capacity: 85, year: 2020 },
      { model: 'Yutong ZK6128HGA', capacity: 80, year: 2021 },
      { model: 'Yutong ZK6125HNG2', capacity: 90, year: 2022 }
    ],
    ANBESSA: [
      { model: 'Higer KLQ6129GQ1', capacity: 50, year: 2018 },
      { model: 'Higer KLQ6125B', capacity: 45, year: 2019 },
      { model: 'Higer KLQ6116G', capacity: 55, year: 2020 }
    ]
  };
  
  let busCounter = 1;
  
  for (const route of routes) {
    const fleet = route.fleet;
    const busModel = fleetBuses[fleet][Math.floor(Math.random() * fleetBuses[fleet].length)];
    const busesPerRoute = Math.floor(Math.random() * 3) + 2; // 2-4 buses per route
    
    for (let i = 0; i < busesPerRoute; i++) {
      const busNumber = `${fleet.substring(0, 2)}-${String(busCounter).padStart(3, '0')}`;
      
      await prisma.bus.upsert({
        where: { busNumber },
        update: {
          capacity: busModel.capacity,
          model: busModel.model,
          year: busModel.year,
          status: Math.random() > 0.1 ? 'ACTIVE' : 'MAINTENANCE',
          routeId: route.routeId
        },
        create: {
          busNumber,
          capacity: busModel.capacity,
          model: busModel.model,
          year: busModel.year,
          status: Math.random() > 0.1 ? 'ACTIVE' : 'MAINTENANCE',
          routeId: route.routeId
        }
      });
      
      busCounter++;
    }
  }
  
  console.log(`✅ Created buses for all routes`);
}

async function seedDrivers() {
  console.log('👨‍✈️ Seeding drivers...');
  
  const drivers = [
    { firstName: 'Abebe', lastName: 'Kebede', licenseNumber: 'DL-001-2020', phone: '+251911123456' },
    { firstName: 'Almaz', lastName: 'Tadesse', licenseNumber: 'DL-002-2020', phone: '+251911234567' },
    { firstName: 'Dawit', lastName: 'Haile', licenseNumber: 'DL-003-2020', phone: '+251911345678' },
    { firstName: 'Hanan', lastName: 'Mohammed', licenseNumber: 'DL-004-2020', phone: '+251911456789' },
    { firstName: 'Kidist', lastName: 'Girma', licenseNumber: 'DL-005-2020', phone: '+251911567890' },
    { firstName: 'Yohannes', lastName: 'Tesfaye', licenseNumber: 'DL-006-2021', phone: '+251911678901' },
    { firstName: 'Mekdes', lastName: 'Assefa', licenseNumber: 'DL-007-2021', phone: '+251911789012' },
    { firstName: 'Temesgen', lastName: 'Gebre', licenseNumber: 'DL-008-2021', phone: '+251911890123' },
    { firstName: 'Zeritu', lastName: 'Lemma', licenseNumber: 'DL-009-2021', phone: '+251911901234' },
    { firstName: 'Bereket', lastName: 'Assefa', licenseNumber: 'DL-010-2022', phone: '+251912012345' }
  ];
  
  for (const driver of drivers) {
    await prisma.driver.upsert({
      where: { licenseNumber: driver.licenseNumber },
      update: {
        firstName: driver.firstName,
        lastName: driver.lastName,
        phone: driver.phone,
        email: `${driver.firstName.toLowerCase()}.${driver.lastName.toLowerCase()}@pbts.et`,
        status: 'ACTIVE'
      },
      create: {
        firstName: driver.firstName,
        lastName: driver.lastName,
        licenseNumber: driver.licenseNumber,
        phone: driver.phone,
        email: `${driver.firstName.toLowerCase()}.${driver.lastName.toLowerCase()}@pbts.et`,
        status: 'ACTIVE'
      }
    });
  }
  
  console.log(`✅ Created/Updated ${drivers.length} drivers`);
}

async function seedSchedules(routes) {
  console.log('📅 Seeding schedules...');
  
  const timeSlots = [
    { start: '06:00', end: '10:00' },
    { start: '10:30', end: '14:30' },
    { start: '15:00', end: '19:00' },
    { start: '19:30', end: '23:30' }
  ];
  
  const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]; // 0=Sunday, 1=Monday, etc.
  const drivers = await prisma.driver.findMany();
  const buses = await prisma.bus.findMany();
  
  let scheduleCounter = 0;
  
  for (const route of routes) {
    const routeBuses = buses.filter(bus => bus.routeId === route.routeId && bus.status === 'ACTIVE');
    
    if (routeBuses.length > 0) {
      for (const dayOfWeek of daysOfWeek) {
        for (let i = 0; i < Math.min(2, routeBuses.length); i++) { // Max 2 buses per route per day
          const bus = routeBuses[i];
          const driver = drivers[scheduleCounter % drivers.length];
          
          for (const slot of timeSlots) {
            await prisma.schedule.create({
              data: {
                routeId: route.routeId,
                busId: bus.busNumber,
                driverId: driver.licenseNumber,
                departureTime: slot.start,
                arrivalTime: slot.end,
                dayOfWeek,
                status: 'SCHEDULED'
              }
            });
            
            scheduleCounter++;
          }
        }
      }
    }
  }
  
  console.log(`✅ Created ${scheduleCounter} schedules`);
}

async function main() {
  try {
    console.log('🚀 Starting GTFS data migration...');
    
    // Load and process GTFS data
    const gtfsData = await loadGTFSData();
    const { routes, stops, routeStops } = processGTFSData(gtfsData);
    
    // Clear existing data
    await clearDatabase();
    
    // Seed the database with processed data
    await seedStops(stops);
    await seedRoutes(routes);
    await seedRouteStops(routeStops);
    await seedDrivers();
    await seedBuses(routes);
    await seedSchedules(routes);
    
    console.log('✅ GTFS data migration completed successfully!');
    console.log(`📊 Migration Summary:`);
    console.log(`   - ${stops.length} bus stops created/updated`);
    console.log(`   - ${routes.length} routes created/updated`);
    console.log(`   - ${routeStops.length} route-stop relationships created/updated`);
    console.log(`   - Buses assigned to all routes`);
    console.log(`   - Schedules generated for all routes`);
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
