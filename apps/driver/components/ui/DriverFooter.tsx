import Link from 'next/link';
import { Bus, Phone, AlertTriangle, Shield, Facebook, Instagram, Linkedin, Send } from 'lucide-react';

export default function DriverFooter() {
  const quickLinks = [
    { name: 'Driver Dashboard', href: '/dashboard' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Performance', href: '/performance' },
    { name: 'Incident Report', href: '/incident' },
    { name: 'Help Center', href: '/help' }
  ];

  const emergencyContacts = [
    { name: 'Fleet Manager', phone: '+251 911 000 000', icon: Phone },
    { name: 'Emergency Hotline', phone: '+251 922 000 000', icon: AlertTriangle },
    { name: 'Road Assistance', phone: '+251 933 000 000', icon: Shield }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook, color: 'hover:text-blue-600' },
    { name: 'Instagram', href: '#', icon: Instagram, color: 'hover:text-pink-600' },
    { name: 'LinkedIn', href: '#', icon: Linkedin, color: 'hover:text-blue-700' },
    { name: 'Telegram', href: '#', icon: Send, color: 'hover:text-blue-500' }
  ];

  return (
    <footer className="bg-[#dddddd] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#2b78e4] p-2 rounded-lg">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AddisTransport</span>
            </div>
            <p className="text-gray-600 text-sm">
              Empowering drivers with smart tools for safer, more efficient public transportation in Addis Ababa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-[#2b78e4] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Emergency Contacts
            </h3>
            <ul className="space-y-2">
              {emergencyContacts.map((contact) => {
                const Icon = contact.icon;
                return (
                  <li key={contact.name} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-red-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`text-gray-600 ${social.color} transition-colors`}
                    aria-label={social.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} AddisTransport. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>24/7 Support Available</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
