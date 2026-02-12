import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding live bus data...');

  // 1. Load Real Routes from info.json
  const infoPath = path.resolve(__dirname, '../../asset/info.json');
  let routeIdToUse = 'route-live-test';
  let startLat = 9.0192;
  let startLon = 38.7525;

  if (fs.existsSync(infoPath)) {
    const routes = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
    if (routes.length > 0) {
      const r = routes[0];
      routeIdToUse = r.id;
      console.log(`Found real route: ${r.shortName} (${r.id})`);

      if (r.stops && r.stops.length > 0) {
        startLat = r.stops[0].lat;
        startLon = r.stops[0].lon;
      }
    }
  }

  // 2. Create or Find Route in DB (syncing static ID)
  // We need to ensure a Route record exists for this static ID to link it properly
  let route = await prisma.route.findFirst({
    where: { staticId: routeIdToUse }
  });

  if (!route) {
    console.log(`Creating DB entry for route ${routeIdToUse}...`);
    route = await prisma.route.create({
      data: {
        staticId: routeIdToUse,
        routeNumber: '101', // Fallback
        name: 'Imported Route',
        startLocation: 'Start',
        endLocation: 'End',
        distance: 5.0,
        estimatedDuration: 30,
        farePrice: 10.0,
        isActive: true
      }
    });
  }

  // 3. Create Bus
  const bus = await prisma.bus.upsert({
    where: { plateNumber: 'ET-LIVE-01' },
    update: { status: 'ACTIVE' },
    create: {
      plateNumber: 'ET-LIVE-01',
      busNumber: 'LIVE-01',
      busType: 'SHEGER',
      status: 'ACTIVE',
      capacity: 60
    }
  });

  // 4. Create Driver
  const driver = await prisma.driver.upsert({
    where: { licenseNumber: 'DL-LIVE-01' },
    update: {},
    create: {
      employeeId: 'EMP-LIVE-01',
      firstName: 'Live',
      lastName: 'Driver',
      licenseNumber: 'DL-LIVE-01',
      phoneNumber: '0900000000',
      password: 'password123',
      address: 'Addis Ababa',
      dateOfBirth: new Date('1985-01-01'),
      hireDate: new Date(),
      emergencyName: 'Contact',
      emergencyPhone: '0900000001',
      emergencyRelation: 'Friend'
    }
  });

  // 5. Create Schedule
  const schedule = await prisma.schedule.create({
    data: {
      routeStaticId: route.staticId,
      routeId: route.id,
      busId: bus.id,
      driverId: driver.id,
      departureTime: new Date(),
      status: 'IN_PROGRESS'
    }
  });

  // 6. Create TripRecord (Active)
  // Delete old active trips for this bus to avoid duplicates
  await prisma.tripRecord.updateMany({
    where: { busId: bus.id, status: 'IN_PROGRESS' },
    data: { status: 'COMPLETED', endedAt: new Date() }
  });

  await prisma.tripRecord.create({
    data: {
      scheduleId: schedule.id,
      busId: bus.id,
      driverId: driver.id,
      routeStaticId: route.staticId,
      routeId: route.id,
      status: 'IN_PROGRESS',
      currentLatitude: startLat,
      currentLongitude: startLon,
      startedAt: new Date()
    }
  });

  console.log(`Live bus seeded for route ${routeIdToUse} at ${startLat}, ${startLon}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
