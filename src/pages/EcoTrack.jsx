import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TreePine, Wind, Leaf, ShoppingCart, Check, BarChart2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { DESMATA_AREAS, CARBON_MERCADO, CO2_HIST } from '../data/mock';
import { LineChart, ProgressBar } from '../components/Charts';

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45 } }),
};

function DesmatRow({ r, i }) {
  const { C } = useTheme();
  const sc = r.status === 'confirmado' ? C.green : C.yellow;
  const esgColor = r.score_esg < 30 ? C.red : r.score_esg < 50 ? C.orange : C.green;
  return (
    <motion.tr variants={fadeUp} custom={i} className="border-t" style={{ borderColor: C.border }}>
      <td className="py-3 px-4">
        <div className="font-semibold text-sm" style={{ color: C.txt }}>{r.nome}</div>
        <div className="text-xs" style={{ color: C.txt2 }}>{r.data}</div>
      </td>
      <td className="py-3 px-4 text-right font-bold" style={{ color: C.red }}>{r.area_km2} km²</td>
      <td className="py-3 px-4 text-right text-sm" style={{ color: C.orange }}>{r.co2_ton.toLocaleString('pt-BR')} t</td>
      <td className="py-3 px-4 text-right font-semibold" style={{ color: C.green }}>{r.creditos.toLocaleString('pt-BR')}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1.5">
          <ProgressBar value={r.score_esg} color={esgColor} height={4} />
          <span className="text-xs font-bold flex-shrink-0" style={{ color: esgColor }}>{r.score_esg}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: `${sc}18`, color: sc }}>{r.status}</span>
      </td>
    </motion.tr>
  );
}

function CarbonCard({ item, i }) {
  const { C } = useTheme();
  return (
    <motion.div variants={fadeUp} custom={i} className="p-4 rounded-xl"
      style={{ background: C.sidebar, border: `1px solid ${C.border}` }}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="font-bold text-sm" style={{ color: C.txt }}>{item.empresa}</div>
          <div className="text-xs" style={{ color: C.txt2 }}>Prazo: {item.prazo}</div>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl"
          style={{ background: C.green, color: '#fff' }}>
          <ShoppingCart size={11} /> Comprar
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { v: item.creditos,                              label: 'Créditos', color: C.green },
          { v: `R$${item.valor_unit.toFixed(0)}`,          label: 'Por unidade', color: C.teal },
          { v: `R$${(item.total / 1000).toFixed(1)}k`,    label: 'Total', color: C.blue },
        ].map(s => (
          <div key={s.label}>
            <div className="font-black text-xl" style={{ fontFamily: 'Outfit, sans-serif', color: s.color }}>{s.v}</div>
            <div className="text-xs" style={{ color: C.txt2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function EcoTrack() {
  const { C } = useTheme();
  const [tab, setTab] = useState('desmatamento');

  const totalArea   = DESMATA_AREAS.reduce((s, r) => s + r.area_km2, 0);
  const totalCO2    = DESMATA_AREAS.reduce((s, r) => s + r.co2_ton, 0);
  const totalCredit = DESMATA_AREAS.reduce((s, r) => s + r.creditos, 0);
  const avgEsg      = Math.round(DESMATA_AREAS.reduce((s, r) => s + r.score_esg, 0) / DESMATA_AREAS.length);

  const kpis = [
    { icon: TreePine,  label: 'Área Desmatada (mai)',  value: `${totalArea} km²`,              color: C.red    },
    { icon: Wind,      label: 'CO₂ Emitido',           value: `${(totalCO2/1000).toFixed(0)}k t`, color: C.orange },
    { icon: Leaf,      label: 'Créditos Disponíveis',  value: totalCredit.toLocaleString('pt-BR'), color: C.green  },
    { icon: BarChart2, label: 'Score ESG Médio',       value: `${avgEsg}/100`,                 color: C.teal   },
  ];

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <motion.div key={k.label} variants={fadeUp} custom={i} className="p-5 rounded-2xl"
            style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${k.color}18`, border: `1px solid ${k.color}33` }}>
              <k.icon size={17} color={k.color} />
            </div>
            <div className="font-black text-2xl mb-0.5" style={{ fontFamily: 'Outfit, sans-serif', color: k.color }}>
              {k.value}
            </div>
            <div className="text-xs" style={{ color: C.txt2 }}>{k.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div variants={fadeUp} custom={4} className="lg:col-span-2 p-5 rounded-2xl"
          style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          <h2 className="font-bold text-sm mb-4" style={{ color: C.txt }}>
            Emissões CO₂ — Últimos 12 meses (toneladas × 1.000)
          </h2>
          <LineChart data={CO2_HIST} color={C.orange} height={80} />
          <div className="flex justify-between mt-2 text-xs" style={{ color: `${C.txt2}88` }}>
            <span>Jul/25</span><span>Jan/26</span><span>Jun/26</span>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={5} className="p-5 rounded-2xl"
          style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          <h2 className="font-bold text-sm mb-4" style={{ color: C.txt }}>Comparativo Orbital</h2>
          <div className="text-xs mb-2" style={{ color: C.txt2 }}>Pará Norte — Mai 2025 vs Mai 2026</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="rounded-lg h-20 flex items-center justify-center"
              style={{ background: C.green + '22', border: `1px solid ${C.green}33` }}>
              <div className="text-center">
                <div className="text-xs font-bold" style={{ color: C.green }}>ANTES</div>
                <div className="text-xs" style={{ color: C.txt2 }}>Cobertura 87%</div>
              </div>
            </div>
            <div className="rounded-lg h-20 flex items-center justify-center"
              style={{ background: C.red + '22', border: `1px solid ${C.red}33` }}>
              <div className="text-center">
                <div className="text-xs font-bold" style={{ color: C.red }}>DEPOIS</div>
                <div className="text-xs" style={{ color: C.txt2 }}>Cobertura 38%</div>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-xl" style={{ background: `${C.red}14`, border: `1px solid ${C.red}33` }}>
            <div className="text-xs font-bold" style={{ color: C.red }}>Variação detectada</div>
            <div className="font-black text-xl" style={{ color: C.red, fontFamily: 'Outfit, sans-serif' }}>
              −49% cobertura vegetal
            </div>
            <div className="text-xs" style={{ color: C.txt2 }}>342 km² de floresta suprimida</div>
          </div>
        </motion.div>
      </div>

      <div className="flex gap-2">
        {[['desmatamento', 'Registros de Desmatamento'], ['mercado', 'Marketplace Créditos de Carbono']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
            style={{
              background: tab === k ? `${C.green}18` : C.card,
              color: tab === k ? C.green : C.txt2,
              border: `1px solid ${tab === k ? C.green + '44' : C.border}`,
              boxShadow: C.shadow,
            }}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'desmatamento' && (
        <motion.div variants={fadeUp} custom={6} className="rounded-2xl overflow-hidden"
          style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: C.sidebar }}>
                {['Área', 'Desmatada', 'CO₂ (ton)', 'Créditos', 'Score ESG', 'Status'].map(h => (
                  <th key={h} className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider"
                    style={{ color: C.txt2 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <motion.tbody initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
              {DESMATA_AREAS.map((r, i) => <DesmatRow key={r.id} r={r} i={i} />)}
            </motion.tbody>
          </table>
        </motion.div>
      )}

      {tab === 'mercado' && (
        <motion.div initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="space-y-4">
          <p className="text-sm" style={{ color: C.txt2 }}>
            Créditos de carbono verificados disponíveis. Cada crédito = 1 tonelada de CO₂ compensada.
          </p>
          {CARBON_MERCADO.map((item, i) => <CarbonCard key={i} item={item} i={i} />)}
          <div className="p-4 rounded-xl flex items-center gap-3"
            style={{ background: `${C.green}12`, border: `1px solid ${C.green}33` }}>
            <Check size={16} color={C.green} />
            <p className="text-sm" style={{ color: C.txt2 }}>
              Todos os créditos são <strong style={{ color: C.green }}>verificados pelo Verra VCS</strong> e rastreáveis via imagens satelitais.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
