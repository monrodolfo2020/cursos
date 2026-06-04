// m5c8.jsx — "Práctica integradora: simulación de un lazo PID completo"
// After m5-lib.jsx. Exports SCENES_M5C8.

function S_System({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    { k: 'PV', v: 'Temperatura reactor 0–150°C', io: 'IW64 · 4–20 mA', acc: TL5.indigo },
    { k: 'CV', v: 'Apertura válvula de vapor 0–100%', io: 'QW80 · 4–20 mA', acc: TL5.amber },
    { k: 'SP', v: '80 °C (configurable)', io: 'constante', acc: TL5.indigoD },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="El sistema a controlar" y="10%" />
      <CapM5 start={s + 0.6} dur={2.2} size={46} weight={600} y="19%" width={1500}>Control de temperatura de un reactor en <span style={{color:TL5.indigoD}}>TIA Portal</span>.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <g opacity={clamp((t-(s+1.0))/0.6,0,1)}>
          {/* PLC */}
          <rect x={300} y={440} width={200} height={220} rx="12" fill={TL5.paper} stroke={TL5.indigo} strokeWidth="2.6" />
          <text x={400} y={420} fill={TL5.mut} fontFamily={MONO5} fontSize="16" textAnchor="middle">S7-1214C</text>
          <text x={400} y={560} fill={TL5.ink} fontFamily={DISP5} fontSize="40" fontWeight="700" textAnchor="middle">PID</text>
          <text x={400} y={596} fill={TL5.mut} fontFamily={MONO5} fontSize="15" textAnchor="middle">PID_Compact</text>
          {/* reactor */}
          <rect x={1180} y={420} width={260} height={300} rx="18" fill={TL5.paper} stroke={TL5.ink} strokeWidth="3" />
          <rect x={1198} y={520} width={224} height={184} rx="8" fill="rgba(91,84,224,0.16)" />
          <text x={1310} y={400} fill={TL5.mut} fontFamily={MONO5} fontSize="16" textAnchor="middle">Reactor</text>
          {/* CV path */}
          <ArrowM5 x1={500} y1={500} x2={1180} y2={500} start={s+1.4} t={t} color={TL5.amber} label="CV → válvula vapor" live />
          {/* PV feedback */}
          <path d={`M1310 720 L1310 800 L400 800 L400 660`} fill="none" stroke={TL5.indigo} strokeWidth="3" strokeLinecap="round" strokeDasharray="12 10" strokeDashoffset={(t*34)%22} opacity={clamp((t-(s+1.8))/0.5,0,1)} />
          <text x={855} y={830} fill={TL5.indigoD} fontFamily={MONO5} fontSize="16" textAnchor="middle" opacity={clamp((t-(s+1.8))/0.5,0,1)}>PV ← sensor de temperatura</text>
        </g>
      </svg>
      <div style={{position:'absolute', right:'5%', top:'30%', width:560}}>
        {rows.map((r,i)=>{
          const ap = pop5(t, s+1.4+i*0.35, 0.5, 14);
          return <div key={i} style={{display:'flex', alignItems:'center', gap:16, padding:'16px 22px', marginBottom:12, background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderLeft:`4px solid ${r.acc}`, borderRadius:10, boxShadow:TL5.shadowSm, opacity:ap.op, transform:`translateY(${ap.ty}px)`}}>
            <span style={{fontFamily:DISP5, fontSize:26, fontWeight:700, color:r.acc, minWidth:48}}>{r.k}</span>
            <div>
              <div style={{fontFamily:DISP5, fontSize:20, color:TL5.ink, fontWeight:500}}>{r.v}</div>
              <div style={{fontFamily:MONO5, fontSize:14, color:TL5.mut, marginTop:2}}>{r.io}</div>
            </div>
          </div>;
        })}
      </div>
    </SceneM5>
  );
}

// Live PID-ish simulation: integrate a first order process toward SP.
function simTemp(elapsed, sp1 = 80, sp2 = 100, switchAt = 9) {
  // discrete sim: y(k) = y + dt/tau*(K*u - y), with PID giving u from error
  const dt = 0.05, K = 1.5, tau = 4.0, Kp = 2.2, Ti = 6;
  let y = 20, integ = 0;
  const samples = []; let spNow = sp1;
  for (let tt = 0; tt <= elapsed; tt += dt) {
    spNow = tt >= switchAt ? sp2 : sp1;
    const e = spNow - y;
    integ += e * dt;
    let u = Kp * (e + integ / Ti);
    u = Math.max(0, Math.min(100, u));
    y += dt / tau * (K * u - (y - 20)); // process gain referenced to ambient
    samples.push({ t: tt, y, sp: spNow, u });
  }
  return samples;
}

function S_LiveRun({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = Math.max(0, t - s);
  const sim = simTemp(Math.min(lt * 1.3, 24));   // speed up sim a touch
  const last = sim[sim.length - 1] || { y: 20, sp: 80, u: 0 };
  const cx0 = 250, cy0 = 330, cw = 980, ch = 440;
  const totalT = 24, maxY = 130;
  const px = (tt) => cx0 + (tt / totalT) * cw;
  const py = (v) => cy0 + ch - (v / maxY) * ch;
  const pvPts = sim.map(d => `${px(d.t).toFixed(1)},${py(d.y).toFixed(1)}`).join(' ');
  const cvPts = sim.map(d => `${px(d.t).toFixed(1)},${py(d.u * (maxY/100) * 0.5).toFixed(1)}`).join(' ');
  // SP step path
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Prueba en vivo · escalón de SP 80 → 100°C" y="8%" />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <rect x={cx0} y={cy0} width={cw} height={ch} rx="10" fill={TL5.paper} stroke={TL5.lineS} strokeWidth="1.6" />
        {[0.25,0.5,0.75].map((g,i)=><line key={i} x1={cx0} y1={cy0+ch*g} x2={cx0+cw} y2={cy0+ch*g} stroke={TL5.line} strokeWidth="1" />)}
        {/* SP step */}
        <path d={`M${px(0)} ${py(80)} L${px(9)} ${py(80)} L${px(9)} ${py(100)} L${px(24)} ${py(100)}`} fill="none" stroke={TL5.amber} strokeWidth="2.4" strokeDasharray="9 7" />
        <text x={cx0+cw-8} y={py(100)-9} fill={TL5.amberD} fontFamily={MONO5} fontSize="16" fontWeight="600" textAnchor="end">SP</text>
        {/* CV (scaled) */}
        <polyline points={cvPts} fill="none" stroke={TL5.indigoLt} strokeWidth="3" strokeDasharray="6 6" opacity="0.8" />
        {/* PV */}
        <polyline points={pvPts} fill="none" stroke={TL5.indigo} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        {/* moving head */}
        <circle cx={px(last.t)} cy={py(last.y)} r="7" fill={TL5.indigoD} />
        <text x={cx0+cw/2} y={cy0+ch+30} fill={TL5.mut} fontFamily={MONO5} fontSize="16" textAnchor="middle">tiempo →</text>
        <text x={cx0-22} y={cy0+ch/2} fill={TL5.mut} fontFamily={MONO5} fontSize="16" textAnchor="middle" transform={`rotate(-90 ${cx0-22} ${cy0+ch/2})`}>°C</text>
      </svg>
      {/* live readouts */}
      <div style={{position:'absolute', right:'6%', top:'34%', width:430, display:'flex', flexDirection:'column', gap:18}}>
        {[
          {l:'PV (temperatura)', v:last.y.toFixed(1), u:'°C', c:TL5.indigo},
          {l:'SP (setpoint)', v:last.sp.toFixed(0), u:'°C', c:TL5.amberD},
          {l:'CV (válvula)', v:last.u.toFixed(0), u:'%', c:TL5.indigoD},
          {l:'error', v:(last.sp-last.y).toFixed(1), u:'°C', c:TL5.mut},
        ].map((it,i)=>(
          <div key={i} style={{background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderLeft:`4px solid ${it.c}`, borderRadius:10, boxShadow:TL5.shadowSm, padding:'14px 22px', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
            <span style={{fontFamily:MONO5, fontSize:14, letterSpacing:'0.06em', color:TL5.mut, textTransform:'uppercase'}}>{it.l}</span>
            <span><span style={{fontFamily:DISP5, fontSize:36, fontWeight:700, color:it.c}}>{it.v}</span><span style={{fontFamily:MONO5, fontSize:18, color:TL5.mut, marginLeft:4}}>{it.u}</span></span>
          </div>
        ))}
      </div>
    </SceneM5>
  );
}

function S_Steps({ start, dur }) {
  const t = useTime(); const s = start;
  const steps = [
    { n: 1, title: 'Hardware', d: 'CPU S7-1214C + módulos AI/AQ en TIA Portal.' },
    { n: 2, title: 'Escalado', d: 'NORM_X y SCALE_X: 0–27648 → 0–150°C.' },
    { n: 3, title: 'PID_Compact', d: 'OB cíclico 100 ms · Kp=2, Ti=30s, Td=5s.' },
    { n: 4, title: 'Modelo proceso', d: '1er orden en ST: K=1.5, τ=25s.' },
    { n: 5, title: 'Trace', d: 'Graficar PV y CV · escalón, perturbación, parámetros.' },
    { n: 6, title: 'Enclavamiento', d: 'T>120°C → manual y CV=0%. T<20°C → alarma.' },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="El procedimiento completo" y="9%" />
      <CapM5 start={s + 0.6} dur={2.0} size={46} weight={700} y="18%" width={1500}>Seis pasos, de cero a lazo corriendo.</CapM5>
      <div style={{position:'absolute', left:'50%', top:'30%', transform:'translateX(-50%)', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20, width:1400}}>
        {steps.map((st,i)=>{
          const ap = pop5(t, s+1.2+i*0.28, 0.5, 18);
          return <div key={i} style={{opacity:ap.op, transform:`translateY(${ap.ty}px)`, background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderRadius:12, boxShadow:TL5.shadowSm, padding:'22px 24px', position:'relative', overflow:'hidden'}}>
            <div style={{fontFamily:DISP5, fontSize:44, fontWeight:700, color:i<3?TL5.indigo:TL5.amber, opacity:0.9, lineHeight:1}}>{st.n}</div>
            <div style={{fontFamily:DISP5, fontSize:24, fontWeight:700, color:TL5.ink, marginTop:8}}>{st.title}</div>
            <div style={{fontFamily:DISP5, fontSize:17, color:TL5.mut, marginTop:6, lineHeight:1.35}}>{st.d}</div>
          </div>;
        })}
      </div>
    </SceneM5>
  );
}

const SCENES_M5C8 = [
  { C: (p) => <TitleCardM5 {...p} claseNo={8} title="Práctica: un lazo PID completo" dudur="28–30 min · 100% práctica" objetivo="Programar, escalar, sintonizar y observar en tiempo real un lazo PID de temperatura en TIA Portal con PLC simulado." />, dur: 7, label: 'Apertura' },
  { C: S_System, dur: 14, label: 'El sistema' },
  { C: S_Steps, dur: 13, label: 'Procedimiento' },
  { C: S_LiveRun, dur: 18, label: 'Simulación en vivo' },
  { C: (p) => <ClosingM5 {...p} line="Todo el módulo converge aquí: sensor, escalado, PID, enclavamiento — un lazo real que responde en tiempo real." activityLabel="Entregable" activity="Proyecto TIA Portal + capturas del Trace (escalón, perturbación, cambio de parámetros) + tabla de parámetros y conclusión de 1 página." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M5C8 = SCENES_M5C8;
