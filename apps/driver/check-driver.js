const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://beshah:hVxjRA7nRJAVWbHe@pbts.7p8na14.mongodb.net/');

async function checkDriver() {
  try {
    await client.connect();
    const db = client.db('pbts_system');
    const driver = await db.collection('drivers').findOne({ employeeId: 'DRV001' });
    
    console.log('Driver found:', driver ? 'YES' : 'NO');
    if (driver) {
      console.log('Employee ID:', driver.employeeId);
      console.log('Password field:', driver.password ? 'EXISTS' : 'MISSING');
      console.log('PasswordHash field:', driver.passwordHash ? 'EXISTS' : 'MISSING');
      console.log('Status:', driver.status);
      console.log('Full driver object keys:', Object.keys(driver));
    }
    
    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkDriver();
