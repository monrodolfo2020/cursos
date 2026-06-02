// clase7.jsx — "Conoce una planta industrial real"
// After clase-lib.jsx. Exports SCENES_C7.

// Planta de tratamiento de agua (P&ID animado)
function S7_Planta({ start, dur }) {
  const t = useTime(); const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const flow = -(t * 38) % 26;
  const C = T.cyan, A = T.amber;
  const tanks = seg(1.4), pipes = seg(2.8), pumps = seg(4.0), sensors = seg(5.2), ctrl = seg(6.6);
  const Tank = (x, y, w, h, label, op) => (
    <g opacity={op}>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="rgba(20,40,64,0.4)" stroke={C} strokeWidth="2.4" />
      <rect x={x} y={y + h * 0.45} width={w} height={h * 0.55 - 6} rx="8" fill="rgba(40,120,180,0.28)" />
      <line x1={x} y1={y + h * 0.45} x2={x + w} y2={y + h * 0.45} stroke={C} strokeWidth="1.6" strokeDasharray="3 5" opacity="0.7" />
      <text x={x + w / 2} y={y - 16} fill={T.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle" letterSpacing="1">{label}</text>
    </g>
  );
  const Pump = (cx, cy, op) => (
    <g opacity={op}>
      <circle cx={cx} cy={cy} r="26" fill="rgba(20,40,64,0.7)" stroke={A} strokeWidth="2.4" />
      <path d={`M ${cx} ${cy - 14} A 14 14 0 1 1 ${cx - 14} ${cy}`} fill="none" stroke={A} strokeWidth="2.4" />
      <polygon points={`${cx - 14},${cy - 5} ${cx - 14},${cy + 5} ${cx - 6},${cy}`} fill={A} />
    </g>
  );
  const Sensor = (cx, cy, tag, op) => (
    <g opacity={op}>
      <line x1={cx} y1={cy} x2={cx} y2={cy + 64} stroke={C} strokeWidth="1.4" strokeDasharray="2 5" opacity="0.6" />
      <circle cx={cx} cy={cy} r="22" fill="rgba(10,18,30,0.95)" stroke={C} strokeWidth="2" />
      <circle cx={cx} cy={cy} r="22" fill="none" stroke={C} strokeWidth="2" opacity={0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 4 + cx))} />
      <text x={cx} y={cy + 5} fill={C} fontFamily="IBM Plex Mono, monospace" fontSize="14" textAnchor="middle" fontWeight="600">{tag}</text>
    </g>
  );
  const pipe = `M 330 760 L 330 840 L 470 840 L 470 760 M 470 840 L 760 840 L 760 760
                M 1000 760 L 1000 840 L 1140 840 L 1140 760 M 1140 840 L 1430 840 L 1430 760`;
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Una planta de tratamiento de agua" y="8%" />
      <Cap start={s + 0.6} dur={3.2} size={44} weight={500} color={T.mut} y="17%" width={1600}>
        La misma que automatizarás en el proyecto final.
      </Cap>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <path d={pipe} fill="none" stroke="rgba(120,165,220,0.25)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity={pipes} />
        <path d={pipe} fill="none" stroke={C} strokeWidth="4" strokeLinecap="round" strokeDasharray="14 12" strokeDashoffset={flow} opacity={pipes * 0.95} style={{ filter: `drop-shadow(0 0 4px ${C})` }} />
        {Tank(230, 560, 200, 200, 'POZO', tanks)}
        {Tank(660, 540, 200, 220, 'REACTOR', tanks)}
        {Tank(1330, 560, 200, 200, 'CLARIFICADO', tanks)}
        {Pump(470, 840, pumps)}
        {Pump(1140, 840, pumps)}
        {Sensor(405, 540, 'LT', sensors)}
        {Sensor(620, 840, 'FT', sensors)}
        {Sensor(845, 520, 'LT', sensors)}
        {Sensor(1290, 840, 'PT', sensors)}
        <g opacity={ctrl}>
          <rect x="840" y="900" width="220" height="118" rx="8" fill="rgba(20,40,64,0.85)" stroke={C} strokeWidth="2.4" />
          <text x="950" y="956" fill={T.ink} fontFamily="Space Grotesk, sans-serif" fontSize="34" fontWeight="700" textAnchor="middle">PLC</text>
          <text x="950" y="986" fill={T.mut} fontFamily="IBM Plex Mono, monospace" fontSize="13" textAnchor="middle" letterSpacing="2">CONTROLADOR</text>
          {[875, 905, 935, 965, 995, 1025].map((x, i) => (<rect key={i} x={x} y="906" width="16" height="6" rx="2" fill={C} opacity={0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 5 + i))} />))}
          {[[405, 562], [620, 818], [845, 542], [1290, 818]].map((p, i) => (<line key={i} x1={p[0]} y1={p[1]} x2={950} y2={900} stroke={A} strokeWidth="1.2" strokeDasharray="2 6" opacity={ctrl * 0.5} />))}
        </g>
      </svg>
      <Cap start={s + 8.4} dur={dur - 8.7} size={34} weight={500} color={T.ink} y="15.5%" width={1600}>
        Tanques, bombas, sensores y un PLC — todo lo que estudiarás, en un solo lugar.
      </Cap>
    </Scene>
  );
}

// El recorrido del dato
function S7_Recorrido({ start, dur }) {
  const t = useTime(); const s = start;
  const stages = [
    { k: 'Sensor', d: 'mide en campo', a: T.cyan },
    { k: '4–20 mA', d: 'la señal viaja', a: T.amber },
    { k: 'Transmisor', d: 'la envía', a: T.cyan },
    { k: 'PLC', d: 'decide', a: T.cyan },
    { k: 'OPC-UA', d: 'la red conecta', a: T.amber },
    { k: 'SCADA', d: 'lo ves en pantalla', a: T.cyan },
  ];
  const n = stages.length, x0 = 150, gapX = (1920 - 300) / (n - 1), cy = 560;
  const journey = clamp((t - (s + 2.2)) / 6.5, 0, 1);
  const pulseX = x0 + journey * (gapX * (n - 1));
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="El recorrido del dato" y="14%" />
      <Cap start={s + 0.8} dur={2.2} size={52} weight={600} y="26%" width={1500}>Del sensor a tu pantalla, en milisegundos.</Cap>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={x0} y1={cy} x2={x0 + gapX * (n - 1)} y2={cy} stroke={T.line} strokeWidth="2" strokeDasharray="2 8" />
        <line x1={x0} y1={cy} x2={pulseX} y2={cy} stroke={T.cyan} strokeWidth="2.5" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 5px ${T.cyan})` }} />
        {journey > 0 && journey < 1 && <circle cx={pulseX} cy={cy} r="8" fill={T.cyan} style={{ filter: `drop-shadow(0 0 10px ${T.cyan})` }} />}
      </svg>
      {stages.map((st, i) => {
        const x = x0 + i * gapX;
        const appear = s + 1.4 + i * 0.4;
        const { op, sc } = pop(t, appear, 0.5, 0);
        const lit = pulseX >= x - 6;
        return (
          <div key={i}>
            <div style={{ position: 'absolute', left: x, top: cy, transform: `translate(-50%,-50%) scale(${sc})`, opacity: op, width: 26, height: 26, borderRadius: '50%', border: `2px solid ${lit ? st.a : T.dim}`, background: lit ? st.a : 'rgba(10,16,26,0.9)', boxShadow: lit ? `0 0 16px ${st.a}` : 'none' }} />
            <div style={{ position: 'absolute', left: x, top: cy + (i % 2 ? 56 : -96), transform: 'translateX(-50%)', opacity: op, textAlign: 'center', width: 220 }}>
              <div style={{ fontFamily: DISP, fontSize: 28, fontWeight: 700, color: lit ? T.ink : T.mut }}>{st.k}</div>
              <div style={{ fontFamily: MONO, fontSize: 14, color: T.mut, marginTop: 4, letterSpacing: '0.02em' }}>{st.d}</div>
            </div>
          </div>
        );
      })}
      <Cap start={s + 9.4} dur={dur - 9.7} size={36} weight={600} color={T.cyan} y="86%" width={1500}>
        Esto es exactamente lo que serás capaz de diseñar.
      </Cap>
    </Scene>
  );
}

const SCENES_C7 = [
  { C: (p) => <TitleCard {...p} claseNo={7} title="Conoce una planta industrial real" dudur="20–25 min" objetivo="Conectar todo lo visto con la realidad: identificar cada elemento en una planta de verdad." />, dur: 7, label: 'Apertura' },
  { C: S7_Planta, dur: 14, label: 'La planta' },
  { C: S7_Recorrido, dur: 14, label: 'El recorrido del dato' },
  { C: (p) => <Closing {...p} line="Hoy lo observas. Al final del curso, lo diseñas tú." activity="Escribe en el foro: ¿qué te sorprendió de una planta, qué parte te genera más curiosidad y qué perfil te llama más?" />, dur: 9, label: 'Cierre' },
];
window.SCENES_C7 = SCENES_C7;
