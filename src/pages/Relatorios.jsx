import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Loader, Search, Filter } from 'lucide-react';
import { C } from '../theme';
import { RELATORIOS } from '../data/mock';

const MOD_COLOR = {
  AgriSat:       C.teal,
  SentinelAlert: C.orange,
  EcoTrack:      C.green,
  Geral:         C.blue,
};

const fadeUp = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function Relatorios() {
  const [search, setSearch] = useState('');
  const [filtro, setFiltro] = useState('Todos');

  const modulos = ['Todos', 'AgriSat', 'SentinelAlert', 'EcoTrack', 'Geral'];

  const filtered = RELATORIOS.filter(r => {
    const matchSearch = r.titulo.toLowerCase().includes(search.toLowerCase());
    const matchMod    = filtro === 'Todos' || r.modulo === filtro;
    return matchSearch && matchMod;
  });

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total gerados', value: RELATORIOS.filter(r => r.status === 'pronto').length, color: C.blue },
          { label: 'AgriSat',       value: RELATORIOS.filter(r => r.modulo === 'AgriSat').length, color: C.teal },
          { label: 'SentinelAlert', value: RELATORIOS.filter(r => r.modulo === 'SentinelAlert').length, color: C.orange },
          { label: 'EcoTrack',      value: RELATORIOS.filter(r => r.modulo === 'EcoTrack').length, color: C.green },
        ].map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} custom={i}
            className="p-4 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <div className="font-black text-3xl mb-1" style={{ fontFamily: 'Outfit, sans-serif', color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: C.txt2 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div variants={fadeUp} custom={4} className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={14} color={C.txt2} className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar relatório..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: C.card, border: `1px solid ${C.border}`, color: C.txt }}
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
                }}>
                {m}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Reports list */}
      <motion.div className="rounded-2xl overflow-hidden"
        style={{ background: C.card, border: `1px solid ${C.border}` }}>
        {/* Header */}
        <div className="grid grid-cols-12 gap-3 px-5 py-3 text-xs font-bold uppercase tracking-wider"
          style={{ background: C.sidebar, color: C.txt2, borderBottom: `1px solid ${C.border}` }}>
          <div className="col-span-6">Relatório</div>
          <div className="col-span-2">Módulo</div>
          <div className="col-span-2">Data</div>
          <div className="col-span-1">Tamanho</div>
          <div className="col-span-1 text-center">Ação</div>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center" style={{ color: C.txt2 }}>
            Nenhum relatório encontrado.
          </div>
        )}

        {filtered.map((r, i) => {
          const mc = MOD_COLOR[r.modulo] || C.txt2;
          return (
            <motion.div key={r.id} variants={fadeUp} custom={i}
              className="grid grid-cols-12 gap-3 px-5 py-4 items-center border-t transition-all hover:bg-white/5"
              style={{ borderColor: C.border }}>
              {/* Title */}
              <div className="col-span-6 flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${mc}18`, border: `1px solid ${mc}33` }}>
                  <FileText size={14} color={mc} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: C.txt }}>{r.titulo}</div>
                </div>
              </div>

              {/* Module */}
              <div className="col-span-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${mc}18`, color: mc }}>{r.modulo}</span>
              </div>

              {/* Date */}
              <div className="col-span-2 text-xs" style={{ color: C.txt2 }}>{r.data}</div>

              {/* Size */}
              <div className="col-span-1 text-xs" style={{ color: C.txt2 }}>{r.tamanho}</div>

              {/* Action */}
              <div className="col-span-1 flex justify-center">
                {r.status === 'pronto' ? (
                  <button className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:brightness-110"
                    style={{ background: `${mc}18`, border: `1px solid ${mc}33` }}
                    title="Baixar PDF">
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

      {/* Generate new */}
      <motion.div variants={fadeUp} custom={10}
        className="p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4"
        style={{ background: C.sidebar, border: `1px dashed ${C.border}` }}>
        <div>
          <div className="font-bold text-sm mb-1" style={{ color: C.txt }}>Gerar novo relatório</div>
          <div className="text-xs" style={{ color: C.txt2 }}>
            Relatórios são gerados automaticamente a cada ciclo orbital (~90 min) ou sob demanda.
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:brightness-110"
          style={{ background: C.teal, color: '#0D1117' }}>
          <FileText size={15} /> Gerar Relatório
        </button>
      </motion.div>
    </motion.div>
  );
}
