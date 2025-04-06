"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Mainnav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: "Plan Trip", href: "/plan-trip" },
    { name: "My Trips", href: "/my-trips" },
    { name: "Profile", href: "/profile" },
  ];

  // Check login status on mount and when localStorage changes
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkToken();

    // Listen for storage changes across tabs
    window.addEventListener("storage", checkToken);

    // Optional: detect token changes inside same tab
    const interval = setInterval(checkToken, 500);

    return () => {
      window.removeEventListener("storage", checkToken);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/");

        localStorage.setItem("logout-event", Date.now());
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
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

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-[#DFD0D0] text-[#7a6868] hover:bg-[#c9b8b8] transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-full bg-[#DFD0D0] text-[#7a6868] hover:bg-[#c9b8b8] transition-colors"
              >
                Login
              </Link>
            )}
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
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="py-2 px-4 rounded-full bg-[#DFD0D0] text-[#7a6868] hover:bg-[#c9b8b8] text-center transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="py-2 px-4 rounded-full bg-[#DFD0D0] text-[#7a6868] hover:bg-[#c9b8b8] text-center transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
