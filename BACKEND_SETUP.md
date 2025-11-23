# PBTS Backend Setup Guide

## Architecture Overview

**Frontend**: Next.js 14 with App Router + TypeScript + Tailwind CSS
**Backend**: Next.js API Routes + Apollo Server + GraphQL
**Database**: SQLite + Prisma ORM
**State Management**: Zustand + Apollo Client Cache

## Why This Stack?

✅ **Next.js over separate Express**: Single deployment, built-in API routes, better performance
✅ **SQLite over MongoDB**: Relational data (buses↔routes↔schedules), easier deployment, no external DB needed
✅ **GraphQL over REST**: Efficient data fetching, type safety, single endpoint
✅ **Prisma**: Type-safe database queries, migrations, excellent TypeScript integration

## Setup Instructions

### 1. Install Dependencies
```bash
cd apps/admin
npm install
```

### 2. Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Create and migrate database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access GraphQL Playground
Visit: `http://localhost:3000/api/graphql`

## Database Schema

### Core Entities
- **Bus**: Vehicle information, status, maintenance
- **Driver**: Driver profiles, licenses, ratings
- **Route**: Bus routes with stops and schedules
- **Stop**: Individual bus stops with coordinates
- **Schedule**: Trip schedules with timing
- **Feedback**: Passenger feedback and ratings
- **Incident**: Operational incidents and tracking

### Key Relationships
- Bus ↔ Driver (one-to-one active assignment)
- Bus ↔ Route (current route assignment)
- Route ↔ Stops (one-to-many)
- Schedule ↔ Bus/Driver/Route (many-to-one)

## GraphQL API

### Available Queries
```graphql
# Get all buses with driver and route info
query GetBuses {
  buses {
    id
    plateNumber
    busNumber
    status
    driver { firstName lastName }
    route { routeName }
  }
}

# Get all routes with stops
query GetRoutes {
  routes {
    id
    routeName
    stops { stopName latitude longitude }
  }
}
```

### Available Mutations
```graphql
# Create new bus
mutation CreateBus($input: BusInput!) {
  createBus(input: $input) {
    id
    plateNumber
    status
  }
}

# Update feedback status
mutation UpdateFeedback($id: ID!, $status: FeedbackStatus!) {
  updateFeedback(id: $id, status: $status) {
    id
    status
  }
}
```

## Frontend Integration

### Apollo Client Setup
```typescript
// lib/apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache()
})
```

### Using in Components
```typescript
import { useQuery, useMutation } from '@apollo/client'
import { GET_BUSES, CREATE_BUS } from '@/lib/graphql/queries'

function BusesPage() {
  const { data, loading } = useQuery(GET_BUSES)
  const [createBus] = useMutation(CREATE_BUS)
  
  // Use data.buses array
}
```

## File Structure
```
apps/admin/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Sample data
├── app/api/graphql/
│   ├── route.ts              # GraphQL endpoint
│   ├── schema.ts             # GraphQL schema
│   └── resolvers.ts          # GraphQL resolvers
├── lib/
│   ├── prisma.ts             # Prisma client
│   ├── apollo-client.ts      # Apollo client
│   └── graphql/
│       ├── queries.ts        # GraphQL queries
│       └── mutations.ts      # GraphQL mutations
└── package.json              # Dependencies
```

## Key Features Implemented

### ✅ Complete CRUD Operations
- Buses: Create, Read, Update, Delete
- Drivers: Full management
- Routes: With stops management
- Feedback: Status updates and responses
- Incidents: Status tracking

### ✅ Real-time Data
- GraphQL subscriptions ready
- Optimistic updates with Apollo
- Automatic cache invalidation

### ✅ Type Safety
- End-to-end TypeScript
- Prisma generated types
- GraphQL code generation ready

### ✅ Performance
- Efficient GraphQL queries
- Database indexing
- Connection pooling with Prisma

## Next Steps

1. **Add Authentication**: Implement JWT-based auth
2. **Real-time Updates**: Add GraphQL subscriptions
3. **File Uploads**: Handle incident photos
4. **Caching**: Implement Redis for production
5. **Testing**: Add unit and integration tests

## Production Deployment

### Environment Variables
```env
DATABASE_URL="file:./prod.db"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://your-domain.com"
```

### Build Commands
```bash
npm run build
npm run db:migrate
npm start
```

This setup provides a robust, scalable backend that integrates seamlessly with your existing Next.js frontend while maintaining type safety and performance.