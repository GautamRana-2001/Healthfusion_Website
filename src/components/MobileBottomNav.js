"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaStethoscope, FaCalendarCheck, FaWhatsapp, FaPhone } from "react-icons/fa";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: FaHome,
    },
    {
      name: "Dermatology",
      href: "/allopathy",
      icon: FaStethoscope,
    },
    {
      name: "Book",
      href: "/appointment",
      icon: FaCalendarCheck,
      isPrimary: true,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/919270216369",
      icon: FaWhatsapp,
      isExternal: true,
    },
    {
      name: "Call",
      href: "tel:9270216369",
      icon: FaPhone,
      isExternal: true,
    },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          if (item.isExternal) {
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 min-w-[64px]
                  ${item.name === "WhatsApp" 
                    ? "text-green-500 hover:bg-green-50" 
                    : "text-blue-600 hover:bg-blue-50"
                  }
                `}
              >
                <Icon className="w-5 h-5" style={{ transform: item.name === "Call" ? 'rotate(90deg) scaleX(1)' : undefined }} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </a>
            );
          }

          if (item.isPrimary) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 min-w-[64px] bg-[#0077C8] text-white shadow-md hover:bg-blue-700 ${
                  active ? "ring-2 ring-blue-300" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold">{item.name}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 min-w-[64px] ${
                active
                  ? "text-[#0077C8] bg-blue-50"
                  : "text-gray-500 hover:text-[#0077C8] hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
