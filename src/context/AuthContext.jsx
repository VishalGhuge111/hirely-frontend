import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("auth");

    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setToken(parsed.token);
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setUser(data.user);
    setToken(data.token);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    setToken(null);
  };

  // PROFILE UPDATE
  const updateUser = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setUser(data.user);
    setToken(data.token);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}