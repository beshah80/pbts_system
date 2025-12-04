const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('🚀 Setting up PBTS Database...');
    
    // Generate Prisma Client
    console.log('📦 Generating Prisma Client...');
    
    // Push schema to MongoDB Atlas
    console.log('📤 Pushing schema to MongoDB Atlas...');
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await prisma.auditLog.deleteMany();
    await prisma.feedback.deleteMany();
    await prisma.incidentReport.deleteMany();
    await prisma.tripRecord.deleteMany();
    await prisma.schedule.deleteMany();
    await prisma.driver.deleteMany();
    await prisma.user.deleteMany();

    // Create Admin Users
    console.log('👤 Creating admin users...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    const admin1 = await prisma.user.create({
      data: {
        name: 'System Administrator',
        email: 'admin@pbts.com',
        password: adminPassword,
        role: 'ADMIN',
        phone: '+251911123456'
      }
    });

    const admin2 = await prisma.user.create({
      data: {
        name: 'Transport Manager',
        email: 'manager@pbts.com',
        password: adminPassword,
        role: 'ADMIN',
        phone: '+251911654321'
      }
    });

    // Create Driver Users and Profiles
    console.log('🚗 Creating driver users...');
    const driverPassword = await bcrypt.hash('driver123', 10);
    
    const driversData = [
      {
        name: 'Abebe Kebede',
        email: 'abebe@pbts.com',
        phone: '+251911111111',
        employeeId: 'DRV001',
        licenseNo: 'ETH123456',
        experienceYears: 8,
        depot: 'Anbessa Garage'
      },
      {
        name: 'Meron Tadesse',
        email: 'meron@pbts.com',
        phone: '+251911222222',
        employeeId: 'DRV002',
        licenseNo: 'ETH234567',
        experienceYears: 5,
        depot: 'Sheger Depot'
      },
      {
        name: 'Dawit Haile',
        email: 'dawit@pbts.com',
        phone: '+251911333333',
        employeeId: 'DRV003',
        licenseNo: 'ETH345678',
        experienceYears: 12,
        depot: 'Velocity Station'
      },
      {
        name: 'Sara Mohammed',
        email: 'sara@pbts.com',
        phone: '+251911444444',
        employeeId: 'DRV004',
        licenseNo: 'ETH456789',
        experienceYears: 6,
        depot: 'Anbessa Garage'
      },
      {
        name: 'Tekle Wolde',
        email: 'tekle@pbts.com',
        phone: '+251911555555',
        employeeId: 'DRV005',
        licenseNo: 'ETH567890',
        experienceYears: 15,
        depot: 'Sheger Depot'
      }
    ];

    const createdDrivers = [];
    for (const driverData of driversData) {
      const user = await prisma.user.create({
        data: {
          name: driverData.name,
          email: driverData.email,
          password: driverPassword,
          role: 'DRIVER',
          phone: driverData.phone
        }
      });

      const driver = await prisma.driver.create({
        data: {
          userId: user.id,
          employeeId: driverData.employeeId,
          licenseNo: driverData.licenseNo,
          licenseExpiry: new Date('2025-12-31'),
          experienceYears: driverData.experienceYears,
          depot: driverData.depot
        }
      });
      
      createdDrivers.push(driver);
    }

    // Create Schedules for JSON routes
    console.log('📅 Creating schedules...');
    const schedules = [
      {
        routeId: '1:15907058', // Torhayloch → Megenagna
        dayOfWeek: 1,
        departureTime: '06:00',
        arrivalTime: '07:30',
        frequencyMinutes: 15
      },
      {
        routeId: '1:15907058',
        dayOfWeek: 2,
        departureTime: '06:00',
        arrivalTime: '07:30',
        frequencyMinutes: 15
      },
      {
        routeId: '1:15910213', // Megenagna → Kality Total
        dayOfWeek: 1,
        departureTime: '06:15',
        arrivalTime: '08:00',
        frequencyMinutes: 20
      },
      {
        routeId: '1:15910213',
        dayOfWeek: 2,
        departureTime: '06:15',
        arrivalTime: '08:00',
        frequencyMinutes: 20
      },
      {
        routeId: '1:15633036', // Total 3 kuter Mazoria → Kera
        dayOfWeek: 1,
        departureTime: '05:45',
        arrivalTime: '07:15',
        frequencyMinutes: 25
      }
    ];

    for (const schedule of schedules) {
      await prisma.schedule.create({ data: schedule });
    }

    // Create Trip Records
    console.log('🚌 Creating trip records...');
    const trips = [
      {
        routeId: '1:15907058',
        driverId: createdDrivers[0].id,
        scheduledStart: new Date('2024-01-15T06:00:00Z'),
        actualStart: new Date('2024-01-15T06:05:00Z'),
        status: 'COMPLETED'
      },
      {
        routeId: '1:15910213',
        driverId: createdDrivers[1].id,
        scheduledStart: new Date('2024-01-15T06:15:00Z'),
        actualStart: new Date('2024-01-15T06:20:00Z'),
        status: 'COMPLETED'
      },
      {
        routeId: '1:15633036',
        driverId: createdDrivers[2].id,
        scheduledStart: new Date('2024-01-15T05:45:00Z'),
        status: 'PLANNED'
      }
    ];

    const createdTrips = [];
    for (const trip of trips) {
      const createdTrip = await prisma.tripRecord.create({ data: trip });
      createdTrips.push(createdTrip);
    }

    // Create Feedback
    console.log('💬 Creating feedback...');
    const feedbacks = [
      {
        category: 'DELAY',
        routeId: '1:15907058',
        tripRecordId: createdTrips[0].id,
        comment: 'Bus was 20 minutes late this morning. Please improve punctuality.',
        rating: 2,
        contactInfo: 'passenger1@email.com',
        status: 'NEW'
      },
      {
        category: 'CLEANLINESS',
        routeId: '1:15910213',
        comment: 'Very clean bus, comfortable seats. Great service!',
        rating: 5,
        contactInfo: '+251911999999',
        status: 'CLOSED'
      },
      {
        category: 'DRIVER_BEHAVIOR',
        routeId: '1:15633036',
        comment: 'Driver was very professional and helpful',
        rating: 5,
        contactInfo: 'happy.passenger@gmail.com',
        status: 'IN_REVIEW'
      },
      {
        category: 'OVERCROWDING',
        routeId: '1:15907058',
        comment: 'Bus was too crowded during rush hour',
        rating: 2,
        contactInfo: '+251922333444',
        status: 'NEW'
      },
      {
        category: 'SAFETY',
        routeId: '1:15910213',
        comment: 'Driver was speeding, felt unsafe',
        rating: 1,
        contactInfo: 'concerned@email.com',
        status: 'NEW'
      }
    ];

    for (const feedback of feedbacks) {
      await prisma.feedback.create({ data: feedback });
    }

    // Create Incident Reports
    console.log('⚠️ Creating incident reports...');
    const incidents = [
      {
        tripRecordId: createdTrips[0].id,
        routeId: '1:15907058',
        driverId: createdDrivers[0].id,
        category: 'HEAVY_TRAFFIC',
        severity: 'Medium',
        description: 'Heavy traffic near Mexico area causing 15-minute delays',
        status: 'RESOLVED',
        resolvedAt: new Date()
      },
      {
        routeId: '1:15910213',
        driverId: createdDrivers[1].id,
        category: 'BREAKDOWN',
        severity: 'High',
        description: 'Bus breakdown at Bole Bridge, passengers transferred to next bus',
        status: 'IN_PROGRESS'
      },
      {
        routeId: '1:15633036',
        category: 'BLOCKAGE',
        severity: 'Low',
        description: 'Road construction causing minor delays on Kera route',
        status: 'OPEN'
      },
      {
        routeId: '1:15907058',
        category: 'ACCIDENT',
        severity: 'High',
        description: 'Minor accident near Stadium, no injuries reported',
        status: 'RESOLVED',
        resolvedAt: new Date()
      }
    ];

    for (const incident of incidents) {
      await prisma.incidentReport.create({ data: incident });
    }

    // Create Audit Logs
    console.log('📋 Creating audit logs...');
    const auditLogs = [
      {
        userId: admin1.id,
        action: 'CREATE_DRIVER',
        entityType: 'Driver',
        entityId: createdDrivers[0].id,
        changes: { employeeId: 'DRV001', name: 'Abebe Kebede' },
        ip: '192.168.1.100'
      },
      {
        userId: admin2.id,
        action: 'UPDATE_SCHEDULE',
        entityType: 'Schedule',
        changes: { frequencyMinutes: 15 },
        ip: '192.168.1.101'
      },
      {
        action: 'SYSTEM_INIT',
        entityType: 'System',
        changes: { message: 'Database initialized successfully' },
        ip: '127.0.0.1'
      }
    ];

    for (const log of auditLogs) {
      await prisma.auditLog.create({ data: log });
    }

    console.log('✅ Database setup completed successfully!');
    console.log('');
    console.log('📊 Created Records:');
    console.log(`   👤 Users: ${driversData.length + 2} (2 admins, ${driversData.length} drivers)`);
    console.log(`   🚗 Drivers: ${driversData.length}`);
    console.log(`   📅 Schedules: ${schedules.length}`);
    console.log(`   🚌 Trip Records: ${trips.length}`);
    console.log(`   💬 Feedback: ${feedbacks.length}`);
    console.log(`   ⚠️ Incidents: ${incidents.length}`);
    console.log(`   📋 Audit Logs: ${auditLogs.length}`);
    console.log('');
    console.log('🔑 Login Credentials:');
    console.log('   📧 admin@pbts.com / admin123 (System Admin)');
    console.log('   📧 manager@pbts.com / admin123 (Transport Manager)');
    console.log('   📧 abebe@pbts.com / driver123 (Driver)');
    console.log('   📧 meron@pbts.com / driver123 (Driver)');
    console.log('');
    console.log('🎉 PBTS System is ready to use!');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();