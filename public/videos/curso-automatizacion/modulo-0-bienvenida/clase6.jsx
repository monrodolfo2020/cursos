// clase6.jsx — "Glosario base: el idioma de la automatización"
// After clase-lib.jsx. Exports SCENES_C6.

// El triángulo del control: PV / SP / Error
function S6_Triangulo({ start, dur }) {
  const t = useTime(); const s = start;
  const nodes = [
    { k: 'PV', name: 'Variable de proceso', d: 'Lo que estás midiendo ahora.', x: 960, y: 380, a: T.cyan },
    { k: 'SP', name: 'Setpoint', d: 'Lo que quieres que mida.', x: 640, y: 720, a: T.cyan },
    { k: 'Error', name: 'Error', d: 'La diferencia entre ambos.', x: 1280, y: 720, a: T.amber },
  ];
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="El triángulo del control" y="11%" />
      <Cap start={s + 0.8} dur={2.4} size={50} weight={600} y="20%" width={1500}>Tres palabras que lo explican casi todo.</Cap>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {[[0, 1], [1, 2], [2, 0]].map((pair, i) => {
          const a = nodes[pair[0]], b = nodes[pair[1]];
          const e = clamp((t - (s + 3.0 + i * 0.3)) / 0.6, 0, 1);
          return <line key={i} x1={a.x} y1={a.y} x2={a.x + (b.x - a.x) * e} y2={a.y + (b.y - a.y) * e} stroke={T.lineS} strokeWidth="1.6" strokeDasharray="2 7" />;
        })}
      </svg>
      {nodes.map((nd, i) => {
        const { op, sc } = pop(t, s + 1.4 + i * 0.5, 0.6, 0);
        return (
          <div key={i} style={{ position: 'absolute', left: nd.x, top: nd.y, transform: `translate(-50%,-50%) scale(${sc})`, opacity: op, width: 300, textAlign: 'center', padding: '24px 22px', borderRadius: 10, border: `1.5px solid ${nd.a}`, background: 'radial-gradient(circle, rgba(20,40,64,0.7), rgba(10,16,26,0.6))' }}>
            <div style={{ fontFamily: DISP, fontSize: 52, fontWeight: 700, color: nd.a, lineHeight: 1 }}>{nd.k}</div>
            <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: '0.14em', color: T.mut, margin: '8px 0 10px', textTransform: 'uppercase' }}>{nd.name}</div>
            <div style={{ fontFamily: DISP, fontSize: 20, color: T.ink, lineHeight: 1.3 }}>{nd.d}</div>
          </div>
        );
      })}
    </Scene>
  );
}

// La cadena: Sensor → Transmisor → Controlador → Actuador
function S6_Cadena({ start, dur }) {
  const t = useTime(); const s = start;
  const chain = [
    { k: 'Sensor', d: 'El que siente.', Icon: IcoSensor, a: T.cyan },
    { k: 'Transmisor', d: 'El que avisa.', Icon: IcoChip, a: T.cyan },
    { k: 'Controlador', d: 'El que decide.', Icon: IcoCPU, a: T.cyan },
    { k: 'Actuador', d: 'El que actúa.', Icon: IcoValve, a: T.amber },
  ];
  const xs = [180, 620, 1060, 1500]; const w = 350, cy = 560;
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="La cadena de la medición" y="13%" />
      <Cap start={s + 0.8} dur={2.2} size={52} weight={600} y="24%" width={1500}>Cada instrumento tiene un papel.</Cap>
      {[0, 1, 2].map(i => {
        const ax = xs[i] + w, bx = xs[i + 1];
        const e = clamp((t - (s + 2.6 + (i + 1) * 0.5)) / 0.4, 0, 1);
        return (
          <svg key={i} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <line x1={ax - 18} y1={cy} x2={ax - 18 + (bx - ax + 18) * e} y2={cy} stroke={T.cyan} strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" opacity="0.8" />
            <polygon points={`${bx - 12},${cy - 6} ${bx - 4},${cy} ${bx - 12},${cy + 6}`} fill={T.cyan} opacity={e} />
          </svg>
        );
      })}
      {chain.map((c, i) => {
        const { op, sc, ty } = pop(t, s + 2.4 + i * 0.5, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: cy - 120, width: w, height: 240, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 6, border: `1px solid ${T.lineS}`, background: 'linear-gradient(180deg, rgba(20,34,54,0.65), rgba(12,20,32,0.5))', padding: '26px', display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
            <c.Icon c={c.a} t={t} />
            <div style={{ fontFamily: DISP, fontSize: 34, fontWeight: 700, color: T.ink }}>{c.k}</div>
            <div style={{ fontFamily: DISP, fontSize: 20, color: T.mut }}>{c.d}</div>
            <Brackets color={c.a} size={13} thick={1.5} inset={-1} />
          </div>
        );
      })}
      <Cap start={s + 5.6} dur={dur - 5.9} size={32} weight={500} color={T.mut} y="88%" width={1500}>
        Juntos forman el lazo de control: medir → decidir → actuar.
      </Cap>
    </Scene>
  );
}

// El muro de siglas
function S6_Siglas({ start, dur }) {
  const t = useTime(); const s = start;
  const terms = [
    ['PLC', 'Computadora industrial que controla la planta'],
    ['SCADA', 'Pantalla donde ves y supervisas todo'],
    ['HMI', 'Pantalla local del operador'],
    ['P&ID', 'El plano del proceso con tuberías e instrumentos'],
    ['Tag', 'El nombre único de cada instrumento'],
    ['4–20 mA', 'El lenguaje estándar entre instrumentos'],
    ['DCS', 'Sistema de control distribuido'],
    ['OPC-UA', 'El puente entre PLCs y SCADA'],
    ['Historian', 'La base de datos del proceso'],
    ['Enclavamiento', 'Lógica que detiene algo automáticamente'],
    ['Comisionamiento', 'Poner en marcha una planta por primera vez'],
    ['SIL', 'Nivel de integridad de seguridad'],
  ];
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="El muro de siglas" y="8%" />
      <Cap start={s + 0.8} dur={2.2} size={46} weight={600} y="16%" width={1500}>Las que escucharás todos los días.</Cap>
      <div style={{ position: 'absolute', left: '50%', top: '56%', transform: 'translate(-50%,-50%)', width: 1560, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {terms.map((tm, i) => {
          const { op, sc, ty } = pop(t, s + 2.0 + i * 0.2, 0.45, 14);
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 6, border: `1px solid ${T.lineS}`, background: 'rgba(16,26,42,0.6)', padding: '18px 22px', minHeight: 118 }}>
              <div style={{ fontFamily: DISP, fontSize: 30, fontWeight: 700, color: T.cyan, letterSpacing: '-0.01em' }}>{tm[0]}</div>
              <div style={{ fontFamily: DISP, fontSize: 18, color: T.mut, marginTop: 8, lineHeight: 1.3 }}>{tm[1]}</div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
}

const SCENES_C6 = [
  { C: (p) => <TitleCard {...p} claseNo={6} title="Glosario base: el idioma de la automatización" dudur="14–16 min" objetivo="Familiarizarte con los términos fundamentales antes del contenido técnico — sin frustración." />, dur: 7, label: 'Apertura' },
  { C: S6_Triangulo, dur: 11, label: 'Triángulo del control' },
  { C: S6_Cadena, dur: 12, label: 'La cadena' },
  { C: S6_Siglas, dur: 14, label: 'Muro de siglas' },
  { C: (p) => <Closing {...p} line="La industria tiene su propio idioma. Empiezas a hablarlo hoy." activityLabel="Recurso" activity="Descarga el glosario de 150+ términos y las flashcards imprimibles. Tenlo abierto las primeras semanas." />, dur: 9, label: 'Cierre' },
];
window.SCENES_C6 = SCENES_C6;
