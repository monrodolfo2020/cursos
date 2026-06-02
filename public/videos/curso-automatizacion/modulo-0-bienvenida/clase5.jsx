// clase5.jsx — "Herramientas que usarás en el curso (todas gratuitas)"
// After clase-lib.jsx. Exports SCENES_C5.

function ToolBlock({ no, cat, tools, note, x, y, appear, t, accent }) {
  const { op, sc, ty } = pop(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 500, height: 250, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 8, border: `1px solid ${T.lineS}`, background: 'linear-gradient(180deg, rgba(20,34,54,0.6), rgba(12,20,32,0.45))', padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: MONO, fontSize: 13, letterSpacing: '0.22em', color: accent }}>BLOQUE {no}</span>
        <span style={{ flex: 1, height: 1, background: T.line }} />
      </div>
      <div style={{ fontFamily: DISP, fontSize: 27, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{cat}</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {tools.map((tl, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: DISP, fontSize: 19, fontWeight: 500, color: T.ink, padding: '8px 14px 8px 10px', borderRadius: 4, border: `1px solid ${accent}`, background: 'rgba(10,16,26,0.5)' }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 13, fontWeight: 600, color: accent }}>{tl[0]}</span>
            {tl}
          </span>
        ))}
      </div>
      <div style={{ marginTop: 'auto', fontFamily: MONO, fontSize: 13, color: T.mut, letterSpacing: '0.04em' }}>{note}</div>
    </div>
  );
}
function S5_Bloques({ start, dur }) {
  const t = useTime(); const s = start;
  const blocks = [
    { no: 1, cat: 'Simulación de circuitos', tools: ['Tinkercad', 'Falstad'], note: 'Online · sin instalación', a: T.cyan },
    { no: 2, cat: 'Diagramas industriales', tools: ['draw.io'], note: 'P&IDs y diagramas de bloques', a: T.cyan },
    { no: 3, cat: 'Programación PLC', tools: ['TIA Portal', 'LOGO! Soft'], note: 'Siemens · descarga gratuita', a: T.amber },
    { no: 4, cat: 'Simulación 3D de planta', tools: ['Factory IO', 'Virtual Factory'], note: 'Planta 3D conectada al PLC', a: T.cyan },
    { no: 5, cat: 'Software SCADA', tools: ['Ignition'], note: 'Modo diseñador sin límite', a: T.cyan },
    { no: 6, cat: 'Simulación de control', tools: ['MATLAB Online', 'Scilab'], note: 'Para los ejercicios de PID', a: T.amber },
  ];
  const cols = [200, 720, 1240];
  const positions = blocks.map((_, i) => ({ x: cols[i % 3], y: 300 + Math.floor(i / 3) * 290 }));
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Seis bloques · todas gratuitas" y="9%" />
      <Cap start={s + 0.8} dur={2.4} size={46} weight={600} y="18%" width={1500}>Herramientas profesionales, sin gastar un peso.</Cap>
      {blocks.map((b, i) => <ToolBlock key={i} {...b} accent={b.a} x={positions[i].x} y={positions[i].y} appear={s + 2.2 + i * 0.38} t={t} />)}
    </Scene>
  );
}

// Checklist de instalación
function S5_Checklist({ start, dur }) {
  const t = useTime(); const s = start;
  const items = ['Tinkercad / Falstad', 'draw.io', 'TIA Portal V17', 'Factory IO', 'Ignition Designer', 'MATLAB Online / Scilab'];
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Tu checklist de instalación" y="12%" />
      <Cap start={s + 0.8} dur={2.2} size={50} weight={600} y="22%" width={1500}>Verifica cada herramienta antes de empezar.</Cap>
      <div style={{ position: 'absolute', left: '50%', top: '56%', transform: 'translate(-50%,-50%)', width: 900, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((it, i) => {
          const appear = s + 2.2 + i * 0.5;
          const { op, ty } = pop(t, appear, 0.45, 14);
          const checked = t > appear + 0.4;
          const ce = clamp((t - (appear + 0.4)) / 0.3, 0, 1);
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${ty}px)`, display: 'flex', alignItems: 'center', gap: 20, padding: '16px 24px', borderRadius: 6, border: `1px solid ${checked ? T.cyan : T.line}`, background: checked ? 'rgba(20,40,60,0.5)' : 'rgba(12,20,32,0.4)' }}>
              <div style={{ width: 34, height: 34, borderRadius: 6, border: `2px solid ${checked ? T.cyan : T.dim}`, background: checked ? T.cyan : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {checked && <svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 12 L10 18 L20 6" fill="none" stroke="#06121e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset={(1 - ce) * 30} /></svg>}
              </div>
              <span style={{ fontFamily: DISP, fontSize: 28, fontWeight: 500, color: checked ? T.ink : T.mut }}>{it}</span>
              <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 13, letterSpacing: '0.12em', color: checked ? T.cyan : T.dim }}>{checked ? 'LISTO' : '—'}</span>
            </div>
          );
        })}
      </div>
    </Scene>
  );
}

const SCENES_C5 = [
  { C: (p) => <TitleCard {...p} claseNo={5} title="Herramientas que usarás en el curso" dudur="18–22 min" objetivo="Instalar y verificar todo el software del curso — sin gastar un solo peso." />, dur: 7, label: 'Apertura' },
  { C: S5_Bloques, dur: 14, label: 'Seis bloques' },
  { C: S5_Checklist, dur: 13, label: 'Checklist' },
  { C: (p) => <Closing {...p} line="Simularás, diseñarás, programarás y supervisarás — desde tu propia computadora." activityLabel="Obligatoria" activity="Envía una captura de cada software abierto en tu equipo como evidencia de instalación correcta." />, dur: 9, label: 'Cierre' },
];
window.SCENES_C5 = SCENES_C5;
