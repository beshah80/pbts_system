const { MongoClient } = require('mongodb');

// Use the same connection string as the API
const client = new MongoClient('mongodb+srv://beshah:hVxjRA7nRJAVWbHe@pbts.7p8na14.mongodb.net/');

async function checkCorrectDB() {
  try {
    await client.connect();
    const db = client.db('pbts_system');
    
    console.log('=== CHECKING CORRECT DATABASE ===');
    console.log('Database:', db.databaseName);
    
    // Check if drivers collection exists
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Check for driver
    const driver = await db.collection('drivers').findOne({ employeeId: 'DRV001' });
    console.log('Driver DRV001 found:', !!driver);
    
    if (!driver) {
      console.log('Driver not found! Need to seed the driver in this database.');
      console.log('Running seed script...');
      
      const bcrypt = require('bcryptjs');
      const passwordHash = await bcrypt.hash('password123', 12);
      
      const newDriver = {
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
      
      const result = await db.collection('drivers').insertOne(newDriver);
      console.log('Driver created successfully:', result.insertedId);
      console.log('\n=== Driver Login Credentials ===');
      console.log('Employee ID: DRV001');
      console.log('Password: password123');
      console.log('================================\n');
    } else {
      console.log('Driver found in correct database');
      console.log('Driver status:', driver.status);
      console.log('Has passwordHash:', !!driver.passwordHash);
    }
    
    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkCorrectDB();
