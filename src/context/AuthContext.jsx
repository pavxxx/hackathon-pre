import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("sharebite_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (role) => {
    const session = { role };
    setUser(session);
    localStorage.setItem("sharebite_user", JSON.stringify(session));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sharebite_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
