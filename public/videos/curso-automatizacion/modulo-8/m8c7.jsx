// m8c7.jsx — "Tendencias y datos históricos en Ignition"
// After m8-lib.jsx. Exports SCENES_M8C7.

// ── Por qué las tendencias importan ───────────────────────────────────────────
function S_Why({ start, dur }) {
  const t = useTime(); const s = start;
  const cases = [
    ['🔍', 'Diagnóstico post-incidente', '¿Qué pasó con la temperatura las 2 h antes del paro?'],
    ['⚙️', 'Optimización de proceso', '¿A qué velocidad de bomba el mejor rendimiento?'],
    ['🔧', 'Mantenimiento predictivo', 'La corriente subió 15 % este mes → la bomba se degrada.'],
    ['📋', 'Cumplimiento regulatorio', 'Demostrar que la pasteurización nunca bajó de 72 °C.'],
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="La memoria del proceso" y="9%" color={TL8.steel} />
      <CapM8 start={s + 0.6} dur={2.2} size={46} weight={600} y="18%" width={1560}>Sin Historian, los datos son <span style={{ color: TL8.coral }}>agua entre los dedos</span>.</CapM8>
      <div style={{ position: 'absolute', left: 200, top: 400, width: 1520, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
        {cases.map((x, i) => {
          const ap = pop8(t, s + 1.3 + i * 0.3, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 22, background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderLeft: `4px solid ${TL8.steel}`, borderRadius: 12, padding: '22px 26px' }}>
              <span style={{ fontSize: 32, flexShrink: 0 }}>{x[0]}</span>
              <div>
                <div style={{ fontFamily: DISP8, fontSize: 22, fontWeight: 700, color: TL8.ink }}>{x[1]}</div>
                <div style={{ fontFamily: DISP8, fontSize: 17, color: TL8.mut, marginTop: 4, lineHeight: 1.35 }}>{x[2]}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SceneM8>
  );
}

// ── Easy Chart + ejes múltiples ───────────────────────────────────────────────
function S_EasyChart({ start, dur }) {
  const t = useTime(); const s = start;
  const N = 80;
  const lvl = [], temp = [], flow = [];
  for (let i = 0; i < N; i++) {
    lvl.push(0.55 + 0.18 * Math.sin(i * 0.18));
    temp.push(0.7 + 0.12 * Math.sin(i * 0.12 + 1) - (i > 55 ? (i - 55) * 0.006 : 0));
    flow.push(0.45 + 0.2 * Math.sin(i * 0.3 + 2));
  }
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="El componente Easy Chart" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Un <span style={{ color: TL8.honey }}>pen</span> por tag · cada variable con su propio eje Y.</CapM8>
      <TrendM8 x={150} y={290} w={1140} h={360} t={t} appear={s + 1.2} title="Tendencia · zoom, pan y date picker" yLabels="LT101 · TT301 · FT101"
        series={[{ color: TL8.steel, data: lvl }, { color: TL8.honey, data: temp }, { color: TL8.coral, data: flow }]} />
      <div style={{ position: 'absolute', left: 1330, top: 300, width: 440, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[['Última hora', 0], ['4 horas', 0], ['Turno', 0], ['Día', 0], ['Semana', 0]].map((b, i) => { const ap = clamp((t - (s + 2.4 + i * 0.18)) / 0.4, 0, 1); return <div key={i} style={{ opacity: ap, padding: '14px 22px', borderRadius: 9, background: i === 0 ? TL8.coralWash : TL8.paper, border: `1px solid ${i === 0 ? TL8.coral : TL8.lineS}`, fontFamily: MONO8, fontSize: 16, color: i === 0 ? TL8.coral : TL8.mut, letterSpacing: '0.06em' }}>{b[0]}</div>; })}
      </div>
      <CapM8 start={s + 4.4} dur={dur - 4.7} size={22} weight={500} color={TL8.mut} y="90%" width={1560}>Si comparten eje, la temperatura «aplasta» visualmente al nivel. La solución: un eje Y por variable con su propio rango.</CapM8>
    </SceneM8>
  );
}

// ── Vista de tendencias del proyecto ──────────────────────────────────────────
function S_TrendsView({ start, dur }) {
  const t = useTime(); const s = start;
  const N = 70;
  const a = [], b = [], c = [], d = [], e = [];
  for (let i = 0; i < N; i++) {
    a.push(0.6 + 0.12 * Math.sin(i * 0.15));
    b.push(0.82 + 0.06 * Math.sin(i * 0.2 + 1));
    c.push(0.72 + 0.1 * Math.sin(i * 0.13 + 0.5));
    d.push(0.5 + 0.22 * Math.sin(i * 0.32));
    e.push(0.55 + 0.1 * Math.sin(i * 0.1 + 2));
  }
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Vista de Tendencias · proyecto del curso" y="7%" color={TL8.coral} />
      <CapM8 start={s + 0.6} dur={1.8} size={40} weight={600} y="13%" width={1560}>Tres subgráficas, una historia del proceso.</CapM8>
      <TrendM8 x={210} y={220} w={1500} h={195} t={t} appear={s + 1.2} title="Niveles (m)" yLabels="LT101 · LT401"
        series={[{ color: TL8.steel, data: a }, { color: TL8.steelLt, data: b }]} live={false} />
      <TrendM8 x={210} y={445} w={1500} h={195} t={t} appear={s + 1.7} title="Temperatura y caudal" yLabels="TT301 · FT101"
        series={[{ color: TL8.honey, data: c }, { color: TL8.coral, data: d }]} live={false} />
      <TrendM8 x={210} y={670} w={1500} h={195} t={t} appear={s + 2.2} title="Presión (bar)" yLabels="PT401"
        series={[{ color: TL8.grn, data: e }]} live={false} />
    </SceneM8>
  );
}

// ── Consultas SQL sobre el Historian ──────────────────────────────────────────
function S_SQL({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '-- Temperatura promedio por hora, 24 h', c: TL8.dim },
    { txt: 'SELECT', c: TL8.coral },
    { txt: "  FROM_UNIXTIME(t_stamp/1000,", c: TL8.ink },
    { txt: "    '%Y-%m-%d %H:00') AS Hora,", c: TL8.steelLt },
    { txt: '  AVG(floatvalue) AS Temp_Prom', c: TL8.honey },
    { txt: 'FROM sqlth_1_data', c: TL8.coral },
    { txt: "WHERE tagid = (SELECT id FROM sqlth_te", c: TL8.ink },
    { txt: "  WHERE tagpath LIKE '%TT301%')", c: TL8.ink },
    { txt: '  AND t_stamp > ...24h', c: TL8.dim },
    { txt: 'GROUP BY Hora ORDER BY Hora;', c: TL8.coral },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="El Historian es SQL · consúltalo" y="9%" color={TL8.steel} />
      <CapM8 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>De la tabla histórica a un KPI en pantalla.</CapM8>
      <CodeM8 x={150} y={290} w={900} title="SQL · Tag Historian" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.2, 0, 1)} />
      <InfoCardM8 x={1110} y={300} w={640} h={185} accent={TL8.honey} title="Query Tag" sub="Escribe la consulta SQL en un Query Tag y su resultado se muestra como un tag más en la pantalla." appear={s + 2.8} t={t} />
      <InfoCardM8 x={1110} y={510} w={640} h={185} accent={TL8.steel} title="Transaction Group" sub="Exporta el resumen diario de producción automáticamente a las 00:00 → disponible para el MES/ERP." appear={s + 3.3} t={t} />
    </SceneM8>
  );
}

const SCENES_M8C7 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={7} seccion="Tendencias e Historian" title="Tendencias y datos históricos" dudur="16–18 min" objetivo="Construir vistas de tendencias en Perspective, configurar el Historian para distintos tipos de datos y crear análisis con consultas SQL desde el SCADA." />, dur: 7, label: 'Apertura' },
  { C: S_Why, dur: 13, label: 'Por qué importan' },
  { C: S_EasyChart, dur: 14, label: 'Easy Chart' },
  { C: S_TrendsView, dur: 13, label: 'Vista de Tendencias' },
  { C: S_SQL, dur: 14, label: 'Consultas SQL' },
  { C: (p) => <ClosingM8 {...p} line="El valor actual te dice cómo está el proceso. La tendencia te dice hacia dónde va — y eso es lo que convierte datos en decisiones." activity="Construye la Vista de Tendencias del proyecto. Crea un Query Tag con el caudal promedio de 24 h, un Expression Tag con el agua total tratada del día, exporta 2 h de temperatura a CSV y analiza el rango de variación en Excel." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M8C7 = SCENES_M8C7;
