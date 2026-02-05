// Connects authentication frontend with backend

import { createContext, useContext, useState, useEffect } from "react";
import api from "../../lib/api.jsx";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await api.get("/api/auth/me");
        if (res.data?.success) {
          setUser(res.data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  // Login
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });

      if (res.data?.success) {
        setUser(res.data.user);
        return { ok: true };
      }
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
    } catch (err) {
      return {
        ok: false,
        message: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    await api.get("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };