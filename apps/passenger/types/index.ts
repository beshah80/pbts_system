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

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phone: string;
}

export interface Route {
  id: string;
  name: string;
  start: string;
  end: string;
  operator: string;
  stops: Stop[];
  // Legacy fields for compatibility
  routeName?: string;
  startLocation?: string;
  endLocation?: string;
  distance?: number;
  estimatedDuration?: number;
  farePrice?: number;
  isActive?: boolean;
}

export interface Stop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  // Legacy fields
  stopName?: string;
  stopNameAmharic?: string;
  stopOrder?: number;
}

export interface Schedule {
  id: string;
  routeId: string;
  busId: string;
  driverId: string;
  departureTime: string;
  arrivalTime: string;
  // Legacy fields
  frequency?: number;
  isActive?: boolean;
  weekdays?: boolean;
  weekends?: boolean;
}

export interface NewFeedback {
  passengerName: string;
  routeId: string;
  comment: string;
  type: string;
  timestamp: string;
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
  nextDepartures: { departureTime: string; busId: number; }[];
  estimatedArrival: string;
  currentBuses: { id: number; busNumber: string; status: string; latitude?: number; longitude?: number; }[];
}