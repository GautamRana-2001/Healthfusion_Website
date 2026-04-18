"use client";

import { useState, useEffect } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Priya Malhotra",
      city: "Pune",
      rating: 5,
      review: "I had severe acne for years and tried everything. The doctors at Healthfusion created a personalized treatment plan that finally worked. My skin is now clear and glowing. Highly recommend!",
      treatment: "Acne Treatment",
    },
    {
      name: "Rahul Verma",
      city: "Nashik",
      rating: 4,
      review: "Got my hair transplant done here and the results are amazing. The procedure was painless and the staff was very supportive throughout. Best decision I ever made for my confidence!",
      treatment: "Hair Transplant",
    },
    {
      name: "Sneha Patel",
      city: "Satara",
      rating: 4,
      review: "The laser hair removal treatment was quick and effective. After just a few sessions, I noticed significant reduction. The clinic uses top-notch technology and maintains high hygiene standards.",
      treatment: "Laser Hair Removal",
    },
    {
      name: "Amit Patil",
      city: "Pune",
      rating: 5,
      review: "Professional service and excellent results for my pigmentation issues. Dr. Sharma explained everything clearly and the treatment plan was very effective. Thank you Healthfusion!",
      treatment: "Pigmentation Treatment",
    },
    {
      name: "Neha Gupta",
      city: "Nagpur",
      rating: 5,
      review: "I've been coming here for my skin treatments for over 2 years now. The doctors are very experienced and the results have been consistently great. Wouldn't go anywhere else!",
      treatment: "Skin Rejuvenation",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000); // Auto-slide every 2 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#0077C8]/10 text-[#0077C8] rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4">
            What Our Patients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real patients who transformed their skin and hair with us
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-[#F7FAFC] rounded-2xl p-8 md:p-12 shadow-sm">
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review */}
                    <p className="text-lg md:text-xl text-gray-700 mb-8 italic leading-relaxed">
                      "{testimonial.review}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00A651] to-[#0077C8] flex items-center justify-center text-white font-bold text-xl">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#0B0F19]">{testimonial.name}</p>
                          <p className="text-gray-500 text-sm">{testimonial.city}</p>
                        </div>
                      </div>
                      <span className="px-4 py-2 bg-[#0077C8]/10 text-[#0077C8] rounded-full text-sm font-semibold">
                        {testimonial.treatment}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#0B0F19] hover:bg-[#0077C8] hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#0B0F19] hover:bg-[#0077C8] hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-[#0077C8]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
