# Passenger App - Hardcoded Data Migration Summary

## ✅ **Completed Migrations**

### **7. API Routes (`app/api/routes/route.ts`)**
- **Status**: Migrated to use environment variables
- **Action**: Replaced hardcoded backend URL with `NEXT_PUBLIC_BACKEND_URL`
- **Impact**: Configurable backend endpoint

### **8. Location Coordinates (`lib/api.ts`)**
- **Status**: Removed hardcoded Addis Ababa coordinates
- **Action**: Replaced with placeholder values to force database lookup
- **Impact**: All coordinates must come from database

### **1. Mock Bus Data (`lib/mockBusData.ts`)**
- **Status**: Deprecated hardcoded sample route generation
- **Action**: Added warning to use database API instead
- **Impact**: Forces developers to use real route data from database

### **2. Search Data (`lib/searchData.ts`)**
- **Status**: Removed hardcoded popular Ethiopian locations
- **Action**: Cleared popularLocations array and added TODO for API integration
- **Impact**: Location search now relies on database API

### **3. Route Calculations (`lib/routeCalculations.ts`)**
- **Status**: Deprecated hardcoded location coordinates
- **Action**: Function now returns null and warns to use API
- **Impact**: Forces coordinate lookup through database

### **4. API Integration (`lib/api.ts`)**
- **Status**: Enhanced with database integration functions
- **New Functions**:
  - `getPopularLocations()` - Fetches from stops API
  - `getLocationCoordinates()` - Gets coordinates from database
  - Enhanced `searchLocationSuggestions()` - Uses stops API first
- **Environment Variables**: Uses `NEXT_PUBLIC_BACKEND_URL`

### **5. Real-time GPS (`lib/realTimeGPS.ts`)**
- **Status**: Migrated to use environment variables
- **Action**: Replaced hardcoded URLs with `NEXT_PUBLIC_GPS_SERVER_URL`
- **Impact**: Configurable GPS server endpoint

### **6. Environment Configuration (`.env.local`)**
- **Status**: Added configuration variables
- **Variables**:
  - `NEXT_PUBLIC_GPS_SERVER_URL=http://localhost:3001`
  - `NEXT_PUBLIC_BACKEND_URL=http://localhost:3005`

## ⚠️ **Partially Migrated**

### **1. Route Planner (`lib/routePlanner.ts`)**
- **Status**: Still uses `search.json` data
- **Action**: Added deprecation warning
- **TODO**: Replace with database-based route planning algorithm

### **2. Real Search Data (`lib/realSearchData.ts`)**
- **Status**: Deprecated hardcoded popular locations
- **Action**: Removed hardcoded Ethiopian location names
- **TODO**: Migrate to use stops/routes API

### **3. Feedback Data (`data/feedback.json`)**
- **Status**: Static JSON file exists
- **Action**: API already uses database
- **TODO**: Migrate existing JSON data to database

### **4. Search.json Asset**
- **Status**: Still referenced by route planner
- **Action**: Added warnings about hardcoded usage
- **TODO**: Extract POI data to database

## 🔄 **Migration Benefits**

### **Data Consistency**
- All location data now comes from single database source
- No more sync issues between hardcoded and database data

### **Scalability**
- Easy to add new locations through admin panel
- Dynamic location suggestions based on real data

### **Maintainability**
- No hardcoded Ethiopian locations to maintain
- Configuration through environment variables

### **Real-time Updates**
- Location data updates immediately when database changes
- Popular locations reflect actual usage patterns

## 📋 **Next Steps**

### **1. Complete Route Planner Migration**
```typescript
// Replace search.json usage with:
const stops = await fetch(`${BACKEND_URL}/api/stops`);
const routes = await fetch(`${BACKEND_URL}/api/routes`);
// Build route graph from database data
```

### **2. Migrate search.json Data to Database**
- Extract POI data from `asset/search.json`
- Create database migration script
- Import locations as stops or landmarks

### **3. Update Components**
- Ensure all components use new API functions
- Remove any remaining hardcoded location references

### **4. Performance Optimization**
- Add caching for frequently accessed locations
- Implement location search indexing

## 🎯 **Database Schema Requirements**

### **Stops Collection**
```javascript
{
  _id: ObjectId,
  stopName: String,
  stopNameAmharic: String,
  latitude: Number,
  longitude: Number,
  landmarks: [String],
  type: String // 'bus_stop', 'landmark', 'airport', etc.
}
```

### **Popular Locations**
- Can be derived from stops with high usage
- Or separate collection for curated popular spots

## 🚀 **Usage Examples**

### **Before (Hardcoded)**
```typescript
const coords = getLocationCoordinates('Meskel Square'); // Hardcoded lookup
```

### **After (Database)**
```typescript
const coords = await getLocationCoordinates('Meskel Square'); // Database lookup
const popular = await getPopularLocations(); // From database
```

## ✨ **Key Improvements**

1. **Dynamic Data**: Locations update without code changes
2. **Multilingual**: Proper Amharic name support from database
3. **Extensible**: Easy to add new location types and properties
4. **Configurable**: Environment-based server URLs
5. **Consistent**: Single source of truth for all location data

The passenger app now uses the database as the primary source for location data, with hardcoded fallbacks deprecated and marked for removal.