import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loginRequest, registerRequest, verifyToken } from '../api/auth';

const TOKEN_KEY = 'token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authView, setAuthView] = useState('login');

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setAuthView('login');
  }, []);

  const completeAuth = useCallback((token, email) => {
    localStorage.setItem(TOKEN_KEY, token);
    setUser({ email });
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await loginRequest(email, password);
    completeAuth(data.token, email);
    return data;
  }, [completeAuth]);

  const register = useCallback(async (email, password, confirmPassword) => {
    const data = await registerRequest(email, password, confirmPassword);
    completeAuth(data.token, email);
    return data;
  }, [completeAuth]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    verifyToken(token)
      .then((data) => {
        setUser({ email: data.email });
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      authView,
      setAuthView,
      login,
      register,
      logout,
    }),
    [user, loading, authView, login, register, logout, setAuthView],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
