// ia-lib.jsx — warm premium toolkit for "IA para la Vida Real"
// Loaded after animations.jsx. Exports to window.

const IA = {
  bg:    '#081634',
  bgTop: '#0e2452',
  ink:   '#f3f7fd',
  soft:  '#aab9d0',
  dim:   '#6e80a0',
  gold:  'oklch(82% 0.10 82)',
  goldD: 'oklch(68% 0.10 80)',
  line:  'rgba(220,190,130,0.28)',
  panel: 'rgba(255,255,255,0.045)',
  panelB:'rgba(255,255,255,0.10)',
};
const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'Manrope', system-ui, sans-serif";

// ── Section wrapper: gentle crossfade + slow scale (cinematic breath) ────────
function Section({ start, dur, children, fade = 0.8, drift = true }) {
  const t = useTime();
  const end = start + dur;
  if (t < start - 0.02 || t > end + 0.02) return null;
  const lt = t - start;
  let op = 1;
  if (lt < fade) op = clamp(lt / fade, 0, 1);
  else if (t > end - fade) op = clamp((end - t) / fade, 0, 1);
  const sc = drift ? 1 + 0.012 * clamp(lt / dur, 0, 1) : 1;
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, transform: `scale(${sc})`, transformOrigin: 'center', willChange: 'opacity, transform' }}>
      {children}
    </div>
  );
}

// ── Caption: elegant kinetic line (serif by default) ─────────────────────────
function Cap({
  start, dur = 3, children,
  x = '50%', y = '50%', size = 84, weight = 500,
  color = IA.ink, sans = false, align = 'center',
  width = 1500, lh = 1.06, ls = '0', italic = false, up = 26,
}) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.7, outD = 0.6;
  let op = 1, ty = 0, blur = 0;
  if (lt < inD) { const e = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); op = e; ty = (1 - e) * up; blur = (1 - e) * 6; }
  else if (lt > dur - outD) { const e = Easing.easeInCubic(clamp((lt - (dur - outD)) / outD, 0, 1)); op = 1 - e; ty = -e * up * 0.4; blur = e * 4; }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(${tx}, calc(-50% + ${ty}px))`,
      opacity: op, width, maxWidth: '90vw', textAlign: align, color,
      fontFamily: sans ? SANS : SERIF,
      fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: ls,
      fontStyle: italic ? 'italic' : 'normal',
      filter: blur ? `blur(${blur}px)` : 'none',
      willChange: 'transform, opacity', textWrap: 'balance',
    }}>
      {children}
    </div>
  );
}

// ── Chapter kicker: section TITLE as label (never the word "Escena") ─────────
function Kicker({ start, dur = 3, text, y = '16%', color = IA.gold }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.6, outD = 0.5;
  let op = 1, w = 1;
  if (lt < inD) { op = clamp(lt / inD, 0, 1); w = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); }
  else if (lt > dur - outD) op = clamp((dur - lt) / outD, 0, 1);
  return (
    <div style={{
      position: 'absolute', left: '50%', top: y, transform: 'translate(-50%,-50%)', opacity: op,
      display: 'flex', alignItems: 'center', gap: 18,
      fontFamily: SANS, fontSize: 18, fontWeight: 600, letterSpacing: '0.34em',
      textTransform: 'uppercase', color, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 40 * w, height: 1, background: color, opacity: 0.6 }} />
      {text}
      <span style={{ width: 40 * w, height: 1, background: color, opacity: 0.6 }} />
    </div>
  );
}

// ── Warm, elegant photo placeholder ──────────────────────────────────────────
function Photo({ label, w = 360, h = 240, radius = 10 }) {
  return (
    <div style={{
      width: w, height: h, position: 'relative', overflow: 'hidden', borderRadius: radius,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.085), rgba(255,255,255,0.02) 60%, rgba(220,190,130,0.05))',
      border: `1px solid ${IA.line}`,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
    }}>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 10, padding: 22, textAlign: 'center',
      }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', border: `1px solid ${IA.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: IA.gold }} />
        </div>
        <div style={{ fontFamily: SANS, fontSize: 13.5, letterSpacing: '0.06em', color: IA.soft, lineHeight: 1.4, maxWidth: w - 60 }}>{label}</div>
      </div>
      {/* corner ticks */}
      {['tl', 'tr', 'bl', 'br'].map(p => {
        const b = { position: 'absolute', width: 16, height: 16, borderColor: IA.gold, borderStyle: 'solid', borderWidth: 0, opacity: 0.7 };
        const m = 10;
        const s = p === 'tl' ? { top: m, left: m, borderTopWidth: 1.5, borderLeftWidth: 1.5 }
          : p === 'tr' ? { top: m, right: m, borderTopWidth: 1.5, borderRightWidth: 1.5 }
          : p === 'bl' ? { bottom: m, left: m, borderBottomWidth: 1.5, borderLeftWidth: 1.5 }
          : { bottom: m, right: m, borderBottomWidth: 1.5, borderRightWidth: 1.5 };
        return <div key={p} style={{ ...b, ...s }} />;
      })}
    </div>
  );
}

// ── Soft AI orb — gentle bloom + breathing rings (never a robot) ─────────────
function Orb({ x, y, r = 90, t, intensity = 1, appear = 0 }) {
  const lt = t - appear;
  const e = Easing.easeOutCubic(clamp(lt / 1.0, 0, 1));
  if (lt < -0.02) return null;
  const breathe = 1 + 0.05 * Math.sin(t * 1.6);
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${e})`, opacity: e }}>
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%,-50%) scale(${breathe})`,
        width: r * 4, height: r * 4, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(220,190,130,${0.22 * intensity}), transparent 62%)`,
      }} />
      {[1, 1.5, 2.1].map((m, i) => (
        <div key={i} style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: `translate(-50%,-50%) scale(${breathe + 0.04 * Math.sin(t * 1.4 + i)})`,
          width: r * m, height: r * m, borderRadius: '50%',
          border: `1px solid rgba(220,190,130,${0.4 - i * 0.11})`,
        }} />
      ))}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%,-50%) scale(${breathe})`,
        width: r * 0.9, height: r * 0.9, borderRadius: '50%',
        background: `radial-gradient(circle at 40% 35%, #fff, ${IA.gold} 45%, ${IA.goldD} 100%)`,
        boxShadow: `0 0 ${40 * intensity}px rgba(220,190,130,0.6)`,
      }} />
    </div>
  );
}

// ── Soft background: blue gradient, drifting blooms, gentle particles ────────
function GlobalBG() {
  const t = useTime();
  const ax = 32 + Math.sin(t * 0.07) * 12, ay = 28 + Math.cos(t * 0.05) * 10;
  const bx = 72 + Math.cos(t * 0.06) * 12, by = 70 + Math.sin(t * 0.045) * 9;
  const dots = React.useMemo(() => Array.from({ length: 34 }, (_, i) => ({
    x: (i * 53 % 100), bx: ((i * 37 + 13) % 100), r: 1.2 + (i % 4) * 0.7,
    sp: 1.4 + (i % 5) * 0.5, ph: (i * 0.7) % 6.28, op: 0.12 + (i % 3) * 0.06,
  })), []);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `linear-gradient(165deg, ${IA.bgTop}, ${IA.bg} 62%, #050f25)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 760px at ${ax}% ${ay}%, rgba(60,110,200,0.20), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 680px at ${bx}% ${by}%, rgba(220,190,130,0.10), transparent 60%)` }} />
      {dots.map((d, i) => {
        const y = (90 - ((t * d.sp) % 100)) ;
        const tw = 0.5 + 0.5 * Math.sin(t * 0.8 + d.ph);
        return <div key={i} style={{ position: 'absolute', left: `${d.x}%`, top: `${y}%`, width: d.r * 2, height: d.r * 2, borderRadius: '50%', background: i % 6 === 0 ? IA.gold : '#cdd9ee', opacity: d.op * tw }} />;
      })}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 110% at 50% 45%, transparent 52%, rgba(3,8,22,0.6) 100%)' }} />
    </div>
  );
}

// ── Connector line that draws itself (soft gold, no harsh glow) ──────────────
function Draw({ x1, y1, x2, y2, start, dur = 0.9, color = IA.line, width = 1.5, dash }) {
  const t = useTime();
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round"
        strokeDasharray={dash || `${len} ${len}`} strokeDashoffset={(1 - e) * (dash ? 0 : len)} opacity={dash ? e : 1} />
    </svg>
  );
}

// ── Bottom chapter chrome (no word "Escena") ─────────────────────────────────
function Chrome({ no, total = 10, title }) {
  return (
    <div style={{
      position: 'absolute', left: 64, bottom: 52, zIndex: 40,
      fontFamily: SANS, fontSize: 14, letterSpacing: '0.22em', color: IA.soft,
      display: 'flex', alignItems: 'center', gap: 16, textTransform: 'uppercase',
    }}>
      <span style={{ color: IA.gold, fontWeight: 700 }}>{String(no).padStart(2, '0')}</span>
      <span style={{ opacity: 0.4 }}>/ {String(total).padStart(2, '0')}</span>
      <span style={{ width: 34, height: 1, background: IA.line }} />
      <span style={{ color: IA.soft }}>{title}</span>
    </div>
  );
}

Object.assign(window, { IA, SERIF, SANS, Section, Cap, Kicker, Photo, Orb, GlobalBG, Draw, Chrome });
