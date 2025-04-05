"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Mainnav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Plan Trip", href: "/plan-trip" },
    { name: "My Trips", href: "/my-trips" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-[#9e8585] transition-transform hover:scale-105"
          >
            TravelEase
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[#9e8585] hover:text-[#7a6868] transition-all",
                  pathname === link.href && "font-medium underline",
                  "hover:underline underline-offset-4"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-[#DFD0D0] text-[#7a6868] hover:bg-[#c9b8b8] transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#9e8585]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 animate-in slide-in-from-top">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[#9e8585] hover:text-[#7a6868] py-2",
                    pathname === link.href && "font-medium"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="py-2 px-4 rounded-full bg-[#DFD0D0] text-[#7a6868] hover:bg-[#c9b8b8] text-center transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}