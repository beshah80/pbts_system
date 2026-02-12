'use client';

import { useAuthStore } from '@/lib/auth';
import { cn } from '@/lib/utils';
import {
    AlertTriangle,
    Bus,
    Calendar,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Route as RouteIcon,
    Settings,
    Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarProps {
  isOpen: boolean;
}

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Routes & Stops', href: '/routes', icon: RouteIcon },
  { name: 'Schedules', href: '/schedules', icon: Calendar },
  { name: 'Drivers', href: '/drivers', icon: Users },
  { name: 'Buses', href: '/buses', icon: Bus },
  { name: 'Incidents', href: '/incidents', icon: AlertTriangle, badge: 3 },
  { name: 'Feedback', href: '/feedback', icon: MessageSquare },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <aside className={cn(
      "bg-[#3A608F] text-white flex flex-col transition-all duration-300 fixed h-full z-20",
      isOpen ? "w-64" : "w-20"
    )}>
      {/* Logo / Header */}
      <div className="p-6 h-20 flex items-center">
        {isOpen ? (
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-wide">Addis</h1>
              <h1 className="text-xl font-bold tracking-wide -mt-1">Transport</h1>
            </div>
        ) : (
          <span className="text-xl font-bold">AT</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400/30 scrollbar-track-transparent">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href; 
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative",
                isActive 
                  ? "bg-[#2C4A70] text-white shadow-sm" 
                  : "text-blue-100 hover:bg-[#4A73A5] hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {isOpen && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Settings/Logout */}
      <div className="p-4 mt-auto space-y-2 border-t border-blue-400/30">
          <Link href="/integration" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-blue-100 hover:bg-[#4A73A5] hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            {isOpen && <span>Settings</span>}
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-blue-100 hover:bg-[#4A73A5] hover:text-white transition-colors text-left">
            <LogOut className="w-5 h-5" />
            {isOpen && <span>Logout</span>}
          </button>
      </div>
    </aside>
  );
}