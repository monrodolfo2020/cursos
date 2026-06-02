// m2c2.jsx — "Variables de proceso: PV, SP, CV — el triángulo del control"
// After m1-lib.jsx + m2-lib.jsx. Exports SCENES_M2C2.

// Definiciones PV/SP/CV
function S_Defs({ start, dur }) {
  const t = useTime(); const s = start;
  const defs = [
    { k: 'PV', name: 'Variable de proceso', d: 'Lo que mides ahora mismo.', ex: 'la temperatura actual: 72 °C', a: TEAL },
    { k: 'SP', name: 'Setpoint', d: 'El valor que deseas alcanzar.', ex: 'la temperatura objetivo: 80 °C', a: TL.blue },
    { k: 'CV', name: 'Variable de control', d: 'La acción que aplicas para lograrlo.', ex: 'abrir la válvula de vapor 40 %', a: TL.clay },
  ];
  const xs = [200, 790, 1380]; const w = 340;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tres siglas que rigen todo control" y="12%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={50} weight={600} y="23%" width={1500}>El triángulo del control.</CapL>
      {defs.map((it, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.45, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: 400, width: w, height: 360, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '30px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: DISPL, fontSize: 64, fontWeight: 700, color: it.a, lineHeight: 1 }}>{it.k}</div>
            <div style={{ fontFamily: DISPL, fontSize: 26, fontWeight: 600, color: TL.ink }}>{it.name}</div>
            <div style={{ fontFamily: DISPL, fontSize: 21, color: TL.mut, lineHeight: 1.35 }}>{it.d}</div>
            <div style={{ marginTop: 'auto', fontFamily: MONOL, fontSize: 15, color: it.a, lineHeight: 1.4, paddingTop: 12, borderTop: `1px solid ${TL.line}` }}>Ej. {it.ex}</div>
            <BracketsL color={it.a} size={14} thick={1.5} inset={-1} />
          </div>
        );
      })}
    </SceneL>
  );
}

// El lazo de control cerrado, animado
function S_Lazo({ start, dur }) {
  const t = useTime(); const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const B = TL.blue, C = TL.clay;
  // layout
  const tankX = 250, tankY = 360, tankW = 280, tankH = 320;
  const lvl = tankY + tankH * 0.4;
  const ctrlX = 1120, ctrlY = 360, ctrlW = 320, ctrlH = 200;
  const valveX = 1280, valveY = 760;
  const tankO = seg(1.0), sensO = seg(2.2), sigO = seg(3.2), ctrlO = seg(4.4), cvO = seg(5.6), procO = seg(6.6);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="El lazo cerrado de control" y="9%" color={TEAL} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* tank */}
        <g opacity={tankO}>
          <rect x={tankX} y={tankY} width={tankW} height={tankH} rx="12" fill={TL.paper} stroke={TL.ink} strokeWidth="2.6" />
          <rect x={tankX} y={lvl} width={tankW} height={tankY + tankH - lvl - 4} rx="8" fill="rgba(232,150,70,0.20)" />
          <line x1={tankX} y1={lvl} x2={tankX + tankW} y2={lvl} stroke={B} strokeWidth="2" strokeDasharray="4 5" />
          <text x={tankX + tankW / 2} y={tankY - 16} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">PROCESO</text>
        </g>
        {/* sensor/transmitter on tank */}
        {sensO > 0.05 && <ISABalloon cx={tankX + tankW} cy={lvl} r={40} code="LT" tag="101" kind="field" accent={TEAL} t={t} pulse />}
        {/* signal PV: transmitter -> controller */}
        {sigO > 0.05 && <SignalPath d={`M ${tankX + tankW + 40} ${lvl} H ${ctrlX}`} start={s + 3.2} t={t} color={TEAL} />}
        {/* controller */}
        <g opacity={ctrlO}>
          <rect x={ctrlX} y={ctrlY} width={ctrlW} height={ctrlH} rx="12" fill={TL.paper} stroke={TEAL} strokeWidth="2.6" />
          <text x={ctrlX + ctrlW / 2} y={ctrlY + 70} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="40" fontWeight="700" textAnchor="middle">LIC</text>
          <text x={ctrlX + ctrlW / 2} y={ctrlY + 104} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="14" textAnchor="middle" letterSpacing="1">CONTROLADOR</text>
          <text x={ctrlX + ctrlW / 2} y={ctrlY + 150} fill={B} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">SP = 60%  ·  PV = 40%</text>
        </g>
        {/* CV: controller -> valve */}
        {cvO > 0.05 && <SignalPath d={`M ${ctrlX + ctrlW / 2} ${ctrlY + ctrlH} V ${valveY - 40}`} start={s + 5.6} t={t} color={C} />}
        {/* valve */}
        {cvO > 0.05 && (
          <g opacity={cvO}>
            <path d={`M ${valveX - 34} ${valveY - 26} L ${valveX + 34} ${valveY + 26} L ${valveX + 34} ${valveY - 26} L ${valveX - 34} ${valveY + 26} Z`} fill={TL.paper} stroke={TL.ink} strokeWidth="2.6" strokeLinejoin="round" />
            <ISABalloon cx={valveX} cy={valveY - 110} r={34} code="LV" tag="101" kind="field" accent={C} t={t} />
            <text x={valveX + 56} y={valveY + 6} fill={C} fontFamily="Space Grotesk, sans-serif" fontSize="22" fontWeight="700">CV</text>
          </g>
        )}
        {/* process feedback: valve -> tank (close the loop) */}
        {procO > 0.05 && <ProcessPipe d={`M ${valveX} ${valveY + 30} V 920 H ${tankX + 60} V ${tankY + tankH}`} start={s + 6.6} t={t} color={B} />}
      </svg>
      {/* loop labels */}
      <CapL start={s + 3.4} dur={2.0} size={22} mono weight={500} color={TEAL} x="830px" y="430px" width={260} ls="0.04em">PV →</CapL>
      <CapL start={s + 8.0} dur={dur - 8.3} size={32} weight={500} color={TL.mut} y="95%" width={1500}>
        Mide, compara con el setpoint, corrige. Una y otra vez, sin parar.
      </CapL>
    </SceneL>
  );
}

const SCENES_M2C2 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={2} title="Variables de proceso: PV, SP y CV" dudur="14–16 min" objetivo="Dominar el triángulo del control y entender cómo se cierra un lazo automático." />, dur: 7, label: 'Apertura' },
  { C: S_Defs, dur: 12, label: 'PV · SP · CV' },
  { C: S_Lazo, dur: 15, label: 'El lazo cerrado' },
  { C: (p) => <ClosingM2 {...p} line="PV, SP y CV: tres valores que, girando en lazo, mantienen toda planta bajo control." activity="Piensa en el termostato de un aire acondicionado e identifica cuál es su PV, su SP y su CV." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M2C2 = SCENES_M2C2;
