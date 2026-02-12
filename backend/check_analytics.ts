
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAnalytics() {
    try {
        const count = await prisma.routeAnalytics.count();
        console.log(`RouteAnalytics count: ${count}`);
        const items = await prisma.routeAnalytics.findMany({ take: 5 });
        console.log('Sample items:', items);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkAnalytics();
