import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { C } from './theme';

import AppLayout     from './components/AppLayout';
import NovaTerra     from './pages/NovaTerra';
import Dashboard     from './pages/Dashboard';
import AgriSat       from './pages/AgriSat';
import SentinelAlert from './pages/SentinelAlert';
import EcoTrack      from './pages/EcoTrack';
import Assistente    from './pages/Assistente';
import Relatorios    from './pages/Relatorios';

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: C.txt2 }}>
      <span className="w-4 h-4 rounded-full border-2 animate-spin"
        style={{ borderColor: `${C.teal}44`, borderTopColor: C.teal }} />
      Carregando NovaTerra...
    </div>
  </div>
);

function AppPage({ children }) {
  return <AppLayout>{children}</AppLayout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Landing page — standalone, sem sidebar */}
          <Route path="/"           element={<NovaTerra />} />

          {/* Sistema — com sidebar */}
          <Route path="/dashboard"  element={<AppPage><Dashboard /></AppPage>} />
          <Route path="/agrisat"    element={<AppPage><AgriSat /></AppPage>} />
          <Route path="/sentinel"   element={<AppPage><SentinelAlert /></AppPage>} />
          <Route path="/ecotrack"   element={<AppPage><EcoTrack /></AppPage>} />
          <Route path="/assistente" element={<AppPage><Assistente /></AppPage>} />
          <Route path="/relatorios" element={<AppPage><Relatorios /></AppPage>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
