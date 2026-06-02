import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Loader, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { RELATORIOS } from '../data/mock';

const MOD_COLOR = {
  AgriSat:       '#00D4AA',
  SentinelAlert: '#F4A261',
  EcoTrack:      '#43A047',
  Geral:         '#2196F3',
};

const fadeUp = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function Relatorios() {
  const { C } = useTheme();
  const [search, setSearch] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const modulos = ['Todos', 'AgriSat', 'SentinelAlert', 'EcoTrack', 'Geral'];

  const filtered = RELATORIOS.filter(r => {
    const matchSearch = r.titulo.toLowerCase().includes(search.toLowerCase());
    const matchMod    = filtro === 'Todos' || r.modulo === filtro;
    return matchSearch && matchMod;
  });

  const summaries = [
    { label: 'Total gerados',  value: RELATORIOS.filter(r => r.status === 'pronto').length, color: C.blue   },
    { label: 'AgriSat',        value: RELATORIOS.filter(r => r.modulo === 'AgriSat').length, color: MOD_COLOR.AgriSat },
    { label: 'SentinelAlert',  value: RELATORIOS.filter(r => r.modulo === 'SentinelAlert').length, color: MOD_COLOR.SentinelAlert },
    { label: 'EcoTrack',       value: RELATORIOS.filter(r => r.modulo === 'EcoTrack').length, color: MOD_COLOR.EcoTrack },
  ];

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaries.map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} custom={i} className="p-4 rounded-2xl"
            style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
            <div className="font-black text-3xl mb-1" style={{ fontFamily: 'Outfit, sans-serif', color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: C.txt2 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} custom={4} className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={14} color={C.txt2} className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar relatório..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: C.card, border: `1px solid ${C.border}`, color: C.txt, boxShadow: C.shadow }}
            onFocus={e => e.target.style.borderColor = C.teal}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {modulos.map(m => {
            const mc = MOD_COLOR[m] || C.txt2;
            return (
              <button key={m} onClick={() => setFiltro(m)}
                className="px-3 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: filtro === m ? `${mc}22` : C.card,
                  color: filtro === m ? mc : C.txt2,
                  border: `1px solid ${filtro === m ? mc + '44' : C.border}`,
                  boxShadow: C.shadow,
                }}>
                {m}
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.div className="rounded-2xl overflow-hidden"
        style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
        <div className="grid grid-cols-12 gap-3 px-5 py-3 text-xs font-bold uppercase tracking-wider"
          style={{ background: C.sidebar, color: C.txt2, borderBottom: `1px solid ${C.border}` }}>
          <div className="col-span-6">Relatório</div>
          <div className="col-span-2">Módulo</div>
          <div className="col-span-2">Data</div>
          <div className="col-span-1">Tamanho</div>
          <div className="col-span-1 text-center">Ação</div>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center" style={{ color: C.txt2 }}>Nenhum relatório encontrado.</div>
        )}

        {filtered.map((r, i) => {
          const mc = MOD_COLOR[r.modulo] || C.txt2;
          return (
            <motion.div key={r.id} variants={fadeUp} custom={i}
              className="grid grid-cols-12 gap-3 px-5 py-4 items-center border-t transition-all"
              style={{ borderColor: C.border }}
              onMouseEnter={e => e.currentTarget.style.background = `${C.border}33`}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div className="col-span-6 flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${mc}18`, border: `1px solid ${mc}33` }}>
                  <FileText size={14} color={mc} />
                </div>
                <div className="text-sm font-semibold truncate" style={{ color: C.txt }}>{r.titulo}</div>
              </div>
              <div className="col-span-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${mc}18`, color: mc }}>{r.modulo}</span>
              </div>
              <div className="col-span-2 text-xs" style={{ color: C.txt2 }}>{r.data}</div>
              <div className="col-span-1 text-xs" style={{ color: C.txt2 }}>{r.tamanho}</div>
              <div className="col-span-1 flex justify-center">
                {r.status === 'pronto' ? (
                  <button className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${mc}18`, border: `1px solid ${mc}33` }}>
                    <Download size={14} color={mc} />
                  </button>
                ) : (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${C.yellow}18`, border: `1px solid ${C.yellow}33` }}>
                    <Loader size={14} color={C.yellow} className="animate-spin" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div variants={fadeUp} custom={10}
        className="p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4"
        style={{ background: C.sidebar, border: `1px dashed ${C.border}` }}>
        <div>
          <div className="font-bold text-sm mb-1" style={{ color: C.txt }}>Gerar novo relatório</div>
          <div className="text-xs" style={{ color: C.txt2 }}>
            Relatórios gerados automaticamente a cada ciclo orbital (~90 min) ou sob demanda.
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
          style={{ background: C.teal, color: '#0D1117' }}>
          <FileText size={15} /> Gerar Relatório
        </button>
      </motion.div>
    </motion.div>
  );
}
