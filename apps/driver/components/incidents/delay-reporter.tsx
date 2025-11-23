'use client';

import { useState } from 'react';
import { Clock, MapPin, Send, AlertCircle } from 'lucide-react';

interface DelayReporterProps {
  onReportDelay: (delay: any) => void;
  currentLocation?: string;
}

export function DelayReporter({ onReportDelay, currentLocation }: DelayReporterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [estimatedDelay, setEstimatedDelay] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const delayReasons = [
    { value: 'TRAFFIC', label: 'Heavy Traffic', icon: '🚦' },
    { value: 'BREAKDOWN', label: 'Vehicle Issue', icon: '🔧' },
    { value: 'ACCIDENT', label: 'Road Accident', icon: '🚗' },
    { value: 'WEATHER', label: 'Weather Conditions', icon: '🌧️' },
    { value: 'PASSENGER', label: 'Passenger Issue', icon: '👥' },
    { value: 'OTHER', label: 'Other Reason', icon: '❓' }
  ];

  const delayDurations = ['5', '10', '15', '20', '30', '45', '60'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !estimatedDelay) return;

    setIsSubmitting(true);

    const delayReport = {
      delayId: `delay-${Date.now()}`,
      reason,
      estimatedDelay: parseInt(estimatedDelay),
      description,
      location: currentLocation || 'Unknown',
      reportedAt: new Date().toISOString(),
      status: 'REPORTED'
    };

    try {
      await onReportDelay(delayReport);
      setIsOpen(false);
      setReason('');
      setEstimatedDelay('');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg hover:bg-yellow-100 transition-colors"
      >
        <Clock className="w-4 h-4" />
        <span className="font-medium">Report Delay</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-yellow-200">
      <div className="p-4 border-b border-gray-200 bg-yellow-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-900">Report Delay</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-yellow-600 hover:text-yellow-800"
          >
            ×
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Delay *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {delayReasons.map((delayReason) => (
              <button
                key={delayReason.value}
                type="button"
                onClick={() => setReason(delayReason.value)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  reason === delayReason.value
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-900'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{delayReason.icon}</span>
                  <span className="text-sm font-medium">{delayReason.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Delay (minutes) *
          </label>
          <div className="grid grid-cols-4 gap-2">
            {delayDurations.map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() => setEstimatedDelay(duration)}
                className={`p-2 rounded-lg text-center text-sm font-medium transition-colors ${
                  estimatedDelay === duration
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {duration}m
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Details
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Optional: Provide more details about the delay..."
          />
        </div>

        {currentLocation && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{currentLocation}</span>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!reason || !estimatedDelay || isSubmitting}
            className="flex-1 py-2 px-4 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Reporting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Report Delay
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}