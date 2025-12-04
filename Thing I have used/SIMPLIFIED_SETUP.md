# Simplified PBTS System Setup

## Architecture
- **3 Independent Frontend Dashboards** (Admin, Driver, Passenger)
- **1 Shared Backend API** (Node.js + Express)
- **1 MongoDB Atlas Database** (Shared by all)

## Environment Configuration
- **Root `.env`** - Shared database connection
- **Backend `.env`** - API server configuration
- **No .env files in dashboard apps** - They connect to shared backend

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to MongoDB Atlas
npm run db:push

# Seed with sample data
cd backend && npm run db:seed
```

### 3. Start All Services
```bash
# Start backend API (port 3005)
cd backend && npm run dev

# Start all dashboards
npm run dev:all
```

## Access Points
- **Admin Dashboard**: http://localhost:3000
- **Passenger App**: http://localhost:3001  
- **Driver App**: http://localhost:3003
- **Backend API**: http://localhost:3005

## Database Connection
All apps connect to the same MongoDB Atlas database:
`mongodb+srv://beshah_db_user:my_password@cluster0.v0n4kvy.mongodb.net/pbts_system`

## Data Flow
```
Admin Dashboard (3000) ──┐
                         ├──► Backend API (3005) ──► MongoDB Atlas
Driver App (3003) ──────┤
                         │
Passenger App (3001) ────┘
```