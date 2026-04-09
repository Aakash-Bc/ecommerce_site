import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('trendz_user') || 'null'));

  const login = (userData) => {
    const u = { ...userData, id: Date.now() };
    setUser(u);
    localStorage.setItem('trendz_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trendz_user');
  };

  const signup = (userData) => {
    const u = { ...userData, id: Date.now(), createdAt: new Date().toISOString() };
    setUser(u);
    localStorage.setItem('trendz_user', JSON.stringify(u));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
