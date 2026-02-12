'use client';

import { ScheduleForm } from '@/components/forms/schedule-form';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAdminStore } from '@/lib/store';
import { Calendar, Filter, Plus, Settings } from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';

type TimelineTrip = {
  id: string;
  labelLeft: string;
  start: string;
  end: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'In Progress';
};

export default function SchedulesPage() {
  const schedules = useAdminStore((state) => state.schedules);
  const buses = useAdminStore((state) => state.buses);
  const drivers = useAdminStore((state) => state.drivers);
  const routes = useAdminStore((state) => state.routes);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTrip, setSelectedTrip] = useState<TimelineTrip | null>(null);
  const [trips, setTrips] = useState<TimelineTrip[]>([]);

  const hoursStart = 8;
  const hoursEnd = 22;
  const hours = Array.from({ length: hoursEnd - hoursStart + 1 }, (_, i) => hoursStart + i);

  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + (m || 0);
  };
  const rangeMinutes = (hoursEnd - hoursStart) * 60;
  const toPercent = (t: string) => ((timeToMinutes(t) - hoursStart * 60) / rangeMinutes) * 100;
  const widthPercent = (start: string, end: string) => ((timeToMinutes(end) - timeToMinutes(start)) / rangeMinutes) * 100;

  const dayLabel = useMemo(() => {
    const opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
    return currentDate.toLocaleDateString(undefined, opts);
  }, [currentDate]);

  const timelineTrips: TimelineTrip[] = useMemo(() => {
    if (trips.length > 0) return trips;
    if (!schedules || schedules.length === 0) {
      const mockTrips: TimelineTrip[] = [
        { id: 'Bx170', labelLeft: 'Bx170', start: '09:30', end: '11:00', status: 'Scheduled' },
        { id: 'Bx210', labelLeft: 'Bx210', start: '10:00', end: '13:00', status: 'Completed' },
        { id: 'Bx275', labelLeft: 'Bx275', start: '14:00', end: '18:00', status: 'Scheduled' },
        { id: 'Bx315', labelLeft: 'Bx315', start: '16:30', end: '19:00', status: 'In Progress' },
      ];
      if (trips.length === 0) setTrips(mockTrips);
      return mockTrips;
    }
    return schedules.map((s: any) => {
      const bus = buses.find(b => b.id === s.busId);
      return {
        id: bus?.busNumber || s.busId,
        labelLeft: bus?.busNumber || 'Bus',
        start: (s.departureTime || '09:00').slice(11, 16),
        end: (s.arrivalTime || '11:00').slice(11, 16),
        status: s.status === 'COMPLETED' ? 'Completed' : s.status === 'IN_PROGRESS' ? 'In Progress' : s.status === 'CANCELLED' ? 'Cancelled' : 'Scheduled'
      };
    });
  }, [schedules, buses, trips]);

  const handleAssignBus = (busName: string) => {
    if (selectedTrip) {
      const updatedTrips = timelineTrips.map(trip => 
        trip.id === selectedTrip.id 
          ? { ...trip, labelLeft: busName }
          : trip
      );
      setTrips(updatedTrips);
      setSelectedTrip({ ...selectedTrip, labelLeft: busName });
      alert(`${busName} assigned successfully!`);
    } else {
      alert('Please select a trip first.');
    }
  };

  const handleEditTrip = () => {
    if (selectedTrip) {
      setShowEditDialog(true);
    } else {
      alert('Please select a trip to edit.');
    }
  };

  const handleCancelTrip = () => {
    if (selectedTrip && confirm('Cancel this trip?')) {
      const updatedTrips = timelineTrips.map(trip => 
        trip.id === selectedTrip.id 
          ? { ...trip, status: 'Cancelled' as const }
          : trip
      );
      setTrips(updatedTrips);
      setSelectedTrip({ ...selectedTrip, status: 'Cancelled' });
    }
  };

  const statusColor = (status: TimelineTrip['status']) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'Cancelled': return 'bg-red-500';
      case 'In Progress': return 'bg-indigo-500';
      default: return 'bg-blue-500';
    }
  };

  const goPrevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };
  const goNextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  return (
    <ProtectedRoute requiredPermission="schedules.read">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
            <p className="text-gray-600 mt-1">Plan and manage daily bus schedules</p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogTitle>Create New Schedule</DialogTitle>
              <ScheduleForm onClose={() => setShowAddDialog(false)} />
            </DialogContent>
          </Dialog>
          
          {/* Edit Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="max-w-md">
              <DialogTitle>Edit Trip</DialogTitle>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Time</label>
                  <input 
                    type="time" 
                    defaultValue={selectedTrip?.start || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Time</label>
                  <input 
                    type="time" 
                    defaultValue={selectedTrip?.end || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => setShowEditDialog(false)}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Date Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-lg">{dayLabel}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={goPrevDay} className="h-9 px-4">
                  ← Previous
                </Button>
                <Button variant="outline" onClick={goNextDay} className="h-9 px-4">
                  Next →
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-9 gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" className="h-9">
                View Mode: Day ▾
              </Button>
            </div>
          </div>
        </div>

        {/* Schedule Timeline */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Daily Schedule Timeline</h2>
            <p className="text-sm text-gray-600 mt-1">Bus schedules for {dayLabel}</p>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4">
              {/* Time Header */}
              <div className="grid grid-cols-[140px_1fr] gap-4 mb-4">
                <div className="text-sm font-medium text-gray-700">Bus</div>
                <div className="relative h-6">
                  <div className="absolute inset-0 flex justify-between text-xs text-gray-500 font-medium">
                    {hours.map(h => (
                      <div key={h} className="flex-1 text-center">
                        {String(h).padStart(2, '0')}:00
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Schedule Bars */}
              <div className="space-y-3">
                {timelineTrips.map((trip) => (
                  <div key={trip.id} className="grid grid-cols-[140px_1fr] gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                        {trip.labelLeft.replace('Bx', '')}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{trip.labelLeft}</span>
                    </div>
                    <div className="relative h-12 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 ${statusColor(trip.status)} text-white text-xs font-semibold rounded-lg px-3 py-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow`}
                        style={{
                          left: `${toPercent(trip.start)}%`,
                          width: `${Math.max(widthPercent(trip.start, trip.end), 8)}%`
                        }}
                        onClick={() => setSelectedTrip(trip)}
                        title={`${trip.start} - ${trip.end} (${trip.status})`}
                      >
                        <div className="flex items-center gap-1">
                          <span>{trip.start}</span>
                          <span>→</span>
                          <span>{trip.end}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-gray-600">Scheduled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                    <span className="text-gray-600">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-gray-600">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-gray-600">Cancelled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trip Details */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Trip Details</h3>
            </div>
            <div className="p-6">
              {selectedTrip ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${statusColor(selectedTrip.status).replace('bg-', 'bg-')}`}></div>
                    <span className="font-semibold text-gray-900">{selectedTrip.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Bus:</span>
                      <div className="font-medium text-gray-900">{selectedTrip.labelLeft}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <div className="font-medium text-gray-900">{dayLabel}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Departure:</span>
                      <div className="font-medium text-gray-900">{selectedTrip.start}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Arrival:</span>
                      <div className="font-medium text-gray-900">{selectedTrip.end}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="h-9" onClick={handleEditTrip}>Edit Trip</Button>
                    <Button variant="destructive" className="h-9" onClick={handleCancelTrip}>Cancel Trip</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">Select a trip from the timeline to view details</p>
                </div>
              )}
            </div>
          </div>

          {/* Available Buses */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Available Buses</h3>
              <p className="text-sm text-gray-600 mt-1">Buses ready for assignment</p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {['Bus 34 - Bx105', 'Bus 12 - Bx210', 'Bus 28 - Bx315'].map((bus) => (
                  <div key={bus} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">
                        {bus.split(' - ')[1]?.replace('Bx', '') || '?'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bus}</div>
                        <div className="text-xs text-green-600 font-medium">Available</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleAssignBus(bus)}
                    >
                      Assign
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
