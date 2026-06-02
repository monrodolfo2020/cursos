// clase4.jsx — "Ruta de aprendizaje: cómo está organizado este curso"
// After clase-lib.jsx. Exports SCENES_C4.

// Curva de aprendizaje — rising staircase of module groups
function S4_Curva({ start, dur }) {
  const t = useTime(); const s = start;
  const steps = [
    { mods: 'Módulos 1–2', name: 'Entender el mundo físico', sub: 'Física, electricidad e instrumentación' },
    { mods: 'Módulos 3–4', name: 'Instrumentos y actuadores', sub: 'Sensores, transmisores, válvulas, motores' },
    { mods: 'Módulos 5–6', name: 'Programar y controlar', sub: 'Lógica, PID y PLC' },
    { mods: 'Módulos 7–8', name: 'Conectar y supervisar', sub: 'Redes industriales y SCADA' },
    { mods: 'Módulos 9–10', name: 'Seguridad y tendencias', sub: 'Riesgo eléctrico, Industria 4.0' },
    { mods: 'Módulo 11', name: 'Integrarlo todo', sub: 'Tu primera planta automatizada' },
  ];
  const n = steps.length;
  const baseY = 880, stepH = 96, x0 = 200, sw = 270, gap = 10;
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Así escala la dificultad" y="9%" />
      <Cap start={s + 0.8} dur={2.4} size={48} weight={600} y="18%" width={1500}>Una curva diseñada para no perderte.</Cap>
      {/* rising connector */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {steps.map((_, i) => {
          if (i === 0) return null;
          const ax = x0 + (i - 1) * (sw + gap) + sw, ay = baseY - (i - 1) * stepH;
          const bx = x0 + i * (sw + gap), by = baseY - i * stepH;
          const e = clamp((t - (s + 1.6 + i * 0.5)) / 0.4, 0, 1);
          return <line key={i} x1={ax} y1={ay} x2={ax + (bx - ax) * e} y2={ay + (by - ay) * e} stroke={T.cyan} strokeWidth="2" strokeDasharray="2 6" opacity="0.6" />;
        })}
      </svg>
      {steps.map((st, i) => {
        const appear = s + 1.4 + i * 0.5;
        const { op, ty } = pop(t, appear, 0.5, 24);
        const x = x0 + i * (sw + gap), y = baseY - i * stepH - 88;
        const last = i === n - 1;
        const accent = last ? T.amber : T.cyan;
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: y, width: sw, opacity: op, transform: `translateY(${ty}px)` }}>
            <div style={{ borderRadius: 5, border: `1px solid ${last ? T.amber : T.lineS}`, background: last ? 'rgba(60,46,20,0.4)' : 'rgba(16,26,42,0.7)', padding: '14px 16px', minHeight: 88 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em', color: accent, marginBottom: 6 }}>{st.mods}</div>
              <div style={{ fontFamily: DISP, fontSize: 21, fontWeight: 700, color: T.ink, lineHeight: 1.1 }}>{st.name}</div>
              <div style={{ fontFamily: DISP, fontSize: 14, color: T.mut, marginTop: 5, lineHeight: 1.3 }}>{st.sub}</div>
            </div>
            <div style={{ width: 11, height: 11, borderRadius: 11, background: accent, margin: '10px auto 0', boxShadow: `0 0 12px ${accent}` }} />
          </div>
        );
      })}
    </Scene>
  );
}

// Anatomía de una clase
function S4_Anatomia({ start, dur }) {
  const t = useTime(); const s = start;
  const steps = [
    { no: 1, k: 'Video', d: 'Aprendes el concepto.' },
    { no: 2, k: 'Lectura', d: 'Refuerzas con apoyo.' },
    { no: 3, k: 'Ejercicio', d: 'Lo haces tú mismo.' },
    { no: 4, k: 'Quiz', d: 'Compruebas que lo dominas.' },
  ];
  const xs = [220, 650, 1080, 1510];
  const w = 360, cy = 560;
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Cómo está estructurada cada clase" y="14%" />
      <Cap start={s + 0.8} dur={2.2} size={54} weight={600} y="26%" width={1500}>Cuatro pasos, en cada lección.</Cap>
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
      {steps.map((st, i) => {
        const { op, sc, ty } = pop(t, s + 2.4 + i * 0.5, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: cy - 110, width: w, height: 220, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 6, border: `1px solid ${T.lineS}`, background: 'linear-gradient(180deg, rgba(20,34,54,0.65), rgba(12,20,32,0.5))', padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
            <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: '0.22em', color: T.dim }}>0{st.no}</div>
            <div style={{ fontFamily: DISP, fontSize: 38, fontWeight: 700, color: T.ink }}>{st.k}</div>
            <div style={{ fontFamily: DISP, fontSize: 19, color: T.mut, lineHeight: 1.3 }}>{st.d}</div>
            <Brackets color={T.cyan} size={13} thick={1.5} inset={-1} />
          </div>
        );
      })}
      <Cap start={s + 5.6} dur={dur - 5.9} size={34} weight={500} color={T.mut} y="86%" width={1500}>
        Y un foro de preguntas para cuando te atores.
      </Cap>
    </Scene>
  );
}

// Ritmo y mentalidad
function S4_Ritmo({ start, dur }) {
  const t = useTime(); const s = start;
  const stats = [
    { big: '3', unit: 'clases / semana', sub: 'El ritmo recomendado' },
    { big: '6', unit: 'meses', sub: 'Para completar el curso' },
    { big: '115', unit: 'lecciones', sub: '~80–100 horas de contenido' },
  ];
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Tu ritmo, tu compromiso" y="16%" />
      <div style={{ position: 'absolute', left: 0, right: 0, top: '46%', transform: 'translateY(-50%)', display: 'flex', gap: 70, justifyContent: 'center' }}>
        {stats.map((st, i) => {
          const { op, ty } = pop(t, s + 1.0 + i * 0.5, 0.6, 22);
          return (
            <div key={i} style={{ textAlign: 'center', opacity: op, transform: `translateY(${ty}px)` }}>
              <div style={{ fontFamily: DISP, fontSize: 150, fontWeight: 700, color: i === 2 ? T.amber : T.cyan, lineHeight: 0.9, letterSpacing: '-0.03em' }}>{st.big}</div>
              <div style={{ fontFamily: DISP, fontSize: 28, fontWeight: 600, color: T.ink, marginTop: 12 }}>{st.unit}</div>
              <div style={{ fontFamily: MONO, fontSize: 15, color: T.mut, marginTop: 8, letterSpacing: '0.04em' }}>{st.sub}</div>
            </div>
          );
        })}
      </div>
      <Cap start={s + 3.4} dur={dur - 3.7} size={44} weight={600} y="82%" color={T.cyan} width={1500}>
        Este curso no es de memorizar. Es de entender y hacer.
      </Cap>
    </Scene>
  );
}

const SCENES_C4 = [
  { C: (p) => <TitleCard {...p} claseNo={4} title="Ruta de aprendizaje del curso" dudur="10–12 min" objetivo="Entender la lógica del curso, qué esperar de cada módulo y cómo aprovecharlo al máximo." />, dur: 7, label: 'Apertura' },
  { C: S4_Curva, dur: 13, label: 'La curva' },
  { C: S4_Anatomia, dur: 11, label: 'Anatomía de una clase' },
  { C: S4_Ritmo, dur: 11, label: 'Ritmo' },
  { C: (p) => <Closing {...p} line="Once módulos, un solo destino: tu primera planta automatizada." activityLabel="Recursos" activity="Descarga el glosario, las plantillas ISA y las guías de software que acompañan el curso." />, dur: 9, label: 'Cierre' },
];
window.SCENES_C4 = SCENES_C4;
