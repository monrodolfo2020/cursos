// m11c7.jsx — "Documentación técnica profesional"
// After m11-lib.jsx. Exports SCENES_M11C7.

// ── Los 7 documentos del proyecto ─────────────────────────────────────────────
function S_Docs({ start, dur }) {
  const t = useTime(); const s = start;
  const docs = [
    { ic: '📐', name: 'P&ID Final', d: 'A2/A3 · toda la instrumentación y lazos verificados', a: TL11.cyan },
    { ic: '📋', name: 'Lista de Instrumentos', d: 'Index: tag, modelo, rango, calibración, mantenimiento', a: TL11.gold },
    { ic: '📑', name: 'FDS', d: 'Especificación funcional: QUÉ hace el sistema (~15–20 pág)', a: TL11.lime },
    { ic: '👷', name: 'Manual de Operación', d: 'Para el operador: arranque, alarmas, setpoints', a: TL11.cyanLt },
    { ic: '🔧', name: 'Manual de Mantenimiento', d: 'Calibración, sustitución con LOTO, plan preventivo', a: TL11.org },
    { ic: '📊', name: 'Informe Técnico', d: 'Resumen del proyecto · 8–12 páginas', a: TL11.lime },
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="El paquete de documentación" y="8%" />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="14%" width={1560}>Lo que un cliente necesita para operar y mantener.</CapM11>
      <div style={{ position: 'absolute', left: 130, top: 270, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {docs.map((x, i) => {
          const ap = pop11(t, s + 1.1 + i * 0.26, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', background: `linear-gradient(160deg, ${TL11.paper}, ${TL11.bg2})`, border: `1px solid ${TL11.lineS}`, borderRadius: 12, padding: '22px 24px', height: 200 }}>
              <div style={{ fontSize: 30, lineHeight: 1 }}>{x.ic}</div>
              <div style={{ fontFamily: DISP11, fontSize: 22, fontWeight: 700, color: x.a, margin: '12px 0 8px' }}>{x.name}</div>
              <div style={{ fontFamily: DISP11, fontSize: 16.5, color: TL11.mut, lineHeight: 1.42 }}>{x.d}</div>
            </div>
          );
        })}
      </div>
      <CapM11 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL11.cyanLt} y="89%" width={1560}>La diferencia entre un aficionado y un profesional no es el código: es la <b style={{ color: TL11.ink }}>documentación</b> que lo acompaña.</CapM11>
    </SceneM11>
  );
}

// ── FDS vs Manual de operación ────────────────────────────────────────────────
function S_FDS({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Cada documento, su lector" y="9%" />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>El FDS dice <span style={{ color: TL11.lime }}>qué</span> hace · el manual dice <span style={{ color: TL11.cyan }}>cómo</span> usarlo.</CapM11>
      <InfoCardM11 x={250} y={310} w={640} h={360} accent={TL11.lime} title="FDS · Functional Design Spec" sub="Para ingeniería y cliente. Describe el proceso, cada lazo (variable, SP, actuador, límites), los enclavamientos, las secuencias, los modos, las alarmas y la interfaz SCADA. Sin código — solo comportamiento." appear={s + 1.3} t={t} />
      <InfoCardM11 x={1030} y={310} w={640} h={360} accent={TL11.cyan} title="Manual de Operación" sub="Para el operador de turno. Lenguaje claro, sin ecuaciones: cómo navegar el SCADA, arrancar y parar la planta, qué hacer cuando suena cada alarma, cómo cambiar un setpoint y los contactos de emergencia." appear={s + 1.8} t={t} />
    </SceneM11>
  );
}

// ── Manual de mantenimiento ───────────────────────────────────────────────────
function S_Maint({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Manual de mantenimiento · resolución de problemas" y="9%" color={TL11.org} />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Síntoma → causa probable → solución.</CapM11>
      <TableM11 x={210} y={290} w={1500} t={t} appear={s + 1.2} accentCol={2}
        headers={['Síntoma', 'Causa probable', 'Solución']}
        colTemplate="1.3fr 1.4fr 1.6fr"
        rows={[
          ['LT-101 marca Bad', 'Cable cortado o transmisor sin energía', 'Verificar lazo 4-20 mA y alimentación'],
          ['Cloro no alcanza SP', 'Dosificadora obstruida o sin reactivo', 'Revisar bomba FY-501 y tanque de cloro'],
          ['pH errático', 'Electrodo contaminado', 'Limpiar electrodo · recalibrar 3 puntos'],
          ['P-101 no arranca', 'Guardamotor disparado (OLS-101)', 'Resetear guardamotor · verificar motor'],
        ]} />
      <CapM11 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL11.cyanLt} y="87%" width={1560}>Más: procedimiento de calibración por tipo, sustitución con pasos LOTO del Módulo 9, plan preventivo y lista de repuestos críticos en stock.</CapM11>
    </SceneM11>
  );
}

const SCENES_M11C7 = [
  { C: (p) => <TitleCardM11 {...p} claseNo={7} seccion="Fase 4 · Entrega" fase="Fase 4" title="Documentación técnica profesional" dudur="25–28 min" objetivo="Producir el paquete completo de documentación técnica del proyecto según los estándares de la industria: todo lo que un cliente o mantenimiento necesita para operar el sistema." />, dur: 7, label: 'Apertura' },
  { C: S_Docs, dur: 14, label: 'Los 7 documentos' },
  { C: S_FDS, dur: 13, label: 'FDS vs Manual' },
  { C: S_Maint, dur: 14, label: 'Manual de mantenimiento' },
  { C: (p) => <ClosingM11 {...p} line="El proyecto que no está documentado no existe para quien llega después. La documentación es tu firma profesional — y lo que hace que el sistema siga vivo cuando tú ya no estás." activity="Produce el paquete completo: P&ID final, lista de instrumentos, FDS (15–20 pág), manual de operación, manual de mantenimiento e informe técnico del proyecto (8–12 pág). Todo en PDF, con formato profesional y consistente." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M11C7 = SCENES_M11C7;
