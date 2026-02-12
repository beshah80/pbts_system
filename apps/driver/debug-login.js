const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const client = new MongoClient('mongodb+srv://beshah:hVxjRA7nRJAVWbHe@pbts.7p8na14.mongodb.net/');

async function debugLogin() {
  try {
    await client.connect();
    const db = client.db('pbts_system');
    
    console.log('=== DEBUG LOGIN ===');
    
    // Test 1: Find driver
    const driver = await db.collection('drivers').findOne({ employeeId: 'DRV001' });
    console.log('1. Driver found:', !!driver);
    
    if (!driver) {
      console.log('ERROR: Driver not found in database');
      return;
    }
    
    console.log('2. Driver details:');
    console.log('   - Employee ID:', driver.employeeId);
    console.log('   - Status:', driver.status);
    console.log('   - Has passwordHash:', !!driver.passwordHash);
    
    // Test 2: Password verification
    const testPassword = 'password123';
    const isValid = await bcrypt.compare(testPassword, driver.passwordHash);
    console.log('3. Password verification:');
    console.log('   - Test password:', testPassword);
    console.log('   - Is valid:', isValid);
    
    // Test 3: Simulate API logic
    console.log('4. API Logic Simulation:');
    console.log('   - Username provided: DRV001');
    console.log('   - Password provided: password123');
    console.log('   - Driver found: true');
    console.log('   - Password valid: ' + isValid);
    console.log('   - Driver status: ' + driver.status);
    console.log('   - Status check: ' + (driver.status === 'ACTIVE' ? 'PASS' : 'FAIL'));
    
    await client.close();
  } catch (error) {
    console.error('Debug error:', error);
  }
}

debugLogin();
