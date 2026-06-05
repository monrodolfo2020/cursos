// m11c2.jsx — "Selección de instrumentos y diseño del sistema de control"
// After m11-lib.jsx. Exports SCENES_M11C2.

// ── Selección de la CPU ───────────────────────────────────────────────────────
function S_CPU({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Selección del hardware de control" y="10%" />
      <CapM11 start={s + 0.6} dur={2.0} size={42} weight={600} y="18%" width={1620}>52 señales + 20% margen → <span style={{ color: TL11.lime }}>S7-1500 CPU 1515-2 PN</span>.</CapM11>
      <div style={{ position: 'absolute', left: 160, top: 350, width: 760 }}>
        {[['OPC-UA nativo', 'conexión directa con Ignition, sin gateways'], ['4 lazos PID', 'capacidad de procesamiento sobrada'], ['Profinet integrado', 'red industrial + ET 200SP remotos'], ['RS-485', 'Modbus RTU para el medidor de energía']].map((x, i) => {
          const ap = pop11(t, s + 1.3 + i * 0.3, 0.5, 14);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, background: TL11.paper, border: `1px solid ${TL11.lineS}`, borderLeft: `4px solid ${TL11.cyan}`, borderRadius: 10, padding: '15px 22px' }}>
              <span style={{ fontFamily: DISP11, fontSize: 20, fontWeight: 700, color: TL11.ink, minWidth: 220 }}>{x[0]}</span>
              <span style={{ fontFamily: DISP11, fontSize: 16.5, color: TL11.mut }}>{x[1]}</span>
            </div>
          );
        })}
      </div>
      <TableM11 x={970} y={350} w={800} t={t} appear={s + 2.2} accentCol={2}
        headers={['Módulo', 'Señales', 'Margen']}
        colTemplate="1.4fr 1.3fr 0.8fr"
        rows={[
          ['DI (CPU+SM)', '24 nec / 48 disp', '+24'],
          ['DO (CPU+SM)', '14 nec / 32 disp', '+18'],
          ['AI ×2 (8+8)', '10 nec / 16 disp', '+6'],
          ['AO (4×U/I)', '4 nec / 4 disp', '0'],
        ]} />
      <CapM11 start={s + 4.2} dur={dur - 4.5} size={22} weight={500} color={TL11.cyanLt} y="90%" width={1560}>El S7-1200 se queda corto. El 1515 deja margen para crecer — salvo AO, donde habría que sumar un módulo si la planta se expande.</CapM11>
    </SceneM11>
  );
}

// ── Mapa de direcciones de E/S ────────────────────────────────────────────────
function S_IOmap({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Asignación de direcciones en TIA Portal" y="9%" color={TL11.gold} />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>De la señal física a la dirección del PLC.</CapM11>
      <TableM11 x={260} y={290} w={1400} t={t} appear={s + 1.2} accentCol={3}
        headers={['Tag', 'Descripción', 'Módulo', 'Dirección']}
        colTemplate="1fr 1.7fr 1.2fr 1fr"
        rows={[
          ['LSLL-101', 'Nivel bajo-bajo T-101', 'DI CPU', 'I0.0'],
          ['OLS-101', 'Falla guardamotor P-101', 'DI CPU', 'I0.3'],
          ['Y-101', 'Arranque P-101', 'DO CPU', 'Q0.0'],
          ['LT-101', 'Nivel T-101', 'AI slot 3', 'IW96'],
          ['FT-101', 'Caudal entrada', 'AI slot 3', 'IW98'],
          ['FY-201', 'VFD P-101', 'AO slot 5', 'QW96'],
        ]} />
      <CapM11 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL11.mut} y="87%" width={1560}>Las 52 filas de esta tabla son el puente entre el cableado de campo y el programa. Un error aquí = un equipo que no responde.</CapM11>
    </SceneM11>
  );
}

// ── Arquitectura de red ───────────────────────────────────────────────────────
function S_Network({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Arquitectura de red de la planta" y="8%" color={TL11.cyan} />
      <CapM11 start={s + 0.6} dur={1.8} size={42} weight={600} y="14%" width={1560}>Todo cuelga del switch SCALANCE · 192.168.10.x</CapM11>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM11 x={810} y={300} w={300} h={100} label="SCALANCE XC216" sub=".100 · gestión" accent={TL11.cyan} t={t} appear={s + 1.2} />
        {[
          ['CPU S7-1515', '.1 · OPC-UA', TL11.lime, 230, 520],
          ['Ignition SCADA', '.10 · client', TL11.gold, 530, 520],
          ['ET 200SP Norte', '.20 · Profinet', TL11.cyanLt, 830, 520],
          ['ET 200SP Sur', '.21 · Profinet', TL11.cyanLt, 1130, 520],
          ['VFD P-101', '.30 · Modbus TCP', TL11.org, 1430, 520],
        ].map((n, i) => {
          const cx = n[3] + 130;
          return <g key={i}><LinkM11 x1={960} y1={400} x2={cx} y2={520} start={s + 1.6 + i * 0.18} t={t} color={TL11.cyan} packets={i < 3} dur={0.5} /><NodeM11 x={n[3]} y={520} w={260} h={100} label={n[0]} sub={n[1]} accent={n[2]} t={t} appear={s + 1.7 + i * 0.18} online /></g>;
        })}
        <ArrowM11 x1={1110} y1={350} x2={1340} y2={350} start={s + 3.2} t={t} color={TL11.dim} label="firewall → IT" dashed />
      </svg>
      <CapM11 start={s + 3.8} dur={dur - 4.1} size={22} weight={500} color={TL11.mut} y="78%" width={1560}>Profinet para E/S remota e HMI · Modbus TCP para los variadores · OPC-UA hacia el SCADA · firewall hacia la red corporativa.</CapM11>
    </SceneM11>
  );
}

// ── Estrategia: 3 modos de operación ──────────────────────────────────────────
function S_Modes({ start, dur }) {
  const t = useTime(); const s = start;
  const modes = [
    { k: 'AUTO', d: 'El PLC controla todo: lazos PID en automático, secuencias gestionadas. El operador solo cambia setpoints.', a: TL11.lime },
    { k: 'MANUAL', d: 'El operador arranca/para cada equipo y ajusta la CV directamente. Para mantenimiento y comisionado.', a: TL11.gold },
    { k: 'OOS', d: 'Fuera de servicio: el equipo está indisponible. El PLC no lo arranca y la planta opera con lo disponible.', a: TL11.org },
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Estrategia de control · modos de operación" y="9%" />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1500}>Cada equipo, tres modos posibles.</CapM11>
      <div style={{ position: 'absolute', left: 200, top: 340, width: 1520, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {modes.map((x, i) => {
          const ap = pop11(t, s + 1.2 + i * 0.4, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', background: `linear-gradient(160deg, ${TL11.paper}, ${TL11.bg2})`, border: `1px solid ${x.a}`, borderRadius: 14, padding: '28px 26px', height: 280, boxShadow: TL11.shadowSm }}>
              <div style={{ fontFamily: DISP11, fontSize: 34, fontWeight: 700, color: x.a }}>{x.k}</div>
              <div style={{ fontFamily: DISP11, fontSize: 18.5, color: TL11.mut, marginTop: 18, lineHeight: 1.48 }}>{x.d}</div>
            </div>
          );
        })}
      </div>
    </SceneM11>
  );
}

const SCENES_M11C2 = [
  { C: (p) => <TitleCardM11 {...p} claseNo={2} seccion="Fase 1 · Ingeniería" fase="Fase 1" title="Selección de instrumentos y diseño del control" dudur="25–28 min" objetivo="Seleccionar el hardware de control (PLC + módulos de E/S), dimensionar la instrumentación, diseñar la arquitectura de red y definir la estrategia de control completa antes de programar." />, dur: 7, label: 'Apertura' },
  { C: S_CPU, dur: 14, label: 'Selección de CPU' },
  { C: S_IOmap, dur: 13, label: 'Mapa de E/S' },
  { C: S_Network, dur: 14, label: 'Arquitectura de red' },
  { C: S_Modes, dur: 13, label: 'Modos de operación' },
  { C: (p) => <ClosingM11 {...p} line="Diseñar antes de programar evita el 90% de los problemas. Cuando el hardware, la red y la estrategia están claros sobre papel, el PLC casi se programa solo." activity="Entrega la tabla de selección de hardware justificada, la tabla completa de asignación de direcciones de E/S (52 señales), el diagrama de red con todas las IP, y el documento de estrategia de control con una página por lazo y la secuencia de arranque descrita paso a paso." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M11C2 = SCENES_M11C2;
