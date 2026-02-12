"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(2);
  
  const slides = [
    { 
      title: "Your reliable partner for public transport.",
      subtitle: "Trustworthy service for your daily commute",
      image: "/images/anbessa_bus.png"
    },
    { 
      title: "Plan and track your journey.",
      subtitle: "Real-time updates for seamless travel",
      image: "/images/sheger_bus.png"
    },
    { 
      title: "Welcome to AddisTransport",
      subtitle: "Safe and reliable transportation",
      image: "/images/velocity_bus.png"
    }
  ];

  return (
    <section className="h-screen w-full overflow-hidden flex flex-col">
      {/* Main Center Image - 70% */}
      <div className="flex-[7] relative">
        <div
          className="w-full h-full bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="absolute inset-0 bg-black/15 backdrop-blur-sm"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[8%]">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-tight stroke-black stroke-2 font-serif text-center mb-4 px-4">
            {slides[currentSlide].title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 drop-shadow-lg mb-6 md:mb-8 text-center max-w-2xl px-4">
            {slides[currentSlide].subtitle}
          </p>
          
          <Link
            href="/journey"
            className="inline-flex items-center gap-2 bg-[#2b78e4] hover:bg-blue-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg backdrop-blur-sm border-2 border-white/20"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom Gallery Row - 30% */}
      <div className="flex-[3] bg-gray-100">
        <div className="h-full grid grid-cols-3">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className="cursor-pointer hover:scale-105 transition-transform duration-300" 
              onClick={() => setCurrentSlide(index)}
            >
              <div 
                className="w-full h-full bg-cover bg-center hover:shadow-xl transition-shadow relative"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {currentSlide === index && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
