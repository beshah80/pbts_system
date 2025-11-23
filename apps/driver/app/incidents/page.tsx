'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import { MobileNav } from '@/components/layout/mobile-nav';
import { IncidentForm } from '@/components/incidents/incident-form';
import { DelayReporter } from '@/components/incidents/delay-reporter';
import { EmergencyButton } from '@/components/incidents/emergency-button';
import { DispatchChat } from '@/components/communication/dispatch-chat';
import { ArrowLeft, AlertTriangle, Clock, MessageSquare, Plus } from 'lucide-react';

export default function IncidentsPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const driver = useAuthStore((state) => state.driver);
  
  const [activeTab, setActiveTab] = useState<'incidents' | 'delays' | 'chat'>('incidents');
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [delays, setDelays] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !driver) {
    return null;
  }

  const handleIncidentSubmit = async (incident: any) => {
    setIncidents(prev => [incident, ...prev]);
    setShowIncidentForm(false);
    // In real app, sync to server
  };

  const handleDelayReport = async (delay: any) => {
    setDelays(prev => [delay, ...prev]);
    // In real app, sync to server
  };

  const handleEmergencyCall = (type: string) => {
    console.log('Emergency call initiated:', type);
    // In real app, log emergency call and notify dispatch
  };

  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // In real app, send to dispatch via WebSocket
  };

  const getIncidentIcon = (type: string) => {
    const icons: Record<string, string> = {
      BREAKDOWN: '🔧',
      ACCIDENT: '🚗',
      MEDICAL: '🏥',
      SECURITY: '🚨',
      TRAFFIC: '🚦',
      OTHER: '❓'
    };
    return icons[type] || '❓';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'EMERGENCY': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileNav />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">Incidents & Communication</h1>
            <p className="text-sm text-gray-600">Report issues and communicate with dispatch</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('incidents')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'incidents' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Incidents
          </button>
          <button
            onClick={() => setActiveTab('delays')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'delays' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            Delays
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'chat' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'incidents' && (
          <div className="space-y-4">
            {showIncidentForm ? (
              <IncidentForm
                onSubmit={handleIncidentSubmit}
                onCancel={() => setShowIncidentForm(false)}
              />
            ) : (
              <button
                onClick={() => setShowIncidentForm(true)}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Report New Incident
              </button>
            )}

            {/* Recent Incidents */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Recent Incidents</h3>
              {incidents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No incidents reported</p>
                </div>
              ) : (
                incidents.map((incident) => (
                  <div key={incident.incidentId} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{getIncidentIcon(incident.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{incident.type.replace('_', ' ')}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                            {incident.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                        <p className="text-xs text-gray-500">
                          Reported at {formatTime(incident.reportedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'delays' && (
          <div className="space-y-4">
            <DelayReporter
              onReportDelay={handleDelayReport}
              currentLocation="Meskel Square"
            />

            {/* Recent Delays */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Recent Delays</h3>
              {delays.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No delays reported</p>
                </div>
              ) : (
                delays.map((delay) => (
                  <div key={delay.delayId} className="bg-white rounded-lg p-4 border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{delay.reason.replace('_', ' ')}</h4>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            {delay.estimatedDelay} min
                          </span>
                        </div>
                        {delay.description && (
                          <p className="text-sm text-gray-600 mb-2">{delay.description}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          Reported at {formatTime(delay.reportedAt)} • {delay.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <DispatchChat
            driverName={`${driver.firstName} ${driver.lastName}`}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>

      {/* Emergency Button */}
      <EmergencyButton onEmergencyCall={handleEmergencyCall} />
    </div>
  );
}