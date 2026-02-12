import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

// Set DATABASE_URL directly
process.env.DATABASE_URL = "mongodb+srv://beshah:hVxjRA7nRJAVWbHe@pbts.7p8na14.mongodb.net/"

async function seedAdmin() {
  const client = new MongoClient(process.env.DATABASE_URL!)
  
  try {
    await client.connect()
    const db = client.db('pbts_system')
    
    // Check if admin already exists
    const existingAdmin = await db.collection('users').findOne({ email: 'admin@pbts.com' })
    
    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    // Create admin user
    const adminUser = {
      name: 'Admin User',
      email: 'admin@pbts.com',
      password: hashedPassword,
      role: 'admin',
      status: 'active',
      createdAt: new Date()
    }

    await db.collection('users').insertOne(adminUser)
    console.log('Admin user created successfully')
    console.log('Email: admin@pbts.com')
    console.log('Password: admin123')
    
  } catch (error) {
    console.error('Error seeding admin:', error)
  } finally {
    await client.close()
  }
}

seedAdmin()