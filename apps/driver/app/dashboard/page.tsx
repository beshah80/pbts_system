'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import { useDriverStore } from '@/lib/store';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ScheduleCard } from '@/components/dashboard/schedule-card';
import { TripControls } from '@/components/dashboard/trip-controls';
import { Calendar, Clock, MapPin, TrendingUp, CheckCircle, Timer, Award } from 'lucide-react';
import { SystemStats } from '@/components/dashboard/system-stats';

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const nextShift = schedule?.shifts.find(s => s.status === 'PENDING');
  const activeShift = schedule?.shifts.find(s => s.status === 'IN_PROGRESS');
  const completedShifts = schedule?.shifts.filter(s => s.status === 'COMPLETED').length || 0;
  const totalShifts = schedule?.shifts.length || 0;
  const completionRate = totalShifts > 0 ? Math.round((completedShifts / totalShifts) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pb-20">
      <MobileNav />
      
      <div className="p-4 space-y-6">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                {getGreeting()}, {driver.firstName}! 🙋‍♂️
              </h1>
              <p className="text-blue-100 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {today}
              </p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-sm text-blue-100">Driver ID</p>
                <p className="font-semibold">{driver.employeeNumber}</p>
              </div>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              driver.status === 'ACTIVE' ? 'bg-green-400' : 
              driver.status === 'BREAK' ? 'bg-yellow-400' : 'bg-gray-400'
            }`} />
            <span className="text-sm font-medium">
              {driver.status === 'ACTIVE' ? 'On Duty' : 
               driver.status === 'BREAK' ? 'On Break' : 'Off Duty'}
            </span>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{schedule?.totalTrips || 0}</p>
                <p className="text-sm text-gray-600">Total Trips</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completedShifts}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Timer className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.floor((schedule?.estimatedDuration || 0) / 60)}h
                </p>
                <p className="text-sm text-gray-600">Total Hours</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Trip Controls */}
        <TripControls activeTrip={activeTrip} onEndTrip={endTrip} />

        {/* Current Trip - Priority Display */}
        {activeShift && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-bold text-green-800">Current Trip</h2>
              <div className="ml-auto">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                  In Progress
                </span>
              </div>
            </div>
            <ScheduleCard 
              shift={activeShift} 
              onStartTrip={startTrip}
              isActive={true}
            />
          </div>
        )}

        {/* Next Trip */}
        {nextShift && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Next Trip</h2>
            </div>
            <ScheduleCard 
              shift={nextShift} 
              onStartTrip={startTrip}
            />
          </div>
        )}

        {/* Today's Schedule Preview */}
        {schedule && schedule.shifts.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Today's Schedule</h2>
              <button 
                onClick={() => router.push('/schedule')}
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
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
            
            {schedule.shifts.length > 2 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  +{schedule.shifts.length - 2} more trips today
                </p>
              </div>
            )}
          </div>
        )}

        {/* System Statistics */}
        <SystemStats />

        {/* Empty State */}
        {(!schedule || schedule.shifts.length === 0) && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips scheduled</h3>
            <p className="text-gray-600 mb-4">You don't have any trips scheduled for today.</p>
            <button 
              onClick={() => router.push('/schedule')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Full Schedule
            </button>
          </div>
        )}
      </div>
    </div>
  );
}