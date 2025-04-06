import React, { useContext, useEffect, useState } from 'react'

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);

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
              localStorage.removeItem("token");
              router.push("/login");
            }
        };

        if(token) {
            fetchUser();
        }
    }, [token]);
  
    return (
        <AuthContext.Provider value={{token, user, setToken}}>
        {children}
        </AuthContext.Provider>  
    )
};