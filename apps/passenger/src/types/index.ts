// Enums
export enum Role {
  PASSENGER = 'PASSENGER',
  ADMINISTRATOR = 'ADMINISTRATOR',
  DRIVER = 'DRIVER'
}

export enum FeedbackCategory {
  COMPLIMENT = 'COMPLIMENT',
  COMPLAINT = 'COMPLAINT',
  SUGGESTION = 'SUGGESTION',
  BUG_REPORT = 'BUG_REPORT'
}

export enum FeedbackStatus {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum DriverStatus {
  AVAILABLE = 'AVAILABLE',
  ON_DUTY = 'ON_DUTY',
  OFF_DUTY = 'OFF_DUTY',
  BREAK = 'BREAK'
}

export enum BusStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
  RETIRED = 'RETIRED'
}

export enum IncidentType {
  BREAKDOWN = 'BREAKDOWN',
  ACCIDENT = 'ACCIDENT',
  DELAY = 'DELAY',
  SAFETY = 'SAFETY',
  OTHER = 'OTHER'
}

export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum IncidentStatus {
  REPORTED = 'REPORTED',
  INVESTIGATING = 'INVESTIGATING',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum ScheduleStatus {
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum TripStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum Operator {
  ANBESSA = 'ANBESSA',
  SHEGER = 'SHEGER',
  VELOCITY = 'VELOCITY'
}

// Base User Interface
export interface User {
  userId: string;
  username: string;
  passwordHash: string;
  email: string;
  phoneNumber: string;
  role: Role;
  createdAt: Date;
  lastLogin: Date;
}

// Passenger Interface
export interface Passenger extends User {
  role: Role.PASSENGER;
  savedRoutes?: string[];
  feedbackHistory?: string[];
}

// Administrator Interface
export interface Administrator extends User {
  role: Role.ADMINISTRATOR;
  department: string;
  accessLevel: number;
}

// Driver Interface
export interface Driver extends User {
  role: Role.DRIVER;
  licenseNumber: string;
  driverName: string;
  assignedBusId: string;
  status: DriverStatus;
}

// Feedback Interface
export interface Feedback {
  feedbackId: string;
  category: FeedbackCategory;
  description: string;
  rating: number;
  submittedAt: Date;
  status: FeedbackStatus;
  userId: string;
  routeId?: string;
}

// Route Interface
export interface Route {
  routeId: string;
  routeName: string;
  estimatedDuration: number;
  totalDistance: number;
  isActive: boolean;
  stops: BusStop[];
}

// Bus Interface
export interface Bus {
  busId: string;
  plateNumber: string;
  capacity: number;
  manufacturer: string;
  yearOfManufacture: number;
  operator: Operator;
  status: BusStatus;
  lastMaintenanceDate: Date;
  currentDriverId?: string;
}

// Schedule Interface
export interface Schedule {
  scheduleId: string;
  scheduledDepartureTime: Date;
  scheduledArrivalTime: Date;
  status: ScheduleStatus;
  createdAt: Date;
  routeId: string;
  busId: string;
  driverId?: string;
}

// Trip Interface
export interface Trip {
  tripId: string;
  actualDepartureTime?: Date;
  actualArrivalTime?: Date;
  distanceCovered: number;
  delayMinutes: number;
  status: TripStatus;
  scheduleId: string;
  currentStopId?: string;
}

// Incident Interface
export interface Incident {
  incidentId: string;
  incidentType: IncidentType;
  severity: Severity;
  location: string;
  description: string;
  reportedAt: Date;
  status: IncidentStatus;
  reportedBy: string;
  assignedTo?: string;
  resolutionNotes?: string;
}

// Terminal Interface
export interface Terminal {
  terminalId: string;
  terminalName: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  operatingHours: string;
}

// BusStop Interface
export interface BusStop {
  stopId: string;
  stopName: string;
  latitude: number;
  longitude: number;
  hasShelter: boolean;
  hasSeating: boolean;
  routes: string[];
}

// API Response Types
export interface LoginResponse {
  token: string;
  user: User;
  expiresAt: Date;
}

export interface RouteSearchResult {
  routes: Route[];
  estimatedTime: number;
  distance: number;
}

// Form Data Types
export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}