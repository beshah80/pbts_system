'use client';

import { useAuthStore } from '@/lib/auth';
import { LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 pl-4 border-l border-slate-300 hover:bg-slate-100 rounded-r-lg px-3 py-2 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="text-sm text-left">
          <p className="font-semibold text-slate-700">{user.name}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
                <p className="text-xs text-blue-600 font-medium">{user.role}</p>
              </div>
            </div>
          </div>
          
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                // Add profile view functionality here if needed
              }}
              className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3"
            >
              <User className="w-4 h-4" />
              View Profile
            </button>
            
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}