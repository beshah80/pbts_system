// GPS Simulator - Generates realistic bus movement for testing
const axios = require('axios');

const API_BASE = 'http://localhost:3001/api/gps';

// Ethiopian bus routes with realistic coordinates
const routes = {
  'route_001': {
    name: 'Meskel Square - Piazza',
    stops: [
      { name: 'Meskel Square', lat: 9.0082, lng: 38.7635 },
      { name: 'Bole Road', lat: 9.0157, lng: 38.7614 },
      { name: 'Mexico Square', lat: 9.0234, lng: 38.7589 },
      { name: 'Kazanchis', lat: 9.0312, lng: 38.7567 },
      { name: 'Arat Kilo', lat: 9.0389, lng: 38.7545 },
      { name: 'Piazza', lat: 9.0456, lng: 38.7523 }
    ]
  }
};

// Simulate buses
const buses = [
  { id: 'ANB-001', type: 'ANBESSA', routeId: 'route_001', driverId: 'D001' },
  { id: 'SHG-002', type: 'SHEGER', routeId: 'route_001', driverId: 'D002' },
  { id: 'VL-003', type: 'VELOCITY', routeId: 'route_001', driverId: 'D003' }
];

class GPSSimulator {
  constructor() {
    this.busPositions = new Map();
    this.isRunning = false;
    this.initializeBuses();
  }

  initializeBuses() {
    buses.forEach(bus => {
      const route = routes[bus.routeId];
      const randomStopIndex = Math.floor(Math.random() * route.stops.length);
      const stop = route.stops[randomStopIndex];
      
      this.busPositions.set(bus.id, {
        ...bus,
        currentStopIndex: randomStopIndex,
        latitude: stop.lat + (Math.random() - 0.5) * 0.001,
        longitude: stop.lng + (Math.random() - 0.5) * 0.001,
        speed: 0,
        heading: Math.random() * 360,
        direction: Math.random() > 0.5 ? 1 : -1, // 1 = forward, -1 = backward
        lastUpdate: Date.now()
      });
    });
  }

  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('🚌 GPS Simulator started - Tracking', buses.length, 'buses');
    
    // Update positions every 5 seconds
    this.updateInterval = setInterval(() => {
      this.updateAllBuses();
    }, 5000);
  }

  stop() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    console.log('🛑 GPS Simulator stopped');
  }

  async updateAllBuses() {
    for (const [busId, position] of this.busPositions) {
      try {
        const newPosition = this.calculateNewPosition(position);
        this.busPositions.set(busId, newPosition);
        
        await this.sendLocationUpdate(newPosition);
        
        console.log(`📍 ${busId}: ${newPosition.latitude.toFixed(6)}, ${newPosition.longitude.toFixed(6)} - ${newPosition.speed}km/h`);
      } catch (error) {
        console.error(`❌ Failed to update ${busId}:`, error.message);
      }
    }
  }

  calculateNewPosition(currentPos) {
    const route = routes[currentPos.routeId];
    const stops = route.stops;
    
    // Simulate realistic movement
    const timeDelta = (Date.now() - currentPos.lastUpdate) / 1000; // seconds
    const maxSpeed = 40; // km/h
    const acceleration = 0.5; // km/h per second
    
    // Calculate target position (next stop)
    let targetStopIndex = currentPos.currentStopIndex + currentPos.direction;
    
    // Handle route boundaries
    if (targetStopIndex >= stops.length) {
      targetStopIndex = stops.length - 1;
      currentPos.direction = -1; // Reverse direction
    } else if (targetStopIndex < 0) {
      targetStopIndex = 0;
      currentPos.direction = 1; // Forward direction
    }
    
    const targetStop = stops[targetStopIndex];
    const currentStop = stops[currentPos.currentStopIndex];
    
    // Calculate distance to target
    const distance = this.calculateDistance(
      currentPos.latitude, currentPos.longitude,
      targetStop.lat, targetStop.lng
    );
    
    // Simulate speed changes
    let newSpeed = currentPos.speed;
    
    if (distance < 0.1) { // Close to stop
      newSpeed = Math.max(0, newSpeed - acceleration * timeDelta);
      if (newSpeed < 5) {
        // Arrived at stop
        currentPos.currentStopIndex = targetStopIndex;
        newSpeed = 0;
        
        // Stay at stop for a bit, then start moving
        setTimeout(() => {
          if (this.busPositions.has(currentPos.id)) {
            const pos = this.busPositions.get(currentPos.id);
            pos.speed = 10;
            this.busPositions.set(currentPos.id, pos);
          }
        }, 10000); // 10 second stop
      }
    } else {
      // Moving towards stop
      newSpeed = Math.min(maxSpeed, newSpeed + acceleration * timeDelta);
    }
    
    // Calculate new position
    let newLat = currentPos.latitude;\n    let newLng = currentPos.longitude;\n    \n    if (newSpeed > 0) {\n      const bearing = this.calculateBearing(\n        currentPos.latitude, currentPos.longitude,\n        targetStop.lat, targetStop.lng\n      );\n      \n      // Move towards target (simplified movement)\n      const moveDistance = (newSpeed / 3600) * timeDelta; // km\n      const deltaLat = moveDistance * Math.cos(bearing * Math.PI / 180) / 111; // Rough conversion\n      const deltaLng = moveDistance * Math.sin(bearing * Math.PI / 180) / (111 * Math.cos(currentPos.latitude * Math.PI / 180));\n      \n      newLat += deltaLat;\n      newLng += deltaLng;\n    }\n    \n    // Add some random variation for realism\n    newLat += (Math.random() - 0.5) * 0.0001;\n    newLng += (Math.random() - 0.5) * 0.0001;\n    \n    return {\n      ...currentPos,\n      latitude: newLat,\n      longitude: newLng,\n      speed: newSpeed,\n      heading: newSpeed > 0 ? this.calculateBearing(\n        currentPos.latitude, currentPos.longitude,\n        targetStop.lat, targetStop.lng\n      ) : currentPos.heading,\n      lastUpdate: Date.now()\n    };\n  }\n\n  calculateDistance(lat1, lng1, lat2, lng2) {\n    const R = 6371; // Earth's radius in km\n    const dLat = (lat2 - lat1) * Math.PI / 180;\n    const dLng = (lng2 - lng1) * Math.PI / 180;\n    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +\n              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *\n              Math.sin(dLng/2) * Math.sin(dLng/2);\n    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));\n    return R * c;\n  }\n\n  calculateBearing(lat1, lng1, lat2, lng2) {\n    const dLng = (lng2 - lng1) * Math.PI / 180;\n    const lat1Rad = lat1 * Math.PI / 180;\n    const lat2Rad = lat2 * Math.PI / 180;\n    \n    const y = Math.sin(dLng) * Math.cos(lat2Rad);\n    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);\n    \n    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;\n  }\n\n  async sendLocationUpdate(position) {\n    const payload = {\n      busId: position.id,\n      latitude: position.latitude,\n      longitude: position.longitude,\n      speed: position.speed,\n      heading: position.heading,\n      accuracy: 5,\n      routeId: position.routeId,\n      driverId: position.driverId,\n      status: position.speed === 0 ? 'STOPPED' : position.speed < 5 ? 'BOARDING' : 'ON_ROUTE'\n    };\n\n    await axios.post(`${API_BASE}/location`, payload);\n  }\n}\n\n// Run simulator\nconst simulator = new GPSSimulator();\n\n// Handle graceful shutdown\nprocess.on('SIGINT', () => {\n  console.log('\\n🛑 Shutting down GPS simulator...');\n  simulator.stop();\n  process.exit(0);\n});\n\n// Start simulation\nsimulator.start();\n\nconsole.log('🚌 GPS Simulator running. Press Ctrl+C to stop.');