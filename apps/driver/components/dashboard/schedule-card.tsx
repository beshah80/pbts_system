'use client';

import { Clock, MapPin, Bus, Play, CheckCircle } from 'lucide-react';

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
  const getStatusColor = () => {
    switch (shift.status) {
      case 'PENDING': return 'bg-gray-100 text-gray-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = () => {
    switch (shift.status) {
      case 'COMPLETED': return <CheckCircle className="w-4 h-4" />;
      case 'IN_PROGRESS': return <Play className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className={`bg-white rounded-lg border-2 p-4 ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {shift.status.replace('_', ' ')}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {shift.startTime} - {shift.endTime}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{shift.routeName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Bus className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">Bus {shift.busNumber}</span>
        </div>
      </div>

      {shift.status === 'PENDING' && (
        <button
          onClick={() => onStartTrip(shift.shiftId)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Start Trip
        </button>
      )}

      {shift.status === 'IN_PROGRESS' && isActive && (
        <div className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium text-center">
          Trip in Progress
        </div>
      )}
    </div>
  );
}