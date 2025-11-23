'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Database, 
  Server, 
  Activity,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    pageLoadTime: 1.8,
    apiResponseTime: 245,
    memoryUsage: 68,
    cpuUsage: 42,
    dbQueryTime: 89,
    cacheHitRate: 94
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Memory usage above 65%', time: '2 min ago' },
    { id: 2, type: 'info', message: 'Cache optimization completed', time: '15 min ago' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        pageLoadTime: Math.max(1.0, prev.pageLoadTime + (Math.random() - 0.5) * 0.3),
        apiResponseTime: Math.max(100, prev.apiResponseTime + (Math.random() - 0.5) * 50),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 10)),
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 15)),
        dbQueryTime: Math.max(50, prev.dbQueryTime + (Math.random() - 0.5) * 20),
        cacheHitRate: Math.max(85, Math.min(98, prev.cacheHitRate + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPerformanceColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getUsageColor = (usage: number) => {
    if (usage < 60) return 'text-green-600';
    if (usage < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Optimization</h2>
          <p className="text-gray-600">System performance monitoring and optimization</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={metrics.pageLoadTime < 2 ? 'default' : 'destructive'}>
            {metrics.pageLoadTime < 2 ? 'Optimized' : 'Needs Attention'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Load Time</p>
                <p className={`text-3xl font-bold ${getPerformanceColor(metrics.pageLoadTime, { good: 2, warning: 3 })}`}>
                  {metrics.pageLoadTime.toFixed(1)}s
                </p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">API Response</p>
                <p className={`text-3xl font-bold ${getPerformanceColor(metrics.apiResponseTime, { good: 200, warning: 500 })}`}>
                  {Math.round(metrics.apiResponseTime)}ms
                </p>
              </div>
              <Server className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cache Hit Rate</p>
                <p className="text-3xl font-bold text-purple-600">{metrics.cacheHitRate.toFixed(1)}%</p>
              </div>
              <Database className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span>Memory Usage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${metrics.memoryUsage < 60 ? 'bg-green-500' : metrics.memoryUsage < 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${metrics.memoryUsage}%` }}
                    />
                  </div>
                  <span className={`font-medium ${getUsageColor(metrics.memoryUsage)}`}>
                    {Math.round(metrics.memoryUsage)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span>CPU Usage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${metrics.cpuUsage < 60 ? 'bg-green-500' : metrics.cpuUsage < 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${metrics.cpuUsage}%` }}
                    />
                  </div>
                  <span className={`font-medium ${getUsageColor(metrics.cpuUsage)}`}>
                    {Math.round(metrics.cpuUsage)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-purple-500" />
                  <span>DB Query Time</span>
                </div>
                <span className={`font-medium ${getPerformanceColor(metrics.dbQueryTime, { good: 100, warning: 200 })}`}>
                  {Math.round(metrics.dbQueryTime)}ms
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 border rounded-lg ${
                  alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' : 'border-blue-200 bg-blue-50'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className={`w-4 h-4 ${
                      alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                    <span className="font-medium text-sm">{alert.message}</span>
                  </div>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Optimization Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-medium">Database Optimization</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Implement query caching and indexing to reduce response times by 30%.
              </p>
              <Button size="sm" variant="outline">Apply Optimization</Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Memory Management</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Enable garbage collection optimization to reduce memory usage.
              </p>
              <Button size="sm" variant="outline">Enable GC</Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-4 h-4 text-purple-500" />
                <span className="font-medium">CDN Integration</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Configure CDN for static assets to improve load times globally.
              </p>
              <Button size="sm" variant="outline">Configure CDN</Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-orange-500" />
                <span className="font-medium">Code Splitting</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Implement lazy loading to reduce initial bundle size by 40%.
              </p>
              <Button size="sm" variant="outline">Enable Lazy Loading</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}