import { createContext, useState, useContext, type ReactNode } from "react";
import apiClient from "../lib/apiCliente";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("authToken");
  });

  const handleAuthSuccess = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const login = async (credentials: LoginCredentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    handleAuthSuccess(response.data.access_token);
  };

  const register = async (credentials: RegisterCredentials) => {
    const response = await apiClient.post("/auth/register", credentials);
    handleAuthSuccess(response.data.access_token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const value = {
    isAuthenticated: !!token,
    token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
