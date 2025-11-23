
import { Bus, Route, Stop, Schedule, Driver, IncidentReport } from './types';

export const STOPS: Stop[] = [
  { id: 's1', name: 'Megenagna', lat: 9.021, lng: 38.801 },
  { id: 's2', name: 'Bole', lat: 9.006, lng: 38.799 },
  { id: 's3', name: 'Meskel Square', lat: 9.01, lng: 38.76 },
  { id: 's4', name: '4 Kilo', lat: 9.03, lng: 38.76 },
  { id: 's5', name: 'Piazza', lat: 9.035, lng: 38.75 },
  { id: 's6', name: 'Mexico Square', lat: 9.005, lng: 38.745 },
];

export const ROUTES: Route[] = [
  { id: 'r1', name: 'Route 45', start: 'Megenagna', end: '4 Kilo', stops: [STOPS[0], STOPS[1], STOPS[2], STOPS[3]], operator: 'Anbessa' },
  { id: 'r2', name: 'Route 62', start: 'Piazza', end: 'Bole', stops: [STOPS[4], STOPS[3], STOPS[1]], operator: 'Sheger' },
  { id: 'r3', name: 'Route 01', start: 'Mexico Square', end: 'Megenagna', stops: [STOPS[5], STOPS[2], STOPS[0]], operator: 'Velocity' },
];

export const BUSES: Bus[] = [
  { id: 'b1', plateNumber: 'A12345', capacity: 60, operator: 'Anbessa' },
  { id: 'b2', plateNumber: 'B67890', capacity: 70, operator: 'Sheger' },
  { id: 'b3', plateNumber: 'C11121', capacity: 50, operator: 'Velocity' },
  { id: 'b4', plateNumber: 'A54321', capacity: 60, operator: 'Anbessa' },
];

export const DRIVERS: Driver[] = [
    { id: 'd1', name: 'Abebe Kebede', licenseNumber: 'DL123', contact: '0911223344' },
    { id: 'd2', name: 'Chaltu Tadesse', licenseNumber: 'DL456', contact: '0911556677' },
];

export const SCHEDULES: Schedule[] = [
  { id: 'sch1', routeId: 'r1', busId: 'b1', driverId: 'd1', departureTime: '08:00', arrivalTime: '09:00' },
  { id: 'sch2', routeId: 'r2', busId: 'b2', driverId: 'd2', departureTime: '08:30', arrivalTime: '09:30' },
  { id: 'sch3', routeId: 'r1', busId: 'b4', driverId: 'd1', departureTime: '10:00', arrivalTime: '11:00' },
];

export const INCIDENTS: IncidentReport[] = [
    { id: 'inc1', driverId: 'd1', busId: 'b1', type: 'Traffic', description: 'Heavy traffic near Meskel Square', timestamp: new Date().toISOString() },
];
