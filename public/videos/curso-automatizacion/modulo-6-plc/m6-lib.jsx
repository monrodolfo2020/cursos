// m6-lib.jsx — Módulo 6 "Controladores Lógicos Programables (PLC)".
// DARK theme: grafito + cian (datos/digital) + verde RUN (energizado). PLC IDE / control-panel feel.
// Depends only on animations.jsx (clamp, Easing, useTime, Stage). Exports w/ M6 suffix.

const TL6 = {
  bg:      '#0b0f1a',
  bg2:     '#0e1422',
  paper:   '#161d2d',          // panel face
  paper2:  '#1b2336',          // raised panel
  ink:     '#e9eefb',
  mut:     '#94a0bd',
  dim:     '#5b667f',
  line:    'rgba(60,201,232,0.10)',
  lineS:   'rgba(60,201,232,0.22)',
  cyan:    '#3cc9e8',          // primario — datos / digital
  cyanD:   '#1ea7c9',
  cyanLt:  '#86e2f6',
  cyanWash:'rgba(60,201,232,0.12)',
  grn:     '#46d98c',          // RUN / energizado
  grnD:    '#27b46d',
  grnWash: 'rgba(70,217,140,0.13)',
  amber:   '#f5b14b',          // maint / hold
  amberD:  '#d68f23',
  red:     '#fa5d6f',          // stop / fault
  redWash: 'rgba(250,93,111,0.14)',
  shadow:  '0 22px 60px rgba(0,0,0,0.5)',
  shadowSm:'0 8px 22px rgba(0,0,0,0.4)',
};
const DISP6 = "'Space Grotesk', system-ui, sans-serif";
const MONO6 = "'IBM Plex Mono', ui-monospace, monospace";

function pop6(t, appear, d = 0.5, rise = 18) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.94, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  const eb = Easing.easeOutBack(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.94 + 0.06 * eb, ty: (1 - e) * rise };
}

// ── Scene wrapper ─────────────────────────────────────────────────────────────
function SceneM6({ start, dur, children, fade = 0.55 }) {
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
function CapM6({ start, dur = 2.6, children, x = '50%', y = '50%', size = 60, weight = 600, color = TL6.ink, mono = false, align = 'center', width = 1500, lh = 1.12, ls = '-0.01em', up = 22 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.5, outD = 0.42;
  let op = 1, ty = 0;
  if (lt < inD) { const e = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); op = e; ty = (1 - e) * up; }
  else if (lt > dur - outD) { const e = Easing.easeInCubic(clamp((lt - (dur - outD)) / outD, 0, 1)); op = 1 - e; ty = -e * up * 0.5; }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx}, calc(-50% + ${ty}px))`, opacity: op, width, maxWidth: '92vw', textAlign: align, color, fontFamily: mono ? MONO6 : DISP6, fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: ls, willChange: 'transform, opacity', textWrap: 'balance' }}>
      {children}
    </div>
  );
}

// ── Kicker ────────────────────────────────────────────────────────────────────
function KickerM6({ start, dur = 3, text, x = '50%', y = '50%', align = 'center', color = TL6.cyan, size = 17 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.4, outD = 0.35;
  let op = 1;
  if (lt < inD) op = clamp(lt / inD, 0, 1);
  else if (lt > dur - outD) op = clamp((dur - lt) / outD, 0, 1);
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx},-50%)`, opacity: op, color, fontFamily: MONO6, fontSize: size, letterSpacing: '0.3em', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: align, display: 'flex', alignItems: 'center', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
      {text}
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
    </div>
  );
}

// ── Corner brackets ──────────────────────────────────────────────────────────
function BracketsM6({ color = TL6.cyan, size = 18, thick = 2, inset = 0 }) {
  const c = (pos) => {
    const base = { position: 'absolute', width: size, height: size, borderColor: color, borderStyle: 'solid', borderWidth: 0 };
    if (pos === 'tl') return { ...base, top: inset, left: inset, borderTopWidth: thick, borderLeftWidth: thick };
    if (pos === 'tr') return { ...base, top: inset, right: inset, borderTopWidth: thick, borderRightWidth: thick };
    if (pos === 'bl') return { ...base, bottom: inset, left: inset, borderBottomWidth: thick, borderLeftWidth: thick };
    return { ...base, bottom: inset, right: inset, borderBottomWidth: thick, borderRightWidth: thick };
  };
  return <>{['tl', 'tr', 'bl', 'br'].map(p => <div key={p} style={c(p)} />)}</>;
}

// ── Dark background: graphite + faint cyan grid + soft washes + drifting scanline ──
function GlobalBGM6() {
  const t = useTime();
  const ax = 14 + Math.sin(t * 0.07) * 8, ay = 10 + Math.cos(t * 0.05) * 6;
  const bx = 90 + Math.cos(t * 0.06) * 8, by = 92 + Math.sin(t * 0.045) * 6;
  const gridShift = (t * 3.0) % 58;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `linear-gradient(165deg, ${TL6.bg2}, ${TL6.bg})` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 900px at ${ax}% ${ay}%, rgba(60,201,232,0.15), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 700px at ${bx}% ${by}%, rgba(70,217,140,0.10), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: '-60px', backgroundImage: `linear-gradient(${TL6.line} 1px, transparent 1px), linear-gradient(90deg, ${TL6.line} 1px, transparent 1px)`, backgroundSize: '58px 58px', transform: `translate(${-gridShift}px, ${-gridShift * 0.5}px)`, maskImage: 'radial-gradient(ellipse 88% 84% at 50% 45%, #000 40%, transparent 92%)', WebkitMaskImage: 'radial-gradient(ellipse 88% 84% at 50% 45%, #000 40%, transparent 92%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 52%, rgba(0,0,0,0.4) 100%)' }} />
    </div>
  );
}

// ── Status LED (RUN/STOP/ERROR/MAINT) with soft glow + optional blink ──────────
function LedM6({ cx, cy, r = 9, color = TL6.grn, on = true, label, t = 0, blink = false, sub }) {
  const lit = on && (!blink || (Math.sin(t * 7) > -0.2));
  return (
    <g>
      {lit && <circle cx={cx} cy={cy} r={r * 2.4} fill={color} opacity={0.22} />}
      <circle cx={cx} cy={cy} r={r} fill={lit ? color : '#2a3346'} stroke={lit ? color : '#3a455c'} strokeWidth="1.5" />
      {lit && <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.34} fill="#fff" opacity={0.7} />}
      {label && <text x={cx + r + 12} y={cy + (sub ? -2 : 5)} fill={lit ? color : TL6.dim} fontFamily={MONO6} fontSize="16" fontWeight="700">{label}</text>}
      {sub && <text x={cx + r + 12} y={cy + 17} fill={TL6.dim} fontFamily={MONO6} fontSize="12">{sub}</text>}
    </g>
  );
}

// ── Animated signal line ───────────────────────────────────────────────────────
function SignalM6({ d, start, t, color = TL6.cyan, width = 4, dur = 0.8, speed = 50, live = true }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const off = -(t * speed) % 26;
  return (
    <>
      <path d={d} fill="none" stroke={`color-mix(in oklch, ${color} 26%, transparent)`} strokeWidth={width + 6} strokeLinecap="round" strokeLinejoin="round" opacity={e} />
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14 12" strokeDashoffset={live ? off : 0} opacity={e} />
    </>
  );
}

// ── Module / function block (dark panel face + accent spine + LED) ─────────────
function BlockM6({ x, y, w = 200, h = 96, label, sub, accent = TL6.cyan, t, appear = 0, active = true, led = false }) {
  const ap = pop6(t, appear, 0.5, 14);
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={TL6.paper} stroke={active ? accent : TL6.lineS} strokeWidth={active ? 2.4 : 1.6} />
      <rect x={x} y={y} width="5" height={h} rx="2.5" fill={accent} />
      {led && <circle cx={x + w - 16} cy={y + 16} r="5" fill={active ? TL6.grn : TL6.dim} opacity={active ? 1 : 0.5} />}
      <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 8)} fill={TL6.ink} fontFamily={DISP6} fontSize="26" fontWeight="700" textAnchor="middle">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 24} fill={TL6.mut} fontFamily={MONO6} fontSize="15" textAnchor="middle">{sub}</text>}
    </g>
  );
}

// ── Arrow connector ────────────────────────────────────────────────────────────
function ArrowM6({ x1, y1, x2, y2, start, t, color = TL6.mut, label, dur = 0.6, dashed = false, live = false }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hx = x1 + (x2 - x1) * e, hy = y1 + (y2 - y1) * e;
  const off = live ? (-(t * 40) % 20) : 0;
  return (
    <g opacity={clamp(e * 4, 0, 1)}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={dashed ? '9 7' : undefined} strokeDashoffset={off} />
      {e > 0.96 && <polygon points={`${x2},${y2} ${x2 - 13 * Math.cos(ang - 0.4)},${y2 - 13 * Math.sin(ang - 0.4)} ${x2 - 13 * Math.cos(ang + 0.4)},${y2 - 13 * Math.sin(ang + 0.4)}`} fill={color} />}
      {label && e > 0.5 && <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 12} fill={color} fontFamily={MONO6} fontSize="17" fontWeight="600" textAnchor="middle">{label}</text>}
    </g>
  );
}

// ── Ladder rung: power rails + contacts + coil; energized path glows green ─────
// contacts: [{x, type:'NO'|'NC', label, closed}]  coil:{x,label,on}
function RungM6({ x, y, w = 1000, t, appear = 0, energized = false, contacts = [], coil = null, rung = 1 }) {
  const ap = pop6(t, appear, 0.55, 0);
  const railL = x, railR = x + w, cy = y;
  const flow = energized ? TL6.grn : TL6.dim;
  const off = energized ? (-(t * 36) % 22) : 0;
  return (
    <g opacity={ap.op}>
      {/* left rail label */}
      <text x={x - 26} y={cy + 6} fill={TL6.dim} fontFamily={MONO6} fontSize="15" textAnchor="end">{String(rung).padStart(2, '0')}</text>
      {/* wire */}
      <line x1={railL} y1={cy} x2={railR} y2={cy} stroke={energized ? TL6.grn : TL6.lineS} strokeWidth={energized ? 3.4 : 2} strokeDasharray={energized ? '12 9' : undefined} strokeDashoffset={off} opacity={energized ? 0.9 : 0.7} />
      {contacts.map((c, i) => {
        const closed = c.closed != null ? c.closed : energized;
        return (
          <g key={i}>
            <rect x={c.x - 26} y={cy - 22} width="52" height="44" fill={TL6.bg} />
            <line x1={c.x - 16} y1={cy - 16} x2={c.x - 16} y2={cy + 16} stroke={closed ? TL6.grn : TL6.mut} strokeWidth="3" />
            <line x1={c.x + 16} y1={cy - 16} x2={c.x + 16} y2={cy + 16} stroke={closed ? TL6.grn : TL6.mut} strokeWidth="3" />
            {c.type === 'NC' && <line x1={c.x - 18} y1={cy - 18} x2={c.x + 18} y2={cy + 18} stroke={closed ? TL6.grn : TL6.mut} strokeWidth="2.4" />}
            <text x={c.x} y={cy - 30} fill={closed ? TL6.grn : TL6.mut} fontFamily={MONO6} fontSize="15" fontWeight="600" textAnchor="middle">{c.label}</text>
          </g>
        );
      })}
      {coil && (
        <g>
          <rect x={coil.x - 30} y={cy - 22} width="60" height="44" fill={TL6.bg} />
          <path d={`M${coil.x - 20} ${cy - 17} Q${coil.x - 30} ${cy} ${coil.x - 20} ${cy + 17}`} fill="none" stroke={coil.on ? TL6.grn : TL6.mut} strokeWidth="3" />
          <path d={`M${coil.x + 20} ${cy - 17} Q${coil.x + 30} ${cy} ${coil.x + 20} ${cy + 17}`} fill="none" stroke={coil.on ? TL6.grn : TL6.mut} strokeWidth="3" />
          <text x={coil.x} y={cy - 30} fill={coil.on ? TL6.grn : TL6.mut} fontFamily={MONO6} fontSize="15" fontWeight="600" textAnchor="middle">{coil.label}</text>
          {coil.on && <circle cx={coil.x} cy={cy} r="4" fill={TL6.grn} />}
        </g>
      )}
    </g>
  );
}

// ── I/O terminal block: numbered terminals with optional wire color ────────────
function TerminalM6({ x, y, n = 8, prefix = 'I0.', accent = TL6.cyan, t, appear = 0, activeIdx = -1, title }) {
  const ap = pop6(t, appear, 0.5, 14);
  const tw = 70, th = 52;
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      {title && <text x={x + (n * tw) / 2} y={y - 16} fill={accent} fontFamily={MONO6} fontSize="16" fontWeight="700" textAnchor="middle" letterSpacing="0.12em">{title}</text>}
      <rect x={x - 6} y={y - 6} width={n * tw + 12} height={th + 12} rx="8" fill={TL6.paper} stroke={TL6.lineS} strokeWidth="1.6" />
      {Array.from({ length: n }).map((_, i) => {
        const on = i === activeIdx;
        return (
          <g key={i}>
            <rect x={x + i * tw} y={y} width={tw - 8} height={th} rx="6" fill={on ? TL6.grnWash : TL6.bg2} stroke={on ? TL6.grn : TL6.lineS} strokeWidth={on ? 2 : 1.4} />
            <circle cx={x + i * tw + (tw - 8) / 2} cy={y + 15} r="5.5" fill={on ? TL6.grn : '#2a3346'} stroke={on ? TL6.grn : '#3a455c'} strokeWidth="1.2" />
            <text x={x + i * tw + (tw - 8) / 2} y={y + th - 10} fill={on ? TL6.grn : TL6.mut} fontFamily={MONO6} fontSize="13" fontWeight="600" textAnchor="middle">{prefix}{i}</text>
          </g>
        );
      })}
    </g>
  );
}

// ── Code panel (IDE-style) — lines:[{txt, c?}] supports simple token color ──────
function CodeM6({ x, y, w = 760, title = 'ST', lines = [], t, appear = 0, reveal = 1 }) {
  const ap = pop6(t, appear, 0.55, 18);
  const lh = 30, pad = 22, headH = 40;
  const h = headH + pad * 2 + lines.length * lh;
  const shown = Math.round(clamp(reveal, 0, 1) * lines.length);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: ap.op, transform: `translateY(${ap.ty}px)` }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL6.lineS}`, background: '#0a0e18', boxShadow: TL6.shadow }}>
        <div style={{ height: headH, background: TL6.paper2, borderBottom: `1px solid ${TL6.lineS}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL6.red }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL6.amber }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL6.grn }} />
          <span style={{ marginLeft: 10, fontFamily: MONO6, fontSize: 13, color: TL6.mut, letterSpacing: '0.14em' }}>{title}</span>
        </div>
        <div style={{ padding: `${pad}px 0`, fontFamily: MONO6, fontSize: 18, lineHeight: `${lh}px` }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ display: 'flex', opacity: i < shown ? 1 : 0, transition: 'opacity .2s' }}>
              <span style={{ width: 46, textAlign: 'right', paddingRight: 16, color: TL6.dim, userSelect: 'none', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ color: ln.c || TL6.ink, whiteSpace: 'pre', paddingRight: 18 }}>{ln.txt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Bit row: 8/16 cells showing 0/1 with highlight ─────────────────────────────
function BitsM6({ x, y, bits = [], labels = null, accent = TL6.cyan, t, appear = 0, cell = 58 }) {
  const ap = pop6(t, appear, 0.5, 14);
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      {bits.map((b, i) => (
        <g key={i}>
          <rect x={x + i * cell} y={y} width={cell - 8} height={cell - 8} rx="8" fill={b ? TL6.cyanWash : TL6.bg2} stroke={b ? accent : TL6.lineS} strokeWidth={b ? 2.2 : 1.4} />
          <text x={x + i * cell + (cell - 8) / 2} y={y + (cell - 8) / 2 + 11} fill={b ? accent : TL6.dim} fontFamily={MONO6} fontSize="30" fontWeight="700" textAnchor="middle">{b ? '1' : '0'}</text>
          {labels && <text x={x + i * cell + (cell - 8) / 2} y={y + cell + 14} fill={TL6.dim} fontFamily={MONO6} fontSize="12" textAnchor="middle">{labels[i]}</text>}
        </g>
      ))}
    </g>
  );
}

// ── Info card ─────────────────────────────────────────────────────────────────
function InfoCardM6({ x, y, w = 360, h = 300, no, Icon, accent = TL6.cyan, title, sub, appear, t }) {
  const { op, sc, ty } = pop6(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 12, border: `1px solid ${TL6.lineS}`, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, boxShadow: TL6.shadow, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
        {no != null && <div style={{ fontFamily: MONO6, fontSize: 13, letterSpacing: '0.24em', color: TL6.dim }}>{String(no).padStart(2, '0')}</div>}
        {Icon && <div style={{ marginTop: 2 }}><Icon c={accent} t={t} /></div>}
        <div style={{ fontFamily: DISP6, fontSize: 30, fontWeight: 700, color: TL6.ink, letterSpacing: '-0.01em', lineHeight: 1.06 }}>{title}</div>
        <div style={{ fontFamily: DISP6, fontSize: 19, fontWeight: 400, color: TL6.mut, lineHeight: 1.42 }}>{sub}</div>
        <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: accent, borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ── Stat ──────────────────────────────────────────────────────────────────────
function StatM6({ x, y, value, unit, label, accent = TL6.cyan, appear, t, align = 'left' }) {
  const { op, ty } = pop6(t, appear, 0.5, 16);
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: op, transform: `translateY(${ty}px)`, textAlign: align }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <span style={{ fontFamily: DISP6, fontSize: 76, fontWeight: 700, color: accent, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{value}</span>
        {unit && <span style={{ fontFamily: MONO6, fontSize: 26, fontWeight: 500, color: TL6.mut }}>{unit}</span>}
      </div>
      {label && <div style={{ marginTop: 10, fontFamily: MONO6, fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', color: TL6.dim }}>{label}</div>}
    </div>
  );
}

// ── Title card ─────────────────────────────────────────────────────────────────
function TitleCardM6({ start, dur, claseNo, title, dudur, objetivo, seccion = 'Fundamentos del PLC' }) {
  const t = useTime();
  const s = start, end = start + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const big = pop6(t, s + 0.3, 0.8, 0);
  const ti = pop6(t, s + 0.9, 0.7, 20);
  const ob = pop6(t, s + 2.0, 0.7, 16);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', right: '5%', top: '50%', transform: `translateY(-50%) scale(${big.sc})`, opacity: big.op * 0.12, fontFamily: DISP6, fontSize: 660, fontWeight: 700, color: TL6.cyan, lineHeight: 0.8, letterSpacing: '-0.04em' }}>{String(claseNo).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', left: '9%', top: '50%', transform: 'translateY(-50%)', width: 1260 }}>
        <KickerM6 start={s + 0.4} dur={dur - 0.6} text={`Módulo 6 · ${seccion}`} x="0" y="-140px" align="left" />
        <div style={{ opacity: ti.op, transform: `translateY(${ti.ty}px)`, fontFamily: DISP6, fontSize: 84, fontWeight: 700, color: TL6.ink, lineHeight: 1.02, letterSpacing: '-0.02em', textWrap: 'balance' }}>{title}</div>
        <div style={{ marginTop: 30, opacity: ob.op, transform: `translateY(${ob.ty}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1040 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 44, height: 3, background: TL6.grn, borderRadius: 2 }} />
            <span style={{ fontFamily: MONO6, fontSize: 16, letterSpacing: '0.22em', color: TL6.grn, textTransform: 'uppercase', fontWeight: 600 }}>Clase 6.{claseNo} · Duración {dudur}</span>
          </div>
          <div style={{ fontFamily: DISP6, fontSize: 28, fontWeight: 400, color: TL6.mut, lineHeight: 1.42 }}>{objetivo}</div>
        </div>
      </div>
    </div>
  );
}

// ── Closing ─────────────────────────────────────────────────────────────────
function ClosingM6({ start, dur, line, activityLabel, activity }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const a = pop6(t, s + 1.4, 0.6, 18);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 8%' }}>
      <div style={{ fontFamily: DISP6, fontSize: 58, fontWeight: 600, color: TL6.ink, textAlign: 'center', lineHeight: 1.14, letterSpacing: '-0.01em', maxWidth: 1540, textWrap: 'balance' }}>{line}</div>
      {activity && (
        <div style={{ opacity: a.op, transform: `translateY(${a.ty}px)`, display: 'flex', alignItems: 'stretch', borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL6.lineS}`, boxShadow: TL6.shadowSm, maxWidth: 1360, background: TL6.paper }}>
          <div style={{ background: TL6.grn, color: '#06251a', fontFamily: MONO6, fontSize: 15, fontWeight: 700, letterSpacing: '0.16em', padding: '20px 24px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{activityLabel || 'Actividad'}</div>
          <div style={{ color: TL6.ink, fontFamily: DISP6, fontSize: 23, fontWeight: 400, padding: '18px 28px', display: 'flex', alignItems: 'center', lineHeight: 1.35 }}>{activity}</div>
        </div>
      )}
    </div>
  );
}

// ── Shell + chrome + progress ─────────────────────────────────────────────────
function ClassShellM6({ scenes, claseNo, claseName }) {
  let acc = 0;
  const timed = scenes.map(sc => { const o = { ...sc, start: acc }; acc += sc.dur; return o; });
  const total = acc;
  return (
    <Stage width={1920} height={1080} duration={total} background={TL6.bg} persistKey={`m6c${claseNo}`}>
      <div id="video-root" data-screen-label={`M6 Clase 6.${claseNo}`} style={{ position: 'absolute', inset: 0 }}>
        <GlobalBGM6 />
        {timed.map((sc, i) => <sc.C key={i} start={sc.start} dur={sc.dur} />)}
        <ChromeM6 timed={timed} claseNo={claseNo} claseName={claseName} />
        <ProgressM6 timed={timed} />
      </div>
    </Stage>
  );
}
function ChromeM6({ timed, claseNo, claseName }) {
  const t = useTime();
  let label = '';
  for (const sc of timed) if (t >= sc.start - 0.0001) label = sc.label || '';
  return (
    <div style={{ position: 'absolute', left: 54, bottom: 46, zIndex: 40, fontFamily: MONO6, fontSize: 13, letterSpacing: '0.2em', color: TL6.mut, display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase' }}>
      <span style={{ color: TL6.cyan, fontWeight: 600 }}>M6 · CLASE 6.{claseNo}</span>
      <span style={{ width: 30, height: 1, background: TL6.lineS }} />
      <span>{claseName}</span>
      {label && <><span style={{ width: 30, height: 1, background: TL6.lineS }} /><span style={{ color: TL6.dim }}>{label}</span></>}
    </div>
  );
}
function ProgressM6({ timed }) {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', top: 40, right: 54, zIndex: 40, display: 'flex', gap: 6, alignItems: 'center' }}>
      {timed.map((sc, i) => {
        const active = t >= sc.start && t < sc.start + sc.dur;
        const done = t >= sc.start + sc.dur;
        return <div key={i} style={{ width: active ? 30 : 16, height: 3, borderRadius: 2, background: active ? TL6.grn : (done ? TL6.cyan : 'rgba(148,160,189,0.22)'), transition: 'width 200ms' }} />;
      })}
    </div>
  );
}

Object.assign(window, {
  TL6, DISP6, MONO6, pop6,
  SceneM6, CapM6, KickerM6, BracketsM6, GlobalBGM6, SignalM6,
  LedM6, BlockM6, ArrowM6, RungM6, TerminalM6, CodeM6, BitsM6,
  InfoCardM6, StatM6, TitleCardM6, ClosingM6,
  ClassShellM6, ChromeM6, ProgressM6,
});
