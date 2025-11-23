import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
          
          if (data?.schedules) {
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
          }
        } catch (error) {
          console.error('Failed to load driver schedule:', error);
          // Fallback to mock data if API fails
          get().loadMockData();
        }
      },
      
      loadMockData: () => {
        const mockSchedule: DailySchedule = {
          scheduleId: 'sched-001',
          date: new Date().toISOString().split('T')[0],
          totalTrips: 3,
          estimatedDuration: 480,
          shifts: [
            {
              shiftId: 'shift-001',
              startTime: '06:00',
              endTime: '08:30',
              routeId: 'route-001',
              routeName: 'Meskel Square - Bole Airport',
              busId: 'bus-001',
              busNumber: 'ANB-001',
              status: 'PENDING'
            },
            {
              shiftId: 'shift-002',
              startTime: '09:00',
              endTime: '11:30',
              routeId: 'route-002',
              routeName: 'Mercato - Piazza',
              busId: 'bus-001',
              busNumber: 'ANB-001',
              status: 'PENDING'
            },
            {
              shiftId: 'shift-003',
              startTime: '14:00',
              endTime: '16:30',
              routeId: 'route-001',
              routeName: 'Bole Airport - Meskel Square',
              busId: 'bus-001',
              busNumber: 'ANB-001',
              status: 'PENDING'
            }
          ]
        };
        
        set({ schedule: mockSchedule });
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