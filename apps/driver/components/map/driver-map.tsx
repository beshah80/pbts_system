'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Zap } from 'lucide-react';

interface RouteStop {
  stopId: string;
  name: string;
  latitude: number;
  longitude: number;
  isCompleted: boolean;
}

interface DriverMapProps {
  stops: RouteStop[];
  currentStop: number;
  routePath: { lat: number; lng: number }[];
  onLocationUpdate: (location: { lat: number; lng: number }) => void;
}

export function DriverMap({ stops, currentStop, routePath, onLocationUpdate }: DriverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(true);

  // Mock map implementation (replace with actual Google Maps or Mapbox)
  useEffect(() => {
    if (!mapRef.current) return;

    // Simulate GPS tracking
    if (isTracking && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          onLocationUpdate(location);
        },
        (error) => {
          setMapError('GPS unavailable. Using offline mode.');
          console.error('GPS Error:', error);
        },
        { 
          enableHighAccuracy: true, 
          maximumAge: 10000, 
          timeout: 5000 
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isTracking, onLocationUpdate]);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  const centerOnCurrentLocation = () => {
    if (currentLocation) {
      // In real implementation, center the map on current location
      console.log('Centering map on:', currentLocation);
    }
  };

  const getStopColor = (index: number) => {
    if (index < currentStop) return 'bg-green-500';
    if (index === currentStop) return 'bg-blue-500';
    return 'bg-gray-400';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Route Map</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTracking}
              className={`p-2 rounded-lg transition-colors ${
                isTracking 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Navigation className="w-4 h-4" />
            </button>
            <button
              onClick={centerOnCurrentLocation}
              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {mapError && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
            {mapError}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapRef}
          className="h-64 bg-gray-100 flex items-center justify-center"
        >
          {/* Placeholder for actual map */}
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Map Loading...</p>
            <p className="text-gray-500 text-xs">
              {currentLocation 
                ? `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`
                : 'Acquiring GPS location...'
              }
            </p>
          </div>
        </div>

        {/* Map Overlay Controls */}
        <div className="absolute top-2 right-2 space-y-2">
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            isTracking 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            {isTracking ? 'GPS ON' : 'GPS OFF'}
          </div>
          
          {currentLocation && (
            <div className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs">
              Speed: {Math.round(Math.random() * 40 + 10)} km/h
            </div>
          )}
        </div>
      </div>

      {/* Stop List */}
      <div className="p-4">
        <h4 className="font-medium text-gray-900 mb-3">Route Stops</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {stops.map((stop, index) => (
            <div
              key={stop.stopId}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                index === currentStop ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${getStopColor(index)}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${
                  index === currentStop ? 'font-medium text-blue-900' : 'text-gray-700'
                }`}>
                  {stop.name}
                </p>
              </div>
              <div className="text-xs text-gray-500">
                {index < currentStop ? '✓' : 
                 index === currentStop ? '→' : 
                 (index + 1).toString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Legend */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span>Current</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <span>Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
}