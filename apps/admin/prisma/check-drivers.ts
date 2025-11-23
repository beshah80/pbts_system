import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const drivers = await prisma.driver.findMany()
  console.log('All drivers in database:')
  drivers.forEach(driver => {
    console.log(`- ${driver.firstName} ${driver.lastName}`)
    console.log(`  License: ${driver.licenseNumber}`)
    console.log(`  Status: ${driver.status}`)
    console.log(`  ID: ${driver.id}`)
    console.log('---')
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })