// m3c3.jsx — "Termistores e infrarrojo industrial"
// After m3-dark.jsx. Exports SCENES_M3C3.

// Curva NTC: resistencia cae bruscamente con la temperatura
function S_NTC({ start, dur }) {
  const t = useTime(); const s = start;
  const G = TEAL, R = TL.clay;
  const x0 = 340, x1 = 1180, y0 = 760, yTop = 300;
  const draw = clamp((t - (s + 1.6)) / 1.6, 0, 1);
  // exponential decay curve points
  const pts = [];
  const N = 60;
  for (let i = 0; i <= N * draw; i++) {
    const f = i / N;
    const x = x0 + f * (x1 - x0);
    const y = yTop + (y0 - yTop) * (1 - Math.exp(-f * 3.2)) / (1 - Math.exp(-3.2));
    pts.push(`${x},${y}`);
  }
  const cardR = popL(t, s + 4.0, 0.6, 0);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="El termistor: ultrasensible" y="10%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="20%" width={1500}>Pequeños cambios de temperatura, grandes cambios de resistencia.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={x0} y1={y0} x2={x1 + 40} y2={y0} stroke={TL.lineS} strokeWidth="2" />
        <line x1={x0} y1={y0} x2={x0} y2={yTop - 20} stroke={TL.lineS} strokeWidth="2" />
        <text x={x1 + 30} y={y0 + 36} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="end">Temperatura →</text>
        <text x={x0 - 22} y={yTop - 28} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle">Ω</text>
        <polyline points={pts.join(' ')} fill="none" stroke={G} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 6px ${G})` }} />
        <text x={x0 + 120} y={yTop + 40} fill={G} fontFamily="Space Grotesk, sans-serif" fontSize="22" fontWeight="700">NTC</text>
      </svg>
      <div style={{ position: 'absolute', left: 1300, top: 420, width: 500, opacity: cardR.op, transform: `scale(${cardR.sc})`, transformOrigin: 'left center' }}>
        <div style={{ borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadowSm, padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontFamily: DISPL, fontSize: 24, fontWeight: 700, color: TEAL }}>NTC vs PTC</div>
          <div style={{ fontFamily: DISPL, fontSize: 19, color: TL.mut, lineHeight: 1.4 }}><b style={{ color: TL.ink }}>NTC:</b> la resistencia baja al calentarse.</div>
          <div style={{ fontFamily: DISPL, fontSize: 19, color: TL.mut, lineHeight: 1.4 }}><b style={{ color: TL.ink }}>PTC:</b> sube al calentarse — útil como protección.</div>
        </div>
      </div>
      <CapL start={s + 7.0} dur={dur - 7.3} size={30} weight={500} color={TL.mut} y="92%" width={1500}>
        Barato y sensible, pero solo para rangos estrechos.
      </CapL>
    </SceneL>
  );
}

// Infrarrojo: medición sin contacto
function S_IR({ start, dur }) {
  const t = useTime(); const s = start;
  const G = TEAL, R = TL.clay;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const sensorX = 360, sensorY = 540, objX = 1400, objY = 540;
  const beam = clamp((t - (s + 2.0)) / 1.0, 0, 1);
  const wavePhase = (t * 2) % 1;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Infrarrojo: medir sin tocar" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="21%" width={1500}>Para lo que está muy caliente, en movimiento o inaccesible.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* sensor */}
        <g opacity={seg(1.2)}>
          <rect x={sensorX - 70} y={sensorY - 50} width="140" height="100" rx="12" fill={TL.paper} stroke={G} strokeWidth="2.6" />
          <polygon points={`${sensorX + 70},${sensorY - 30} ${sensorX + 110},${sensorY - 50} ${sensorX + 110},${sensorY + 50} ${sensorX + 70},${sensorY + 30}`} fill={TL.paper} stroke={G} strokeWidth="2.6" strokeLinejoin="round" />
          <text x={sensorX} y={sensorY + 6} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="20" fontWeight="700" textAnchor="middle">IR</text>
        </g>
        {/* IR beam (concentric arcs traveling) */}
        {beam > 0.05 && [0, 1, 2, 3].map(i => {
          const f = ((wavePhase + i * 0.25) % 1);
          const x = sensorX + 110 + f * (objX - sensorX - 200) * beam;
          return <path key={i} d={`M ${x} ${sensorY - 50} Q ${x + 30} ${sensorY} ${x} ${sensorY + 50}`} fill="none" stroke={R} strokeWidth="3" opacity={(1 - f) * 0.8 * beam} />;
        })}
        {/* hot object */}
        <g opacity={seg(1.6)}>
          <circle cx={objX} cy={objY} r={70 + 6 * Math.sin(t * 3)} fill={R} opacity="0.18" />
          <rect x={objX - 50} y={objY - 60} width="100" height="120" rx="8" fill={TL.paper} stroke={R} strokeWidth="2.6" />
          <text x={objX} y={objY - 90} fill={R} fontFamily="IBM Plex Mono, monospace" fontSize="20" textAnchor="middle" fontWeight="600">+850 °C</text>
        </g>
      </svg>
      <CapL start={s + 6.6} dur={dur - 6.9} size={30} weight={500} color={TL.mut} y="90%" width={1500}>
        Mide la radiación térmica del objeto. Sin contacto, sin desgaste.
      </CapL>
    </SceneL>
  );
}

const SCENES_M3C3 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={3} title="Termistores e infrarrojo industrial" dudur="12–14 min" objetivo="Conocer dos sensores especiales: el termistor ultrasensible y la medición infrarroja sin contacto." />, dur: 7, label: 'Apertura' },
  { C: S_NTC, dur: 13, label: 'Termistor NTC' },
  { C: S_IR, dur: 12, label: 'Infrarrojo' },
  { C: (p) => <ClosingM2 {...p} line="Cada sensor de temperatura tiene su nicho: el termistor afina, el infrarrojo alcanza lo imposible." activity="Menciona 3 situaciones donde NO podrías usar contacto y necesitarías un sensor infrarrojo." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C3 = SCENES_M3C3;
