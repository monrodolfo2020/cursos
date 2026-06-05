// m7c1.jsx — "Introducción a las redes industriales: ¿por qué comunicar dispositivos?"
// After m7-lib.jsx. Exports SCENES_M7C1.

// ── El problema del cableado punto a punto ────────────────────────────────────
function S_Cabling({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="El mundo antes de las redes" y="10%" color={TL7.red} />
      <CapM7 start={s + 0.6} dur={2.2} size={48} weight={600} y="19%" width={1560}>Cada señal, <span style={{ color: TL7.red }}>su propio par de cables</span> hasta la sala de control.</CapM7>
      <StatM7 x="22%" y="46%" value="500" unit="pares" label="Planta media · 500 instrumentos" accent={TL7.red} appear={s + 1.4} t={t} align="center" />
      <StatM7 x="50%" y="46%" value="10" unit="km" label="200 lazos × 50 m de cable" accent={TL7.amber} appear={s + 1.8} t={t} align="center" />
      <StatM7 x="78%" y="46%" value="30–40" unit="%" label="del costo total del proyecto" accent={TL7.vio} appear={s + 2.2} t={t} align="center" />
      <CapM7 start={s + 3.6} dur={dur - 3.9} size={26} weight={500} color={TL7.mut} y="80%" width={1560}>Agregar un instrumento = tender un cable nuevo desde el campo → obra civil, permisos, tiempo.</CapM7>
    </SceneM7>
  );
}

// ── La solución: un solo cable de red ─────────────────────────────────────────
function S_Solution({ start, dur }) {
  const t = useTime(); const s = start;
  const busY = 560, x0 = 360, x1 = 1560;
  const devs = [560, 760, 960, 1160, 1360];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="La solución · redes industriales" y="11%" color={TL7.grn} />
      <CapM7 start={s + 0.6} dur={2.2} size={46} weight={600} y="21%" width={1560}>Un solo cable transporta <span style={{ color: TL7.cyan }}>decenas o cientos</span> de instrumentos.</CapM7>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM7 x={150} y={busY - 50} w={170} h={100} label="PLC" sub="maestro" accent={TL7.vio} t={t} appear={s + 1.2} online />
        <LinkM7 x1={320} y1={busY} x2={x1} y2={busY} start={s + 1.5} t={t} color={TL7.cyan} label="bus de campo · 1 cable" />
        {devs.map((dx, i) => (
          <g key={i}>
            <line x1={dx} y1={busY} x2={dx} y2={busY + 70} stroke={TL7.lineS} strokeWidth="2" opacity={clamp((t - (s + 1.8 + i * 0.2)) / 0.4, 0, 1)} />
            <g opacity={clamp((t - (s + 1.9 + i * 0.2)) / 0.4, 0, 1)}>
              <circle cx={dx} cy={busY + 92} r="20" fill={TL7.paper} stroke={TL7.cyanD} strokeWidth="2" />
              <text x={dx} y={busY + 98} fill={TL7.cyan} fontFamily={MONO7} fontSize="13" fontWeight="700" textAnchor="middle">{i + 1}</text>
            </g>
          </g>
        ))}
      </svg>
      <CapM7 start={s + 3.6} dur={dur - 3.9} size={25} weight={500} color={TL7.mut} y="83%" width={1560}>PROFIBUS conecta hasta <b style={{ color: TL7.ink }}>126 dispositivos</b> en un cable · hasta <b style={{ color: TL7.cyan }}>70 % menos cableado</b> — y mucha más información que solo el valor.</CapM7>
    </SceneM7>
  );
}

// ── IT vs OT ──────────────────────────────────────────────────────────────────
function S_ITvsOT({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Dos mundos muy diferentes" y="9%" />
      <CapM7 start={s + 0.6} dur={2.2} size={50} weight={700} y="18%" width={1500}>Redes IT vs Redes OT.</CapM7>
      <div style={{ position: 'absolute', left: 210, top: 330, width: 680 }}>
        {(() => { const ap = pop7(t, s + 1.2, 0.55, 22); return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', borderRadius: 14, border: `1px solid ${TL7.lineS}`, background: `linear-gradient(160deg, ${TL7.paper}, ${TL7.bg2})`, boxShadow: TL7.shadow, padding: '30px 32px', height: 420, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 26, bottom: 26, width: 4, background: TL7.red, borderRadius: 3 }} />
            <div style={{ fontFamily: MONO7, fontSize: 15, letterSpacing: '0.2em', color: TL7.red, fontWeight: 700 }}>IT · INFORMATION TECHNOLOGY</div>
            <div style={{ fontFamily: DISP7, fontSize: 26, fontWeight: 700, color: TL7.ink, margin: '12px 0 18px' }}>Oficina, internet, servidores</div>
            {[['Prioridad', 'throughput (velocidad de datos)'], ['Latencia', 'tolerante — un email tarde no importa'], ['Protocolos', 'TCP/IP, HTTP, WiFi, Bluetooth'], ['Seguridad', 'confidencialidad de los datos']].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '9px 0', borderTop: i ? `1px solid ${TL7.line}` : 'none' }}>
                <span style={{ fontFamily: MONO7, fontSize: 14, color: TL7.dim, minWidth: 110, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r[0]}</span>
                <span style={{ fontFamily: DISP7, fontSize: 18, color: TL7.mut }}>{r[1]}</span>
              </div>
            ))}
          </div>
        ); })()}
      </div>
      <div style={{ position: 'absolute', left: 1030, top: 330, width: 680 }}>
        {(() => { const ap = pop7(t, s + 1.7, 0.55, 22); return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', borderRadius: 14, border: `1px solid ${TL7.cyan}`, background: `linear-gradient(160deg, ${TL7.paper}, ${TL7.bg2})`, boxShadow: TL7.shadow, padding: '30px 32px', height: 420, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 26, bottom: 26, width: 4, background: TL7.cyan, borderRadius: 3 }} />
            <div style={{ fontFamily: MONO7, fontSize: 15, letterSpacing: '0.2em', color: TL7.cyan, fontWeight: 700 }}>OT · OPERATIONAL TECHNOLOGY</div>
            <div style={{ fontFamily: DISP7, fontSize: 26, fontWeight: 700, color: TL7.ink, margin: '12px 0 18px' }}>Control de proceso, planta</div>
            {[['Prioridad', 'determinismo y latencia mínima'], ['Latencia', 'cero para funciones críticas'], ['Protocolos', 'PROFINET, Modbus, EtherNet/IP'], ['Seguridad', 'disponibilidad — DEBE funcionar']].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '9px 0', borderTop: i ? `1px solid ${TL7.line}` : 'none' }}>
                <span style={{ fontFamily: MONO7, fontSize: 14, color: TL7.dim, minWidth: 110, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r[0]}</span>
                <span style={{ fontFamily: DISP7, fontSize: 18, color: TL7.mut }}>{r[1]}</span>
              </div>
            ))}
          </div>
        ); })()}
      </div>
    </SceneM7>
  );
}

// ── Determinismo ──────────────────────────────────────────────────────────────
function S_Determinism({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="¿Por qué el determinismo es crítico?" y="12%" color={TL7.amber} />
      <CapM7 start={s + 0.6} dur={2.4} size={46} weight={600} y="24%" width={1620}>Los datos deben llegar dentro de una <span style={{ color: TL7.cyan }}>ventana de tiempo garantizada</span>.</CapM7>
      <InfoCardM7 x={250} y={430} w={640} h={250} accent={TL7.red} title="TCP/IP estándar" sub="El tiempo de entrega NO está garantizado: puede variar de 1 ms a varios segundos según la carga de la red." appear={s + 1.4} t={t} />
      <InfoCardM7 x={1030} y={430} w={640} h={250} accent={TL7.cyan} title="PROFINET IRT" sub="Entrega garantizada con jitter menor a 1 microsegundo. Un paro de emergencia que llega tarde puede causar un accidente." appear={s + 1.9} t={t} />
    </SceneM7>
  );
}

// ── La pirámide de automatización ─────────────────────────────────────────────
function S_Pyramid({ start, dur }) {
  const t = useTime(); const s = start;
  const levels = [
    { n: 4, name: 'ERP / MES', sub: 'SAP, Oracle · negocio', accent: TL7.pink },
    { n: 3, name: 'SCADA / Historian', sub: 'supervisión · reporting', accent: TL7.vio },
    { n: 2, name: 'HMI / DCS', sub: 'operación · control', accent: TL7.cyan },
    { n: 1, name: 'PLC / RTU', sub: 'control de proceso', accent: TL7.amber },
    { n: 0, name: 'Sensores y Actuadores', sub: 'campo · instrumentos', accent: TL7.grn },
  ];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Pirámide de automatización · ISA-95" y="7%" />
      <CapM7 start={s + 0.6} dur={2.0} size={42} weight={600} y="14%" width={1500}>Cinco niveles, cada uno con su protocolo y su tiempo de ciclo.</CapM7>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <PyramidM7 cx={760} top={210} levels={levels} t={t} appear={s + 1.2} totalW={720} h={92} gap={9} />
      </svg>
      <div style={{ position: 'absolute', left: 1180, top: 250, width: 600, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[['N0', '4-20 mA, HART', '< 10 ms', TL7.grn], ['N1', 'PROFIBUS DP', '< 10 ms', TL7.amber], ['N2', 'PROFINET', '< 100 ms', TL7.cyan], ['N3', 'OPC-UA', '< 1 s', TL7.vio], ['N4', 'TCP/IP corp.', 'min/horas', TL7.pink]].map((r, i) => {
          const ap = clamp((t - (s + 2.6 + i * 0.3)) / 0.4, 0, 1);
          return (
            <div key={i} style={{ opacity: ap, display: 'flex', alignItems: 'center', gap: 14, background: TL7.paper, border: `1px solid ${TL7.lineS}`, borderLeft: `4px solid ${r[3]}`, borderRadius: 9, padding: '11px 18px' }}>
              <span style={{ fontFamily: MONO7, fontSize: 17, fontWeight: 700, color: r[3], minWidth: 36 }}>{r[0]}</span>
              <span style={{ fontFamily: DISP7, fontSize: 17, color: TL7.ink, flex: 1 }}>{r[1]}</span>
              <span style={{ fontFamily: MONO7, fontSize: 14, color: TL7.mut }}>{r[2]}</span>
            </div>
          );
        })}
        <div style={{ opacity: clamp((t - (s + 4.4)) / 0.5, 0, 1), marginTop: 8, fontFamily: DISP7, fontSize: 17, color: TL7.cyanD, lineHeight: 1.4 }}>Industria 4.0 colapsa la pirámide: OPC-UA conecta N0 ↔ N4 directo.</div>
      </div>
    </SceneM7>
  );
}

// ── Topologías ────────────────────────────────────────────────────────────────
function S_Topologies({ start, dur }) {
  const t = useTime(); const s = start;
  const cyT = 560;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Topologías de red industrial" y="11%" />
      <CapM7 start={s + 0.6} dur={2.0} size={46} weight={700} y="21%" width={1500}>Tres formas de conectar los dispositivos.</CapM7>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* BUS */}
        <g opacity={clamp((t - (s + 1.2)) / 0.5, 0, 1)}>
          <text x={400} y={cyT - 80} fill={TL7.amber} fontFamily={MONO7} fontSize="18" fontWeight="700" textAnchor="middle">BUS (lineal)</text>
          <line x1={250} y1={cyT} x2={550} y2={cyT} stroke={TL7.amber} strokeWidth="3" />
          {[280, 360, 440, 520].map((dx, i) => <circle key={i} cx={dx} cy={cyT} r="12" fill={TL7.paper} stroke={TL7.amber} strokeWidth="2.4" />)}
          <text x={400} y={cyT + 56} fill={TL7.mut} fontFamily={DISP7} fontSize="16" textAnchor="middle">un fallo rompe todo</text>
        </g>
        {/* STAR */}
        <g opacity={clamp((t - (s + 1.8)) / 0.5, 0, 1)}>
          <text x={760} y={cyT - 80} fill={TL7.cyan} fontFamily={MONO7} fontSize="18" fontWeight="700" textAnchor="middle">ESTRELLA</text>
          <rect x={742} y={cyT - 18} width={36} height={36} rx="7" fill={TL7.paper} stroke={TL7.cyan} strokeWidth="2.4" />
          {[[680, cyT - 70], [840, cyT - 70], [680, cyT + 70], [840, cyT + 70]].map((p, i) => { return (<g key={i}><line x1={760} y1={cyT} x2={p[0]} y2={p[1]} stroke={TL7.cyanD} strokeWidth="2" /><circle cx={p[0]} cy={p[1]} r="12" fill={TL7.paper} stroke={TL7.cyan} strokeWidth="2.2" /></g>); })}
          <text x={760} y={cyT + 56} fill={TL7.mut} fontFamily={DISP7} fontSize="16" textAnchor="middle">fallo aísla un nodo</text>
        </g>
        {/* RING */}
        <g opacity={clamp((t - (s + 2.4)) / 0.5, 0, 1)}>
          <text x={1140} y={cyT - 80} fill={TL7.grn} fontFamily={MONO7} fontSize="18" fontWeight="700" textAnchor="middle">ANILLO</text>
          {[0, 1, 2, 3].map(i => { const a = -Math.PI / 2 + i * Math.PI / 2; const px = 1140 + Math.cos(a) * 56, py = cyT + Math.sin(a) * 56; const a2 = -Math.PI / 2 + (i + 1) * Math.PI / 2; const px2 = 1140 + Math.cos(a2) * 56, py2 = cyT + Math.sin(a2) * 56; return (<g key={i}><line x1={px} y1={py} x2={px2} y2={py2} stroke={TL7.grn} strokeWidth="2.4" /><circle cx={px} cy={py} r="12" fill={TL7.paper} stroke={TL7.grn} strokeWidth="2.2" /></g>); })}
          <text x={1140} y={cyT + 100} fill={TL7.mut} fontFamily={DISP7} fontSize="16" textAnchor="middle">redundante · MRP</text>
        </g>
      </svg>
      <CapM7 start={s + 3.6} dur={dur - 3.9} size={24} weight={500} color={TL7.mut} y="84%" width={1560}>Bus → PROFIBUS, Modbus RTU · Estrella → Ethernet industrial · Anillo → PROFINET MRP (recuperación &lt; 200 ms).</CapM7>
    </SceneM7>
  );
}

const SCENES_M7C1 = [
  { C: (p) => <TitleCardM7 {...p} claseNo={1} title="¿Por qué comunicar dispositivos?" dudur="15–17 min" objetivo="Entender la evolución de la comunicación industrial, la diferencia IT/OT y la pirámide de automatización como modelo de referencia." />, dur: 7, label: 'Apertura' },
  { C: S_Cabling, dur: 12, label: 'El cableado punto a punto' },
  { C: S_Solution, dur: 13, label: 'La solución: redes' },
  { C: S_ITvsOT, dur: 14, label: 'IT vs OT' },
  { C: S_Determinism, dur: 11, label: 'Determinismo' },
  { C: S_Pyramid, dur: 16, label: 'Pirámide ISA-95' },
  { C: S_Topologies, dur: 13, label: 'Topologías' },
  { C: (p) => <ClosingM7 {...p} line="Las redes industriales nacieron para ahorrar cable — pero su verdadero valor es que los dispositivos se hablen, con determinismo y en su nivel de la pirámide." activity="Sobre el diagrama de la planta del curso: identifica los dispositivos que necesitan comunicación, propón la arquitectura de red por nivel, dibuja la topología y justifica cada protocolo." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M7C1 = SCENES_M7C1;
