// clase-lib.jsx — shared templates for the Módulo 0 class videos.
// Loaded after animations.jsx + video-lib.jsx. Uses T, DISP, MONO, Cap, Kicker,
// Brackets, Slot, DrawLine, GlobalBG, Scanlines. Exports to window.

function pop(t, appear, d = 0.5, rise = 18) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.92, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  const eb = Easing.easeOutBack(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.92 + 0.08 * eb, ty: (1 - e) * rise };
}

// ── Title card for each class: big number, title, duration tag, objective ────
function TitleCard({ start, dur, claseNo, title, dudur, objetivo }) {
  const t = useTime();
  const s = start;
  const end = start + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const big = pop(t, s + 0.3, 0.8, 0);
  const ti = pop(t, s + 0.9, 0.7, 20);
  const ob = pop(t, s + 2.0, 0.7, 16);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      {/* giant ghost number */}
      <div style={{
        position: 'absolute', right: '6%', top: '50%', transform: `translateY(-50%) scale(${big.sc})`, opacity: big.op * 0.12,
        fontFamily: DISP, fontSize: 720, fontWeight: 700, color: T.cyan, lineHeight: 0.8, letterSpacing: '-0.04em',
      }}>{String(claseNo).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', left: '9%', top: '50%', transform: 'translateY(-50%)', width: 1180 }}>
        <Kicker start={s + 0.4} dur={dur - 0.6} text={`Módulo 0 · Clase ${claseNo}`} x="0" y="-130px" align="left" />
        <div style={{
          opacity: ti.op, transform: `translateY(${ti.ty}px)`,
          fontFamily: DISP, fontSize: 92, fontWeight: 700, color: T.ink, lineHeight: 1.02, letterSpacing: '-0.02em', textWrap: 'balance',
        }}>{title}</div>
        <div style={{
          marginTop: 30, opacity: ob.op, transform: `translateY(${ob.ty}px)`,
          display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 980,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 44, height: 2, background: T.cyan }} />
            <span style={{ fontFamily: MONO, fontSize: 16, letterSpacing: '0.22em', color: T.cyan, textTransform: 'uppercase' }}>Duración {dudur}</span>
          </div>
          <div style={{ fontFamily: DISP, fontSize: 30, fontWeight: 400, color: T.mut, lineHeight: 1.4 }}>{objetivo}</div>
        </div>
      </div>
    </div>
  );
}

// ── Section label that slides in (acts as chapter divider inside a class) ────
function Banner({ start, dur, kicker, line, color = T.cyan }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.5) op = clamp(lt / 0.5, 0, 1);
  else if (t > end - 0.5) op = clamp((end - t) / 0.5, 0, 1);
  const bar = Easing.easeOutCubic(clamp(lt / 0.8, 0, 1));
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
      <div style={{ fontFamily: MONO, fontSize: 18, letterSpacing: '0.34em', color, textTransform: 'uppercase' }}>{kicker}</div>
      <div style={{ height: 2, width: bar * 220, background: color, boxShadow: `0 0 14px ${color}` }} />
      <div style={{ fontFamily: DISP, fontSize: 72, fontWeight: 600, color: T.ink, letterSpacing: '-0.01em', textAlign: 'center', maxWidth: 1400, textWrap: 'balance' }}>{line}</div>
    </div>
  );
}

// ── Reusable pictograms (industrial line icons) ──────────────────────────────
function IcoSensor({ c = T.cyan, t = 0 }) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 3);
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="40" r="6" fill={c} />
    {[14, 22, 30].map((r, i) => (<path key={i} d={`M ${32 - r} 40 A ${r} ${r} 0 0 1 ${32 + r} 40`} stroke={c} strokeWidth="2.4" opacity={0.85 - i * 0.18 + pulse * 0.15} fill="none" strokeLinecap="round" />))}
  </svg>);
}
function IcoCPU({ c = T.cyan }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <rect x="20" y="20" width="24" height="24" rx="3" stroke={c} strokeWidth="2.6" />
    <rect x="28" y="28" width="8" height="8" rx="1.5" fill={c} />
    {[26, 32, 38].map((p, i) => (<g key={i}>
      <line x1={p} y1="14" x2={p} y2="20" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
      <line x1={p} y1="44" x2={p} y2="50" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="14" y1={p} x2="20" y2={p} stroke={c} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="44" y1={p} x2="50" y2={p} stroke={c} strokeWidth="2.4" strokeLinecap="round" />
    </g>))}
  </svg>);
}
function IcoValve({ c = T.amber }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <line x1="8" y1="32" x2="24" y2="32" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    <line x1="40" y1="32" x2="56" y2="32" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M24 22 L40 42 M40 22 L24 42 Z" stroke={c} strokeWidth="2.6" fill="none" strokeLinejoin="round" />
    <line x1="24" y1="22" x2="24" y2="42" stroke={c} strokeWidth="2.6" />
    <line x1="40" y1="22" x2="40" y2="42" stroke={c} strokeWidth="2.6" />
    <line x1="32" y1="32" x2="32" y2="16" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    <rect x="26" y="11" width="12" height="6" rx="1.5" fill={c} />
  </svg>);
}
function IcoMonitor({ c = T.cyan, t = 0 }) {
  const b = 0.6 + 0.4 * Math.sin(t * 2.4);
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <rect x="12" y="14" width="40" height="28" rx="3" stroke={c} strokeWidth="2.6" />
    <polyline points="18,34 26,28 32,32 40,22 46,26" stroke={c} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={b} />
    <line x1="26" y1="42" x2="26" y2="48" stroke={c} strokeWidth="2.6" />
    <line x1="38" y1="42" x2="38" y2="48" stroke={c} strokeWidth="2.6" />
    <line x1="20" y1="48" x2="44" y2="48" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
  </svg>);
}
function IcoRobot({ c = T.cyan }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="16" cy="48" r="6" stroke={c} strokeWidth="2.6" />
    <line x1="16" y1="48" x2="30" y2="28" stroke={c} strokeWidth="2.8" strokeLinecap="round" />
    <line x1="30" y1="28" x2="46" y2="20" stroke={c} strokeWidth="2.8" strokeLinecap="round" />
    <circle cx="30" cy="28" r="3.2" fill={c} />
    <rect x="44" y="14" width="12" height="10" rx="2" stroke={c} strokeWidth="2.6" transform="rotate(20 50 19)" />
    <line x1="8" y1="56" x2="40" y2="56" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
  </svg>);
}
function IcoChip({ c = T.cyan }) {
  return (<svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <rect x="18" y="18" width="28" height="28" rx="3" stroke={c} strokeWidth="2.6" />
    <circle cx="32" cy="32" r="6" stroke={c} strokeWidth="2.4" />
    {[24, 32, 40].map((p, i) => (<g key={i}>
      <line x1={p} y1="12" x2={p} y2="18" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
      <line x1={p} y1="46" x2={p} y2="52" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
    </g>))}
  </svg>);
}

// ── Generic info card (icon + title + sub) ───────────────────────────────────
function InfoCard({ x, y, w = 360, h = 300, no, Icon, iconColor = T.cyan, title, sub, appear, t }) {
  const { op, sc, ty } = pop(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 6, border: `1px solid ${T.lineS}`, background: 'linear-gradient(180deg, rgba(20,34,54,0.65), rgba(12,20,32,0.5))', padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 12, backdropFilter: 'blur(2px)' }}>
        {no != null && <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: '0.24em', color: T.dim }}>{String(no).padStart(2, '0')}</div>}
        {Icon && <div style={{ marginTop: 2 }}><Icon c={iconColor} t={t} /></div>}
        <div style={{ fontFamily: DISP, fontSize: 32, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em', lineHeight: 1.05 }}>{title}</div>
        <div style={{ fontFamily: DISP, fontSize: 19, fontWeight: 400, color: T.mut, lineHeight: 1.4 }}>{sub}</div>
        <Brackets color={iconColor} size={13} thick={1.5} inset={-1} />
      </div>
    </div>
  );
}

// ── Closing card: takeaway line + activity chip ──────────────────────────────
function Closing({ start, dur, line, activityLabel, activity }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const a = pop(t, s + 1.4, 0.6, 18);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 8%' }}>
      <div style={{ fontFamily: DISP, fontSize: 64, fontWeight: 600, color: T.ink, textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.01em', maxWidth: 1500, textWrap: 'balance' }}>{line}</div>
      {activity && (
        <div style={{ opacity: a.op, transform: `translateY(${a.ty}px)`, display: 'flex', alignItems: 'stretch', gap: 0, borderRadius: 8, overflow: 'hidden', border: `1px solid ${T.lineS}`, maxWidth: 1300 }}>
          <div style={{ background: T.amber, color: '#0a121e', fontFamily: MONO, fontSize: 15, fontWeight: 600, letterSpacing: '0.16em', padding: '20px 24px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{activityLabel || 'Actividad'}</div>
          <div style={{ background: 'rgba(20,34,54,0.7)', color: T.ink, fontFamily: DISP, fontSize: 24, fontWeight: 400, padding: '18px 28px', display: 'flex', alignItems: 'center', lineHeight: 1.35 }}>{activity}</div>
        </div>
      )}
    </div>
  );
}

// ── Shell: assembles a class video (bg + scenes + chrome + progress) ─────────
function ClassShell({ scenes, claseNo, claseName }) {
  let acc = 0;
  const timed = scenes.map(sc => { const o = { ...sc, start: acc }; acc += sc.dur; return o; });
  const total = acc;
  return (
    <Stage width={1920} height={1080} duration={total} background={T.bg} persistKey={`clase${claseNo}`}>
      <div id="video-root" data-screen-label={`Clase ${claseNo}`} style={{ position: 'absolute', inset: 0 }}>
        <GlobalBG />
        {timed.map((sc, i) => <sc.C key={i} start={sc.start} dur={sc.dur} />)}
        <ClassChrome timed={timed} claseNo={claseNo} claseName={claseName} />
        <ClassProgress timed={timed} total={total} />
        <Scanlines />
      </div>
    </Stage>
  );
}
function ClassChrome({ timed, claseNo, claseName }) {
  const t = useTime();
  let label = '';
  for (const sc of timed) if (t >= sc.start - 0.0001) label = sc.label || '';
  return (
    <div style={{ position: 'absolute', left: 54, bottom: 46, zIndex: 40, fontFamily: MONO, fontSize: 13, letterSpacing: '0.2em', color: T.mut, display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase' }}>
      <span style={{ color: T.cyan }}>CLASE {String(claseNo).padStart(2, '0')}</span>
      <span style={{ width: 30, height: 1, background: T.line }} />
      <span>{claseName}</span>
      {label && <><span style={{ width: 30, height: 1, background: T.line }} /><span style={{ color: T.dim }}>{label}</span></>}
    </div>
  );
}
function ClassProgress({ timed, total }) {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', top: 40, right: 54, zIndex: 40, display: 'flex', gap: 6, alignItems: 'center' }}>
      {timed.map((sc, i) => {
        const active = t >= sc.start && t < sc.start + sc.dur;
        const done = t >= sc.start + sc.dur;
        return <div key={i} style={{ width: active ? 30 : 16, height: 3, borderRadius: 2, background: active ? T.cyan : (done ? T.cyanD : 'rgba(120,165,220,0.22)'), transition: 'width 200ms' }} />;
      })}
    </div>
  );
}

Object.assign(window, {
  pop, TitleCard, Banner, InfoCard, Closing, ClassShell, ClassChrome, ClassProgress,
  IcoSensor, IcoCPU, IcoValve, IcoMonitor, IcoRobot, IcoChip,
});
