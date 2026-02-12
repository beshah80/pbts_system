import fs from 'fs';
import path from 'path';

export type RawStop = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  sequence?: number;
  is_terminal?: boolean;
  distance_from_previous?: number;
};

export type RawRoute = {
  id: string;
  shortName?: string;
  longName?: string;
  stops?: RawStop[];
};

let routeData: RawRoute[] = [];

export function loadRouteData() {
  try {
    const filePath = path.resolve(__dirname, '../../../asset/info.json');
    routeData = JSON.parse(fs.readFileSync(filePath, 'utf8')) as RawRoute[];
  } catch (error) {
    console.error('Failed to load route data from asset/info.json:', error);
    routeData = [];
  }
}

export function getRouteData() {
  return routeData;
}

export function getUniqueStopsFromRoutes(routes: RawRoute[]) {
  const stopsMap = new Map<string, { id: string; name: string; latitude: number; longitude: number; isTerminal: boolean }>();

  routes.forEach((route) => {
    (route.stops ?? []).forEach((stop) => {
      if (!stopsMap.has(stop.id)) {
        stopsMap.set(stop.id, {
          id: stop.id,
          name: stop.name,
          latitude: stop.lat,
          longitude: stop.lon,
          isTerminal: Boolean(stop.is_terminal),
        });
      }
    });
  });

  return Array.from(stopsMap.values());
}

export function formatRoutesForApi(routes: RawRoute[]) {
  return routes.map((route) => {
    const totalDistanceKm =
      (route.stops ?? []).reduce((sum, stop, index) => {
        if (index === 0) return 0;
        return sum + (stop.distance_from_previous ?? 0);
      }, 0) / 1000;

    const stops = (route.stops ?? []).map((stop) => ({
      id: stop.id,
      stopName: stop.name,
      latitude: stop.lat,
      longitude: stop.lon,
      stopOrder: stop.sequence,
      isTerminal: Boolean(stop.is_terminal),
    }));

    const startStop = stops[0];
    const endStop = stops[stops.length - 1];

    return {
      id: route.id,
      routeNumber: route.shortName,
      routeName: route.longName,
      startLocation: startStop?.stopName ?? 'Start',
      endLocation: endStop?.stopName ?? 'End',
      distance: totalDistanceKm || 0,
      estimatedDuration: totalDistanceKm ? Math.round((totalDistanceKm / 25) * 60) : 0,
      farePrice: 0,
      isActive: true,
      stops,
    };
  });
}
