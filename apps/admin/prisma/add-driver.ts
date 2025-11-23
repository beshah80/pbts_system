import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create driver
  const driver = await prisma.driver.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      licenseNumber: 'DL-001-2020',
      phoneNumber: '+1234567890',
      email: 'john.doe@pbts.com',
      address: '123 Main St, Addis Ababa',
      dateOfBirth: new Date('1985-05-15'),
      hireDate: new Date('2020-01-15'),
      status: 'ACTIVE',
      experience: 5,
      emergencyName: 'Jane Doe',
      emergencyPhone: '+1234567891',
      emergencyRelation: 'Wife'
    }
  })

  console.log('Driver created:', driver.name, 'License:', driver.licenseNumber)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })