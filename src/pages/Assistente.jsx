import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Satellite, User, Zap, FileText, Bell, Leaf, Droplets } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CHAT_INICIAL } from '../data/mock';

const CHIPS = [
  { label: 'Gerar Relatório', icon: FileText },
  { label: 'Ver Alertas',     icon: Bell    },
  { label: 'Status AgriSat',  icon: Leaf    },
  { label: 'Créditos CO₂',   icon: Droplets },
];

const RESPOSTAS_AUTO = [
  'Consultando dados satelitais em tempo real via NASA MODIS e ESA Sentinel-2...',
  'Analisando séries temporais com modelo LSTM. Aguarde um instante.',
  'Processando imagem orbital capturada há 12 minutos. Aplicando CNN para análise de padrões...',
  'Integração com INPE CBERS confirmada. Dados disponíveis para sua área de interesse.',
];

function formatMsg(text) {
  const html = text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function Assistente() {
  const { C } = useTheme();
  const [msgs, setMsgs]     = useState(CHAT_INICIAL);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef           = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  const send = async (text) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setMsgs(prev => [...prev, { id: prev.length + 1, role: 'user', text, ts: now }]);
    setInput('');
    setTyping(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    setTyping(false);
    const resp = RESPOSTAS_AUTO[Math.floor(Math.random() * RESPOSTAS_AUTO.length)];
    setMsgs(prev => [...prev, {
      id: prev.length + 1, role: 'ia', text: resp,
      ts: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  return (
    <div className="flex flex-col h-full" style={{ maxHeight: 'calc(100vh - 64px - 40px)' }}>
      <div className="flex-1 overflow-y-auto space-y-5 pb-4">
        {msgs.map(m => (
          <motion.div key={m.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center self-end"
              style={{
                background: m.role === 'ia' ? `${C.purple}22` : `${C.teal}22`,
                border: `1px solid ${m.role === 'ia' ? C.purple + '44' : C.teal + '44'}`,
              }}>
              {m.role === 'ia'
                ? <Satellite size={15} color={C.purple} />
                : <User size={15} color={C.teal} />}
            </div>

            <div className={`max-w-[70%] space-y-1 ${m.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div className="text-xs" style={{ color: `${C.txt2}88` }}>
                {m.role === 'ia' ? 'Nova' : 'Você'} · {m.ts}
              </div>
              <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: m.role === 'ia' ? C.sidebar : `${C.teal}22`,
                  border: `1px solid ${m.role === 'ia' ? C.border : C.teal + '33'}`,
                  color: C.txt2,
                  borderBottomLeftRadius: m.role === 'ia' ? 4 : undefined,
                  borderBottomRightRadius: m.role === 'user' ? 4 : undefined,
                }}>
                {formatMsg(m.text)}
              </div>
              {m.action && (
                <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl"
                  style={{ background: `${C.teal}22`, color: C.teal, border: `1px solid ${C.teal}33` }}>
                  <Zap size={11} /> {m.action}
                </button>
              )}
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${C.purple}22`, border: `1px solid ${C.purple}44` }}>
                <Satellite size={15} color={C.purple} />
              </div>
              <div className="px-4 py-3 rounded-2xl" style={{ background: C.sidebar, border: `1px solid ${C.border}` }}>
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: C.purple }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 flex-wrap pb-3 pt-1">
        {CHIPS.map(c => (
          <button key={c.label} onClick={() => send(c.label)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{ background: C.card, color: C.txt2, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
            <c.icon size={12} /> {c.label}
          </button>
        ))}
      </div>

      <div className="flex gap-3 pt-3" style={{ borderTop: `1px solid ${C.border}` }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Pergunte sobre suas áreas monitoradas..."
          className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{ background: C.card, border: `1px solid ${C.border}`, color: C.txt, boxShadow: C.shadow }}
          onFocus={e => e.target.style.borderColor = C.teal}
          onBlur={e => e.target.style.borderColor = C.border}
        />
        <button onClick={() => send(input)} disabled={!input.trim() || typing}
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
          style={{ background: C.teal }}>
          <Send size={17} color="#0D1117" />
        </button>
      </div>
    </div>
  );
}
