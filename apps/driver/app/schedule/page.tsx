'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import { useDriverStore } from '@/lib/store';
import { DriverNav } from '@/components/navigation/DriverNav';
import DriverFooter from '@/components/ui/DriverFooter';
import { Calendar, Clock, RefreshCw, Play, CheckCircle, Square, Navigation, Phone, MapPin, Users } from 'lucide-react';

export default function SchedulePage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { schedule, startTrip, loadMockData, connectionStatus } = useDriverStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startingTrip, setStartingTrip] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    loadMockData();
  }, [isAuthenticated, router, loadMockData]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
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

  const handleStartTrip = async (index: number) => {
    setStartingTrip(index);
    // Simulate trip start
    setTimeout(() => {
      startTrip(index);
      setStartingTrip(null);
    }, 1500);
  };

  const handleNavigate = () => {
    window.open('https://maps.google.com', '_blank');
  };

  const handleEmergencyCall = () => {
    window.open('tel:+251911000000');
  };

  const handleEndTrip = (index: number) => {
    console.log('Ending trip:', index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <DriverNav />
      
      <div className="flex-1 pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2">Today's Schedule</h1>
            <p className="text-blue-100 text-lg">{today}</p>
          </div>
        </div>

        {/* Schedule List */}
        <div className="px-4 py-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            {schedule?.shifts.map((shift, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        shift.status === 'COMPLETED' ? 'bg-green-100' :
                        shift.status === 'IN_PROGRESS' ? 'bg-orange-100' : 'bg-blue-100'
                      }`}>
                        {shift.status === 'COMPLETED' ? <CheckCircle className="w-8 h-8 text-green-600" /> :
                         shift.status === 'IN_PROGRESS' ? <Play className="w-8 h-8 text-orange-600" /> :
                         <Clock className="w-8 h-8 text-blue-600" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{shift.route || `Route ${index + 1}`}</h3>
                        <div className="flex items-center gap-2 text-gray-500 mt-1">
                          <Clock className="w-5 h-5" />
                          <span>{shift.startTime} - {shift.endTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      shift.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      shift.status === 'IN_PROGRESS' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {shift.status}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-5 h-5" />
                      <span>{shift.startLocation || 'Start Point'} → {shift.endLocation || 'End Point'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users className="w-5 h-5" />
                      <span>{shift.passengers || 0} passengers</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {shift.status === 'PENDING' && (
                    <button 
                      onClick={() => handleStartTrip(index)}
                      disabled={startingTrip === index}
                      className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-2 ${
                        startingTrip === index ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {startingTrip === index ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin"></div>
                          <span className="text-sm font-medium">Starting...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          <span className="text-sm font-medium">Start Trip</span>
                        </>
                      )}
                    </button>
                  )}
                  
                  {shift.status === 'IN_PROGRESS' && (
                    <div className="grid grid-cols-3 gap-3">
                      <button 
                        onClick={handleNavigate}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-5 h-5" />
                        <span className="text-sm font-medium">Map</span>
                      </button>
                      <button 
                        onClick={handleEmergencyCall}
                        className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300 flex items-center justify-center gap-2"
                      >
                        <Phone className="w-5 h-5" />
                        <span className="text-sm font-medium">SOS</span>
                      </button>
                      <button 
                        onClick={() => handleEndTrip(index)}
                        className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300 flex items-center justify-center gap-2"
                      >
                        <Square className="w-5 h-5" />
                        <span className="text-sm font-medium">End</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats - Bottom Section */}
          <div className="px-4 py-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{stats.pending}</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">{stats.inProgress}</p>
                  <p className="text-sm text-gray-500">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {(!schedule?.shifts || schedule.shifts.length === 0) && (
            <div className="px-4 py-8">
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No trips today</h3>
                <p className="text-gray-600">You don't have any trips scheduled for today.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <DriverFooter />
    </div>
  );
}
