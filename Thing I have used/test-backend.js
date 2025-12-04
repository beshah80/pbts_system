// Test backend API endpoints for all dashboards
const axios = require('axios');

const BASE_URL = 'http://localhost:3005/api';

async function testAPI() {
  console.log('🧪 Testing Backend API for All Dashboards...\n');

  try {
    // Test 1: Admin Login
    console.log('1️⃣ Testing Admin Login...');
    const adminLogin = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@pbts.et',
      password: 'admin123'
    });
    console.log('✅ Admin login:', adminLogin.data.success ? 'SUCCESS' : 'FAILED');

    // Test 2: Driver Login  
    console.log('\n2️⃣ Testing Driver Login...');
    const driverLogin = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'driver@pbts.et', 
      password: 'driver123'
    });
    console.log('✅ Driver login:', driverLogin.data.success ? 'SUCCESS' : 'FAILED');

    // Test 3: Get Buses (Admin Dashboard)
    console.log('\n3️⃣ Testing Get Buses...');
    const buses = await axios.get(`${BASE_URL}/buses`);
    console.log('✅ Buses API:', buses.data ? `SUCCESS (${buses.data.length} buses)` : 'FAILED');

    // Test 4: Get Routes (All Dashboards)
    console.log('\n4️⃣ Testing Get Routes...');
    const routes = await axios.get(`${BASE_URL}/routes`);
    console.log('✅ Routes API:', routes.data ? `SUCCESS (${routes.data.length} routes)` : 'FAILED');

    // Test 5: Get Schedules (Driver Dashboard)
    console.log('\n5️⃣ Testing Get Schedules...');
    const schedules = await axios.get(`${BASE_URL}/schedules`);
    console.log('✅ Schedules API:', schedules.data ? `SUCCESS (${schedules.data.length} schedules)` : 'FAILED');

    // Test 6: Get Stops (Passenger Dashboard)
    console.log('\n6️⃣ Testing Get Stops...');
    const stops = await axios.get(`${BASE_URL}/stops`);
    console.log('✅ Stops API:', stops.data ? `SUCCESS (${stops.data.length} stops)` : 'FAILED');

    console.log('\n🎉 All API tests completed!');

  } catch (error) {
    console.log('❌ API Error:', error.response?.data?.message || error.message);
    console.log('💡 Make sure backend is running on port 3005');
  }
}

testAPI();