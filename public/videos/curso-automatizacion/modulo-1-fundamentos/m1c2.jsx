// m1c2.jsx — "Magnitudes físicas industriales: presión, temperatura, caudal, nivel"
// After m1-lib.jsx. Exports SCENES_M1C2.

function S_Cuatro({ start, dur }) {
  const t = useTime(); const s = start;
  const mags = [
    { Icon: IcoGauge, mag: 'Presión', unit: 'Pa · bar · psi', ej: 'Fuerza del fluido sobre las paredes.', a: TL.blue },
    { Icon: IcoThermo, mag: 'Temperatura', unit: '°C · K', ej: 'Qué tan caliente está el proceso.', a: TL.clay },
    { Icon: IcoFlow, mag: 'Caudal', unit: 'm³/h · L/min', ej: 'Cuánto fluido pasa por segundo.', a: TL.blue },
    { Icon: IcoLevel, mag: 'Nivel', unit: '% · m', ej: 'Cuánto contiene un tanque.', a: TL.blue },
  ];
  const xs = [180, 610, 1040, 1470]; const w = 350;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Las 4 variables de proceso" y="12%" />
      <CapL start={s + 0.8} dur={2.2} size={50} weight={600} y="22%" width={1500}>Casi toda planta se reduce a cuatro medidas.</CapL>
      {mags.map((m, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.4, 0.55, 24);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: 400, width: w, height: 340, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '30px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <m.Icon c={m.a} t={t} />
            <div style={{ fontFamily: DISPL, fontSize: 38, fontWeight: 700, color: TL.ink }}>{m.mag}</div>
            <div style={{ fontFamily: MONOL, fontSize: 16, color: m.a, letterSpacing: '0.04em' }}>{m.unit}</div>
            <div style={{ fontFamily: DISPL, fontSize: 20, color: TL.mut, lineHeight: 1.4, marginTop: 'auto' }}>{m.ej}</div>
            <BracketsL color={m.a} size={14} thick={1.5} inset={-1} />
          </div>
        );
      })}
    </SceneL>
  );
}

// Las 4 en un mismo tanque
function S_Tanque({ start, dur }) {
  const t = useTime(); const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const B = TL.blue, C = TL.clay;
  const tankX = 760, tankY = 320, tankW = 360, tankH = 420;
  const flow = -(t * 30) % 24;
  const lvl = tankY + tankH * 0.42;
  const tanksO = seg(1.2), pipeO = seg(2.4);
  const tag = (cx, cy, code, name, color, o, dir = 'right') => (
    <g opacity={o}>
      <circle cx={cx} cy={cy} r="26" fill={TL.paper} stroke={color} strokeWidth="2.4" />
      <text x={cx} y={cy + 5} fill={color} fontFamily="IBM Plex Mono, monospace" fontSize="16" fontWeight="600" textAnchor="middle">{code}</text>
      <text x={dir === 'right' ? cx + 38 : cx - 38} y={cy + 5} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="22" fontWeight="600" textAnchor={dir === 'right' ? 'start' : 'end'}>{name}</text>
    </g>
  );
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Las cuatro, en un solo tanque" y="9%" />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* inlet pipe + flow */}
        <g opacity={pipeO}>
          <path d={`M 380 ${tankY + 60} H ${tankX}`} stroke="rgba(40,90,160,0.25)" strokeWidth="14" strokeLinecap="round" />
          <path d={`M 380 ${tankY + 60} H ${tankX}`} stroke={B} strokeWidth="4" strokeLinecap="round" strokeDasharray="12 12" strokeDashoffset={flow} />
          <path d={`M ${tankX + tankW} ${tankY + tankH - 50} H ${tankX + tankW + 380}`} stroke="rgba(40,90,160,0.25)" strokeWidth="14" strokeLinecap="round" />
          <path d={`M ${tankX + tankW} ${tankY + tankH - 50} H ${tankX + tankW + 380}`} stroke={B} strokeWidth="4" strokeLinecap="round" strokeDasharray="12 12" strokeDashoffset={flow} />
        </g>
        {/* tank */}
        <g opacity={tanksO}>
          <rect x={tankX} y={tankY} width={tankW} height={tankH} rx="14" fill={TL.paper} stroke={TL.ink} strokeWidth="2.6" />
          <rect x={tankX} y={lvl} width={tankW} height={tankY + tankH - lvl - 4} rx="10" fill="rgba(60,130,200,0.18)" />
          <line x1={tankX} y1={lvl} x2={tankX + tankW} y2={lvl} stroke={B} strokeWidth="2" strokeDasharray="4 5" />
        </g>
        {/* tags */}
        {tag(tankX, lvl, 'LT', 'Nivel', B, seg(3.2), 'left')}
        {tag(tankX + tankW, tankY + tankH - 4, 'PT', 'Presión', B, seg(4.0), 'right')}
        {tag(tankX + tankW / 2, tankY - 30, 'TT', 'Temperatura', C, seg(4.8), 'right')}
        {tag(420, tankY + 60, 'FT', 'Caudal', B, seg(5.6), 'left')}
      </svg>
      <CapL start={s + 7.2} dur={dur - 7.5} size={32} weight={500} color={TL.mut} y="92%" width={1500}>
        Un solo recipiente, cuatro instrumentos. Así empieza toda planta.
      </CapL>
    </SceneL>
  );
}

const SCENES_M1C2 = [
  { C: (p) => <TitleCardL {...p} claseNo={2} title="Magnitudes físicas industriales" dudur="14–16 min" objetivo="Conocer las cuatro variables que se miden y controlan en casi cualquier proceso." />, dur: 7, label: 'Apertura' },
  { C: S_Cuatro, dur: 12, label: 'Las 4 variables' },
  { C: S_Tanque, dur: 13, label: 'En un tanque' },
  { C: (p) => <ClosingL {...p} line="Presión, temperatura, caudal y nivel: el lenguaje físico de toda la industria." activity="Observa un calentador de agua o una olla a presión e identifica cuáles de las 4 variables están en juego." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M1C2 = SCENES_M1C2;
