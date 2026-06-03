// m4c4.jsx — "Variadores de Frecuencia (VFD): control total de velocidad"
// After m4-lib.jsx. Exports SCENES_M4C4.

function S_Arch({ start, dur }) {
  const t = useTime(); const s = start;
  const cy = 540;
  const stages = [
    { x: 360, w: 200, title: 'Rectificador', sub: 'AC → DC', detail: 'puente de diodos', acc: TL4.blueD },
    { x: 720, w: 200, title: 'Bus DC', sub: 'capacitor', detail: '≈ 600 VDC', acc: TL4.blue },
    { x: 1080, w: 200, title: 'Inversor PWM', sub: '6 IGBTs', detail: 'f y V variables', acc: TL4.orange },
  ];
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Qué hay dentro del VFD" y="8%" />
      <CapM4 start={s + 0.6} dur={2.2} size={44} weight={600} y="16%" width={1500}>Rectifica, almacena y reconstruye una AC de <span style={{color:TL4.orangeD}}>frecuencia variable</span>.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* grid in */}
        <g opacity={clamp((t-(s+0.9))/0.5,0,1)}>
          <text x={250} y={cy-70} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="17" textAnchor="middle">Red AC</text>
          <text x={250} y={cy-46} fill={TL4.dim} fontFamily="IBM Plex Mono, monospace" fontSize="14" textAnchor="middle">440V · 60Hz</text>
          <PipeM4 d={`M${190} ${cy} L${stages[0].x} ${cy}`} start={s+0.9} t={t} color={TL4.blueD} />
        </g>
        {stages.slice(0,2).map((st,i)=>(
          <g key={i} opacity={clamp((t-(s+1.6+i*0.5))/0.5,0,1)}>
            <SignalM4 d={`M${stages[i].x+stages[i].w} ${cy} L${stages[i+1].x} ${cy}`} start={s+1.6+i*0.5} t={t} color={i===0?TL4.blue:TL4.orange} />
          </g>
        ))}
        {/* out to motor */}
        <g opacity={clamp((t-(s+2.8))/0.5,0,1)}>
          <SignalM4 d={`M${stages[2].x+stages[2].w} ${cy} L${1500} ${cy}`} start={s+2.8} t={t} color={TL4.orange} />
          <circle cx={1580} cy={cy} r="56" fill={TL4.paper} stroke={TL4.ink} strokeWidth="3" />
          <text x={1580} y={cy+8} fill={TL4.ink} fontFamily="IBM Plex Mono, monospace" fontSize="30" fontWeight="700" textAnchor="middle">M</text>
        </g>
      </svg>
      {stages.map((st,i)=>{
        const ap = pop4(t, s+1.2+i*0.5, 0.5, 18);
        return (
          <div key={i} style={{position:'absolute', left:st.x, top:cy-90+'px', width:st.w, transform:`translateY(${ap.ty}px)`, opacity:ap.op}}>
            <div style={{background:TL4.paper, border:`1px solid ${TL4.lineS}`, borderTop:`4px solid ${st.acc}`, borderRadius:12, boxShadow:TL4.shadowSm, padding:'16px 14px', textAlign:'center'}}>
              <div style={{fontFamily:DISP4, fontSize:24, fontWeight:700, color:TL4.ink, lineHeight:1.1}}>{st.title}</div>
              <div style={{fontFamily:MONO4, fontSize:14, color:st.acc, marginTop:6, fontWeight:600}}>{st.sub}</div>
              <div style={{fontFamily:MONO4, fontSize:13, color:TL4.mut, marginTop:2}}>{st.detail}</div>
            </div>
          </div>
        );
      })}
      <div style={{position:'absolute', left:'50%', top:'80%', transform:'translateX(-50%)', opacity:clamp((t-(s+3.6))/0.6,0,1), background:TL4.blueWash, border:`1px solid ${TL4.blue}`, borderRadius:10, padding:'14px 28px'}}>
        <span style={{fontFamily:DISP4, fontSize:26, fontWeight:700, color:TL4.blueD}}>Regla de oro: V / f = constante</span>
        <span style={{fontFamily:DISP4, fontSize:20, color:TL4.mut, marginLeft:14}}>así el flujo magnético no se satura.</span>
      </div>
    </SceneM4>
  );
}

function S_Affinity({ start, dur }) {
  const t = useTime(); const s = start;
  // power curve P = n^3, plot area
  const ox = 480, oy = 800, w = 620, h = 520;
  const grow = Easing.easeInOutCubic(clamp((t - (s + 1.0)) / 1.6, 0, 1));
  const pts = [];
  for (let i = 0; i <= 50; i++) { const n = i/50; if (n > grow) break; const p = Math.pow(n,3); pts.push(`${ox + n*w},${oy - p*h}`); }
  const markN = 0.8, markP = Math.pow(markN,3);
  const showMark = grow >= markN;
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="El argumento energético" y="8%" />
      <CapM4 start={s + 0.6} dur={2.2} size={44} weight={600} y="16%" width={1560}>En bombas y ventiladores, la potencia cae con el <span style={{color:TL4.orangeD}}>cubo</span> de la velocidad.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* axes */}
        <line x1={ox} y1={oy} x2={ox+w} y2={oy} stroke={TL4.lineS} strokeWidth="2" />
        <line x1={ox} y1={oy} x2={ox} y2={oy-h} stroke={TL4.lineS} strokeWidth="2" />
        <text x={ox+w/2} y={oy+44} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle">Velocidad (%)</text>
        <text x={ox-30} y={oy-h/2} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle" transform={`rotate(-90 ${ox-30} ${oy-h/2})`}>Potencia (%)</text>
        {/* linear reference (flow ∝ n) */}
        <line x1={ox} y1={oy} x2={ox+w*grow} y2={oy-h*grow} stroke={TL4.dim} strokeWidth="2" strokeDasharray="7 6" />
        <text x={ox+w*0.92} y={oy-h*0.92-10} fill={TL4.dim} fontFamily="IBM Plex Mono, monospace" fontSize="15" opacity={grow>0.9?1:0}>caudal ∝ n</text>
        {/* cube curve */}
        <polyline points={pts.join(' ')} fill="none" stroke={TL4.orange} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x={ox+w*0.62} y={oy-Math.pow(0.62,3)*h-18} fill={TL4.orangeD} fontFamily="IBM Plex Mono, monospace" fontSize="17" fontWeight="600" opacity={grow>0.65?1:0}>P ∝ n³</text>
        {/* marker at 80% */}
        {showMark && <g opacity={clamp((grow-markN)/0.1,0,1)}>
          <line x1={ox+markN*w} y1={oy} x2={ox+markN*w} y2={oy-markP*h} stroke={TL4.blue} strokeWidth="2" strokeDasharray="5 5" />
          <line x1={ox} y1={oy-markP*h} x2={ox+markN*w} y2={oy-markP*h} stroke={TL4.blue} strokeWidth="2" strokeDasharray="5 5" />
          <circle cx={ox+markN*w} cy={oy-markP*h} r="8" fill={TL4.blue} />
        </g>}
      </svg>
      <div style={{position:'absolute', left:1220, top:380, width:560, opacity:clamp((t-(s+2.8))/0.7,0,1)}}>
        <div style={{background:TL4.paper, border:`1px solid ${TL4.lineS}`, borderLeft:`4px solid ${TL4.orange}`, borderRadius:12, boxShadow:TL4.shadowSm, padding:'28px 30px'}}>
          <div style={{fontFamily:DISP4, fontSize:30, fontWeight:700, color:TL4.ink}}>Al 80% de velocidad…</div>
          <div style={{fontFamily:DISP4, fontSize:64, fontWeight:700, color:TL4.orangeD, margin:'8px 0'}}>≈ 51% potencia</div>
          <div style={{fontFamily:DISP4, fontSize:20, color:TL4.mut, lineHeight:1.4}}>0.8³ = 0.512. Reducir poco la velocidad ahorra mucha energía.</div>
        </div>
      </div>
    </SceneM4>
  );
}

function S_VsThrottle({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    { label: 'Válvula (throttling)', power: 80, acc: TL4.dim, note: 'estrangula y disipa' },
    { label: 'VFD', power: 12.5, acc: TL4.orange, note: '(0.5)³ = 12.5%' },
  ];
  const x0 = 560, barW = 900, baseY0 = 470, rowH = 200;
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Mismo caudal: 50%" y="13%" />
      <CapM4 start={s + 0.6} dur={2.2} size={48} weight={700} y="23%" width={1500}>Para la mitad del caudal, el VFD usa una fracción de la energía.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {rows.map((r,i)=>{
          const y = baseY0 + i*rowH;
          const gr = Easing.easeOutCubic(clamp((t-(s+1.3+i*0.5))/0.9,0,1));
          return (<g key={i}>
            <text x={x0} y={y-18} fill={TL4.ink} fontFamily="Space Grotesk, sans-serif" fontSize="28" fontWeight="600">{r.label}</text>
            <rect x={x0} y={y} width={barW} height="58" rx="10" fill="rgba(120,150,185,0.12)" />
            <rect x={x0} y={y} width={barW*(r.power/100)*gr} height="58" rx="10" fill={r.acc} opacity="0.9" />
            <text x={x0 + barW*(r.power/100)*gr + 18} y={y+40} fill={r.acc===TL4.dim?TL4.mut:TL4.orangeD} fontFamily="Space Grotesk, sans-serif" fontSize="30" fontWeight="700" opacity={gr}>{r.power}%</text>
            <text x={x0+barW} y={y-18} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="end">{r.note}</text>
          </g>);
        })}
      </svg>
      <CapM4 start={s + 4.6} dur={dur - 4.9} size={28} weight={500} color={TL4.mut} y="84%" width={1400}>Ahorro típico de 30–60% en bombas y ventiladores que no van siempre a tope.</CapM4>
    </SceneM4>
  );
}

const SCENES_M4C4 = [
  { C: (p) => <TitleCardM4 {...p} claseNo={4} title="Variadores de frecuencia" dudur="20–22 min" objetivo="Arquitectura rectificador–bus DC–inversor, la regla V/f y por qué el VFD ahorra energía por el cubo de la velocidad." />, dur: 7, label: 'Apertura' },
  { C: S_Arch, dur: 14, label: 'Arquitectura' },
  { C: S_Affinity, dur: 14, label: 'Leyes de afinidad' },
  { C: S_VsThrottle, dur: 12, label: 'VFD vs válvula' },
  { C: (p) => <ClosingM4 {...p} line="El VFD no solo controla la velocidad: redibuja la curva de energía de toda la planta." activity="Con la hoja de datos de un VFD, configura los parámetros de un motor de 7.5 kW y calcula el ahorro al 70% de caudal." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M4C4 = SCENES_M4C4;
