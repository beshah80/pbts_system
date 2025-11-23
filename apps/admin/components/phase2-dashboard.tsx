'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  AlertTriangle, 
  MessageSquare, 
  Search, 
  CheckSquare,
  Clock,
  TrendingUp,
  Users,
  Bus,
  Route
} from 'lucide-react';
import { useAdminStore } from '@/lib/store';
import Link from 'next/link';

export function Phase2Dashboard() {
  const schedules = useAdminStore((state) => state.schedules);
  const incidents = useAdminStore((state) => state.incidents);
  const feedback = useAdminStore((state) => state.feedback);
  const buses = useAdminStore((state) => state.buses);
  const drivers = useAdminStore((state) => state.drivers);

  // Calculate metrics
  const todaySchedules = schedules.filter(s => s.date === new Date().toISOString().split('T')[0]);
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');
  const pendingFeedback = feedback.filter(f => f.status === 'PENDING');
  const conflictingSchedules = schedules.filter(schedule => {
    return schedules.some(other => 
      other.id !== schedule.id &&
      other.date === schedule.date &&
      other.status !== 'CANCELLED' &&
      ((other.busId === schedule.busId) || (other.driverId === schedule.driverId)) &&
      ((schedule.departureTime >= other.departureTime && schedule.departureTime <= other.arrivalTime) ||
       (schedule.arrivalTime >= other.departureTime && schedule.arrivalTime <= other.arrivalTime))
    );
  });

  const criticalIncidents = incidents.filter(i => i.severity === 'CRITICAL' && i.status !== 'RESOLVED');
  const urgentFeedback = feedback.filter(f => f.priority === 'URGENT' && f.status === 'PENDING');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Advanced Admin Features</h2>
          <p className="text-gray-600">Schedule management, incident tracking, and feedback management</p>
        </div>
        <Badge variant="secondary">Advanced Features</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Schedules</p>
                <p className="text-3xl font-bold text-blue-600">{todaySchedules.length}</p>
                {conflictingSchedules.length > 0 && (
                  <p className="text-sm text-red-600">{conflictingSchedules.length} conflicts</p>
                )}
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                <p className="text-3xl font-bold text-red-600">{activeIncidents.length}</p>
                {criticalIncidents.length > 0 && (
                  <p className="text-sm text-red-600">{criticalIncidents.length} critical</p>
                )}
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Feedback</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingFeedback.length}</p>
                {urgentFeedback.length > 0 && (
                  <p className="text-sm text-red-600">{urgentFeedback.length} urgent</p>
                )}
              </div>
              <MessageSquare className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-3xl font-bold text-green-600">
                  {activeIncidents.length === 0 ? '100%' : `${Math.max(0, 100 - (activeIncidents.length * 10))}%`}
                </p>
                <p className="text-sm text-green-600">
                  {activeIncidents.length === 0 ? 'All systems operational' : `${activeIncidents.length} active incidents`}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Conflict Detection</span>
              <Badge variant={conflictingSchedules.length > 0 ? "destructive" : "secondary"}>
                {conflictingSchedules.length === 0 ? "No Conflicts" : `${conflictingSchedules.length} Conflicts`}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Auto-scheduling</span>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Resource Optimization</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <Link href="/schedules">
              <Button className="w-full" size="sm">
                Manage Schedules
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Incident Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Resolution Workflow</span>
              <Badge variant="secondary">Automated</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Escalation Rules</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Real-time Alerts</span>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            <Link href="/incidents">
              <Button className="w-full" size="sm">
                View Incidents
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Feedback Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Auto-categorization</span>
              <Badge variant="secondary">ML-Powered</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Response Templates</span>
              <Badge variant="secondary">Available</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sentiment Analysis</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <Link href="/feedback">
              <Button className="w-full" size="sm">
                Review Feedback
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Advanced Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Advanced Search</span>
              <Badge variant="secondary">Multi-filter</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Bulk Operations</span>
              <Badge variant="secondary">Available</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Data Export</span>
              <Badge variant="secondary">CSV/PDF</Badge>
            </div>
            <Button className="w-full" size="sm" variant="outline">
              Access Tools
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {criticalIncidents.slice(0, 3).map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="font-medium text-red-800">{incident.type}</p>
                    <p className="text-sm text-red-600">{incident.location}</p>
                  </div>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>
            ))}
            
            {conflictingSchedules.slice(0, 2).map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <div>
                    <p className="font-medium text-yellow-800">Schedule Conflict</p>
                    <p className="text-sm text-yellow-600">{schedule.date} at {schedule.departureTime}</p>
                  </div>
                </div>
                <Badge variant="secondary">Needs Review</Badge>
              </div>
            ))}

            {urgentFeedback.slice(0, 2).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-medium text-blue-800">Urgent Feedback</p>
                    <p className="text-sm text-blue-600">{item.category} - Rating: {item.rating}/5</p>
                  </div>
                </div>
                <Badge variant="secondary">Urgent</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}