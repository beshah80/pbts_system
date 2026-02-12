"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bus, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/lib/auth';

export function DriverNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { driver, logout } = useAuthStore();

  const navItems = [
    { name: 'Home', href: '/dashboard' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Incident Report', href: '/incident' },
    { name: 'Performance', href: '/performance' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-moovit-card shadow-moovit-sm border-b border-moovit-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="bg-[#2b78e4] p-2 rounded-lg">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-moovit-text">AddisTransport</span>
            </Link>

            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-[#2b78e4] text-white'
                      : 'text-moovit-secondary hover:text-[#2b78e4] hover:bg-moovit-hover'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <Link 
                  href="/profile"
                  className="text-sm font-medium text-moovit-text hover:text-[#2b78e4] transition-colors"
                >
                  {driver?.firstName} {driver?.lastName}
                </Link>
                <p className="text-xs text-moovit-secondary">ID: {driver?.employeeNumber}</p>
              </div>
              <button
                onClick={logout}
                className="text-moovit-secondary hover:text-red-600 p-2 rounded-md transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-moovit-secondary hover:text-[#2b78e4]"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-moovit-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-[#2b78e4] text-white'
                      : 'text-moovit-secondary hover:text-[#2b78e4] hover:bg-moovit-hover'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* User Info and Logout */}
              <div className="border-t border-moovit-border pt-3 mt-3">
                <div className="px-3 py-2">
                  <Link 
                    href="/profile"
                    className="text-sm font-medium text-moovit-text hover:text-[#2b78e4] transition-colors"
                  >
                    {driver?.firstName} {driver?.lastName}
                  </Link>
                  <p className="text-xs text-moovit-secondary">ID: {driver?.employeeNumber}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-moovit-card border-t border-moovit-border z-50">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'text-[#2b78e4] bg-moovit-hover'
                  : 'text-moovit-secondary hover:text-[#2b78e4]'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {/* Simple icons for mobile */}
                {item.name === 'Home' && '🏠'}
                {item.name === 'Schedule' && '📅'}
                {item.name === 'Incident Report' && '🚨'}
                {item.name === 'Performance' && '📊'}
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
