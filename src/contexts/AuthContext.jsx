import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { fazerLogin } from "../services/authService.js";
import { getAuthToken, setAuthToken } from "../services/api.js";

const AuthContext = createContext(null);

function extrairToken(resposta) {
  return (
    resposta?.accessToken ||
    resposta?.token ||
    resposta?.jwt ||
    resposta?.data?.accessToken ||
    resposta?.data?.token ||
    resposta?.data?.jwt ||
    null
  );
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getAuthToken()));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const resposta = await fazerLogin(email, password);
      const token = extrairToken(resposta);

      // Aceita tanto JWT retornado no JSON quanto sessão por cookie HttpOnly.
      if (token) setAuthToken(token);
      setUser({
        id: resposta?.user?.id ?? resposta?.data?.user?.id ?? null,
        nome: resposta?.user?.nome ?? resposta?.user?.name ?? null,
        email: resposta?.user?.email ?? resposta?.data?.user?.email ?? email,
      });
      setIsAuthenticated(true);
      return resposta;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, user, loading, login, logout }),
    [isAuthenticated, user, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider.");
  }
  return context;
}
