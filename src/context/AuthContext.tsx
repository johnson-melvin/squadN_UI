import React, { createContext, useContext, useState, useEffect } from "react";

export type User = {
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("espn_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const signIn = (user: User) => {
    setUser(user);
    localStorage.setItem("espn_user", JSON.stringify(user));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("espn_user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
