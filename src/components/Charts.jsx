import React from 'react';
import { useTheme } from '../context/ThemeContext';

/* ── LINE CHART ── */
export function LineChart({ data, color, height = 64 }) {
  const { C } = useTheme();
  const lineColor = color || C.teal;
  const W = 290, H = 80;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const step = W / (data.length - 1);
  const pts = data.map((v, i) => ({
    x: i * step,
    y: H - 4 - ((v - min) / range) * (H - 14),
  }));
  const pathD  = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaD  = `${pathD} L${pts[pts.length-1].x},${H} L0,${H} Z`;
  const gradId = `lg${lineColor.replace('#', '')}`;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={lineColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradId})`} />
      <path d={pathD} stroke={lineColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="3.5" fill={lineColor} />
    </svg>
  );
}

/* ── SPARKLINE ── */
export function Sparkline({ data, color, height = 32 }) {
  const { C } = useTheme();
  const lineColor = color || C.teal;
  const W = 100, H = 40;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const step = W / (data.length - 1);
  const pts = data.map((v, i) => ({
    x: i * step,
    y: H - 2 - ((v - min) / range) * (H - 6),
  }));
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <path d={d} stroke={lineColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── BAR CHART ── */
export function BarChart({ data, height = 100 }) {
  const { C } = useTheme();
  const max = Math.max(...data.map(d => d.val));
  return (
    <div style={{ height }} className="flex items-end gap-2">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-full rounded-t" style={{
            height: `${((d.val / max) * (height - 24))}px`,
            background: d.color,
            opacity: 0.85,
          }} />
          <span className="text-xs font-bold" style={{ color: C.txt2 }}>{d.reg}</span>
        </div>
      ))}
    </div>
  );
}

/* ── DONUT CHART ── */
export function DonutChart({ segments, size = 110 }) {
  const { C } = useTheme();
  const total = segments.reduce((s, g) => s + g.val, 0);
  const r = 38, cx = 55, cy = 55;
  let cum = 0;
  const arcs = segments.map(seg => {
    const pct = seg.val / total;
    const a1 = cum * 2 * Math.PI - Math.PI / 2;
    const a2 = (cum + pct) * 2 * Math.PI - Math.PI / 2;
    cum += pct;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const large = pct > 0.5 ? 1 : 0;
    return { ...seg, d: `M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z` };
  });
  return (
    <svg width={size} height={size} viewBox="0 0 110 110">
      {arcs.map((a, i) => <path key={i} d={a.d} fill={a.color} stroke={C.card} strokeWidth="2" />)}
      <circle cx={cx} cy={cy} r="25" fill={C.card} />
    </svg>
  );
}

/* ── PROGRESS BAR ── */
export function ProgressBar({ value, max = 100, color, height = 6 }) {
  const { C } = useTheme();
  const barColor = color || C.teal;
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, background: `${barColor}22` }}>
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: barColor }} />
    </div>
  );
}

/* ── NDVI SCALE ── */
export function NdviScale({ value }) {
  const { C } = useTheme();
  const pct = ((value + 1) / 2) * 100;
  const color = value < 0.2 ? C.red : value < 0.4 ? C.orange : value < 0.6 ? C.yellow : value < 0.75 ? '#8BC34A' : C.green;
  return (
    <div>
      <div className="w-full h-3 rounded-full relative overflow-hidden mb-1.5" style={{
        background: 'linear-gradient(to right, #B71C1C, #E53935, #F4A261, #FFC107, #8BC34A, #43A047, #1B5E20)',
      }}>
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-5 rounded-sm"
          style={{ left: `${pct}%`, background: '#fff', boxShadow: '0 0 4px rgba(0,0,0,0.6)' }} />
      </div>
      <div className="flex justify-between text-xs" style={{ color: C.txt2 }}>
        <span>-1</span><span>0</span><span style={{ color }}>▲ {value.toFixed(2)}</span><span>+1</span>
      </div>
    </div>
  );
}

/* ── RISK GAUGE ── */
export function RiskGauge({ value }) {
  const { C } = useTheme();
  const color = value >= 80 ? C.red : value >= 60 ? C.orange : value >= 40 ? C.yellow : C.green;
  const pct   = value / 100;
  const r = 36, cx = 50, cy = 52;
  const x1 = cx + r * Math.cos(-Math.PI), y1 = cy + r * Math.sin(-Math.PI);
  const angle = -Math.PI + pct * Math.PI;
  const x2 = cx + r * Math.cos(angle),   y2 = cy + r * Math.sin(angle);
  const large = pct > 0.5 ? 1 : 0;
  return (
    <svg width="100" height="60" viewBox="0 0 100 60">
      <path d={`M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy}`}
        fill="none" stroke={`${color}22`} strokeWidth="8" strokeLinecap="round" />
      <path d={`M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)}`}
        fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="bold" fill={color}>{value}</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7" fill={C.txt2}>/ 100</text>
    </svg>
  );
}
