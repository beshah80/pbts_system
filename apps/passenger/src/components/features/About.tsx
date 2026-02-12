import { Bus, Users, Target, Award, MapPin, Clock, Shield, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-moovit-bg">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center" style={{backgroundImage: 'url(/images/background.jpg)'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              About AddisTransport
            </h1>
            <p className="text-xl text-white/90 max-w-md mx-auto">
              Revolutionizing public transport in Addis Ababa
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 -mt-8 relative z-20">
        {/* Mission Statement */}
        <div className="bg-moovit-card rounded-2xl shadow-moovit-lg border border-moovit-light p-8 mb-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-moovit-text mb-6">Our Mission</h2>
            <p className="text-lg text-moovit-secondary leading-relaxed">
              To transform public transportation in Addis Ababa by providing smart, reliable, and accessible transit solutions that connect communities, reduce traffic congestion, and improve the quality of life for all residents.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Our Story */}
          <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bus className="w-8 h-8 text-[#2b78e4]" />
              <h3 className="text-2xl font-bold text-moovit-text">Our Story</h3>
            </div>
            <div className="space-y-4 text-moovit-secondary leading-relaxed">
              <p>
                AddisTransport was founded in 2023 with a vision to modernize public transportation in Ethiopia's capital city. Recognizing the challenges faced by millions of daily commuters, we set out to create a comprehensive digital platform that makes public transport more efficient and user-friendly.
              </p>
              <p>
                Our team of local engineers, urban planners, and transport experts worked closely with the city administration to develop a system that addresses the unique needs of Addis Ababa's diverse population.
              </p>
              <p>
                Today, we serve over 100,000 daily users across our network, providing real-time information, route planning, and seamless travel experiences throughout the city.
              </p>
            </div>
          </div>

          {/* Our Values */}
          <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-[#2b78e4]" />
              <h3 className="text-2xl font-bold text-moovit-text">Our Values</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-moovit-text">Reliability</h4>
                  <p className="text-moovit-secondary text-sm">Consistent, dependable service you can count on</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-moovit-text">Accessibility</h4>
                  <p className="text-moovit-secondary text-sm">Transportation for everyone, regardless of background</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Target className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-moovit-text">Innovation</h4>
                  <p className="text-moovit-secondary text-sm">Cutting-edge technology for modern solutions</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Award className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-moovit-text">Excellence</h4>
                  <p className="text-moovit-secondary text-sm">Committed to the highest standards of service</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-8 mb-8">
          <h3 className="text-2xl font-bold text-moovit-text text-center mb-8">Our Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2b78e4] mb-2">100K+</div>
              <div className="text-moovit-secondary">Daily Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2b78e4] mb-2">25</div>
              <div className="text-moovit-secondary">Bus Routes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2b78e4] mb-2">500+</div>
              <div className="text-moovit-secondary">Bus Stops</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2b78e4] mb-2">99.5%</div>
              <div className="text-moovit-secondary">Uptime</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-8 mb-16">
          <h3 className="text-2xl font-bold text-moovit-text text-center mb-8">Development Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2b78e4] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h4 className="font-semibold text-moovit-text mb-2">Beshah Ashenafi</h4>
              <p className="text-moovit-secondary text-sm mb-2">Project Leader</p>
              <p className="text-moovit-tertiary text-xs">Full-stack development and project coordination</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2b78e4] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h4 className="font-semibold text-moovit-text mb-2">Selamawit Mesfin</h4>
              <p className="text-moovit-secondary text-sm mb-2">Lead Developer</p>
              <p className="text-moovit-tertiary text-xs">Frontend and backend development specialist</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2b78e4] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h4 className="font-semibold text-moovit-text mb-2">Elishaday Bilelign</h4>
              <p className="text-moovit-secondary text-sm mb-2">Documentation Lead</p>
              <p className="text-moovit-tertiary text-xs">Technical documentation and system analysis</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2b78e4] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h4 className="font-semibold text-moovit-text mb-2">Biniyam Moges</h4>
              <p className="text-moovit-secondary text-sm mb-2">Documentation Specialist</p>
              <p className="text-moovit-tertiary text-xs">Requirements analysis and user documentation</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2b78e4] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h4 className="font-semibold text-moovit-text mb-2">Frezer Gebeyaw</h4>
              <p className="text-moovit-secondary text-sm mb-2">Developer</p>
              <p className="text-moovit-tertiary text-xs">System development and testing</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2b78e4] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h4 className="font-semibold text-moovit-text mb-2">Kenbon Leta</h4>
              <p className="text-moovit-secondary text-sm mb-2">Developer</p>
              <p className="text-moovit-tertiary text-xs">Application development and integration</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}