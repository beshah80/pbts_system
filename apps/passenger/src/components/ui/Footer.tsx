import { Bus, Facebook, Instagram, Linkedin, Send } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Help Center', href: '/help' }
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#2b78e4] p-2 rounded-lg">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AddisTransport</span>
            </div>
            <p className="text-gray-600 text-sm">
              Making public transportation in Addis Ababa smarter, faster, and more reliable for everyone.
            </p>
          </div>

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

        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} AddisTransport. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}