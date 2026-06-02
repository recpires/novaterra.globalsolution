import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import AppLayout     from './components/AppLayout';
import NovaTerra     from './pages/NovaTerra';
import Login         from './pages/Login';
import Dashboard     from './pages/Dashboard';
import AgriSat       from './pages/AgriSat';
import SentinelAlert from './pages/SentinelAlert';
import EcoTrack      from './pages/EcoTrack';
import Assistente    from './pages/Assistente';
import Relatorios    from './pages/Relatorios';

function Loader() {
  const { C } = useTheme();
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
      <div className="flex items-center gap-3 text-sm" style={{ color: C.txt2 }}>
        <span className="w-4 h-4 rounded-full border-2 animate-spin"
          style={{ borderColor: `${C.teal}44`, borderTopColor: C.teal }} />
        Carregando NovaTerra...
      </div>
    </div>
  );
}

/* Rota protegida — exige autenticação */
function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Públicas */}
        <Route path="/"      element={<NovaTerra />} />
        <Route path="/login" element={<Login />} />

        {/* Protegidas (com sidebar) */}
        <Route path="/dashboard"  element={<Protected><Dashboard /></Protected>} />
        <Route path="/agrisat"    element={<Protected><AgriSat /></Protected>} />
        <Route path="/sentinel"   element={<Protected><SentinelAlert /></Protected>} />
        <Route path="/ecotrack"   element={<Protected><EcoTrack /></Protected>} />
        <Route path="/assistente" element={<Protected><Assistente /></Protected>} />
        <Route path="/relatorios" element={<Protected><Relatorios /></Protected>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
