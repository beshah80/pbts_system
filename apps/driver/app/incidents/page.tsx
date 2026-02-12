'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import { MobileNav } from '@/components/layout/mobile-nav';
import { IncidentForm } from '@/components/incidents/incident-form';
import { DelayReporter } from '@/components/incidents/delay-reporter';
import { EmergencyButton } from '@/components/incidents/emergency-button';
import { DispatchChat } from '@/components/communication/dispatch-chat';
import { ArrowLeft, AlertTriangle, Clock, MessageSquare, Plus, MapPin } from 'lucide-react';

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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 pb-12 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Incidents & Communication</h1>
            <p className="text-blue-100 text-sm">Report issues and coordinate with dispatch</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('incidents')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'incidents' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Incidents
          </button>
          <button
            onClick={() => setActiveTab('delays')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'delays' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            Delays
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'chat' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
        </div>
      </div>

      <div className="px-4 -mt-6 pb-20 space-y-4">
        {activeTab === 'incidents' && (
          <div className="space-y-4">
            {showIncidentForm ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <IncidentForm
                  onSubmit={handleIncidentSubmit}
                  onCancel={() => setShowIncidentForm(false)}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowIncidentForm(true)}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white text-red-600 rounded-2xl shadow-lg border border-red-100 font-bold hover:bg-red-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <span>Report New Incident</span>
              </button>
            )}

            {/* Recent Incidents */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 ml-1">Recent Incidents</h3>
              {incidents.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">No incidents reported</h4>
                  <p className="text-gray-500 text-sm">You haven&apos;t reported any incidents recently.</p>
                </div>
              ) : (
                incidents.map((incident) => (
                  <div key={incident.incidentId} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                        {getIncidentIcon(incident.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 truncate">{incident.type.replace('_', ' ')}</h4>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${getSeverityColor(incident.severity)}`}>
                            {incident.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{incident.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                          <Clock className="w-3 h-3" />
                          {formatTime(incident.reportedAt)}
                        </div>
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
            <div className="bg-white rounded-2xl shadow-lg border border-yellow-100 overflow-hidden">
              <DelayReporter
                onReportDelay={handleDelayReport}
                currentLocation="Meskel Square"
              />
            </div>

            {/* Recent Delays */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 ml-1">Recent Delays</h3>
              {delays.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">No delays reported</h4>
                  <p className="text-gray-500 text-sm">Traffic seems to be flowing smoothly.</p>
                </div>
              ) : (
                delays.map((delay) => (
                  <div key={delay.delayId} className="bg-white rounded-2xl p-4 shadow-sm border border-yellow-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center shadow-inner">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 truncate">{delay.reason.replace('_', ' ')}</h4>
                          <span className="px-2.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                            +{delay.estimatedDelay} min
                          </span>
                        </div>
                        {delay.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{delay.description}</p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(delay.reportedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {delay.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[calc(100vh-280px)]">
            <DispatchChat
              driverName={`${driver.firstName} ${driver.lastName}`}
              onSendMessage={handleSendMessage}
            />
          </div>
        )}
      </div>

      {/* Emergency Button */}
      <EmergencyButton onEmergencyCall={handleEmergencyCall} />
    </div>
  );
}