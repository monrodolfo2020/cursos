// m6c12.jsx — "Introducción a TIA Portal: instalación y primer proyecto"
// After m6-lib.jsx. Exports SCENES_M6C12.

function S_Reqs({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="TIA Portal V17 · requisitos" y="13%" />
      <CapM6 start={s + 0.6} dur={2.2} size={50} weight={700} y="26%" width={1500}>Tu PC sí puede con él (casi).</CapM6>
      <StatM6 x={230} y={520} value="i5" unit="8ª gen+" label="Procesador" accent={TL6.cyan} appear={s + 1.4} t={t} align="center" />
      <StatM6 x={620} y={520} value="16" unit="GB" label="RAM recomendada" accent={TL6.grn} appear={s + 1.7} t={t} align="center" />
      <StatM6 x={1010} y={520} value="40" unit="GB" label="Libres en SSD" accent={TL6.amber} appear={s + 2.0} t={t} align="center" />
      <StatM6 x={1380} y={520} value="Win" unit="10/11" label="Solo 64-bit" accent={TL6.cyanLt} appear={s + 2.3} t={t} align="center" />
      <CapM6 start={s + 3.4} dur={dur - 3.7} size={25} weight={500} color={TL6.mut} y="82%" width={1500}>Paquete mínimo: STEP 7 Basic V17 + <b style={{ color: TL6.grn }}>S7-PLCSIM V17</b>. Sin Linux ni macOS.</CapM6>
    </SceneM6>
  );
}

function S_Views({ start, dur }) {
  const t = useTime(); const s = start;
  const ap = pop6(t, s + 1.2, 0.6, 16);
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="La interfaz · Project View" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="19%" width={1560}>Cuatro zonas: árbol, trabajo, inspector y tarjetas.</CapM6>
      <div style={{ position: 'absolute', left: '50%', top: '57%', transform: `translate(-50%,-50%) scale(${ap.sc})`, opacity: ap.op, width: 1280, height: 460, borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL6.lineS}`, boxShadow: TL6.shadow, background: TL6.bg, display: 'grid', gridTemplateColumns: '300px 1fr 230px', gridTemplateRows: '1fr 130px' }}>
        <div style={{ background: TL6.paper2, borderRight: `1px solid ${TL6.lineS}`, padding: 20, gridRow: '1 / 3' }}>
          <div style={{ fontFamily: MONO6, fontSize: 13, color: TL6.cyan, letterSpacing: '0.14em', marginBottom: 14 }}>PROJECT TREE</div>
          {['PLC_Planta_Agua', '  Device config', '  Program blocks', '    OB1 · Main', '  PLC tags'].map((it, i) => <div key={i} style={{ fontFamily: MONO6, fontSize: 15, color: i === 3 ? TL6.grn : TL6.mut, padding: '5px 0' }}>{it}</div>)}
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ fontFamily: MONO6, fontSize: 13, color: TL6.amber, letterSpacing: '0.14em', marginBottom: 14 }}>ÁREA DE TRABAJO</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ height: 40, borderRadius: 6, border: `1px dashed ${TL6.lineS}`, display: 'flex', alignItems: 'center', padding: '0 14px', fontFamily: MONO6, fontSize: 14, color: TL6.dim }}>──[ I0.0 ]──[/ I0.1 ]──────( Q0.0 )──</div>
            <div style={{ height: 40, borderRadius: 6, border: `1px dashed ${TL6.lineS}` }} />
          </div>
        </div>
        <div style={{ background: TL6.paper, borderLeft: `1px solid ${TL6.lineS}`, padding: 20, gridRow: '1 / 3' }}>
          <div style={{ fontFamily: MONO6, fontSize: 13, color: TL6.cyanLt, letterSpacing: '0.14em' }}>TASK CARDS</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>{['Instrucciones', 'Librerías', 'Herramientas'].map((it, i) => <div key={i} style={{ fontFamily: DISP6, fontSize: 14, color: TL6.mut }}>{it}</div>)}</div>
        </div>
        <div style={{ background: TL6.paper2, borderTop: `1px solid ${TL6.lineS}`, padding: 20 }}>
          <div style={{ fontFamily: MONO6, fontSize: 13, color: TL6.grn, letterSpacing: '0.14em' }}>INSPECTOR · propiedades · diagnóstico</div>
        </div>
      </div>
    </SceneM6>
  );
}

function S_Steps({ start, dur }) {
  const t = useTime(); const s = start;
  const steps = [
    'Crear proyecto "Planta_Tratamiento_Agua"',
    'Add device → CPU 1214C DC/DC/DC',
    'Agregar módulos SM en sus slots',
    'Configurar AI: tipo Current 4–20 mA',
    'Verificar direcciones (I, Q, IW, QW)',
    'Crear la tabla de PLC tags',
    'Primer Ladder en OB1 + compilar',
    'Simular con PLCSIM → online',
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Primer proyecto · paso a paso" y="9%" />
      <CapM6 start={s + 0.6} dur={2.0} size={46} weight={700} y="17%" width={1500}>Ocho pasos del proyecto en blanco a PLC corriendo.</CapM6>
      <div style={{ position: 'absolute', left: '50%', top: '58%', transform: 'translate(-50%,-50%)', width: 1180, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {steps.map((st, i) => {
          const ap = clamp((t - (s + 1.4 + i * 0.34)) / 0.5, 0, 1);
          return (
            <div key={i} style={{ opacity: ap, transform: `translateX(${(1 - ap) * -14}px)`, display: 'flex', alignItems: 'center', gap: 18, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, border: `1px solid ${TL6.lineS}`, borderRadius: 10, padding: '15px 22px' }}>
              <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: TL6.cyanWash, border: `1px solid ${TL6.cyan}`, color: TL6.cyan, fontFamily: MONO6, fontSize: 17, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              <span style={{ fontFamily: DISP6, fontSize: 19, color: TL6.ink }}>{st}</span>
            </div>
          );
        })}
      </div>
    </SceneM6>
  );
}

function S_Sim({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="PLCSIM · el PLC virtual" y="12%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="23%" width={1560}>Sin hardware: el simulador <span style={{ color: TL6.grn }}>RUN</span> y el monitoreo online en vivo.</CapM6>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <LedM6 cx={520} cy={530} r="13" color={TL6.grn} on t={t} label="RUN" sub="PLCSIM en ejecución" />
        <LedM6 cx={520} cy={610} r="13" color={TL6.cyan} on blink t={t} label="ONLINE" sub="TIA monitoreando" />
      </svg>
      <InfoCardM6 x={820} y={460} w={900} h={210} accent={TL6.cyan} title="Monitor your program" sub="Cada contacto y bobina se pinta en verde cuando está activo. Ves la lógica viva, rung por rung, sin tocar un cable." appear={s + 2.0} t={t} />
    </SceneM6>
  );
}

const SCENES_M6C12 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={12} seccion="Práctica con software" title="Introducción a TIA Portal" dudur="20–22 min" objetivo="Instalar TIA Portal V17, crear el primer proyecto del curso con su hardware y compilar y descargar al simulador PLCSIM." />, dur: 7, label: 'Apertura' },
  { C: S_Reqs, dur: 11, label: 'Requisitos del sistema' },
  { C: S_Views, dur: 13, label: 'La interfaz' },
  { C: S_Steps, dur: 14, label: 'Primer proyecto' },
  { C: S_Sim, dur: 12, label: 'Simular con PLCSIM' },
  { C: (p) => <ClosingM6 {...p} line="El primer proyecto no controla nada todavía — pero te da el ciclo completo: configurar, programar, compilar y ver el PLC correr en simulación." activity="Completa la configuración de hardware y la tabla de variables del proyecto para todas las señales de E/S de la planta de tratamiento de agua." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C12 = SCENES_M6C12;
