import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Bell, Flame, Leaf, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { SEV_COLOR } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { ALERTAS, ALERTAS_30D, ALERTAS_REGIAO, MODULO_DIST } from '../data/mock';
import { LineChart, BarChart, DonutChart } from '../components/Charts';

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' } }),
};

function KpiCard({ icon: Icon, label, value, color, trend, i }) {
  const { C } = useTheme();
  return (
    <motion.div variants={fadeUp} custom={i} className="p-5 rounded-2xl"
      style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
          <Icon size={19} color={color} />
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: trend >= 0 ? C.red : C.green }}>
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="font-black text-3xl mb-1" style={{ fontFamily: 'Outfit, sans-serif', color }}>{value}</div>
      <div className="text-sm" style={{ color: C.txt2 }}>{label}</div>
    </motion.div>
  );
}

function BrazilMap() {
  const { C } = useTheme();
  const activeAlerts = ALERTAS.filter(a => a.status === 'ativo');
  return (
    <div className="relative rounded-2xl overflow-hidden" style={{
      height: 280,
      backgroundColor: C.bg,
      border: `1px solid ${C.border}`,
      boxShadow: C.shadow,
      backgroundImage: `
        linear-gradient(${C.blue}08 1px, transparent 1px),
        linear-gradient(90deg, ${C.blue}08 1px, transparent 1px)
      `,
      backgroundSize: '24px 24px',
    }}>
      <div className="absolute top-3 left-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: `${C.blue}18`, color: C.blue, border: `1px solid ${C.blue}33` }}>
          🗺 Brasil — 5.570 municípios monitorados
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <span className="font-black text-[10rem]" style={{ color: C.teal }}>BR</span>
      </div>
      {activeAlerts.map(m => {
        const color = SEV_COLOR[m.severidade];
        return (
          <motion.div key={m.id} className="absolute"
            style={{ left: `${m.mapX}%`, top: `${m.mapY}%`, transform: 'translate(-50%,-50%)' }}>
            <motion.div className="absolute rounded-full"
              style={{ width: 20, height: 20, background: color, opacity: 0.25, left: -4, top: -4 }}
              animate={{ scale: [1, 2.5, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 2, repeat: Infinity, delay: m.id * 0.3 }} />
            <div className="w-3.5 h-3.5 rounded-full relative z-10"
              style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded font-semibold whitespace-nowrap"
              style={{ background: C.card, color, border: `1px solid ${color}33` }}>
              {m.tipo}
            </div>
          </motion.div>
        );
      })}
      <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
        {[{ l: 'Crítico', c: SEV_COLOR.CRITICO }, { l: 'Alto', c: SEV_COLOR.ALTO }, { l: 'Médio', c: SEV_COLOR.MEDIO }].map(x => (
          <div key={x.l} className="flex items-center gap-1.5 text-xs" style={{ color: C.txt2 }}>
            <div className="w-2 h-2 rounded-full" style={{ background: x.c }} /> {x.l}
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertRow({ a, i }) {
  const { C } = useTheme();
  const color = SEV_COLOR[a.severidade];
  const diff  = Math.floor((Date.now() - new Date(a.criado_em)) / 60000);
  const elapsed = diff < 60 ? `${diff}min` : `${Math.floor(diff / 60)}h`;
  return (
    <motion.div variants={fadeUp} custom={i}
      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
      style={{ borderLeft: `3px solid ${color}` }}
      onMouseEnter={e => e.currentTarget.style.background = `${C.border}44`}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold" style={{ color }}>{a.tipo}</span>
          <span className="text-xs" style={{ color: `${C.txt2}88` }}>{elapsed}</span>
        </div>
        <div className="text-xs truncate mt-0.5" style={{ color: C.txt2 }}>{a.regiao}</div>
      </div>
      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
        style={{ background: `${color}18`, color }}>
        {a.severidade === 'CRITICO' ? 'Crítico' : a.severidade === 'ALTO' ? 'Alto' : 'Médio'}
      </span>
    </motion.div>
  );
}

export default function Dashboard() {
  const { C } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const kpis = [
    { icon: MapPin, label: 'Áreas Monitoradas', value: '247',  color: C.blue,   trend: 12 },
    { icon: Bell,   label: 'Alertas Ativos',    value: '12',   color: C.orange, trend: 8  },
    { icon: Flame,  label: 'Queimadas (24h)',   value: '8',    color: C.red,    trend: 33 },
    { icon: Leaf,   label: 'Cobertura Vegetal', value: '73%',  color: C.green,  trend: -2 },
  ];

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => <KpiCard key={k.label} {...k} i={i} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div variants={fadeUp} custom={4} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm" style={{ color: C.txt }}>Mapa de Alertas em Tempo Real</h2>
            <Link to="/sentinel" className="text-xs font-semibold flex items-center gap-1" style={{ color: C.teal }}>
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <BrazilMap />
        </motion.div>

        <motion.div variants={fadeUp} custom={5}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm" style={{ color: C.txt }}>Alertas Recentes</h2>
            <Link to="/sentinel" className="text-xs font-semibold" style={{ color: C.teal }}>Ver todos</Link>
          </div>
          <div className="rounded-2xl p-3 space-y-1"
            style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow, maxHeight: 280, overflowY: 'auto' }}>
            {ALERTAS.slice(0, 6).map((a, i) => <AlertRow key={a.id} a={a} i={i} />)}
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <motion.div variants={fadeUp} custom={6} className="md:col-span-2 p-5 rounded-2xl"
          style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm" style={{ color: C.txt }}>Alertas nos últimos 30 dias</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${C.red}18`, color: C.red }}>
              Total: {ALERTAS_30D.reduce((s, v) => s + v, 0)}
            </span>
          </div>
          <LineChart data={ALERTAS_30D} color={C.orange} height={80} />
          <div className="flex justify-between mt-2 text-xs" style={{ color: `${C.txt2}88` }}>
            <span>Maio 1</span><span>Maio 15</span><span>Jun 1</span>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={7} className="p-5 rounded-2xl"
          style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          <h2 className="font-bold text-sm mb-4" style={{ color: C.txt }}>Distribuição por Módulo</h2>
          <div className="flex items-center justify-center mb-4">
            <DonutChart segments={MODULO_DIST} size={110} />
          </div>
          <div className="space-y-2">
            {MODULO_DIST.map(m => (
              <div key={m.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: m.color }} />
                  <span style={{ color: C.txt2 }}>{m.label}</span>
                </div>
                <span className="font-bold" style={{ color: m.color }}>{m.val}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={fadeUp} custom={8} className="p-5 rounded-2xl"
        style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
        <h2 className="font-bold text-sm mb-5" style={{ color: C.txt }}>Alertas por Estado (últimos 30 dias)</h2>
        <BarChart data={ALERTAS_REGIAO} height={100} />
      </motion.div>
    </motion.div>
  );
}
