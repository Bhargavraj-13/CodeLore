//Connects authentication frontend with backend

import { createContext, useContext, useState } from "react";
import api from "../../lib/api.jsx";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });

      if (res.data?.success) {
        setUser(res.data.user);
        return { ok: true };
      }
      return { ok: false, message: res.data?.message || "Login failed" };
    } catch (err) {
      return {
        ok: false,
        message: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", {
        username,
        email,
        password,
      });

      if (res.data?.success) {
        setUser(res.data.user);
        return { ok: true };
      }
      return { ok: false, message: res.data?.message || "Registration failed" };
    } catch (err) {
      return {
        ok: false,
        message: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // LogOut
  const logout = async () => {
    await api.get("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext); 
}   