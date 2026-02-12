import { AlertTriangle, Clock, CheckCircle, Calendar, ChevronDown, Bus, Bell } from 'lucide-react';

export default function Alerts() {
  return (
    <div className="min-h-screen bg-moovit-bg">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center" style={{backgroundImage: 'url(/images/background.jpg)'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Official Announcements
            </h1>
            <p className="text-xl text-white/90 max-w-md mx-auto">
              Latest updates from AddisTransport
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 -mt-8 relative z-20 max-w-4xl">
        {/* Filter Section */}
        <div className="bg-moovit-card rounded-2xl shadow-moovit-lg border border-moovit-light p-8 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-moovit-text">Recent Posts</h2>
              <p className="text-moovit-secondary text-sm mt-1">Official transport bureau updates</p>
            </div>
            <div className="relative">
              <select className="appearance-none bg-moovit-hover border border-moovit-light rounded-xl px-4 py-2 pr-8 text-sm text-moovit-text focus:outline-none focus:ring-2 focus:ring-[#2b78e4]">
                <option>All Posts</option>
                <option>Alerts</option>
                <option>Updates</option>
                <option>News</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-moovit-tertiary pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {/* Weather Alert Post */}
          <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-[#2b78e4] rounded-full flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-moovit-text text-lg">AddisTransport Bureau</h3>
                <p className="text-moovit-secondary">4 hours ago • Official Announcement</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h4 className="text-xl font-bold text-moovit-text">Weather Alert - Heavy Rain Expected</h4>
              </div>
              <p className="text-moovit-secondary text-lg leading-relaxed mb-4">
                ⚠️ IMPORTANT NOTICE: Heavy rainfall is expected across Addis Ababa today and tomorrow. All bus routes may experience significant delays of 15-30 minutes during peak hours.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
                <p className="text-red-800 font-medium mb-2">Key Information:</p>
                <ul className="text-red-700 space-y-1">
                  <li>• Affected areas: City-wide coverage</li>
                  <li>• Duration: Next 24-48 hours</li>
                  <li>• Impact: All bus routes affected</li>
                  <li>• Recommendation: Plan extra 30 minutes for travel</li>
                </ul>
              </div>
              <p className="text-moovit-secondary text-lg leading-relaxed">
                We recommend passengers to check real-time updates on our mobile app and plan additional travel time. Safety is our priority - buses may reduce speed during heavy rainfall for passenger safety.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-full">All Routes</span>
              <span className="px-4 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-full">Weather Alert</span>
              <span className="px-4 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-full">High Priority</span>
            </div>
          </div>

          {/* Route Diversion Post */}
          <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-[#2b78e4] rounded-full flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-moovit-text text-lg">AddisTransport Bureau</h3>
                <p className="text-moovit-secondary">5 hours ago • Route Update</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h4 className="text-xl font-bold text-moovit-text">Route Diversion - Piassa Street Closure</h4>
              </div>
              <p className="text-moovit-secondary text-lg leading-relaxed mb-4">
                🚧 ROUTE UPDATE: Piassa Street is temporarily closed for emergency road maintenance and infrastructure improvements. This closure affects our H1 and H2 routes.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg mb-4">
                <p className="text-orange-800 font-medium mb-2">Alternative Route Details:</p>
                <ul className="text-orange-700 space-y-1">
                  <li>• Affected routes: H1, H2</li>
                  <li>• Diversion: Via Mexico Square → CMC → Arat Kilo</li>
                  <li>• Additional travel time: 5-10 minutes</li>
                  <li>• Expected completion: Tomorrow 6:00 AM</li>
                </ul>
              </div>
              <p className="text-moovit-secondary text-lg leading-relaxed">
                We apologize for any inconvenience caused. Our operations team is working closely with city authorities to minimize disruption. Alternative routes have been optimized for efficiency.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">H1</span>
              <span className="px-4 py-2 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">H2</span>
              <span className="px-4 py-2 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">Route Diversion</span>
            </div>
          </div>

          {/* Traffic Delays Post */}
          <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#2b78e4] rounded-full flex items-center justify-center">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-moovit-text">AddisTransport Bureau</h3>
                <p className="text-sm text-moovit-secondary">2 hours ago</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-yellow-600" />
                <h4 className="text-lg font-semibold text-moovit-text">Traffic Delays - Bole Road</h4>
              </div>
              <p className="text-moovit-secondary leading-relaxed">
                Heavy traffic on Bole Road is causing 10-15 minute delays for routes B1, B2, and B3 during peak hours. We apologize for any inconvenience.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">B1</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">B2</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">B3</span>
            </div>
          </div>

          {/* New Route Announcement */}
          <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#2b78e4] rounded-full flex items-center justify-center">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-moovit-text">AddisTransport Bureau</h3>
                <p className="text-sm text-moovit-secondary">3 days ago</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Bus className="w-5 h-5 text-purple-600" />
                <h4 className="text-lg font-semibold text-moovit-text">New Express Route B6 Now Available!</h4>
              </div>
              <p className="text-moovit-secondary leading-relaxed">
                We're excited to announce the launch of our new express route B6 connecting Bole and Kaliti. Service runs every 15 minutes during peak hours with modern buses featuring AC and WiFi.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">B6</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">New Route</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">Express</span>
            </div>
          </div>

          {/* Resolved Issue Post */}
          <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#2b78e4] rounded-full flex items-center justify-center">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-moovit-text">AddisTransport Bureau</h3>
                <p className="text-sm text-moovit-secondary">1 day ago</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h4 className="text-lg font-semibold text-moovit-text">Construction Complete - Service Restored</h4>
              </div>
              <p className="text-moovit-secondary leading-relaxed">
                Construction work at Arat Kilo and 4 Kilo bus stops has been successfully completed. Normal service has resumed at both locations. Thank you for your patience.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Arat Kilo</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">4 Kilo</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Resolved</span>
            </div>
          </div>

          {/* Weekend Changes Post */}
          <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#2b78e4] rounded-full flex items-center justify-center">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-moovit-text">AddisTransport Bureau</h3>
                <p className="text-sm text-moovit-secondary">2 days ago</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h4 className="text-lg font-semibold text-moovit-text">Weekend Schedule Changes</h4>
              </div>
              <p className="text-moovit-secondary leading-relaxed">
                Weekend schedules will be adjusted for routes B1-B5. Reduced frequency on Saturday, Sunday service hours 6 AM - 10 PM. Please plan accordingly.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Weekend</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Schedule Change</span>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-8 mb-16">
          <button className="bg-[#2b78e4] hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium transition-all hover:scale-105 shadow-moovit-sm">
            Load More Posts
          </button>
        </div>
      </main>
    </div>
  );
}