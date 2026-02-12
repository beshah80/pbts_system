import { MessageSquare, Star, Send, CheckCircle, AlertCircle, Lightbulb, Bug } from 'lucide-react';

export default function Feedback() {
  return (
    <div className="min-h-screen bg-moovit-bg">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center" style={{backgroundImage: 'url(/images/background.jpg)'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Share Your Feedback
            </h1>
            <p className="text-xl text-white/90 max-w-md mx-auto">
              Help us improve your travel experience
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Feedback Form */}
          <div className="lg:col-span-2">
            <div className="bg-moovit-card rounded-2xl shadow-moovit-lg border border-moovit-light p-8">
              <h2 className="text-2xl font-semibold text-moovit-text mb-8">Tell Us What You Think</h2>
              
              <form className="space-y-8">
                {/* Feedback Type */}
                <div>
                  <label className="block text-sm font-medium text-moovit-text mb-4">Feedback Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button type="button" className="p-4 border-2 border-[#2b78e4] bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition-all">
                      <CheckCircle className="w-6 h-6 text-[#2b78e4] mx-auto mb-2" />
                      <span className="text-sm text-[#2b78e4] font-medium">Compliment</span>
                    </button>
                    <button type="button" className="p-4 border border-moovit-light bg-moovit-card rounded-xl text-center hover:bg-moovit-hover transition-all">
                      <AlertCircle className="w-6 h-6 text-moovit-secondary mx-auto mb-2" />
                      <span className="text-sm text-moovit-secondary">Complaint</span>
                    </button>
                    <button type="button" className="p-4 border border-moovit-light bg-moovit-card rounded-xl text-center hover:bg-moovit-hover transition-all">
                      <Lightbulb className="w-6 h-6 text-moovit-secondary mx-auto mb-2" />
                      <span className="text-sm text-moovit-secondary">Suggestion</span>
                    </button>
                    <button type="button" className="p-4 border border-moovit-light bg-moovit-card rounded-xl text-center hover:bg-moovit-hover transition-all">
                      <Bug className="w-6 h-6 text-moovit-secondary mx-auto mb-2" />
                      <span className="text-sm text-moovit-secondary">Bug Report</span>
                    </button>
                  </div>
                </div>

                {/* Route Selection */}
                <div>
                  <label className="block text-sm font-medium text-moovit-text mb-3">Route (Optional)</label>
                  <select className="w-full px-4 py-3 border border-moovit-light rounded-xl text-moovit-text bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4] focus:border-transparent">
                    <option>Select a route</option>
                    <option>B1 - Bole → Piassa</option>
                    <option>B2 - Merkato → Arat Kilo</option>
                    <option>H1 - Stadium → Meskel Square</option>
                    <option>H2 - CMC → Mexico</option>
                    <option>B6 - Bole → Kaliti Express</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-moovit-text mb-3">Overall Experience</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-8 h-8 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-moovit-tertiary'}`} />
                      </button>
                    ))}
                    <span className="ml-3 text-sm text-moovit-secondary">4 out of 5</span>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-moovit-text mb-3">Subject</label>
                  <input
                    type="text"
                    placeholder="Brief description of your feedback"
                    className="w-full px-4 py-3 border border-moovit-light rounded-xl text-moovit-text placeholder-moovit-tertiary bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4] focus:border-transparent"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-moovit-text mb-3">Detailed Feedback</label>
                  <textarea
                    rows={6}
                    placeholder="Please share your detailed feedback, including any specific incidents, suggestions, or compliments..."
                    className="w-full px-4 py-3 border border-moovit-light rounded-xl text-moovit-text placeholder-moovit-tertiary bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4] focus:border-transparent resize-none"
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-moovit-text mb-3">Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-moovit-light rounded-xl text-moovit-text placeholder-moovit-tertiary bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-moovit-text mb-3">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-moovit-light rounded-xl text-moovit-text placeholder-moovit-tertiary bg-moovit-card focus:outline-none focus:ring-2 focus:ring-[#2b78e4] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#2b78e4] hover:bg-blue-600 text-white py-4 px-6 rounded-xl font-medium transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-moovit-sm"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Feedback</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Why Your Feedback Matters */}
            <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-6">
              <h3 className="text-lg font-semibold text-moovit-text mb-6">Why Your Feedback Matters</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-moovit-text font-medium">Improve Service Quality</p>
                    <p className="text-moovit-secondary text-sm mt-1">Your feedback helps us identify areas for improvement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-moovit-text font-medium">Enhance User Experience</p>
                    <p className="text-moovit-secondary text-sm mt-1">We use your suggestions to make our app better</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-moovit-text font-medium">Recognize Excellence</p>
                    <p className="text-moovit-secondary text-sm mt-1">Compliments help us acknowledge great service</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Feedback Stats */}
            <div className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light p-6">
              <h3 className="text-lg font-semibold text-moovit-text mb-6">Recent Feedback</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-moovit-secondary">Total Feedback This Month</span>
                  <span className="font-semibold text-moovit-text">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-moovit-secondary">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-moovit-text">4.2</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-moovit-secondary">Response Time</span>
                  <span className="font-semibold text-moovit-text">&lt; 24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-moovit-secondary">Issues Resolved</span>
                  <span className="font-semibold text-green-600">89%</span>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-moovit-text mb-4">Need Immediate Help?</h3>
              <p className="text-moovit-secondary mb-4">
                If you have urgent issues or need immediate assistance, please contact our support team.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-moovit-text">
                  <span className="font-medium">Email:</span> support@addistransport.com
                </p>
                <p className="text-sm text-moovit-text">
                  <span className="font-medium">Phone:</span> +251 911 234 567
                </p>
                <p className="text-sm text-moovit-text">
                  <span className="font-medium">Hours:</span> Mon-Fri, 8AM - 6PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}