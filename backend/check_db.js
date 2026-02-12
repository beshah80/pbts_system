const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const drivers = await prisma.driver.findMany();
    console.log('Drivers in DB:', JSON.stringify(drivers, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
