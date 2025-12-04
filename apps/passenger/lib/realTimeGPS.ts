import { io, Socket } from 'socket.io-client';
import { BusPosition } from './mockBusData';

export interface RealTimeBusData {
  busId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  status: string;
  timestamp: string;
}

class RealTimeGPSService {
  private socket: Socket | null = null;
  private busUpdateCallbacks: ((buses: RealTimeBusData[]) => void)[] = [];
  private activeBuses: Map<string, RealTimeBusData> = new Map();

  constructor() {
    this.connect();
  }

  private connect() {
    // Use environment variable for GPS server URL
    const gpsServerUrl = process.env.NEXT_PUBLIC_GPS_SERVER_URL || 'http://localhost:3001';
    this.socket = io(gpsServerUrl, {
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('Connected to GPS tracking server');
    });

    this.socket.on('busLocationUpdate', (data: RealTimeBusData) => {
      this.activeBuses.set(data.busId, data);
      this.notifyBusUpdates();
    });

    this.socket.on('busStatusUpdate', (data: { busId: string; status: string }) => {
      const bus = this.activeBuses.get(data.busId);
      if (bus) {
        bus.status = data.status;
        this.notifyBusUpdates();
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from GPS tracking server');
    });
  }

  // Subscribe to bus updates
  onBusUpdate(callback: (buses: RealTimeBusData[]) => void) {
    this.busUpdateCallbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.busUpdateCallbacks.indexOf(callback);
      if (index > -1) {
        this.busUpdateCallbacks.splice(index, 1);
      }
    };
  }

  private notifyBusUpdates() {
    const buses = Array.from(this.activeBuses.values());
    this.busUpdateCallbacks.forEach(callback => callback(buses));
  }

  // Fetch buses for a specific route
  async fetchRouteBuses(routeId: string): Promise<RealTimeBusData[]> {
    try {
      const gpsServerUrl = process.env.NEXT_PUBLIC_GPS_SERVER_URL || 'http://localhost:3001';
      const response = await fetch(`${gpsServerUrl}/api/gps/route/${routeId}`);
      if (!response.ok) throw new Error('Failed to fetch route buses');
      
      const buses = await response.json();
      return buses.map((bus: any) => ({
        busId: bus.bus_id,
        latitude: bus.latitude,
        longitude: bus.longitude,
        speed: bus.speed || 0,
        heading: bus.heading || 0,
        status: bus.status,
        timestamp: bus.timestamp
      }));
    } catch (error) {
      console.error('Error fetching route buses:', error);
      return [];
    }
  }

  // Convert real-time data to BusPosition format for compatibility
  convertToBusPosition(realTimeData: RealTimeBusData[], routeStops: any[]): BusPosition[] {
    return realTimeData.map((bus, index) => {
      // Find closest stop based on coordinates
      const currentStop = this.findClosestStop(bus.latitude, bus.longitude, routeStops);
      
      return {
        id: bus.busId,
        busNumber: bus.busId,
        busType: this.determineBusType(bus.busId),
        currentStopId: currentStop?.id || 's1',
        nextStopId: this.getNextStopId(currentStop, routeStops),
        status: bus.status as any,
        occupancy: Math.floor(Math.random() * 80) + 20, // Mock occupancy
        speed: bus.speed,
        coordinates: [bus.longitude, bus.latitude],
        estimatedArrival: this.calculateETA(bus.speed),
        delay: bus.status === 'DELAYED' ? Math.floor(Math.random() * 15) + 1 : 0,
        lastUpdate: new Date(bus.timestamp).getTime(),
        direction: 'FORWARD' as const
      };
    });
  }

  private findClosestStop(lat: number, lng: number, stops: any[]) {
    let closest = stops[0];
    let minDistance = this.calculateDistance(lat, lng, closest.latitude, closest.longitude);

    for (const stop of stops) {
      const distance = this.calculateDistance(lat, lng, stop.latitude, stop.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        closest = stop;
      }
    }

    return closest;
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private determineBusType(busId: string): BusPosition['busType'] {
    if (busId.startsWith('AN')) return 'ANBESSA';
    if (busId.startsWith('SH')) return 'SHEGER';
    if (busId.startsWith('VL')) return 'VELOCITY';
    return 'PRIVATE';
  }

  private getNextStopId(currentStop: any, stops: any[]): string | undefined {
    const currentIndex = stops.findIndex(stop => stop.id === currentStop?.id);
    return currentIndex < stops.length - 1 ? stops[currentIndex + 1].id : undefined;
  }

  private calculateETA(speed: number): string {
    const now = new Date();
    const minutes = speed > 0 ? Math.floor(Math.random() * 15) + 2 : Math.floor(Math.random() * 25) + 5;
    const eta = new Date(now.getTime() + minutes * 60000);
    return eta.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const realTimeGPS = new RealTimeGPSService();