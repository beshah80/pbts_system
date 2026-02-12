'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RouteForm } from '@/components/forms/route-form';
import { cn } from '@/lib/utils';
import {
    ChevronRight,
    Pencil,
    Trash
} from 'lucide-react';
import { useState } from 'react';

// --- Mock Data from Prototype ---
const ROUTES_DATA = [
  {
    id: 'R-22',
    path: 'Bole Atlas → Piazza',
    stops: 14,
    distance: '12.5 km',
    time: '45 mins',
    isActive: true,
    routeNumber: 'R-22',
    routeName: 'Bole Atlas → Piazza',
    startLocation: 'Bole Atlas',
    endLocation: 'Piazza',
    estimatedDuration: 45,
    farePrice: 15,
    frequency: 15,
    operatingHours: { start: '06:00', end: '22:00' },
    assignedBuses: [],
    stopsArray: []
  },
  {
    id: 'R-05',
    path: 'Megenagna → Saris',
    stops: 10,
    distance: '8.2 km',
    time: '30 mins',
    isActive: false,
    routeNumber: 'R-05',
    routeName: 'Megenagna → Saris',
    startLocation: 'Megenagna',
    endLocation: 'Saris',
    estimatedDuration: 30,
    farePrice: 12,
    frequency: 20,
    operatingHours: { start: '06:00', end: '22:00' },
    assignedBuses: [],
    stopsArray: []
  },
  {
    id: 'R-10',
    path: 'Mexico → Kera',
    stops: 7,
    distance: '5.1 km',
    time: '20 mins',
    isActive: true,
    routeNumber: 'R-10',
    routeName: 'Mexico → Kera',
    startLocation: 'Mexico',
    endLocation: 'Kera',
    estimatedDuration: 20,
    farePrice: 10,
    frequency: 10,
    operatingHours: { start: '06:00', end: '22:00' },
    assignedBuses: [],
    stopsArray: []
  },
  {
    id: 'R-33',
    path: 'Kazanchis → CMC',
    stops: 18,
    distance: '15.8 km',
    time: '60 mins',
    isActive: false,
    routeNumber: 'R-33',
    routeName: 'Kazanchis → CMC',
    startLocation: 'Kazanchis',
    endLocation: 'CMC',
    estimatedDuration: 60,
    farePrice: 18,
    frequency: 25,
    operatingHours: { start: '06:00', end: '22:00' },
    assignedBuses: [],
    stopsArray: []
  },
];

export default function RoutesPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingRoute, setEditingRoute] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [routes, setRoutes] = useState(ROUTES_DATA);

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.path.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         route.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && route.isActive) || 
                         (statusFilter === 'inactive' && !route.isActive);
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (route: any) => {
    setEditingRoute(route);
    setShowAddDialog(true);
  };

  const handleDelete = (routeId: string) => {
    if (confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(route => route.id !== routeId));
    }
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setEditingRoute(null);
  };

  return (
    <ProtectedRoute>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Routes & Stops</h1>
            <p className="text-gray-600 mt-1">Manage bus routes, stops, and schedules</p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-sm">
                <span className="mr-2">+</span>
                Create New Route
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogTitle>{editingRoute ? 'Edit Route' : 'Create New Route'}</DialogTitle>
              <RouteForm route={editingRoute} onClose={handleCloseDialog} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <ChevronRight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90" />
                <Input 
                  placeholder="Search routes by name or ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Routes</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* Routes Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Routes ({filteredRoutes.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-sm font-semibold text-gray-700">
                  <th className="px-6 py-4 text-left">Route ID</th>
                  <th className="px-6 py-4 text-left">Route Path</th>
                  <th className="px-6 py-4 text-left">Stops</th>
                  <th className="px-6 py-4 text-left">Distance</th>
                  <th className="px-6 py-4 text-left">Duration</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRoutes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      <p className="text-sm">No routes found</p>
                      <p className="text-xs mt-1">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredRoutes.map((route) => (
                    <tr key={route.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">
                          {route.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{route.path}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {route.stops} stops
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {route.distance}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {route.time}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            route.isActive ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                          <span className={`text-sm font-medium ${
                            route.isActive ? 'text-green-700' : 'text-gray-500'
                          }`}>
                            {route.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(route)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit route"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(route.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete route"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
    );
  }
