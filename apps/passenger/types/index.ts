// Ethiopian Bus System Types for Passenger App

export interface Bus {
  id: string;
  plateNumber: string;
  busNumber: string;
  capacity: number;
  busType: 'ANBESSA' | 'SHEGER' | 'VELOCITY' | 'PRIVATE';
  status: 'ON_ROUTE' | 'DELAYED' | 'UNDER_MAINTENANCE' | 'OUT_OF_SERVICE';
  currentRouteId?: string;
  currentStopId?: string;
}

export interface Route {
  id: string;
  routeName: string;
  routeNumber: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  estimatedDuration: number; // in minutes
  farePrice: number;
  stops: Stop[];
  isActive: boolean;
}

export interface Stop {
  id: string;
  stopName: string;
  stopNameAmharic: string;
  latitude: number;
  longitude: number;
  stopOrder: number;
  estimatedArrivalTime?: string;
  landmarks?: string[];
}

export interface Schedule {
  id: string;
  routeId: string;
  busId: string;
  departureTime: string;
  arrivalTime: string;
  frequency: number; // minutes between buses
  isActive: boolean;
  weekdays: boolean;
  weekends: boolean;
}

export interface Feedback {
  id: string;
  category: 'DELAY' | 'OVERCROWDING' | 'SAFETY' | 'CLEANLINESS' | 'DRIVER_BEHAVIOR' | 'OTHER';
  message: string;
  routeId?: string;
  busId?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  submittedAt: string;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED';
}

export interface SearchFilters {
  fromLocation?: string;
  toLocation?: string;
  departureTime?: string;
  busType?: Bus['busType'];
}

export interface RouteSearchResult {
  route: Route;
  nextDepartures: Schedule[];
  estimatedArrival: string;
  currentBuses: Bus[];
}