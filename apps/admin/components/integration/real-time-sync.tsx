'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { useAdminStore } from '@/lib/store';
import { useState, useEffect } from 'react';

export function RealTimeSync() {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('connected');
  const [lastSync, setLastSync] = useState(new Date());
  const [syncStats, setSyncStats] = useState({
    totalSyncs: 1247,
    failedSyncs: 3,
    avgSyncTime: 1.2,
    dataTransferred: 45.6
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
      setSyncStats(prev => ({
        ...prev,
        totalSyncs: prev.totalSyncs + 1,
        dataTransferred: prev.dataTransferred + Math.random() * 0.5
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleManualSync = () => {
    setConnectionStatus('reconnecting');
    setTimeout(() => {
      setConnectionStatus('connected');
      setLastSync(new Date());
    }, 2000);
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-600';
      case 'disconnected': return 'text-red-600';
      case 'reconnecting': return 'text-yellow-600';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return <Wifi className="w-5 h-5" />;
      case 'disconnected': return <WifiOff className="w-5 h-5" />;
      case 'reconnecting': return <RefreshCw className="w-5 h-5 animate-spin" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Real-Time Data Synchronization</h2>
          <p className="text-gray-600">Live data sync status and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="font-medium capitalize">{connectionStatus}</span>
          </div>
          <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'}>
            {connectionStatus === 'connected' ? 'Online' : 'Offline'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Syncs</p>
                <p className="text-3xl font-bold text-blue-600">{syncStats.totalSyncs.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Syncs</p>
                <p className="text-3xl font-bold text-red-600">{syncStats.failedSyncs}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Sync Time</p>
                <p className="text-3xl font-bold text-green-600">{syncStats.avgSyncTime}s</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Transfer</p>
                <p className="text-3xl font-bold text-purple-600">{syncStats.dataTransferred.toFixed(1)}MB</p>
              </div>
              <RefreshCw className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sync Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Bus Location Data</span>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Schedule Updates</span>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Incident Reports</span>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Passenger Feedback</span>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sync Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Last Sync</p>
                <p className="font-medium">{lastSync.toLocaleString()}</p>
              </div>
              <Button 
                onClick={handleManualSync}
                disabled={connectionStatus === 'reconnecting'}
                className="w-full"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${connectionStatus === 'reconnecting' ? 'animate-spin' : ''}`} />
                Force Sync
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  Sync Settings
                </Button>
                <Button variant="outline" size="sm">
                  View Logs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}