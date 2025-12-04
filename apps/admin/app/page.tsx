'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProtectedRoute } from '@/components/protected-route';
import { Phase2Dashboard } from '@/components/phase2-dashboard';
import { RealTimeDashboard } from '@/components/analytics/real-time-dashboard';
import { useAuthStore } from '@/lib/auth';
import { useState, useEffect } from 'react';
import { 
  Bus, 
  Users, 
  MapPin, 
  AlertTriangle, 
  Clock,
  BarChart3,
  Route,
  UserCheck,
  Plus,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Calendar,
  TrendingUp,
  Activity,
  Bell,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { useAdminStore } from '@/lib/store';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, color: 'text-blue-600' },
  { name: 'Buses', href: '/buses', icon: Bus, color: 'text-green-600' },
  { name: 'Drivers', href: '/drivers', icon: Users, color: 'text-purple-600' },
  { name: 'Routes', href: '/routes', icon: Route, color: 'text-orange-600' },
  { name: 'Schedules', href: '/schedules', icon: Calendar, color: 'text-cyan-600' },
  { name: 'Feedback', href: '/feedback', icon: MessageSquare, color: 'text-pink-600' },
  { name: 'Incidents', href: '/incidents', icon: AlertTriangle, color: 'text-red-600' },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, color: 'text-indigo-600' },
  { name: 'Integration', href: '/integration', icon: Settings, color: 'text-slate-600' },
];

export default function AdminDashboard() {
  const pathname = usePathname();
  const buses = useAdminStore((state) => state.buses);
  const drivers = useAdminStore((state) => state.drivers);
  const routes = useAdminStore((state) => state.routes);
  const feedback = useAdminStore((state) => state.feedback);
  const incidents = useAdminStore((state) => state.incidents);
  const schedules = useAdminStore((state) => state.schedules);
  const loading = useAdminStore((state) => state.loading);
  const { user, logout } = useAuthStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { loadAllData } = useAdminStore();
  
  useEffect(() => {
    loadAllData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [loadAllData]);
  
  const stats = {
    totalBuses: buses.length,
    activeBuses: buses.filter(b => b.status === 'AVAILABLE' || b.status === 'ACTIVE' || b.status === 'ON_ROUTE').length,
    totalRoutes: routes.length,
    activeRoutes: routes.filter(r => r.isActive !== false).length, // Count routes that are not explicitly inactive
    totalDrivers: drivers.length,
    activeDrivers: drivers.filter(d => d.status === 'ACTIVE').length,
    pendingFeedback: feedback.filter(f => f.status === 'PENDING' || f.status === 'NEW').length,
    activeIncidents: incidents.filter(i => i.status === 'IN_PROGRESS' || i.status === 'REPORTED' || i.status === 'OPEN').length,
    totalSchedules: schedules.length,
    completedTrips: schedules.filter(s => s.status === 'COMPLETED').length,
    alerts: incidents.filter(i => i.status === 'REPORTED' || i.status === 'OPEN').length,
    totalFeedback: feedback.length
  };

  const recentAlerts = incidents
    .filter(i => i.status === 'REPORTED' || i.status === 'IN_PROGRESS')
    .slice(0, 3)
    .map(incident => ({
      id: incident.id,
      type: incident.type.toLowerCase(),
      message: `${incident.type}: ${incident.description}`,
      time: new Date(incident.reportedAt).toLocaleString(),
      incidentId: incident.id
    }));

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Enhanced Sidebar */}
        <div className="w-72 bg-white shadow-xl border-r border-slate-200 flex flex-col h-full">
          {/* Header with Logo and User Info */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-800">PBTS Admin</h1>
                <p className="text-xs text-slate-500 font-medium">Transport System</p>
              </div>
            </div>

            {/* User Info at Top */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">{user?.name}</p>
                  <p className="text-xs text-slate-600">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scrollable Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      )}
                    >
                      <item.icon className={cn('w-5 h-5', isActive ? 'text-white' : item.color)} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 py-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-800">Dashboard Overview</h2>
                <p className="text-slate-600 mt-1">Ethiopian Public Bus Transport System</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true 
                    })}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  Logout
                </Button>
              </div>
            </div>
          </header>
          
          {/* Enhanced Page Content */}
          <main className="flex-1 overflow-auto p-8">
            <div className="space-y-8">
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-green-700">Active Buses</p>
                        {loading.buses ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 border-2 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
                            <p className="text-sm text-green-600">Loading...</p>
                          </div>
                        ) : (
                          <>
                            <p className="text-3xl font-black text-green-600">{stats.activeBuses}</p>
                            <p className="text-xs text-green-600 mt-1">of {stats.totalBuses} total</p>
                          </>
                        )}
                      </div>
                      <div className="p-3 bg-green-100 rounded-xl">
                        <Bus className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-blue-700">Active Routes</p>
                        {loading.routes ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                            <p className="text-sm text-blue-600">Loading...</p>
                          </div>
                        ) : (
                          <>
                            <p className="text-3xl font-black text-blue-600">{stats.activeRoutes}</p>
                            <p className="text-xs text-blue-600 mt-1">of {stats.totalRoutes} total</p>
                          </>
                        )}
                      </div>
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Route className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-purple-700">Active Drivers</p>
                        <p className="text-3xl font-black text-purple-600">{stats.activeDrivers}</p>
                        <p className="text-xs text-purple-600 mt-1">of {stats.totalDrivers} total</p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <UserCheck className="w-8 h-8 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-orange-700">Completed Trips</p>
                        <p className="text-3xl font-black text-orange-600">{stats.completedTrips}</p>
                        <p className="text-xs text-orange-600 mt-1">{stats.totalSchedules} scheduled</p>
                      </div>
                      <div className="p-3 bg-orange-100 rounded-xl">
                        <Calendar className="w-8 h-8 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/buses">
                  <Card className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer bg-gradient-to-br from-white to-blue-50 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl mx-auto w-fit mb-4 shadow-lg">
                        <Bus className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-2">Manage Buses</h3>
                      <p className="text-sm text-slate-600">Add, edit, track buses</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/routes">
                  <Card className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer bg-gradient-to-br from-white to-green-50 border-green-200">
                    <CardContent className="p-6 text-center">
                      <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl mx-auto w-fit mb-4 shadow-lg">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-2">Manage Routes</h3>
                      <p className="text-sm text-slate-600">Create, modify routes</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/drivers">
                  <Card className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer bg-gradient-to-br from-white to-purple-50 border-purple-200">
                    <CardContent className="p-6 text-center">
                      <div className="p-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl mx-auto w-fit mb-4 shadow-lg">
                        <UserCheck className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-2">Manage Drivers</h3>
                      <p className="text-sm text-slate-600">Driver assignments</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/analytics">
                  <Card className="hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer bg-gradient-to-br from-white to-orange-50 border-orange-200">
                    <CardContent className="p-6 text-center">
                      <div className="p-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl mx-auto w-fit mb-4 shadow-lg">
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-2">Analytics</h3>
                      <p className="text-sm text-slate-600">Reports & insights</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {/* System Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-white to-slate-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-500" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-green-800">Database Connection</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          {buses.length > 0 || routes.length > 0 ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-blue-800">Backend API</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {!loading.buses && !loading.routes ? 'Running' : 'Loading'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm font-medium text-purple-800">Data Sync</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                          {Object.values(loading).some(l => l) ? 'Syncing' : 'Active'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Alerts */}
                <Card className="bg-gradient-to-br from-white to-red-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-red-500" />
                      Recent Incidents ({stats.alerts})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentAlerts.length > 0 ? (
                      <div className="space-y-3">
                        {recentAlerts.map((alert) => (
                          <div key={alert.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-red-800 truncate">{alert.message}</p>
                              <p className="text-xs text-red-600 flex items-center mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                {alert.time}
                              </p>
                            </div>
                            <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>No recent incidents</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Note: Phase2Dashboard and RealTimeDashboard removed to prevent duplicate stats */}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}