const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create Admin Users
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

  // Create Driver Users and Driver Records
  const driverPassword = await bcrypt.hash('driver123', 10);
  
  const drivers = [
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
    }
  ];

  for (const driverData of drivers) {
    const user = await prisma.user.create({
      data: {
        name: driverData.name,
        email: driverData.email,
        password: driverPassword,
        role: 'DRIVER',
        phone: driverData.phone
      }
    });

    await prisma.driver.create({
      data: {
        userId: user.id,
        employeeId: driverData.employeeId,
        licenseNo: driverData.licenseNo,
        licenseExpiry: new Date('2025-12-31'),
        experienceYears: driverData.experienceYears,
        depot: driverData.depot
      }
    });
  }

  // Create Sample Schedules (using JSON route IDs)
  await prisma.schedule.create({
    data: {
      routeId: '1:15907058', // Torhayloch → Megenagna
      dayOfWeek: 1, // Monday
      departureTime: '06:00',
      arrivalTime: '07:30',
      frequencyMinutes: 15
    }
  });

  await prisma.schedule.create({
    data: {
      routeId: '1:15910213', // Megenagna → Kality Total
      dayOfWeek: 1, // Monday
      departureTime: '06:15',
      arrivalTime: '08:00',
      frequencyMinutes: 20
    }
  });

  // Create Sample Feedback
  await prisma.feedback.create({
    data: {
      category: 'DELAY',
      routeId: '1:15907058',
      comment: 'Bus was 20 minutes late this morning',
      rating: 2,
      contactInfo: 'passenger@email.com',
      status: 'NEW'
    }
  });

  await prisma.feedback.create({
    data: {
      category: 'CLEANLINESS',
      routeId: '1:15910213',
      comment: 'Very clean bus, good service',
      rating: 5,
      contactInfo: '+251911999999',
      status: 'CLOSED'
    }
  });

  // Create Sample Incident Reports
  await prisma.incidentReport.create({
    data: {
      routeId: '1:15907058',
      category: 'HEAVY_TRAFFIC',
      severity: 'Medium',
      description: 'Heavy traffic near Mexico area causing delays',
      status: 'RESOLVED',
      resolvedAt: new Date()
    }
  });

  await prisma.incidentReport.create({
    data: {
      routeId: '1:15910213',
      category: 'BREAKDOWN',
      severity: 'High',
      description: 'Bus breakdown at Bole Bridge, passengers transferred',
      status: 'IN_PROGRESS'
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log('📊 Created:');
  console.log('   - 2 Admin users');
  console.log('   - 3 Driver users with profiles');
  console.log('   - 2 Sample schedules');
  console.log('   - 2 Sample feedback entries');
  console.log('   - 2 Sample incident reports');
  console.log('');
  console.log('🔑 Login credentials:');
  console.log('   Admin: admin@pbts.com / admin123');
  console.log('   Manager: manager@pbts.com / admin123');
  console.log('   Driver: abebe@pbts.com / driver123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });