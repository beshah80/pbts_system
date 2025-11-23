'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Route, TrendingUp, Users, Clock, MapPin } from 'lucide-react';
import { useAdminStore } from '@/lib/store';
import { useMemo } from 'react';

export function RouteUtilization() {
  const routes = useAdminStore((state) => state.routes);
  const schedules = useAdminStore((state) => state.schedules);
  const feedback = useAdminStore((state) => state.feedback);

  const routeAnalytics = useMemo(() => {
    return routes.map(route => {
      const routeSchedules = schedules.filter(s => s.routeId === route.id);
      const routeFeedback = feedback.filter(f => f.routeId === route.id);
      const avgRating = routeFeedback.reduce((acc, f) => acc + f.rating, 0) / routeFeedback.length || 0;
      const delayedTrips = routeSchedules.filter(s => s.status === 'DELAYED').length;
      const completedTrips = routeSchedules.filter(s => s.status === 'COMPLETED').length;
      const onTimePerformance = completedTrips > 0 ? ((completedTrips - delayedTrips) / completedTrips) * 100 : 0;
      
      return {
        ...route,
        totalTrips: routeSchedules.length,
        completedTrips,
        delayedTrips,
        onTimePerformance,
        avgRating,
        feedbackCount: routeFeedback.length,
        utilization: Math.min((routeSchedules.length / 10) * 100, 100), // Mock calculation
        revenue: routeSchedules.length * route.farePrice
      };
    }).sort((a, b) => b.utilization - a.utilization);
  }, [routes, schedules, feedback]);

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return 'text-green-600';
    if (utilization >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 90) return { variant: 'default' as const, label: 'Excellent' };
    if (performance >= 75) return { variant: 'secondary' as const, label: 'Good' };
    if (performance >= 60) return { variant: 'secondary' as const, label: 'Average' };
    return { variant: 'destructive' as const, label: 'Poor' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Route Utilization Analysis</h2>
          <p className="text-gray-600">Performance metrics and optimization insights</p>
        </div>
        <Button variant="outline">
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Routes</p>
                <p className="text-3xl font-bold text-blue-600">{routes.length}</p>
              </div>
              <Route className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Utilization</p>
                <p className="text-3xl font-bold text-green-600">
                  {Math.round(routeAnalytics.reduce((acc, r) => acc + r.utilization, 0) / routeAnalytics.length)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-purple-600">
                  {routeAnalytics.reduce((acc, r) => acc + r.revenue, 0).toLocaleString()} ETB
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Route Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routeAnalytics.map((route) => {
              const performanceBadge = getPerformanceBadge(route.onTimePerformance);
              
              return (
                <div key={route.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{route.routeName}</span>
                      </div>
                      <Badge variant={performanceBadge.variant}>
                        {performanceBadge.label}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Route {route.routeNumber}</p>
                      <p className="text-xs text-gray-500">{route.distance} km</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Utilization</p>
                      <p className={`font-medium ${getUtilizationColor(route.utilization)}`}>
                        {Math.round(route.utilization)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">On-Time Performance</p>
                      <p className="font-medium">{Math.round(route.onTimePerformance)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Trips</p>
                      <p className="font-medium">{route.totalTrips}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className="font-medium">{route.revenue.toLocaleString()} ETB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                    <div>
                      <p className="text-gray-600">Completed Trips</p>
                      <p className="font-medium text-green-600">{route.completedTrips}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Delayed Trips</p>
                      <p className="font-medium text-red-600">{route.delayedTrips}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Rating</p>
                      <p className="font-medium">{route.avgRating.toFixed(1)}/5</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Feedback Count</p>
                      <p className="font-medium">{route.feedbackCount}</p>
                    </div>
                  </div>

                  {route.utilization < 60 && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                      <p className="text-yellow-800">
                        <strong>Optimization Suggestion:</strong> Low utilization detected. 
                        Consider adjusting frequency or route optimization.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}