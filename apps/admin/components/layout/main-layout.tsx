'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Sidebar } from './sidebar';
import { ProfileDropdown } from '@/components/ui/profile-dropdown';
import { Bell } from 'lucide-react';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      <Sidebar isOpen={sidebarOpen} />
      
      <main className={cn(
        "flex-1 transition-all duration-300 min-h-screen flex flex-col",
        sidebarOpen ? "ml-64" : "ml-20"
      )}>
        {/* Common Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-end shadow-sm">
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-200 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <ProfileDropdown />
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
