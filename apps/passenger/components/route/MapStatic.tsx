'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Bus } from 'lucide-react';
import { Route, Stop } from '@/types';

interface MapStaticProps {
  route: Route;
  activeBuses?: Array<{
    id: string;
    busNumber: string;
    currentStopId: string;
    status: string;
  }>;
}

export default function MapStatic({ route, activeBuses = [] }: MapStaticProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Route Map - {route.routeName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-100 rounded-lg p-6 min-h-[400px] relative">
          {/* Map Placeholder */}
          <div className="text-center mb-6">
            <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Interactive Route Map</h3>
            <p className="text-slate-600 text-sm">
              Static map visualization of {route.routeName}
            </p>
          </div>

          {/* Route Visualization */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">{route.startLocation}</span>
              </div>
              <div className="flex-1 mx-4 border-t-2 border-dashed border-slate-400"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{route.endLocation}</span>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Stops along the route */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-slate-700">Route Stops:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {route.stops.map((stop, index) => {
                  const busAtStop = activeBuses.find(bus => bus.currentStopId === stop.id);
                  
                  return (
                    <div key={stop.id} className="flex items-center gap-2 p-2 bg-white rounded border">
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{stop.stopName}</p>
                        <p className="text-xs text-slate-500">{stop.stopNameAmharic}</p>
                      </div>
                      {busAtStop && (
                        <div className="flex items-center gap-1">
                          <Bus className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600">{busAtStop.busNumber}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Buses */}
            {activeBuses.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-sm text-slate-700 mb-2">Active Buses:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeBuses.map((bus) => (
                    <div key={bus.id} className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      <Bus className="w-3 h-3" />
                      <span>{bus.busNumber}</span>
                      <span className="text-xs">({bus.status})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map Legend */}
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium text-sm text-slate-700 mb-2">Legend:</h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Start Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>End Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bus className="w-3 h-3 text-green-600" />
                  <span>Active Bus</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-3 h-3 text-blue-600" />
                  <span>Route Direction</span>
                </div>
              </div>
            </div>

            {/* Integration Note */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> In a production environment, this would integrate with mapping services 
                like Google Maps or OpenStreetMap to show real-time bus positions, traffic conditions, 
                and interactive route visualization.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}