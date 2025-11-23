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
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { useAdminStore } from '@/lib/store';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Buses', href: '/buses', icon: Bus },
  { name: 'Drivers', href: '/drivers', icon: Users },
  { name: 'Routes', href: '/routes', icon: Route },
  { name: 'Schedules', href: '/schedules', icon: Calendar },
  { name: 'Feedback', href: '/feedback', icon: MessageSquare },
  { name: 'Incidents', href: '/incidents', icon: AlertTriangle },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Integration', href: '/integration', icon: Settings },
];

export default function AdminDashboard() {
  const pathname = usePathname();
  const buses = useAdminStore((state) => state.buses);
  const drivers = useAdminStore((state) => state.drivers);
  const routes = useAdminStore((state) => state.routes);
  const feedback = useAdminStore((state) => state.feedback);
  const incidents = useAdminStore((state) => state.incidents);
  const schedules = useAdminStore((state) => state.schedules);
  const { user, logout } = useAuthStore();
  
  const { loadAllData } = useAdminStore();
  
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);
  
  const stats = {
    totalBuses: buses.length,
    activeBuses: buses.filter(b => b.status === 'ACTIVE').length,
    totalRoutes: routes.length,
    activeRoutes: routes.filter(r => r.isActive).length,
    totalDrivers: drivers.length,
    activeDrivers: drivers.filter(d => d.status === 'ACTIVE').length,
    pendingFeedback: feedback.filter(f => f.status === 'PENDING').length,
    activeIncidents: incidents.filter(i => i.status === 'IN_PROGRESS' || i.status === 'REPORTED').length,
    totalSchedules: schedules.length,
    completedTrips: schedules.filter(s => s.status === 'COMPLETED').length,
    alerts: incidents.filter(i => i.status === 'REPORTED').length,
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
      <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Bus className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">PBTS Admin</h1>
              <p className="text-xs text-gray-500">Transport System</p>
            </div>
          </div>
        </div>
        
        <nav className="px-3 pb-6">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
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
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Buses</p>
                      <p className="text-3xl font-bold text-green-600">{stats.activeBuses}</p>
                      <p className="text-xs text-gray-500">of {stats.totalBuses} total</p>
                    </div>
                    <Bus className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Routes</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.activeRoutes}</p>
                      <p className="text-xs text-gray-500">of {stats.totalRoutes} total</p>
                    </div>
                    <Route className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Drivers</p>
                      <p className="text-3xl font-bold text-purple-600">{stats.activeDrivers}</p>
                      <p className="text-xs text-gray-500">of {stats.totalDrivers} total</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed Trips</p>
                      <p className="text-3xl font-bold text-orange-600">{stats.completedTrips}</p>
                      <p className="text-xs text-gray-500">
                        {stats.totalSchedules} total scheduled
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/buses">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Bus className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold">Manage Buses</h3>
                    <p className="text-sm text-gray-600">Add, edit, track buses</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/routes">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-semibold">Manage Routes</h3>
                    <p className="text-sm text-gray-600">Create, modify routes</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/drivers">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <UserCheck className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-semibold">Manage Drivers</h3>
                    <p className="text-sm text-gray-600">Driver assignments</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/analytics">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <BarChart3 className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <h3 className="font-semibold">Analytics</h3>
                    <p className="text-sm text-gray-600">Reports & insights</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Advanced Features Dashboard */}
            <Phase2Dashboard />

            {/* Analytics Dashboard */}
            <RealTimeDashboard />

            {/* Recent Alerts */}
            {recentAlerts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Recent Incidents ({stats.alerts})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-gray-500 flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {alert.time}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
}