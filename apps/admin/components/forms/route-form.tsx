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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
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

  const [stops, setStops] = useState<Stop[]>(route?.stopsArray || []);

  useEffect(() => {
    // Use mock Ethiopian locations instead of fetching
    const mockLocations = [
      { name: 'Merkato', coordinates: [9.0192, 38.7525] },
      { name: 'Bole', coordinates: [8.9806, 38.8048] },
      { name: 'Piazza', coordinates: [9.0348, 38.7578] },
      { name: 'Kazanchis', coordinates: [9.0227, 38.7636] },
      { name: 'Mexico', coordinates: [9.0084, 38.7614] },
      { name: 'Saris', coordinates: [9.0456, 38.7892] },
      { name: 'CMC', coordinates: [8.9806, 38.7525] },
      { name: 'Kera', coordinates: [9.0348, 38.7892] },
      { name: 'Megenagna', coordinates: [9.0227, 38.7948] }
    ];
    setLocations(mockLocations);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // Validation
      if (!formData.routeNumber.trim()) {
        throw new Error('Route number is required');
      }
      if (!formData.routeName.trim()) {
        throw new Error('Route name is required');
      }
      if (!formData.startLocation || !formData.endLocation) {
        throw new Error('Start and end locations are required');
      }
      if (formData.distance <= 0) {
        throw new Error('Distance must be greater than 0');
      }
      if (stops.length < 2) {
        throw new Error('Route must have at least 2 stops');
      }
      
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
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (err: any) {
      setError(err.message || 'Failed to save route. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {route ? 'Edit Route' : 'Create New Route'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {route ? 'Update route information and stops' : 'Add a new bus route with stops and schedule'}
          </p>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400 text-lg">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-green-400 text-lg">✅</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Route {route ? 'updated' : 'created'} successfully!
                  </p>
                </div>
              </div>
            </div>
          )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">1</span>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Route Number *</label>
                <input
                  type="text"
                  required
                  value={formData.routeNumber}
                  onChange={(e) => setFormData({ ...formData, routeNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., R001, Route-22"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Route Name *</label>
                <input
                  type="text"
                  required
                  value={formData.routeName}
                  onChange={(e) => setFormData({ ...formData, routeName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., Merkato - Bole Express"
                />
              </div>
            </div>
          </div>

          {/* Route Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">2</span>
              Route Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Location *</label>
                <select
                  required
                  value={formData.startLocation}
                  onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">End Location *</label>
                <select
                  required
                  value={formData.endLocation}
                  onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distance (km) *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="12.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (min) *</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.estimatedDuration}
                  onChange={(e) => setFormData({ ...formData, estimatedDuration: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="45"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fare (ETB) *</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  required
                  value={formData.farePrice}
                  onChange={(e) => setFormData({ ...formData, farePrice: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="15.0"
                />
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">3</span>
              Schedule & Frequency
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency (min)</label>
                <input
                  type="number"
                  min="5"
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  value={formData.operatingStart}
                  onChange={(e) => setFormData({ ...formData, operatingStart: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  value={formData.operatingEnd}
                  onChange={(e) => setFormData({ ...formData, operatingEnd: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Route Stops */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">4</span>
                Route Stops
              </h3>
              <Button type="button" onClick={addStop} variant="outline" size="sm" className="bg-white hover:bg-gray-50">
                + Add Stop
              </Button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto bg-white rounded-lg p-3">
              {stops.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No stops added yet</p>
                  <p className="text-xs mt-1">Click "Add Stop" to create your first stop</p>
                </div>
              ) : (
                stops.map((stop, index) => (
                  <div key={stop.id} className="flex gap-3 items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <select
                      value={stop.stopName}
                      onChange={(e) => updateStop(index, 'stopName', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      Remove
                    </Button>
                  </div>
                ))
              )}
            </div>
            {stops.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                ℹ️ Route must have at least 2 stops. Current: {stops.length} stops
              </p>
            )}
          </div>

          {/* Settings */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">5</span>
              Settings
            </h3>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Route is active and available for scheduling
              </label>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Route...
                </span>
              ) : (
                `${route ? 'Update' : 'Create'} Route`
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={loading}
              className="px-6 py-3 text-base"
            >
              Cancel
            </Button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}