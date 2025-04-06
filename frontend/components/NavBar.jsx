"use client";
import { useState, useEffect } from "react";
import { AlignLeft, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { ThemeToggle } from "./ThemeToggle";
import Notification from "./Notification";
import useSliderToggler from "@/store/slider-toggle";

const NavBar = () => {
  const { isOpen, setIsOpen } = useSliderToggler();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setMounted(true);
    const handleKeyPress = (event) => {
      if (event.key === "/" && event.ctrlKey) {
        console.log("Ctrl + / pressed");
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        router.push("/login");
        return;
      }
  
      try {
        const res = await fetch("http://localhost:8000/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) throw new Error("Unauthorized");
  
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("email", data.user.email);
      } catch (err) {
        console.error("Failed to fetch profile:", err.message);
        localStorage.removeItem("token");
        router.push("/login");
      }
    };
  
    fetchUser();
  }, [router]);

  const handleSearch = () => {
    // Implement your search functionality
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <nav className="px-0 md:px-5 bg-themeforeground overflow-hidden shadow-lg flex items-center justify-between mt-2 mb-4 rounded-md h-[64px] w-full max-w-[calc(1440px-3rem)]">
      <div className="flex items-center gap-x-1">
        <button 
          className="block rounded-full p-2 hover:bg-themebackground"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AlignLeft className="cursor-pointer" />
        </button>
        <button 
          className="rounded-full p-2 hover:bg-themebackground"
          onClick={handleSearch}
        >
        </button>
        <span
          className="text-textlight cursor-pointer hidden md:block"
          style={{ color: "rgb(177, 185, 193)" }}
        >

        </span>
      </div>
      
      <div className="flex items-center gap-x-1">
        <Notification />
        <ThemeToggle />
        <ModeToggle />
        
        {user ? (
          <div className="relative group">
            <button className="p-2 hover:bg-themebackground rounded-full">
              <User className="h-5 w-5" />
            </button>
            <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-[200px]">
              <div className="p-2 text-sm">
                <p>Welcome, {user.username}</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 hover:bg-gray-100 rounded-md text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button 
            className="p-2 hover:bg-themebackground rounded-full"
            onClick={() => router.push("/login")}
          >
            <User className="h-5 w-5" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;