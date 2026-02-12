
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkAnalytics() {
    try {
        const count = await prisma.routeAnalytics.count();
        console.log(`RouteAnalytics count: ${count}`);
        if (count > 0) {
            const items = await prisma.routeAnalytics.findMany({ take: 5 });
            console.log('Sample items:', JSON.stringify(items, null, 2));
        } else {
            console.log('No analytics data found.');
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkAnalytics();
