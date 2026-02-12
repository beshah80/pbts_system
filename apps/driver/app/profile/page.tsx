"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import { DriverNav } from '@/components/navigation/DriverNav';
import DriverFooter from '@/components/ui/DriverFooter';
import { 
  User, 
  Phone, 
  Edit,
  Camera
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { driver, isAuthenticated } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: driver?.firstName || '',
    lastName: driver?.lastName || '',
    phoneNumber: driver?.phoneNumber || '',
    emergencyContact: driver?.emergencyContact || '',
    emergencyPhone: driver?.emergencyPhone || ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !driver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setProfileData({
      firstName: driver?.firstName || '',
      lastName: driver?.lastName || '',
      phoneNumber: driver?.phoneNumber || '',
      emergencyContact: driver?.emergencyContact || '',
      emergencyPhone: driver?.emergencyPhone || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DriverNav />
      
      <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Driver Profile</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {/* Profile Picture and Basic Info */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {driver?.firstName?.charAt(0)}{driver?.lastName?.charAt(0)}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {driver?.firstName} {driver?.lastName}
                </h2>
                <p className="text-gray-600">Driver ID: {driver?.employeeNumber}</p>
                <div className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  driver?.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {driver?.status}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={isEditing ? profileData.firstName : driver?.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={isEditing ? profileData.lastName : driver?.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={isEditing ? profileData.phoneNumber : driver?.phoneNumber}
                  onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 p-8 mb-6">
            <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Emergency Contact
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
                <input
                  type="text"
                  value={isEditing ? profileData.emergencyContact : driver?.emergencyContact || 'Not set'}
                  onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
                <input
                  type="tel"
                  value={isEditing ? profileData.emergencyPhone : driver?.emergencyPhone || 'Not set'}
                  onChange={(e) => setProfileData({...profileData, emergencyPhone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleCancel}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
      
      <DriverFooter />
    </div>
  );
}
