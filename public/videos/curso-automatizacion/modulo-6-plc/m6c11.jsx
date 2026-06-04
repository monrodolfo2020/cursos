// m6c11.jsx — "Programación estructurada: subrutinas y organización del código"
// After m6-lib.jsx. Exports SCENES_M6C11.

function S_Principles({ start, dur }) {
  const t = useTime(); const s = start;
  const pr = [
    { k: 'Modularidad', d: 'Dividir en bloques con responsabilidades claras.', a: TL6.cyan },
    { k: 'Reusabilidad', d: 'FBs y FCs paramétricos instanciados muchas veces.', a: TL6.grn },
    { k: 'Legibilidad', d: 'Nombres descriptivos, estructura lógica, comentarios.', a: TL6.amber },
    { k: 'Documentación', d: 'Cada bloque con propósito, parámetros y versión.', a: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Un proyecto puede tener 50 000 líneas" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="21%" width={1560}>A las 3 a.m., con una falla en planta, <span style={{ color: TL6.cyan }}>la organización salva</span>.</CapM6>
      {pr.map((p, i) => (
        <InfoCardM6 key={i} x={210 + i * 388} y={420} w={350} h={280} no={i + 1} accent={p.a} title={p.k} sub={p.d} appear={s + 1.4 + i * 0.4} t={t} />
      ))}
    </SceneM6>
  );
}

function S_Tree({ start, dur }) {
  const t = useTime(); const s = start;
  const tree = [
    { d: 0, k: 'OB1 · Main (Ladder)', sub: 'modos, llamadas a equipos y PID', a: TL6.cyan },
    { d: 0, k: 'OB30 · Cyclic 100 ms', sub: 'los lazos PID_Compact', a: TL6.grn },
    { d: 0, k: 'OB100 · Startup', sub: 'inicialización', a: TL6.cyanLt },
    { d: 1, k: 'FCs · sin memoria', sub: 'Leer_AI · Seguridad · Alarmas · HMI', a: TL6.amber },
    { d: 1, k: 'FBs · con memoria', sub: 'AI_Scaling · Motor_Control · Valve_Control', a: TL6.grn },
    { d: 1, k: 'DBs · datos', sub: 'Global · HMI · Alarmas · Recetas', a: TL6.cyan },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Estructura recomendada del proyecto" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="21%" width={1500}>Cada cosa en su bloque.</CapM6>
      <div style={{ position: 'absolute', left: '50%', top: '58%', transform: 'translate(-50%,-50%)', width: 1100, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {tree.map((n, i) => {
          const ap = clamp((t - (s + 1.5 + i * 0.35)) / 0.5, 0, 1);
          return (
            <div key={i} style={{ opacity: ap, transform: `translateX(${(1 - ap) * -16 + n.d * 70}px)`, display: 'flex', alignItems: 'center', gap: 18, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, border: `1px solid ${TL6.lineS}`, borderLeft: `4px solid ${n.a}`, borderRadius: 10, padding: '16px 24px', width: n.d ? 900 : 1000 }}>
              <span style={{ fontFamily: MONO6, fontSize: 20, fontWeight: 700, color: n.a, minWidth: 280 }}>{n.k}</span>
              <span style={{ fontFamily: DISP6, fontSize: 18, color: TL6.mut }}>{n.sub}</span>
            </div>
          );
        })}
      </div>
    </SceneM6>
  );
}

function S_StateMachine({ start, dur }) {
  const t = useTime(); const s = start;
  const cy = 540;
  const states = [
    { x: 230, y: cy, k: 'STOPPED', n: 0, a: TL6.dim },
    { x: 620, y: cy, k: 'STARTING', n: 1, a: TL6.amber },
    { x: 1010, y: cy, k: 'RUNNING', n: 2, a: TL6.grn },
    { x: 1400, y: cy, k: 'STOPPING', n: 3, a: TL6.cyan },
    { x: 815, y: cy + 230, k: 'FAULT', n: 4, a: TL6.red },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="FB Motor_Control · máquina de estados" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={46} weight={600} y="20%" width={1560}>Un motor entero encapsulado en <span style={{ color: TL6.grn }}>5 estados</span>.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <ArrowM6 x1={390} y1={cy} x2={460} y2={cy} start={s + 2.0} t={t} color={TL6.mut} label="Start" />
        <ArrowM6 x1={780} y1={cy} x2={850} y2={cy} start={s + 2.4} t={t} color={TL6.mut} label="conf." />
        <ArrowM6 x1={1170} y1={cy} x2={1240} y2={cy} start={s + 2.8} t={t} color={TL6.mut} label="Stop" />
        <path d={`M1400 ${cy + 20} Q900 ${cy + 120} 340 ${cy + 20}`} fill="none" stroke={TL6.lineS} strokeWidth="2.4" strokeDasharray="8 7" opacity={clamp((t - (s + 3.2)) / 0.6, 0, 1)} />
        <ArrowM6 x1={760} y1={cy + 70} x2={815} y2={cy + 180} start={s + 3.4} t={t} color={TL6.red} label="fallo" />
        {states.map((st, i) => {
          const ap = pop6(t, s + 1.4 + i * 0.3, 0.5, 12);
          return (
            <g key={i} opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
              <rect x={st.x - 90} y={st.y - 38} width="180" height="76" rx="12" fill={TL6.paper} stroke={st.a} strokeWidth="2.6" />
              <circle cx={st.x - 66} cy={st.y - 16} r="5" fill={st.a} />
              <text x={st.x} y={st.y - 4} fill={TL6.ink} fontFamily={DISP6} fontSize="22" fontWeight="700" textAnchor="middle">{st.k}</text>
              <text x={st.x} y={st.y + 20} fill={st.a} fontFamily={MONO6} fontSize="14" textAnchor="middle">State = {st.n}</text>
            </g>
          );
        })}
      </svg>
      <CapM6 start={s + 4.6} dur={dur - 4.9} size={24} weight={500} color={TL6.mut} y="92%" width={1560}>Permisivos, confirmación de marcha con timer y reset de fallo — toda la lógica del motor en un CASE.</CapM6>
    </SceneM6>
  );
}

function S_Naming({ start, dur }) {
  const t = useTime(); const s = start;
  const pfx = [
    ['PV_', 'medición (Process Variable)'], ['SP_', 'setpoint'], ['CV_', 'salida de control'],
    ['DO_ / DI_', 'salida / entrada digital'], ['Alarm_ / Fault_', 'alarma / fallo'], ['Cmd_ / Sts_', 'comando / status'],
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Documentar y nombrar como profesional" y="12%" />
      <CapM6 start={s + 0.6} dur={2.2} size={46} weight={600} y="23%" width={1560}>El nombre <span style={{ color: TL6.red }}>Temp</span> no dice nada; <span style={{ color: TL6.grn }}>PV_Temperatura_Reactor</span> lo dice todo.</CapM6>
      <div style={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%,-50%)', width: 1180, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {pfx.map((p, i) => {
          const ap = clamp((t - (s + 1.5 + i * 0.3)) / 0.5, 0, 1);
          return (
            <div key={i} style={{ opacity: ap, display: 'flex', alignItems: 'center', gap: 18, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, border: `1px solid ${TL6.lineS}`, borderRadius: 10, padding: '16px 24px' }}>
              <span style={{ fontFamily: MONO6, fontSize: 22, fontWeight: 700, color: TL6.cyan, minWidth: 150 }}>{p[0]}</span>
              <span style={{ fontFamily: DISP6, fontSize: 19, color: TL6.mut }}>{p[1]}</span>
            </div>
          );
        })}
      </div>
    </SceneM6>
  );
}

const SCENES_M6C11 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={11} seccion="Programación del PLC" title="Programación estructurada" dudur="18–20 min" objetivo="Organizar un proyecto real de PLC en módulos lógicos y aplicar las mejores prácticas de documentación industrial." />, dur: 7, label: 'Apertura' },
  { C: S_Principles, dur: 12, label: 'Los 4 principios' },
  { C: S_Tree, dur: 13, label: 'Estructura del proyecto' },
  { C: S_StateMachine, dur: 15, label: 'Máquina de estados' },
  { C: S_Naming, dur: 12, label: 'Nombres y documentación' },
  { C: (p) => <ClosingM6 {...p} line="El código que otro pueda entender a las 3 a.m. vale más que el código ingenioso. Modular, nombrado y documentado." activity="Crea la estructura completa (OB, FC, FB, DB), implementa el FB Motor_Control e instánicialo para la bomba y el agitador, y documenta cada bloque." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C11 = SCENES_M6C11;
