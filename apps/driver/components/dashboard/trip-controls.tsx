'use client';

import { useState } from 'react';
import { Play, Square, Clock, MapPin, Users, Navigation, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
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
    return null; // Don't show anything if no active trip
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

  const getStatusColor = () => {
    switch (activeTrip.status) {
      case 'IN_PROGRESS': return 'from-green-500 to-emerald-600';
      case 'DELAYED': return 'from-orange-500 to-red-500';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const getStatusIcon = () => {
    switch (activeTrip.status) {
      case 'IN_PROGRESS': return <Activity className="w-5 h-5" />;
      case 'DELAYED': return <AlertCircle className="w-5 h-5" />;
      case 'COMPLETED': return <CheckCircle2 className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${getStatusColor()} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                {getStatusIcon()}
              </div>
              <div>
                <h3 className="text-lg font-bold">Active Trip</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-medium opacity-90">
                    {activeTrip.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Navigation className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trip Details */}
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{activeTrip.routeName}</p>
                <p className="text-sm text-gray-600">Bus {activeTrip.busNumber} • Route {activeTrip.routeId}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{getTripDuration()}</p>
                  <p className="text-xs text-gray-600">Duration</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{passengerCount}</p>
                  <p className="text-xs text-gray-600">Passengers</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Route Progress</span>
                <span className="text-sm text-gray-600">{currentStop}/{mockStops.length} stops</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStop / mockStops.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                showDetails 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Navigation className="w-4 h-4" />
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>

            {!showEndConfirm ? (
              <button
                onClick={() => setShowEndConfirm(true)}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-red-50 text-red-700 rounded-xl font-semibold hover:bg-red-100 transition-all duration-200 transform hover:scale-105 active:scale-95"
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
                  className="w-full py-2 px-3 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors transform hover:scale-105 active:scale-95"
                >
                  ✓ Confirm End
                </button>
                <button
                  onClick={() => setShowEndConfirm(false)}
                  className="w-full py-2 px-3 bg-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Trip Management Components */}
      {showDetails && (
        <div className="grid grid-cols-1 gap-4 animate-fade-in">
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