import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const routes = await prisma.route.findMany({
    include: {
      stops: true,
      buses: true
    }
  })

  console.log('Total routes:', routes.length)
  console.log('\nRoute details:')
  
  routes.forEach((route, index) => {
    console.log(`\nRoute ${index + 1}:`)
    console.log(`  Number: ${route.routeNumber}`)
    console.log(`  Name: ${route.routeName}`)
    console.log(`  From: ${route.startLocation}`)
    console.log(`  To: ${route.endLocation}`)
    console.log(`  Status: ${route.isActive ? 'ACTIVE' : 'INACTIVE'}`)
    console.log(`  Stops: ${route.stops.length}`)
    console.log(`  Buses assigned: ${route.buses.length}`)
  })

  const activeRoutes = routes.filter(route => route.isActive)
  console.log(`\nActive routes: ${activeRoutes.length} of ${routes.length} total`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })