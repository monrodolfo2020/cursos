// m8c10.jsx — "Seguridad de usuarios y roles en Ignition"
// After m8-lib.jsx. Exports SCENES_M8C10.

// ── Por qué seguridad ─────────────────────────────────────────────────────────
function S_Why({ start, dur }) {
  const t = useTime(); const s = start;
  const r = [
    ['Cualquiera en la red', 'puede cambiar setpoints, arrancar o parar equipos'],
    ['Sin entrenamiento', 'un cambio de SP puede dañar producto o equipo'],
    ['Infraestructura crítica', 'agua y energía son objetivo de ciberataques'],
    ['Los reguladores', 'exigen trazabilidad: quién cambió qué y cuándo'],
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Un SCADA sin control de acceso es peligroso" y="9%" color={TL8.red} />
      <CapM8 start={s + 0.6} dur={2.2} size={46} weight={600} y="18%" width={1560}>El control trae <span style={{ color: TL8.coral }}>responsabilidad</span>: hay que saber quién hace qué.</CapM8>
      <div style={{ position: 'absolute', left: 200, top: 400, width: 1520, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
        {r.map((x, i) => {
          const ap = pop8(t, s + 1.3 + i * 0.3, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 20, background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderLeft: `4px solid ${TL8.red}`, borderRadius: 12, padding: '22px 26px' }}>
              <span style={{ fontFamily: DISP8, fontSize: 21, fontWeight: 700, color: TL8.ink, minWidth: 280 }}>{x[0]}</span>
              <span style={{ fontFamily: DISP8, fontSize: 18, color: TL8.mut, lineHeight: 1.35 }}>{x[1]}</span>
            </div>
          );
        })}
      </div>
    </SceneM8>
  );
}

// ── Roles ─────────────────────────────────────────────────────────────────────
function S_Roles({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="El modelo: roles y zonas" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Cada rol, un conjunto de permisos.</CapM8>
      <TableM8 x={260} y={280} w={1400} t={t} appear={s + 1.2} accentCol={0}
        headers={['Rol', 'Qué hace', 'Permisos clave']}
        colTemplate="0.9fr 1.2fr 1.8fr"
        rows={[
          ['Operador', 'Opera en turno', 'Ver, reconocer alarmas, SP en rango, equipos normales'],
          ['Supervisor', 'Supervisa', '+ SP fuera de rango, reportes, configurar alarmas'],
          ['Ingeniero', 'Configura', '+ parámetros PID, límites de alarma'],
          ['Mantenimiento', 'Mantiene', 'Modo manual, bypass con justificación'],
          ['Administrador', 'Administra', 'Acceso completo: usuarios y roles'],
        ]} />
      <CapM8 start={s + 4.0} dur={dur - 4.3} size={23} weight={500} color={TL8.steelLt} y="86%" width={1560}>Las <b style={{ color: TL8.ink }}>Security Zones</b> en Perspective definen qué roles pueden ver, editar o interactuar con cada componente o vista.</CapM8>
    </SceneM8>
  );
}

// ── Proteger componentes por rol ──────────────────────────────────────────────
function S_Protect({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: 'def cambiarSP(event):', c: TL8.coral },
    { txt: '  roles = system.security.getRoles()', c: TL8.ink },
    { txt: '  if "Ingeniero" not in roles \\', c: TL8.honey },
    { txt: '     and "Administrador" not in roles:', c: TL8.honey },
    { txt: '    system.gui.errorBox(', c: TL8.ink },
    { txt: '      "Sin permisos para PID.")', c: TL8.steelLt },
    { txt: '    return', c: TL8.honey },
    { txt: '  # tiene permiso → continuar', c: TL8.dim },
    { txt: '  system.tag.write(', c: TL8.coral },
    { txt: '    "[default]PID/Kp", nuevo_kp)', c: TL8.ink },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Restringir acciones críticas" y="9%" color={TL8.coral} />
      <CapM8 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>El rol decide antes de tocar el proceso.</CapM8>
      <CodeM8 x={150} y={290} w={900} title="Python · onClick «Cambiar Setpoint PID»" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.2, 0, 1)} />
      <InfoCardM8 x={1110} y={300} w={640} h={185} accent={TL8.steel} title="Visible según rol" sub="En el onOpen de la pantalla: el panel de configuración PID solo aparece para Ingeniero y Admin." appear={s + 2.8} t={t} />
      <InfoCardM8 x={1110} y={510} w={640} h={185} accent={TL8.honey} title="Un mismo SCADA" sub="Cada usuario ve y puede hacer exactamente lo que su rol permite — ni más, ni menos." appear={s + 3.3} t={t} />
    </SceneM8>
  );
}

// ── Auditoría ─────────────────────────────────────────────────────────────────
function S_Audit({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    ['14:32:18', 'jperez', 'Reconoció alarma', 'LT101.HH'],
    ['14:40:02', 'mlopez', 'Cambió SP temp', '73 → 75 °C'],
    ['15:05:44', 'ing.ramos', 'Modificó Kp PID', '1.2 → 1.4'],
    ['15:22:10', 'operador', 'Intento PID', 'DENEGADO'],
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Trazabilidad · auditoría" y="9%" color={TL8.grn} />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Cada acción importante queda <span style={{ color: TL8.grn }}>registrada</span>.</CapM8>
      <div style={{ position: 'absolute', left: '50%', top: 300, transform: 'translateX(-50%)', width: 1320 }}>
        {(() => { const ap = pop8(t, s + 1.2, 0.55, 18); return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL8.lineS}`, boxShadow: TL8.shadow }}>
            <div style={{ display: 'grid', gridTemplateColumns: '180px 200px 1fr 280px', background: TL8.paper2 }}>
              {['Hora', 'Usuario', 'Acción', 'Detalle'].map((h, i) => <div key={i} style={{ padding: '14px 22px', fontFamily: MONO8, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: TL8.steelLt, fontWeight: 700, borderLeft: i ? `1px solid ${TL8.line}` : 'none' }}>{h}</div>)}
            </div>
            {rows.map((r, ri) => {
              const rev = clamp((t - (s + 1.8 + ri * 0.35)) / 0.4, 0, 1);
              const denied = r[3] === 'DENEGADO';
              return (
                <div key={ri} style={{ opacity: rev, display: 'grid', gridTemplateColumns: '180px 200px 1fr 280px', background: ri % 2 ? TL8.bg2 : TL8.paper, borderTop: `1px solid ${TL8.line}` }}>
                  <div style={{ padding: '13px 22px', fontFamily: MONO8, fontSize: 15, color: TL8.dim }}>{r[0]}</div>
                  <div style={{ padding: '13px 22px', fontFamily: MONO8, fontSize: 15, color: TL8.ink, borderLeft: `1px solid ${TL8.line}` }}>{r[1]}</div>
                  <div style={{ padding: '13px 22px', fontFamily: DISP8, fontSize: 17, color: TL8.mut, borderLeft: `1px solid ${TL8.line}` }}>{r[2]}</div>
                  <div style={{ padding: '13px 22px', fontFamily: MONO8, fontSize: 15, color: denied ? TL8.red : TL8.honey, borderLeft: `1px solid ${TL8.line}`, fontWeight: denied ? 700 : 400 }}>{r[3]}</div>
                </div>
              );
            })}
          </div>
        ); })()}
      </div>
      <CapM8 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL8.mut} y="84%" width={1560}>system.db.runUpdateQuery inserta cada cambio en la tabla de auditoría con usuario, timestamp y detalle.</CapM8>
    </SceneM8>
  );
}

const SCENES_M8C10 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={10} seccion="Seguridad" title="Seguridad de usuarios y roles" dudur="14–16 min" objetivo="Implementar el sistema de seguridad de Ignition con roles diferenciados, restringir acciones críticas según autorización y aplicar buenas prácticas de seguridad SCADA." />, dur: 7, label: 'Apertura' },
  { C: S_Why, dur: 12, label: 'Por qué seguridad' },
  { C: S_Roles, dur: 14, label: 'Roles y zonas' },
  { C: S_Protect, dur: 14, label: 'Proteger por rol' },
  { C: S_Audit, dur: 13, label: 'Auditoría' },
  { C: (p) => <ClosingM8 {...p} line="La seguridad no estorba la operación: la hace confiable. Cuando cada acción tiene un nombre detrás, el proceso se vuelve responsable y auditable." activity="Configura el sistema de seguridad: 4 roles y 4 usuarios de prueba. Protege los botones de control (Operador+), los setpoints de PID (Ingeniero+), implementa el registro de auditoría de cambios de SP y prueba iniciando sesión con cada rol." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M8C10 = SCENES_M8C10;
