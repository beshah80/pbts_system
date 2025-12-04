const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Real Ethiopian bus stops with GPS coordinates from search.json
const ethiopianStops = [
  { name: "Piassa Arada", latitude: 38.7547538, longitude: 9.0336984, isTerminal: true },
  { name: "Arat Kilo", latitude: 38.7633823, longitude: 9.0329476, isTerminal: true },
  { name: "Mexico Square", latitude: 38.7487135, longitude: 9.0110658, isTerminal: false },
  { name: "Stadium", latitude: 38.757777, longitude: 9.0119673, isTerminal: false },
  { name: "Legehar", latitude: 38.753104, longitude: 9.0116448, isTerminal: true },
  { name: "Megenagna", latitude: 38.8016732, longitude: 9.0196149, isTerminal: true },
  { name: "Bole Airport", latitude: 38.7938428, longitude: 8.9833477, isTerminal: true },
  { name: "Merkato", latitude: 38.7396038, longitude: 9.0296278, isTerminal: true },
  { name: "Autobis Tera", latitude: 38.7322364, longitude: 9.0339819, isTerminal: true },
  { name: "Kality Meneharia", latitude: 38.7630345, longitude: 8.9379944, isTerminal: true },
  { name: "Saris", latitude: 38.7634073, longitude: 8.9519783, isTerminal: false },
  { name: "Addisu Gebeya", latitude: 38.7372656, longitude: 9.0595918, isTerminal: true },
  { name: "Shero Meda", latitude: 38.7201776, longitude: 9.063156, isTerminal: false },
  { name: "Kotebe", latitude: 38.8398518, longitude: 9.0371282, isTerminal: false },
  { name: "Ayat", latitude: 38.8460555, longitude: 9.0345734, isTerminal: true },
  { name: "Gerji", latitude: 38.8094849, longitude: 8.9953787, isTerminal: false },
  { name: "Yeka", latitude: 38.7988485, longitude: 9.0243483, isTerminal: false },
  { name: "Tor Hailoch", latitude: 38.7229117, longitude: 9.0113652, isTerminal: false },
  { name: "Lideta", latitude: 38.7366684, longitude: 9.0110809, isTerminal: false },
  { name: "Kera", latitude: 38.7502416, longitude: 8.9847803, isTerminal: false }
];

// Real Ethiopian bus routes based on ANBESSA and SHEGER data
const ethiopianRoutes = [
  {
    routeNumber: "AB001",
    routeName: "Tafo Square ↔ Piassa Arada",
    startLocation: "Tafo Square",
    endLocation: "Piassa Arada",
    distanceKm: 12.5,
    estimatedDuration: 35,
    farePrice: 15,
    operatingStart: "05:30",
    operatingEnd: "22:00",
    frequency: 15,
    description: "ANBESSA city bus route connecting Tafo Square to Piassa Arada"
  },
  {
    routeNumber: "AB003",
    routeName: "Ayer Tena ↔ Piassa Arada", 
    startLocation: "Ayer Tena",
    endLocation: "Piassa Arada",
    distanceKm: 18.2,
    estimatedDuration: 45,
    farePrice: 20,
    operatingStart: "05:00",
    operatingEnd: "23:00",
    frequency: 12,
    description: "ANBESSA route from Ayer Tena to central Piassa"
  },
  {
    routeNumber: "AB009",
    routeName: "Piassa Arada ↔ Bole Airport",
    startLocation: "Piassa Arada", 
    endLocation: "Bole Airport",
    distanceKm: 15.8,
    estimatedDuration: 40,
    farePrice: 25,
    operatingStart: "04:30",
    operatingEnd: "24:00",
    frequency: 10,
    description: "ANBESSA airport connection route"
  },
  {
    routeNumber: "SH001",
    routeName: "Shero Meda ↔ Mexico Square",
    startLocation: "Shero Meda",
    endLocation: "Mexico Square", 
    distanceKm: 8.5,
    estimatedDuration: 25,
    farePrice: 12,
    operatingStart: "05:30",
    operatingEnd: "22:30",
    frequency: 8,
    description: "SHEGER bus connecting northern areas to central Mexico"
  },
  {
    routeNumber: "SH004",
    routeName: "Yeka Abado ↔ Megenagna",
    startLocation: "Yeka Abado",
    endLocation: "Megenagna",
    distanceKm: 14.2,
    estimatedDuration: 38,
    farePrice: 18,
    operatingStart: "05:00",
    operatingEnd: "22:00", 
    frequency: 15,
    description: "SHEGER route connecting Yeka area to Megenagna terminal"
  },
  {
    routeNumber: "AB027",
    routeName: "Mexico ↔ Gelan Condominium",
    startLocation: "Mexico Square",
    endLocation: "Gelan Condominium",
    distanceKm: 22.3,
    estimatedDuration: 55,
    farePrice: 28,
    operatingStart: "05:30",
    operatingEnd: "21:30",
    frequency: 20,
    description: "ANBESSA long-distance route to Gelan area"
  },
  {
    routeNumber: "SH016",
    routeName: "Piassa Arada ↔ Abo Junction", 
    startLocation: "Piassa Arada",
    endLocation: "Abo Junction",
    distanceKm: 16.7,
    estimatedDuration: 42,
    farePrice: 22,
    operatingStart: "05:15",
    operatingEnd: "22:15",
    frequency: 18,
    description: "SHEGER route to southern Abo Junction area"
  },
  {
    routeNumber: "AB048",
    routeName: "Addisu Gebeya ↔ Bole Mickael",
    startLocation: "Addisu Gebeya", 
    endLocation: "Bole Mickael",
    distanceKm: 11.8,
    estimatedDuration: 32,
    farePrice: 16,
    operatingStart: "05:45",
    operatingEnd: "22:45",
    frequency: 12,
    description: "ANBESSA connecting market area to Bole district"
  }
];

async function initializeRealDatabase() {
  try {
    console.log('🚀 Initializing PBTS System with Real Ethiopian Data...');

    // Clear existing data
    console.log('🧹 Cleaning existing data...');
    await prisma.feedback.deleteMany({});
    await prisma.incident.deleteMany({});
    await prisma.stopPassage.deleteMany({});
    await prisma.tripRecord.deleteMany({});
    await prisma.schedule.deleteMany({});
    await prisma.routeStop.deleteMany({});
    await prisma.stop.deleteMany({});
    await prisma.route.deleteMany({});
    await prisma.bus.deleteMany({});
    await prisma.driver.deleteMany({});
    await prisma.admin.deleteMany({});
    await prisma.auditLog.deleteMany({});

    // Create Admin with encrypted password
    console.log('👤 Creating admin account...');
    const adminPassword = await bcrypt.hash('admin123', 12);

    const admin = await prisma.admin.create({
      data: {
        email: 'admin@pbts.com',
        password: adminPassword,
        name: 'PBTS Administrator'
      }
    });

    // Create Drivers with encrypted passwords
    console.log('🚗 Creating driver accounts...');
    const driverPassword = await bcrypt.hash('driver123', 12);

    const drivers = await Promise.all([
      prisma.driver.create({
        data: {
          employeeId: 'DRV001',
          firstName: 'Abebe',
          lastName: 'Kebede',
          licenseNumber: 'ET-AA-001234',
          phoneNumber: '+251911123456',
          email: 'abebe@pbts.com',
          password: driverPassword,
          address: 'Addis Ababa, Ethiopia',
          dateOfBirth: new Date('1985-03-15'),
          hireDate: new Date('2020-01-15'),
          status: 'ACTIVE',
          experience: 8,
          rating: 4.5,
          totalTrips: 1250,
          emergencyName: 'Almaz Kebede',
          emergencyPhone: '+251933345678',
          emergencyRelation: 'Wife'
        }
      }),
      prisma.driver.create({
        data: {
          employeeId: 'DRV002',
          firstName: 'Tigist',
          lastName: 'Haile',
          licenseNumber: 'ET-AA-005678',
          phoneNumber: '+251922234567',
          email: 'tigist@pbts.com',
          password: driverPassword,
          address: 'Bole, Addis Ababa',
          dateOfBirth: new Date('1990-07-22'),
          hireDate: new Date('2021-06-01'),
          status: 'ACTIVE',
          experience: 5,
          rating: 4.8,
          totalTrips: 890,
          emergencyName: 'Dawit Haile',
          emergencyPhone: '+251944456789',
          emergencyRelation: 'Brother'
        }
      })
    ]);

    // Create Stops
    console.log('🚏 Creating Ethiopian bus stops...');
    const stops = await Promise.all(
      ethiopianStops.map(stop => 
        prisma.stop.create({ data: stop })
      )
    );

    // Create Routes
    console.log('🛣️ Creating Ethiopian bus routes...');
    const routes = await Promise.all(
      ethiopianRoutes.map(route => 
        prisma.route.create({ data: route })
      )
    );

    // Create Route-Stop relationships with realistic distances
    console.log('🔗 Creating route-stop relationships...');
    const routeStopData = [
      // AB001: Tafo Square ↔ Piassa Arada
      { routeId: routes[0].id, stopId: stops[0].id, sequence: 1, distanceFromStartKm: 0, estimatedTravelMinutes: 0 },
      { routeId: routes[0].id, stopId: stops[2].id, sequence: 2, distanceFromStartKm: 4.2, estimatedTravelMinutes: 12 },
      { routeId: routes[0].id, stopId: stops[3].id, sequence: 3, distanceFromStartKm: 8.1, estimatedTravelMinutes: 22 },
      { routeId: routes[0].id, stopId: stops[0].id, sequence: 4, distanceFromStartKm: 12.5, estimatedTravelMinutes: 35 },

      // AB009: Piassa Arada ↔ Bole Airport  
      { routeId: routes[2].id, stopId: stops[0].id, sequence: 1, distanceFromStartKm: 0, estimatedTravelMinutes: 0 },
      { routeId: routes[2].id, stopId: stops[4].id, sequence: 2, distanceFromStartKm: 3.8, estimatedTravelMinutes: 10 },
      { routeId: routes[2].id, stopId: stops[5].id, sequence: 3, distanceFromStartKm: 8.5, estimatedTravelMinutes: 22 },
      { routeId: routes[2].id, stopId: stops[6].id, sequence: 4, distanceFromStartKm: 15.8, estimatedTravelMinutes: 40 },

      // SH001: Shero Meda ↔ Mexico Square
      { routeId: routes[3].id, stopId: stops[12].id, sequence: 1, distanceFromStartKm: 0, estimatedTravelMinutes: 0 },
      { routeId: routes[3].id, stopId: stops[11].id, sequence: 2, distanceFromStartKm: 3.2, estimatedTravelMinutes: 8 },
      { routeId: routes[3].id, stopId: stops[2].id, sequence: 3, distanceFromStartKm: 8.5, estimatedTravelMinutes: 25 }
    ];

    await prisma.routeStop.createMany({ data: routeStopData });

    // Create Buses
    console.log('🚌 Creating Ethiopian buses...');
    const buses = await Promise.all([
      prisma.bus.create({
        data: {
          plateNumber: 'ET-3-12345',
          busNumber: 'AB001',
          fleetNumber: 'ANB001',
          busType: 'ANBESSA',
          status: 'ACTIVE',
          capacity: 45,
          standingCapacity: 25,
          currentRouteId: routes[0].id,
          driverId: drivers[0].id,
          lastMaintenance: new Date('2024-01-15'),
          nextMaintenance: new Date('2024-04-15'),
          mileage: 125000,
          fuelLevel: 85,
          gpsEnabled: true,
          manufacturer: 'Isuzu',
          modelYear: 2020
        }
      }),
      prisma.bus.create({
        data: {
          plateNumber: 'ET-3-67890',
          busNumber: 'SH001',
          fleetNumber: 'SHG001',
          busType: 'SHEGER',
          status: 'ACTIVE',
          capacity: 50,
          standingCapacity: 30,
          currentRouteId: routes[3].id,
          driverId: drivers[1].id,
          lastMaintenance: new Date('2024-02-01'),
          nextMaintenance: new Date('2024-05-01'),
          mileage: 98000,
          fuelLevel: 70,
          gpsEnabled: true,
          manufacturer: 'Mercedes',
          modelYear: 2021
        }
      })
    ]);

    // Create Schedules
    console.log('📅 Creating bus schedules...');
    await prisma.schedule.createMany({
      data: [
        {
          routeId: routes[0].id,
          busId: buses[0].id,
          driverId: drivers[0].id,
          departureTime: '06:00',
          arrivalTime: '06:35',
          status: 'SCHEDULED',
          frequencyMinutes: 15
        },
        {
          routeId: routes[3].id,
          busId: buses[1].id,
          driverId: drivers[1].id,
          departureTime: '05:30',
          arrivalTime: '05:55',
          status: 'SCHEDULED',
          frequencyMinutes: 8
        }
      ]
    });

    console.log('✅ Real Ethiopian PBTS database initialized successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@pbts.com / admin123');
    console.log('Driver 1: abebe@pbts.com / driver123');
    console.log('Driver 2: tigist@pbts.com / driver123');
    console.log('\n🏗️ Database contains:');
    console.log(`- 1 Admin account`);
    console.log(`- ${drivers.length} Driver accounts`);
    console.log(`- ${stops.length} Ethiopian bus stops`);
    console.log(`- ${routes.length} Real Ethiopian bus routes`);
    console.log(`- ${buses.length} Buses (ANBESSA & SHEGER)`);
    console.log('- Real GPS coordinates and distances');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run initialization
if (require.main === module) {
  initializeRealDatabase()
    .then(() => {
      console.log('🎉 Ethiopian PBTS System database is ready!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Initialization failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeRealDatabase };