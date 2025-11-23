'use client';

import { useState } from 'react';
import { Route, MapPin, Clock, AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface RoutePoint {
  lat: number;
  lng: number;
  type: 'stop' | 'waypoint' | 'traffic';
  name?: string;
  delay?: number;
}

interface RouteOverlayProps {
  routePoints: RoutePoint[];
  currentPosition: { lat: number; lng: number } | null;
  trafficConditions: 'light' | 'moderate' | 'heavy';
  showTraffic: boolean;
  onToggleTraffic: () => void;
}

export function RouteOverlay({ 
  routePoints, 
  currentPosition, 
  trafficConditions,
  showTraffic,
  onToggleTraffic 
}: RouteOverlayProps) {
  const [selectedPoint, setSelectedPoint] = useState<RoutePoint | null>(null);

  const getTrafficColor = () => {
    switch (trafficConditions) {
      case 'light': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'heavy': return 'text-red-600 bg-red-100';
    }
  };

  const getPointIcon = (point: RoutePoint) => {
    switch (point.type) {
      case 'stop': return <MapPin className="w-4 h-4" />;
      case 'waypoint': return <Route className="w-4 h-4" />;
      case 'traffic': return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getPointColor = (point: RoutePoint) => {
    switch (point.type) {
      case 'stop': return 'bg-blue-500 text-white';
      case 'waypoint': return 'bg-gray-500 text-white';
      case 'traffic': return 'bg-red-500 text-white';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Traffic Overlay Controls */}
      <div className="absolute top-4 left-4 pointer-events-auto">
        <div className="bg-white rounded-lg shadow-sm p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Traffic</span>
            <button
              onClick={onToggleTraffic}
              className="p-1 rounded hover:bg-gray-100 transition-colors"
            >
              {showTraffic ? (
                <Eye className="w-4 h-4 text-blue-600" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
          
          {showTraffic && (
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTrafficColor()}`}>
              {trafficConditions.charAt(0).toUpperCase() + trafficConditions.slice(1)} Traffic
            </div>
          )}
        </div>
      </div>

      {/* Route Points */}
      <div className="absolute inset-0">
        {routePoints.map((point, index) => (
          <div
            key={index}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + (point.lng - (currentPosition?.lng || 0)) * 1000}%`,
              top: `${50 + (currentPosition?.lat || 0 - point.lat) * 1000}%`
            }}
            onClick={() => setSelectedPoint(point)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${getPointColor(point)}`}>
              {getPointIcon(point)}
            </div>
            
            {point.delay && point.delay > 0 && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                !
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Current Position Indicator */}
      {currentPosition && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse" />
            <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75" />
          </div>
        </div>
      )}

      {/* Route Path Visualization */}
      {showTraffic && (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            <path
              d={`M 20,50 Q 50,30 80,50`}
              stroke="url(#routeGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>
        </div>
      )}

      {/* Point Details Modal */}
      {selectedPoint && (
        <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getPointIcon(selectedPoint)}
                <span className="font-medium text-gray-900">
                  {selectedPoint.name || `${selectedPoint.type} Point`}
                </span>
              </div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-1 text-sm text-gray-600">
              <p>Type: {selectedPoint.type}</p>
              <p>Location: {selectedPoint.lat.toFixed(6)}, {selectedPoint.lng.toFixed(6)}</p>
              {selectedPoint.delay && selectedPoint.delay > 0 && (
                <div className="flex items-center gap-1 text-red-600">
                  <Clock className="w-3 h-3" />
                  <span>{selectedPoint.delay} min delay</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Route Statistics */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <div className="bg-white bg-opacity-90 rounded-lg p-3 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-gray-700">Current Position</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-700">Light Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span className="text-gray-700">Moderate Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-gray-700">Heavy Traffic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}