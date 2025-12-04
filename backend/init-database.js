const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing PBTS System Database...');

    // Clear existing data (optional - remove if you want to keep existing data)
    console.log('🧹 Cleaning existing data...');
    await prisma.feedback.deleteMany({});
    await prisma.revenue.deleteMany({});
    await prisma.incident.deleteMany({});
    await prisma.stopPassage.deleteMany({});
    await prisma.tripRecord.deleteMany({});
    await prisma.schedule.deleteMany({});
    await prisma.routeStop.deleteMany({});
    await prisma.stop.deleteMany({});
    await prisma.route.deleteMany({});
    await prisma.bus.deleteMany({});
    await prisma.driver.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.admin.deleteMany({});
    await prisma.auditLog.deleteMany({});

    // Create Admin Users with encrypted passwords
    console.log('👤 Creating admin users...');
    const adminPassword = await bcrypt.hash('admin123', 12);
    const superAdminPassword = await bcrypt.hash('superadmin123', 12);

    const superAdmin = await prisma.admin.create({
      data: {
        email: 'superadmin@pbts.com',
        password: superAdminPassword,
        name: 'Super Administrator',
        role: 'SUPER_ADMIN',
        isActive: true
      }
    });

    const admin = await prisma.admin.create({
      data: {
        email: 'admin@pbts.com',
        password: adminPassword,
        name: 'System Administrator',
        role: 'ADMIN',
        isActive: true
      }
    });

    // Create User accounts for drivers
    console.log('🚗 Creating driver users...');
    const driverPassword = await bcrypt.hash('driver123', 12);

    const driverUser1 = await prisma.user.create({
      data: {
        name: 'Abebe Kebede',
        email: 'abebe@pbts.com',
        password: driverPassword,
        role: 'DRIVER',
        phone: '+251911123456'
      }
    });

    const driverUser2 = await prisma.user.create({
      data: {
        name: 'Tigist Haile',
        email: 'tigist@pbts.com',
        password: driverPassword,
        role: 'DRIVER',
        phone: '+251922234567'
      }
    });

    // Create Driver profiles
    const driver1 = await prisma.driver.create({
      data: {
        userId: driverUser1.id,
        firstName: 'Abebe',
        lastName: 'Kebede',
        licenseNumber: 'ET-AA-001234',
        phoneNumber: '+251911123456',
        email: 'abebe@pbts.com',
        address: 'Addis Ababa, Ethiopia',
        dateOfBirth: new Date('1985-03-15'),
        hireDate: new Date('2020-01-15'),
        status: 'ACTIVE',
        experience: 8,
        rating: 4.5,
        totalTrips: 1250,
        emergencyName: 'Almaz Kebede',
        emergencyPhone: '+251933345678',
        emergencyRelation: 'Wife',
        employeeId: 'DRV001',
        licenseExpiry: new Date('2025-03-15'),
        depot: 'Merkato Depot'
      }
    });

    const driver2 = await prisma.driver.create({
      data: {
        userId: driverUser2.id,
        firstName: 'Tigist',
        lastName: 'Haile',
        licenseNumber: 'ET-AA-005678',
        phoneNumber: '+251922234567',
        email: 'tigist@pbts.com',
        address: 'Bole, Addis Ababa',
        dateOfBirth: new Date('1990-07-22'),
        hireDate: new Date('2021-06-01'),
        status: 'ACTIVE',
        experience: 5,
        rating: 4.8,
        totalTrips: 890,
        emergencyName: 'Dawit Haile',
        emergencyPhone: '+251944456789',
        emergencyRelation: 'Brother',
        employeeId: 'DRV002',
        licenseExpiry: new Date('2026-07-22'),
        depot: 'Bole Depot'
      }
    });

    // Create Routes
    console.log('🛣️ Creating routes...');
    const route1 = await prisma.route.create({
      data: {
        routeNumber: 'R001',
        code: 'CMC-BOLE',
        routeName: 'CMC to Bole',
        name: 'CMC to Bole Route',
        startLocation: 'CMC (Comprehensive Medical Center)',
        endLocation: 'Bole Airport',
        distanceKm: 15.5,
        estimatedDuration: 45,
        farePrice: 25,
        isActive: true,
        operatingStart: '05:30',
        operatingEnd: '22:00',
        frequency: 15,
        description: 'Main route connecting CMC to Bole Airport'
      }
    });

    const route2 = await prisma.route.create({
      data: {
        routeNumber: 'R002',
        code: 'MERKATO-PIASSA',
        routeName: 'Merkato to Piassa',
        name: 'Merkato to Piassa Route',
        startLocation: 'Merkato',
        endLocation: 'Piassa',
        distanceKm: 8.2,
        estimatedDuration: 25,
        farePrice: 15,
        isActive: true,
        operatingStart: '05:00',
        operatingEnd: '23:00',
        frequency: 10,
        description: 'Central city route connecting major commercial areas'
      }
    });

    // Create Stops
    console.log('🚏 Creating stops...');
    const stops = await Promise.all([
      prisma.stop.create({
        data: {
          name: 'CMC Hospital',
          code: 'CMC01',
          area: 'CMC',
          latitude: 9.0054,
          longitude: 38.7636,
          isTerminal: true
        }
      }),
      prisma.stop.create({
        data: {
          name: 'Arat Kilo',
          code: 'AK01',
          area: 'Arat Kilo',
          latitude: 9.0370,
          longitude: 38.7578
        }
      }),
      prisma.stop.create({
        data: {
          name: 'Mexico Square',
          code: 'MX01',
          area: 'Mexico',
          latitude: 9.0157,
          longitude: 38.7614
        }
      }),
      prisma.stop.create({
        data: {
          name: 'Bole Airport',
          code: 'BA01',
          area: 'Bole',
          latitude: 8.9806,
          longitude: 38.7992,
          isTerminal: true
        }
      }),
      prisma.stop.create({
        data: {
          name: 'Merkato',
          code: 'MK01',
          area: 'Merkato',
          latitude: 9.0054,
          longitude: 38.7470,
          isTerminal: true
        }
      }),
      prisma.stop.create({
        data: {
          name: 'Piassa',
          code: 'PS01',
          area: 'Piassa',
          latitude: 9.0370,
          longitude: 38.7470,
          isTerminal: true
        }
      })
    ]);

    // Create Route-Stop relationships
    console.log('🔗 Creating route-stop relationships...');
    await prisma.routeStop.createMany({
      data: [
        // Route 1: CMC to Bole
        { routeId: route1.id, stopId: stops[0].id, sequence: 1, distanceFromStartKm: 0, estimatedTravelMinutes: 0 },
        { routeId: route1.id, stopId: stops[1].id, sequence: 2, distanceFromStartKm: 5.2, estimatedTravelMinutes: 12 },
        { routeId: route1.id, stopId: stops[2].id, sequence: 3, distanceFromStartKm: 8.8, estimatedTravelMinutes: 20 },
        { routeId: route1.id, stopId: stops[3].id, sequence: 4, distanceFromStartKm: 15.5, estimatedTravelMinutes: 45 },
        
        // Route 2: Merkato to Piassa
        { routeId: route2.id, stopId: stops[4].id, sequence: 1, distanceFromStartKm: 0, estimatedTravelMinutes: 0 },
        { routeId: route2.id, stopId: stops[5].id, sequence: 2, distanceFromStartKm: 8.2, estimatedTravelMinutes: 25 }
      ]
    });

    // Create Buses
    console.log('🚌 Creating buses...');
    const bus1 = await prisma.bus.create({
      data: {
        plateNumber: 'ET-3-12345',
        busNumber: 'B001',
        fleetNumber: 'FL001',
        busType: 'ANBESSA',
        ownership: 'Anbessa City Bus',
        status: 'ACTIVE',
        capacity: 45,
        standingCapacity: 25,
        currentRouteId: route1.id,
        driverId: driver1.id,
        lastMaintenance: new Date('2024-01-15'),
        nextMaintenance: new Date('2024-04-15'),
        mileage: 125000,
        fuelLevel: 85,
        gpsEnabled: true,
        manufacturer: 'Isuzu',
        modelYear: 2020,
        depot: 'Merkato Depot'
      }
    });

    const bus2 = await prisma.bus.create({
      data: {
        plateNumber: 'ET-3-67890',
        busNumber: 'B002',
        fleetNumber: 'FL002',
        busType: 'SHEGER',
        ownership: 'Sheger Bus',
        status: 'ACTIVE',
        capacity: 50,
        standingCapacity: 30,
        currentRouteId: route2.id,
        driverId: driver2.id,
        lastMaintenance: new Date('2024-02-01'),
        nextMaintenance: new Date('2024-05-01'),
        mileage: 98000,
        fuelLevel: 70,
        gpsEnabled: true,
        manufacturer: 'Mercedes',
        modelYear: 2021,
        depot: 'Bole Depot'
      }
    });

    // Create Schedules
    console.log('📅 Creating schedules...');
    await prisma.schedule.createMany({
      data: [
        {
          routeId: route1.id,
          busId: bus1.id,
          driverId: driver1.id,
          departureTime: '06:00',
          arrivalTime: '06:45',
          status: 'SCHEDULED',
          frequencyMinutes: 15
        },
        {
          routeId: route1.id,
          busId: bus1.id,
          driverId: driver1.id,
          departureTime: '06:15',
          arrivalTime: '07:00',
          status: 'SCHEDULED',
          frequencyMinutes: 15
        },
        {
          routeId: route2.id,
          busId: bus2.id,
          driverId: driver2.id,
          departureTime: '05:30',
          arrivalTime: '05:55',
          status: 'SCHEDULED',
          frequencyMinutes: 10
        }
      ]
    });

    // Create Sample Feedback
    console.log('💬 Creating sample feedback...');
    await prisma.feedback.createMany({
      data: [
        {
          routeId: route1.id,
          busId: bus1.id,
          category: 'SERVICE',
          rating: 5,
          comment: 'Excellent service, very punctual and clean bus.',
          status: 'PENDING',
          priority: 'LOW',
          contactInfo: 'John Doe - john@email.com'
        },
        {
          routeId: route2.id,
          category: 'DELAY',
          rating: 2,
          comment: 'Bus was 20 minutes late during rush hour.',
          status: 'PENDING',
          priority: 'MEDIUM',
          contactInfo: 'Sarah Smith - sarah@email.com'
        }
      ]
    });

    console.log('✅ Database initialization completed successfully!');
    console.log('\n📋 Created accounts:');
    console.log('Super Admin: superadmin@pbts.com / superadmin123');
    console.log('Admin: admin@pbts.com / admin123');
    console.log('Driver 1: abebe@pbts.com / driver123');
    console.log('Driver 2: tigist@pbts.com / driver123');
    console.log('\n🏗️ Database structure:');
    console.log('- 2 Admin accounts (encrypted passwords)');
    console.log('- 2 Driver accounts (encrypted passwords)');
    console.log('- 2 Routes with stops');
    console.log('- 2 Buses assigned to routes');
    console.log('- Sample schedules and feedback');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run initialization
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('🎉 PBTS System database is ready!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Initialization failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeDatabase };