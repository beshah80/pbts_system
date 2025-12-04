// Shared constants across all dashboards
export const BUS_TYPES = {
  ANBESSA: 'ANBESSA',
  SHEGER: 'SHEGER', 
  VELOCITY: 'VELOCITY',
  PRIVATE: 'PRIVATE'
} as const;

export const BUS_STATUS = {
  ACTIVE: 'ACTIVE',
  MAINTENANCE: 'MAINTENANCE',
  OUT_OF_SERVICE: 'OUT_OF_SERVICE'
} as const;

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  DRIVER: 'DRIVER',
  PASSENGER: 'PASSENGER'
} as const;

export const INCIDENT_TYPES = {
  BREAKDOWN: 'BREAKDOWN',
  ACCIDENT: 'ACCIDENT',
  DELAY: 'DELAY',
  OTHER: 'OTHER'
} as const;

export const INCIDENT_SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
} as const;

export const FEEDBACK_CATEGORIES = {
  DELAY: 'DELAY',
  OVERCROWDING: 'OVERCROWDING',
  SAFETY: 'SAFETY',
  CLEANLINESS: 'CLEANLINESS',
  DRIVER_BEHAVIOR: 'DRIVER_BEHAVIOR',
  OTHER: 'OTHER'
} as const;

export const API_ENDPOINTS = {
  BUSES: '/buses',
  ROUTES: '/routes',
  DRIVERS: '/drivers',
  SCHEDULES: '/schedules',
  INCIDENTS: '/incidents',
  FEEDBACK: '/feedback',
  GPS: '/gps'
} as const;