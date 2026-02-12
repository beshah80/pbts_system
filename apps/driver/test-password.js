const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const client = new MongoClient('mongodb+srv://beshah:hVxjRA7nRJAVWbHe@pbts.7p8na14.mongodb.net/');

async function testPassword() {
  try {
    await client.connect();
    const db = client.db('pbts_system');
    const driver = await db.collection('drivers').findOne({ employeeId: 'DRV001' });
    
    if (driver) {
      console.log('Testing password verification...');
      console.log('Stored hash:', driver.passwordHash);
      
      const isValid = await bcrypt.compare('password123', driver.passwordHash);
      console.log('Password "password123" valid:', isValid);
      
      const isInvalid = await bcrypt.compare('wrongpassword', driver.passwordHash);
      console.log('Password "wrongpassword" valid:', isInvalid);
    }
    
    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

testPassword();
