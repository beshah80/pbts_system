# Public Bus Tracking System - Complete Concepts Guide

## Table of Contents
1. [Core Web Development Concepts](#core-web-development-concepts)
2. [React & Next.js Deep Dive](#react--nextjs-deep-dive)
3. [TypeScript Fundamentals](#typescript-fundamentals)
4. [State Management Patterns](#state-management-patterns)
5. [Real-time Communication](#real-time-communication)
6. [Database Design & ORM](#database-design--orm)
7. [Mapping & Geolocation](#mapping--geolocation)
8. [Monorepo Architecture](#monorepo-architecture)
9. [API Design Patterns](#api-design-patterns)
10. [Performance & Optimization](#performance--optimization)

---

## Core Web Development Concepts

### 1. Client-Server Architecture
**What it is**: A distributed computing model where clients (browsers) request services from servers.

**In PBTS Context**:
```
Passenger App (Client) ←→ Backend API (Server) ←→ Database
Driver App (Client)    ←→ Backend API (Server) ←→ Database  
Admin App (Client)     ←→ Backend API (Server) ←→ Database
```

**Key Concepts**:
- **HTTP Protocol**: Request/Response cycle
- **REST API**: Representational State Transfer
- **JSON**: Data exchange format
- **CORS**: Cross-Origin Resource Sharing

```javascript
// Example HTTP Request
fetch('/api/routes', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

### 2. Single Page Applications (SPA)
**What it is**: Web apps that load once and dynamically update content without full page reloads.

**Benefits**:
- Faster user experience
- Reduced server load
- Better interactivity

**Implementation in Next.js**:
```tsx
// Client-side navigation without page reload
import Link from 'next/link';

function Navigation() {
  return (
    <nav>
      <Link href="/routes">Routes</Link>
      <Link href="/tracking">Tracking</Link>
    </nav>
  );
}
```

### 3. Component-Based Architecture
**What it is**: Breaking UI into reusable, independent pieces.

**Benefits**:
- Code reusability
- Easier testing
- Better maintainability

```tsx
// Reusable Button Component
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Usage
<Button onClick={handleSearch} variant="primary">
  Search Routes
</Button>
```

---

## React & Next.js Deep Dive

### 1. React Fundamentals

#### Virtual DOM
**What it is**: JavaScript representation of the real DOM for efficient updates.

**How it works**:
1. State changes trigger re-render
2. React creates new Virtual DOM tree
3. Compares with previous tree (diffing)
4. Updates only changed elements

```tsx
// State change triggers Virtual DOM update
function Counter() {
  const [count, setCount] = useState(0);
  
  // This triggers Virtual DOM reconciliation
  const increment = () => setCount(count + 1);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

#### React Hooks
**What they are**: Functions that let you use state and lifecycle features in functional components.

**Essential Hooks**:

```tsx
// useState - Local component state
const [routes, setRoutes] = useState<Route[]>([]);

// useEffect - Side effects and lifecycle
useEffect(() => {
  // Component did mount
  fetchRoutes();
  
  return () => {
    // Component will unmount (cleanup)
    cleanup();
  };
}, []); // Dependency array

// useRef - Direct DOM access
const mapRef = useRef<HTMLDivElement>(null);

// useCallback - Memoized functions
const handleSearch = useCallback((query: string) => {
  searchRoutes(query);
}, [searchRoutes]);

// useMemo - Memoized values
const expensiveValue = useMemo(() => {
  return routes.filter(route => route.isActive);
}, [routes]);
```

#### Custom Hooks
**What they are**: Reusable stateful logic extracted into functions.

```tsx
// Custom hook for API calls
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function RoutesList() {
  const { data: routes, loading, error } = useApi<Route[]>('/api/routes');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {routes?.map(route => (
        <div key={route.id}>{route.name}</div>
      ))}
    </div>
  );
}
```

### 2. Next.js App Router

#### File-based Routing
**What it is**: Automatic routing based on file structure.

```
app/
├── page.tsx          # / route
├── about/
│   └── page.tsx      # /about route
├── routes/
│   ├── page.tsx      # /routes route
│   └── [id]/
│       └── page.tsx  # /routes/[id] dynamic route
└── api/
    └── routes/
        └── route.ts  # /api/routes API endpoint
```

#### Server vs Client Components
**Server Components** (default):
- Render on server
- No JavaScript sent to client
- Can access backend resources directly

```tsx
// Server Component
async function RoutesList() {
  // This runs on the server
  const routes = await fetch('http://localhost:3005/api/routes');
  
  return (
    <div>
      {routes.map(route => (
        <div key={route.id}>{route.name}</div>
      ))}
    </div>
  );
}
```

**Client Components**:
- Render in browser
- Interactive with hooks and event handlers
- Use 'use client' directive

```tsx
'use client';

// Client Component
function InteractiveMap() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  
  return (
    <div onClick={() => setSelectedRoute(route)}>
      Interactive content
    </div>
  );
}
```

#### Data Fetching Patterns

```tsx
// Server-side data fetching
async function ServerPage() {
  const data = await fetch('http://localhost:3005/api/routes');
  return <div>{/* Render data */}</div>;
}

// Client-side data fetching
'use client';
function ClientPage() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/routes')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{/* Render data */}</div>;
}
```

---

## TypeScript Fundamentals

### 1. Type System Benefits
**What TypeScript adds**:
- Compile-time error checking
- Better IDE support (autocomplete, refactoring)
- Self-documenting code
- Easier refactoring

### 2. Essential TypeScript Concepts

#### Basic Types
```typescript
// Primitive types
let name: string = "Bus Route";
let count: number = 42;
let isActive: boolean = true;

// Arrays
let routes: string[] = ["Route 1", "Route 2"];
let numbers: Array<number> = [1, 2, 3];

// Objects
let route: {
  id: string;
  name: string;
  isActive: boolean;
} = {
  id: "1",
  name: "Route 1",
  isActive: true
};
```

#### Interfaces and Types
```typescript
// Interface - for object shapes
interface Route {
  id: string;
  routeName: string;
  startLocation: string;
  endLocation: string;
  stops: Stop[];
}

interface Stop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

// Type aliases - for unions, primitives, etc.
type Status = 'active' | 'inactive' | 'maintenance';
type RouteId = string;
type Coordinates = [number, number];

// Generic types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage
const routeResponse: ApiResponse<Route[]> = {
  data: routes,
  status: 200,
  message: "Success"
};
```

#### Function Types
```typescript
// Function type definitions
type SearchFunction = (query: string) => Promise<Route[]>;
type EventHandler = (event: MouseEvent) => void;

// Function with typed parameters and return
async function searchRoutes(
  from: string, 
  to: string
): Promise<Route[]> {
  const response = await fetch(`/api/search?from=${from}&to=${to}`);
  return response.json();
}

// Optional and default parameters
function createRoute(
  name: string,
  isActive: boolean = true,
  description?: string
): Route {
  return {
    id: generateId(),
    routeName: name,
    isActive,
    description: description || "No description"
  };
}
```

#### React Component Types
```typescript
// Props interface
interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

// Functional component with typed props
const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary' 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Hook return types
function useRoutes(): {
  routes: Route[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  // Implementation
}
```

---

## State Management Patterns

### 1. Local State (useState)
**When to use**: Component-specific data that doesn't need sharing.

```tsx
function RouteSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Route[]>([]);
  
  const handleSearch = async () => {
    const routes = await searchRoutes(query);
    setResults(routes);
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {results.map(route => (
        <div key={route.id}>{route.name}</div>
      ))}
    </div>
  );
}
```

### 2. Global State (Zustand)
**When to use**: Data shared across multiple components.

```typescript
// Store definition
interface AppState {
  // State
  user: User | null;
  routes: Route[];
  selectedRoute: Route | null;
  
  // Actions
  setUser: (user: User) => void;
  setRoutes: (routes: Route[]) => void;
  selectRoute: (route: Route) => void;
  clearSelection: () => void;
}

// Zustand store
import { create } from 'zustand';

const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  routes: [],
  selectedRoute: null,
  
  // Actions
  setUser: (user) => set({ user }),
  setRoutes: (routes) => set({ routes }),
  selectRoute: (route) => set({ selectedRoute: route }),
  clearSelection: () => set({ selectedRoute: null }),
}));

// Usage in components
function RoutesList() {
  const { routes, selectedRoute, selectRoute } = useAppStore();
  
  return (
    <div>
      {routes.map(route => (
        <div 
          key={route.id}
          className={selectedRoute?.id === route.id ? 'selected' : ''}
          onClick={() => selectRoute(route)}
        >
          {route.name}
        </div>
      ))}
    </div>
  );
}
```

### 3. Server State Management
**Concept**: Managing data from APIs separately from client state.

```tsx
// Custom hook for server state
function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoutes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/routes');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setRoutes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  return { routes, loading, error, refetch: fetchRoutes };
}

// Optimistic updates
function useRouteActions() {
  const { routes, setRoutes } = useAppStore();

  const updateRoute = async (routeId: string, updates: Partial<Route>) => {
    // Optimistic update
    const optimisticRoutes = routes.map(route =>
      route.id === routeId ? { ...route, ...updates } : route
    );
    setRoutes(optimisticRoutes);

    try {
      // API call
      await fetch(`/api/routes/${routeId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });
    } catch (error) {
      // Revert on error
      setRoutes(routes);
      throw error;
    }
  };

  return { updateRoute };
}
```

---

## Real-time Communication

### 1. WebSocket Fundamentals
**What it is**: Full-duplex communication protocol for real-time data exchange.

**Differences from HTTP**:
- HTTP: Request → Response (one-way)
- WebSocket: Bidirectional, persistent connection

### 2. Socket.io Implementation

#### Server Setup
```javascript
// backend/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:3002"],
    methods: ["GET", "POST"]
  }
});

// Connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join room for specific route updates
  socket.on('joinRoute', (routeId) => {
    socket.join(`route-${routeId}`);
    console.log(`Client joined route ${routeId}`);
  });

  // Handle bus location updates
  socket.on('updateBusLocation', (data) => {
    // Validate data
    if (!data.busId || !data.lat || !data.lng) return;

    // Save to database
    updateBusInDatabase(data);

    // Broadcast to clients tracking this route
    socket.to(`route-${data.routeId}`).emit('busLocationUpdate', {
      busId: data.busId,
      lat: data.lat,
      lng: data.lng,
      timestamp: new Date(),
      speed: data.speed || 0
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(3005, () => {
  console.log('Server running on port 3005');
});
```

#### Client Implementation
```tsx
// hooks/useRealTimeUpdates.ts
import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface BusUpdate {
  busId: string;
  lat: number;
  lng: number;
  timestamp: Date;
  speed: number;
}

export function useRealTimeUpdates(routeId?: string) {
  const [updates, setUpdates] = useState<BusUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Create socket connection
    socketRef.current = io('http://localhost:3005', {
      transports: ['websocket', 'polling']
    });

    const socket = socketRef.current;

    // Connection events
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
      
      // Join route room if specified
      if (routeId) {
        socket.emit('joinRoute', routeId);
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    // Listen for bus updates
    socket.on('busLocationUpdate', (data: BusUpdate) => {
      setUpdates(prev => {
        // Keep only last 100 updates
        const newUpdates = [...prev, data].slice(-100);
        return newUpdates;
      });
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [routeId]);

  // Function to send location update (for driver app)
  const sendLocationUpdate = (busId: string, lat: number, lng: number) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('updateBusLocation', {
        busId,
        lat,
        lng,
        routeId,
        timestamp: new Date()
      });
    }
  };

  return {
    updates,
    isConnected,
    sendLocationUpdate
  };
}
```

### 3. GPS Tracking Implementation
```tsx
// components/GPSTracker.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';

interface GPSTrackerProps {
  busId: string;
  routeId: string;
  isActive: boolean;
}

export default function GPSTracker({ busId, routeId, isActive }: GPSTrackerProps) {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { sendLocationUpdate, isConnected } = useRealTimeUpdates(routeId);

  useEffect(() => {
    if (!isActive) return;

    let watchId: number;

    // GPS options
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000
    };

    // Success callback
    const handleSuccess = (position: GeolocationPosition) => {
      setLocation(position);
      setError(null);

      // Send update to server
      sendLocationUpdate(
        busId,
        position.coords.latitude,
        position.coords.longitude
      );
    };

    // Error callback
    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
      console.error('GPS Error:', error);
    };

    // Start watching position
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        options
      );
    } else {
      setError('Geolocation not supported');
    }

    // Cleanup
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [busId, routeId, isActive, sendLocationUpdate]);

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`} />
        <span className="font-semibold">GPS Tracker</span>
      </div>
      
      {error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : location ? (
        <div className="text-sm space-y-1">
          <p>Lat: {location.coords.latitude.toFixed(6)}</p>
          <p>Lng: {location.coords.longitude.toFixed(6)}</p>
          <p>Accuracy: {location.coords.accuracy}m</p>
          <p>Speed: {location.coords.speed || 0} m/s</p>
        </div>
      ) : (
        <p className="text-gray-600 text-sm">Getting location...</p>
      )}
    </div>
  );
}
```

---

## Database Design & ORM

### 1. Relational Database Concepts

#### Entity Relationship Design
```
Routes (1) ←→ (Many) Stops
Routes (1) ←→ (Many) Buses  
Drivers (1) ←→ (Many) Buses
Routes (1) ←→ (Many) Schedules
```

#### Normalization Principles
**1NF (First Normal Form)**:
- Each column contains atomic values
- No repeating groups

**2NF (Second Normal Form)**:
- 1NF + No partial dependencies
- Non-key attributes depend on entire primary key

**3NF (Third Normal Form)**:
- 2NF + No transitive dependencies
- Non-key attributes don't depend on other non-key attributes

### 2. Prisma ORM Deep Dive

#### Schema Definition
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Route {
  id            String   @id @default(cuid())
  routeName     String
  routeNumber   String   @unique
  startLocation String
  endLocation   String
  distance      Float
  farePrice     Float
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  stops         Stop[]
  buses         Bus[]
  schedules     Schedule[]
  
  @@map("routes")
}

model Stop {
  id        String  @id @default(cuid())
  stopName  String
  latitude  Float
  longitude Float
  stopOrder Int
  
  // Foreign key
  routeId   String
  route     Route   @relation(fields: [routeId], references: [id], onDelete: Cascade)
  
  // Composite unique constraint
  @@unique([routeId, stopOrder])
  @@map("stops")
}

model Bus {
  id         String  @id @default(cuid())
  busNumber  String  @unique
  capacity   Int
  currentLat Float?
  currentLng Float?
  isActive   Boolean @default(true)
  
  // Foreign keys
  routeId    String
  route      Route   @relation(fields: [routeId], references: [id])
  
  driverId   String?
  driver     Driver? @relation(fields: [driverId], references: [id])
  
  @@map("buses")
}

model Driver {
  id            String @id @default(cuid())
  name          String
  email         String @unique
  phone         String
  licenseNumber String @unique
  
  // Relations
  buses         Bus[]
  
  @@map("drivers")
}
```

#### Prisma Client Usage
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database operations
export class RouteService {
  // Create route with stops
  static async createRoute(data: {
    routeName: string;
    routeNumber: string;
    startLocation: string;
    endLocation: string;
    stops: Array<{
      stopName: string;
      latitude: number;
      longitude: number;
      stopOrder: number;
    }>;
  }) {
    return await prisma.route.create({
      data: {
        routeName: data.routeName,
        routeNumber: data.routeNumber,
        startLocation: data.startLocation,
        endLocation: data.endLocation,
        distance: 0, // Calculate based on stops
        farePrice: 10, // Default fare
        stops: {
          create: data.stops
        }
      },
      include: {
        stops: true
      }
    });
  }

  // Get routes with related data
  static async getRoutesWithDetails() {
    return await prisma.route.findMany({
      include: {
        stops: {
          orderBy: { stopOrder: 'asc' }
        },
        buses: {
          where: { isActive: true },
          include: {
            driver: true
          }
        },
        _count: {
          select: {
            stops: true,
            buses: true
          }
        }
      }
    });
  }

  // Search routes
  static async searchRoutes(from: string, to: string) {
    return await prisma.route.findMany({
      where: {
        AND: [
          {
            stops: {
              some: {
                stopName: {
                  contains: from,
                  mode: 'insensitive'
                }
              }
            }
          },
          {
            stops: {
              some: {
                stopName: {
                  contains: to,
                  mode: 'insensitive'
                }
              }
            }
          }
        ]
      },
      include: {
        stops: true,
        buses: {
          where: { isActive: true }
        }
      }
    });
  }

  // Update bus location
  static async updateBusLocation(busId: string, lat: number, lng: number) {
    return await prisma.bus.update({
      where: { id: busId },
      data: {
        currentLat: lat,
        currentLng: lng,
        updatedAt: new Date()
      }
    });
  }
}
```

### 3. Database Migrations
```bash
# Generate migration
npx prisma migrate dev --name add_bus_tracking

# Apply migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Reset database
npx prisma migrate reset
```

---

## Mapping & Geolocation

### 1. Leaflet Integration

#### Basic Map Setup
```tsx
// components/Map.tsx
'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface MapProps {
  center: [number, number];
  zoom?: number;
  routes?: Route[];
  buses?: Bus[];
}

export default function Map({ center, zoom = 13, routes = [], buses = [] }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize map
    mapRef.current = L.map(containerRef.current).setView(center, zoom);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Cleanup on unmount
    return () => {
      mapRef.current?.remove();
    };
  }, [center, zoom]);

  // Update routes
  useEffect(() => {
    if (!mapRef.current) return;

    routes.forEach(route => {
      // Create route polyline
      const coordinates = route.stops.map(stop => [stop.latitude, stop.longitude] as [number, number]);
      
      const polyline = L.polyline(coordinates, {
        color: route.color || '#3388ff',
        weight: 4,
        opacity: 0.7
      }).addTo(mapRef.current!);

      // Add popup
      polyline.bindPopup(`
        <div>
          <h3>${route.routeName}</h3>
          <p>Route: ${route.routeNumber}</p>
          <p>Stops: ${route.stops.length}</p>
        </div>
      `);

      // Add stop markers
      route.stops.forEach(stop => {
        L.marker([stop.latitude, stop.longitude])
          .addTo(mapRef.current!)
          .bindPopup(`
            <div>
              <h4>${stop.stopName}</h4>
              <p>Stop ${stop.stopOrder}</p>
            </div>
          `);
      });
    });
  }, [routes]);

  // Update bus positions
  useEffect(() => {
    if (!mapRef.current) return;

    buses.forEach(bus => {
      if (bus.currentLat && bus.currentLng) {
        // Custom bus icon
        const busIcon = L.divIcon({
          className: 'bus-marker',
          html: `<div class="bus-icon">🚌</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        L.marker([bus.currentLat, bus.currentLng], { icon: busIcon })
          .addTo(mapRef.current!)
          .bindPopup(`
            <div>
              <h4>Bus ${bus.busNumber}</h4>
              <p>Route: ${bus.route.routeName}</p>
              <p>Driver: ${bus.driver?.name || 'Unassigned'}</p>
            </div>
          `);
      }
    });
  }, [buses]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-96 rounded-lg border"
      style={{ minHeight: '400px' }}
    />
  );
}
```

### 2. Geolocation API

#### Browser Geolocation
```typescript
// utils/geolocation.ts
export interface LocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export interface LocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export class GeolocationService {
  static async getCurrentPosition(options: LocationOptions = {}): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      const defaultOptions: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
        ...options
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        defaultOptions
      );
    });
  }

  static watchPosition(
    callback: (location: LocationResult) => void,
    errorCallback: (error: Error) => void,
    options: LocationOptions = {}
  ): number {
    if (!navigator.geolocation) {
      errorCallback(new Error('Geolocation not supported'));
      return -1;
    }

    return navigator.geolocation.watchPosition(
      (position) => {
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
      },
      (error) => {
        errorCallback(new Error(`Geolocation error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
        ...options
      }
    );
  }

  static clearWatch(watchId: number): void {
    navigator.geolocation.clearWatch(watchId);
  }
}
```

### 3. Distance Calculations
```typescript
// utils/distance.ts
export function calculateDistance(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Calculate route distance
export function calculateRouteDistance(stops: Stop[]): number {
  let totalDistance = 0;
  
  for (let i = 0; i < stops.length - 1; i++) {
    const current = stops[i];
    const next = stops[i + 1];
    
    totalDistance += calculateDistance(
      current.latitude,
      current.longitude,
      next.latitude,
      next.longitude
    );
  }
  
  return totalDistance;
}

// Find nearest stop
export function findNearestStop(
  userLat: number,
  userLng: number,
  stops: Stop[]
): Stop | null {
  if (stops.length === 0) return null;
  
  let nearestStop = stops[0];
  let minDistance = calculateDistance(userLat, userLng, stops[0].latitude, stops[0].longitude);
  
  for (let i = 1; i < stops.length; i++) {
    const distance = calculateDistance(userLat, userLng, stops[i].latitude, stops[i].longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearestStop = stops[i];
    }
  }
  
  return nearestStop;
}
```

---

## Monorepo Architecture

### 1. Workspace Management

#### Package.json Configuration
```json
{
  "name": "pbts-system",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*",
    "shared"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "start": "turbo run start",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

#### Turbo Configuration
```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "type-check": {
      "dependsOn": ["^type-check"]
    }
  }
}
```

### 2. Shared Packages

#### Shared Types
```typescript
// shared/types/index.ts
export interface Route {
  id: string;
  routeName: string;
  routeNumber: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  farePrice: number;
  isActive: boolean;
  stops: Stop[];
}

export interface Stop {
  id: string;
  stopName: string;
  latitude: number;
  longitude: number;
  stopOrder: number;
  routeId: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  capacity: number;
  currentLat?: number;
  currentLng?: number;
  isActive: boolean;
  routeId: string;
  route: Route;
  driverId?: string;
  driver?: Driver;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  error?: string;
}

// Real-time event types
export interface BusLocationUpdate {
  busId: string;
  routeId: string;
  latitude: number;
  longitude: number;
  speed?: number;
  heading?: number;
  timestamp: Date;
}
```

#### Shared Utilities
```typescript
// shared/utils/index.ts
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

export function formatDistance(kilometers: number): string {
  if (kilometers < 1) {
    return `${Math.round(kilometers * 1000)}m`;
  }
  return `${kilometers.toFixed(1)}km`;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

#### Shared API Client
```typescript
// shared/lib/api.ts
import { ApiResponse } from '../types';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3005') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  }

  // Routes API
  async getRoutes(): Promise<ApiResponse<Route[]>> {
    return this.request<Route[]>('/api/routes');
  }

  async getRoute(id: string): Promise<ApiResponse<Route>> {
    return this.request<Route>(`/api/routes/${id}`);
  }

  async searchRoutes(from: string, to: string): Promise<ApiResponse<Route[]>> {
    return this.request<Route[]>(`/api/routes/search?from=${from}&to=${to}`);
  }

  async createRoute(route: Omit<Route, 'id'>): Promise<ApiResponse<Route>> {
    return this.request<Route>('/api/routes', {
      method: 'POST',
      body: JSON.stringify(route),
    });
  }

  // Buses API
  async getBuses(): Promise<ApiResponse<Bus[]>> {
    return this.request<Bus[]>('/api/buses');
  }

  async updateBusLocation(
    busId: string, 
    lat: number, 
    lng: number
  ): Promise<ApiResponse<Bus>> {
    return this.request<Bus>(`/api/buses/${busId}/location`, {
      method: 'PATCH',
      body: JSON.stringify({ lat, lng }),
    });
  }
}

export const apiClient = new ApiClient();
```

### 3. Package Dependencies
```json
// shared/package.json
{
  "name": "@pbts/shared",
  "version": "1.0.0",
  "main": "index.ts",
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "prisma": "^5.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}

// apps/passenger/package.json
{
  "name": "@pbts/passenger",
  "dependencies": {
    "@pbts/shared": "*",
    "@pbts/ui": "*",
    "next": "15.0.0",
    "react": "^18.0.0"
  }
}
```

---

## API Design Patterns

### 1. RESTful API Design

#### Resource-based URLs
```
GET    /api/routes           # Get all routes
GET    /api/routes/:id       # Get specific route
POST   /api/routes           # Create new route
PUT    /api/routes/:id       # Update entire route
PATCH  /api/routes/:id       # Partial update
DELETE /api/routes/:id       # Delete route

GET    /api/routes/:id/stops # Get route stops
POST   /api/routes/:id/stops # Add stop to route

GET    /api/buses            # Get all buses
GET    /api/buses/:id        # Get specific bus
PATCH  /api/buses/:id/location # Update bus location
```

#### HTTP Status Codes
```typescript
// Standard HTTP status codes
const HTTP_STATUS = {
  OK: 200,                    // Success
  CREATED: 201,               // Resource created
  NO_CONTENT: 204,            // Success, no content
  BAD_REQUEST: 400,           // Client error
  UNAUTHORIZED: 401,          // Authentication required
  FORBIDDEN: 403,             // Access denied
  NOT_FOUND: 404,             // Resource not found
  CONFLICT: 409,              // Resource conflict
  INTERNAL_SERVER_ERROR: 500, // Server error
} as const;
```

### 2. Express.js API Implementation

#### Route Handlers
```javascript
// backend/routes/routes.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Middleware for validation
const validateRoute = (req, res, next) => {
  const { routeName, routeNumber, startLocation, endLocation } = req.body;
  
  if (!routeName || !routeNumber || !startLocation || !endLocation) {
    return res.status(400).json({
      status: 400,
      message: 'Missing required fields',
      error: 'routeName, routeNumber, startLocation, and endLocation are required'
    });
  }
  
  next();
};

// GET /api/routes
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;

    const where = search ? {
      OR: [
        { routeName: { contains: search, mode: 'insensitive' } },
        { routeNumber: { contains: search, mode: 'insensitive' } },
        { startLocation: { contains: search, mode: 'insensitive' } },
        { endLocation: { contains: search, mode: 'insensitive' } }
      ]
    } : {};

    const [routes, total] = await Promise.all([
      prisma.route.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          stops: {
            orderBy: { stopOrder: 'asc' }
          },
          buses: {
            where: { isActive: true }
          },
          _count: {
            select: { stops: true, buses: true }
          }
        }
      }),
      prisma.route.count({ where })
    ]);

    res.json({
      status: 200,
      message: 'Routes retrieved successfully',
      data: routes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// POST /api/routes
router.post('/', validateRoute, async (req, res) => {
  try {
    const { routeName, routeNumber, startLocation, endLocation, stops = [] } = req.body;

    // Check if route number already exists
    const existingRoute = await prisma.route.findUnique({
      where: { routeNumber }
    });

    if (existingRoute) {
      return res.status(409).json({
        status: 409,
        message: 'Route number already exists',
        error: `Route ${routeNumber} already exists`
      });
    }

    // Create route with stops
    const route = await prisma.route.create({
      data: {
        routeName,
        routeNumber,
        startLocation,
        endLocation,
        distance: 0, // Will be calculated
        farePrice: 10, // Default fare
        stops: {
          create: stops.map((stop, index) => ({
            stopName: stop.stopName,
            latitude: stop.latitude,
            longitude: stop.longitude,
            stopOrder: index + 1
          }))
        }
      },
      include: {
        stops: {
          orderBy: { stopOrder: 'asc' }
        }
      }
    });

    res.status(201).json({
      status: 201,
      message: 'Route created successfully',
      data: route
    });
  } catch (error) {
    console.error('Error creating route:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// PATCH /api/routes/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if route exists
    const existingRoute = await prisma.route.findUnique({
      where: { id }
    });

    if (!existingRoute) {
      return res.status(404).json({
        status: 404,
        message: 'Route not found',
        error: `Route with id ${id} not found`
      });
    }

    // Update route
    const updatedRoute = await prisma.route.update({
      where: { id },
      data: {
        ...updates,
        updatedAt: new Date()
      },
      include: {
        stops: {
          orderBy: { stopOrder: 'asc' }
        },
        buses: true
      }
    });

    res.json({
      status: 200,
      message: 'Route updated successfully',
      data: updatedRoute
    });
  } catch (error) {
    console.error('Error updating route:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
});

module.exports = router;
```

#### Error Handling Middleware
```javascript
// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(409).json({
      status: 409,
      message: 'Unique constraint violation',
      error: 'Resource already exists'
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      status: 404,
      message: 'Resource not found',
      error: 'The requested resource was not found'
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 400,
      message: 'Validation error',
      error: err.message
    });
  }

  // Default error
  res.status(500).json({
    status: 500,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};

module.exports = errorHandler;
```

### 3. API Client Implementation
```typescript
// lib/apiClient.ts
interface RequestConfig extends RequestInit {
  timeout?: number;
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number = 10000;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string, 
    config: RequestConfig = {}
  ): Promise<T> {
    const { timeout = this.defaultTimeout, ...requestConfig } = config;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...requestConfig,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...requestConfig.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005');
```

---

## Performance & Optimization

### 1. React Performance Optimization

#### Memoization
```tsx
import { memo, useMemo, useCallback } from 'react';

// Component memoization
const RouteCard = memo(({ route, onSelect }: RouteCardProps) => {
  return (
    <div onClick={() => onSelect(route)}>
      <h3>{route.routeName}</h3>
      <p>{route.startLocation} → {route.endLocation}</p>
    </div>
  );
});

// Value memoization
function RoutesList({ routes, searchQuery }: RoutesListProps) {
  const filteredRoutes = useMemo(() => {
    return routes.filter(route => 
      route.routeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [routes, searchQuery]);

  const handleRouteSelect = useCallback((route: Route) => {
    // Handle selection
  }, []);

  return (
    <div>
      {filteredRoutes.map(route => (
        <RouteCard 
          key={route.id} 
          route={route} 
          onSelect={handleRouteSelect}
        />
      ))}
    </div>
  );
}
```

#### Virtual Scrolling
```tsx
// For large lists
import { FixedSizeList as List } from 'react-window';

function VirtualizedRoutesList({ routes }: { routes: Route[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <RouteCard route={routes[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={routes.length}
      itemSize={100}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

### 2. Next.js Optimization

#### Code Splitting
```tsx
// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

// Route-based splitting
const AdminDashboard = dynamic(() => import('@/components/AdminDashboard'), {
  ssr: false
});
```

#### Image Optimization
```tsx
import Image from 'next/image';

function BusImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={300}
      height={200}
      priority // For above-the-fold images
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

### 3. Database Optimization

#### Query Optimization
```typescript
// Efficient queries with Prisma
class OptimizedRouteService {
  // Use select to limit fields
  static async getRoutesList() {
    return await prisma.route.findMany({
      select: {
        id: true,
        routeName: true,
        routeNumber: true,
        startLocation: true,
        endLocation: true,
        isActive: true,
        _count: {
          select: {
            stops: true,
            buses: true
          }
        }
      },
      where: {
        isActive: true
      },
      orderBy: {
        routeName: 'asc'
      }
    });
  }

  // Use pagination for large datasets
  static async getRoutesPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;
    
    const [routes, total] = await Promise.all([
      prisma.route.findMany({
        skip,
        take: limit,
        include: {
          stops: {
            select: {
              id: true,
              stopName: true,
              stopOrder: true
            },
            orderBy: { stopOrder: 'asc' }
          }
        }
      }),
      prisma.route.count()
    ]);

    return {
      routes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Use database indexes
  static async searchRoutesOptimized(query: string) {
    return await prisma.route.findMany({
      where: {
        OR: [
          { routeName: { contains: query, mode: 'insensitive' } },
          { routeNumber: { contains: query, mode: 'insensitive' } }
        ]
      },
      // Add database index on routeName and routeNumber
    });
  }
}
```

#### Caching Strategies
```typescript
// In-memory caching
class CacheService {
  private static cache = new Map<string, { data: any; expiry: number }>();

  static set(key: string, data: any, ttl: number = 300000) { // 5 minutes default
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
  }

  static get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  static clear(): void {
    this.cache.clear();
  }
}

// Usage in API routes
export async function GET(request: Request) {
  const cacheKey = 'routes:all';
  let routes = CacheService.get(cacheKey);

  if (!routes) {
    routes = await prisma.route.findMany();
    CacheService.set(cacheKey, routes, 300000); // Cache for 5 minutes
  }

  return Response.json({ data: routes });
}
```

### 4. Real-time Performance

#### Throttling Updates
```typescript
// Throttle GPS updates
function useThrottledGPS(busId: string, interval: number = 5000) {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const { sendLocationUpdate } = useRealTimeUpdates();
  
  const throttledUpdate = useCallback(
    throttle((position: GeolocationPosition) => {
      sendLocationUpdate(
        busId,
        position.coords.latitude,
        position.coords.longitude
      );
    }, interval),
    [busId, sendLocationUpdate, interval]
  );

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation(position);
        throttledUpdate(position);
      },
      (error) => console.error('GPS Error:', error),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [throttledUpdate]);

  return location;
}
```

#### Efficient State Updates
```typescript
// Batch state updates
function useBusUpdates() {
  const [buses, setBuses] = useState<Map<string, Bus>>(new Map());
  
  const updateBuses = useCallback((updates: BusLocationUpdate[]) => {
    setBuses(prevBuses => {
      const newBuses = new Map(prevBuses);
      
      updates.forEach(update => {
        const existingBus = newBuses.get(update.busId);
        if (existingBus) {
          newBuses.set(update.busId, {
            ...existingBus,
            currentLat: update.latitude,
            currentLng: update.longitude,
            lastUpdate: update.timestamp
          });
        }
      });
      
      return newBuses;
    });
  }, []);

  return { buses: Array.from(buses.values()), updateBuses };
}
```

This comprehensive guide covers all the essential concepts and implementation details for building a Public Bus Tracking System. Each section provides both theoretical understanding and practical implementation examples.