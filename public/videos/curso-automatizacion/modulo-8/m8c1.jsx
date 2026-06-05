// m8c1.jsx — "¿Qué es un SCADA? Historia, componentes y arquitecturas"
// After m8-lib.jsx. Exports SCENES_M8C1.

// ── Qué significa SCADA + SCADA vs PLC ────────────────────────────────────────
function S_Meaning({ start, dur }) {
  const t = useTime(); const s = start;
  const words = [
    { w: 'Supervisory', d: 'Supervisa — no controla directo. El control real lo hace el PLC.', a: TL8.coral },
    { w: 'Control', d: 'El operador cambia setpoints y arranca equipos… pero la orden la ejecuta el PLC.', a: TL8.honey },
    { w: 'And', d: '', a: TL8.dim },
    { w: 'Data Acquisition', d: 'Recopila datos del proceso continuamente, los almacena y los hace analizables.', a: TL8.steel },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="S · C · A · D · A" y="11%" />
      <CapM8 start={s + 0.6} dur={2.2} size={48} weight={600} y="20%" width={1600}>Supervisory <span style={{ color: TL8.coral }}>Control</span> And <span style={{ color: TL8.steel }}>Data Acquisition</span>.</CapM8>
      <div style={{ position: 'absolute', left: '50%', top: 360, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', gap: 14, width: 1320 }}>
        {words.filter(x => x.d).map((x, i) => {
          const ap = pop8(t, s + 1.3 + i * 0.4, 0.5, 16);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 24, background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderLeft: `4px solid ${x.a}`, borderRadius: 11, padding: '18px 26px' }}>
              <span style={{ fontFamily: DISP8, fontSize: 27, fontWeight: 700, color: x.a, minWidth: 280 }}>{x.w}</span>
              <span style={{ fontFamily: DISP8, fontSize: 20, color: TL8.mut, lineHeight: 1.35 }}>{x.d}</span>
            </div>
          );
        })}
      </div>
      <CapM8 start={s + 3.8} dur={dur - 4.1} size={25} weight={500} color={TL8.steelLt} y="86%" width={1560}>Diferencia clave: si el <b style={{ color: TL8.ink }}>SCADA</b> cae, el proceso sigue corriendo bajo el PLC. El SCADA <b style={{ color: TL8.coral }}>humaniza</b> el proceso: convierte miles de señales en información.</CapM8>
    </SceneM8>
  );
}

// ── Historia: 4 generaciones ──────────────────────────────────────────────────
function S_History({ start, dur }) {
  const t = useTime(); const s = start;
  const gens = [
    { g: '1ª', name: 'Monolítico', yr: '1960–1980', d: 'Sistemas propietarios. Cada SCADA, una isla. Texto y lámparas piloto.', a: TL8.dim },
    { g: '2ª', name: 'Distribuido', yr: '1980–1990', d: 'LAN propietaria. Primeros sinópticos gráficos. Varios puestos.', a: TL8.honey },
    { g: '3ª', name: 'En red', yr: '1990–2010', d: 'Ethernet TCP/IP, OPC DA, Modbus TCP. Historiadores y SQL.', a: TL8.steel },
    { g: '4ª', name: 'Nube + IIoT', yr: '2010–hoy', d: 'Web, cloud, MQTT/OPC-UA, edge, gemelos digitales, ciberseguridad.', a: TL8.coral },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Cuatro generaciones de SCADA" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={46} weight={600} y="17%" width={1500}>De la lámpara piloto al navegador web.</CapM8>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={200} y1={420} x2={1720} y2={420} stroke={TL8.lineS} strokeWidth="2" />
      </svg>
      <div style={{ position: 'absolute', left: 130, top: 330, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
        {gens.map((x, i) => {
          const ap = pop8(t, s + 1.2 + i * 0.45, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
              <div style={{ position: 'relative', background: `linear-gradient(160deg, ${TL8.paper}, ${TL8.bg2})`, border: `1px solid ${TL8.lineS}`, borderRadius: 12, padding: '24px 22px', height: 300, boxShadow: TL8.shadowSm }}>
                <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: x.a, borderRadius: 3 }} />
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ fontFamily: DISP8, fontSize: 40, fontWeight: 700, color: x.a }}>{x.g}</span>
                  <span style={{ fontFamily: MONO8, fontSize: 13, color: TL8.dim, letterSpacing: '0.1em' }}>{x.yr}</span>
                </div>
                <div style={{ fontFamily: DISP8, fontSize: 24, fontWeight: 700, color: TL8.ink, margin: '8px 0 12px' }}>{x.name}</div>
                <div style={{ fontFamily: DISP8, fontSize: 17, color: TL8.mut, lineHeight: 1.42 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
      <CapM8 start={s + 3.8} dur={dur - 4.1} size={24} weight={500} color={TL8.coralLt} y="85%" width={1560}>Hoy el SCADA accede desde cualquier navegador y los ataques a infraestructura crítica son una realidad.</CapM8>
    </SceneM8>
  );
}

// ── Los 5 componentes + Historian ─────────────────────────────────────────────
function S_Components({ start, dur }) {
  const t = useTime(); const s = start;
  const comps = [
    { n: 1, name: 'Campo', sub: 'Sensores, actuadores, motores', a: TL8.grn },
    { n: 2, name: 'PLCs / RTUs', sub: 'Control en tiempo real', a: TL8.honey },
    { n: 3, name: 'Red', sub: 'OPC-UA, Modbus TCP, DNP3', a: TL8.steel },
    { n: 4, name: 'Servidor SCADA', sub: 'El corazón del sistema', a: TL8.coral },
    { n: 5, name: 'Clientes HMI', sub: 'Estaciones de operador', a: TL8.coralLt },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Anatomía de un sistema SCADA" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={46} weight={600} y="16%" width={1500}>Cinco componentes, del campo a la pantalla.</CapM8>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {comps.map((c, i) => {
          if (i === comps.length - 1) return null;
          const x1 = 200 + i * 320 + 250, x2 = 200 + (i + 1) * 320;
          return <ArrowM8 key={i} x1={x1} y1={420} x2={x2} y2={420} start={s + 1.6 + i * 0.4} t={t} color={TL8.dim} />;
        })}
        {comps.map((c, i) => (
          <NodeM8 key={i} x={200 + i * 320} y={360} w={250} h={120} label={c.name} sub={c.sub} accent={c.a} t={t} appear={s + 1.3 + i * 0.35} />
        ))}
      </svg>
      <div style={{ position: 'absolute', left: '50%', top: 590, transform: 'translateX(-50%)', width: 1480 }}>
        {(() => { const ap = pop8(t, s + 3.6, 0.55, 20); return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 22, background: TL8.paper, border: `1px solid ${TL8.steel}`, borderRadius: 12, padding: '22px 28px', boxShadow: TL8.shadowSm }}>
            <span style={{ fontFamily: MONO8, fontSize: 14, letterSpacing: '0.18em', color: TL8.steel, fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>+ Historian</span>
            <span style={{ fontFamily: DISP8, fontSize: 20, color: TL8.mut, lineHeight: 1.4 }}>La <b style={{ color: TL8.ink }}>memoria del proceso</b>: 10.000 tags a 1 s durante 10 años en ~100 GB, gracias a la compresión por excepción. Diagnóstico, optimización y cumplimiento regulatorio.</span>
          </div>
        ); })()}
      </div>
    </SceneM8>
  );
}

// ── Arquitecturas de despliegue ───────────────────────────────────────────────
function S_Arch({ start, dur }) {
  const t = useTime(); const s = start;
  const arch = [
    { name: 'Clásica', sub: 'Cliente / Servidor', d: 'Un servidor habla con los PLCs. Punto único de falla.', a: TL8.dim, icon: '🖥️' },
    { name: 'Redundante', sub: 'Primario ↔ Secundario', d: 'Failover < 30 s. Para plantas que no toleran perder supervisión.', a: TL8.honey, icon: '⇄' },
    { name: 'Web', sub: 'Cliente delgado', d: 'El SCADA sirve la interfaz como web. Cero instalación. (Ignition)', a: TL8.steel, icon: '🌐' },
    { name: 'Híbrida Cloud', sub: 'Edge + Nube', d: 'Control local de baja latencia; histórico y gestión en la nube.', a: TL8.coral, icon: '☁️' },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Arquitecturas de despliegue" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={46} weight={600} y="16%" width={1500}>Cómo se despliega un SCADA en planta.</CapM8>
      <div style={{ position: 'absolute', left: 130, top: 320, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
        {arch.map((x, i) => {
          const ap = pop8(t, s + 1.2 + i * 0.4, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
              <div style={{ position: 'relative', background: `linear-gradient(160deg, ${TL8.paper}, ${TL8.bg2})`, border: `1px solid ${i === 3 ? TL8.coral : TL8.lineS}`, borderRadius: 12, padding: '24px 22px', height: 330, boxShadow: TL8.shadowSm }}>
                <div style={{ fontSize: 32, lineHeight: 1 }}>{x.icon}</div>
                <div style={{ fontFamily: DISP8, fontSize: 25, fontWeight: 700, color: TL8.ink, margin: '14px 0 4px' }}>{x.name}</div>
                <div style={{ fontFamily: MONO8, fontSize: 13.5, color: x.a, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{x.sub}</div>
                <div style={{ fontFamily: DISP8, fontSize: 17.5, color: TL8.mut, lineHeight: 1.44 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
      <CapM8 start={s + 3.9} dur={dur - 4.2} size={24} weight={500} color={TL8.coralLt} y="86%" width={1560}>Regla actual: el control vive local (OT) · el histórico y el análisis suben a la nube. La híbrida domina los proyectos 2022–2025.</CapM8>
    </SceneM8>
  );
}

// ── Estándares de diseño HMI ──────────────────────────────────────────────────
function S_Standards({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="No todos los SCADAs son buenos" y="10%" color={TL8.honey} />
      <CapM8 start={s + 0.6} dur={2.2} size={46} weight={600} y="19%" width={1560}>Tres estándares definen una <span style={{ color: TL8.coral }}>buena</span> interfaz.</CapM8>
      <InfoCardM8 x={170} y={400} w={500} h={300} accent={TL8.coral} title="ASM Consortium" sub="Detectar problemas ANTES de la emergencia. Escala de grises para lo normal → color brillante SOLO para alarmas." appear={s + 1.4} t={t} />
      <InfoCardM8 x={710} y={400} w={500} h={300} accent={TL8.honey} title="EEMUA 191" sub="Diseño de sistemas de alarmas. Meta: menos de 1 alarma por operador cada 10 min. La mayoría de plantas: 10–20× más." appear={s + 1.8} t={t} />
      <InfoCardM8 x={1250} y={400} w={500} h={300} accent={TL8.steel} title="ISA-101" sub="Estándar de diseño HMI. 4 niveles de pantalla: visión general → área → equipo → diagnóstico. Color, navegación, jerarquía." appear={s + 2.2} t={t} />
    </SceneM8>
  );
}

const SCENES_M8C1 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={1} seccion="Sistemas SCADA" title="¿Qué es un SCADA?" dudur="16–18 min" objetivo="Comprender qué es un SCADA, su evolución histórica, los componentes de cualquier sistema y las arquitecturas de despliegue de la industria actual." />, dur: 7, label: 'Apertura' },
  { C: S_Meaning, dur: 14, label: 'Qué significa SCADA' },
  { C: S_History, dur: 14, label: '4 generaciones' },
  { C: S_Components, dur: 14, label: 'Los 5 componentes' },
  { C: S_Arch, dur: 13, label: 'Arquitecturas' },
  { C: S_Standards, dur: 12, label: 'Estándares de HMI' },
  { C: (p) => <ClosingM8 {...p} line="Un buen SCADA salva vidas mostrando al operador exactamente lo que necesita saber, en el momento exacto. Un mal SCADA hace lo contrario." activity="Analiza capturas de 3 SCADAs reales (uno con exceso de color, uno con filosofía ASM, uno intermedio). Identifica aciertos y errores, propón mejoras justificadas y rediseña la pantalla más problemática." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M8C1 = SCENES_M8C1;
