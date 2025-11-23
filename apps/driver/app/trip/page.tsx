'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import { useDriverStore } from '@/lib/store';
import { MobileNav } from '@/components/layout/mobile-nav';
import { TripNavigation } from '@/components/trip/trip-navigation';
import { StopTracker } from '@/components/trip/stop-tracker';
import { PassengerCounter } from '@/components/trip/passenger-counter';
import { RouteProgress } from '@/components/trip/route-progress';
import { DriverMap } from '@/components/map/driver-map';
import { RouteOverlay } from '@/components/map/route-overlay';
import { ArrowLeft, Map, List } from 'lucide-react';

export default function TripPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { activeTrip } = useDriverStore();
  
  const [currentStop, setCurrentStop] = useState(0);
  const [passengerCount, setPassengerCount] = useState(0);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [showTraffic, setShowTraffic] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);

  // Mock data for demonstration
  const mockStops = [
    { stopId: 'stop-1', name: 'Meskel Square', latitude: 9.0054, longitude: 38.7636, estimatedArrival: '06:15', actualArrival: undefined, isCompleted: false },
    { stopId: 'stop-2', name: 'Mexico Square', latitude: 9.0084, longitude: 38.7586, estimatedArrival: '06:25', actualArrival: undefined, isCompleted: false },
    { stopId: 'stop-3', name: 'Bole Airport', latitude: 8.9806, longitude: 38.7992, estimatedArrival: '06:45', actualArrival: undefined, isCompleted: false }
  ];

  const mockRoutePoints = [
    { lat: 9.0054, lng: 38.7636, type: 'stop' as const, name: 'Meskel Square' },
    { lat: 9.0069, lng: 38.7611, type: 'waypoint' as const },
    { lat: 9.0084, lng: 38.7586, type: 'stop' as const, name: 'Mexico Square' },
    { lat: 8.9945, lng: 38.7789, type: 'traffic' as const, delay: 5 },
    { lat: 8.9806, lng: 38.7992, type: 'stop' as const, name: 'Bole Airport' }
  ];

  const mockRoutePath = [
    { lat: 9.0054, lng: 38.7636 },
    { lat: 9.0069, lng: 38.7611 },
    { lat: 9.0084, lng: 38.7586 },
    { lat: 8.9945, lng: 38.7789 },
    { lat: 8.9806, lng: 38.7992 }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    if (!activeTrip) {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, activeTrip, router]);

  if (!isAuthenticated || !activeTrip) {
    return null;
  }

  const handleStopComplete = (stopId: string) => {
    setCurrentStop(prev => Math.min(prev + 1, mockStops.length));
  };

  const handleStopSelect = (stopIndex: number) => {
    setCurrentStop(stopIndex);
  };

  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    setCurrentLocation(location);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileNav />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">{activeTrip.routeName}</h1>
            <p className="text-sm text-gray-600">Trip {activeTrip.tripId}</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'list' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-4 h-4" />
            List View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'map' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Map className="w-4 h-4" />
            Map View
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {viewMode === 'map' ? (
          /* Map View */
          <div className="space-y-4">
            <div className="relative">
              <DriverMap
                stops={mockStops}
                currentStop={currentStop}
                routePath={mockRoutePath}
                onLocationUpdate={handleLocationUpdate}
              />
              <RouteOverlay
                routePoints={mockRoutePoints}
                currentPosition={currentLocation}
                trafficConditions="moderate"
                showTraffic={showTraffic}
                onToggleTraffic={() => setShowTraffic(!showTraffic)}
              />
            </div>
            
            <TripNavigation
              currentStop={currentStop}
              stops={mockStops}
              onStopComplete={handleStopComplete}
            />
          </div>
        ) : (
          /* List View */
          <div className="grid grid-cols-1 gap-4">
            <TripNavigation
              currentStop={currentStop}
              stops={mockStops}
              onStopComplete={handleStopComplete}
            />
            
            <StopTracker
              stops={mockStops}
              currentStop={currentStop}
              onStopSelect={handleStopSelect}
            />
            
            <PassengerCounter
              initialCount={passengerCount}
              maxCapacity={50}
              onCountChange={setPassengerCount}
            />
            
            <RouteProgress
              tripId={activeTrip.tripId}
              routeName={activeTrip.routeName}
              startTime={activeTrip.startTime}
              estimatedEndTime={activeTrip.estimatedEndTime}
              currentStop={currentStop}
              totalStops={mockStops.length}
              distanceCovered={currentStop * 2.5}
              totalDistance={mockStops.length * 2.5}
              averageSpeed={25}
              delays={0}
              onTimePerformance={95}
            />
          </div>
        )}
      </div>
    </div>
  );
}