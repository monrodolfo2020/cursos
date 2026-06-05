// m9c5.jsx — "Normativa de seguridad aplicada a automatización (SIL/SIS/HAZOP)"
// After m9-lib.jsx. Exports SCENES_M9C5.

// ── Normas internacionales ────────────────────────────────────────────────────
function S_Standards({ start, dur }) {
  const t = useTime(); const s = start;
  const std = [
    { k: 'IEC 61508', name: 'Seguridad funcional', d: 'La norma «madre». Define los niveles SIL.', a: TL9.ylw },
    { k: 'IEC 61511', name: 'Industria de proceso', d: 'SIL aplicado a petroquímica y refinación (SIS).', a: TL9.org },
    { k: 'IEC 62061', name: 'Maquinaria', d: 'Equivalente para manufactura. Performance Levels.', a: TL9.ylwLt },
    { k: 'IEC 60079', name: 'Atmósferas Ex', d: 'La base de los equipos para zonas peligrosas.', a: TL9.grn },
    { k: 'IEC 62443', name: 'Ciberseguridad OT', d: 'Niveles de seguridad cibernética para redes OT.', a: TL9.red },
  ];
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="El marco normativo de la automatización" y="8%" />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="14%" width={1560}>Las normas codifican décadas de accidentes.</CapM9>
      <div style={{ position: 'absolute', left: 130, top: 270, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 18 }}>
        {std.map((x, i) => {
          const ap = pop9(t, s + 1.1 + i * 0.3, 0.5, 20);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', background: `linear-gradient(160deg, ${TL9.paper}, ${TL9.bg2})`, border: `1px solid ${TL9.lineS}`, borderRadius: 12, padding: '22px 18px', height: 320 }}>
              <div style={{ fontFamily: MONO9, fontSize: 19, fontWeight: 700, color: x.a }}>{x.k}</div>
              <div style={{ fontFamily: DISP9, fontSize: 20, fontWeight: 700, color: TL9.ink, margin: '12px 0 12px', lineHeight: 1.1 }}>{x.name}</div>
              <div style={{ fontFamily: DISP9, fontSize: 16.5, color: TL9.mut, lineHeight: 1.44 }}>{x.d}</div>
            </div>
          );
        })}
      </div>
      <CapM9 start={s + 3.9} dur={dur - 4.2} size={23} weight={500} color={TL9.ylwLt} y="89%" width={1560}>En muchos países, el incumplimiento es <b style={{ color: TL9.ink }}>responsabilidad penal</b> del responsable técnico.</CapM9>
    </SceneM9>
  );
}

// ── Niveles SIL ───────────────────────────────────────────────────────────────
function S_SIL({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Safety Integrity Level" y="9%" color={TL9.org} />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Cuánto reduce el riesgo una función de seguridad.</CapM9>
      <TableM9 x={310} y={290} w={1300} t={t} appear={s + 1.2} accentCol={2}
        headers={['SIL', 'Prob. de fallo (PFD)', 'Reducción del riesgo']}
        colTemplate="0.8fr 1.6fr 1.4fr"
        rowAccents={[TL9.grn, TL9.ylw, TL9.org, TL9.red]}
        rows={[
          ['SIL 1', '10⁻¹ – 10⁻²', '10× a 100×'],
          ['SIL 2', '10⁻² – 10⁻³', '100× a 1.000×'],
          ['SIL 3', '10⁻³ – 10⁻⁴', '1.000× a 10.000×'],
          ['SIL 4', '10⁻⁴ – 10⁻⁵', '10.000× a 100.000×'],
        ]} />
      <CapM9 start={s + 4.0} dur={dur - 4.3} size={23} weight={500} color={TL9.ylwLt} y="86%" width={1560}>SIL 4 es prácticamente exclusivo de aviación y nucleares. La industria de proceso vive entre SIL 1 y SIL 3.</CapM9>
    </SceneM9>
  );
}

// ── BPCS vs SIS + SIF ─────────────────────────────────────────────────────────
function S_SIS({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Control normal ≠ seguridad" y="8%" />
      <CapM9 start={s + 0.6} dur={2.0} size={42} weight={600} y="14%" width={1560}>El sistema de seguridad es <span style={{ color: TL9.red }}>independiente</span> del de control.</CapM9>
      <div style={{ position: 'absolute', left: 200, top: 250, display: 'flex', gap: 24 }}>
        {[['BPCS', 'Basic Process Control System', 'Mantiene el proceso en condiciones óptimas', TL9.ylw], ['SIS', 'Safety Instrumented System', 'Lleva el proceso a estado seguro si el BPCS falla', TL9.red]].map((x, i) => {
          const ap = pop9(t, s + 1.2 + i * 0.35, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, width: 720, background: `linear-gradient(160deg, ${TL9.paper}, ${TL9.bg2})`, border: `1px solid ${x[3]}`, borderRadius: 14, padding: '24px 28px', boxShadow: TL9.shadowSm }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontFamily: DISP9, fontSize: 30, fontWeight: 700, color: x[3] }}>{x[0]}</span>
                <span style={{ fontFamily: MONO9, fontSize: 14, color: TL9.mut }}>{x[1]}</span>
              </div>
              <div style={{ fontFamily: DISP9, fontSize: 19, color: TL9.mut, marginTop: 10, lineHeight: 1.4 }}>{x[2]}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: '50%', top: 510, transform: 'translateX(-50%)', width: 1480 }}>
        <div style={{ opacity: clamp((t - (s + 2.4)) / 0.5, 0, 1), fontFamily: MONO9, fontSize: 14, color: TL9.ylwLt, letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 16 }}>Los 3 componentes de una función de seguridad (SIF)</div>
        <svg width="1480" height="160" style={{ overflow: 'visible' }}>
          <NodeM9 x={60} y={30} w={400} h={110} label="Sensor de seguridad" sub="PT-201SH · SIL" accent={TL9.ylw} t={t} appear={s + 2.8} />
          <ArrowM9 x1={460} y1={85} x2={580} y2={85} start={s + 3.2} t={t} color={TL9.dim} />
          <NodeM9 x={580} y={30} w={400} h={110} label="Lógica de seguridad" sub="S7-1500F" accent={TL9.org} t={t} appear={s + 3.3} />
          <ArrowM9 x1={980} y1={85} x2={1100} y2={85} start={s + 3.7} t={t} color={TL9.dim} />
          <NodeM9 x={1100} y={30} w={400} h={110} label="Elemento final" sub="XV-201 · Fail-Closed" accent={TL9.red} t={t} appear={s + 3.8} />
        </svg>
      </div>
      <CapM9 start={s + 4.6} dur={dur - 4.9} size={22} weight={500} color={TL9.mut} y="90%" width={1560}>Diferente hardware, software y alimentación: si el control falla, el SIS actúa — y el control no puede impedirlo.</CapM9>
    </SceneM9>
  );
}

// ── HAZOP ─────────────────────────────────────────────────────────────────────
function S_HAZOP({ start, dur }) {
  const t = useTime(); const s = start;
  const words = [
    ['No / Ninguno', 'No hay flujo cuando debería', TL9.red],
    ['Más', 'Flujo mayor del diseñado', TL9.org],
    ['Menos', 'Flujo menor del diseñado', TL9.ylw],
    ['Además', 'Sustancia adicional no deseada', TL9.ylwLt],
    ['Antes / Después', 'Orden incorrecto de operaciones', TL9.grn],
  ];
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="HAZOP · de dónde nacen los enclavamientos" y="9%" />
      <CapM9 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>Palabras guía aplicadas a cada nodo del P&ID.</CapM9>
      <div style={{ position: 'absolute', left: '50%', top: 290, transform: 'translateX(-50%)', width: 1240 }}>
        {words.map((x, i) => {
          const ap = pop9(t, s + 1.2 + i * 0.3, 0.5, 14);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 24, marginBottom: 13, background: TL9.paper, border: `1px solid ${TL9.lineS}`, borderLeft: `4px solid ${x[2]}`, borderRadius: 11, padding: '17px 26px' }}>
              <span style={{ fontFamily: DISP9, fontSize: 24, fontWeight: 700, color: x[2], minWidth: 300 }}>{x[0]}</span>
              <span style={{ fontFamily: DISP9, fontSize: 20, color: TL9.mut }}>{x[1]}</span>
            </div>
          );
        })}
      </div>
      <CapM9 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL9.ylwLt} y="90%" width={1560}>Para cada combinación: causa, consecuencia y salvaguarda. Si es insuficiente → alarma, enclavamiento o SIF que tú programarás.</CapM9>
    </SceneM9>
  );
}

// ── Cultura de seguridad ──────────────────────────────────────────────────────
function S_Culture({ start, dur }) {
  const t = useTime(); const s = start;
  const lv = [
    ['Reactivo', '«Los accidentes son parte del trabajo»', TL9.red],
    ['Dependiente', '«Sigo las reglas para que no me multen»', TL9.org],
    ['Independiente', '«Sigo las reglas porque me protegen»', TL9.ylw],
    ['Interdependiente', '«Cuido mi seguridad y la de mis compañeros»', TL9.grn],
    ['Excelencia', '«Me niego a trabajar inseguro aunque nadie mire»', TL9.grn],
  ];
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="El elemento que las normas no controlan" y="9%" color={TL9.grn} />
      <CapM9 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>La madurez de la cultura de seguridad · modelo Bradley.</CapM9>
      <div style={{ position: 'absolute', left: '50%', top: 290, transform: 'translateX(-50%)', width: 1300 }}>
        {lv.map((x, i) => {
          const ap = pop9(t, s + 1.2 + i * 0.32, 0.5, 14);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 22, marginBottom: 12, background: TL9.paper, border: `1px solid ${TL9.lineS}`, borderRadius: 11, padding: '16px 26px' }}>
              <span style={{ fontFamily: MONO9, fontSize: 16, fontWeight: 700, color: x[2], minWidth: 28 }}>{i + 1}</span>
              <span style={{ fontFamily: DISP9, fontSize: 23, fontWeight: 700, color: TL9.ink, minWidth: 320 }}>{x[0]}</span>
              <span style={{ fontFamily: DISP9, fontSize: 19, color: TL9.mut, fontStyle: 'italic' }}>{x[1]}</span>
            </div>
          );
        })}
      </div>
      <CapM9 start={s + 4.0} dur={dur - 4.3} size={23} weight={500} color={TL9.ylwLt} y="92%" width={1560}>Los enclavamientos que programas, las alarmas que diseñas y la documentación que produces protegen vidas. Esa es tu responsabilidad técnica.</CapM9>
    </SceneM9>
  );
}

const SCENES_M9C5 = [
  { C: (p) => <TitleCardM9 {...p} claseNo={5} seccion="Normativa" title="Normativa de seguridad aplicada a automatización" dudur="16–18 min" objetivo="Conocer el marco normativo internacional y latinoamericano, entender SIL y las funciones de seguridad instrumentada, y saber qué normas aplican en tus proyectos." />, dur: 7, label: 'Apertura' },
  { C: S_Standards, dur: 13, label: 'Normas IEC' },
  { C: S_SIL, dur: 12, label: 'Niveles SIL' },
  { C: S_SIS, dur: 15, label: 'BPCS vs SIS' },
  { C: S_HAZOP, dur: 12, label: 'HAZOP' },
  { C: S_Culture, dur: 12, label: 'Cultura de seguridad' },
  { C: (p) => <ClosingM9 {...p} line="Las normas son conocimiento escrito con sangre. Tu trabajo como automatizador no termina en que el proceso funcione: termina en que funcione de forma segura, para todos." activity="Cierra el módulo: completa el quiz de 25 preguntas, entrega el procedimiento LOTO de la bomba del proyecto, la selección de EPP con análisis de riesgos y el análisis de zonas peligrosas." />, dur: 8, label: 'Cierre del módulo' },
];
window.SCENES_M9C5 = SCENES_M9C5;
