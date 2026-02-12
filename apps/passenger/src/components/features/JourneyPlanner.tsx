import { Search, MapPin, Clock, Bus, ArrowUpDown, X, Navigation } from 'lucide-react';

export default function JourneyPlanner() {
  return (
    <div className="min-h-screen bg-moovit-bg">
      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center" style={{backgroundImage: 'url(/images/background.jpg)'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Plan Your Journey
            </h1>
            <p className="text-xl text-white/90 max-w-md mx-auto">
              Find the fastest route
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 -mt-8 relative z-20">
        {/* Journey Planning Form */}
        <div className="bg-moovit-card rounded-2xl shadow-moovit-lg border border-moovit-light p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Starting Point */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#2b78e4]/10 flex items-center justify-center text-[#2b78e4]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium uppercase tracking-wider text-moovit-secondary mb-1 block">From</label>
                  <input
                    type="text"
                    placeholder="Enter starting point"
                    className="w-full bg-transparent border-none focus:outline-none text-lg text-moovit-text placeholder:text-moovit-tertiary"
                  />
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button className="h-12 w-12 rounded-xl bg-[#2b78e4] text-white shadow-moovit-sm flex items-center justify-center hover:bg-blue-600 hover:scale-105 transition-all">
                <ArrowUpDown className="w-5 h-5" />
              </button>
            </div>

            {/* Destination */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#2b78e4]/10 flex items-center justify-center text-[#2b78e4]">
                  <Navigation className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium uppercase tracking-wider text-moovit-secondary mb-1 block">To</label>
                  <input
                    type="text"
                    placeholder="Enter destination"
                    className="w-full bg-transparent border-none focus:outline-none text-lg text-moovit-text placeholder:text-moovit-tertiary"
                  />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <button className="h-12 w-12 rounded-xl bg-[#2b78e4] text-white shadow-moovit-sm flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Searches */}
            <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-6">
              <h3 className="text-xl font-semibold text-moovit-text mb-6">Recent Searches</h3>
              <div className="flex flex-wrap gap-3">
                {['Bole → Piassa', 'Merkato → Arat Kilo', 'CMC → Mexico', 'Kazanchis → Legehar', 'Stadium → Meskel Square'].map((route, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-moovit-hover px-4 py-2.5 rounded-full border border-moovit-light">
                    <span className="text-moovit-text font-medium">{route}</span>
                    <button className="text-moovit-tertiary hover:text-moovit-secondary transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Route Results */}
            <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-moovit-text">Available Routes</h3>
                <p className="text-moovit-secondary mt-1">Choose your preferred route</p>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: 'B1', name: 'Bole - Piassa', desc: 'Via Bole Road & Churchill Ave', time: '25 min', distance: '15 km', color: 'bg-[#2b78e4]' },
                  { id: 'B2', name: 'Merkato - Arat Kilo', desc: 'Via CMC & Mexico Square', time: '28 min', distance: '17 km', color: 'bg-green-500' },
                  { id: 'H1', name: 'Stadium - Meskel Square', desc: 'Via Kazanchis & Legehar', time: '22 min', distance: '12 km', color: 'bg-orange-500' },
                  { id: 'S1', name: 'CMC - Gotera', desc: 'Via Sidist Kilo & 6 Kilo', time: '35 min', distance: '22 km', color: 'bg-purple-500' }
                ].map((route, index) => (
                  <div key={index} className="border border-moovit-light rounded-xl p-6 hover:border-[#2b78e4] hover:shadow-moovit-sm transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${route.color} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                          {route.id}
                        </div>
                        <div>
                          <h4 className="font-semibold text-moovit-text text-lg">{route.name}</h4>
                          <p className="text-moovit-secondary">{route.desc}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-semibold text-moovit-text">{route.time} • {route.distance}</p>
                        <button className="bg-[#2b78e4] hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                          Track Live
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="lg:col-span-1">
            <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-6 h-full">
              <h3 className="text-lg font-semibold text-moovit-text mb-4">Route Map</h3>
              <div className="bg-moovit-hover rounded-xl h-full min-h-[500px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#2b78e4]/10 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="w-8 h-8 text-[#2b78e4]" />
                  </div>
                  <div>
                    <p className="text-moovit-text font-medium">Interactive Map</p>
                    <p className="text-moovit-secondary text-sm mt-1">Real-time bus locations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}