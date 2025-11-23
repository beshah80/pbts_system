import { create } from 'zustand';
import { apolloClient } from './apollo-client';
import { GET_BUSES, GET_DRIVERS, GET_ROUTES, GET_SCHEDULES, GET_FEEDBACK, GET_INCIDENTS } from './graphql/queries';
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
  
  addBus: (bus) => set((state) => ({ buses: [...state.buses, bus] })),
  updateBus: (id, updates) => set((state) => ({
    buses: state.buses.map(bus => 
      bus.id === id ? { ...bus, ...updates, updatedAt: new Date().toISOString() } : bus
    )
  })),
  deleteBus: (id) => set((state) => ({
    buses: state.buses.filter(bus => bus.id !== id)
  })),
  
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
      const { data } = await apolloClient.query({ query: GET_BUSES, fetchPolicy: 'network-only' });
      set({ buses: data.buses || [] });
    } catch (error) {
      console.error('Failed to load buses:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, buses: false } }));
    }
  },
  
  loadDrivers: async () => {
    set((state) => ({ loading: { ...state.loading, drivers: true } }));
    try {
      const { data } = await apolloClient.query({ query: GET_DRIVERS, fetchPolicy: 'network-only' });
      set({ drivers: data.drivers || [] });
    } catch (error) {
      console.error('Failed to load drivers:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, drivers: false } }));
    }
  },
  
  loadRoutes: async () => {
    set((state) => ({ loading: { ...state.loading, routes: true } }));
    try {
      const { data } = await apolloClient.query({ query: GET_ROUTES, fetchPolicy: 'network-only' });
      set({ routes: data.routes || [] });
    } catch (error) {
      console.error('Failed to load routes:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, routes: false } }));
    }
  },
  
  loadFeedback: async () => {
    set((state) => ({ loading: { ...state.loading, feedback: true } }));
    try {
      const { data } = await apolloClient.query({ query: GET_FEEDBACK, fetchPolicy: 'network-only' });
      set({ feedback: data.feedback || [] });
    } catch (error) {
      console.error('Failed to load feedback:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, feedback: false } }));
    }
  },
  
  loadIncidents: async () => {
    set((state) => ({ loading: { ...state.loading, incidents: true } }));
    try {
      const { data } = await apolloClient.query({ query: GET_INCIDENTS, fetchPolicy: 'network-only' });
      set({ incidents: data.incidents || [] });
    } catch (error) {
      console.error('Failed to load incidents:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, incidents: false } }));
    }
  },
  
  loadSchedules: async () => {
    set((state) => ({ loading: { ...state.loading, schedules: true } }));
    try {
      const { data } = await apolloClient.query({ query: GET_SCHEDULES, fetchPolicy: 'network-only' });
      set({ schedules: data.schedules || [] });
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