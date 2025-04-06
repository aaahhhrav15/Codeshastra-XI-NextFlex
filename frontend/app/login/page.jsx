"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {setToken} = useAuth();

  const mainColor = "#DFD0D0";
  const lightColor = "#FAF1EF";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Save token to localStorage
      localStorage.setItem("token", data.token);

      console.log("Logged in successfully:", data);
      setToken(data.token); // Set token in AuthContext
      router.push("/profile"); 
    } catch (err) {
      console.error("Login error:", err.message);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: lightColor,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: mainColor,
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        className="w-full max-w-md p-8"
      >
        <div className="flex gap-4 mb-8">
          <button
            className="flex-1 py-2 rounded-lg transition-all font-medium"
            style={{
              backgroundColor: lightColor,
              color: "#2D2D2D",
            }}
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="flex-1 py-2 rounded-lg transition-all font-medium"
            style={{
              backgroundColor: "transparent",
              color: "#5A5A5A",
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            style={{ backgroundColor: lightColor }}
            className="w-full py-2 rounded-lg font-medium text-black hover:brightness-95 transition-all"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="font-medium hover:underline"
            style={{ color: "white" }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
