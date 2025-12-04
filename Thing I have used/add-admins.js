const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function addAdmins() {
  try {
    // Add admin@pbts.et
    await prisma.user.upsert({
      where: { email: 'admin@pbts.et' },
      update: {},
      create: {
        email: 'admin@pbts.et',
        password: bcrypt.hashSync('admin123', 10),
        name: 'System Administrator',
        role: 'ADMIN'
      }
    });
    console.log('✅ Added admin@pbts.et');

    // Add atlasAdmin@admin.com
    await prisma.user.upsert({
      where: { email: 'atlasAdmin@admin.com' },
      update: {},
      create: {
        email: 'atlasAdmin@admin.com',
        password: bcrypt.hashSync('my_password', 10),
        name: 'Atlas Administrator',
        role: 'ADMIN'
      }
    });
    console.log('✅ Added atlasAdmin@admin.com');

    console.log('\n🎉 Both admin users created successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

addAdmins();