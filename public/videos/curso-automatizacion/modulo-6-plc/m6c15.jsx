// m6c15.jsx — "Proyecto PLC 2: Control integrado de planta con secuencias y PID múltiple"
// After m6-lib.jsx. Exports SCENES_M6C15.

function S_Plant({ start, dur }) {
  const t = useTime(); const s = start;
  const units = [
    { k: 'T-101 · Captación', items: ['LT-101 nivel 0–4 m', 'P-101 bomba', 'FT-101 caudal'], a: TL6.cyan },
    { k: 'R-301 · Reactor', items: ['TT-301 temp 0–80 °C', 'FCV-301 vapor', 'AG-301 agitador'], a: TL6.amber },
    { k: 'F-201 · Filtros', items: ['PDT-201 ΔP 0–0.5 bar', 'alarma obstrucción'], a: TL6.grn },
    { k: 'T-401 · Tratada', items: ['LT-401 nivel 0–5 m', 'FT-401 salida', 'PT-401 presión red'], a: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="La planta de tratamiento de agua" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="20%" width={1500}>Cuatro unidades, un solo PLC.</CapM6>
      {units.map((u, i) => (
        <div key={i} style={{ position: 'absolute', left: 200 + i * 388, top: 400, width: 350 }}>
          {(() => { const ap = pop6(t, s + 1.4 + i * 0.4, 0.5, 20); return (
            <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', borderRadius: 12, border: `1px solid ${TL6.lineS}`, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, boxShadow: TL6.shadow, padding: '24px 24px', height: 320, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: u.a, borderRadius: 3 }} />
              <div style={{ fontFamily: DISP6, fontSize: 24, fontWeight: 700, color: TL6.ink, lineHeight: 1.1 }}>{u.k}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                {u.items.map((it, k) => <div key={k} style={{ fontFamily: MONO6, fontSize: 16, color: TL6.mut }}>· {it}</div>)}
              </div>
            </div>
          ); })()}
        </div>
      ))}
      <CapM6 start={s + 4.4} dur={dur - 4.7} size={24} weight={500} color={TL6.mut} y="86%" width={1500}>45+ señales, 3 lazos PID y secuencias coordinadas — el proyecto más complejo del módulo.</CapM6>
    </SceneM6>
  );
}

function S_Structure({ start, dur }) {
  const t = useTime(); const s = start;
  const blocks = [
    { k: 'OB100 · Startup', d: 'Cargar setpoints, verificar módulos, inicializar bits.', a: TL6.cyanLt },
    { k: 'OB1 · Main (Ladder)', d: 'Modos, FB Motor/Valve, enclavamientos globales.', a: TL6.cyan },
    { k: 'OB30 · Cyclic 100 ms', d: '3 PID: nivel T-101, temperatura R-301, nivel T-401.', a: TL6.grn },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="La estructura del programa" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="21%" width={1500}>Todo lo aprendido, ensamblado.</CapM6>
      {blocks.map((b, i) => (
        <InfoCardM6 key={i} x={250 + i * 500} y={410} w={450} h={300} title={b.k} sub={b.d} accent={b.a} appear={s + 1.4 + i * 0.45} t={t} />
      ))}
      <CapM6 start={s + 4.0} dur={dur - 4.3} size={24} weight={500} color={TL6.mut} y="88%" width={1500}>FBs instanciados para cada equipo; FCs de escalado y alarmas; DBs de datos, HMI y recetas.</CapM6>
    </SceneM6>
  );
}

function S_Sequence({ start, dur }) {
  const t = useTime(); const s = start;
  const steps = [
    { n: 0, k: 'Verificar precondiciones', a: TL6.dim },
    { n: 1, k: 'Arrancar bomba P-101', a: TL6.cyan },
    { n: 2, k: 'Esperar nivel ≥ 1.5 m en R-301', a: TL6.cyan },
    { n: 3, k: 'Arrancar agitador AG-301', a: TL6.grn },
    { n: 4, k: 'Habilitar PID de temperatura', a: TL6.amber },
    { n: 5, k: 'Planta en producción · todos en AUTO', a: TL6.grn },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Secuencia de arranque · SFC" y="9%" />
      <CapM6 start={s + 0.6} dur={2.0} size={46} weight={600} y="16%" width={1500}>Paso a paso, con confirmación en cada transición.</CapM6>
      <div style={{ position: 'absolute', left: '50%', top: '57%', transform: 'translate(-50%,-50%)', width: 980, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {steps.map((st, i) => {
          const ap = clamp((t - (s + 1.3 + i * 0.4)) / 0.5, 0, 1);
          return (
            <div key={i} style={{ opacity: ap, transform: `translateX(${(1 - ap) * -14}px)`, display: 'flex', alignItems: 'center', gap: 18, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, border: `1px solid ${TL6.lineS}`, borderLeft: `4px solid ${st.a}`, borderRadius: 10, padding: '13px 22px' }}>
              <span style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 8, background: TL6.bg2, border: `1px solid ${st.a}`, color: st.a, fontFamily: MONO6, fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{st.n}</span>
              <span style={{ fontFamily: DISP6, fontSize: 20, color: TL6.ink }}>{st.k}</span>
            </div>
          );
        })}
      </div>
      <CapM6 start={s + 4.6} dur={dur - 4.9} size={23} weight={500} color={TL6.mut} y="91%" width={1500}>El paro normal invierte la secuencia: deshabilitar PIDs → cerrar válvulas → parar agitador → parar bomba a los 60 s.</CapM6>
    </SceneM6>
  );
}

function S_Deliver({ start, dur }) {
  const t = useTime(); const s = start;
  const d = [
    { k: 'Proyecto TIA completo', d: 'toda la lógica implementada y compilada', a: TL6.cyan },
    { k: 'Código documentado', d: 'comentarios de cabecera en cada bloque', a: TL6.grn },
    { k: 'Tabla con 45+ tags', d: 'todas las señales nombradas', a: TL6.amber },
    { k: 'Informe técnico (2 pág.)', d: 'arquitectura, secuencia y lazos', a: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Entregable final del módulo" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="21%" width={1500}>De estudiante a programador de PLC.</CapM6>
      {d.map((x, i) => (
        <InfoCardM6 key={i} x={210 + (i % 2) * 760} y={400 + Math.floor(i / 2) * 175} w={700} h={150} no={i + 1} accent={x.a} title={x.k} sub={x.d} appear={s + 1.4 + i * 0.4} t={t} />
      ))}
    </SceneM6>
  );
}

const SCENES_M6C15 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={15} seccion="Proyecto integrador 2" title="Proyecto 2: planta integrada" dudur="35–40 min" objetivo="Programar la planta completa: secuencias de arranque/paro, múltiples lazos PID, alarmas y estructura profesional de código." />, dur: 7, label: 'Apertura' },
  { C: S_Plant, dur: 14, label: 'La planta completa' },
  { C: S_Structure, dur: 13, label: 'Estructura del programa' },
  { C: S_Sequence, dur: 15, label: 'Secuencia de arranque' },
  { C: S_Deliver, dur: 12, label: 'Entregable final' },
  { C: (p) => <ClosingM6 {...p} line="Sensores, actuadores, señales, control y lógica — todo converge en este PLC. Ya programas plantas, no solo ejercicios." activity="Entrega el proyecto TIA completo: lógica, documentación, tabla de 45+ tags, captura del simulador online y el informe técnico de 2 páginas." />, dur: 9, label: 'Cierre del módulo' },
];
window.SCENES_M6C15 = SCENES_M6C15;
