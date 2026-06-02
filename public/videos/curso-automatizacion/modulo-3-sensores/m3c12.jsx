// m3c12.jsx — "Práctica: selección de instrumentos para un proceso dado"
// After m3-dark.jsx. Exports SCENES_M3C12.

// Matriz de decisión: variable → instrumento recomendado
function S_Matriz({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    { v: 'Temperatura alta (1000 °C)', i: 'Termopar tipo K', a: TEAL },
    { v: 'Temperatura de precisión', i: 'RTD / PT100', a: TEAL },
    { v: 'Nivel en tanque abierto', i: 'Celda DP hidrostática', a: TL.clay },
    { v: 'Nivel con mucho vapor', i: 'Radar', a: TL.clay },
    { v: 'Caudal estándar y barato', i: 'Placa orificio', a: TL.blue },
    { v: 'Caudal másico exacto', i: 'Coriolis', a: TL.blue },
  ];
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="La tabla que usarás siempre" y="9%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="18%" width={1500}>Cada necesidad, su instrumento.</CapL>
      <div style={{ position: 'absolute', left: '50%', top: '58%', transform: 'translate(-50%,-50%)', width: 1300, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((r, i) => {
          const { op, ty } = popL(t, s + 2.0 + i * 0.4, 0.5, 16);
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${ty}px)`, display: 'flex', alignItems: 'center', borderRadius: 10, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadowSm, overflow: 'hidden' }}>
              <div style={{ flex: 1, fontFamily: DISPL, fontSize: 24, color: TL.ink, padding: '18px 26px' }}>{r.v}</div>
              <div style={{ width: 60, textAlign: 'center', color: r.a, fontFamily: MONOL, fontSize: 22 }}>→</div>
              <div style={{ width: 440, fontFamily: DISPL, fontSize: 24, fontWeight: 700, color: r.a, padding: '18px 26px', borderLeft: `1px solid ${TL.line}` }}>{r.i}</div>
            </div>
          );
        })}
      </div>
    </SceneL>
  );
}

// Pasos de selección
function S_Pasos({ start, dur }) {
  const t = useTime(); const s = start;
  const pasos = [
    { n: 1, k: '¿Qué variable?', d: 'Temperatura, presión, nivel o caudal.' },
    { n: 2, k: '¿Qué condiciones?', d: 'Rango, fluido, presión, temperatura.' },
    { n: 3, k: '¿Qué precisión?', d: 'Cuánto error tolera el proceso.' },
    { n: 4, k: '¿Qué presupuesto?', d: 'El balance entre costo y desempeño.' },
  ];
  const xs = [180, 610, 1040, 1470]; const w = 360, cy = 560;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Cómo decidir, en 4 preguntas" y="13%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="25%" width={1500}>El método para no equivocarte.</CapL>
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
            <div style={{ fontFamily: DISPL, fontSize: 26, fontWeight: 700, color: TL.ink, lineHeight: 1.1 }}>{p.k}</div>
            <div style={{ fontFamily: DISPL, fontSize: 18, color: TL.mut, lineHeight: 1.3 }}>{p.d}</div>
          </div>
        );
      })}
    </SceneL>
  );
}

const SCENES_M3C12 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={12} title="Práctica: selección de instrumentos" dudur="20–25 min" objetivo="Aplicar todo el módulo: elegir el sensor correcto para cada variable de un proceso real." />, dur: 7, label: 'Apertura' },
  { C: S_Matriz, dur: 14, label: 'Matriz de decisión' },
  { C: S_Pasos, dur: 12, label: 'Método de 4 pasos' },
  { C: (p) => <ClosingM2 {...p} line="Con esto cierras el Módulo 3: ya sabes medir temperatura, presión, nivel y caudal con criterio." activityLabel="Entrega" activity="Para una planta de agua, selecciona y justifica un instrumento por cada una de las 4 variables." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C12 = SCENES_M3C12;
