// m7c6.jsx — "Práctica: comunicación Modbus entre PLC simulado y HMI"
// After m7-lib.jsx. Exports SCENES_M7C6.

// ── Arquitectura de la práctica ───────────────────────────────────────────────
function S_Setup({ start, dur }) {
  const t = useTime(); const s = start;
  const y = 500;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Arquitectura de la práctica" y="11%" color={TL7.grn} />
      <CapM7 start={s + 0.6} dur={2.2} size={46} weight={600} y="21%" width={1560}>PLC simulado ↔ cliente Modbus, todo por <span style={{ color: TL7.cyan }}>loopback</span>.</CapM7>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM7 x={250} y={y - 60} w={320} h={120} label="TIA + PLCSIM" sub="S7-1200 · MB_SERVER :502" accent={TL7.vio} t={t} appear={s + 1.2} online />
        <LinkM7 x1={570} y1={y} x2={1350} y2={y} start={s + 1.6} t={t} color={TL7.cyan} label="Modbus TCP · red local" back />
        <NodeM7 x={1350} y={y - 60} w={320} h={120} label="Cliente Modbus" sub="Node-RED / Modbus Poll" accent={TL7.amber} t={t} appear={s + 1.6} online />
        <text x={410} y={y + 90} fill={TL7.dim} fontFamily={MONO7} fontSize="15" textAnchor="middle" opacity={clamp((t - (s + 2.2)) / 0.5, 0, 1)}>192.168.0.1</text>
        <text x={1510} y={y + 90} fill={TL7.dim} fontFamily={MONO7} fontSize="15" textAnchor="middle" opacity={clamp((t - (s + 2.2)) / 0.5, 0, 1)}>192.168.0.100</text>
      </svg>
      <CapM7 start={s + 3.6} dur={dur - 3.9} size={24} weight={500} color={TL7.mut} y="80%" width={1560}>Herramientas 100 % gratuitas: TIA Portal + PLCSIM · Modbus Poll (prueba 30 días) · Node-RED (open source).</CapM7>
    </SceneM7>
  );
}

// ── Parte 1: PLC como servidor Modbus ─────────────────────────────────────────
function S_Server({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '// El S7-1200 como servidor Modbus TCP', c: TL7.dim },
    { txt: 'MB_SERVER(', c: TL7.cyan },
    { txt: '  DISCONNECT  := FALSE,', c: TL7.ink },
    { txt: '  MB_HOLD_REG := P#DB10.DBX0.0 WORD 100,', c: TL7.amber },
    { txt: '  CONNECT     := ServerConfig,', c: TL7.vioLt },
    { txt: '  NDR => Datos_Recibidos,', c: TL7.grn },
    { txt: '  ERROR => Error_Modbus,', c: TL7.ink },
    { txt: '  STATUS => Estado_Modbus);', c: TL7.ink },
    { txt: '', c: TL7.ink },
    { txt: 'ServerConfig.LocalPort := 502; // estándar', c: TL7.cyan },
  ];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Parte 1 · PLC como servidor Modbus TCP" y="9%" />
      <CapM7 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Sin módulos extra: el puerto Ethernet de la CPU basta.</CapM7>
      <CodeM7 x={120} y={300} w={980} title="ST · MB_SERVER" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.0, 0, 1)} />
      <InfoCardM7 x={1160} y={310} w={620} h={200} accent={TL7.amber} title="Área de registros" sub="MB_HOLD_REG expone 100 words desde DB10. Ahí el cliente leerá los datos del proceso." appear={s + 2.6} t={t} />
      <InfoCardM7 x={1160} y={530} w={620} h={200} accent={TL7.cyan} title="Servidor pasivo" sub="ActiveEstablished = FALSE: el PLC espera conexiones en el puerto 502 — no las inicia." appear={s + 3.1} t={t} />
    </SceneM7>
  );
}

// ── Mapeo de datos ────────────────────────────────────────────────────────────
function S_Mapping({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Mapeo de datos al área Modbus" y="9%" />
      <CapM7 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>Los REAL se escalan a enteros antes de enviarse.</CapM7>
      <TableM7 x={210} y={290} w={1500} t={t} appear={s + 1.2} accentCol={1}
        headers={['Registro', 'Contenido', 'Escala']}
        colTemplate="0.8fr 1.4fr 1fr"
        rows={[
          ['DB10.DBW0', 'Nivel T-101', '× 100 (m → cm)'],
          ['DB10.DBW2', 'Temperatura R-301', '× 10 (°C × 10)'],
          ['DB10.DBW4', 'Caudal FT-101', 'entero m³/h'],
          ['DB10.DBW6', 'Presión PT-401', '× 100 (bar → mbar)'],
          ['DB10.DBW8', 'Estado bomba', '0 / 1'],
          ['DB10.DBW20', 'SP nivel (del SCADA)', '÷ 100 → m  · R/W'],
        ]} />
      <CapM7 start={s + 3.6} dur={dur - 3.9} size={23} weight={500} color={TL7.cyanD} y="86%" width={1560}>Modbus solo transporta enteros de 16 bits: para un decimal, lo multiplicas al enviar y lo divides al recibir.</CapM7>
    </SceneM7>
  );
}

// ── Parte 2/3: verificar y mini-HMI ───────────────────────────────────────────
function S_HMI({ start, dur }) {
  const t = useTime(); const s = start;
  // mini dashboard with live-ish gauges
  const lvl = 2.0 + 0.6 * Math.sin((t - s) * 0.9);
  const temp = 55 + 8 * Math.sin((t - s) * 0.6 + 1);
  const g = (val, max) => clamp(val / max, 0, 1);
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Parte 2–3 · verificar y mini-HMI en Node-RED" y="9%" />
      <CapM7 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Una HMI web mostrando datos reales del PLC simulado.</CapM7>
      <div style={{ position: 'absolute', left: '50%', top: '56%', transform: 'translate(-50%,-50%)', display: 'flex', gap: 24 }}>
        {[
          { label: 'Nivel', val: lvl.toFixed(2), unit: 'm', frac: g(lvl, 4), a: TL7.cyan },
          { label: 'Temperatura', val: temp.toFixed(1), unit: '°C', frac: g(temp, 80), a: TL7.amber },
        ].map((gg, i) => {
          const ap = pop7(t, s + 1.4 + i * 0.3, 0.5, 18);
          const R = 70, C = 2 * Math.PI * R;
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, width: 260, height: 280, borderRadius: 14, background: TL7.paper, border: `1px solid ${TL7.lineS}`, boxShadow: TL7.shadow, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="90" cy="90" r={R} fill="none" stroke={TL7.bg2} strokeWidth="14" />
                <circle cx="90" cy="90" r={R} fill="none" stroke={gg.a} strokeWidth="14" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - gg.frac)} />
              </svg>
              <div style={{ marginTop: -150, fontFamily: DISP7, fontSize: 44, fontWeight: 700, color: TL7.ink }}>{gg.val}</div>
              <div style={{ fontFamily: MONO7, fontSize: 16, color: gg.a }}>{gg.unit}</div>
              <div style={{ marginTop: 90, fontFamily: MONO7, fontSize: 14, color: TL7.dim, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{gg.label}</div>
            </div>
          );
        })}
        {(() => { const ap = pop7(t, s + 2.0, 0.5, 18); const on = Math.sin((t - s) * 0.9) > 0; return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, width: 300, height: 280, borderRadius: 14, background: TL7.paper, border: `1px solid ${TL7.lineS}`, boxShadow: TL7.shadow, padding: 28, display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ width: 18, height: 18, borderRadius: 10, background: on ? TL7.grn : TL7.dim, boxShadow: on ? `0 0 14px ${TL7.grn}` : 'none' }} /><span style={{ fontFamily: DISP7, fontSize: 22, color: TL7.ink }}>Bomba {on ? 'CORRIENDO' : 'DETENIDA'}</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ width: 18, height: 18, borderRadius: 10, background: TL7.dim }} /><span style={{ fontFamily: DISP7, fontSize: 22, color: TL7.mut }}>Alarma nivel: Normal</span></div>
            <div style={{ marginTop: 8, borderTop: `1px solid ${TL7.line}`, paddingTop: 16, fontFamily: MONO7, fontSize: 14, color: TL7.dim }}>SP nivel → escribir FC 06</div>
          </div>
        ); })()}
      </div>
      <CapM7 start={s + 4.0} dur={dur - 4.3} size={23} weight={500} color={TL7.mut} y="86%" width={1560}>Node-RED: nodo inject → Modbus Read → function (escala) → gauges. Deploy → dashboard en localhost:1880/ui.</CapM7>
    </SceneM7>
  );
}

// ── Parte 4: diagnóstico ──────────────────────────────────────────────────────
function S_Debug({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Parte 4 · diagnóstico de comunicación" y="11%" />
      <CapM7 start={s + 0.6} dur={2.2} size={46} weight={600} y="21%" width={1500}>Cuando algo falla, estas herramientas dicen la verdad.</CapM7>
      <InfoCardM7 x={210} y={400} w={490} h={290} accent={TL7.cyan} title="Diagnóstico TIA" sub="Online → Diagnostics → Communication → Modbus: conexiones activas, bytes Rx/Tx y errores del servidor." appear={s + 1.4} t={t} />
      <InfoCardM7 x={715} y={400} w={490} h={290} accent={TL7.vio} title="Wireshark" sub="El analizador definitivo. Filtro tcp.port == 502 → ves cada trama Modbus TCP y la decodificas. Habilidad invaluable en planta." appear={s + 1.8} t={t} />
      <InfoCardM7 x={1220} y={400} w={490} h={290} accent={TL7.red} title="Errores comunes" sub="STATUS 80C0 = conflicto de puerto 502 · datos raros = revisar mapeo y escala · sin conexión = verificar IP de la CPU." appear={s + 2.2} t={t} />
    </SceneM7>
  );
}

const SCENES_M7C6 = [
  { C: (p) => <TitleCardM7 {...p} claseNo={6} seccion="Práctica integradora" title="Práctica: Modbus PLC ↔ HMI" dudur="28–30 min · 100% práctica" objetivo="Implementar una comunicación Modbus TCP completa entre el PLC simulado y una mini-HMI, con verificación y diagnóstico de extremo a extremo." />, dur: 7, label: 'Apertura' },
  { C: S_Setup, dur: 12, label: 'Arquitectura' },
  { C: S_Server, dur: 14, label: 'PLC como servidor' },
  { C: S_Mapping, dur: 13, label: 'Mapeo de datos' },
  { C: S_HMI, dur: 14, label: 'Mini-HMI Node-RED' },
  { C: S_Debug, dur: 12, label: 'Diagnóstico' },
  { C: (p) => <ClosingM7 {...p} line="De los registros del PLC a un gauge en el navegador: ese flujo completo de datos es la esencia de toda integración SCADA real." activity="Entrega capturas de Modbus Poll, del dashboard Node-RED y de una trama en Wireshark decodificada, el flujo JSON exportado y responde 5 preguntas de reflexión (escala, seguridad de escritura, RTU vs TCP, OPC-UA)." />, dur: 9, label: 'Cierre del módulo' },
];
window.SCENES_M7C6 = SCENES_M7C6;
