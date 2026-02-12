'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bus, Menu, X } from 'lucide-react';
import { useState } from 'react';
import LoginModal from '../auth/LoginModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Journey', href: '/journey' },
    { name: 'Alerts', href: '/alerts' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Feedback', href: '/feedback' }
  ];

  return (
    <>
      <nav className="bg-moovit-card shadow-moovit-sm border-b border-moovit-light sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-[#2b78e4] p-2.5 rounded-xl group-hover:bg-blue-600 transition-colors">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-moovit-text">AddisTransport</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    pathname === item.href
                      ? 'bg-[#2b78e4] text-white shadow-sm'
                      : 'text-moovit-secondary hover:text-[#2b78e4] hover:bg-moovit-hover'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 text-moovit-secondary hover:text-[#2b78e4] hover:bg-moovit-hover rounded-lg font-medium transition-all"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-moovit-secondary hover:text-[#2b78e4] hover:bg-moovit-hover transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-moovit-light py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      pathname === item.href
                        ? 'bg-[#2b78e4] text-white'
                        : 'text-moovit-secondary hover:text-[#2b78e4] hover:bg-moovit-hover'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="mx-4 mt-2 px-4 py-3 text-moovit-secondary hover:text-[#2b78e4] hover:bg-moovit-hover rounded-lg font-medium transition-all"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}