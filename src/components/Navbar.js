"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppointmentModal from "@/components/AppointmentModal";
import { treatments } from "@/data/treatments";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { 
  ChevronDown, 
  Calendar, 
  Phone, 
  Menu, 
  X
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Ask Expert", href: "/ask-expert" },
  ];

  const megaMenuData = {
    skinTreatments: {
      title: "Skin Treatments",
      items: [
        { name: "Acne Treatment", href: "/dermatology/acne" },
        { name: "Skin Brightening", href: "/dermatology/skin-brightening" },
        { name: "Anti-Ageing Treatment", href: "/dermatology/anti-ageing" },
        { name: "Hydrafacial", href: "/dermatology/hydrafacial" },
        { name: "Organic Peels", href: "/dermatology/organic-peels" },
        { name: "Medi Facials", href: "/dermatology/medi-facials" },
        { name: "Freckles Treatment", href: "/dermatology/freckles-treatment" },
        { name: "Fillers", href: "/dermatology/fillers" },
        { name: "Glow Drips", href: "/dermatology/glow-drips" },
        { name: "Face PRP", href: "/dermatology/face-prp" },
        { name: "Face Fat Reduction", href: "/dermatology/face-fat-reduction" },
        { name: "Laser Toning", href: "/dermatology/laser-toning" },
        { name: "Korean Glass Skin", href: "/dermatology/korean-glass-skin" },
        { name: "Botox", href: "/dermatology/botox" },
        { name: "Face Microneedling", href: "/dermatology/face-microneedling" },
        { name: "Exosomes Treatment", href: "/dermatology/exosomes-treatment" },
      ],
    },
    hairTreatments: {
      title: "Hair Treatments",
      items: [
        { name: "Hair & Scalp Therapy", href: "/dermatology/hair-scalp-therapy" },
        { name: "Hair Transplant", href: "/dermatology/hair-transplant" },
        { name: "Hair Loss Treatment", href: "/dermatology/hair-loss" },
        { name: "PRP Treatment", href: "/dermatology/prp-treatment" },
        { name: "GFC Treatment", href: "/dermatology/gfc-treatment" },
        { name: "Anti-Dandruff Treatment", href: "/dermatology/anti-dandruff" },
        { name: "QR-678 Treatment", href: "/dermatology/qr-678" },
        { name: "Hair Microneedling", href: "/dermatology/hair-microneedling" },
      ],
    },
    laserTreatments: {
      title: "Laser Treatments",
      items: [
        { name: "Laser Hair Removal", href: "/dermatology/laser-hair-removal" },
        { name: "Skin Resurfacing", href: "/dermatology/skin-resurfacing" },
        { name: "Tattoo Removal", href: "/dermatology/tattoo-removal" },
        { name: "Laser De-Pigmentation", href: "/dermatology/laser-depigmentation" },
      ],
    },
  };

  const fusionMenuData = {
  ayurvedaDermatology: {
    title: "Ayurveda + Dermatology",
    items: [
      { name: "Psoriasis / Eczema", href: "/fusion-treatments/psoriasis-eczema" },
      { name: "Acne & Acne Marks", href: "/fusion-treatments/acne-acne-marks" },
      { name: "Pigmentation", href: "/fusion-treatments/pigmentation" },
      { name: "Hair Loss", href: "/fusion-treatments/hair-loss" },
      { name: "Fat Loss", href: "/fusion-treatments/fat-loss" },
    ],
  },
  ayurvedaAllopathy: {
    title: "Ayurveda + Allopathy",
    items: [
      { name: "Gastric Problem", href: "/fusion-treatments/gastric-problem" },
      { name: "Hyper Acidity", href: "/fusion-treatments/hyper-acidity" },
      { name: "Diabetes", href: "/fusion-treatments/diabetes" },
      { name: "Hormonal Disorder", href: "/fusion-treatments/hormonal-disorder" },
      { name: "Vitiligo", href: "/fusion-treatments/vitiligo" },
    ],
  },
};

  const galleryMegaMenuData = {
    ayurvedaClinic: {
      title: "Ayurveda Clinic Gallery",
      items: [
        { name: "Clinic Interior", href: "/gallery/ayurveda/clinic" },
        { name: "Treatment Rooms", href: "/gallery/ayurveda/treatment-rooms" },
        { name: "Panchakarma Sessions", href: "/gallery/ayurveda/panchakarma" },
        // { name: "Ayurvedic Facials", href: "/gallery/ayurveda/facial" },
        { name: "Consultation Sessions", href: "/gallery/ayurveda/consultation" },
      ],
    },
    dermatologyClinic: {
      title: "Dermatology Clinic Gallery",
      items: [
        { name: "Clinic Interior", href: "/gallery/derma/clinic" },
        { name: "Treatment Rooms", href: "/gallery/derma/treatment-rooms" },
        { name: "Skin Procedures", href: "/gallery/derma/skin-procedures" },
        { name: "Laser Treatments", href: "/gallery/derma/laser-treatments" },
        { name: "Facial Treatments", href: "/gallery/derma/facial-treatments" },
      ],
    },
    machinesTechnology: {
      title: "Machines & Technology",
      items: [
        { name: "Laser Machines", href: "/gallery/machines/laser" },
        { name: "Skin Treatment Machines", href: "/gallery/machines/skin-treatment" },
        // { name: "Hair Treatment Machines", href: "/gallery/machines/hair-treatment" },
        // { name: "RF & MNRF Machines", href: "/gallery/machines/rf" },
        // { name: "Facial Machines", href: "/gallery/machines/facial-machines" },
      ],
    },
  };

  const mainMenuItems = [
    {
      name: "Fusion Treatments",
      hasDropdown: true,
      dropdownType: "fusion",
      href: "/fusion-treatments",
    },
    { 
      name: "Dermatology", 
      hasDropdown: true, 
      dropdownType: "mega",
      href: "/allopathy" 
    },
    { 
      name: "Ayurveda", 
      hasDropdown: true, 
      dropdownType: "ayurveda",
      href: "/ayurveda" 
    },
    { 
      name: "Gallery",
      hasDropdown: true, 
      dropdownType: "gallery",
      href: "/gallery" 
    },
    { 
      name: "Appointment",
      hasDropdown: false,
      href: "/appointment"
    },
  ];

  const handleDropdownEnter = (dropdownName) => {
    setActiveDropdown(dropdownName);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const openAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  return (
    <>
      {/* Top Information Bar */}
      <div className="bg-gray-100 text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Left - placeholder for alignment */}
            <div className="flex items-center gap-2">
              {/* <span className="text-sm text-gray-500 hidden sm:inline">Kharadi, Pune</span> */}
            </div>

            {/* Center - Quick Links */}
            <div className="hidden md:flex items-center gap-6">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#0077C8] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right - Customer Care */}
            <div className="flex items-center gap-4 text-base">
              <div className="flex items-center gap-5 md:gap-6">
                <a
                  href="https://www.instagram.com/health.fusion33/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-lg text-pink-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-md"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61581135523218"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-lg text-blue-600 cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-md"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://wa.me/919270216369"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-lg text-green-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-md"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="https://www.google.com/maps/place/Healthfusion+MultiSpecialty/@18.5610646,73.9449121,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps"
                  className="text-lg text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-md"
                >
                  <FaMapMarkerAlt />
                </a>
              </div>
              <a 
                href="tel:9270216369" 
                className="flex items-center gap-2 text-[#0077C8] font-semibold hover:text-blue-700 transition-colors"
              >
                <Phone className="w-4 h-4" style={{ transform: 'rotate(0deg) scaleX(1)' }} />
                92702 16369
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 bg-white shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img 
                src="/logo6.jpeg" 
                alt="Clinic Logo" 
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {mainMenuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 font-medium text-[#0B0F19] transition-colors hover:text-[#0077C8]"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`} />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {item.dropdownType === "mega" && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/3 -translate-x-1/4 w-[800px] bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
                      <div className="grid grid-cols-4 gap-6">
                        {Object.values(megaMenuData).map((category) => (
                          <div key={category.title}>
                            <h4 className="font-bold text-[#0B0F19] mb-4 text-lg border-b border-gray-100 pb-2">
                              {category.title}
                            </h4>
                            <ul className="space-y-3">
                              {category.items.map((treatment) => (
                                <li key={treatment.name}>
                                  <Link
                                    href={treatment.href}
                                    className="text-gray-600 hover:text-[#0077C8] transition-colors text-sm"
                                  >
                                    {treatment.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {/* View All Button */}
                      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <Link
                          href="/dermatology"
                          className="inline-flex items-center gap-2 bg-[#0077C8] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          View All Treatments
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Ayurveda Dropdown */}
                  {item.dropdownType === "ayurveda" && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[360px] bg-white rounded-xl shadow-2xl p-6 border border-gray-100">
                      <h4 className="font-bold text-[#0B0F19] mb-4 text-lg border-b border-gray-100 pb-2">
                        Ayurveda Treatments
                      </h4>
                      <ul className="space-y-3">
                        {treatments.ayurveda.map((treatment) => {
                          const isActive = pathname === treatment.slug;

                          return (
                            <li key={treatment.name}>
                              <Link
                                href={treatment.slug}
                                title={`View ${treatment.name}`}
                                className={`transition-colors text-sm ${
                                  isActive
                                    ? "text-[#0077C8] font-semibold"
                                    : "text-gray-600 hover:text-[#0077C8]"
                                }`}
                              >
                                {treatment.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <Link
                          href="/ayurveda"
                          className="inline-flex items-center gap-2 bg-[#0077C8] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          View Ayurveda
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Fusion Treatments Dropdown */}
                  {item.dropdownType === "fusion" && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
  
  <div className="grid grid-cols-2 gap-6 items-start">

    {Object.values(fusionMenuData).map((category) => (
      <div key={category.title} className="space-y-3">
        
        <h4 className="text-lg font-bold text-[#0B0F19] mb-3 pb-2 border-b border-gray-100">
          {category.title}
        </h4>

        <ul className="space-y-2">
          {category.items.map((treatment) => (
            <li key={treatment.name}>
              <Link
                href={treatment.href}
                className="block py-1 text-gray-600 text-sm transition-all duration-200 hover:text-[#0077C8] hover:translate-x-1"
              >
                {treatment.name}
              </Link>
            </li>
          ))}
        </ul>

      </div>
    ))}

  </div>

  {/* CTA Button */}
  <div className="mt-6 pt-4 border-t border-gray-100 text-center">
    <Link
      href="/fusion-treatments"
      className="inline-flex items-center gap-2 bg-[#0077C8] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      View All Fusion Treatments
    </Link>
  </div>

</div>
                  )}

                  {/* Gallery Mega Menu Dropdown */}
                  {item.dropdownType === "gallery" && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
                      <div className="grid grid-cols-3 gap-6">
                        {Object.values(galleryMegaMenuData).map((category) => (
                          <div key={category.title}>
                            <h4 className="font-bold text-[#0B0F19] mb-4 text-lg border-b border-gray-100 pb-2">
                              {category.title}
                            </h4>
                            <ul className="space-y-3">
                              {category.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="text-gray-600 hover:text-[#0077C8] transition-colors text-sm"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {/* View All Button */}
                      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <Link
                          href="/gallery"
                          className="inline-flex items-center gap-2 bg-[#0077C8] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          View All Gallery
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section - Book Button */}
            <div className="hidden lg:flex items-center">
              {/* Book Appointment Button */}
              {/* <button
                type="button"
                onClick={openAppointmentModal}
                className="flex items-center gap-2 bg-[#0077C8] text-white px-7 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#0B0F19]"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 top-[120px] bg-white z-50 overflow-y-auto">
              <div className="p-6">

                {/* Mobile Menu Items */}
                <div className="space-y-4">
                  {/* Fusion Treatments with Submenu */}
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === "Fusion Treatments" ? null : "Fusion Treatments")}
                      className="flex items-center justify-between w-full py-3 text-lg font-medium text-[#0B0F19] border-b border-gray-100"
                    >
                      Fusion Treatments
                      <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === "Fusion Treatments" ? "rotate-180" : ""}`} />
                    </button>
                    {activeDropdown === "Fusion Treatments" && (
                      <div className="pl-4 py-3 space-y-3">
                        {Object.values(fusionMenuData).map((category) => (
                          <div key={category.title} className="mb-4">
                            <h4 className="font-semibold text-[#00A651] mb-2">{category.title}</h4>
                            <ul className="space-y-2">
                              {category.items.map((treatment) => (
                                <li key={treatment.name}>
                                  <Link
                                    href={treatment.href}
                                    className="text-gray-600 hover:text-[#0077C8] transition-colors text-sm block py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {treatment.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        
                        <Link
                          href="/fusion-treatments"
                          className="inline-flex items-center gap-2 bg-[#0077C8] text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          View All Fusion Treatments
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Treatments with Submenu */}
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === "Dermatology" ? null : "Dermatology")}
                      className="flex items-center justify-between w-full py-3 text-lg font-medium text-[#0B0F19] border-b border-gray-100"
                    >
                      Dermatology
                      <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === "Dermatology" ? "rotate-180" : ""}`} />
                    </button>
                    {activeDropdown === "Dermatology" && (
                      <div className="pl-4 py-3 space-y-3">
                        {Object.values(megaMenuData)
                          .filter((category) => category.title !== "Ayurveda Treatments")
                          .map((category) => (
                          <div key={category.title} className="mb-4">
                            <h4 className="font-semibold text-[#00A651] mb-2">{category.title}</h4>
                            <ul className="space-y-2">
                              {category.items.map((treatment) => (
                                <li key={treatment.name}>
                                  <Link
                                    href={treatment.href}
                                    className="text-gray-600 hover:text-[#0077C8] transition-colors text-sm block py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {treatment.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Ayurveda with Submenu */}
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === "Ayurveda" ? null : "Ayurveda")}
                      className="flex items-center justify-between w-full py-3 text-lg font-medium text-[#0B0F19] border-b border-gray-100"
                    >
                      Ayurveda
                      <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === "Ayurveda" ? "rotate-180" : ""}`} />
                    </button>
                    {activeDropdown === "Ayurveda" && (
                      <div className="pl-4 py-3 space-y-3">
                        <div className="mb-4">
                          <h4 className="font-semibold text-[#00A651] mb-2">Ayurveda Treatments</h4>
                          <ul className="space-y-2">
                            {treatments.ayurveda.map((treatment) => {
                              const isActive = pathname === treatment.slug;

                              return (
                                <li key={treatment.name}>
                                  <Link
                                    href={treatment.slug}
                                    title={`View ${treatment.name}`}
                                    className={`transition-colors text-sm block py-1 ${
                                      isActive
                                        ? "text-[#0077C8] font-semibold"
                                        : "text-gray-600 hover:text-[#0077C8]"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {treatment.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <Link
                          href="/ayurveda"
                          className="inline-flex items-center gap-2 bg-[#0077C8] text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          View Ayurveda
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Gallery with Submenu */}
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === "Gallery" ? null : "Gallery")}
                      className="flex items-center justify-between w-full py-3 text-lg font-medium text-[#0B0F19] border-b border-gray-100"
                    >
                      Gallery
                      <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === "Gallery" ? "rotate-180" : ""}`} />
                    </button>
                    {activeDropdown === "Gallery" && (
                      <div className="pl-4 py-3 space-y-3">
                        {Object.values(galleryMegaMenuData).map((category) => (
                          <div key={category.title} className="mb-4">
                            <h4 className="font-semibold text-[#00A651] mb-2">{category.title}</h4>
                            <ul className="space-y-2">
                              {category.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="text-gray-600 hover:text-[#0077C8] transition-colors text-sm block py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Other Menu Items */}
                  {mainMenuItems
                    .filter(
                      (item) =>
                        item.name !== "Fusion Treatments" &&
                        item.name !== "Dermatology" &&
                        item.name !== "Ayurveda" &&
                        item.name !== "Gallery"
                    )
                    .map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className="block py-3 text-lg font-medium text-[#0B0F19] border-b border-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}

                  {/* Mobile Book Appointment Button */}
                  <button
                    type="button"
                    onClick={openAppointmentModal}
                    className="flex items-center justify-center gap-2 w-full bg-[#0077C8] text-white px-7 py-3 rounded-full font-semibold mt-6 shadow-md hover:bg-blue-700 transition-all duration-300"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Book Appointment Button */}
      <button
        type="button"
        onClick={openAppointmentModal}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0077C8] text-white px-6 py-4 rounded-full font-semibold shadow-2xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden sm:inline">Book Appointment</span>
        <span className="sm:hidden">Book</span>
      </button>

      <AppointmentModal open={isAppointmentModalOpen} onClose={closeAppointmentModal} />
    </>
  );
}
