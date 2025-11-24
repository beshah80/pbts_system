import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const buses = await prisma.bus.findMany({
    include: {
      driver: true,
      route: true
    }
  })

  console.log('Total buses:', buses.length)
  console.log('\nBus details:')
  
  buses.forEach((bus, index) => {
    console.log(`\nBus ${index + 1}:`)
    console.log(`  Plate: ${bus.plateNumber}`)
    console.log(`  Number: ${bus.busNumber}`)
    console.log(`  Type: ${bus.busType}`)
    console.log(`  Status: ${bus.status}`)
    console.log(`  Driver: ${bus.driver?.firstName} ${bus.driver?.lastName}`)
    console.log(`  Route: ${bus.route?.routeName || 'No route assigned'}`)
  })

  const activeBuses = buses.filter(bus => bus.status === 'ACTIVE')
  console.log(`\nActive buses: ${activeBuses.length} of ${buses.length} total`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })