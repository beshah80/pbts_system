'use client';

import { useState } from 'react';
import { Clock, MapPin, Bus, Play, CheckCircle, X, Pause, Info } from 'lucide-react';
import { RouteInfo } from './route-info';

interface ScheduleShift {
  shiftId: string;
  startTime: string;
  endTime: string;
  routeId: string;
  routeName: string;
  busId: string;
  busNumber: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

interface ScheduleCardProps {
  shift: ScheduleShift;
  onStartTrip: (shiftId: string) => void;
  isActive?: boolean;
}

export function ScheduleCard({ shift, onStartTrip, isActive }: ScheduleCardProps) {
  const [showRouteInfo, setShowRouteInfo] = useState(false);
  
  const getStatusConfig = () => {
    switch (shift.status) {
      case 'PENDING': 
        return {
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: <Clock className="w-4 h-4" />,
          label: 'Pending'
        };
      case 'IN_PROGRESS': 
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <Play className="w-4 h-4" />,
          label: 'In Progress'
        };
      case 'COMPLETED': 
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'Completed'
        };
      case 'CANCELLED': 
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <X className="w-4 h-4" />,
          label: 'Cancelled'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const isCurrentTrip = isActive && shift.status === 'IN_PROGRESS';

  return (
    <div className={`
      bg-white rounded-xl border-2 p-5 transition-all duration-200 hover:shadow-md
      ${isCurrentTrip 
        ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg' 
        : shift.status === 'PENDING'
        ? 'border-amber-200 hover:border-amber-300'
        : 'border-gray-200 hover:border-gray-300'
      }
    `}>      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${statusConfig.color.split(' ')[0]}`}>
            {statusConfig.icon}
          </div>
          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
            {isCurrentTrip && (
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700 font-medium">Live</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-sm font-bold text-gray-900">
              {shift.startTime}
            </p>
            <p className="text-xs text-gray-500">
              to {shift.endTime}
            </p>
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{shift.routeName}</p>
            <p className="text-xs text-gray-600">Route ID: {shift.routeId}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Bus className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Bus {shift.busNumber}</p>
            <p className="text-xs text-gray-600">Vehicle ID: {shift.busId}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {shift.status === 'PENDING' && (
          <button
            onClick={() => onStartTrip(shift.shiftId)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Start Trip
          </button>
        )}
        
        <button
          onClick={() => setShowRouteInfo(!showRouteInfo)}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <Info className="w-4 h-4" />
          {showRouteInfo ? 'Hide' : 'View'} Route Details
        </button>
      </div>

      {shift.status === 'IN_PROGRESS' && isActive && (
        <div className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold text-center flex items-center justify-center gap-2 shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          Trip in Progress
        </div>
      )}

      {shift.status === 'COMPLETED' && (
        <div className="w-full bg-gray-100 text-gray-600 py-3 px-4 rounded-xl font-medium text-center flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Trip Completed
        </div>
      )}

      {shift.status === 'CANCELLED' && (
        <div className="w-full bg-red-50 text-red-600 py-3 px-4 rounded-xl font-medium text-center flex items-center justify-center gap-2 border border-red-200">
          <X className="w-4 h-4" />
          Trip Cancelled
        </div>
      )}
      
      {/* Route Information */}
      {showRouteInfo && (
        <div className="mt-4 animate-fade-in">
          <RouteInfo routeId={shift.routeId} />
        </div>
      )}
    </div>
  );
}