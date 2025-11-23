'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Zap,
  Wifi,
  Battery
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function MobileOptimization() {
  const [deviceStats, setDeviceStats] = useState({
    mobile: 65,
    tablet: 20,
    desktop: 15
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    mobileLoadTime: 1.8,
    tabletLoadTime: 1.5,
    desktopLoadTime: 1.2,
    offlineCapability: 95,
    pwaBadge: true
  });

  useEffect(() => {
    // Simulate real-time performance monitoring
    const interval = setInterval(() => {
      setPerformanceMetrics(prev => ({
        ...prev,
        mobileLoadTime: Math.max(1.0, prev.mobileLoadTime + (Math.random() - 0.5) * 0.2),
        tabletLoadTime: Math.max(1.0, prev.tabletLoadTime + (Math.random() - 0.5) * 0.2),
        desktopLoadTime: Math.max(1.0, prev.desktopLoadTime + (Math.random() - 0.5) * 0.2)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getLoadTimeColor = (time: number) => {
    if (time < 2) return 'text-green-600';
    if (time < 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mobile Optimization</h2>
          <p className="text-gray-600">Responsive design and mobile performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          {performanceMetrics.pwaBadge && (
            <Badge variant="default">PWA Ready</Badge>
          )}
          <Badge variant="secondary">Mobile First</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mobile Users</p>
                <p className="text-3xl font-bold text-blue-600">{deviceStats.mobile}%</p>
              </div>
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tablet Users</p>
                <p className="text-3xl font-bold text-green-600">{deviceStats.tablet}%</p>
              </div>
              <Tablet className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Desktop Users</p>
                <p className="text-3xl font-bold text-purple-600">{deviceStats.desktop}%</p>
              </div>
              <Monitor className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-blue-500" />
                  <span>Mobile Load Time</span>
                </div>
                <span className={`font-medium ${getLoadTimeColor(performanceMetrics.mobileLoadTime)}`}>
                  {performanceMetrics.mobileLoadTime.toFixed(1)}s
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Tablet className="w-4 h-4 text-green-500" />
                  <span>Tablet Load Time</span>
                </div>
                <span className={`font-medium ${getLoadTimeColor(performanceMetrics.tabletLoadTime)}`}>
                  {performanceMetrics.tabletLoadTime.toFixed(1)}s
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Monitor className="w-4 h-4 text-purple-500" />
                  <span>Desktop Load Time</span>
                </div>
                <span className={`font-medium ${getLoadTimeColor(performanceMetrics.desktopLoadTime)}`}>
                  {performanceMetrics.desktopLoadTime.toFixed(1)}s
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Wifi className="w-4 h-4 text-orange-500" />
                  <span>Offline Capability</span>
                </div>
                <span className="font-medium text-green-600">
                  {performanceMetrics.offlineCapability}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mobile Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span>Progressive Web App</span>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-green-500" />
                  <span>Touch Optimized</span>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span>Offline Mode</span>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Battery className="w-4 h-4 text-green-500" />
                  <span>Battery Optimized</span>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Responsive Breakpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <Smartphone className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="font-medium">Mobile</p>
              <p className="text-sm text-gray-600">< 768px</p>
              <Badge variant="default" className="mt-2">Optimized</Badge>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Tablet className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="font-medium">Tablet</p>
              <p className="text-sm text-gray-600">768px - 1024px</p>
              <Badge variant="default" className="mt-2">Optimized</Badge>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Monitor className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="font-medium">Desktop</p>
              <p className="text-sm text-gray-600">1024px - 1440px</p>
              <Badge variant="default" className="mt-2">Optimized</Badge>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Monitor className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <p className="font-medium">Large</p>
              <p className="text-sm text-gray-600">> 1440px</p>
              <Badge variant="default" className="mt-2">Optimized</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}