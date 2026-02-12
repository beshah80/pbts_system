
process.env.DATABASE_URL = "mongodb+srv://beshah_db_user:6NloIT22NcVgiX51@pbts.lg8dv0i.mongodb.net/pbts_system?retryWrites=true&w=majority&appName=pbts";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearAnalytics() {
    try {
        console.log('Connecting to database...');
        const deleted = await prisma.routeAnalytics.deleteMany({});
        console.log(`Deleted ${deleted.count} records from RouteAnalytics.`);
    } catch (e) {
        console.error('Error clearing analytics:', e);
    } finally {
        await prisma.$disconnect();
        console.log('Done.');
    }
}

clearAnalytics();
