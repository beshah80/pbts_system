'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStore } from '@/lib/store';
import { Route, Stop } from '@/types';

interface RouteFormProps {
  route?: Route;
  onClose: () => void;
}

export function RouteForm({ route, onClose }: RouteFormProps) {
  const addRoute = useAdminStore((state) => state.addRoute);
  const updateRoute = useAdminStore((state) => state.updateRoute);
  const [locations, setLocations] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    routeNumber: route?.routeNumber || '',
    routeName: route?.routeName || '',
    startLocation: route?.startLocation || '',
    endLocation: route?.endLocation || '',
    distance: route?.distance || 0,
    estimatedDuration: route?.estimatedDuration || 0,
    farePrice: route?.farePrice || 0,
    frequency: route?.frequency || 15,
    operatingStart: route?.operatingHours?.start || '06:00',
    operatingEnd: route?.operatingHours?.end || '22:00',
    isActive: route?.isActive ?? true
  });

  const [stops, setStops] = useState<Stop[]>(route?.stops || []);

  useEffect(() => {
    // Load Ethiopian locations from search.json
    fetch('/asset/search.json')
      .then(res => res.json())
      .then(data => {
        const pois = data.pois || [];
        const ethiopianLocations = pois
          .filter((poi: any) => poi[0] && typeof poi[0] === 'string')
          .map((poi: any) => ({
            name: poi[0],
            coordinates: poi[2] ? [poi[2][1], poi[2][0]] : null
          }))
          .filter((loc: any) => loc.coordinates)
          .slice(0, 100); // Limit for performance
        setLocations(ethiopianLocations);
      })
      .catch(err => console.error('Failed to load locations:', err));
  }, []);

  const addStop = () => {
    const newStop: Stop = {
      id: Date.now().toString(),
      stopName: '',
      latitude: 0,
      longitude: 0,
      stopOrder: stops.length + 1
    };
    setStops([...stops, newStop]);
  };

  const updateStop = (index: number, field: keyof Stop, value: any) => {
    const updatedStops = [...stops];
    updatedStops[index] = { ...updatedStops[index], [field]: value };
    
    // If location is selected, update coordinates
    if (field === 'stopName') {
      const location = locations.find(loc => loc.name === value);
      if (location) {
        updatedStops[index].latitude = location.coordinates[0];
        updatedStops[index].longitude = location.coordinates[1];
      }
    }
    
    setStops(updatedStops);
  };

  const removeStop = (index: number) => {
    const updatedStops = stops.filter((_, i) => i !== index);
    // Reorder stops
    updatedStops.forEach((stop, i) => {
      stop.stopOrder = i + 1;
    });
    setStops(updatedStops);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const routeData: Omit<Route, 'id' | 'createdAt' | 'updatedAt'> = {
      ...formData,
      distance: Number(formData.distance),
      estimatedDuration: Number(formData.estimatedDuration),
      farePrice: Number(formData.farePrice),
      frequency: Number(formData.frequency),
      operatingHours: {
        start: formData.operatingStart,
        end: formData.operatingEnd
      },
      stops,
      assignedBuses: route?.assignedBuses || []
    };
    
    if (route) {
      updateRoute(route.id, routeData);
    } else {
      const newRoute: Route = {
        id: Date.now().toString(),
        ...routeData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      addRoute(newRoute);
    }
    
    onClose();
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{route ? 'Edit Route' : 'Create New Route'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Route Number</label>
              <input
                type="text"
                required
                value={formData.routeNumber}
                onChange={(e) => setFormData({ ...formData, routeNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="R001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Route Name</label>
              <input
                type="text"
                required
                value={formData.routeName}
                onChange={(e) => setFormData({ ...formData, routeName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Merkato - Bole"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Location</label>
              <select
                required
                value={formData.startLocation}
                onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select start location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Location</label>
              <select
                required
                value={formData.endLocation}
                onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select end location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Distance (km)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                required
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration (min)</label>
              <input
                type="number"
                min="0"
                required
                value={formData.estimatedDuration}
                onChange={(e) => setFormData({ ...formData, estimatedDuration: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fare (ETB)</label>
              <input
                type="number"
                step="0.5"
                min="0"
                required
                value={formData.farePrice}
                onChange={(e) => setFormData({ ...formData, farePrice: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Frequency (min)</label>
              <input
                type="number"
                min="5"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                value={formData.operatingStart}
                onChange={(e) => setFormData({ ...formData, operatingStart: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                value={formData.operatingEnd}
                onChange={(e) => setFormData({ ...formData, operatingEnd: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Route Stops</h3>
              <Button type="button" onClick={addStop} variant="outline" size="sm">
                Add Stop
              </Button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {stops.map((stop, index) => (
                <div key={stop.id} className="flex gap-3 items-center p-3 border rounded-lg">
                  <span className="text-sm font-medium w-8">{index + 1}</span>
                  <select
                    value={stop.stopName}
                    onChange={(e) => updateStop(index, 'stopName', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select stop location</option>
                    {locations.map((location, locIndex) => (
                      <option key={locIndex} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    onClick={() => removeStop(index)}
                    variant="outline"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Route is active
            </label>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {route ? 'Update' : 'Create'} Route
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