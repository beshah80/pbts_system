import { Home, MapPin, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function PassengerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
        <div className="max-w-4xl mx-auto flex justify-around">
          <Link href="/passenger/home" className="flex flex-col items-center gap-1 p-2 text-slate-600 hover:text-blue-600">
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/passenger/routes" className="flex flex-col items-center gap-1 p-2 text-slate-600 hover:text-blue-600">
            <MapPin className="w-5 h-5" />
            <span className="text-xs">Routes</span>
          </Link>
          <Link href="/passenger/feedback" className="flex flex-col items-center gap-1 p-2 text-slate-600 hover:text-blue-600">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Feedback</span>
          </Link>
        </div>
      </nav>
      
      {/* Add bottom padding to prevent content from being hidden behind nav */}
      <div className="h-16"></div>
    </>
  );
}
