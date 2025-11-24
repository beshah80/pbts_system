'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Filter, Edit, Trash2, MapPin, ArrowLeft } from 'lucide-react';
import { useAdminStore } from '@/lib/store';
import { BusForm } from '@/components/forms/bus-form';
import { ProtectedRoute } from '@/components/protected-route';
import { Bus } from '@/types';

export default function BusesPage() {
  const buses = useAdminStore((state) => state.buses);
  const deleteBus = useAdminStore((state) => state.deleteBus);
  const loadBuses = useAdminStore((state) => state.loadBuses);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    loadBuses();
  }, [loadBuses]);

  const getStatusColor = (status: Bus['status']) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'MAINTENANCE': return 'bg-yellow-100 text-yellow-800';
      case 'OUT_OF_SERVICE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBusTypeColor = (type: Bus['busType']) => {
    switch (type) {
      case 'ANBESSA': return 'bg-blue-100 text-blue-800';
      case 'SHEGER': return 'bg-purple-100 text-purple-800';
      case 'VELOCITY': return 'bg-orange-100 text-orange-800';
      case 'PRIVATE': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBuses = buses.filter(bus =>
    bus.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute requiredPermission="buses.read">
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bus Management</h1>
            <p className="text-gray-600">Manage your fleet of buses</p>
          </div>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Bus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <BusForm onClose={() => setShowAddDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by plate number or bus number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{buses.filter(b => b.status === 'ACTIVE').length}</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{buses.filter(b => b.status === 'MAINTENANCE').length}</p>
              <p className="text-sm text-gray-600">Maintenance</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{buses.filter(b => b.status === 'OUT_OF_SERVICE').length}</p>
              <p className="text-sm text-gray-600">Out of Service</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{buses.length}</p>
              <p className="text-sm text-gray-600">Total Buses</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Buses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Buses ({filteredBuses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Plate Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Bus Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Capacity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Current Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuses.map((bus) => (
                  <tr key={bus.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{bus.plateNumber}</td>
                    <td className="py-3 px-4">{bus.busNumber}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBusTypeColor(bus.busType)}`}>
                        {bus.busType}
                      </span>
                    </td>
                    <td className="py-3 px-4">{bus.capacity} seats</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bus.status)}`}>
                        {bus.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {bus.currentRouteId ? (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          Route {bus.currentRouteId}
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Dialog open={showEditDialog && editingBus?.id === bus.id} onOpenChange={(open) => {
                          if (!open) {
                            setShowEditDialog(false);
                            setEditingBus(null);
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setEditingBus(bus);
                                setShowEditDialog(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <BusForm 
                              bus={bus} 
                              onClose={() => {
                                setShowEditDialog(false);
                                setEditingBus(null);
                              }} 
                            />
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={async () => {
                            if (confirm('Are you sure you want to delete this bus?')) {
                              await deleteBus(bus.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
    </ProtectedRoute>
  );
}