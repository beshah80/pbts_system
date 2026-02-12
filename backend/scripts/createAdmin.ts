import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const adminData = {
      email: 'atlas.admin@pbts.et',
      password: 'my_password',
      name: 'System Administrator',
    };

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminData.email },
    });

    if (existingAdmin) {
      // Update existing admin
      await prisma.admin.update({
        where: { id: existingAdmin.id },
        data: {
          password: hashedPassword,
          name: adminData.name,
        },
      });
      console.log('Admin user updated successfully!');
    } else {
      // Create new admin
      await prisma.admin.create({
        data: {
          email: adminData.email,
          password: hashedPassword,
          name: adminData.name,
        },
      });
      console.log('Admin user created successfully!');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
createAdminUser()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
