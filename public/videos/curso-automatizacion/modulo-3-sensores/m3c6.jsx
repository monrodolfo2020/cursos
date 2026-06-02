// m3c6.jsx — "Transmisor de presión diferencial (DP)"
// After m3-dark.jsx. Exports SCENES_M3C6.

// La celda DP: dos puertos, una membrana
function S_Celda({ start, dur }) {
  const t = useTime(); const s = start;
  const G = TEAL, R = TL.clay;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const cx = 960, cy = 540;
  const flex = 14 * Math.sin(t * 2);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="La celda diferencial" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="21%" width={1500}>Compara dos presiones y mide la diferencia.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* body */}
        <g opacity={seg(1.2)}>
          <rect x={cx - 160} y={cy - 150} width="320" height="300" rx="16" fill={TL.paper} stroke={TL.lineS} strokeWidth="2.6" />
          {/* diaphragm (flexing) */}
          <path d={`M ${cx} ${cy - 120} Q ${cx + flex} ${cy} ${cx} ${cy + 120}`} fill="none" stroke={TL.ink} strokeWidth="3" />
        </g>
        {/* High port */}
        {seg(2.2) > 0.05 && <g opacity={seg(2.2)}>
          <line x1={cx - 380} y1={cy} x2={cx - 160} y2={cy} stroke={R} strokeWidth="10" strokeLinecap="round" />
          <circle cx={cx - 400} cy={cy} r="34" fill={TL.paper} stroke={R} strokeWidth="2.6" />
          <text x={cx - 400} y={cy + 6} fill={R} fontFamily="Space Grotesk, sans-serif" fontSize="26" fontWeight="700" textAnchor="middle">H</text>
          <text x={cx - 400} y={cy - 56} fill={R} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">alta</text>
        </g>}
        {/* Low port */}
        {seg(3.0) > 0.05 && <g opacity={seg(3.0)}>
          <line x1={cx + 160} y1={cy} x2={cx + 380} y2={cy} stroke={G} strokeWidth="10" strokeLinecap="round" />
          <circle cx={cx + 400} cy={cy} r="34" fill={TL.paper} stroke={G} strokeWidth="2.6" />
          <text x={cx + 400} y={cy + 6} fill={G} fontFamily="Space Grotesk, sans-serif" fontSize="26" fontWeight="700" textAnchor="middle">L</text>
          <text x={cx + 400} y={cy - 56} fill={G} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">baja</text>
        </g>}
        {/* output */}
        {seg(4.0) > 0.05 && <g opacity={seg(4.0)}>
          <text x={cx} y={cy + 250} fill={TL.ink} fontFamily="IBM Plex Mono, monospace" fontSize="26" textAnchor="middle">ΔP = H − L  →  4–20 mA</text>
        </g>}
      </svg>
      <CapL start={s + 5.6} dur={dur - 5.9} size={30} weight={500} color={TL.mut} y="92%" width={1500}>
        La membrana se flexiona según la diferencia. Esa flexión se vuelve señal.
      </CapL>
    </SceneL>
  );
}

// Tres usos de la DP
function S_Usos({ start, dur }) {
  const t = useTime(); const s = start;
  const uses = [
    { k: 'Caudal', d: 'Mide la caída de presión en una placa orificio.', f: 'Q ∝ √ΔP', a: TEAL },
    { k: 'Nivel', d: 'Mide la presión hidrostática de la columna de líquido.', f: 'h = ΔP / ρg', a: TL.clay },
    { k: 'Presión', d: 'Mide directamente la diferencia entre dos puntos.', f: 'ΔP', a: TL.blue },
  ];
  const xs = [180, 800, 1420]; const w = 380;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Un instrumento, tres trabajos" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="22%" width={1500}>El transmisor más versátil de la planta.</CapL>
      {uses.map((it, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.45, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: 400, width: w, height: 340, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: DISPL, fontSize: 34, fontWeight: 700, color: it.a }}>{it.k}</div>
            <div style={{ fontFamily: DISPL, fontSize: 20, color: TL.mut, lineHeight: 1.4 }}>{it.d}</div>
            <div style={{ marginTop: 'auto', fontFamily: MONOL, fontSize: 24, fontWeight: 600, color: it.a, padding: '14px 0 0', borderTop: `1px solid ${TL.line}` }}>{it.f}</div>
          </div>
        );
      })}
    </SceneL>
  );
}

const SCENES_M3C6 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={6} title="Transmisor de presión diferencial" dudur="16–18 min" objetivo="Entender la celda DP y cómo un solo instrumento mide caudal, nivel y presión." />, dur: 7, label: 'Apertura' },
  { C: S_Celda, dur: 13, label: 'La celda DP' },
  { C: S_Usos, dur: 12, label: 'Sus 3 usos' },
  { C: (p) => <ClosingM2 {...p} line="Dominar la celda DP es dominar un tercio de la instrumentación de cualquier planta." activity="Dibuja cómo conectarías una DP para medir el nivel de un tanque cerrado presurizado." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C6 = SCENES_M3C6;
