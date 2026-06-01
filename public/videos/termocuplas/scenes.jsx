// scenes.jsx — The 7 scenes for the RTD PT100 video.
// Depends on animations.jsx + lib.jsx globals.

const C = COLORS, F = FONT;

// Shared numeric readout
function Readout({ value, unit, color, size = 64, x, y, align = 'left', label }) {
  return (
    <div style={{ position:'absolute', left:x, top:y,
      transform: align==='center'?'translateX(-50%)':align==='right'?'translateX(-100%)':'none',
      textAlign: align, fontFamily:F.mono }}>
      {label && <div style={{ fontSize:16, letterSpacing:'0.18em', color:C.inkMute,
        textTransform:'uppercase', marginBottom:8 }}>{label}</div>}
      <div style={{ fontSize:size, fontWeight:500, color, lineHeight:1, fontVariantNumeric:'tabular-nums' }}>
        {value}<span style={{ fontSize:size*0.42, color:C.inkMute, marginLeft:8 }}>{unit}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────── Scene 1: Intro
function SceneIntro() {
  const intro = useBeat(0.3, 1.4, Easing.easeOutCubic);
  const line  = useBeat(1.0, 1.9);
  const sub   = useBeat(1.4, 2.2, Easing.easeOutCubic);
  const tag   = useBeat(2.4, 3.2, Easing.easeOutCubic);
  const { opacity } = useFade({ entry: 0.4, exit: 0.6 });
  return (
    <div style={{ position:'absolute', inset:0, opacity }}>
      <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)',
        textAlign:'center', width:1400 }}>
        <div style={{ fontFamily:F.mono, fontSize:20, letterSpacing:'0.4em', color:C.cyan,
          textTransform:'uppercase', opacity:intro, marginBottom:28,
          transform:`translateY(${(1-intro)*14}px)` }}>
          Sensores de temperatura
        </div>
        <div style={{ fontFamily:F.display, fontWeight:700, fontSize:200, color:C.ink,
          letterSpacing:'-0.03em', lineHeight:0.9,
          opacity:intro, transform:`translateY(${(1-intro)*24}px) scale(${0.94+0.06*intro})` }}>
          RTD <span style={{ color:C.cyan }}>PT100</span>
        </div>
        <div style={{ height:2, background:C.cyan, margin:'34px auto 0',
          width: `${line*520}px`, boxShadow:`0 0 14px ${C.cyan}` }} />
        <div style={{ fontFamily:F.display, fontWeight:400, fontSize:42, color:C.ink,
          marginTop:34, opacity:sub, transform:`translateY(${(1-sub)*12}px)` }}>
          Detector de Temperatura por Resistencia
        </div>
        <div style={{ fontFamily:F.mono, fontSize:22, color:C.inkMute, marginTop:22, letterSpacing:'0.08em',
          opacity:tag, transform:`translateY(${(1-tag)*10}px)` }}>
          ¿Qué es · por qué “PT” · por qué “100” · conexión a 3 hilos?
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────── Scene 2: principio resistivo
function SceneWhatIsRTD() {
  const head = useBeat(0.4, 1.3, Easing.easeOutCubic);
  // temperature sweep 0 -> 160 °C over the scene
  const sweep = useBeat(2.0, 9.0, Easing.easeInOutSine);
  const T = sweep * 160;
  const R = rOfT(T);
  const heat = clamp(T / 160, 0, 1);
  const cap = useBeat(9.6, 10.6, Easing.easeOutCubic);

  // resistor color warms with heat
  const resStroke = `color-mix(in oklch, ${C.cyan}, ${C.amber} ${Math.round(heat*70)}%)`;

  return (
    <div style={{ position:'absolute', inset:0 }}>
      <Kicker n="01" label="¿Qué es una RTD?" />
      <Fade entry={0.5} exit={0.5} style={{ position:'absolute', left:64, top:206, width:1100 }}>
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:62, color:C.ink,
          letterSpacing:'-0.02em', lineHeight:1.05, opacity:head, transform:`translateY(${(1-head)*16}px)` }}>
          La resistencia eléctrica del metal<br/>cambia con la temperatura.
        </div>
      </Fade>

      {/* Thermometer (amber) */}
      <div style={{ position:'absolute', left:300, top:560 }}>
        <svg width="120" height="380" style={{ overflow:'visible' }}>
          <rect x="44" y="10" width="32" height="300" rx="16" fill="none" stroke={C.inkFaint} strokeWidth="3"/>
          <circle cx="60" cy="330" r="34" fill="none" stroke={C.inkFaint} strokeWidth="3"/>
          <circle cx="60" cy="330" r="24" fill={C.amber} style={{ filter:`drop-shadow(0 0 12px ${C.amber})` }}/>
          <rect x="52" y={310 - heat*290} width="16" height={20 + heat*290} rx="8" fill={C.amber}
            style={{ filter:`drop-shadow(0 0 10px ${C.amber})` }}/>
        </svg>
        <div style={{ fontFamily:F.mono, fontSize:18, color:C.inkMute, textAlign:'center',
          marginTop:6, letterSpacing:'0.1em' }}>CALOR</div>
      </div>
      <Readout label="Temperatura" value={T.toFixed(0)} unit="°C" color={C.amber}
        x={470} y={600} size={72} />

      {/* Resistor element */}
      <svg width="520" height="120" style={{ position:'absolute', left:760, top:700, overflow:'visible' }}>
        <path d={resistorPath(20, 60, 480, 26, 7)} fill="none" stroke={resStroke} strokeWidth="5"
          strokeLinejoin="round" strokeLinecap="round"
          style={{ filter:`drop-shadow(0 0 ${6+heat*12}px ${resStroke})` }}/>
        <circle cx="20" cy="60" r="7" fill={C.cyan}/>
        <circle cx="500" cy="60" r="7" fill={C.cyan}/>
      </svg>
      <div style={{ position:'absolute', left:1000, top:660, transform:'translateX(-50%)',
        fontFamily:F.mono, fontSize:18, color:C.inkMute, letterSpacing:'0.12em' }}>
        ELEMENTO DE PLATINO
      </div>

      {/* Resistance readout */}
      <Readout label="Resistencia" value={R.toFixed(1)} unit="Ω" color={C.cyan}
        x={1620} y={600} size={72} align="right" />

      {/* relation caption */}
      <div style={{ position:'absolute', left:'50%', bottom:150, transform:'translateX(-50%)',
        fontFamily:F.display, fontWeight:500, fontSize:40, color:C.ink, opacity:cap,
        display:'flex', alignItems:'center', gap:20 }}>
        <span style={{ color:C.amber }}>Más temperatura</span>
        <span style={{ color:C.inkMute, fontSize:34 }}>⟶</span>
        <span style={{ color:C.cyan }}>más resistencia</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────── Scene 3: por qué PT100
function NameCard({ x, big, sub, detail, color, beat }) {
  return (
    <div style={{ position:'absolute', left:x, top:340, width:640, opacity:beat,
      transform:`translateY(${(1-beat)*20}px)` }}>
      <div style={{ border:`1.5px solid ${C.gridMajor}`, borderRadius:14, padding:'46px 48px',
        background:'rgba(8,17,32,0.6)' }}>
        {big}
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:40, color:C.ink, marginTop:10 }}>{sub}</div>
        <div style={{ fontFamily:F.mono, fontSize:21, color:C.inkMute, marginTop:18, lineHeight:1.6,
          letterSpacing:'0.02em' }}>{detail}</div>
      </div>
    </div>
  );
}

function ScenePT100() {
  const head = useBeat(0.4, 1.2, Easing.easeOutCubic);
  const cardPt = useBeat(1.4, 2.3, Easing.easeOutCubic);
  const card100 = useBeat(2.6, 3.5, Easing.easeOutCubic);
  return (
    <div style={{ position:'absolute', inset:0 }}>
      <Kicker n="02" label="¿Por qué se llama PT100?" />
      <Fade entry={0.5} exit={0.5} style={{ position:'absolute', left:64, top:206 }}>
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:62, color:C.ink,
          letterSpacing:'-0.02em', opacity:head }}>
          El nombre lo dice todo: <span style={{ color:C.platinum }}>PT</span>
          <span style={{ color:C.inkMute }}> + </span><span style={{ color:C.cyan }}>100</span>
        </div>
      </Fade>

      <NameCard x={130} beat={cardPt} color={C.platinum}
        big={
          <div style={{ display:'flex', alignItems:'flex-end', gap:24 }}>
            <div style={{ border:`2px solid ${C.platinum}`, borderRadius:12, padding:'14px 18px 10px',
              minWidth:150, background:'rgba(207,217,226,0.06)' }}>
              <div style={{ fontFamily:F.mono, fontSize:20, color:C.inkMute, textAlign:'right' }}>78</div>
              <div style={{ fontFamily:F.display, fontWeight:700, fontSize:88, color:C.platinum, lineHeight:0.9 }}>Pt</div>
            </div>
            <div style={{ fontFamily:F.display, fontWeight:700, fontSize:60, color:C.platinum, paddingBottom:10 }}>
              Platino
            </div>
          </div>
        }
        sub="El elemento sensor"
        detail={<>Metal noble, estable y muy repetible.{'\n'}Su resistencia sube de forma{'\n'}casi perfectamente lineal con T.</>}
      />

      <NameCard x={1150} beat={card100} color={C.cyan}
        big={
          <div style={{ display:'flex', alignItems:'baseline', gap:14 }}>
            <div style={{ fontFamily:F.display, fontWeight:700, fontSize:120, color:C.cyan, lineHeight:0.9 }}>100</div>
            <div style={{ fontFamily:F.display, fontWeight:500, fontSize:56, color:C.inkMute }}>Ω</div>
          </div>
        }
        sub="La resistencia de referencia"
        detail={<><span style={{ color:C.cyan }}>R₀ = 100 Ω</span> exactamente{'\n'}a <span style={{ color:C.amber }}>0 °C</span>.{'\n'}Es el punto de partida de la curva.</>}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────── Scene 4: curva R vs T
// plot mapping
const GX0 = 660, GX1 = 1500, GY0 = 820, GY1 = 320;   // pixel box
const TMIN = 0, TMAX = 200, RMIN = 100, RMAX = 180;
const mapX = (t) => GX0 + (t - TMIN) / (TMAX - TMIN) * (GX1 - GX0);
const mapY = (r) => GY0 - (r - RMIN) / (RMAX - RMIN) * (GY0 - GY1);

function SceneCurve() {
  const head   = useBeat(0.3, 1.1, Easing.easeOutCubic);
  const axes   = useBeat(0.8, 2.0);
  const formula= useBeat(2.2, 3.2, Easing.easeOutCubic);
  const draw   = useBeat(3.2, 6.0);
  const sweepT = useBeat(6.2, 13.5, Easing.easeInOutSine);   // dot sweep
  const T = sweepT * TMAX;
  const R = rOfT(T);
  const showP1 = useBeat(7.0, 7.8, Easing.easeOutBack);      // 0°C marker
  const showP2 = useBeat(10.6, 11.4, Easing.easeOutBack);    // 100°C marker
  const linealTag = useBeat(14.0, 15.0, Easing.easeOutCubic);

  const tline = `M ${mapX(0)} ${mapY(rOfT(0))} L ${mapX(TMAX)} ${mapY(rOfT(TMAX))}`;

  const vt = [0,50,100,150,200], hr=[100,120,140,160,180];

  return (
    <div style={{ position:'absolute', inset:0 }}>
      <Kicker n="03" label="La curva: Resistencia vs. Temperatura" />
      <Fade entry={0.5} exit={0.5} style={{ position:'absolute', left:64, top:206 }}>
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:58, color:C.ink,
          letterSpacing:'-0.02em', opacity:head }}>
          Una recta: predecible y fácil de calibrar.
        </div>
      </Fade>

      {/* Formula panel */}
      <div style={{ position:'absolute', left:120, top:430, width:420, opacity:formula,
        transform:`translateY(${(1-formula)*16}px)` }}>
        <div style={{ fontFamily:F.mono, fontSize:18, color:C.inkMute, letterSpacing:'0.16em',
          textTransform:'uppercase', marginBottom:18 }}>Ecuación</div>
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:58, color:C.ink, letterSpacing:'0.01em' }}>
          R = R₀<span style={{ color:C.inkMute }}>(</span>1 + α·T<span style={{ color:C.inkMute }}>)</span>
        </div>
        <div style={{ fontFamily:F.mono, fontSize:21, color:C.inkMute, marginTop:26, lineHeight:1.9 }}>
          <div>R₀ = <span style={{ color:C.cyan }}>100 Ω</span>  (a 0 °C)</div>
          <div>α &nbsp;= <span style={{ color:C.amber }}>0,00385</span> /°C</div>
        </div>
        {/* live readout */}
        <div style={{ marginTop:40, borderTop:`1px solid ${C.gridMajor}`, paddingTop:24,
          display:'flex', gap:40 }}>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:15, color:C.inkMute, letterSpacing:'0.14em' }}>T</div>
            <div style={{ fontFamily:F.mono, fontSize:44, color:C.amber, fontVariantNumeric:'tabular-nums' }}>
              {T.toFixed(0)}<span style={{ fontSize:24, color:C.inkMute }}> °C</span></div>
          </div>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:15, color:C.inkMute, letterSpacing:'0.14em' }}>R</div>
            <div style={{ fontFamily:F.mono, fontSize:44, color:C.cyan, fontVariantNumeric:'tabular-nums' }}>
              {R.toFixed(1)}<span style={{ fontSize:24, color:C.inkMute }}> Ω</span></div>
          </div>
        </div>
      </div>

      {/* Graph */}
      <svg width="1920" height="1080" style={{ position:'absolute', inset:0, overflow:'visible' }}>
        {/* gridlines */}
        {vt.map((t,i)=>(
          <line key={'v'+i} x1={mapX(t)} y1={GY0} x2={mapX(t)} y2={GY1}
            stroke={C.grid} strokeWidth="1" opacity={axes}/>
        ))}
        {hr.map((r,i)=>(
          <line key={'h'+i} x1={GX0} y1={mapY(r)} x2={GX1} y2={mapY(r)}
            stroke={C.grid} strokeWidth="1" opacity={axes}/>
        ))}
        {/* axes */}
        <line x1={GX0} y1={GY0} x2={GX1} y2={GY0} stroke={C.inkMute} strokeWidth="2" opacity={axes}/>
        <line x1={GX0} y1={GY0} x2={GX0} y2={GY1} stroke={C.inkMute} strokeWidth="2" opacity={axes}/>
        {/* axis ticks + labels */}
        {vt.map((t,i)=>(
          <text key={'vt'+i} x={mapX(t)} y={GY0+34} fill={C.inkMute} fontSize="20"
            fontFamily={F.mono} textAnchor="middle" opacity={axes}>{t}</text>
        ))}
        {hr.map((r,i)=>(
          <text key={'ht'+i} x={GX0-18} y={mapY(r)+7} fill={C.inkMute} fontSize="20"
            fontFamily={F.mono} textAnchor="end" opacity={axes}>{r}</text>
        ))}
        <text x={(GX0+GX1)/2} y={GY0+72} fill={C.amber} fontSize="22" fontFamily={F.mono}
          textAnchor="middle" opacity={axes} letterSpacing="2">TEMPERATURA (°C)</text>
        <text x={GX0-70} y={(GY0+GY1)/2} fill={C.cyan} fontSize="22" fontFamily={F.mono}
          textAnchor="middle" opacity={axes} letterSpacing="2"
          transform={`rotate(-90 ${GX0-70} ${(GY0+GY1)/2})`}>RESISTENCIA (Ω)</text>

        {/* the line */}
        <DrawPath d={tline} progress={draw} stroke={C.cyan} width={4} />

        {/* key point 0°C / 100Ω */}
        {showP1 > 0 && (
          <g opacity={Math.min(1,showP1)} style={{ transform:`scale(${showP1})`, transformOrigin:`${mapX(0)}px ${mapY(100)}px` }}>
            <line x1={mapX(0)} y1={mapY(100)} x2={mapX(0)} y2={GY0} stroke={C.cyan} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6"/>
            <circle cx={mapX(0)} cy={mapY(100)} r="9" fill={C.bg} stroke={C.cyan} strokeWidth="3"/>
            <text x={mapX(0)+18} y={mapY(100)-16} fill={C.cyan} fontSize="22" fontFamily={F.mono}>0 °C → 100,0 Ω</text>
          </g>
        )}
        {/* key point 100°C / 138.5Ω */}
        {showP2 > 0 && (
          <g opacity={Math.min(1,showP2)} style={{ transform:`scale(${showP2})`, transformOrigin:`${mapX(100)}px ${mapY(138.5)}px` }}>
            <line x1={mapX(100)} y1={mapY(138.5)} x2={mapX(100)} y2={GY0} stroke={C.cyan} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6"/>
            <line x1={mapX(100)} y1={mapY(138.5)} x2={GX0} y2={mapY(138.5)} stroke={C.cyan} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6"/>
            <circle cx={mapX(100)} cy={mapY(138.5)} r="9" fill={C.bg} stroke={C.cyan} strokeWidth="3"/>
            <text x={mapX(100)+18} y={mapY(138.5)-16} fill={C.cyan} fontSize="22" fontFamily={F.mono}>100 °C → 138,5 Ω</text>
          </g>
        )}

        {/* sweeping dot */}
        {draw >= 1 && sweepT > 0 && sweepT < 1 && (
          <g>
            <circle cx={mapX(T)} cy={mapY(R)} r="13" fill={C.amber}
              style={{ filter:`drop-shadow(0 0 14px ${C.amber})` }}/>
            <line x1={mapX(T)} y1={mapY(R)} x2={mapX(T)} y2={GY0} stroke={C.amber} strokeWidth="1.5" opacity="0.5"/>
          </g>
        )}
      </svg>

      {/* LINEAL emphasis */}
      <div style={{ position:'absolute', left:1180, top:380, opacity:linealTag,
        transform:`translateY(${(1-linealTag)*12}px)`, fontFamily:F.display, fontWeight:700,
        fontSize:48, color:C.amber, letterSpacing:'0.04em',
        background:'rgba(8,17,32,0.7)', padding:'6px 22px', borderRadius:10,
        border:`1.5px solid ${C.amberDeep}` }}>
        LINEAL
      </div>
    </div>
  );
}

// ──────────────────────────────────── Scene 5 & 6: wiring (shared primitives)
function InstrumentBox({ label }) {
  return (
    <g>
      <rect x="150" y="430" width="320" height="240" rx="10" fill="rgba(8,17,32,0.7)"
        stroke={C.gridMajor} strokeWidth="2"/>
      <text x="310" y="478" fill={C.inkMute} fontSize="20" fontFamily={F.mono} textAnchor="middle"
        letterSpacing="2">{label}</text>
      <text x="310" y="575" fill={C.ink} fontSize="58" fontFamily={F.display} fontWeight="600" textAnchor="middle">Ω</text>
      <text x="310" y="625" fill={C.inkMute} fontSize="18" fontFamily={F.mono} textAnchor="middle">medidor</text>
    </g>
  );
}
function RTDBox() {
  return (
    <g>
      <rect x="1470" y="450" width="300" height="200" rx="10" fill="rgba(8,17,32,0.7)"
        stroke={C.cyanDeep} strokeWidth="2"/>
      <path d={resistorPath(1500, 550, 240, 18, 6)} fill="none" stroke={C.cyan} strokeWidth="4"
        strokeLinejoin="round" strokeLinecap="round" style={{ filter:`drop-shadow(0 0 6px ${C.cyan})` }}/>
      <text x="1620" y="500" fill={C.cyan} fontSize="22" fontFamily={F.mono} textAnchor="middle" letterSpacing="1">RTD PT100</text>
    </g>
  );
}
// small resistor on a horizontal wire centered at (cx,y)
function WireResistor({ cx, y, color, w = 90 }) {
  return <path d={resistorPath(cx - w/2, y, w, 12, 5)} fill="none" stroke={color} strokeWidth="3"
    strokeLinejoin="round" strokeLinecap="round"/>;
}

function SceneTwoWire() {
  const head = useBeat(0.4, 1.2, Easing.easeOutCubic);
  const wires = useBeat(1.2, 2.4);
  const flow  = useBeat(2.4, 4.0);
  const eq    = useBeat(4.2, 5.2, Easing.easeOutCubic);
  const err   = useBeat(6.0, 7.0, Easing.easeOutBack);
  // dashed current animation
  const { localTime } = useSprite();
  const dashOff = -(localTime * 60) % 24;
  const yTop = 510, yBot = 600;
  return (
    <div style={{ position:'absolute', inset:0 }}>
      <Kicker n="04" label="El problema: la resistencia de los cables" />
      <Fade entry={0.5} exit={0.5} style={{ position:'absolute', left:64, top:206, width:1500 }}>
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:54, color:C.ink,
          letterSpacing:'-0.02em', opacity:head }}>
          Con 2 hilos, el medidor lee la RTD <span style={{ color:C.red }}>y también el cable</span>.
        </div>
      </Fade>
      <svg width="1920" height="1080" style={{ position:'absolute', inset:0, overflow:'visible' }}>
        <g opacity={head}><InstrumentBox label="TRANSMISOR" /></g>
        <g opacity={wires}><RTDBox /></g>
        {/* two wires */}
        <g opacity={wires}>
          <line x1="470" y1={yTop} x2="1500" y2={yTop} stroke={C.inkMute} strokeWidth="3"/>
          <line x1="470" y1={yBot} x2="1500" y2={yBot} stroke={C.inkMute} strokeWidth="3"/>
          <line x1="1500" y1={yTop} x2="1500" y2="510" stroke={C.inkMute} strokeWidth="3"/>
          {/* lead resistances */}
          <WireResistor cx={985} y={yTop} color={C.red}/>
          <WireResistor cx={985} y={yBot} color={C.red}/>
          <text x="985" y={yTop-30} fill={C.red} fontSize="22" fontFamily={F.mono} textAnchor="middle">R_cable</text>
          <text x="985" y={yBot+48} fill={C.red} fontSize="22" fontFamily={F.mono} textAnchor="middle">R_cable</text>
        </g>
        {/* current flow dashes */}
        {flow > 0 && (
          <g opacity={flow}>
            <path d={`M 470 ${yTop} H 1500`} stroke={C.amber} strokeWidth="3" fill="none"
              strokeDasharray="10 14" strokeDashoffset={dashOff} opacity="0.8"/>
            <path d={`M 1500 ${yBot} H 470`} stroke={C.amber} strokeWidth="3" fill="none"
              strokeDasharray="10 14" strokeDashoffset={-dashOff} opacity="0.8"/>
          </g>
        )}
      </svg>
      {/* equation */}
      <div style={{ position:'absolute', left:'50%', bottom:170, transform:'translateX(-50%)',
        textAlign:'center', opacity:eq }}>
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:48, color:C.ink }}>
          R<sub style={{ fontSize:24, color:C.inkMute }}>medida</sub> = R<sub style={{ fontSize:24, color:C.cyan }}>RTD</sub>
          <span style={{ color:C.red }}> + 2 · R<sub style={{ fontSize:24 }}>cable</sub></span>
        </div>
        <div style={{ fontFamily:F.mono, fontSize:26, marginTop:22, color:C.red, opacity:err,
          transform:`scale(${0.9+0.1*err})` }}>
          ▲ ERROR: lectura de temperatura más alta de la real
        </div>
      </div>
    </div>
  );
}

function SceneThreeWire() {
  const head = useBeat(0.4, 1.2, Easing.easeOutCubic);
  const wires = useBeat(1.2, 2.6);
  const third = useBeat(2.8, 3.8, Easing.easeOutBack);
  const explain = useBeat(4.2, 5.2, Easing.easeOutCubic);
  const ok = useBeat(6.4, 7.4, Easing.easeOutBack);
  const { localTime } = useSprite();
  const dashOff = -(localTime * 60) % 24;
  const y1 = 490, y2 = 555, y3 = 620;
  return (
    <div style={{ position:'absolute', inset:0 }}>
      <Kicker n="05" label="La solución: conexión a 3 hilos" />
      <Fade entry={0.5} exit={0.5} style={{ position:'absolute', left:64, top:206, width:1520 }}>
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:54, color:C.ink,
          letterSpacing:'-0.02em', opacity:head }}>
          El <span style={{ color:C.green }}>tercer hilo</span> mide el cable… y lo resta.
        </div>
      </Fade>
      <svg width="1920" height="1080" style={{ position:'absolute', inset:0, overflow:'visible' }}>
        <g opacity={head}><InstrumentBox label="TRANSMISOR" /></g>
        <g opacity={wires}><RTDBox /></g>
        <g opacity={wires}>
          <line x1="470" y1={y1} x2="1500" y2={y1} stroke={C.inkMute} strokeWidth="3"/>
          <line x1="470" y1={y3} x2="1500" y2={y3} stroke={C.inkMute} strokeWidth="3"/>
          <line x1="1500" y1={y1} x2="1500" y2={550} stroke={C.inkMute} strokeWidth="3"/>
          <line x1="1500" y1={y3} x2="1500" y2={550} stroke={C.inkMute} strokeWidth="3"/>
          <WireResistor cx={985} y={y1} color={C.inkMute}/>
          <WireResistor cx={985} y={y3} color={C.inkMute}/>
        </g>
        {/* the third (compensation) wire */}
        <g opacity={third}>
          <line x1="470" y1={y2} x2="1500" y2={y2} stroke={C.green} strokeWidth="3.5"
            style={{ filter:`drop-shadow(0 0 6px ${C.green})` }}/>
          <WireResistor cx={985} y={y2} color={C.green}/>
          <text x="985" y={y2-28} fill={C.green} fontSize="22" fontFamily={F.mono} textAnchor="middle">3.er hilo · compensación</text>
        </g>
        {/* flow */}
        {explain > 0 && (
          <g opacity={explain}>
            <path d={`M 470 ${y1} H 1500`} stroke={C.amber} strokeWidth="3" fill="none"
              strokeDasharray="10 14" strokeDashoffset={dashOff} opacity="0.7"/>
          </g>
        )}
      </svg>
      <div style={{ position:'absolute', left:130, top:720, width:760, opacity:explain,
        transform:`translateY(${(1-explain)*14}px)`, fontFamily:F.mono, fontSize:23, color:C.inkMute,
        lineHeight:1.7 }}>
        Los dos hilos del lazo tienen la misma resistencia de cable.
        El tercero permite a la electrónica medir esa caída y restarla automáticamente.
      </div>
      <div style={{ position:'absolute', left:'50%', bottom:160, transform:'translateX(-50%)',
        textAlign:'center', opacity:ok }}>
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:48, color:C.ink }}>
          R<sub style={{ fontSize:24, color:C.inkMute }}>medida</sub> = R<sub style={{ fontSize:24, color:C.cyan }}>RTD</sub>
          <span style={{ color:C.green }}> &nbsp;(cable compensado)</span>
        </div>
        <div style={{ fontFamily:F.mono, fontSize:26, marginTop:20, color:C.green,
          transform:`scale(${0.9+0.1*ok})` }}>
          ✓ Lectura corregida · medición precisa
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────── Scene 7: resumen
function SceneRecap() {
  const head = useBeat(0.3, 1.1, Easing.easeOutCubic);
  const items = [
    ['RTD', 'su resistencia varía con la temperatura', C.cyan],
    ['PT', 'el sensor es de platino — estable y lineal', C.platinum],
    ['100', 'mide 100 Ω a 0 °C (R₀)', C.cyan],
    ['Curva', 'lineal: R = R₀(1 + α·T)', C.amber],
    ['3 hilos', 'compensan la resistencia del cable', C.green],
  ];
  return (
    <div style={{ position:'absolute', inset:0 }}>
      <Kicker n="06" label="En resumen" />
      <Fade entry={0.5} exit={0.6} style={{ position:'absolute', left:64, top:206 }}>
        <div style={{ fontFamily:F.display, fontWeight:700, fontSize:72, color:C.ink,
          letterSpacing:'-0.02em', opacity:head }}>
          RTD <span style={{ color:C.cyan }}>PT100</span>, de un vistazo
        </div>
      </Fade>
      <div style={{ position:'absolute', left:120, top:380, right:120,
        display:'flex', flexDirection:'column', gap:22 }}>
        {items.map(([k, v, col], i) => {
          const b = useBeat(1.2 + i*0.5, 2.0 + i*0.5, Easing.easeOutCubic);
          return (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:34, opacity:b,
              transform:`translateX(${(1-b)*-24}px)` }}>
              <div style={{ minWidth:230, textAlign:'right', fontFamily:F.display, fontWeight:700,
                fontSize:52, color:col }}>{k}</div>
              <div style={{ width:2, height:54, background:col, opacity:0.5 }} />
              <div style={{ fontFamily:F.display, fontWeight:400, fontSize:40, color:C.ink }}>{v}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────── timestamp labeler
function TimeLabeler() {
  const T = useTime();
  React.useEffect(() => {
    const root = document.getElementById('videoroot');
    if (root) root.setAttribute('data-screen-label', `t=${T.toFixed(0)}s`);
  }, [Math.floor(T)]);
  return null;
}

// ──────────────────────────────────────────────────────────────────── compose
function Video() {
  return (
    <React.Fragment>
      <BlueprintBg />
      <Sprite start={0}    end={6.5}>  <SceneIntro /></Sprite>
      <Sprite start={6.5}  end={20.5}> <SceneWhatIsRTD /></Sprite>
      <Sprite start={20.5} end={35}>   <ScenePT100 /></Sprite>
      <Sprite start={35}   end={58}>   <SceneCurve /></Sprite>
      <Sprite start={58}   end={72}>   <SceneTwoWire /></Sprite>
      <Sprite start={72}   end={87}>   <SceneThreeWire /></Sprite>
      <Sprite start={87}   end={95}>   <SceneRecap /></Sprite>
      <Chrome />
      <TimeLabeler />
    </React.Fragment>
  );
}

Object.assign(window, { Video });
