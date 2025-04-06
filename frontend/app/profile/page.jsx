"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";


export default function ProfilePage() {
  // const [user, setUser] = useState(null);
  const router = useRouter();
  const { token, user } = useAuth();

  useEffect
  (() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const res = await fetch("http://localhost:8000/api/auth/profile", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!res.ok) throw new Error("Unauthorized");

  //       const data = await res.json();
  //       setUser(data.user);
  //     } catch (err) {
  //       console.error("Failed to fetch profile:", err.message);
  //       localStorage.removeItem("token");
  //       router.push("/login");
  //     }
  //   };

  //   if (!token) {
  //     router.push("/login");
  //   } else {
  //     fetchUser();
  //   }
  // }, [token, router]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       router.push("/login");
  //       return;
  //     }

  //     try {
  //       const res = await fetch("http://localhost:8000/api/auth/profile", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!res.ok) throw new Error("Unauthorized");

  //       const data = await res.json();
  //       setUser(data.user);
  //       reload();

  //       // Save to localStorage
  //       localStorage.setItem("username", data.user.username);
  //       localStorage.setItem("email", data.user.email);

  //       // ✅ Call travel plan fetch AFTER successful login
  //       reload();
  //     } catch (err) {
  //       console.error("Failed to fetch profile:", err.message);
  //       localStorage.removeItem("token");
  //       router.push("/login");
  //     }
  //   };

  //   fetchUser();
  // }, [reload, router]);

  if (!user) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Hello, {user.username}</h1>
      <p className="mt-2 text-gray-700">Email: {user.email}</p>
      <p className="mt-1 text-gray-500">User ID: {user._id}</p>

      {/* Optional debug: */}
      {/* {travelPlan && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Travel Plan Loaded ✅</h2>
          <p>Source: {travelPlan.overview?.source}</p>
          <p>Destination: {travelPlan.overview?.destination}</p>
        </div>
      )} */}
    </div>
  );
}
