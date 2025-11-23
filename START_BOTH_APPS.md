# Start Both Apps

## You need to run BOTH servers:

### 1. Start Admin Server (GraphQL Backend)
```bash
cd apps/admin
npm run dev
# This runs on http://localhost:3000
```

### 2. Start Passenger App (Frontend)
```bash
# Open NEW terminal window
cd apps/passenger
npm run dev
# This runs on http://localhost:3001
```

## The Issue:
- Passenger app (port 3001) needs to connect to Admin GraphQL API (port 3000)
- If admin server isn't running, you get "Failed to fetch" error

## Test Order:
1. Start admin first → wait for "Ready on http://localhost:3000"
2. Start passenger second → should connect successfully
3. Visit http://localhost:3001 → should load routes from database