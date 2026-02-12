import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const client = new MongoClient("mongodb+srv://beshah:hVxjRA7nRJAVWbHe@pbts.7p8na14.mongodb.net/");

async function seedDriver() {
  try {
    await client.connect();
    const db = client.db('pbts_system');
    
    // Check if driver already exists
    const existingDriver = await db.collection('drivers').findOne({
      employeeId: 'DRV001'
    });
    
    if (existingDriver) {
      console.log('Driver DRV001 already exists');
      return;
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash('password123', 12);
    
    // Create sample driver
    const driver = {
      employeeId: 'DRV001',
      firstName: 'John',
      lastName: 'Doe',
      licenseNumber: 'DL123456',
      phoneNumber: '+251912345678',
      email: 'john.doe@pbts.com',
      passwordHash: passwordHash,
      address: 'Addis Ababa, Ethiopia',
      dateOfBirth: new Date('1990-01-15'),
      hireDate: new Date('2023-01-01'),
      status: 'ACTIVE',
      experience: 5,
      rating: 4.5,
      totalTrips: 1250,
      emergencyName: 'Jane Doe',
      emergencyPhone: '+251912345679',
      emergencyRelation: 'Spouse',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('drivers').insertOne(driver);
    console.log('Driver created successfully:', result.insertedId);
    
    console.log('\n=== Driver Login Credentials ===');
    console.log('Employee ID: DRV001');
    console.log('Password: password123');
    console.log('================================\n');
    
  } catch (error) {
    console.error('Error seeding driver:', error);
  } finally {
    await client.close();
  }
}

seedDriver();
