'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Calendar, 
  User, 
  Wifi, 
  WifiOff,
  LogOut,
  Navigation,
  AlertTriangle,
  Bell
} from 'lucide-react';
import { Notifications } from '../communication/notifications';
import { useAuthStore } from '@/lib/auth';
import { useDriverStore } from '@/lib/store';

export function MobileNav() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const driver = useAuthStore((state) => state.driver);
  const connectionStatus = useDriverStore((state) => state.connectionStatus);

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/schedule', icon: Calendar, label: 'Schedule' },
    { href: '/trip', icon: Navigation, label: 'Trip' },
    { href: '/incidents', icon: AlertTriangle, label: 'Incidents' },
    { href: '/profile', icon: User, label: 'Profile' }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'ACTIVE': 
        return { color: 'bg-green-500', label: 'On Duty', textColor: 'text-green-700' };
      case 'BREAK': 
        return { color: 'bg-yellow-500', label: 'On Break', textColor: 'text-yellow-700' };
      case 'OFF_DUTY': 
        return { color: 'bg-gray-500', label: 'Off Duty', textColor: 'text-gray-700' };
      default: 
        return { color: 'bg-gray-500', label: 'Off Duty', textColor: 'text-gray-700' };
    }
  };

  const statusConfig = getStatusConfig(driver?.status || 'OFF_DUTY');

  return (
    <>
      {/* Enhanced Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Driver Avatar & Status */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {driver?.firstName?.charAt(0)}{driver?.lastName?.charAt(0)}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusConfig.color} rounded-full border-2 border-white`} />
            </div>
            
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {driver?.firstName} {driver?.lastName}
              </p>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${statusConfig.textColor}`}>
                  {statusConfig.label}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  {driver?.employeeNumber}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Connection Status */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
              connectionStatus === 'online' 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-700'
            }`}>
              {connectionStatus === 'online' ? (
                <Wifi className="w-3 h-3" />
              ) : (
                <WifiOff className="w-3 h-3" />
              )}
              <span className="text-xs font-medium capitalize">
                {connectionStatus}
              </span>
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
            </div>
            
            {/* Logout */}
            <button
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-2 py-2 safe-area-pb shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-3 px-4 rounded-xl transition-all duration-200 min-w-0 flex-1 max-w-20 ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50 shadow-sm transform scale-105' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 active:scale-95'
                }`}
              >
                <div className={`relative ${
                  isActive ? 'transform -translate-y-0.5' : ''
                }`}>
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <span className={`text-xs font-medium truncate ${
                  isActive ? 'font-semibold' : ''
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}