'use client';

import { CheckCircle, Circle, MapPin, Clock } from 'lucide-react';

interface RouteStop {
  stopId: string;
  name: string;
  latitude: number;
  longitude: number;
  estimatedArrival: string;
  actualArrival?: string;
  isCompleted: boolean;
}

interface StopTrackerProps {
  stops: RouteStop[];
  currentStop: number;
  onStopSelect: (stopIndex: number) => void;
}

export function StopTracker({ stops, currentStop, onStopSelect }: StopTrackerProps) {
  const getStopStatus = (index: number) => {
    if (index < currentStop) return 'completed';
    if (index === currentStop) return 'current';
    return 'upcoming';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'current': return 'text-blue-600 bg-blue-100';
      case 'upcoming': return 'text-gray-400 bg-gray-100';
      default: return 'text-gray-400 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Route Progress</h3>
        <span className="text-sm text-gray-500">
          {currentStop}/{stops.length} stops
        </span>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {stops.map((stop, index) => {
          const status = getStopStatus(index);
          const isActive = index === currentStop;
          
          return (
            <div
              key={stop.stopId}
              onClick={() => onStopSelect(index)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                isActive ? 'bg-blue-50 border-2 border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(status)}`}>
                {status === 'completed' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${
                  isActive ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {stop.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>
                    {stop.actualArrival || stop.estimatedArrival}
                    {stop.actualArrival && ' (Actual)'}
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  status === 'completed' ? 'bg-green-100 text-green-700' :
                  status === 'current' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {status === 'completed' ? 'Done' :
                   status === 'current' ? 'Current' : 'Upcoming'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStop / stops.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStop / stops.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}