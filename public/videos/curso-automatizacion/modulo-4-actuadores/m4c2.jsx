// m4c2.jsx — "Actuadores y posicionadores de válvulas"
// After m4-lib.jsx. Exports SCENES_M4C2.

// Pneumatic diaphragm actuator. `air` 0..1 = supply pressure; `direct` true = ATO.
function DiaphragmActuator({ cx, cy, air = 0.6, direct = true, t = 0, appear = 0, accent = TL4.blue }) {
  const e = Easing.easeOutCubic(clamp((t - appear) / 0.7, 0, 1));
  // stem travel: ATO -> more air pushes stem down (opens). diaphragm deflection
  const defl = air * 34;
  const diaY = cy - 60 + (direct ? defl : -defl) * 0.0; // diaphragm stays; stem moves
  const stemTop = cy - 56 + (direct ? defl : (34 - defl));
  const open = direct ? air : 1 - air;
  return (
    <g opacity={e}>
      {/* casing top (air chamber) */}
      <path d={`M${cx - 110} ${cy - 60} Q${cx} ${cy - 150} ${cx + 110} ${cy - 60} Z`} fill={TL4.blueWash} stroke={TL4.ink} strokeWidth="3" />
      {/* air fill level shading */}
      <path d={`M${cx - 96} ${cy - 60} Q${cx} ${cy - 60 - air * 80} ${cx + 96} ${cy - 60} Z`} fill="rgba(47,134,230,0.28)" />
      {/* diaphragm */}
      <line x1={cx - 108} y1={cy - 60} x2={cx + 108} y2={cy - 60} stroke={TL4.ink} strokeWidth="3.5" />
      {/* lower casing */}
      <path d={`M${cx - 110} ${cy - 60} L${cx - 110} ${cy - 40} Q${cx} ${cy + 28} ${cx + 110} ${cy - 40} L${cx + 110} ${cy - 60}`} fill={TL4.paper} stroke={TL4.ink} strokeWidth="3" />
      {/* spring */}
      {(() => { const segs = 6, top = cy - 56, h = 44; let d = `M${cx} ${top}`; for (let i = 0; i <= segs; i++){ const yy = top + (h/segs)*i; d += ` L${cx + (i%2?14:-14)} ${yy}`;} return <path d={d} fill="none" stroke={TL4.orange} strokeWidth="3" strokeLinejoin="round" opacity="0.9" />; })()}
      {/* stem */}
      <line x1={cx} y1={stemTop} x2={cx} y2={cy + 70} stroke={TL4.ink} strokeWidth="6" />
      {/* yoke + valve body */}
      <path d={`M${cx - 70} ${cy + 70} L${cx + 70} ${cy + 70}`} stroke={TL4.ink} strokeWidth="4" strokeLinecap="round" />
      <path d={`M${cx - 64} ${cy + 78} L${cx + 64} ${cy + 78} L${cx + 44} ${cy + 150} L${cx - 44} ${cy + 150} Z`} fill={TL4.paper} stroke={TL4.ink} strokeWidth="3" />
      {/* plug */}
      <path d={`M${cx - 18} ${cy + 124} L${cx + 18} ${cy + 124} L${cx + 10} ${cy + 124 - (6 + open*26)} L${cx - 10} ${cy + 124 - (6 + open*26)} Z`} fill={accent} stroke={TL4.ink} strokeWidth="2" />
      {/* pipe */}
      <path d={`M${cx - 230} ${cy + 137} L${cx + 230} ${cy + 137}`} stroke="rgba(47,134,230,0.16)" strokeWidth="26" strokeLinecap="round" />
      {open > 0.02 && <path d={`M${cx + 60} ${cy + 137} L${cx + 220} ${cy + 137}`} stroke={accent} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" strokeDashoffset={-(t*36)%20} opacity={open} />}
      {/* air supply arrow */}
      <line x1={cx + 150} y1={cy - 120} x2={cx + 60} y2={cy - 100} stroke={TL4.blueD} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="9 7" strokeDashoffset={-(t*30)%16} />
      <text x={cx + 158} y={cy - 124} fill={TL4.blueD} fontFamily="IBM Plex Mono, monospace" fontSize="16" fontWeight="600">aire</text>
    </g>
  );
}

function S_ATO({ start, dur }) {
  const t = useTime(); const s = start;
  const air = 0.2 + 0.55 * (0.5 + 0.5 * Math.sin((t - s) * 0.85));
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Aire contra resorte" y="9%" />
      <CapM4 start={s + 0.6} dur={2.4} size={46} weight={600} y="17%" width={1500}>El aire empuja; el <span style={{color:TL4.orangeD}}>resorte</span> define la posición de falla.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <DiaphragmActuator cx={620} cy={540} air={air} direct={true} t={t} appear={s + 1.0} />
        <DiaphragmActuator cx={1300} cy={540} air={air} direct={false} t={t} appear={s + 1.4} accent={TL4.orange} />
        <g opacity={clamp((t-(s+1.6))/0.6,0,1)}>
          <text x={620} y={830} fill={TL4.blueD} fontFamily="Space Grotesk, sans-serif" fontSize="32" fontWeight="700" textAnchor="middle">Aire para abrir · ATO</text>
          <text x={620} y={868} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="18" textAnchor="middle">sin aire → cierra → FC</text>
          <text x={1300} y={830} fill={TL4.orangeD} fontFamily="Space Grotesk, sans-serif" fontSize="32" fontWeight="700" textAnchor="middle">Aire para cerrar · ATC</text>
          <text x={1300} y={868} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="18" textAnchor="middle">sin aire → abre → FO</text>
        </g>
      </svg>
    </SceneM4>
  );
}

function S_Positioner({ start, dur }) {
  const t = useTime(); const s = start;
  // left: open loop drifts; right: closed loop locks on
  const cmd = 0.6;
  const driftPos = cmd - 0.18 * (0.5 + 0.5 * Math.sin((t - s) * 1.6)); // wobbles below
  const lockPos = cmd + (0.6 - cmd) * Easing.easeOutCubic(clamp((t - s - 1.4) / 1.0, 0, 1));
  const lock = cmd - 0.001 + 0.0; // basically cmd
  const closed = cmd + 0.0;
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="¿Por qué un posicionador?" y="9%" />
      <CapM4 start={s + 0.6} dur={2.3} size={46} weight={600} y="17%" width={1560}>Cierra el lazo de posición: la válvula llega <span style={{color:TL4.orangeD}}>exactamente</span> donde se ordena.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* two gauges showing commanded vs actual */}
        {[{x:600,label:'Solo I/P (sin lazo)',pos:driftPos,acc:TL4.dim,ok:false},
          {x:1320,label:'Con posicionador',pos:closed,acc:TL4.blue,ok:true}].map((g,i)=>{
          const ap = clamp((t-(s+1.0+i*0.4))/0.6,0,1);
          const barTop=360, barH=320;
          return (
            <g key={i} opacity={ap}>
              <rect x={g.x-70} y={barTop} width="140" height={barH} rx="10" fill={TL4.paper} stroke={TL4.lineS} strokeWidth="2" />
              {/* commanded line */}
              <line x1={g.x-100} y1={barTop + barH*(1-cmd)} x2={g.x+100} y2={barTop + barH*(1-cmd)} stroke={TL4.orange} strokeWidth="3" strokeDasharray="8 6" />
              <text x={g.x+108} y={barTop + barH*(1-cmd)+5} fill={TL4.orangeD} fontFamily="IBM Plex Mono, monospace" fontSize="15">orden 60%</text>
              {/* actual fill */}
              <rect x={g.x-66} y={barTop + barH*(1-g.pos)} width="132" height={barH*g.pos} rx="8" fill={g.ok?'rgba(47,134,230,0.30)':'rgba(155,176,198,0.30)'} />
              <line x1={g.x-70} y1={barTop + barH*(1-g.pos)} x2={g.x+70} y2={barTop + barH*(1-g.pos)} stroke={g.acc} strokeWidth="4" />
              <text x={g.x} y={barTop + barH + 44} fill={TL4.ink} fontFamily="Space Grotesk, sans-serif" fontSize="24" fontWeight="600" textAnchor="middle">{g.label}</text>
              <text x={g.x} y={barTop + barH + 78} fill={g.ok?TL4.blueD:TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="17" textAnchor="middle">real ≈ {Math.round(g.pos*100)}%</text>
              {g.ok && <text x={g.x} y={barTop-22} fill={TL4.blue} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">↻ realimenta posición</text>}
              {!g.ok && <text x={g.x} y={barTop-22} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">deriva con fricción y ΔP</text>}
            </g>
          );
        })}
      </svg>
    </SceneM4>
  );
}

function S_Chain({ start, dur }) {
  const t = useTime(); const s = start;
  const nodes = [
    { x: 230, label: 'PLC', sub: 'salida 4–20 mA', acc: TL4.blueD },
    { x: 660, label: 'Posicionador', sub: 'HART · lazo local', acc: TL4.orange },
    { x: 1110, label: 'Actuador', sub: 'neumático', acc: TL4.blue },
    { x: 1540, label: 'Válvula', sub: 'caudal al proceso', acc: TL4.blueD },
  ];
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="La cadena completa" y="13%" />
      <CapM4 start={s + 0.6} dur={2.2} size={50} weight={700} y="23%" width={1500}>De la orden del PLC al caudal — y el feedback de vuelta.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {nodes.slice(0,3).map((n,i)=>(
          <g key={i} opacity={clamp((t-(s+2.0+i*0.4))/0.5,0,1)}>
            <SignalM4 d={`M${nodes[i].x+150} 560 L${nodes[i+1].x-150} 560`} start={s+2.0+i*0.4} t={t} color={i===0?TL4.orange:TL4.blue} width={4} />
          </g>
        ))}
        {/* feedback path */}
        <g opacity={clamp((t-(s+3.6))/0.6,0,1)}>
          <path d={`M${nodes[1].x} 640 L${nodes[1].x} 740 L${nodes[0].x} 740 L${nodes[0].x} 640`} fill="none" stroke={TL4.orangeD} strokeWidth="3" strokeLinecap="round" strokeDasharray="10 8" strokeDashoffset={(t*30)%18} />
          <text x={(nodes[0].x+nodes[1].x)/2} y={770} fill={TL4.orangeD} fontFamily="IBM Plex Mono, monospace" fontSize="17" textAnchor="middle">feedback de posición 4–20 mA</text>
        </g>
      </svg>
      {nodes.map((n,i)=>{
        const ap = pop4(t, s+1.4+i*0.35, 0.5, 18);
        return (
          <div key={i} style={{position:'absolute', left:n.x-150, top:480, width:300, opacity:ap.op, transform:`translateY(${ap.ty}px)`}}>
            <div style={{background:TL4.paper, border:`1px solid ${TL4.lineS}`, borderTop:`4px solid ${n.acc}`, borderRadius:12, boxShadow:TL4.shadowSm, padding:'20px 22px', textAlign:'center'}}>
              <div style={{fontFamily:DISP4, fontSize:30, fontWeight:700, color:TL4.ink}}>{n.label}</div>
              <div style={{fontFamily:MONO4, fontSize:15, color:TL4.mut, marginTop:6, letterSpacing:'0.04em'}}>{n.sub}</div>
            </div>
          </div>
        );
      })}
    </SceneM4>
  );
}

const SCENES_M4C2 = [
  { C: (p) => <TitleCardM4 {...p} claseNo={2} title="Actuadores y posicionadores" dudur="18–20 min" objetivo="Cómo el actuador neumático mueve la válvula y por qué el posicionador cierra el lazo de posición." />, dur: 7, label: 'Apertura' },
  { C: S_ATO, dur: 13, label: 'ATO vs ATC' },
  { C: S_Positioner, dur: 13, label: 'El posicionador' },
  { C: S_Chain, dur: 13, label: 'La cadena' },
  { C: (p) => <ClosingM4 {...p} line="El posicionador convierte una orden en milímetros exactos de carrera, sin importar la fricción." activity="Diseña la actuación completa de una válvula de vapor de 3″: cuerpo, actuador, condición de falla, posicionador y conexión al PLC." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M4C2 = SCENES_M4C2;
