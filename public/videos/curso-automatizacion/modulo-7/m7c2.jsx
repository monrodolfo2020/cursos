// m7c2.jsx — "Protocolo Modbus RTU y Modbus TCP/IP"
// After m7-lib.jsx. Exports SCENES_M7C2.

// ── ¿Por qué Modbus sigue vigente? ────────────────────────────────────────────
function S_Why({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="El protocolo más longevo en uso" y="11%" />
      <CapM7 start={s + 0.6} dur={2.2} size={48} weight={600} y="21%" width={1560}>Diseñado en <span style={{ color: TL7.amber }}>1979</span> por Modicon — y más vivo que nunca.</CapM7>
      <StatM7 x="24%" y="48%" value="1979" label="Año de creación" accent={TL7.amber} appear={s + 1.4} t={t} align="center" />
      <StatM7 x="50%" y="48%" value="7M+" unit="nodos" label="Instalados en el mundo" accent={TL7.cyan} appear={s + 1.8} t={t} align="center" />
      <StatM7 x="76%" y="48%" value="$0" label="Estándar abierto · sin regalías" accent={TL7.grn} appear={s + 2.2} t={t} align="center" />
      <CapM7 start={s + 3.6} dur={dur - 3.9} size={25} weight={500} color={TL7.mut} y="80%" width={1560}>Su <b style={{ color: TL7.ink }}>simplicidad</b> lo hace confiable y disponible en casi cualquier dispositivo: VFDs, medidores, transmisores, analizadores.</CapM7>
    </SceneM7>
  );
}

// ── Maestro-esclavo RTU sobre RS-485 ──────────────────────────────────────────
function S_MasterSlave({ start, dur }) {
  const t = useTime(); const s = start;
  const busY = 540, x0 = 360, x1 = 1560;
  const slaves = [560, 840, 1120, 1400];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Modbus RTU · arquitectura serial" y="10%" />
      <CapM7 start={s + 0.6} dur={2.2} size={46} weight={600} y="20%" width={1560}>Un solo maestro pregunta; los esclavos solo <span style={{ color: TL7.cyan }}>responden</span>.</CapM7>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM7 x={150} y={busY - 56} w={180} h={112} label="PLC" sub="MAESTRO" accent={TL7.vio} t={t} appear={s + 1.2} online />
        <LinkM7 x1={330} y1={busY} x2={x1} y2={busY} start={s + 1.5} t={t} color={TL7.cyan} label="RS-485 · 2 hilos · hasta 1200 m" back />
        {slaves.map((sx, i) => (
          <g key={i}>
            <line x1={sx} y1={busY} x2={sx} y2={busY + 70} stroke={TL7.lineS} strokeWidth="2" opacity={clamp((t - (s + 1.8 + i * 0.25)) / 0.4, 0, 1)} />
            <g opacity={clamp((t - (s + 1.9 + i * 0.25)) / 0.4, 0, 1)}>
              <rect x={sx - 56} y={busY + 70} width={112} height={70} rx="10" fill={TL7.paper} stroke={TL7.cyanD} strokeWidth="2" />
              <text x={sx} y={busY + 100} fill={TL7.ink} fontFamily={DISP7} fontSize="17" fontWeight="700" textAnchor="middle">{['VFD', 'Medidor', 'Transm.', 'Analiz.'][i]}</text>
              <text x={sx} y={busY + 122} fill={TL7.cyan} fontFamily={MONO7} fontSize="13" textAnchor="middle">ID {i + 1}</text>
            </g>
          </g>
        ))}
      </svg>
      <CapM7 start={s + 4.0} dur={dur - 4.3} size={24} weight={500} color={TL7.mut} y="86%" width={1560}>Hasta <b style={{ color: TL7.ink }}>247 esclavos</b> · velocidades 9600–115200 bps (lo más común en campo: 9600 o 19200).</CapM7>
    </SceneM7>
  );
}

// ── Estructura de la trama RTU ────────────────────────────────────────────────
function S_Frame({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Estructura de la trama Modbus RTU" y="12%" />
      <CapM7 start={s + 0.6} dur={2.2} size={46} weight={600} y="23%" width={1560}>Cinco campos, leídos de izquierda a derecha.</CapM7>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <FrameM7 x={310} y={460} width={1300} t={t} appear={s + 1.2} title="TRAMA"
          fields={[
            { label: 'Dirección', sub: '1 byte · 1–247', accent: TL7.vio, w: 1.1 },
            { label: 'Función', sub: '1 byte · FC', accent: TL7.cyan, w: 1 },
            { label: 'Datos', sub: 'N bytes', accent: TL7.amber, w: 1.8 },
            { label: 'CRC', sub: '2 bytes', accent: TL7.pink, w: 0.9 },
            { label: 'Pausa', sub: 'interframe', accent: TL7.dim, w: 0.8 },
          ]} />
      </svg>
      <CapM7 start={s + 3.8} dur={dur - 4.1} size={24} weight={500} color={TL7.mut} y="74%" width={1560}>Dirección 0 = broadcast (todos escuchan, nadie responde) · el CRC detecta errores de transmisión.</CapM7>
    </SceneM7>
  );
}

// ── Códigos de función + mapa de registros ────────────────────────────────────
function S_FunctionCodes({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Códigos de función y mapa de registros" y="8%" />
      <CapM7 start={s + 0.6} dur={2.0} size={42} weight={600} y="15%" width={1560}>Qué operación pide el maestro y dónde viven los datos.</CapM7>
      <TableM7 x={130} y={290} w={840} t={t} appear={s + 1.2} accentCol={0}
        headers={['FC', 'Operación']}
        colTemplate="0.5fr 1.5fr"
        rows={[['01', 'Read Coils — bits de salida'], ['02', 'Read Discrete Inputs — bits in'], ['03', 'Read Holding Registers ★'], ['04', 'Read Input Registers'], ['05', 'Write Single Coil'], ['06', 'Write Single Register'], ['16', 'Write Multiple Registers']]} />
      <TableM7 x={1010} y={290} w={780} t={t} appear={s + 2.0} accentCol={2}
        headers={['Tabla', 'Rango', 'Acceso']}
        colTemplate="1.2fr 1fr 1fr"
        rows={[['Coils', '0xxxx', 'R/W'], ['Discrete In', '1xxxx', 'R'], ['Input Reg', '3xxxx', 'R'], ['Holding Reg', '4xxxx', 'R/W']]} />
      <CapM7 start={s + 3.4} dur={dur - 3.7} size={24} weight={500} color={TL7.cyanD} y="86%" width={1560}>En la práctica, la mayoría de dispositivos usan solo <b>Holding Registers</b> (FC 03 / 06 / 16).</CapM7>
    </SceneM7>
  );
}

// ── Ejemplo de trama decodificada ─────────────────────────────────────────────
function S_Example({ start, dur }) {
  const t = useTime(); const s = start;
  const bytes = [
    { b: '05', d: 'esclavo 5', a: TL7.vio },
    { b: '03', d: 'FC: Read Holding', a: TL7.cyan },
    { b: '00 00', d: 'dir. inicial = 0', a: TL7.amber },
    { b: '00 02', d: 'leer 2 registros', a: TL7.grn },
    { b: 'C4 0B', d: 'CRC', a: TL7.pink },
  ];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Una petición real, byte por byte" y="12%" />
      <CapM7 start={s + 0.6} dur={2.2} size={44} weight={600} y="23%" width={1560}>«Leer 2 registros del esclavo 5 desde 40001»</CapM7>
      <div style={{ position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%,-50%)', display: 'flex', gap: 14 }}>
        {bytes.map((by, i) => {
          const ap = pop7(t, s + 1.4 + i * 0.45, 0.5, 16);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, width: 200, borderRadius: 12, border: `1px solid ${by.a}`, background: TL7.paper, boxShadow: TL7.shadowSm, padding: '22px 14px', textAlign: 'center' }}>
              <div style={{ fontFamily: MONO7, fontSize: 32, fontWeight: 700, color: by.a, letterSpacing: '0.05em' }}>{by.b}</div>
              <div style={{ marginTop: 10, fontFamily: DISP7, fontSize: 16, color: TL7.mut, lineHeight: 1.3 }}>{by.d}</div>
            </div>
          );
        })}
      </div>
      <CapM7 start={s + 4.2} dur={dur - 4.5} size={24} weight={500} color={TL7.mut} y="80%" width={1560}>El esclavo responde con <b style={{ color: TL7.cyan }}>05 03 04 01F4 07D0 …</b> → registro 1 = 500 (50.0 °C), registro 2 = 2000 (20.00 bar).</CapM7>
    </SceneM7>
  );
}

// ── RTU vs TCP en TIA Portal ──────────────────────────────────────────────────
function S_TIA({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '// Modbus TCP · leer medidor de energía', c: TL7.dim },
    { txt: 'MB_CLIENT(', c: TL7.cyan },
    { txt: '  REQ       := Trigger_Lectura,', c: TL7.ink },
    { txt: '  MB_ADDR   := 1,', c: TL7.ink },
    { txt: '  MODE      := 0,        // leer', c: TL7.amber },
    { txt: '  DATA_ADDR := 40001,', c: TL7.ink },
    { txt: '  DATA_LEN  := 10,', c: TL7.ink },
    { txt: '  CONNECT   := ConnectConfig, // IP+puerto', c: TL7.vioLt },
    { txt: '  DONE => OK, ERROR => Err);', c: TL7.grn },
  ];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="RTU vs TCP/IP en TIA Portal" y="9%" />
      <CapM7 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Misma lógica; el TCP cambia el cable por <span style={{ color: TL7.cyan }}>Ethernet</span>.</CapM7>
      <CodeM7 x={120} y={300} w={900} title="ST · MB_CLIENT (TCP)" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 2.8, 0, 1)} />
      <InfoCardM7 x={1090} y={310} w={680} h={150} accent={TL7.amber} title="Modbus RTU" sub="Módulo CM 1241 RS-485 · MB_COMM_LOAD + MB_MASTER · la dirección es el ID del esclavo." appear={s + 2.4} t={t} />
      <InfoCardM7 x={1090} y={480} w={680} h={150} accent={TL7.cyan} title="Modbus TCP" sub="Puerto Ethernet integrado · MB_CLIENT / MB_SERVER · la dirección es la IP · puerto 502 · sin CRC (lo hace TCP)." appear={s + 2.9} t={t} />
      <InfoCardM7 x={1090} y={650} w={680} h={120} accent={TL7.vio} title="Encabezado MBAP" sub="TCP añade 6 bytes: TID, PID, Length y Unit ID." appear={s + 3.4} t={t} />
    </SceneM7>
  );
}

const SCENES_M7C2 = [
  { C: (p) => <TitleCardM7 {...p} claseNo={2} title="Modbus RTU y Modbus TCP/IP" dudur="20–22 min" objetivo="Dominar el protocolo Modbus en sus dos variantes, su estructura de trama y cómo configurar un maestro Modbus en TIA Portal." />, dur: 7, label: 'Apertura' },
  { C: S_Why, dur: 12, label: '¿Por qué sigue vigente?' },
  { C: S_MasterSlave, dur: 13, label: 'Maestro-esclavo RTU' },
  { C: S_Frame, dur: 12, label: 'La trama RTU' },
  { C: S_FunctionCodes, dur: 13, label: 'Códigos y registros' },
  { C: S_Example, dur: 13, label: 'Trama decodificada' },
  { C: S_TIA, dur: 14, label: 'RTU vs TCP en TIA' },
  { C: (p) => <ClosingM7 {...p} line="Modbus es simple por diseño: una dirección, una función, unos datos y un CRC. Por eso lleva 45 años conectando la industria." activity="Con el mapa de registros de un medidor PowerLogic PM5100: identifica los registros de potencia y de tensión/corriente por fase, escribe el código TIA para leerlos cada 5 s y escala a kW, kVAR, V, A." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M7C2 = SCENES_M7C2;
