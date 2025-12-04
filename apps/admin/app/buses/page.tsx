'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Bus, MapPin, Route, ArrowLeft } from 'lucide-react';
import { UnifiedRouteForm } from '@/components/forms/unified-route-form';
import { ProtectedRoute } from '@/components/protected-route';
import { ErrorBoundary } from '@/components/error-boundary';

export default function TransportPage() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    fetch('/asset/routes_with_stops.json')
      .then(res => res.json())
      .then(data => setRoutes(data))
      .catch(err => console.error('Failed to load routes:', err));
  }, []);

  const totalStops = routes.reduce((acc, route) => acc + (route.stops?.length || 0), 0);
  const uniqueStops = new Set(routes.flatMap(route => 
    route.stops?.map((stop: any) => stop.name) || []
  )).size;

  return (
    <ErrorBoundary>
      <ProtectedRoute requiredPermission="buses.read">
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transport Management</h1>
            <p className="text-gray-600">Manage routes, buses, and stops</p>
          </div>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Route
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <UnifiedRouteForm onClose={() => setShowAddDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Route className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <p className="text-3xl font-bold text-blue-600">{routes.length}</p>
            <p className="text-gray-600">Total Routes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <p className="text-3xl font-bold text-green-600">{uniqueStops}</p>
            <p className="text-gray-600">Unique Stops</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Bus className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <p className="text-3xl font-bold text-purple-600">{totalStops}</p>
            <p className="text-gray-600">Total Stop Points</p>
          </CardContent>
        </Card>
      </div>

      {/* Routes List */}
      <Card>
        <CardHeader>
          <CardTitle>All Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {routes.map((route) => (
              <div key={route.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{route.shortName}</p>
                  <p className="text-sm text-gray-600">{route.longName}</p>
                  <p className="text-xs text-gray-500">{route.stops?.length || 0} stops</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {route.mode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
      </ProtectedRoute>
    </ErrorBoundary>
  );
}