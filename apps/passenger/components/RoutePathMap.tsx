'use client';

import { useState, useEffect } from 'react';
import { MapPin, Clock, Bus, ArrowRight, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface RouteStop {
  id: string;
  name: string;
  nameAmharic?: string;
  coordinates: [number, number];
  estimatedTime?: string;
  isCurrentLocation?: boolean;
}

interface RoutePathMapProps {
  routeId: string;
  routeName: string;
  fromLocation: string;
  toLocation: string;
  stops: RouteStop[];
  selectedBus?: {
    id: string;
    name: string;
    estimatedTime: number;
    distance: number;
  };
  onStopSelect?: (stop: RouteStop) => void;
}

export default function RoutePathMap({
  routeId,
  routeName,
  fromLocation,
  toLocation,
  stops,
  selectedBus,
  onStopSelect
}: RoutePathMapProps) {
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleStopClick = (stop: RouteStop) => {
    setSelectedStop(stop.id);
    onStopSelect?.(stop);
  };

  const calculateArrivalTime = (minutesFromNow: number) => {
    const arrival = new Date(currentTime.getTime() + minutesFromNow * 60000);
    return arrival.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="space-y-4">
      {/* Route Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{routeName}</h2>
              <p className="text-gray-600 text-sm">Route {routeId}</p>
            </div>
            {selectedBus && (
              <div className="text-right">
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedBus.name}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {selectedBus.estimatedTime} min • {selectedBus.distance} km
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">{fromLocation}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">{toLocation}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Map Visualization */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Navigation className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">Route Path & Stops</h3>
            <span className="text-sm text-gray-500">({stops.length} stops)</span>
          </div>

          <div className="relative">
            {/* Route Line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-red-500"></div>

            {/* Stops List */}
            <div className="space-y-4">
              {stops.map((stop, index) => {
                const isFirst = index === 0;
                const isLast = index === stops.length - 1;
                const isSelected = selectedStop === stop.id;
                const estimatedArrival = selectedBus ? 
                  calculateArrivalTime((index + 1) * (selectedBus.estimatedTime / stops.length)) : 
                  null;

                return (
                  <button
                    key={stop.id}
                    onClick={() => handleStopClick(stop)}
                    className={`w-full text-left relative pl-14 pr-4 py-3 rounded-lg border transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {/* Stop Marker */}
                    <div className={`absolute left-4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ${
                      isFirst ? 'w-4 h-4 bg-green-500' :
                      isLast ? 'w-4 h-4 bg-red-500' :
                      'w-3 h-3 bg-blue-500'
                    } rounded-full border-2 border-white shadow-md`}>
                      {stop.isCurrentLocation && (
                        <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse"></div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{stop.name}</div>
                        {stop.nameAmharic && (
                          <div className="text-sm text-gray-600">{stop.nameAmharic}</div>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">Stop {index + 1}</span>
                          {stop.isCurrentLocation && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                              Current Location
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        {estimatedArrival && (
                          <div className="text-sm font-semibold text-blue-600">
                            {estimatedArrival}
                          </div>
                        )}
                        {stop.estimatedTime && (
                          <div className="text-xs text-gray-500">
                            {stop.estimatedTime}
                          </div>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-gray-500">Coordinates:</span>
                            <div className="font-mono">
                              {stop.coordinates[1].toFixed(4)}, {stop.coordinates[0].toFixed(4)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Distance from start:</span>
                            <div>{((index + 1) * 2).toFixed(1)} km</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bus Information */}
      {selectedBus && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bus className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Bus Information</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block">Bus Number</span>
                <span className="font-semibold">{selectedBus.name}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Total Time</span>
                <span className="font-semibold">{selectedBus.estimatedTime} minutes</span>
              </div>
              <div>
                <span className="text-gray-500 block">Distance</span>
                <span className="font-semibold">{selectedBus.distance} km</span>
              </div>
              <div>
                <span className="text-gray-500 block">Arrival</span>
                <span className="font-semibold text-green-600">
                  {calculateArrivalTime(selectedBus.estimatedTime)}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" className="flex-1">
                <Clock className="w-4 h-4 mr-2" />
                Track Live
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}