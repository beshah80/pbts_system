import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GTFSParser } from './gtfsParser';

interface GTFSRoute {
  route_short_name: string;
  route_id: string;
  route_type: string;
  route_long_name: string;
  agency_id: string;
  route_color: string;
}

interface GTFSStop {
  stop_id: string;
  stop_name: string;
  stop_lon: string;
  stop_lat: string;
  location_type: string;
}

interface DatabaseSchedule {
  scheduleId: string;
  routeId: string;
  busId: string;
  driverId: string;
  startTime: string;
  endTime: string;
  frequency: number;
  status: 'ACTIVE' | 'INACTIVE';
}

interface DatabaseShift {
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

// API base URL
const API_BASE = 'http://localhost:3000/api/graphql';

interface ScheduleShift {
  shiftId: string;
  startTime: string;
  endTime: string;
  routeId: string;
  routeName: string;
  busId: string;
  busNumber: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

interface DailySchedule {
  scheduleId: string;
  date: string;
  shifts: ScheduleShift[];
  totalTrips: number;
  estimatedDuration: number;
}

interface ActiveTrip {
  tripId: string;
  routeId: string;
  routeName: string;
  busId: string;
  busNumber: string;
  startTime: string;
  estimatedEndTime: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
  startedAt?: string;
  completedAt?: string;
}

interface DriverStore {
  schedule: DailySchedule | null;
  activeTrip: ActiveTrip | null;
  connectionStatus: 'online' | 'offline';
  
  setSchedule: (schedule: DailySchedule) => void;
  startTrip: (shiftId: string) => void;
  endTrip: () => void;
  setConnectionStatus: (status: 'online' | 'offline') => void;
  loadDriverSchedule: (driverId: string) => Promise<void>;
  loadMockData: () => void;
  loadGTFSData: (driverId: string) => Promise<void>;
}

export const useDriverStore = create<DriverStore>()(
  persist(
    (set, get) => ({
      schedule: null,
      activeTrip: null,
      connectionStatus: 'online',
      
      setSchedule: (schedule) => set({ schedule }),
      
      startTrip: (shiftId) => {
        const { schedule } = get();
        if (!schedule) return;
        
        const shift = schedule.shifts.find(s => s.shiftId === shiftId);
        if (!shift) return;
        
        const activeTrip: ActiveTrip = {
          tripId: `trip-${Date.now()}`,
          routeId: shift.routeId,
          routeName: shift.routeName,
          busId: shift.busId,
          busNumber: shift.busNumber,
          startTime: shift.startTime,
          estimatedEndTime: shift.endTime,
          status: 'IN_PROGRESS',
          startedAt: new Date().toISOString()
        };
        
        // Update shift status
        const updatedSchedule = {
          ...schedule,
          shifts: schedule.shifts.map(s => 
            s.shiftId === shiftId ? { ...s, status: 'IN_PROGRESS' as const } : s
          )
        };
        
        set({ activeTrip, schedule: updatedSchedule });
      },
      
      endTrip: () => {
        const { activeTrip, schedule } = get();
        if (!activeTrip || !schedule) return;
        
        const completedTrip = {
          ...activeTrip,
          status: 'COMPLETED' as const,
          completedAt: new Date().toISOString()
        };
        
        // Update shift status
        const updatedSchedule = {
          ...schedule,
          shifts: schedule.shifts.map(s => 
            s.routeId === activeTrip.routeId ? { ...s, status: 'COMPLETED' as const } : s
          )
        };
        
        set({ activeTrip: null, schedule: updatedSchedule });
      },
      
      setConnectionStatus: (status) => set({ connectionStatus: status }),
      
      loadDriverSchedule: async (driverId: string) => {
        try {
          // Try to load from API first
          const query = `
            query GetDriverSchedules($driverId: ID!) {
              schedules(where: { driverId: $driverId }) {
                id
                routeId
                busId
                departureTime
                arrivalTime
                date
                status
                route {
                  id
                  routeName
                }
                bus {
                  id
                  busNumber
                }
              }
            }
          `;
          
          const response = await fetch(API_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { driverId } })
          });
          
          const { data } = await response.json();
          
          if (data?.schedules && data.schedules.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            const todaySchedules = data.schedules.filter((s: any) => s.date === today);
            
            const schedule: DailySchedule = {
              scheduleId: `sched-${driverId}-${today}`,
              date: today,
              totalTrips: todaySchedules.length,
              estimatedDuration: todaySchedules.length * 150, // 2.5 hours per trip
              shifts: todaySchedules.map((s: any) => ({
                shiftId: s.id,
                startTime: s.departureTime,
                endTime: s.arrivalTime,
                routeId: s.routeId,
                routeName: s.route.routeName,
                busId: s.busId,
                busNumber: s.bus.busNumber,
                status: s.status === 'COMPLETED' ? 'COMPLETED' : 
                       s.status === 'IN_PROGRESS' ? 'IN_PROGRESS' : 'PENDING'
              }))
            };
            
            set({ schedule });
          } else {
            // Use real GTFS data if no API data
            get().loadGTFSData(driverId);
          }
        } catch (error) {
          console.error('Failed to load driver schedule:', error);
          // Use real GTFS data as fallback
          get().loadGTFSData(driverId);
        }
      },
      
      loadMockData: () => {
        const driverId = 'DRV-001';
        get().loadGTFSData(driverId);
      },
      
      loadGTFSData: async (driverId: string) => {
        try {
          const [shegerData, anbesaData] = await Promise.all([
            GTFSParser.loadShegerData(),
            GTFSParser.loadAnbesaData()
          ]);
          
          const allRoutes = [...shegerData.routes, ...anbesaData.routes];
          const allStops = [...shegerData.stops, ...anbesaData.stops];
          
          // Generate realistic shifts from GTFS data
          const today = new Date().toISOString().split('T')[0];
          const selectedRoutes = allRoutes.slice(0, 6); // Use first 6 routes
          
          const shifts: ScheduleShift[] = selectedRoutes.map((route, index) => {
            const startHour = 6 + (index * 2);
            const endHour = startHour + 3;
            const busNumber = route.route_short_name.includes('SH') ? 
              `SH-${String(index + 1).padStart(3, '0')}` : 
              `AB-${String(index + 1).padStart(3, '0')}`;
            
            let status: ScheduleShift['status'] = 'PENDING';
            const currentHour = new Date().getHours();
            if (currentHour >= startHour && currentHour < endHour) {
              status = 'IN_PROGRESS';
            } else if (currentHour >= endHour) {
              status = 'COMPLETED';
            }
            
            return {
              shiftId: `SHIFT-${route.route_id}-${index}`,
              startTime: `${String(startHour).padStart(2, '0')}:00`,
              endTime: `${String(endHour).padStart(2, '0')}:00`,
              routeId: route.route_short_name,
              routeName: route.route_long_name,
              busId: `BUS-${route.route_id}`,
              busNumber,
              status
            };
          });
          
          const schedule: DailySchedule = {
            scheduleId: `sched-${driverId}-${today}`,
            date: today,
            totalTrips: shifts.length,
            estimatedDuration: shifts.length * 180, // 3 hours per shift
            shifts
          };
          
          set({ schedule });
        } catch (error) {
          console.error('Failed to load GTFS data:', error);
        }
      }
    }),
    {
      name: 'driver-store',
      partialize: (state) => ({ 
        schedule: state.schedule, 
        activeTrip: state.activeTrip,
        connectionStatus: state.connectionStatus
      })
    }
  )
);