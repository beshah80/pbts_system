import { Bus } from '@/types';
import { Clock, Users, MapPin, AlertTriangle } from 'lucide-react';

interface BusStatusIndicatorProps {
  bus: Bus;
  delay?: number;
  occupancy?: number;
  nextStopETA?: string;
  lastUpdate?: number;
}

export default function BusStatusIndicator({ 
  bus, 
  delay = 0, 
  occupancy = 50, 
  nextStopETA,
  lastUpdate 
}: BusStatusIndicatorProps) {
  const getStatusColor = (status: Bus['status']) => {
    switch (status) {
      case 'ON_ROUTE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'DELAYED':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'UNDER_MAINTENANCE':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'OUT_OF_SERVICE':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy >= 80) return 'text-red-600';
    if (occupancy >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const formatLastUpdate = (timestamp?: number) => {
    if (!timestamp) return 'No updates';
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    return 'Over 1h ago';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bus.status)}`}>
            {bus.busType} - {bus.busNumber}
          </div>
          {delay > 0 && (
            <div className="flex items-center gap-1 text-yellow-600">
              <AlertTriangle className="w-3 h-3" />
              <span className="text-xs font-medium">+{delay}min</span>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500">
          {formatLastUpdate(lastUpdate)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <div>
            <div className={`font-medium ${getOccupancyColor(occupancy)}`}>
              {occupancy}%
            </div>
            <div className="text-xs text-gray-500">Occupied</div>
          </div>
        </div>

        {nextStopETA && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <div>
              <div className="font-medium text-gray-700">{nextStopETA}</div>
              <div className="text-xs text-gray-500">Next Stop</div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <div>
            <div className={`font-medium ${
              bus.status === 'ON_ROUTE' ? 'text-green-600' : 
              bus.status === 'DELAYED' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {bus.status.replace('_', ' ')}
            </div>
            <div className="text-xs text-gray-500">Status</div>
          </div>
        </div>
      </div>

      {/* Occupancy Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Capacity</span>
          <span>{Math.round(bus.capacity * occupancy / 100)}/{bus.capacity} passengers</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              occupancy >= 80 ? 'bg-red-500' :
              occupancy >= 60 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${occupancy}%` }}
          />
        </div>
      </div>
    </div>
  );
}