"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

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
  
        // Save to localStorage
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("email", data.user.email);
  
        // // Log from localStorage
        // console.log("LocalStorage Data:");
        // console.log("Username:", localStorage.getItem("username"));
        // console.log("Email:", localStorage.getItem("email"));
        // console.log("Token:", token);
      } catch (err) {
        console.error("Failed to fetch profile:", err.message);
        localStorage.removeItem("token");
        router.push("/login");
      }
    };
  
    fetchUser();
  }, []);
  


  if (!user) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Hello, {user.username}</h1>
      <p className="mt-2 text-gray-700">Email: {user.email}</p>
      <p className="mt-1 text-gray-500">User ID: {user._id}</p>
    </div>
  );
}
