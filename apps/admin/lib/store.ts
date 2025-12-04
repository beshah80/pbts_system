import { create } from 'zustand';
import { Bus, Driver, Route, Feedback, Incident, Schedule } from './data';

interface AdminStore {
  // Data
  buses: Bus[];
  drivers: Driver[];
  routes: Route[];
  feedback: Feedback[];
  incidents: Incident[];
  schedules: Schedule[];
  
  // Loading states
  loading: {
    buses: boolean;
    drivers: boolean;
    routes: boolean;
    feedback: boolean;
    incidents: boolean;
    schedules: boolean;
  };
  
  // Actions
  setBuses: (buses: Bus[]) => void;
  setDrivers: (drivers: Driver[]) => void;
  setRoutes: (routes: Route[]) => void;
  setFeedback: (feedback: Feedback[]) => void;
  setIncidents: (incidents: Incident[]) => void;
  setSchedules: (schedules: Schedule[]) => void;
  
  // Load data from database
  loadBuses: () => Promise<void>;
  loadDrivers: () => Promise<void>;
  loadRoutes: () => Promise<void>;
  loadFeedback: () => Promise<void>;
  loadIncidents: () => Promise<void>;
  loadSchedules: () => Promise<void>;
  loadAllData: () => Promise<void>;
  
  addBus: (bus: Bus) => void;
  updateBus: (id: string, updates: Partial<Bus>) => void;
  deleteBus: (id: string) => void;
  
  addDriver: (driver: Driver) => void;
  updateDriver: (id: string, updates: Partial<Driver>) => void;
  deleteDriver: (id: string) => void;
  
  addRoute: (route: Route) => void;
  updateRoute: (id: string, updates: Partial<Route>) => void;
  deleteRoute: (id: string) => void;
  
  addSchedule: (schedule: Schedule) => void;
  updateSchedule: (id: string, updates: Partial<Schedule>) => void;
  deleteSchedule: (id: string) => void;
  
  addIncident: (incident: Incident) => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
  deleteIncident: (id: string) => void;
  
  updateFeedback: (id: string, updates: Partial<Feedback>) => void;
  
  setLoading: (entity: keyof AdminStore['loading'], loading: boolean) => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  // Initial empty data - will be loaded from database
  buses: [],
  drivers: [],
  routes: [],
  feedback: [],
  incidents: [],
  schedules: [],
  
  loading: {
    buses: false,
    drivers: false,
    routes: false,
    feedback: false,
    incidents: false,
    schedules: false
  },
  
  // Actions
  setBuses: (buses) => set({ buses }),
  setDrivers: (drivers) => set({ drivers }),
  setRoutes: (routes) => set({ routes }),
  setFeedback: (feedback) => set({ feedback }),
  setIncidents: (incidents) => set({ incidents }),
  setSchedules: (schedules) => set({ schedules }),
  
  addBus: async (bus) => {
    try {
      const response = await fetch('http://localhost:3005/api/buses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bus)
      });
      
      if (response.ok) {
        const newBus = await response.json();
        set((state) => ({ buses: [...state.buses, newBus] }));
      }
    } catch (error) {
      console.error('Failed to add bus:', error);
    }
  },
  
  updateBus: async (id, updates) => {
    try {
      const response = await fetch('/api/buses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      });
      
      if (response.ok) {
        const updatedBus = await response.json();
        set((state) => ({
          buses: state.buses.map(bus => 
            bus.id === id ? updatedBus : bus
          )
        }));
      }
    } catch (error) {
      console.error('Failed to update bus:', error);
    }
  },
  
  deleteBus: async (id) => {
    try {
      const response = await fetch(`/api/buses?id=${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        set((state) => ({
          buses: state.buses.filter(bus => bus.id !== id)
        }));
      }
    } catch (error) {
      console.error('Failed to delete bus:', error);
    }
  },
  
  addDriver: (driver) => set((state) => ({ drivers: [...state.drivers, driver] })),
  updateDriver: (id, updates) => set((state) => ({
    drivers: state.drivers.map(driver => 
      driver.id === id ? { ...driver, ...updates, updatedAt: new Date().toISOString() } : driver
    )
  })),
  deleteDriver: (id) => set((state) => ({
    drivers: state.drivers.filter(driver => driver.id !== id)
  })),
  
  addRoute: (route) => set((state) => ({ routes: [...state.routes, route] })),
  updateRoute: (id, updates) => set((state) => ({
    routes: state.routes.map(route => 
      route.id === id ? { ...route, ...updates, updatedAt: new Date().toISOString() } : route
    )
  })),
  deleteRoute: (id) => set((state) => ({
    routes: state.routes.filter(route => route.id !== id)
  })),
  
  addSchedule: (schedule) => set((state) => ({ schedules: [...state.schedules, schedule] })),
  updateSchedule: (id, updates) => set((state) => ({
    schedules: state.schedules.map(schedule => 
      schedule.id === id ? { ...schedule, ...updates, updatedAt: new Date().toISOString() } : schedule
    )
  })),
  deleteSchedule: (id) => set((state) => ({
    schedules: state.schedules.filter(schedule => schedule.id !== id)
  })),
  
  addIncident: (incident) => set((state) => ({ incidents: [...state.incidents, incident] })),
  updateIncident: (id, updates) => set((state) => ({
    incidents: state.incidents.map(incident => 
      incident.id === id ? { ...incident, ...updates, updatedAt: new Date().toISOString() } : incident
    )
  })),
  deleteIncident: (id) => set((state) => ({
    incidents: state.incidents.filter(incident => incident.id !== id)
  })),
  
  updateFeedback: (id, updates) => set((state) => ({
    feedback: state.feedback.map(item => 
      item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
    )
  })),
  
  setLoading: (entity, loading) => set((state) => ({
    loading: { ...state.loading, [entity]: loading }
  })),
  
  // Load data from database
  loadBuses: async () => {
    set((state) => ({ loading: { ...state.loading, buses: true } }));
    try {
      const response = await fetch('http://localhost:3005/api/buses');
      if (response.ok) {
        const buses = await response.json();
        set({ buses });
      }
    } catch (error) {
      console.error('Failed to load buses:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, buses: false } }));
    }
  },
  
  loadDrivers: async () => {
    set((state) => ({ loading: { ...state.loading, drivers: true } }));
    try {
      const response = await fetch('http://localhost:3005/api/drivers');
      if (response.ok) {
        const drivers = await response.json();
        set({ drivers });
      }
    } catch (error) {
      console.error('Failed to load drivers:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, drivers: false } }));
    }
  },
  
  loadRoutes: async () => {
    set((state) => ({ loading: { ...state.loading, routes: true } }));
    try {
      const response = await fetch('http://localhost:3005/api/routes');
      if (response.ok) {
        const routes = await response.json();
        set({ routes });
      }
    } catch (error) {
      console.error('Failed to load routes:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, routes: false } }));
    }
  },
  
  loadFeedback: async () => {
    set((state) => ({ loading: { ...state.loading, feedback: true } }));
    try {
      const response = await fetch('http://localhost:3005/api/feedback');
      if (response.ok) {
        const feedback = await response.json();
        set({ feedback });
      }
    } catch (error) {
      console.error('Failed to load feedback:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, feedback: false } }));
    }
  },
  
  loadIncidents: async () => {
    set((state) => ({ loading: { ...state.loading, incidents: true } }));
    try {
      const response = await fetch('http://localhost:3005/api/incidents');
      if (response.ok) {
        const incidents = await response.json();
        set({ incidents });
      }
    } catch (error) {
      console.error('Failed to load incidents:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, incidents: false } }));
    }
  },
  
  loadSchedules: async () => {
    set((state) => ({ loading: { ...state.loading, schedules: true } }));
    try {
      const response = await fetch('http://localhost:3005/api/schedules');
      if (response.ok) {
        const schedules = await response.json();
        set({ schedules });
      }
    } catch (error) {
      console.error('Failed to load schedules:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, schedules: false } }));
    }
  },
  
  loadAllData: async () => {
    const { loadBuses, loadDrivers, loadRoutes, loadFeedback, loadIncidents, loadSchedules } = get();
    await Promise.all([
      loadBuses(),
      loadDrivers(),
      loadRoutes(),
      loadFeedback(),
      loadIncidents(),
      loadSchedules()
    ]);
  }
}));