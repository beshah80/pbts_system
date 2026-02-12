"use client";

import { useState } from 'react';
import { useAuthStore } from '@/lib/auth';
import { useDriverStore } from '@/lib/store';
import { DriverNav } from '@/components/navigation/DriverNav';
import DriverFooter from '@/components/ui/DriverFooter';
import { TrendingUp, Clock, MapPin, Users, Award, Target, Calendar, BarChart3 } from 'lucide-react';

export default function PerformancePage() {
  const { driver } = useAuthStore();
  const { schedule } = useDriverStore();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock performance data
  const performanceData = {
    week: {
      totalTrips: 28,
      completedTrips: 26,
      onTimeRate: 92,
      averageRating: 4.7,
      totalHours: 56,
      fuelEfficiency: 8.2
    },
    month: {
      totalTrips: 112,
      completedTrips: 108,
      onTimeRate: 94,
      averageRating: 4.8,
      totalHours: 224,
      fuelEfficiency: 8.5
    },
    year: {
      totalTrips: 1344,
      completedTrips: 1296,
      onTimeRate: 93,
      averageRating: 4.6,
      totalHours: 2688,
      fuelEfficiency: 8.3
    }
  };

  const currentData = performanceData[selectedPeriod as keyof typeof performanceData];

  const performanceMetrics = [
    {
      title: 'Total Trips',
      value: currentData.totalTrips,
      change: '+12%',
      icon: MapPin,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'On-Time Rate',
      value: `${currentData.onTimeRate}%`,
      change: '+3%',
      icon: Clock,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'Average Rating',
      value: currentData.averageRating.toFixed(1),
      change: '+0.2',
      icon: Award,
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Total Hours',
      value: currentData.totalHours,
      change: '+8%',
      icon: Users,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    }
  ];

  const recentTrips = [
    { id: 1, route: 'Route 1 - Bole to Mekanisa', time: '08:30 AM', status: 'completed', rating: 5 },
    { id: 2, route: 'Route 2 - Mekanisa to Bole', time: '10:15 AM', status: 'completed', rating: 4 },
    { id: 3, route: 'Route 3 - Bole to Piassa', time: '01:45 PM', status: 'completed', rating: 5 },
    { id: 4, route: 'Route 4 - Piassa to Bole', time: '03:30 PM', status: 'completed', rating: 4 },
    { id: 5, route: 'Route 5 - Bole to Mekanisa', time: '05:15 PM', status: 'in-progress', rating: null }
  ];

  const getCardStyles = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DriverNav />
      
      <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Dashboard</h1>
            <p className="text-gray-600">Track your driving performance and statistics</p>
          </div>

          {/* Period Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 flex gap-1">
              {['week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const styles = getCardStyles(metric.color);
              
              return (
                <div key={index} className={`${styles.bg} rounded-2xl p-6 border-2 ${styles.border} hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${metric.textColor}`} />
                    </div>
                    <span className={`text-sm font-medium ${metric.textColor} bg-white px-2 py-1 rounded-lg`}>
                      {metric.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                  <p className="text-gray-600 text-sm">{metric.title}</p>
                </div>
              );
            })}
          </div>

          {/* Recent Trips */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Recent Trips
              </h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      trip.status === 'completed' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {trip.status === 'completed' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{trip.route}</h4>
                      <p className="text-sm text-gray-500">{trip.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {trip.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < trip.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      trip.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Fuel Efficiency
              </h3>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 mb-2">{currentData.fuelEfficiency} km/L</p>
                <p className="text-sm text-gray-600">Average fuel consumption</p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(currentData.fuelEfficiency / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                This Week's Schedule
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed Trips</span>
                  <span className="font-semibold text-gray-900">{currentData.completedTrips}/{currentData.totalTrips}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Hours Driven</span>
                  <span className="font-semibold text-gray-900">{currentData.totalHours}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">On-Time Performance</span>
                  <span className="font-semibold text-green-600">{currentData.onTimeRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DriverFooter />
    </div>
  );
}
