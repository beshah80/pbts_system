'use client';

import { useState } from 'react';
import { Play, Square, Clock, MapPin, Users, Navigation } from 'lucide-react';
import { TripNavigation } from '../trip/trip-navigation';
import { PassengerCounter } from '../trip/passenger-counter';
import { RouteProgress } from '../trip/route-progress';

interface ActiveTrip {
  tripId: string;
  routeId: string;
  routeName: string;
  busId: string;
  busNumber: string;
  startTime: string;
  estimatedEndTime: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
  startedAt?: string;
}

interface TripControlsProps {
  activeTrip: ActiveTrip | null;
  onEndTrip: () => void;
}

export function TripControls({ activeTrip, onEndTrip }: TripControlsProps) {
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [passengerCount, setPassengerCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Mock route data
  const mockStops = [
    { stopId: 'stop-1', name: 'Meskel Square', latitude: 9.0054, longitude: 38.7636, estimatedArrival: '06:15', isCompleted: false },
    { stopId: 'stop-2', name: 'Mexico Square', latitude: 9.0084, longitude: 38.7586, estimatedArrival: '06:25', isCompleted: false },
    { stopId: 'stop-3', name: 'Bole Airport', latitude: 8.9806, longitude: 38.7992, estimatedArrival: '06:45', isCompleted: false }
  ];

  if (!activeTrip) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Trip</h3>
        <p className="text-gray-600">Start a trip from your schedule to see controls here.</p>
      </div>
    );
  }

  const getTripDuration = () => {
    if (!activeTrip.startedAt) return '0m';
    const start = new Date(activeTrip.startedAt);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleStopComplete = (stopId: string) => {
    setCurrentStop(prev => Math.min(prev + 1, mockStops.length));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Trip</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-600">Live</span>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Navigation className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">{activeTrip.routeName}</p>
              <p className="text-sm text-gray-600">Bus {activeTrip.busNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">Duration: {getTripDuration()}</p>
              <p className="text-sm text-gray-600">
                Started at {activeTrip.startTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">Passengers: {passengerCount}</p>
              <p className="text-sm text-gray-600">Stop {currentStop}/{mockStops.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Navigate
          </button>

          {!showEndConfirm ? (
            <button
              onClick={() => setShowEndConfirm(true)}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors"
            >
              <Square className="w-4 h-4" />
              End Trip
            </button>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  onEndTrip();
                  setShowEndConfirm(false);
                }}
                className="w-full py-2 px-3 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Confirm End
              </button>
              <button
                onClick={() => setShowEndConfirm(false)}
                className="w-full py-2 px-3 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Phase 2: Trip Management Components */}
      {showDetails && (
        <div className="grid grid-cols-1 gap-4">
          <TripNavigation
            currentStop={currentStop}
            stops={mockStops}
            onStopComplete={handleStopComplete}
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
  );
}