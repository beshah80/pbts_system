const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addDriver() {
  try {
    const driver = await prisma.driver.create({
      data: {
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
        emergencyRelation: 'Wife',
        employeeId: 'EMP-001'
      }
    });
    
    console.log('✅ Driver created:', driver.firstName, driver.lastName);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

addDriver();