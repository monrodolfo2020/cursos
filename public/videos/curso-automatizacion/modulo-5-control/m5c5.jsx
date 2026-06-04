// m5c5.jsx — "Sintonización de PID: métodos prácticos"
// After m5-lib.jsx. Exports SCENES_M5C5.

function S_Criteria({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  const reveal = clamp((lt - 1.0) / 2.2, 0, 1);
  // a typical well-tuned response with marked overshoot + settling
  const resp = (u) => { const wn=6.5,z=0.5; if(u<=0)return 0; const wd=wn*Math.sqrt(1-z*z); return 1-Math.exp(-z*wn*u)*(Math.cos(wd*u)+(z*wn/wd)*Math.sin(wd*u)); };
  const cx0 = 250, cy0 = 330, cw = 820, ch = 440;
  const py = (v) => cy0 + ch - v * ch;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="¿Qué es una buena respuesta?" y="8%" />
      <CapM5 start={s + 0.6} dur={1.8} size={42} weight={600} y="16%" width={1600}>Cuatro métricas definen la calidad del lazo.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <ChartM5 x={cx0} y={cy0} w={cw} h={ch} t={t} reveal={reveal} sp={1.0} spLabel="SP"
          series={[{ fn: resp, color: TL5.indigo, width: 5 }]} />
        {reveal > 0.95 && <g opacity={clamp((reveal-0.95)/0.05,0,1)}>
          {/* overshoot marker */}
          <line x1={cx0 + cw*0.28} y1={py(resp(0.28))} x2={cx0 + cw*0.28} y2={py(1.0)} stroke={TL5.red} strokeWidth="2" strokeDasharray="4 4" />
          <text x={cx0 + cw*0.28 + 8} y={py(resp(0.28)) - 6} fill={TL5.red} fontFamily={MONO5} fontSize="14" fontWeight="600">sobrepaso</text>
          {/* settling band */}
          <rect x={cx0} y={py(1.05)} width={cw} height={py(0.95)-py(1.05)} fill={TL5.ok} opacity="0.10" />
          <text x={cx0 + cw - 8} y={py(1.05) - 6} fill={TL5.ok} fontFamily={MONO5} fontSize="13" textAnchor="end">±5% banda de asentamiento</text>
        </g>}
      </svg>
      <div style={{position:'absolute', right:'7%', top:'34%', width:470}}>
        {[
          {n:'Tiempo de subida', d:'Cuánto tarda en responder (10→90%).', c:TL5.indigo, a:2.0},
          {n:'Sobrepaso', d:'Cuánto supera al SP.', c:TL5.red, a:2.4},
          {n:'Tiempo de asentamiento', d:'Cuándo se queda dentro de ±5%.', c:TL5.amberD, a:2.8},
          {n:'Offset', d:'Error residual: debe ser cero con PI/PID.', c:TL5.ok, a:3.2},
        ].map((it,i)=>{
          const ap = pop5(t, s+it.a, 0.5, 12);
          return <div key={i} style={{marginBottom:14, opacity:ap.op, transform:`translateY(${ap.ty}px)`, background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderLeft:`4px solid ${it.c}`, borderRadius:10, boxShadow:TL5.shadowSm, padding:'14px 20px'}}>
            <div style={{fontFamily:DISP5, fontSize:22, fontWeight:700, color:it.c}}>{it.n}</div>
            <div style={{fontFamily:DISP5, fontSize:16, color:TL5.mut, marginTop:2, lineHeight:1.3}}>{it.d}</div>
          </div>;
        })}
      </div>
    </SceneM5>
  );
}

function S_StepTest({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  const reveal = clamp((lt - 1.2) / 2.6, 0, 1);
  const K=0.5, theta=0.18, tau=0.32;
  const resp = (u) => u < theta ? 0 : (1 - Math.exp(-(u - theta) / tau));
  const cx0 = 280, cy0 = 360, cw = 800, ch = 380;
  const px = (u) => cx0 + u*cw, py = (v) => cy0 + ch - v*ch;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Método 1 · prueba de escalón en lazo abierto" y="8%" />
      <CapM5 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1600}>En MANUAL, da un escalón y lee <span style={{color:TL5.indigoD}}>K, θ y τ</span> de la curva.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* CV step (input) */}
        <line x1={cx0} y1={py(1.05)+24} x2={px(0.12)} y2={py(1.05)+24} stroke={TL5.amber} strokeWidth="3" />
        <line x1={px(0.12)} y1={py(1.05)+24} x2={px(0.12)} y2={py(1.25)+24} stroke={TL5.amber} strokeWidth="3" />
        <line x1={px(0.12)} y1={py(1.25)+24} x2={cx0+cw} y2={py(1.25)+24} stroke={TL5.amber} strokeWidth="3" />
        <text x={cx0+cw} y={py(1.25)+16} fill={TL5.amberD} fontFamily={MONO5} fontSize="15" textAnchor="end">escalón CV</text>
        <ChartM5 x={cx0} y={cy0} w={cw} h={ch} t={t} reveal={reveal} series={[{ fn: resp, color: TL5.indigo, width: 5 }]} ylabel="PV" />
        {reveal > 0.9 && <g opacity={clamp((reveal-0.9)/0.1,0,1)}>
          {/* dead time */}
          <line x1={px(0.12)} y1={py(0)} x2={px(0.12)} y2={py(0)+34} stroke={TL5.mut} strokeWidth="1.5" />
          <line x1={px(0.30)} y1={py(0)} x2={px(0.30)} y2={py(0)+34} stroke={TL5.mut} strokeWidth="1.5" />
          <text x={px(0.21)} y={py(0)+52} fill={TL5.mut} fontFamily={MONO5} fontSize="15" textAnchor="middle">θ</text>
          {/* 63.2% */}
          <line x1={cx0} y1={py(0.632)} x2={px(0.30+0.32)} y2={py(0.632)} stroke={TL5.indigoD} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.7" />
          <text x={cx0+10} y={py(0.632)-8} fill={TL5.indigoD} fontFamily={MONO5} fontSize="14">63.2% → τ</text>
        </g>}
      </svg>
      <div style={{position:'absolute', right:'6%', top:'42%', width:430, opacity:clamp((lt-3.0)/0.6,0,1)}}>
        <div style={{background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderLeft:`4px solid ${TL5.indigo}`, borderRadius:12, boxShadow:TL5.shadowSm, padding:'24px 28px'}}>
          <div style={{fontFamily:MONO5, fontSize:20, color:TL5.ink, lineHeight:1.9}}>
            <div><b style={{color:TL5.indigoD}}>θ</b> = retardo hasta responder</div>
            <div><b style={{color:TL5.indigoD}}>τ</b> = tiempo al 63.2%</div>
            <div><b style={{color:TL5.indigoD}}>K</b> = ΔPV / ΔCV</div>
          </div>
        </div>
      </div>
    </SceneM5>
  );
}

function S_ZN({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    { c: 'P', kp: 'τ/(K·θ)', ti: '∞', td: '0' },
    { c: 'PI', kp: '0.9·τ/(K·θ)', ti: '3.33·θ', td: '0' },
    { c: 'PID', kp: '1.2·τ/(K·θ)', ti: '2·θ', td: '0.5·θ' },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Método 2 · Ziegler-Nichols (lazo abierto)" y="10%" />
      <CapM5 start={s + 0.6} dur={2.0} size={44} weight={700} y="19%" width={1500}>Del modelo FOPDT a los parámetros, con fórmula.</CapM5>
      <div style={{position:'absolute', left:280, top:'34%', width:760}}>
        <div style={{display:'grid', gridTemplateColumns:'0.6fr 1.4fr 1fr 1fr', fontFamily:MONO5, fontSize:15, letterSpacing:'0.1em', textTransform:'uppercase', color:TL5.dim, padding:'0 24px 12px'}}>
          <span>Tipo</span><span>Kp</span><span>Ti</span><span>Td</span>
        </div>
        {rows.map((r,i)=>{
          const ap = pop5(t, s+1.2+i*0.35, 0.5, 14);
          return <div key={i} style={{display:'grid', gridTemplateColumns:'0.6fr 1.4fr 1fr 1fr', alignItems:'center', padding:'20px 24px', marginBottom:10, background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderLeft:`4px solid ${i===2?TL5.amber:TL5.indigo}`, borderRadius:12, boxShadow:TL5.shadowSm, opacity:ap.op, transform:`translateY(${ap.ty}px)`}}>
            <span style={{fontFamily:DISP5, fontSize:26, fontWeight:700, color:TL5.ink}}>{r.c}</span>
            <span style={{fontFamily:MONO5, fontSize:21, color:TL5.indigoD}}>{r.kp}</span>
            <span style={{fontFamily:MONO5, fontSize:21, color:TL5.mut}}>{r.ti}</span>
            <span style={{fontFamily:MONO5, fontSize:21, color:TL5.mut}}>{r.td}</span>
          </div>;
        })}
      </div>
      <div style={{position:'absolute', right:'6%', top:'36%', width:480, opacity:clamp((t-(s+2.6))/0.6,0,1)}}>
        <div style={{background:TL5.indigoWash, border:`1px solid ${TL5.indigoLt}`, borderRadius:12, padding:'22px 28px'}}>
          <div style={{fontFamily:MONO5, fontSize:14, letterSpacing:'0.14em', color:TL5.indigoD, textTransform:'uppercase'}}>Ejemplo · PID</div>
          <div style={{fontFamily:MONO5, fontSize:18, color:TL5.ink, lineHeight:1.7, marginTop:8}}>K=0.5, θ=8s, τ=45s<br/>Kp = 1.2·45/(0.5·8) = <b style={{color:TL5.indigoD}}>13.5</b><br/>Ti = 2·8 = <b style={{color:TL5.indigoD}}>16 s</b><br/>Td = 0.5·8 = <b style={{color:TL5.indigoD}}>4 s</b></div>
        </div>
        <div style={{marginTop:16, background:TL5.amberWash, border:`1px solid ${TL5.amber}`, borderRadius:12, padding:'16px 24px', opacity:clamp((t-(s+3.4))/0.6,0,1)}}>
          <div style={{fontFamily:DISP5, fontSize:18, color:TL5.ink, lineHeight:1.4}}>Z-N es agresivo (~25% sobrepaso). En campo: baja Kp al 60–70% y sube Ti.</div>
        </div>
      </div>
    </SceneM5>
  );
}

function S_Manual({ start, dur }) {
  const t = useTime(); const s = start;
  const rules = [
    { sym: 'Lenta', fix: 'Sube Kp · baja Ti', acc: TL5.indigo },
    { sym: 'Oscila', fix: 'Baja Kp · sube Ti · sube Td', acc: TL5.red },
    { sym: 'Offset', fix: 'Baja Ti (más integral)', acc: TL5.amberD },
    { sym: 'Sobrepaso', fix: 'Sube Td · baja Kp un poco', acc: TL5.indigoD },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Método 4 · ajuste manual guiado" y="12%" />
      <CapM5 start={s + 0.6} dur={2.0} size={46} weight={700} y="21%" width={1500}>El método de campo: diagnóstico → acción.</CapM5>
      {rules.map((r,i)=>{
        const ap = pop5(t, s+1.2+i*0.35, 0.5, 16);
        return (
          <div key={i} style={{position:'absolute', left: i<2?320:1010, top: 410 + (i%2)*150, width:580, opacity:ap.op, transform:`translateY(${ap.ty}px)`, display:'flex', alignItems:'center', gap:20}}>
            <div style={{minWidth:170, padding:'14px 18px', background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderRadius:10, fontFamily:DISP5, fontSize:24, fontWeight:700, color:r.acc, textAlign:'center', boxShadow:TL5.shadowSm}}>Si {r.sym}</div>
            <span style={{fontFamily:MONO5, fontSize:18, color:TL5.dim}}>→</span>
            <div style={{fontFamily:DISP5, fontSize:22, color:TL5.ink, fontWeight:500}}>{r.fix}</div>
          </div>
        );
      })}
    </SceneM5>
  );
}

const SCENES_M5C5 = [
  { C: (p) => <TitleCardM5 {...p} claseNo={5} title="Sintonización de PID" dudur="20–22 min" objetivo="Los métodos reales para hallar Kp, Ti y Td: escalón en lazo abierto, Ziegler-Nichols y el ajuste manual de campo." />, dur: 7, label: 'Apertura' },
  { C: S_Criteria, dur: 14, label: 'Criterios' },
  { C: S_StepTest, dur: 15, label: 'Prueba de escalón' },
  { C: S_ZN, dur: 14, label: 'Ziegler-Nichols' },
  { C: S_Manual, dur: 12, label: 'Ajuste manual' },
  { C: (p) => <ClosingM5 {...p} line="Sintonizar es parte ciencia, parte arte: un buen modelo te acerca; la intuición de campo te lleva al punto." activity="Recibe 3 curvas de escalón (caudal, temperatura, nivel), identifica K, θ y τ, calcula los PID con Z-N y predice la respuesta en lazo cerrado." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M5C5 = SCENES_M5C5;
