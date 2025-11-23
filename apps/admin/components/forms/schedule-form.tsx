'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStore } from '@/lib/store';
import { Schedule } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface ScheduleFormProps {
  schedule?: Schedule;
  onClose: () => void;
}

export function ScheduleForm({ schedule, onClose }: ScheduleFormProps) {
  const addSchedule = useAdminStore((state) => state.addSchedule);
  const updateSchedule = useAdminStore((state) => state.updateSchedule);
  const schedules = useAdminStore((state) => state.schedules);
  const buses = useAdminStore((state) => state.buses);
  const drivers = useAdminStore((state) => state.drivers);
  const routes = useAdminStore((state) => state.routes);
  
  const [formData, setFormData] = useState({
    routeId: schedule?.routeId || '',
    busId: schedule?.busId || '',
    driverId: schedule?.driverId || '',
    date: schedule?.date || new Date().toISOString().split('T')[0],
    departureTime: schedule?.departureTime || '',
    arrivalTime: schedule?.arrivalTime || '',
    status: schedule?.status || 'SCHEDULED'
  });

  const [conflicts, setConflicts] = useState<string[]>([]);

  const checkConflicts = () => {
    const newConflicts: string[] = [];
    
    // Check bus conflicts
    const busConflict = schedules.find(s => 
      s.id !== schedule?.id &&
      s.busId === formData.busId &&
      s.date === formData.date &&
      s.status !== 'CANCELLED' &&
      ((formData.departureTime >= s.departureTime && formData.departureTime <= s.arrivalTime) ||
       (formData.arrivalTime >= s.departureTime && formData.arrivalTime <= s.arrivalTime))
    );
    
    if (busConflict) {
      newConflicts.push(`Bus is already scheduled from ${busConflict.departureTime} to ${busConflict.arrivalTime}`);
    }

    // Check driver conflicts
    const driverConflict = schedules.find(s => 
      s.id !== schedule?.id &&
      s.driverId === formData.driverId &&
      s.date === formData.date &&
      s.status !== 'CANCELLED' &&
      ((formData.departureTime >= s.departureTime && formData.departureTime <= s.arrivalTime) ||
       (formData.arrivalTime >= s.departureTime && formData.arrivalTime <= s.arrivalTime))
    );
    
    if (driverConflict) {
      newConflicts.push(`Driver is already assigned from ${driverConflict.departureTime} to ${driverConflict.arrivalTime}`);
    }

    setConflicts(newConflicts);
    return newConflicts.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkConflicts()) {
      return;
    }
    
    if (schedule) {
      updateSchedule(schedule.id, formData);
    } else {
      const newSchedule: Schedule = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      addSchedule(newSchedule);
    }
    
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{schedule ? 'Edit Schedule' : 'Create New Schedule'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Route</label>
            <select
              required
              value={formData.routeId}
              onChange={(e) => setFormData({ ...formData, routeId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Route</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.routeNumber} - {route.routeName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bus</label>
              <select
                required
                value={formData.busId}
                onChange={(e) => setFormData({ ...formData, busId: e.target.value })}
                onBlur={checkConflicts}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Bus</option>
                {buses.filter(b => b.status === 'ACTIVE').map((bus) => (
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
                onBlur={checkConflicts}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Driver</option>
                {drivers.filter(d => d.status === 'ACTIVE').map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.firstName} {driver.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                onBlur={checkConflicts}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Departure Time</label>
              <input
                type="time"
                required
                value={formData.departureTime}
                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                onBlur={checkConflicts}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Arrival Time</label>
              <input
                type="time"
                required
                value={formData.arrivalTime}
                onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                onBlur={checkConflicts}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {conflicts.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="font-medium text-red-800">Scheduling Conflicts Detected:</span>
              </div>
              <ul className="list-disc list-inside text-sm text-red-700">
                {conflicts.map((conflict, index) => (
                  <li key={index}>{conflict}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={conflicts.length > 0}
            >
              {schedule ? 'Update' : 'Create'} Schedule
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