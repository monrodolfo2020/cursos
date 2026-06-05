// m7c4.jsx — "OPC y OPC-UA: el puente entre PLCs y SCADA"
// After m7-lib.jsx. Exports SCENES_M7C4.

// ── El problema que resolvió OPC ──────────────────────────────────────────────
function S_Problem({ start, dur }) {
  const t = useTime(); const s = start;
  const scadaX = [380, 380, 380], plcX = [1180, 1180, 1180];
  const scY = [400, 530, 660], plY = [400, 530, 660];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Antes de OPC · antes de 1996" y="9%" color={TL7.red} />
      <CapM7 start={s + 0.6} dur={2.2} size={46} weight={600} y="17%" width={1620}>Cada SCADA necesitaba un <span style={{ color: TL7.red }}>driver distinto</span> para cada PLC.</CapM7>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {scY.map((y, i) => <NodeM7 key={'s' + i} x={280} y={y - 30} w={200} h={60} label={`SCADA ${i + 1}`} accent={TL7.vio} t={t} appear={s + 1.2 + i * 0.2} />)}
        {plY.map((y, i) => <NodeM7 key={'p' + i} x={1180} y={y - 30} w={200} h={60} label={`PLC ${i + 1}`} accent={TL7.amber} t={t} appear={s + 1.2 + i * 0.2} />)}
        {scY.map((y1, i) => plY.map((y2, j) => {
          const ap = clamp((t - (s + 2.2 + (i + j) * 0.15)) / 0.5, 0, 1);
          return <line key={i + '-' + j} x1={480} y1={y1} x2={1180} y2={y2} stroke={TL7.red} strokeWidth="1.6" opacity={ap * 0.5} />;
        }))}
      </svg>
      <CapM7 start={s + 4.0} dur={dur - 4.3} size={25} weight={500} color={TL7.mut} y="84%" width={1620}>3 SCADAs × 3 PLCs = <b style={{ color: TL7.red }}>9 drivers</b>. Una nueva CPU obligaba a todos a actualizar → un caos de incompatibilidades.</CapM7>
    </SceneM7>
  );
}

// ── La solución: interfaz estándar ────────────────────────────────────────────
function S_Solution({ start, dur }) {
  const t = useTime(); const s = start;
  const cx = 960, sy = 470;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="La solución · OPC, 1996" y="10%" color={TL7.grn} />
      <CapM7 start={s + 0.6} dur={2.2} size={46} weight={600} y="19%" width={1560}>Una <span style={{ color: TL7.cyan }}>interfaz estándar</span> entre control y supervisión.</CapM7>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {[420, 560, 700].map((y, i) => { return (<g key={i}><NodeM7 x={230} y={y - 28} w={190} h={56} label={`SCADA ${i + 1}`} accent={TL7.vio} t={t} appear={s + 1.2 + i * 0.15} /><LinkM7 x1={420} y1={y} x2={cx - 130} y2={sy + 50} start={s + 1.8} t={t} color={TL7.cyan} /></g>); })}
        <NodeM7 x={cx - 130} y={sy} w={260} h={100} label="Servidor OPC" sub="estándar único" accent={TL7.cyan} t={t} appear={s + 1.6} online />
        {[420, 560, 700].map((y, i) => { return (<g key={i}><LinkM7 x1={cx + 130} y1={sy + 50} x2={1500} y2={y} start={s + 2.0} t={t} color={TL7.amber} /><NodeM7 x={1500} y={y - 28} w={190} h={56} label={`PLC ${i + 1}`} accent={TL7.amber} t={t} appear={s + 1.2 + i * 0.15} /></g>); })}
      </svg>
      <CapM7 start={s + 3.8} dur={dur - 4.1} size={24} weight={500} color={TL7.mut} y="84%" width={1620}>Como el <b style={{ color: TL7.cyan }}>HDMI</b>: cualquier SCADA con cliente OPC conecta con cualquier PLC con servidor OPC. Fin del caos de drivers.</CapM7>
    </SceneM7>
  );
}

// ── OPC clásico y su limitación ───────────────────────────────────────────────
function S_Classic({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="OPC clásico · DA / HDA / A&E" y="11%" />
      <CapM7 start={s + 0.6} dur={2.2} size={46} weight={600} y="21%" width={1560}>Funcionó, pero arrastraba una <span style={{ color: TL7.red }}>gran limitación</span>.</CapM7>
      <InfoCardM7 x={210} y={400} w={460} h={290} accent={TL7.cyan} title="OPC DA" sub="Data Access: lee/escribe valores en tiempo real. La versión más usada." appear={s + 1.4} t={t} />
      <InfoCardM7 x={730} y={400} w={460} h={290} accent={TL7.vio} title="HDA · A&E" sub="Historical Data Access y Alarms & Events: históricos y alarmas estandarizadas." appear={s + 1.8} t={t} />
      <InfoCardM7 x={1250} y={400} w={460} h={290} accent={TL7.red} title="El problema" sub="Basado en DCOM de Windows: solo Windows, inseguro tras firewalls, dificilísimo de configurar. Obsoleto en proyectos nuevos." appear={s + 2.2} t={t} />
    </SceneM7>
  );
}

// ── OPC-UA: 6 ventajas ────────────────────────────────────────────────────────
function S_UA({ start, dur }) {
  const t = useTime(); const s = start;
  const adv = [
    { k: 'Multiplataforma', d: 'Linux, embebidos, microcontroladores. Un PLC puede ser servidor nativo.', a: TL7.cyan },
    { k: 'Seguridad integrada', d: 'Autenticación, cifrado TLS, roles, auditoría — no opcional.', a: TL7.grn },
    { k: 'Información semántica', d: 'No solo 75.3 → "temperatura R-301, °C, alarma a 120".', a: TL7.vio },
    { k: 'Escalable', d: 'Desde 256 KB de RAM hasta servidores industriales.', a: TL7.amber },
    { k: 'Estándares de internet', d: 'TCP/IP, WebSockets · puerto 4840 · atraviesa firewalls.', a: TL7.pink },
    { k: 'Pub/Sub', d: 'Publican al cambiar; los suscritos reciben. Base del IIoT.', a: TL7.cyanD },
  ];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="OPC-UA · Unified Architecture · 2008" y="8%" />
      <CapM7 start={s + 0.6} dur={2.0} size={44} weight={700} y="15%" width={1560}>Seis ventajas que lo vuelven el estándar del presente.</CapM7>
      {adv.map((a, i) => (
        <InfoCardM7 key={i} x={210 + (i % 3) * 505} y={300 + Math.floor(i / 3) * 240} w={465} h={210} no={i + 1} accent={a.a} title={a.k} sub={a.d} appear={s + 1.2 + i * 0.3} t={t} />
      ))}
    </SceneM7>
  );
}

// ── Address Space ─────────────────────────────────────────────────────────────
function S_AddressSpace({ start, dur }) {
  const t = useTime(); const s = start;
  const tree = [
    { d: 0, k: 'Objects', a: TL7.dim },
    { d: 1, k: 'PLC_Planta_Agua', a: TL7.vio },
    { d: 2, k: 'DB_HMI_Data', a: TL7.cyan },
    { d: 3, k: 'PV_Nivel_T101  ·  Real, m, 0–4', a: TL7.grn },
    { d: 3, k: 'CV_FCV101  ·  Real, %, R/W', a: TL7.amber },
    { d: 3, k: 'SP_Nivel  ·  Real, m, R/W', a: TL7.amber },
    { d: 2, k: 'DB_Alarm_Data', a: TL7.cyan },
    { d: 3, k: 'Alarm_LSHH_T101  ·  Bool', a: TL7.pink },
  ];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="El Address Space · datos navegables" y="9%" />
      <CapM7 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Los datos se navegan como un árbol de directorios — con su significado.</CapM7>
      <div style={{ position: 'absolute', left: 360, top: 290, width: 1200, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {tree.map((n, i) => {
          const ap = clamp((t - (s + 1.4 + i * 0.3)) / 0.4, 0, 1);
          return (
            <div key={i} style={{ opacity: ap, transform: `translateX(${n.d * 56 + (1 - ap) * -14}px)`, display: 'flex', alignItems: 'center', gap: 14, background: n.d >= 3 ? TL7.bg2 : TL7.paper, border: `1px solid ${TL7.lineS}`, borderLeft: `4px solid ${n.a}`, borderRadius: 9, padding: '12px 22px', width: 980 - n.d * 56 }}>
              <span style={{ fontFamily: MONO7, fontSize: n.d >= 3 ? 17 : 19, fontWeight: n.d < 3 ? 700 : 500, color: n.d >= 3 ? TL7.ink : n.a }}>{n.d >= 3 ? '•' : '▸'} {n.k}</span>
            </div>
          );
        })}
      </div>
      <CapM7 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL7.cyanD} y="88%" width={1560}>El concepto «shop floor to cloud» se implementa con OPC-UA → Azure IoT y AWS tienen conectores nativos.</CapM7>
    </SceneM7>
  );
}

const SCENES_M7C4 = [
  { C: (p) => <TitleCardM7 {...p} claseNo={4} title="OPC y OPC-UA" dudur="18–20 min" objetivo="Entender OPC como middleware entre control y supervisión, dominar OPC-UA como estándar moderno y configurar un servidor en TIA Portal." />, dur: 7, label: 'Apertura' },
  { C: S_Problem, dur: 13, label: 'El problema de los drivers' },
  { C: S_Solution, dur: 13, label: 'La solución OPC' },
  { C: S_Classic, dur: 12, label: 'OPC clásico' },
  { C: S_UA, dur: 15, label: 'OPC-UA · 6 ventajas' },
  { C: S_AddressSpace, dur: 14, label: 'Address Space' },
  { C: (p) => <ClosingM7 {...p} line="OPC-UA es el HDMI de la industria moderna: seguro, multiplataforma y semántico — el puente directo del PLC a la nube." activity="Configura OPC-UA entre un servidor de prueba (Prosys o PLCSIM) y el cliente gratuito UaExpert: conéctate, navega el espacio de direcciones, suscribe 5 variables y cambia un setpoint verificando que el PLC lo recibe." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M7C4 = SCENES_M7C4;
