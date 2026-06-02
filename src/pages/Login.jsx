import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth, DEMO_CREDENTIALS } from '../context/AuthContext';
import { darkTheme as C } from '../theme';

const STARS = Array.from({ length: 70 }, (_, i) => ({
  x: (i * 137.5 + 11) % 100,
  y: (i * 83.1 + 7) % 100,
  size: 1 + (i % 3) * 0.6,
  delay: (i * 0.21) % 4.5,
  dur: 2.5 + (i % 5),
}));

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail]   = useState('');
  const [senha, setSenha]   = useState('');
  const [show, setShow]     = useState(false);
  const [erro, setErro]     = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const ok = login(email, senha);
    setLoading(false);
    if (ok) navigate('/dashboard');
    else setErro('Credenciais inválidas. Verifique o e-mail e a senha.');
  };

  const preencherDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setSenha(DEMO_CREDENTIALS.senha);
    setErro('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
      style={{ background: C.bg }}>
      {/* Starfield */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {STARS.map((s, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.08, 0.6, 0.08] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }} />
        ))}
      </div>

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 0%, ${C.teal}1A 0%, transparent 55%),
          radial-gradient(ellipse 50% 50% at 80% 80%, ${C.blue}14 0%, transparent 50%)
        `,
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/novaterra-logo.png" alt="NovaTerra"
            className="w-20 h-20 rounded-2xl object-cover mb-4"
            style={{ boxShadow: `0 0 32px ${C.teal}55` }} />
          <h1 className="font-black text-2xl tracking-tight"
            style={{ fontFamily: 'Outfit, sans-serif', color: C.txt }}>
            Nova<span style={{ color: C.teal }}>Terra</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: C.txt2 }}>Inteligência Orbital para o Planeta</p>
        </div>

        {/* Card */}
        <form onSubmit={submit}
          className="p-7 rounded-2xl"
          style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <h2 className="font-bold text-lg mb-1" style={{ color: C.txt }}>Acessar a Plataforma</h2>
          <p className="text-sm mb-6" style={{ color: C.txt2 }}>Entre com suas credenciais para continuar.</p>

          {/* Email */}
          <label className="block mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.txt2 }}>E-mail</span>
            <div className="relative mt-1.5">
              <Mail size={16} color={C.txt2} className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@novaterra.com" autoComplete="username"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.txt }}
                onFocus={e => e.target.style.borderColor = C.teal}
                onBlur={e => e.target.style.borderColor = C.border} />
            </div>
          </label>

          {/* Senha */}
          <label className="block mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.txt2 }}>Senha</span>
            <div className="relative mt-1.5">
              <Lock size={16} color={C.txt2} className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input type={show ? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)}
                placeholder="••••••••" autoComplete="current-password"
                className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.txt }}
                onFocus={e => e.target.style.borderColor = C.teal}
                onBlur={e => e.target.style.borderColor = C.border} />
              <button type="button" onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: C.txt2 }}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {/* Erro */}
          {erro && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 text-xs mt-3 px-3 py-2 rounded-lg"
              style={{ background: `${C.red}14`, border: `1px solid ${C.red}33`, color: C.red }}>
              <AlertCircle size={14} /> {erro}
            </motion.div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:brightness-110 disabled:opacity-60"
            style={{ background: C.teal, color: '#0D1117' }}>
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 animate-spin"
                style={{ borderColor: '#0D1117', borderTopColor: 'transparent' }} />
            ) : (
              <>Entrar <ArrowRight size={16} /></>
            )}
          </button>

          {/* Demo shortcut */}
          <button type="button" onClick={preencherDemo}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs transition-all"
            style={{ background: `${C.purple}18`, border: `1px solid ${C.purple}33`, color: C.purple }}>
            <Sparkles size={13} /> Preencher credenciais de demonstração
          </button>

          {/* Hint */}
          <div className="mt-5 pt-4 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-xs" style={{ color: C.txt2 }}>
              Acesso demo: <span className="font-mono" style={{ color: C.code }}>admin@novaterra.com</span>
              {' · '}<span className="font-mono" style={{ color: C.code }}>nova2026</span>
            </p>
          </div>
        </form>

        {/* Back to landing */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm font-semibold transition-colors" style={{ color: C.txt2 }}>
            ← Voltar para a página inicial
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
