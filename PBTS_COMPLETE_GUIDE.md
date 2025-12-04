# Public Bus Tracking System (PBTS) - Complete Development Guide

## Project Overview
A real-time public bus tracking system with three main applications: Passenger, Driver, and Admin dashboards. Built using modern web technologies with real-time GPS tracking capabilities.

## Architecture

### Monorepo Structure
```
pbts_system/
├── apps/
│   ├── passenger/     # Next.js app for passengers
│   ├── driver/        # Next.js app for drivers  
│   └── admin/         # Next.js app for administrators
├── backend/           # Node.js/Express API server
├── shared/            # Shared components and utilities
└── packages/          # Reusable packages
```

## Core Technologies

### Frontend Stack
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Leaflet** - Interactive maps
- **Socket.io Client** - Real-time updates
- **Lucide React** - Icons

### Backend Stack
- **Node.js/Express** - API server
- **Prisma** - Database ORM
- **Socket.io** - Real-time communication
- **MongoDB/PostgreSQL** - Database

### Development Tools
- **Turbo** - Monorepo build system
- **ESLint** - Code linting
- **Concurrently** - Run multiple processes

## Step-by-Step Implementation

### 1. Project Setup

#### Initialize Monorepo
```bash
mkdir pbts-system && cd pbts-system
npm init -y
npm install turbo concurrently @types/node typescript
```

#### Create Workspace Structure
```json
// package.json
{
  "workspaces": ["apps/*", "shared", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "dev:all": "concurrently \"npm run dev:admin\" \"npm run dev:driver\" \"npm run dev:passenger\""
  }
}
```

### 2. Database Design

#### Core Entities
```prisma
// shared/prisma/schema.prisma
model Route {
  id          String @id @default(cuid())
  routeName   String
  routeNumber String
  startLocation String
  endLocation   String
  distance    Float
  farePrice   Float
  isActive    Boolean @default(true)
  stops       Stop[]
  buses       Bus[]
}

model Stop {
  id        String @id @default(cuid())
  stopName  String
  latitude  Float
  longitude Float
  stopOrder Int
  routeId   String
  route     Route @relation(fields: [routeId], references: [id])
}

model Bus {
  id           String @id @default(cuid())
  busNumber    String @unique
  capacity     Int
  currentLat   Float?
  currentLng   Float?
  isActive     Boolean @default(true)
  routeId      String
  route        Route @relation(fields: [routeId], references: [id])
  driverId     String?
  driver       Driver? @relation(fields: [driverId], references: [id])
}

model Driver {
  id       String @id @default(cuid())
  name     String
  email    String @unique
  phone    String
  licenseNumber String @unique
  buses    Bus[]
}
```

### 3. Passenger App Implementation

#### Core Features
- Route search and planning
- Real-time bus tracking
- Interactive maps
- Popular routes display

#### Key Components

**Location Search Component**
```tsx
// apps/passenger/components/search/LocationSearch.tsx
'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function LocationSearch({ value, onChange, placeholder }: LocationSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
```

**Interactive Map Component**
```tsx
// apps/passenger/components/InteractiveMap.tsx
'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface InteractiveMapProps {
  routes: Array<{
    id: string;
    coordinates: [number, number][];
    color: string;
  }>;
  center: [number, number];
}

export default function InteractiveMap({ routes, center }: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mapRef.current = L.map(containerRef.current).setView(center, 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);

    routes.forEach(route => {
      L.polyline(route.coordinates, { color: route.color }).addTo(mapRef.current!);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [routes, center]);

  return <div ref={containerRef} className="h-96 w-full rounded-lg" />;
}
```

**Real-time Updates Hook**
```tsx
// apps/passenger/hooks/useRealTimeUpdates.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useRealTimeUpdates(routes: any[]) {
  const [updates, setUpdates] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3005');
    setSocket(newSocket);

    newSocket.on('busLocationUpdate', (data) => {
      setUpdates(prev => [...prev, data]);
    });

    return () => newSocket.close();
  }, []);

  return { updates, socket };
}
```

### 4. Driver App Implementation

#### Core Features
- GPS tracking and location updates
- Route management
- Passenger count tracking
- Real-time status updates

#### Key Components

**GPS Tracker Component**
```tsx
// apps/driver/components/GPSTracker.tsx
'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function GPSTracker({ busId }: { busId: string }) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [socket] = useState(() => io('http://localhost:3005'));

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setLocation(newLocation);
        
        // Send location to server
        socket.emit('updateBusLocation', {
          busId,
          ...newLocation,
          timestamp: new Date()
        });
      },
      (error) => console.error('GPS Error:', error),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [busId, socket]);

  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <h3 className="font-semibold text-green-800">GPS Status</h3>
      {location ? (
        <p className="text-sm text-green-600">
          Location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
        </p>
      ) : (
        <p className="text-sm text-yellow-600">Getting location...</p>
      )}
    </div>
  );
}
```

### 5. Admin Dashboard Implementation

#### Core Features
- Route management (CRUD operations)
- Bus fleet management
- Driver management
- Real-time system monitoring

#### Key Components

**Route Management**
```tsx
// apps/admin/components/RouteManager.tsx
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Route {
  id: string;
  routeName: string;
  routeNumber: string;
  startLocation: string;
  endLocation: string;
  isActive: boolean;
}

export default function RouteManager() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await fetch('/api/routes');
      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      console.error('Failed to fetch routes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRouteStatus = async (routeId: string) => {
    try {
      await fetch(`/api/routes/${routeId}/toggle`, { method: 'PATCH' });
      fetchRoutes();
    } catch (error) {
      console.error('Failed to toggle route:', error);
    }
  };

  if (isLoading) return <div>Loading routes...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Route Management</h2>
      <div className="grid gap-4">
        {routes.map(route => (
          <div key={route.id} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{route.routeName}</h3>
              <p className="text-sm text-gray-600">
                {route.startLocation} → {route.endLocation}
              </p>
            </div>
            <Button
              onClick={() => toggleRouteStatus(route.id)}
              variant={route.isActive ? "destructive" : "default"}
            >
              {route.isActive ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 6. Backend API Implementation

#### Express Server Setup
```javascript
// backend/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/routes', require('./routes/routes'));
app.use('/api/buses', require('./routes/buses'));
app.use('/api/drivers', require('./routes/drivers'));

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('updateBusLocation', (data) => {
    // Broadcast location update to all clients
    socket.broadcast.emit('busLocationUpdate', data);
    
    // Save to database
    updateBusLocation(data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(3005, () => {
  console.log('Server running on port 3005');
});
```

#### API Routes
```javascript
// backend/routes/routes.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get all routes
router.get('/', async (req, res) => {
  try {
    const routes = await prisma.route.findMany({
      include: { stops: true, buses: true }
    });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new route
router.post('/', async (req, res) => {
  try {
    const route = await prisma.route.create({
      data: req.body
    });
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle route status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const route = await prisma.route.findUnique({
      where: { id: req.params.id }
    });
    
    const updated = await prisma.route.update({
      where: { id: req.params.id },
      data: { isActive: !route.isActive }
    });
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 7. Real-time GPS Simulation

```javascript
// backend/gps-simulator.js
const { io } = require('socket.io-client');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const socket = io('http://localhost:3005');

async function simulateGPS() {
  const buses = await prisma.bus.findMany({
    include: { route: { include: { stops: true } } }
  });

  buses.forEach(bus => {
    if (bus.route.stops.length > 0) {
      let currentStopIndex = 0;
      
      setInterval(() => {
        const currentStop = bus.route.stops[currentStopIndex];
        const nextStop = bus.route.stops[(currentStopIndex + 1) % bus.route.stops.length];
        
        // Simulate movement between stops
        const lat = currentStop.latitude + (Math.random() - 0.5) * 0.001;
        const lng = currentStop.longitude + (Math.random() - 0.5) * 0.001;
        
        socket.emit('updateBusLocation', {
          busId: bus.id,
          lat,
          lng,
          timestamp: new Date()
        });
        
        // Move to next stop occasionally
        if (Math.random() < 0.1) {
          currentStopIndex = (currentStopIndex + 1) % bus.route.stops.length;
        }
      }, 5000); // Update every 5 seconds
    }
  });
}

simulateGPS();
```

### 8. State Management with Zustand

```typescript
// shared/lib/store.ts
import { create } from 'zustand';

interface PassengerState {
  searchResults: any[];
  isSearching: boolean;
  searchFilters: {
    fromLocation: string;
    toLocation: string;
  };
  setSearchResults: (results: any[]) => void;
  setIsSearching: (loading: boolean) => void;
  setSearchFilters: (filters: any) => void;
}

export const usePassengerStore = create<PassengerState>((set) => ({
  searchResults: [],
  isSearching: false,
  searchFilters: { fromLocation: '', toLocation: '' },
  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearching: (loading) => set({ isSearching: loading }),
  setSearchFilters: (filters) => set({ searchFilters: filters }),
}));
```

### 9. Deployment Configuration

#### Docker Setup
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000 3001 3002 3005

CMD ["npm", "run", "start"]
```

#### Environment Variables
```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/pbts"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_MAPS_API_KEY="your-google-maps-key"
```

## Key Concepts Explained

### 1. Monorepo Architecture
- **Shared Code**: Common components, utilities, and types
- **Independent Apps**: Each app can be developed and deployed separately
- **Turbo Build System**: Efficient builds and caching

### 2. Real-time Communication
- **Socket.io**: Bidirectional communication between client and server
- **GPS Updates**: Continuous location tracking and broadcasting
- **Event-driven Architecture**: Reactive updates based on events

### 3. State Management
- **Zustand**: Lightweight state management for React
- **Local State**: Component-level state for UI interactions
- **Server State**: API data management and caching

### 4. Database Design
- **Relational Model**: Routes, stops, buses, and drivers relationships
- **Prisma ORM**: Type-safe database operations
- **Real-time Updates**: Optimistic updates and conflict resolution

### 5. Map Integration
- **Leaflet**: Open-source mapping library
- **Route Visualization**: Polylines and markers for routes and stops
- **Interactive Features**: Zoom, pan, and click events

## Development Workflow

### 1. Setup Development Environment
```bash
# Clone and install
git clone <repository>
cd pbts-system
npm install

# Setup database
npm run db:generate
npm run db:push

# Start all applications
npm run dev:all
```

### 2. Development Process
1. **Database First**: Design schema and generate types
2. **API Development**: Create backend endpoints
3. **Component Development**: Build reusable UI components
4. **Integration**: Connect frontend with backend APIs
5. **Testing**: Unit and integration tests
6. **Deployment**: Build and deploy to production

### 3. Best Practices
- **Type Safety**: Use TypeScript throughout
- **Component Reusability**: Shared component library
- **Error Handling**: Comprehensive error boundaries
- **Performance**: Lazy loading and code splitting
- **Security**: Input validation and authentication

## Advanced Features

### 1. Offline Support
- Service workers for caching
- Local storage for route data
- Sync when connection restored

### 2. Push Notifications
- Real-time alerts for bus arrivals
- Route disruption notifications
- Driver status updates

### 3. Analytics and Monitoring
- User behavior tracking
- Performance monitoring
- Error logging and reporting

### 4. Scalability Considerations
- Microservices architecture
- Load balancing
- Database sharding
- CDN for static assets

This guide provides a comprehensive foundation for building a Public Bus Tracking System. Each section can be expanded based on specific requirements and use cases.