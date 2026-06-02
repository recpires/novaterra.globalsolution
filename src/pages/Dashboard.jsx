import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Bell, Flame, Leaf, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { C, SEV_COLOR } from '../theme';
import { ALERTAS, ALERTAS_30D, ALERTAS_REGIAO, MODULO_DIST } from '../data/mock';
import { LineChart, BarChart, DonutChart } from '../components/Charts';

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' } }),
};

/* ── KPI CARD ── */
function KpiCard({ icon: Icon, label, value, color, trend, i }) {
  return (
    <motion.div variants={fadeUp} custom={i}
      className="p-5 rounded-2xl"
      style={{ background: C.card, border: `1px solid ${C.border}` }}>
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

/* ── BRAZIL MAP (stylized) ── */
const MAP_MARKERS = ALERTAS.filter(a => a.status === 'ativo').map(a => ({
  ...a,
  color: SEV_COLOR[a.severidade],
}));

function BrazilMap() {
  return (
    <div className="relative rounded-2xl overflow-hidden" style={{
      background: '#0a1520',
      border: `1px solid ${C.border}`,
      height: 280,
      backgroundImage: `
        linear-gradient(rgba(33,150,243,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(33,150,243,0.04) 1px, transparent 1px)
      `,
      backgroundSize: '24px 24px',
    }}>
      {/* Brazil silhouette hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
        <div className="font-black text-[10rem]" style={{ color: C.teal }}>BR</div>
      </div>

      {/* Label */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="text-xs font-semibold px-2 py-1 rounded-full"
          style={{ background: `${C.blue}18`, color: C.blue, border: `1px solid ${C.blue}33` }}>
          🗺 Brasil — 5.570 municípios monitorados
        </span>
      </div>

      {/* Alert dots */}
      {MAP_MARKERS.map(m => (
        <motion.div key={m.id}
          className="absolute"
          style={{ left: `${m.mapX}%`, top: `${m.mapY}%`, transform: 'translate(-50%,-50%)' }}
        >
          <motion.div className="w-4 h-4 rounded-full absolute -inset-2"
            style={{ background: m.color, opacity: 0.3 }}
            animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: m.id * 0.3 }}
          />
          <div className="w-3.5 h-3.5 rounded-full relative z-10"
            style={{ background: m.color, boxShadow: `0 0 8px ${m.color}` }} />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs px-1.5 py-0.5 rounded font-semibold"
            style={{ background: C.card, color: m.color, border: `1px solid ${m.color}33`, pointerEvents: 'none' }}>
            {m.tipo}
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
        {[
          { label: 'Crítico', color: C.red },
          { label: 'Alto',    color: C.orange },
          { label: 'Médio',   color: C.yellow },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5 text-xs" style={{ color: C.txt2 }}>
            <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── ALERT ROW ── */
function AlertRow({ a, i }) {
  const color = SEV_COLOR[a.severidade];
  const elapsed = (() => {
    const diff = Math.floor((new Date() - new Date(a.criado_em)) / 60000);
    if (diff < 60) return `${diff}min`;
    return `${Math.floor(diff / 60)}h`;
  })();
  return (
    <motion.div variants={fadeUp} custom={i}
      className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5 cursor-pointer"
      style={{ borderLeft: `3px solid ${color}` }}>
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold" style={{ color }}>{a.tipo}</span>
          <span className="text-xs" style={{ color: `${C.txt2}88` }}>{elapsed}</span>
        </div>
        <div className="text-xs truncate mt-0.5" style={{ color: C.txt2 }}>{a.regiao}</div>
      </div>
      <div className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
        style={{ background: `${color}18`, color }}>
        {a.severidade === 'CRITICO' ? 'Crítico' : a.severidade === 'ALTO' ? 'Alto' : 'Médio'}
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const kpis = [
    { icon: MapPin, label: 'Áreas Monitoradas', value: '247',  color: C.blue,   trend: 12 },
    { icon: Bell,   label: 'Alertas Ativos',    value: '12',   color: C.orange, trend: 8  },
    { icon: Flame,  label: 'Queimadas (24h)',   value: '8',    color: C.red,    trend: 33 },
    { icon: Leaf,   label: 'Cobertura Vegetal', value: '73%',  color: C.green,  trend: -2 },
  ];

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      className="space-y-6">

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => <KpiCard key={k.label} {...k} i={i} />)}
      </div>

      {/* Map + Alerts */}
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
            style={{ background: C.card, border: `1px solid ${C.border}`, maxHeight: 280, overflowY: 'auto' }}>
            {ALERTAS.slice(0, 6).map((a, i) => <AlertRow key={a.id} a={a} i={i} />)}
          </div>
        </motion.div>
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Line chart */}
        <motion.div variants={fadeUp} custom={6} className="md:col-span-2 p-5 rounded-2xl"
          style={{ background: C.card, border: `1px solid ${C.border}` }}>
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

        {/* Donut + module dist */}
        <motion.div variants={fadeUp} custom={7} className="p-5 rounded-2xl"
          style={{ background: C.card, border: `1px solid ${C.border}` }}>
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

      {/* Bar chart */}
      <motion.div variants={fadeUp} custom={8} className="p-5 rounded-2xl"
        style={{ background: C.card, border: `1px solid ${C.border}` }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-sm" style={{ color: C.txt }}>Alertas por Estado (últimos 30 dias)</h2>
        </div>
        <BarChart data={ALERTAS_REGIAO} height={100} />
      </motion.div>
    </motion.div>
  );
}
