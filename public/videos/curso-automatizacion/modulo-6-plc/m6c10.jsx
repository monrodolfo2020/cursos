// m6c10.jsx — "Bloques de función analógica: escalado reutilizable 4-20 mA"
// After m6-lib.jsx. Exports SCENES_M6C10.

function S_Why({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="El problema del código repetido" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="22%" width={1560}>20 instrumentos, ¿20 copias del mismo escalado?</CapM6>
      <InfoCardM6 x={210} y={400} w={680} h={300} no={1} accent={TL6.red} title="Código espagueti" sub="200 líneas casi iguales en OB1. Cambiar algo (p. ej. agregar detección de fallo) obliga a editar en 20 lugares → errores garantizados." appear={s + 1.4} t={t} />
      <InfoCardM6 x={1030} y={400} w={680} h={300} no={2} accent={TL6.grn} title="Function Block reutilizable" sub="Creas el FB una vez y lo instancias 20 veces con parámetros distintos. Cambias el FB → el cambio llega a las 20 instancias." appear={s + 1.9} t={t} />
    </SceneM6>
  );
}

function S_Interface({ start, dur }) {
  const t = useTime(); const s = start;
  const cols = [
    { k: 'VAR_INPUT', a: TL6.grn, items: ['Raw_Value : INT', 'EU_Min : REAL', 'EU_Max : REAL', 'Enable : BOOL'] },
    { k: 'VAR_OUTPUT', a: TL6.cyan, items: ['EU_Value : REAL', 'Fault_Low : BOOL', 'Fault_High : BOOL', 'Valid : BOOL'] },
    { k: 'VAR (static)', a: TL6.amber, items: ['Normalized : REAL', 'Filtered : REAL', '— memoria interna —', 'persiste entre scans'] },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="La interfaz del FB AI_Scaling" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="21%" width={1500}>Entradas, salidas y memoria propia.</CapM6>
      {cols.map((c, i) => (
        <div key={i} style={{ position: 'absolute', left: 230 + i * 500, top: 400, width: 450 }}>
          {(() => { const ap = pop6(t, s + 1.4 + i * 0.45, 0.5, 20); return (
            <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', borderRadius: 12, border: `1px solid ${TL6.lineS}`, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, boxShadow: TL6.shadow, padding: '24px 26px', height: 320, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: c.a, borderRadius: 3 }} />
              <div style={{ fontFamily: MONO6, fontSize: 21, fontWeight: 700, color: c.a, letterSpacing: '0.04em' }}>{c.k}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
                {c.items.map((it, k) => <div key={k} style={{ fontFamily: MONO6, fontSize: 17, color: it.startsWith('—') || it.startsWith('persiste') ? TL6.dim : TL6.ink }}>{it}</div>)}
              </div>
            </div>
          ); })()}
        </div>
      ))}
    </SceneM6>
  );
}

function S_Code({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: 'IF Enable THEN', c: TL6.cyan },
    { txt: '  IF Raw_Value < 0 THEN     // cable', c: TL6.dim },
    { txt: '    Fault_Low := TRUE; Valid := FALSE;', c: TL6.red },
    { txt: '    EU_Value := EU_Min; RETURN;', c: TL6.ink },
    { txt: '  END_IF;', c: TL6.ink },
    { txt: '  Valid := TRUE;', c: TL6.grn },
    { txt: '  Normalized := INT_TO_REAL(Raw_Value)', c: TL6.ink },
    { txt: '              / 27648.0;', c: TL6.ink },
    { txt: '  EU_Value := Normalized*(EU_Max-EU_Min)', c: TL6.ink },
    { txt: '            + EU_Min;', c: TL6.ink },
    { txt: '  Filtered := 0.2*EU_Value + 0.8*Filtered;', c: TL6.amber },
    { txt: '  EU_Value := Filtered;', c: TL6.amber },
    { txt: 'END_IF;', c: TL6.cyan },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="El código del FB · una sola vez" y="8%" />
      <CapM6 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1500}>Diagnóstico, normalizado, escalado y filtro — encapsulados.</CapM6>
      <CodeM6 x={120} y={290} w={980} title="FB AI_Scaling · ST" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.6, 0, 1)} />
      <InfoCardM6 x={1160} y={350} w={620} h={170} accent={TL6.red} title="Falla segura" sub="Ante cable cortado entrega EU_Min y marca Valid = FALSE — el resto del programa lo sabe." appear={s + 2.8} t={t} />
      <InfoCardM6 x={1160} y={550} w={620} h={170} accent={TL6.amber} title="Filtro integrado" sub="El α = 0.2 vive dentro del bloque; toda instancia hereda el mismo suavizado." appear={s + 3.3} t={t} />
    </SceneM6>
  );
}

function S_Instance({ start, dur }) {
  const t = useTime(); const s = start;
  const insts = [
    { k: 'LT101', r: 'IW96', eu: '0–4 m', a: TL6.grn },
    { k: 'FT101', r: 'IW98', eu: '0–150 m³/h', a: TL6.cyan },
    { k: 'TT301', r: 'IW100', eu: '0–80 °C', a: TL6.amber },
    { k: 'PT401', r: 'IW102', eu: '0–8 bar', a: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Una sola plantilla, cuatro instrumentos" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="20%" width={1500}>El mismo FB, cuatro instancias.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <BlockM6 x={810} y={400} w={300} h={110} label="FB AI_Scaling" sub="plantilla única" accent={TL6.cyanLt} t={t} appear={s + 1.2} />
        {insts.map((it, i) => {
          const bx = 240 + i * 388;
          return (
            <g key={i}>
              <ArrowM6 x1={960} y1={510} x2={bx + 150} y2={640} start={s + 1.8 + i * 0.3} t={t} color={it.a} />
              <BlockM6 x={bx} y={640} w={300} h={110} label={it.k} sub={`${it.r} · ${it.eu}`} accent={it.a} t={t} appear={s + 2.0 + i * 0.3} led />
            </g>
          );
        })}
      </svg>
      <CapM6 start={s + 4.4} dur={dur - 4.7} size={25} weight={500} color={TL6.mut} y="86%" width={1560}>Cada instancia guarda su propio estado (filtro, fallo) en su instance-DB. Modular, legible, mantenible.</CapM6>
    </SceneM6>
  );
}

const SCENES_M6C10 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={10} seccion="Programación del PLC" title="Bloques de función analógica" dudur="18–20 min" objetivo="Crear Function Blocks reutilizables para escalar y diagnosticar señales analógicas — programación modular profesional." />, dur: 7, label: 'Apertura' },
  { C: S_Why, dur: 12, label: '¿Por qué modular?' },
  { C: S_Interface, dur: 13, label: 'La interfaz del FB' },
  { C: S_Code, dur: 15, label: 'El código del FB' },
  { C: S_Instance, dur: 13, label: 'Instanciar el FB' },
  { C: (p) => <ClosingM6 {...p} line="Un buen FB se escribe una vez y se reutiliza siempre. La memoria propia de cada instancia es lo que lo hace posible." activity="Construye la librería del proyecto: FB AI_Scaling con filtro, FB AO_Output con limitación y FB Alarm_Monitor; intégralos en OB1 y expórtalos como librería." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C10 = SCENES_M6C10;
