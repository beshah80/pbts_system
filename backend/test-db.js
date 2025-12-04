const { PrismaClient } = require('@prisma/client');

async function testDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing MongoDB Atlas connection...');
    await prisma.$connect();
    console.log('✅ Connected to MongoDB Atlas!');
    
    const userCount = await prisma.user.count();
    console.log('✅ Users in database:', userCount);
    
    const busCount = await prisma.bus.count();
    console.log('✅ Buses in database:', busCount);
    
    const routeCount = await prisma.route.count();
    console.log('✅ Routes in database:', routeCount);
    
  } catch (error) {
    console.log('❌ Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();