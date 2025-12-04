'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Clock, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';
import { RouteService } from '@/lib/route-service';
import { useAdminStore } from '@/lib/store';

export function BusManagementDashboard() {
  const buses = useAdminStore((state) => state.buses);
  const drivers = useAdminStore((state) => state.drivers);
  const [routes, setRoutes] = useState<any[]>([]);
  const [busRouteMap, setBusRouteMap] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    // Load routes and create bus-route mapping
    RouteService.getRoutes().then(routeData => {
      setRoutes(routeData);
      
      // Create mapping of bus assignments to routes
      const mapping = new Map();
      buses.forEach(bus => {
        if (bus.currentRouteId) {
          const route = routeData.find(r => r.id === bus.currentRouteId);
          if (route) {
            mapping.set(bus.id, route);
          }
        }
      });
      setBusRouteMap(mapping);
    });
  }, [buses]);

  const getFleetStats = () => {
    const active = buses.filter(b => b.status === 'ACTIVE').length;
    const maintenance = buses.filter(b => b.status === 'MAINTENANCE').length;
    const outOfService = buses.filter(b => b.status === 'OUT_OF_SERVICE').length;
    const assigned = buses.filter(b => b.currentRouteId).length;
    
    return { active, maintenance, outOfService, assigned, total: buses.length };
  };

  const getRouteUtilization = () => {
    const routeUsage = new Map();
    buses.forEach(bus => {
      if (bus.currentRouteId) {
        const count = routeUsage.get(bus.currentRouteId) || 0;
        routeUsage.set(bus.currentRouteId, count + 1);
      }
    });
    
    return Array.from(routeUsage.entries()).map(([routeId, count]) => {
      const route = routes.find(r => r.id === routeId);
      return {
        routeId,
        routeName: route ? `${route.shortName} - ${route.longName}` : 'Unknown Route',
        busCount: count,
        route
      };
    }).sort((a, b) => b.busCount - a.busCount);
  };

  const stats = getFleetStats();
  const routeUtilization = getRouteUtilization();

  return (
    <div className="space-y-6">
      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            <p className="text-sm text-gray-600">Active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Wrench className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-2xl font-bold text-yellow-600">{stats.maintenance}</p>
            <p className="text-sm text-gray-600">Maintenance</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <p className="text-2xl font-bold text-red-600">{stats.outOfService}</p>
            <p className="text-sm text-gray-600">Out of Service</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-blue-600">{stats.assigned}</p>
            <p className="text-sm text-gray-600">Assigned</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold text-purple-600">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Fleet</p>
          </CardContent>
        </Card>
      </div>

      {/* Route Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Route Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {routeUtilization.length > 0 ? (
              routeUtilization.map((item, index) => (
                <div key={item.routeId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{item.routeName}</p>
                    {item.route && (
                      <p className="text-sm text-gray-600">
                        {item.route.stops?.length || 0} stops • 
                        {RouteService.calculateRouteDistance(item.route).toFixed(1)} km
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary">
                    {item.busCount} bus{item.busCount !== 1 ? 'es' : ''}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No buses assigned to routes</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Unassigned Buses */}
      {buses.filter(b => !b.currentRouteId && b.status === 'ACTIVE').length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Unassigned Active Buses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {buses
                .filter(b => !b.currentRouteId && b.status === 'ACTIVE')
                .map(bus => (
                  <div key={bus.id} className="p-3 border rounded-lg">
                    <p className="font-medium">{bus.plateNumber}</p>
                    <p className="text-sm text-gray-600">{bus.busNumber} • {bus.busType}</p>
                    <p className="text-sm text-gray-600">{bus.capacity} seats</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <MapPin className="w-6 h-6 mb-2" />
              Assign Routes
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Wrench className="w-6 h-6 mb-2" />
              Schedule Maintenance
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="w-6 h-6 mb-2" />
              Assign Drivers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}