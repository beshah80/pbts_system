'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle, TrendingDown, Calendar } from 'lucide-react';
import { useAdminStore } from '@/lib/store';
import { useMemo } from 'react';

export function DelayPatterns() {
  const schedules = useAdminStore((state) => state.schedules);
  const routes = useAdminStore((state) => state.routes);
  const incidents = useAdminStore((state) => state.incidents);

  const delayAnalysis = useMemo(() => {
    const delayedSchedules = schedules.filter(s => s.status === 'DELAYED');
    
    // Time-based patterns
    const hourlyDelays = Array.from({ length: 24 }, (_, hour) => {
      const hourDelays = delayedSchedules.filter(s => {
        const scheduleHour = parseInt(s.departureTime.split(':')[0]);
        return scheduleHour === hour;
      });
      return { hour, count: hourDelays.length };
    });

    // Route-based patterns
    const routeDelays = routes.map(route => {
      const routeDelayedSchedules = delayedSchedules.filter(s => s.routeId === route.id);
      return {
        ...route,
        delayCount: routeDelayedSchedules.length,
        totalSchedules: schedules.filter(s => s.routeId === route.id).length
      };
    }).sort((a, b) => b.delayCount - a.delayCount);

    // Day-based patterns
    const dayDelays = Array.from({ length: 7 }, (_, day) => {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayDelayCount = delayedSchedules.filter(s => {
        const scheduleDay = new Date(s.date).getDay();
        return scheduleDay === day;
      }).length;
      return { day: dayNames[day], count: dayDelayCount };
    });

    // Common causes from incidents
    const delayCauses = incidents.reduce((acc, incident) => {
      if (incident.type) {
        acc[incident.type] = (acc[incident.type] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const peakDelayHour = hourlyDelays.reduce((max, current) => 
      current.count > max.count ? current : max
    );

    return {
      totalDelays: delayedSchedules.length,
      avgDelayPerDay: Math.round(delayedSchedules.length / 7),
      peakDelayHour,
      hourlyDelays,
      routeDelays: routeDelays.slice(0, 5),
      dayDelays,
      delayCauses: Object.entries(delayCauses).sort(([,a], [,b]) => b - a).slice(0, 5)
    };
  }, [schedules, routes, incidents]);

  const getSeverityColor = (delayCount: number, total: number) => {
    const percentage = (delayCount / total) * 100;
    if (percentage >= 20) return 'text-red-600';
    if (percentage >= 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Delay Pattern Analysis</h2>
          <p className="text-gray-600">Identify and analyze delay patterns for optimization</p>
        </div>
        <Button variant="outline">
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Delays</p>
                <p className="text-3xl font-bold text-red-600">{delayAnalysis.totalDelays}</p>
              </div>
              <Clock className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Peak Delay Hour</p>
                <p className="text-3xl font-bold text-orange-600">{delayAnalysis.peakDelayHour.hour}:00</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Daily Delays</p>
                <p className="text-3xl font-bold text-purple-600">{delayAnalysis.avgDelayPerDay}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Routes with Most Delays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {delayAnalysis.routeDelays.map((route) => {
                const delayPercentage = (route.delayCount / route.totalSchedules) * 100;
                
                return (
                  <div key={route.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{route.routeName}</p>
                      <p className="text-sm text-gray-600">Route {route.routeNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${getSeverityColor(route.delayCount, route.totalSchedules)}`}>
                        {route.delayCount} delays
                      </p>
                      <p className="text-xs text-gray-500">
                        {delayPercentage.toFixed(1)}% of trips
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Delay Causes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {delayAnalysis.delayCauses.map(([cause, count]) => (
                <div key={cause} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{cause.replace('_', ' ')}</p>
                    <p className="text-sm text-gray-600">Incident type</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">{count} incidents</p>
                    <p className="text-xs text-gray-500">
                      {Math.round((count / incidents.length) * 100)}% of total
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hourly Delay Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {delayAnalysis.hourlyDelays.map((hourData) => {
              const maxDelays = Math.max(...delayAnalysis.hourlyDelays.map(h => h.count));
              const height = maxDelays > 0 ? (hourData.count / maxDelays) * 100 : 0;
              
              return (
                <div key={hourData.hour} className="text-center">
                  <div className="h-20 flex items-end justify-center mb-1">
                    <div 
                      className={`w-full rounded-t ${
                        hourData.count > 0 ? 'bg-red-500' : 'bg-gray-200'
                      }`}
                      style={{ height: `${height}%` }}
                      title={`${hourData.hour}:00 - ${hourData.count} delays`}
                    />
                  </div>
                  <p className="text-xs text-gray-600">{hourData.hour}</p>
                  <p className="text-xs font-medium">{hourData.count}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Delay Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {delayAnalysis.dayDelays.map((dayData) => (
              <div key={dayData.day} className="text-center p-3 border rounded-lg">
                <p className="text-sm font-medium text-gray-600">{dayData.day}</p>
                <p className="text-2xl font-bold text-red-600">{dayData.count}</p>
                <p className="text-xs text-gray-500">delays</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optimization Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {delayAnalysis.peakDelayHour.count > 5 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-yellow-800">Peak Hour Optimization</p>
                <p className="text-sm text-yellow-700">
                  High delays at {delayAnalysis.peakDelayHour.hour}:00. Consider increasing frequency or buffer time.
                </p>
              </div>
            )}
            
            {delayAnalysis.routeDelays[0]?.delayCount > 10 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium text-red-800">Route Priority</p>
                <p className="text-sm text-red-700">
                  Route {delayAnalysis.routeDelays[0].routeName} needs immediate attention with {delayAnalysis.routeDelays[0].delayCount} delays.
                </p>
              </div>
            )}
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-blue-800">Preventive Measures</p>
              <p className="text-sm text-blue-700">
                Implement real-time monitoring and proactive maintenance to reduce delay incidents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}