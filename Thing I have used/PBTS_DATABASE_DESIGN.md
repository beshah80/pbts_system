# PBTS MongoDB Database Design
**Final Clean Version - Based on Real System Requirements**

---

## Table of Contents
1. [Overview](#overview)
2. [Collections Summary](#collections-summary)
3. [Detailed Collection Schemas](#detailed-collection-schemas)
4. [Enumerations](#enumerations)
5. [Relationships & Indexes](#relationships--indexes)
6. [Business Rules](#business-rules)

---

## Overview

This document defines the MongoDB database schema for the **Public Bus Tracking and Scheduling System (PBTS)** covering three operators: **ANBESSA**, **SHEGER**, and **VELOCITY** in Addis Ababa, Ethiopia.

**Key Design Principles:**
- Clean, production-ready schema (no sample data)
- Based on actual route and stop data from system
- Optimized for real-time tracking and scheduling
- Support for conflict detection and notifications

---

## Collections Summary

| # | Collection | Purpose | Key Fields |
|---|-----------|---------|------------|
| 1 | `passengers` | Passenger users (main users) | passengerId, username, email, preferredRoutes |
| 2 | `drivers` | Driver users | employeeId, username, email, licenseNumber, status |
| 3 | `admins` | Admin users | employeeId, username, email, department |
| 4 | `buses` | Fleet vehicles | busId, plateNumber, operator, capacity, status |
| 5 | `routes` | Bus routes | routeId, routeName, operator, totalDistance |
| 6 | `stops` | Bus stops | stopId, stopName, latitude, longitude |
| 7 | `route_stops` | Route-Stop relationships | routeId, stopId, sequence, distance |
| 8 | `schedules` | Bus-Route assignments | scheduleId, busId, routeId, driverId, time |
| 9 | `incidents` | Driver incident reports | incidentId, type, severity, photo, priority |
| 10 | `feedback` | Passenger feedback | feedbackId, rating, text, category |

---

## Detailed Collection Schemas

### 1. Passengers Collection

```javascript
{
  _id: ObjectId,
  passengerId: String,              // Unique identifier
  username: String,                 // Unique login name
  passwordHash: String,             // Hashed password
  email: String,                    // Unique email
  phoneNumber: String,
  preferredRoutes: [String],        // Array of route IDs
  createdAt: DateTime,
  lastLogin: DateTime
}
```

**Indexes:**
- `{ passengerId: 1 }` (unique)
- `{ username: 1 }` (unique)
- `{ email: 1 }` (unique)

---

### 2. Drivers Collection

```javascript
{
  _id: ObjectId,
  employeeId: String,             // Primary identifier (employee number)
  username: String,               // Unique login name
  passwordHash: String,           // Hashed password
  email: String,                  // Unique email
  phoneNumber: String,
  licenseNumber: String,          // Unique license
  licenseExpiry: DateTime,       
  assignedBusId: String,          // Reference to buses.busId (nullable)
  status: String,                 // Enum: "ON_DUTY" | "OFF_DUTY" | "ON_BREAK"
  createdAt: DateTime,
  lastLogin: DateTime
}
```

**Indexes:**
- `{ employeeId: 1 }` (unique)
- `{ username: 1 }` (unique)
- `{ email: 1 }` (unique)
- `{ licenseNumber: 1 }` (unique)
- `{ assignedBusId: 1 }`
- `{ status: 1 }`

---

### 3. Admins Collection

```javascript
{
  _id: ObjectId,
  employeeId: String,       // Primary identifier
  username: String,         // Unique login name
  passwordHash: String,     // Hashed password
  email: String,            // Unique email
  phoneNumber: String,
  department: String,       // e.g., "Operations", "Fleet", "Planning"
  createdAt: DateTime,
  lastLogin: DateTime
}
```

**Indexes:**
- `{ employeeId: 1 }` (unique)
- `{ username: 1 }` (unique)
- `{ email: 1 }` (unique)
- `{ department: 1 }`

**Note:** All admins have same permissions for now.

---

### 4. Buses Collection

```javascript
{
  _id: ObjectId,
  busId: String,                // Unique bus identifier
  plateNumber: String,          // Unique plate number (required)
  capacity: Number,             // Max passengers (required)
  manufacturer: String,         // Vehicle make/model (required)
  yearOfManufacture: Number,   // Production year (required)
  operator: String,             // Enum: "ANBESSA" | "SHEGER" | "VELOCITY" (required)
  status: String,               // Enum: "ACTIVE" | "UNDER_MAINTENANCE" | "RETIRED" (required)
  lastMaintenanceDate: DateTime,
  currentDriverId: String,      // Reference to drivers.employeeId (nullable)
  createdAt: DateTime,
  updatedAt: DateTime
}
```

**Indexes:**
- `{ busId: 1 }` (unique)
- `{ plateNumber: 1 }` (unique)
- `{ operator: 1 }`
- `{ status: 1 }`
- `{ currentDriverId: 1 }`

**Business Rules:**
- Admin must fill all required fields when adding bus
- Cannot schedule bus with status "UNDER_MAINTENANCE" or "RETIRED"

---

### 5. Routes Collection

```javascript
{
  _id: ObjectId,
  routeId: String,              // Unique route ID (e.g., "AB001", "SH027")
  routeName: String,            // Full route name (e.g., "Megenagna → Legedadi Mission")
  operator: String,             // Enum: "ANBESSA" | "SHEGER" | "VELOCITY"
  totalDistance: Number,        // Total route distance in km
  estimatedDuration: Number,    // Estimated duration in minutes
  isActive: Boolean,            // Route operational status
  createdBy: String,            // Reference to admins.employeeId
  createdAt: DateTime
}
```

**Indexes:**
- `{ routeId: 1 }` (unique)
- `{ operator: 1 }`
- `{ isActive: 1 }`

**Available Routes:**
- **ANBESSA:** 123 routes (AB001 to AB131)
- **SHEGER:** 63 routes (SH004 to SH105)
- **VELOCITY:** TBD

---

### 6. Stops Collection

```javascript
{
  _id: ObjectId,
  stopId: String,               // Unique stop ID
  stopName: String,             // Stop display name (required)
  latitude: Number,             // GPS coordinate
  longitude: Number,            // GPS coordinate
  address: String,              // Street address or landmark
  createdAt: DateTime
}
```

**Indexes:**
- `{ stopId: 1 }` (unique)
- `{ location: "2dsphere" }` // For geo-spatial queries
- `{ stopName: 1 }`

**Note:** System has 1200+ unique stops across Addis Ababa

---

### 7. Route_Stops Collection

```javascript
{
  _id: ObjectId,
  routeStopId: String,              // Unique identifier
  routeId: String,                  // Reference to routes.routeId
  stopId: String,                   // Reference to stops.stopId
  sequence: Number,                 // Stop order in route (1, 2, 3...)
  distanceFromStart: Number,        // Distance from route start (km)
  distanceToNext: Number,           // Distance to next stop (km)
  estimatedTimeFromStart: Number,   // Minutes from route start
  createdAt: DateTime
}
```

**Indexes:**
- `{ routeStopId: 1 }` (unique)
- `{ routeId: 1, sequence: 1 }` (compound, for ordered retrieval)
- `{ stopId: 1 }`

**Business Logic:**
- When user searches start→end:
  1. Find routes containing both stops
  2. Show all stops in sequence between start and end
  3. Calculate:
     - Start → each intermediate stop (distance & time)
     - Each stop → next stop (distance & time)
     - Each stop → end (distance & time)
     - Total: start → end (distance & time)

---

### 8. Schedules Collection

```javascript
{
  _id: ObjectId,
  scheduleId: String,                   // Unique schedule ID
  busId: String,                        // Reference to buses.busId (required)
  routeId: String,                      // Reference to routes.routeId (required)
  driverId: String,                     // Reference to drivers.employeeId (required)
  scheduledDepartureTime: DateTime,     // Planned start time (required)
  scheduledArrivalTime: DateTime,       // Planned end time (required)
  status: String,                       // Enum: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  createdBy: String,                    // Reference to admins.employeeId
  createdAt: DateTime
}
```

**Indexes:**
- `{ scheduleId: 1 }` (unique)
- `{ busId: 1 }`
- `{ routeId: 1 }`
- `{ driverId: 1 }`
- `{ scheduledDepartureTime: 1, scheduledArrivalTime: 1 }` (compound)
- `{ status: 1 }`

**Conflict Detection System:**
- Check if bus is already assigned to another route at overlapping time
- Check if driver is already assigned to another schedule at overlapping time
- Limit number of buses assigned to same route at same time
- Validate bus status is "ACTIVE"
- Algorithm: Check for schedules where:
  ```
  busId === requestedBusId AND
  status !== "CANCELLED" AND
  (
    (scheduledDepartureTime <= requestedStart AND scheduledArrivalTime >= requestedStart) OR
    (scheduledDepartureTime <= requestedEnd AND scheduledArrivalTime >= requestedEnd) OR
    (scheduledDepartureTime >= requestedStart AND scheduledArrivalTime <= requestedEnd)
  )
  ```

---

### 9. Incidents Collection

```javascript
{
  _id: ObjectId,
  incidentId: String,           // Unique incident ID
  reportedBy: String,           // Reference to drivers.employeeId
  busId: String,                // Reference to buses.busId
  scheduleId: String,           // Reference to schedules.scheduleId (nullable)
  type: String,                 // Enum: "BREAKDOWN" | "ACCIDENT" | "TRAFFIC_DELAY" | "ROUTE_BLOCKAGE" | "OTHER"
  severity: String,             // Enum: "LOW" | "MEDIUM" | "HIGH"
  priority: Number,             // System-calculated priority (1-10)
  location: String,             // Incident location description
  description: String,          // Detailed report
  photoUrl: String,             // Path to incident photo
  driverPhone: String,          // Driver contact number
  reportedAt: DateTime,         // Time of incident
  status: String,               // Enum: "REPORTED" | "IN_PROGRESS" | "RESOLVED"
  resolvedAt: DateTime,
  resolvedBy: String,           // Reference to admins.employeeId
  adminNotes: String
}
```

**Indexes:**
- `{ incidentId: 1 }` (unique)
- `{ reportedBy: 1 }`
- `{ busId: 1 }`
- `{ type: 1 }`
- `{ severity: 1 }`
- `{ priority: 1 }`
- `{ status: 1 }`
- `{ reportedAt: -1 }` (descending for recent first)

**Priority Calculation Logic:**
```javascript
// Auto-calculate priority based on type and severity
const priorityMatrix = {
  "ACCIDENT": { "HIGH": 10, "MEDIUM": 8, "LOW": 6 },
  "BREAKDOWN": { "HIGH": 9, "MEDIUM": 7, "LOW": 5 },
  "ROUTE_BLOCKAGE": { "HIGH": 8, "MEDIUM": 6, "LOW": 4 },
  "TRAFFIC_DELAY": { "HIGH": 5, "MEDIUM": 3, "LOW": 2 },
  "OTHER": { "HIGH": 4, "MEDIUM": 2, "LOW": 1 }
};
```

**Notification System:**
- Incident reported → Notify admins based on priority
- Priority >= 8 → Immediate alert to all admins
- Priority 5-7 → Notify department admins
- Priority < 5 → Add to pending queue
- Future: Direct chat between driver and admin (demo only for now)

---

### 10. Feedback Collection

```javascript
{
  _id: ObjectId,
  feedbackId: String,           // Unique feedback ID
  submittedBy: String,          // Reference to passengers.passengerId
  rating: Number,               // 1-5 stars
  feedbackText: String,         // User feedback text
  routeId: String,              // Reference to routes.routeId (optional)
  busId: String,                // Reference to buses.busId (optional)
  submittedAt: DateTime,
  status: String,               // Enum: "UNREAD" | "UNDER_REVIEW" | "ADDRESSED"
  reviewedBy: String            // Reference to admins.employeeId (nullable)
}
```

**Indexes:**
- `{ feedbackId: 1 }` (unique)
- `{ submittedBy: 1 }`
- `{ rating: 1 }`
- `{ status: 1 }`
- `{ submittedAt: -1 }`

**Notification System:**
- New feedback → Notify customer service admin
- Rating <= 2 → High priority notification

---

## Enumerations

### User Roles
```javascript
const UserRole = ["ADMIN", "DRIVER", "PASSENGER"];
```

### Driver Status
```javascript
const DriverStatus = ["ON_DUTY", "OFF_DUTY", "ON_BREAK"];
```

### Bus Operators
```javascript
const BusOperator = ["ANBESSA", "SHEGER", "VELOCITY"];
```

### Bus Status
```javascript
const BusStatus = ["ACTIVE", "UNDER_MAINTENANCE", "RETIRED"];
```

### Schedule Status
```javascript
const ScheduleStatus = ["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
```

### Incident Type
```javascript
const IncidentType = ["BREAKDOWN", "ACCIDENT", "TRAFFIC_DELAY", "ROUTE_BLOCKAGE", "OTHER"];
```

### Incident Severity
```javascript
const IncidentSeverity = ["LOW", "MEDIUM", "HIGH"];
```

### Incident Status
```javascript
const IncidentStatus = ["REPORTED", "IN_PROGRESS", "RESOLVED"];
```

### Feedback Status
```javascript
const FeedbackStatus = ["UNREAD", "UNDER_REVIEW", "ADDRESSED"];
```

---

## Relationships & Indexes

### Foreign Key Relationships

```
drivers.employeeId ← buses.currentDriverId (1:1)
drivers.employeeId ← schedules.driverId (1:N)
drivers.employeeId ← incidents.reportedBy (1:N)

admins.employeeId ← routes.createdBy (1:N)
admins.employeeId ← schedules.createdBy (1:N)
admins.employeeId ← incidents.resolvedBy (1:N)
admins.employeeId ← feedback.reviewedBy (1:N)

buses.busId ← schedules.busId (1:N)
buses.busId ← incidents.busId (1:N)
buses.busId ← feedback.busId (1:N)

routes.routeId ← route_stops.routeId (1:N)
routes.routeId ← schedules.routeId (1:N)
routes.routeId ← feedback.routeId (1:N)

stops.stopId ← route_stops.stopId (1:N)

passengers.passengerId ← feedback.submittedBy (1:N)

schedules.scheduleId ← incidents.scheduleId (1:N)
```

### Compound Indexes for Performance

```javascript
// For schedule conflict detection
db.schedules.createIndex({ 
  busId: 1, 
  scheduledDepartureTime: 1, 
  scheduledArrivalTime: 1,
  status: 1 
});

// For route-stop ordered retrieval
db.route_stops.createIndex({ routeId: 1, sequence: 1 });

// For real-time tracking queries
db.schedules.createIndex({ 
  status: 1, 
  scheduledDepartureTime: 1 
});

// For incident priority sorting
db.incidents.createIndex({ 
  status: 1, 
  priority: -1, 
  reportedAt: -1 
});

// Geospatial index for stop searches
db.stops.createIndex({ location: "2dsphere" });
```

---

## Business Rules

### 1. Bus Management
- ✓ All buses must have unique plate numbers
- ✓ One driver can be assigned to only one bus at a time
- ✓ Buses with status "UNDER_MAINTENANCE" or "RETIRED" cannot be scheduled
- ✓ Admin must fill all required fields when adding bus

### 2. Scheduling Rules
- ✓ A bus cannot be scheduled on overlapping times
- ✓ A driver cannot be assigned to multiple schedules at same time
- ✓ Limit number of buses per route per time slot (configurable)
- ✓ Only buses with status "ACTIVE" can be scheduled

### 3. Route & Stop Rules
- ✓ Stop sequence numbers must be unique within a route
- ✓ Distance and time calculations:
  - Calculate from start to each stop
  - Calculate from each stop to next stop
  - Calculate from each stop to end
  - Total distance and time from start to end

### 4. Incident Management
- ✓ Drivers must report incidents with: type, severity, photo, description, location, phone
- ✓ Priority auto-calculated from type + severity
- ✓ Notifications based on priority level
- ✓ Incident records are immutable after creation (only status can change)

### 5. Feedback Rules
- ✓ Only passengers can submit feedback
- ✓ Rating (1-5) and feedback text are required
- ✓ Route or bus reference is optional
- ✓ Low ratings trigger immediate notifications

---

## Data Population Notes

### Real Data Sources
1. **Routes Data:** Available from `asset/anbesa_bus/routes.txt` and `asset/sheger_bus/routes.txt`
2. **Stops Data:** Available from `asset/anbesa_bus/stops.txt` and `asset/sheger_bus/stops.txt`
3. **Route-Stop Relationships:** Available from corresponding `stop_times.txt` files
4. **Distances:** Can be calculated from GPS coordinates or from `shapes.txt` files

### Import Process
```bash
# 1. Extract routes
node scripts/import-routes.js

# 2. Extract unique stops
node scripts/import-stops.js

# 3. Build route-stop relationships with distances
node scripts/import-route-stops.js

# 4. Seed test buses (optional)
node scripts/seed-buses.js
```

---

## Database Statistics (Estimated)

| Collection | Expected Documents |
|-----------|-------------------|
| passengers | 10,000+ |
| drivers | 200+ |
| admins | 50+ |
| buses | 500+ |
| routes | 200+ (186 confirmed) |
| stops | 1,200+ (confirmed from data) |
| route_stops | 10,000+ |
| schedules | 5,000+ |
| incidents | 1,000+ |
| feedback | 5,000+ |

---

## Implementation Checklist

- [ ] Create MongoDB database `pbts_system`
- [ ] Create all 10 collections
- [ ] Apply unique indexes
- [ ] Apply compound indexes for performance
- [ ] Create geospatial index on stops
- [ ] Import routes from GTFS data
- [ ] Import stops from GTFS data
- [ ] Build route-stops relationships with distances
- [ ] Set up conflict detection logic
- [ ] Implement priority calculation for incidents
- [ ] Configure notification system
- [ ] Test schedule conflict detection
- [ ] Test route search with distance calculations

---

**Database Name:** `pbts_system`  
**Version:** 1.0 - Clean Production Schema  
**Last Updated:** 2025-11-28  
**Based On:** Real system requirements + GTFS data
