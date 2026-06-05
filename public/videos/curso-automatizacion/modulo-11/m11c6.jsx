// m11c6.jsx — "Reportes, seguridad y pruebas del SCADA"
// After m11-lib.jsx. Exports SCENES_M11C6.

// ── Reporte de turno ──────────────────────────────────────────────────────────
function S_Report({ start, dur }) {
  const t = useTime(); const s = start;
  const ap = pop11(t, s + 1.1, 0.6, 24);
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Reporte de turno · 3 veces al día" y="7%" color={TL11.gold} />
      <div style={{ position: 'absolute', left: '50%', top: 165, transform: `translateX(-50%) translateY(${ap.ty}px) scale(${ap.sc})`, opacity: ap.op, width: 1000, background: '#f2f4ec', borderRadius: 8, boxShadow: '0 30px 70px rgba(0,0,0,0.6)', padding: '36px 52px', color: '#16201c', fontFamily: DISP11 }}>
        <div style={{ textAlign: 'center', borderBottom: '2px solid #16201c', paddingBottom: 14 }}>
          <div style={{ fontFamily: MONO11, fontSize: 13, letterSpacing: '0.2em', color: '#4a6b3a' }}>PLANTA DE TRATAMIENTO DE AGUA POTABLE</div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>REPORTE DE TURNO</div>
          <div style={{ fontFamily: MONO11, fontSize: 13, color: '#555', marginTop: 6 }}>05/06/2026 · Turno mañana · Operador: J. Pérez</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 22 }}>
          <div>
            <div style={{ fontFamily: MONO11, fontSize: 12.5, letterSpacing: '0.14em', color: '#2a7a4a', fontWeight: 700 }}>PRODUCCIÓN</div>
            {[['Agua tratada', '1.284 m³'], ['Caudal prom. captación', '178 m³/h'], ['Disponibilidad', '99.2 %'], ['Operación normal', '7.9 h']].map((x, i) => { const r = clamp((t - (s + 2.0 + i * 0.2)) / 0.4, 0, 1); return <div key={i} style={{ opacity: r, display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #d6dccb', fontSize: 16 }}><span style={{ color: '#444' }}>{x[0]}</span><span style={{ fontWeight: 700 }}>{x[1]}</span></div>; })}
          </div>
          <div>
            <div style={{ fontFamily: MONO11, fontSize: 12.5, letterSpacing: '0.14em', color: '#2a7a4a', fontWeight: 700 }}>CALIDAD DEL AGUA</div>
            {[['Cloro residual', '0.52 mg/L', '0.2–0.8', true], ['pH', '7.2', '6.5–8.5', true], ['Turbidez ent.', '14 NTU', '< 100', true]].map((x, i) => { const r = clamp((t - (s + 2.6 + i * 0.2)) / 0.4, 0, 1); return <div key={i} style={{ opacity: r, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '7px 0', borderBottom: '1px solid #d6dccb', fontSize: 16 }}><span style={{ color: '#444' }}>{x[0]}</span><span><b>{x[1]}</b> <span style={{ color: '#2a9a4a', fontFamily: MONO11, fontSize: 13 }}>✓ {x[2]}</span></span></div>; })}
          </div>
        </div>
        <div style={{ marginTop: 18, fontFamily: MONO11, fontSize: 13, color: '#555' }}>Alarmas del turno: 2 (1 Medium retrolavado · 1 High pH) · Retrolavados: 1 · Firmas: ________ / ________</div>
      </div>
      <CapM11 start={s + 4.0} dur={dur - 4.3} size={21} weight={500} color={TL11.mut} y="95%" width={1500}>Campos dinámicos por consulta SQL al Historian · el reporte de calidad diario se envía a las 00:00 a laboratorio y regulación.</CapM11>
    </SceneM11>
  );
}

// ── Roles de seguridad ────────────────────────────────────────────────────────
function S_Roles({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Cinco roles, cinco niveles de acceso" y="9%" />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1500}>Cada quien hace exactamente lo que su rol permite.</CapM11>
      <TableM11 x={260} y={290} w={1400} t={t} appear={s + 1.2} accentCol={0}
        headers={['Rol', 'Permisos clave']}
        colTemplate="1fr 2.4fr"
        rows={[
          ['Operador', 'Ver, controlar equipos, reconocer alarmas, SP en rango normal'],
          ['Supervisor', '+ SP fuera de rango, reportes, configurar alarmas'],
          ['Químico', 'Solo lectura de calidad del agua + reportes de calidad'],
          ['Ingeniero', '+ configurar PID, modificar límites de alarma'],
          ['Administrador', 'Acceso completo + gestión de usuarios'],
        ]} />
      <CapM11 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL11.cyanLt} y="87%" width={1560}>El bypass de un enclavamiento exige rol <b style={{ color: TL11.ink }}>Ingeniero</b> + aceptar la responsabilidad en un diálogo de confirmación auditado.</CapM11>
    </SceneM11>
  );
}

// ── Pruebas del SCADA ─────────────────────────────────────────────────────────
function S_SCADATests({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Pruebas del SCADA" y="9%" color={TL11.lime} />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Conectividad, alarmas, tendencias y seguridad.</CapM11>
      <TableM11 x={210} y={290} w={1500} t={t} appear={s + 1.2} accentCol={2}
        headers={['ID', 'Prueba', 'Resultado esperado']}
        colTemplate="1fr 1.7fr 2fr"
        rows={[
          ['SCADA-001', 'Calidad de tags', '0 tags con calidad Bad o Uncertain'],
          ['SCADA-003', 'Arrancar planta desde SCADA', 'El PLC inicia la secuencia de arranque'],
          ['ALARM-001', 'Forzar LT-101 > 3.7 m', 'Alarma HH en < 2s · rojo · bocina'],
          ['SEC-001', 'Operador toca parámetros PID', 'Acceso denegado con mensaje'],
          ['SEC-002', 'Ingeniero cambia Kp', 'Permitido · registrado en auditoría'],
        ]} />
      <CapM11 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL11.mut} y="87%" width={1560}>Todo defecto encontrado se lista con su descripción y la corrección aplicada. La calidad no se asume: se prueba.</CapM11>
    </SceneM11>
  );
}

const SCENES_M11C6 = [
  { C: (p) => <TitleCardM11 {...p} claseNo={6} seccion="Fase 3 · SCADA" fase="Fase 3" title="Reportes, seguridad y pruebas del SCADA" dudur="25–28 min" objetivo="Implementar los reportes automáticos, configurar los roles de seguridad completos del SCADA, ejecutar las pruebas de funcionalidad y usabilidad y documentar los resultados." />, dur: 7, label: 'Apertura' },
  { C: S_Report, dur: 15, label: 'Reporte de turno' },
  { C: S_Roles, dur: 13, label: 'Roles de seguridad' },
  { C: S_SCADATests, dur: 14, label: 'Pruebas del SCADA' },
  { C: (p) => <ClosingM11 {...p} line="Un SCADA no está terminado cuando se ve bien: está terminado cuando genera los reportes que exige la norma, protege cada acción según el rol, y ha pasado todas sus pruebas." activity="Entrega el sistema de seguridad con los 5 roles configurados, el reporte de turno generado con datos reales del Historian, y la tabla completa de pruebas del SCADA con todos los resultados y los defectos corregidos documentados." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M11C6 = SCENES_M11C6;
