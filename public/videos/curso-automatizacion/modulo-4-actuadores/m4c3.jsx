// m4c3.jsx — "Motores eléctricos industriales: el actuador de mayor potencia"
// After m4-lib.jsx. Exports SCENES_M4C3.

function S_Why({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Quién mueve la planta" y="16%" />
      <CapM4 start={s + 0.7} dur={dur - 1.0} size={58} weight={700} y="40%" width={1500}>Bombas, ventiladores, compresores, cintas — casi todo lo mueve un motor.</CapM4>
      <StatM4 x={430} y={680} value="≈45%" label="de la electricidad mundial" accent={TL4.blue} appear={s + 1.6} t={t} align="center" />
      <StatM4 x={1000} y={680} value="60–70%" label="del consumo de una planta" accent={TL4.orange} appear={s + 2.2} t={t} align="center" />
    </SceneM4>
  );
}

// 3-phase induction motor with rotating field + slipping rotor.
function S_Field({ start, dur }) {
  const t = useTime(); const s = start;
  const cx = 700, cy = 560, R = 200;
  const fieldA = (t - s) * 150;            // synchronous field angle (deg)
  const rotorA = (t - s) * 150 * 0.95;     // rotor lags → slip ~5%
  const ap = clamp((t - (s + 0.8)) / 0.7, 0, 1);
  const coils = [0, 120, 240];
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Motor de inducción trifásico" y="8%" />
      <CapM4 start={s + 0.6} dur={2.2} size={44} weight={600} y="16%" width={1500}>Tres fases crean un campo que <span style={{color:TL4.orangeD}}>gira</span>; el rotor lo persigue.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <g opacity={ap}>
          {/* stator ring */}
          <circle cx={cx} cy={cy} r={R} fill={TL4.paper} stroke={TL4.ink} strokeWidth="3.5" />
          <circle cx={cx} cy={cy} r={R - 30} fill="none" stroke={TL4.lineS} strokeWidth="2" />
          {/* 3 coil pairs, energization pulsing per phase */}
          {coils.map((a, i) => {
            const rad = a * Math.PI / 180;
            const energ = 0.5 + 0.5 * Math.sin(fieldA * Math.PI / 180 - rad);
            const col = [TL4.blue, TL4.orange, TL4.blueD][i];
            const bx = cx + Math.cos(rad) * (R - 12), by = cy + Math.sin(rad) * (R - 12);
            const bx2 = cx - Math.cos(rad) * (R - 12), by2 = cy - Math.sin(rad) * (R - 12);
            return (<g key={i}>
              <rect x={bx-16} y={by-16} width="32" height="32" rx="6" fill={col} opacity={0.25 + 0.7*energ} transform={`rotate(${a} ${bx} ${by})`} />
              <rect x={bx2-16} y={by2-16} width="32" height="32" rx="6" fill={col} opacity={0.25 + 0.7*(1-energ)} transform={`rotate(${a} ${bx2} ${by2})`} />
              <text x={cx + Math.cos(rad)*(R+28)} y={cy + Math.sin(rad)*(R+28)+6} fill={col} fontFamily="IBM Plex Mono, monospace" fontSize="20" fontWeight="700" textAnchor="middle">{['L1','L2','L3'][i]}</text>
            </g>);
          })}
          {/* rotating field vector */}
          <line x1={cx} y1={cy} x2={cx + Math.cos(fieldA*Math.PI/180)*(R-44)} y2={cy + Math.sin(fieldA*Math.PI/180)*(R-44)} stroke={TL4.orange} strokeWidth="5" strokeLinecap="round" opacity="0.55" strokeDasharray="6 8" />
          {/* rotor (squirrel cage) */}
          <g transform={`rotate(${rotorA} ${cx} ${cy})`}>
            <circle cx={cx} cy={cy} r="70" fill={TL4.blueWash} stroke={TL4.ink} strokeWidth="3" />
            {[0,45,90,135].map((b,i)=>(<line key={i} x1={cx+70*Math.cos(b*Math.PI/180)} y1={cy+70*Math.sin(b*Math.PI/180)} x2={cx-70*Math.cos(b*Math.PI/180)} y2={cy-70*Math.sin(b*Math.PI/180)} stroke={TL4.dim} strokeWidth="2" />))}
            <line x1={cx} y1={cy} x2={cx} y2={cy-58} stroke={TL4.blueD} strokeWidth="5" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r="8" fill={TL4.blueD} />
          </g>
        </g>
      </svg>
      {/* formulas / slip */}
      <div style={{position:'absolute', left:1080, top:380, width:680, opacity:clamp((t-(s+1.8))/0.7,0,1)}}>
        <div style={{background:TL4.paper, border:`1px solid ${TL4.lineS}`, borderLeft:`4px solid ${TL4.blue}`, borderRadius:12, boxShadow:TL4.shadowSm, padding:'26px 30px'}}>
          <div style={{fontFamily:MONO4, fontSize:15, letterSpacing:'0.16em', color:TL4.dim, textTransform:'uppercase'}}>Velocidad síncrona</div>
          <div style={{fontFamily:DISP4, fontSize:54, fontWeight:700, color:TL4.ink, margin:'8px 0'}}>n<sub style={{fontSize:26}}>s</sub> = 120·f / p</div>
          <div style={{fontFamily:DISP4, fontSize:20, color:TL4.mut, lineHeight:1.4}}>4 polos · 60 Hz → 1800 RPM síncronas.</div>
        </div>
        <div style={{marginTop:22, background:TL4.orangeWash, border:`1px solid ${TL4.orange}`, borderRadius:12, padding:'22px 30px', opacity:clamp((t-(s+2.6))/0.7,0,1)}}>
          <div style={{fontFamily:DISP4, fontSize:30, fontWeight:700, color:TL4.orangeD}}>Deslizamiento ≈ 2–5%</div>
          <div style={{fontFamily:DISP4, fontSize:20, color:TL4.ink, marginTop:4}}>El rotor gira un poco más lento → por eso es <i>asíncrono</i>.</div>
        </div>
      </div>
    </SceneM4>
  );
}

function S_Starting({ start, dur }) {
  const t = useTime(); const s = start;
  const methods = [
    { label: 'Directo (DOL)', x: 6.5, sub: '5–7× In', acc: TL4.orange },
    { label: 'Estrella-Δ', x: 2.3, sub: '≈ 33%', acc: TL4.blue },
    { label: 'Arranc. suave', x: 3.0, sub: '2–3.5× In', acc: TL4.blue },
    { label: 'VFD', x: 1.2, sub: 'controlada', acc: TL4.blueD },
  ];
  const maxV = 7, baseY = 760, h = 440, bw = 150, gap = 230, x0 = 470;
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Corriente de arranque" y="10%" />
      <CapM4 start={s + 0.6} dur={2.3} size={46} weight={600} y="19%" width={1500}>Arrancar de golpe pide hasta <span style={{color:TL4.orangeD}}>7×</span> la corriente nominal.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* In reference line */}
        <line x1={x0-60} y1={baseY - h*(1/maxV)} x2={x0 + gap*3 + bw + 60} y2={baseY - h*(1/maxV)} stroke={TL4.dim} strokeWidth="2" strokeDasharray="8 6" opacity={clamp((t-(s+1.0))/0.5,0,1)} />
        <text x={x0-80} y={baseY - h*(1/maxV)+6} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="end" opacity={clamp((t-(s+1.0))/0.5,0,1)}>In</text>
        {methods.map((m,i)=>{
          const gx = x0 + i*gap;
          const gr = Easing.easeOutCubic(clamp((t-(s+1.3+i*0.35))/0.7,0,1));
          const bh = h*(m.x/maxV)*gr;
          return (<g key={i}>
            <rect x={gx} y={baseY-bh} width={bw} height={bh} rx="8" fill={m.acc} opacity="0.88" />
            <text x={gx+bw/2} y={baseY-bh-16} fill={m.acc} fontFamily="Space Grotesk, sans-serif" fontSize="30" fontWeight="700" textAnchor="middle" opacity={gr}>{m.x}×</text>
            <text x={gx+bw/2} y={baseY+34} fill={TL4.ink} fontFamily="Space Grotesk, sans-serif" fontSize="23" fontWeight="600" textAnchor="middle">{m.label}</text>
            <text x={gx+bw/2} y={baseY+62} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle">{m.sub}</text>
          </g>);
        })}
        <line x1={x0-60} y1={baseY} x2={x0 + gap*3 + bw + 60} y2={baseY} stroke={TL4.lineS} strokeWidth="2" />
      </svg>
    </SceneM4>
  );
}

function S_MotorTypes({ start, dur }) {
  const t = useTime(); const s = start;
  const cards = [
    { Icon: IcoMotor, title: 'Inducción', sub: 'El caballo de trabajo. Con VFD, control total.', acc: TL4.blue },
    { Icon: IcoMotor, title: 'Servomotor', sub: 'Posición, velocidad y torque de alta precisión.', acc: TL4.orange },
    { Icon: IcoMotor, title: 'Paso a paso', sub: 'Pasos discretos sin encoder. Dosificadores.', acc: TL4.blueD },
    { Icon: IcoMotor, title: 'BLDC', sub: 'Sin escobillas, alta eficiencia. HVAC, bombas.', acc: TL4.blue },
  ];
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Familias de motores" y="11%" />
      <CapM4 start={s + 0.6} dur={2.2} size={50} weight={700} y="20%" width={1500}>Cada aplicación pide su motor.</CapM4>
      {cards.map((c,i)=>(
        <InfoCardM4 key={i} x={150 + i*420} y={430} w={370} h={310} Icon={c.Icon} accent={c.acc} title={c.title} sub={c.sub} appear={s+1.2+i*0.4} t={t} />
      ))}
    </SceneM4>
  );
}

const SCENES_M4C3 = [
  { C: (p) => <TitleCardM4 {...p} claseNo={3} title="Motores eléctricos industriales" dudur="18–20 min" objetivo="Inducción trifásica, deslizamiento, métodos de arranque y cuándo usar cada familia de motor." />, dur: 7, label: 'Apertura' },
  { C: S_Why, dur: 10, label: 'Por qué importan' },
  { C: S_Field, dur: 15, label: 'Campo giratorio' },
  { C: S_Starting, dur: 13, label: 'Arranque' },
  { C: S_MotorTypes, dur: 12, label: 'Familias' },
  { C: (p) => <ClosingM4 {...p} line="Controlar la velocidad del motor es la forma más eficiente de controlar el caudal." activity="Especifica el motor y el método de arranque para 5 aplicaciones, justificando potencia, velocidad y corriente de arranque." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M4C3 = SCENES_M4C3;
