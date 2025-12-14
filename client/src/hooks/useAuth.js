import { useState } from 'react';
import api from '../lib/api.js';

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login({ email, password }) {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/api/auth/login', { email, password });

      if (res.data?.success) {
        setUser(res.data.user);
        return { ok: true };
      }

      const message = res.data?.message || 'Login failed';
      setError(message);
      return { ok: false, message };
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to sign in. Please try again.';

      setError(message);
      return { ok: false, message };
    } finally {
      setLoading(false);
    }
  }

  async function register({ username, email, password }) {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/api/auth/register', {
        username,
        email,
        password,
      });

      if (res.data?.success) {
        setUser(res.data.user);
        return { ok: true };
      }

      const message = res.data?.message || 'Registration failed';
      setError(message);
      return { ok: false, message };
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to create account. Please try again.';

      setError(message);
      return { ok: false, message };
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await api.get('/api/auth/logout');
      setUser(null);
      return { ok: true };
    } catch {
      return { ok: false, message: 'Logout failed' };
    } finally {
      setLoading(false);
    }
  }

  return { user, loading, error, login, register, logout };
}

export default useAuth;
