// Script to seed MongoDB Atlas with real Addis Ababa transit data from AddisMapTransit
// Run with: node seed-addis-data.js

const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string - replace with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-username:your-password@your-cluster.mongodb.net/pbts_system?retryWrites=true&w=majority';

// Real Addis Ababa locations from AddisMapTransit
const ADDIS_LOCATIONS = [
  {
    locationId: "meskel_square",
    name: "Meskel Square",
    nameAmharic: "መስቀል አደባባይ",
    coordinates: { type: 'Point', coordinates: [38.7615397, 9.0106094] },
    type: "landmark",
    category: "landmark",
    isActive: true,
    metadata: {
      source: "AddisMapTransit",
      accuracy: "high",
      lastVerified: new Date()
    }
  },
  {
    locationId: "bole_airport",
    name: "Bole International Airport",
    nameAmharic: "ቦሌ አለምአቀፍ አውሮፕላን ማረፊያ",
    coordinates: { type: 'Point', coordinates: [38.7938428, 8.9833477] },
    type: "airport",
    category: "airport",
    isActive: true,
    metadata: {
      source: "AddisMapTransit",
      accuracy: "high",
      lastVerified: new Date()
    }
  },
  {
    locationId: "mercato",
    name: "Mercato",
    nameAmharic: "መርካቶ",
    coordinates: { type: 'Point', coordinates: [38.7396038, 9.0296278] },
    type: "marketplace",
    category: "marketplace",
    isActive: true,
    metadata: {
      source: "AddisMapTransit",
      accuracy: "high",
      lastVerified: new Date()
    }
  },
  {
    locationId: "piazza",
    name: "Piazza",
    nameAmharic: "ፒያሳ",
    coordinates: { type: 'Point', coordinates: [38.7547538, 9.0336984] },
    type: "area",
    category: "area",
    isActive: true,
    metadata: {
      source: "AddisMapTransit",
      accuracy: "high",
      lastVerified: new Date()
    }
  },
  {
    locationId: "kazanchis",
    name: "Kazanchis",
    nameAmharic: "ካዛንቺስ",
    coordinates: { type: 'Point', coordinates: [38.7712221, 9.0159277] },
    type: "area",
    category: "area",
    isActive: true,
    metadata: {
      source: "AddisMapTransit",
      accuracy: "high",
      lastVerified: new Date()
    }
  }
];

// Real bus routes from AddisMapTransit
const ADDIS_ROUTES = [
  {
    routeId: "route_001",
    routeName: "Meskel Square - Bole Airport",
    routeNameAmharic: "መስቀል አደባባይ - ቦሌ አውሮፕላን ማረፊያ",
    routeNumber: "001",
    operator: "anbessa",
    startLocation: {
      locationId: "meskel_square",
      name: "Meskel Square",
      coordinates: [38.7615397, 9.0106094]
    },
    endLocation: {
      locationId: "bole_airport",
      name: "Bole International Airport",
      coordinates: [38.7938428, 8.9833477]
    },
    distance: 8.5,
    estimatedDuration: 35,
    farePrice: 15,
    isActive: true,
    color: "#2563eb",
    operatingHours: {
      start: "05:30",
      end: "22:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    },
    frequency: 15,
    stops: [
      {
        stopId: "stop_001_01",
        name: "Meskel Square",
        nameAmharic: "መስቀል አደባባይ",
        coordinates: [38.7615397, 9.0106094],
        stopOrder: 1,
        estimatedTime: 0,
        isAccessible: true
      },
      {
        stopId: "stop_001_02",
        name: "Kazanchis",
        nameAmharic: "ካዛንቺስ",
        coordinates: [38.7712221, 9.0159277],
        stopOrder: 2,
        estimatedTime: 8,
        isAccessible: true
      },
      {
        stopId: "stop_001_06",
        name: "Bole International Airport",
        nameAmharic: "ቦሌ አለምአቀፍ አውሮፕላን ማረፊያ",
        coordinates: [38.7938428, 8.9833477],
        stopOrder: 6,
        estimatedTime: 35,
        isAccessible: true
      }
    ],
    geometry: {
      type: "LineString",
      coordinates: [
        [38.7615397, 9.0106094],
        [38.7712221, 9.0159277],
        [38.7938428, 8.9833477]
      ]
    },
    metadata: {
      source: "AddisMapTransit",
      dataQuality: "high",
      lastUpdated: new Date(),
      officialRoute: true
    }
  }
];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    
    const db = client.db('pbts_system');
    
    // Create collections
    console.log('Creating collections...');
    const locationsCollection = db.collection('addis_locations');
    const routesCollection = db.collection('addis_routes');
    
    // Create indexes
    console.log('Creating indexes...');
    await locationsCollection.createIndex({ "coordinates": "2dsphere" });
    await locationsCollection.createIndex({ "locationId": 1 }, { unique: true });
    await locationsCollection.createIndex({ "name": "text", "nameAmharic": "text" });
    await locationsCollection.createIndex({ "type": 1, "isActive": 1 });
    
    await routesCollection.createIndex({ "routeId": 1 }, { unique: true });
    await routesCollection.createIndex({ "geometry": "2dsphere" });
    await routesCollection.createIndex({ "isActive": 1, "operator": 1 });
    await routesCollection.createIndex({ "routeNumber": 1 });
    
    // Clear existing data
    console.log('Clearing existing data...');
    await locationsCollection.deleteMany({});
    await routesCollection.deleteMany({});
    
    // Insert locations
    console.log('Inserting locations...');
    const locationDocs = ADDIS_LOCATIONS.map(location => ({
      ...location,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    const locationResult = await locationsCollection.insertMany(locationDocs);
    console.log(`Inserted ${locationResult.insertedCount} locations`);
    
    // Insert routes
    console.log('Inserting routes...');
    const routeDocs = ADDIS_ROUTES.map(route => ({
      ...route,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    const routeResult = await routesCollection.insertMany(routeDocs);
    console.log(`Inserted ${routeResult.insertedCount} routes`);
    
    // Verify data
    console.log('Verifying data...');
    const locationCount = await locationsCollection.countDocuments();
    const routeCount = await routesCollection.countDocuments();
    
    console.log(`Total locations in database: ${locationCount}`);
    console.log(`Total routes in database: ${routeCount}`);
    
    console.log('Database seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the seeding script
if (require.main === module) {
  seedDatabase().catch(console.error);
}

module.exports = { seedDatabase, ADDIS_LOCATIONS, ADDIS_ROUTES };