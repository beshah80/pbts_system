'use client';

import { useState } from 'react';
import { AlertTriangle, MapPin, Send } from 'lucide-react';
import { PhotoUpload } from './photo-upload';

interface IncidentFormProps {
  onSubmit: (incident: any) => void;
  onCancel: () => void;
}

export function IncidentForm({ onSubmit, onCancel }: IncidentFormProps) {
  const [type, setType] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [emergencyServices, setEmergencyServices] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incidentTypes = [
    { value: 'BREAKDOWN', label: 'Vehicle Breakdown', icon: '🔧' },
    { value: 'ACCIDENT', label: 'Traffic Accident', icon: '🚗' },
    { value: 'MEDICAL', label: 'Medical Emergency', icon: '🏥' },
    { value: 'SECURITY', label: 'Security Issue', icon: '🚨' },
    { value: 'TRAFFIC', label: 'Traffic Delay', icon: '🚦' },
    { value: 'OTHER', label: 'Other Issue', icon: '❓' }
  ];

  const severityLevels = [
    { value: 'LOW', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'MEDIUM', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'HIGH', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'EMERGENCY', label: 'Emergency', color: 'bg-red-100 text-red-800' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !severity || !description) return;

    setIsSubmitting(true);
    
    const incident = {
      incidentId: `inc-${Date.now()}`,
      type,
      severity,
      description,
      photos,
      reportedAt: new Date().toISOString(),
      emergencyServices,
      status: 'REPORTED'
    };

    try {
      await onSubmit(incident);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h3 className="font-semibold text-gray-900">Report Incident</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Incident Type *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {incidentTypes.map((incType) => (
              <button
                key={incType.value}
                type="button"
                onClick={() => setType(incType.value)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  type === incType.value
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{incType.icon}</span>
                  <span className="text-sm font-medium">{incType.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Severity Level *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {severityLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setSeverity(level.value)}
                className={`p-2 rounded-lg text-center text-sm font-medium transition-colors ${
                  severity === level.value
                    ? `${level.color} border-2 border-current`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the incident in detail..."
            required
          />
        </div>

        <PhotoUpload onPhotosChange={setPhotos} />

        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
          <input
            type="checkbox"
            id="emergency"
            checked={emergencyServices}
            onChange={(e) => setEmergencyServices(e.target.checked)}
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label htmlFor="emergency" className="text-sm text-red-800">
            Emergency services required
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!type || !severity || !description || isSubmitting}
            className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Reporting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Report Incident
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}