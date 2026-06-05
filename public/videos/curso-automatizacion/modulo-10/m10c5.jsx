// m10c5.jsx — "Mantenimiento predictivo e IIoT"
// After m10-lib.jsx. Exports SCENES_M10C5.

// ── Las 4 filosofías de mantenimiento ─────────────────────────────────────────
function S_Philosophies({ start, dur }) {
  const t = useTime(); const s = start;
  const ph = [
    { n: '1', name: 'Correctivo', sub: 'Run to Failure', d: 'Dejar fallar y reparar. Solo para equipos no críticos y baratos.', a: TL10.red },
    { n: '2', name: 'Preventivo', sub: 'Time-Based', d: 'Cambiar cada X horas, esté como esté. A veces sobra, a veces falta.', a: TL10.amber },
    { n: '3', name: 'Predictivo', sub: 'Condition-Based', d: 'Actuar cuando los datos indican que el fallo se acerca. Aprovecha toda la vida útil.', a: TL10.mint },
    { n: '4', name: 'Prescriptivo', sub: 'AI-Based', d: 'No solo predice: prescribe qué hacer, cuándo y cómo. Integrado con el ERP.', a: TL10.mag },
  ];
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Cuatro filosofías de mantenimiento" y="8%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="14%" width={1560}>De «esperar a que falle» a «predecir y prescribir».</CapM10>
      <div style={{ position: 'absolute', left: 130, top: 280, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
        {ph.map((x, i) => {
          const ap = pop10(t, s + 1.1 + i * 0.35, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', background: `linear-gradient(160deg, ${TL10.paper}, ${TL10.bg2})`, border: `1px solid ${i === 3 ? TL10.mag : TL10.lineS}`, borderRadius: 12, padding: '22px 22px', height: 320, boxShadow: TL10.shadowSm }}>
              <span style={{ fontFamily: DISP10, fontSize: 36, fontWeight: 700, color: x.a }}>{x.n}</span>
              <div style={{ fontFamily: DISP10, fontSize: 23, fontWeight: 700, color: TL10.ink, margin: '8px 0 2px' }}>{x.name}</div>
              <div style={{ fontFamily: MONO10, fontSize: 13.5, color: x.a, letterSpacing: '0.06em', marginBottom: 12 }}>{x.sub}</div>
              <div style={{ fontFamily: DISP10, fontSize: 17, color: TL10.mut, lineHeight: 1.44 }}>{x.d}</div>
            </div>
          );
        })}
      </div>
    </SceneM10>
  );
}

// ── Técnicas de mantenimiento predictivo ──────────────────────────────────────
function S_Techniques({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Técnicas de mantenimiento predictivo" y="9%" color={TL10.mint} />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Cada falla deja una firma medible.</CapM10>
      <TableM10 x={210} y={290} w={1500} t={t} appear={s + 1.2} accentCol={0}
        headers={['Técnica', 'Qué detecta']}
        colTemplate="1fr 2.2fr"
        rows={[
          ['Análisis de vibración', 'Desbalanceo (1×), desalineación (2×), defecto de rodamiento'],
          ['Termografía IR', 'Conexiones flojas, fases desbalanceadas, hotspots en tableros'],
          ['MCSA (corriente)', 'Barras de rotor rotas, excentricidad — sin sensores extra'],
          ['Deriva de sensores', 'Comparar 3 transmisores redundantes: el que se aparta, driftea'],
        ]} />
      <CapM10 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL10.mintLt} y="86%" width={1560}>La vibración se transmite al SCADA como tag analógico con alarmas H/HH, y su tendencia en el Historian muestra la degradación gradual.</CapM10>
    </SceneM10>
  );
}

// ── El stack IIoT + MQTT ──────────────────────────────────────────────────────
function S_IIoT({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="IIoT · la infraestructura que lo habilita" y="9%" color={TL10.iris} />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>De la planta a los insights, en capas.</CapM10>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {[['Planta', 'sensores · PLCs', TL10.amber, 250], ['Edge Gateway', 'preprocesa y comprime', TL10.mint, 660], ['Nube IIoT', 'almacena · ML', TL10.iris, 1070], ['Dashboard / ERP', 'insights', TL10.mag, 1480]].map((x, i) => (
          <NodeM10 key={i} x={x[3]} y={460} w={260} h={120} label={x[0]} sub={x[1]} accent={x[2]} t={t} appear={s + 1.2 + i * 0.3} />
        ))}
        <LinkM10 x1={510} y1={520} x2={660} y2={520} start={s + 1.8} t={t} color={TL10.mint} />
        <LinkM10 x1={920} y1={520} x2={1070} y2={520} start={s + 2.1} t={t} color={TL10.iris} />
        <LinkM10 x1={1330} y1={520} x2={1480} y2={520} start={s + 2.4} t={t} color={TL10.mag} />
      </svg>
      <CapM10 start={s + 3.6} dur={dur - 3.9} size={23} weight={500} color={TL10.magLt} y="76%" width={1560}><b style={{ color: TL10.ink }}>MQTT</b>: el sensor publica en un topic (planta/bomba_101/vibracion) → cualquier suscriptor lo recibe. <b style={{ color: TL10.mint }}>Sparkplug B</b> lo estandariza para PLC.</CapM10>
    </SceneM10>
  );
}

// ── Práctica: stack IIoT open source ──────────────────────────────────────────
function S_Practice({ start, dur }) {
  const t = useTime(); const s = start;
  const chain = [['PLC', TL10.amber], ['Ignition', TL10.mag], ['MQTT', TL10.mint], ['InfluxDB', TL10.iris], ['Grafana', TL10.mintLt]];
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Práctica · stack IIoT 100 % gratuito" y="11%" color={TL10.mint} />
      <CapM10 start={s + 0.6} dur={2.2} size={44} weight={600} y="22%" width={1560}>El dato fluye de punta a punta.</CapM10>
      <div style={{ position: 'absolute', left: '50%', top: '48%', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', gap: 8 }}>
        {chain.map((c, i) => {
          const ap = pop10(t, s + 1.4 + i * 0.3, 0.5, 16);
          return (
            <React.Fragment key={i}>
              <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, padding: '22px 30px', borderRadius: 12, background: TL10.paper, border: `1.5px solid ${c[1]}`, fontFamily: DISP10, fontSize: 24, fontWeight: 700, color: c[1] }}>{c[0]}</div>
              {i < chain.length - 1 && <span style={{ opacity: clamp((t - (s + 1.6 + i * 0.3)) / 0.4, 0, 1), fontFamily: MONO10, fontSize: 26, color: TL10.dim }}>→</span>}
            </React.Fragment>
          );
        })}
      </div>
      <CapM10 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL10.mut} y="72%" width={1560}>Mosquitto (broker) + Node-RED (publica) + InfluxDB (series de tiempo) + Grafana (dashboard) — todo open source.</CapM10>
    </SceneM10>
  );
}

const SCENES_M10C5 = [
  { C: (p) => <TitleCardM10 {...p} claseNo={5} seccion="Mantenimiento · IIoT" title="Mantenimiento predictivo e IIoT" dudur="16–18 min" objetivo="Comprender las 4 filosofías de mantenimiento y por qué el predictivo es el más avanzado, las técnicas más usadas y el rol del IIoT para habilitarlo a escala." />, dur: 7, label: 'Apertura' },
  { C: S_Philosophies, dur: 14, label: '4 filosofías' },
  { C: S_Techniques, dur: 13, label: 'Técnicas predictivas' },
  { C: S_IIoT, dur: 13, label: 'El stack IIoT' },
  { C: S_Practice, dur: 12, label: 'Práctica open source' },
  { C: (p) => <ClosingM10 {...p} line="El mantenimiento predictivo cambia la pregunta de «¿cada cuánto reviso?» a «¿qué me está diciendo el equipo?». Y el IIoT es lo que hace esa conversación posible a escala de planta." activity="Diseña el plan de mantenimiento predictivo de la planta de agua: identifica los 5 equipos más críticos, elige la técnica para cada uno, especifica los sensores necesarios, define los umbrales de alarma en el SCADA y estima el beneficio económico vs el preventivo para la bomba principal." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M10C5 = SCENES_M10C5;
