// m8c8.jsx — "Scripting en Ignition: Python (Jython) para automatizar el SCADA"
// After m8-lib.jsx. Exports SCENES_M8C8.

// ── Python en Ignition (Jython) ───────────────────────────────────────────────
function S_Jython({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Python dentro del SCADA" y="12%" color={TL8.steel} />
      <CapM8 start={s + 0.6} dur={2.4} size={48} weight={600} y="23%" width={1620}>Ignition usa <span style={{ color: TL8.honey }}>Jython</span> — Python 2.7 sobre Java.</CapM8>
      <div style={{ position: 'absolute', left: '50%', top: 480, transform: 'translateX(-50%)', display: 'flex', gap: 18 }}>
        {[['system.*', 'El módulo con todas las funciones del SCADA', TL8.coral], ['if · for · def', 'Lo básico de Python basta para la mayoría', TL8.steel], ['Sin compilar', 'El script corre al instante, sin recompilar', TL8.honey]].map((x, i) => {
          const ap = pop8(t, s + 1.6 + i * 0.3, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, width: 400, background: TL8.paper, border: `1px solid ${x[2]}`, borderRadius: 12, padding: '26px 24px', boxShadow: TL8.shadowSm }}>
              <div style={{ fontFamily: MONO8, fontSize: 23, fontWeight: 700, color: x[2] }}>{x[0]}</div>
              <div style={{ fontFamily: DISP8, fontSize: 18.5, color: TL8.mut, marginTop: 10, lineHeight: 1.4 }}>{x[1]}</div>
            </div>
          );
        })}
      </div>
    </SceneM8>
  );
}

// ── Los 4 contextos de scripting ──────────────────────────────────────────────
function S_Contexts({ start, dur }) {
  const t = useTime(); const s = start;
  const ctx = [
    { n: '1', name: 'Component Event', d: 'Al hacer clic, cambiar un valor o cargar una pantalla.', a: TL8.coral },
    { n: '2', name: 'Gateway Timer', d: 'Cada N segundos: acumuladores, cálculos periódicos.', a: TL8.honey },
    { n: '3', name: 'Startup', d: 'Al cargar el proyecto: verificar conexiones, inicializar.', a: TL8.steel },
    { n: '4', name: 'Shutdown', d: 'Al cerrar: guardar estado, notificar el cierre.', a: TL8.grn },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Dónde vive el código" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={46} weight={600} y="16%" width={1500}>Cuatro contextos de ejecución.</CapM8>
      <div style={{ position: 'absolute', left: 130, top: 320, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
        {ctx.map((x, i) => {
          const ap = pop8(t, s + 1.2 + i * 0.4, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
              <div style={{ position: 'relative', background: `linear-gradient(160deg, ${TL8.paper}, ${TL8.bg2})`, border: `1px solid ${TL8.lineS}`, borderRadius: 12, padding: '24px 22px', height: 270, boxShadow: TL8.shadowSm }}>
                <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: x.a, borderRadius: 3 }} />
                <span style={{ fontFamily: DISP8, fontSize: 38, fontWeight: 700, color: x.a }}>{x.n}</span>
                <div style={{ fontFamily: DISP8, fontSize: 23, fontWeight: 700, color: TL8.ink, margin: '10px 0 12px' }}>{x.name}</div>
                <div style={{ fontFamily: DISP8, fontSize: 18, color: TL8.mut, lineHeight: 1.44 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SceneM8>
  );
}

// ── Funciones system.* más usadas ─────────────────────────────────────────────
function S_SystemFns({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '# Leer un tag', c: TL8.dim },
    { txt: 'v = system.tag.read(', c: TL8.coral },
    { txt: '  "[default]Captacion/LT101").value', c: TL8.ink },
    { txt: '', c: TL8.ink },
    { txt: '# Escribir un setpoint al PLC', c: TL8.dim },
    { txt: 'system.tag.write(', c: TL8.coral },
    { txt: '  "[default]Reactor/SP_Temp", 75.0)', c: TL8.honey },
    { txt: '', c: TL8.ink },
    { txt: '# Consultar el Historian (4 h)', c: TL8.dim },
    { txt: 'd = system.tag.queryTagHistory(', c: TL8.coral },
    { txt: '  paths=["[default]Captacion/LT101"],', c: TL8.steelLt },
    { txt: '  aggregationMode="Average")', c: TL8.ink },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="El vocabulario: system.*" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>Leer, escribir y consultar — la base de todo script.</CapM8>
      <CodeM8 x={150} y={290} w={900} title="Python · system.tag" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.4, 0, 1)} />
      <InfoCardM8 x={1110} y={300} w={640} h={185} accent={TL8.steel} title="Lectura en lote" sub="system.tag.read([...]) lee varios tags en una sola llamada → mucho más eficiente que una por una." appear={s + 2.8} t={t} />
      <InfoCardM8 x={1110} y={510} w={640} h={185} accent={TL8.honey} title="Más funciones" sub="system.gui.confirm · system.nav.navigate · system.security.getUsername · system.db.runUpdateQuery." appear={s + 3.3} t={t} />
    </SceneM8>
  );
}

// ── Secuencia de arranque ─────────────────────────────────────────────────────
function S_Sequence({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: 'def arrancarPlanta(event):', c: TL8.coral },
    { txt: '  # 1 · precondiciones', c: TL8.dim },
    { txt: '  n = system.tag.read(', c: TL8.ink },
    { txt: '    "[default]Captacion/LT101").value', c: TL8.steelLt },
    { txt: '  if n < 0.5:', c: TL8.honey },
    { txt: '    system.gui.errorBox("Nivel bajo")', c: TL8.ink },
    { txt: '    return', c: TL8.honey },
    { txt: '  # 2 · confirmar con el operador', c: TL8.dim },
    { txt: '  if not system.gui.confirm(', c: TL8.ink },
    { txt: '    "¿Iniciar arranque?"): return', c: TL8.ink },
    { txt: '  # 3 · arrancar bomba + registrar', c: TL8.dim },
    { txt: '  system.tag.write(".../Cmd_Arranque",', c: TL8.coral },
    { txt: '    True)', c: TL8.ink },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Secuencia de arranque automatizada" y="9%" color={TL8.coral} />
      <CapM8 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>Un botón, un script: validar → confirmar → arrancar → registrar.</CapM8>
      <CodeM8 x={150} y={290} w={880} title="Python · onClick «Arrancar Planta»" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.6, 0, 1)} />
      <div style={{ position: 'absolute', left: 1090, top: 320, width: 660 }}>
        {['Verifica precondiciones (nivel mínimo)', 'Pide confirmación al operador', 'Escribe el comando de arranque al PLC', 'Registra el evento en la auditoría'].map((x, i) => {
          const ap = pop8(t, s + 2.6 + i * 0.35, 0.5, 14);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderRadius: 10, padding: '16px 22px' }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: TL8.coralWash, border: `1px solid ${TL8.coral}`, color: TL8.coral, fontFamily: MONO8, fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ fontFamily: DISP8, fontSize: 19, color: TL8.ink }}>{x}</span>
            </div>
          );
        })}
        <div style={{ opacity: clamp((t - (s + 4.4)) / 0.5, 0, 1), marginTop: 6, fontFamily: DISP8, fontSize: 17, color: TL8.steelLt, lineHeight: 1.4 }}>La espera entre pasos la maneja la máquina de estados del PLC — nunca un <code style={{ fontFamily: MONO8, color: TL8.honey }}>time.sleep()</code> largo en el script.</div>
      </div>
    </SceneM8>
  );
}

const SCENES_M8C8 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={8} seccion="Scripting" title="Scripting Python en Ignition" dudur="18–20 min" objetivo="Usar Python (Jython) para extender el SCADA: scripts de eventos, temporizadores de Gateway y secuencias de arranque automatizadas desde el SCADA." />, dur: 7, label: 'Apertura' },
  { C: S_Jython, dur: 12, label: 'Python en Ignition' },
  { C: S_Contexts, dur: 13, label: 'Los 4 contextos' },
  { C: S_SystemFns, dur: 14, label: 'Funciones system.*' },
  { C: S_Sequence, dur: 15, label: 'Secuencia de arranque' },
  { C: (p) => <ClosingM8 {...p} line="El scripting convierte el SCADA de un tablero pasivo en un asistente activo: valida, confirma, secuencia y registra — siempre dejando el control de tiempo real al PLC." activity="Implementa: botón de arranque de bomba con validación de nivel, entrada de setpoint con validación de rango, un Gateway timer cada 60 s que actualiza el agua tratada, y un startup que avisa si algún tag tiene calidad Bad." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M8C8 = SCENES_M8C8;
