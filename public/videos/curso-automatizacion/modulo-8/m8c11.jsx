// m8c11.jsx — "Práctica integradora: SCADA completo del proyecto"
// After m8-lib.jsx. Exports SCENES_M8C11.

// ── Lista de verificación ─────────────────────────────────────────────────────
function S_Checklist({ start, dur }) {
  const t = useTime(); const s = start;
  const cats = [
    { name: 'Conexión', items: ['OPC-UA / Modbus al PLC', 'Tags con calidad Good', 'Escritura verificada'], a: TL8.steel },
    { name: 'Vistas', items: ['General + 3 detalles', 'Alarmas + Tendencias', 'Reportes'], a: TL8.coral },
    { name: 'Funcionalidad', items: ['Botones con confirmación', 'SP con validación', 'Secuencia de arranque'], a: TL8.honey },
    { name: 'Alarmas', items: ['HH/H/L/LL en 4 vars', 'Digitales de fallos', 'Histéresis y prioridad'], a: '#ff8a3d' },
    { name: 'Historian', items: ['Habilitado en analógicos', 'Deadband apropiado', 'Easy Chart con datos'], a: TL8.grn },
    { name: 'Seguridad', items: ['4 roles configurados', 'Acceso por rol', 'Auditoría activa'], a: TL8.steelLt },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Lista de verificación del SCADA completo" y="7%" color={TL8.coral} />
      <CapM8 start={s + 0.6} dur={1.8} size={40} weight={600} y="13%" width={1500}>Todo lo aprendido, en un solo sistema.</CapM8>
      <div style={{ position: 'absolute', left: 130, top: 230, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {cats.map((c, i) => {
          const ap = pop8(t, s + 1.1 + i * 0.28, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderRadius: 12, padding: '20px 24px', height: 250 }}>
              <div style={{ fontFamily: DISP8, fontSize: 23, fontWeight: 700, color: c.a, marginBottom: 14 }}>{c.name}</div>
              {c.items.map((it, j) => {
                const rev = clamp((t - (s + 1.6 + i * 0.28 + j * 0.18)) / 0.4, 0, 1);
                return <div key={j} style={{ opacity: rev, display: 'flex', alignItems: 'center', gap: 12, padding: '7px 0', fontFamily: DISP8, fontSize: 17.5, color: TL8.mut }}><span style={{ color: TL8.grn, fontSize: 18 }}>✓</span>{it}</div>;
              })}
            </div>
          );
        })}
      </div>
    </SceneM8>
  );
}

// ── Los 4 escenarios de prueba ────────────────────────────────────────────────
function S_Scenarios({ start, dur }) {
  const t = useTime(); const s = start;
  const sc = [
    { n: '1', name: 'Arranque normal', d: 'Operador inicia secuencia → bomba arranca, nivel sube, PID alcanza el SP.', a: TL8.grn },
    { n: '2', name: 'Gestión de alarma', d: 'Forzar LT101 a 3.9 m → alarma HH → reconocer → volver a normal en el Journal.', a: TL8.red },
    { n: '3', name: 'Acceso no autorizado', d: 'Operador intenta cambiar PID → rechazado. Ingeniero lo cambia → auditado.', a: TL8.honey },
    { n: '4', name: 'Generación de reporte', d: 'Reporte de turno con datos reales → exportar temperatura a CSV → verificar.', a: TL8.steel },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Prueba integrada final" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1500}>Cuatro escenarios que cierran el ciclo.</CapM8>
      <div style={{ position: 'absolute', left: 130, top: 320, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
        {sc.map((x, i) => {
          const ap = pop8(t, s + 1.2 + i * 0.4, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
              <div style={{ position: 'relative', background: `linear-gradient(160deg, ${TL8.paper}, ${TL8.bg2})`, border: `1px solid ${TL8.lineS}`, borderRadius: 12, padding: '24px 22px', height: 300, boxShadow: TL8.shadowSm }}>
                <span style={{ width: 50, height: 50, borderRadius: 12, background: TL8.bg2, border: `1.5px solid ${x.a}`, color: x.a, fontFamily: DISP8, fontSize: 26, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{x.n}</span>
                <div style={{ fontFamily: DISP8, fontSize: 22, fontWeight: 700, color: TL8.ink, margin: '16px 0 12px' }}>{x.name}</div>
                <div style={{ fontFamily: DISP8, fontSize: 17.5, color: TL8.mut, lineHeight: 1.44 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SceneM8>
  );
}

// ── Demo en vivo · el SCADA operando ──────────────────────────────────────────
function S_RunDemo({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  // phased: start → level rises → temp reaches SP → alarm at end
  const lvl = 0.35 + 0.4 * clamp(lt / 8, 0, 1) + 0.03 * Math.sin(lt);
  const temp = 40 + 35 * clamp(lt / 7, 0, 1);
  const pumpOn = lt > 1.5;
  const alarm = lvl > 0.74;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Escenario 1 en vivo · arranque de planta" y="7%" color={TL8.grn} />
      <HMIFrameM8 x={260} y={210} w={1400} h={680} title="Vista_General — operación" t={t} appear={s + 1.0} tabs={['General', 'Alarmas']}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 48, background: '#23262d', borderBottom: `1px solid ${TL8.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', fontFamily: MONO8, fontSize: 14, color: TL8.mut }}>
          <span>PLANTA TRATAMIENTO DE AGUA</span>
          <span style={{ color: alarm ? TL8.red : TL8.grn }}>{alarm ? '▲ ALARMA ACTIVA' : '● OPERACIÓN'}</span>
        </div>
        <div style={{ position: 'absolute', left: 60, top: 90 }}>
          <svg width="200" height="240" style={{ overflow: 'visible' }}>
            <TankM8 x={30} y={20} w={140} h={190} level={lvl} accent={TL8.steel} tag="T-101" valTxt={(lvl * 4).toFixed(1) + ' m'} t={t} appear={s + 1.4} alarm={alarm} />
          </svg>
        </div>
        <div style={{ position: 'absolute', left: 540, top: 110 }}>
          <GaugeM8 x={0} y={0} value={temp.toFixed(0)} frac={temp / 100} unit="°C" label="Reactor · SP 75" accent={TL8.honey} t={t} appear={s + 1.6} size={200} />
        </div>
        <div style={{ position: 'absolute', left: 960, top: 130 }}>
          <LedM8 x={0} y={0} on={pumpOn} color={TL8.grn} label="Bomba P-101" sub={pumpOn ? 'CORRIENDO' : 'DETENIDA'} t={t} appear={s + 1.8} />
          <LedM8 x={0} y={70} on={temp > 60} color={TL8.grn} label="Agitador AG-301" sub={temp > 60 ? 'ON' : 'OFF'} t={t} appear={s + 2.0} />
          <div style={{ position: 'absolute', left: 0, top: 160, fontFamily: MONO8, fontSize: 16, color: TL8.honey }}>FT-101: {(pumpOn ? 95 : 0)} m³/h</div>
          <div style={{ position: 'absolute', left: 0, top: 196, fontFamily: MONO8, fontSize: 16, color: alarm ? TL8.red : TL8.mut }}>{alarm ? 'LT101.HH disparada' : 'Sin alarmas'}</div>
        </div>
      </HMIFrameM8>
      <CapM8 start={s + dur - 3.0} dur={2.6} size={23} weight={500} color={TL8.mut} y="93%" width={1500}>Del arranque a la alarma: el sistema completo respondiendo en tiempo real al proceso.</CapM8>
    </SceneM8>
  );
}

const SCENES_M8C11 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={11} seccion="Proyecto integrador" title="Práctica: SCADA completo del proyecto" dudur="35–40 min · proyecto" objetivo="Integrar todos los componentes en un SCADA funcional completo, conectado al PLC, con vistas, alarmas, tendencias, reportes y seguridad para la planta de tratamiento de agua." />, dur: 7, label: 'Apertura' },
  { C: S_Checklist, dur: 15, label: 'Lista de verificación' },
  { C: S_Scenarios, dur: 14, label: '4 escenarios de prueba' },
  { C: S_RunDemo, dur: 16, label: 'Demo en vivo' },
  { C: (p) => <ClosingM8 {...p} line="Este es el momento en que todo el curso converge: sensores, PLC, redes y SCADA forman un sistema vivo que un operador real podría usar mañana." activity="Entregable final: proyecto Ignition exportado (.gwbk), capturas de todas las vistas, del reporte de turno, de la Vista de Alarmas con una alarma activa, del Easy Chart con ≥ 1 h de tendencia, y un documento técnico (2 págs) con las decisiones de diseño." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M8C11 = SCENES_M8C11;
