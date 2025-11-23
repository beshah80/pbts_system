export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface Route {
  id:string;
  name: string;
  start: string;
  end: string;
  stops: Stop[];
  operator: 'Anbessa' | 'Sheger' | 'Velocity';
}
export type NewRoute = Omit<Route, 'id'>;


export interface Bus {
  id: string;
  plateNumber: string;
  capacity: number;
  operator: 'Anbessa' | 'Sheger' | 'Velocity';
}
export type NewBus = Omit<Bus, 'id'>;

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  contact: string;
}
export type NewDriver = Omit<Driver, 'id'>;

export interface Schedule {
  id: string;
  routeId: string;
  busId: string;
  driverId: string;
  departureTime: string;
  arrivalTime: string;
}
export type NewSchedule = Omit<Schedule, 'id'>;

export interface IncidentReport {
    id: string;
    driverId: string;
    busId: string;
    type: 'Traffic' | 'Breakdown' | 'Blockage' | 'Other';
    description: string;
    timestamp: string;
}
export type NewIncidentReport = Omit<IncidentReport, 'id'>;


export interface Feedback {
    id: string;
    passengerName: string;
    routeId: string;
    comment: string;
    type: 'Complaint' | 'Suggestion';
    timestamp: string;
}
export type NewFeedback = Omit<Feedback, 'id'>;


export enum UserRole {
  PASSENGER = 'PASSENGER',
  ADMIN = 'ADMIN',
  DRIVER = 'DRIVER',
}