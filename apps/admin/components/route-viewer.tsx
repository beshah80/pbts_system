'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Navigation } from 'lucide-react';
import { RouteService } from '@/lib/route-service';
import { useAdminStore } from '@/lib/store';

export function RouteViewer() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const buses = useAdminStore((state) => state.buses);

  useEffect(() => {
    RouteService.getRoutes().then(setRoutes);
  }, []);

  const filteredRoutes = routes.filter(route =>
    route.longName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAssignedBuses = (routeId: string) => {
    return buses.filter(bus => bus.currentRouteId === routeId);
  };

  const getRouteTypeColor = (mode: string) => {
    switch (mode) {
      case 'BUS': return 'bg-blue-100 text-blue-800';
      case 'MINIBUS': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Route List */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Available Routes ({filteredRoutes.length})</CardTitle>
            <input
              type="text"
              placeholder="Search routes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            <div className="space-y-2">
              {filteredRoutes.map((route) => {
                const assignedBuses = getAssignedBuses(route.id);
                return (
                  <div
                    key={route.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedRoute?.id === route.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedRoute(route)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm">{route.shortName}</p>
                        <Badge variant="secondary" className={getRouteTypeColor(route.mode)}>
                          {route.mode}
                        </Badge>
                      </div>
                      <Badge variant="outline">
                        {assignedBuses.length} buses
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{route.longName}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Route Details */}
      <div className="lg:col-span-2">
        {selectedRoute ? (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedRoute.shortName}</CardTitle>
                  <p className="text-gray-600">{selectedRoute.longName}</p>
                </div>
                <Badge className={getRouteTypeColor(selectedRoute.mode)}>
                  {selectedRoute.mode}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Route Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <p className="text-lg font-bold">{selectedRoute.stops?.length || 0}</p>
                  <p className="text-sm text-gray-600">Stops</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Navigation className="w-6 h-6 mx-auto mb-1 text-green-600" />
                  <p className="text-lg font-bold">{RouteService.calculateRouteDistance(selectedRoute).toFixed(1)}</p>
                  <p className="text-sm text-gray-600">KM</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                  <p className="text-lg font-bold">{getAssignedBuses(selectedRoute.id).length}</p>
                  <p className="text-sm text-gray-600">Buses</p>
                </div>
              </div>

              {/* Stops List */}
              <div>
                <h3 className="font-medium mb-3">Route Stops</h3>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {selectedRoute.stops?.map((stop: any, index: number) => (
                    <div key={stop.id} className="flex items-center gap-3 p-2 border rounded">
                      <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{stop.name}</p>
                        <p className="text-xs text-gray-500">
                          {stop.lat?.toFixed(4)}, {stop.lon?.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-center py-4">No stops data available</p>
                  )}
                </div>
              </div>

              {/* Assigned Buses */}
              {getAssignedBuses(selectedRoute.id).length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Assigned Buses</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {getAssignedBuses(selectedRoute.id).map((bus) => (
                      <div key={bus.id} className="p-2 border rounded text-sm">
                        <p className="font-medium">{bus.plateNumber}</p>
                        <p className="text-gray-600">{bus.busNumber} • {bus.busType}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Select a route to view details</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}