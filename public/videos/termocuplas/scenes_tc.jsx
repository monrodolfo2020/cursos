// scenes_tc.jsx — Termocuplas (Tipo J y K). Reuses animations.jsx + lib.jsx.

const C = COLORS, F = FONT;
const J_COL = 'oklch(78% 0.13 64)';   // Tipo J — amber
const K_COL = 'oklch(76% 0.13 228)';  // Tipo K — cyan
// material strand colors
const M_IRON = '#9aa7b4', M_CONST = '#c0875a', M_CHROM = '#bcc6d0', M_ALUM = '#7f8a96';

// ── thermocouple approximate EMF curves (mV) ───────────────────────────────
const vJ = (T) => 0.0520 * T + 3.0e-6 * T * T;   // 760°C → ~41 mV
const vK = (T) => 0.0388 * T + 2.0e-6 * T * T;   // 1260°C → ~52 mV

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
        textAlign:'center', width:1500 }}>
        <div style={{ fontFamily:F.mono, fontSize:20, letterSpacing:'0.4em', color:C.cyan,
          textTransform:'uppercase', opacity:intro, marginBottom:28,
          transform:`translateY(${(1-intro)*14}px)` }}>
          Sensores de temperatura
        </div>
        <div style={{ fontFamily:F.display, fontWeight:700, fontSize:150, color:C.ink,
          letterSpacing:'-0.03em', lineHeight:0.9,
          opacity:intro, transform:`translateY(${(1-intro)*24}px) scale(${0.94+0.06*intro})` }}>
          Termocuplas
        </div>
        <div style={{ height:2, background:C.cyan, margin:'34px auto 0',
          width: `${line*560}px`, boxShadow:`0 0 14px ${C.cyan}` }} />
        <div style={{ fontFamily:F.display, fontWeight:400, fontSize:42, color:C.ink,
          marginTop:34, opacity:sub, transform:`translateY(${(1-sub)*12}px)` }}>
          El efecto Seebeck — con énfasis en los <span style={{ color:J_COL }}>Tipo J</span> y <span style={{ color:K_COL }}>Tipo K</span>
        </div>
        <div style={{ fontFamily:F.mono, fontSize:22, color:C.inkMute, marginTop:22, letterSpacing:'0.08em',
          opacity:tag, transform:`translateY(${(1-tag)*10}px)` }}>
          qué es · aleaciones · sensibilidad · rango · vs. RTD
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────── Scene 2: efecto Seebeck (qué es)
function SceneSeebeck() {
  const head = useBeat(0.4, 1.3, Easing.easeOutCubic);
  const diagram = useBeat(1.0, 2.2);
  const sweep = useBeat(2.6, 9.5, Easing.easeInOutSine);
  const Th = 25 + sweep * 600;            // hot junction 25 → 625 °C
  const dT = Th - 25;
  const V = 0.050 * dT;                    // mV (≈50 µV/°C)
  const heat = clamp(dT / 600, 0, 1);
  const cap = useBeat(10.2, 11.2, Easing.easeOutCubic);
  const { localTime } = useSprite();
  const dashOff = -(localTime * 70) % 26;

  const jx = 1500, jy = 555;               // junction
  return (
    <div style={{ position:'absolute', inset:0 }}>
      <Kicker n="01" label="¿Qué es una termocupla?" />
      <Fade entry={0.5} exit={0.5} style={{ position:'absolute', left:64, top:206, width:1500 }}>
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:58, color:C.ink,
          letterSpacing:'-0.02em', lineHeight:1.05, opacity:head }}>
          Dos metales distintos generan un <span style={{ color:C.amber }}>voltaje</span><br/>
          proporcional a la diferencia de temperatura.
        </div>
      </Fade>

      <svg width="1920" height="1080" style={{ position:'absolute', inset:0, overflow:'visible' }}>
        {/* instrument / voltmeter */}
        <g opacity={head}>
          <rect x="150" y="440" width="300" height="240" rx="10" fill="rgba(8,17,32,0.7)"
            stroke={C.gridMajor} strokeWidth="2"/>
          <text x="300" y="486" fill={C.inkMute} fontSize="19" fontFamily={F.mono} textAnchor="middle" letterSpacing="2">VOLTÍMETRO</text>
          <text x="300" y="582" fill={C.ink} fontSize="52" fontFamily={F.display} fontWeight="600" textAnchor="middle">mV</text>
          <text x="300" y="626" fill={C.inkMute} fontSize="17" fontFamily={F.mono} textAnchor="middle">señal pequeña</text>
        </g>

        {/* two dissimilar wires meeting at the hot junction */}
        <g opacity={diagram}>
          {/* metal A (top) */}
          <path d={`M 450 512 L 1180 512 L ${jx} ${jy}`} fill="none" stroke={M_IRON} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round"/>
          {/* metal B (bottom) */}
          <path d={`M 450 600 L 1180 600 L ${jx} ${jy}`} fill="none" stroke={M_CONST} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round"/>
          <text x="780" y="496" fill={M_IRON} fontSize="20" fontFamily={F.mono}>METAL A</text>
          <text x="780" y="628" fill={M_CONST} fontSize="20" fontFamily={F.mono}>METAL B</text>
          {/* cold junction label */}
          <text x="470" y="416" fill={C.inkMute} fontSize="19" fontFamily={F.mono}>JUNTA FRÍA · referencia (T₀)</text>
        </g>

        {/* hot junction + heat glow */}
        <g opacity={diagram}>
          <circle cx={jx} cy={jy} r={18 + heat*8} fill={C.amber}
            style={{ filter:`drop-shadow(0 0 ${10+heat*22}px ${C.amber})` }}/>
          {[60,90,120].map((r,i)=>(
            <circle key={i} cx={jx} cy={jy} r={r} fill="none" stroke={C.amber}
              strokeWidth="2" opacity={heat*(0.35-i*0.1)}/>
          ))}
          <text x={jx} y={jy-100} fill={C.amber} fontSize="22" fontFamily={F.mono} textAnchor="middle">JUNTA CALIENTE</text>
        </g>

        {/* current/EMF flow */}
        {sweep > 0 && (
          <path d={`M 450 512 L 1180 512 L ${jx} ${jy} L 1180 600 L 450 600`} fill="none"
            stroke={C.amber} strokeWidth="3" strokeDasharray="9 15" strokeDashoffset={dashOff}
            opacity={0.55*heat+0.15}/>
        )}
      </svg>

      {/* live readouts */}
      <Readout label="Junta caliente" value={Th.toFixed(0)} unit="°C" color={C.amber} x={1180} y={690} size={56} align="center" />
      <Readout label="Voltaje (Seebeck)" value={V.toFixed(1)} unit="mV" color={C.ink} x={1620} y={690} size={56} align="right" />

      {/* caption */}
      <div style={{ position:'absolute', left:'50%', bottom:120, transform:'translateX(-50%)',
        fontFamily:F.display, fontWeight:500, fontSize:38, color:C.ink, opacity:cap, textAlign:'center' }}>
        <span style={{ color:C.inkMute, fontFamily:F.mono, fontSize:30 }}>V ≈ S · (T</span>
        <span style={{ color:C.amber, fontFamily:F.mono, fontSize:30 }}>caliente</span>
        <span style={{ color:C.inkMute, fontFamily:F.mono, fontSize:30 }}> − T</span>
        <span style={{ color:C.cyan, fontFamily:F.mono, fontSize:30 }}>fría</span>
        <span style={{ color:C.inkMute, fontFamily:F.mono, fontSize:30 }}>)</span>
        <span style={{ color:C.inkMute, marginLeft:24 }}>· el efecto Seebeck</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────── shared: alloy-wire glyph + type card
function AlloyGlyph({ x, y, colA, colB }) {
  return (
    <svg width="220" height="150" style={{ position:'absolute', left:x, top:y, overflow:'visible' }}>
      <path d="M 10 30 L 150 30 L 200 75" fill="none" stroke={colA} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 10 120 L 150 120 L 200 75" fill="none" stroke={colB} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="200" cy="75" r="11" fill={C.amber} style={{ filter:`drop-shadow(0 0 8px ${C.amber})` }}/>
    </svg>
  );
}

function StatRow({ label, children }) {
  return (
    <div style={{ display:'flex', gap:24, alignItems:'baseline', padding:'14px 0',
      borderBottom:`1px solid ${C.grid}` }}>
      <div style={{ minWidth:190, fontFamily:F.mono, fontSize:18, color:C.inkMute,
        letterSpacing:'0.1em', textTransform:'uppercase' }}>{label}</div>
      <div style={{ fontFamily:F.display, fontWeight:500, fontSize:30, color:C.ink }}>{children}</div>
    </div>
  );
}

function TypeCard({ accent, letter, title, colA, colB, mA, mB, range, sens, note, headBeat, bodyBeat }) {
  return (
    <div style={{ position:'absolute', inset:0 }}>
      <div style={{ position:'absolute', left:64, top:206, opacity:headBeat,
        transform:`translateY(${(1-headBeat)*16}px)`, display:'flex', alignItems:'center', gap:28 }}>
        <div style={{ fontFamily:F.display, fontWeight:700, fontSize:130, color:accent, lineHeight:0.8 }}>{letter}</div>
        <div>
          <div style={{ fontFamily:F.mono, fontSize:20, color:C.inkMute, letterSpacing:'0.2em' }}>TERMOCUPLA</div>
          <div style={{ fontFamily:F.display, fontWeight:600, fontSize:64, color:C.ink, letterSpacing:'-0.02em' }}>{title}</div>
        </div>
      </div>

      {/* alloy graphic */}
      <div style={{ position:'absolute', left:150, top:470, opacity:bodyBeat,
        transform:`translateY(${(1-bodyBeat)*18}px)` }}>
        <AlloyGlyph x={0} y={0} colA={colA} colB={colB} />
        <div style={{ position:'absolute', left:0, top:8, fontFamily:F.mono, fontSize:21, color:colA }}>{mA}</div>
        <div style={{ position:'absolute', left:0, top:128, fontFamily:F.mono, fontSize:21, color:colB }}>{mB}</div>
        <div style={{ marginTop:200, fontFamily:F.mono, fontSize:18, color:C.inkMute, maxWidth:430,
          lineHeight:1.7, letterSpacing:'0.02em' }}>{note}</div>
      </div>

      {/* stats */}
      <div style={{ position:'absolute', left:760, top:430, width:1080, opacity:bodyBeat,
        transform:`translateY(${(1-bodyBeat)*18}px)` }}>
        <StatRow label="Aleaciones">
          <span style={{ color:colA }}>{mA}</span>
          <span style={{ color:C.inkMute }}> + </span>
          <span style={{ color:colB }}>{mB}</span>
        </StatRow>
        <StatRow label="Rango"><span style={{ color:accent }}>{range.label}</span></StatRow>
        <StatRow label="Sensibilidad">≈ <span style={{ color:accent }}>{sens}</span> µV/°C</StatRow>

        {/* range bar (visual) */}
        <div style={{ marginTop:34 }}>
          <div style={{ fontFamily:F.mono, fontSize:15, color:C.inkMute, letterSpacing:'0.14em',
            marginBottom:10 }}>−200 °C ─────────────────────────────── 1300 °C</div>
          <div style={{ height:18, background:'rgba(255,255,255,0.05)', borderRadius:9,
            position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', height:'100%', borderRadius:9, background:accent,
              left:`${range.lo}%`, width:`${range.hi - range.lo}%`,
              boxShadow:`0 0 14px ${accent}` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneTipoJ() {
  const head = useBeat(0.4, 1.2, Easing.easeOutCubic);
  const body = useBeat(1.2, 2.2, Easing.easeOutCubic);
  // range bar: -210..760 over scale -200..1300 (span 1500) → lo≈0, hi≈64%
  const rObj = { lo: 0, hi: 64, label: '−210 … 760 °C' };
  return (
    <Fade entry={0.5} exit={0.5}>
      <TypeCard accent={J_COL} letter="J" title="Tipo J" colA={M_IRON} colB={M_CONST}
        mA="Hierro (Fe)" mB="Constantán (Cu-Ni)"
        range={rObj} sens="50–55"
        note="Más sensible que el Tipo K. Ideal en atmósferas reductoras o vacío. El hierro se oxida a altas temperaturas, por eso su límite es menor."
        headBeat={head} bodyBeat={body} />
    </Fade>
  );
}

function SceneTipoK() {
  const head = useBeat(0.4, 1.2, Easing.easeOutCubic);
  const body = useBeat(1.2, 2.2, Easing.easeOutCubic);
  const rObj = { lo: 0, hi: 97, label: '−200 … 1260 °C' };
  return (
    <Fade entry={0.5} exit={0.5}>
      <TypeCard accent={K_COL} letter="K" title="Tipo K" colA={M_CHROM} colB={M_ALUM}
        mA="Chromel (Ni-Cr)" mB="Alumel (Ni-Al)"
        range={rObj} sens="41"
        note="La más usada en la industria. Económica y de rango muy amplio. Buen comportamiento en atmósferas oxidantes (hornos, calderas)."
        headBeat={head} bodyBeat={body} />
    </Fade>
  );
}

// ──────────────────────────────────── Scene 5: curva V vs T — J vs K
const GX0 = 640, GX1 = 1510, GY0 = 820, GY1 = 320;
const TMAX = 1300, VMAX = 55;
const mapX = (t) => GX0 + clamp(t,0,TMAX)/TMAX * (GX1 - GX0);
const mapY = (v) => GY0 - clamp(v,0,VMAX)/VMAX * (GY0 - GY1);

function curvePath(fn, tEnd) {
  let d = '';
  for (let t = 0; t <= tEnd + 0.1; t += 20) {
    d += (d ? ' L ' : 'M ') + mapX(t).toFixed(1) + ' ' + mapY(fn(t)).toFixed(1);
  }
  return d;
}

function SceneCompareCurve() {
  const head  = useBeat(0.3, 1.1, Easing.easeOutCubic);
  const axes  = useBeat(0.8, 2.0);
  const drawJ = useBeat(2.2, 5.2);
  const drawK = useBeat(4.0, 7.5);
  const noteJ = useBeat(7.8, 8.8, Easing.easeOutBack);
  const noteK = useBeat(9.2, 10.2, Easing.easeOutBack);
  const concl = useBeat(12.0, 13.2, Easing.easeOutCubic);

  const vt = [0,300,600,900,1200], hv=[0,10,20,30,40,50];
  const jEnd = 760, kEnd = 1260;
  return (
    <div style={{ position:'absolute', inset:0 }}>
      <Kicker n="04" label="J vs. K — voltaje contra temperatura" />
      <Fade entry={0.5} exit={0.5} style={{ position:'absolute', left:64, top:206 }}>
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:56, color:C.ink,
          letterSpacing:'-0.02em', opacity:head }}>
          <span style={{ color:J_COL }}>J</span> es más empinada; <span style={{ color:K_COL }}>K</span> llega más lejos.
        </div>
      </Fade>

      {/* legend */}
      <div style={{ position:'absolute', left:150, top:360, opacity:axes,
        display:'flex', flexDirection:'column', gap:16 }}>
        {[['Tipo J', J_COL, 'Hierro · Constantán'], ['Tipo K', K_COL, 'Chromel · Alumel']].map(([t,col,sub],i)=>(
          <div key={i} style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:42, height:5, background:col, borderRadius:3, boxShadow:`0 0 10px ${col}` }} />
            <div>
              <div style={{ fontFamily:F.display, fontWeight:600, fontSize:30, color:col }}>{t}</div>
              <div style={{ fontFamily:F.mono, fontSize:15, color:C.inkMute }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      <svg width="1920" height="1080" style={{ position:'absolute', inset:0, overflow:'visible' }}>
        {vt.map((t,i)=><line key={'v'+i} x1={mapX(t)} y1={GY0} x2={mapX(t)} y2={GY1} stroke={C.grid} strokeWidth="1" opacity={axes}/>)}
        {hv.map((v,i)=><line key={'h'+i} x1={GX0} y1={mapY(v)} x2={GX1} y2={mapY(v)} stroke={C.grid} strokeWidth="1" opacity={axes}/>)}
        <line x1={GX0} y1={GY0} x2={GX1} y2={GY0} stroke={C.inkMute} strokeWidth="2" opacity={axes}/>
        <line x1={GX0} y1={GY0} x2={GX0} y2={GY1} stroke={C.inkMute} strokeWidth="2" opacity={axes}/>
        {vt.map((t,i)=><text key={'vt'+i} x={mapX(t)} y={GY0+34} fill={C.inkMute} fontSize="20" fontFamily={F.mono} textAnchor="middle" opacity={axes}>{t}</text>)}
        {hv.map((v,i)=><text key={'ht'+i} x={GX0-18} y={mapY(v)+7} fill={C.inkMute} fontSize="20" fontFamily={F.mono} textAnchor="end" opacity={axes}>{v}</text>)}
        <text x={(GX0+GX1)/2} y={GY0+72} fill={C.amber} fontSize="22" fontFamily={F.mono} textAnchor="middle" opacity={axes} letterSpacing="2">TEMPERATURA (°C)</text>
        <text x={GX0-66} y={(GY0+GY1)/2} fill={C.cyan} fontSize="22" fontFamily={F.mono} textAnchor="middle" opacity={axes} letterSpacing="2" transform={`rotate(-90 ${GX0-66} ${(GY0+GY1)/2})`}>VOLTAJE (mV)</text>

        {/* curves */}
        <DrawPath d={curvePath(vJ, jEnd)} progress={drawJ} stroke={J_COL} width={4.5} />
        <DrawPath d={curvePath(vK, kEnd)} progress={drawK} stroke={K_COL} width={4.5} />

        {/* J endpoint */}
        {noteJ > 0 && (
          <g opacity={Math.min(1,noteJ)}>
            <circle cx={mapX(jEnd)} cy={mapY(vJ(jEnd))} r="9" fill={C.bg} stroke={J_COL} strokeWidth="3"/>
            <text x={mapX(jEnd)-14} y={mapY(vJ(jEnd))-18} fill={J_COL} fontSize="21" fontFamily={F.mono} textAnchor="end">J · límite 760 °C</text>
          </g>
        )}
        {/* K endpoint */}
        {noteK > 0 && (
          <g opacity={Math.min(1,noteK)}>
            <circle cx={mapX(kEnd)} cy={mapY(vK(kEnd))} r="9" fill={C.bg} stroke={K_COL} strokeWidth="3"/>
            <text x={mapX(kEnd)+16} y={mapY(vK(kEnd))+4} fill={K_COL} fontSize="21" fontFamily={F.mono}>K · 1260 °C</text>
          </g>
        )}
      </svg>

      {/* conclusion chips */}
      <div style={{ position:'absolute', left:150, top:600, width:430, opacity:concl,
        transform:`translateY(${(1-concl)*12}px)`, display:'flex', flexDirection:'column', gap:18 }}>
        <div style={{ fontFamily:F.display, fontSize:25, color:C.ink, lineHeight:1.4 }}>
          <span style={{ color:J_COL, fontWeight:600 }}>J</span> ≈ 50 µV/°C → mejor resolución en rangos pequeños.
        </div>
        <div style={{ fontFamily:F.display, fontSize:25, color:C.ink, lineHeight:1.4 }}>
          <span style={{ color:K_COL, fontWeight:600 }}>K</span> ≈ 41 µV/°C → menos sensible, pero mucho más rango.
        </div>
        <div style={{ fontFamily:F.mono, fontSize:15, color:C.inkFaint }}>* curvas aproximadas; la relación real es ligeramente no lineal.</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────── Scene 6: Termocupla vs RTD
function SceneVsRTD() {
  const head = useBeat(0.3, 1.1, Easing.easeOutCubic);
  const rows = [
    ['Principio',  'Voltaje (efecto Seebeck)', 'Resistencia que varía con T'],
    ['Señal',      'mV · ligeramente no lineal', 'Ω · muy lineal'],
    ['Rango',      'Amplio: hasta 1260 °C (K)',  'Acotado: ~ −200…600 °C'],
    ['Precisión',  'Media',                      'Alta'],
    ['Respuesta',  'Muy rápida · robusta',       'Más lenta'],
    ['Costo',      'Bajo',                       'Medio'],
  ];
  return (
    <div style={{ position:'absolute', inset:0 }}>
      <Kicker n="05" label="Termocupla vs. RTD" />
      <Fade entry={0.5} exit={0.5} style={{ position:'absolute', left:64, top:206 }}>
        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:58, color:C.ink,
          letterSpacing:'-0.02em', opacity:head }}>
          ¿Cuándo usar cada una?
        </div>
      </Fade>
      {/* column headers */}
      <div style={{ position:'absolute', left:660, top:350, width:1180, display:'flex', opacity:head }}>
        <div style={{ flex:1, fontFamily:F.display, fontWeight:700, fontSize:36, color:C.amber }}>TERMOCUPLA</div>
        <div style={{ flex:1, fontFamily:F.display, fontWeight:700, fontSize:36, color:C.cyan }}>RTD PT100</div>
      </div>
      <div style={{ position:'absolute', left:120, right:80, top:420,
        display:'flex', flexDirection:'column' }}>
        {rows.map(([k, tc, rtd], i) => {
          const b = useBeat(1.0 + i*0.4, 1.7 + i*0.4, Easing.easeOutCubic);
          return (
            <div key={i} style={{ display:'flex', alignItems:'center', padding:'18px 0',
              borderTop:`1px solid ${C.grid}`, opacity:b, transform:`translateX(${(1-b)*-20}px)` }}>
              <div style={{ width:420, fontFamily:F.mono, fontSize:20, color:C.inkMute,
                letterSpacing:'0.12em', textTransform:'uppercase' }}>{k}</div>
              <div style={{ flex:1, fontFamily:F.display, fontWeight:500, fontSize:30, color:C.ink }}>{tc}</div>
              <div style={{ flex:1, fontFamily:F.display, fontWeight:500, fontSize:30, color:C.ink }}>{rtd}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────── Scene 7: resumen
function SceneRecap() {
  const head = useBeat(0.3, 1.1, Easing.easeOutCubic);
  const items = [
    ['Seebeck', '2 metales + ΔT → un voltaje (mV)', C.amber],
    ['Junta fría', 'la electrónica la compensa (CJC)', C.ink],
    ['Tipo J', 'Hierro-Constantán · más sensible · ≤ 760 °C', J_COL],
    ['Tipo K', 'Chromel-Alumel · el más usado · ≤ 1260 °C', K_COL],
    ['vs RTD', 'más rango y robustez; menos precisión', C.cyan],
  ];
  return (
    <div style={{ position:'absolute', inset:0 }}>
      <Kicker n="06" label="En resumen" />
      <Fade entry={0.5} exit={0.6} style={{ position:'absolute', left:64, top:206 }}>
        <div style={{ fontFamily:F.display, fontWeight:700, fontSize:70, color:C.ink,
          letterSpacing:'-0.02em', opacity:head }}>
          Termocuplas <span style={{ color:J_COL }}>J</span> y <span style={{ color:K_COL }}>K</span>, de un vistazo
        </div>
      </Fade>
      <div style={{ position:'absolute', left:120, top:380, right:120,
        display:'flex', flexDirection:'column', gap:20 }}>
        {items.map(([k, v, col], i) => {
          const b = useBeat(1.2 + i*0.5, 2.0 + i*0.5, Easing.easeOutCubic);
          return (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:34, opacity:b,
              transform:`translateX(${(1-b)*-24}px)` }}>
              <div style={{ minWidth:280, textAlign:'right', fontFamily:F.display, fontWeight:700,
                fontSize:46, color:col }}>{k}</div>
              <div style={{ width:2, height:50, background:col, opacity:0.5 }} />
              <div style={{ fontFamily:F.display, fontWeight:400, fontSize:36, color:C.ink }}>{v}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimeLabeler() {
  const T = useTime();
  React.useEffect(() => {
    const root = document.getElementById('videoroot');
    if (root) root.setAttribute('data-screen-label', `t=${T.toFixed(0)}s`);
  }, [Math.floor(T)]);
  return null;
}

function Video() {
  return (
    <React.Fragment>
      <BlueprintBg />
      <Sprite start={0}    end={6.5}>  <SceneIntro /></Sprite>
      <Sprite start={6.5}  end={22}>   <SceneSeebeck /></Sprite>
      <Sprite start={22}   end={35}>   <SceneTipoJ /></Sprite>
      <Sprite start={35}   end={48}>   <SceneTipoK /></Sprite>
      <Sprite start={48}   end={71}>   <SceneCompareCurve /></Sprite>
      <Sprite start={71}   end={85}>   <SceneVsRTD /></Sprite>
      <Sprite start={85}   end={95}>   <SceneRecap /></Sprite>
      <Chrome right="Termocuplas · Tipo J / K" footer="MÓDULO 02 · SENSORES DE TEMPERATURA" />
      <TimeLabeler />
    </React.Fragment>
  );
}

Object.assign(window, { Video });
