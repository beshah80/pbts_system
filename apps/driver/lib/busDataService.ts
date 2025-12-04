import busData from '../data/addis-ababa-bus-data.json';

export interface Route {
  routeId: string;
  routeName: string;
  fleet: 'SHEGER' | 'ANBESSA' | 'VELOCITY';
  color: string;
  stops: string[];
  distance: number;
}

export interface Bus {
  busId: string;
  busNumber: string;
  fleet: 'SHEGER' | 'ANBESSA' | 'VELOCITY';
  capacity: number;
  status: 'ACTIVE' | 'MAINTENANCE' | 'OFF_DUTY';
  routeId: string | null;
}

export interface Stop {
  stopId: string;
  stopName: string;
  stopNameAmharic: string;
  latitude: number;
  longitude: number;
  type: string;
}

export interface Schedule {
  scheduleId: string;
  routeId: string;
  busId: string;
  driverId: string;
  startTime: string;
  endTime: string;
  frequency: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Shift {
  shiftId: string;
  scheduleId: string;
  driverId: string;
  routeId: string;
  routeName: string;
  busId: string;
  busNumber: string;
  startTime: string;
  endTime: string;
  date: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

class BusDataService {
  private routes: Route[] = busData.routes;
  private buses: Bus[] = busData.buses;
  private stops: Stop[] = busData.stops;

  // Generate realistic schedules for Ethiopian time slots
  private generateSchedules(): Schedule[] {
    const schedules: Schedule[] = [];
    const timeSlots = [
      { start: '05:30', end: '13:30' }, // Early morning shift
      { start: '06:00', end: '14:00' }, // Morning shift
      { start: '06:30', end: '14:30' }, // Late morning shift
      { start: '07:00', end: '15:00' }, // Mid morning shift
      { start: '13:30', end: '21:30' }, // Afternoon shift
      { start: '14:00', end: '22:00' }, // Evening shift
    ];

    this.routes.forEach((route, routeIndex) => {
      timeSlots.forEach((slot, slotIndex) => {
        const scheduleId = `SCH-${String(routeIndex * 6 + slotIndex + 1).padStart(3, '0')}`;
        const bus = this.buses.find(b => b.routeId === route.routeId && b.status === 'ACTIVE');
        
        if (bus) {
          schedules.push({
            scheduleId,
            routeId: route.routeId,
            busId: bus.busId,
            driverId: `DRV-${String(routeIndex + 1).padStart(3, '0')}`,
            startTime: slot.start,
            endTime: slot.end,
            frequency: 15 + Math.floor(Math.random() * 15), // 15-30 min frequency
            status: 'ACTIVE'
          });
        }
      });
    });

    return schedules;
  }

  // Generate realistic shifts for today
  private generateTodayShifts(driverId: string): Shift[] {
    const shifts: Shift[] = [];
    const today = new Date().toISOString().split('T')[0];
    const schedules = this.generateSchedules().filter(s => s.driverId === driverId);
    
    schedules.forEach((schedule, index) => {
      const route = this.getRouteById(schedule.routeId);
      const bus = this.getBusById(schedule.busId);
      
      if (route && bus) {
        // Create multiple shifts per schedule
        const shiftTimes = [
          { start: schedule.startTime, end: this.addHours(schedule.startTime, 4) },
          { start: this.addHours(schedule.startTime, 4.5), end: schedule.endTime }
        ];

        shiftTimes.forEach((time, timeIndex) => {
          const shiftId = `SHIFT-${schedule.scheduleId}-${timeIndex + 1}`;
          let status: Shift['status'] = 'PENDING';
          
          // Set realistic statuses based on time
          const now = new Date();
          const shiftStart = this.parseTime(time.start);
          const shiftEnd = this.parseTime(time.end);
          
          if (now > shiftEnd) {
            status = 'COMPLETED';
          } else if (now >= shiftStart && now <= shiftEnd) {
            status = 'IN_PROGRESS';
          }

          shifts.push({
            shiftId,
            scheduleId: schedule.scheduleId,
            driverId,
            routeId: route.routeId,
            routeName: route.routeName,
            busId: bus.busId,
            busNumber: bus.busNumber,
            startTime: time.start,
            endTime: time.end,
            date: today,
            status
          });
        });
      }
    });

    return shifts.slice(0, 6); // Limit to 6 shifts per day
  }

  private addHours(time: string, hours: number): string {
    const [h, m] = time.split(':').map(Number);
    const totalMinutes = h * 60 + m + hours * 60;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  }

  private parseTime(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  // Public methods
  getAllRoutes(): Route[] {
    return this.routes;
  }

  getAllBuses(): Bus[] {
    return this.buses;
  }

  getAllStops(): Stop[] {
    return this.stops;
  }

  getRouteById(routeId: string): Route | undefined {
    return this.routes.find(r => r.routeId === routeId);
  }

  getBusById(busId: string): Bus | undefined {
    return this.buses.find(b => b.busId === busId);
  }

  getStopById(stopId: string): Stop | undefined {
    return this.stops.find(s => s.stopId === stopId);
  }

  getBusesByFleet(fleet: string): Bus[] {
    return this.buses.filter(b => b.fleet === fleet);
  }

  getRoutesByFleet(fleet: string): Route[] {
    return this.routes.filter(r => r.fleet === fleet);
  }

  getDriverSchedule(driverId: string) {
    const shifts = this.generateTodayShifts(driverId);
    const totalTrips = shifts.length;
    const estimatedDuration = shifts.reduce((total, shift) => {
      const start = this.parseTime(shift.startTime);
      const end = this.parseTime(shift.endTime);
      return total + (end.getTime() - start.getTime()) / (1000 * 60); // minutes
    }, 0);

    return {
      driverId,
      date: new Date().toISOString().split('T')[0],
      shifts,
      totalTrips,
      estimatedDuration: Math.round(estimatedDuration)
    };
  }

  getFleetStatistics() {
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

    return fleetStats;
  }

  getSystemOverview() {
    const totalRoutes = this.routes.length;
    const totalBuses = this.buses.length;
    const activeBuses = this.buses.filter(b => b.status === 'ACTIVE').length;
    const totalStops = this.stops.length;
    const fleetStats = this.getFleetStatistics();

    return {
      totalRoutes,
      totalBuses,
      activeBuses,
      totalStops,
      fleetBreakdown: fleetStats,
      coverage: {
        majorHubs: this.stops.filter(s => s.type === 'major_hub').length,
        terminals: this.stops.filter(s => s.type === 'terminal').length,
        residential: this.stops.filter(s => s.type === 'residential').length
      }
    };
  }
}

export const busDataService = new BusDataService();
export default busDataService;