'use client';

import { useState } from 'react';
import { Phone, AlertTriangle, Shield, X } from 'lucide-react';

interface EmergencyButtonProps {
  onEmergencyCall: (type: string) => void;
}

export function EmergencyButton({ onEmergencyCall }: EmergencyButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const emergencyContacts = [
    { type: 'POLICE', number: '911', label: 'Police', color: 'bg-blue-600', icon: Shield },
    { type: 'MEDICAL', number: '911', label: 'Medical', color: 'bg-red-600', icon: Phone },
    { type: 'DISPATCH', number: '+251911234567', label: 'Dispatch', color: 'bg-orange-600', icon: Phone }
  ];

  const handleEmergencyCall = async (contact: typeof emergencyContacts[0]) => {
    setIsConnecting(true);
    
    try {
      // In a real app, this would initiate the call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onEmergencyCall(contact.type);
      
      // Attempt to make the call
      if (typeof window !== 'undefined') {
        window.location.href = `tel:${contact.number}`;
      }
    } catch (error) {
      console.error('Emergency call failed:', error);
    } finally {
      setIsConnecting(false);
      setShowOptions(false);
    }
  };

  if (showOptions) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Emergency Contact</h3>
            <button
              onClick={() => setShowOptions(false)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {emergencyContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <button
                  key={contact.type}
                  onClick={() => handleEmergencyCall(contact)}
                  disabled={isConnecting}
                  className={`w-full flex items-center gap-3 p-4 ${contact.color} text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{contact.label}</p>
                    <p className="text-sm opacity-90">{contact.number}</p>
                  </div>
                  {isConnecting && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              Emergency calls will be logged and dispatch will be notified automatically.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowOptions(true)}
      className="fixed bottom-24 right-4 w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center z-40"
    >
      <AlertTriangle className="w-6 h-6" />
    </button>
  );
}