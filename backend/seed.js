const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@pbts.com' },
    update: {},
    create: {
      email: 'admin@pbts.com',
      password: adminPassword,
      name: 'System Administrator',
    },
  });

  // Create sample driver
  const driverPassword = await bcrypt.hash('driver123', 10);
  const driver = await prisma.driver.upsert({
    where: { employeeId: 'DL-001-2020' },
    update: {},
    create: {
      employeeId: 'DL-001-2020',
      firstName: 'Alemayehu',
      lastName: 'Tadesse',
      licenseNumber: 'DL-001-2020',
      phoneNumber: '+251911234567',
      email: 'alemayehu.t@pbts.com',
      password: driverPassword,
      address: 'Addis Ababa, Ethiopia',
      dateOfBirth: new Date('1985-01-15'),
      hireDate: new Date('2020-01-01'),
      emergencyName: 'Tigist',
      emergencyPhone: '+251911654321',
      emergencyRelation: 'Wife',
    },
  });

  // Create another sample driver (original sample)
  await prisma.driver.upsert({
    where: { employeeId: 'DRV001' },
    update: {},
    create: {
      employeeId: 'DRV001',
      firstName: 'John',
      lastName: 'Doe',
      licenseNumber: 'LIC001',
      phoneNumber: '+251911123456',
      email: 'john.doe@pbts.com',
      password: driverPassword,
      address: 'Addis Ababa, Ethiopia',
      dateOfBirth: new Date('1985-01-15'),
      hireDate: new Date('2020-01-01'),
      emergencyName: 'Jane Doe',
      emergencyPhone: '+251911654321',
      emergencyRelation: 'Wife',
    },
  });

  // Create sample bus
  const bus = await prisma.bus.upsert({
    where: { plateNumber: 'AA-001-001' },
    update: {},
    create: {
      plateNumber: 'AA-001-001',
      busNumber: 'BUS001',
      fleetNumber: 'FL001',
      busType: 'ANBESSA',
      capacity: 50,
      standingCapacity: 20,
      driverId: driver.id,
    },
  });

  console.log('Database seeded successfully!');
  console.log('Admin:', { email: 'admin@pbts.com', password: 'admin123' });
  console.log('Driver 1:', { employeeId: 'DL-001-2020', password: 'driver123' });
  console.log('Driver 2:', { employeeId: 'DRV001', password: 'driver123' });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });