"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function TrustedPartnerSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const partnerFeatures = [
    {
      title: "Expert Ayurveda Treatments",
      description: "Board-certified specialists with years of experience in advanced skin and hair treatments.",
      bgImage: "/expertayurveda.jpeg"
    },
    {
      title: "FDA-Approved Technology",
      description: "Latest medical equipment and proven treatment methods for safe, effective results.",
      bgImage: "/FDA.jpeg"
    },
    {
      title: "Personalized Care",
      description: "Customized treatment plans designed specifically for your unique skin and hair concerns.",
      bgImage: "/personalizedcare.jpeg"
    },
    {
      title: "Proven Results",
      description: "Thousands of satisfied patients with transformative results and renewed confidence.",
      bgImage: "/provenresults.jpeg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % partnerFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0077C8]/5 via-white to-[#00A651]/5" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-6">
            Your Trusted Partner in
            <span className="block text-[#00A651]">Skin & Hair Care</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            With over a decade of excellence in dermatology, we combine medical expertise 
            with cutting-edge technology to deliver exceptional care. Your journey to 
            radiant skin and healthy hair begins with us.
          </p>
        </div>

        {/* Dynamic Feature Boxes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {partnerFeatures.map((feature, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer transition-all duration-700 ${
                activeIndex === index ? "scale-105" : "scale-100"
              }`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Background Image Box */}
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0">
                  <Image
                    src={feature.bgImage}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                </div>
                
                {/* Active Indicator */}
                {activeIndex === index && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-[#0077C8] rounded-full animate-pulse" />
                )}
              </div>
              
              {/* Description Card */}
              <div className={`absolute -bottom-2 left-2 right-2 bg-white rounded-xl shadow-lg p-4 transition-all duration-500 ${
                activeIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Feature Display */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-96 lg:h-auto">
              <Image
                src={partnerFeatures[activeIndex].bgImage}
                alt={partnerFeatures[activeIndex].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Floating Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce">
                {partnerFeatures[activeIndex].icon}
              </div>
            </div>
            
            {/* Content Side */}
            <div className="p-12 flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-[#0077C8]/10 text-[#0077C8] rounded-full text-sm font-semibold mb-4">
                  Why Choose Us
                </span>
                <h3 className="text-3xl font-bold text-[#0B0F19] mb-4">
                  {partnerFeatures[activeIndex].title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {partnerFeatures[activeIndex].description}
                </p>
              </div>
              
              {/* Feature Indicators */}
              <div className="flex gap-3 mb-8">
                {partnerFeatures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index 
                        ? "w-8 bg-[#0077C8]" 
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              
              {/* CTA Button */}
              <button className="inline-flex items-center gap-2 bg-[#0077C8] text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Learn More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: "15+", label: "Years Experience" },
            { number: "50K+", label: "Happy Patients" },
            { number: "98%", label: "Success Rate" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-[#00A651] mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
