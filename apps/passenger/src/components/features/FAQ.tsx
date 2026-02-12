'use client';

import { ChevronDown, ChevronUp, HelpCircle, Clock, MapPin, CreditCard, Smartphone, Bus, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Getting Started",
      icon: Smartphone,
      color: "text-blue-500",
      questions: [
        {
          question: "How do I use AddisTransport?",
          answer: "Simply visit our website to get started. You can plan your journey by entering your starting point and destination. Our system will show you the best routes, real-time bus locations, and estimated arrival times."
        },
        {
          question: "Is AddisTransport free to use?",
          answer: "Yes! AddisTransport is completely free to use. You can access all features including route planning, real-time tracking, and service alerts without any cost."
        },
        {
          question: "Do I need to create an account?",
          answer: "Creating an account is optional but recommended. With an account, you can save favorite routes, receive personalized alerts, and provide feedback to help us improve our services."
        }
      ]
    },
    {
      title: "Routes & Schedules",
      icon: MapPin,
      color: "text-green-500",
      questions: [
        {
          question: "How accurate are the bus arrival times?",
          answer: "Our real-time tracking provides arrival times with 95% accuracy. Times are updated every 30 seconds based on actual bus locations and traffic conditions."
        },
        {
          question: "How do I find the nearest bus stop?",
          answer: "Use our 'Find Nearby' feature or enable location services. Our website will show all bus stops within walking distance, along with which routes serve each stop."
        }
      ]
    },
    {
      title: "Real-Time Tracking",
      icon: Clock,
      color: "text-orange-500",
      questions: [
        {
          question: "How does real-time tracking work?",
          answer: "All buses are equipped with GPS devices that transmit location data every few seconds. This information is processed and displayed on our platform to show exact bus positions and arrival predictions."
        },
        {
          question: "What if a bus doesn't show up on time?",
          answer: "If there are delays or service disruptions, you'll receive automatic notifications if you have an account with alerts enabled. Check the Alerts section for any route-specific issues or contact our support team."
        },
        {
          question: "Can I track multiple routes at once?",
          answer: "Yes! You can monitor multiple routes simultaneously. With an account, you can save your frequently used routes for quick access and real-time updates."
        }
      ]
    },
    {
      title: "Payments & Fares",
      icon: CreditCard,
      color: "text-purple-500",
      questions: [
        {
          question: "How do I pay for bus rides?",
          answer: "Payment is made directly on the bus using cash or the city's official transport card. AddisTransport provides information and planning services but doesn't handle payments."
        },
        {
          question: "What are the current fare prices?",
          answer: "Standard fares range from 5-15 ETB depending on distance. Express routes may have slightly higher fares. Check with the bus operator or city transport authority for current rates."
        },
        {
          question: "Are there discounts for students or seniors?",
          answer: "Yes, discounted fares are available for students, seniors, and people with disabilities. You'll need to present valid ID or a transport card to the bus operator."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: AlertCircle,
      color: "text-red-500",
      questions: [
        {
          question: "The app isn't working properly. What should I do?",
          answer: "First, try refreshing the page or restarting the app. Check your internet connection. If problems persist, contact our support team at support@addistransport.com with details about the issue."
        },
        {
          question: "How do I report incorrect information?",
          answer: "Use the 'Report Issue' feature in the app or contact us through the Feedback page. We investigate all reports and update information as needed."
        },
        {
          question: "Is my location data safe?",
          answer: "Yes, we take privacy seriously. Location data is only used to provide you with relevant transport information and is not shared with third parties. You can disable location services at any time."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-moovit-bg">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center" style={{backgroundImage: 'url(/images/background.jpg)'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 max-w-md mx-auto">
              Find answers to common questions
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 -mt-8 relative z-20 max-w-4xl">
        {/* Quick Help */}
        <div className="bg-moovit-card rounded-2xl shadow-moovit-lg border border-moovit-light p-8 mb-8">
          <div className="text-center">
            <HelpCircle className="w-12 h-12 text-[#2b78e4] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-moovit-text mb-4">Need Quick Help?</h2>
            <p className="text-moovit-secondary mb-6">
              Can't find what you're looking for? Contact our support team for immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@addistransport.com" className="bg-[#2b78e4] hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105">
                Email Support
              </a>
              <a href="tel:+251911234567" className="bg-moovit-hover hover:bg-moovit-tertiary text-moovit-text px-6 py-3 rounded-xl font-medium transition-all border border-moovit-light">
                Call +251 911 234 567
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6 mb-16">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-moovit-card rounded-xl shadow-moovit-sm border border-moovit-light overflow-hidden">
              <div className="p-6 border-b border-moovit-light">
                <div className="flex items-center gap-3">
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                  <h3 className="text-xl font-bold text-moovit-text">{category.title}</h3>
                </div>
              </div>
              
              <div className="divide-y divide-moovit-light">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={faqIndex}>
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full p-6 text-left hover:bg-moovit-hover transition-colors flex items-center justify-between"
                      >
                        <span className="font-medium text-moovit-text pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-moovit-secondary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-moovit-secondary flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-moovit-secondary leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}