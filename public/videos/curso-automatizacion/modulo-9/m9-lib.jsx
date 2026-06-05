// m9-lib.jsx — Módulo 9 "Seguridad Eléctrica e Industrial".
// DARK theme: negro alquitrán + AMARILLO hi-vis (primario · peligro/atención) +
// NARANJA (precaución) + ROJO (fatal/crítico) + VERDE (estado seguro).
// "industrial safety / hazard" feel. Depends only on animations.jsx. Exports w/ M9 suffix.

const TL9 = {
  bg:      '#13120c',
  bg2:     '#1a1810',
  paper:   '#221f15',          // panel face (warm)
  paper2:  '#2c2819',          // raised panel
  ink:     '#f6f1e4',          // warm white
  mut:     '#b0a890',          // warm gray
  dim:     '#766c54',
  line:    'rgba(255,194,30,0.10)',
  lineS:   'rgba(255,194,30,0.22)',
  ylw:     '#ffc21e',          // primario — peligro / atención / títulos
  ylwD:    '#e0a400',
  ylwLt:   '#ffe07a',
  ylwWash: 'rgba(255,194,30,0.13)',
  org:     '#ff7a1f',          // precaución / arco
  orgD:    '#e85f0a',
  orgWash: 'rgba(255,122,31,0.13)',
  red:     '#ff4438',          // fatal / crítico
  redD:    '#e02616',
  redWash: 'rgba(255,68,56,0.13)',
  grn:     '#4ccb78',          // estado seguro / OK
  grnD:    '#2fa85c',
  grnWash: 'rgba(76,203,120,0.13)',
  shadow:  '0 22px 60px rgba(0,0,0,0.6)',
  shadowSm:'0 8px 22px rgba(0,0,0,0.46)',
};
const DISP9 = "'Space Grotesk', system-ui, sans-serif";
const MONO9 = "'IBM Plex Mono', ui-monospace, monospace";

function pop9(t, appear, d = 0.5, rise = 18) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.94, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  const eb = Easing.easeOutBack(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.94 + 0.06 * eb, ty: (1 - e) * rise };
}

// ── Scene wrapper ─────────────────────────────────────────────────────────────
function SceneM9({ start, dur, children, fade = 0.55 }) {
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
function CapM9({ start, dur = 2.6, children, x = '50%', y = '50%', size = 60, weight = 600, color = TL9.ink, mono = false, align = 'center', width = 1500, lh = 1.12, ls = '-0.01em', up = 22 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.5, outD = 0.42;
  let op = 1, ty = 0;
  if (lt < inD) { const e = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); op = e; ty = (1 - e) * up; }
  else if (lt > dur - outD) { const e = Easing.easeInCubic(clamp((lt - (dur - outD)) / outD, 0, 1)); op = 1 - e; ty = -e * up * 0.5; }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx}, calc(-50% + ${ty}px))`, opacity: op, width, maxWidth: '92vw', textAlign: align, color, fontFamily: mono ? MONO9 : DISP9, fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: ls, willChange: 'transform, opacity', textWrap: 'balance' }}>
      {children}
    </div>
  );
}

// ── Kicker ────────────────────────────────────────────────────────────────────
function KickerM9({ start, dur = 3, text, x = '50%', y = '50%', align = 'center', color = TL9.ylw, size = 17 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.4, outD = 0.35;
  let op = 1;
  if (lt < inD) op = clamp(lt / inD, 0, 1);
  else if (lt > dur - outD) op = clamp((dur - lt) / outD, 0, 1);
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx},-50%)`, opacity: op, color, fontFamily: MONO9, fontSize: size, letterSpacing: '0.3em', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: align, display: 'flex', alignItems: 'center', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
      {text}
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
    </div>
  );
}

// ── Background: tar-black + warm glows + faint hazard chevrons in corners ──────
function GlobalBGM9() {
  const t = useTime();
  const ax = 15 + Math.sin(t * 0.06) * 7, ay = 14 + Math.cos(t * 0.05) * 6;
  const bx = 86 + Math.cos(t * 0.055) * 7, by = 88 + Math.sin(t * 0.045) * 6;
  // hazard stripe pattern (very subtle)
  const stripes = [];
  for (let i = -2; i < 14; i++) stripes.push(i);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `linear-gradient(168deg, ${TL9.bg2}, ${TL9.bg})` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 860px at ${ax}% ${ay}%, rgba(255,194,30,0.10), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 720px at ${bx}% ${by}%, rgba(255,122,31,0.08), transparent 60%)` }} />
      {/* corner hazard chevrons */}
      <svg style={{ position: 'absolute', top: -40, left: -60, width: 420, height: 200, opacity: 0.05, transform: 'rotate(-12deg)' }} viewBox="0 0 420 200">
        {stripes.map(i => <rect key={i} x={i * 56} y="-40" width="28" height="280" fill={TL9.ylw} transform="skewX(-20)" />)}
      </svg>
      <svg style={{ position: 'absolute', bottom: -40, right: -60, width: 420, height: 200, opacity: 0.05, transform: 'rotate(-12deg)' }} viewBox="0 0 420 200">
        {stripes.map(i => <rect key={i} x={i * 56} y="-40" width="28" height="280" fill={TL9.org} transform="skewX(-20)" />)}
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 48%, rgba(0,0,0,0.5) 100%)' }} />
    </div>
  );
}

// ── Corner brackets ──────────────────────────────────────────────────────────
function BracketsM9({ color = TL9.ylw, size = 18, thick = 2, inset = 0 }) {
  const c = (pos) => {
    const base = { position: 'absolute', width: size, height: size, borderColor: color, borderStyle: 'solid', borderWidth: 0 };
    if (pos === 'tl') return { ...base, top: inset, left: inset, borderTopWidth: thick, borderLeftWidth: thick };
    if (pos === 'tr') return { ...base, top: inset, right: inset, borderTopWidth: thick, borderRightWidth: thick };
    if (pos === 'bl') return { ...base, bottom: inset, left: inset, borderBottomWidth: thick, borderLeftWidth: thick };
    return { ...base, bottom: inset, right: inset, borderBottomWidth: thick, borderRightWidth: thick };
  };
  return <>{['tl', 'tr', 'bl', 'br'].map(p => <div key={p} style={c(p)} />)}</>;
}

// ── Hazard sign (warning triangle, HTML) ──────────────────────────────────────
function HazardSignM9({ x, y, size = 150, color = TL9.ylw, glyph = '⚡', label, t, appear = 0, pulse = false }) {
  const ap = pop9(t, appear, 0.55, 16);
  const glow = pulse ? 0.4 + 0.4 * (0.5 + 0.5 * Math.sin((t || 0) * 4)) : 0.3;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: size, opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={size} height={size * 0.9} viewBox="0 0 100 90" style={{ filter: `drop-shadow(0 0 ${pulse ? 16 : 8}px ${color}${pulse ? '88' : '44'})` }}>
        <polygon points="50,6 95,84 5,84" fill={color} stroke="#0c0b07" strokeWidth="4" strokeLinejoin="round" />
        <text x="50" y="70" fontSize="42" textAnchor="middle" fill="#0c0b07">{glyph}</text>
      </svg>
      {label && <div style={{ marginTop: 10, fontFamily: MONO9, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', color, fontWeight: 700, textAlign: 'center' }}>{label}</div>}
    </div>
  );
}

// ── Hazard stripe banner (HTML) ───────────────────────────────────────────────
function StripeM9({ x, y, w = 600, h = 16, a = TL9.ylw, b = '#0c0b07', t, appear = 0 }) {
  const ap = clamp((t - appear) / 0.5, 0, 1);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: ap, overflow: 'hidden', borderRadius: 3, background: `repeating-linear-gradient(-45deg, ${a} 0 18px, ${b} 18px 36px)` }} />
  );
}

// ── Device / element node ─────────────────────────────────────────────────────
function NodeM9({ x, y, w = 200, h = 96, label, sub, accent = TL9.ylw, t, appear = 0, active = true, icon = null }) {
  const ap = pop9(t, appear, 0.5, 14);
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={TL9.paper} stroke={active ? accent : TL9.lineS} strokeWidth={active ? 2.4 : 1.6} />
      <rect x={x} y={y} width={w} height="5" rx="2.5" fill={accent} />
      {icon && <text x={x + 22} y={y + h / 2 + 9} fontSize="26" textAnchor="middle">{icon}</text>}
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 9)} fill={TL9.ink} fontFamily={DISP9} fontSize="23" fontWeight="700" textAnchor="middle">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 24} fill={TL9.mut} fontFamily={MONO9} fontSize="14" textAnchor="middle">{sub}</text>}
    </g>
  );
}

// ── Arrow connector ───────────────────────────────────────────────────────────
function ArrowM9({ x1, y1, x2, y2, start, t, color = TL9.mut, label, dur = 0.6, dashed = false }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hx = x1 + (x2 - x1) * e, hy = y1 + (y2 - y1) * e;
  return (
    <g opacity={clamp(e * 4, 0, 1)}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={dashed ? '9 7' : undefined} />
      {e > 0.96 && <polygon points={`${x2},${y2} ${x2 - 13 * Math.cos(ang - 0.4)},${y2 - 13 * Math.sin(ang - 0.4)} ${x2 - 13 * Math.cos(ang + 0.4)},${y2 - 13 * Math.sin(ang + 0.4)}`} fill={color} />}
      {label && e > 0.5 && <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 12} fill={color} fontFamily={MONO9} fontSize="16" fontWeight="600" textAnchor="middle">{label}</text>}
    </g>
  );
}

// ── Info card ─────────────────────────────────────────────────────────────────
function InfoCardM9({ x, y, w = 360, h = 300, no, accent = TL9.ylw, title, sub, appear, t, icon }) {
  const { op, sc, ty } = pop9(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 12, border: `1px solid ${TL9.lineS}`, background: `linear-gradient(160deg, ${TL9.paper}, ${TL9.bg2})`, boxShadow: TL9.shadow, padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 11, overflow: 'hidden' }}>
        {no != null && <div style={{ fontFamily: MONO9, fontSize: 13, letterSpacing: '0.24em', color: TL9.dim }}>{String(no).padStart(2, '0')}</div>}
        {icon && <div style={{ fontSize: 30, lineHeight: 1 }}>{icon}</div>}
        {title && <div style={{ fontFamily: DISP9, fontSize: 26, fontWeight: 700, color: TL9.ink, letterSpacing: '-0.01em', lineHeight: 1.08 }}>{title}</div>}
        <div style={{ fontFamily: DISP9, fontSize: 18.5, fontWeight: 400, color: TL9.mut, lineHeight: 1.42 }}>{sub}</div>
        <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: accent, borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ── Stat ──────────────────────────────────────────────────────────────────────
function StatM9({ x, y, value, unit, label, accent = TL9.ylw, appear, t, align = 'left' }) {
  const { op, ty } = pop9(t, appear, 0.5, 16);
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: op, transform: `translateY(${ty}px)`, textAlign: align, ...(align === 'center' ? { transform: `translate(-50%, ${ty}px)` } : {}) }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <span style={{ fontFamily: DISP9, fontSize: 72, fontWeight: 700, color: accent, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{value}</span>
        {unit && <span style={{ fontFamily: MONO9, fontSize: 24, fontWeight: 500, color: TL9.mut }}>{unit}</span>}
      </div>
      {label && <div style={{ marginTop: 10, fontFamily: MONO9, fontSize: 13.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: TL9.dim }}>{label}</div>}
    </div>
  );
}

// ── Data table (rowAccents optional: array of colors per row for col 0) ────────
function TableM9({ x, y, w = 1200, headers, rows, t, appear = 0, accentCol = -1, colTemplate, rowAccents }) {
  const tpl = colTemplate || headers.map(() => '1fr').join(' ');
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL9.lineS}`, boxShadow: TL9.shadow }}>
        <div style={{ display: 'grid', gridTemplateColumns: tpl }}>
          {headers.map((h, i) => (
            <div key={i} style={{ background: TL9.paper2, padding: '15px 22px', fontFamily: MONO9, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: i === accentCol ? TL9.ylw : TL9.ylwLt, fontWeight: 700, borderBottom: `1px solid ${TL9.lineS}`, borderLeft: i ? `1px solid ${TL9.line}` : 'none' }}>{h}</div>
          ))}
        </div>
        {rows.map((r, ri) => {
          const ap = clamp((t - (appear + 0.3 + ri * 0.3)) / 0.45, 0, 1);
          const ra = rowAccents && rowAccents[ri];
          return (
            <div key={ri} style={{ opacity: ap, display: 'grid', gridTemplateColumns: tpl, background: ra ? `color-mix(in oklch, ${ra} 9%, ${ri % 2 ? TL9.bg2 : TL9.paper})` : (ri % 2 ? TL9.bg2 : TL9.paper), borderBottom: ri < rows.length - 1 ? `1px solid ${TL9.line}` : 'none' }}>
              {r.map((cell, ci) => (
                <div key={ci} style={{ padding: '14px 22px', fontFamily: ci === 0 ? MONO9 : DISP9, fontSize: ci === 0 ? 17 : 18, fontWeight: (ci === accentCol || (ci === 0 && ra)) ? 700 : 400, color: ci === 0 ? (ra || TL9.ink) : (ci === accentCol ? TL9.ylw : TL9.mut), borderLeft: ci ? `1px solid ${TL9.line}` : 'none', lineHeight: 1.3 }}>{cell}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Code / procedure panel (lines:[{txt, c?}]) ────────────────────────────────
function CodeM9({ x, y, w = 760, title = 'Procedimiento', lines = [], t, appear = 0, reveal = 1 }) {
  const ap = pop9(t, appear, 0.55, 18);
  const lh = 30, pad = 22, headH = 40;
  const shown = Math.round(clamp(reveal, 0, 1) * lines.length);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: ap.op, transform: `translateY(${ap.ty}px)` }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL9.lineS}`, background: '#0b0a06', boxShadow: TL9.shadow }}>
        <div style={{ height: headH, background: TL9.paper2, borderBottom: `1px solid ${TL9.lineS}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL9.red }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL9.ylw }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL9.grn }} />
          <span style={{ marginLeft: 10, fontFamily: MONO9, fontSize: 13, color: TL9.mut, letterSpacing: '0.14em' }}>{title}</span>
        </div>
        <div style={{ padding: `${pad}px 0`, fontFamily: MONO9, fontSize: 17.5, lineHeight: `${lh}px` }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ display: 'flex', opacity: i < shown ? 1 : 0, transition: 'opacity .2s' }}>
              <span style={{ width: 44, textAlign: 'right', paddingRight: 16, color: TL9.dim, userSelect: 'none', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ color: ln.c || TL9.ink, whiteSpace: 'pre', paddingRight: 18 }}>{ln.txt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Title card ─────────────────────────────────────────────────────────────────
function TitleCardM9({ start, dur, claseNo, title, dudur, objetivo, seccion = 'Seguridad Industrial' }) {
  const t = useTime();
  const s = start, end = start + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const big = pop9(t, s + 0.3, 0.8, 0);
  const ti = pop9(t, s + 0.9, 0.7, 20);
  const ob = pop9(t, s + 2.0, 0.7, 16);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', right: '5%', top: '50%', transform: `translateY(-50%) scale(${big.sc})`, opacity: big.op * 0.11, fontFamily: DISP9, fontSize: 600, fontWeight: 700, color: TL9.ylw, lineHeight: 0.8, letterSpacing: '-0.04em' }}>{String(claseNo).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', left: '9%', top: '50%', transform: 'translateY(-50%)', width: 1280 }}>
        <KickerM9 start={s + 0.4} dur={dur - 0.6} text={`Módulo 9 · ${seccion}`} x="0" y="-150px" align="left" />
        <div style={{ opacity: ti.op, transform: `translateY(${ti.ty}px)`, fontFamily: DISP9, fontSize: 80, fontWeight: 700, color: TL9.ink, lineHeight: 1.02, letterSpacing: '-0.02em', textWrap: 'balance' }}>{title}</div>
        <div style={{ marginTop: 30, opacity: ob.op, transform: `translateY(${ob.ty}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1060 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 44, height: 3, background: TL9.org, borderRadius: 2 }} />
            <span style={{ fontFamily: MONO9, fontSize: 16, letterSpacing: '0.2em', color: TL9.org, textTransform: 'uppercase', fontWeight: 600 }}>Clase 9.{claseNo} · Duración {dudur}</span>
          </div>
          <div style={{ fontFamily: DISP9, fontSize: 27, fontWeight: 400, color: TL9.mut, lineHeight: 1.42 }}>{objetivo}</div>
        </div>
      </div>
    </div>
  );
}

// ── Closing ─────────────────────────────────────────────────────────────────
function ClosingM9({ start, dur, line, activityLabel, activity }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const a = pop9(t, s + 1.4, 0.6, 18);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 8%' }}>
      <div style={{ fontFamily: DISP9, fontSize: 54, fontWeight: 600, color: TL9.ink, textAlign: 'center', lineHeight: 1.16, letterSpacing: '-0.01em', maxWidth: 1560, textWrap: 'balance' }}>{line}</div>
      {activity && (
        <div style={{ opacity: a.op, transform: `translateY(${a.ty}px)`, display: 'flex', alignItems: 'stretch', borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL9.lineS}`, boxShadow: TL9.shadowSm, maxWidth: 1420, background: TL9.paper }}>
          <div style={{ background: TL9.ylw, color: '#1a1607', fontFamily: MONO9, fontSize: 15, fontWeight: 700, letterSpacing: '0.16em', padding: '20px 24px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{activityLabel || 'Actividad'}</div>
          <div style={{ color: TL9.ink, fontFamily: DISP9, fontSize: 22, fontWeight: 400, padding: '18px 28px', display: 'flex', alignItems: 'center', lineHeight: 1.35 }}>{activity}</div>
        </div>
      )}
    </div>
  );
}

// ── Shell + chrome + progress ─────────────────────────────────────────────────
function ClassShellM9({ scenes, claseNo, claseName }) {
  let acc = 0;
  const timed = scenes.map(sc => { const o = { ...sc, start: acc }; acc += sc.dur; return o; });
  const total = acc;
  return (
    <Stage width={1920} height={1080} duration={total} background={TL9.bg} persistKey={`m9c${claseNo}`}>
      <div id="video-root" data-screen-label={`M9 Clase 9.${claseNo}`} style={{ position: 'absolute', inset: 0 }}>
        <GlobalBGM9 />
        {timed.map((sc, i) => <sc.C key={i} start={sc.start} dur={sc.dur} />)}
        <ChromeM9 timed={timed} claseNo={claseNo} claseName={claseName} />
        <ProgressM9 timed={timed} />
      </div>
    </Stage>
  );
}
function ChromeM9({ timed, claseNo, claseName }) {
  const t = useTime();
  let label = '';
  for (const sc of timed) if (t >= sc.start - 0.0001) label = sc.label || '';
  return (
    <div style={{ position: 'absolute', left: 54, bottom: 46, zIndex: 40, fontFamily: MONO9, fontSize: 13, letterSpacing: '0.2em', color: TL9.mut, display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase' }}>
      <span style={{ color: TL9.ylw, fontWeight: 600 }}>M9 · CLASE 9.{claseNo}</span>
      <span style={{ width: 30, height: 1, background: TL9.lineS }} />
      <span>{claseName}</span>
      {label && <><span style={{ width: 30, height: 1, background: TL9.lineS }} /><span style={{ color: TL9.dim }}>{label}</span></>}
    </div>
  );
}
function ProgressM9({ timed }) {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', top: 40, right: 54, zIndex: 40, display: 'flex', gap: 6, alignItems: 'center' }}>
      {timed.map((sc, i) => {
        const active = t >= sc.start && t < sc.start + sc.dur;
        const done = t >= sc.start + sc.dur;
        return <div key={i} style={{ width: active ? 30 : 16, height: 3, borderRadius: 2, background: active ? TL9.ylw : (done ? TL9.org : 'rgba(176,168,144,0.22)'), transition: 'width 200ms' }} />;
      })}
    </div>
  );
}

Object.assign(window, {
  TL9, DISP9, MONO9, pop9,
  SceneM9, CapM9, KickerM9, BracketsM9, GlobalBGM9,
  HazardSignM9, StripeM9, NodeM9, ArrowM9,
  InfoCardM9, StatM9, TableM9, CodeM9,
  TitleCardM9, ClosingM9, ClassShellM9, ChromeM9, ProgressM9,
});
