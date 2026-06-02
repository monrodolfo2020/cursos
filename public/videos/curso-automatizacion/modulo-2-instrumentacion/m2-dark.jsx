// m2-dark.jsx — Dark "carbon + orange" theme (ported from m1-lib + m2-lib).
// Loaded after animations.jsx. Uses clamp, Easing, useTime from it. Exports to window.

const TL = {
  bg:    '#0c0a07',
  bg2:   '#15100a',
  paper: '#1b1610',
  ink:   '#f6efe4',
  mut:   '#a99c89',
  dim:   '#6e6253',
  line:  'rgba(255,176,110,0.12)',
  lineS: 'rgba(255,176,110,0.26)',
  blue:  'oklch(78% 0.14 62)',    // amber-gold (secondary)
  blueD: 'oklch(66% 0.15 55)',
  blueWash: 'oklch(30% 0.08 55)',
  clay:  'oklch(66% 0.16 38)',    // burnt orange (tertiary)
  clayWash: 'oklch(30% 0.07 40)',
  shadow: '0 14px 44px rgba(0,0,0,0.55)',
  shadowSm: '0 6px 18px rgba(0,0,0,0.45)',
};
const DISPL = "'Space Grotesk', system-ui, sans-serif";
const MONOL = "'IBM Plex Mono', ui-monospace, monospace";

function popL(t, appear, d = 0.5, rise = 18) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.94, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  const eb = Easing.easeOutBack(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.94 + 0.06 * eb, ty: (1 - e) * rise };
}

// ── Scene wrapper (crossfade) ────────────────────────────────────────────────
function SceneL({ start, dur, children, fade = 0.55 }) {
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
function CapL({ start, dur = 2.6, children, x = '50%', y = '50%', size = 60, weight = 600, color = TL.ink, mono = false, align = 'center', width = 1500, lh = 1.1, ls = '-0.01em', up = 22 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.5, outD = 0.42;
  let op = 1, ty = 0;
  if (lt < inD) { const e = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); op = e; ty = (1 - e) * up; }
  else if (lt > dur - outD) { const e = Easing.easeInCubic(clamp((lt - (dur - outD)) / outD, 0, 1)); op = 1 - e; ty = -e * up * 0.5; }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx}, calc(-50% + ${ty}px))`, opacity: op, width, maxWidth: '92vw', textAlign: align, color, fontFamily: mono ? MONOL : DISPL, fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: ls, willChange: 'transform, opacity', textWrap: 'balance' }}>
      {children}
    </div>
  );
}

// ── Kicker (light) ───────────────────────────────────────────────────────────
function KickerL({ start, dur = 3, text, x = '50%', y = '50%', align = 'center', color = TL.blue, size = 17 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.4, outD = 0.35;
  let op = 1;
  if (lt < inD) op = clamp(lt / inD, 0, 1);
  else if (lt > dur - outD) op = clamp((dur - lt) / outD, 0, 1);
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx},-50%)`, opacity: op, color, fontFamily: MONOL, fontSize: size, letterSpacing: '0.3em', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: align, display: 'flex', alignItems: 'center', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <span style={{ width: 26, height: 2, background: color, opacity: 0.6 }} />
      {text}
      <span style={{ width: 26, height: 2, background: color, opacity: 0.6 }} />
    </div>
  );
}

// ── Corner brackets ──────────────────────────────────────────────────────────
function BracketsL({ color = TL.blue, size = 18, thick = 2, inset = 0 }) {
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

// ── Image placeholder (light) ────────────────────────────────────────────────
function SlotL({ label, tag, w = 360, h = 230, accent = TL.blue }) {
  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', background: 'repeating-linear-gradient(125deg, #241d14 0 11px, #1b1610 11px 22px)', border: `1px solid ${TL.lineS}`, borderRadius: 6 }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, textAlign: 'center' }}>
        <div style={{ fontFamily: MONOL, fontSize: 12, letterSpacing: '0.16em', color: accent, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      </div>
      {tag && <div style={{ position: 'absolute', top: 8, left: 8, fontFamily: MONOL, fontSize: 10, letterSpacing: '0.14em', color: TL.dim }}>{tag}</div>}
      <BracketsL color={accent} size={16} thick={1.5} inset={6} />
    </div>
  );
}

// ── Light background: airy blueprint grid + soft washes ──────────────────────
function GlobalBGL() {
  const t = useTime();
  const ax = 22 + Math.sin(t * 0.07) * 9, ay = 18 + Math.cos(t * 0.05) * 7;
  const bx = 82 + Math.cos(t * 0.06) * 9, by = 84 + Math.sin(t * 0.045) * 6;
  const gridShift = (t * 4) % 56;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `linear-gradient(160deg, ${TL.bg2}, ${TL.bg})` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 840px at ${ax}% ${ay}%, oklch(60% 0.18 52 / 0.32), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 700px at ${bx}% ${by}%, oklch(52% 0.15 32 / 0.22), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: '-60px', backgroundImage: `linear-gradient(${TL.line} 1px, transparent 1px), linear-gradient(90deg, ${TL.line} 1px, transparent 1px)`, backgroundSize: '56px 56px', transform: `translate(${-gridShift}px, ${-gridShift * 0.5}px)`, maskImage: 'radial-gradient(ellipse 85% 80% at 50% 45%, #000 40%, transparent 90%)', WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 45%, #000 40%, transparent 90%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,0.6) 100%)' }} />
    </div>
  );
}

// ── DrawLine (light) ─────────────────────────────────────────────────────────
function DrawLineL({ x1, y1, x2, y2, start, dur = 0.8, color = TL.blue, width = 2, dash }) {
  const t = useTime();
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash || `${len} ${len}`} strokeDashoffset={dash ? 0 : (1 - e) * len} opacity={dash ? e : 1} />
    </svg>
  );
}

// ── Title card (light) ───────────────────────────────────────────────────────
function TitleCardL({ start, dur, moduleNo = 1, claseNo, title, dudur, objetivo }) {
  const t = useTime();
  const s = start, end = start + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const big = popL(t, s + 0.3, 0.8, 0);
  const ti = popL(t, s + 0.9, 0.7, 20);
  const ob = popL(t, s + 2.0, 0.7, 16);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', right: '6%', top: '50%', transform: `translateY(-50%) scale(${big.sc})`, opacity: big.op * 0.10, fontFamily: DISPL, fontSize: 720, fontWeight: 700, color: TL.blue, lineHeight: 0.8, letterSpacing: '-0.04em' }}>{String(claseNo).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', left: '9%', top: '50%', transform: 'translateY(-50%)', width: 1180 }}>
        <KickerL start={s + 0.4} dur={dur - 0.6} text={`Módulo ${moduleNo} · Clase ${claseNo}`} x="0" y="-130px" align="left" />
        <div style={{ opacity: ti.op, transform: `translateY(${ti.ty}px)`, fontFamily: DISPL, fontSize: 92, fontWeight: 700, color: TL.ink, lineHeight: 1.02, letterSpacing: '-0.02em', textWrap: 'balance' }}>{title}</div>
        <div style={{ marginTop: 30, opacity: ob.op, transform: `translateY(${ob.ty}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 980 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 44, height: 2, background: TL.blue }} />
            <span style={{ fontFamily: MONOL, fontSize: 16, letterSpacing: '0.22em', color: TL.blue, textTransform: 'uppercase', fontWeight: 600 }}>Duración {dudur}</span>
          </div>
          <div style={{ fontFamily: DISPL, fontSize: 30, fontWeight: 400, color: TL.mut, lineHeight: 1.4 }}>{objetivo}</div>
        </div>
      </div>
    </div>
  );
}

// ── Info card (light) ────────────────────────────────────────────────────────
function InfoCardL({ x, y, w = 360, h = 300, no, Icon, accent = TL.blue, title, sub, appear, t }) {
  const { op, sc, ty } = popL(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 10, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {no != null && <div style={{ fontFamily: MONOL, fontSize: 13, letterSpacing: '0.24em', color: TL.dim }}>{String(no).padStart(2, '0')}</div>}
        {Icon && <div style={{ marginTop: 2 }}><Icon c={accent} t={t} /></div>}
        <div style={{ fontFamily: DISPL, fontSize: 32, fontWeight: 700, color: TL.ink, letterSpacing: '-0.01em', lineHeight: 1.05 }}>{title}</div>
        <div style={{ fontFamily: DISPL, fontSize: 19, fontWeight: 400, color: TL.mut, lineHeight: 1.4 }}>{sub}</div>
        <div style={{ position: 'absolute', left: 0, top: 24, bottom: 24, width: 3, background: accent, borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ── Closing (light) ──────────────────────────────────────────────────────────
function ClosingL({ start, dur, line, activityLabel, activity }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const a = popL(t, s + 1.4, 0.6, 18);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 8%' }}>
      <div style={{ fontFamily: DISPL, fontSize: 64, fontWeight: 600, color: TL.ink, textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.01em', maxWidth: 1500, textWrap: 'balance' }}>{line}</div>
      {activity && (
        <div style={{ opacity: a.op, transform: `translateY(${a.ty}px)`, display: 'flex', alignItems: 'stretch', borderRadius: 10, overflow: 'hidden', border: `1px solid ${TL.lineS}`, boxShadow: TL.shadowSm, maxWidth: 1300, background: TL.paper }}>
          <div style={{ background: TL.clay, color: '#fff', fontFamily: MONOL, fontSize: 15, fontWeight: 600, letterSpacing: '0.16em', padding: '20px 24px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{activityLabel || 'Actividad'}</div>
          <div style={{ color: TL.ink, fontFamily: DISPL, fontSize: 24, fontWeight: 400, padding: '18px 28px', display: 'flex', alignItems: 'center', lineHeight: 1.35 }}>{activity}</div>
        </div>
      )}
    </div>
  );
}

// ── Shell (light) ────────────────────────────────────────────────────────────
function ClassShellL({ scenes, claseNo, claseName, moduleNo = 1 }) {
  let acc = 0;
  const timed = scenes.map(sc => { const o = { ...sc, start: acc }; acc += sc.dur; return o; });
  const total = acc;
  return (
    <Stage width={1920} height={1080} duration={total} background={TL.bg} persistKey={`m${moduleNo}c${claseNo}`}>
      <div id="video-root" data-screen-label={`M${moduleNo} Clase ${claseNo}`} style={{ position: 'absolute', inset: 0 }}>
        <GlobalBGL />
        {timed.map((sc, i) => <sc.C key={i} start={sc.start} dur={sc.dur} />)}
        <ClassChromeL timed={timed} claseNo={claseNo} claseName={claseName} moduleNo={moduleNo} />
        <ClassProgressL timed={timed} />
      </div>
    </Stage>
  );
}
function ClassChromeL({ timed, claseNo, claseName, moduleNo }) {
  const t = useTime();
  let label = '';
  for (const sc of timed) if (t >= sc.start - 0.0001) label = sc.label || '';
  return (
    <div style={{ position: 'absolute', left: 54, bottom: 46, zIndex: 40, fontFamily: MONOL, fontSize: 13, letterSpacing: '0.2em', color: TL.mut, display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase' }}>
      <span style={{ color: TL.blue, fontWeight: 600 }}>M{moduleNo} · CLASE {String(claseNo).padStart(2, '0')}</span>
      <span style={{ width: 30, height: 1, background: TL.lineS }} />
      <span>{claseName}</span>
      {label && <><span style={{ width: 30, height: 1, background: TL.lineS }} /><span style={{ color: TL.dim }}>{label}</span></>}
    </div>
  );
}
function ClassProgressL({ timed }) {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', top: 40, right: 54, zIndex: 40, display: 'flex', gap: 6, alignItems: 'center' }}>
      {timed.map((sc, i) => {
        const active = t >= sc.start && t < sc.start + sc.dur;
        const done = t >= sc.start + sc.dur;
        return <div key={i} style={{ width: active ? 30 : 16, height: 3, borderRadius: 2, background: active ? TL.blue : (done ? TL.blueD : 'rgba(30,55,90,0.18)'), transition: 'width 200ms' }} />;
      })}
    </div>
  );
}

// ── Light line icons (stroke takes `c`) ──────────────────────────────────────
function IcoRuler({ c = TL.blue }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <rect x="10" y="22" width="44" height="20" rx="3" stroke={c} strokeWidth="2.6" />
    {[18, 26, 34, 42, 50].map((x, i) => <line key={i} x1={x} y1="22" x2={x} y2={i % 2 ? 32 : 28} stroke={c} strokeWidth="2.2" strokeLinecap="round" />)}
  </svg>);
}
function IcoGauge({ c = TL.blue, t = 0 }) {
  const a = -120 + (60 + 40 * Math.sin(t * 1.5));
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <path d="M12 42 A 20 20 0 0 1 52 42" stroke={c} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <line x1="32" y1="42" x2={32 + 16 * Math.cos(a * Math.PI / 180)} y2={42 + 16 * Math.sin(a * Math.PI / 180)} stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="32" cy="42" r="3.4" fill={c} />
  </svg>);
}
function IcoThermo({ c = TL.clay }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <path d="M28 14 a4 4 0 0 1 8 0 v22 a8 8 0 1 1 -8 0 z" stroke={c} strokeWidth="2.6" fill="none" />
    <circle cx="32" cy="46" r="4.5" fill={c} />
    <line x1="32" y1="24" x2="32" y2="42" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
  </svg>);
}
function IcoFlow({ c = TL.blue, t = 0 }) {
  const o = (t * 14) % 18;
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <path d="M10 26 h44 M10 38 h44" stroke={c} strokeWidth="2.6" strokeLinecap="round" opacity="0.4" />
    <path d="M10 32 h44" stroke={c} strokeWidth="3" strokeLinecap="round" strokeDasharray="10 8" strokeDashoffset={-o} />
    <polygon points="50,26 58,32 50,38" fill={c} />
  </svg>);
}
function IcoLevel({ c = TL.blue, t = 0 }) {
  const lv = 38 - 4 * Math.sin(t * 1.4);
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <rect x="18" y="12" width="28" height="40" rx="3" stroke={c} strokeWidth="2.6" />
    <rect x="20" y={lv} width="24" height={52 - lv} rx="1" fill={c} opacity="0.35" />
    <line x1="20" y1={lv} x2="44" y2={lv} stroke={c} strokeWidth="2" />
  </svg>);
}
function IcoBolt({ c = TL.clay }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <polygon points="36,8 18,36 30,36 26,56 46,26 34,26" stroke={c} strokeWidth="2.6" fill="none" strokeLinejoin="round" />
  </svg>);
}
function IcoResistor({ c = TL.blue }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <path d="M6 32 h10 l4 -10 l8 20 l8 -20 l8 20 l4 -10 h10" stroke={c} strokeWidth="2.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />
  </svg>);
}
function IcoDiode({ c = TL.blue }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <line x1="8" y1="32" x2="24" y2="32" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    <line x1="40" y1="32" x2="56" y2="32" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    <polygon points="24,20 24,44 42,32" stroke={c} strokeWidth="2.6" fill="none" strokeLinejoin="round" />
    <line x1="42" y1="20" x2="42" y2="44" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
  </svg>);
}
function IcoChipL({ c = TL.blue }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <rect x="18" y="18" width="28" height="28" rx="3" stroke={c} strokeWidth="2.6" />
    <circle cx="32" cy="32" r="6" stroke={c} strokeWidth="2.4" />
    {[24, 32, 40].map((p, i) => (<g key={i}>
      <line x1={p} y1="12" x2={p} y2="18" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
      <line x1={p} y1="46" x2={p} y2="52" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
    </g>))}
  </svg>);
}

Object.assign(window, {
  TL, DISPL, MONOL, popL, SceneL, CapL, KickerL, BracketsL, SlotL, GlobalBGL, DrawLineL,
  TitleCardL, InfoCardL, ClosingL, ClassShellL, ClassChromeL, ClassProgressL,
  IcoRuler, IcoGauge, IcoThermo, IcoFlow, IcoLevel, IcoBolt, IcoResistor, IcoDiode, IcoChipL,
});


// m2-lib.jsx — Módulo 2 (Instrumentación). Depends on m1-lib.jsx globals.
// Adds a teal "instrument" accent + ISA-5.1 balloon, control-loop & signal helpers.
// Exports to window.

const TEAL  = 'oklch(74% 0.17 52)';
const TEALD = 'oklch(64% 0.17 50)';
const TEALWASH = 'oklch(30% 0.09 52)';

// ── ISA-5.1 instrument balloon ───────────────────────────────────────────────
// kind: 'field' (plain circle, no line) · 'panel' (circle + solid line: main
// control room) · 'rear' (circle + dashed line: behind panel) · 'local'
// (circle + double line: local panel) · 'plc' (diamond in square) · 'dcs'
// (circle in square: shared display/control)
function ISABalloon({ cx, cy, r = 46, code = 'FT', tag = '101', kind = 'field', accent = TEAL, t = 0, pulse = false }) {
  const ink = TL.ink, paper = TL.paper;
  const line = (() => {
    if (kind === 'panel') return <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={ink} strokeWidth="2" />;
    if (kind === 'rear') return <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={ink} strokeWidth="2" strokeDasharray="6 5" />;
    if (kind === 'local') return <><line x1={cx - r} y1={cy - 3} x2={cx + r} y2={cy - 3} stroke={ink} strokeWidth="2" /><line x1={cx - r} y1={cy + 3} x2={cx + r} y2={cy + 3} stroke={ink} strokeWidth="2" /></>;
    return null;
  })();
  const glow = pulse ? 0.5 + 0.5 * Math.sin(t * 3) : 1;
  return (
    <g>
      {(kind === 'dcs' || kind === 'plc') && <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} rx={kind === 'plc' ? 4 : r} fill={paper} stroke={accent} strokeWidth="2.6" />}
      {kind === 'plc'
        ? <polygon points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`} fill={paper} stroke={accent} strokeWidth="2.6" />
        : <circle cx={cx} cy={cy} r={r} fill={paper} stroke={accent} strokeWidth="2.6" opacity={kind === 'dcs' ? 0 : 1} />}
      {kind === 'dcs' && <circle cx={cx} cy={cy} r={r} fill="none" stroke={accent} strokeWidth="2.6" />}
      {line}
      <text x={cx} y={cy - 4} fill={ink} fontFamily="IBM Plex Mono, monospace" fontSize={r * 0.5} fontWeight="600" textAnchor="middle">{code}</text>
      <text x={cx} y={cy + r * 0.42} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize={r * 0.42} textAnchor="middle">{tag}</text>
      {pulse && <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke={accent} strokeWidth="2" opacity={glow * 0.5} />}
    </g>
  );
}

// ── Animated dashed signal line between two points ───────────────────────────
function SignalPath({ d, start, t, color = TEAL, width = 4, dur = 0.8, speed = 50, live = true }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const off = -(t * speed) % 26;
  return (
    <>
      <path d={d} fill="none" stroke={`color-mix(in oklch, ${color} 28%, transparent)`} strokeWidth={width + 6} strokeLinecap="round" strokeLinejoin="round" opacity={e} />
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14 12" strokeDashoffset={live ? off : 0} opacity={e} />
    </>
  );
}

// ── Process-pipe (thick, soft) ───────────────────────────────────────────────
function ProcessPipe({ d, start, t, color = TL.blue, dur = 0.8 }) {
  const e = Easing.easeOutCubic(clamp((t - start) / dur, 0, 1));
  const flow = -(t * 32) % 24;
  return (
    <>
      <path d={d} fill="none" stroke="rgba(232,150,70,0.16)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" opacity={e} />
      <path d={d} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray="14 12" strokeDashoffset={flow} opacity={e * 0.9} />
    </>
  );
}

// ── Shell variant with teal chrome (module identity) ─────────────────────────
function ClassShellM2({ scenes, claseNo, claseName }) {
  let acc = 0;
  const timed = scenes.map(sc => { const o = { ...sc, start: acc }; acc += sc.dur; return o; });
  const total = acc;
  return (
    <Stage width={1920} height={1080} duration={total} background={TL.bg} persistKey={`m2c${claseNo}`}>
      <div id="video-root" data-screen-label={`M2 Clase ${claseNo}`} style={{ position: 'absolute', inset: 0 }}>
        <GlobalBGL />
        {timed.map((sc, i) => <sc.C key={i} start={sc.start} dur={sc.dur} />)}
        <ChromeM2 timed={timed} claseNo={claseNo} claseName={claseName} />
        <ProgressM2 timed={timed} />
      </div>
    </Stage>
  );
}
function ChromeM2({ timed, claseNo, claseName }) {
  const t = useTime();
  let label = '';
  for (const sc of timed) if (t >= sc.start - 0.0001) label = sc.label || '';
  return (
    <div style={{ position: 'absolute', left: 54, bottom: 46, zIndex: 40, fontFamily: MONOL, fontSize: 13, letterSpacing: '0.2em', color: TL.mut, display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase' }}>
      <span style={{ color: TEAL, fontWeight: 600 }}>M2 · CLASE {String(claseNo).padStart(2, '0')}</span>
      <span style={{ width: 30, height: 1, background: TL.lineS }} />
      <span>{claseName}</span>
      {label && <><span style={{ width: 30, height: 1, background: TL.lineS }} /><span style={{ color: TL.dim }}>{label}</span></>}
    </div>
  );
}
function ProgressM2({ timed }) {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', top: 40, right: 54, zIndex: 40, display: 'flex', gap: 6, alignItems: 'center' }}>
      {timed.map((sc, i) => {
        const active = t >= sc.start && t < sc.start + sc.dur;
        const done = t >= sc.start + sc.dur;
        return <div key={i} style={{ width: active ? 30 : 16, height: 3, borderRadius: 2, background: active ? TEAL : (done ? TEALD : 'rgba(30,55,90,0.18)'), transition: 'width 200ms' }} />;
      })}
    </div>
  );
}

// ── Title card with teal accent (module identity) ────────────────────────────
function TitleCardM2({ start, dur, claseNo, title, dudur, objetivo }) {
  const t = useTime();
  const s = start, end = start + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const big = popL(t, s + 0.3, 0.8, 0);
  const ti = popL(t, s + 0.9, 0.7, 20);
  const ob = popL(t, s + 2.0, 0.7, 16);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', right: '6%', top: '50%', transform: `translateY(-50%) scale(${big.sc})`, opacity: big.op * 0.10, fontFamily: DISPL, fontSize: 660, fontWeight: 700, color: TEAL, lineHeight: 0.8, letterSpacing: '-0.04em' }}>{String(claseNo).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', left: '9%', top: '50%', transform: 'translateY(-50%)', width: 1220 }}>
        <KickerL start={s + 0.4} dur={dur - 0.6} text={`Módulo 2 · Clase ${claseNo}`} x="0" y="-130px" align="left" color={TEAL} />
        <div style={{ opacity: ti.op, transform: `translateY(${ti.ty}px)`, fontFamily: DISPL, fontSize: 88, fontWeight: 700, color: TL.ink, lineHeight: 1.02, letterSpacing: '-0.02em', textWrap: 'balance' }}>{title}</div>
        <div style={{ marginTop: 30, opacity: ob.op, transform: `translateY(${ob.ty}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1000 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 44, height: 2, background: TEAL }} />
            <span style={{ fontFamily: MONOL, fontSize: 16, letterSpacing: '0.22em', color: TEAL, textTransform: 'uppercase', fontWeight: 600 }}>Duración {dudur}</span>
          </div>
          <div style={{ fontFamily: DISPL, fontSize: 30, fontWeight: 400, color: TL.mut, lineHeight: 1.4 }}>{objetivo}</div>
        </div>
      </div>
    </div>
  );
}

// ── Closing with teal activity chip ──────────────────────────────────────────
function ClosingM2({ start, dur, line, activityLabel, activity }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const a = popL(t, s + 1.4, 0.6, 18);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 8%' }}>
      <div style={{ fontFamily: DISPL, fontSize: 62, fontWeight: 600, color: TL.ink, textAlign: 'center', lineHeight: 1.12, letterSpacing: '-0.01em', maxWidth: 1500, textWrap: 'balance' }}>{line}</div>
      {activity && (
        <div style={{ opacity: a.op, transform: `translateY(${a.ty}px)`, display: 'flex', alignItems: 'stretch', borderRadius: 10, overflow: 'hidden', border: `1px solid ${TL.lineS}`, boxShadow: TL.shadowSm, maxWidth: 1300, background: TL.paper }}>
          <div style={{ background: TEAL, color: '#fff', fontFamily: MONOL, fontSize: 15, fontWeight: 600, letterSpacing: '0.16em', padding: '20px 24px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{activityLabel || 'Actividad'}</div>
          <div style={{ color: TL.ink, fontFamily: DISPL, fontSize: 24, fontWeight: 400, padding: '18px 28px', display: 'flex', alignItems: 'center', lineHeight: 1.35 }}>{activity}</div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { TEAL, TEALD, TEALWASH, ISABalloon, SignalPath, ProcessPipe, ClassShellM2, ChromeM2, ProgressM2, TitleCardM2, ClosingM2 });
