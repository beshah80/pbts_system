'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plus, Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAdminStore } from '@/lib/store';
import { ProtectedRoute } from '@/components/protected-route';
import { ScheduleForm } from '@/components/forms/schedule-form';
import { AdvancedSearch } from '@/components/advanced-search';
import { BulkOperations } from '@/components/bulk-operations';

export default function SchedulesPage() {
  const schedules = useAdminStore((state) => state.schedules);
  const buses = useAdminStore((state) => state.buses);
  const drivers = useAdminStore((state) => state.drivers);
  const routes = useAdminStore((state) => state.routes);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState<any>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'DELAYED': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="w-4 h-4" />;
      case 'DELAYED': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const route = routes.find(r => r.id === schedule.routeId);
      const bus = buses.find(b => b.id === schedule.busId);
      const driver = drivers.find(d => d.id === schedule.driverId);
      
      // Text search
      if (searchFilters.query) {
        const query = searchFilters.query.toLowerCase();
        const searchText = `${route?.routeName || ''} ${bus?.busNumber || ''} ${driver?.firstName || ''} ${driver?.lastName || ''}`.toLowerCase();
        if (!searchText.includes(query)) return false;
      }
      
      // Status filter
      if (searchFilters.status && schedule.status !== searchFilters.status) {
        return false;
      }
      
      // Date range filter
      if (searchFilters.dateRange?.start && schedule.date < searchFilters.dateRange.start) {
        return false;
      }
      if (searchFilters.dateRange?.end && schedule.date > searchFilters.dateRange.end) {
        return false;
      }
      
      return true;
    });
  }, [schedules, routes, buses, drivers, searchFilters]);

  const handleSelectionChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const detectConflicts = (schedule: any) => {
    const conflicts = schedules.filter(s => 
      s.id !== schedule.id &&
      s.date === schedule.date &&
      s.status !== 'CANCELLED' &&
      ((s.busId === schedule.busId) || (s.driverId === schedule.driverId)) &&
      ((schedule.departureTime >= s.departureTime && schedule.departureTime <= s.arrivalTime) ||
       (schedule.arrivalTime >= s.departureTime && schedule.arrivalTime <= s.arrivalTime))
    );
    return conflicts.length > 0;
  };

  return (
    <ProtectedRoute requiredPermission="schedules.read">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Schedule Management</h1>
              <p className="text-gray-600">Manage bus schedules and detect conflicts</p>
            </div>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <ScheduleForm onClose={() => setShowAddDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{schedules.filter(s => s.status === 'SCHEDULED').length}</p>
                <p className="text-sm text-gray-600">Scheduled</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{schedules.filter(s => s.status === 'IN_PROGRESS').length}</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{schedules.filter(s => s.status === 'COMPLETED').length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{schedules.filter(s => s.status === 'DELAYED').length}</p>
                <p className="text-sm text-gray-600">Delayed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <AdvancedSearch
          entityType="schedules"
          onFiltersChange={setSearchFilters}
          onClearFilters={() => setSearchFilters({})}
        />

        <BulkOperations
          entityType="schedules"
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />

        <Card>
          <CardHeader>
            <CardTitle>Schedules ({filteredSchedules.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSchedules.map((schedule) => {
                const route = routes.find(r => r.id === schedule.routeId);
                const bus = buses.find(b => b.id === schedule.busId);
                const driver = drivers.find(d => d.id === schedule.driverId);
                
                const hasConflict = detectConflicts(schedule);
                
                return (
                  <div key={schedule.id} className={`flex items-center justify-between p-4 border rounded-lg ${hasConflict ? 'border-red-300 bg-red-50' : ''}`}>
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={selectedIds.includes(schedule.id)}
                        onCheckedChange={(checked) => handleSelectionChange(schedule.id, checked as boolean)}
                      />
                      <div className="flex items-center gap-2">
                        {getStatusIcon(schedule.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                          {schedule.status}
                        </span>
                        {hasConflict && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            CONFLICT
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{route?.routeName || 'Unknown Route'}</p>
                        <p className="text-sm text-gray-600">
                          {bus?.busNumber} • {driver?.firstName} {driver?.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{schedule.departureTime} - {schedule.arrivalTime}</p>
                      <p className="text-sm text-gray-600">{schedule.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}