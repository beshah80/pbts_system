// Calculate real distance between two coordinates (simplified)
export function calculateRealDistance(startCoords: [number, number], endCoords: [number, number]): number {
  // Use straight-line distance for simplicity
  return calculateStraightLineDistance(startCoords, endCoords);
}

// Calculate estimated travel time based on distance and average speed
export function calculateTravelTime(distance: number): number {
  const averageSpeedKmh = 25; // Average bus speed in Addis Ababa
  const timeHours = distance / averageSpeedKmh;
  return Math.round(timeHours * 60); // Convert to minutes
}

// Removed complex routing functions - using simple distance calculation

// Calculate straight-line distance using Haversine formula
function calculateStraightLineDistance(coord1: [number, number], coord2: [number, number]): number {
  // Handle different coordinate formats
  if (!coord1 || !coord2 || !Array.isArray(coord1) || !Array.isArray(coord2)) {
    return 0;
  }
  
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  
  if (typeof lat1 !== 'number' || typeof lon1 !== 'number' || 
      typeof lat2 !== 'number' || typeof lon2 !== 'number') {
    return 0;
  }
  
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Get coordinates for known locations
// NOTE: This function should be replaced with database API calls
export function getLocationCoordinates(location: string): [number, number] | null {
  console.warn('getLocationCoordinates uses hardcoded data. Use API to fetch coordinates from database.');
  
  // TODO: Replace with API call to fetch coordinates from database
  // Example: return await fetchLocationCoordinates(location);
  
  return null; // Return null to force API usage
}