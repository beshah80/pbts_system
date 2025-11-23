// Real data structures for PBTS Admin System

export interface Bus {
  id: string;
  plateNumber: string;
  busNumber: string;
  type: 'ANBESSA' | 'SHEGER' | 'VELOCITY' | 'PRIVATE';
  status: 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE' | 'OUT_OF_SERVICE';
  capacity: number;
  currentPassengers: number;
  driverId?: string;
  routeId?: string;
  lastMaintenance: string;
  nextMaintenance: string;
  mileage: number;
  fuelLevel: number;
  gpsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  phoneNumber: string;
  email?: string;
  address: string;
  dateOfBirth: string;
  hireDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ON_LEAVE';
  experience: number; // years
  rating: number; // 1-5
  totalTrips: number;
  currentBusId?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  routeNumber: string;
  routeName: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  estimatedDuration: number;
  farePrice: number;
  stops: Stop[];
  isActive: boolean;
  operatingHours: {
    start: string;
    end: string;
  };
  frequency: number; // minutes between buses
  assignedBuses: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Stop {
  id: string;
  stopName: string;
  stopNameAmharic?: string;
  latitude: number;
  longitude: number;
  stopOrder: number;
  estimatedArrivalTime?: string;
}

export interface Schedule {
  id: string;
  routeId: string;
  busId: string;
  driverId: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'DELAYED';
  actualDepartureTime?: string;
  actualArrivalTime?: string;
  passengerCount?: number;
  delay?: number; // minutes
  createdAt: string;
  updatedAt: string;
}

export interface Feedback {
  id: string;
  passengerId?: string;
  routeId: string;
  busId?: string;
  driverId?: string;
  rating: number; // 1-5
  category: 'SERVICE' | 'CLEANLINESS' | 'PUNCTUALITY' | 'SAFETY' | 'DRIVER_BEHAVIOR' | 'OTHER';
  message: string;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Incident {
  id: string;
  busId: string;
  driverId: string;
  routeId?: string;
  type: 'BREAKDOWN' | 'ACCIDENT' | 'DELAY' | 'PASSENGER_ISSUE' | 'TRAFFIC' | 'WEATHER' | 'OTHER';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  status: 'REPORTED' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED';
  reportedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  photos?: string[];
  estimatedResolutionTime?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data for development
export const mockBuses: Bus[] = [
  {
    id: '1',
    plateNumber: 'AA-001-001',
    busNumber: 'ANB-001',
    type: 'ANBESSA',
    status: 'ACTIVE',
    capacity: 45,
    currentPassengers: 32,
    driverId: '1',
    routeId: '1',
    lastMaintenance: '2024-11-15',
    nextMaintenance: '2024-12-15',
    mileage: 45000,
    fuelLevel: 75,
    gpsEnabled: true,
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-11-20T14:30:00Z'
  },
  {
    id: '2',
    plateNumber: 'AA-002-002',
    busNumber: 'SHG-001',
    type: 'SHEGER',
    status: 'MAINTENANCE',
    capacity: 40,
    currentPassengers: 0,
    driverId: '2',
    lastMaintenance: '2024-11-18',
    nextMaintenance: '2024-12-18',
    mileage: 38000,
    fuelLevel: 0,
    gpsEnabled: true,
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-11-20T10:15:00Z'
  }
];

export const mockDrivers: Driver[] = [
  {
    id: '1',
    firstName: 'Alemayehu',
    lastName: 'Tadesse',
    licenseNumber: 'DL-001-2020',
    phoneNumber: '+251911234567',
    email: 'alemayehu.tadesse@pbts.et',
    address: 'Addis Ababa, Bole Sub City',
    dateOfBirth: '1985-03-15',
    hireDate: '2020-01-15',
    status: 'ACTIVE',
    experience: 8,
    rating: 4.5,
    totalTrips: 1250,
    currentBusId: '1',
    emergencyContact: {
      name: 'Meron Tadesse',
      phone: '+251911234568',
      relationship: 'Spouse'
    },
    createdAt: '2020-01-15T08:00:00Z',
    updatedAt: '2024-11-20T14:30:00Z'
  },
  {
    id: '2',
    firstName: 'Biruk',
    lastName: 'Mekonnen',
    licenseNumber: 'DL-002-2019',
    phoneNumber: '+251922345678',
    address: 'Addis Ababa, Kirkos Sub City',
    dateOfBirth: '1982-07-22',
    hireDate: '2019-06-10',
    status: 'ACTIVE',
    experience: 12,
    rating: 4.2,
    totalTrips: 1890,
    currentBusId: '2',
    emergencyContact: {
      name: 'Tigist Mekonnen',
      phone: '+251922345679',
      relationship: 'Sister'
    },
    createdAt: '2019-06-10T08:00:00Z',
    updatedAt: '2024-11-20T14:30:00Z'
  }
];

export const mockFeedback: Feedback[] = [
  {
    id: '1',
    routeId: '1',
    busId: '1',
    driverId: '1',
    rating: 4,
    category: 'SERVICE',
    message: 'Good service but bus was 10 minutes late',
    status: 'PENDING',
    priority: 'MEDIUM',
    createdAt: '2024-11-20T08:30:00Z',
    updatedAt: '2024-11-20T08:30:00Z'
  },
  {
    id: '2',
    routeId: '2',
    rating: 2,
    category: 'CLEANLINESS',
    message: 'Bus was very dirty and smelled bad',
    status: 'REVIEWED',
    priority: 'HIGH',
    adminResponse: 'We have scheduled immediate cleaning and will improve our maintenance schedule.',
    createdAt: '2024-11-19T15:45:00Z',
    updatedAt: '2024-11-20T09:15:00Z'
  }
];

export const mockIncidents: Incident[] = [
  {
    id: '1',
    busId: '2',
    driverId: '2',
    routeId: '2',
    type: 'BREAKDOWN',
    severity: 'HIGH',
    description: 'Engine overheating, bus stopped near Mercato',
    location: 'Mercato Market Area',
    coordinates: {
      latitude: 9.0307,
      longitude: 38.7468
    },
    status: 'IN_PROGRESS',
    reportedAt: '2024-11-20T10:15:00Z',
    estimatedResolutionTime: '2024-11-20T14:00:00Z',
    createdAt: '2024-11-20T10:15:00Z',
    updatedAt: '2024-11-20T12:30:00Z'
  }
];