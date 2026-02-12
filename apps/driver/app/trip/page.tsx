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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 pb-12 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{activeTrip.routeName}</h1>
            <p className="text-blue-100 text-sm flex items-center gap-2">
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium">Trip {activeTrip.tripId}</span>
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-xl">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'list' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
            List View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'map' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Map className="w-4 h-4" />
            Map View
          </button>
        </div>
      </div>

      <div className="px-4 -mt-6 pb-20 space-y-4">
        {viewMode === 'map' ? (
          /* Map View */
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
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
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <TripNavigation
                currentStop={currentStop}
                stops={mockStops}
                onStopComplete={handleStopComplete}
              />
            </div>
          </div>
        ) : (
          /* List View */
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <TripNavigation
                currentStop={currentStop}
                stops={mockStops}
                onStopComplete={handleStopComplete}
              />
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-1">
              <StopTracker
                stops={mockStops}
                currentStop={currentStop}
                onStopSelect={handleStopSelect}
              />
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <PassengerCounter
                initialCount={passengerCount}
                maxCapacity={50}
                onCountChange={setPassengerCount}
              />
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
          </div>
        )}
      </div>
    </div>
  );
}