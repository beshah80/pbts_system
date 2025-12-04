// MongoDB schemas for storing real Addis Ababa transit data
// This can be used to store the AddisMapTransit data in your MongoDB Atlas database

export interface AddisLocationDocument {
  _id?: string;
  locationId: string;
  name: string;
  nameAmharic?: string;
  alternativeNames?: string[];
  coordinates: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  address?: string;
  type: string;
  category: 'landmark' | 'bus_stop' | 'area' | 'junction' | 'airport' | 'marketplace' | 'other';
  isActive: boolean;
  metadata?: {
    source: string;
    accuracy: 'high' | 'medium' | 'low';
    lastVerified: Date;
    osmId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AddisRouteDocument {
  _id?: string;
  routeId: string;
  routeName: string;
  routeNameAmharic?: string;
  routeNumber: string;
  operator: 'anbessa' | 'sheger' | 'other';
  startLocation: {
    locationId: string;
    name: string;
    coordinates: [number, number];
  };
  endLocation: {
    locationId: string;
    name: string;
    coordinates: [number, number];
  };
  distance: number; // kilometers
  estimatedDuration: number; // minutes
  farePrice: number; // ETB
  isActive: boolean;
  color: string;
  operatingHours: {
    start: string; // HH:MM format
    end: string;
    days: string[]; // ['monday', 'tuesday', ...]
  };
  frequency: number; // minutes between buses
  stops: Array<{
    stopId: string;
    name: string;
    nameAmharic?: string;
    coordinates: [number, number];
    stopOrder: number;
    estimatedTime?: number; // minutes from start
    isAccessible?: boolean;
  }>;
  geometry: {
    type: 'LineString';
    coordinates: Array<[number, number]>;
  };
  metadata: {
    source: string;
    dataQuality: 'high' | 'medium' | 'low';
    lastUpdated: Date;
    officialRoute: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AddisScheduleDocument {
  _id?: string;
  scheduleId: string;
  routeId: string;
  busId?: string;
  departureTime: string; // HH:MM format
  arrivalTime: string;
  dayOfWeek: string;
  isActive: boolean;
  frequency: number; // minutes
  capacity: number;
  accessibility: {
    wheelchairAccessible: boolean;
    audioAnnouncements: boolean;
    visualAnnouncements: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AddisRealTimeDocument {
  _id?: string;
  busId: string;
  routeId: string;
  currentLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
  heading: number; // degrees
  speed: number; // km/h
  occupancy: 'empty' | 'few_seats' | 'standing_room' | 'crowded' | 'full';
  delay: number; // minutes (positive = late, negative = early)
  nextStopId?: string;
  nextStopETA?: Date;
  status: 'on_route' | 'at_stop' | 'delayed' | 'out_of_service';
  lastUpdate: Date;
  metadata: {
    gpsAccuracy: number; // meters
    dataSource: string;
    confidence: number; // 0-1
  };
}

// MongoDB collection names
export const COLLECTIONS = {
  LOCATIONS: 'addis_locations',
  ROUTES: 'addis_routes', 
  SCHEDULES: 'addis_schedules',
  REAL_TIME: 'addis_real_time',
  FEEDBACK: 'addis_feedback'
} as const;

// MongoDB indexes for optimal performance
export const INDEXES = {
  LOCATIONS: [
    { coordinates: '2dsphere' },
    { locationId: 1 },
    { name: 'text', nameAmharic: 'text' },
    { type: 1, isActive: 1 }
  ],
  ROUTES: [
    { routeId: 1 },
    { routeNumber: 1 },
    { 'startLocation.locationId': 1, 'endLocation.locationId': 1 },
    { geometry: '2dsphere' },
    { isActive: 1, operator: 1 }
  ],
  SCHEDULES: [
    { routeId: 1, dayOfWeek: 1 },
    { departureTime: 1, isActive: 1 }
  ],
  REAL_TIME: [
    { busId: 1, lastUpdate: -1 },
    { routeId: 1, status: 1 },
    { currentLocation: '2dsphere' },
    { lastUpdate: 1 } // TTL index for automatic cleanup
  ]
} as const;

// Helper functions for data migration
export function convertAddisLocationToMongo(location: any): AddisLocationDocument {
  return {
    locationId: location.id,
    name: location.name,
    nameAmharic: location.localizedNames?.am,
    alternativeNames: location.alternativeNames || [],
    coordinates: {
      type: 'Point',
      coordinates: location.coordinates
    },
    address: location.address,
    type: location.type || 'area',
    category: categorizeLocation(location.type),
    isActive: true,
    metadata: {
      source: 'AddisMapTransit',
      accuracy: 'high',
      lastVerified: new Date()
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

export function convertAddisRouteToMongo(route: any): AddisRouteDocument {
  return {
    routeId: route.id,
    routeName: route.routeName,
    routeNumber: route.routeNumber,
    operator: 'anbessa', // Default, can be updated
    startLocation: {
      locationId: route.startLocation.toLowerCase().replace(/\s+/g, '_'),
      name: route.startLocation,
      coordinates: route.stops?.[0]?.coordinates || [0, 0]
    },
    endLocation: {
      locationId: route.endLocation.toLowerCase().replace(/\s+/g, '_'),
      name: route.endLocation,
      coordinates: route.stops?.[route.stops.length - 1]?.coordinates || [0, 0]
    },
    distance: route.distance,
    estimatedDuration: route.estimatedDuration,
    farePrice: route.farePrice,
    isActive: route.isActive,
    color: route.color,
    operatingHours: route.operatingHours || { start: '05:30', end: '22:00', days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
    frequency: route.frequency || 15,
    stops: route.stops?.map((stop: any, index: number) => ({
      stopId: stop.id,
      name: stop.name,
      coordinates: stop.coordinates,
      stopOrder: stop.stopOrder || index + 1,
      estimatedTime: stop.estimatedTime,
      isAccessible: true // Default
    })) || [],
    geometry: {
      type: 'LineString',
      coordinates: route.stops?.map((stop: any) => stop.coordinates) || []
    },
    metadata: {
      source: 'AddisMapTransit',
      dataQuality: 'high',
      lastUpdated: new Date(),
      officialRoute: true
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

function categorizeLocation(type?: string): AddisLocationDocument['category'] {
  if (!type) return 'other';
  
  const typeMap: Record<string, AddisLocationDocument['category']> = {
    'landmark': 'landmark',
    'bus_stop': 'bus_stop',
    'area': 'area',
    'junction': 'junction',
    'airport': 'airport',
    'marketplace': 'marketplace',
    'amenity:marketplace': 'marketplace',
    'amenity:bus_station': 'bus_stop',
    'public_transport:stop_position': 'bus_stop',
    'public_transport:platform': 'bus_stop'
  };
  
  return typeMap[type] || 'other';
}

// Sample migration script structure
export const MIGRATION_SCRIPT = `
// MongoDB migration script to populate Addis Ababa transit data
// Run this in MongoDB shell or using a Node.js script

// 1. Create collections with proper indexes
db.createCollection("${COLLECTIONS.LOCATIONS}");
db.createCollection("${COLLECTIONS.ROUTES}");
db.createCollection("${COLLECTIONS.SCHEDULES}");
db.createCollection("${COLLECTIONS.REAL_TIME}");

// 2. Create indexes
db.${COLLECTIONS.LOCATIONS}.createIndex({ "coordinates": "2dsphere" });
db.${COLLECTIONS.LOCATIONS}.createIndex({ "locationId": 1 });
db.${COLLECTIONS.LOCATIONS}.createIndex({ "name": "text", "nameAmharic": "text" });

db.${COLLECTIONS.ROUTES}.createIndex({ "routeId": 1 });
db.${COLLECTIONS.ROUTES}.createIndex({ "geometry": "2dsphere" });
db.${COLLECTIONS.ROUTES}.createIndex({ "isActive": 1, "operator": 1 });

db.${COLLECTIONS.REAL_TIME}.createIndex({ "busId": 1, "lastUpdate": -1 });
db.${COLLECTIONS.REAL_TIME}.createIndex({ "currentLocation": "2dsphere" });
db.${COLLECTIONS.REAL_TIME}.createIndex({ "lastUpdate": 1 }, { expireAfterSeconds: 3600 }); // TTL

// 3. Insert sample data (locations and routes from AddisMapTransit)
// This would be populated from the addisMapData.ts file
`;