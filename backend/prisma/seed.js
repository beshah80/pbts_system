const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '../.env' });
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = bcrypt.hashSync('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pbts.et' },
    update: {},
    create: {
      email: 'admin@pbts.et',
      password: adminPassword,
      name: 'System Administrator',
      role: 'ADMIN'
    }
  });

  // Create sample driver
  const driverPassword = bcrypt.hashSync('driver123', 10);
  
  const driverUser = await prisma.user.upsert({
    where: { email: 'driver@pbts.et' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'driver@pbts.et',
      password: driverPassword,
      role: 'DRIVER',
      phone: '+251911234567'
    }
  });

  const driver = await prisma.driver.upsert({
    where: { userId: driverUser.id },
    update: {},
    create: {
      userId: driverUser.id,
      employeeId: 'EMP001',
      licenseNo: 'DL001',
      licenseExpiry: new Date('2025-12-31'),
      experienceYears: 5
    }
  });

  // Create sample stops first
  const stops = [
    { name: 'Meskel Square', code: 'MS01', latitude: 9.0084, longitude: 38.7648 },
    { name: 'Bole Airport', code: 'BA01', latitude: 8.9806, longitude: 38.7992 },
    { name: 'Mercato', code: 'MC01', latitude: 9.0342, longitude: 38.7441 },
    { name: 'Piazza', code: 'PZ01', latitude: 9.0411, longitude: 38.7469 }
  ];

  const createdStops = [];
  for (const stopData of stops) {
    const stop = await prisma.stop.create({
      data: stopData
    });
    createdStops.push(stop);
  }

  // Create sample routes
  const routes = [
    {
      code: 'R001',
      name: 'Meskel Square - Bole Airport',
      originStopId: createdStops[0].id,
      destinationStopId: createdStops[1].id,
      distanceKm: 15.2,
      operatingFrom: '06:00',
      operatingTo: '22:00'
    },
    {
      code: 'R002', 
      name: 'Mercato - Piazza',
      originStopId: createdStops[2].id,
      destinationStopId: createdStops[3].id,
      distanceKm: 8.5,
      operatingFrom: '05:30',
      operatingTo: '21:30'
    }
  ];

  const createdRoutes = [];
  for (const routeData of routes) {
    const route = await prisma.route.upsert({
      where: { code: routeData.code },
      update: {},
      create: routeData
    });
    createdRoutes.push(route);
  }

  // Create route-stop relationships
  await prisma.routeStop.create({
    data: {
      routeId: createdRoutes[0].id,
      stopId: createdStops[0].id,
      sequence: 1,
      distanceFromStartKm: 0
    }
  });
  
  await prisma.routeStop.create({
    data: {
      routeId: createdRoutes[0].id,
      stopId: createdStops[1].id,
      sequence: 2,
      distanceFromStartKm: 15.2
    }
  });

  await prisma.routeStop.create({
    data: {
      routeId: createdRoutes[1].id,
      stopId: createdStops[2].id,
      sequence: 1,
      distanceFromStartKm: 0
    }
  });
  
  await prisma.routeStop.create({
    data: {
      routeId: createdRoutes[1].id,
      stopId: createdStops[3].id,
      sequence: 2,
      distanceFromStartKm: 8.5
    }
  });

  // Create sample buses
  const buses = [
    {
      plateNumber: 'ET-001-AA',
      fleetNumber: 'ANB-001',
      ownership: 'ANBESSA',
      status: 'AVAILABLE',
      capacity: 50,
      manufacturer: 'Isuzu',
      modelYear: 2020
    },
    {
      plateNumber: 'ET-002-AA',
      fleetNumber: 'SHG-002', 
      ownership: 'SHEGER',
      status: 'AVAILABLE',
      capacity: 45,
      manufacturer: 'Hyundai',
      modelYear: 2019
    }
  ];

  const createdBuses = [];
  for (const busData of buses) {
    const bus = await prisma.bus.upsert({
      where: { plateNumber: busData.plateNumber },
      update: {},
      create: busData
    });
    createdBuses.push(bus);
  }

  // Create sample schedules
  const schedules = [
    {
      routeId: createdRoutes[0].id,
      dayOfWeek: 1, // Monday
      departureTime: '06:00',
      arrivalTime: '06:45',
      frequencyMinutes: 30
    },
    {
      routeId: createdRoutes[0].id,
      dayOfWeek: 1, // Monday
      departureTime: '08:00',
      arrivalTime: '08:45',
      frequencyMinutes: 30
    },
    {
      routeId: createdRoutes[1].id,
      dayOfWeek: 1, // Monday
      departureTime: '07:00',
      arrivalTime: '07:30',
      frequencyMinutes: 20
    }
  ];

  for (const scheduleData of schedules) {
    await prisma.schedule.create({
      data: scheduleData
    });
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });