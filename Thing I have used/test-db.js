// Test MongoDB Atlas connection
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing MongoDB Atlas connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Connected to MongoDB Atlas successfully!');
    
    // Test creating a simple record
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
        role: 'ADMIN'
      }
    });
    console.log('✅ Created test user:', testUser.name);
    
    // Test reading records
    const users = await prisma.user.findMany();
    console.log('✅ Found', users.length, 'users in database');
    
    // Clean up test data
    await prisma.user.delete({
      where: { id: testUser.id }
    });
    console.log('✅ Cleaned up test data');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();