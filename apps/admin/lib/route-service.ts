// Service to handle route data from JSON files
export class RouteService {
  private static routesCache: any[] | null = null;

  static async getRoutes() {
    if (this.routesCache) {
      return this.routesCache;
    }

    try {
      const response = await fetch('/asset/routes_with_stops.json');
      const routes = await response.json();
      this.routesCache = routes;
      return routes;
    } catch (error) {
      console.error('Failed to load routes:', error);
      return [];
    }
  }

  static async getRouteById(id: string) {
    const routes = await this.getRoutes();
    return routes.find((route: any) => route.id === id);
  }

  static async getRoutesByType(mode: string) {
    const routes = await this.getRoutes();
    return routes.filter((route: any) => route.mode === mode);
  }

  static async searchRoutes(query: string) {
    const routes = await this.getRoutes();
    return routes.filter((route: any) => 
      route.longName.toLowerCase().includes(query.toLowerCase()) ||
      route.shortName.toLowerCase().includes(query.toLowerCase())
    );
  }

  static getRouteStops(route: any) {
    return route.stops || [];
  }

  static calculateRouteDistance(route: any) {
    const stops = route.stops || [];
    if (stops.length < 2) return 0;

    let totalDistance = 0;
    for (let i = 0; i < stops.length - 1; i++) {
      const stop1 = stops[i];
      const stop2 = stops[i + 1];
      totalDistance += this.calculateDistance(
        stop1.lat, stop1.lon,
        stop2.lat, stop2.lon
      );
    }
    return totalDistance;
  }

  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}