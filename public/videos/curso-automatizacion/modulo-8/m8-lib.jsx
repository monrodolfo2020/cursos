// m8-lib.jsx — Módulo 8 "Sistemas SCADA — la sala de control en tu pantalla".
// DARK theme: grafito cálido + CORAL persimón (primario / equipo · HMI) +
// AZUL-ACERO "agua" (proceso / info) + MIEL dorada (datos / valores).
// "operations center" feel. Depends only on animations.jsx. Exports w/ M8 suffix.

const TL8 = {
  bg:      '#0f1116',
  bg2:     '#15181f',
  paper:   '#1c2029',          // panel face
  paper2:  '#252a35',          // raised panel
  ink:     '#f4f1ea',          // warm white
  mut:     '#9aa3b2',          // cool steel gray
  dim:     '#5f6776',
  line:    'rgba(150,168,196,0.10)',
  lineS:   'rgba(150,168,196,0.22)',
  coral:   '#ff6a4b',          // primario — equipo / HMI / títulos
  coralD:  '#e8472a',
  coralLt: '#ff9b85',
  coralWash:'rgba(255,106,75,0.13)',
  steel:   '#5891d8',          // agua / proceso / info
  steelD:  '#3a6fb8',
  steelLt: '#8fb6e8',
  steelWash:'rgba(88,145,216,0.13)',
  honey:   '#f4b53f',          // datos / valores / energía
  honeyD:  '#d8991f',
  honeyWash:'rgba(244,181,63,0.13)',
  grn:     '#54c98a',          // OK / online / RUN
  red:     '#ff4d63',          // alarma crítica
  yellow:  '#ffd23f',          // advertencia (ASM)
  shadow:  '0 22px 60px rgba(0,0,0,0.58)',
  shadowSm:'0 8px 22px rgba(0,0,0,0.44)',
};
const DISP8 = "'Space Grotesk', system-ui, sans-serif";
const MONO8 = "'IBM Plex Mono', ui-monospace, monospace";

function pop8(t, appear, d = 0.5, rise = 18) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.94, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  const eb = Easing.easeOutBack(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.94 + 0.06 * eb, ty: (1 - e) * rise };
}

// ── Scene wrapper ─────────────────────────────────────────────────────────────
function SceneM8({ start, dur, children, fade = 0.55 }) {
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
function CapM8({ start, dur = 2.6, children, x = '50%', y = '50%', size = 60, weight = 600, color = TL8.ink, mono = false, align = 'center', width = 1500, lh = 1.12, ls = '-0.01em', up = 22 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.5, outD = 0.42;
  let op = 1, ty = 0;
  if (lt < inD) { const e = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); op = e; ty = (1 - e) * up; }
  else if (lt > dur - outD) { const e = Easing.easeInCubic(clamp((lt - (dur - outD)) / outD, 0, 1)); op = 1 - e; ty = -e * up * 0.5; }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx}, calc(-50% + ${ty}px))`, opacity: op, width, maxWidth: '92vw', textAlign: align, color, fontFamily: mono ? MONO8 : DISP8, fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: ls, willChange: 'transform, opacity', textWrap: 'balance' }}>
      {children}
    </div>
  );
}

// ── Kicker ────────────────────────────────────────────────────────────────────
function KickerM8({ start, dur = 3, text, x = '50%', y = '50%', align = 'center', color = TL8.coral, size = 17 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.4, outD = 0.35;
  let op = 1;
  if (lt < inD) op = clamp(lt / inD, 0, 1);
  else if (lt > dur - outD) op = clamp((dur - lt) / outD, 0, 1);
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx},-50%)`, opacity: op, color, fontFamily: MONO8, fontSize: size, letterSpacing: '0.3em', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: align, display: 'flex', alignItems: 'center', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
      {text}
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
    </div>
  );
}

// ── Background: warm graphite + faint HMI mimic grid + slow scan + soft glows ──
function GlobalBGM8() {
  const t = useTime();
  const ax = 16 + Math.sin(t * 0.06) * 7, ay = 14 + Math.cos(t * 0.05) * 6;
  const bx = 86 + Math.cos(t * 0.055) * 7, by = 88 + Math.sin(t * 0.045) * 6;
  const sweep = ((t * 0.04) % 1) * 100;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `linear-gradient(168deg, ${TL8.bg2}, ${TL8.bg})` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 880px at ${ax}% ${ay}%, rgba(255,106,75,0.13), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 720px at ${bx}% ${by}%, rgba(88,145,216,0.11), transparent 60%)` }} />
      {/* faint control-room mimic grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 100 100">
        {[14, 28, 42, 56, 70, 84].map((gx, i) => <line key={'v' + i} x1={gx} y1="0" x2={gx} y2="100" stroke="rgba(150,168,196,0.05)" strokeWidth="0.08" />)}
        {[18, 36, 54, 72, 90].map((gy, i) => <line key={'h' + i} x1="0" y1={gy} x2="100" y2={gy} stroke="rgba(150,168,196,0.05)" strokeWidth="0.08" />)}
        <line x1={sweep} y1="0" x2={sweep} y2="100" stroke="rgba(88,145,216,0.10)" strokeWidth="0.16" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 48%, rgba(0,0,0,0.48) 100%)' }} />
    </div>
  );
}

// ── Corner brackets ──────────────────────────────────────────────────────────
function BracketsM8({ color = TL8.coral, size = 18, thick = 2, inset = 0 }) {
  const c = (pos) => {
    const base = { position: 'absolute', width: size, height: size, borderColor: color, borderStyle: 'solid', borderWidth: 0 };
    if (pos === 'tl') return { ...base, top: inset, left: inset, borderTopWidth: thick, borderLeftWidth: thick };
    if (pos === 'tr') return { ...base, top: inset, right: inset, borderTopWidth: thick, borderRightWidth: thick };
    if (pos === 'bl') return { ...base, bottom: inset, left: inset, borderBottomWidth: thick, borderLeftWidth: thick };
    return { ...base, bottom: inset, right: inset, borderBottomWidth: thick, borderRightWidth: thick };
  };
  return <>{['tl', 'tr', 'bl', 'br'].map(p => <div key={p} style={c(p)} />)}</>;
}

// ── Device / server node (architecture diagrams) ─────────────────────────────
function NodeM8({ x, y, w = 200, h = 96, label, sub, accent = TL8.coral, t, appear = 0, active = true, icon = null, online = false }) {
  const ap = pop8(t, appear, 0.5, 14);
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={TL8.paper} stroke={active ? accent : TL8.lineS} strokeWidth={active ? 2.4 : 1.6} />
      <rect x={x} y={y} width={w} height="5" rx="2.5" fill={accent} />
      {online && <circle cx={x + w - 16} cy={y + 20} r="5" fill={TL8.grn} />}
      {icon && <text x={x + 20} y={y + h / 2 + 9} fontSize="26" textAnchor="middle">{icon}</text>}
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 9)} fill={TL8.ink} fontFamily={DISP8} fontSize="24" fontWeight="700" textAnchor="middle">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 24} fill={TL8.mut} fontFamily={MONO8} fontSize="14" textAnchor="middle">{sub}</text>}
    </g>
  );
}

// ── Link line with animated data packets ──────────────────────────────────────
function LinkM8({ x1, y1, x2, y2, start, t, color = TL8.steel, width = 3, label, dur = 0.6, packets = true, back = false, dashed = false, speed = 0.55 }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const hx = x1 + (x2 - x1) * e, hy = y1 + (y2 - y1) * e;
  const live = t - start;
  const dots = [];
  if (packets && e > 0.98) {
    const n = 3;
    for (let i = 0; i < n; i++) {
      const f = ((live * speed) + i / n) % 1;
      dots.push({ x: x1 + (x2 - x1) * f, y: y1 + (y2 - y1) * f, c: color });
      if (back) { const fb = 1 - (((live * speed) + i / n + 0.5) % 1); dots.push({ x: x1 + (x2 - x1) * fb, y: y1 + (y2 - y1) * fb, c: TL8.coral }); }
    }
  }
  return (
    <g>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={`color-mix(in oklch, ${color} 42%, transparent)`} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? '8 7' : undefined} />
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r="7" fill={d.c} opacity="0.25" />
          <rect x={d.x - 5} y={d.y - 5} width="10" height="10" rx="2.5" fill={d.c} />
        </g>
      ))}
      {label && e > 0.5 && <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 14} fill={color} fontFamily={MONO8} fontSize="16" fontWeight="600" textAnchor="middle">{label}</text>}
    </g>
  );
}

// ── Arrow connector (no packets) ──────────────────────────────────────────────
function ArrowM8({ x1, y1, x2, y2, start, t, color = TL8.mut, label, dur = 0.6, dashed = false }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hx = x1 + (x2 - x1) * e, hy = y1 + (y2 - y1) * e;
  return (
    <g opacity={clamp(e * 4, 0, 1)}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={dashed ? '9 7' : undefined} />
      {e > 0.96 && <polygon points={`${x2},${y2} ${x2 - 13 * Math.cos(ang - 0.4)},${y2 - 13 * Math.sin(ang - 0.4)} ${x2 - 13 * Math.cos(ang + 0.4)},${y2 - 13 * Math.sin(ang + 0.4)}`} fill={color} />}
      {label && e > 0.5 && <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 12} fill={color} fontFamily={MONO8} fontSize="16" fontWeight="600" textAnchor="middle">{label}</text>}
    </g>
  );
}

// ── Tank with animated level (SVG, place inside an <svg>) ──────────────────────
// level 0..1 ; tag e.g. "T-101" ; valTxt e.g. "2.4 m"
function TankM8({ x, y, w = 150, h = 200, level = 0.5, accent = TL8.steel, tag, valTxt, t, appear = 0, alarm = false }) {
  const ap = pop8(t, appear, 0.55, 16);
  const fillH = (h - 10) * clamp(level, 0, 1);
  const fillY = y + h - 5 - fillH;
  const fc = alarm ? TL8.red : accent;
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      {/* body */}
      <rect x={x} y={y} width={w} height={h} rx="14" fill={TL8.bg2} stroke={alarm ? TL8.red : TL8.lineS} strokeWidth={alarm ? 2.6 : 1.8} />
      {/* liquid */}
      <clipPath id={`tk-${tag}`}><rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx="11" /></clipPath>
      <g clipPath={`url(#tk-${tag})`}>
        <rect x={x + 4} y={fillY} width={w - 8} height={fillH + 6} fill={fc} opacity="0.32" />
        <rect x={x + 4} y={fillY} width={w - 8} height="4" fill={fc} />
        {/* gentle surface ripple */}
        <rect x={x + 4} y={fillY - 2} width={w - 8} height="2" fill={fc} opacity={0.5 + 0.4 * Math.sin(t * 2)} />
      </g>
      {/* level ticks */}
      {[0.25, 0.5, 0.75].map((f, i) => <line key={i} x1={x + w - 14} y1={y + h - 5 - (h - 10) * f} x2={x + w - 5} y2={y + h - 5 - (h - 10) * f} stroke={TL8.dim} strokeWidth="1.5" />)}
      {tag && <text x={x + w / 2} y={y - 14} fill={TL8.ink} fontFamily={MONO8} fontSize="17" fontWeight="700" textAnchor="middle">{tag}</text>}
      {valTxt && <text x={x + w / 2} y={y + h + 28} fill={alarm ? TL8.red : TL8.honey} fontFamily={DISP8} fontSize="26" fontWeight="700" textAnchor="middle">{valTxt}</text>}
    </g>
  );
}

// ── Circular gauge (HTML, absolute-positioned div) ────────────────────────────
function GaugeM8({ x, y, value, frac, unit, label, accent = TL8.honey, t, appear = 0, size = 220, sub }) {
  const ap = pop8(t, appear, 0.5, 18);
  const R = size * 0.38, C = 2 * Math.PI * R, cf = clamp(frac, 0, 1);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: size, opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke={TL8.bg2} strokeWidth={size * 0.07} />
          <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke={accent} strokeWidth={size * 0.07} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - cf)} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: DISP8, fontSize: size * 0.22, fontWeight: 700, color: TL8.ink, lineHeight: 1 }}>{value}</div>
          {unit && <div style={{ fontFamily: MONO8, fontSize: size * 0.08, color: accent, marginTop: 2 }}>{unit}</div>}
        </div>
      </div>
      {label && <div style={{ marginTop: 10, fontFamily: MONO8, fontSize: 14, color: TL8.dim, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</div>}
      {sub && <div style={{ marginTop: 4, fontFamily: DISP8, fontSize: 15, color: TL8.mut }}>{sub}</div>}
    </div>
  );
}

// ── Status LED (HTML) ─────────────────────────────────────────────────────────
function LedM8({ x, y, on = false, color = TL8.grn, offColor = TL8.dim, label, sub, t, appear = 0, blink = false }) {
  const ap = pop8(t, appear, 0.45, 12);
  const lit = on && (!blink || Math.sin((t || 0) * 6) > 0);
  const c = on ? color : offColor;
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ width: 20, height: 20, borderRadius: 12, background: lit ? c : TL8.bg2, border: `2px solid ${c}`, boxShadow: lit ? `0 0 16px ${c}` : 'none', flexShrink: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {label && <span style={{ fontFamily: DISP8, fontSize: 21, fontWeight: 600, color: TL8.ink }}>{label}</span>}
        {sub && <span style={{ fontFamily: MONO8, fontSize: 13.5, color: on ? color : TL8.dim, letterSpacing: '0.06em' }}>{sub}</span>}
      </div>
    </div>
  );
}

// ── HMI / Ignition window frame (HTML) — chrome with tab + body ───────────────
function HMIFrameM8({ x, y, w = 1000, h = 560, title = 'Vista_General — Perspective', t, appear = 0, accent = TL8.coral, children, tabs }) {
  const ap = pop8(t, appear, 0.6, 20);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', border: `1px solid ${TL8.lineS}`, background: TL8.paper, boxShadow: TL8.shadow, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 44, background: TL8.paper2, borderBottom: `1px solid ${TL8.lineS}`, display: 'flex', alignItems: 'center', gap: 9, padding: '0 16px', flexShrink: 0 }}>
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL8.red }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL8.honey }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL8.grn }} />
          <span style={{ marginLeft: 12, fontFamily: MONO8, fontSize: 13.5, color: TL8.mut, letterSpacing: '0.05em' }}>{title}</span>
          {tabs && <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>{tabs.map((tb, i) => <span key={i} style={{ fontFamily: MONO8, fontSize: 12.5, color: i === 0 ? accent : TL8.dim, padding: '4px 12px', borderRadius: 7, background: i === 0 ? TL8.coralWash : 'transparent', border: `1px solid ${i === 0 ? accent : TL8.line}` }}>{tb}</span>)}</div>}
        </div>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: TL8.bg }}>{children}</div>
      </div>
    </div>
  );
}

// ── ISA pyramid / level stack (top→bottom) ────────────────────────────────────
function PyramidM8({ cx, top, levels, t, appear = 0, totalW = 760, h = 90, gap = 8 }) {
  const n = levels.length;
  return (
    <g>
      {levels.map((lv, i) => {
        const ap = pop8(t, appear + i * 0.35, 0.5, 14);
        const wTop = totalW * (0.36 + (i / n) * 0.64);
        const wBot = totalW * (0.36 + ((i + 1) / n) * 0.64);
        const y = top + i * (h + gap);
        const pts = `${cx - wTop / 2},${y} ${cx + wTop / 2},${y} ${cx + wBot / 2},${y + h} ${cx - wBot / 2},${y + h}`;
        return (
          <g key={i} opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
            <polygon points={pts} fill={TL8.paper} stroke={lv.accent} strokeWidth="2.2" />
            <text x={cx - wTop / 2 - 18} y={y + h / 2 + 6} fill={lv.accent} fontFamily={MONO8} fontSize="22" fontWeight="700" textAnchor="end">{lv.tag || 'N' + lv.n}</text>
            <text x={cx} y={y + h / 2 - 3} fill={TL8.ink} fontFamily={DISP8} fontSize="23" fontWeight="700" textAnchor="middle">{lv.name}</text>
            <text x={cx} y={y + h / 2 + 22} fill={lv.accent} fontFamily={MONO8} fontSize="13.5" textAnchor="middle">{lv.sub}</text>
          </g>
        );
      })}
    </g>
  );
}

// ── Code panel (IDE-style) — lines:[{txt, c?}] ─────────────────────────────────
function CodeM8({ x, y, w = 760, title = 'Python · Jython', lines = [], t, appear = 0, reveal = 1 }) {
  const ap = pop8(t, appear, 0.55, 18);
  const lh = 30, pad = 22, headH = 40;
  const shown = Math.round(clamp(reveal, 0, 1) * lines.length);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: ap.op, transform: `translateY(${ap.ty}px)` }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL8.lineS}`, background: '#0a0c11', boxShadow: TL8.shadow }}>
        <div style={{ height: headH, background: TL8.paper2, borderBottom: `1px solid ${TL8.lineS}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL8.red }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL8.honey }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL8.grn }} />
          <span style={{ marginLeft: 10, fontFamily: MONO8, fontSize: 13, color: TL8.mut, letterSpacing: '0.14em' }}>{title}</span>
        </div>
        <div style={{ padding: `${pad}px 0`, fontFamily: MONO8, fontSize: 17.5, lineHeight: `${lh}px` }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ display: 'flex', opacity: i < shown ? 1 : 0, transition: 'opacity .2s' }}>
              <span style={{ width: 44, textAlign: 'right', paddingRight: 16, color: TL8.dim, userSelect: 'none', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ color: ln.c || TL8.ink, whiteSpace: 'pre', paddingRight: 18 }}>{ln.txt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Info card ─────────────────────────────────────────────────────────────────
function InfoCardM8({ x, y, w = 360, h = 300, no, accent = TL8.coral, title, sub, appear, t, icon }) {
  const { op, sc, ty } = pop8(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 12, border: `1px solid ${TL8.lineS}`, background: `linear-gradient(160deg, ${TL8.paper}, ${TL8.bg2})`, boxShadow: TL8.shadow, padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 11, overflow: 'hidden' }}>
        {no != null && <div style={{ fontFamily: MONO8, fontSize: 13, letterSpacing: '0.24em', color: TL8.dim }}>{String(no).padStart(2, '0')}</div>}
        {icon && <div style={{ fontSize: 30, lineHeight: 1 }}>{icon}</div>}
        {title && <div style={{ fontFamily: DISP8, fontSize: 27, fontWeight: 700, color: TL8.ink, letterSpacing: '-0.01em', lineHeight: 1.08 }}>{title}</div>}
        <div style={{ fontFamily: DISP8, fontSize: 18.5, fontWeight: 400, color: TL8.mut, lineHeight: 1.42 }}>{sub}</div>
        <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: accent, borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ── Stat ──────────────────────────────────────────────────────────────────────
function StatM8({ x, y, value, unit, label, accent = TL8.coral, appear, t, align = 'left' }) {
  const { op, ty } = pop8(t, appear, 0.5, 16);
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: op, transform: `translateY(${ty}px)`, textAlign: align, ...(align === 'center' ? { transform: `translate(-50%, ${ty}px)` } : {}) }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <span style={{ fontFamily: DISP8, fontSize: 72, fontWeight: 700, color: accent, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{value}</span>
        {unit && <span style={{ fontFamily: MONO8, fontSize: 24, fontWeight: 500, color: TL8.mut }}>{unit}</span>}
      </div>
      {label && <div style={{ marginTop: 10, fontFamily: MONO8, fontSize: 13.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: TL8.dim }}>{label}</div>}
    </div>
  );
}

// ── Data table ─────────────────────────────────────────────────────────────────
function TableM8({ x, y, w = 1200, headers, rows, t, appear = 0, accentCol = -1, colTemplate }) {
  const tpl = colTemplate || headers.map(() => '1fr').join(' ');
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL8.lineS}`, boxShadow: TL8.shadow }}>
        <div style={{ display: 'grid', gridTemplateColumns: tpl }}>
          {headers.map((h, i) => (
            <div key={i} style={{ background: TL8.paper2, padding: '15px 22px', fontFamily: MONO8, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: i === accentCol ? TL8.coral : TL8.steelLt, fontWeight: 700, borderBottom: `1px solid ${TL8.lineS}`, borderLeft: i ? `1px solid ${TL8.line}` : 'none' }}>{h}</div>
          ))}
        </div>
        {rows.map((r, ri) => {
          const ap = clamp((t - (appear + 0.3 + ri * 0.3)) / 0.45, 0, 1);
          return (
            <div key={ri} style={{ opacity: ap, display: 'grid', gridTemplateColumns: tpl, background: ri % 2 ? TL8.bg2 : TL8.paper, borderBottom: ri < rows.length - 1 ? `1px solid ${TL8.line}` : 'none' }}>
              {r.map((cell, ci) => (
                <div key={ci} style={{ padding: '14px 22px', fontFamily: ci === 0 ? MONO8 : DISP8, fontSize: ci === 0 ? 17 : 18, fontWeight: ci === accentCol ? 600 : 400, color: ci === 0 ? TL8.ink : (ci === accentCol ? TL8.coral : TL8.mut), borderLeft: ci ? `1px solid ${TL8.line}` : 'none', lineHeight: 1.3 }}>{cell}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Alarm row table (priority-colored) ────────────────────────────────────────
// rows: [{pri:'CRITICAL'|'HIGH'|'MEDIUM'|'LOW', tag, msg, time, ack:bool}]
function AlarmTableM8({ x, y, w = 1300, rows, t, appear = 0, title = 'GESTIÓN DE ALARMAS' }) {
  const ap = pop8(t, appear, 0.55, 18);
  const PRI = { CRITICAL: TL8.red, HIGH: '#ff8a3d', MEDIUM: TL8.yellow, LOW: TL8.steel, DIAG: TL8.mut };
  const tpl = '180px 150px 1fr 130px 150px';
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: ap.op, transform: `translateY(${ap.ty}px)` }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL8.lineS}`, boxShadow: TL8.shadow }}>
        <div style={{ background: TL8.paper2, padding: '14px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${TL8.lineS}` }}>
          <span style={{ fontFamily: MONO8, fontSize: 15, letterSpacing: '0.18em', color: TL8.ink, fontWeight: 700 }}>{title}</span>
          <span style={{ fontFamily: MONO8, fontSize: 13.5, color: TL8.red }}>Activas: {rows.filter(r => !r.ack).length}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: tpl, background: TL8.bg2 }}>
          {['Prioridad', 'Tag', 'Mensaje', 'Hora', 'Estado'].map((h, i) => <div key={i} style={{ padding: '11px 20px', fontFamily: MONO8, fontSize: 12.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: TL8.dim, borderLeft: i ? `1px solid ${TL8.line}` : 'none' }}>{h}</div>)}
        </div>
        {rows.map((r, ri) => {
          const rev = clamp((t - (appear + 0.6 + ri * 0.3)) / 0.4, 0, 1);
          const blink = r.pri === 'CRITICAL' && !r.ack && Math.sin(t * 5) > 0;
          return (
            <div key={ri} style={{ opacity: rev, display: 'grid', gridTemplateColumns: tpl, background: blink ? 'rgba(255,77,99,0.10)' : (ri % 2 ? TL8.paper : TL8.bg2), borderTop: `1px solid ${TL8.line}` }}>
              <div style={{ padding: '13px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: PRI[r.pri], flexShrink: 0 }} />
                <span style={{ fontFamily: MONO8, fontSize: 13.5, fontWeight: 700, color: PRI[r.pri] }}>{r.pri}</span>
              </div>
              <div style={{ padding: '13px 20px', fontFamily: MONO8, fontSize: 14.5, color: TL8.ink, borderLeft: `1px solid ${TL8.line}` }}>{r.tag}</div>
              <div style={{ padding: '13px 20px', fontFamily: DISP8, fontSize: 17, color: TL8.mut, borderLeft: `1px solid ${TL8.line}` }}>{r.msg}</div>
              <div style={{ padding: '13px 20px', fontFamily: MONO8, fontSize: 14, color: TL8.dim, borderLeft: `1px solid ${TL8.line}` }}>{r.time}</div>
              <div style={{ padding: '13px 20px', fontFamily: MONO8, fontSize: 13, color: r.ack ? TL8.grn : TL8.red, borderLeft: `1px solid ${TL8.line}` }}>{r.ack ? 'Reconocida' : 'No reconoc.'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Mini trend chart (HTML/SVG) — series:[{color,data[]}] data 0..1 ────────────
function TrendM8({ x, y, w = 800, h = 240, series, t, appear = 0, title, yLabels, live = true }) {
  const ap = pop8(t, appear, 0.55, 18);
  const pad = 14;
  const reveal = clamp((t - appear - 0.4) / 1.6, 0, 1);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: ap.op, transform: `translateY(${ap.ty}px)` }}>
      <div style={{ borderRadius: 12, border: `1px solid ${TL8.lineS}`, background: TL8.paper, boxShadow: TL8.shadowSm, overflow: 'hidden' }}>
        {title && <div style={{ padding: '11px 18px', borderBottom: `1px solid ${TL8.line}`, fontFamily: MONO8, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: TL8.steelLt, display: 'flex', justifyContent: 'space-between' }}><span>{title}</span>{yLabels && <span style={{ color: TL8.dim }}>{yLabels}</span>}</div>}
        <svg width={w} height={h} style={{ display: 'block' }}>
          {[0.25, 0.5, 0.75].map((g, i) => <line key={i} x1={pad} y1={pad + (h - 2 * pad) * g} x2={w - pad} y2={pad + (h - 2 * pad) * g} stroke={TL8.line} strokeWidth="1" />)}
          {series.map((se, si) => {
            const n = se.data.length;
            const cut = Math.max(2, Math.round(n * reveal));
            const pts = se.data.slice(0, cut).map((v, i) => {
              const px = pad + (w - 2 * pad) * (i / (n - 1));
              const py = pad + (h - 2 * pad) * (1 - clamp(v, 0, 1));
              return `${px},${py}`;
            }).join(' ');
            const lastI = cut - 1;
            const lx = pad + (w - 2 * pad) * (lastI / (n - 1));
            const ly = pad + (h - 2 * pad) * (1 - clamp(se.data[lastI], 0, 1));
            return (
              <g key={si}>
                <polyline points={pts} fill="none" stroke={se.color} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
                {live && reveal > 0.99 && <circle cx={lx} cy={ly} r="4.5" fill={se.color} />}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ── Title card ─────────────────────────────────────────────────────────────────
function TitleCardM8({ start, dur, claseNo, title, dudur, objetivo, seccion = 'Sistemas SCADA' }) {
  const t = useTime();
  const s = start, end = start + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const big = pop8(t, s + 0.3, 0.8, 0);
  const ti = pop8(t, s + 0.9, 0.7, 20);
  const ob = pop8(t, s + 2.0, 0.7, 16);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', right: '5%', top: '50%', transform: `translateY(-50%) scale(${big.sc})`, opacity: big.op * 0.12, fontFamily: DISP8, fontSize: 600, fontWeight: 700, color: TL8.coral, lineHeight: 0.8, letterSpacing: '-0.04em' }}>{String(claseNo).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', left: '9%', top: '50%', transform: 'translateY(-50%)', width: 1280 }}>
        <KickerM8 start={s + 0.4} dur={dur - 0.6} text={`Módulo 8 · ${seccion}`} x="0" y="-140px" align="left" />
        <div style={{ opacity: ti.op, transform: `translateY(${ti.ty}px)`, fontFamily: DISP8, fontSize: 82, fontWeight: 700, color: TL8.ink, lineHeight: 1.02, letterSpacing: '-0.02em', textWrap: 'balance' }}>{title}</div>
        <div style={{ marginTop: 30, opacity: ob.op, transform: `translateY(${ob.ty}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1060 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 44, height: 3, background: TL8.steel, borderRadius: 2 }} />
            <span style={{ fontFamily: MONO8, fontSize: 16, letterSpacing: '0.2em', color: TL8.steel, textTransform: 'uppercase', fontWeight: 600 }}>Clase 8.{claseNo} · Duración {dudur}</span>
          </div>
          <div style={{ fontFamily: DISP8, fontSize: 27, fontWeight: 400, color: TL8.mut, lineHeight: 1.42 }}>{objetivo}</div>
        </div>
      </div>
    </div>
  );
}

// ── Closing ─────────────────────────────────────────────────────────────────
function ClosingM8({ start, dur, line, activityLabel, activity }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const a = pop8(t, s + 1.4, 0.6, 18);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 8%' }}>
      <div style={{ fontFamily: DISP8, fontSize: 56, fontWeight: 600, color: TL8.ink, textAlign: 'center', lineHeight: 1.15, letterSpacing: '-0.01em', maxWidth: 1540, textWrap: 'balance' }}>{line}</div>
      {activity && (
        <div style={{ opacity: a.op, transform: `translateY(${a.ty}px)`, display: 'flex', alignItems: 'stretch', borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL8.lineS}`, boxShadow: TL8.shadowSm, maxWidth: 1400, background: TL8.paper }}>
          <div style={{ background: TL8.coral, color: '#2a0d05', fontFamily: MONO8, fontSize: 15, fontWeight: 700, letterSpacing: '0.16em', padding: '20px 24px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{activityLabel || 'Actividad'}</div>
          <div style={{ color: TL8.ink, fontFamily: DISP8, fontSize: 22, fontWeight: 400, padding: '18px 28px', display: 'flex', alignItems: 'center', lineHeight: 1.35 }}>{activity}</div>
        </div>
      )}
    </div>
  );
}

// ── Shell + chrome + progress ─────────────────────────────────────────────────
function ClassShellM8({ scenes, claseNo, claseName }) {
  let acc = 0;
  const timed = scenes.map(sc => { const o = { ...sc, start: acc }; acc += sc.dur; return o; });
  const total = acc;
  return (
    <Stage width={1920} height={1080} duration={total} background={TL8.bg} persistKey={`m8c${claseNo}`}>
      <div id="video-root" data-screen-label={`M8 Clase 8.${claseNo}`} style={{ position: 'absolute', inset: 0 }}>
        <GlobalBGM8 />
        {timed.map((sc, i) => <sc.C key={i} start={sc.start} dur={sc.dur} />)}
        <ChromeM8 timed={timed} claseNo={claseNo} claseName={claseName} />
        <ProgressM8 timed={timed} />
      </div>
    </Stage>
  );
}
function ChromeM8({ timed, claseNo, claseName }) {
  const t = useTime();
  let label = '';
  for (const sc of timed) if (t >= sc.start - 0.0001) label = sc.label || '';
  return (
    <div style={{ position: 'absolute', left: 54, bottom: 46, zIndex: 40, fontFamily: MONO8, fontSize: 13, letterSpacing: '0.2em', color: TL8.mut, display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase' }}>
      <span style={{ color: TL8.coral, fontWeight: 600 }}>M8 · CLASE 8.{claseNo}</span>
      <span style={{ width: 30, height: 1, background: TL8.lineS }} />
      <span>{claseName}</span>
      {label && <><span style={{ width: 30, height: 1, background: TL8.lineS }} /><span style={{ color: TL8.dim }}>{label}</span></>}
    </div>
  );
}
function ProgressM8({ timed }) {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', top: 40, right: 54, zIndex: 40, display: 'flex', gap: 6, alignItems: 'center' }}>
      {timed.map((sc, i) => {
        const active = t >= sc.start && t < sc.start + sc.dur;
        const done = t >= sc.start + sc.dur;
        return <div key={i} style={{ width: active ? 30 : 16, height: 3, borderRadius: 2, background: active ? TL8.coral : (done ? TL8.steel : 'rgba(154,163,178,0.22)'), transition: 'width 200ms' }} />;
      })}
    </div>
  );
}

Object.assign(window, {
  TL8, DISP8, MONO8, pop8,
  SceneM8, CapM8, KickerM8, BracketsM8, GlobalBGM8,
  NodeM8, LinkM8, ArrowM8, TankM8, GaugeM8, LedM8, HMIFrameM8, PyramidM8,
  CodeM8, InfoCardM8, StatM8, TableM8, AlarmTableM8, TrendM8,
  TitleCardM8, ClosingM8, ClassShellM8, ChromeM8, ProgressM8,
});
