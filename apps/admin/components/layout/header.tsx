'use client';

import { Button } from '@/components/ui/button';
import { Bell, Search, User, Settings } from 'lucide-react';
import { useAdminStore } from '@/lib/store';

export function Header() {
  const incidents = useAdminStore((state) => state.incidents);
  const feedback = useAdminStore((state) => state.feedback);
  
  const activeIncidents = incidents.filter(i => i.status === 'REPORTED' || i.status === 'IN_PROGRESS').length;
  const pendingFeedback = feedback.filter(f => f.status === 'PENDING').length;
  const totalNotifications = activeIncidents + pendingFeedback;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search buses, drivers, routes..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalNotifications > 9 ? '9+' : totalNotifications}
              </span>
            )}
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">System Administrator</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}