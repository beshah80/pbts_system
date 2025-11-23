'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Navigation, Loader2, Clock } from 'lucide-react';
import Link from 'next/link';
import { getAllRoutes } from '@/lib/api';
import type { Route } from '@/lib/api';
import GoogleMap from '@/components/GoogleMap';

export default function MapPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const routeData = await getAllRoutes();
      setRoutes(routeData);
    } catch (error) {
      console.error('Failed to load routes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRouteSelect = (route: Route) => {
    setSelectedRoute(route);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/home">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Interactive Map</h1>
              <p className="text-green-100">Explore bus routes and stops in Addis Ababa</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route List */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Available Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="ml-2">Loading routes...</span>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {routes.map((route) => (
                      <div
                        key={route.id}
                        onClick={() => handleRouteSelect(route)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedRoute?.id === route.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-sm">{route.routeName}</h3>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {route.routeNumber}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{route.startLocation}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>{route.endLocation}</span>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span>{route.distance} km</span>
                            <span>{route.farePrice} ETB</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg h-96 lg:h-[600px]">
              <CardContent className="p-0 h-full relative">
                <GoogleMap selectedRoute={selectedRoute} routes={routes} />
                
                {/* Route Info Panel */}
                <div className="absolute bottom-4 left-4 right-4">
                  {selectedRoute ? (
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-blue-800">{selectedRoute.routeName}</h4>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                          Route {selectedRoute.routeNumber}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">{selectedRoute.startLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-gray-700">{selectedRoute.endLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{selectedRoute.distance} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{selectedRoute.estimatedDuration} min</span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">{selectedRoute.farePrice} ETB</span>
                        <div className="flex gap-2">
                          <Link href={`/routes/${selectedRoute.id}`}>
                            <Button size="sm">View Details</Button>
                          </Link>
                          <Link href={`/tracking/${selectedRoute.id}`}>
                            <Button size="sm" variant="outline">Track Live</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
                      <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">Select a route to view on map</p>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Navigation className="w-4 h-4" />
                        <span>Real OpenStreetMap of Addis Ababa</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}