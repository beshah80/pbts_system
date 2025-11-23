'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, AlertTriangle, Clock, MapPin, Plus, Edit, CheckCircle } from 'lucide-react';
import { useAdminStore } from '@/lib/store';
import { ProtectedRoute } from '@/components/protected-route';
import { IncidentForm } from '@/components/forms/incident-form';
import { AdvancedSearch } from '@/components/advanced-search';
import { BulkOperations } from '@/components/bulk-operations';

export default function IncidentsPage() {
  const incidents = useAdminStore((state) => state.incidents);
  const updateIncident = useAdminStore((state) => state.updateIncident);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState<any>({});

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'CRITICAL': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REPORTED': return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'ESCALATED': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredIncidents = useMemo(() => {
    return incidents.filter(incident => {
      // Legacy filter
      if (filter !== 'ALL' && incident.status !== filter) {
        return false;
      }
      
      // Text search
      if (searchFilters.query) {
        const query = searchFilters.query.toLowerCase();
        const searchText = `${incident.type} ${incident.description} ${incident.location}`.toLowerCase();
        if (!searchText.includes(query)) return false;
      }
      
      // Status filter
      if (searchFilters.status && incident.status !== searchFilters.status) {
        return false;
      }
      
      // Category filter
      if (searchFilters.category && incident.type !== searchFilters.category) {
        return false;
      }
      
      // Priority filter
      if (searchFilters.priority && incident.severity !== searchFilters.priority) {
        return false;
      }
      
      // Location filter
      if (searchFilters.location && !incident.location.toLowerCase().includes(searchFilters.location.toLowerCase())) {
        return false;
      }
      
      // Date range filter
      if (searchFilters.dateRange?.start) {
        const incidentDate = new Date(incident.reportedAt).toISOString().split('T')[0];
        if (incidentDate < searchFilters.dateRange.start) return false;
      }
      if (searchFilters.dateRange?.end) {
        const incidentDate = new Date(incident.reportedAt).toISOString().split('T')[0];
        if (incidentDate > searchFilters.dateRange.end) return false;
      }
      
      return true;
    });
  }, [incidents, filter, searchFilters]);

  const handleSelectionChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const resolveIncident = (id: string) => {
    updateIncident(id, { 
      status: 'RESOLVED', 
      resolvedAt: new Date().toISOString() 
    });
  };

  return (
    <ProtectedRoute requiredPermission="incidents.read">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Incident Management</h1>
              <p className="text-gray-600">Track and resolve incidents</p>
            </div>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <IncidentForm onClose={() => setShowAddDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-2">
          {['ALL', 'REPORTED', 'IN_PROGRESS', 'RESOLVED'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status.replace('_', ' ')}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{incidents.filter(i => i.status === 'REPORTED').length}</p>
                <p className="text-sm text-gray-600">Reported</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{incidents.filter(i => i.status === 'IN_PROGRESS').length}</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{incidents.filter(i => i.status === 'RESOLVED').length}</p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{incidents.filter(i => i.severity === 'CRITICAL').length}</p>
                <p className="text-sm text-gray-600">Critical</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <AdvancedSearch
          entityType="incidents"
          onFiltersChange={setSearchFilters}
          onClearFilters={() => setSearchFilters({})}
        />

        <BulkOperations
          entityType="incidents"
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />

        <Card>
          <CardHeader>
            <CardTitle>Incidents ({filteredIncidents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredIncidents.map((incident) => (
                <div key={incident.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Checkbox
                      checked={selectedIds.includes(incident.id)}
                      onCheckedChange={(checked) => handleSelectionChange(incident.id, checked as boolean)}
                    />
                    <div className="flex items-start justify-between flex-1">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <div>
                          <h3 className="font-semibold">{incident.type}</h3>
                          <p className="text-sm text-gray-600">{incident.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {incident.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(incident.reportedAt).toLocaleString()}
                    </div>
                  </div>
                  
                  {incident.status !== 'RESOLVED' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => resolveIncident(incident.id)}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Mark Resolved
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <IncidentForm incident={incident} onClose={() => {}} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}