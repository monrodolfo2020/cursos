// m8c3.jsx — "Tags en Ignition: OPC, Memory, Expression y Historian"
// After m8-lib.jsx. Exports SCENES_M8C3.

// ── Qué es un tag ─────────────────────────────────────────────────────────────
function S_WhatTag({ start, dur }) {
  const t = useTime(); const s = start;
  const uses = [
    ['Los gauges', 'muestran tags'],
    ['Las alarmas', 'monitorean tags'],
    ['El Historian', 'almacena tags'],
    ['Los reportes', 'leen tags'],
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="El fundamento de todo el SCADA" y="11%" />
      <CapM8 start={s + 0.6} dur={2.4} size={46} weight={600} y="22%" width={1620}>Un <span style={{ color: TL8.coral }}>tag</span> es la representación de una variable de proceso dentro del SCADA.</CapM8>
      <div style={{ position: 'absolute', left: '50%', top: 470, transform: 'translateX(-50%)', display: 'flex', gap: 18 }}>
        {uses.map((x, i) => {
          const ap = pop8(t, s + 1.6 + i * 0.3, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, width: 320, background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderRadius: 12, padding: '26px 24px', textAlign: 'center', boxShadow: TL8.shadowSm }}>
              <div style={{ fontFamily: DISP8, fontSize: 25, fontWeight: 700, color: TL8.ink }}>{x[0]}</div>
              <div style={{ fontFamily: MONO8, fontSize: 17, color: TL8.coral, marginTop: 8 }}>{x[1]}</div>
            </div>
          );
        })}
      </div>
      <CapM8 start={s + 3.6} dur={dur - 3.9} size={25} weight={500} color={TL8.steelLt} y="80%" width={1560}>Es el puente entre el valor físico del proceso y la información en pantalla. Un proyecto típico tiene de decenas a <b style={{ color: TL8.ink }}>decenas de miles</b> de tags.</CapM8>
    </SceneM8>
  );
}

// ── Los 4 tipos de tag ────────────────────────────────────────────────────────
function S_Types({ start, dur }) {
  const t = useTime(); const s = start;
  const types = [
    { name: 'OPC Tag', d: 'Conectado a un valor del PLC vía OPC-UA. El más importante.', a: TL8.coral, ic: '🔌' },
    { name: 'Memory Tag', d: 'Variable interna del SCADA. No conectada a ningún PLC.', a: TL8.honey, ic: '💾' },
    { name: 'Expression Tag', d: 'Calcula su valor con una fórmula sobre otros tags.', a: TL8.steel, ic: 'ƒ' },
    { name: 'Query Tag', d: 'Obtiene su valor de una consulta SQL a la base de datos.', a: TL8.grn, ic: '🗄️' },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Cuatro tipos de tag" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={46} weight={600} y="16%" width={1500}>Cada tipo, una fuente de datos distinta.</CapM8>
      <div style={{ position: 'absolute', left: 130, top: 320, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
        {types.map((x, i) => {
          const ap = pop8(t, s + 1.2 + i * 0.4, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
              <div style={{ position: 'relative', background: `linear-gradient(160deg, ${TL8.paper}, ${TL8.bg2})`, border: `1px solid ${i === 0 ? TL8.coral : TL8.lineS}`, borderRadius: 12, padding: '26px 22px', height: 300, boxShadow: TL8.shadowSm }}>
                <div style={{ fontSize: 30, lineHeight: 1 }}>{x.ic}</div>
                <div style={{ fontFamily: DISP8, fontSize: 25, fontWeight: 700, color: x.a, margin: '16px 0 12px' }}>{x.name}</div>
                <div style={{ fontFamily: DISP8, fontSize: 18, color: TL8.mut, lineHeight: 1.44 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
      <CapM8 start={s + 3.9} dur={dur - 4.2} size={24} weight={500} color={TL8.coralLt} y="86%" width={1560}>El OPC Tag se lee según su <b style={{ color: TL8.ink }}>Scan Class</b>: Default 1 s · Fast 100–500 ms para control crítico · Slow para masas grandes.</CapM8>
    </SceneM8>
  );
}

// ── Expression tags · código ──────────────────────────────────────────────────
function S_Expression({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '// Eficiencia de la planta (%)', c: TL8.dim },
    { txt: '{Reactor/Caudal_Salida}', c: TL8.steelLt },
    { txt: '  / {Captacion/Caudal_Entrada} * 100', c: TL8.ink },
    { txt: '', c: TL8.ink },
    { txt: '// Estado de alarma en texto', c: TL8.dim },
    { txt: 'if({Captacion/Alarma_LSHH},', c: TL8.coral },
    { txt: '   "¡NIVEL CRÍTICO!",', c: TL8.honey },
    { txt: '   "Normal")', c: TL8.ink },
    { txt: '', c: TL8.ink },
    { txt: '// Conversión bar → PSI', c: TL8.dim },
    { txt: '{Sistema/Presion_Bar} * 14.504', c: TL8.steelLt },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Expression Tags · sintaxis tipo Excel" y="9%" color={TL8.steel} />
      <CapM8 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>El cálculo vive en el SCADA, no en el PLC.</CapM8>
      <CodeM8 x={150} y={290} w={920} title="Expression · KPIs y conversiones" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.4, 0, 1)} />
      <InfoCardM8 x={1130} y={300} w={620} h={185} accent={TL8.steel} title="Se modifica sin tocar el PLC" sub="Cambias el cálculo en el SCADA sin acceder al programa del controlador ni recompilar." appear={s + 2.6} t={t} />
      <InfoCardM8 x={1130} y={510} w={620} h={185} accent={TL8.honey} title="Perfectos para KPIs" sub="Eficiencias, integraciones de caudal, conversiones de unidades, estados textuales para el operador." appear={s + 3.1} t={t} />
    </SceneM8>
  );
}

// ── Historian + deadband ──────────────────────────────────────────────────────
function S_Historian({ start, dur }) {
  const t = useTime(); const s = start;
  // signal jittering around a value; deadband filters
  const N = 60;
  const raw = [], stored = [];
  let last = 0.5;
  for (let i = 0; i < N; i++) {
    const v = 0.5 + 0.22 * Math.sin(i * 0.25) + 0.05 * Math.sin(i * 1.7);
    raw.push(v);
    if (Math.abs(v - last) > 0.06) { stored.push(v); last = v; } else stored.push(null);
  }
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="El Historian y el deadband" y="9%" color={TL8.honey} />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>El <span style={{ color: TL8.honey }}>deadband</span> decide el tamaño de tu base de datos.</CapM8>
      <TrendM8 x={150} y={300} w={920} h={300} t={t} appear={s + 1.3} title="Señal de nivel · raw vs almacenado" live={false}
        series={[{ color: TL8.dim, data: raw }, { color: TL8.honey, data: stored.map((v, i) => v == null ? raw[i] : v) }]} />
      <InfoCardM8 x={1130} y={310} w={620} h={170} accent={TL8.red} title="Sin deadband" sub="Una señal que fluctúa levemente guarda miles de registros inútiles cada minuto." appear={s + 2.2} t={t} />
      <InfoCardM8 x={1130} y={500} w={620} h={170} accent={TL8.grn} title="Con deadband = 0.05 m" sub="Solo guarda si el nivel cambia más de 5 cm → reducción de 90 %+ en almacenamiento." appear={s + 2.7} t={t} />
      <CapM8 start={s + 4.0} dur={dur - 4.3} size={22} weight={500} color={TL8.mut} y="90%" width={1560}>Historia → Enabled · Sample Mode (On Change / Periodic) · Max Time 60 s · Deadband absoluto. Agrupa tags con un Tag History Group.</CapM8>
    </SceneM8>
  );
}

// ── Estructura del Tag Provider ───────────────────────────────────────────────
function S_Tree({ start, dur }) {
  const t = useTime(); const s = start;
  const tree = [
    ['[default]', 0, TL8.coral, ''],
    ['📁 Captacion', 1, TL8.steel, ''],
    ['LT101 · FT101', 2, TL8.mut, 'Float · OPC · Historian ON'],
    ['📁 Bomba_P101', 2, TL8.steel, ''],
    ['Corriendo · Corriente · Cmd_Arranque', 3, TL8.mut, 'Boolean / Float · OPC (Write)'],
    ['📁 Reactor', 1, TL8.steel, ''],
    ['TT301 · SP_Temperatura · FCV301_CV', 2, TL8.mut, 'Float · OPC R/W · Historian ON'],
    ['📁 Alarmas', 1, TL8.steel, ''],
    ['Alarma_LSHH_T101 · Alarma_Temp_Alta', 2, TL8.mut, 'Boolean · OPC (solo lectura)'],
    ['📁 KPIs', 1, TL8.honey, ''],
    ['Eficiencia · Agua_Tratada_hoy', 2, TL8.mut, 'Expression / Memory Tag'],
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Organización: área → equipo → señal" y="8%" />
      <CapM8 start={s + 0.6} dur={2.0} size={42} weight={600} y="14%" width={1560}>La estructura de tags del proyecto del curso.</CapM8>
      <div style={{ position: 'absolute', left: '50%', top: 240, transform: 'translateX(-50%)', width: 1280, background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderRadius: 14, padding: '22px 30px', boxShadow: TL8.shadow }}>
        {tree.map((x, i) => {
          const ap = clamp((t - (s + 1.2 + i * 0.22)) / 0.4, 0, 1);
          return (
            <div key={i} style={{ opacity: ap, display: 'flex', alignItems: 'baseline', gap: 16, padding: '8px 0', paddingLeft: x[1] * 38, borderTop: i ? `1px solid ${TL8.line}` : 'none' }}>
              <span style={{ fontFamily: MONO8, fontSize: x[1] === 0 ? 20 : 17.5, fontWeight: x[1] <= 1 ? 700 : 500, color: x[3] ? TL8.ink : x[2], minWidth: 460 }}>{x[0]}</span>
              {x[3] && <span style={{ fontFamily: MONO8, fontSize: 14.5, color: x[2] === TL8.honey ? TL8.honey : TL8.steelLt }}>{x[3]}</span>}
            </div>
          );
        })}
      </div>
    </SceneM8>
  );
}

const SCENES_M8C3 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={3} seccion="Tags e Historian" title="Tags en Ignition" dudur="18–20 min" objetivo="Comprender la arquitectura de tags, crear los tipos del proyecto, configurar el Historian con deadband y entender por qué los tags son la base de todo el SCADA." />, dur: 7, label: 'Apertura' },
  { C: S_WhatTag, dur: 13, label: 'Qué es un tag' },
  { C: S_Types, dur: 14, label: 'Los 4 tipos' },
  { C: S_Expression, dur: 14, label: 'Expression Tags' },
  { C: S_Historian, dur: 14, label: 'Historian + deadband' },
  { C: S_Tree, dur: 13, label: 'Estructura de tags' },
  { C: (p) => <ClosingM8 {...p} line="Antes de un solo gauge o una sola alarma, está el árbol de tags bien organizado. Esa estructura sostiene todo lo que viene después." activity="En el Tag Browser crea la estructura completa del proyecto: 20+ OPC Tags (aún sin conectar), 3 Expression Tags, habilita el Historian con deadband apropiado y exporta la configuración a XML." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M8C3 = SCENES_M8C3;
