import shegerRoutes from '../../../asset/sheger_bus/routes.txt';
import shegerStops from '../../../asset/sheger_bus/stops.txt';
import shegerTrips from '../../../asset/sheger_bus/trips.txt';
import anbesaRoutes from '../../../asset/anbesa_bus/routes.txt';
import anbesaStops from '../../../asset/anbesa_bus/stops.txt';
import anbesaTrips from '../../../asset/anbesa_bus/trips.txt';

interface DatabaseRoute {
  routeId: string;
  routeName: string;
  fleet: 'SHEGER' | 'ANBESSA' | 'VELOCITY';
  color: string;
  routeType: number;
  agencyId: string;
}

interface DatabaseStop {
  stopId: string;
  stopName: string;
  stopNameAmharic?: string;
  latitude: number;
  longitude: number;
  locationType: number;
  parentStation?: string;
}

interface DatabaseTrip {
  tripId: string;
  routeId: string;
  serviceId: string;
  shapeId: string;
  directionId: number;
  tripHeadsign: string;
}

interface DatabaseBus {
  busId: string;
  busNumber: string;
  fleet: 'SHEGER' | 'ANBESSA' | 'VELOCITY';
  capacity: number;
  status: 'ACTIVE' | 'MAINTENANCE' | 'OFF_DUTY';
  routeId: string | null;
}

class DatabaseService {
  private routes: DatabaseRoute[] = [];
  private stops: DatabaseStop[] = [];
  private trips: DatabaseTrip[] = [];
  private buses: DatabaseBus[] = [];

  constructor() {
    this.loadAllData();
  }

  private async loadAllData() {
    await this.loadShegerData();
    await this.loadAnbesaData();
    this.generateBusFleet();
  }

  private async loadShegerData() {
    try {
      // Load Sheger routes
      const shegerRouteResponse = await fetch('/asset/sheger_bus/routes.txt');
      const shegerRouteText = await shegerRouteResponse.text();
      const shegerRouteLines = shegerRouteText.split('\n').slice(1);
      
      shegerRouteLines.forEach(line => {
        if (line.trim()) {
          const [routeShortName, routeId, routeType, routeLongName, agencyId, routeDesc, routeColor, routeTextColor] = line.split(',');
          this.routes.push({
            routeId: routeShortName,
            routeName: routeLongName,
            fleet: 'SHEGER',
            color: `#${routeColor}`,
            routeType: parseInt(routeType),
            agencyId
          });
        }
      });

      // Load Sheger stops
      const shegerStopResponse = await fetch('/asset/sheger_bus/stops.txt');
      const shegerStopText = await shegerStopResponse.text();
      const shegerStopLines = shegerStopText.split('\n').slice(1);
      
      shegerStopLines.forEach(line => {
        if (line.trim()) {
          const [stopName, stopLon, stopId, stopLat, parentStation, locationType] = line.split(',');
          this.stops.push({
            stopId,
            stopName,
            latitude: parseFloat(stopLat),
            longitude: parseFloat(stopLon),
            locationType: parseInt(locationType),
            parentStation
          });
        }
      });

      // Load Sheger trips
      const shegerTripResponse = await fetch('/asset/sheger_bus/trips.txt');
      const shegerTripText = await shegerTripResponse.text();
      const shegerTripLines = shegerTripText.split('\n').slice(1);
      
      shegerTripLines.forEach(line => {
        if (line.trim()) {
          const [serviceId, routeId, tripId, shapeId, directionId, tripHeadsign] = line.split(',');
          this.trips.push({
            tripId,
            routeId,
            serviceId,
            shapeId,
            directionId: parseInt(directionId),
            tripHeadsign
          });
        }
      });
    } catch (error) {
      console.error('Error loading Sheger data:', error);
    }
  }

  private async loadAnbesaData() {
    try {
      // Load Anbesa routes
      const anbesaRouteResponse = await fetch('/asset/anbesa_bus/routes.txt');
      const anbesaRouteText = await anbesaRouteResponse.text();
      const anbesaRouteLines = anbesaRouteText.split('\n').slice(1);
      
      anbesaRouteLines.forEach(line => {
        if (line.trim()) {
          const [routeId, routeShortName, routeType, agencyId, routeLongName, routeDesc, routeColor, routeTextColor] = line.split(',');
          this.routes.push({
            routeId: routeShortName,
            routeName: routeLongName,
            fleet: 'ANBESSA',
            color: `#${routeColor}`,
            routeType: parseInt(routeType),
            agencyId
          });
        }
      });

      // Load Anbesa stops
      const anbesaStopResponse = await fetch('/asset/anbesa_bus/stops.txt');
      const anbesaStopText = await anbesaStopResponse.text();
      const anbesaStopLines = anbesaStopText.split('\n').slice(1);
      
      anbesaStopLines.forEach(line => {
        if (line.trim()) {
          const [stopId, stopName, locationType, parentStation, stopLon, stopLat] = line.split(',');
          this.stops.push({
            stopId,
            stopName,
            latitude: parseFloat(stopLat),
            longitude: parseFloat(stopLon),
            locationType: parseInt(locationType),
            parentStation
          });
        }
      });

      // Load Anbesa trips
      const anbesaTripResponse = await fetch('/asset/anbesa_bus/trips.txt');
      const anbesaTripText = await anbesaTripResponse.text();
      const anbesaTripLines = anbesaTripText.split('\n').slice(1);
      
      anbesaTripLines.forEach(line => {
        if (line.trim()) {
          const [tripId, routeId, serviceId, shapeId, directionId, tripHeadsign] = line.split(',');
          this.trips.push({
            tripId,
            routeId,
            serviceId,
            shapeId,
            directionId: parseInt(directionId),
            tripHeadsign
          });
        }
      });
    } catch (error) {
      console.error('Error loading Anbesa data:', error);
    }
  }

  private generateBusFleet() {
    let busCounter = 1;
    
    // Generate buses for each route
    this.routes.forEach(route => {
      const busesPerRoute = Math.floor(Math.random() * 3) + 2; // 2-4 buses per route
      
      for (let i = 0; i < busesPerRoute; i++) {
        const fleet = route.fleet;
        const busNumber = fleet === 'SHEGER' ? `SH-${String(busCounter).padStart(3, '0')}` :
                         fleet === 'ANBESSA' ? `AB-${String(busCounter).padStart(3, '0')}` :
                         `VL-${String(busCounter).padStart(3, '0')}`;
        
        const capacity = fleet === 'VELOCITY' ? 40 : fleet === 'SHEGER' ? 45 : 50;
        const status = Math.random() > 0.1 ? 'ACTIVE' : Math.random() > 0.5 ? 'MAINTENANCE' : 'OFF_DUTY';
        
        this.buses.push({
          busId: `${fleet}-${busCounter}`,
          busNumber,
          fleet,
          capacity,
          status,
          routeId: status === 'ACTIVE' ? route.routeId : null
        });
        
        busCounter++;
      }
    });
  }

  // Public API methods
  getAllRoutes(): DatabaseRoute[] {
    return this.routes;
  }

  getAllStops(): DatabaseStop[] {
    return this.stops;
  }

  getAllTrips(): DatabaseTrip[] {
    return this.trips;
  }

  getAllBuses(): DatabaseBus[] {
    return this.buses;
  }

  getRouteById(routeId: string): DatabaseRoute | undefined {
    return this.routes.find(r => r.routeId === routeId);
  }

  getStopById(stopId: string): DatabaseStop | undefined {
    return this.stops.find(s => s.stopId === stopId);
  }

  getBusById(busId: string): DatabaseBus | undefined {
    return this.buses.find(b => b.busId === busId);
  }

  getRoutesByFleet(fleet: string): DatabaseRoute[] {
    return this.routes.filter(r => r.fleet === fleet);
  }

  getBusesByFleet(fleet: string): DatabaseBus[] {
    return this.buses.filter(b => b.fleet === fleet);
  }

  getTripsByRoute(routeId: string): DatabaseTrip[] {
    return this.trips.filter(t => t.routeId === routeId);
  }

  getStopsByName(searchTerm: string): DatabaseStop[] {
    return this.stops.filter(s => 
      s.stopName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getDriverSchedule(driverId: string) {
    const today = new Date().toISOString().split('T')[0];
    const driverRoutes = this.routes.slice(0, 3); // Assign first 3 routes to driver
    
    const shifts = driverRoutes.map((route, index) => {
      const bus = this.buses.find(b => b.routeId === route.routeId);
      const startHour = 6 + (index * 3);
      const endHour = startHour + 4;
      
      return {
        shiftId: `SHIFT-${driverId}-${index + 1}`,
        scheduleId: `SCH-${route.routeId}`,
        driverId,
        routeId: route.routeId,
        routeName: route.routeName,
        busId: bus?.busId || `BUS-${index + 1}`,
        busNumber: bus?.busNumber || `${index + 1}`,
        startTime: `${String(startHour).padStart(2, '0')}:00`,
        endTime: `${String(endHour).padStart(2, '0')}:00`,
        date: today,
        status: index === 0 ? 'IN_PROGRESS' : index === 1 ? 'PENDING' : 'COMPLETED'
      };
    });

    return {
      driverId,
      date: today,
      shifts,
      totalTrips: shifts.length,
      estimatedDuration: shifts.length * 240 // 4 hours per shift
    };
  }

  getSystemOverview() {
    const fleetStats = {
      SHEGER: { buses: 0, routes: 0, activeBuses: 0 },
      ANBESSA: { buses: 0, routes: 0, activeBuses: 0 },
      VELOCITY: { buses: 0, routes: 0, activeBuses: 0 }
    };

    this.buses.forEach(bus => {
      fleetStats[bus.fleet].buses++;
      if (bus.status === 'ACTIVE') {
        fleetStats[bus.fleet].activeBuses++;
      }
    });

    this.routes.forEach(route => {
      fleetStats[route.fleet].routes++;
    });

    return {
      totalRoutes: this.routes.length,
      totalBuses: this.buses.length,
      activeBuses: this.buses.filter(b => b.status === 'ACTIVE').length,
      totalStops: this.stops.length,
      totalTrips: this.trips.length,
      fleetBreakdown: fleetStats,
      coverage: {
        majorHubs: this.stops.filter(s => s.stopName.includes('Square') || s.stopName.includes('Terminal')).length,
        terminals: this.stops.filter(s => s.stopName.includes('Terminal')).length,
        residential: this.stops.filter(s => s.stopName.includes('Abado') || s.stopName.includes('Condominium')).length
      }
    };
  }
}

export const databaseService = new DatabaseService();
export default databaseService;