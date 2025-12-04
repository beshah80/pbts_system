# Public Bus Tracking and Scheduling System (PBTS)
# Sequence Diagrams Documentation

## Overview
This document contains sequence diagrams for the major use cases of the Public Bus Tracking and Scheduling System for Ethiopian Cities. These diagrams illustrate the temporal ordering of messages and interactions between system actors and objects.

**System Actors:**
- **Admin**: Transport Authority/Administrator (AARTB, Anbessa, Sheger, Velocity operators)
- **Driver**: Bus driver operating the vehicle
- **Passenger**: End-user seeking bus information
- **System**: Backend server and database

---

## 1. Bus Registration Sequence Diagram

### Use Case Description
An administrator registers a new bus in the system, including details such as plate number, capacity, operator type, and assignment status.

### Actors Involved
- Admin (Transport Authority)
- Admin Dashboard Interface
- Bus Management Module
- Database

### Sequence Diagram

```mermaid
sequenceDiagram
    actor Admin
    participant UI as Admin Dashboard
    participant BusModule as Bus Management Module
    participant Validator as Data Validator
    participant DB as Database
    participant NotificationService as Notification Service

    Admin->>UI: Navigate to Bus Management (/buses)
    UI->>UI: Display bus list and "Add Bus" button
    
    Admin->>UI: Click "Add Bus" button
    UI->>Admin: Display bus registration form
    
    Admin->>UI: Enter bus details<br/>(Plate Number, Capacity,<br/>Operator Type, Status)
    
    Admin->>UI: Submit form
    UI->>Validator: Validate input data
    
    alt Validation Fails
        Validator->>UI: Return validation errors
        UI->>Admin: Display error messages
        Admin->>UI: Correct errors and resubmit
        UI->>Validator: Validate input data
    end
    
    Validator->>BusModule: Pass validated data
    BusModule->>DB: Check for duplicate plate number
    
    alt Plate Number Already Exists
        DB->>BusModule: Return duplicate error
        BusModule->>UI: Return conflict error
        UI->>Admin: Display "Plate number already registered"
    else Plate Number is Unique
        DB->>BusModule: Confirm uniqueness
        BusModule->>DB: Create new bus record
        DB->>DB: Generate Bus ID
        DB->>BusModule: Return success with Bus ID
        BusModule->>NotificationService: Trigger bus registration event
        NotificationService->>NotificationService: Log registration activity
        BusModule->>UI: Return success response
        UI->>Admin: Display success message<br/>"Bus registered successfully"
        UI->>UI: Refresh bus list with new entry
    end
```

### Key Messages
1. **Navigate to Bus Management**: Admin accesses the bus management interface
2. **Enter bus details**: Admin inputs plate number, capacity, operator type (Anbessa/Sheger/Velocity), and status
3. **Validate input data**: System checks data format and completeness
4. **Check for duplicate**: Database verifies plate number uniqueness
5. **Create bus record**: New bus entity is persisted in the database
6. **Return success**: Admin receives confirmation of successful registration

---

## 2. Schedule Creation Sequence Diagram

### Use Case Description
An administrator creates a bus schedule by assigning a bus and driver to a specific route with defined start and end times. The system automatically detects scheduling conflicts.

### Actors Involved
- Admin (Transport Authority)
- Schedule Management Module
- Conflict Detection Service
- Database

### Sequence Diagram

```mermaid
sequenceDiagram
    actor Admin
    participant UI as Admin Dashboard
    participant ScheduleModule as Schedule Management Module
    participant ConflictDetector as Conflict Detector
    participant DB as Database
    participant NotificationService as Notification Service

    Admin->>UI: Navigate to Schedule Management (/schedules)
    UI->>DB: Fetch available routes
    UI->>DB: Fetch available buses
    UI->>DB: Fetch available drivers
    DB->>UI: Return routes, buses, drivers lists
    UI->>Admin: Display schedule creation form
    
    Admin->>UI: Select route
    Admin->>UI: Select bus
    Admin->>UI: Select driver
    Admin->>UI: Set start and end times
    Admin->>UI: Submit schedule
    
    UI->>ScheduleModule: Process schedule request
    ScheduleModule->>Validator: Validate schedule data
    
    alt Validation Fails
        Validator->>UI: Return validation errors
        UI->>Admin: Display error messages
    else Validation Passes
        Validator->>ConflictDetector: Check for conflicts
        ConflictDetector->>DB: Query existing schedules<br/>for selected bus
        ConflictDetector->>DB: Query existing schedules<br/>for selected driver
        DB->>ConflictDetector: Return existing schedules
        
        ConflictDetector->>ConflictDetector: Analyze time overlaps
        
        alt Conflict Detected
            ConflictDetector->>ScheduleModule: Return conflict details<br/>(Bus/Driver already scheduled)
            ScheduleModule->>UI: Return conflict error
            UI->>Admin: Display conflict message<br/>"Bus/Driver already assigned<br/>during this time"
        else No Conflict
            ConflictDetector->>ScheduleModule: Confirm no conflicts
            ScheduleModule->>DB: Create schedule record
            DB->>DB: Generate Schedule ID
            DB->>ScheduleModule: Return success with Schedule ID
            ScheduleModule->>NotificationService: Notify driver of assignment
            NotificationService->>Driver: Send schedule notification<br/>(SMS/Push Notification)
            ScheduleModule->>UI: Return success response
            UI->>Admin: Display success message<br/>"Schedule created successfully"
            UI->>UI: Refresh schedule list
        end
    end
```

### Key Messages
1. **Fetch available resources**: System retrieves lists of routes, buses, and drivers
2. **Select schedule parameters**: Admin chooses route, bus, driver, and time range
3. **Check for conflicts**: Conflict detector analyzes existing schedules for overlapping assignments
4. **Create schedule record**: If no conflicts, schedule is saved to database
5. **Notify driver**: Driver receives notification of new schedule assignment

---

## 3. Real-time Tracking Sequence Diagram

### Use Case Description
A driver updates their current bus stop during an active trip, enabling real-time tracking. The system updates the bus location and broadcasts this information to passengers viewing the route.

### Actors Involved
- Driver
- Driver Dashboard
- Tracking Service
- Database
- Passenger Dashboard
- Notification Service

### Sequence Diagram

```mermaid
sequenceDiagram
    actor Driver
    participant DriverUI as Driver Dashboard
    participant TripModule as Trip Management Module
    participant TrackingService as Tracking Service
    participant DB as Database
    participant WebSocket as WebSocket Server
    participant PassengerUI as Passenger Dashboards
    participant NotificationService as Notification Service

    Note over Driver,PassengerUI: Precondition: Driver has started a trip

    Driver->>DriverUI: View active trip
    DriverUI->>DB: Fetch trip details
    DB->>DriverUI: Return trip information<br/>(Route, Stops, Current Position)
    DriverUI->>Driver: Display trip navigation<br/>with stop list
    
    Driver->>Driver: Arrives at next stop
    Driver->>DriverUI: Select "Mark Stop Reached"<br/>for current stop
    DriverUI->>DriverUI: Capture GPS coordinates
    DriverUI->>TripModule: Send stop update request<br/>(Trip ID, Stop ID, GPS, Timestamp)
    
    TripModule->>DB: Update trip progress<br/>(Current Stop, GPS Location)
    DB->>DB: Save updated trip status
    DB->>TripModule: Confirm update success
    
    TripModule->>TrackingService: Broadcast stop update
    TrackingService->>DB: Calculate ETA for<br/>remaining stops
    DB->>TrackingService: Return ETA calculations
    
    TrackingService->>WebSocket: Push real-time update<br/>(Bus location, Current stop, ETAs)
    WebSocket->>PassengerUI: Broadcast to subscribed passengers
    PassengerUI->>PassengerUI: Update bus position on map
    PassengerUI->>PassengerUI: Refresh ETA for upcoming stops
    
    TrackingService->>NotificationService: Check for arrival notifications
    NotificationService->>DB: Query passengers waiting<br/>at upcoming stops
    DB->>NotificationService: Return passenger subscriptions
    NotificationService->>Passenger: Send push notification<br/>"Bus approaching your stop"
    
    TripModule->>DriverUI: Return success response
    DriverUI->>Driver: Display confirmation<br/>"Stop updated successfully"
    DriverUI->>DriverUI: Highlight next stop
```

### Key Messages
1. **View active trip**: Driver accesses current trip information
2. **Mark stop reached**: Driver indicates arrival at a stop
3. **Update trip progress**: System records new current stop and GPS coordinates
4. **Calculate ETA**: System computes estimated arrival times for remaining stops
5. **Broadcast update**: WebSocket pushes real-time data to passenger dashboards
6. **Send notifications**: Passengers waiting at upcoming stops receive arrival alerts

---

## 4. Passenger Viewing Bus Arrival Time Sequence Diagram

### Use Case Description
A passenger searches for a route and views the estimated arrival time of the next bus at their desired stop.

### Actors Involved
- Passenger
- Passenger Dashboard
- Route Search Module
- Schedule Engine
- Tracking Service
- Database

### Sequence Diagram

```mermaid
sequenceDiagram
    actor Passenger
    participant UI as Passenger Dashboard
    participant SearchModule as Route Search Module
    participant ScheduleEngine as Schedule Engine
    participant TrackingService as Tracking Service
    participant DB as Database

    Passenger->>UI: Open passenger dashboard
    UI->>Passenger: Display search interface
    
    Passenger->>UI: Enter origin and destination<br/>(e.g., "Piassa to Bole")
    UI->>SearchModule: Submit route search query
    SearchModule->>DB: Query routes matching<br/>origin and destination
    DB->>SearchModule: Return matching routes
    
    alt No Routes Found
        SearchModule->>UI: Return empty result
        UI->>Passenger: Display "No routes available"
    else Routes Found
        SearchModule->>UI: Return route options
        UI->>Passenger: Display list of routes<br/>with route numbers and stops
        
        Passenger->>UI: Select desired route
        UI->>ScheduleEngine: Request schedule information<br/>(Route ID, Current Date/Time)
        ScheduleEngine->>DB: Fetch active schedules<br/>for selected route
        DB->>ScheduleEngine: Return scheduled trips
        
        ScheduleEngine->>TrackingService: Request real-time<br/>bus positions
        TrackingService->>DB: Query active trips on route
        DB->>TrackingService: Return active trip data<br/>(Bus ID, Current Stop, GPS)
        
        TrackingService->>TrackingService: Calculate ETA to<br/>passenger's stop
        
        alt Bus Currently On Route
            TrackingService->>ScheduleEngine: Return real-time ETA<br/>(e.g., "7 minutes")
            ScheduleEngine->>UI: Provide real-time arrival info
            UI->>Passenger: Display "Next bus arrives in 7 minutes"<br/>with bus number and live location
            UI->>UI: Show bus on map approaching stop
            
            loop Real-time Updates
                TrackingService-->>UI: WebSocket update<br/>(Updated ETA every 30 seconds)
                UI-->>Passenger: Refresh arrival time display
            end
            
        else No Bus Currently Active
            ScheduleEngine->>ScheduleEngine: Calculate next scheduled departure
            ScheduleEngine->>UI: Return schedule-based ETA<br/>(e.g., "Next bus at 2:30 PM")
            UI->>Passenger: Display scheduled arrival time
        end
        
        Passenger->>UI: View route details
        UI->>DB: Fetch complete route information<br/>(All stops, Fare, Distance)
        DB->>UI: Return route details
        UI->>Passenger: Display static map with route<br/>and stop markers
    end
```

### Key Messages
1. **Enter search query**: Passenger specifies origin and destination locations
2. **Query matching routes**: System searches database for routes connecting the locations
3. **Fetch schedules**: System retrieves timetable information for the selected route
4. **Request real-time positions**: Tracking service provides live bus locations
5. **Calculate ETA**: System computes estimated arrival time based on current bus position and speed
6. **Display arrival information**: Passenger sees real-time or scheduled arrival time
7. **Real-time updates**: WebSocket continuously refreshes ETA as bus moves

---

## Diagram Notations and Conventions

### UML Sequence Diagram Elements Used

1. **Actor** (Stick figure): External entities interacting with the system
   - Admin, Driver, Passenger

2. **Objects/Components** (Boxes): System components and modules
   - UI Dashboards, Modules, Services, Database

3. **Lifelines** (Vertical dashed lines): Represent the lifespan of objects during the interaction

4. **Messages** (Arrows):
   - **Solid arrow (→)**: Synchronous call action (sender waits for response)
   - **Dashed arrow (⇢)**: Return value or response
   - **Dotted arrow (-->>)**: Asynchronous message (e.g., WebSocket updates)

5. **Activation Boxes**: Represent the period during which an object is processing a message

6. **Alt Fragment**: Shows alternative flows (if-else logic)

7. **Loop Fragment**: Represents repeated actions

8. **Note**: Provides additional context or preconditions

### Design Principles Applied

1. **Separation of Concerns**: Each module has a specific responsibility
2. **Validation-First**: Input validation occurs before business logic
3. **Conflict Detection**: Automated checking prevents scheduling errors
4. **Real-time Communication**: WebSocket enables live updates to passengers
5. **Notification System**: Proactive alerts keep stakeholders informed
6. **Error Handling**: Alternative flows handle validation failures and conflicts

---

## System Objects and Responsibilities

### Admin Dashboard Objects
- **Bus Management Module**: Handles CRUD operations for buses
- **Schedule Management Module**: Creates and manages schedules
- **Data Validator**: Ensures data integrity and format
- **Conflict Detector**: Identifies scheduling conflicts

### Driver Dashboard Objects
- **Trip Management Module**: Controls trip lifecycle (start, update, end)
- **Tracking Service**: Manages real-time location updates

### Passenger Dashboard Objects
- **Route Search Module**: Finds routes matching passenger queries
- **Schedule Engine**: Provides timetable information
- **Tracking Service**: Delivers real-time bus positions and ETAs

### Shared Services
- **Database**: Persistent storage for all system data
- **WebSocket Server**: Enables real-time bidirectional communication
- **Notification Service**: Sends alerts via SMS/Push notifications

---

## Implementation Notes

### Technology Stack
- **Frontend**: Next.js with TypeScript, Tailwind CSS
- **Backend**: Node.js, GraphQL, Apollo Server
- **Database**: MongoDB with Prisma ORM
- **Real-time**: WebSocket for live updates
- **Authentication**: JWT-based secure access

### Key Features Illustrated
1. **Data Validation**: All user inputs are validated before processing
2. **Duplicate Prevention**: System checks for existing records
3. **Automated Conflict Detection**: Prevents double-booking of buses/drivers
4. **Real-time Updates**: Live tracking via WebSocket connections
5. **ETA Calculation**: Dynamic arrival time estimation based on GPS data
6. **Notification System**: Proactive alerts for drivers and passengers

### Alignment with Requirements
These sequence diagrams directly support the functional requirements outlined in Chapter 2:
- ✅ Bus and Driver Registration (Use Case 1)
- ✅ Route and Schedule Management (Use Case 2)
- ✅ Real-time Tracking (Use Case 3)
- ✅ Passenger Information Access (Use Case 4)
- ✅ Automated Conflict Detection (Use Case 2)
- ✅ Incident Management (Extensible from Use Case 3)

---

## References
- **Chapter 1**: System Overview and Objectives
- **Chapter 2**: Business Area Analysis and Requirements
- **Admin Dashboard**: Bus, Driver, Route, Schedule, Feedback, Incident Management
- **Driver Dashboard**: Trip Management, Navigation, Incident Reporting
- **Passenger App**: Route Search, Real-time Tracking, Journey Planning

---

*Generated for: Public Bus Tracking and Scheduling System (PBTS)*  
*Project Team: Addis Ababa University - School of Information Science*  
*Date: November 2025*
