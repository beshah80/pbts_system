# MongoDB Setup for PBTS Admin

## Quick Setup

### 1. Install MongoDB locally
```bash
# Windows (using Chocolatey)
choco install mongodb

# Or download from: https://www.mongodb.com/try/download/community
```

### 2. Start MongoDB
```bash
mongod --dbpath C:\data\db
```

### 3. Setup Project
```bash
cd apps/admin
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

## Production (MongoDB Atlas)

1. Create account at https://cloud.mongodb.com
2. Create cluster (free tier available)
3. Get connection string
4. Update `.env.local`:
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/pbts_admin"
```

## Why MongoDB?

✅ **Horizontal Scaling**: Easy to scale across multiple servers
✅ **Flexible Schema**: Can evolve data structure without migrations  
✅ **High Performance**: Optimized for read-heavy workloads
✅ **Cloud Ready**: MongoDB Atlas for production deployment
✅ **JSON Native**: Perfect match for GraphQL and JavaScript

The schema is now optimized for MongoDB with proper ObjectId references and indexing.