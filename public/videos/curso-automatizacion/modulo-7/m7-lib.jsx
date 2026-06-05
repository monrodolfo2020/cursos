// m7-lib.jsx — Módulo 7 "Redes Industriales y Comunicaciones".
// DARK theme: violeta profundo + cian eléctrico (datos) + ámbar (OT/alerta).
// "network / data-flow" feel. Depends only on animations.jsx. Exports w/ M7 suffix.

const TL7 = {
  bg:      '#100a1e',
  bg2:     '#160d29',
  paper:   '#1f1538',          // panel face
  paper2:  '#281a47',          // raised panel
  ink:     '#efe9fb',
  mut:     '#a99cc8',
  dim:     '#6c5f8c',
  line:    'rgba(176,102,255,0.10)',
  lineS:   'rgba(176,102,255,0.24)',
  vio:     '#b066ff',          // primario — nodos / red
  vioD:    '#8b3ff0',
  vioLt:   '#cfa3ff',
  vioWash: 'rgba(176,102,255,0.13)',
  cyan:    '#2fd9e0',          // datos / paquetes / flujo
  cyanD:   '#16b3ba',
  cyanWash:'rgba(47,217,224,0.13)',
  amber:   '#f7b733',          // OT / alerta / energía
  amberD:  '#d6951a',
  amberWash:'rgba(247,183,51,0.13)',
  pink:    '#f0509c',          // acento secundario
  grn:     '#46d98c',          // OK / online
  red:     '#fa5d6f',          // fallo / IT-riesgo
  shadow:  '0 22px 60px rgba(0,0,0,0.55)',
  shadowSm:'0 8px 22px rgba(0,0,0,0.42)',
};
const DISP7 = "'Space Grotesk', system-ui, sans-serif";
const MONO7 = "'IBM Plex Mono', ui-monospace, monospace";

function pop7(t, appear, d = 0.5, rise = 18) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.94, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  const eb = Easing.easeOutBack(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.94 + 0.06 * eb, ty: (1 - e) * rise };
}

// ── Scene wrapper ─────────────────────────────────────────────────────────────
function SceneM7({ start, dur, children, fade = 0.55 }) {
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
function CapM7({ start, dur = 2.6, children, x = '50%', y = '50%', size = 60, weight = 600, color = TL7.ink, mono = false, align = 'center', width = 1500, lh = 1.12, ls = '-0.01em', up = 22 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.5, outD = 0.42;
  let op = 1, ty = 0;
  if (lt < inD) { const e = Easing.easeOutCubic(clamp(lt / inD, 0, 1)); op = e; ty = (1 - e) * up; }
  else if (lt > dur - outD) { const e = Easing.easeInCubic(clamp((lt - (dur - outD)) / outD, 0, 1)); op = 1 - e; ty = -e * up * 0.5; }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx}, calc(-50% + ${ty}px))`, opacity: op, width, maxWidth: '92vw', textAlign: align, color, fontFamily: mono ? MONO7 : DISP7, fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: ls, willChange: 'transform, opacity', textWrap: 'balance' }}>
      {children}
    </div>
  );
}

// ── Kicker ────────────────────────────────────────────────────────────────────
function KickerM7({ start, dur = 3, text, x = '50%', y = '50%', align = 'center', color = TL7.cyan, size = 17 }) {
  const t = useTime();
  const lt = t - start;
  if (lt < -0.02 || lt > dur + 0.02) return null;
  const inD = 0.4, outD = 0.35;
  let op = 1;
  if (lt < inD) op = clamp(lt / inD, 0, 1);
  else if (lt > dur - outD) op = clamp((dur - lt) / outD, 0, 1);
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx},-50%)`, opacity: op, color, fontFamily: MONO7, fontSize: size, letterSpacing: '0.3em', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: align, display: 'flex', alignItems: 'center', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
      {text}
      <span style={{ width: 26, height: 2, background: color, opacity: 0.75 }} />
    </div>
  );
}

// ── Background: deep violet + node-graph dots + drifting connection lines ──────
function GlobalBGM7() {
  const t = useTime();
  const ax = 14 + Math.sin(t * 0.07) * 8, ay = 12 + Math.cos(t * 0.05) * 6;
  const bx = 88 + Math.cos(t * 0.06) * 8, by = 90 + Math.sin(t * 0.045) * 6;
  // a few static-ish nodes that gently pulse, connected by faint lines
  const nodes = [
    [12, 22], [27, 64], [44, 30], [60, 72], [76, 40], [90, 18], [83, 80], [34, 88], [54, 14],
  ];
  const links = [[0, 1], [0, 2], [2, 4], [4, 5], [3, 6], [1, 7], [2, 8], [4, 6], [3, 7]];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `linear-gradient(165deg, ${TL7.bg2}, ${TL7.bg})` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 900px at ${ax}% ${ay}%, rgba(176,102,255,0.16), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 720px at ${bx}% ${by}%, rgba(47,217,224,0.10), transparent 60%)` }} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 100 100">
        {links.map((lk, i) => (
          <line key={i} x1={nodes[lk[0]][0]} y1={nodes[lk[0]][1]} x2={nodes[lk[1]][0]} y2={nodes[lk[1]][1]} stroke="rgba(176,102,255,0.12)" strokeWidth="0.12" />
        ))}
        {nodes.map((n, i) => {
          const pulse = 0.4 + 0.3 * (0.5 + 0.5 * Math.sin(t * 1.3 + i));
          return <circle key={i} cx={n[0]} cy={n[1]} r="0.5" fill="rgba(207,163,255,0.5)" opacity={pulse} />;
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,0.45) 100%)' }} />
    </div>
  );
}

// ── Corner brackets ──────────────────────────────────────────────────────────
function BracketsM7({ color = TL7.vio, size = 18, thick = 2, inset = 0 }) {
  const c = (pos) => {
    const base = { position: 'absolute', width: size, height: size, borderColor: color, borderStyle: 'solid', borderWidth: 0 };
    if (pos === 'tl') return { ...base, top: inset, left: inset, borderTopWidth: thick, borderLeftWidth: thick };
    if (pos === 'tr') return { ...base, top: inset, right: inset, borderTopWidth: thick, borderRightWidth: thick };
    if (pos === 'bl') return { ...base, bottom: inset, left: inset, borderBottomWidth: thick, borderLeftWidth: thick };
    return { ...base, bottom: inset, right: inset, borderBottomWidth: thick, borderRightWidth: thick };
  };
  return <>{['tl', 'tr', 'bl', 'br'].map(p => <div key={p} style={c(p)} />)}</>;
}

// ── Network node (device box on a network) ─────────────────────────────────────
function NodeM7({ x, y, w = 200, h = 96, label, sub, accent = TL7.vio, t, appear = 0, active = true, icon = null, online = false }) {
  const ap = pop7(t, appear, 0.5, 14);
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={TL7.paper} stroke={active ? accent : TL7.lineS} strokeWidth={active ? 2.4 : 1.6} />
      <rect x={x} y={y} width={w} height="5" rx="2.5" fill={accent} />
      {online && <circle cx={x + w - 16} cy={y + 20} r="5" fill={TL7.grn} />}
      {icon && <text x={x + 18} y={y + h / 2 + 8} fontSize="26" textAnchor="middle">{icon}</text>}
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 9)} fill={TL7.ink} fontFamily={DISP7} fontSize="24" fontWeight="700" textAnchor="middle">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 24} fill={TL7.mut} fontFamily={MONO7} fontSize="14" textAnchor="middle">{sub}</text>}
    </g>
  );
}

// ── Bus / link line with animated data packets traveling along it ─────────────
// Packets move from (x1,y1)→(x2,y2); set `back` to also send return packets.
function LinkM7({ x1, y1, x2, y2, start, t, color = TL7.cyan, width = 3, label, dur = 0.6, packets = true, back = false, dashed = false, speed = 0.55 }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const hx = x1 + (x2 - x1) * e, hy = y1 + (y2 - y1) * e;
  const live = t - start;
  const dots = [];
  if (packets && e > 0.98) {
    const n = 3;
    for (let i = 0; i < n; i++) {
      const f = ((live * speed) + i / n) % 1;
      dots.push({ x: x1 + (x2 - x1) * f, y: y1 + (y2 - y1) * f, c: color });
      if (back) { const fb = 1 - (((live * speed) + i / n + 0.5) % 1); dots.push({ x: x1 + (x2 - x1) * fb, y: y1 + (y2 - y1) * fb, c: TL7.amber }); }
    }
  }
  return (
    <g>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={`color-mix(in oklch, ${color} 40%, transparent)`} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? '8 7' : undefined} />
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r="7" fill={d.c} opacity="0.25" />
          <rect x={d.x - 5} y={d.y - 5} width="10" height="10" rx="2.5" fill={d.c} />
        </g>
      ))}
      {label && e > 0.5 && <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 14} fill={color} fontFamily={MONO7} fontSize="16" fontWeight="600" textAnchor="middle">{label}</text>}
    </g>
  );
}

// ── Arrow connector (no packets) ──────────────────────────────────────────────
function ArrowM7({ x1, y1, x2, y2, start, t, color = TL7.mut, label, dur = 0.6, dashed = false }) {
  const e = Easing.easeInOutCubic(clamp((t - start) / dur, 0, 1));
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hx = x1 + (x2 - x1) * e, hy = y1 + (y2 - y1) * e;
  return (
    <g opacity={clamp(e * 4, 0, 1)}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={dashed ? '9 7' : undefined} />
      {e > 0.96 && <polygon points={`${x2},${y2} ${x2 - 13 * Math.cos(ang - 0.4)},${y2 - 13 * Math.sin(ang - 0.4)} ${x2 - 13 * Math.cos(ang + 0.4)},${y2 - 13 * Math.sin(ang + 0.4)}`} fill={color} />}
      {label && e > 0.5 && <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 12} fill={color} fontFamily={MONO7} fontSize="16" fontWeight="600" textAnchor="middle">{label}</text>}
    </g>
  );
}

// ── Automation pyramid (ISA-95) — 5 levels stacked ─────────────────────────────
// levels: top→bottom [{n, name, sub, accent}]
function PyramidM7({ cx, top, levels, t, appear = 0, totalW = 760, h = 90, gap = 8 }) {
  const n = levels.length;
  return (
    <g>
      {levels.map((lv, i) => {
        const ap = pop7(t, appear + i * 0.35, 0.5, 14);
        const wTop = totalW * (0.36 + (i / n) * 0.64);
        const wBot = totalW * (0.36 + ((i + 1) / n) * 0.64);
        const y = top + i * (h + gap);
        const pts = `${cx - wTop / 2},${y} ${cx + wTop / 2},${y} ${cx + wBot / 2},${y + h} ${cx - wBot / 2},${y + h}`;
        return (
          <g key={i} opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
            <polygon points={pts} fill={TL7.paper} stroke={lv.accent} strokeWidth="2.2" />
            <text x={cx - wTop / 2 - 18} y={y + h / 2 + 6} fill={lv.accent} fontFamily={MONO7} fontSize="22" fontWeight="700" textAnchor="end">N{lv.n}</text>
            <text x={cx} y={y + h / 2 - 3} fill={TL7.ink} fontFamily={DISP7} fontSize="23" fontWeight="700" textAnchor="middle">{lv.name}</text>
            <text x={cx} y={y + h / 2 + 22} fill={lv.accent} fontFamily={MONO7} fontSize="13.5" textAnchor="middle">{lv.sub}</text>
          </g>
        );
      })}
    </g>
  );
}

// ── Protocol frame (byte/field layout) ─────────────────────────────────────────
// fields: [{label, sub, w, accent}]  (w = flex weight)
function FrameM7({ x, y, width = 1200, fields, t, appear = 0, title }) {
  const ap = pop7(t, appear, 0.55, 16);
  const totalW = fields.reduce((a, f) => a + (f.w || 1), 0);
  let cx = x;
  const h = 96;
  return (
    <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
      {title && <text x={x} y={y - 16} fill={TL7.cyan} fontFamily={MONO7} fontSize="16" fontWeight="700" letterSpacing="0.1em">{title}</text>}
      {fields.map((f, i) => {
        const w = (f.w || 1) / totalW * width;
        const fx = cx; cx += w;
        const reveal = clamp((t - (appear + 0.3 + i * 0.28)) / 0.4, 0, 1);
        return (
          <g key={i} opacity={reveal}>
            <rect x={fx + 3} y={y} width={w - 6} height={h} rx="9" fill={TL7.paper} stroke={f.accent || TL7.vio} strokeWidth="2" />
            <text x={fx + w / 2} y={y + h / 2 - 4} fill={TL7.ink} fontFamily={DISP7} fontSize="20" fontWeight="700" textAnchor="middle">{f.label}</text>
            {f.sub && <text x={fx + w / 2} y={y + h / 2 + 20} fill={f.accent || TL7.vioLt} fontFamily={MONO7} fontSize="13" textAnchor="middle">{f.sub}</text>}
          </g>
        );
      })}
    </g>
  );
}

// ── Code panel (IDE-style) — lines:[{txt, c?}] ─────────────────────────────────
function CodeM7({ x, y, w = 760, title = 'ST', lines = [], t, appear = 0, reveal = 1 }) {
  const ap = pop7(t, appear, 0.55, 18);
  const lh = 30, pad = 22, headH = 40;
  const shown = Math.round(clamp(reveal, 0, 1) * lines.length);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: ap.op, transform: `translateY(${ap.ty}px)` }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL7.lineS}`, background: '#0c0717', boxShadow: TL7.shadow }}>
        <div style={{ height: headH, background: TL7.paper2, borderBottom: `1px solid ${TL7.lineS}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL7.red }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL7.amber }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: TL7.grn }} />
          <span style={{ marginLeft: 10, fontFamily: MONO7, fontSize: 13, color: TL7.mut, letterSpacing: '0.14em' }}>{title}</span>
        </div>
        <div style={{ padding: `${pad}px 0`, fontFamily: MONO7, fontSize: 17.5, lineHeight: `${lh}px` }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ display: 'flex', opacity: i < shown ? 1 : 0, transition: 'opacity .2s' }}>
              <span style={{ width: 44, textAlign: 'right', paddingRight: 16, color: TL7.dim, userSelect: 'none', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ color: ln.c || TL7.ink, whiteSpace: 'pre', paddingRight: 18 }}>{ln.txt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Info card ─────────────────────────────────────────────────────────────────
function InfoCardM7({ x, y, w = 360, h = 300, no, accent = TL7.vio, title, sub, appear, t, icon }) {
  const { op, sc, ty } = pop7(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 12, border: `1px solid ${TL7.lineS}`, background: `linear-gradient(160deg, ${TL7.paper}, ${TL7.bg2})`, boxShadow: TL7.shadow, padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 11, overflow: 'hidden' }}>
        {no != null && <div style={{ fontFamily: MONO7, fontSize: 13, letterSpacing: '0.24em', color: TL7.dim }}>{String(no).padStart(2, '0')}</div>}
        {icon && <div style={{ fontSize: 30, lineHeight: 1 }}>{icon}</div>}
        {title && <div style={{ fontFamily: DISP7, fontSize: 27, fontWeight: 700, color: TL7.ink, letterSpacing: '-0.01em', lineHeight: 1.08 }}>{title}</div>}
        <div style={{ fontFamily: DISP7, fontSize: 18.5, fontWeight: 400, color: TL7.mut, lineHeight: 1.42 }}>{sub}</div>
        <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: accent, borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ── Stat ──────────────────────────────────────────────────────────────────────
function StatM7({ x, y, value, unit, label, accent = TL7.vio, appear, t, align = 'left' }) {
  const { op, ty } = pop7(t, appear, 0.5, 16);
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: op, transform: `translateY(${ty}px)`, textAlign: align, ...(align === 'center' ? { transform: `translate(-50%, ${ty}px)` } : {}) }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <span style={{ fontFamily: DISP7, fontSize: 72, fontWeight: 700, color: accent, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{value}</span>
        {unit && <span style={{ fontFamily: MONO7, fontSize: 24, fontWeight: 500, color: TL7.mut }}>{unit}</span>}
      </div>
      {label && <div style={{ marginTop: 10, fontFamily: MONO7, fontSize: 13.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: TL7.dim }}>{label}</div>}
    </div>
  );
}

// ── Data table ─────────────────────────────────────────────────────────────────
// headers:[..], rows:[[..]], accentCol index optional
function TableM7({ x, y, w = 1200, headers, rows, t, appear = 0, accentCol = -1, colTemplate }) {
  const tpl = colTemplate || headers.map(() => '1fr').join(' ');
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL7.lineS}`, boxShadow: TL7.shadow }}>
        <div style={{ display: 'grid', gridTemplateColumns: tpl }}>
          {headers.map((h, i) => (
            <div key={i} style={{ background: TL7.paper2, padding: '15px 22px', fontFamily: MONO7, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: i === accentCol ? TL7.cyan : TL7.vioLt, fontWeight: 700, borderBottom: `1px solid ${TL7.lineS}`, borderLeft: i ? `1px solid ${TL7.line}` : 'none' }}>{h}</div>
          ))}
        </div>
        {rows.map((r, ri) => {
          const ap = clamp((t - (appear + 0.3 + ri * 0.3)) / 0.45, 0, 1);
          return (
            <div key={ri} style={{ opacity: ap, display: 'grid', gridTemplateColumns: tpl, background: ri % 2 ? TL7.bg2 : TL7.paper, borderBottom: ri < rows.length - 1 ? `1px solid ${TL7.line}` : 'none' }}>
              {r.map((cell, ci) => (
                <div key={ci} style={{ padding: '14px 22px', fontFamily: ci === 0 ? MONO7 : DISP7, fontSize: ci === 0 ? 17 : 18, fontWeight: ci === accentCol ? 600 : 400, color: ci === 0 ? TL7.ink : (ci === accentCol ? TL7.cyan : TL7.mut), borderLeft: ci ? `1px solid ${TL7.line}` : 'none', lineHeight: 1.3 }}>{cell}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Title card ─────────────────────────────────────────────────────────────────
function TitleCardM7({ start, dur, claseNo, title, dudur, objetivo, seccion = 'Redes Industriales' }) {
  const t = useTime();
  const s = start, end = start + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const big = pop7(t, s + 0.3, 0.8, 0);
  const ti = pop7(t, s + 0.9, 0.7, 20);
  const ob = pop7(t, s + 2.0, 0.7, 16);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <div style={{ position: 'absolute', right: '5%', top: '50%', transform: `translateY(-50%) scale(${big.sc})`, opacity: big.op * 0.13, fontFamily: DISP7, fontSize: 640, fontWeight: 700, color: TL7.vio, lineHeight: 0.8, letterSpacing: '-0.04em' }}>{String(claseNo).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', left: '9%', top: '50%', transform: 'translateY(-50%)', width: 1280 }}>
        <KickerM7 start={s + 0.4} dur={dur - 0.6} text={`Módulo 7 · ${seccion}`} x="0" y="-140px" align="left" />
        <div style={{ opacity: ti.op, transform: `translateY(${ti.ty}px)`, fontFamily: DISP7, fontSize: 82, fontWeight: 700, color: TL7.ink, lineHeight: 1.02, letterSpacing: '-0.02em', textWrap: 'balance' }}>{title}</div>
        <div style={{ marginTop: 30, opacity: ob.op, transform: `translateY(${ob.ty}px)`, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1060 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 44, height: 3, background: TL7.cyan, borderRadius: 2 }} />
            <span style={{ fontFamily: MONO7, fontSize: 16, letterSpacing: '0.2em', color: TL7.cyan, textTransform: 'uppercase', fontWeight: 600 }}>Clase 7.{claseNo} · Duración {dudur}</span>
          </div>
          <div style={{ fontFamily: DISP7, fontSize: 27, fontWeight: 400, color: TL7.mut, lineHeight: 1.42 }}>{objetivo}</div>
        </div>
      </div>
    </div>
  );
}

// ── Closing ─────────────────────────────────────────────────────────────────
function ClosingM7({ start, dur, line, activityLabel, activity }) {
  const t = useTime();
  const s = start, end = s + dur;
  if (t < s - 0.02 || t > end + 0.02) return null;
  const lt = t - s;
  let op = 1;
  if (lt < 0.6) op = clamp(lt / 0.6, 0, 1);
  else if (t > end - 0.6) op = clamp((end - t) / 0.6, 0, 1);
  const a = pop7(t, s + 1.4, 0.6, 18);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 8%' }}>
      <div style={{ fontFamily: DISP7, fontSize: 56, fontWeight: 600, color: TL7.ink, textAlign: 'center', lineHeight: 1.15, letterSpacing: '-0.01em', maxWidth: 1540, textWrap: 'balance' }}>{line}</div>
      {activity && (
        <div style={{ opacity: a.op, transform: `translateY(${a.ty}px)`, display: 'flex', alignItems: 'stretch', borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL7.lineS}`, boxShadow: TL7.shadowSm, maxWidth: 1400, background: TL7.paper }}>
          <div style={{ background: TL7.cyan, color: '#04232a', fontFamily: MONO7, fontSize: 15, fontWeight: 700, letterSpacing: '0.16em', padding: '20px 24px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{activityLabel || 'Actividad'}</div>
          <div style={{ color: TL7.ink, fontFamily: DISP7, fontSize: 22, fontWeight: 400, padding: '18px 28px', display: 'flex', alignItems: 'center', lineHeight: 1.35 }}>{activity}</div>
        </div>
      )}
    </div>
  );
}

// ── Shell + chrome + progress ─────────────────────────────────────────────────
function ClassShellM7({ scenes, claseNo, claseName }) {
  let acc = 0;
  const timed = scenes.map(sc => { const o = { ...sc, start: acc }; acc += sc.dur; return o; });
  const total = acc;
  return (
    <Stage width={1920} height={1080} duration={total} background={TL7.bg} persistKey={`m7c${claseNo}`}>
      <div id="video-root" data-screen-label={`M7 Clase 7.${claseNo}`} style={{ position: 'absolute', inset: 0 }}>
        <GlobalBGM7 />
        {timed.map((sc, i) => <sc.C key={i} start={sc.start} dur={sc.dur} />)}
        <ChromeM7 timed={timed} claseNo={claseNo} claseName={claseName} />
        <ProgressM7 timed={timed} />
      </div>
    </Stage>
  );
}
function ChromeM7({ timed, claseNo, claseName }) {
  const t = useTime();
  let label = '';
  for (const sc of timed) if (t >= sc.start - 0.0001) label = sc.label || '';
  return (
    <div style={{ position: 'absolute', left: 54, bottom: 46, zIndex: 40, fontFamily: MONO7, fontSize: 13, letterSpacing: '0.2em', color: TL7.mut, display: 'flex', alignItems: 'center', gap: 14, textTransform: 'uppercase' }}>
      <span style={{ color: TL7.vio, fontWeight: 600 }}>M7 · CLASE 7.{claseNo}</span>
      <span style={{ width: 30, height: 1, background: TL7.lineS }} />
      <span>{claseName}</span>
      {label && <><span style={{ width: 30, height: 1, background: TL7.lineS }} /><span style={{ color: TL7.dim }}>{label}</span></>}
    </div>
  );
}
function ProgressM7({ timed }) {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', top: 40, right: 54, zIndex: 40, display: 'flex', gap: 6, alignItems: 'center' }}>
      {timed.map((sc, i) => {
        const active = t >= sc.start && t < sc.start + sc.dur;
        const done = t >= sc.start + sc.dur;
        return <div key={i} style={{ width: active ? 30 : 16, height: 3, borderRadius: 2, background: active ? TL7.cyan : (done ? TL7.vio : 'rgba(169,156,200,0.22)'), transition: 'width 200ms' }} />;
      })}
    </div>
  );
}

Object.assign(window, {
  TL7, DISP7, MONO7, pop7,
  SceneM7, CapM7, KickerM7, BracketsM7, GlobalBGM7,
  NodeM7, LinkM7, ArrowM7, PyramidM7, FrameM7, CodeM7, InfoCardM7, StatM7, TableM7,
  TitleCardM7, ClosingM7, ClassShellM7, ChromeM7, ProgressM7,
});
