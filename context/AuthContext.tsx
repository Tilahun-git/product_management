'use client'

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type User = { id: number; name: string; email: string };
type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const isLoggedIn = !!user;

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setUser(data.user); // set logged-in user
      toast.success("Logged in successfully");
      router.push("/products");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      toast.success("Account created successfully, please login");
      router.push("/auth/login"); // redirect to login instead of auto-login
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for convenience
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
