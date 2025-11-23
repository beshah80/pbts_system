'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import { MobileNav } from '@/components/layout/mobile-nav';
import { 
  User, 
  Phone, 
  CreditCard, 
  Clock, 
  Settings, 
  LogOut,
  Shield,
  Bell
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, driver, logout, updateStatus } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !driver) {
    return null;
  }

  const handleStatusChange = (newStatus: typeof driver.status) => {
    updateStatus(newStatus);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const statusOptions = [
    { value: 'ACTIVE', label: 'Active', color: 'bg-green-500' },
    { value: 'BREAK', label: 'On Break', color: 'bg-yellow-500' },
    { value: 'OFF_DUTY', label: 'Off Duty', color: 'bg-gray-500' }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileNav />
      
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {driver.firstName} {driver.lastName}
              </h1>
              <p className="text-gray-600">{driver.employeeNumber}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  driver.status === 'ACTIVE' ? 'bg-green-500' : 
                  driver.status === 'BREAK' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
                <span className="text-sm text-gray-600">{driver.status.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Control */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Status</h2>
          <div className="grid grid-cols-3 gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  driver.status === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-3 h-3 ${option.color} rounded-full mx-auto mb-1`} />
                <span className="text-xs font-medium text-gray-700">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Driver Information */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Driver Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">License Number</p>
                <p className="font-medium text-gray-900">{driver.licenseNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-medium text-gray-900">{driver.phoneNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Emergency Contact</p>
                <p className="font-medium text-gray-900">{driver.emergencyContact}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Shift</p>
                <p className="font-medium text-gray-900">{driver.shift} Shift</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Notifications</p>
                <p className="text-sm text-gray-600">Manage notification preferences</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">App Settings</p>
                <p className="text-sm text-gray-600">Customize app behavior</p>
              </div>
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>

        {/* App Info */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>PBTS Driver App v1.0.0</p>
          <p>© 2024 Public Bus Transportation System</p>
        </div>
      </div>
    </div>
  );
}