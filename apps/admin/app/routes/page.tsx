'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, MapPin, Clock, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAdminStore } from '@/lib/store';
import { RouteForm } from '@/components/forms/route-form';
import { ProtectedRoute } from '@/components/protected-route';
import { Route } from '@/types';

export default function RoutesPage() {
  const routes = useAdminStore((state) => state.routes);
  const deleteRoute = useAdminStore((state) => state.deleteRoute);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Mock routes data using Ethiopian locations from search.json
  const mockRoutes = [
    {
      id: '1',
      routeName: 'Merkato - Bole',
      routeNumber: 'R001',
      startLocation: 'Merkato',
      endLocation: 'Bole',
      distance: 12.5,
      estimatedDuration: 45,
      farePrice: 15,
      isActive: true,
      stops: ['Merkato', 'Piassa', 'Arat Kilo', 'Mexico', 'Stadium', 'Bole']
    },
    {
      id: '2',
      routeName: 'Addis Ketema - CMC',
      routeNumber: 'R002',
      startLocation: 'Addis Ketema',
      endLocation: 'CMC',
      distance: 18.2,
      estimatedDuration: 60,
      farePrice: 20,
      isActive: true,
      stops: ['Addis Ketema', 'Piazza', 'Arat Kilo', 'Megenagna', 'Gurd Sholla', 'CMC']
    },
    {
      id: '3',
      routeName: 'Lebu - Kotebe',
      routeNumber: 'R003',
      startLocation: 'Lebu',
      endLocation: 'Kotebe',
      distance: 22.8,
      estimatedDuration: 75,
      farePrice: 25,
      isActive: false,
      stops: ['Lebu', 'Saris', 'Gotera', 'Megenagna', 'Ayat', 'Kotebe']
    }
  ];

  // Use actual routes from store, fallback to mock data if empty
  const allRoutes = routes.length > 0 ? routes : mockRoutes;

  const filteredRoutes = allRoutes.filter(route =>
    route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute requiredPermission="routes.read">
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Route Management</h1>
            <p className="text-gray-600">Manage bus routes and stops</p>
          </div>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Route
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl">
            <RouteForm onClose={() => setShowAddDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search routes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{allRoutes.filter(r => r.isActive).length}</p>
              <p className="text-sm text-gray-600">Active Routes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{allRoutes.filter(r => !r.isActive).length}</p>
              <p className="text-sm text-gray-600">Inactive Routes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{allRoutes.reduce((acc, r) => acc + r.stops.length, 0)}</p>
              <p className="text-sm text-gray-600">Total Stops</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{Math.round(allRoutes.reduce((acc, r) => acc + r.distance, 0))}</p>
              <p className="text-sm text-gray-600">Total KM</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutes.map((route) => (
          <Card key={route.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{route.routeName}</CardTitle>
                  <p className="text-sm text-gray-600">{route.routeNumber}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  route.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {route.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{route.startLocation} → {route.endLocation}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{route.estimatedDuration} min • {route.distance} km</span>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium text-green-600">{route.farePrice} ETB</p>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium mb-1">Stops ({route.stops.length}):</p>
                  <p className="text-gray-600 text-xs">
                    {route.stops.join(' → ')}
                  </p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl">
                      <RouteForm route={route} onClose={() => {}} />
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => routes.length > 0 && deleteRoute(route.id)}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </ProtectedRoute>
  );
}