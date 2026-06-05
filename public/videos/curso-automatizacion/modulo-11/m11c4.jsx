// m11c4.jsx — "Comunicaciones, redes y pruebas del sistema de control (FAT)"
// After m11-lib.jsx. Exports SCENES_M11C4.

// ── La interfaz DB_HMI_Data ───────────────────────────────────────────────────
function S_Interface({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="El contrato PLC ↔ SCADA" y="9%" color={TL11.cyan} />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Un solo Data Block define qué ve y qué manda el SCADA.</CapM11>
      <div style={{ position: 'absolute', left: 230, top: 300, width: 700 }}>
        <div style={{ fontFamily: MONO11, fontSize: 15, color: TL11.cyanLt, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>SCADA lee (Read)</div>
        {['PV_Nivel_T101 : REAL', 'PV_Cloro_AT501 : REAL', 'P101_Corriendo : BOOL', 'Secuencia_Step : INT', 'Mensaje_Operador : STRING'].map((x, i) => {
          const ap = pop11(t, s + 1.2 + i * 0.18, 0.5, 12);
          return <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, fontFamily: MONO11, fontSize: 17, color: TL11.ink, padding: '11px 20px', marginBottom: 9, background: TL11.paper, borderLeft: `3px solid ${TL11.cyan}`, borderRadius: 8 }}>{x}</div>;
        })}
      </div>
      <div style={{ position: 'absolute', left: 990, top: 300, width: 700 }}>
        <div style={{ fontFamily: MONO11, fontSize: 15, color: TL11.limeLt, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>SCADA escribe (Write)</div>
        {['Cmd_Arranque_Planta : BOOL', 'Cmd_Paro_Emergencia : BOOL', 'SP_Nivel_Setpoint : REAL', 'SP_Cloro_Setpoint : REAL', 'Modo_P101 : INT'].map((x, i) => {
          const ap = pop11(t, s + 1.6 + i * 0.18, 0.5, 12);
          return <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, fontFamily: MONO11, fontSize: 17, color: TL11.ink, padding: '11px 20px', marginBottom: 9, background: TL11.paper, borderLeft: `3px solid ${TL11.lime}`, borderRadius: 8 }}>{x}</div>;
        })}
      </div>
      <CapM11 start={s + 3.6} dur={dur - 3.9} size={22} weight={500} color={TL11.mut} y="90%" width={1560}>DB_HMI_Data: R/W · DB_Proceso y DB_Alarmas: solo lectura. Seguridad Basic256Sha256 en el servidor OPC-UA de la CPU.</CapM11>
    </SceneM11>
  );
}

// ── Qué es una FAT ────────────────────────────────────────────────────────────
function S_FAT({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Factory Acceptance Test" y="13%" color={TL11.gold} />
      <CapM11 start={s + 0.6} dur={2.4} size={48} weight={600} y="26%" width={1620}>Probar <span style={{ color: TL11.lime }}>sistemáticamente</span> antes de tocar la planta real.</CapM11>
      <div style={{ position: 'absolute', left: '50%', top: 470, transform: 'translateX(-50%)', display: 'flex', gap: 20 }}>
        {[['DI / DO', 'forzar entradas, ver salidas', TL11.cyan], ['Lazos PID', 'escalón de SP, rechazo de perturbación', TL11.gold], ['Secuencia', 'arranque normal y con fallos', TL11.lime], ['ESD', 'paro de emergencia', TL11.red]].map((x, i) => {
          const ap = pop11(t, s + 1.6 + i * 0.3, 0.5, 18);
          return <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, width: 350, background: TL11.paper, border: `1px solid ${x[2]}`, borderRadius: 12, padding: '24px 24px', textAlign: 'center', boxShadow: TL11.shadowSm }}><div style={{ fontFamily: DISP11, fontSize: 24, fontWeight: 700, color: x[2] }}>{x[0]}</div><div style={{ fontFamily: DISP11, fontSize: 16.5, color: TL11.mut, marginTop: 8, lineHeight: 1.35 }}>{x[1]}</div></div>;
        })}
      </div>
      <CapM11 start={s + 3.6} dur={dur - 3.9} size={23} weight={500} color={TL11.cyanLt} y="80%" width={1560}>En el proyecto, la FAT se hace con <b style={{ color: TL11.ink }}>PLCSIM</b>: cada prueba con su procedimiento, resultado esperado y Pass/Fail documentado.</CapM11>
    </SceneM11>
  );
}

// ── Tabla de pruebas ──────────────────────────────────────────────────────────
function S_Tests({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Protocolo de pruebas · registro" y="9%" />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Cada prueba se ejecuta y se firma.</CapM11>
      <TableM11 x={210} y={290} w={1500} t={t} appear={s + 1.2} accentCol={3}
        headers={['ID', 'Prueba', 'Resultado esperado', 'Estado']}
        colTemplate="0.7fr 1.5fr 2fr 0.8fr"
        rows={[
          ['DI-002', 'ESD-001 activo', 'Todas las bombas paran · alarma crítica', '✓ Pass'],
          ['SEQ-002', 'Arranque con LSLL activo', 'Rechazo con mensaje específico', '✓ Pass'],
          ['SEQ-003', 'Falla P-101 en arranque', 'Step 99 · "P-101 no confirmó"', '✓ Pass'],
          ['PID-001', 'Escalón SP de LIC-101', 'PV sube hacia SP, CV aumenta', '✓ Pass'],
          ['SEQ-004', 'PDT-401 > 0.35 bar', 'Inicia secuencia de retrolavado', '✓ Pass'],
        ]} />
      <CapM11 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL11.cyanLt} y="87%" width={1560}>Si una prueba falla, se corrige el programa y se vuelve a probar. La planta no avanza con un solo Fail abierto.</CapM11>
    </SceneM11>
  );
}

// ── Sintonía PID ──────────────────────────────────────────────────────────────
function S_Tuning({ start, dur }) {
  const t = useTime(); const s = start;
  const reveal = clamp((t - s - 1.3) / 2.2, 0, 1);
  const W = 820, H = 300, x0 = 150, y0 = 300;
  const N = Math.round(70 * reveal);
  let sp = `M ${x0} ${y0 + H * 0.7} L ${x0 + W * 0.2} ${y0 + H * 0.7} L ${x0 + W * 0.2} ${y0 + H * 0.28} L ${x0 + W} ${y0 + H * 0.28}`;
  let pv = `M ${x0} ${y0 + H * 0.7}`;
  for (let i = 0; i <= N; i++) {
    const f = i / 70; const x = x0 + W * f;
    let y;
    if (f < 0.2) y = y0 + H * 0.7;
    else { const tt = (f - 0.2) / 0.8; const resp = 1 - Math.exp(-tt * 5) * Math.cos(tt * 9); y = y0 + H * 0.7 - H * 0.42 * clamp(resp, -0.2, 1.15); }
    pv += ` L ${x} ${y}`;
  }
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Sintonía de los lazos PID" y="9%" color={TL11.gold} />
      <CapM11 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>Auto-tune del PID_Compact, ajuste si el sobrepaso &gt; 10%.</CapM11>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={x0} y1={y0} x2={x0} y2={y0 + H} stroke={TL11.lineS} strokeWidth="2" />
        <line x1={x0} y1={y0 + H} x2={x0 + W} y2={y0 + H} stroke={TL11.lineS} strokeWidth="2" />
        <path d={sp} fill="none" stroke={TL11.dim} strokeWidth="2.4" strokeDasharray="8 6" />
        <path d={pv} fill="none" stroke={TL11.lime} strokeWidth="3.4" strokeLinecap="round" />
        <text x={x0 + W - 6} y={y0 + H * 0.24} fill={TL11.dim} fontFamily={MONO11} fontSize="15" textAnchor="end">SP</text>
        <text x={x0 + W - 6} y={y0 + H * 0.62} fill={TL11.lime} fontFamily={MONO11} fontSize="15" textAnchor="end">PV (LIC-101)</text>
      </svg>
      <InfoCardM11 x={1060} y={300} w={700} h={170} accent={TL11.gold} title="Parámetros documentados" sub="Kp, Ti y Td finales de cada lazo, registrados con su justificación. Cloro: conservador (proceso lento). Caudal: estándar (respuesta rápida)." appear={s + 2.6} t={t} />
      <InfoCardM11 x={1060} y={490} w={700} h={170} accent={TL11.cyan} title="Sobrepaso < 10%" sub="Si el auto-tune deja oscilación, se baja la ganancia a mano. Mejor lento y estable que rápido e inestable." appear={s + 3.1} t={t} />
    </SceneM11>
  );
}

const SCENES_M11C4 = [
  { C: (p) => <TitleCardM11 {...p} claseNo={4} seccion="Fase 2 · PLC" fase="Fase 2" title="Comunicaciones, redes y pruebas (FAT)" dudur="28–30 min" objetivo="Configurar las comunicaciones del sistema de control (OPC-UA, Modbus TCP), ejecutar la FAT simplificada con PLCSIM, sintonizar los lazos PID y documentar todos los resultados." />, dur: 7, label: 'Apertura' },
  { C: S_Interface, dur: 14, label: 'Interfaz PLC↔SCADA' },
  { C: S_FAT, dur: 13, label: 'Qué es una FAT' },
  { C: S_Tests, dur: 14, label: 'Tabla de pruebas' },
  { C: S_Tuning, dur: 14, label: 'Sintonía PID' },
  { C: (p) => <ClosingM11 {...p} line="La FAT es donde encuentras los errores antes de que cuesten dinero o seguridad. Un sistema probado sistemáticamente llega a la planta con confianza, no con sorpresas." activity="Entrega la tabla FAT completa con todos los resultados, los parámetros PID finales sintonizados con su justificación, y evidencia en video o capturas de al menos 5 pruebas ejecutadas en PLCSIM." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M11C4 = SCENES_M11C4;
