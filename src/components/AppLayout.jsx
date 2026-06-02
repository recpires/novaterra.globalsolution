import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Satellite, LayoutDashboard, Leaf, ShieldAlert, TreePine,
  Brain, FileText, Settings, LogOut, Bell, User, Menu, X,
  ChevronRight, Sun, Moon,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV = [
  { path: '/dashboard',  label: 'Dashboard',     Icon: LayoutDashboard, color: '#2196F3' },
  { path: '/agrisat',    label: 'AgriSat',        Icon: Leaf,            color: '#00D4AA' },
  { path: '/sentinel',   label: 'SentinelAlert',  Icon: ShieldAlert,     color: '#F4A261' },
  { path: '/ecotrack',   label: 'EcoTrack',       Icon: TreePine,        color: '#43A047' },
  { path: '/assistente', label: 'Assistente IA',  Icon: Brain,           color: '#7B2FBE' },
  { path: '/relatorios', label: 'Relatórios',     Icon: FileText,        color: '#8B9DC3' },
];

const PAGE_TITLES = {
  '/dashboard':  'Dashboard',
  '/agrisat':    'AgriSat — Monitoramento Agrícola',
  '/sentinel':   'SentinelAlert — Monitoramento de Riscos',
  '/ecotrack':   'EcoTrack — Rastreamento Ambiental',
  '/assistente': 'Nova — Assistente Inteligente',
  '/relatorios': 'Relatórios',
};

function Sidebar({ open, onClose }) {
  const { C } = useTheme();
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-30 md:hidden"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{ width: 240, background: C.card, borderRight: `1px solid ${C.border}`, boxShadow: C.shadow }}>

        <div className="h-16 flex items-center gap-2.5 px-5"
          style={{ borderBottom: `1px solid ${C.border}` }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: C.teal }}>
            <Satellite size={16} color="#0D1117" strokeWidth={2.5} />
          </div>
          <span className="font-black text-xl tracking-tight"
            style={{ fontFamily: 'Outfit, sans-serif', color: C.txt }}>
            Nova<span style={{ color: C.teal }}>Terra</span>
          </span>
          <button className="ml-auto md:hidden" onClick={onClose}>
            <X size={18} color={C.txt2} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ path, label, Icon, color }) => (
            <NavLink key={path} to={path} onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={({ isActive }) => ({
                background: isActive ? `${color}18` : 'transparent',
                color: isActive ? color : C.txt2,
                borderLeft: isActive ? `3px solid ${color}` : '3px solid transparent',
              })}>
              {({ isActive }) => (
                <>
                  <Icon size={17} color={isActive ? color : C.txt2} />
                  <span>{label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto" color={color} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-5 space-y-0.5" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ color: C.txt2 }}
            onMouseEnter={e => e.currentTarget.style.background = `${C.border}66`}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <Settings size={17} /> Configurações
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ color: '#E53935' }}
            onMouseEnter={e => e.currentTarget.style.background = '#E5393514'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <LogOut size={17} /> Sair
          </button>
        </div>

        <div className="px-5 pb-4 text-xs" style={{ color: `${C.txt2}66` }}>
          NovaTerra v1.0 · FIAP 2026
        </div>
      </aside>
    </>
  );
}

function Header({ onMenuClick }) {
  const { pathname } = useLocation();
  const { C, isDark, toggle } = useTheme();
  const title = PAGE_TITLES[pathname] || 'NovaTerra';

  return (
    <header className="h-16 flex items-center px-5 gap-4"
      style={{ borderBottom: `1px solid ${C.border}`, background: C.card, boxShadow: C.shadow }}>
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu size={20} color={C.txt2} />
      </button>

      <div className="flex-1">
        <h1 className="font-bold text-base" style={{ fontFamily: 'Outfit, sans-serif', color: C.txt }}>
          {title}
        </h1>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.teal }} />
          <span className="text-xs" style={{ color: C.txt2 }}>
            Dados satelitais · última atualização: agora
          </span>
        </div>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="p-2 rounded-xl transition-all"
        title={isDark ? 'Modo claro' : 'Modo escuro'}
        style={{ background: `${C.teal}18`, border: `1px solid ${C.teal}33` }}
        onMouseEnter={e => e.currentTarget.style.background = `${C.teal}28`}
        onMouseLeave={e => e.currentTarget.style.background = `${C.teal}18`}>
        {isDark
          ? <Sun size={17} color={C.teal} />
          : <Moon size={17} color={C.teal} />}
      </button>

      {/* Notification bell */}
      <button className="relative p-2 rounded-xl transition-all"
        style={{ color: C.txt2 }}>
        <Bell size={18} color={C.txt2} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#E53935' }} />
      </button>

      {/* User */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer transition-all"
        style={{ border: `1px solid ${C.border}` }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: `${C.teal}22`, border: `1px solid ${C.teal}44` }}>
          <User size={14} color={C.teal} />
        </div>
        <span className="text-sm font-semibold hidden sm:block" style={{ color: C.txt }}>Rodrigo</span>
      </div>
    </header>
  );
}

export default function AppLayout({ children }) {
  const { C } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: C.bg }}>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex-1 flex flex-col md:ml-[240px] overflow-hidden">
        <Header onMenuClick={() => setMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-5 md:p-6" style={{ background: C.bg }}>
          {children}
        </main>
      </div>
    </div>
  );
}
