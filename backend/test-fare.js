const { calculateFare } = require('./calculate-fare');

console.log('🧮 Testing Ethiopian Bus Fare Calculator\n');

// Test with your Meskel Square - Bole Airport route (15.21 km)
const distance = 15.21;

console.log(`Route: Meskel Square - Bole Airport`);
console.log(`Distance: ${distance} km\n`);

console.log('Fare by bus type:');
console.log(`Mini-bus/Midi-bus: ${calculateFare(distance, 'MINI_BUS')} ETB`);
console.log(`City Bus: ${calculateFare(distance, 'CITY_BUS')} ETB`);
console.log(`City Bus Tier 2: ${calculateFare(distance, 'CITY_BUS_TIER2')} ETB`);

console.log('\nOther distance examples:');
console.log(`2 km: ${calculateFare(2, 'MINI_BUS')} ETB`);
console.log(`5 km: ${calculateFare(5, 'MINI_BUS')} ETB`);
console.log(`10 km: ${calculateFare(10, 'MINI_BUS')} ETB`);
console.log(`20 km: ${calculateFare(20, 'MINI_BUS')} ETB`);