"use client";

import { useState } from 'react';
import { AlertTriangle, Clock, MapPin, Users, MessageSquare, Send, Phone, Camera, X, Upload } from 'lucide-react';
import { useAuthStore } from '@/lib/auth';
import { DriverNav } from '@/components/navigation/DriverNav';
import DriverFooter from '@/components/ui/DriverFooter';

export default function IncidentPage() {
  const { driver } = useAuthStore();
  const [formData, setFormData] = useState({
    type: '',
    severity: 'medium',
    location: '',
    description: '',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const incidentTypes = [
    { id: 'accident', name: 'Accident', icon: AlertTriangle },
    { id: 'breakdown', name: 'Vehicle Breakdown', icon: AlertTriangle },
    { id: 'delay', name: 'Route Delay', icon: Clock },
    { id: 'passenger', name: 'Passenger Issue', icon: Users },
    { id: 'other', name: 'Other', icon: MessageSquare }
  ];

  const severityLevels = [
    { id: 'low', name: 'Low', color: 'green' },
    { id: 'medium', name: 'Medium', color: 'yellow' },
    { id: 'high', name: 'High', color: 'red' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Incident reported:', { ...formData, images: uploadedImages });
    // Reset form
    setFormData({
      type: '',
      severity: 'medium',
      location: '',
      description: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setUploadedImages([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DriverNav />
      
      <div className="flex-1 bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Incident Report</h1>
            <p className="text-gray-600">Report any incidents or issues during your route</p>
          </div>

          {/* Report Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Report New Incident</h2>
                <p className="text-gray-600 text-sm">Please provide detailed information about the incident</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Incident Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-4">Incident Type</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {incidentTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: type.id })}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:scale-105 ${
                          formData.type === type.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg transform scale-105'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white hover:shadow-md'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          formData.type === type.id ? 'bg-blue-500' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-6 h-6 ${formData.type === type.id ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <span className="text-sm font-semibold">{type.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Severity Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-4">Severity Level</label>
                <div className="flex gap-4">
                  {severityLevels.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, severity: level.id })}
                      className={`px-6 py-3 rounded-2xl border-2 transition-all duration-300 font-semibold text-sm hover:scale-105 ${
                        formData.severity === level.id
                          ? getSeverityColor(level.id) + ' shadow-lg transform scale-105'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white hover:shadow-md'
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Two Column Layout for Location and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 hover:border-gray-300 transition-colors"
                      placeholder="Enter incident location"
                      required
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">Time of Incident</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 hover:border-gray-300 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Detailed Description</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 hover:border-gray-300 transition-colors resize-none"
                    rows={5}
                    placeholder="Please describe the incident in detail. Include what happened, who was involved, and any immediate actions taken."
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Upload Images (Optional)</label>
                <div className="space-y-4">
                  {/* Upload Button */}
                  <div className="relative">
                    <input
                      type="file"
                      id="image-upload"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center gap-3 w-full py-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <Camera className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                          Click to upload images
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 10MB each
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Uploaded Images Preview */}
                  {uploadedImages.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-700">Uploaded Images ({uploadedImages.length})</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Incident image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="mt-1">
                              <p className="text-xs text-gray-600 truncate">{image.name}</p>
                              <p className="text-xs text-gray-400">{(image.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-6 h-6" />
                  Submit Report
                </button>
                <button
                  type="button"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-6 h-6" />
                  Emergency
                </button>
              </div>
            </form>
          </div>

          {/* Recent Incidents */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Incidents</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚌</span>
                    <span className="font-medium">Vehicle Breakdown</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">High</span>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm text-gray-600">Engine failure at Bole - awaiting assistance</p>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⏰</span>
                    <span className="font-medium">Route Delay</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Medium</span>
                  </div>
                  <span className="text-sm text-gray-500">5 hours ago</span>
                </div>
                <p className="text-sm text-gray-600">Heavy traffic at Meskel Square - 30 min delay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DriverFooter />
    </div>
  );
}
