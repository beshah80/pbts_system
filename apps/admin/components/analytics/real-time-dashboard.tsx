'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Bus, 
  Users, 
  Route, 
  AlertTriangle,
  Clock,
  DollarSign
} from 'lucide-react';
import { useAdminStore } from '@/lib/store';
import { useMemo } from 'react';

export function RealTimeDashboard() {
  const buses = useAdminStore((state) => state.buses);
  const drivers = useAdminStore((state) => state.drivers);
  const routes = useAdminStore((state) => state.routes);
  const schedules = useAdminStore((state) => state.schedules);
  const incidents = useAdminStore((state) => state.incidents);
  const feedback = useAdminStore((state) => state.feedback);

  const analytics = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todaySchedules = schedules.filter(s => s.date === today);
    const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');
    const avgRating = feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length || 0;
    
    return {
      totalBuses: buses.length,
      activeBuses: buses.filter(b => b.status === 'ACTIVE').length,
      totalRoutes: routes.length,
      activeRoutes: routes.filter(r => r.isActive).length,
      todayTrips: todaySchedules.length,
      completedTrips: todaySchedules.filter(s => s.status === 'COMPLETED').length,
      delayedTrips: todaySchedules.filter(s => s.status === 'DELAYED').length,
      activeIncidents: activeIncidents.length,
      criticalIncidents: activeIncidents.filter(i => i.severity === 'CRITICAL').length,
      avgRating: avgRating,
      revenue: 45600,
      efficiency: 92.5
    };
  }, [buses, drivers, routes, schedules, incidents, feedback]);

  const kpis = [
    {
      title: 'Fleet Utilization',
      value: `${Math.round((analytics.activeBuses / analytics.totalBuses) * 100)}%`,
      change: '+5.2%',
      trend: 'up',
      icon: Bus,
      color: 'text-blue-600'
    },
    {
      title: 'On-Time Performance',
      value: `${Math.round(((analytics.completedTrips - analytics.delayedTrips) / analytics.todayTrips) * 100) || 0}%`,
      change: '-2.1%',
      trend: 'down',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Daily Revenue',
      value: `${analytics.revenue.toLocaleString()} ETB`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Customer Satisfaction',
      value: `${analytics.avgRating.toFixed(1)}/5`,
      change: '+0.3',
      trend: 'up',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Real-Time Analytics</h2>
          <p className="text-gray-600">Live performance metrics and KPIs</p>
        </div>
        <Badge variant="secondary">Live Data</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={kpi.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    <div className={`flex items-center text-sm ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendIcon className="w-3 h-3 mr-1" />
                      {kpi.change}
                    </div>
                  </div>
                  <Icon className={`w-8 h-8 ${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="w-5 h-5" />
              Fleet Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Buses</span>
                <span className="font-medium">{analytics.activeBuses}/{analytics.totalBuses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">In Service</span>
                <span className="font-medium">{analytics.todayTrips}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Maintenance</span>
                <span className="font-medium">{buses.filter(b => b.status === 'MAINTENANCE').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="w-5 h-5" />
              Route Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Routes</span>
                <span className="font-medium">{analytics.activeRoutes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Completed Trips</span>
                <span className="font-medium">{analytics.completedTrips}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Delayed Trips</span>
                <span className="font-medium text-red-600">{analytics.delayedTrips}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Incidents</span>
                <span className="font-medium">{analytics.activeIncidents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Critical Issues</span>
                <span className="font-medium text-red-600">{analytics.criticalIncidents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="font-medium text-green-600">99.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}