// m3c2.jsx — "RTDs y PT100"
// After m3-dark.jsx. Exports SCENES_M3C2.

// Resistencia vs temperatura (lineal)
function S_Lineal({ start, dur }) {
  const t = useTime(); const s = start;
  const G = TEAL;
  const x0 = 360, x1 = 1360, y0 = 760, y1 = 300;
  const draw = Easing.easeOutCubic(clamp((t - (s + 1.6)) / 1.4, 0, 1));
  // marker dot moving along the line
  const mp = clamp((t - (s + 3.4)) / 4, 0, 1);
  const mx = x0 + (x1 - x0) * mp, my = y0 + (y1 - y0) * mp;
  const ohms = (100 + mp * 138).toFixed(0);
  const temp = (mp * 600).toFixed(0);
  const p100 = popL(t, s + 5.4, 0.6, 0);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Resistencia que sube con la temperatura" y="10%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="20%" width={1500}>El RTD: predecible y casi perfectamente lineal.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* axes */}
        <line x1={x0} y1={y0} x2={x1 + 40} y2={y0} stroke={TL.lineS} strokeWidth="2" />
        <line x1={x0} y1={y0} x2={x0} y2={y1 - 30} stroke={TL.lineS} strokeWidth="2" />
        <text x={x1 + 30} y={y0 + 36} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="end">Temperatura →</text>
        <text x={x0 - 20} y={y1 - 20} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle">Ω</text>
        {/* the line */}
        <line x1={x0} y1={y0} x2={x0 + (x1 - x0) * draw} y2={y0 + (y1 - y0) * draw} stroke={G} strokeWidth="4" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${G})` }} />
        {/* moving marker */}
        {mp > 0 && draw > 0.98 && <g>
          <circle cx={mx} cy={my} r="9" fill={G} />
          <line x1={mx} y1={my} x2={mx} y2={y0} stroke={G} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.5" />
          <line x1={mx} y1={my} x2={x0} y2={my} stroke={G} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.5" />
          <text x={mx + 16} y={my - 12} fill={TL.ink} fontFamily="IBM Plex Mono, monospace" fontSize="22" fontWeight="600">{ohms} Ω · {temp}°C</text>
        </g>}
      </svg>
      {/* PT100 callout */}
      <div style={{ position: 'absolute', left: 1380, top: 420, width: 440, opacity: p100.op, transform: `scale(${p100.sc})`, transformOrigin: 'left center' }}>
        <div style={{ borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadowSm, padding: '22px 26px' }}>
          <div style={{ fontFamily: DISPL, fontSize: 40, fontWeight: 700, color: TEAL }}>PT100</div>
          <div style={{ fontFamily: DISPL, fontSize: 20, color: TL.mut, lineHeight: 1.4, marginTop: 8 }}>Platino que mide <b style={{ color: TL.ink }}>100 Ω a 0 °C</b>. El estándar de precisión.</div>
        </div>
      </div>
      <CapL start={s + 9.4} dur={dur - 9.7} size={30} weight={500} color={TL.mut} y="92%" width={1500}>
        Más caro que un termopar, pero mucho más exacto y estable.
      </CapL>
    </SceneL>
  );
}

// RTD vs Termopar
function S_Versus({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    ['Rango', 'Hasta ~600 °C', 'Hasta ~1700 °C'],
    ['Precisión', 'Muy alta', 'Media'],
    ['Linealidad', 'Excelente', 'Aceptable'],
    ['Costo', 'Mayor', 'Menor'],
    ['Respuesta', 'Más lenta', 'Rápida'],
  ];
  const cardL = popL(t, s + 1.2, 0.6, 22);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="RTD vs termopar" y="12%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="23%" width={1500}>Cuándo elegir cada uno.</CapL>
      <div style={{ position: 'absolute', left: '50%', top: '58%', transform: 'translate(-50%,-50%)', width: 1200, opacity: cardL.op, transform: `translate(-50%,calc(-50% + ${cardL.ty}px))` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL.lineS}` }}>
          <div style={{ background: 'transparent', padding: '16px 22px' }} />
          <div style={{ background: TEAL, color: '#06120c', fontFamily: DISPL, fontSize: 24, fontWeight: 700, padding: '16px 22px', textAlign: 'center' }}>RTD / PT100</div>
          <div style={{ background: TL.clay, color: '#1a0807', fontFamily: DISPL, fontSize: 24, fontWeight: 700, padding: '16px 22px', textAlign: 'center' }}>Termopar</div>
          {rows.map((r, i) => {
            const o = clamp((t - (s + 2.4 + i * 0.35)) / 0.5, 0, 1);
            return (
              <React.Fragment key={i}>
                <div style={{ opacity: o, background: 'rgba(255,255,255,0.02)', fontFamily: MONOL, fontSize: 16, letterSpacing: '0.08em', color: TL.mut, textTransform: 'uppercase', padding: '18px 22px', borderTop: `1px solid ${TL.line}` }}>{r[0]}</div>
                <div style={{ opacity: o, fontFamily: DISPL, fontSize: 22, color: TL.ink, padding: '18px 22px', textAlign: 'center', borderTop: `1px solid ${TL.line}`, borderLeft: `1px solid ${TL.line}` }}>{r[1]}</div>
                <div style={{ opacity: o, fontFamily: DISPL, fontSize: 22, color: TL.ink, padding: '18px 22px', textAlign: 'center', borderTop: `1px solid ${TL.line}`, borderLeft: `1px solid ${TL.line}` }}>{r[2]}</div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </SceneL>
  );
}

const SCENES_M3C2 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={2} title="RTDs y PT100" dudur="14–16 min" objetivo="Entender cómo el platino mide temperatura por resistencia y cuándo preferirlo al termopar." />, dur: 7, label: 'Apertura' },
  { C: S_Lineal, dur: 14, label: 'Resistencia vs temp' },
  { C: S_Versus, dur: 12, label: 'RTD vs termopar' },
  { C: (p) => <ClosingM2 {...p} line="Cuando la precisión manda, el PT100 es el rey. 100 ohmios que no mienten." activity="Un proceso farmacéutico exige ±0.1 °C. ¿RTD o termopar? Justifica tu elección." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C2 = SCENES_M3C2;
