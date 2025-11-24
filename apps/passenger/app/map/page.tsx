'use client';

import { useState, useEffect, useCallback } from 'react';
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

  const handleRouteSelect = useCallback((route: Route) => {
    if (selectedRoute?.id === route.id) return;
    setSelectedRoute(route);
  }, [selectedRoute?.id]);



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/home">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-xl">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">🗺️ Interactive Map</h1>
                <p className="text-white/80 text-sm">Explore bus routes and stops in Addis Ababa</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Tracking Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
          {/* Route List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Routes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading...</span>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto px-6 pb-6">
                    {routes.map((route) => (
                      <div
                        key={route.id}
                        onClick={() => handleRouteSelect(route)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                          selectedRoute?.id === route.id
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-100 hover:border-blue-200'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full">
                            {route.routeNumber}
                          </span>
                          <span className="text-lg font-bold text-green-600">{route.farePrice} ETB</span>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2 text-sm leading-tight">{route.routeName}</h3>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600 truncate">{route.startLocation}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-gray-600 truncate">{route.endLocation}</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-100">
                            <span className="text-gray-500">{route.distance} km</span>
                            <span className="text-gray-500">{route.estimatedDuration} min</span>
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
          <div className="lg:col-span-3">
            <Card className="h-full relative overflow-hidden">
              <CardContent className="p-0 h-full">
                <GoogleMap selectedRoute={selectedRoute} routes={routes} />
                
                {/* Floating Route Info */}
                {selectedRoute && (
                  <div className="absolute top-4 left-4 right-4 z-10">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">{selectedRoute.routeName}</h4>
                          <span className="text-sm text-gray-600">{selectedRoute.startLocation} → {selectedRoute.endLocation}</span>
                        </div>
                        <div className="text-right">
                          <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {selectedRoute.routeNumber}
                          </span>
                          <div className="text-2xl font-bold text-green-600 mt-1">{selectedRoute.farePrice} ETB</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700">{selectedRoute.distance} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-700">{selectedRoute.estimatedDuration} min</span>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/routes/${selectedRoute.id}`}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Details</Button>
                          </Link>
                          <Link href={`/tracking/${selectedRoute.id}`}>
                            <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">Live</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Map Instructions */}
                {!selectedRoute && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl max-w-md">
                      <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Map</h3>
                      <p className="text-gray-600 mb-4">Select a route from the sidebar to view it on the map</p>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Navigation className="w-4 h-4" />
                        <span>Powered by OpenStreetMap</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}