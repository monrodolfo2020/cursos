// m8c9.jsx — "Reportes en Ignition"
// After m8-lib.jsx. Exports SCENES_M8C9.

// ── Por qué reportes ──────────────────────────────────────────────────────────
function S_Why({ start, dur }) {
  const t = useTime(); const s = start;
  const r = [
    ['👔', 'Gerencia', 'No opera el SCADA. Necesita el resumen del día en PDF.'],
    ['📋', 'Reguladores', 'Exigen registros documentados de parámetros de proceso.'],
    ['🔧', 'Mantenimiento', 'Horas de funcionamiento de cada equipo.'],
    ['⏱️', 'Sin copy-paste', 'El reporte automático elimina el trabajo manual diario.'],
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="El puente entre planta y gestión" y="9%" color={TL8.steel} />
      <CapM8 start={s + 0.6} dur={2.2} size={46} weight={600} y="18%" width={1560}>El reporte lleva el proceso a quien <span style={{ color: TL8.coral }}>no mira la pantalla</span>.</CapM8>
      <div style={{ position: 'absolute', left: 200, top: 400, width: 1520, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
        {r.map((x, i) => {
          const ap = pop8(t, s + 1.3 + i * 0.3, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 22, background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderLeft: `4px solid ${TL8.honey}`, borderRadius: 12, padding: '22px 26px' }}>
              <span style={{ fontSize: 32, flexShrink: 0 }}>{x[0]}</span>
              <div>
                <div style={{ fontFamily: DISP8, fontSize: 22, fontWeight: 700, color: TL8.ink }}>{x[1]}</div>
                <div style={{ fontFamily: DISP8, fontSize: 17, color: TL8.mut, marginTop: 4, lineHeight: 1.35 }}>{x[2]}</div>
              </div>
            </div>
          );
        })}
      </div>
      <CapM8 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL8.mut} y="86%" width={1560}>El módulo Reporting genera <b style={{ color: TL8.ink }}>PDF, Excel y HTML</b> con datos del Historian, programados y enviados por email.</CapM8>
    </SceneM8>
  );
}

// ── El reporte de turno ───────────────────────────────────────────────────────
function S_ShiftReport({ start, dur }) {
  const t = useTime(); const s = start;
  const ap = pop8(t, s + 1.1, 0.6, 24);
  const N = 50; const temp = [];
  for (let i = 0; i < N; i++) temp.push(0.7 + 0.12 * Math.sin(i * 0.18 + 1));
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Reporte de turno · proyecto del curso" y="7%" color={TL8.coral} />
      <div style={{ position: 'absolute', left: '50%', top: 175, transform: `translateX(-50%) translateY(${ap.ty}px) scale(${ap.sc})`, opacity: ap.op, width: 980, background: '#f3f0e8', borderRadius: 8, boxShadow: '0 30px 70px rgba(0,0,0,0.6)', padding: '40px 56px', color: '#1a1c22', fontFamily: DISP8 }}>
        <div style={{ textAlign: 'center', borderBottom: '2px solid #1a1c22', paddingBottom: 16 }}>
          <div style={{ fontFamily: MONO8, fontSize: 14, letterSpacing: '0.2em', color: '#6b5040' }}>PLANTA TRATAMIENTO DE AGUA</div>
          <div style={{ fontSize: 30, fontWeight: 700, marginTop: 6 }}>REPORTE DE TURNO</div>
          <div style={{ fontFamily: MONO8, fontSize: 14, color: '#555', marginTop: 8 }}>Fecha: 04/06/2026 · Turno: Mañana · Operador: J. Pérez</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 36, marginTop: 24 }}>
          <div>
            <div style={{ fontFamily: MONO8, fontSize: 13, letterSpacing: '0.14em', color: '#a8442a', fontWeight: 700 }}>RESUMEN DE PRODUCCIÓN</div>
            {[['Agua tratada en el turno', '684 m³'], ['Caudal promedio entrada', '91.2 m³/h'], ['Eficiencia del proceso', '96.4 %'], ['Operación bomba P-101', '7.8 h']].map((x, i) => {
              const rev = clamp((t - (s + 2.0 + i * 0.25)) / 0.4, 0, 1);
              return <div key={i} style={{ opacity: rev, display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #d8d2c4', fontSize: 17 }}><span style={{ color: '#444' }}>{x[0]}</span><span style={{ fontWeight: 700 }}>{x[1]}</span></div>;
            })}
            <div style={{ fontFamily: MONO8, fontSize: 13, letterSpacing: '0.14em', color: '#a8442a', fontWeight: 700, marginTop: 22 }}>ALARMAS DEL TURNO</div>
            <div style={{ opacity: clamp((t - (s + 3.4)) / 0.5, 0, 1), fontSize: 17, marginTop: 8 }}>Total: <b>3</b> · 1 Critical (reconocida), 2 High</div>
          </div>
          <div>
            <div style={{ fontFamily: MONO8, fontSize: 13, letterSpacing: '0.14em', color: '#a8442a', fontWeight: 700 }}>TEMPERATURA REACTOR</div>
            <svg width="100%" height="150" style={{ marginTop: 10 }}>
              <rect x="0" y="0" width="100%" height="150" fill="#e8e3d6" rx="4" />
              {(() => { const cut = Math.max(2, Math.round(N * clamp((t - s - 2.6) / 1.6, 0, 1))); const pts = temp.slice(0, cut).map((v, i) => `${20 + (340) * (i / (N - 1))},${140 - 120 * v}`).join(' '); return <polyline points={pts} fill="none" stroke="#a8442a" strokeWidth="2.5" />; })()}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO8, fontSize: 13, color: '#555', marginTop: 8 }}><span>Prom 75.1 °C</span><span>Mín 73.4</span><span>Máx 76.8</span></div>
          </div>
        </div>
      </div>
    </SceneM8>
  );
}

// ── Componentes del Reporting + expresión SQL ─────────────────────────────────
function S_Components({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Cómo se arma el reporte" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Tres bloques: tabla, gráfica y campos calculados.</CapM8>
      <InfoCardM8 x={170} y={310} w={500} h={250} accent={TL8.coral} title="Table" sub="Datos tabulares desde una consulta SQL: columnas, agrupación y totales." appear={s + 1.3} t={t} />
      <InfoCardM8 x={710} y={310} w={500} h={250} accent={TL8.steel} title="Chart" sub="Tendencia del Historian para el período del reporte, en modo captura para PDF." appear={s + 1.7} t={t} />
      <InfoCardM8 x={1250} y={310} w={500} h={250} accent={TL8.honey} title="Text Field" sub="Valores dinámicos calculados con una expresión SQL embebida en el reporte." appear={s + 2.1} t={t} />
      <CodeM8 x={360} y={600} w={1200} title="Expresión del campo «agua_turno»" lines={[
        { txt: '{SELECT SUM(floatvalue)/3600 FROM sqlth_1_data', c: TL8.coral },
        { txt: "  WHERE tagid IN (SELECT id FROM sqlth_te", c: TL8.ink },
        { txt: "    WHERE tagpath LIKE '%FT401%')", c: TL8.steelLt },
        { txt: '  AND t_stamp BETWEEN $reportStartTime', c: TL8.honey },
        { txt: '    AND $reportEndTime}', c: TL8.honey },
      ]} t={t} appear={s + 2.7} reveal={clamp((t - (s + 3.0)) / 2.0, 0, 1)} />
    </SceneM8>
  );
}

// ── Programación y distribución ───────────────────────────────────────────────
function S_Schedule({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Programación automática" y="11%" color={TL8.grn} />
      <CapM8 start={s + 0.6} dur={2.2} size={46} weight={600} y="21%" width={1560}>Se genera y se envía <span style={{ color: TL8.grn }}>solo</span>, sin operador.</CapM8>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM8 x={240} y={460} w={320} h={120} label="Schedule" sub="06:00 · 14:00 · 22:00" accent={TL8.honey} t={t} appear={s + 1.2} />
        <ArrowM8 x1={560} y1={520} x2={800} y2={520} start={s + 1.7} t={t} color={TL8.dim} label="genera" />
        <NodeM8 x={800} y={460} w={320} h={120} label="Reporte PDF" sub="datos del Historian" accent={TL8.coral} t={t} appear={s + 1.9} />
        <ArrowM8 x1={1120} y1={520} x2={1360} y2={520} start={s + 2.4} t={t} color={TL8.dim} label="envía" />
        <NodeM8 x={1360} y={460} w={320} h={120} label="Email" sub="supervisor · gerencia" accent={TL8.steel} t={t} appear={s + 2.6} online />
      </svg>
      <CapM8 start={s + 3.6} dur={dur - 3.9} size={24} weight={500} color={TL8.mut} y="74%" width={1560}>Frecuencia diaria al inicio de cada turno · acción Generate → Email · formato PDF a los destinatarios definidos.</CapM8>
    </SceneM8>
  );
}

const SCENES_M8C9 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={9} seccion="Reportes" title="Reportes en Ignition" dudur="14–16 min" objetivo="Crear reportes automáticos con el módulo Reporting, configurar reportes de turno con datos del Historian y programar su generación y envío por correo." />, dur: 7, label: 'Apertura' },
  { C: S_Why, dur: 13, label: 'Por qué reportes' },
  { C: S_ShiftReport, dur: 14, label: 'Reporte de turno' },
  { C: S_Components, dur: 14, label: 'Componentes' },
  { C: S_Schedule, dur: 12, label: 'Programación y email' },
  { C: (p) => <ClosingM8 {...p} line="Un buen reporte automático trabaja mientras todos duermen: a las 6 de la mañana, el resumen del turno ya está en la bandeja del supervisor." activity="Crea el reporte de turno del proyecto: encabezado con parámetros, tabla con 5 KPIs, gráfica de temperatura del reactor y tabla de alarmas del turno. Prográmalo para generarse a las 6:00 am y guardarse en una carpeta local." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M8C9 = SCENES_M8C9;
