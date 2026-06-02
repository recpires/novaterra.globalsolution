import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Satellite, Leaf, ShieldAlert, Globe, Bell, TreePine,
  Brain, Cpu, Zap, ArrowRight, Flame, Droplets, Wind,
  BarChart2, Database, Activity, AlertTriangle, Eye,
  Radio, Layers, TrendingDown, ChevronRight, Check,
  Lock, Wifi, FileText, RefreshCw, MapPin,
} from 'lucide-react';

/* ─── PALETA ─── */
const C = {
  bg:      '#0D1117',
  card:    '#161B22',
  sidebar: '#1E2A3A',
  blue:    '#2196F3',
  teal:    '#00D4AA',
  orange:  '#F4A261',
  red:     '#E53935',
  yellow:  '#FFC107',
  green:   '#43A047',
  purple:  '#7B2FBE',
  txt:     '#FFFFFF',
  txt2:    '#8B9DC3',
  border:  '#30363D',
};

/* ─── VARIANTS ─── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: 'easeOut' },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

/* ─── COUNTER ─── */
function useCounter(target, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return [val, ref];
}

/* ─── STARFIELD ─── */
const STARS = Array.from({ length: 90 }, (_, i) => ({
  x:    (i * 137.508 + 11) % 100,
  y:    (i * 83.17  + 7)  % 100,
  size: 1 + (i % 3) * 0.6,
  delay: (i * 0.21) % 4.5,
  dur:   2.5 + (i % 5),
}));

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {STARS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.08, 0.65, 0.08] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

/* ─── ORBITAL GRAPHIC ─── */
function OrbitalGraphic() {
  return (
    <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] flex items-center justify-center mx-auto">
      {/* Rings */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{
            inset: `${i * 12}%`,
            border: `1px solid rgba(255,255,255,${0.06 - i * 0.015})`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 28 - i * 6, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Satellite dot on outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: C.teal, boxShadow: `0 0 12px ${C.teal}` }}>
          <Satellite size={13} color="#0D1117" strokeWidth={2.5} />
        </div>
      </motion.div>

      {/* Radio sat on middle ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ inset: '12%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: C.blue, boxShadow: `0 0 10px ${C.blue}` }}>
          <Radio size={10} color="#fff" strokeWidth={2.5} />
        </div>
      </motion.div>

      {/* Glow */}
      <div className="absolute" style={{ inset: '25%' }}>
        <div className="w-full h-full rounded-full" style={{
          background: `radial-gradient(circle, ${C.teal}28 0%, transparent 70%)`,
          boxShadow: `0 0 70px 20px ${C.teal}20`,
        }} />
      </div>

      {/* Center globe */}
      <div className="relative z-10 p-7 rounded-full" style={{
        background: `radial-gradient(circle at 38% 35%, #1E3A5F, #0D1117)`,
        border: `1px solid ${C.border}`,
        boxShadow: `0 0 50px ${C.teal}44, inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}>
        <Globe size={56} color={C.teal} strokeWidth={1.2} />
      </div>

      {/* Orbital data dots */}
      {[C.teal, C.blue, C.orange, C.green].map((color, i) => {
        const a = (i * 90 - 25) * (Math.PI / 180);
        const r = 140;
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: color,
              left: `calc(50% + ${Math.cos(a) * r}px)`,
              top:  `calc(50% + ${Math.sin(a) * r}px)`,
              transform: 'translate(-50%,-50%)',
              boxShadow: `0 0 10px ${color}`,
            }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.55 }}
          />
        );
      })}
    </div>
  );
}

/* ─── SECTION wrapper ─── */
function Section({ id, children, className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  return (
    <motion.section
      id={id} ref={ref}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </motion.section>
  );
}

/* ─── BADGE ─── */
function Badge({ color, children }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full"
      style={{ background: `${color}18`, border: `1px solid ${color}44`, color }}>
      {children}
    </span>
  );
}

/* ─── SECTION TITLE ─── */
function SectionTitle({ badge, badgeColor, title, sub }) {
  return (
    <motion.div variants={fadeUp} className="text-center mb-16">
      <Badge color={badgeColor}>{badge}</Badge>
      <h2 className="mt-5 font-bold" style={{
        fontFamily: 'Outfit, Inter, sans-serif',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        letterSpacing: '-0.025em',
        lineHeight: 1.08,
        color: C.txt,
      }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {sub && (
        <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: C.txt2 }}>{sub}</p>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   1. NAVBAR
══════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(13,17,23,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
      }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img src="/novaterra-logo.png" alt="NovaTerra"
            className="w-9 h-9 rounded-lg object-cover"
            style={{ boxShadow: `0 0 16px ${C.teal}44` }} />
          <span className="font-black text-xl tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', color: C.txt }}>
            Nova<span style={{ color: C.teal }}>Terra</span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            ['Módulos', '#modulos'],
            ['Como Funciona', '#como-funciona'],
            ['IA', '#ia'],
            ['Dados', '#fontes'],
          ].map(([label, href]) => (
            <a key={label} href={href}
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: C.txt2 }}>
              {label}
            </a>
          ))}
        </nav>

        <a href="#cta"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110 active:scale-95"
          style={{ background: C.teal, color: '#0D1117' }}>
          Acessar Plataforma <ArrowRight size={15} />
        </a>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════
   2. HERO
══════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: C.bg }}>
      <StarField />

      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 85% 60% at 50% -5%, ${C.teal}1A 0%, transparent 55%),
          radial-gradient(ellipse 55% 45% at 85% 50%, ${C.blue}16 0%, transparent 50%),
          radial-gradient(ellipse 45% 55% at 15% 85%, ${C.purple}12 0%, transparent 50%)
        `,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left: text */}
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0} className="mb-7">
            <Badge color={C.teal}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: C.teal }} />
                <span className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: C.teal }} />
              </span>
              Global Solution · FIAP 2026
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} custom={1}
            className="font-black leading-none mb-6"
            style={{
              fontFamily: 'Outfit, Inter, sans-serif',
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              letterSpacing: '-0.035em',
              color: C.txt,
            }}>
            Inteligência{' '}
            <span style={{
              background: `linear-gradient(135deg, ${C.teal} 0%, ${C.blue} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Orbital
            </span>
            <br />para o Planeta
          </motion.h1>

          {/* Sub */}
          <motion.p variants={fadeUp} custom={2}
            className="text-lg leading-relaxed mb-9 max-w-lg"
            style={{ color: C.txt2 }}>
            Conectamos dados de satélites da{' '}
            <strong style={{ color: C.txt }}>NASA, ESA e INPE</strong>{' '}
            a uma engine de IA para proteger lavouras, prevenir desastres e combater o desmatamento — em tempo real.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 mb-12">
            <a href="#cta"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:brightness-110 active:scale-95"
              style={{ background: C.teal, color: '#0D1117' }}>
              Acessar a Plataforma <ArrowRight size={16} />
            </a>
            <a href="#modulos"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm border transition-all hover:border-white/20"
              style={{ borderColor: C.border, color: C.txt2 }}>
              Ver os módulos <ChevronRight size={16} />
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div variants={fadeUp} custom={4}
            className="flex gap-8 pt-8"
            style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { v: '247+',   l: 'Áreas monitoradas' },
              { v: '3',      l: 'Fontes satelitais' },
              { v: '~90min', l: 'Atualização orbital' },
            ].map(s => (
              <div key={s.l}>
                <div className="font-black text-xl"
                  style={{ fontFamily: 'Outfit, sans-serif', color: C.teal }}>{s.v}</div>
                <div className="text-xs mt-0.5" style={{ color: C.txt2 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.25 }}
          className="flex justify-center">
          <OrbitalGraphic />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}>
        <div className="text-xs" style={{ color: `${C.txt2}88` }}>scroll</div>
        <div className="w-px h-8" style={{
          background: `linear-gradient(to bottom, ${C.teal}55, transparent)`,
        }} />
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   3. O PROBLEMA
══════════════════════════════════════════════════ */
function ProblemaSection() {
  const [c1, r1] = useCounter(50);
  const [c2, r2] = useCounter(700);
  const [c3, r3] = useCounter(11000);

  const cards = [
    {
      ref: r1, icon: TrendingDown, color: C.orange,
      value: `R$ ${c1}B`,
      label: 'em perdas agrícolas por ano',
      desc: 'A falta de previsão e monitoramento adequado destroça safras inteiras sem aviso prévio, afetando 30 milhões de produtores rurais.',
    },
    {
      ref: r2, icon: AlertTriangle, color: C.red,
      value: `+${c2}`,
      label: 'mortes por desastres em 5 anos',
      desc: 'Enchentes, deslizamentos e queimadas ceifam vidas que poderiam ser salvas com sistemas de alerta preventivo baseado em dados orbitais.',
    },
    {
      ref: r3, icon: Flame, color: C.yellow,
      value: `${c3.toLocaleString('pt-BR')} km²`,
      label: 'de Amazônia desmatados por ano',
      desc: 'Os dados satelitais existem e são públicos. O problema é a fragmentação e a falta de ferramentas acessíveis para interpretação em tempo real.',
    },
  ];

  return (
    <Section id="problema" className="py-28 px-6" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          badge="O Problema"
          badgeColor={C.red}
          title="Os dados existem.<br/>O acesso, não."
          sub="Satélites da NASA, ESA e INPE capturam o planeta a cada 90 minutos. Mas agricultores, Defesa Civil e empresas não conseguem interpretar esses dados de forma simples e acionável."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} ref={c.ref}
              className="relative p-8 rounded-2xl group"
              style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 25% 15%, ${c.color}16 0%, transparent 65%)` }} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${c.color}18`, border: `1px solid ${c.color}33` }}>
                  <c.icon size={22} color={c.color} />
                </div>
                <div className="font-black mb-1.5"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontFamily: 'Outfit, sans-serif', color: c.color, lineHeight: 1 }}>
                  {c.value}
                </div>
                <div className="font-semibold text-sm mb-3" style={{ color: C.txt }}>{c.label}</div>
                <p className="text-sm leading-relaxed" style={{ color: C.txt2 }}>{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════
   4. OS 3 MÓDULOS
══════════════════════════════════════════════════ */
const MODULOS = [
  {
    id: 'agrisat', label: 'AgriSat', color: C.teal, icon: Leaf,
    target: 'Agricultores e cooperativas agrícolas',
    headline: 'Monitoramento agrícola por satélite',
    desc: 'Índice NDVI, umidade do solo, previsão de pragas e recomendação de irrigação otimizada — em tempo real para cada talhão ou fazenda.',
    features: [
      'Índice NDVI por talhão (−1 a +1)',
      'Umidade do solo por camada (%)',
      'Previsão de pragas com modelos preditivos',
      'Recomendação de irrigação gerada por IA',
      'Alertas de estresse hídrico',
      'Histórico de safras e variações climáticas',
    ],
  },
  {
    id: 'sentinel', label: 'SentinelAlert', color: C.orange, icon: ShieldAlert,
    target: 'Defesa Civil, prefeituras e órgãos de segurança',
    headline: 'Alertas de desastres em tempo real',
    desc: 'Monitoramento contínuo de queimadas, enchentes e deslizamentos com score de risco de 0 a 100 e notificações multi-canal.',
    features: [
      'Mapa de risco interativo por severidade',
      'Notificações: SMS, e-mail e push',
      'Score de risco regional (0–100)',
      'Tipos: QUEIMADA · ENCHENTE · DESLIZAMENTO · SECA',
      'Relatórios automáticos por período',
      'Histórico de eventos por estado',
    ],
    extra: [
      { label: 'CRÍTICO', color: C.red },
      { label: 'ALTO', color: C.orange },
      { label: 'MÉDIO', color: C.yellow },
      { label: 'BAIXO', color: C.green },
    ],
  },
  {
    id: 'ecotrack', label: 'EcoTrack', color: C.green, icon: TreePine,
    target: 'Empresas, órgãos ambientais e investidores ESG',
    headline: 'Rastreamento ambiental e créditos de carbono',
    desc: 'Detecção de desmatamento por comparação temporal de imagens orbitais, cálculo de emissões de CO₂ e marketplace de créditos de carbono.',
    features: [
      'Detecção de desmatamento orbital (antes/depois)',
      'Cálculo de emissões de CO₂ por área afetada',
      'Marketplace de créditos de carbono integrado',
      'Relatórios de conformidade ambiental',
      'Rastreamento de reflorestamento',
      'Score ESG da empresa',
    ],
  },
];

function ModulosSection() {
  const [active, setActive] = useState(0);
  const mod = MODULOS[active];

  return (
    <Section id="modulos" className="py-28 px-6" style={{ background: C.bg }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 100% 50% at 50% 50%, ${C.sidebar}66 0%, transparent 65%)`,
      }} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle
          badge="Os 3 Módulos"
          badgeColor={C.blue}
          title="Uma plataforma,<br/>três frentes de impacto"
          sub="Cada módulo é projetado para um perfil específico de usuário, com dados, alertas e recomendações relevantes ao seu contexto."
        />

        {/* Tabs */}
        <motion.div variants={fadeUp} className="flex gap-2 mb-10 p-1.5 rounded-2xl mx-auto max-w-md"
          style={{ background: C.card, border: `1px solid ${C.border}` }}>
          {MODULOS.map((m, i) => (
            <button key={m.id} onClick={() => setActive(i)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: active === i ? `${m.color}22` : 'transparent',
                color: active === i ? m.color : C.txt2,
                border: active === i ? `1px solid ${m.color}44` : '1px solid transparent',
              }}>
              <m.icon size={15} />
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Module detail */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-6">
            {/* Info card */}
            <div className="p-8 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${mod.color}18`, border: `1px solid ${mod.color}33` }}>
                  <mod.icon size={22} color={mod.color} />
                </div>
                <div>
                  <div className="font-black text-xl" style={{ fontFamily: 'Outfit, sans-serif', color: C.txt }}>{mod.label}</div>
                  <div className="text-xs font-semibold" style={{ color: mod.color }}>{mod.target}</div>
                </div>
              </div>
              <h3 className="font-bold text-2xl mb-3" style={{ color: C.txt, letterSpacing: '-0.01em' }}>{mod.headline}</h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: C.txt2 }}>{mod.desc}</p>
              <a href="#cta"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:brightness-110"
                style={{ background: mod.color, color: '#0D1117' }}>
                Explorar módulo <ArrowRight size={14} />
              </a>
            </div>

            {/* Features card */}
            <div className="p-8 rounded-2xl" style={{ background: C.sidebar, border: `1px solid ${C.border}` }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: C.txt2 }}>
                Funcionalidades
              </div>
              <ul className="space-y-3">
                {mod.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: `${mod.color}22` }}>
                      <Check size={11} color={mod.color} strokeWidth={3} />
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color: C.txt2 }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Severity badges for SentinelAlert */}
              {mod.extra && (
                <div className="mt-6 pt-5 flex flex-wrap gap-2" style={{ borderTop: `1px solid ${C.border}` }}>
                  {mod.extra.map(s => (
                    <span key={s.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}33` }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                      {s.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════
   5. COMO FUNCIONA
══════════════════════════════════════════════════ */
const STEPS = [
  { icon: Satellite, color: C.blue,   n: '01', title: 'Captura Orbital',      desc: 'Satélites NASA MODIS, ESA Sentinel-2 e INPE CBERS capturam dados multiespectrais a cada ~90 minutos.' },
  { icon: Database,  color: C.teal,   n: '02', title: 'Ingestão de Dados',    desc: 'Pipeline unificado consolida imagens brutas, telemetria e séries temporais de múltiplas fontes.' },
  { icon: Brain,     color: C.purple, n: '03', title: 'Engine de IA',          desc: 'CNN, LSTM, NLP e K-Means processam e interpretam dados para cada módulo (Agri, Sentinel, Eco).' },
  { icon: BarChart2, color: C.orange, n: '04', title: 'Análise & Alertas',    desc: 'Modelos geram scores de risco, recomendações e alertas automáticos classificados por severidade.' },
  { icon: Zap,       color: C.green,  n: '05', title: 'Decisão em Tempo Real', desc: 'Usuários recebem insights acionáveis no dashboard ou via SMS, e-mail e push em segundos.' },
];

function ComoFuncionaSection() {
  return (
    <Section id="como-funciona" className="py-28 px-6" style={{ background: C.card }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${C.blue}0F 0%, transparent 60%)`,
      }} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle
          badge="Como Funciona"
          badgeColor={C.blue}
          title="Do satélite à decisão<br/>em 5 etapas"
        />

        {/* Desktop flow */}
        <div className="hidden md:grid grid-cols-5 gap-4">
          {STEPS.map((s, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="relative">
              {/* Connector arrow */}
              {i < STEPS.length - 1 && (
                <div className="absolute top-8 left-[calc(100%+8px)] w-[calc(100%-16px)] flex items-center" style={{ zIndex: 1 }}>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${s.color}44, ${STEPS[i+1].color}44)` }} />
                  <ChevronRight size={12} color={C.txt2} style={{ flexShrink: 0, marginLeft: -1 }} />
                </div>
              )}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: `${s.color}18`, border: `1px solid ${s.color}44` }}>
                    <s.icon size={26} color={s.color} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: s.color, color: '#0D1117', fontFamily: 'Outfit, sans-serif' }}>
                    {i + 1}
                  </div>
                </div>
                <div className="font-bold text-sm mb-2" style={{ color: C.txt, fontFamily: 'Outfit, sans-serif' }}>{s.title}</div>
                <p className="text-xs leading-relaxed" style={{ color: C.txt2 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile flow */}
        <div className="md:hidden space-y-3">
          {STEPS.map((s, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              className="flex gap-4 p-5 rounded-xl"
              style={{ background: C.bg, border: `1px solid ${C.border}` }}>
              <div className="flex-shrink-0 relative">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}44` }}>
                  <s.icon size={20} color={s.color} />
                </div>
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ background: s.color, color: '#0D1117', fontSize: '0.6rem' }}>
                  {i + 1}
                </div>
              </div>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: C.txt }}>{s.title}</div>
                <p className="text-xs leading-relaxed" style={{ color: C.txt2 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════
   6. INTELIGÊNCIA ARTIFICIAL
══════════════════════════════════════════════════ */
const IA_TECHS = [
  {
    acronym: 'CNN',
    name: 'Rede Neural Convolucional',
    icon: Eye,
    color: C.purple,
    desc: 'Analisa imagens multiespectrais de satélite para detectar queimadas, desmatamento e padrões visuais anômalos com alta precisão.',
    tags: ['Visão Computacional', 'Detecção de Padrões', 'Imagens Satelitais'],
    uso: 'AgriSat · EcoTrack · SentinelAlert',
  },
  {
    acronym: 'LSTM',
    name: 'Long Short-Term Memory',
    icon: Activity,
    color: C.blue,
    desc: 'Processa séries temporais de dados satelitais para prever riscos climáticos e variações de safra com base em histórico orbital.',
    tags: ['Séries Temporais', 'Previsão Climática', 'Deep Learning'],
    uso: 'AgriSat · SentinelAlert',
  },
  {
    acronym: 'NLP',
    name: 'Processamento de Linguagem Natural',
    icon: Brain,
    color: C.teal,
    desc: 'Alimenta o chatbot "Nova" — interpreta perguntas em linguagem natural e as converte em consultas sobre dados satelitais em tempo real.',
    tags: ['Chatbot', 'LLM', 'Interface Natural'],
    uso: 'Assistente Nova',
  },
  {
    acronym: 'K-Means',
    name: 'Clusterização K-Means',
    icon: Layers,
    color: C.orange,
    desc: 'Agrupa automaticamente regiões por perfil de risco ambiental e características do solo para zoneamento inteligente e alertas dirigidos.',
    tags: ['Clustering', 'Zoneamento', 'ML Não-supervisionado'],
    uso: 'SentinelAlert · EcoTrack',
  },
];

function IASection() {
  return (
    <Section id="ia" className="py-28 px-6" style={{ background: C.bg }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${C.purple}1A 0%, transparent 55%)`,
      }} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle
          badge="Inteligência Artificial"
          badgeColor={C.purple}
          title="IA de ponta aplicada<br/>a dados orbitais"
          sub="Quatro arquiteturas de machine learning trabalhando em conjunto para transformar imagens de satélite em decisões inteligentes."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {IA_TECHS.map((t, i) => (
            <motion.div key={t.acronym} variants={fadeUp} custom={i}
              className="p-6 rounded-2xl group relative overflow-hidden"
              style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${t.color}` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 30% 10%, ${t.color}14 0%, transparent 60%)` }} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${t.color}18`, border: `1px solid ${t.color}33` }}>
                    <t.icon size={18} color={t.color} />
                  </div>
                  <span className="font-black text-xl" style={{ fontFamily: 'Outfit, sans-serif', color: t.color }}>{t.acronym}</span>
                </div>
                <div className="font-semibold text-sm mb-2" style={{ color: C.txt }}>{t.name}</div>
                <p className="text-xs leading-relaxed mb-4" style={{ color: C.txt2 }}>{t.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${t.color}14`, color: t.color, border: `1px solid ${t.color}22` }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs font-semibold pt-3" style={{ borderTop: `1px solid ${C.border}`, color: `${C.txt2}88` }}>
                  Usado em: <span style={{ color: t.color }}>{t.uso}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════
   7. FONTES DE DADOS
══════════════════════════════════════════════════ */
const FONTES = [
  {
    org: 'NASA', name: 'MODIS', accent: C.blue, icon: Globe,
    ciclo: '1–2 dias',
    res: '250m – 1km',
    desc: 'Terra e Aqua MODIS fornecem dados globais de temperatura superficial, cobertura vegetal e focos de calor. Cobertura diária completa da Terra.',
    dados: ['Temperatura superficial', 'Focos de calor', 'Cobertura vegetal', 'Albedo e reflectância'],
  },
  {
    org: 'ESA', name: 'Sentinel-2', accent: C.green, icon: Satellite,
    ciclo: '5 dias',
    res: '10m – 60m',
    desc: 'Imagens multiespectrais de altíssima resolução para análise precisa de NDVI, uso da terra e detecção de mudanças temporais por comparação.',
    dados: ['Imagens multiespectrais', 'NDVI alta resolução', 'Uso da terra', 'Detecção de mudanças'],
  },
  {
    org: 'INPE', name: 'CBERS', accent: C.yellow, icon: Radio,
    ciclo: '26 dias',
    res: '5m – 160m',
    desc: 'Satélite brasileiro de sensoriamento remoto com foco estratégico na Amazônia e Cerrado. Dados soberanos para monitoramento do território nacional.',
    dados: ['Desmatamento Amazônia', 'Monitoramento Cerrado', 'Uso agrícola', 'Queimadas Brasil'],
  },
];

function FontesDadosSection() {
  return (
    <Section id="fontes" className="py-28 px-6" style={{ background: C.card }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          badge="Fontes de Dados"
          badgeColor={C.teal}
          title="Dados de três das maiores<br/>agências espaciais do mundo"
          sub="Atualização a cada ciclo orbital (~90 minutos). Cobertura global com dados soberanos do território brasileiro via INPE."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {FONTES.map((f, i) => (
            <motion.div key={f.org} variants={fadeUp} custom={i}
              className="p-8 rounded-2xl"
              style={{ background: C.bg, border: `1px solid ${f.accent}44` }}>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${f.accent}18`, border: `1px solid ${f.accent}33` }}>
                  <f.icon size={22} color={f.accent} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest" style={{ color: f.accent }}>{f.org}</div>
                  <div className="font-black text-xl" style={{ fontFamily: 'Outfit, sans-serif', color: C.txt }}>{f.name}</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: C.txt2 }}>{f.desc}</p>

              <div className="space-y-1.5 mb-5">
                {f.dados.map(d => (
                  <div key={d} className="flex items-center gap-2 text-xs" style={{ color: C.txt2 }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: f.accent }} />
                    {d}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 text-xs" style={{ borderTop: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-1.5">
                  <RefreshCw size={11} color={f.accent} />
                  <span style={{ color: f.accent }}>Revisita: <strong>{f.ciclo}</strong></span>
                </div>
                <div style={{ color: C.txt2 }}>Resolução: <strong style={{ color: C.txt }}>{f.res}</strong></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════
   8. BANCO DE DADOS
══════════════════════════════════════════════════ */
const TABLES = [
  { name: 'organizacao', color: C.blue,   cols: ['id SERIAL PK', 'nome VARCHAR(150)', 'tipo VARCHAR(50)', 'cnpj CHAR(14)', 'criado_em TIMESTAMP'] },
  { name: 'usuario',     color: C.teal,   cols: ['id SERIAL PK', 'email VARCHAR(150)', 'tipo_usuario VARCHAR(30)', 'org_id → organizacao', 'ativo BOOLEAN'] },
  { name: 'area_monitorada', color: C.green, cols: ['id SERIAL PK', 'usuario_id → usuario', 'tipo_area VARCHAR(30)', 'lat / long DECIMAL', 'area_ha DECIMAL'] },
  { name: 'dado_satelital',  color: C.purple, cols: ['id SERIAL PK', 'area_id → area_monitorada', 'fonte_id → fonte_dados', 'tipo_dado VARCHAR(50)', 'capturado_em TIMESTAMP'] },
  { name: 'alerta',         color: C.orange, cols: ['id SERIAL PK', 'area_id → area_monitorada', 'tipo_alerta VARCHAR(50)', 'severidade VARCHAR(20)', 'status VARCHAR(20)'] },
  { name: 'relatorio_agri', color: C.yellow, cols: ['id SERIAL PK', 'area_id → area_monitorada', 'ndvi DECIMAL(5,3)', 'umidade_solo DECIMAL', 'recomendacao TEXT'] },
  { name: 'interacao_ia',   color: C.red,    cols: ['id SERIAL PK', 'usuario_id → usuario', 'modulo VARCHAR(30)', 'msg_usuario TEXT', 'resposta_ia TEXT'] },
  { name: 'fonte_dados',    color: C.txt2,   cols: ['id SERIAL PK', 'nome VARCHAR(100)', 'tipo_dado VARCHAR(50)', 'url_api TEXT', 'intervalo_min INT'] },
];

function DBSection() {
  return (
    <Section id="banco-de-dados" className="py-28 px-6" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          badge="Banco de Dados"
          badgeColor={C.blue}
          title="Modelo Relacional<br/>PostgreSQL 16"
          sub="8 tabelas projetadas para escalar do monitoramento de uma fazenda ao território nacional."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TABLES.map((t, i) => (
            <motion.div key={t.name} variants={fadeUp} custom={i % 4}
              className="p-5 rounded-xl"
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderTop: `2px solid ${t.color}`,
              }}>
              <div className="font-bold text-sm mb-3" style={{ color: t.color, fontFamily: 'JetBrains Mono, monospace' }}>
                {t.name}
              </div>
              {t.cols.map(col => (
                <div key={col} className="py-0.5 text-xs font-mono" style={{ color: C.txt2 }}>
                  <span style={{ color: '#A0D0FF' }}>— </span>{col}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Relations */}
        <motion.div variants={fadeUp} className="mt-10 p-6 rounded-2xl font-mono text-xs"
          style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.txt2 }}>Relacionamentos</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              'ORGANIZACAO (1) ──→ (N) USUARIO',
              'USUARIO (1) ──→ (N) AREA_MONITORADA',
              'AREA_MONITORADA (N) ←→ (N) FONTE_DADOS',
              'AREA_MONITORADA (1) ──→ (N) ALERTA',
              'AREA_MONITORADA (1) ──→ (N) RELATORIO_AGRI',
              'USUARIO (1) ──→ (N) INTERACAO_IA',
            ].map(r => (
              <div key={r} className="text-xs py-1" style={{ color: '#A0D0FF' }}>{r}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════
   9. DASHBOARD PREVIEW
══════════════════════════════════════════════════ */
function DashboardPreview() {
  const widgets = [
    { label: 'Áreas Monitoradas', value: '247', color: C.blue, icon: MapPin },
    { label: 'Alertas Ativos',    value: '12',  color: C.orange, icon: Bell },
    { label: 'Queimadas (24h)',   value: '8',   color: C.red, icon: Flame },
    { label: 'Cobertura Vegetal', value: '73%', color: C.green, icon: Leaf },
  ];

  const alerts = [
    { tipo: 'QUEIMADA',     reg: 'MT — Chapada dos Guimarães', sev: 'CRÍTICO', color: C.red,    time: '12min' },
    { tipo: 'ENCHENTE',     reg: 'RS — Vale do Taquari',       sev: 'ALTO',    color: C.orange, time: '34min' },
    { tipo: 'DESLIZAMENTO', reg: 'SP — Serra do Mar',          sev: 'ALTO',    color: C.orange, time: '1h' },
    { tipo: 'SECA',         reg: 'CE — Sertão Central',        sev: 'MÉDIO',   color: C.yellow, time: '2h' },
  ];

  return (
    <Section id="dashboard" className="py-28 px-6" style={{ background: C.card }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${C.teal}0C 0%, transparent 60%)`,
      }} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle
          badge="Dashboard"
          badgeColor={C.teal}
          title="Visão orbital de<br/>todo o território"
          sub="Dashboard central com mapa interativo, alertas em tempo real e métricas de todos os módulos em uma única tela."
        />

        {/* Mock dashboard */}
        <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden"
          style={{ background: C.bg, border: `1px solid ${C.border}` }}>
          {/* Topbar */}
          <div className="flex items-center justify-between px-5 py-3.5"
            style={{ borderBottom: `1px solid ${C.border}`, background: C.card }}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: C.teal }}>
                <Satellite size={11} color="#0D1117" />
              </div>
              <span className="font-black text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Nova<span style={{ color: C.teal }}>Terra</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full ml-2"
                style={{ background: `${C.green}18`, color: C.green, border: `1px solid ${C.green}33` }}>
                • Ao vivo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: C.txt2 }}>Última atualização: 3min atrás</span>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.teal }} />
            </div>
          </div>

          <div className="p-5">
            {/* Widget cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {widgets.map((w, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                  <div className="flex items-center justify-between mb-2">
                    <w.icon size={14} color={w.color} />
                    <span className="text-xs" style={{ color: C.txt2 }}>{w.label}</span>
                  </div>
                  <div className="font-black text-2xl" style={{ fontFamily: 'Outfit, sans-serif', color: w.color }}>
                    {w.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Map + Alerts */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Fake map */}
              <div className="md:col-span-2 rounded-xl overflow-hidden relative"
                style={{ background: '#0a1520', border: `1px solid ${C.border}`, minHeight: 220 }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe size={120} color={`${C.teal}22`} strokeWidth={0.5} />
                </div>
                {/* Alert dots */}
                {[
                  { x: '40%', y: '45%', c: C.red },
                  { x: '55%', y: '78%', c: C.orange },
                  { x: '47%', y: '52%', c: C.orange },
                  { x: '42%', y: '35%', c: C.yellow },
                ].map((dot, i) => (
                  <motion.div key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{ left: dot.x, top: dot.y, background: dot.c, boxShadow: `0 0 8px ${dot.c}` }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  />
                ))}
                <div className="absolute bottom-3 left-3 text-xs" style={{ color: C.txt2 }}>
                  🗺 Brasil — 5.570 municípios monitorados
                </div>
              </div>

              {/* Alerts list */}
              <div className="rounded-xl p-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.txt2 }}>Alertas Recentes</div>
                <div className="space-y-2.5">
                  {alerts.map((a, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg"
                      style={{ background: `${a.color}0A`, border: `1px solid ${a.color}22` }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: a.color }} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold" style={{ color: a.color }}>{a.tipo}</span>
                          <span className="text-xs" style={{ color: `${C.txt2}88` }}>{a.time}</span>
                        </div>
                        <div className="text-xs mt-0.5 truncate" style={{ color: C.txt2 }}>{a.reg}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════
   10. CTA FINAL
══════════════════════════════════════════════════ */
function CTASection() {
  return (
    <Section id="cta" className="py-32 px-6" style={{ background: C.bg }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 90% 70% at 50% 50%, ${C.teal}14 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 85% 20%, ${C.blue}10 0%, transparent 50%)
        `,
      }} />
      <StarField />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div variants={fadeUp} custom={0}>
          <Badge color={C.teal}>
            <Satellite size={13} /> Plataforma em desenvolvimento
          </Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} custom={1} className="font-black mt-6 mb-5"
          style={{
            fontFamily: 'Outfit, Inter, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: C.txt,
          }}>
          Comece a monitorar<br />
          <span style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            sua área agora
          </span>
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="text-lg mb-10 max-w-xl mx-auto" style={{ color: C.txt2 }}>
          Junte-se à plataforma que transforma dados orbitais em decisões que protegem vidas, lavouras e o meio ambiente.
        </motion.p>
        <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4 justify-center mb-12">
          <button className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-black text-base transition-all hover:brightness-110 active:scale-95"
            style={{ background: C.teal, color: '#0D1117' }}>
            Criar Conta Grátis <ArrowRight size={18} />
          </button>
          <button className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-black text-base border transition-all hover:border-white/20"
            style={{ borderColor: C.border, color: C.txt2 }}>
            Ver Demo ao Vivo
          </button>
        </motion.div>

        <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-8 justify-center">
          {[
            { icon: Lock,      label: 'Dados Seguros' },
            { icon: Wifi,      label: 'Tempo Real' },
            { icon: FileText,  label: 'Relatórios PDF' },
            { icon: Bell,      label: 'Alertas Multi-canal' },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-2 text-sm" style={{ color: C.txt2 }}>
              <b.icon size={14} color={C.teal} /> {b.label}
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════
   11. FOOTER
══════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-14 px-6" style={{ background: C.card, borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <img src="/novaterra-logo.png" alt="NovaTerra"
              className="w-10 h-10 rounded-xl object-cover"
              style={{ boxShadow: `0 0 16px ${C.teal}44` }} />
            <div>
              <span className="font-black text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Nova<span style={{ color: C.teal }}>Terra</span>
              </span>
              <div className="text-xs" style={{ color: C.txt2 }}>Inteligência Orbital para o Planeta</div>
            </div>
          </div>

          {/* Team */}
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.txt2 }}>Equipe</div>
            <div className="space-y-1 text-sm">
              {[
                ['Rodrigo Eufrasio Costa Pires', 'RM 570208'],
                ['Diego Felippe Scorsi Prado',   'RM 572712'],
                ['Jecika Lilia Cavalcante e Silva Saito', 'RM 568787'],
              ].map(([name, rm]) => (
                <div key={rm} style={{ color: C.txt2 }}>
                  {name} · <span className="font-semibold" style={{ color: C.teal }}>{rm}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FIAP */}
          <div className="text-center lg:text-right">
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.teal }}>Global Solution</div>
            <div className="font-black text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>FIAP · 2026</div>
            <div className="text-xs mt-1" style={{ color: C.txt2 }}>
              Computação, Sistemas de Informação<br />& Análise e Desenvolvimento de Sistemas
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════ */
export default function NovaTerra() {
  return (
    <div style={{ background: C.bg, color: C.txt, fontFamily: 'Inter, system-ui, sans-serif', overflowX: 'hidden' }}>
      <Navbar />
      <HeroSection />
      <ProblemaSection />
      <ModulosSection />
      <ComoFuncionaSection />
      <IASection />
      <FontesDadosSection />
      <DBSection />
      <DashboardPreview />
      <CTASection />
      <Footer />
    </div>
  );
}
