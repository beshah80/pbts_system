// Google Maps utility functions for Ethiopian bus system

export interface GPSCoordinate {
  lat: number;
  lng: number;
  timestamp: number;
  accuracy?: number;
  speed?: number;
  heading?: number;
}

export interface RouteSegment {
  start: GPSCoordinate;
  end: GPSCoordinate;
  distance: number;
  duration: number;
  traffic?: 'light' | 'moderate' | 'heavy';
}

// Calculate distance between two GPS points using Google Maps geometry
export function calculateGPSDistance(
  point1: GPSCoordinate,
  point2: GPSCoordinate
): number {
  if (typeof google !== 'undefined' && google.maps?.geometry?.spherical) {
    const latLng1 = new google.maps.LatLng(point1.lat, point1.lng);
    const latLng2 = new google.maps.LatLng(point2.lat, point2.lng);
    return google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2);
  }
  
  // Fallback to Haversine formula
  const R = 6371000; // Earth's radius in meters
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Get route directions using Google Maps Directions API
export async function getRouteDirections(
  waypoints: GPSCoordinate[],
  apiKey: string
): Promise<google.maps.DirectionsResult | null> {
  if (typeof google === 'undefined' || waypoints.length < 2) return null;

  const directionsService = new google.maps.DirectionsService();
  
  const origin = waypoints[0];
  const destination = waypoints[waypoints.length - 1];
  const waypointsForAPI = waypoints.slice(1, -1).map(point => ({
    location: new google.maps.LatLng(point.lat, point.lng),
    stopover: true
  }));

  try {
    const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
      directionsService.route({
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        waypoints: waypointsForAPI,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: true
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          resolve(result);
        } else {
          reject(new Error(`Directions request failed: ${status}`));
        }
      });
    });

    return result;
  } catch (error) {
    console.error('Error getting directions:', error);
    return null;
  }
}

// Snap GPS coordinates to roads using Google Roads API
export async function snapToRoads(
  coordinates: GPSCoordinate[],
  apiKey: string
): Promise<GPSCoordinate[]> {
  if (coordinates.length === 0) return [];

  const path = coordinates.map(coord => `${coord.lat},${coord.lng}`).join('|');
  
  try {
    const response = await fetch(
      `https://roads.googleapis.com/v1/snapToRoads?path=${path}&interpolate=true&key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`Roads API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.snappedPoints?.map((point: any) => ({
      lat: point.location.latitude,
      lng: point.location.longitude,
      timestamp: Date.now(),
      accuracy: 5 // Roads API provides high accuracy
    })) || coordinates;
  } catch (error) {
    console.error('Error snapping to roads:', error);
    return coordinates;
  }
}

// Get real-time traffic data for a route segment
export async function getTrafficData(
  start: GPSCoordinate,
  end: GPSCoordinate,
  apiKey: string
): Promise<RouteSegment> {
  const directionsService = new google.maps.DirectionsService();
  
  try {
    const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
      directionsService.route({
        origin: new google.maps.LatLng(start.lat, start.lng),
        destination: new google.maps.LatLng(end.lat, end.lng),
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.BEST_GUESS
        }
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          resolve(result);
        } else {
          reject(new Error(`Traffic request failed: ${status}`));
        }
      });
    });

    const route = result.routes[0];
    const leg = route.legs[0];
    
    // Determine traffic level based on duration vs duration_in_traffic
    let traffic: 'light' | 'moderate' | 'heavy' = 'light';
    if (leg.duration_in_traffic && leg.duration) {
      const ratio = leg.duration_in_traffic.value / leg.duration.value;
      if (ratio > 1.5) traffic = 'heavy';
      else if (ratio > 1.2) traffic = 'moderate';
    }

    return {
      start,
      end,
      distance: leg.distance?.value || 0,
      duration: leg.duration_in_traffic?.value || leg.duration?.value || 0,
      traffic
    };
  } catch (error) {
    console.error('Error getting traffic data:', error);
    return {
      start,
      end,
      distance: calculateGPSDistance(start, end),
      duration: 0,
      traffic: 'light'
    };
  }
}

// Convert Ethiopian coordinates to Google Maps format
export function convertToGoogleMapsFormat(
  longitude: number,
  latitude: number
): google.maps.LatLngLiteral {
  return {
    lat: latitude,
    lng: longitude
  };
}

// Geocode Ethiopian addresses using Google Places API
export async function geocodeEthiopianAddress(
  address: string,
  apiKey: string
): Promise<GPSCoordinate | null> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&region=et&key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
        timestamp: Date.now(),
        accuracy: 10
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}