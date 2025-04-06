import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Set initial token from localStorage only in the browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:8000/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        console.log("Fetching User");
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch profile:", err.message);
        if (typeof window !== 'undefined') {
          localStorage.removeItem("token");
        }
        setToken(null);
        router.push("/login");
      }
    }

    if (token) {
      fetchUser();
    }
  }, [token, router]);

  return (
    <AuthContext.Provider value={{ token, user, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
