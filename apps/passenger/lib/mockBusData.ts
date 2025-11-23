// Mock bus data generator for realistic testing
import { Route, Stop } from '@/types';

export interface BusPosition {
  id: string;
  busNumber: string;
  busType: 'ANBESSA' | 'SHEGER' | 'VELOCITY' | 'PRIVATE';
  currentStopId: string;
  nextStopId?: string;
  status: 'ON_ROUTE' | 'DELAYED' | 'STOPPED' | 'BOARDING';
  occupancy: number;
  speed: number;
  coordinates: [number, number];
  estimatedArrival: string;
  delay: number;
  lastUpdate: number;
  direction: 'FORWARD' | 'BACKWARD';
}

// Generate realistic bus positions for a route
export function generateMockBuses(route: Route, count: number = 3): BusPosition[] {
  const buses: BusPosition[] = [];
  const busTypes: BusPosition['busType'][] = ['ANBESSA', 'SHEGER', 'VELOCITY', 'PRIVATE'];
  const statuses: BusPosition['status'][] = ['ON_ROUTE', 'DELAYED', 'STOPPED', 'BOARDING'];
  
  for (let i = 0; i < count; i++) {
    const stopIndex = Math.floor(Math.random() * route.stops.length);
    const currentStop = route.stops[stopIndex];
    const nextStop = stopIndex < route.stops.length - 1 ? route.stops[stopIndex + 1] : null;
    
    // Add some randomness to coordinates to simulate movement
    const coordOffset = 0.001; // Small offset for realistic positioning
    const coordinates: [number, number] = [
      currentStop.longitude + (Math.random() - 0.5) * coordOffset,
      currentStop.latitude + (Math.random() - 0.5) * coordOffset
    ];
    
    const busType = busTypes[Math.floor(Math.random() * busTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const occupancy = Math.floor(Math.random() * 80) + 20; // 20-100%
    const speed = status === 'STOPPED' || status === 'BOARDING' ? 0 : Math.floor(Math.random() * 40) + 10;
    const delay = status === 'DELAYED' ? Math.floor(Math.random() * 15) + 1 : 0;
    
    // Generate realistic bus numbers based on type
    let busNumber: string;
    switch (busType) {
      case 'ANBESSA':
        busNumber = `AN-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
        break;
      case 'SHEGER':
        busNumber = `SH-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
        break;
      case 'VELOCITY':
        busNumber = `VL-${String(Math.floor(Math.random() * 99) + 1).padStart(2, '0')}`;
        break;
      case 'PRIVATE':
        busNumber = `PV-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
        break;
    }
    
    // Calculate estimated arrival time
    const now = new Date();
    const arrivalMinutes = Math.floor(Math.random() * 20) + 2; // 2-22 minutes
    const estimatedArrival = new Date(now.getTime() + arrivalMinutes * 60000)
      .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    buses.push({
      id: `bus_${i + 1}`,
      busNumber,
      busType,
      currentStopId: currentStop.id,
      nextStopId: nextStop?.id,
      status,
      occupancy,
      speed,
      coordinates,
      estimatedArrival,
      delay,
      lastUpdate: Date.now() - Math.floor(Math.random() * 30000), // Last updated within 30 seconds
      direction: Math.random() > 0.5 ? 'FORWARD' : 'BACKWARD'
    });
  }
  
  return buses;
}

// Generate a sample route with realistic Ethiopian locations
export function generateSampleRoute(): Route {
  const stops: Stop[] = [
    {
      id: 's1',
      stopName: 'Meskel Square',
      stopNameAmharic: 'መስቀል አደባባይ',
      latitude: 9.0082,
      longitude: 38.7635,
      stopOrder: 1,
      estimatedArrivalTime: '08:15',
      landmarks: ['Red Terror Martyrs Memorial', 'Meskel Square Monument']
    },
    {
      id: 's2',
      stopName: 'Bole Road',
      stopNameAmharic: 'ቦሌ መንገድ',
      latitude: 9.0157,
      longitude: 38.7614,
      stopOrder: 2,
      estimatedArrivalTime: '08:22',
      landmarks: ['Bole Medhanialem Church', 'Edna Mall']
    },
    {
      id: 's3',
      stopName: 'Mexico Square',
      stopNameAmharic: 'ሜክሲኮ አደባባይ',
      latitude: 9.0234,
      longitude: 38.7589,
      stopOrder: 3,
      estimatedArrivalTime: '08:28',
      landmarks: ['Mexico Square', 'Friendship Business Center']
    },
    {
      id: 's4',
      stopName: 'Kazanchis',
      stopNameAmharic: 'ካዛንቺስ',
      latitude: 9.0312,
      longitude: 38.7567,
      stopOrder: 4,
      estimatedArrivalTime: '08:35',
      landmarks: ['Kazanchis Business Center', 'ECA Conference Center']
    },
    {
      id: 's5',
      stopName: 'Arat Kilo',
      stopNameAmharic: 'አራት ኪሎ',
      latitude: 9.0389,
      longitude: 38.7545,
      stopOrder: 5,
      estimatedArrivalTime: '08:42',
      landmarks: ['Addis Ababa University', 'National Palace']
    },
    {
      id: 's6',
      stopName: 'Piazza',
      stopNameAmharic: 'ፒያሳ',
      latitude: 9.0456,
      longitude: 38.7523,
      stopOrder: 6,
      estimatedArrivalTime: '08:48',
      landmarks: ['St. George Cathedral', 'Taitu Hotel']
    }
  ];

  return {
    id: 'route_001',
    routeName: 'Meskel Square - Piazza',
    routeNumber: '01',
    startLocation: 'Meskel Square',
    endLocation: 'Piazza',
    distance: 12.5,
    estimatedDuration: 35,
    farePrice: 5.50,
    stops,
    isActive: true
  };
}

// Generate traffic data for realistic simulation
export function generateTrafficData() {
  return {
    segments: [
      { from: 's1', to: 's2', condition: 'light', delay: 0 },
      { from: 's2', to: 's3', condition: 'moderate', delay: 2 },
      { from: 's3', to: 's4', condition: 'heavy', delay: 5 },
      { from: 's4', to: 's5', condition: 'light', delay: 1 },
      { from: 's5', to: 's6', condition: 'moderate', delay: 3 }
    ],
    lastUpdate: new Date().toISOString()
  };
}