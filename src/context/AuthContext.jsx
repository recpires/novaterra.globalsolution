import React, { createContext, useContext, useState } from 'react';

/* Credenciais de demonstração (protótipo acadêmico — sem backend real) */
export const DEMO_CREDENTIALS = {
  email: 'admin@novaterra.com',
  senha: 'nova2026',
  nome:  'Rodrigo',
};

const STORAGE_KEY = 'novaterra_auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = (email, senha) => {
    const ok = email.trim().toLowerCase() === DEMO_CREDENTIALS.email && senha === DEMO_CREDENTIALS.senha;
    if (ok) {
      const u = { nome: DEMO_CREDENTIALS.nome, email: DEMO_CREDENTIALS.email };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      setUser(u);
    }
    return ok;
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
