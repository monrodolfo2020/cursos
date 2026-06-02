// m2c3.jsx — "Clasificación de instrumentos: sensores, transmisores, actuadores"
// After m1-lib.jsx + m2-lib.jsx. Exports SCENES_M2C3.

function S_Familias({ start, dur }) {
  const t = useTime(); const s = start;
  const fam = [
    { k: 'Sensores', role: 'Los que perciben', d: 'Detectan la variable física: temperatura, presión, nivel.', ej: 'Termopar · RTD · flotador', Icon: IcoGauge, a: TEAL },
    { k: 'Transmisores', role: 'Los que comunican', d: 'Convierten la medición en una señal estándar y la envían.', ej: 'Transmisor 4–20 mA', Icon: IcoChipL, a: TL.blue },
    { k: 'Actuadores', role: 'Los que ejecutan', d: 'Reciben la orden y modifican el proceso físico.', ej: 'Válvula · motor · bomba', Icon: IcoFlow, a: TL.clay },
  ];
  const xs = [180, 800, 1420]; const w = 380, cy = 560;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tres grandes familias" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={50} weight={600} y="22%" width={1500}>Todo instrumento cae en una de tres familias.</CapL>
      {[0, 1].map(i => {
        const ax = xs[i] + w, bx = xs[i + 1];
        const e = clamp((t - (s + 2.6 + (i + 1) * 0.5)) / 0.4, 0, 1);
        return (
          <svg key={i} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <line x1={ax - 18} y1={cy} x2={ax - 18 + (bx - ax + 18) * e} y2={cy} stroke={TEAL} strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" opacity="0.8" />
            <polygon points={`${bx - 12},${cy - 6} ${bx - 4},${cy} ${bx - 12},${cy + 6}`} fill={TEAL} opacity={e} />
          </svg>
        );
      })}
      {fam.map((f, i) => {
        const { op, sc, ty } = popL(t, s + 2.4 + i * 0.5, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: cy - 160, width: w, height: 330, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <f.Icon c={f.a} t={t} />
            <div style={{ fontFamily: DISPL, fontSize: 34, fontWeight: 700, color: TL.ink }}>{f.k}</div>
            <div style={{ fontFamily: MONOL, fontSize: 14, letterSpacing: '0.1em', color: f.a, textTransform: 'uppercase' }}>{f.role}</div>
            <div style={{ fontFamily: DISPL, fontSize: 19, color: TL.mut, lineHeight: 1.35 }}>{f.d}</div>
            <div style={{ marginTop: 'auto', fontFamily: MONOL, fontSize: 14, color: f.a, paddingTop: 10, borderTop: `1px solid ${TL.line}` }}>{f.ej}</div>
          </div>
        );
      })}
    </SceneL>
  );
}

function S_Cadena3({ start, dur }) {
  const t = useTime(); const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Cómo trabajan juntas" y="13%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="25%" width={1500}>La señal recorre las tres, en orden.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {seg(2.4) > 0.05 && <SignalPath d="M 360 560 H 760" start={s + 2.4} t={t} color={TEAL} />}
        {seg(3.6) > 0.05 && <SignalPath d="M 1060 560 H 1460" start={s + 3.6} t={t} color={TL.clay} />}
        {/* sensor */}
        <g opacity={seg(1.6)}>
          <circle cx={260} cy={560} r={70} fill={TL.paper} stroke={TEAL} strokeWidth="2.6" />
          <text x={260} y={555} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="26" fontWeight="700" textAnchor="middle">Sensor</text>
          <text x={260} y={585} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="14" textAnchor="middle">mide</text>
        </g>
        {/* transmitter */}
        <g opacity={seg(2.8)}>
          <circle cx={910} cy={560} r={80} fill={TL.paper} stroke={TL.blue} strokeWidth="2.6" />
          <text x={910} y={552} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="24" fontWeight="700" textAnchor="middle">Transmisor</text>
          <text x={910} y={582} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="13" textAnchor="middle">4–20 mA</text>
        </g>
        {/* actuator */}
        <g opacity={seg(4.0)}>
          <circle cx={1560} cy={560} r={70} fill={TL.paper} stroke={TL.clay} strokeWidth="2.6" />
          <text x={1560} y={555} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="24" fontWeight="700" textAnchor="middle">Actuador</text>
          <text x={1560} y={585} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="14" textAnchor="middle">ejecuta</text>
        </g>
      </svg>
      <CapL start={s + 5.4} dur={dur - 5.7} size={30} weight={500} color={TL.mut} y="84%" width={1500}>
        El sensor siente, el transmisor traduce, el actuador responde.
      </CapL>
    </SceneL>
  );
}

const SCENES_M2C3 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={3} title="Clasificación de instrumentos" dudur="12–14 min" objetivo="Distinguir sensores, transmisores y actuadores, y cómo se encadenan en un lazo." />, dur: 7, label: 'Apertura' },
  { C: S_Familias, dur: 13, label: 'Las 3 familias' },
  { C: S_Cadena3, dur: 12, label: 'Cómo se encadenan' },
  { C: (p) => <ClosingM2 {...p} line="Sensar, transmitir, actuar: la trinidad sobre la que se construye todo lazo de control." activity="Elige un electrodoméstico y lista qué hace de sensor, qué de transmisor y qué de actuador." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M2C3 = SCENES_M2C3;
