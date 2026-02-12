# Implementation Plan for Search Functionality

## Overview
Create a comprehensive search system for the Addis Ababa public transport app that allows users to find routes between any stops, with real-time bus availability and intelligent route matching.

## Core Requirements

### 1. Search Interface
- **From/To Input Fields**: Smart autocomplete with stop suggestions
- **Recent Searches**: Display frequently searched routes
- **Location Detection**: Option to use current location
- **Visual Feedback**: Loading states, error handling, no results display

### 2. Search Logic
- **Stop-based Search**: Support any stop-to-stop combinations
- **Route Matching**: Find routes that pass through both stops
- **Partial Routes**: Support A→D, B→C, C→D for routes A→D
- **Real-time Availability**: Only show routes with active buses

### 3. Data Sources
- **Static Data**: `info.json` for routes, stops, and terminals
- **Dynamic Data**: Real-time bus locations and driver status
- **User Data**: Search history and preferences

## Data Integration

### Static Data from info.json
The `info.json` contains the real Addis Ababa transport data with this structure:
```json
{
  "mode": "BUS",
  "shortName": "Tx LID 009",
  "id": "1:15907058",
  "longName": "Torhayloch -> Megenagna",
  "stops": [
    {
      "lon": 38.7449001,
      "lat": 9.0105347,
      "name": "Mexico",
      "id": "1:node/10929337801",
      "is_terminal": false,
      "sequence": 1,
      "distance_from_previous": 0
    }
  ],
  "from": "Torhayloch",
  "to": "Megenagna",
  "terminals": {
    "from": {"name": "Torhayloch", "is_terminal": false},
    "to": {"name": "Megenagna", "is_terminal": true}
  }
}
```

### Data Migration Strategy
1. **Import Routes**:
   - Parse info.json routes into Route model
   - Map `shortName` to `routeNumber`
   - Map `longName` to `name`
   - Calculate total distance from stop distances
   - Estimate duration based on distance and average speed

2. **Import Stops**:
   - Create Stop records for all unique stops
   - Use coordinates from info.json
   - Mark terminals based on `is_terminal` flag
   - Preserve original stop IDs for reference

3. **Create Route-Stop Relationships**:
   - Link routes to stops via RouteStop model
   - Use `sequence` for order
   - Calculate `timeFromStart` based on distances

### Real-time Data Integration
The existing backend has:
- **Drivers**: Already exist with status tracking
- **Buses**: Already exist with GPS capability
- **TripRecords**: Track current trips with locations
- **Schedules**: Link drivers, buses, and routes

### Enhanced Schema Updates
```prisma
// Add to existing schema
model Route {
  id                String   @id @default(auto()) @map("_id") @db.ObjectId
  staticId          String   @unique // From info.json id
  routeNumber       String   // From info.json shortName
  name              String   // From info.json longName
  startLocation     String   // From info.json from
  endLocation       String   // From info.json to
  distance          Float    // Calculated from stop distances
  estimatedDuration Int      // Estimated based on distance
  farePrice         Float    // Default fare, can be overridden
  isActive          Boolean  @default(false)
  stops             RouteStop[]
  schedules         Schedule[]
  tripRecords       TripRecord[]
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@map("routes")
}

model Stop {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  staticId    String   @unique // From info.json stop id
  name        String
  latitude    Float
  longitude   Float
  type        StopType @default(BUS_STOP)
  isActive    Boolean  @default(true)
  routes      RouteStop[]
  createdAt   DateTime @default(now())

  @@map("stops")
}

model RouteStop {
  id             String @id @default(auto()) @map("_id") @db.ObjectId
  routeId        String @db.ObjectId
  route          Route  @relation(fields: [routeId], references: [id])
  stopId         String @db.ObjectId
  stop           Stop   @relation(fields: [stopId], references: [id])
  order          Int    // From info.json sequence
  timeFromStart  Int    // Calculated minutes from route start
  createdAt      DateTime @default(now())

  @@map("route_stops")
}

// Update existing models
model Schedule {
  // ... existing fields
  routeId          String? @db.ObjectId
  route            Route?  @relation(fields: [routeId], references: [id])
}

model TripRecord {
  // ... existing fields
  routeId          String? @db.ObjectId
  route            Route?  @relation(fields: [routeId], references: [id])
}

enum StopType {
  BUS_STOP
  TERMINAL
  STATION
}
```

## Database Schema Updates

### New Models
```prisma
model Stop {
  id          String   @id @default(cuid())
  name        String
  nameAmharic String?
  latitude    Float
  longitude   Float
  type        StopType @default(BUS_STOP)
  isActive    Boolean  @default(true)
  routes      RouteStop[]
  searches    SearchHistory[]
  createdAt   DateTime @default(now())
}

model Route {
  id                String   @id @default(cuid())
  routeNumber       String   @unique
  name              String
  startLocation     String
  endLocation       String
  distance          Float
  estimatedDuration Int
  farePrice         Float
  isActive          Boolean  @default(false)
  stops             RouteStop[]
  activeBuses       Bus[]
  schedules         Schedule[]
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model RouteStop {
  id             String @id @default(cuid())
  routeId        String
  route          Route  @relation(fields: [routeId], references: [id])
  stopId         String
  stop           Stop   @relation(fields: [stopId], references: [id])
  order          Int
  timeFromStart  Int    // minutes from route start
  createdAt      DateTime @default(now())
}

model Bus {
  id          String    @id @default(cuid())
  plateNumber String    @unique
  busNumber   String
  capacity    Int
  busType     BusType
  status      BusStatus @default(OUT_OF_SERVICE)
  routeId     String?
  route       Route?    @relation(fields: [routeId], references: [id])
  driverId    String?
  driver      Driver?   @relation(fields: [driverId], references: [id])
  locations   Location[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Driver {
  id            String  @id @default(cuid())
  name          String
  licenseNumber String  @unique
  phone         String
  isActive      Boolean @default(false)
  bus           Bus?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Location {
  id        String   @id @default(cuid())
  busId     String
  bus       Bus      @relation(fields: [busId], references: [id])
  latitude  Float
  longitude Float
  heading   Float?
  speed     Float?
  timestamp DateTime @default(now())
}

model SearchHistory {
  id           String   @id @default(cuid())
  userId       String?
  fromStopId   String
  fromStop     Stop     @relation(fields: [fromStopId], references: [id])
  toStopId     String
  toStop       Stop     @relation(fields: [toStopId], references: [id])
  searchedAt   DateTime @default(now())
}

enum StopType {
  BUS_STOP
  TERMINAL
  STATION
}

enum BusType {
  ANBESSA
  SHEGER
  VELOCITY
  PRIVATE
}

enum BusStatus {
  ON_ROUTE
  DELAYED
  UNDER_MAINTENANCE
  OUT_OF_SERVICE
}
```

## API Endpoints

### Search Endpoints
```typescript
// Autocomplete suggestions
GET /api/search/suggest?q={query}&limit={limit}
Response: {
  stops: Array<{
    id: string;
    name: string;
    nameAmharic?: string;
    latitude: number;
    longitude: number;
    type: string;
  }>
}

// Route search
POST /api/search/routes
Body: {
  fromStopId: string;
  toStopId: string;
  includePartial: boolean; // default true
}
Response: {
  routes: Array<{
    routeId: string;
    routeName: string;
    fromStop: StopInfo;
    toStop: StopInfo;
    intermediateStops: StopInfo[];
    activeBuses: Array<{
      busId: string;
      busNumber: string;
      currentLocation: Location;
      estimatedArrival: string;
      capacity: number;
    }>;
    nextDepartures: Array<{
      departureTime: string;
      busId: string;
    }>;
    walkingDistance: {
      fromStart: number; // meters
      toDestination: number; // meters
    };
    estimatedTime: number; // minutes
    fare: number;
  }>;
  noResultsReason?: string;
}

// Real-time availability
GET /api/search/availability?routeId={routeId}
Response: {
  isActive: boolean;
  activeBuses: Array<{
    id: string;
    location: Location;
    heading: number;
    speed: number;
  }>;
  nextDepartures: Array<{
    time: string;
    busId: string;
  }>;
}
```

### Real-time Updates
```typescript
// WebSocket endpoint
WS /ws/search-updates

Messages:
{
  type: 'BUS_LOCATION_UPDATE';
  data: {
    busId: string;
    routeId: string;
    location: Location;
  };
}

{
  type: 'ROUTE_STATUS_CHANGE';
  data: {
    routeId: string;
    isActive: boolean;
    reason?: string;
  };
}
```

## Frontend Components

### 1. SearchComponent
```typescript
interface SearchComponentProps {
  onSearch: (from: Stop, to: Stop) => void;
  loading?: boolean;
}

// Features:
- Autocomplete for both fields
- Swap locations button
- Current location option
- Recent searches dropdown
- Clear button
```

### 2. SearchResultsComponent
```typescript
interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  error?: string;
  noResults?: NoResultsReason;
}

// Features:
- List view with route cards
- Map view toggle
- Sort options (time, distance, fare)
- Filter by bus type
- Real-time updates
```

### 3. RouteCardComponent
```typescript
interface RouteCardProps {
  route: SearchResult;
  onSelect: (route: SearchResult) => void;
}

// Features:
- Route number and name
- From/To stops with walking distance
- Next departure times
- Active bus indicators
- Fare information
- Estimated time
- Real-time bus positions
```

### 4. MapViewComponent
```typescript
interface MapViewProps {
  routes: SearchResult[];
  userLocation?: Location;
  selectedRoute?: string;
}

// Features:
- Interactive map with route lines
- Real-time bus markers
- Stop markers with names
- User location marker
- Walking route to stops
- Zoom to fit routes
```

## Implementation Phases

### Phase 1: Core Search Infrastructure
1. **Database Setup**
   - Update Prisma schema
   - Run migrations
   - Seed static data from info.json
   - Create indexes for performance

2. **Basic API Endpoints**
   - Implement suggest endpoint
   - Create basic route search
   - Add error handling
   - Write unit tests

3. **Frontend Search UI**
   - Create SearchComponent
   - Implement autocomplete
   - Add loading states
   - Basic error handling

### Phase 2: Advanced Search Features
1. **Enhanced Search Logic**
   - Implement partial route matching
   - Add real-time availability check
   - Optimize search performance
   - Add caching layer

2. **Real-time Updates**
   - Set up WebSocket server
   - Implement bus location updates
   - Add route status changes
   - Handle reconnection logic

3. **Improved UI/UX**
   - Add recent searches
   - Implement map view
   - Add filters and sorting
   - Improve visual design

### Phase 3: Polish and Optimization
1. **Performance Optimization**
   - Add database indexes
   - Implement response caching
   - Optimize API responses
   - Add pagination

2. **Advanced Features**
   - Save favorite routes
   - Share route information
   - Add notifications
   - Offline support

3. **Testing and QA**
   - Comprehensive testing
   - Performance testing
   - Accessibility audit
   - User testing

## Data Flow

### Search Request Flow
1. User types in search field
2. Frontend calls suggest API
3. User selects stops and searches
4. Backend finds matching routes
5. Checks real-time availability
6. Returns formatted results
7. Frontend displays results
8. Subscribes to real-time updates

### Real-time Update Flow
1. Driver app sends location updates
2. Backend processes and stores
3. WebSocket broadcasts to clients
4. Frontend updates UI accordingly
5. Shows bus movement on map

## Error Handling

### No Results Scenarios
- No routes found between stops
- No active buses on routes
- Service disruptions
- Network errors

### Display Strategies
- Clear "No routes found" message
- Alternative suggestions
- "Try nearby stops" option
- Retry button with explanation

## Performance Considerations

### Database Optimization
- Index on stop coordinates
- Route-stop relationship indexing
- Location history partitioning
- Query result caching

### API Optimization
- Response compression
- Pagination for large result sets
- Debounced search requests
- CDN for static assets

### Frontend Optimization
- Virtual scrolling for results
- Map tile caching
- Debounced autocomplete
- Lazy loading components

## Testing Strategy

### Unit Tests
- Search algorithm validation
- API endpoint testing
- Component unit tests
- Utility function tests

### Integration Tests
- End-to-end search flow
- Real-time update testing
- Database integration
- WebSocket connection tests

### User Testing
- Search usability testing
- Performance testing
- Accessibility testing
- Cross-browser testing

## Success Metrics

### Technical Metrics
- Search response time < 500ms
- Real-time update latency < 2s
- 99.9% API uptime
- < 1% error rate

### User Metrics
- Search success rate > 95%
- Average search time < 10s
- User satisfaction > 4.5/5
- Daily active users growth

## Next Steps

1. **Immediate Actions**
   - Update database schema
   - Create migration files
   - Set up basic API structure
   - Start frontend component development

2. **Week 1-2**
   - Complete database setup
   - Implement basic search API
   - Create search UI components
   - Add autocomplete functionality

3. **Week 3-4**
   - Add real-time features
   - Implement map integration
   - Add advanced filtering
   - Performance optimization

4. **Week 5-6**
   - Testing and bug fixes
   - User feedback incorporation
   - Documentation
   - Deployment preparation
