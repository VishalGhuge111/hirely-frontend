import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Load from storage */
  useEffect(() => {
    const stored = localStorage.getItem("auth");

    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setToken(parsed.token);
    }

    setLoading(false);
  }, []);

  /* ✅ FIXED LOGIN (MERGE USER) */
  const login = (data) => {

    setUser(prevUser => {

      const mergedUser = {
        ...prevUser,      // keep existing fields
        ...data.user      // override with new ones
      };

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: mergedUser,
          token: data.token
        })
      );

      return mergedUser;
    });

    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}