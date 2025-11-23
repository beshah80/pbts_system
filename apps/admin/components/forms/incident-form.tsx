'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStore } from '@/lib/store';
import { Incident } from '@/types';

interface IncidentFormProps {
  incident?: Incident;
  onClose: () => void;
}

export function IncidentForm({ incident, onClose }: IncidentFormProps) {
  const addIncident = useAdminStore((state) => state.addIncident);
  const updateIncident = useAdminStore((state) => state.updateIncident);
  const buses = useAdminStore((state) => state.buses);
  const drivers = useAdminStore((state) => state.drivers);
  
  const [formData, setFormData] = useState({
    busId: incident?.busId || '',
    driverId: incident?.driverId || '',
    type: incident?.type || 'BREAKDOWN',
    severity: incident?.severity || 'MEDIUM',
    description: incident?.description || '',
    location: incident?.location || '',
    status: incident?.status || 'REPORTED'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (incident) {
      updateIncident(incident.id, formData);
    } else {
      const newIncident: Incident = {
        id: Date.now().toString(),
        ...formData,
        reportedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      addIncident(newIncident);
    }
    
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{incident ? 'Edit Incident' : 'Report New Incident'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bus</label>
              <select
                required
                value={formData.busId}
                onChange={(e) => setFormData({ ...formData, busId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Bus</option>
                {buses.map((bus) => (
                  <option key={bus.id} value={bus.id}>
                    {bus.busNumber} - {bus.plateNumber}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Driver</label>
              <select
                required
                value={formData.driverId}
                onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.firstName} {driver.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Incident Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Incident['type'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="BREAKDOWN">Breakdown</option>
                <option value="ACCIDENT">Accident</option>
                <option value="DELAY">Delay</option>
                <option value="PASSENGER_ISSUE">Passenger Issue</option>
                <option value="TRAFFIC">Traffic</option>
                <option value="WEATHER">Weather</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Severity</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value as Incident['severity'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Incident location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the incident..."
            />
          </div>

          {incident && (
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Incident['status'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="REPORTED">Reported</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="ESCALATED">Escalated</option>
              </select>
            </div>
          )}
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {incident ? 'Update' : 'Report'} Incident
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