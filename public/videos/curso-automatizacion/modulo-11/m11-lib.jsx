// m11-lib.jsx — Módulo 11 "Proyecto Final Integrador" (planta de agua potable).
// DARK theme: petróleo profundo + LIMA/chartreuse (primario · completo/go/títulos) +
// CIAN agua (proceso/flujo) + ORO ámbar (KPIs/logro/portafolio) + status red/grn.
// "capstone / engineering project" feel. Depends only on animations.jsx. Exports w/ M11 suffix.

const TL11 = {
  bg:      '#08110f',
  bg2:     '#0d1816',
  paper:   '#13201d',
  paper2:  '#1c2c28',
  ink:     '#eef6ef',
  mut:     '#93a8a0',
  dim:     '#566860',
  line:    'rgba(140,200,170,0.10)',
  lineS:   'rgba(140,200,170,0.22)',
  lime:    '#b6f23c',          // primario — completo / go / títulos
  limeD:   '#8fc91f',
  limeLt:  '#d6f98a',
  limeWash:'rgba(182,242,60,0.13)',
  cyan:    '#2ad4e6',          // agua / flujo / proceso
  cyanD:   '#15a8ba',
  cyanLt:  '#7fe8f3',
  cyanWash:'rgba(42,212,230,0.13)',
  gold:    '#f5c542',          // KPI / logro / valores
  goldD:   '#d8a017',
  goldWash:'rgba(245,197,66,0.13)',
  red:     '#ff5247',          // alarma / fatal
  org:     '#ff9838',          // advertencia
  grn:     '#46d07f',          // OK / RUN
  shadow:  '0 22px 60px rgba(0,0,0,0.6)',
  shadowSm:'0 8px 22px rgba(0,0,0,0.46)',
};
const DISP11 = "'Space Grotesk', system-ui, sans-serif";
const MONO11 = "'IBM Plex Mono', ui-monospace, monospace";

function pop11(t, appear, d = 0.5, rise = 18) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.94, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  const eb = Easing.easeOutBack(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.94 + 0.06 * eb, ty: (1 - e) * rise };
}

function SceneM11({ start, dur, children, fade = 0.55 }) {
  const t = useTime();
  const end = start + dur;
  if (t < start - 0.02 || t > end + 0.02) return null;
  const lt = t - start;
  let op = 1;
  if (lt < fade) op = clamp(lt / fade, 0, 1);
  else if (t > end - fade) op = clamp((end - t) / fade, 0, 1);
  return <div style={{ position: 'absolute', inset: 0, opacity: op, willChange: 'opacity' }}>{children}</div>;
}

function CapM11({ start, dur = 2.6, children, x = '50%', y = '50%', size = 60, weight = 600, color = TL11.ink, mono = false, align = 'center', width = 1500, lh = 1.12, ls = '-0.01em', up = 22 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.5, outD = 0.42;
  let op = 1, ty = 0;
  if (lt < inD) { const e = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); op = e; ty = (1 - e) * up; }
  else if (lt > dur - outD) { const e = Easing.easeInCubic(clamp((lt - (dur - outD)) / outD, 0, 1)); op = 1 - e; ty = -e * up * 0.5; }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx}, calc(-50% + ${ty}px))`, opacity: op, width, maxWidth: '92vw', textAlign: align, color, fontFamily: mono ? MONO11 : DISP11, fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: ls, willChange: 'transform, opacity', textWrap: 'balance' }}>
      {children}
    </div>
  );
}

function KickerM11({ start, dur = 3, text, x = '50%', y = '50%', align = 'center', color = TL11.lime, size = 17 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.4, outD = 0.35;
  let op = 1;
  if (lt < inD) op = clamp(lt / inD, 0, 1);
  else if (lt > dur - outD) op = clamp((dur - lt) / outD, 0, 1);
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx},-50%)`, opacity: op, color, fontFamily: MONO11, fontSize: size, letterSpacing: '0.3em', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: align, display: 'flex', alignItems: 'center', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
      {text}
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
    </div>
  );
}

// ── Background: petrol + water-flow glows + faint isometric grid ───────────────
function GlobalBGM11() {
  const t = useTime();
  const ax = 16 + Math.sin(t * 0.06) * 7, ay = 13 + Math.cos(t * 0.05) * 6;
  const bx = 86 + Math.cos(t * 0.055) * 7, by = 88 + Math.sin(t * 0.045) * 6;
  const flow = ((t * 0.05) % 1) * 100;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `linear-gradient(168deg, ${TL11.bg2}, ${TL11.bg})` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 880px at ${ax}% ${ay}%, rgba(182,242,60,0.10), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 720px at ${bx}% ${by}%, rgba(42,212,230,0.10), transparent 60%)` }} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 100 100">
        {[20, 40, 60, 80].map((gy, i) => <line key={'h' + i} x1="0" y1={gy} x2="100" y2={gy} stroke="rgba(140,200,170,0.05)" strokeWidth="0.08" />)}
        {[16, 33, 50, 67, 84].map((gx, i) => <line key={'v' + i} x1={gx} y1="0" x2={gx} y2="100" stroke="rgba(140,200,170,0.05)" strokeWidth="0.08" />)}
        <line x1="0" y1={50} x2="100" y2={50} stroke="rgba(42,212,230,0.10)" strokeWidth="0.12" strokeDasharray="2 3" strokeDashoffset={flow} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 48%, rgba(0,0,0,0.5) 100%)' }} />
    </div>
  );
}

function BracketsM11({ color = TL11.lime, size = 18, thick = 2, inset = 0 }) {
  const c = (pos) => {
    const base = { position: 'absolute', width: size, height: size, borderColor: color, borderStyle: 'solid', borderWidth: 0 };
    if (pos === 'tl') return { ...base, top: inset, left: inset, borderTopWidth: thick, borderLeftWidth: thick };
    if (pos === 'tr') return { ...base, top: inset, right: inset, borderTopWidth: thick, borderRightWidth: thick };
    if (pos === 'bl') return { ...base, bottom: inset, left: inset, borderBottomWidth: thick, borderLeftWidth: thick };
    return { ...base, bottom: inset, right: inset, borderBottomWidth: thick, borderRightWidth: thick };
  };
  return <>{['tl', 'tr', 'bl', 'br'].map(p => <div key={p} style={c(p)} />)}</>;
}

// ── Node + link + arrow (SVG) ─────────────────────────────────────────────────
function NodeM11({ x, y, w = 200, h = 96, label, sub, accent = TL11.lime, t, appear = 0, active = true, icon = null, online = false }) {
  const ap = pop11(t, appear, 0.5, 14);
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={TL11.paper} stroke={active ? accent : TL11.lineS} strokeWidth={active ? 2.4 : 1.6} />
      <rect x={x} y={y} width={w} height="5" rx="2.5" fill={accent} />
      {online && <circle cx={x + w - 16} cy={y + 20} r="5" fill={TL11.grn} />}
      {icon && <text x={x + 22} y={y + h / 2 + 9} fontSize="24" textAnchor="middle">{icon}</text>}
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 9)} fill={TL11.ink} fontFamily={DISP11} fontSize="22" fontWeight="700" textAnchor="middle">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 23} fill={TL11.mut} fontFamily={MONO11} fontSize="13.5" textAnchor="middle">{sub}</text>}
    </g>
  );
}

function LinkM11({ x1, y1, x2, y2, start, t, color = TL11.cyan, width = 3, label, dur = 0.6, packets = true, back = false, dashed = false, speed = 0.55 }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const hx = x1 + (x2 - x1) * e, hy = y1 + (y2 - y1) * e;
  const live = t - start;
  const dots = [];
  if (packets && e > 0.98) {
    const n = 3;
    for (let i = 0; i < n; i++) {
      const f = ((live * speed) + i / n) % 1;
      dots.push({ x: x1 + (x2 - x1) * f, y: y1 + (y2 - y1) * f, c: color });
      if (back) { const fb = 1 - (((live * speed) + i / n + 0.5) % 1); dots.push({ x: x1 + (x2 - x1) * fb, y: y1 + (y2 - y1) * fb, c: TL11.lime }); }
    }
  }
  return (
    <g>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={`color-mix(in oklch, ${color} 42%, transparent)`} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? '8 7' : undefined} />
      {dots.map((d, i) => (<g key={i}><circle cx={d.x} cy={d.y} r="7" fill={d.c} opacity="0.25" /><rect x={d.x - 5} y={d.y - 5} width="10" height="10" rx="2.5" fill={d.c} /></g>))}
      {label && e > 0.5 && <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 14} fill={color} fontFamily={MONO11} fontSize="15" fontWeight="600" textAnchor="middle">{label}</text>}
    </g>
  );
}

function ArrowM11({ x1, y1, x2, y2, start, t, color = TL11.mut, label, dur = 0.6, dashed = false }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hx = x1 + (x2 - x1) * e, hy = y1 + (y2 - y1) * e;
  return (
    <g opacity={clamp(e * 4, 0, 1)}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={dashed ? '9 7' : undefined} />
      {e > 0.96 && <polygon points={`${x2},${y2} ${x2 - 13 * Math.cos(ang - 0.4)},${y2 - 13 * Math.sin(ang - 0.4)} ${x2 - 13 * Math.cos(ang + 0.4)},${y2 - 13 * Math.sin(ang + 0.4)}`} fill={color} />}
      {label && e > 0.5 && <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 12} fill={color} fontFamily={MONO11} fontSize="15" fontWeight="600" textAnchor="middle">{label}</text>}
    </g>
  );
}

// ── Tank with animated level (SVG) ────────────────────────────────────────────
function TankM11({ x, y, w = 140, h = 180, level = 0.5, accent = TL11.cyan, tag, valTxt, t, appear = 0, alarm = false }) {
  const ap = pop11(t, appear, 0.55, 16);
  const fillH = (h - 10) * clamp(level, 0, 1);
  const fillY = y + h - 5 - fillH;
  const fc = alarm ? TL11.red : accent;
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      <rect x={x} y={y} width={w} height={h} rx="13" fill={TL11.bg2} stroke={alarm ? TL11.red : TL11.lineS} strokeWidth={alarm ? 2.6 : 1.8} />
      <clipPath id={`tk11-${tag}`}><rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx="10" /></clipPath>
      <g clipPath={`url(#tk11-${tag})`}>
        <rect x={x + 4} y={fillY} width={w - 8} height={fillH + 6} fill={fc} opacity="0.30" />
        <rect x={x + 4} y={fillY} width={w - 8} height="4" fill={fc} />
        <rect x={x + 4} y={fillY - 2} width={w - 8} height="2" fill={fc} opacity={0.5 + 0.4 * Math.sin(t * 2)} />
      </g>
      {tag && <text x={x + w / 2} y={y - 12} fill={TL11.ink} fontFamily={MONO11} fontSize="16" fontWeight="700" textAnchor="middle">{tag}</text>}
      {valTxt && <text x={x + w / 2} y={y + h + 26} fill={alarm ? TL11.red : TL11.gold} fontFamily={DISP11} fontSize="23" fontWeight="700" textAnchor="middle">{valTxt}</text>}
    </g>
  );
}

// ── Status LED (HTML) ─────────────────────────────────────────────────────────
function LedM11({ x, y, on = false, color = TL11.grn, offColor = TL11.dim, label, sub, t, appear = 0, blink = false }) {
  const ap = pop11(t, appear, 0.45, 12);
  const lit = on && (!blink || Math.sin((t || 0) * 6) > 0);
  const c = on ? color : offColor;
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 13 }}>
      <span style={{ width: 19, height: 19, borderRadius: 11, background: lit ? c : TL11.bg2, border: `2px solid ${c}`, boxShadow: lit ? `0 0 14px ${c}` : 'none', flexShrink: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {label && <span style={{ fontFamily: DISP11, fontSize: 20, fontWeight: 600, color: TL11.ink }}>{label}</span>}
        {sub && <span style={{ fontFamily: MONO11, fontSize: 13, color: on ? color : TL11.dim, letterSpacing: '0.06em' }}>{sub}</span>}
      </div>
    </div>
  );
}

// ── Circular gauge (HTML) ─────────────────────────────────────────────────────
function GaugeM11({ x, y, value, frac, unit, label, accent = TL11.gold, t, appear = 0, size = 200, sub, alarm = false }) {
  const ap = pop11(t, appear, 0.5, 18);
  const R = size * 0.38, C = 2 * Math.PI * R, cf = clamp(frac, 0, 1);
  const ac = alarm ? TL11.red : accent;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: size, opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke={TL11.bg2} strokeWidth={size * 0.07} />
          <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke={ac} strokeWidth={size * 0.07} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - cf)} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: DISP11, fontSize: size * 0.2, fontWeight: 700, color: TL11.ink, lineHeight: 1 }}>{value}</div>
          {unit && <div style={{ fontFamily: MONO11, fontSize: size * 0.075, color: ac, marginTop: 2 }}>{unit}</div>}
        </div>
      </div>
      {label && <div style={{ marginTop: 8, fontFamily: MONO11, fontSize: 13, color: TL11.dim, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</div>}
      {sub && <div style={{ marginTop: 3, fontFamily: DISP11, fontSize: 14, color: TL11.mut }}>{sub}</div>}
    </div>
  );
}

// ── HMI / window frame (HTML) ─────────────────────────────────────────────────
function HMIFrameM11({ x, y, w = 1000, h = 560, title = 'Vista', t, appear = 0, accent = TL11.lime, children, tabs }) {
  const ap = pop11(t, appear, 0.6, 20);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', border: `1px solid ${TL11.lineS}`, background: TL11.paper, boxShadow: TL11.shadow, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 44, background: TL11.paper2, borderBottom: `1px solid ${TL11.lineS}`, display: 'flex', alignItems: 'center', gap: 9, padding: '0 16px', flexShrink: 0 }}>
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL11.red }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL11.gold }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL11.grn }} />
          <span style={{ marginLeft: 12, fontFamily: MONO11, fontSize: 13.5, color: TL11.mut, letterSpacing: '0.05em' }}>{title}</span>
          {tabs && <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>{tabs.map((tb, i) => <span key={i} style={{ fontFamily: MONO11, fontSize: 12.5, color: i === 0 ? accent : TL11.dim, padding: '4px 12px', borderRadius: 7, background: i === 0 ? TL11.limeWash : 'transparent', border: `1px solid ${i === 0 ? accent : TL11.line}` }}>{tb}</span>)}</div>}
        </div>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: TL11.bg }}>{children}</div>
      </div>
    </div>
  );
}

// ── Sequence stepper (the project innovation) — steps:[{n,label}] ──────────────
function SequencerM11({ x, y, w = 1500, steps, active, t, appear = 0, perRow = 5 }) {
  const ap = pop11(t, appear, 0.6, 18);
  const gap = 14;
  const cw = (w - gap * (perRow - 1)) / perRow;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', flexWrap: 'wrap', gap }}>
      {steps.map((st, i) => {
        const reveal = clamp((t - (appear + 0.5 + i * 0.18)) / 0.4, 0, 1);
        const isActive = i === active;
        const isDone = i < active;
        const c = isActive ? TL11.lime : (isDone ? TL11.cyan : TL11.dim);
        const pulse = isActive ? 0.5 + 0.5 * Math.sin(t * 4) : 1;
        return (
          <div key={i} style={{ width: cw, opacity: reveal, position: 'relative', background: isActive ? TL11.limeWash : TL11.paper, border: `1.5px solid ${isActive ? TL11.lime : TL11.lineS}`, borderRadius: 11, padding: '14px 14px', boxShadow: isActive ? `0 0 ${18 * pulse}px ${TL11.limeWash}` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, background: isDone ? TL11.cyan : (isActive ? TL11.lime : TL11.bg2), border: `1.5px solid ${c}`, color: (isDone || isActive) ? '#08110f' : c, fontFamily: MONO11, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{isDone ? '✓' : st.n}</span>
              <span style={{ fontFamily: DISP11, fontSize: 15.5, fontWeight: isActive ? 700 : 500, color: isActive ? TL11.ink : (isDone ? TL11.cyanLt : TL11.mut), lineHeight: 1.1 }}>{st.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Code / ladder panel ───────────────────────────────────────────────────────
function CodeM11({ x, y, w = 760, title = 'SCL · TIA Portal', lines = [], t, appear = 0, reveal = 1 }) {
  const ap = pop11(t, appear, 0.55, 18);
  const lh = 29, pad = 20, headH = 40;
  const shown = Math.round(clamp(reveal, 0, 1) * lines.length);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: ap.op, transform: `translateY(${ap.ty}px)` }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL11.lineS}`, background: '#060d0b', boxShadow: TL11.shadow }}>
        <div style={{ height: headH, background: TL11.paper2, borderBottom: `1px solid ${TL11.lineS}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL11.red }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL11.gold }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL11.grn }} />
          <span style={{ marginLeft: 10, fontFamily: MONO11, fontSize: 13, color: TL11.mut, letterSpacing: '0.14em' }}>{title}</span>
        </div>
        <div style={{ padding: `${pad}px 0`, fontFamily: MONO11, fontSize: 16.5, lineHeight: `${lh}px` }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ display: 'flex', opacity: i < shown ? 1 : 0, transition: 'opacity .2s' }}>
              <span style={{ width: 42, textAlign: 'right', paddingRight: 14, color: TL11.dim, userSelect: 'none', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ color: ln.c || TL11.ink, whiteSpace: 'pre', paddingRight: 18 }}>{ln.txt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCardM11({ x, y, w = 360, h = 300, no, accent = TL11.lime, title, sub, appear, t, icon }) {
  const { op, sc, ty } = pop11(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 12, border: `1px solid ${TL11.lineS}`, background: `linear-gradient(160deg, ${TL11.paper}, ${TL11.bg2})`, boxShadow: TL11.shadow, padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 11, overflow: 'hidden' }}>
        {no != null && <div style={{ fontFamily: MONO11, fontSize: 13, letterSpacing: '0.24em', color: TL11.dim }}>{String(no).padStart(2, '0')}</div>}
        {icon && <div style={{ fontSize: 30, lineHeight: 1 }}>{icon}</div>}
        {title && <div style={{ fontFamily: DISP11, fontSize: 26, fontWeight: 700, color: TL11.ink, letterSpacing: '-0.01em', lineHeight: 1.08 }}>{title}</div>}
        <div style={{ fontFamily: DISP11, fontSize: 18, fontWeight: 400, color: TL11.mut, lineHeight: 1.42 }}>{sub}</div>
        <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: accent, borderRadius: 3 }} />
      </div>
    </div>
  );
}

function StatM11({ x, y, value, unit, label, accent = TL11.lime, appear, t, align = 'left' }) {
  const { op, ty } = pop11(t, appear, 0.5, 16);
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: op, transform: `translateY(${ty}px)`, textAlign: align, ...(align === 'center' ? { transform: `translate(-50%, ${ty}px)` } : {}) }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <span style={{ fontFamily: DISP11, fontSize: 72, fontWeight: 700, color: accent, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{value}</span>
        {unit && <span style={{ fontFamily: MONO11, fontSize: 24, fontWeight: 500, color: TL11.mut }}>{unit}</span>}
      </div>
      {label && <div style={{ marginTop: 10, fontFamily: MONO11, fontSize: 13.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: TL11.dim }}>{label}</div>}
    </div>
  );
}

function TableM11({ x, y, w = 1200, headers, rows, t, appear = 0, accentCol = -1, colTemplate }) {
  const tpl = colTemplate || headers.map(() => '1fr').join(' ');
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL11.lineS}`, boxShadow: TL11.shadow }}>
        <div style={{ display: 'grid', gridTemplateColumns: tpl }}>
          {headers.map((h, i) => (
            <div key={i} style={{ background: TL11.paper2, padding: '14px 20px', fontFamily: MONO11, fontSize: 13.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: i === accentCol ? TL11.lime : TL11.cyanLt, fontWeight: 700, borderBottom: `1px solid ${TL11.lineS}`, borderLeft: i ? `1px solid ${TL11.line}` : 'none' }}>{h}</div>
          ))}
        </div>
        {rows.map((r, ri) => {
          const ap = clamp((t - (appear + 0.3 + ri * 0.28)) / 0.45, 0, 1);
          return (
            <div key={ri} style={{ opacity: ap, display: 'grid', gridTemplateColumns: tpl, background: ri % 2 ? TL11.bg2 : TL11.paper, borderBottom: ri < rows.length - 1 ? `1px solid ${TL11.line}` : 'none' }}>
              {r.map((cell, ci) => (
                <div key={ci} style={{ padding: '13px 20px', fontFamily: ci === 0 ? MONO11 : DISP11, fontSize: ci === 0 ? 16 : 17.5, fontWeight: ci === accentCol ? 600 : 400, color: ci === 0 ? TL11.ink : (ci === accentCol ? TL11.lime : TL11.mut), borderLeft: ci ? `1px solid ${TL11.line}` : 'none', lineHeight: 1.3 }}>{cell}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TitleCardM11({ start, dur, claseNo, title, dudur, objetivo, seccion = 'Proyecto Final', fase }) {
  const t = useTime();
  const s = start, end = start + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const big = pop11(t, s + 0.3, 0.8, 0);
  const ti = pop11(t, s + 0.9, 0.7, 20);
  const ob = pop11(t, s + 2.0, 0.7, 16);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', right: '5%', top: '50%', transform: `translateY(-50%) scale(${big.sc})`, opacity: big.op * 0.11, fontFamily: DISP11, fontSize: 560, fontWeight: 700, color: TL11.lime, lineHeight: 0.8, letterSpacing: '-0.04em' }}>{String(claseNo).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', left: '9%', top: '50%', transform: 'translateY(-50%)', width: 1320 }}>
        <KickerM11 start={s + 0.4} dur={dur - 0.6} text={`Módulo 11 · ${seccion}`} x="0" y="-155px" align="left" />
        <div style={{ opacity: ti.op, transform: `translateY(${ti.ty}px)`, fontFamily: DISP11, fontSize: 76, fontWeight: 700, color: TL11.ink, lineHeight: 1.02, letterSpacing: '-0.02em', textWrap: 'balance' }}>{title}</div>
        <div style={{ marginTop: 28, opacity: ob.op, transform: `translateY(${ob.ty}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1080 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 44, height: 3, background: TL11.cyan, borderRadius: 2 }} />
            <span style={{ fontFamily: MONO11, fontSize: 16, letterSpacing: '0.16em', color: TL11.cyan, textTransform: 'uppercase', fontWeight: 600 }}>Clase 11.{claseNo} · {dudur}{fase ? ` · ${fase}` : ''}</span>
          </div>
          <div style={{ fontFamily: DISP11, fontSize: 26, fontWeight: 400, color: TL11.mut, lineHeight: 1.42 }}>{objetivo}</div>
        </div>
      </div>
    </div>
  );
}

function ClosingM11({ start, dur, line, activityLabel, activity }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const a = pop11(t, s + 1.4, 0.6, 18);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 8%' }}>
      <div style={{ fontFamily: DISP11, fontSize: 52, fontWeight: 600, color: TL11.ink, textAlign: 'center', lineHeight: 1.16, letterSpacing: '-0.01em', maxWidth: 1560, textWrap: 'balance' }}>{line}</div>
      {activity && (
        <div style={{ opacity: a.op, transform: `translateY(${a.ty}px)`, display: 'flex', alignItems: 'stretch', borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL11.lineS}`, boxShadow: TL11.shadowSm, maxWidth: 1440, background: TL11.paper }}>
          <div style={{ background: TL11.lime, color: '#08110f', fontFamily: MONO11, fontSize: 15, fontWeight: 700, letterSpacing: '0.16em', padding: '20px 24px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{activityLabel || 'Entregable'}</div>
          <div style={{ color: TL11.ink, fontFamily: DISP11, fontSize: 21, fontWeight: 400, padding: '18px 28px', display: 'flex', alignItems: 'center', lineHeight: 1.35 }}>{activity}</div>
        </div>
      )}
    </div>
  );
}

function ClassShellM11({ scenes, claseNo, claseName }) {
  let acc = 0;
  const timed = scenes.map(sc => { const o = { ...sc, start: acc }; acc += sc.dur; return o; });
  const total = acc;
  return (
    <Stage width={1920} height={1080} duration={total} background={TL11.bg} persistKey={`m11c${claseNo}`}>
      <div id="video-root" data-screen-label={`M11 Clase 11.${claseNo}`} style={{ position: 'absolute', inset: 0 }}>
        <GlobalBGM11 />
        {timed.map((sc, i) => <sc.C key={i} start={sc.start} dur={sc.dur} />)}
        <ChromeM11 timed={timed} claseNo={claseNo} claseName={claseName} />
        <ProgressM11 timed={timed} />
      </div>
    </Stage>
  );
}
function ChromeM11({ timed, claseNo, claseName }) {
  const t = useTime();
  let label = '';
  for (const sc of timed) if (t >= sc.start - 0.0001) label = sc.label || '';
  return (
    <div style={{ position: 'absolute', left: 54, bottom: 46, zIndex: 40, fontFamily: MONO11, fontSize: 13, letterSpacing: '0.2em', color: TL11.mut, display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase' }}>
      <span style={{ color: TL11.lime, fontWeight: 600 }}>M11 · CLASE 11.{claseNo}</span>
      <span style={{ width: 30, height: 1, background: TL11.lineS }} />
      <span>{claseName}</span>
      {label && <><span style={{ width: 30, height: 1, background: TL11.lineS }} /><span style={{ color: TL11.dim }}>{label}</span></>}
    </div>
  );
}
function ProgressM11({ timed }) {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', top: 40, right: 54, zIndex: 40, display: 'flex', gap: 6, alignItems: 'center' }}>
      {timed.map((sc, i) => {
        const active = t >= sc.start && t < sc.start + sc.dur;
        const done = t >= sc.start + sc.dur;
        return <div key={i} style={{ width: active ? 30 : 16, height: 3, borderRadius: 2, background: active ? TL11.lime : (done ? TL11.cyan : 'rgba(147,168,160,0.22)'), transition: 'width 200ms' }} />;
      })}
    </div>
  );
}

Object.assign(window, {
  TL11, DISP11, MONO11, pop11,
  SceneM11, CapM11, KickerM11, BracketsM11, GlobalBGM11,
  NodeM11, LinkM11, ArrowM11, TankM11, LedM11, GaugeM11, HMIFrameM11,
  SequencerM11, CodeM11, InfoCardM11, StatM11, TableM11,
  TitleCardM11, ClosingM11, ClassShellM11, ChromeM11, ProgressM11,
});
