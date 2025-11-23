'use client';

import { Clock, MapPin, TrendingUp, AlertCircle } from 'lucide-react';

interface RouteProgressProps {
  tripId: string;
  routeName: string;
  startTime: string;
  estimatedEndTime: string;
  currentStop: number;
  totalStops: number;
  distanceCovered: number;
  totalDistance: number;
  averageSpeed: number;
  delays: number;
  onTimePerformance: number;
}

export function RouteProgress({
  tripId,
  routeName,
  startTime,
  estimatedEndTime,
  currentStop,
  totalStops,
  distanceCovered,
  totalDistance,
  averageSpeed,
  delays,
  onTimePerformance
}: RouteProgressProps) {
  const progressPercentage = (currentStop / totalStops) * 100;
  const distancePercentage = (distanceCovered / totalDistance) * 100;
  
  const calculateETA = () => {
    const now = new Date();
    const start = new Date(`${now.toDateString()} ${startTime}`);
    const elapsed = (now.getTime() - start.getTime()) / 1000 / 60; // minutes
    const remainingDistance = totalDistance - distanceCovered;
    const estimatedRemainingTime = remainingDistance / (averageSpeed / 60); // minutes
    
    const eta = new Date(now.getTime() + estimatedRemainingTime * 60 * 1000);
    return eta.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDelayStatus = () => {
    if (delays === 0) return { color: 'text-green-600', text: 'On Time' };
    if (delays <= 5) return { color: 'text-yellow-600', text: `${delays}min delay` };
    return { color: 'text-red-600', text: `${delays}min delay` };
  };

  const delayStatus = getDelayStatus();

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Trip Progress</h3>
      </div>

      {/* Route Info */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-1">{routeName}</h4>
        <p className="text-sm text-gray-600">Trip ID: {tripId}</p>
      </div>

      {/* Time Information */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-600">Started</span>
          </div>
          <p className="font-medium text-gray-900">{startTime}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-600">ETA</span>
          </div>
          <p className="font-medium text-gray-900">{calculateETA()}</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4 mb-4">
        {/* Stop Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Stops</span>
            <span className="text-sm text-gray-600">
              {currentStop}/{totalStops} ({Math.round(progressPercentage)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Distance Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Distance</span>
            <span className="text-sm text-gray-600">
              {distanceCovered.toFixed(1)}/{totalDistance.toFixed(1)} km ({Math.round(distancePercentage)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${distancePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600">
            {averageSpeed.toFixed(1)}
          </p>
          <p className="text-xs text-gray-600">km/h avg</p>
        </div>
        
        <div className="text-center">
          <p className={`text-lg font-bold ${delayStatus.color}`}>
            {delays}
          </p>
          <p className="text-xs text-gray-600">min delay</p>
        </div>
        
        <div className="text-center">
          <p className={`text-lg font-bold ${getPerformanceColor(onTimePerformance)}`}>
            {onTimePerformance}%
          </p>
          <p className="text-xs text-gray-600">on-time</p>
        </div>
      </div>

      {/* Status Alert */}
      {delays > 5 && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-700">
            Significant delay detected. Consider notifying dispatch.
          </span>
        </div>
      )}

      {/* Next Milestone */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {currentStop < totalStops 
              ? `Next: Stop ${currentStop + 1}` 
              : 'Route Complete'
            }
          </span>
        </div>
      </div>
    </div>
  );
}