// m10c3.jsx — "Advanced Physical Layer (APL): Ethernet hasta el instrumento"
// After m10-lib.jsx. Exports SCENES_M10C3.

// ── Por qué el Ethernet no llegaba al campo ───────────────────────────────────
function S_Problem({ start, dur }) {
  const t = useTime(); const s = start;
  const lim = [
    { ic: '🔌', name: 'Alimentación', d: 'Ethernet no alimenta el instrumento por el mismo cable (PoE es excesivo).', a: TL10.amber },
    { ic: '📏', name: 'Distancia', d: '100BASE-TX: máx. 100 m. La planta tiene instrumentos a 500–2000 m.', a: TL10.mag },
    { ic: '💥', name: 'Zonas peligrosas', d: 'El Ethernet estándar puede generar chispas → no apto para ATEX.', a: TL10.red },
    { ic: '🔧', name: 'Robustez', d: 'El RJ45 no resiste vibración, humedad ni temperatura extrema.', a: TL10.iris },
  ];
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="El protocolo más exitoso… que no llegaba al campo" y="9%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Cuatro límites físicos del Ethernet convencional.</CapM10>
      <div style={{ position: 'absolute', left: 130, top: 290, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 22 }}>
        {lim.map((x, i) => {
          const ap = pop10(t, s + 1.2 + i * 0.3, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', gap: 20, alignItems: 'center', background: TL10.paper, border: `1px solid ${TL10.lineS}`, borderLeft: `4px solid ${x.a}`, borderRadius: 12, padding: '22px 26px', height: 150 }}>
              <span style={{ fontSize: 36, flexShrink: 0 }}>{x.ic}</span>
              <div>
                <div style={{ fontFamily: DISP10, fontSize: 23, fontWeight: 700, color: TL10.ink }}>{x.name}</div>
                <div style={{ fontFamily: DISP10, fontSize: 17, color: TL10.mut, marginTop: 5, lineHeight: 1.4 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SceneM10>
  );
}

// ── Lo que APL resuelve ───────────────────────────────────────────────────────
function S_APL({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Advanced Physical Layer · IEEE 802.3cg" y="9%" color={TL10.mint} />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Ethernet diseñado para el instrumento de campo.</CapM10>
      <div style={{ position: 'absolute', left: 130, top: 300, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
        {[
          ['Alimentación', 'PoDL', 'Datos + energía (hasta 500 mW) en el mismo par.', TL10.amber],
          ['Distancia', '1000 m', '10 Mbps con cable de instrumentación estándar.', TL10.mag],
          ['Zonas Ex', '2-WISE', 'Perfil de seguridad intrínseca para Zona 1 y 2.', TL10.red],
          ['Un par', '2 hilos', 'El mismo cable que el 4–20 mA — reutilizable.', TL10.iris],
        ].map((x, i) => {
          const ap = pop10(t, s + 1.2 + i * 0.35, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', background: `linear-gradient(160deg, ${TL10.paper}, ${TL10.bg2})`, border: `1px solid ${TL10.lineS}`, borderRadius: 12, padding: '24px 22px', height: 300, boxShadow: TL10.shadowSm }}>
              <div style={{ fontFamily: MONO10, fontSize: 14, color: TL10.dim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{x[0]}</div>
              <div style={{ fontFamily: DISP10, fontSize: 34, fontWeight: 700, color: x[3], margin: '8px 0 14px' }}>{x[1]}</div>
              <div style={{ fontFamily: DISP10, fontSize: 17.5, color: TL10.mut, lineHeight: 1.44 }}>{x[2]}</div>
            </div>
          );
        })}
      </div>
      <CapM10 start={s + 3.9} dur={dur - 4.2} size={23} weight={500} color={TL10.mintLt} y="86%" width={1560}>Frente a Foundation Fieldbus H1 (31.25 kbps), APL es <b style={{ color: TL10.ink }}>320 veces más rápido</b> a casi la misma distancia.</CapM10>
    </SceneM10>
  );
}

// ── Comparativa de tecnologías ────────────────────────────────────────────────
function S_Compare({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="El panorama de la capa física" y="9%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>De lo analógico a lo emergente.</CapM10>
      <TableM10 x={210} y={290} w={1500} t={t} appear={s + 1.2} accentCol={1}
        headers={['Tecnología', 'Velocidad', 'Distancia', 'Zonas Ex', 'Estado']}
        colTemplate="1.5fr 1fr 1fr 1fr 1.3fr"
        rows={[
          ['4–20 mA', 'Analógico', '1000+ m', 'Sí', 'Estándar actual'],
          ['HART', '1.2 kbps', '1000+ m', 'Sí', 'Estándar actual'],
          ['PROFIBUS PA', '31.25 kbps', '1900 m', 'Sí', 'Maduro'],
          ['Foundation FF H1', '31.25 kbps', '1900 m', 'Sí', 'Maduro'],
          ['APL (10BASE-T1L)', '10 Mbps', '1000 m', 'Sí (2-WISE)', 'Emergente'],
        ]} />
      <CapM10 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL10.mut} y="87%" width={1560}>El 4–20 mA seguirá en plantas existentes 2–3 décadas. APL es para lo nuevo.</CapM10>
    </SceneM10>
  );
}

// ── Arquitectura APL: instrumento con IP propia ───────────────────────────────
function S_Arch({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Cada instrumento, su propia IP" y="9%" color={TL10.mag} />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>El dato va <span style={{ color: TL10.mint }}>directo</span> del sensor al SCADA.</CapM10>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM10 x={250} y={470} w={300} h={120} label="Switch APL" sub="infraestructura" accent={TL10.iris} t={t} appear={s + 1.2} />
        <ArrowM10 x1={250} y1={530} x2={120} y2={530} start={s + 1.6} t={t} color={TL10.dim} dashed />
        <text x={140} y={510} fill={TL10.mut} fontFamily={MONO10} fontSize="14">→ PLC / SCADA</text>
        {[['PT · OPC-UA', 360], ['TT · OPC-UA', 470], ['LT · OPC-UA', 580], ['FCV · EtherNet/IP', 690]].map((d, i) => {
          const ap = clamp((t - (s + 1.8 + i * 0.22)) / 0.5, 0, 1);
          return (
            <g key={i} opacity={ap}>
              <line x1={550} y1={530} x2={780} y2={d[1]} stroke={TL10.magWash} strokeWidth="2.5" />
              <rect x={780} y={d[1] - 28} width={360} height={56} rx="10" fill={TL10.paper} stroke={i === 3 ? TL10.iris : TL10.mag} strokeWidth="2" />
              <text x={800} y={d[1] + 7} fill={TL10.ink} fontFamily={MONO10} fontSize="16.5">{d[0]}</text>
            </g>
          );
        })}
      </svg>
      <InfoCardM10 x={1280} y={350} w={470} h={330} accent={TL10.mint} title="Sin intermediarios" sub="No hace falta módulo AI del PLC, ni escalado, ni transmisión por el sistema de control. El transmisor publica OPC-UA y el SCADA lo lee directo. Se actualiza por firmware, como un router." appear={s + 2.6} t={t} />
      <CapM10 start={s + 4.2} dur={dur - 4.5} size={22} weight={500} color={TL10.magLt} y="90%" width={1560}>El automatizador del futuro mezcla redes IT (TCP/IP, switches) con OT: la línea entre instrumentista y administrador de red se difumina.</CapM10>
    </SceneM10>
  );
}

const SCENES_M10C3 = [
  { C: (p) => <TitleCardM10 {...p} claseNo={3} seccion="APL · Ethernet de campo" title="APL: Ethernet hasta el instrumento" dudur="16–18 min" objetivo="Comprender por qué el Ethernet convencional no llega al campo, cómo APL lo resuelve y el impacto que tendrá en la industria de proceso en los próximos años." />, dur: 7, label: 'Apertura' },
  { C: S_Problem, dur: 13, label: 'El problema' },
  { C: S_APL, dur: 14, label: 'Lo que APL resuelve' },
  { C: S_Compare, dur: 13, label: 'Comparativa' },
  { C: S_Arch, dur: 15, label: 'Arquitectura APL' },
  { C: (p) => <ClosingM10 {...p} line="APL borra la última frontera: lleva Ethernet —y con él OPC-UA— hasta el transmisor en zona peligrosa. El instrumento deja de ser un sensor mudo y se vuelve un nodo de la red." activity="Diseña la arquitectura de instrumentación de una sección de planta con 12 instrumentos, comparando: (A) 4–20 mA + HART, (B) PROFIBUS PA y (C) APL. Para cada una dibuja la red, estima costo de cable e infraestructura, lista las ventajas de diagnóstico y recomienda con criterios técnicos y económicos." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M10C3 = SCENES_M10C3;
