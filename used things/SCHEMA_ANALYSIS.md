# PBTS Schema Analysis & Update Plan

## Current Schema Status ✅

The existing Prisma schema is well-designed and requires minimal changes:

### Strengths:
- **Proper relationships** between Bus, Driver, Schedule, and TripRecord
- **OTP-verified feedback system** already implemented
- **Comprehensive enums** for status management
- **Static route references** using `routeStaticId` and `stopStaticId`

### Schema Strategy: Hybrid Data Sources

#### Static JSON (`asset/info.json`) - Source of Truth:
- ✅ Route definitions (id, shortName, longName, stops)
- ✅ Stop definitions (id, name, coordinates, terminals)
- ✅ Route-stop relationships and sequences
- ✅ Distance calculations and route geometry

#### MongoDB (Prisma) - Operational Data:
- ✅ User management (Admin, Driver)
- ✅ Fleet management (Bus)
- ✅ Scheduling (Schedule, TripRecord)
- ✅ Feedback system (FeedbackVerification, PassengerFeedback)

## Required Updates

### 1. Backend API Centralization ✅ (Already Implemented)
The backend already has:
- `routeData.ts` service loading from `asset/info.json`
- Route controllers with proper API endpoints
- Unique stops extraction from route data

### 2. Frontend Migration Plan

#### Admin App:
- ❌ Remove `apps/admin/lib/mock-db.ts` 
- ❌ Remove route mocks from `apps/admin/lib/data.ts`
- ✅ Consume backend APIs: `/api/routes`, `/api/stops`, `/api/terminals`

#### Driver App:
- ❌ Replace hardcoded `mockStops/mockRoutePath` 
- ✅ Use `GET /api/routes/:id` for route details
- ✅ Integrate with real Addis Ababa routes from `info.json`

#### Passenger App:
- ❌ Remove `/routes_with_stops.json` dependency
- ❌ Remove random values fallback in route planner
- ✅ Use backend APIs for all route data

### 3. Data Relationships

#### Current Schema (No Changes Needed):
```prisma
model Schedule {
  routeStaticId  String  // References info.json route.id
  // ... other fields
}

model TripRecord {
  routeStaticId      String  // References info.json route.id
  currentStopStaticId String? // References info.json stop.id
  // ... other fields
}

model PassengerFeedback {
  routeStaticId  String? // References info.json route.id
  stopStaticId   String? // References info.json stop.id
  // ... other fields
}
```

## Implementation Priority

### Phase 1: Backend API Enhancement ✅ (Complete)
- [x] Centralized route data loading
- [x] Stable API endpoints
- [x] Route search functionality

### Phase 2: Frontend Migration (Next Steps)
1. **Admin Dashboard**
   - Remove mock route data
   - Implement API consumption
   - Update route management UI

2. **Driver App**
   - Replace hardcoded route data
   - Integrate with backend APIs
   - Real-time route updates

3. **Passenger App**
   - Remove static JSON dependencies
   - Implement backend API calls
   - Enhanced route planning

### Phase 3: Feedback System Enhancement ✅ (Already Implemented)
- [x] OTP verification system
- [x] Email-based verification
- [x] Route/stop linking via static IDs

## Acceptance Criteria

✅ **Backend**: Centralized `asset/info.json` loading with stable APIs
❌ **Admin**: Shows real Addis Ababa routes, no sample data
❌ **Driver**: Uses backend APIs for route information
❌ **Passenger**: Relies entirely on backend APIs
✅ **Feedback**: OTP-verified system with route/stop references

## Data Integrity

### Static ID Stability:
- Route IDs from `info.json` are stable (e.g., "1:15907058")
- Stop IDs from `info.json` are stable (e.g., "1:node/10929337801")
- These IDs are used as foreign key references in MongoDB

### Relationship Mapping:
```
MongoDB Schedule.routeStaticId → info.json route.id
MongoDB TripRecord.currentStopStaticId → info.json stop.id
MongoDB PassengerFeedback.routeStaticId → info.json route.id
```

## Next Steps

1. **Remove mock data** from frontend applications
2. **Implement API consumption** in all frontend apps
3. **Test data consistency** between static JSON and MongoDB references
4. **Validate feedback system** with real route/stop data