# Start All Independent Dashboards

## Overview
Each dashboard runs independently on different ports but shares the same MongoDB database for seamless communication.

## Ports Configuration
- **Admin Dashboard**: http://localhost:3000
- **Passenger Dashboard**: http://localhost:3001  
- **Driver Dashboard**: http://localhost:3003

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Shared Database
```bash
npm run db:generate
npm run db:push
```

### 3. Start All Dashboards
```bash
npm run dev:all
```

### 4. Start Individual Dashboards
```bash
# Admin only
npm run dev:admin

# Driver only  
npm run dev:driver

# Passenger only
npm run dev:passenger
```

## Database Communication
All three dashboards share the same MongoDB database (`pbts_system`) which enables:
- Real-time data synchronization
- Cross-dashboard communication
- Unified data management
- Consistent state across all applications

## Independent Features
Each dashboard operates independently with:
- Separate authentication systems
- Individual UI/UX optimized for user type
- Role-based access control
- Dedicated API endpoints
- Independent deployment capability