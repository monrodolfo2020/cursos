// m2c5.jsx — "Rangos, spans, errores y calibración básica"
// After m1-lib.jsx + m2-lib.jsx. Exports SCENES_M2C5.

// Rango y span
function S_Span({ start, dur }) {
  const t = useTime(); const s = start;
  const x0 = 400, x1 = 1520, y = 500;
  const loV = 0, hiV = 150;
  const draw = Easing.easeOutCubic(clamp((t - (s + 1.4)) / 1.0, 0, 1));
  const spanO = popL(t, s + 3.2, 0.6, 0);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Rango y span" y="13%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="24%" width={1500}>Dos palabras que se confunden siempre.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={x0} y1={y} x2={x0 + (x1 - x0) * draw} y2={y} stroke={TL.ink} strokeWidth="4" strokeLinecap="round" />
        {/* endpoints */}
        {draw > 0.02 && <g>
          <line x1={x0} y1={y - 20} x2={x0} y2={y + 20} stroke={TEAL} strokeWidth="4" />
          <text x={x0} y={y - 40} fill={TEAL} fontFamily="Space Grotesk, sans-serif" fontSize="34" fontWeight="700" textAnchor="middle">0</text>
          <text x={x0} y={y + 56} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle">LRV · inferior</text>
        </g>}
        {draw > 0.98 && <g>
          <line x1={x1} y1={y - 20} x2={x1} y2={y + 20} stroke={TEAL} strokeWidth="4" />
          <text x={x1} y={y - 40} fill={TEAL} fontFamily="Space Grotesk, sans-serif" fontSize="34" fontWeight="700" textAnchor="middle">150 °C</text>
          <text x={x1} y={y + 56} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle">URV · superior</text>
        </g>}
        {/* span bracket */}
        <g opacity={spanO.op}>
          <path d={`M ${x0} ${y + 110} V ${y + 130} H ${x1} V ${y + 110}`} fill="none" stroke={TL.clay} strokeWidth="2.5" />
          <text x={(x0 + x1) / 2} y={y + 172} fill={TL.clay} fontFamily="Space Grotesk, sans-serif" fontSize="28" fontWeight="700" textAnchor="middle">SPAN = 150 °C</text>
        </g>
      </svg>
      <CapL start={s + 4.4} dur={dur - 4.7} size={30} weight={500} color={TL.mut} y="83%" width={1500}>
        <b style={{ color: TEAL }}>Rango</b> son los extremos (0 a 150). El <b style={{ color: TL.clay }}>span</b> es la distancia entre ellos.
      </CapL>
    </SceneL>
  );
}

// Tipos de error
function S_Error({ start, dur }) {
  const t = useTime(); const s = start;
  const errs = [
    { k: 'Error de cero', d: 'Toda la curva está desplazada arriba o abajo.', a: TL.blue },
    { k: 'Error de span', d: 'La pendiente está mal: crece de más o de menos.', a: TL.clay },
    { k: 'No linealidad', d: 'La curva se desvía y deja de ser recta.', a: TEAL },
  ];
  const xs = [180, 800, 1420]; const w = 380;
  const plot = (kind, color) => {
    const pts = [];
    for (let i = 0; i <= 20; i++) {
      const x = 30 + (i / 20) * 280;
      let yv;
      const f = i / 20;
      if (kind === 0) yv = 170 - (f * 140) - 30;            // zero offset (parallel, shifted up)
      else if (kind === 1) yv = 170 - (f * 200);            // span (steeper)
      else yv = 170 - (f * 140) - 40 * Math.sin(f * Math.PI); // nonlinear bow
      pts.push(`${x},${yv}`);
    }
    const ideal = [];
    for (let i = 0; i <= 20; i++) { const x = 30 + (i / 20) * 280; const yv = 170 - (i / 20) * 140; ideal.push(`${x},${yv}`); }
    return (<svg viewBox="0 0 340 200" style={{ width: '100%', height: 200 }}>
      <line x1="30" y1="170" x2="310" y2="170" stroke={TL.line} strokeWidth="1.5" />
      <line x1="30" y1="30" x2="30" y2="170" stroke={TL.line} strokeWidth="1.5" />
      <polyline points={ideal.join(' ')} fill="none" stroke={TL.dim} strokeWidth="2" strokeDasharray="4 5" />
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);
  };
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Los tres errores típicos" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="21%" width={1500}>Calibrar es corregir estos tres.</CapL>
      {errs.map((it, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.45, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: 360, width: w, height: 400, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: DISPL, fontSize: 28, fontWeight: 700, color: it.a }}>{it.k}</div>
            {plot(i, it.a)}
            <div style={{ fontFamily: DISPL, fontSize: 19, color: TL.mut, lineHeight: 1.35, marginTop: 'auto' }}>{it.d}</div>
          </div>
        );
      })}
      <CapL start={s + 5.0} dur={dur - 5.3} size={26} weight={500} color={TL.dim} y="90%" width={1500}>
        La línea punteada es el comportamiento ideal.
      </CapL>
    </SceneL>
  );
}

const SCENES_M2C5 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={5} title="Rangos, spans, errores y calibración" dudur="16–18 min" objetivo="Diferenciar rango y span, reconocer los errores típicos y entender por qué se calibra." />, dur: 7, label: 'Apertura' },
  { C: S_Span, dur: 13, label: 'Rango y span' },
  { C: S_Error, dur: 13, label: 'Tipos de error' },
  { C: (p) => <ClosingM2 {...p} line="Un instrumento sin calibrar miente con elegancia. Calibrar es devolverle la verdad." activityLabel="Práctica" activity="Con un transmisor de 0–150 °C, calcula a qué temperatura corresponde una señal de 12 mA." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M2C5 = SCENES_M2C5;
