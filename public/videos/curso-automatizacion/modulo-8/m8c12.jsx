// m8c12.jsx — "Tendencias en SCADA: Cloud, IIoT y Gemelos Digitales"
// After m8-lib.jsx. Exports SCENES_M8C12.

// ── Las 5 tendencias ──────────────────────────────────────────────────────────
function S_Trends({ start, dur }) {
  const t = useTime(); const s = start;
  const tr = [
    { ic: '☁️', name: 'Cloud SCADA', d: 'El servidor en AWS/Azure. Acceso global. El control sigue local.', a: TL8.steel },
    { ic: '📡', name: 'MQTT + Sparkplug B', d: 'Publicar/suscribir: el dispositivo reporta solo al cambiar.', a: TL8.coral },
    { ic: '🧩', name: 'Edge Computing', d: 'Procesar en el borde: ML local, buffering sin internet.', a: TL8.honey },
    { ic: '🧠', name: 'IA y análisis', d: 'Mantenimiento predictivo, optimización, MPC.', a: TL8.grn },
    { ic: '🔁', name: 'Gemelos Digitales', d: 'Réplica virtual en tiempo real del proceso físico.', a: TL8.steelLt },
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Del SCADA clásico al SCADA 4.0" y="8%" />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="14%" width={1560}>Cinco fuerzas que están transformando la supervisión.</CapM8>
      <div style={{ position: 'absolute', left: 130, top: 270, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 18 }}>
        {tr.map((x, i) => {
          const ap = pop8(t, s + 1.1 + i * 0.32, 0.5, 20);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
              <div style={{ position: 'relative', background: `linear-gradient(160deg, ${TL8.paper}, ${TL8.bg2})`, border: `1px solid ${TL8.lineS}`, borderRadius: 12, padding: '22px 18px', height: 340, boxShadow: TL8.shadowSm }}>
                <div style={{ fontSize: 32, lineHeight: 1 }}>{x.ic}</div>
                <div style={{ fontFamily: DISP8, fontSize: 21, fontWeight: 700, color: x.a, margin: '16px 0 12px', lineHeight: 1.1 }}>{x.name}</div>
                <div style={{ fontFamily: DISP8, fontSize: 17, color: TL8.mut, lineHeight: 1.44 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
      <CapM8 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL8.coralLt} y="86%" width={1560}>Regla de oro: el SCADA de <b style={{ color: TL8.ink }}>control</b> sigue siendo local (OT). Solo el análisis y el reporting suben a la nube.</CapM8>
    </SceneM8>
  );
}

// ── MQTT publish/subscribe ────────────────────────────────────────────────────
function S_MQTT({ start, dur }) {
  const t = useTime(); const s = start;
  const cy = 520;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="MQTT · publicar / suscribir" y="9%" color={TL8.coral} />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>El dispositivo reporta <span style={{ color: TL8.coral }}>solo cuando cambia</span> — no por polling.</CapM8>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM8 x={180} y={cy - 60} w={300} h={120} label="PLC + Edge" sub="publica Sparkplug B" accent={TL8.honey} t={t} appear={s + 1.2} online />
        <LinkM8 x1={480} y1={cy} x2={810} y2={cy} start={s + 1.6} t={t} color={TL8.coral} label="publish" />
        <NodeM8 x={810} y={cy - 60} w={300} h={120} label="Broker MQTT" sub="distribuye" accent={TL8.coral} t={t} appear={s + 1.8} />
        <LinkM8 x1={1110} y1={cy - 30} x2={1440} y2={cy - 90} start={s + 2.3} t={t} color={TL8.steel} label="subscribe" />
        <LinkM8 x1={1110} y1={cy + 30} x2={1440} y2={cy + 90} start={s + 2.5} t={t} color={TL8.steel} />
        <NodeM8 x={1440} y={cy - 150} w={300} h={100} label="SCADA" sub="suscriptor" accent={TL8.steel} t={t} appear={s + 2.6} />
        <NodeM8 x={1440} y={cy + 50} w={300} h={100} label="Analítica / BI" sub="suscriptor" accent={TL8.grn} t={t} appear={s + 2.8} />
      </svg>
      <CapM8 start={s + 3.8} dur={dur - 4.1} size={24} weight={500} color={TL8.mut} y="80%" width={1560}>Sparkplug B estandariza cómo publicar datos de PLC. Ignition lo soporta nativo → más eficiente que el polling Modbus.</CapM8>
    </SceneM8>
  );
}

// ── Gemelo digital ────────────────────────────────────────────────────────────
function S_Twin({ start, dur }) {
  const t = useTime(); const s = start;
  const lvlR = 0.6 + 0.08 * Math.sin((t - s) * 0.9);
  const lvlT = lvlR + 0.02 * Math.sin((t - s) * 0.9 + 0.3);
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Gemelos digitales" y="9%" color={TL8.steelLt} />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Una réplica virtual que respira con el proceso real.</CapM8>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <TankM8 x={420} y={330} w={150} h={210} level={lvlR} accent={TL8.steel} tag="PROCESO REAL" valTxt={(lvlR * 4).toFixed(2) + ' m'} t={t} appear={s + 1.3} />
        <TankM8 x={1350} y={330} w={150} h={210} level={lvlT} accent={TL8.grn} tag="GEMELO" valTxt={(lvlT * 4).toFixed(2) + ' m'} t={t} appear={s + 1.6} />
        <LinkM8 x1={600} y1={435} x2={1330} y2={435} start={s + 2.0} t={t} color={TL8.steelLt} label="mismos datos de sensores" back />
      </svg>
      <div style={{ position: 'absolute', left: '50%', top: 640, transform: 'translateX(-50%)', display: 'flex', gap: 16 }}>
        {[['Simular "what if"', 'sin riesgo'], ['Detectar desviaciones', 'real vs modelo'], ['Entrenar operadores', 'sin riesgo'], ['Optimizar offline', 'antes de aplicar']].map((x, i) => {
          const ap = pop8(t, s + 2.6 + i * 0.25, 0.5, 16);
          return <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, width: 280, background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderRadius: 11, padding: '16px 20px', textAlign: 'center' }}><div style={{ fontFamily: DISP8, fontSize: 18.5, fontWeight: 700, color: TL8.ink }}>{x[0]}</div><div style={{ fontFamily: MONO8, fontSize: 14, color: TL8.steelLt, marginTop: 5 }}>{x[1]}</div></div>;
        })}
      </div>
    </SceneM8>
  );
}

// ── El futuro del operador ────────────────────────────────────────────────────
function S_Operator({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="¿Y el operador?" y="14%" />
      <CapM8 start={s + 0.6} dur={2.6} size={50} weight={600} y="30%" width={1620}>No desaparece — <span style={{ color: TL8.coral }}>evoluciona</span>: de reaccionar a alarmas a analizar datos y decidir.</CapM8>
      <div style={{ position: 'absolute', left: '50%', top: '58%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 30 }}>
        {(() => { const ap = pop8(t, s + 2.2, 0.6, 18); return (
          <>
            <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, padding: '20px 30px', borderRadius: 12, background: TL8.paper, border: `1px solid ${TL8.lineS}`, fontFamily: DISP8, fontSize: 22, color: TL8.mut }}>Reaccionar a alarmas</div>
            <span style={{ opacity: ap.op, fontFamily: MONO8, fontSize: 30, color: TL8.coral }}>→</span>
            <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, padding: '20px 30px', borderRadius: 12, background: TL8.coralWash, border: `1px solid ${TL8.coral}`, fontFamily: DISP8, fontSize: 22, fontWeight: 700, color: TL8.ink }}>Analizar datos y tendencias</div>
          </>
        ); })()}
      </div>
      <CapM8 start={s + 4.0} dur={dur - 4.3} size={24} weight={500} color={TL8.steelLt} y="80%" width={1560}>Nuevas habilidades: análisis de datos, lectura de dashboards de BI, comprensión de modelos de ML. Siempre habrá un humano supervisando.</CapM8>
    </SceneM8>
  );
}

const SCENES_M8C12 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={12} seccion="Tendencias · cierre" title="Cloud, IIoT y Gemelos Digitales" dudur="14–16 min · cierre" objetivo="Conocer las tendencias del SCADA para 2025–2030, comprender qué es un gemelo digital y entender el impacto de la Industria 4.0 en la supervisión." />, dur: 7, label: 'Apertura' },
  { C: S_Trends, dur: 14, label: 'Las 5 tendencias' },
  { C: S_MQTT, dur: 13, label: 'MQTT y Sparkplug' },
  { C: S_Twin, dur: 14, label: 'Gemelo digital' },
  { C: S_Operator, dur: 12, label: 'El futuro del operador' },
  { C: (p) => <ClosingM8 {...p} line="El SCADA del futuro estará en la nube, hablará MQTT y tendrá un gemelo digital — pero seguirá existiendo para lo mismo: que un humano entienda y gobierne el proceso." activity="Investiga y presenta (2 págs o 5 diapositivas) un caso real de SCADA avanzado (cloud, IIoT o gemelo digital): qué problema resolvió, qué beneficios cuantificables, qué desafíos y qué aprendizajes aplicarías al proyecto del curso." />, dur: 8, label: 'Cierre del módulo' },
];
window.SCENES_M8C12 = SCENES_M8C12;
