const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedDrivers() {
  try {
    console.log('👨‍💼 Seeding Ethiopian Drivers...\n');

    const ethiopianDrivers = [
      {
        firstName: 'Abebe',
        lastName: 'Bekele',
        licenseNumber: 'ET-DL-001-2020',
        phoneNumber: '+251911123456',
        email: 'abebe.bekele@pbts.et',
        address: 'Bole, Addis Ababa',
        dateOfBirth: new Date('1985-03-15'),
        hireDate: new Date('2020-01-15'),
        status: 'ACTIVE',
        experience: 8,
        emergencyName: 'Almaz Bekele',
        emergencyPhone: '+251911123457',
        emergencyRelation: 'Wife'
      },
      {
        firstName: 'Kebede',
        lastName: 'Tadesse',
        licenseNumber: 'ET-DL-002-2019',
        phoneNumber: '+251911234567',
        email: 'kebede.tadesse@pbts.et',
        address: 'Piazza, Addis Ababa',
        dateOfBirth: new Date('1982-07-22'),
        hireDate: new Date('2019-06-10'),
        status: 'ACTIVE',
        experience: 12,
        emergencyName: 'Hanna Tadesse',
        emergencyPhone: '+251911234568',
        emergencyRelation: 'Wife'
      },
      {
        firstName: 'Mulugeta',
        lastName: 'Haile',
        licenseNumber: 'ET-DL-003-2021',
        phoneNumber: '+251911345678',
        email: 'mulugeta.haile@pbts.et',
        address: 'Mercato, Addis Ababa',
        dateOfBirth: new Date('1988-11-08'),
        hireDate: new Date('2021-03-20'),
        status: 'ACTIVE',
        experience: 6,
        emergencyName: 'Tigist Haile',
        emergencyPhone: '+251911345679',
        emergencyRelation: 'Sister'
      },
      {
        firstName: 'Dawit',
        lastName: 'Mekonnen',
        licenseNumber: 'ET-DL-004-2018',
        phoneNumber: '+251911456789',
        email: 'dawit.mekonnen@pbts.et',
        address: 'Kazanchis, Addis Ababa',
        dateOfBirth: new Date('1980-01-12'),
        hireDate: new Date('2018-09-05'),
        status: 'ACTIVE',
        experience: 15,
        emergencyName: 'Meron Mekonnen',
        emergencyPhone: '+251911456790',
        emergencyRelation: 'Wife'
      },
      {
        firstName: 'Tesfaye',
        lastName: 'Wolde',
        licenseNumber: 'ET-DL-005-2022',
        phoneNumber: '+251911567890',
        email: 'tesfaye.wolde@pbts.et',
        address: 'Arat Kilo, Addis Ababa',
        dateOfBirth: new Date('1990-05-30'),
        hireDate: new Date('2022-01-10'),
        status: 'ACTIVE',
        experience: 4,
        emergencyName: 'Selamawit Wolde',
        emergencyPhone: '+251911567891',
        emergencyRelation: 'Wife'
      }
    ];

    let driverCount = 0;
    for (const driverData of ethiopianDrivers) {
      const driver = await prisma.driver.create({
        data: {
          ...driverData,
          employeeId: `EMP-${String(driverCount + 1).padStart(3, '0')}`
        }
      });
      
      console.log(`✅ Created driver: ${driver.firstName} ${driver.lastName} (${driver.licenseNumber})`);
      driverCount++;
    }

    console.log(`\n🎉 Successfully seeded ${driverCount} Ethiopian drivers`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedDrivers();