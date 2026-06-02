import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Droplets, Thermometer, Zap, FileText, AlertTriangle, Check, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { FAZENDAS } from '../data/mock';
import { Sparkline, NdviScale, ProgressBar } from '../components/Charts';

const STATUS_COLOR = { ok: '#43A047', warning: '#F4A261', critical: '#E53935' };
const STATUS_LABEL = { ok: 'Saudável', warning: 'Atenção', critical: 'Crítico' };
const STATUS_ICON  = { ok: Check, warning: AlertTriangle, critical: AlertTriangle };

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } }),
};

function ndviColor(v) {
  if (v < 0.2) return '#E53935';
  if (v < 0.4) return '#F4A261';
  if (v < 0.6) return '#FFC107';
  if (v < 0.75) return '#8BC34A';
  return '#43A047';
}

function FarmCard({ f, selected, onClick }) {
  const { C } = useTheme();
  const color = STATUS_COLOR[f.status];
  const SIcon = STATUS_ICON[f.status];
  return (
    <button onClick={onClick} className="w-full text-left p-4 rounded-xl transition-all"
      style={{
        background: selected ? `${color}12` : C.card,
        border: `1px solid ${selected ? color : C.border}`,
        boxShadow: C.shadow,
      }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="font-bold text-sm" style={{ color: C.txt }}>{f.nome}</div>
          <div className="text-xs" style={{ color: C.txt2 }}>{f.cultura} · {f.area_ha} ha</div>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0"
          style={{ background: `${color}18`, color }}>
          <SIcon size={10} /> {STATUS_LABEL[f.status]}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs mb-0.5" style={{ color: C.txt2 }}>NDVI</div>
          <div className="font-black text-lg" style={{ fontFamily: 'Outfit, sans-serif', color: ndviColor(f.ndvi) }}>
            {f.ndvi.toFixed(2)}
          </div>
        </div>
        <div className="w-24">
          <Sparkline data={f.ndvi_hist} color={ndviColor(f.ndvi)} height={28} />
        </div>
      </div>
    </button>
  );
}

function Metric({ icon: Icon, label, value, unit, color, sub }) {
  const { C } = useTheme();
  return (
    <div className="p-4 rounded-xl" style={{ background: C.sidebar, border: `1px solid ${C.border}` }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon size={15} color={color} />
        </div>
        <span className="text-xs font-semibold" style={{ color: C.txt2 }}>{label}</span>
      </div>
      <div className="font-black text-2xl mb-0.5" style={{ fontFamily: 'Outfit, sans-serif', color }}>
        {value}<span className="text-sm font-normal ml-1" style={{ color: C.txt2 }}>{unit}</span>
      </div>
      {sub && <div className="text-xs" style={{ color: C.txt2 }}>{sub}</div>}
    </div>
  );
}

export default function AgriSat() {
  const { C } = useTheme();
  const [sel, setSel] = useState(0);
  const f = FAZENDAS[sel];
  const color = STATUS_COLOR[f.status];

  return (
    <motion.div initial="hidden" animate="visible" className="flex gap-5 h-full" style={{ minHeight: 0 }}>
      {/* Farm list */}
      <motion.div variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="w-72 flex-shrink-0 space-y-2 overflow-y-auto pr-1">
        <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.txt2 }}>
          Fazendas cadastradas
        </div>
        {FAZENDAS.map((f, i) => (
          <motion.div key={f.id} variants={fadeUp} custom={i}>
            <FarmCard f={f} selected={sel === i} onClick={() => setSel(i)} />
          </motion.div>
        ))}
      </motion.div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto space-y-5 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div key={f.id}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            className="space-y-5">

            <div className="p-6 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${C.teal}18`, border: `1px solid ${C.teal}33` }}>
                      <Leaf size={18} color={C.teal} />
                    </div>
                    <h2 className="font-black text-2xl" style={{ fontFamily: 'Outfit, sans-serif', color: C.txt }}>{f.nome}</h2>
                  </div>
                  <div className="flex items-center gap-4 text-sm" style={{ color: C.txt2 }}>
                    <span>{f.cultura}</span><span>·</span><span>{f.area_ha} ha</span><span>·</span><span>Última captura: agora</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: C.teal, color: '#0D1117' }}>
                  <FileText size={15} /> Gerar Relatório
                </button>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold" style={{ color: C.txt2 }}>Índice NDVI atual</span>
                  <span className="font-black text-lg" style={{ color: ndviColor(f.ndvi), fontFamily: 'Outfit, sans-serif' }}>
                    {f.ndvi.toFixed(2)}
                  </span>
                </div>
                <NdviScale value={f.ndvi} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Metric icon={Droplets}    label="Umidade do Solo"  value={f.umidade}   unit="%" color={C.blue}   sub="Camada 0–30cm" />
              <Metric icon={Thermometer} label="Temperatura"      value={f.temp}      unit="°C" color={C.orange} sub="Superficial" />
              <Metric icon={Zap}         label="Irrigação Rec."   value={f.irrigacao} unit="L/m²" color={C.teal} sub="Por ciclo" />
              <Metric icon={Clock}       label="Horário Ideal"    value={f.horario}   unit="" color={f.status === 'critical' ? C.red : C.yellow} />
            </div>

            <div className="p-5 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: C.txt }}>Umidade por Camada do Solo</h3>
              <div className="space-y-3">
                {[
                  { label: '0–10 cm',    val: f.umidade + 8  },
                  { label: '10–30 cm',   val: f.umidade      },
                  { label: '30–60 cm',   val: f.umidade - 5  },
                  { label: '60–100 cm',  val: f.umidade - 12 },
                ].map(layer => {
                  const lc = layer.val < 35 ? C.red : layer.val < 50 ? C.orange : C.blue;
                  const v  = Math.max(layer.val, 15);
                  return (
                    <div key={layer.label}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span style={{ color: C.txt2 }}>{layer.label}</span>
                        <span className="font-bold" style={{ color: lc }}>{v}%</span>
                      </div>
                      <ProgressBar value={v} color={lc} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-5 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: C.txt }}>Histórico NDVI — 7 dias</h3>
              <div className="flex items-end gap-2 h-20">
                {f.ndvi_hist.map((v, i) => {
                  const hc = ndviColor(v);
                  const maxH = Math.max(...f.ndvi_hist);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t"
                        style={{ height: `${(v / maxH) * 56}px`, background: hc, opacity: i === f.ndvi_hist.length - 1 ? 1 : 0.55 }} />
                      <span className="text-xs" style={{ color: C.txt2 }}>
                        {i === f.ndvi_hist.length - 1 ? 'hoje' : `D-${f.ndvi_hist.length - 1 - i}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-5 rounded-2xl" style={{
              background: C.sidebar, border: `1px solid ${color}44`, borderLeft: `4px solid ${color}`,
            }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${C.purple}22` }}>
                  <span className="text-xs font-black" style={{ color: C.purple }}>IA</span>
                </div>
                <span className="text-sm font-bold" style={{ color: C.txt }}>Recomendação NovaTerra</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color }}>
                  {STATUS_LABEL[f.status]}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: C.txt2 }}>{f.recomendacao}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
