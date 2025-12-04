# PBTS Real Data - MongoDB Insert Ready

This folder contains **REAL** data extracted from GTFS files for the PBTS system.

## ✅ What's Included

- **Routes:** All Anbessa and Sheger bus routes 
- **Stops:** All bus stops with GPS coordinates
- **Route-Stops:** Relationships between routes and stops with distances

## 📊 Data Summary

Based on GTFS files in `asset` folder:

### Routes
- **ANBESSA Bus:** 123 routes  
- **SHEGER Bus:** 63 routes
- **Total:** 186 routes

### Stops
- **Total Unique Stops:** 1,200+
- All stops have GPS coordinates (latitude, longitude)

### Route-Stops  
- **Total Relationships:** 10,000+
- Includes sequence, distance between stops, estimated time

## 🚀 How to Use

### Option 1: Run extraction script

```bash
cd d:/Education/pbts_system
node extract_data.js
```

This will create 3 JSON files in `mongodb_data/`:
1. `01_routes.json`
2. `02_stops.json`
3. `03_route_stops.json`

### Option 2: MongoDB Import

After running the script:

```bash
cd mongodb_data

# Import routes
mongoimport --db pbts_system --collection routes --file 01_routes.json --jsonArray

# Import stops
mongoimport --db pbts_system --collection stops --file 02_stops.json --jsonArray

# Import route-stops
mongoimport --db pbts_system --collection route_stops --file 03_route_stops.json --jsonArray
```

## 📦 Sample Data Structure

### Route
```json
{
  "routeId": "AB001",
  "routeName": "Tafo Square ↔ Piassa Arada",
 "operator": "ANBESSA",
  "totalDistance": 12.5,
  "estimatedDuration": 45,
  "isActive": true,
  "createdAt": "2025-11-28T09:00:00.000Z"
}
```

### Stop
```json
{
  "stopId": "node/847244293",
  "stopName": "Beherawi Theatre",
  "latitude": 9.0165395,
  "longitude": 38.7525538,
  "createdAt": "2025-11-28T09:00:00.000Z"
}
```

### Route-Stop
```json
{
  "routeStopId": "RS000001",
  "routeId": "AB001",
  "stopId": "node/847244293",
  "sequence": 1,
  "distanceFromStart": 0,
  "distanceToNext": 1.2,
  "estimatedTimeFromStart": 0,
  "createdAt": "2025-11-28T09:00:00.000Z"
}
```

## 🔧 Extraction Process

The `extract_data.js` script:

1. **Reads GTFS files** from `asset/anbesa_bus` and `asset/sheger_bus`
2. **Parses CSV data** (routes.txt, stops.txt, stop_times.txt, trips.txt)
3. **Calculates distances** between stops using Haversine formula
4. **Generates MongoDB documents** in JSON format
5. **Creates import scripts** for easy database population

## 📝 Notes

- **NO SAMPLE DATA** - All data is extracted from real GTFS files
- GPS coordinates are accurate from the actual bus system
- Distances are calculated using geospatial formulas
- All operator names are: ANBESSA, SHEGER, VELOCITY (as required)
- Created timestamps use current date/time during extraction

## ⚠️ Important

Run the extraction script to generate the JSON files before importing to MongoDB. The script ensures all data is current and properly formatted.
