// m11c3.jsx — "Programación completa del PLC"
// After m11-lib.jsx. Exports SCENES_M11C3.

// ── Estructura del programa ───────────────────────────────────────────────────
function S_Structure({ start, dur }) {
  const t = useTime(); const s = start;
  const blocks = [
    { ob: 'OB100', name: 'Startup', d: 'FC_Inicializar: defaults, verificar módulos', a: TL11.gold },
    { ob: 'OB1', name: 'Main (Ladder)', d: 'Leer AI, modos, FB bombas/válvulas, enclavamientos, secuencias, DB HMI', a: TL11.lime },
    { ob: 'OB30', name: 'Cíclico 100 ms', d: '4 lazos PID: nivel, cloro, caudal + ratio coagulante', a: TL11.cyan },
    { ob: 'OB80/82/86', name: 'Errores', d: 'Watchdog, error de diagnóstico, módulo desconectado', a: TL11.red },
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Arquitectura del programa en TIA Portal" y="9%" />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Cuatro bloques de organización, cada uno su ritmo.</CapM11>
      <div style={{ position: 'absolute', left: 200, top: 300, width: 1520, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {blocks.map((x, i) => {
          const ap = pop11(t, s + 1.2 + i * 0.32, 0.5, 16);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 24, background: TL11.paper, border: `1px solid ${TL11.lineS}`, borderLeft: `5px solid ${x.a}`, borderRadius: 12, padding: '20px 28px' }}>
              <span style={{ fontFamily: MONO11, fontSize: 22, fontWeight: 700, color: x.a, minWidth: 150 }}>{x.ob}</span>
              <span style={{ fontFamily: DISP11, fontSize: 23, fontWeight: 700, color: TL11.ink, minWidth: 220 }}>{x.name}</span>
              <span style={{ fontFamily: DISP11, fontSize: 17.5, color: TL11.mut, lineHeight: 1.35 }}>{x.d}</span>
            </div>
          );
        })}
      </div>
      <CapM11 start={s + 3.6} dur={dur - 3.9} size={23} weight={500} color={TL11.cyanLt} y="88%" width={1560}>Bombas y válvulas se programan <b style={{ color: TL11.ink }}>una vez</b> como FB y se instancian 5 y 3 veces. Es la reutilización del Módulo 6.</CapM11>
    </SceneM11>
  );
}

// ── FB reutilizable de bomba ──────────────────────────────────────────────────
function S_FBpump({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '"FB_Bomba_P101"(', c: TL11.lime },
    { txt: '  Modo        := "DB_HMI".Modo_P101,', c: TL11.ink },
    { txt: '  Perm_1      := NOT LSLL_101,   // nivel', c: TL11.cyanLt },
    { txt: '  Perm_2      := NOT OLS_101,    // motor', c: TL11.cyanLt },
    { txt: '  Perm_3      := NOT ESD_001,    // emerg.', c: TL11.cyanLt },
    { txt: '  Running_FB  := MFS_101,        // confirm', c: TL11.ink },
    { txt: '  DO_Motor    => Y_101,          // contactor', c: TL11.gold },
    { txt: '  Status_Fault=> "DB_Proc".P101_Falla);', c: TL11.ink },
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Un FB, cinco bombas" y="9%" color={TL11.lime} />
      <CapM11 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>Cada instancia, sus propios permisivos.</CapM11>
      <CodeM11 x={150} y={300} w={920} title="SCL · instancia FB_Bomba (P-101)" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 2.8, 0, 1)} />
      <InfoCardM11 x={1130} y={300} w={620} h={185} accent={TL11.cyan} title="Permisivos = seguridad" sub="La bomba solo arranca si los 3 permisivos están OK. El enclavamiento vive dentro del FB, no se puede saltar por error." appear={s + 2.8} t={t} />
      <InfoCardM11 x={1130} y={510} w={620} h={185} accent={TL11.gold} title="Confirmación de marcha" sub="Si Y-101 = 1 pero MFS-101 no confirma en 10 s → falla de arranque. El PLC sabe la diferencia entre «ordené» y «arrancó»." appear={s + 3.3} t={t} />
    </SceneM11>
  );
}

// ── La máquina de estados de arranque (innovación) ────────────────────────────
function S_Sequence({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  const active = clamp(Math.floor(lt / 1.3), 0, 9);
  const steps = [
    { n: '0', label: 'Espera' },
    { n: '1', label: 'Precondiciones' },
    { n: '2', label: 'Arrancar P-101' },
    { n: '3', label: 'Abrir XV-111' },
    { n: '4', label: 'Lazo LIC-101' },
    { n: '5', label: 'Coagulante' },
    { n: '6', label: 'Filtro en servicio' },
    { n: '7', label: 'Arrancar P-302' },
    { n: '8', label: 'Cloro + distribución' },
    { n: '9', label: 'Operación normal' },
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Secuencia de arranque · máquina de estados" y="9%" color={TL11.lime} />
      <CapM11 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>Diez pasos, con timeout y mensaje en cada uno.</CapM11>
      <SequencerM11 x={210} y={290} w={1500} steps={steps} active={active} t={t} appear={s + 1.0} perRow={5} />
      <div style={{ position: 'absolute', left: 210, top: 640, width: 1500 }}>
        {(() => { const ap = pop11(t, s + 2.0, 0.5, 14); const msgs = ['Sistema en espera — presione ARRANCAR PLANTA', 'Verificando precondiciones…', 'Arrancando bomba de captación P-101…', 'Abriendo válvula XV-111…', 'Habilitando lazo de nivel LIC-101…', 'Activando dosificación de coagulante…', 'Poniendo filtro en servicio…', 'Arrancando bomba P-302…', 'Dosificando cloro y bombas de distribución…', 'PLANTA EN OPERACIÓN NORMAL']; return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 18, background: active === 9 ? TL11.limeWash : TL11.paper, border: `1px solid ${active === 9 ? TL11.lime : TL11.lineS}`, borderRadius: 12, padding: '18px 26px' }}>
            <span style={{ fontFamily: MONO11, fontSize: 14, letterSpacing: '0.14em', color: active === 9 ? TL11.lime : TL11.cyan, fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Paso {active} / 9</span>
            <span style={{ fontFamily: DISP11, fontSize: 21, color: TL11.ink, fontWeight: active === 9 ? 700 : 400 }}>{msgs[active]}</span>
          </div>
        ); })()}
      </div>
    </SceneM11>
  );
}

// ── Caso de error en la secuencia ─────────────────────────────────────────────
function S_ErrorState({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '2: // ARRANCAR P-101', c: TL11.dim },
    { txt: '  P101_Cmd_AutoStart := TRUE;', c: TL11.ink },
    { txt: '  Timer(IN := TRUE, PT := T#10s);', c: TL11.cyanLt },
    { txt: '  IF P101_Corriendo THEN', c: TL11.lime },
    { txt: '    Secuencia_Step := 3;', c: TL11.ink },
    { txt: '  ELSIF Timer.Q THEN  // 10s sin confirmar', c: TL11.org },
    { txt: "    Mensaje_Error :=", c: TL11.ink },
    { txt: "      'P-101 no confirmó arranque en 10s';", c: TL11.gold },
    { txt: '    Secuencia_Step := 99;  // ERROR', c: TL11.red },
    { txt: '  END_IF;', c: TL11.ink },
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Cada paso protege contra el fallo" y="9%" color={TL11.red} />
      <CapM11 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>Si algo no confirma a tiempo → estado 99, paro seguro.</CapM11>
      <CodeM11 x={150} y={300} w={920} title="SCL · FC70 Secuencia_Arranque" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.0, 0, 1)} />
      <InfoCardM11 x={1130} y={300} w={620} h={185} accent={TL11.red} title="Estado 99 = ERROR" sub="Para los equipos ordenadamente, muestra el mensaje exacto del fallo y espera el reset del operador. Nunca deja el proceso en limbo." appear={s + 2.8} t={t} />
      <InfoCardM11 x={1130} y={510} w={620} h={185} accent={TL11.gold} title="El operador siempre sabe" sub="Mensaje_Operador y Mensaje_Error se publican al SCADA. La planta nunca falla en silencio." appear={s + 3.3} t={t} />
    </SceneM11>
  );
}

const SCENES_M11C3 = [
  { C: (p) => <TitleCardM11 {...p} claseNo={3} seccion="Fase 2 · PLC" fase="Fase 2" title="Programación completa del PLC" dudur="45–50 min" objetivo="Implementar el programa completo del PLC en TIA Portal: bloques de función, lógica de enclavamientos, lazos PID, las secuencias de arranque y retrolavado y la interfaz con el SCADA." />, dur: 7, label: 'Apertura' },
  { C: S_Structure, dur: 14, label: 'Estructura del programa' },
  { C: S_FBpump, dur: 14, label: 'FB reutilizable de bomba' },
  { C: S_Sequence, dur: 15, label: 'Máquina de estados' },
  { C: S_ErrorState, dur: 14, label: 'Manejo de errores' },
  { C: (p) => <ClosingM11 {...p} line="Esta es la clase donde el proyecto cobra vida: la lógica que escribiste convierte 52 señales en una planta que arranca sola, se protege y le habla al operador en cada paso." activity="Entrega el proyecto TIA Portal completo (.zap) que compile sin errores, capturas del programa online con PLCSIM corriendo y un video de 1–2 min mostrando la secuencia de arranque ejecutándose paso a paso en el simulador." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M11C3 = SCENES_M11C3;
