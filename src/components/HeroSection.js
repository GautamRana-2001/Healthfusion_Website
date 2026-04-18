"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "/home18.png",
      alt: "Advanced Skin and Hair Treatment Clinic 1"
    },
    {
      image: "/home19.png",
      alt: "Advanced Skin and Hair Treatment Clinic 2"
    },
    {
      image: "/home20.png",
      alt: "Advanced Skin and Hair Treatment Clinic 3"
    },
    {
      image: "/home17.png",
      alt: "Advanced Skin and Hair Treatment Clinic 4"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative -mt-30 sm:mt-0 -mb-30 sm:mb-0 h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-contain md:object-cover object-center transition-all duration-700"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 mt-4">
              <span className="w-2 h-2 bg-[#00A651] rounded-full"></span>
              {/* <span className="text-white/90 text-sm font-medium tracking-wide">
                Trusted Dermatology Clinic
              </span> */}
            </div>

            {/* Main Heading */}
            {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Advanced{" "}
              <span className="text-[#00A651]">Skin</span>
              {" "}&{" "}
              <span className="text-[#0077C8]">Hair</span>
              {" "}Treatments
            </h1> */}

            {/* Subtext */}
            {/* <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
              Experience safe and effective dermatology treatments with advanced 
              technology and expert doctors. Your journey to healthy skin starts here.
            </p> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary Button */}
              {/* <Link
                href="/appointment"
                className="inline-flex items-center justify-center bg-[#0077C8] text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-blue-700 transition-all duration-300 hover:-translate-y-0.5"
              >
                Book Appointment
              </Link> */}

              {/* Secondary Button */}
              {/* <Link
                href="/appointment"
                className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white/50 px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Book Free Consultation
              </Link> */}
            </div>

            {/* Slider Dots */}
            {/* <div className="flex gap-2 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
