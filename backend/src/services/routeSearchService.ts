import { getRouteData } from './routeData';
import type { RawRoute, RawStop } from './routeData';

interface SearchResult {
  route: RawRoute;
  fromStopIndex: number;
  toStopIndex: number;
  segmentDistance: number; // km
  segmentDuration: number; // minutes
  relevanceScore: number;
  fromStop: RawStop;
  toStop: RawStop;
}

/**
 * Fuzzy match stop names - handles variations and partial matches
 */
function fuzzyMatchStopName(stopName: string, searchTerm: string): boolean {
  const stopLower = stopName.toLowerCase().trim();
  const searchLower = searchTerm.toLowerCase().trim();
  
  // Exact match
  if (stopLower === searchLower) return true;
  
  // Contains match
  if (stopLower.includes(searchLower)) return true;
  
  // Word boundary match (e.g., "Torhayloch" matches "Torhay")
  const words = stopLower.split(/\s+/);
  if (words.some(word => word.startsWith(searchLower) || searchLower.startsWith(word))) {
    return true;
  }
  
  // Levenshtein-like: if search term is short and similar
  if (searchLower.length >= 3 && stopLower.length <= searchLower.length + 3) {
    let matches = 0;
    for (let i = 0; i < Math.min(searchLower.length, stopLower.length); i++) {
      if (searchLower[i] === stopLower[i]) matches++;
    }
    if (matches / searchLower.length >= 0.7) return true;
  }
  
  return false;
}

/**
 * Find all stops that match the search term
 */
function findMatchingStops(route: RawRoute, searchTerm: string): number[] {
  const matches: number[] = [];
  (route.stops ?? []).forEach((stop, index) => {
    if (fuzzyMatchStopName(stop.name, searchTerm)) {
      matches.push(index);
    }
  });
  return matches;
}

/**
 * Calculate distance between two stops in a route (in km)
 */
function calculateSegmentDistance(route: RawRoute, fromIndex: number, toIndex: number): number {
  if (fromIndex >= toIndex || !route.stops) return 0;
  
  let totalDistance = 0;
  for (let i = fromIndex + 1; i <= toIndex; i++) {
    const stop = route.stops[i];
    totalDistance += stop.distance_from_previous ?? 0;
  }
  
  return totalDistance / 1000; // Convert meters to km
}

/**
 * Calculate estimated travel time in minutes
 * Assumes average speed of 25 km/h in city traffic
 */
function calculateTravelTime(distanceKm: number): number {
  const averageSpeedKmh = 25; // Average bus speed in Addis Ababa
  return Math.round((distanceKm / averageSpeedKmh) * 60);
}

/**
 * Calculate relevance score for ranking results
 */
function calculateRelevanceScore(
  route: RawRoute,
  fromIndex: number,
  toIndex: number,
  fromSearch: string,
  toSearch: string
): number {
  let score = 100;
  
  const fromStop = route.stops?.[fromIndex];
  const toStop = route.stops?.[toIndex];
  
  if (!fromStop || !toStop) return 0;
  
  // Exact match bonus
  if (fromStop.name.toLowerCase() === fromSearch.toLowerCase()) score += 20;
  if (toStop.name.toLowerCase() === toSearch.toLowerCase()) score += 20;
  
  // Shorter routes are preferred (fewer stops between)
  const stopsBetween = toIndex - fromIndex;
  score += Math.max(0, 30 - stopsBetween);
  
  // Terminal stops bonus (more reliable)
  if (fromStop.is_terminal) score += 10;
  if (toStop.is_terminal) score += 10;
  
  // Shorter distance is preferred
  const distance = calculateSegmentDistance(route, fromIndex, toIndex);
  if (distance < 5) score += 15;
  else if (distance < 10) score += 10;
  else if (distance < 20) score += 5;
  
  return score;
}

/**
 * Enhanced route search with fuzzy matching and accurate distance/time calculations
 */
export function searchRoutesBetweenLocations(from: string, to: string): SearchResult[] {
  const routes = getRouteData();
  const results: SearchResult[] = [];
  
  if (!from || !to) return results;
  
  routes.forEach((route) => {
    if (!route.stops || route.stops.length < 2) return;
    
    // Find all matching stops for "from"
    const fromMatches = findMatchingStops(route, from);
    // Find all matching stops for "to"
    const toMatches = findMatchingStops(route, to);
    
    // Check all combinations where "from" comes before "to"
    fromMatches.forEach((fromIndex) => {
      toMatches.forEach((toIndex) => {
        if (fromIndex < toIndex) {
          const segmentDistance = calculateSegmentDistance(route, fromIndex, toIndex);
          const segmentDuration = calculateTravelTime(segmentDistance);
          const relevanceScore = calculateRelevanceScore(route, fromIndex, toIndex, from, to);
          
          results.push({
            route,
            fromStopIndex: fromIndex,
            toStopIndex: toIndex,
            segmentDistance,
            segmentDuration,
            relevanceScore,
            fromStop: route.stops[fromIndex],
            toStop: route.stops[toIndex],
          });
        }
      });
    });
  });
  
  // Sort by relevance score (highest first)
  results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  return results;
}

/**
 * Format search results for API response
 */
export function formatSearchResults(results: SearchResult[]) {
  return results.map((result) => {
    const route = result.route;
    const totalDistanceKm =
      (route.stops ?? []).reduce((sum, stop, index) => {
        if (index === 0) return 0;
        return sum + (stop.distance_from_previous ?? 0);
      }, 0) / 1000;

    // Get stops in the segment (from to to)
    const segmentStops = (route.stops ?? []).slice(
      result.fromStopIndex,
      result.toStopIndex + 1
    ).map((stop) => ({
      id: stop.id,
      stopName: stop.name,
      latitude: stop.lat,
      longitude: stop.lon,
      stopOrder: stop.sequence ?? 0,
      isTerminal: Boolean(stop.is_terminal),
    }));

    const startStop = segmentStops[0];
    const endStop = segmentStops[segmentStops.length - 1];

    return {
      id: route.id,
      routeNumber: route.shortName,
      routeName: route.longName,
      startLocation: startStop?.stopName ?? 'Start',
      endLocation: endStop?.stopName ?? 'End',
      distance: result.segmentDistance, // Use segment distance, not total route distance
      estimatedDuration: result.segmentDuration, // Use calculated segment duration
      farePrice: Math.round(result.segmentDistance * 0.5), // Approximate fare: 0.5 ETB per km
      isActive: true,
      stops: segmentStops,
      totalRouteDistance: totalDistanceKm,
      segmentInfo: {
        fromStop: result.fromStop.name,
        toStop: result.toStop.name,
        stopsCount: segmentStops.length,
        relevanceScore: result.relevanceScore,
      },
    };
  });
}

