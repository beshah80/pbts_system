// Real Ethiopian bus fare calculation based on official rates

function calculateFare(distanceKm, busType = 'CITY_BUS') {
  const distance = parseFloat(distanceKm);
  
  if (busType === 'MINI_BUS' || busType === 'MIDI_BUS' || busType === 'ANBESSA' || busType === 'SHEGER') {
    // Mini-buses and midi-buses fare structure
    if (distance <= 2.5) return 4.5;
    if (distance <= 5) return 8.5;
    if (distance <= 7.5) return 13;
    if (distance <= 10) return 17;
    if (distance <= 12.5) return 21.5;
    if (distance <= 15) return 25.5;
    if (distance <= 17.5) return 30;
    if (distance <= 20) return 34;
    if (distance <= 22.5) return 38.5;
    if (distance <= 25) return 43;
    if (distance <= 27.5) return 47;
    if (distance <= 30) return 51.5;
    return 51.5; // Max fare for mini/midi buses
  }
  
  if (busType === 'CITY_BUS' || busType === 'VELOCITY') {
    // City buses fare structure
    if (distance <= 8) return 7;
    if (distance <= 12) return 11;
    if (distance <= 16) return 14;
    if (distance <= 20) return 18;
    if (distance <= 24) return 22;
    if (distance <= 28) return 25;
    return 25; // Max fare for city buses
  }
  
  if (busType === 'CITY_BUS_TIER2') {
    // City Buses - Second tier rates
    if (distance <= 12) return 10;
    if (distance <= 23) return 15;
    if (distance <= 30) return 20;
    if (distance <= 40) return 25;
    if (distance <= 45) return 30;
    return 30; // Max fare for tier 2
  }
  
  // Default to mini-bus rates
  return calculateFare(distance, 'MINI_BUS');
}

module.exports = { calculateFare };