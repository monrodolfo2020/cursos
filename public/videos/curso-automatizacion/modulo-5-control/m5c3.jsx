// m5c3.jsx — "Control ON/OFF: fundamentos, ventajas y limitaciones"
// After m5-lib.jsx. Exports SCENES_M5C3.

// Animated hysteresis sawtooth: PV oscillates between SP±H while actuator toggles.
function HysteresisPlot({ x, y, w, h, t, s, H = 0.16, sp = 0.5 }) {
  const lt = Math.max(0, t - s);
  // build a triangle-ish wave that rises when ON, falls when OFF, with hysteresis band
  const top = sp + H, bot = sp - H;
  const period = 2.6; // seconds per cycle visually
  const reveal = clamp(lt / 7, 0, 1);
  const px = (u) => x + u * w;
  const py = (v) => y + h - v * h;
  const pts = [];
  const states = []; // for ON/OFF shading
  let v = bot, dir = 1, on = true;
  const N = 320;
  for (let i = 0; i <= N * reveal; i++) {
    const u = i / N;
    // rise slower than fall to mimic heating/cooling asymmetry
    const rate = dir > 0 ? 0.9 : -1.1;
    v += rate / (N / 6);
    if (v >= top) { v = top; dir = -1; on = false; }
    if (v <= bot) { v = bot; dir = 1; on = true; }
    pts.push(`${px(u).toFixed(1)},${py(v).toFixed(1)}`);
    states.push(on);
  }
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={TL5.paper} stroke={TL5.lineS} strokeWidth="1.6" />
      {/* hysteresis band */}
      <rect x={x} y={py(top)} width={w} height={py(bot) - py(top)} fill={TL5.indigoWash} opacity="0.6" />
      <line x1={x} y1={py(sp)} x2={x + w} y2={py(sp)} stroke={TL5.amber} strokeWidth="2.2" strokeDasharray="9 7" />
      <text x={x + w - 8} y={py(sp) - 8} fill={TL5.amberD} fontFamily={MONO5} fontSize="15" fontWeight="600" textAnchor="end">SP</text>
      <line x1={x} y1={py(top)} x2={x + w} y2={py(top)} stroke={TL5.indigoD} strokeWidth="1.4" strokeDasharray="4 5" opacity="0.7" />
      <line x1={x} y1={py(bot)} x2={x + w} y2={py(bot)} stroke={TL5.indigoD} strokeWidth="1.4" strokeDasharray="4 5" opacity="0.7" />
      <text x={x + 8} y={py(top) - 6} fill={TL5.indigoD} fontFamily={MONO5} fontSize="13">apaga (SP+½ΔH)</text>
      <text x={x + 8} y={py(bot) + 18} fill={TL5.indigoD} fontFamily={MONO5} fontSize="13">enciende (SP−½ΔH)</text>
      <polyline points={pts.join(' ')} fill="none" stroke={TL5.indigo} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <text x={x + w / 2} y={y + h + 28} fill={TL5.mut} fontFamily={MONO5} fontSize="15" textAnchor="middle">tiempo →</text>
    </g>
  );
}

function S_What({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  const on = Math.sin(lt * 2.4) > 0;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Todo o nada · bang-bang" y="13%" />
      <CapM5 start={s + 0.6} dur={2.2} size={50} weight={700} y="23%" width={1500}>Solo dos estados: <span style={{color:on?TL5.ok:TL5.mut}}>ON</span> o <span style={{color:TL5.mut}}>OFF</span>.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <g opacity={clamp((t-(s+1.4))/0.5,0,1)}>
          <rect x={760} y={450} width={400} height={150} rx="16" fill={on?TL5.indigoWash:'rgba(160,164,200,0.12)'} stroke={on?TL5.indigo:TL5.lineS} strokeWidth="3" />
          <circle cx={840} cy={525} r="34" fill={on?TL5.ok:TL5.dim} />
          <text x={1010} y={538} fill={on?TL5.indigoD:TL5.mut} fontFamily={DISP5} fontSize="58" fontWeight="700" textAnchor="middle">{on?'ON':'OFF'}</text>
        </g>
      </svg>
      <CapM5 start={s + 4.2} dur={dur - 4.5} size={26} weight={500} color={TL5.mut} y="72%" width={1500}>Si PV &lt; SP → ON. Si PV &gt; SP → OFF. Sin posiciones intermedias.</CapM5>
    </SceneM5>
  );
}

function S_Hyst({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="La banda de histéresis" y="8%" />
      <CapM5 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1600}>Sin banda muerta, el actuador conmutaría <span style={{color:TL5.red}}>miles de veces</span> por minuto.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <HysteresisPlot x={250} y={340} w={840} h={420} t={t} s={s + 1.0} />
      </svg>
      <div style={{position:'absolute', right:'7%', top:'36%', width:480}}>
        <div style={{background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderLeft:`4px solid ${TL5.indigo}`, borderRadius:12, boxShadow:TL5.shadowSm, padding:'24px 28px'}}>
          <div style={{fontFamily:MONO5, fontSize:14, letterSpacing:'0.14em', color:TL5.dim, textTransform:'uppercase'}}>Ejemplo SP = 80°C, ΔH = ±1°C</div>
          <div style={{fontFamily:DISP5, fontSize:26, fontWeight:700, color:TL5.ink, marginTop:8, lineHeight:1.25}}>Apaga a 81°C · enciende a 79°C</div>
          <div style={{fontFamily:DISP5, fontSize:19, color:TL5.mut, marginTop:8, lineHeight:1.4}}>La PV oscila entre 79 y 81 → ciclos lentos que protegen el actuador.</div>
        </div>
        <div style={{marginTop:20, background:TL5.amberWash, border:`1px solid ${TL5.amber}`, borderRadius:12, padding:'20px 28px', opacity:clamp((t-(s+4.5))/0.6,0,1)}}>
          <div style={{fontFamily:MONO5, fontSize:22, color:TL5.amberD, fontWeight:600}}>DC = t_ON / T_ciclo × 100%</div>
          <div style={{fontFamily:DISP5, fontSize:18, color:TL5.ink, marginTop:6}}>El ciclo de trabajo revela si el SP encaja con la capacidad del actuador.</div>
        </div>
      </div>
    </SceneM5>
  );
}

function S_When({ start, dur }) {
  const t = useTime(); const s = start;
  const ok = ['Calefacción de locales', 'Agua caliente sanitaria', 'Llenado de cisternas (switches)', 'Alarmas de proceso'];
  const no = ['Reactores y pasteurizadores', 'Control de caudal o presión', 'Calidad de producto crítica', 'Vida del actuador crítica'];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="¿Cuándo basta? ¿Cuándo no?" y="11%" />
      <CapM5 start={s + 0.6} dur={2.2} size={48} weight={700} y="20%" width={1500}>Suficiente con baja precisión; inadecuado para procesos finos.</CapM5>
      {[{title:'Apropiado', items:ok, acc:TL5.ok, x:280, sign:'✓'},
        {title:'Inapropiado', items:no, acc:TL5.red, x:1020, sign:'✕'}].map((col,ci)=>{
        const ap = pop5(t, s+1.2+ci*0.3, 0.5, 18);
        return (
          <div key={ci} style={{position:'absolute', left:col.x, top:400, width:620, opacity:ap.op, transform:`translateY(${ap.ty}px)`}}>
            <div style={{fontFamily:DISP5, fontSize:30, fontWeight:700, color:col.acc, marginBottom:16}}>{col.title}</div>
            {col.items.map((it,i)=>{
              const a2 = pop5(t, s+1.6+ci*0.3+i*0.18, 0.4, 10);
              return <div key={i} style={{display:'flex', alignItems:'center', gap:14, padding:'14px 20px', marginBottom:10, background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderRadius:10, boxShadow:TL5.shadowSm, opacity:a2.op, transform:`translateY(${a2.ty}px)`}}>
                <span style={{width:30, height:30, borderRadius:'50%', background:ci===0?'rgba(34,160,107,0.14)':TL5.redWash, color:col.acc, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:DISP5, fontWeight:700, fontSize:18, flexShrink:0}}>{col.sign}</span>
                <span style={{fontFamily:DISP5, fontSize:21, color:TL5.ink}}>{it}</span>
              </div>;
            })}
          </div>
        );
      })}
    </SceneM5>
  );
}

const SCENES_M5C3 = [
  { C: (p) => <TitleCardM5 {...p} claseNo={3} title="Control ON/OFF e histéresis" dudur="14–16 min" objetivo="El control de dos posiciones, la banda muerta que protege al actuador y dónde es suficiente o inadecuado." />, dur: 7, label: 'Apertura' },
  { C: S_What, dur: 11, label: 'Dos posiciones' },
  { C: S_Hyst, dur: 15, label: 'Histéresis' },
  { C: S_When, dur: 13, label: 'Aplicaciones' },
  { C: (p) => <ClosingM5 {...p} line="El ON/OFF nunca llega exactamente al SP: oscila dentro de la banda. Para precisión, hace falta el PID." activity="Diseña el control ON/OFF de una cisterna con dos bombas: switches, puntos de activación, secuencia de arranque y diagrama de flujo." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M5C3 = SCENES_M5C3;
