"use client";

import { ArrowRight, Bus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '@/lib/auth';

export default function DriverHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(2); // Start with velocity bus as main
  const { driver } = useAuthStore();
  
  const slides = [
    { 
      title: "Track Your Performance",
      subtitle: "Monitor your trips and success rate",
      image: "/images/sheger_bus.png"
    },
    { 
      title: "Report Incidents Quickly",
      subtitle: "Stay safe with instant incident reporting",
      image: "/images/anbessa_bus.png"
    },
    { 
      title: `Welcome back, ${driver?.firstName || 'Driver'}!`,
      subtitle: "Today's routes and trips ready for you",
      image: "/images/velocity_bus.png"
    }
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Main Center Image - 70% height */}
      <div className="h-[70vh] relative">
        <div
          className="w-full h-full bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Semi-transparent overlay for text visibility */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-sm"></div>

        {/* Content overlay on main image */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl leading-tight stroke-black stroke-2 font-serif text-center mb-4">
            {slides[currentSlide].title}
          </h1>
          
          <p className="text-xl text-white/90 drop-shadow-lg mb-8 text-center max-w-2xl">
            {slides[currentSlide].subtitle}
          </p>
          
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 bg-[#2b78e4] hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg backdrop-blur-sm border-2 border-white/20"
          >
            <span>View Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom Gallery Row - 30% height - Full Width */}
      <div className="h-[30vh] bg-gray-100">
        <div className="h-full grid grid-cols-3">
          {/* Thumbnail 1 - Performance */}
          <div className="cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => setCurrentSlide(0)}>
            <div className="w-full h-full bg-cover bg-center hover:shadow-xl transition-shadow relative"
                 style={{
                   backgroundImage: 'url(/images/sheger_bus.png)',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}>
              {currentSlide === 0 && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
          
          {/* Thumbnail 2 - Safety */}
          <div className="cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => setCurrentSlide(1)}>
            <div className="w-full h-full bg-cover bg-center hover:shadow-xl transition-shadow relative"
                 style={{
                   backgroundImage: 'url(/images/anbessa_bus.png)',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}>
              {currentSlide === 1 && (
                <div className="flex items-center space-x-3">
                  <div className="bg-[#2b78e4] p-2 rounded-lg">
                    <Bus className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-moovit-text">AddisTransport</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Thumbnail 3 - Welcome */}
          <div className="cursor-pointer hover:scale-105 transition-transform duration-300 relative" onClick={() => setCurrentSlide(2)}>
            <div className="w-full h-full bg-cover bg-center hover:shadow-xl transition-shadow"
                 style={{
                   backgroundImage: 'url(/images/velocity_bus.png)',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}>
              {currentSlide === 2 && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
