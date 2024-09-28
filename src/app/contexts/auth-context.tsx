"use client";

import { createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  id: string;
  googleId: string;
}

interface AuthContextProps {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const login = (user: User) => {
    setUser(user);
  };
  const logout = () => {
    setUser(undefined);
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};

export const useIsAuth = () => {
  const { user } = useAuth();
  return !!user;
};
