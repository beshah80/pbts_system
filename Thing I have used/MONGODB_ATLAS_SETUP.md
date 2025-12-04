# MongoDB Atlas Setup Guide

## 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create new project: "PBTS System"

## 2. Create Database Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select cloud provider and region
4. Name cluster: "pbts-cluster"

## 3. Configure Database Access
1. Go to "Database Access"
2. Add new database user:
   - Username: `pbts_user`
   - Password: Generate secure password
   - Role: `Atlas admin`

## 4. Configure Network Access
1. Go to "Network Access"
2. Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
   - For production, use specific IP addresses

## 5. Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your database password

## 6. Update Environment Variables

### Root `.env`:
```
DATABASE_URL="mongodb+srv://pbts_user:YOUR_PASSWORD@pbts-cluster.xxxxx.mongodb.net/pbts_system?retryWrites=true&w=majority"
```

### Backend `.env`:
```
DATABASE_URL="mongodb+srv://pbts_user:YOUR_PASSWORD@pbts-cluster.xxxxx.mongodb.net/pbts_system?retryWrites=true&w=majority"
JWT_SECRET="pbts_secret_key_2024"
PORT=3005
```

### All Apps `.env.local`:
```
DATABASE_URL="mongodb+srv://pbts_user:YOUR_PASSWORD@pbts-cluster.xxxxx.mongodb.net/pbts_system?retryWrites=true&w=majority"
```

## 7. Initialize Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to MongoDB Atlas
npm run db:push

# Seed with sample data
cd backend && npm run db:seed
```

## 8. Verify Connection
- Check MongoDB Atlas dashboard for collections
- Should see: users, admins, drivers, buses, routes, feedback

## Security Notes
- Never commit real connection strings to Git
- Use environment variables for all sensitive data
- Rotate passwords regularly
- Use IP whitelisting in production