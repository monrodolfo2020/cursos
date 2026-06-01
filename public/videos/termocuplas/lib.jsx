// lib.jsx — Blueprint primitives & shared helpers for the RTD PT100 video.
// Depends on animations.jsx globals: Easing, clamp, useSprite, useTime, useTimeline.

const COLORS = {
  bg:        '#0b1726',
  bgDeep:    '#081120',
  grid:      'rgba(120,170,220,0.10)',
  gridMajor: 'rgba(120,170,220,0.18)',
  ink:       '#e8eef5',
  inkMute:   'rgba(232,238,245,0.58)',
  inkFaint:  'rgba(232,238,245,0.32)',
  cyan:      'oklch(76% 0.13 228)',   // electrical / resistance
  cyanDeep:  'oklch(60% 0.12 228)',
  amber:     'oklch(78% 0.13 64)',    // heat / temperature
  amberDeep: 'oklch(64% 0.13 55)',
  platinum:  '#cfd9e2',
  red:       'oklch(68% 0.16 25)',    // error
  green:     'oklch(74% 0.13 150)',   // corrected / ok
};

const FONT = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// ── Fade helper: opacity + slight slide based on the enclosing Sprite window.
function useFade({ entry = 0.5, exit = 0.5, slide = 14 } = {}) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exit);
  let opacity = 1, ty = 0;
  if (localTime < entry) {
    const t = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
    opacity = t; ty = (1 - t) * slide;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    opacity = 1 - t; ty = -t * (slide * 0.5);
  }
  return { opacity, ty };
}

// progress within a sub-window [a,b] of the sprite's localTime, eased.
function useBeat(a, b, ease = Easing.easeInOutCubic) {
  const { localTime } = useSprite();
  if (b <= a) return localTime >= b ? 1 : 0;
  return ease(clamp((localTime - a) / (b - a), 0, 1));
}

// ── Persistent blueprint background (always visible, not gated by a Sprite).
function BlueprintBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.bg, overflow: 'hidden' }}>
      {/* fine grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          `linear-gradient(${COLORS.grid} 1px, transparent 1px),` +
          `linear-gradient(90deg, ${COLORS.grid} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
      {/* major grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          `linear-gradient(${COLORS.gridMajor} 1px, transparent 1px),` +
          `linear-gradient(90deg, ${COLORS.gridMajor} 1px, transparent 1px)`,
        backgroundSize: '200px 200px',
      }} />
      {/* vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 42%, transparent 38%, rgba(4,9,18,0.55) 100%)',
      }} />
    </div>
  );
}

// ── Persistent frame + header chrome.
function Chrome({ right = 'RTD PT100 · 3 Hilos', footer = 'MÓDULO 01 · SENSORES DE TEMPERATURA' }) {
  const T = useTime();
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* corner crop marks */}
      {[[40,40,1,1],[1880,40,-1,1],[40,1040,1,-1],[1880,1040,-1,-1]].map(([x,y,sx,sy],i)=>(
        <svg key={i} width="26" height="26" style={{ position:'absolute', left:x-(sx<0?26:0), top:y-(sy<0?26:0) }}>
          <path d={`M ${sx<0?26:0} ${sy<0?26:0} h ${sx*20} M ${sx<0?26:0} ${sy<0?26:0} v ${sy*20}`}
                stroke={COLORS.inkFaint} strokeWidth="1.5" fill="none"/>
        </svg>
      ))}
      {/* header */}
      <div style={{ position:'absolute', left:64, top:54, fontFamily:FONT.mono, fontSize:15,
        letterSpacing:'0.22em', color:COLORS.inkMute, textTransform:'uppercase' }}>
        Instrumentación Industrial
      </div>
      <div style={{ position:'absolute', right:64, top:54, fontFamily:FONT.mono, fontSize:15,
        letterSpacing:'0.22em', color:COLORS.cyan, textTransform:'uppercase', textAlign:'right' }}>
        {right}
      </div>
      <div style={{ position:'absolute', left:64, right:64, top:84, height:1, background:COLORS.gridMajor }} />
      {/* footer ticker */}
      <div style={{ position:'absolute', left:64, bottom:46, fontFamily:FONT.mono, fontSize:13,
        letterSpacing:'0.18em', color:COLORS.inkFaint }}>
        {footer}
      </div>
      <div style={{ position:'absolute', right:64, bottom:46, fontFamily:FONT.mono, fontSize:13,
        letterSpacing:'0.18em', color:COLORS.inkFaint }}>
        t = {T.toFixed(1)} s
      </div>
    </div>
  );
}

// ── Scene kicker (top-left section label, slides in).
function Kicker({ n, label }) {
  const { opacity, ty } = useFade({ entry: 0.5, exit: 0.4, slide: 10 });
  return (
    <div style={{ position:'absolute', left:64, top:120, opacity, transform:`translateY(${ty}px)`,
      display:'flex', alignItems:'baseline', gap:16 }}>
      <span style={{ fontFamily:FONT.mono, fontSize:22, color:COLORS.cyan, letterSpacing:'0.1em' }}>
        {n}
      </span>
      <span style={{ fontFamily:FONT.mono, fontSize:18, color:COLORS.inkMute, letterSpacing:'0.28em',
        textTransform:'uppercase' }}>
        {label}
      </span>
    </div>
  );
}

// ── Generic fading group (wraps content with sprite fade).
function Fade({ entry = 0.5, exit = 0.5, slide = 14, style, children }) {
  const { opacity, ty } = useFade({ entry, exit, slide });
  return (
    <div style={{ opacity, transform:`translateY(${ty}px)`, ...style }}>{children}</div>
  );
}

// ── Resistor zigzag path generator (horizontal), centered at (x..x+w, y).
function resistorPath(x, y, w, h = 18, zigs = 6) {
  const lead = w * 0.16;
  const body = w - lead * 2;
  const seg = body / (zigs * 2);
  let cx = x + lead;
  let d = `M ${x} ${y} L ${cx} ${y}`;
  for (let i = 0; i < zigs * 2; i++) {
    cx += seg;
    const dy = i === zigs * 2 - 1 ? 0 : (i % 2 === 0 ? -h : h);
    d += ` L ${cx} ${y + dy}`;
  }
  d += ` L ${x + w} ${y}`;
  return d;
}

// ── Animated draw-on path (uses dashoffset). progress 0..1.
function DrawPath({ d, progress, stroke, width = 3, glow = true, dash, fill = 'none', cap = 'round' }) {
  const ref = React.useRef(null);
  const [len, setLen] = React.useState(0);
  React.useEffect(() => { if (ref.current) setLen(ref.current.getTotalLength()); }, [d]);
  return (
    <path ref={ref} d={d} fill={fill} stroke={stroke} strokeWidth={width}
      strokeLinecap={cap} strokeLinejoin="round"
      strokeDasharray={dash || (len || 1)}
      strokeDashoffset={dash ? 0 : (len * (1 - clamp(progress,0,1)))}
      style={{ filter: glow ? `drop-shadow(0 0 8px ${stroke})` : 'none' }} />
  );
}

// PT100 resistance model
const R0 = 100, ALPHA = 0.00385;
const rOfT = (T) => R0 * (1 + ALPHA * T);

Object.assign(window, {
  COLORS, FONT, useFade, useBeat, BlueprintBg, Chrome, Kicker, Fade,
  resistorPath, DrawPath, R0, ALPHA, rOfT,
});
