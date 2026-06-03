// m4c7.jsx — "Práctica integradora: dimensionamiento de una válvula de control"
// After m4-lib.jsx. Exports SCENES_M4C7.

function S_App({ start, dur }) {
  const t = useTime(); const s = start;
  const data = [
    { k: 'Fluido', v: 'agua de proceso · 25°C' },
    { k: 'Caudal normal', v: '45 m³/h' },
    { k: 'Presión entrada', v: '4.5 bar g' },
    { k: 'Presión salida', v: '2.8 bar g' },
    { k: 'Gravedad específica', v: '1.0' },
    { k: 'Condición de falla', v: 'Fail Open (FO)' },
  ];
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="La aplicación a dimensionar" y="9%" />
      <CapM4 start={s + 0.6} dur={2.2} size={44} weight={600} y="17%" width={1500}>Enfriamiento de un reactor: la válvula <span style={{color:TL4.orangeD}}>FCV-201</span>.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* reactor + cooling valve sketch */}
        <g opacity={clamp((t-(s+1.0))/0.6,0,1)}>
          <rect x={320} y={420} width="240" height="300" rx="16" fill={TL4.paper} stroke={TL4.ink} strokeWidth="3" />
          <rect x={336} y={520} width="208" height="184" rx="8" fill="rgba(47,134,230,0.18)" />
          <text x={440} y={400} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="17" textAnchor="middle">Reactor</text>
          {/* cooling jacket pipe + valve */}
          <path d={`M120 560 L320 560`} stroke="rgba(47,134,230,0.16)" strokeWidth="26" strokeLinecap="round" />
          <path d={`M120 560 L260 560`} stroke={TL4.blue} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" strokeDashoffset={-(t*30)%20} />
          <path d={`M250 540 L290 540 L282 580 L258 580 Z`} fill={TL4.paper} stroke={TL4.ink} strokeWidth="2.6" />
          <circle cx={270} cy={500} r="26" fill={TL4.paper} stroke={TL4.orange} strokeWidth="2.6" />
          <text x={270} y={494} fill={TL4.orangeD} fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="700" textAnchor="middle">FCV</text>
          <text x={270} y={510} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="11" textAnchor="middle">201</text>
        </g>
      </svg>
      {/* process data card */}
      <div style={{position:'absolute', right:'9%', top:'30%', width:680}}>
        {data.map((d,i)=>{
          const ap = pop4(t, s+1.4+i*0.28, 0.45, 14);
          return (
            <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 22px', marginBottom:10, background:TL4.paper, border:`1px solid ${TL4.lineS}`, borderLeft:`4px solid ${i===5?TL4.orange:TL4.blue}`, borderRadius:10, boxShadow:TL4.shadowSm, opacity:ap.op, transform:`translateY(${ap.ty}px)`}}>
              <span style={{fontFamily:MONO4, fontSize:16, letterSpacing:'0.06em', color:TL4.mut, textTransform:'uppercase'}}>{d.k}</span>
              <span style={{fontFamily:DISP4, fontSize:24, fontWeight:700, color:i===5?TL4.orangeD:TL4.ink}}>{d.v}</span>
            </div>
          );
        })}
      </div>
    </SceneM4>
  );
}

function S_Calc({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  const steps = [
    { at: 1.0, expr: 'ΔP = P_ent − P_sal = 4.5 − 2.8', res: '1.7 bar  ≈  24.7 PSI', acc: TL4.blue },
    { at: 4.0, expr: 'Q = 45 m³/h  →  198 GPM', res: '×4.403', acc: TL4.blue },
    { at: 6.5, expr: 'Cv = Q / √(ΔP / Gf) = 198 / √24.7', res: '= 198 / 4.97', acc: TL4.orange },
  ];
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="El cálculo del Cv" y="9%" />
      <CapM4 start={s + 0.6} dur={2.0} size={42} weight={600} y="17%" width={1500}>El coeficiente de caudal define el tamaño de la válvula.</CapM4>
      <div style={{position:'absolute', left:'12%', top:'30%', width:980}}>
        {steps.map((st,i)=>{
          const ap = pop4(t, s+st.at, 0.5, 18);
          return (
            <div key={i} style={{marginBottom:22, opacity:ap.op, transform:`translateY(${ap.ty}px)`, background:TL4.paper, border:`1px solid ${TL4.lineS}`, borderLeft:`4px solid ${st.acc}`, borderRadius:12, boxShadow:TL4.shadowSm, padding:'22px 30px'}}>
              <div style={{fontFamily:MONO4, fontSize:26, color:TL4.ink, fontWeight:500}}>{st.expr}</div>
              <div style={{fontFamily:MONO4, fontSize:19, color:TL4.mut, marginTop:6}}>{st.res}</div>
            </div>
          );
        })}
      </div>
      {/* big result */}
      <div style={{position:'absolute', right:'10%', top:'42%', textAlign:'center', opacity:clamp((lt-8.0)/0.7,0,1), transform:`scale(${0.9+0.1*Easing.easeOutBack(clamp((lt-8.0)/0.7,0,1))})`}}>
        <div style={{fontFamily:MONO4, fontSize:20, letterSpacing:'0.2em', color:TL4.dim, textTransform:'uppercase'}}>Cv requerido</div>
        <div style={{fontFamily:DISP4, fontSize:150, fontWeight:700, color:TL4.orangeD, lineHeight:0.9}}>39.8</div>
        <div style={{fontFamily:DISP4, fontSize:22, color:TL4.mut, marginTop:6}}>para el caudal normal de 45 m³/h</div>
      </div>
    </SceneM4>
  );
}

function S_Select({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    { sz: '1″', dn: 'DN25', cv: 14 },
    { sz: '1.5″', dn: 'DN40', cv: 30 },
    { sz: '2″', dn: 'DN50', cv: 55, pick: true },
    { sz: '3″', dn: 'DN80', cv: 120 },
    { sz: '4″', dn: 'DN100', cv: 200 },
  ];
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Selección del catálogo" y="9%" />
      <CapM4 start={s + 0.6} dur={2.0} size={44} weight={600} y="17%" width={1500}>Cv = 39.8 cae en la <span style={{color:TL4.orangeD}}>DN50</span> (Cv = 55).</CapM4>
      <div style={{position:'absolute', left:'14%', top:'29%', width:760}}>
        <div style={{display:'flex', padding:'10px 24px', fontFamily:MONO4, fontSize:15, letterSpacing:'0.12em', color:TL4.dim, textTransform:'uppercase'}}>
          <span style={{flex:1}}>Tamaño</span><span style={{flex:1}}>DN</span><span style={{flex:1, textAlign:'right'}}>Cv (100%)</span>
        </div>
        {rows.map((r,i)=>{
          const ap = pop4(t, s+1.2+i*0.25, 0.4, 12);
          return (
            <div key={i} style={{display:'flex', alignItems:'center', padding:'18px 24px', marginBottom:8, borderRadius:10, opacity:ap.op, transform:`translateY(${ap.ty}px)`,
              background: r.pick? TL4.orangeWash : TL4.paper, border:`1px solid ${r.pick?TL4.orange:TL4.lineS}`, boxShadow:TL4.shadowSm}}>
              <span style={{flex:1, fontFamily:DISP4, fontSize:26, fontWeight:600, color:TL4.ink}}>{r.sz}</span>
              <span style={{flex:1, fontFamily:MONO4, fontSize:22, color:TL4.mut}}>{r.dn}</span>
              <span style={{flex:1, textAlign:'right', fontFamily:DISP4, fontSize:30, fontWeight:700, color:r.pick?TL4.orangeD:TL4.ink}}>{r.cv}</span>
              {r.pick && <span style={{position:'absolute', marginLeft:-4, transform:'translateX(-60px)', fontFamily:MONO4, fontSize:14, color:TL4.orangeD}}>◄</span>}
            </div>
          );
        })}
      </div>
      <div style={{position:'absolute', right:'9%', top:'34%', width:600, opacity:clamp((t-(s+3.0))/0.7,0,1)}}>
        <div style={{background:TL4.paper, border:`1px solid ${TL4.lineS}`, borderLeft:`4px solid ${TL4.blue}`, borderRadius:12, boxShadow:TL4.shadowSm, padding:'26px 30px'}}>
          <div style={{fontFamily:DISP4, fontSize:30, fontWeight:700, color:TL4.ink}}>Apertura normal</div>
          <div style={{fontFamily:DISP4, fontSize:64, fontWeight:700, color:TL4.blueD, margin:'4px 0'}}>≈ 72%</div>
          <div style={{fontFamily:DISP4, fontSize:19, color:TL4.mut, lineHeight:1.4}}>39.8 / 55. Dentro de la zona de buen control; si se quiere más margen, DN80 al 33%.</div>
        </div>
        <div style={{marginTop:18, background:TL4.blueWash, border:`1px solid ${TL4.blue}`, borderRadius:12, padding:'18px 30px', opacity:clamp((t-(s+4.0))/0.7,0,1)}}>
          <div style={{fontFamily:DISP4, fontSize:21, color:TL4.ink}}>Actuador <b>ATO</b> con resorte → <b style={{color:TL4.orangeD}}>FO</b> · posicionador HART · feedback 4–20 mA.</div>
        </div>
      </div>
    </SceneM4>
  );
}

const SCENES_M4C7 = [
  { C: (p) => <TitleCardM4 {...p} claseNo={7} title="Práctica: dimensionar una válvula" dudur="28–30 min" objetivo="Calcular el Cv, seleccionar el tamaño y especificar actuador y posicionador para una válvula de control real." />, dur: 7, label: 'Apertura' },
  { C: S_App, dur: 14, label: 'La aplicación' },
  { C: S_Calc, dur: 14, label: 'Cálculo del Cv' },
  { C: S_Select, dur: 14, label: 'Selección' },
  { C: (p) => <ClosingM4 {...p} line="Dimensionar es traducir un proceso en un número: el Cv. Lo demás es elegir bien alrededor de él." activityLabel="Entregable" activity="Hoja de sizing + hoja de datos de FCV-201 + diagrama de conexión al PLC con feedback de posición." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M4C7 = SCENES_M4C7;
