import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Flame, Droplets, Wind, AlertTriangle, Clock, MapPin, X } from 'lucide-react';
import { SEV_COLOR, SEV_LABEL } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { ALERTAS } from '../data/mock';
import { RiskGauge } from '../components/Charts';

const TIPOS = ['TODOS', 'QUEIMADA', 'ENCHENTE', 'DESLIZAMENTO', 'SECA', 'GRANIZO'];
const TIPO_ICON  = { QUEIMADA: Flame, ENCHENTE: Droplets, DESLIZAMENTO: Wind, SECA: AlertTriangle, GRANIZO: Wind, TODOS: ShieldAlert };
const TIPO_COLOR = { QUEIMADA: '#E53935', ENCHENTE: '#2196F3', DESLIZAMENTO: '#F4A261', SECA: '#FFC107', GRANIZO: '#00D4AA' };

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

function elapsed(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (diff < 60) return `${diff}min atrás`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h atrás`;
  return `${Math.floor(diff / 1440)}d atrás`;
}

function DetailPanel({ a, onClose }) {
  const { C } = useTheme();
  const color = SEV_COLOR[a.severidade];
  const Icon  = TIPO_ICON[a.tipo] || AlertTriangle;
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3 }}
      className="fixed right-0 top-16 bottom-0 z-20 overflow-y-auto w-80 shadow-2xl"
      style={{ background: C.card, borderLeft: `1px solid ${C.border}` }}>
      <div className="p-5 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <div className="font-bold" style={{ color: C.txt }}>{a.tipo}</div>
              <div className="text-xs" style={{ color: C.txt2 }}>{elapsed(a.criado_em)}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg transition-all"
            style={{ color: C.txt2 }}
            onMouseEnter={e => e.currentTarget.style.background = `${C.border}66`}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <X size={16} />
          </button>
        </div>

        <div className="p-4 rounded-xl flex items-center justify-between"
          style={{ background: `${color}14`, border: `1px solid ${color}33` }}>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color }}>Severidade</div>
            <div className="font-black text-xl" style={{ fontFamily: 'Outfit, sans-serif', color }}>{SEV_LABEL[a.severidade]}</div>
          </div>
          <RiskGauge value={a.risco} />
        </div>

        <div className="space-y-3">
          {[
            { icon: MapPin,        label: 'Município',       val: a.municipio },
            { icon: AlertTriangle, label: 'Área afetada',    val: `${a.area_km2} km²` },
            ...(a.focos ? [{ icon: Flame, label: 'Focos de calor', val: `${a.focos} focos (NASA MODIS)` }] : []),
            { icon: Clock,         label: 'Detectado',       val: new Date(a.criado_em).toLocaleString('pt-BR') },
          ].map(r => (
            <div key={r.label} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: C.sidebar }}>
              <r.icon size={14} color={C.txt2} className="mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs" style={{ color: C.txt2 }}>{r.label}</div>
                <div className="text-sm font-semibold" style={{ color: C.txt }}>{r.val}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2">
          <button className="w-full py-2.5 rounded-xl font-bold text-sm" style={{ background: color, color: '#0D1117' }}>
            Acionar Defesa Civil
          </button>
          <button className="w-full py-2.5 rounded-xl font-bold text-sm border"
            style={{ borderColor: C.border, color: C.txt2 }}>
            Gerar Relatório
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AlertCard({ a, selected, onClick, i }) {
  const { C } = useTheme();
  const color = SEV_COLOR[a.severidade];
  const TIcon = TIPO_ICON[a.tipo] || AlertTriangle;
  return (
    <motion.div variants={fadeUp} custom={i} onClick={onClick}
      className="p-4 rounded-xl cursor-pointer transition-all"
      style={{ background: selected ? `${color}14` : C.card, border: `1px solid ${selected ? color : C.border}`, boxShadow: C.shadow }}>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
          <TIcon size={17} color={color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm" style={{ color }}>{a.tipo}</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color }}>
              {SEV_LABEL[a.severidade]}
            </span>
            <span className="text-xs ml-auto" style={{ color: `${C.txt2}88` }}>{elapsed(a.criado_em)}</span>
          </div>
          <div className="text-sm mt-0.5 truncate" style={{ color: C.txt }}>{a.regiao}</div>
          <div className="flex items-center gap-3 mt-1.5 text-xs" style={{ color: C.txt2 }}>
            <span className="flex items-center gap-1"><MapPin size={10} /> {a.area_km2} km²</span>
            <span>Risco: <strong style={{ color }}>{a.risco}/100</strong></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AlertMap({ alertas }) {
  const { C } = useTheme();
  return (
    <div className="relative rounded-2xl overflow-hidden" style={{
      height: 320, backgroundColor: C.bg, border: `1px solid ${C.border}`,
      backgroundImage: `linear-gradient(${C.blue}06 1px, transparent 1px), linear-gradient(90deg, ${C.blue}06 1px, transparent 1px)`,
      backgroundSize: '20px 20px',
    }}>
      <div className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
        style={{ background: `${C.orange}18`, color: C.orange, border: `1px solid ${C.orange}33` }}>
        {alertas.length} alertas ativos
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <span className="font-black text-[8rem]" style={{ color: C.blue }}>BR</span>
      </div>
      {alertas.map(a => {
        const color = SEV_COLOR[a.severidade];
        return (
          <div key={a.id} className="absolute" style={{ left: `${a.mapX}%`, top: `${a.mapY}%`, transform: 'translate(-50%,-50%)' }}>
            <motion.div className="absolute rounded-full"
              style={{ width: 20, height: 20, background: color, opacity: 0.2, left: -4, top: -4 }}
              animate={{ scale: [1, 2.5, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: a.id * 0.25 }} />
            <div className="w-3.5 h-3.5 rounded-full relative z-10"
              style={{ background: color, boxShadow: `0 0 10px ${color}88` }} />
          </div>
        );
      })}
      <div className="absolute bottom-3 right-3 p-2.5 rounded-xl text-xs space-y-1.5"
        style={{ background: `${C.card}ee`, border: `1px solid ${C.border}` }}>
        {Object.entries(SEV_COLOR).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5" style={{ color: C.txt2 }}>
            <div className="w-2 h-2 rounded-full" style={{ background: v }} />
            {SEV_LABEL[k]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SentinelAlert() {
  const { C } = useTheme();
  const [filtro, setFiltro] = useState('TODOS');
  const [sel, setSel]       = useState(null);
  const filtered = filtro === 'TODOS' ? ALERTAS : ALERTAS.filter(a => a.tipo === filtro);
  const active   = ALERTAS.filter(a => a.status === 'ativo');
  const counts   = {
    CRITICO: ALERTAS.filter(a => a.severidade === 'CRITICO').length,
    ALTO:    ALERTAS.filter(a => a.severidade === 'ALTO').length,
    MEDIO:   ALERTAS.filter(a => a.severidade === 'MEDIO').length,
  };

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(counts).map(([sev, n]) => (
          <motion.div key={sev} variants={fadeUp} className="p-4 rounded-xl flex items-center gap-3"
            style={{ background: C.card, border: `1px solid ${SEV_COLOR[sev]}44`, boxShadow: C.shadow }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: SEV_COLOR[sev] }} />
            <div>
              <div className="font-black text-2xl" style={{ fontFamily: 'Outfit, sans-serif', color: SEV_COLOR[sev] }}>{n}</div>
              <div className="text-xs" style={{ color: C.txt2 }}>{SEV_LABEL[sev]}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div variants={fadeUp} custom={1}>
          <h2 className="font-bold text-sm mb-3" style={{ color: C.txt }}>Mapa de Alertas Ativos</h2>
          <AlertMap alertas={active} />
        </motion.div>

        <div>
          <div className="flex gap-1.5 mb-4 flex-wrap">
            {TIPOS.map(t => {
              const TIcon = TIPO_ICON[t];
              const tc    = TIPO_COLOR[t] || C.txt2;
              return (
                <button key={t} onClick={() => setFiltro(t)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background: filtro === t ? `${tc}22` : C.card,
                    color: filtro === t ? tc : C.txt2,
                    border: `1px solid ${filtro === t ? tc + '55' : C.border}`,
                    boxShadow: C.shadow,
                  }}>
                  <TIcon size={12} />
                  {t === 'TODOS' ? 'Todos' : t}
                </button>
              );
            })}
          </div>

          <motion.div className="space-y-2.5 overflow-y-auto" style={{ maxHeight: 340 }}
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
            <AnimatePresence>
              {filtered.map((a, i) => (
                <AlertCard key={a.id} a={a} i={i}
                  selected={sel?.id === a.id}
                  onClick={() => setSel(sel?.id === a.id ? null : a)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {sel && <DetailPanel a={sel} onClose={() => setSel(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
