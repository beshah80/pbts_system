import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const admin = await prisma.admin.create({
    data: {
      email: 'atlasAdmin@admin.com',
      password: 'my_password', // In production, hash this password
      name: 'Atlas Admin',
      role: 'SUPER_ADMIN',
      isActive: true
    }
  })

  console.log('Admin created:', admin.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })