// Search data processor for Ethiopian locations
import searchData from '../../../asset/search.json';

export interface LocationData {
  id: string;
  name: string;
  nameAmharic?: string;
  coordinates: [number, number]; // [longitude, latitude]
  address?: string;
  type?: string;
  alternativeNames?: string[];
}

// Process the search.json data into a more usable format
export function processSearchData(): LocationData[] {
  const locations: LocationData[] = [];
  
  // Handle the actual structure of search.json which appears to be coordinate mappings
  if (searchData && typeof searchData === 'object') {
    Object.entries(searchData).forEach(([stopId, connections]) => {
      if (Array.isArray(connections) && connections.length > 0) {
        // Use the first connection's coordinates as the stop location
        const [firstConnection] = connections;
        if (Array.isArray(firstConnection) && firstConnection.length >= 2) {
          const [connectedStopId, coordinates] = firstConnection;
          if (Array.isArray(coordinates) && coordinates.length === 2) {
            locations.push({
              id: stopId,
              name: `Stop ${stopId}`,
              nameAmharic: `ማቆሚያ ${stopId}`,
              coordinates: [coordinates[0], coordinates[1]], // [lng, lat]
              type: 'bus_stop'
            });
          }
        }
      }
    });
  }
  
  // Add some popular Ethiopian locations manually for better UX
  const popularLocations: LocationData[] = [
    {
      id: 'meskel_square',
      name: 'Meskel Square',
      nameAmharic: 'መስቀል አደባባይ',
      coordinates: [38.7635, 9.0082],
      type: 'landmark'
    },
    {
      id: 'bole_airport',
      name: 'Bole International Airport',
      nameAmharic: 'ቦሌ አለም አቀፍ አየር ማረፊያ',
      coordinates: [38.7988, 8.9806],
      type: 'airport'
    },
    {
      id: 'mercato',
      name: 'Mercato',
      nameAmharic: 'መርካቶ',
      coordinates: [38.7369, 9.0369],
      type: 'market'
    },
    {
      id: 'piazza',
      name: 'Piazza',
      nameAmharic: 'ፒያሳ',
      coordinates: [38.7523, 9.0456],
      type: 'landmark'
    },
    {
      id: 'kazanchis',
      name: 'Kazanchis',
      nameAmharic: 'ካዛንቺስ',
      coordinates: [38.7567, 9.0312],
      type: 'business_district'
    },
    {
      id: 'arat_kilo',
      name: 'Arat Kilo',
      nameAmharic: 'አራት ኪሎ',
      coordinates: [38.7545, 9.0389],
      type: 'landmark'
    }
  ];
  
  return [...locations, ...popularLocations];
}

// Search locations by name (supports both English and Amharic)
export function searchLocations(query: string, limit: number = 10): LocationData[] {
  if (!query || query.trim().length < 2) return [];
  
  const locations = processSearchData();
  const searchTerm = query.toLowerCase().trim();
  
  const matches = locations.filter(location => {
    // Search in main name
    if (location.name.toLowerCase().includes(searchTerm)) return true;
    
    // Search in Amharic name
    if (location.nameAmharic && location.nameAmharic.toLowerCase().includes(searchTerm)) return true;
    
    // Search in alternative names
    if (location.alternativeNames && location.alternativeNames.some(alt => 
      alt.toLowerCase().includes(searchTerm)
    )) return true;
    
    // Search in address
    if (location.address && location.address.toLowerCase().includes(searchTerm)) return true;
    
    return false;
  });
  
  // Sort by relevance (exact matches first, then partial matches)
  matches.sort((a, b) => {
    const aExact = a.name.toLowerCase() === searchTerm || 
                   (a.nameAmharic && a.nameAmharic.toLowerCase() === searchTerm);
    const bExact = b.name.toLowerCase() === searchTerm || 
                   (b.nameAmharic && b.nameAmharic.toLowerCase() === searchTerm);
    
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    
    // Then by name length (shorter names first for partial matches)
    return a.name.length - b.name.length;
  });
  
  return matches.slice(0, limit);
}

// Get locations by type (e.g., 'amenity:bus_station', 'shop:supermarket')
export function getLocationsByType(type: string): LocationData[] {
  const locations = processSearchData();
  return locations.filter(location => location.type === type);
}

// Get popular/important locations (bus stations, major landmarks, etc.)
export function getPopularLocations(): LocationData[] {
  const locations = processSearchData();
  
  const importantTypes = [
    'amenity:bus_station',
    'public_transport:station',
    'tourism:attraction',
    'amenity:marketplace',
    'office:government'
  ];
  
  const popularNames = [
    'Meskel Square',
    'Bole',
    'Piazza',
    'Mercato',
    'Kazanchis',
    'Arat Kilo',
    'Mexico',
    'Stadium',
    'Airport'
  ];
  
  return locations.filter(location => {
    // Filter by important types
    if (location.type && importantTypes.includes(location.type)) return true;
    
    // Filter by popular names
    if (popularNames.some(name => 
      location.name.toLowerCase().includes(name.toLowerCase())
    )) return true;
    
    return false;
  }).slice(0, 20); // Limit to top 20
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  coord1: [number, number], 
  coord2: [number, number]
): number {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
}

// Find nearby locations
export function findNearbyLocations(
  coordinates: [number, number], 
  radiusKm: number = 5,
  limit: number = 10
): LocationData[] {
  const locations = processSearchData();
  
  const nearby = locations
    .map(location => ({
      ...location,
      distance: calculateDistance(coordinates, location.coordinates)
    }))
    .filter(location => location.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
  
  return nearby.map(({ distance, ...location }) => location);
}