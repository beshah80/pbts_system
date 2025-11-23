// Shared types for PBTS system

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'DRIVER' | 'PASSENGER';
  createdAt: string;
  updatedAt: string;
}

export interface Bus {
  id: string;
  plateNumber: string;
  busNumber: string;
  capacity: number;
  busType: 'ANBESSA' | 'SHEGER' | 'VELOCITY' | 'PRIVATE';
  status: 'ACTIVE' | 'MAINTENANCE' | 'OUT_OF_SERVICE';
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
  estimatedDuration: number;
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

export interface Driver {
  id: string;
  userId: string;
  licenseNumber: string;
  phoneNumber: string;
  emergencyContact: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_DUTY' | 'OFF_DUTY';
  assignedBusId?: string;
  assignedRouteId?: string;
}

export interface Schedule {
  id: string;
  routeId: string;
  busId: string;
  driverId: string;
  departureTime: string;
  arrivalTime: string;
  frequency: number;
  isActive: boolean;
  weekdays: boolean;
  weekends: boolean;
}

export interface Incident {
  id: string;
  type: 'BREAKDOWN' | 'ACCIDENT' | 'DELAY' | 'OTHER';
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'REPORTED' | 'IN_PROGRESS' | 'RESOLVED';
  reportedBy: string;
  busId?: string;
  routeId?: string;
  location?: string;
  reportedAt: string;
  resolvedAt?: string;
}

export interface Feedback {
  id: string;
  category: 'DELAY' | 'OVERCROWDING' | 'SAFETY' | 'CLEANLINESS' | 'DRIVER_BEHAVIOR' | 'OTHER';
  message: string;
  rating: 1 | 2 | 3 | 4 | 5;
  routeId?: string;
  busId?: string;
  submittedBy?: string;
  submittedAt: string;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED';
}

export interface BusPosition {
  id: string;
  busId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: string;
  accuracy?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Search and filter types
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