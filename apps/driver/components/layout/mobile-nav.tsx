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
  AlertTriangle
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500';
      case 'BREAK': return 'bg-yellow-500';
      case 'OFF_DUTY': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(driver?.status || 'OFF_DUTY')}`} />
          <div>
            <p className="font-medium text-gray-900">{driver?.firstName} {driver?.lastName}</p>
            <p className="text-xs text-gray-500">{driver?.employeeNumber}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {connectionStatus === 'online' ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-xs text-gray-500">
              {connectionStatus}
            </span>
          </div>
          
          <div className="relative">
            <Notifications
              onMarkAsRead={(id) => console.log('Mark as read:', id)}
              onDismiss={(id) => console.log('Dismiss:', id)}
            />
          </div>
          
          <button
            onClick={logout}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}