// m7c5.jsx — "Ethernet industrial y topologías de red en planta"
// After m7-lib.jsx. Exports SCENES_M7C5.

// ── Switch de oficina vs industrial ───────────────────────────────────────────
function S_Switch({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="¿Por qué no un switch de oficina?" y="9%" />
      <CapM7 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>La planta es un ambiente hostil: calor, polvo, vibración, ruido eléctrico.</CapM7>
      <TableM7 x={260} y={290} w={1400} t={t} appear={s + 1.2} accentCol={2}
        headers={['Característica', 'Switch de oficina', 'Switch industrial']}
        colTemplate="1.2fr 1fr 1fr"
        rows={[
          ['Temperatura', '0 – 40 °C', '−40 a +70 °C'],
          ['Protección', 'IP20 interior', 'IP30 / IP67'],
          ['Alimentación', '12 V / 5 V DC', '24 VDC industrial'],
          ['Montaje', 'mesa / rack 19"', 'riel DIN / panel'],
          ['MTBF', '50 000 h', '> 200 000 h'],
          ['Redundancia', 'STP lento', 'MRP < 200 ms'],
        ]} />
      <CapM7 start={s + 3.6} dur={dur - 3.9} size={23} weight={500} color={TL7.mut} y="88%" width={1560}>Líderes: Siemens SCALANCE · Phoenix Contact · Hirschmann · Moxa · Cisco IE.</CapM7>
    </SceneM7>
  );
}

// ── Redundancia ───────────────────────────────────────────────────────────────
function S_Redundancy({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Redundancia · la red nunca debe caer" y="10%" color={TL7.amber} />
      <CapM7 start={s + 0.6} dur={2.2} size={46} weight={600} y="20%" width={1500}>Tres niveles de protección según la criticidad.</CapM7>
      <InfoCardM7 x={210} y={400} w={490} h={290} accent={TL7.grn} title="MRP" sub="Media Redundancy Protocol (IEC 62439-2). Anillo con un manager. Recuperación < 200 ms (o < 30 ms fast). Estándar SCALANCE." appear={s + 1.4} t={t} />
      <InfoCardM7 x={715} y={400} w={490} h={290} accent={TL7.cyan} title="RSTP" sub="Rapid Spanning Tree (802.1w). En cualquier switch gestionado. Recuperación 1–2 s — para cuando esa pausa es tolerable." appear={s + 1.8} t={t} />
      <InfoCardM7 x={1220} y={400} w={490} h={290} accent={TL7.pink} title="PRP / HSR" sub="Dos redes en paralelo: cero tiempo de recuperación. Subestaciones eléctricas, nuclear, procesos ultra-críticos." appear={s + 2.2} t={t} />
    </SceneM7>
  );
}

// ── Segmentación IT/OT y DMZ ──────────────────────────────────────────────────
function S_DMZ({ start, dur }) {
  const t = useTime(); const s = start;
  const layers = [
    { y: 300, k: 'Internet', sub: '', a: TL7.dim, w: 360 },
    { y: 400, k: 'Red IT corporativa', sub: 'oficinas · ERP · email', a: TL7.red, w: 560 },
    { y: 500, k: 'DMZ Industrial', sub: 'Historian · servidor OPC-UA · SCADA', a: TL7.amber, w: 720 },
    { y: 600, k: 'Red OT', sub: 'PLCs · HMI · E/S distribuidas', a: TL7.grn, w: 880 },
  ];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Segmentación IT / OT · IEC 62443" y="8%" />
      <CapM7 start={s + 0.6} dur={2.0} size={42} weight={600} y="15%" width={1560}>Entre cada zona, un firewall — y los datos suben, los comandos no bajan.</CapM7>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {layers.map((l, i) => {
          const ap = pop7(t, s + 1.2 + i * 0.4, 0.5, 14);
          return (
            <g key={i} opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
              <rect x={960 - l.w / 2} y={l.y} width={l.w} height={70} rx="11" fill={TL7.paper} stroke={l.a} strokeWidth="2.2" />
              <text x={960} y={l.y + (l.sub ? 30 : 42)} fill={TL7.ink} fontFamily={DISP7} fontSize="23" fontWeight="700" textAnchor="middle">{l.k}</text>
              {l.sub && <text x={960} y={l.y + 52} fill={l.a} fontFamily={MONO7} fontSize="14" textAnchor="middle">{l.sub}</text>}
              {i < layers.length - 1 && <g opacity={clamp((t - (s + 1.5 + i * 0.4)) / 0.4, 0, 1)}>
                <rect x={945} y={l.y + 72} width={30} height={26} rx="4" fill={TL7.bg2} stroke={TL7.cyan} strokeWidth="1.8" />
                <text x={960} y={l.y + 90} fill={TL7.cyan} fontFamily={MONO7} fontSize="13" fontWeight="700" textAnchor="middle">FW</text>
              </g>}
            </g>
          );
        })}
      </svg>
      <CapM7 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL7.mut} y="86%" width={1620}>Nunca conectar OT directo a internet · el firewall solo permite puertos en whitelist · un <b style={{ color: TL7.cyan }}>data diode</b> garantiza flujo en una sola dirección.</CapM7>
    </SceneM7>
  );
}

// ── Cableado: cobre vs fibra ──────────────────────────────────────────────────
function S_Cabling({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Cableado de red industrial" y="11%" />
      <CapM7 start={s + 0.6} dur={2.2} size={46} weight={600} y="21%" width={1500}>Cobre hasta 100 m; más allá, <span style={{ color: TL7.cyan }}>fibra óptica</span>.</CapM7>
      <InfoCardM7 x={250} y={400} w={640} h={270} accent={TL7.amber} title="Cobre · Cat 5e / 6 / 6A" sub="Hasta 100 m por segmento. Versión industrial: blindaje STP/SFTP, chaqueta LSZH o PUR resistente a aceites y UV. RJ45 IP67 en campo." appear={s + 1.4} t={t} />
      <InfoCardM7 x={1030} y={400} w={640} h={270} accent={TL7.cyan} title="Fibra óptica" sub="Inmune a interferencia EM, hasta 40 km, no conduce electricidad (segura en ATEX). Para interconexión entre edificios y salas de control." appear={s + 1.9} t={t} />
    </SceneM7>
  );
}

// ── Arquitectura del proyecto ─────────────────────────────────────────────────
function S_Architecture({ start, dur }) {
  const t = useTime(); const s = start;
  const ports = [
    { k: 'CPU S7-1500', sub: 'PLC principal', a: TL7.vio },
    { k: 'Ignition SCADA', sub: 'servidor', a: TL7.pink },
    { k: 'ET 200SP × 2', sub: 'campo N / S', a: TL7.grn },
    { k: 'VFD P-101/102', sub: 'EtherNet/IP', a: TL7.amber },
    { k: 'Medidor energía', sub: 'Modbus TCP', a: TL7.cyanD },
    { k: 'Firewall → IT', sub: 'red corporativa', a: TL7.red },
  ];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Arquitectura de red del proyecto" y="9%" />
      <CapM7 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Todo en torno a un switch <span style={{ color: TL7.cyan }}>SCALANCE XC216</span> con MRP.</CapM7>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM7 x={810} y={330} w={300} h={90} label="SCALANCE XC216" sub="16 puertos · PROFINET · MRP" accent={TL7.cyan} t={t} appear={s + 1.2} online />
        {ports.map((p, i) => {
          const ang = -Math.PI + (i / (ports.length - 1)) * Math.PI;
          const px = 960 + Math.cos(ang) * 560;
          const py = 700 + Math.sin(ang) * 230 + 40;
          return (
            <g key={i}>
              <LinkM7 x1={960} y1={420} x2={px} y2={py - 36} start={s + 1.8 + i * 0.2} t={t} color={p.a} dur={0.5} />
              <NodeM7 x={px - 130} y={py - 36} w={260} h={72} label={p.k} sub={p.sub} accent={p.a} t={t} appear={s + 2.0 + i * 0.2} />
            </g>
          );
        })}
      </svg>
    </SceneM7>
  );
}

const SCENES_M7C5 = [
  { C: (p) => <TitleCardM7 {...p} claseNo={5} title="Ethernet industrial y topologías" dudur="16–18 min" objetivo="Distinguir Ethernet industrial del de oficina, conocer los equipos de red de planta y diseñar la segmentación IT/OT segura." />, dur: 7, label: 'Apertura' },
  { C: S_Switch, dur: 12, label: 'Switch industrial' },
  { C: S_Redundancy, dur: 12, label: 'Redundancia' },
  { C: S_DMZ, dur: 14, label: 'Segmentación IT/OT' },
  { C: S_Cabling, dur: 11, label: 'Cobre vs fibra' },
  { C: S_Architecture, dur: 14, label: 'Arquitectura del proyecto' },
  { C: (p) => <ClosingM7 {...p} line="La red de planta exige equipos robustos, redundancia donde importa y una frontera firme entre IT y OT — la ciberseguridad industrial empieza por la topología." activity="Diseña la arquitectura de red completa del proyecto: diagrama con todos los dispositivos y firewalls, tabla de direcciones IP, tabla de puertos abiertos por zona y plan de redundancia MRP." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M7C5 = SCENES_M7C5;
