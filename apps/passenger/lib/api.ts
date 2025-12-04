// Direct API calls to passenger app's own routes
const API_BASE = '/api'
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3005'



export interface Route {
  id: string;
  routeNumber: string;
  routeName: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  estimatedDuration: number;
  farePrice: number;
  isActive: boolean;
  stops: Array<{
    id: string;
    stopName: string;
    latitude: number;
    longitude: number;
    stopOrder: number;
  }>;
  currentBuses?: Array<{
    id: number;
    busNumber: string;
    status: string;
    latitude?: number;
    longitude?: number;
  }>;
  nextDepartures?: Array<{
    departureTime: string;
    busId: number;
  }>;
}

export interface RouteSearchResult {
  route: Route;
  nextDepartures: Array<{
    departureTime: string;
    busId: number;
  }>;
  estimatedArrival: string;
  currentBuses: Array<{
    id: number;
    busNumber: string;
    status: string;
    latitude?: number;
    longitude?: number;
  }>;
}

export async function searchRoutes(from?: string, to?: string): Promise<RouteSearchResult[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/routes`)
    if (!response.ok) throw new Error('Failed to fetch')
    
    let routes: Route[] = await response.json()
    
    // Filter by locations if provided
    if (from || to) {
      routes = routes.filter(route => {
        // Check if the route name follows the format "From -> To"
        const directRoutePattern = new RegExp(`^${from}\s*->\s*${to}$`, 'i');
        if (route.routeName && directRoutePattern.test(route.routeName.trim())) {
          return true;
        }
        
        // Also check if the route name is in the format "To -> From"
        const reverseRoutePattern = new RegExp(`^${to}\s*->\s*${from}$`, 'i');
        if (route.routeName && reverseRoutePattern.test(route.routeName.trim())) {
          return true;
        }
        
        // Fallback to the original matching if no direct route is found
        const routeParts = route.routeName?.split(' - ') || [];
        const startLoc = route.startLocation || routeParts[0] || '';
        const endLoc = route.endLocation || routeParts[1] || '';
        const fullRouteName = route.routeName || '';
        
        const matchesFrom = !from || 
          startLoc.toLowerCase().includes(from.toLowerCase()) ||
          fullRouteName.toLowerCase().includes(from.toLowerCase())
        const matchesTo = !to || 
          endLoc.toLowerCase().includes(to.toLowerCase()) ||
          fullRouteName.toLowerCase().includes(to.toLowerCase())
        return matchesFrom && matchesTo
      })
    }
    
    return routes.map(route => ({
      route,
      nextDepartures: [], // No mock data - will be populated from real schedules API
      estimatedArrival: calculateArrivalTime(route.estimatedDuration),
      currentBuses: []
    }))
  } catch (error) {
    console.error('Error searching routes:', error)
    throw new Error('Failed to search routes. Please check your connection.')
  }
}

export async function getPopularRoutes(): Promise<Route[]> {
  try {
    const allRoutes = await getAllRoutes()
    return allRoutes.slice(0, 6)
  } catch (error) {
    console.error('Error loading popular routes:', error)
    return []
  }
}

export async function getRouteById(id: string): Promise<Route | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/routes`)
    if (!response.ok) throw new Error('Failed to fetch')
    
    const routes: Route[] = await response.json()
    return routes.find(route => route.id === id) || null
  } catch (error) {
    console.error('Error fetching route from backend, using JSON fallback:', error)
    
    // Fallback to JSON data
    try {
      const allRoutes = await getAllRoutes()
      return allRoutes.find(route => route.id === id) || null
    } catch (jsonError) {
      console.error('Error with JSON fallback:', jsonError)
      return null
    }
  }
}

export async function getSchedulesByRoute(routeId: string): Promise<any[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/schedules`);
    if (!response.ok) throw new Error('Failed to fetch schedules');
    
    const allSchedules = await response.json();
    return allSchedules.filter((schedule: any) => schedule.routeId === routeId);
  } catch (error) {
    console.error('Error fetching schedules:', error)
    return []
  }
}

export async function submitFeedback(feedback: {
  passengerName: string;
  passengerEmail?: string;
  passengerPhone?: string;
  rating: number;
  message: string;
}): Promise<{ id: string; message: string }> {
  try {
    const response = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        passengerEmail: feedback.passengerEmail,
        rating: feedback.rating,
        message: feedback.message
      }),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error submitting feedback:', error)
    throw new Error('Failed to submit feedback. Please try again.')
  }
}

export interface RealLocationData {
  id: string;
  name: string;
  nameAmharic?: string;
  coordinates: [number, number];
  address?: string;
  type?: string;
}

export async function searchLocationSuggestions(query: string): Promise<RealLocationData[]> {
  try {
    // First try to get locations from stops API
    const stopsResponse = await fetch(`${BACKEND_URL}/api/stops`);
    if (stopsResponse.ok) {
      const stops = await stopsResponse.json();
      const matchingStops = stops
        .filter((stop: any) => 
          stop.stopName?.toLowerCase().includes(query.toLowerCase()) ||
          stop.stopNameAmharic?.toLowerCase().includes(query.toLowerCase())
        )
        .map((stop: any) => ({
          id: stop._id || stop.id,
          name: stop.stopName,
          nameAmharic: stop.stopNameAmharic,
          coordinates: [stop.longitude, stop.latitude],
          type: 'bus_stop'
        }));
      
      if (matchingStops.length > 0) {
        return matchingStops.slice(0, 10);
      }
    }
    
    // Fallback to route-based location search
    const routes = await getAllRoutes();
    const locations: RealLocationData[] = [];
    
    routes.forEach(route => {
      const routeParts = route.routeName?.split(' - ') || [];
      const startLoc = route.startLocation || routeParts[0];
      const endLoc = route.endLocation || routeParts[1];
      
      if (startLoc && startLoc.toLowerCase().includes(query.toLowerCase())) {
        locations.push({
          id: `route_start_${route.id}`,
          name: startLoc,
          coordinates: [0, 0], // Coordinates should come from database
          type: 'bus_station'
        });
      }
      if (endLoc && endLoc.toLowerCase().includes(query.toLowerCase())) {
        locations.push({
          id: `route_end_${route.id}`,
          name: endLoc,
          coordinates: [0, 0], // Coordinates should come from database
          type: 'bus_station'
        });
      }
    });
    
    return locations.slice(0, 10);
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}

// New function to fetch popular locations from database
export async function getPopularLocations(): Promise<RealLocationData[]> {
  try {
    const stopsResponse = await fetch(`${BACKEND_URL}/api/stops`);
    if (stopsResponse.ok) {
      const stops = await stopsResponse.json();
      // Return first 10 stops as popular locations
      return stops.slice(0, 10).map((stop: any) => ({
        id: stop._id || stop.id,
        name: stop.stopName,
        nameAmharic: stop.stopNameAmharic,
        coordinates: [stop.longitude, stop.latitude],
        type: 'bus_stop'
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching popular locations:', error);
    return [];
  }
}

// New function to get location coordinates from database
export async function getLocationCoordinates(locationName: string): Promise<[number, number] | null> {
  try {
    const stopsResponse = await fetch(`${BACKEND_URL}/api/stops`);
    if (stopsResponse.ok) {
      const stops = await stopsResponse.json();
      const matchingStop = stops.find((stop: any) => 
        stop.stopName?.toLowerCase().includes(locationName.toLowerCase()) ||
        stop.stopNameAmharic?.toLowerCase().includes(locationName.toLowerCase())
      );
      
      if (matchingStop) {
        return [matchingStop.longitude, matchingStop.latitude];
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching location coordinates:', error);
    return null;
  }
}

export async function getAllRoutes(): Promise<Route[]> {
  try {
    // Use JSON data directly since backend is not available
    const response = await fetch('/routes_with_stops.json')
    if (!response.ok) throw new Error('Failed to fetch JSON data')
    
    const routesData = await response.json()
    const formattedRoutes = routesData.map((route: any) => {
      const startStop = route.stops?.[0]
      const endStop = route.stops?.[route.stops.length - 1]
      
      return {
        id: route.id,
        routeName: route.longName || route.shortName,
        routeNumber: route.shortName,
        startLocation: startStop?.name || 'Start',
        endLocation: endStop?.name || 'End',
        distance: Math.floor(Math.random() * 20 + 5),
        estimatedDuration: Math.floor(Math.random() * 60 + 30),
        farePrice: Math.floor(Math.random() * 10 + 5),
        isActive: true,
        stops: route.stops?.map((stop: any, index: number) => ({
          id: stop.id,
          stopName: stop.name,
          latitude: stop.lat,
          longitude: stop.lon,
          stopOrder: index + 1
        })) || []
      }
    })
    
    return formattedRoutes
  } catch (error) {
    console.error('Error processing JSON route data:', error)
    return []
  }
}

function calculateArrivalTime(durationMinutes: number): string {
  const now = new Date();
  const arrival = new Date(now.getTime() + durationMinutes * 60000);
  return arrival.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
}

// New function to migrate feedback from JSON to database
export async function migrateFeedbackToDatabase(): Promise<void> {
  try {
    // This would read from the JSON file and POST to the backend API
    console.log('Feedback migration should be handled by backend migration script');
  } catch (error) {
    console.error('Error migrating feedback:', error);
  }
}