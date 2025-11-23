'use client';

import { useState, useEffect } from 'react';
import { Navigation, MapPin, Clock, AlertTriangle } from 'lucide-react';

interface RouteStop {
  stopId: string;
  name: string;
  latitude: number;
  longitude: number;
  estimatedArrival: string;
  isCompleted: boolean;
}

interface TripNavigationProps {
  currentStop: number;
  stops: RouteStop[];
  onStopComplete: (stopId: string) => void;
}

export function TripNavigation({ currentStop, stops, onStopComplete }: TripNavigationProps) {
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [distanceToNext, setDistanceToNext] = useState<number>(0);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          
          // Calculate distance to next stop
          if (currentStop < stops.length) {
            const nextStop = stops[currentStop];
            const distance = calculateDistance(
              location.lat, location.lng,
              nextStop.latitude, nextStop.longitude
            );
            setDistanceToNext(distance);
          }
        },
        (error) => console.error('GPS Error:', error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [currentStop, stops]);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c * 1000; // Distance in meters
  };

  const nextStop = stops[currentStop];
  const isNearStop = distanceToNext < 100; // Within 100 meters

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Navigation</h3>
      </div>

      {nextStop ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{nextStop.name}</p>
              <p className="text-sm text-gray-600">Stop {currentStop + 1} of {stops.length}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-600">
                {distanceToNext > 0 ? `${Math.round(distanceToNext)}m` : '--'}
              </p>
              <p className="text-xs text-gray-500">Distance</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              ETA: {nextStop.estimatedArrival}
            </span>
          </div>

          {isNearStop && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">Approaching stop</span>
            </div>
          )}

          <button
            onClick={() => onStopComplete(nextStop.stopId)}
            disabled={!isNearStop}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isNearStop
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isNearStop ? 'Complete Stop' : 'Arrive at Stop to Complete'}
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">All stops completed</p>
        </div>
      )}
    </div>
  );
}