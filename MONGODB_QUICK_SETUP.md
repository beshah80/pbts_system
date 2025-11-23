# Quick MongoDB Setup

## Option 1: Local MongoDB (Easiest)

### 1. Download MongoDB Community Server
- Go to: https://www.mongodb.com/try/download/community
- Download for Windows
- Install with default settings

### 2. Start MongoDB
```bash
# Method 1: As Windows Service (automatic)
# MongoDB should start automatically after installation

# Method 2: Manual start
mongod --dbpath C:\data\db
```

### 3. Verify MongoDB is running
```bash
# Open new terminal and run:
mongosh
# Should connect to MongoDB shell
```

## Option 2: MongoDB Atlas (Cloud - Free)

### 1. Create Account
- Go to: https://cloud.mongodb.com
- Sign up for free account

### 2. Create Cluster
- Choose "Build a Database" 
- Select "M0 Sandbox" (Free tier)
- Choose region closest to you
- Create cluster

### 3. Get Connection String
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string
- Replace `<password>` with your actual password

### 4. Update Environment File
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/pbts_admin"
```

## Quick Test Setup (Use this for now)

If you want to test immediately without installing MongoDB:

1. Use MongoDB Atlas (free cloud option)
2. Or use this temporary connection string in `.env.local`:

```env
# Temporary test database (replace with your own)
DATABASE_URL="mongodb+srv://test:test123@cluster0.mongodb.net/pbts_test"
```