// m4c5.jsx — "Bombas, compresores y sopladores como actuadores de proceso"
// After m4-lib.jsx. Exports SCENES_M4C5.

function S_Curves({ start, dur }) {
  const t = useTime(); const s = start;
  const ox = 470, oy = 800, w = 700, h = 520;
  const lt = t - s;
  // pump curve: H = 1 - 0.8 q^2  (falls with flow). system curve: H = k q^2
  const pumpY = (q) => oy - (1 - 0.78*q*q) * h;
  const draw = Easing.easeInOutCubic(clamp((lt - 1.0) / 1.3, 0, 1));
  // phase: 0-? base, then throttle (steeper system), then VFD (lower pump)
  const phase = lt < 5 ? 0 : (lt < 8.5 ? 1 : 2);
  const kBase = 0.9, kThr = 1.9;
  const k = phase === 1 ? kBase + (kThr-kBase)*Easing.easeInOutCubic(clamp((lt-5)/1.2,0,1)) : (phase===2?kBase:kBase);
  const pumpScale = phase === 2 ? 1 - 0.42*Easing.easeInOutCubic(clamp((lt-8.5)/1.2,0,1)) : 1;
  const sysY = (q) => oy - k*q*q * h;
  const pumpY2 = (q) => oy - (1 - 0.78*q*q)*h*pumpScale;
  // operating point: solve (1-0.78q²)*ps = k q²  → q² = ps/(k+0.78ps)
  const ps = pumpScale; const qOp = Math.sqrt(ps/(k+0.78*ps)); const hOp = k*qOp*qOp;
  const pumpPts=[], sysPts=[];
  for(let i=0;i<=50;i++){const q=i/50*draw; pumpPts.push(`${ox+q*w},${pumpY2(q)}`);}
  for(let i=0;i<=50;i++){const q=i/50*draw; sysPts.push(`${ox+q*w},${sysY(q)}`);}
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Curva de bomba × curva de sistema" y="8%" />
      <CapM4 start={s + 0.6} dur={2.0} size={42} weight={600} y="15%" width={1560}>La bomba opera donde su curva <span style={{color:TL4.blueD}}>cruza</span> la resistencia de la tubería.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={ox} y1={oy} x2={ox+w} y2={oy} stroke={TL4.lineS} strokeWidth="2" />
        <line x1={ox} y1={oy} x2={ox} y2={oy-h} stroke={TL4.lineS} strokeWidth="2" />
        <text x={ox+w/2} y={oy+44} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle">Caudal Q</text>
        <text x={ox-28} y={oy-h/2} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle" transform={`rotate(-90 ${ox-28} ${oy-h/2})`}>Cabeza H</text>
        <polyline points={pumpPts.join(' ')} fill="none" stroke={TL4.blue} strokeWidth="5" strokeLinecap="round" />
        <polyline points={sysPts.join(' ')} fill="none" stroke={TL4.orange} strokeWidth="5" strokeLinecap="round" />
        {draw>0.95 && <g>
          <circle cx={ox+qOp*w} cy={oy-hOp*h} r="10" fill={TL4.ink} />
          <circle cx={ox+qOp*w} cy={oy-hOp*h} r="18" fill="none" stroke={TL4.ink} strokeWidth="2" opacity={0.4+0.3*Math.sin(t*4)} />
        </g>}
        <text x={ox+w*0.86} y={pumpY2(0.86)-14} fill={TL4.blueD} fontFamily="IBM Plex Mono, monospace" fontSize="16" fontWeight="600" opacity={draw>0.8?1:0}>bomba</text>
        <text x={ox+w*0.74} y={sysY(0.74)-12} fill={TL4.orangeD} fontFamily="IBM Plex Mono, monospace" fontSize="16" fontWeight="600" opacity={draw>0.8?1:0}>sistema</text>
      </svg>
      <div style={{position:'absolute', left:1280, top:420, width:520, opacity:clamp((lt-5)/0.6,0,1)}}>
        <div style={{background:TL4.paper, border:`1px solid ${TL4.lineS}`, borderLeft:`4px solid ${phase>=2?TL4.orange:TL4.dim}`, borderRadius:12, boxShadow:TL4.shadowSm, padding:'24px 28px', transition:'border-color .3s'}}>
          <div style={{fontFamily:MONO4, fontSize:14, letterSpacing:'0.14em', color:TL4.dim, textTransform:'uppercase'}}>{phase>=2?'Con VFD':'Con válvula'}</div>
          <div style={{fontFamily:DISP4, fontSize:30, fontWeight:700, color:TL4.ink, marginTop:6}}>{phase>=2?'Baja la curva de la bomba':'Estrangula el sistema'}</div>
          <div style={{fontFamily:DISP4, fontSize:19, color:TL4.mut, marginTop:8, lineHeight:1.4}}>{phase>=2?'El punto baja siguiendo la curva del sistema → menos potencia.':'Sube la resistencia y disipa energía como calor.'}</div>
        </div>
      </div>
    </SceneM4>
  );
}

function S_NPSH({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  const cav = clamp((lt - 2.5) / 2.0, 0, 1); // cavitation onset
  const cx = 700, cy = 560;
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="NPSH y cavitación" y="9%" />
      <CapM4 start={s + 0.6} dur={2.2} size={44} weight={600} y="17%" width={1560}>Si la succión cae bajo la presión de vapor, el líquido <span style={{color:TL4.orangeD}}>hierve</span> dentro.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* pump volute */}
        <circle cx={cx} cy={cy} r="120" fill={TL4.paper} stroke={TL4.ink} strokeWidth="3" />
        <g transform={`rotate(${t*220} ${cx} ${cy})`}>
          {[0,60,120,180,240,300].map((a,i)=>(<path key={i} d={`M${cx} ${cy} Q${cx+50*Math.cos((a-20)*Math.PI/180)} ${cy+50*Math.sin((a-20)*Math.PI/180)} ${cx+96*Math.cos(a*Math.PI/180)} ${cy+96*Math.sin(a*Math.PI/180)}`} fill="none" stroke={TL4.blue} strokeWidth="4" strokeLinecap="round" opacity="0.7" />))}
        </g>
        <circle cx={cx} cy={cy} r="12" fill={TL4.blueD} />
        {/* suction pipe */}
        <path d={`M${cx-340} ${cy} L${cx-120} ${cy}`} stroke="rgba(47,134,230,0.16)" strokeWidth="34" strokeLinecap="round" />
        <path d={`M${cx-340} ${cy} L${cx-120} ${cy}`} stroke={TL4.blue} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" strokeDashoffset={-(t*30)%20} />
        {/* discharge */}
        <path d={`M${cx} ${cy-120} L${cx} ${cy-260}`} stroke="rgba(47,134,230,0.16)" strokeWidth="34" strokeLinecap="round" />
        {/* cavitation bubbles near impeller eye */}
        {cav>0.05 && [...Array(9)].map((_,i)=>{
          const ph=(t*1.4+i)%1; const bx=cx-90+ph*70+Math.sin(i)*20; const by=cy-30+ (i%3)*22; 
          return <circle key={i} cx={bx} cy={by} r={2+ph*6} fill="none" stroke={TL4.orange} strokeWidth="2" opacity={cav*(1-ph)} />;
        })}
        {/* suction pressure gauge */}
        <g>
          <circle cx={cx-360} cy={cy-150} r="56" fill={TL4.paper} stroke={TL4.ink} strokeWidth="3" />
          {(() => { const ang=-120 + (1-cav)*150; return <line x1={cx-360} y1={cy-150} x2={cx-360+38*Math.cos(ang*Math.PI/180)} y2={cy-150+38*Math.sin(ang*Math.PI/180)} stroke={cav>0.5?TL4.orangeD:TL4.blueD} strokeWidth="4" strokeLinecap="round" />; })()}
          <circle cx={cx-360} cy={cy-150} r="5" fill={TL4.ink} />
          <text x={cx-360} y={cy-66} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">presión de succión</text>
        </g>
      </svg>
      <div style={{position:'absolute', left:1130, top:430, width:640, opacity:clamp((lt-1.4)/0.7,0,1)}}>
        <div style={{background:TL4.paper, border:`1px solid ${TL4.lineS}`, borderLeft:`4px solid ${TL4.blue}`, borderRadius:12, boxShadow:TL4.shadowSm, padding:'24px 30px'}}>
          <div style={{fontFamily:DISP4, fontSize:32, fontWeight:700, color:TL4.ink}}>NPSH<sub style={{fontSize:18}}>disp</sub> &gt; NPSH<sub style={{fontSize:18}}>req</sub></div>
          <div style={{fontFamily:DISP4, fontSize:20, color:TL4.mut, marginTop:8, lineHeight:1.4}}>Mantén margen o las burbujas implosionan y destruyen el impulsor en días.</div>
        </div>
        <div style={{marginTop:20, opacity:cav, background:TL4.orangeWash, border:`1px solid ${TL4.orange}`, borderRadius:12, padding:'18px 30px'}}>
          <div style={{fontFamily:DISP4, fontSize:24, fontWeight:700, color:TL4.orangeD}}>⚠ Cavitación</div>
          <div style={{fontFamily:DISP4, fontSize:18, color:TL4.ink, marginTop:4}}>Ruido de gravilla, caída de rendimiento, daño en el impulsor.</div>
        </div>
      </div>
    </SceneM4>
  );
}

function S_Families({ start, dur }) {
  const t = useTime(); const s = start;
  const x0 = 320, w = 1280, y = 560;
  const bands = [
    { lab: 'Ventilador', range: 'ΔP < 25 mbar', use: 'ventilación, secado', f: 0.0, to: 0.33, acc: TL4.blue },
    { lab: 'Soplador', range: '25 mbar – 1 bar', use: 'aireación, transporte', f: 0.33, to: 0.66, acc: TL4.orange },
    { lab: 'Compresor', range: 'ΔP > 1 bar', use: 'gas a alta presión', f: 0.66, to: 1.0, acc: TL4.blueD },
  ];
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="¿Qué los diferencia? La presión" y="14%" />
      <CapM4 start={s + 0.6} dur={2.2} size={48} weight={700} y="24%" width={1500}>Tres máquinas de aire, una escala de presión.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={x0} y1={y} x2={x0+w} y2={y} stroke={TL4.lineS} strokeWidth="3" />
        {bands.map((b,i)=>{
          const ap = clamp((t-(s+1.2+i*0.5))/0.6,0,1);
          const bx0=x0+b.f*w, bx1=x0+b.to*w;
          return (<g key={i} opacity={ap}>
            <rect x={bx0} y={y-10} width={(bx1-bx0)*ap} height="20" rx="10" fill={b.acc} opacity="0.85" />
            <text x={(bx0+bx1)/2} y={y-60} fill={b.acc} fontFamily="Space Grotesk, sans-serif" fontSize="34" fontWeight="700" textAnchor="middle">{b.lab}</text>
            <text x={(bx0+bx1)/2} y={y-28} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="17" textAnchor="middle">{b.range}</text>
            <text x={(bx0+bx1)/2} y={y+52} fill={TL4.ink} fontFamily="Space Grotesk, sans-serif" fontSize="20" textAnchor="middle">{b.use}</text>
          </g>);
        })}
        <text x={x0} y={y+96} fill={TL4.dim} fontFamily="IBM Plex Mono, monospace" fontSize="15">baja presión</text>
        <text x={x0+w} y={y+96} fill={TL4.dim} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="end">alta presión →</text>
      </svg>
    </SceneM4>
  );
}

const SCENES_M4C5 = [
  { C: (p) => <TitleCardM4 {...p} claseNo={5} title="Bombas, compresores y sopladores" dudur="16–18 min" objetivo="Curva de bomba y punto de operación, NPSH y cavitación, y las tres familias de máquinas de aire por presión." />, dur: 7, label: 'Apertura' },
  { C: S_Curves, dur: 15, label: 'Punto de operación' },
  { C: S_NPSH, dur: 13, label: 'NPSH y cavitación' },
  { C: S_Families, dur: 11, label: 'Familias por ΔP' },
  { C: (p) => <ClosingM4 {...p} line="La máquina entrega caudal; el sistema lo convierte en presión. Controla la velocidad, no la fricción." activity="Con la curva de una bomba y la del sistema, halla el punto de operación y compara la potencia con y sin VFD." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M4C5 = SCENES_M4C5;
