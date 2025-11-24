// Direct API calls to passenger app's own routes
const API_BASE = '/api'

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
    const response = await fetch(`${API_BASE}/routes`)
    if (!response.ok) throw new Error('Failed to fetch')
    
    let routes: Route[] = await response.json()
    
    // Filter by locations if provided
    if (from || to) {
      routes = routes.filter(route => {
        const matchesFrom = !from || 
          route.startLocation.toLowerCase().includes(from.toLowerCase()) ||
          route.stops.some(stop => stop.stopName.toLowerCase().includes(from.toLowerCase()))
        const matchesTo = !to || 
          route.endLocation.toLowerCase().includes(to.toLowerCase()) ||
          route.stops.some(stop => stop.stopName.toLowerCase().includes(to.toLowerCase()))
        return matchesFrom && matchesTo
      })
    }
    
    return routes.map(route => ({
      route,
      nextDepartures: [
        { departureTime: '06:00', busId: 1 },
        { departureTime: '06:30', busId: 1 },
        { departureTime: '07:00', busId: 1 }
      ],
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
    const response = await fetch(`${API_BASE}/routes`)
    if (!response.ok) throw new Error('Failed to fetch')
    
    const routes: Route[] = await response.json()
    return routes.slice(0, 6)
  } catch (error) {
    console.error('Error fetching popular routes:', error)
    throw new Error('Failed to load popular routes. Please check your connection.')
  }
}

export async function getRouteById(id: string): Promise<Route | null> {
  try {
    const response = await fetch(`${API_BASE}/routes`)
    if (!response.ok) throw new Error('Failed to fetch')
    
    const routes: Route[] = await response.json()
    return routes.find(route => route.id === id) || null
  } catch (error) {
    console.error('Error fetching route:', error)
    return null
  }
}

export async function getSchedulesByRoute(routeId: string): Promise<any[]> {
  try {
    // Mock schedules for now since we don't have schedule API yet
    return [
      {
        id: '1',
        departureTime: '06:00',
        arrivalTime: '06:35',
        status: 'SCHEDULED'
      },
      {
        id: '2', 
        departureTime: '06:30',
        arrivalTime: '07:05',
        status: 'SCHEDULED'
      },
      {
        id: '3',
        departureTime: '07:00', 
        arrivalTime: '07:35',
        status: 'IN_PROGRESS'
      }
    ]
  } catch (error) {
    console.error('Error fetching schedules:', error)
    return []
  }
}

export async function submitFeedback(feedback: {
  passengerName: string;
  passengerEmail?: string;
  passengerPhone?: string;
  routeId?: string;
  rating: number;
  category: string;
  message: string;
}): Promise<{ id: string; message: string }> {
  try {
    const response = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        routeId: feedback.routeId || null,
        rating: feedback.rating,
        category: feedback.category.toUpperCase(),
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
    const routes = await getAllRoutes();
    const locations: RealLocationData[] = [];
    
    routes.forEach(route => {
      if (route.startLocation.toLowerCase().includes(query.toLowerCase())) {
        locations.push({
          id: `route_start_${route.id}`,
          name: route.startLocation,
          coordinates: [38.7636, 9.0054],
          type: 'bus_station'
        });
      }
      if (route.endLocation.toLowerCase().includes(query.toLowerCase())) {
        locations.push({
          id: `route_end_${route.id}`,
          name: route.endLocation,
          coordinates: [38.7636, 9.0054],
          type: 'bus_station'
        });
      }
      route.stops?.forEach(stop => {
        if (stop.stopName.toLowerCase().includes(query.toLowerCase())) {
          locations.push({
            id: `stop_${route.id}_${stop.stopName}`,
            name: stop.stopName,
            coordinates: [stop.longitude, stop.latitude],
            type: 'bus_stop'
          });
        }
      });
    });
    
    return locations.slice(0, 10);
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}

export async function getAllRoutes(): Promise<Route[]> {
  try {
    const response = await fetch(`${API_BASE}/routes`)
    if (!response.ok) throw new Error('Failed to fetch')
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching all routes:', error)
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