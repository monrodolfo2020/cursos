// m4-lib.jsx — Módulo 4 "Actuadores y elementos finales de control".
// LIGHT theme: blanco + azul claro + naranja. Self-contained; depends only on
// animations.jsx (clamp, Easing, useTime, Stage). Exports to window with M4 suffix.

const TL4 = {
  bg:      '#f2f7fd',
  bg2:     '#e6f0fb',
  paper:   '#ffffff',
  ink:     '#0f2b4a',
  mut:     '#5b7388',
  dim:     '#9bb0c6',
  line:    'rgba(43,120,210,0.10)',
  lineS:   'rgba(43,120,210,0.22)',
  blue:    '#2f86e6',           // azul claro — primario
  blueD:   '#1f66bf',
  blueLt:  '#7db6f2',
  blueWash:'#e2f0fd',
  orange:  '#f48a3c',           // naranja — acento
  orangeD: '#df6f1f',
  orangeWash:'#fdeadd',
  ok:      '#2fae6a',
  shadow:  '0 16px 46px rgba(28,78,148,0.16)',
  shadowSm:'0 6px 18px rgba(28,78,148,0.12)',
};
const DISP4 = "'Space Grotesk', system-ui, sans-serif";
const MONO4 = "'IBM Plex Mono', ui-monospace, monospace";

function pop4(t, appear, d = 0.5, rise = 18) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.94, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  const eb = Easing.easeOutBack(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.94 + 0.06 * eb, ty: (1 - e) * rise };
}

// ── Scene wrapper (crossfade) ────────────────────────────────────────────────
function SceneM4({ start, dur, children, fade = 0.55 }) {
  const t = useTime();
  const end = start + dur;
  if (t < start - 0.02 || t > end + 0.02) return null;
  const lt = t - start;
  let op = 1;
  if (lt < fade) op = clamp(lt / fade, 0, 1);
  else if (t > end - fade) op = clamp((end - t) / fade, 0, 1);
  return <div style={{ position: 'absolute', inset: 0, opacity: op, willChange: 'opacity' }}>{children}</div>;
}

// ── Caption ─────────────────────────────────────────────────────────────────
function CapM4({ start, dur = 2.6, children, x = '50%', y = '50%', size = 60, weight = 600, color = TL4.ink, mono = false, align = 'center', width = 1500, lh = 1.12, ls = '-0.01em', up = 22 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.5, outD = 0.42;
  let op = 1, ty = 0;
  if (lt < inD) { const e = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); op = e; ty = (1 - e) * up; }
  else if (lt > dur - outD) { const e = Easing.easeInCubic(clamp((lt - (dur - outD)) / outD, 0, 1)); op = 1 - e; ty = -e * up * 0.5; }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx}, calc(-50% + ${ty}px))`, opacity: op, width, maxWidth: '92vw', textAlign: align, color, fontFamily: mono ? MONO4 : DISP4, fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: ls, willChange: 'transform, opacity', textWrap: 'balance' }}>
      {children}
    </div>
  );
}

// ── Kicker ────────────────────────────────────────────────────────────────────
function KickerM4({ start, dur = 3, text, x = '50%', y = '50%', align = 'center', color = TL4.blue, size = 17 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.4, outD = 0.35;
  let op = 1;
  if (lt < inD) op = clamp(lt / inD, 0, 1);
  else if (lt > dur - outD) op = clamp((dur - lt) / outD, 0, 1);
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx},-50%)`, opacity: op, color, fontFamily: MONO4, fontSize: size, letterSpacing: '0.3em', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: align, display: 'flex', alignItems: 'center', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <span style={{ width: 26, height: 2, background: color, opacity: 0.7 }} />
      {text}
      <span style={{ width: 26, height: 2, background: color, opacity: 0.7 }} />
    </div>
  );
}

// ── Corner brackets ──────────────────────────────────────────────────────────
function BracketsM4({ color = TL4.blue, size = 18, thick = 2, inset = 0 }) {
  const c = (pos) => {
    const base = { position: 'absolute', width: size, height: size, borderColor: color, borderStyle: 'solid', borderWidth: 0 };
    const m = inset;
    if (pos === 'tl') return { ...base, top: m, left: m, borderTopWidth: thick, borderLeftWidth: thick };
    if (pos === 'tr') return { ...base, top: m, right: m, borderTopWidth: thick, borderRightWidth: thick };
    if (pos === 'bl') return { ...base, bottom: m, left: m, borderBottomWidth: thick, borderLeftWidth: thick };
    return { ...base, bottom: m, right: m, borderBottomWidth: thick, borderRightWidth: thick };
  };
  return <>{['tl', 'tr', 'bl', 'br'].map(p => <div key={p} style={c(p)} />)}</>;
}

// ── Image / diagram placeholder ──────────────────────────────────────────────
function SlotM4({ label, tag, w = 360, h = 230, accent = TL4.blue }) {
  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', background: 'repeating-linear-gradient(125deg, #eef4fb 0 11px, #e4eef9 11px 22px)', border: `1px solid ${TL4.lineS}`, borderRadius: 6 }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, textAlign: 'center' }}>
        <div style={{ fontFamily: MONO4, fontSize: 12, letterSpacing: '0.16em', color: accent, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      </div>
      {tag && <div style={{ position: 'absolute', top: 8, left: 8, fontFamily: MONO4, fontSize: 10, letterSpacing: '0.14em', color: TL4.dim }}>{tag}</div>}
      <BracketsM4 color={accent} size={16} thick={1.5} inset={6} />
    </div>
  );
}

// ── Light background: airy white + faint blue blueprint grid + soft washes ────
function GlobalBGM4() {
  const t = useTime();
  const ax = 18 + Math.sin(t * 0.07) * 8, ay = 16 + Math.cos(t * 0.05) * 6;
  const bx = 86 + Math.cos(t * 0.06) * 8, by = 86 + Math.sin(t * 0.045) * 6;
  const gridShift = (t * 3.4) % 56;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `linear-gradient(165deg, ${TL4.bg2}, ${TL4.bg})` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 860px at ${ax}% ${ay}%, rgba(47,134,230,0.18), transparent 62%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 640px at ${bx}% ${by}%, rgba(244,138,60,0.13), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: '-60px', backgroundImage: `linear-gradient(${TL4.line} 1px, transparent 1px), linear-gradient(90deg, ${TL4.line} 1px, transparent 1px)`, backgroundSize: '56px 56px', transform: `translate(${-gridShift}px, ${-gridShift * 0.5}px)`, maskImage: 'radial-gradient(ellipse 86% 82% at 50% 45%, #000 42%, transparent 92%)', WebkitMaskImage: 'radial-gradient(ellipse 86% 82% at 50% 45%, #000 42%, transparent 92%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 120% at 50% 48%, transparent 55%, rgba(20,60,120,0.08) 100%)' }} />
    </div>
  );
}

// ── DrawLine ─────────────────────────────────────────────────────────────────
function DrawLineM4({ x1, y1, x2, y2, start, dur = 0.8, color = TL4.blue, width = 2, dash }) {
  const t = useTime();
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash || `${len} ${len}`} strokeDashoffset={dash ? 0 : (1 - e) * len} opacity={dash ? e : 1} />
    </svg>
  );
}

// ── Animated dashed signal line ───────────────────────────────────────────────
function SignalM4({ d, start, t, color = TL4.blue, width = 4, dur = 0.8, speed = 50, live = true }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const off = -(t * speed) % 26;
  return (
    <>
      <path d={d} fill="none" stroke={`color-mix(in oklch, ${color} 24%, transparent)`} strokeWidth={width + 6} strokeLinecap="round" strokeLinejoin="round" opacity={e} />
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14 12" strokeDashoffset={live ? off : 0} opacity={e} />
    </>
  );
}

// ── Process pipe (thick, soft) ────────────────────────────────────────────────
function PipeM4({ d, start, t, color = TL4.blue, dur = 0.8, speed = 32 }) {
  const e = Easing.easeOutCubic(clamp((t - start) / dur, 0, 1));
  const flow = -(t * speed) % 24;
  return (
    <>
      <path d={d} fill="none" stroke="rgba(47,134,230,0.16)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" opacity={e} />
      <path d={d} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray="14 12" strokeDashoffset={flow} opacity={e * 0.9} />
    </>
  );
}

// ── Title card ─────────────────────────────────────────────────────────────────
function TitleCardM4({ start, dur, claseNo, title, dudur, objetivo }) {
  const t = useTime();
  const s = start, end = start + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const big = pop4(t, s + 0.3, 0.8, 0);
  const ti = pop4(t, s + 0.9, 0.7, 20);
  const ob = pop4(t, s + 2.0, 0.7, 16);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', right: '5%', top: '50%', transform: `translateY(-50%) scale(${big.sc})`, opacity: big.op * 0.10, fontFamily: DISP4, fontSize: 680, fontWeight: 700, color: TL4.blue, lineHeight: 0.8, letterSpacing: '-0.04em' }}>{String(claseNo).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', left: '9%', top: '50%', transform: 'translateY(-50%)', width: 1220 }}>
        <KickerM4 start={s + 0.4} dur={dur - 0.6} text={`Módulo 4 · Clase 4.${claseNo}`} x="0" y="-130px" align="left" />
        <div style={{ opacity: ti.op, transform: `translateY(${ti.ty}px)`, fontFamily: DISP4, fontSize: 88, fontWeight: 700, color: TL4.ink, lineHeight: 1.02, letterSpacing: '-0.02em', textWrap: 'balance' }}>{title}</div>
        <div style={{ marginTop: 30, opacity: ob.op, transform: `translateY(${ob.ty}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1000 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 44, height: 3, background: TL4.orange, borderRadius: 2 }} />
            <span style={{ fontFamily: MONO4, fontSize: 16, letterSpacing: '0.22em', color: TL4.orangeD, textTransform: 'uppercase', fontWeight: 600 }}>Duración {dudur}</span>
          </div>
          <div style={{ fontFamily: DISP4, fontSize: 30, fontWeight: 400, color: TL4.mut, lineHeight: 1.4 }}>{objetivo}</div>
        </div>
      </div>
    </div>
  );
}

// ── Info card ─────────────────────────────────────────────────────────────────
function InfoCardM4({ x, y, w = 360, h = 300, no, Icon, accent = TL4.blue, title, sub, appear, t }) {
  const { op, sc, ty } = pop4(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 12, border: `1px solid ${TL4.lineS}`, background: TL4.paper, boxShadow: TL4.shadow, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
        {no != null && <div style={{ fontFamily: MONO4, fontSize: 13, letterSpacing: '0.24em', color: TL4.dim }}>{String(no).padStart(2, '0')}</div>}
        {Icon && <div style={{ marginTop: 2 }}><Icon c={accent} t={t} /></div>}
        <div style={{ fontFamily: DISP4, fontSize: 31, fontWeight: 700, color: TL4.ink, letterSpacing: '-0.01em', lineHeight: 1.06 }}>{title}</div>
        <div style={{ fontFamily: DISP4, fontSize: 19, fontWeight: 400, color: TL4.mut, lineHeight: 1.4 }}>{sub}</div>
        <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: accent, borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ── Stat / value chip ──────────────────────────────────────────────────────────
function StatM4({ x, y, value, unit, label, accent = TL4.blue, appear, t, align = 'left' }) {
  const { op, ty } = pop4(t, appear, 0.5, 16);
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: op, transform: `translateY(${ty}px)`, textAlign: align }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <span style={{ fontFamily: DISP4, fontSize: 76, fontWeight: 700, color: accent, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{value}</span>
        {unit && <span style={{ fontFamily: MONO4, fontSize: 26, fontWeight: 500, color: TL4.mut }}>{unit}</span>}
      </div>
      {label && <div style={{ marginTop: 10, fontFamily: MONO4, fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', color: TL4.dim }}>{label}</div>}
    </div>
  );
}

// ── Closing ─────────────────────────────────────────────────────────────────
function ClosingM4({ start, dur, line, activityLabel, activity }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const a = pop4(t, s + 1.4, 0.6, 18);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 8%' }}>
      <div style={{ fontFamily: DISP4, fontSize: 62, fontWeight: 600, color: TL4.ink, textAlign: 'center', lineHeight: 1.12, letterSpacing: '-0.01em', maxWidth: 1500, textWrap: 'balance' }}>{line}</div>
      {activity && (
        <div style={{ opacity: a.op, transform: `translateY(${a.ty}px)`, display: 'flex', alignItems: 'stretch', borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL4.lineS}`, boxShadow: TL4.shadowSm, maxWidth: 1320, background: TL4.paper }}>
          <div style={{ background: TL4.orange, color: '#fff', fontFamily: MONO4, fontSize: 15, fontWeight: 600, letterSpacing: '0.16em', padding: '20px 24px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{activityLabel || 'Actividad'}</div>
          <div style={{ color: TL4.ink, fontFamily: DISP4, fontSize: 24, fontWeight: 400, padding: '18px 28px', display: 'flex', alignItems: 'center', lineHeight: 1.35 }}>{activity}</div>
        </div>
      )}
    </div>
  );
}

// ── Shell + chrome + progress ─────────────────────────────────────────────────
function ClassShellM4({ scenes, claseNo, claseName }) {
  let acc = 0;
  const timed = scenes.map(sc => { const o = { ...sc, start: acc }; acc += sc.dur; return o; });
  const total = acc;
  return (
    <Stage width={1920} height={1080} duration={total} background={TL4.bg} persistKey={`m4c${claseNo}`}>
      <div id="video-root" data-screen-label={`M4 Clase 4.${claseNo}`} style={{ position: 'absolute', inset: 0 }}>
        <GlobalBGM4 />
        {timed.map((sc, i) => <sc.C key={i} start={sc.start} dur={sc.dur} />)}
        <ChromeM4 timed={timed} claseNo={claseNo} claseName={claseName} />
        <ProgressM4 timed={timed} />
      </div>
    </Stage>
  );
}
function ChromeM4({ timed, claseNo, claseName }) {
  const t = useTime();
  let label = '';
  for (const sc of timed) if (t >= sc.start - 0.0001) label = sc.label || '';
  return (
    <div style={{ position: 'absolute', left: 54, bottom: 46, zIndex: 40, fontFamily: MONO4, fontSize: 13, letterSpacing: '0.2em', color: TL4.mut, display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase' }}>
      <span style={{ color: TL4.blueD, fontWeight: 600 }}>M4 · CLASE 4.{claseNo}</span>
      <span style={{ width: 30, height: 1, background: TL4.lineS }} />
      <span>{claseName}</span>
      {label && <><span style={{ width: 30, height: 1, background: TL4.lineS }} /><span style={{ color: TL4.dim }}>{label}</span></>}
    </div>
  );
}
function ProgressM4({ timed }) {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', top: 40, right: 54, zIndex: 40, display: 'flex', gap: 6, alignItems: 'center' }}>
      {timed.map((sc, i) => {
        const active = t >= sc.start && t < sc.start + sc.dur;
        const done = t >= sc.start + sc.dur;
        return <div key={i} style={{ width: active ? 30 : 16, height: 3, borderRadius: 2, background: active ? TL4.orange : (done ? TL4.blue : 'rgba(40,90,150,0.16)'), transition: 'width 200ms' }} />;
      })}
    </div>
  );
}

// ── Line icons (stroke takes `c`) ────────────────────────────────────────────
function IcoValve({ c = TL4.blue }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <line x1="8" y1="40" x2="56" y2="40" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    <polygon points="20,30 32,40 20,50" stroke={c} strokeWidth="2.6" fill="none" strokeLinejoin="round" />
    <polygon points="44,30 32,40 44,50" stroke={c} strokeWidth="2.6" fill="none" strokeLinejoin="round" />
    <line x1="32" y1="40" x2="32" y2="20" stroke={c} strokeWidth="2.6" />
    <rect x="22" y="10" width="20" height="10" rx="2" stroke={c} strokeWidth="2.6" />
  </svg>);
}
function IcoActuator({ c = TL4.blue }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <path d="M16 22 Q32 12 48 22 L48 30 Q32 24 16 30 Z" stroke={c} strokeWidth="2.6" fill="none" strokeLinejoin="round" />
    <line x1="32" y1="30" x2="32" y2="46" stroke={c} strokeWidth="2.6" />
    <line x1="14" y1="50" x2="50" y2="50" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    <polygon points="24,42 32,50 40,42" stroke={c} strokeWidth="2.4" fill="none" strokeLinejoin="round" />
  </svg>);
}
function IcoMotor({ c = TL4.blue, t = 0 }) {
  const a = t * 120;
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="18" stroke={c} strokeWidth="2.6" />
    <g transform={`rotate(${a} 32 32)`}>
      <line x1="32" y1="18" x2="32" y2="46" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="18" y1="32" x2="46" y2="32" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
    </g>
    <text x="32" y="37" fill={c} fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="700" textAnchor="middle">M</text>
  </svg>);
}
function IcoDrive({ c = TL4.blue, t = 0 }) {
  const o = (t * 18) % 14;
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <rect x="12" y="14" width="40" height="36" rx="4" stroke={c} strokeWidth="2.6" />
    <path d="M18 38 q4 -12 8 0 t8 0 8 0" stroke={c} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeDasharray="3 3" strokeDashoffset={-o} />
    <line x1="20" y1="22" x2="44" y2="22" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>);
}
function IcoPump({ c = TL4.blue, t = 0 }) {
  const a = t * 200;
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="18" stroke={c} strokeWidth="2.6" />
    <g transform={`rotate(${a} 32 32)`}>
      <path d="M32 32 L32 16 M32 32 L46 40 M32 32 L18 40" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
    </g>
    <line x1="50" y1="32" x2="58" y2="24" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
  </svg>);
}
function IcoRelay({ c = TL4.blue }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <rect x="12" y="16" width="20" height="32" rx="3" stroke={c} strokeWidth="2.6" />
    <line x1="18" y1="24" x2="26" y2="24" stroke={c} strokeWidth="2.2" />
    <line x1="18" y1="32" x2="26" y2="32" stroke={c} strokeWidth="2.2" />
    <line x1="18" y1="40" x2="26" y2="40" stroke={c} strokeWidth="2.2" />
    <line x1="32" y1="22" x2="44" y2="22" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    <line x1="44" y1="22" x2="52" y2="40" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="44" cy="22" r="2.4" fill={c} />
    <line x1="52" y1="40" x2="52" y2="48" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
  </svg>);
}
function IcoGaugeM4({ c = TL4.blue, t = 0 }) {
  const a = -120 + (60 + 40 * Math.sin(t * 1.5));
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <path d="M12 42 A 20 20 0 0 1 52 42" stroke={c} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <line x1="32" y1="42" x2={32 + 16 * Math.cos(a * Math.PI / 180)} y2={42 + 16 * Math.sin(a * Math.PI / 180)} stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="32" cy="42" r="3.4" fill={c} />
  </svg>);
}

Object.assign(window, {
  TL4, DISP4, MONO4, pop4,
  SceneM4, CapM4, KickerM4, BracketsM4, SlotM4, GlobalBGM4, DrawLineM4, SignalM4, PipeM4,
  TitleCardM4, InfoCardM4, StatM4, ClosingM4, ClassShellM4, ChromeM4, ProgressM4,
  IcoValve, IcoActuator, IcoMotor, IcoDrive, IcoPump, IcoRelay, IcoGaugeM4,
});
