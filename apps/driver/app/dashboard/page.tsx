'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import { useDriverStore } from '@/lib/store';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ScheduleCard } from '@/components/dashboard/schedule-card';
import { TripControls } from '@/components/dashboard/trip-controls';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const driver = useAuthStore((state) => state.driver);
  const { schedule, activeTrip, startTrip, endTrip, loadDriverSchedule, loadMockData } = useDriverStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    // Load real schedule data for the driver
    if (!schedule && driver) {
      loadDriverSchedule(driver.driverId);
    }
  }, [isAuthenticated, schedule, router, loadMockData]);

  if (!isAuthenticated || !driver) {
    return null;
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const nextShift = schedule?.shifts.find(s => s.status === 'PENDING');
  const activeShift = schedule?.shifts.find(s => s.status === 'IN_PROGRESS');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileNav />
      
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {driver.firstName}!
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {today}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-600">{schedule?.totalTrips || 0}</p>
            <p className="text-xs text-gray-600">Total Trips</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-600">
              {schedule?.shifts.filter(s => s.status === 'COMPLETED').length || 0}
            </p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-orange-600">
              {Math.floor((schedule?.estimatedDuration || 0) / 60)}h
            </p>
            <p className="text-xs text-gray-600">Total Hours</p>
          </div>
        </div>

        {/* Active Trip Controls */}
        <TripControls activeTrip={activeTrip} onEndTrip={endTrip} />

        {/* Next Trip */}
        {nextShift && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Next Trip
            </h2>
            <ScheduleCard 
              shift={nextShift} 
              onStartTrip={startTrip}
            />
          </div>
        )}

        {/* Current Trip */}
        {activeShift && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Current Trip
            </h2>
            <ScheduleCard 
              shift={activeShift} 
              onStartTrip={startTrip}
              isActive={true}
            />
          </div>
        )}

        {/* Today's Schedule Preview */}
        {schedule && schedule.shifts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
              <button 
                onClick={() => router.push('/schedule')}
                className="text-blue-600 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {schedule.shifts.slice(0, 2).map((shift) => (
                <ScheduleCard 
                  key={shift.shiftId}
                  shift={shift} 
                  onStartTrip={startTrip}
                  isActive={shift.status === 'IN_PROGRESS'}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}