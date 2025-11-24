import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create second admin user
  const admin = await prisma.admin.create({
    data: {
      email: 'manager@pbts.et',
      password: 'admin123',
      name: 'System Manager',
      role: 'ADMIN',
      isActive: true
    }
  })

  console.log('Second admin created:', admin.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })