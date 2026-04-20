"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Doctors", href: "/about/doctors" },
    { name: "Treatments", href: "/dermatology" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const directionsUrl =
    "https://maps.app.goo.gl/Kccz9ET2Qbvynz4H6?g_st=iw";

  const embedUrl =
    "https://www.google.com/maps?q=Healthfusion+MultiSpecialty/@18.5610646,73.9449121,17z&output=embed";

  const contactInfo = [
    {
      type: "Phone",
      value: "+91 92702 16369",
      href: "tel:+919270216369",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      ),
    },
    {
      type: "Email",
      value: "healthfusion.live@gmail.com",
      href: "mailto:healthfusion.live@gmail.com",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
    },
    {
      type: "Address",
      value: "Office No. - 18B, 3rd floor, City Vista, A Wing, Kharadi, Pune - 411014",
      href: directionsUrl,
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      ),
    },
  ];

  return (
    <footer id="contact" className="bg-[#0B0F19] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-white p-2 rounded-lg">
                <img 
                  src="/logo6.jpeg" 
                  alt="Clinic Logo" 
                  className="h-16 w-42 object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Advanced dermatology and hair care clinic providing safe, effective treatments with proven results.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { name: "facebook", href: "https://www.facebook.com/profile.php?id=61581135523218" },
                // { name: "twitter", href: "#" },
                { name: "instagram", href: "https://www.instagram.com/healthfusion_multispeciality?igsh=MWZpMWp5MnZlNG82Yw==" },
                // { name: "linkedin", href: "#" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0077C8] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {social.name === "facebook" && (
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    )}
                    {/* {social.name === "twitter" && (
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    )} */}
                    {social.name === "instagram" && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    )}
                    {/* {social.name === "linkedin" && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    )} */}
                  </svg>
                </a>
              ))}
              
              {/* WhatsApp Icon */}
              <a
                href="https://wa.me/919270216369"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              
              {/* Call Icon */}
              <a
                href="tel:9270216369"
                aria-label="Call"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#0077C8] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((info) => (
                <li key={info.type} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00A651] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {info.icon}
                  </svg>
                  <div>
                    <p className="text-gray-400 text-sm">{info.type}</p>
                    {info.href ? (
                      <Link 
                        href={info.href}
                        className="text-white hover:text-[#0077C8] transition-colors text-sm"
                        target={info.type === "Address" ? "_blank" : undefined}
                        rel={info.type === "Address" ? "noopener noreferrer" : undefined}
                      >
                        {info.value}
                      </Link>
                    ) : (
                      <p className="text-white text-sm">{info.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Location */}
          <div>
            <h3 className="font-bold text-lg mb-6">Our Location</h3>
            <div className="rounded-lg overflow-hidden shadow-sm border border-white/10 bg-white/5">
              <iframe
                src={embedUrl}
                className="w-full h-40 border-0"
                loading="lazy"
                title="Healthfusion Clinic Location"
              />
            </div>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Office No. - 18B, 3rd floor, City Vista, A Wing, Kharadi, Pune - 411014
            </p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0077C8] text-white px-5 py-2.5 font-semibold shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 Healthfusion Multispeciality. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-gray-400 hover:text-[#0077C8] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#0077C8] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
