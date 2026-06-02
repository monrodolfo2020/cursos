// m2c8.jsx — "Lectura e interpretación de un P&ID real"
// After m1-lib.jsx + m2-lib.jsx. Exports SCENES_M2C8.

// Un P&ID de lazo de nivel, anotado
function S_PID({ start, dur }) {
  const t = useTime(); const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const B = TL.blue, C = TL.clay;
  const tankX = 380, tankY = 380, tankW = 300, tankH = 330;
  const lvl = tankY + tankH * 0.42;
  const ctrlX = 1180, ctrlY = 360;
  const valveX = 1340, valveY = 760;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Leyendo un P&ID de verdad" y="8%" color={TEAL} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* process pipes */}
        {seg(5.2) > 0.05 && <ProcessPipe d={`M ${valveX} ${valveY + 30} V 900 H ${tankX + 60} V ${tankY + tankH}`} start={s + 5.2} t={t} color={B} />}
        {seg(1.6) > 0.05 && <ProcessPipe d={`M 160 ${tankY + 70} H ${tankX}`} start={s + 1.6} t={t} color={B} />}
        {/* tank */}
        <g opacity={seg(1.0)}>
          <rect x={tankX} y={tankY} width={tankW} height={tankH} rx="12" fill={TL.paper} stroke={TL.ink} strokeWidth="2.6" />
          <rect x={tankX} y={lvl} width={tankW} height={tankY + tankH - lvl - 4} rx="8" fill="rgba(232,150,70,0.20)" />
          <line x1={tankX} y1={lvl} x2={tankX + tankW} y2={lvl} stroke={B} strokeWidth="2" strokeDasharray="4 5" />
          <text x={tankX + tankW / 2} y={tankY - 16} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">TK-101</text>
        </g>
        {/* instruments */}
        {seg(2.4) > 0.05 && <ISABalloon cx={tankX + tankW} cy={lvl} r={40} code="LT" tag="101" kind="field" accent={TEAL} t={t} />}
        {seg(3.2) > 0.05 && <SignalPath d={`M ${tankX + tankW + 40} ${lvl} H ${ctrlX - 70}`} start={s + 3.2} t={t} color={TEAL} />}
        {seg(3.8) > 0.05 && <ISABalloon cx={ctrlX} cy={ctrlY + 70} r={58} code="LIC" tag="101" kind="panel" accent={TEAL} t={t} />}
        {seg(4.6) > 0.05 && <SignalPath d={`M ${ctrlX} ${ctrlY + 130} V ${valveY - 110}`} start={s + 4.6} t={t} color={C} />}
        {seg(5.0) > 0.05 && <ISABalloon cx={valveX} cy={valveY - 70} r={36} code="LV" tag="101" kind="field" accent={C} t={t} />}
        {seg(5.2) > 0.05 && (
          <g opacity={seg(5.2)}>
            <path d={`M ${valveX - 34} ${valveY - 26} L ${valveX + 34} ${valveY + 26} L ${valveX + 34} ${valveY - 26} L ${valveX - 34} ${valveY + 26} Z`} fill={TL.paper} stroke={TL.ink} strokeWidth="2.6" strokeLinejoin="round" />
          </g>
        )}
      </svg>
      {/* reading callouts */}
      <CapL start={s + 6.6} dur={2.4} size={32} weight={500} color={TL.ink} y="20%" width={1500}>
        Sigue el lazo 101: el <b style={{ color: TEAL }}>LT</b> mide, el <b style={{ color: TEAL }}>LIC</b> decide, la <b style={{ color: TL.clay }}>LV</b> actúa.
      </CapL>
      <CapL start={s + 9.2} dur={dur - 9.5} size={30} weight={500} color={TL.mut} y="93%" width={1500}>
        Un P&ID no se mira: se recorre, lazo por lazo.
      </CapL>
    </SceneL>
  );
}

// Pasos para leer cualquier P&ID
function S_Pasos({ start, dur }) {
  const t = useTime(); const s = start;
  const pasos = [
    { n: 1, k: 'Ubica los equipos', d: 'Tanques, bombas, intercambiadores.' },
    { n: 2, k: 'Sigue las tuberías', d: 'El camino del fluido principal.' },
    { n: 3, k: 'Identifica los lazos', d: 'Agrupa los tags por número.' },
    { n: 4, k: 'Lee cada instrumento', d: 'Globo + letras + ubicación.' },
  ];
  const xs = [180, 610, 1040, 1470]; const w = 360, cy = 560;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Cuatro pasos infalibles" y="13%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="25%" width={1500}>Cómo abordar cualquier P&ID.</CapL>
      {[0, 1, 2].map(i => {
        const ax = xs[i] + w, bx = xs[i + 1];
        const e = clamp((t - (s + 2.6 + (i + 1) * 0.5)) / 0.4, 0, 1);
        return (
          <svg key={i} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <line x1={ax - 18} y1={cy} x2={ax - 18 + (bx - ax + 18) * e} y2={cy} stroke={TEAL} strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" opacity="0.8" />
            <polygon points={`${bx - 12},${cy - 6} ${bx - 4},${cy} ${bx - 12},${cy + 6}`} fill={TEAL} opacity={e} />
          </svg>
        );
      })}
      {pasos.map((p, i) => {
        const { op, sc, ty } = popL(t, s + 2.4 + i * 0.5, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: cy - 110, width: w, height: 220, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
            <div style={{ fontFamily: MONOL, fontSize: 13, letterSpacing: '0.22em', color: TEAL }}>PASO 0{p.n}</div>
            <div style={{ fontFamily: DISPL, fontSize: 28, fontWeight: 700, color: TL.ink, lineHeight: 1.1 }}>{p.k}</div>
            <div style={{ fontFamily: DISPL, fontSize: 18, color: TL.mut, lineHeight: 1.3 }}>{p.d}</div>
          </div>
        );
      })}
    </SceneL>
  );
}

const SCENES_M2C8 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={8} title="Lectura de un P&ID real" dudur="18–20 min" objetivo="Recorrer un P&ID lazo por lazo y aplicar un método para interpretar cualquiera." />, dur: 7, label: 'Apertura' },
  { C: S_PID, dur: 16, label: 'El P&ID' },
  { C: S_Pasos, dur: 12, label: 'Método de lectura' },
  { C: (p) => <ClosingM2 {...p} line="Quien sabe leer un P&ID entiende la planta sin haberla pisado nunca." activity="Toma un P&ID de ejemplo del curso e identifica cuántos lazos de control contiene." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M2C8 = SCENES_M2C8;
