// m8c4.jsx — "Conectar Ignition con el PLC vía OPC-UA"
// After m8-lib.jsx. Exports SCENES_M8C4.

// ── El flujo de datos PLC ↔ SCADA ─────────────────────────────────────────────
function S_Flow({ start, dur }) {
  const t = useTime(); const s = start;
  const y = 480;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="El puente OPC-UA" y="11%" color={TL8.steel} />
      <CapM8 start={s + 0.6} dur={2.2} size={46} weight={600} y="21%" width={1560}>El PLC <span style={{ color: TL8.honey }}>publica</span> · Ignition <span style={{ color: TL8.coral }}>lee y escribe</span>.</CapM8>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM8 x={230} y={y - 70} w={360} h={140} label="PLC S7-1500" sub="OPC-UA server :4840" accent={TL8.honey} t={t} appear={s + 1.2} online />
        <LinkM8 x1={590} y1={y} x2={1330} y2={y} start={s + 1.7} t={t} color={TL8.steel} label="opc.tcp:// · puerto 4840" back />
        <NodeM8 x={1330} y={y - 70} w={360} h={140} label="Ignition Gateway" sub="OPC Connection" accent={TL8.coral} t={t} appear={s + 1.7} online />
        <text x={410} y={y + 100} fill={TL8.dim} fontFamily={MONO8} fontSize="16" textAnchor="middle" opacity={clamp((t - (s + 2.4)) / 0.5, 0, 1)}>DB_HMI_Data · Read + Write</text>
        <text x={1510} y={y + 100} fill={TL8.dim} fontFamily={MONO8} fontSize="16" textAnchor="middle" opacity={clamp((t - (s + 2.4)) / 0.5, 0, 1)}>192.168.0.1</text>
      </svg>
      <CapM8 start={s + 3.8} dur={dur - 4.1} size={24} weight={500} color={TL8.mut} y="80%" width={1560}>En TIA: activar el OPC UA server en la CPU, exponer los DBs (HMI = R/W, Alarmas = solo lectura) y descargar al PLCSIM.</CapM8>
    </SceneM8>
  );
}

// ── Opciones de conexión ──────────────────────────────────────────────────────
function S_Options({ start, dur }) {
  const t = useTime(); const s = start;
  const opts = [
    { k: 'A', name: 'PLCSIM Advanced', d: 'OPC-UA directo con la CPU simulada. Requiere licencia Siemens.', a: TL8.coral, tag: 'ideal' },
    { k: 'B', name: 'Prosys OPC UA Sim', d: 'Servidor OPC-UA simulado y gratuito que emula los tags del PLC.', a: TL8.steel, tag: 'gratis' },
    { k: 'C', name: 'Modbus TCP', d: 'La alternativa del Módulo 7. Driver Modbus de Ignition al PLC.', a: TL8.honey, tag: 'práctico' },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Tres caminos al mismo flujo" y="10%" />
      <CapM8 start={s + 0.6} dur={2.0} size={46} weight={600} y="19%" width={1560}>Conecta con lo que tengas a mano.</CapM8>
      <div style={{ position: 'absolute', left: 200, top: 400, width: 1520, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {opts.map((x, i) => {
          const ap = pop8(t, s + 1.3 + i * 0.4, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
              <div style={{ position: 'relative', background: `linear-gradient(160deg, ${TL8.paper}, ${TL8.bg2})`, border: `1px solid ${x.a}`, borderRadius: 14, padding: '28px 26px', height: 280, boxShadow: TL8.shadowSm }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ width: 50, height: 50, borderRadius: 12, background: TL8.bg2, border: `1.5px solid ${x.a}`, color: x.a, fontFamily: DISP8, fontSize: 26, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{x.k}</span>
                  <span style={{ fontFamily: MONO8, fontSize: 12.5, color: x.a, letterSpacing: '0.14em', textTransform: 'uppercase', border: `1px solid ${x.a}`, borderRadius: 20, padding: '4px 12px' }}>{x.tag}</span>
                </div>
                <div style={{ fontFamily: DISP8, fontSize: 25, fontWeight: 700, color: TL8.ink, margin: '18px 0 12px' }}>{x.name}</div>
                <div style={{ fontFamily: DISP8, fontSize: 18.5, color: TL8.mut, lineHeight: 1.44 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SceneM8>
  );
}

// ── Configurar conexión en Ignition + vincular tag ────────────────────────────
function S_Connect({ start, dur }) {
  const t = useTime(); const s = start;
  const steps = [
    ['Config → OPC Connections', 'Create new OPC-UA Connection'],
    ['Endpoint URL', 'opc.tcp://192.168.0.1:4840'],
    ['Security Policy', 'None (laboratorio) · Basic256Sha256 (prod)'],
    ['Status', 'Connected ✓'],
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Conexión en el Gateway + vincular tags" y="8%" color={TL8.coral} />
      <CapM8 start={s + 0.6} dur={2.0} size={42} weight={600} y="14%" width={1560}>Cada OPC Tag apunta a una ruta del espacio de direcciones.</CapM8>
      <div style={{ position: 'absolute', left: 150, top: 290, width: 800 }}>
        {steps.map((x, i) => {
          const ap = pop8(t, s + 1.2 + i * 0.35, 0.5, 14);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 18, marginBottom: 12, background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderRadius: 10, padding: '15px 22px' }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, background: i === 3 ? TL8.grn : TL8.coralWash, border: `1px solid ${i === 3 ? TL8.grn : TL8.coral}`, color: i === 3 ? '#06200f' : TL8.coral, fontFamily: MONO8, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ fontFamily: DISP8, fontSize: 19, fontWeight: 700, color: TL8.ink, minWidth: 250 }}>{x[0]}</span>
              <span style={{ fontFamily: MONO8, fontSize: 15, color: i === 3 ? TL8.grn : TL8.mut }}>{x[1]}</span>
            </div>
          );
        })}
      </div>
      <CodeM8 x={1010} y={300} w={760} title="OPC Item Path" lines={[
        { txt: '// Tag LT101 → ruta en el PLC', c: TL8.dim },
        { txt: 'OPC Server: PLC_Planta_Agua', c: TL8.coralLt },
        { txt: 'Item Path:', c: TL8.steelLt },
        { txt: ' ns=4;s=[PLC_Planta_Agua]', c: TL8.honey },
        { txt: '   DB_HMI_Data.PV_Nivel_T101', c: TL8.honey },
        { txt: '', c: TL8.ink },
        { txt: 'Quality: Good ✓', c: TL8.grn },
      ]} t={t} appear={s + 2.6} reveal={clamp((t - (s + 3.0)) / 2.2, 0, 1)} />
      <CapM8 start={s + 5.4} dur={dur - 5.7} size={22} weight={500} color={TL8.mut} y="90%" width={1560}>Los tags de escritura (SP, comandos) son idénticos — solo necesitan Access: Read/Write y el DB marcado «Accessible from HMI: Write».</CapM8>
    </SceneM8>
  );
}

// ── Calidad de tag ────────────────────────────────────────────────────────────
function S_Quality({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="La calidad del tag dice la verdad" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Si el dato no es confiable, el operador debe <span style={{ color: TL8.red }}>verlo</span>.</CapM8>
      <TableM8 x={210} y={290} w={1500} t={t} appear={s + 1.2} accentCol={1}
        headers={['Calidad', 'Significado', 'Acción']}
        colTemplate="1fr 1.6fr 1.2fr"
        rows={[
          ['Good', 'Comunicación OK, dato válido', 'Normal'],
          ['Uncertain', 'OK pero dato posiblemente inválido', 'Investigar'],
          ['Bad', 'Sin comunicación o dato inválido', 'Alarma de comunicación'],
          ['Bad_NotConnected', 'Sin conexión con el servidor OPC', 'Verificar red y servidor'],
          ['Bad_Stale', 'El valor no se actualiza hace tiempo', 'Verificar scan rate y PLC'],
        ]} />
      <CapM8 start={s + 4.0} dur={dur - 4.3} size={23} weight={500} color={TL8.coralLt} y="86%" width={1560}>En Perspective, la propiedad <b style={{ color: TL8.ink }}>Bad Quality Overlay</b> pone automáticamente una X roja sobre el valor cuando la calidad es Bad.</CapM8>
    </SceneM8>
  );
}

const SCENES_M8C4 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={4} seccion="Conexión OPC-UA" title="Conectar Ignition con el PLC" dudur="18–20 min · práctica" objetivo="Configurar la conexión OPC-UA entre Ignition y el PLC simulado, establecer el flujo de datos en tiempo real y verificar lectura y escritura de tags." />, dur: 7, label: 'Apertura' },
  { C: S_Flow, dur: 13, label: 'El puente OPC-UA' },
  { C: S_Options, dur: 12, label: 'Opciones de conexión' },
  { C: S_Connect, dur: 15, label: 'Conectar y vincular' },
  { C: S_Quality, dur: 13, label: 'Calidad del tag' },
  { C: (p) => <ClosingM8 {...p} line="Cuando los tags muestran calidad Good y los setpoints llegan al PLC, el SCADA deja de ser una maqueta y empieza a respirar con el proceso." activity="Conecta completamente el SCADA con el PLC (o simulador). Verifica que todos los tags tienen calidad Good, prueba la escritura de un setpoint desde Ignition al PLC y documenta cualquier problema y su solución." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M8C4 = SCENES_M8C4;
