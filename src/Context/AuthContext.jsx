import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores { token, userId }
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔄 Check localStorage for token on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          token,
          userId: decoded.id || decoded.userId || decoded.sub,
          email: decoded.email,
          role: decoded.role,
        });
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }
  }, []);

  // 🔐 Login and store token + decoded user
  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem("token", token);

      setUser({
        token,
        userId: decoded.id || decoded.userId || decoded.sub,
        email: decoded.email,
        role: decoded.role,
      });
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Failed to decode token during login:", err);
    }
  };

  // 🚪 Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

