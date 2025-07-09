import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user on mount
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_BASE}/user/`, { withCredentials: true });
      if (res.data.isAuthenticated) {
        setUser({ username: res.data.username });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const res = await axios.post(
      `${API_BASE}/login/`,
      { username, password },
      { withCredentials: true }
    ); 
    if (res.data.success) {
      setUser({ username: res.data.username });
      return { success: true };
    } else {
      setUser(null);
      return { success: false, error: res.data.error };
    }
  };

  const signup = async (username, email, password) => {
    const res = await axios.post(
      `${API_BASE}/signup/`,
      { username, email, password },
      { withCredentials: true }
    );
    if (res.data.success) {
      setUser({ username: res.data.username });
      return { success: true };
    } else {
      setUser(null);
      return { success: false, error: res.data.error };
    }
  };

  const logout = async () => {
    await axios.post(`${API_BASE}/logout/`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 