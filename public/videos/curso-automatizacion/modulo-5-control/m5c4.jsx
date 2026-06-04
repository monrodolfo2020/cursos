// m5c4.jsx — "Control PID: Proporcional, Integral y Derivativo desde cero"
// After m5-lib.jsx. Exports SCENES_M5C4.

// Step responses (normalized, u=0..1 of horizontal time)
function respP(u)  { const ss = 0.74; return ss * (1 - Math.exp(-4.5 * u)); }            // P: offset (settles below SP)
function respPI(u) { const wn=5.5,z=0.55; if(u<=0)return 0; const wd=wn*Math.sqrt(1-z*z); return 1-Math.exp(-z*wn*u)*(Math.cos(wd*u)+(z*wn/wd)*Math.sin(wd*u)); } // PI: reaches SP w/ small overshoot
function respPID(u){ const wn=6.5,z=0.85; if(u<=0)return 0; const wd=wn*Math.sqrt(1-z*z); return 1-Math.exp(-z*wn*u)*(Math.cos(wd*u)+(z*wn/wd)*Math.sin(wd*u)); } // PID: fast, minimal overshoot

function S_Why({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="El algoritmo más usado de la industria" y="20%" />
      <CapM5 start={s + 0.7} dur={dur - 1.0} size={60} weight={700} y="42%" width={1500}>Más del 90% de los lazos industriales usan PID.</CapM5>
      <StatM5 x={760} y={680} value="90%+" label="de los lazos de control" accent={TL5.indigo} appear={s + 1.6} t={t} align="center" />
      <CapM5 start={s + 2.6} dur={dur - 2.9} size={26} weight={500} color={TL5.mut} y="80%" width={1400}>Mantiene la variable exactamente en el setpoint, con mínima oscilación.</CapM5>
    </SceneM5>
  );
}

function S_Terms({ start, dur }) {
  const t = useTime(); const s = start;
  const terms = [
    { L: 'P', name: 'Proporcional', sub: 'Reacciona al error actual. Rápido, pero deja un offset permanente.', acc: TL5.indigo },
    { L: 'I', name: 'Integral', sub: 'Acumula el error pasado. Elimina el offset. Tiene "memoria".', acc: TL5.amber },
    { L: 'D', name: 'Derivativo', sub: 'Anticipa la tendencia del error. Frena el sobrepaso. Sensible al ruido.', acc: TL5.indigoD },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Tres términos, tres trabajos" y="11%" />
      <CapM5 start={s + 0.6} dur={2.2} size={48} weight={700} y="20%" width={1500}>Pasado, presente y futuro del error.</CapM5>
      {terms.map((tm, i) => {
        const ap = pop5(t, s + 1.2 + i * 0.5, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: 250 + i * 490, top: 420, width: 440, height: 340, opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 14, border: `1px solid ${TL5.lineS}`, background: TL5.paper, boxShadow: TL5.shadow, padding: '30px 28px', overflow: 'hidden' }}>
              <div style={{ fontFamily: DISP5, fontSize: 92, fontWeight: 700, color: tm.acc, lineHeight: 0.9, opacity: 0.9 }}>{tm.L}</div>
              <div style={{ fontFamily: DISP5, fontSize: 30, fontWeight: 700, color: TL5.ink, marginTop: 8 }}>{tm.name}</div>
              <div style={{ fontFamily: DISP5, fontSize: 19, fontWeight: 400, color: TL5.mut, marginTop: 10, lineHeight: 1.4 }}>{tm.sub}</div>
              <div style={{ position: 'absolute', right: -10, bottom: -30, fontFamily: DISP5, fontSize: 200, fontWeight: 700, color: tm.acc, opacity: 0.06 }}>{tm.L}</div>
            </div>
          </div>
        );
      })}
      <CapM5 start={s + 3.4} dur={dur - 3.7} size={28} weight={500} mono color={TL5.indigoD} y="80%" width={1500}>u(t) = Kp · [ e + (1/Ti)∫e dt + Td · de/dt ]</CapM5>
    </SceneM5>
  );
}

function S_Build({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  // sequentially reveal P, then PI, then PID
  const revP = clamp((lt - 0.8) / 2.0, 0, 1);
  const revPI = clamp((lt - 3.6) / 2.0, 0, 1);
  const revPID = clamp((lt - 6.6) / 2.0, 0, 1);
  const phase = lt < 3.6 ? 0 : (lt < 6.6 ? 1 : 2);
  const series = [];
  series.push({ fn: respP, color: TL5.indigo, width: 4, dash: phase>0?'3 6':undefined, label: phase===0?'P puro':'' });
  if (revPI > 0) series.push({ fn: respPI, color: TL5.amber, width: 4, dash: phase>1?'3 6':undefined, label: phase===1?'PI':'' });
  if (revPID > 0) series.push({ fn: respPID, color: TL5.indigoD, width: 5, label: phase===2?'PID':'' });
  const reveal = Math.max(revP, revPI, revPID);
  const notes = [
    { t: 'P puro', d: 'Responde rápido pero se queda corto: queda un offset.', c: TL5.indigo },
    { t: '+ Integral', d: 'La memoria del integrador empuja hasta borrar el offset.', c: TL5.amberD },
    { t: '+ Derivativo', d: 'Frena la subida: llega al SP con mínimo sobrepaso.', c: TL5.indigoD },
  ];
  const note = notes[phase];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Construyendo el PID, término a término" y="8%" />
      <CapM5 start={s + 0.6} dur={1.8} size={42} weight={600} y="15%" width={1600}>Mira qué aporta cada término a la respuesta.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <ChartM5 x={250} y={330} w={820} h={440} t={t} reveal={reveal} sp={1.0} spLabel="SP" series={series} />
        {/* offset bracket for P */}
        {phase >= 0 && revP > 0.9 && phase === 0 && (
          <g opacity={clamp((revP-0.9)/0.1,0,1)}>
            <line x1={1075} y1={330 + 440 - 0.74 * 440} x2={1075} y2={330} stroke={TL5.red} strokeWidth="2" strokeDasharray="5 5" />
            <text x={1090} y={330 + 440 - 0.87 * 440} fill={TL5.red} fontFamily={MONO5} fontSize="16" fontWeight="600">offset</text>
          </g>
        )}
      </svg>
      <div style={{position:'absolute', right:'7%', top:'40%', width:470, opacity:clamp((lt-1.2)/0.5,0,1)}}>
        <div key={phase} style={{background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderLeft:`4px solid ${note.c}`, borderRadius:12, boxShadow:TL5.shadowSm, padding:'26px 30px'}}>
          <div style={{fontFamily:DISP5, fontSize:32, fontWeight:700, color:note.c}}>{note.t}</div>
          <div style={{fontFamily:DISP5, fontSize:21, color:TL5.ink, marginTop:10, lineHeight:1.4}}>{note.d}</div>
        </div>
      </div>
    </SceneM5>
  );
}

function S_Car({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    { L: 'P', txt: '«Voy a 90, faltan 10 → piso el acelerador en proporción.»', acc: TL5.indigo },
    { L: 'I', txt: '«Llevo rato sin llegar a 100 → piso un poco más cada segundo.»', acc: TL5.amber },
    { L: 'D', txt: '«Voy a 95 y subiendo rápido → suelto antes de pasarme.»', acc: TL5.indigoD },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="La analogía del conductor" y="11%" />
      <CapM5 start={s + 0.6} dur={2.2} size={46} weight={600} y="21%" width={1500}>Mantener <span style={{color:TL5.indigoD}}>100 km/h</span> en una carretera con subidas y bajadas.</CapM5>
      {rows.map((r, i) => {
        const ap = pop5(t, s + 1.3 + i * 0.5, 0.5, 18);
        return (
          <div key={i} style={{ position: 'absolute', left: 360, top: 410 + i * 130, width: 1200, opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 28 }}>
            <div style={{ width: 84, height: 84, borderRadius: 18, background: r.acc, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISP5, fontSize: 46, fontWeight: 700, flexShrink: 0, boxShadow: TL5.shadowSm }}>{r.L}</div>
            <div style={{ fontFamily: DISP5, fontSize: 30, fontWeight: 500, color: TL5.ink, lineHeight: 1.3 }}>{r.txt}</div>
          </div>
        );
      })}
    </SceneM5>
  );
}

function S_Table({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    { p: 'Kp ↑', vel: 'Más rápida', est: 'Menor', off: 'Menor' },
    { p: 'Ti ↓ (más I)', vel: 'Más rápida', est: 'Menor', off: 'Se elimina' },
    { p: 'Td ↑ (más D)', vel: 'Algo más', est: 'Mayor', off: 'Sin efecto' },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="El efecto de cada parámetro" y="14%" />
      <CapM5 start={s + 0.6} dur={2.0} size={46} weight={700} y="24%" width={1500}>Qué pasa al subir cada ganancia.</CapM5>
      <div style={{position:'absolute', left:'50%', top:'40%', transform:'translateX(-50%)', width:1300}}>
        <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap:0, fontFamily:MONO5, fontSize:15, letterSpacing:'0.1em', textTransform:'uppercase', color:TL5.dim, padding:'0 0 14px'}}>
          <span>Parámetro</span><span>Velocidad</span><span>Estabilidad</span><span>Offset</span>
        </div>
        {rows.map((r,i)=>{
          const ap = pop5(t, s+1.2+i*0.4, 0.5, 16);
          return <div key={i} style={{display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', alignItems:'center', gap:0, padding:'22px 24px', marginBottom:12, background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderLeft:`4px solid ${[TL5.indigo,TL5.amber,TL5.indigoD][i]}`, borderRadius:12, boxShadow:TL5.shadowSm, opacity:ap.op, transform:`translateY(${ap.ty}px)`}}>
            <span style={{fontFamily:DISP5, fontSize:28, fontWeight:700, color:TL5.ink}}>{r.p}</span>
            <span style={{fontFamily:DISP5, fontSize:22, color:TL5.mut}}>{r.vel}</span>
            <span style={{fontFamily:DISP5, fontSize:22, color:TL5.mut}}>{r.est}</span>
            <span style={{fontFamily:DISP5, fontSize:22, fontWeight:600, color:r.off==='Se elimina'?TL5.ok:TL5.ink}}>{r.off}</span>
          </div>;
        })}
      </div>
    </SceneM5>
  );
}

const SCENES_M5C4 = [
  { C: (p) => <TitleCardM5 {...p} claseNo={4} title="Control PID desde cero" dudur="22–25 min" objetivo="El significado físico de P, I y D, cómo cada término moldea la respuesta y cuándo activar o desactivar cada uno." />, dur: 7, label: 'Apertura' },
  { C: S_Why, dur: 10, label: '¿Por qué PID?' },
  { C: S_Terms, dur: 12, label: 'P · I · D' },
  { C: S_Build, dur: 17, label: 'Construyendo el PID' },
  { C: S_Car, dur: 12, label: 'Analogía del conductor' },
  { C: S_Table, dur: 12, label: 'Efecto de parámetros' },
  { C: (p) => <ClosingM5 {...p} line="P responde al ahora, I recuerda el pasado, D anticipa el futuro. Juntos llevan la PV al SP sin offset." activity="Recibe 4 curvas de respuesta, identifica el tipo de controlador (P, PI, PD, PID), diagnostica el problema y propón qué parámetro ajustar." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M5C4 = SCENES_M5C4;
