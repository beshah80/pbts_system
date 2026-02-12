'use client';

import { IncidentForm } from '@/components/forms/incident-form';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAdminStore } from '@/lib/store';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function IncidentsPage() {
  const incidents = useAdminStore((state) => state.incidents);
  const updateIncident = useAdminStore((state) => state.updateIncident);
  const [showAddDialog, setShowAddDialog] = useState(false);
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
  }, [incidents, searchFilters]);

  const resolveIncident = (id: string) => {
    updateIncident(id, { 
      status: 'RESOLVED', 
      resolvedAt: new Date().toISOString() 
    });
  };

  const timeAgo = (iso?: string) => {
    if (!iso) return '';
    const diffMs = Date.now() - new Date(iso).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const Column = ({
    title,
    color,
    status,
  }: {
    title: string;
    color: string;
    status: 'REPORTED' | 'IN_PROGRESS' | 'RESOLVED';
  }) => {
    const items = filteredIncidents.filter(i => i.status === status);
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className={`px-4 py-2 text-white font-semibold ${color}`}>{title}</div>
        <div className="p-3 space-y-3 min-h-[320px]">
          {items.length === 0 && (
            <p className="text-sm text-slate-500">No incidents</p>
          )}
          {items.map((incident) => (
            <div
              key={incident.id}
              className={`rounded-lg border ${
                status === 'REPORTED' ? 'bg-red-50 border-red-100' :
                status === 'IN_PROGRESS' ? 'bg-amber-50 border-amber-100' :
                'bg-emerald-50 border-emerald-100'
              } p-3`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">
                      {`Incident #${incident.id?.slice(-4)} - ${incident.type?.replace('_', ' ')}`}
                    </p>
                    <p className="text-xs text-slate-600">{incident.description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{incident.busId ? `Bus ID: ${incident.busId}` : 'Bus: -'}</span>
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <Clock className="w-3 h-3" />
                  <span>{timeAgo(incident.reportedAt)}</span>
                </div>
              </div>
              <div className="mt-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="secondary">View Proof</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <IncidentForm incident={incident} onClose={() => {}} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute requiredPermission="incidents.read">
      <div className="space-y-6 mt-4 mx-4 md:mx-6 lg:mx-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Incident Command Center</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Column title="Reported" color="bg-red-600" status="REPORTED" />
          <Column title="Investigating" color="bg-amber-500" status="IN_PROGRESS" />
          <Column title="Resolved" color="bg-emerald-600" status="RESOLVED" />
        </div>
      </div>
    </ProtectedRoute>
  );
}
