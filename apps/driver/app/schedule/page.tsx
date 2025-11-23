'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import { useDriverStore } from '@/lib/store';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ScheduleCard } from '@/components/dashboard/schedule-card';
import { Calendar, Clock, RefreshCw } from 'lucide-react';

export default function SchedulePage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { schedule, startTrip, loadMockData, connectionStatus } = useDriverStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    if (!schedule) {
      loadMockData();
    }
  }, [isAuthenticated, schedule, router, loadMockData]);

  if (!isAuthenticated) {
    return null;
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getShiftStats = () => {
    if (!schedule) return { pending: 0, completed: 0, inProgress: 0 };
    
    return {
      pending: schedule.shifts.filter(s => s.status === 'PENDING').length,
      completed: schedule.shifts.filter(s => s.status === 'COMPLETED').length,
      inProgress: schedule.shifts.filter(s => s.status === 'IN_PROGRESS').length
    };
  };

  const stats = getShiftStats();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileNav />
      
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-gray-900">Daily Schedule</h1>
            <button 
              onClick={loadMockData}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {today}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${connectionStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-xs text-gray-500 capitalize">{connectionStatus}</span>
          </div>
        </div>

        {/* Schedule Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
            <p className="text-xs text-gray-600">Pending</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            <p className="text-xs text-gray-600">In Progress</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
        </div>

        {/* Schedule List */}
        {schedule ? (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              All Trips ({schedule.shifts.length})
            </h2>
            <div className="space-y-3">
              {schedule.shifts.map((shift) => (
                <ScheduleCard 
                  key={shift.shiftId}
                  shift={shift} 
                  onStartTrip={startTrip}
                  isActive={shift.status === 'IN_PROGRESS'}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Schedule Available</h3>
            <p className="text-gray-600 mb-4">
              {connectionStatus === 'offline' 
                ? 'You are offline. Schedule will sync when connection is restored.'
                : 'No trips scheduled for today.'
              }
            </p>
            <button 
              onClick={loadMockData}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Load Schedule
            </button>
          </div>
        )}

        {/* Schedule Summary */}
        {schedule && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Schedule Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Trips:</span>
                <span className="font-medium">{schedule.totalTrips}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Duration:</span>
                <span className="font-medium">{Math.floor(schedule.estimatedDuration / 60)}h {schedule.estimatedDuration % 60}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">First Trip:</span>
                <span className="font-medium">{schedule.shifts[0]?.startTime || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Trip:</span>
                <span className="font-medium">{schedule.shifts[schedule.shifts.length - 1]?.endTime || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}