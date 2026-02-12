'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStore } from '@/lib/store';
import { Bus } from '@/types';

interface BusFormProps {
  bus?: Bus;
  onClose: () => void;
}

export function BusForm({ bus, onClose }: BusFormProps) {
  const addBus = useAdminStore((state) => state.addBus);
  const updateBus = useAdminStore((state) => state.updateBus);
  const [availableRoutes, setAvailableRoutes] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    plateNumber: bus?.plateNumber || '',
    busNumber: bus?.busNumber || '',
    capacity: bus?.capacity || 45,
    type: bus?.type || 'ANBESSA',
    status: bus?.status || 'ACTIVE',
    assignedRouteId: bus?.routeId || '',
    driverId: bus?.driverId || ''
  });

  useEffect(() => {
    const controller = new AbortController();
    const loadRoutes = async () => {
      try {
        const res = await fetch('http://localhost:3005/api/routes', {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch routes: ${res.status}`);
        }
        const routes = await res.json();
        setAvailableRoutes(routes || []);
      } catch (err) {
        if ((err as any)?.name !== 'AbortError') {
          console.error('Failed to load routes from backend', err);
          setAvailableRoutes([]);
        }
      }
    };
    loadRoutes();
    return () => controller.abort();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (bus) {
        await updateBus(bus.id, formData);
      } else {
        const newBus: Bus = {
          id: Date.now().toString(),
          ...formData,
          capacity: Number(formData.capacity),
          routeId: formData.assignedRouteId || undefined,
          currentPassengers: 0,
          lastMaintenance: new Date().toISOString().split('T')[0],
          nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          mileage: 0,
          fuelLevel: 100,
          gpsEnabled: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await addBus(newBus);
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to save bus:', error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{bus ? 'Edit Bus' : 'Add New Bus'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Plate Number</label>
            <input
              type="text"
              required
              value={formData.plateNumber}
              onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ANB-001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Bus Number</label>
            <input
              type="text"
              required
              value={formData.busNumber}
              onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Capacity</label>
            <input
              type="number"
              required
              min="1"
              max="100"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Bus Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Bus['type'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ANBESSA">Anbessa</option>
              <option value="SHEGER">Sheger</option>
              <option value="VELOCITY">Velocity</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Bus['status'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ACTIVE">Active</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="OUT_OF_SERVICE">Out of Service</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Assigned Route</label>
            <select
              value={formData.assignedRouteId}
              onChange={(e) => setFormData({ ...formData, assignedRouteId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No Route Assigned</option>
              {availableRoutes.map((route) => (
                <option key={route.id} value={route.id}>
                  {(route.routeNumber ?? route.shortName) ?? ''} - {(route.routeName ?? route.longName) ?? ''}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {bus ? 'Update' : 'Add'} Bus
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
