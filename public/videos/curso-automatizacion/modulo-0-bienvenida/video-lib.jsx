// video-lib.jsx — tokens, scene/caption wrappers, reusable industrial motifs
// Loaded after animations.jsx. Exports to window.

const T = {
  bg:    '#070b12',
  bg2:   '#0c1320',
  panel: 'rgba(20,34,54,0.55)',
  panelSolid: '#0f1a2a',
  line:  'rgba(120,165,220,0.18)',
  lineS: 'rgba(120,165,220,0.40)',
  ink:   '#e9f1fc',
  mut:   '#90a6c4',
  dim:   '#56708f',
  cyan:  'oklch(78% 0.14 225)',
  cyanD: 'oklch(58% 0.13 225)',
  amber: 'oklch(82% 0.13 72)',
  red:   'oklch(66% 0.17 25)',
};
const DISP = "'Space Grotesk', system-ui, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

// ── Scene wrapper: gates to [start, start+dur], crossfades content ───────────
function Scene({ start, dur, children, fade = 0.55 }) {
  const t = useTime();
  const end = start + dur;
  if (t < start - 0.02 || t > end + 0.02) return null;
  const lt = t - start;
  let op = 1;
  if (lt < fade) op = clamp(lt / fade, 0, 1);
  else if (t > end - fade) op = clamp((end - t) / fade, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, willChange: 'opacity' }}>
      {children}
    </div>
  );
}

// ── Caption: absolute-time kinetic line, anchored by center ──────────────────
function Cap({
  start, dur = 2.6, children,
  x = '50%', y = '50%', size = 60, weight = 600,
  color = T.ink, mono = false, align = 'center',
  width = 1500, lh = 1.1, ls = '-0.01em', up = 22,
  upper = false,
}) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.5, outD = 0.42;
  let op = 1, ty = 0;
  if (lt < inD) { const e = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); op = e; ty = (1 - e) * up; }
  else if (lt > dur - outD) { const e = Easing.easeInCubic(clamp((lt - (dur - outD)) / outD, 0, 1)); op = 1 - e; ty = -e * up * 0.5; }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(${tx}, calc(-50% + ${ty}px))`,
      opacity: op, width, maxWidth: '92vw',
      textAlign: align, color,
      fontFamily: mono ? MONO : DISP,
      fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: ls,
      textTransform: upper ? 'uppercase' : 'none',
      willChange: 'transform, opacity', textWrap: 'balance',
    }}>
      {children}
    </div>
  );
}

// ── Mono kicker label (e.g. "ESCENA 03 / SISTEMA") ───────────────────────────
function Kicker({ start, dur = 3, text, x = '50%', y = '50%', align = 'center', color = T.cyan, size = 17 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.4, outD = 0.35;
  let op = 1;
  if (lt < inD) op = clamp(lt / inD, 0, 1);
  else if (lt > dur - outD) op = clamp((dur - lt) / outD, 0, 1);
  // typewriter-ish reveal of width via clip
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{
      position: 'absolute', left: x, top: y, transform: `translate(${tx},-50%)`,
      opacity: op, color, fontFamily: MONO, fontSize: size, letterSpacing: '0.34em',
      textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: align,
      display: 'flex', alignItems: 'center', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start',
    }}>
      <span style={{ width: 26, height: 1, background: color, opacity: 0.7 }} />
      {text}
      <span style={{ width: 26, height: 1, background: color, opacity: 0.7 }} />
    </div>
  );
}

// ── HUD corner brackets ──────────────────────────────────────────────────────
function Brackets({ color = T.cyan, size = 22, thick = 2, inset = 0 }) {
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

// ── Image placeholder slot (dark, HUD-framed, mono caption) ──────────────────
function Slot({ label, tag, w = 360, h = 230, accent = T.cyan, fill }) {
  return (
    <div style={{
      width: w, height: h, position: 'relative', overflow: 'hidden',
      background: fill || `repeating-linear-gradient(125deg, #0c1626 0 11px, #0a121e 11px 22px)`,
      border: `1px solid ${T.line}`, borderRadius: 4,
    }}>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, textAlign: 'center',
      }}>
        <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase' }}>{label}</div>
      </div>
      {tag && (
        <div style={{ position: 'absolute', top: 8, left: 8, fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: T.mut, opacity: 0.8 }}>{tag}</div>
      )}
      <Brackets color={accent} size={16} thick={1.5} inset={6} />
    </div>
  );
}

// ── Global animated background: technical grid + drifting glow + vignette ────
function GlobalBG() {
  const t = useTime();
  const driftX = 50 + Math.sin(t * 0.18) * 18;
  const driftY = 42 + Math.cos(t * 0.14) * 14;
  const gridShift = (t * 6) % 56;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: T.bg }}>
      <div style={{
        position: 'absolute', inset: '-60px',
        backgroundImage: `linear-gradient(${T.line} 1px, transparent 1px), linear-gradient(90deg, ${T.line} 1px, transparent 1px)`,
        backgroundSize: '56px 56px',
        transform: `translate(${-gridShift}px, ${-gridShift * 0.5}px)`,
        opacity: 0.5,
        maskImage: 'radial-gradient(ellipse 80% 75% at 50% 45%, #000 35%, transparent 88%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 50% 45%, #000 35%, transparent 88%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle 700px at ${driftX}% ${driftY}%, oklch(40% 0.10 225 / 0.30), transparent 60%)`,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)',
      }} />
    </div>
  );
}

// ── Scanline overlay (very subtle, always on) ────────────────────────────────
function Scanlines() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50, mixBlendMode: 'overlay',
      backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px)',
      opacity: 0.6,
    }} />
  );
}

// ── Progress / scene readout chrome (bottom-left HUD) ────────────────────────
function HUDChrome({ sceneNo, sceneTotal = 10, sceneName }) {
  return (
    <div style={{
      position: 'absolute', left: 54, bottom: 46, zIndex: 40,
      fontFamily: MONO, fontSize: 13, letterSpacing: '0.2em', color: T.mut,
      display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase',
    }}>
      <span style={{ color: T.cyan }}>{String(sceneNo).padStart(2, '0')}</span>
      <span style={{ opacity: 0.4 }}>/ {String(sceneTotal).padStart(2, '0')}</span>
      <span style={{ width: 30, height: 1, background: T.line }} />
      <span>{sceneName}</span>
    </div>
  );
}

// ── A line that draws itself (for connectors / paths) ────────────────────────
function DrawLine({ x1, y1, x2, y2, start, dur = 0.8, color = T.cyan, width = 2, dash, glow = true }) {
  const t = useTime();
  const p = clamp((t - start) / dur, 0, 1);
  const e = Easing.easeInOutCubic(p);
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth={width} strokeLinecap="round"
        strokeDasharray={dash || `${len} ${len}`}
        strokeDashoffset={(1 - e) * len}
        style={glow ? { filter: `drop-shadow(0 0 6px ${color})` } : undefined} />
    </svg>
  );
}

Object.assign(window, {
  T, DISP, MONO, Scene, Cap, Kicker, Brackets, Slot, GlobalBG, Scanlines, HUDChrome, DrawLine,
});
