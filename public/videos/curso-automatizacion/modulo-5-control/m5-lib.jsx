// m5-lib.jsx — Módulo 5 "Sistemas de Control y Lógica".
// LIGHT theme: blanco + índigo (control/cerebro) + ámbar. Self-contained;
// depends only on animations.jsx (clamp, Easing, useTime, Stage). Exports w/ M5 suffix.

const TL5 = {
  bg:      '#f4f5fb',
  bg2:     '#ecedf8',
  paper:   '#ffffff',
  ink:     '#1b1d3e',
  mut:     '#5f6388',
  dim:     '#a3a7c9',
  line:    'rgba(79,70,229,0.10)',
  lineS:   'rgba(79,70,229,0.22)',
  indigo:  '#5b54e0',          // primario
  indigoD: '#3b32b5',
  indigoLt:'#9b95ef',
  indigoWash:'#e9e8fb',
  amber:   '#f0a020',          // acento
  amberD:  '#d27e07',
  amberWash:'#fdf0d8',
  ok:      '#22a06b',
  red:     '#e0556b',          // alarma (uso escaso)
  redWash: '#fbe4e8',
  shadow:  '0 16px 46px rgba(40,36,120,0.16)',
  shadowSm:'0 6px 18px rgba(40,36,120,0.12)',
};
const DISP5 = "'Space Grotesk', system-ui, sans-serif";
const MONO5 = "'IBM Plex Mono', ui-monospace, monospace";

function pop5(t, appear, d = 0.5, rise = 18) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.94, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  const eb = Easing.easeOutBack(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.94 + 0.06 * eb, ty: (1 - e) * rise };
}

// ── Scene wrapper ─────────────────────────────────────────────────────────────
function SceneM5({ start, dur, children, fade = 0.55 }) {
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
function CapM5({ start, dur = 2.6, children, x = '50%', y = '50%', size = 60, weight = 600, color = TL5.ink, mono = false, align = 'center', width = 1500, lh = 1.12, ls = '-0.01em', up = 22 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.5, outD = 0.42;
  let op = 1, ty = 0;
  if (lt < inD) { const e = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); op = e; ty = (1 - e) * up; }
  else if (lt > dur - outD) { const e = Easing.easeInCubic(clamp((lt - (dur - outD)) / outD, 0, 1)); op = 1 - e; ty = -e * up * 0.5; }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx}, calc(-50% + ${ty}px))`, opacity: op, width, maxWidth: '92vw', textAlign: align, color, fontFamily: mono ? MONO5 : DISP5, fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: ls, willChange: 'transform, opacity', textWrap: 'balance' }}>
      {children}
    </div>
  );
}

// ── Kicker ────────────────────────────────────────────────────────────────────
function KickerM5({ start, dur = 3, text, x = '50%', y = '50%', align = 'center', color = TL5.indigo, size = 17 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.4, outD = 0.35;
  let op = 1;
  if (lt < inD) op = clamp(lt / inD, 0, 1);
  else if (lt > dur - outD) op = clamp((dur - lt) / outD, 0, 1);
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx},-50%)`, opacity: op, color, fontFamily: MONO5, fontSize: size, letterSpacing: '0.3em', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: align, display: 'flex', alignItems: 'center', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <span style={{ width: 26, height: 2, background: color, opacity: 0.7 }} />
      {text}
      <span style={{ width: 26, height: 2, background: color, opacity: 0.7 }} />
    </div>
  );
}

// ── Corner brackets ──────────────────────────────────────────────────────────
function BracketsM5({ color = TL5.indigo, size = 18, thick = 2, inset = 0 }) {
  const c = (pos) => {
    const base = { position: 'absolute', width: size, height: size, borderColor: color, borderStyle: 'solid', borderWidth: 0 };
    if (pos === 'tl') return { ...base, top: inset, left: inset, borderTopWidth: thick, borderLeftWidth: thick };
    if (pos === 'tr') return { ...base, top: inset, right: inset, borderTopWidth: thick, borderRightWidth: thick };
    if (pos === 'bl') return { ...base, bottom: inset, left: inset, borderBottomWidth: thick, borderLeftWidth: thick };
    return { ...base, bottom: inset, right: inset, borderBottomWidth: thick, borderRightWidth: thick };
  };
  return <>{['tl', 'tr', 'bl', 'br'].map(p => <div key={p} style={c(p)} />)}</>;
}

// ── Light background: airy white + faint indigo grid + soft washes ────────────
function GlobalBGM5() {
  const t = useTime();
  const ax = 16 + Math.sin(t * 0.07) * 8, ay = 14 + Math.cos(t * 0.05) * 6;
  const bx = 88 + Math.cos(t * 0.06) * 8, by = 88 + Math.sin(t * 0.045) * 6;
  const gridShift = (t * 3.2) % 56;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `linear-gradient(165deg, ${TL5.bg2}, ${TL5.bg})` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 860px at ${ax}% ${ay}%, rgba(91,84,224,0.16), transparent 62%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 640px at ${bx}% ${by}%, rgba(240,160,32,0.13), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: '-60px', backgroundImage: `linear-gradient(${TL5.line} 1px, transparent 1px), linear-gradient(90deg, ${TL5.line} 1px, transparent 1px)`, backgroundSize: '56px 56px', transform: `translate(${-gridShift}px, ${-gridShift * 0.5}px)`, maskImage: 'radial-gradient(ellipse 86% 82% at 50% 45%, #000 42%, transparent 92%)', WebkitMaskImage: 'radial-gradient(ellipse 86% 82% at 50% 45%, #000 42%, transparent 92%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 120% at 50% 48%, transparent 55%, rgba(30,26,90,0.07) 100%)' }} />
    </div>
  );
}

// ── Animated signal line ───────────────────────────────────────────────────────
function SignalM5({ d, start, t, color = TL5.indigo, width = 4, dur = 0.8, speed = 50, live = true }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const off = -(t * speed) % 26;
  return (
    <>
      <path d={d} fill="none" stroke={`color-mix(in oklch, ${color} 22%, transparent)`} strokeWidth={width + 6} strokeLinecap="round" strokeLinejoin="round" opacity={e} />
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14 12" strokeDashoffset={live ? off : 0} opacity={e} />
    </>
  );
}

// ── Block-diagram primitives ──────────────────────────────────────────────────
// A function block with label, optional sub.
function BlockM5({ x, y, w = 200, h = 96, label, sub, accent = TL5.indigo, t, appear = 0, active = true }) {
  const ap = pop5(t, appear, 0.5, 14);
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={TL5.paper} stroke={active ? accent : TL5.lineS} strokeWidth={active ? 2.6 : 2} />
      <rect x={x} y={y} width="5" height={h} rx="2.5" fill={accent} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 8)} fill={TL5.ink} fontFamily={DISP5} fontSize="27" fontWeight="700" textAnchor="middle">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 24} fill={TL5.mut} fontFamily={MONO5} fontSize="15" textAnchor="middle">{sub}</text>}
    </g>
  );
}
// Summing junction circle with +/- signs.
function SumM5({ cx, cy, r = 30, signs = ['+', '−'], t, appear = 0, accent = TL5.indigo }) {
  const ap = pop5(t, appear, 0.5, 0);
  return (
    <g opacity={ap.op}>
      <circle cx={cx} cy={cy} r={r} fill={TL5.paper} stroke={accent} strokeWidth="2.6" />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={TL5.lineS} strokeWidth="1.4" />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={TL5.lineS} strokeWidth="1.4" />
      <text x={cx - 11} y={cy - 8} fill={TL5.indigoD} fontFamily={DISP5} fontSize="20" fontWeight="700" textAnchor="middle">{signs[0]}</text>
      <text x={cx + 12} y={cy + 22} fill={TL5.amberD} fontFamily={DISP5} fontSize="20" fontWeight="700" textAnchor="middle">{signs[1]}</text>
    </g>
  );
}
// Arrow connector with optional label, draws in.
function ArrowM5({ x1, y1, x2, y2, start, t, color = TL5.ink, label, dur = 0.6, dashed = false, live = false }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hx = x1 + (x2 - x1) * e, hy = y1 + (y2 - y1) * e;
  const off = live ? (-(t * 40) % 20) : 0;
  return (
    <g opacity={clamp(e * 4, 0, 1)}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={dashed ? '9 7' : undefined} strokeDashoffset={off} />
      {e > 0.96 && <polygon points={`${x2},${y2} ${x2 - 13 * Math.cos(ang - 0.4)},${y2 - 13 * Math.sin(ang - 0.4)} ${x2 - 13 * Math.cos(ang + 0.4)},${y2 - 13 * Math.sin(ang + 0.4)}`} fill={color} />}
      {label && e > 0.5 && <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 12} fill={color} fontFamily={MONO5} fontSize="17" fontWeight="600" textAnchor="middle">{label}</text>}
    </g>
  );
}

// ── Response chart: plots normalized y(t) curves on a fixed axis. ─────────────
// series: [{ fn:(u 0..1)=>y 0..1, color, label, width, dash }]
// reveal 0..1 sweeps the curves in left→right. sp: optional setpoint (0..1).
function ChartM5({ x, y, w, h, reveal = 1, series = [], sp = null, spLabel = 'SP',
                  xlabel = 'tiempo →', ylabel = 'PV', grid = 4, samples = 90, axisColor = TL5.lineS }) {
  const px = (u) => x + u * w;
  const py = (v) => y + h - clamp(v, 0, 1.08) * h;
  const gx = [];
  for (let i = 1; i < grid; i++) gx.push(x + (w / grid) * i);
  const gy = [];
  for (let i = 1; i < grid; i++) gy.push(y + (h / grid) * i);
  return (
    <g>
      {/* plot frame */}
      <rect x={x} y={y} width={w} height={h} rx="10" fill={TL5.paper} stroke={axisColor} strokeWidth="1.6" />
      {gx.map((gxv, i) => <line key={'gx' + i} x1={gxv} y1={y} x2={gxv} y2={y + h} stroke={axisColor} strokeWidth="1" opacity="0.5" />)}
      {gy.map((gyv, i) => <line key={'gy' + i} x1={x} y1={gyv} x2={x + w} y2={gyv} stroke={axisColor} strokeWidth="1" opacity="0.5" />)}
      {/* setpoint */}
      {sp != null && (
        <g>
          <line x1={x} y1={py(sp)} x2={x + w} y2={py(sp)} stroke={TL5.amber} strokeWidth="2.4" strokeDasharray="9 7" />
          <text x={x + w - 8} y={py(sp) - 9} fill={TL5.amberD} fontFamily={MONO5} fontSize="16" fontWeight="600" textAnchor="end">{spLabel}</text>
        </g>
      )}
      {/* series */}
      {series.map((sObj, si) => {
        const pts = [];
        const n = Math.max(2, Math.round(samples * reveal));
        for (let i = 0; i <= n; i++) {
          const u = (i / samples);
          if (u > reveal + 1e-6) break;
          pts.push(`${px(u).toFixed(1)},${py(sObj.fn(u)).toFixed(1)}`);
        }
        return (
          <g key={si}>
            <polyline points={pts.join(' ')} fill="none" stroke={sObj.color} strokeWidth={sObj.width || 4}
                      strokeLinecap="round" strokeLinejoin="round" strokeDasharray={sObj.dash || undefined} />
            {sObj.label && reveal > 0.6 && (
              <text x={px(Math.min(reveal, 0.98))} y={py(sObj.fn(Math.min(reveal, 0.98))) - 10}
                    fill={sObj.color} fontFamily={MONO5} fontSize="16" fontWeight="600" textAnchor="end">{sObj.label}</text>
            )}
          </g>
        );
      })}
      {/* axis labels */}
      <text x={x + w / 2} y={y + h + 30} fill={TL5.mut} fontFamily={MONO5} fontSize="16" textAnchor="middle">{xlabel}</text>
      <text x={x - 22} y={y + h / 2} fill={TL5.mut} fontFamily={MONO5} fontSize="16" textAnchor="middle" transform={`rotate(-90 ${x - 22} ${y + h / 2})`}>{ylabel}</text>
    </g>
  );
}

// ── Info card ─────────────────────────────────────────────────────────────────
function InfoCardM5({ x, y, w = 360, h = 300, no, Icon, accent = TL5.indigo, title, sub, appear, t }) {
  const { op, sc, ty } = pop5(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 12, border: `1px solid ${TL5.lineS}`, background: TL5.paper, boxShadow: TL5.shadow, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
        {no != null && <div style={{ fontFamily: MONO5, fontSize: 13, letterSpacing: '0.24em', color: TL5.dim }}>{String(no).padStart(2, '0')}</div>}
        {Icon && <div style={{ marginTop: 2 }}><Icon c={accent} t={t} /></div>}
        <div style={{ fontFamily: DISP5, fontSize: 31, fontWeight: 700, color: TL5.ink, letterSpacing: '-0.01em', lineHeight: 1.06 }}>{title}</div>
        <div style={{ fontFamily: DISP5, fontSize: 19, fontWeight: 400, color: TL5.mut, lineHeight: 1.4 }}>{sub}</div>
        <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: accent, borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ── Stat ──────────────────────────────────────────────────────────────────────
function StatM5({ x, y, value, unit, label, accent = TL5.indigo, appear, t, align = 'left' }) {
  const { op, ty } = pop5(t, appear, 0.5, 16);
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: op, transform: `translateY(${ty}px)`, textAlign: align }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <span style={{ fontFamily: DISP5, fontSize: 76, fontWeight: 700, color: accent, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{value}</span>
        {unit && <span style={{ fontFamily: MONO5, fontSize: 26, fontWeight: 500, color: TL5.mut }}>{unit}</span>}
      </div>
      {label && <div style={{ marginTop: 10, fontFamily: MONO5, fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', color: TL5.dim }}>{label}</div>}
    </div>
  );
}

// ── Title card ─────────────────────────────────────────────────────────────────
function TitleCardM5({ start, dur, claseNo, title, dudur, objetivo }) {
  const t = useTime();
  const s = start, end = start + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const big = pop5(t, s + 0.3, 0.8, 0);
  const ti = pop5(t, s + 0.9, 0.7, 20);
  const ob = pop5(t, s + 2.0, 0.7, 16);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', right: '5%', top: '50%', transform: `translateY(-50%) scale(${big.sc})`, opacity: big.op * 0.10, fontFamily: DISP5, fontSize: 680, fontWeight: 700, color: TL5.indigo, lineHeight: 0.8, letterSpacing: '-0.04em' }}>{String(claseNo).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', left: '9%', top: '50%', transform: 'translateY(-50%)', width: 1240 }}>
        <KickerM5 start={s + 0.4} dur={dur - 0.6} text={`Módulo 5 · Clase 5.${claseNo}`} x="0" y="-130px" align="left" />
        <div style={{ opacity: ti.op, transform: `translateY(${ti.ty}px)`, fontFamily: DISP5, fontSize: 86, fontWeight: 700, color: TL5.ink, lineHeight: 1.02, letterSpacing: '-0.02em', textWrap: 'balance' }}>{title}</div>
        <div style={{ marginTop: 30, opacity: ob.op, transform: `translateY(${ob.ty}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1020 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 44, height: 3, background: TL5.amber, borderRadius: 2 }} />
            <span style={{ fontFamily: MONO5, fontSize: 16, letterSpacing: '0.22em', color: TL5.amberD, textTransform: 'uppercase', fontWeight: 600 }}>Duración {dudur}</span>
          </div>
          <div style={{ fontFamily: DISP5, fontSize: 29, fontWeight: 400, color: TL5.mut, lineHeight: 1.4 }}>{objetivo}</div>
        </div>
      </div>
    </div>
  );
}

// ── Closing ─────────────────────────────────────────────────────────────────
function ClosingM5({ start, dur, line, activityLabel, activity }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const a = pop5(t, s + 1.4, 0.6, 18);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 8%' }}>
      <div style={{ fontFamily: DISP5, fontSize: 60, fontWeight: 600, color: TL5.ink, textAlign: 'center', lineHeight: 1.12, letterSpacing: '-0.01em', maxWidth: 1520, textWrap: 'balance' }}>{line}</div>
      {activity && (
        <div style={{ opacity: a.op, transform: `translateY(${a.ty}px)`, display: 'flex', alignItems: 'stretch', borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL5.lineS}`, boxShadow: TL5.shadowSm, maxWidth: 1340, background: TL5.paper }}>
          <div style={{ background: TL5.amber, color: '#fff', fontFamily: MONO5, fontSize: 15, fontWeight: 600, letterSpacing: '0.16em', padding: '20px 24px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{activityLabel || 'Actividad'}</div>
          <div style={{ color: TL5.ink, fontFamily: DISP5, fontSize: 23, fontWeight: 400, padding: '18px 28px', display: 'flex', alignItems: 'center', lineHeight: 1.35 }}>{activity}</div>
        </div>
      )}
    </div>
  );
}

// ── Shell + chrome + progress ─────────────────────────────────────────────────
function ClassShellM5({ scenes, claseNo, claseName }) {
  let acc = 0;
  const timed = scenes.map(sc => { const o = { ...sc, start: acc }; acc += sc.dur; return o; });
  const total = acc;
  return (
    <Stage width={1920} height={1080} duration={total} background={TL5.bg} persistKey={`m5c${claseNo}`}>
      <div id="video-root" data-screen-label={`M5 Clase 5.${claseNo}`} style={{ position: 'absolute', inset: 0 }}>
        <GlobalBGM5 />
        {timed.map((sc, i) => <sc.C key={i} start={sc.start} dur={sc.dur} />)}
        <ChromeM5 timed={timed} claseNo={claseNo} claseName={claseName} />
        <ProgressM5 timed={timed} />
      </div>
    </Stage>
  );
}
function ChromeM5({ timed, claseNo, claseName }) {
  const t = useTime();
  let label = '';
  for (const sc of timed) if (t >= sc.start - 0.0001) label = sc.label || '';
  return (
    <div style={{ position: 'absolute', left: 54, bottom: 46, zIndex: 40, fontFamily: MONO5, fontSize: 13, letterSpacing: '0.2em', color: TL5.mut, display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase' }}>
      <span style={{ color: TL5.indigoD, fontWeight: 600 }}>M5 · CLASE 5.{claseNo}</span>
      <span style={{ width: 30, height: 1, background: TL5.lineS }} />
      <span>{claseName}</span>
      {label && <><span style={{ width: 30, height: 1, background: TL5.lineS }} /><span style={{ color: TL5.dim }}>{label}</span></>}
    </div>
  );
}
function ProgressM5({ timed }) {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', top: 40, right: 54, zIndex: 40, display: 'flex', gap: 6, alignItems: 'center' }}>
      {timed.map((sc, i) => {
        const active = t >= sc.start && t < sc.start + sc.dur;
        const done = t >= sc.start + sc.dur;
        return <div key={i} style={{ width: active ? 30 : 16, height: 3, borderRadius: 2, background: active ? TL5.amber : (done ? TL5.indigo : 'rgba(50,46,120,0.16)'), transition: 'width 200ms' }} />;
      })}
    </div>
  );
}

// ── Logic gate (IEC distinctive-shape, US style) ──────────────────────────────
function LogicGateM5({ x, y, type = 'AND', scale = 1, color = TL5.indigo, label }) {
  const s = scale, W = 90 * s, H = 70 * s;
  const bubble = ['NAND', 'NOR', 'NOT', 'XNOR'].includes(type);
  let body;
  if (type === 'AND' || type === 'NAND') {
    body = <path d={`M${x} ${y} L${x + W * 0.5} ${y} A${H / 2} ${H / 2} 0 0 1 ${x + W * 0.5} ${y + H} L${x} ${y + H} Z`} fill={TL5.paper} stroke={color} strokeWidth={2.6} />;
  } else if (type === 'OR' || type === 'NOR' || type === 'XOR' || type === 'XNOR') {
    body = <path d={`M${x} ${y} Q${x + W * 0.45} ${y} ${x + W} ${y + H / 2} Q${x + W * 0.45} ${y + H} ${x} ${y + H} Q${x + W * 0.28} ${y + H / 2} ${x} ${y} Z`} fill={TL5.paper} stroke={color} strokeWidth={2.6} />;
  } else { // NOT
    body = <path d={`M${x} ${y} L${x + W * 0.75} ${y + H / 2} L${x} ${y + H} Z`} fill={TL5.paper} stroke={color} strokeWidth={2.6} />;
  }
  return (
    <g>
      {(type === 'XOR' || type === 'XNOR') && <path d={`M${x - 10} ${y} Q${x + W * 0.18} ${y + H / 2} ${x - 10} ${y + H}`} fill="none" stroke={color} strokeWidth="2.6" />}
      {body}
      {bubble && <circle cx={type === 'NOT' ? x + W * 0.75 + 7 : x + W + 7} cy={y + H / 2} r="6" fill={TL5.paper} stroke={color} strokeWidth="2.4" />}
      {label && <text x={x + W / 2} y={y + H / 2 + 6} fill={color} fontFamily={MONO5} fontSize={13 * s} fontWeight="700" textAnchor="middle">{label}</text>}
    </g>
  );
}

Object.assign(window, {
  TL5, DISP5, MONO5, pop5,
  SceneM5, CapM5, KickerM5, BracketsM5, GlobalBGM5, SignalM5,
  BlockM5, SumM5, ArrowM5, InfoCardM5, StatM5, TitleCardM5, ClosingM5,
  ClassShellM5, ChromeM5, ProgressM5, LogicGateM5, ChartM5,
});
