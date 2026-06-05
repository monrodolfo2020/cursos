// m10-lib.jsx — Módulo 10 "Instrumentación Avanzada y Tendencias".
// DARK theme: azul-noche profundo + MAGENTA/fucsia (primario · señal/vanguardia) +
// MENTA/aqua (secundario · digital/virtual) + PERIWINKLE (red/IP) + ámbar (legacy 4-20mA).
// "state of the art / future tech" feel. Depends only on animations.jsx. Exports w/ M10 suffix.

const TL10 = {
  bg:      '#090c14',
  bg2:     '#0f1320',
  paper:   '#161b2b',
  paper2:  '#1f2538',
  ink:     '#eef1fb',          // cool white
  mut:     '#9aa3c0',          // cool periwinkle gray
  dim:     '#5a6285',
  line:    'rgba(120,140,200,0.10)',
  lineS:   'rgba(120,140,200,0.22)',
  mag:     '#ff4d9d',          // primario — señal / vanguardia / títulos
  magD:    '#e02178',
  magLt:   '#ff8fc4',
  magWash: 'rgba(255,77,157,0.13)',
  mint:    '#2ee6c8',          // secundario — digital / virtual / datos
  mintD:   '#15bfa3',
  mintLt:  '#7df0dd',
  mintWash:'rgba(46,230,200,0.13)',
  iris:    '#6b8cff',          // red / IP / Ethernet
  irisD:   '#4666e0',
  amber:   '#f6b53a',          // legacy 4-20 mA / energía
  grn:     '#3fd07a',          // OK
  red:     '#ff5160',          // alarma
  shadow:  '0 22px 60px rgba(0,0,0,0.6)',
  shadowSm:'0 8px 22px rgba(0,0,0,0.46)',
};
const DISP10 = "'Space Grotesk', system-ui, sans-serif";
const MONO10 = "'IBM Plex Mono', ui-monospace, monospace";

function pop10(t, appear, d = 0.5, rise = 18) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.94, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  const eb = Easing.easeOutBack(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.94 + 0.06 * eb, ty: (1 - e) * rise };
}

function SceneM10({ start, dur, children, fade = 0.55 }) {
  const t = useTime();
  const end = start + dur;
  if (t < start - 0.02 || t > end + 0.02) return null;
  const lt = t - start;
  let op = 1;
  if (lt < fade) op = clamp(lt / fade, 0, 1);
  else if (t > end - fade) op = clamp((end - t) / fade, 0, 1);
  return <div style={{ position: 'absolute', inset: 0, opacity: op, willChange: 'opacity' }}>{children}</div>;
}

function CapM10({ start, dur = 2.6, children, x = '50%', y = '50%', size = 60, weight = 600, color = TL10.ink, mono = false, align = 'center', width = 1500, lh = 1.12, ls = '-0.01em', up = 22 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.5, outD = 0.42;
  let op = 1, ty = 0;
  if (lt < inD) { const e = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); op = e; ty = (1 - e) * up; }
  else if (lt > dur - outD) { const e = Easing.easeInCubic(clamp((lt - (dur - outD)) / outD, 0, 1)); op = 1 - e; ty = -e * up * 0.5; }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx}, calc(-50% + ${ty}px))`, opacity: op, width, maxWidth: '92vw', textAlign: align, color, fontFamily: mono ? MONO10 : DISP10, fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: ls, willChange: 'transform, opacity', textWrap: 'balance' }}>
      {children}
    </div>
  );
}

function KickerM10({ start, dur = 3, text, x = '50%', y = '50%', align = 'center', color = TL10.mag, size = 17 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.4, outD = 0.35;
  let op = 1;
  if (lt < inD) op = clamp(lt / inD, 0, 1);
  else if (lt > dur - outD) op = clamp((dur - lt) / outD, 0, 1);
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx},-50%)`, opacity: op, color, fontFamily: MONO10, fontSize: size, letterSpacing: '0.3em', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: align, display: 'flex', alignItems: 'center', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
      {text}
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
    </div>
  );
}

// ── Background: night-blue + signal waveforms (HART FSK motif) + cool glows ────
function GlobalBGM10() {
  const t = useTime();
  const ax = 16 + Math.sin(t * 0.06) * 7, ay = 13 + Math.cos(t * 0.05) * 6;
  const bx = 86 + Math.cos(t * 0.055) * 7, by = 88 + Math.sin(t * 0.045) * 6;
  const wave = (amp, freq, phase, yBase) => {
    let d = `M 0 ${yBase}`;
    for (let x = 0; x <= 100; x += 2) d += ` L ${x} ${yBase + amp * Math.sin((x * freq) + phase)}`;
    return d;
  };
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `linear-gradient(170deg, ${TL10.bg2}, ${TL10.bg})` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 880px at ${ax}% ${ay}%, rgba(255,77,157,0.11), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 720px at ${bx}% ${by}%, rgba(46,230,200,0.09), transparent 60%)` }} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d={wave(1.4, 0.6, t * 0.7, 22)} fill="none" stroke="rgba(255,77,157,0.07)" strokeWidth="0.18" />
        <path d={wave(1.0, 1.4, -t * 0.9, 78)} fill="none" stroke="rgba(46,230,200,0.07)" strokeWidth="0.16" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 48%, rgba(0,0,0,0.5) 100%)' }} />
    </div>
  );
}

function BracketsM10({ color = TL10.mag, size = 18, thick = 2, inset = 0 }) {
  const c = (pos) => {
    const base = { position: 'absolute', width: size, height: size, borderColor: color, borderStyle: 'solid', borderWidth: 0 };
    if (pos === 'tl') return { ...base, top: inset, left: inset, borderTopWidth: thick, borderLeftWidth: thick };
    if (pos === 'tr') return { ...base, top: inset, right: inset, borderTopWidth: thick, borderRightWidth: thick };
    if (pos === 'bl') return { ...base, bottom: inset, left: inset, borderBottomWidth: thick, borderLeftWidth: thick };
    return { ...base, bottom: inset, right: inset, borderBottomWidth: thick, borderRightWidth: thick };
  };
  return <>{['tl', 'tr', 'bl', 'br'].map(p => <div key={p} style={c(p)} />)}</>;
}

// ── Device / instrument node ──────────────────────────────────────────────────
function NodeM10({ x, y, w = 200, h = 96, label, sub, accent = TL10.mag, t, appear = 0, active = true, icon = null, online = false }) {
  const ap = pop10(t, appear, 0.5, 14);
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={TL10.paper} stroke={active ? accent : TL10.lineS} strokeWidth={active ? 2.4 : 1.6} />
      <rect x={x} y={y} width={w} height="5" rx="2.5" fill={accent} />
      {online && <circle cx={x + w - 16} cy={y + 20} r="5" fill={TL10.grn} />}
      {icon && <text x={x + 22} y={y + h / 2 + 9} fontSize="26" textAnchor="middle">{icon}</text>}
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 9)} fill={TL10.ink} fontFamily={DISP10} fontSize="23" fontWeight="700" textAnchor="middle">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 24} fill={TL10.mut} fontFamily={MONO10} fontSize="14" textAnchor="middle">{sub}</text>}
    </g>
  );
}

// ── Link with animated data packets ───────────────────────────────────────────
function LinkM10({ x1, y1, x2, y2, start, t, color = TL10.mint, width = 3, label, dur = 0.6, packets = true, back = false, dashed = false, speed = 0.55 }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const hx = x1 + (x2 - x1) * e, hy = y1 + (y2 - y1) * e;
  const live = t - start;
  const dots = [];
  if (packets && e > 0.98) {
    const n = 3;
    for (let i = 0; i < n; i++) {
      const f = ((live * speed) + i / n) % 1;
      dots.push({ x: x1 + (x2 - x1) * f, y: y1 + (y2 - y1) * f, c: color });
      if (back) { const fb = 1 - (((live * speed) + i / n + 0.5) % 1); dots.push({ x: x1 + (x2 - x1) * fb, y: y1 + (y2 - y1) * fb, c: TL10.mag }); }
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
      {label && e > 0.5 && <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 14} fill={color} fontFamily={MONO10} fontSize="16" fontWeight="600" textAnchor="middle">{label}</text>}
    </g>
  );
}

// ── Arrow connector ───────────────────────────────────────────────────────────
function ArrowM10({ x1, y1, x2, y2, start, t, color = TL10.mut, label, dur = 0.6, dashed = false }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hx = x1 + (x2 - x1) * e, hy = y1 + (y2 - y1) * e;
  return (
    <g opacity={clamp(e * 4, 0, 1)}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={dashed ? '9 7' : undefined} />
      {e > 0.96 && <polygon points={`${x2},${y2} ${x2 - 13 * Math.cos(ang - 0.4)},${y2 - 13 * Math.sin(ang - 0.4)} ${x2 - 13 * Math.cos(ang + 0.4)},${y2 - 13 * Math.sin(ang + 0.4)}`} fill={color} />}
      {label && e > 0.5 && <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 12} fill={color} fontFamily={MONO10} fontSize="16" fontWeight="600" textAnchor="middle">{label}</text>}
    </g>
  );
}

// ── Signal scope (4-20 mA + optional FSK overlay) ─────────────────────────────
function ScopeM10({ x, y, w = 820, h = 280, t, appear = 0, title = 'Señal', fsk = true }) {
  const ap = pop10(t, appear, 0.55, 18);
  const lt = t - appear;
  const cx0 = 20, cw = w - 40, mid = h * 0.52;
  // analog DC level slowly varying
  const dc = 0.18 * Math.sin(lt * 0.5);
  let analog = `M ${cx0} ${mid - dc * 40}`;
  for (let px = 0; px <= cw; px += 4) analog += ` L ${cx0 + px} ${mid - (0.18 * Math.sin(lt * 0.5 + px * 0.004)) * 40}`;
  // FSK digital superimposed
  let fskPath = `M ${cx0} ${mid}`;
  if (fsk) for (let px = 0; px <= cw; px += 1.5) {
    const bit = Math.floor((px + lt * 60) / 26) % 2;
    const freq = bit ? 0.9 : 0.5;
    fskPath += ` L ${cx0 + px} ${mid - (0.18 * Math.sin(lt * 0.5 + px * 0.004)) * 40 - 26 * Math.sin(px * freq)}`;
  }
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: ap.op, transform: `translateY(${ap.ty}px)` }}>
      <div style={{ borderRadius: 12, border: `1px solid ${TL10.lineS}`, background: '#0a0d16', boxShadow: TL10.shadow, overflow: 'hidden' }}>
        <div style={{ padding: '11px 18px', borderBottom: `1px solid ${TL10.line}`, fontFamily: MONO10, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: TL10.mintLt, display: 'flex', justifyContent: 'space-between' }}><span>{title}</span><span style={{ color: TL10.dim }}>4–20 mA · FSK 1200/2200 Hz</span></div>
        <svg width={w} height={h}>
          {[0.25, 0.5, 0.75].map((g, i) => <line key={i} x1={cx0} y1={h * g} x2={cx0 + cw} y2={h * g} stroke={TL10.line} strokeWidth="1" />)}
          <path d={analog} fill="none" stroke={TL10.amber} strokeWidth="2.6" opacity="0.9" />
          {fsk && <path d={fskPath} fill="none" stroke={TL10.mag} strokeWidth="2.2" opacity={clamp((lt - 0.6) / 0.8, 0, 1)} />}
        </svg>
      </div>
    </div>
  );
}

function InfoCardM10({ x, y, w = 360, h = 300, no, accent = TL10.mag, title, sub, appear, t, icon }) {
  const { op, sc, ty } = pop10(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 12, border: `1px solid ${TL10.lineS}`, background: `linear-gradient(160deg, ${TL10.paper}, ${TL10.bg2})`, boxShadow: TL10.shadow, padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 11, overflow: 'hidden' }}>
        {no != null && <div style={{ fontFamily: MONO10, fontSize: 13, letterSpacing: '0.24em', color: TL10.dim }}>{String(no).padStart(2, '0')}</div>}
        {icon && <div style={{ fontSize: 30, lineHeight: 1 }}>{icon}</div>}
        {title && <div style={{ fontFamily: DISP10, fontSize: 26, fontWeight: 700, color: TL10.ink, letterSpacing: '-0.01em', lineHeight: 1.08 }}>{title}</div>}
        <div style={{ fontFamily: DISP10, fontSize: 18.5, fontWeight: 400, color: TL10.mut, lineHeight: 1.42 }}>{sub}</div>
        <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: accent, borderRadius: 3 }} />
      </div>
    </div>
  );
}

function StatM10({ x, y, value, unit, label, accent = TL10.mag, appear, t, align = 'left' }) {
  const { op, ty } = pop10(t, appear, 0.5, 16);
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: op, transform: `translateY(${ty}px)`, textAlign: align, ...(align === 'center' ? { transform: `translate(-50%, ${ty}px)` } : {}) }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <span style={{ fontFamily: DISP10, fontSize: 72, fontWeight: 700, color: accent, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{value}</span>
        {unit && <span style={{ fontFamily: MONO10, fontSize: 24, fontWeight: 500, color: TL10.mut }}>{unit}</span>}
      </div>
      {label && <div style={{ marginTop: 10, fontFamily: MONO10, fontSize: 13.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: TL10.dim }}>{label}</div>}
    </div>
  );
}

function TableM10({ x, y, w = 1200, headers, rows, t, appear = 0, accentCol = -1, colTemplate }) {
  const tpl = colTemplate || headers.map(() => '1fr').join(' ');
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL10.lineS}`, boxShadow: TL10.shadow }}>
        <div style={{ display: 'grid', gridTemplateColumns: tpl }}>
          {headers.map((h, i) => (
            <div key={i} style={{ background: TL10.paper2, padding: '15px 22px', fontFamily: MONO10, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: i === accentCol ? TL10.mag : TL10.mintLt, fontWeight: 700, borderBottom: `1px solid ${TL10.lineS}`, borderLeft: i ? `1px solid ${TL10.line}` : 'none' }}>{h}</div>
          ))}
        </div>
        {rows.map((r, ri) => {
          const ap = clamp((t - (appear + 0.3 + ri * 0.3)) / 0.45, 0, 1);
          return (
            <div key={ri} style={{ opacity: ap, display: 'grid', gridTemplateColumns: tpl, background: ri % 2 ? TL10.bg2 : TL10.paper, borderBottom: ri < rows.length - 1 ? `1px solid ${TL10.line}` : 'none' }}>
              {r.map((cell, ci) => (
                <div key={ci} style={{ padding: '14px 22px', fontFamily: ci === 0 ? MONO10 : DISP10, fontSize: ci === 0 ? 16.5 : 18, fontWeight: ci === accentCol ? 600 : 400, color: ci === 0 ? TL10.ink : (ci === accentCol ? TL10.mag : TL10.mut), borderLeft: ci ? `1px solid ${TL10.line}` : 'none', lineHeight: 1.3 }}>{cell}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CodeM10({ x, y, w = 760, title = 'Diagnóstico', lines = [], t, appear = 0, reveal = 1 }) {
  const ap = pop10(t, appear, 0.55, 18);
  const lh = 30, pad = 22, headH = 40;
  const shown = Math.round(clamp(reveal, 0, 1) * lines.length);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: ap.op, transform: `translateY(${ap.ty}px)` }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL10.lineS}`, background: '#0a0d16', boxShadow: TL10.shadow }}>
        <div style={{ height: headH, background: TL10.paper2, borderBottom: `1px solid ${TL10.lineS}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL10.red }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL10.amber }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL10.grn }} />
          <span style={{ marginLeft: 10, fontFamily: MONO10, fontSize: 13, color: TL10.mut, letterSpacing: '0.14em' }}>{title}</span>
        </div>
        <div style={{ padding: `${pad}px 0`, fontFamily: MONO10, fontSize: 17.5, lineHeight: `${lh}px` }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ display: 'flex', opacity: i < shown ? 1 : 0, transition: 'opacity .2s' }}>
              <span style={{ width: 44, textAlign: 'right', paddingRight: 16, color: TL10.dim, userSelect: 'none', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ color: ln.c || TL10.ink, whiteSpace: 'pre', paddingRight: 18 }}>{ln.txt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TitleCardM10({ start, dur, claseNo, title, dudur, objetivo, seccion = 'Instrumentación Avanzada' }) {
  const t = useTime();
  const s = start, end = start + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const big = pop10(t, s + 0.3, 0.8, 0);
  const ti = pop10(t, s + 0.9, 0.7, 20);
  const ob = pop10(t, s + 2.0, 0.7, 16);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', right: '5%', top: '50%', transform: `translateY(-50%) scale(${big.sc})`, opacity: big.op * 0.12, fontFamily: DISP10, fontSize: 600, fontWeight: 700, color: TL10.mag, lineHeight: 0.8, letterSpacing: '-0.04em' }}>{String(claseNo).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', left: '9%', top: '50%', transform: 'translateY(-50%)', width: 1300 }}>
        <KickerM10 start={s + 0.4} dur={dur - 0.6} text={`Módulo 10 · ${seccion}`} x="0" y="-150px" align="left" />
        <div style={{ opacity: ti.op, transform: `translateY(${ti.ty}px)`, fontFamily: DISP10, fontSize: 80, fontWeight: 700, color: TL10.ink, lineHeight: 1.02, letterSpacing: '-0.02em', textWrap: 'balance' }}>{title}</div>
        <div style={{ marginTop: 30, opacity: ob.op, transform: `translateY(${ob.ty}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1080 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 44, height: 3, background: TL10.mint, borderRadius: 2 }} />
            <span style={{ fontFamily: MONO10, fontSize: 16, letterSpacing: '0.2em', color: TL10.mint, textTransform: 'uppercase', fontWeight: 600 }}>Clase 10.{claseNo} · Duración {dudur}</span>
          </div>
          <div style={{ fontFamily: DISP10, fontSize: 27, fontWeight: 400, color: TL10.mut, lineHeight: 1.42 }}>{objetivo}</div>
        </div>
      </div>
    </div>
  );
}

function ClosingM10({ start, dur, line, activityLabel, activity }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const a = pop10(t, s + 1.4, 0.6, 18);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 8%' }}>
      <div style={{ fontFamily: DISP10, fontSize: 54, fontWeight: 600, color: TL10.ink, textAlign: 'center', lineHeight: 1.16, letterSpacing: '-0.01em', maxWidth: 1560, textWrap: 'balance' }}>{line}</div>
      {activity && (
        <div style={{ opacity: a.op, transform: `translateY(${a.ty}px)`, display: 'flex', alignItems: 'stretch', borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL10.lineS}`, boxShadow: TL10.shadowSm, maxWidth: 1420, background: TL10.paper }}>
          <div style={{ background: TL10.mag, color: '#1a0512', fontFamily: MONO10, fontSize: 15, fontWeight: 700, letterSpacing: '0.16em', padding: '20px 24px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{activityLabel || 'Actividad'}</div>
          <div style={{ color: TL10.ink, fontFamily: DISP10, fontSize: 22, fontWeight: 400, padding: '18px 28px', display: 'flex', alignItems: 'center', lineHeight: 1.35 }}>{activity}</div>
        </div>
      )}
    </div>
  );
}

function ClassShellM10({ scenes, claseNo, claseName }) {
  let acc = 0;
  const timed = scenes.map(sc => { const o = { ...sc, start: acc }; acc += sc.dur; return o; });
  const total = acc;
  return (
    <Stage width={1920} height={1080} duration={total} background={TL10.bg} persistKey={`m10c${claseNo}`}>
      <div id="video-root" data-screen-label={`M10 Clase 10.${claseNo}`} style={{ position: 'absolute', inset: 0 }}>
        <GlobalBGM10 />
        {timed.map((sc, i) => <sc.C key={i} start={sc.start} dur={sc.dur} />)}
        <ChromeM10 timed={timed} claseNo={claseNo} claseName={claseName} />
        <ProgressM10 timed={timed} />
      </div>
    </Stage>
  );
}
function ChromeM10({ timed, claseNo, claseName }) {
  const t = useTime();
  let label = '';
  for (const sc of timed) if (t >= sc.start - 0.0001) label = sc.label || '';
  return (
    <div style={{ position: 'absolute', left: 54, bottom: 46, zIndex: 40, fontFamily: MONO10, fontSize: 13, letterSpacing: '0.2em', color: TL10.mut, display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase' }}>
      <span style={{ color: TL10.mag, fontWeight: 600 }}>M10 · CLASE 10.{claseNo}</span>
      <span style={{ width: 30, height: 1, background: TL10.lineS }} />
      <span>{claseName}</span>
      {label && <><span style={{ width: 30, height: 1, background: TL10.lineS }} /><span style={{ color: TL10.dim }}>{label}</span></>}
    </div>
  );
}
function ProgressM10({ timed }) {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', top: 40, right: 54, zIndex: 40, display: 'flex', gap: 6, alignItems: 'center' }}>
      {timed.map((sc, i) => {
        const active = t >= sc.start && t < sc.start + sc.dur;
        const done = t >= sc.start + sc.dur;
        return <div key={i} style={{ width: active ? 30 : 16, height: 3, borderRadius: 2, background: active ? TL10.mag : (done ? TL10.mint : 'rgba(154,163,192,0.22)'), transition: 'width 200ms' }} />;
      })}
    </div>
  );
}

Object.assign(window, {
  TL10, DISP10, MONO10, pop10,
  SceneM10, CapM10, KickerM10, BracketsM10, GlobalBGM10,
  NodeM10, LinkM10, ArrowM10, ScopeM10,
  InfoCardM10, StatM10, TableM10, CodeM10,
  TitleCardM10, ClosingM10, ClassShellM10, ChromeM10, ProgressM10,
});
