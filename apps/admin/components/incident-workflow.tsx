'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  Clock, 
  User, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  MessageSquare,
  Camera,
  Phone
} from 'lucide-react';
import { useAdminStore } from '@/lib/store';
import { Incident } from '@/types';

interface IncidentWorkflowProps {
  incident: Incident;
}

export function IncidentWorkflow({ incident }: IncidentWorkflowProps) {
  const updateIncident = useAdminStore((state) => state.updateIncident);
  const [workflowStep, setWorkflowStep] = useState(incident.status);
  const [notes, setNotes] = useState('');

  const workflowSteps = [
    { status: 'REPORTED', label: 'Reported', icon: AlertTriangle, color: 'bg-red-100 text-red-800' },
    { status: 'ACKNOWLEDGED', label: 'Acknowledged', icon: CheckCircle, color: 'bg-blue-100 text-blue-800' },
    { status: 'IN_PROGRESS', label: 'In Progress', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    { status: 'RESOLVED', label: 'Resolved', icon: CheckCircle, color: 'bg-green-100 text-green-800' }
  ];

  const currentStepIndex = workflowSteps.findIndex(step => step.status === incident.status);

  const handleStatusUpdate = (newStatus: string, notes?: string) => {
    const updates: Partial<Incident> = {
      status: newStatus as any,
      updatedAt: new Date().toISOString()
    };

    if (notes) {
      updates.resolutionNotes = notes;
    }

    if (newStatus === 'RESOLVED') {
      updates.resolvedAt = new Date().toISOString();
    }

    updateIncident(incident.id, updates);
  };

  const getActionButtons = () => {
    switch (incident.status) {
      case 'REPORTED':
        return (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => handleStatusUpdate('ACKNOWLEDGED')}
            >
              Acknowledge
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleStatusUpdate('IN_PROGRESS')}
            >
              Start Work
            </Button>
          </div>
        );
      case 'ACKNOWLEDGED':
        return (
          <Button 
            size="sm" 
            onClick={() => handleStatusUpdate('IN_PROGRESS')}
          >
            Start Work
          </Button>
        );
      case 'IN_PROGRESS':
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                Mark Resolved
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Resolve Incident</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Resolution Notes</label>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe how the incident was resolved..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleStatusUpdate('RESOLVED', notes)}
                      disabled={!notes.trim()}
                    >
                      Mark as Resolved
                    </Button>
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
      default:
        return null;
    }
  };

  const getEscalationLevel = () => {
    const reportedTime = new Date(incident.reportedAt);
    const now = new Date();
    const hoursSinceReported = (now.getTime() - reportedTime.getTime()) / (1000 * 60 * 60);

    if (incident.severity === 'CRITICAL' && hoursSinceReported > 1) {
      return { level: 'HIGH', message: 'Critical incident open for over 1 hour' };
    }
    if (incident.severity === 'HIGH' && hoursSinceReported > 4) {
      return { level: 'MEDIUM', message: 'High priority incident open for over 4 hours' };
    }
    if (hoursSinceReported > 24) {
      return { level: 'LOW', message: 'Incident open for over 24 hours' };
    }
    return null;
  };

  const escalation = getEscalationLevel();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Incident Workflow</span>
          {escalation && (
            <Badge variant="destructive">
              Escalation Required: {escalation.message}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Workflow Progress */}
        <div className="flex items-center justify-between">
          {workflowSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.status} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  isCompleted ? step.color : 'bg-gray-100 text-gray-400'
                }`}>
                  <StepIcon className="w-5 h-5" />
                </div>
                <div className="ml-2">
                  <p className={`text-sm font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-blue-600">Current</p>
                  )}
                </div>
                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 mx-4" />
                )}
              </div>
            );
          })}
        </div>

        {/* Incident Details */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{incident.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{new Date(incident.reportedAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Reporter: {incident.reporterId || 'System'}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Severity: {incident.severity}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <MessageSquare className="w-4 h-4 mr-1" />
              Add Note
            </Button>
            <Button size="sm" variant="outline">
              <Camera className="w-4 h-4 mr-1" />
              Add Photo
            </Button>
            <Button size="sm" variant="outline">
              <Phone className="w-4 h-4 mr-1" />
              Contact Driver
            </Button>
          </div>
          {getActionButtons()}
        </div>

        {/* Resolution Notes */}
        {incident.resolutionNotes && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-1">Resolution Notes</h4>
            <p className="text-sm text-green-700">{incident.resolutionNotes}</p>
          </div>
        )}

        {/* Timeline */}
        <div className="space-y-2">
          <h4 className="font-medium">Timeline</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Reported</span>
              <span className="text-gray-500">{new Date(incident.reportedAt).toLocaleString()}</span>
            </div>
            {incident.updatedAt !== incident.reportedAt && (
              <div className="flex justify-between">
                <span>Last Updated</span>
                <span className="text-gray-500">{new Date(incident.updatedAt).toLocaleString()}</span>
              </div>
            )}
            {incident.resolvedAt && (
              <div className="flex justify-between">
                <span>Resolved</span>
                <span className="text-gray-500">{new Date(incident.resolvedAt).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}