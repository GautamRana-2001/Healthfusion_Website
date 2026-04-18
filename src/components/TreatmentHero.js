"use client";

import { ArrowRight, Calendar, Phone } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function TreatmentHero({ 
  title, 
  subtitle, 
  description,
  primaryColor = "#00A651",
  secondaryColor = "#0077C8"
}) {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#F7FAFC] to-white overflow-hidden">
      <div className="absolute top-6 left-6 z-20">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span 
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
          >
            Ayurvedic Treatment
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B0F19] mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {subtitle}
          </p>
          {description && (
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: secondaryColor }}
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </Link>
            <a
              href="tel:+919270216369"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0B0F19] border-2 border-gray-200 px-8 py-4 rounded-full font-semibold hover:border-[#0077C8] hover:text-[#0077C8] transition-all duration-300"
            >
              <Phone className="w-5 h-5" style={{ transform: 'rotate(0deg) scaleX(1)' }} />
              Call Clinic
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20" 
        style={{ backgroundColor: primaryColor }}
      />
      <div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-20" 
        style={{ backgroundColor: secondaryColor }}
      />
    </section>
  );
}
