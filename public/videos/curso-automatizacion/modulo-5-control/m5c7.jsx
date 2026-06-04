// m5c7.jsx — "Diagramas de escalera (Ladder): introducción"
// After m5-lib.jsx. Exports SCENES_M5C7.

// Ladder primitives ---------------------------------------------------------
function Contact({ x, y, nc = false, label, tag, energized = false }) {
  const col = energized ? TL5.ok : TL5.ink;
  return (
    <g>
      <line x1={x - 26} y1={y} x2={x - 9} y2={y} stroke={energized ? TL5.ok : TL5.ink} strokeWidth="3" />
      <line x1={x - 9} y1={y - 16} x2={x - 9} y2={y + 16} stroke={col} strokeWidth="3" />
      <line x1={x + 9} y1={y - 16} x2={x + 9} y2={y + 16} stroke={col} strokeWidth="3" />
      {nc && <line x1={x - 12} y1={y + 16} x2={x + 12} y2={y - 16} stroke={col} strokeWidth="3" />}
      <line x1={x + 9} y1={y} x2={x + 26} y2={y} stroke={energized ? TL5.ok : TL5.ink} strokeWidth="3" />
      {label && <text x={x} y={y - 26} fill={col} fontFamily={MONO5} fontSize="15" fontWeight="600" textAnchor="middle">{label}</text>}
      {tag && <text x={x} y={y + 38} fill={TL5.mut} fontFamily={MONO5} fontSize="13" textAnchor="middle">{tag}</text>}
    </g>
  );
}
function Coil({ x, y, label, tag, energized = false, type = '' }) {
  const col = energized ? TL5.ok : TL5.indigoD;
  return (
    <g>
      <line x1={x - 26} y1={y} x2={x - 14} y2={y} stroke={energized ? TL5.ok : TL5.ink} strokeWidth="3" />
      <path d={`M${x - 14} ${y - 16} A 18 18 0 0 0 ${x - 14} ${y + 16}`} stroke={col} strokeWidth="3" fill="none" />
      <path d={`M${x + 14} ${y - 16} A 18 18 0 0 1 ${x + 14} ${y + 16}`} stroke={col} strokeWidth="3" fill="none" />
      {type && <text x={x} y={y + 6} fill={col} fontFamily={MONO5} fontSize="16" fontWeight="700" textAnchor="middle">{type}</text>}
      <line x1={x + 14} y1={y} x2={x + 26} y2={y} stroke={col} strokeWidth="3" />
      {label && <text x={x} y={y - 26} fill={col} fontFamily={MONO5} fontSize="15" fontWeight="600" textAnchor="middle">{label}</text>}
      {tag && <text x={x} y={y + 38} fill={TL5.mut} fontFamily={MONO5} fontSize="13" textAnchor="middle">{tag}</text>}
      {energized && <circle cx={x} cy={y} r="30" fill="none" stroke={TL5.ok} strokeWidth="1.5" opacity={0.4} />}
    </g>
  );
}

function S_What({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="El lenguaje de los electricistas" y="11%" />
      <CapM5 start={s + 0.6} dur={2.2} size={46} weight={600} y="21%" width={1600}>Ladder imita el <span style={{color:TL5.indigoD}}>diagrama de relés</span>: dos rieles y peldaños.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <g opacity={clamp((t-(s+1.2))/0.6,0,1)}>
          {/* rails */}
          <line x1={500} y1={420} x2={500} y2={720} stroke={TL5.indigo} strokeWidth="4" />
          <line x1={1420} y1={420} x2={1420} y2={720} stroke={TL5.indigo} strokeWidth="4" />
          <text x={500} y={400} fill={TL5.indigoD} fontFamily={MONO5} fontSize="16" textAnchor="middle">+24V</text>
          <text x={1420} y={400} fill={TL5.mut} fontFamily={MONO5} fontSize="16" textAnchor="middle">0V</text>
          {/* 3 rungs */}
          {[480, 580, 680].map((yy,i)=>(
            <g key={i} opacity={clamp((t-(s+1.6+i*0.4))/0.5,0,1)}>
              <line x1={500} y1={yy} x2={560} y2={yy} stroke={TL5.ink} strokeWidth="3" />
              <Contact x={620} y={yy} label="A" nc={i===1} />
              <line x1={646} y1={yy} x2={760} y2={yy} stroke={TL5.ink} strokeWidth="3" />
              <Contact x={820} y={yy} label="B" />
              <line x1={846} y1={yy} x2={1360} y2={yy} stroke={TL5.ink} strokeWidth="3" />
              <Coil x={1390} y={yy} label="Y" />
            </g>
          ))}
        </g>
      </svg>
      <CapM5 start={s + 4.2} dur={dur - 4.5} size={24} weight={500} color={TL5.mut} y="80%" width={1500}>Cada peldaño (rung) equivale a un circuito de relés. La transición fue casi directa.</CapM5>
    </SceneM5>
  );
}

function S_Elements({ start, dur }) {
  const t = useTime(); const s = start;
  const items = [
    { draw: (x,y)=><Contact x={x} y={y} />, name: 'Contacto NO', desc: 'Pasa si la variable = 1', acc: TL5.indigo },
    { draw: (x,y)=><Contact x={x} y={y} nc />, name: 'Contacto NC', desc: 'Pasa si la variable = 0 (NOT)', acc: TL5.amber },
    { draw: (x,y)=><Coil x={x} y={y} />, name: 'Bobina', desc: 'Se activa al recibir corriente', acc: TL5.indigoD },
    { draw: (x,y)=><Coil x={x} y={y} type="S" />, name: 'Bobina SET', desc: 'Enclava (latch) hasta un RESET', acc: TL5.ok },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Los elementos básicos" y="11%" />
      <CapM5 start={s + 0.6} dur={2.0} size={48} weight={700} y="20%" width={1500}>Contactos y bobinas: todo el vocabulario inicial.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {items.map((it,i)=>(
          <g key={i} opacity={clamp((t-(s+1.2+i*0.4))/0.5,0,1)} transform={`translate(${340 + i*330} 470)`}>
            {it.draw(0,0)}
          </g>
        ))}
      </svg>
      {items.map((it,i)=>(
        <div key={i} style={{position:'absolute', left:240+i*330, top:540, width:280, textAlign:'center', opacity:clamp((t-(s+1.6+i*0.4))/0.5,0,1)}}>
          <div style={{fontFamily:DISP5, fontSize:24, fontWeight:700, color:it.acc}}>{it.name}</div>
          <div style={{fontFamily:DISP5, fontSize:17, color:TL5.mut, marginTop:4, lineHeight:1.35}}>{it.desc}</div>
        </div>
      ))}
    </SceneM5>
  );
}

function S_Motor({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  // animate: at 3s press MARCHA, motor latches; at 8s press PARO, drops. loop 11s
  const cyc = lt % 11;
  const running = cyc >= 3 && cyc < 8;
  const pressMarcha = cyc >= 3 && cyc < 3.5;
  const pressParo = cyc >= 8 && cyc < 8.5;
  const yy = 470;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Programa 1 · arranque con sello" y="9%" />
      <CapM5 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1600}>El «hola mundo» del Ladder: marcha, paro y enclavamiento.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <g opacity={clamp((t-(s+1.0))/0.6,0,1)}>
          <line x1={300} y1={yy - 60} x2={300} y2={yy + 130} stroke={TL5.indigo} strokeWidth="4" />
          <line x1={1560} y1={yy - 60} x2={1560} y2={yy + 130} stroke={TL5.indigo} strokeWidth="4" />
          {/* main rung */}
          <line x1={300} y1={yy} x2={400} y2={yy} stroke={running||pressMarcha?TL5.ok:TL5.ink} strokeWidth="3" />
          <Contact x={460} y={yy} label="MARCHA" tag="I0.0" energized={pressMarcha} />
          <line x1={486} y1={yy} x2={620} y2={yy} stroke={(running||pressMarcha)?TL5.ok:TL5.ink} strokeWidth="3" />
          <Contact x={700} y={yy} nc label="PARO" tag="I0.1" energized={running && !pressParo} />
          <line x1={726} y1={yy} x2={880} y2={yy} stroke={running&&!pressParo?TL5.ok:TL5.ink} strokeWidth="3" />
          <Contact x={960} y={yy} nc label="FALLA" tag="I0.2" energized={running && !pressParo} />
          <line x1={986} y1={yy} x2={1500} y2={yy} stroke={running&&!pressParo?TL5.ok:TL5.ink} strokeWidth="3" />
          <Coil x={1530} y={yy} label="MOTOR" tag="Q0.0" energized={running} />
          {/* seal-in branch */}
          <line x1={400} y1={yy} x2={400} y2={yy + 90} stroke={running?TL5.ok:TL5.ink} strokeWidth="3" />
          <line x1={400} y1={yy + 90} x2={434} y2={yy + 90} stroke={running?TL5.ok:TL5.ink} strokeWidth="3" />
          <Contact x={494} y={yy + 90} label="SELLO" tag="Q0.0" energized={running} />
          <line x1={520} y1={yy + 90} x2={620} y2={yy + 90} stroke={running?TL5.ok:TL5.ink} strokeWidth="3" />
          <line x1={620} y1={yy + 90} x2={620} y2={yy} stroke={running?TL5.ok:TL5.ink} strokeWidth="3" />
          {/* flow dot */}
          {running && <circle cx={400 + ((t*160)%1130)} cy={yy} r="5" fill={TL5.ok} />}
        </g>
      </svg>
      <div style={{position:'absolute', left:'50%', bottom:'9%', transform:'translateX(-50%)'}}>
        <div style={{display:'inline-block', padding:'12px 32px', borderRadius:30, background:running?'rgba(34,160,107,0.12)':'rgba(160,164,200,0.14)', border:`1px solid ${running?TL5.ok:TL5.lineS}`, fontFamily:DISP5, fontSize:25, fontWeight:700, color:running?TL5.ok:TL5.mut}}>
          {pressParo?'PARO → cae el sello':running?'Motor corriendo — el sello lo sostiene':'En reposo — pulsa MARCHA'}
        </div>
      </div>
    </SceneM5>
  );
}

function S_Translate({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Booleana → Ladder" y="12%" />
      <CapM5 start={s + 0.6} dur={2.0} size={48} weight={700} y="22%" width={1500}>Serie es AND; paralelo es OR.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* AND: series */}
        <g opacity={clamp((t-(s+1.2))/0.5,0,1)} transform="translate(360 460)">
          <line x1={0} y1={0} x2={60} y2={0} stroke={TL5.ink} strokeWidth="3" />
          <Contact x={120} y={0} label="A" /><line x1={146} y1={0} x2={240} y2={0} stroke={TL5.ink} strokeWidth="3" />
          <Contact x={300} y={0} label="B" /><line x1={326} y1={0} x2={420} y2={0} stroke={TL5.ink} strokeWidth="3" />
          <Coil x={450} y={0} label="Y" />
          <text x={225} y={90} fill={TL5.indigoD} fontFamily={MONO5} fontSize="22" fontWeight="700" textAnchor="middle">Y = A · B</text>
        </g>
        {/* OR: parallel */}
        <g opacity={clamp((t-(s+1.8))/0.5,0,1)} transform="translate(1100 440)">
          <line x1={0} y1={0} x2={60} y2={0} stroke={TL5.ink} strokeWidth="3" />
          <Contact x={120} y={0} label="A" /><line x1={146} y1={0} x2={320} y2={0} stroke={TL5.ink} strokeWidth="3" />
          <line x1={60} y1={0} x2={60} y2={60} stroke={TL5.ink} strokeWidth="3" />
          <line x1={60} y1={60} x2={94} y2={60} stroke={TL5.ink} strokeWidth="3" />
          <Contact x={120} y={60} label="B" /><line x1={146} y1={60} x2={200} y2={60} stroke={TL5.ink} strokeWidth="3" />
          <line x1={200} y1={60} x2={200} y2={0} stroke={TL5.ink} strokeWidth="3" />
          <Coil x={350} y={0} label="Y" />
          <text x={175} y={120} fill={TL5.amberD} fontFamily={MONO5} fontSize="22" fontWeight="700" textAnchor="middle">Y = A + B</text>
        </g>
      </svg>
    </SceneM5>
  );
}

const SCENES_M5C7 = [
  { C: (p) => <TitleCardM5 {...p} claseNo={7} title="Diagramas de escalera (Ladder)" dudur="20–22 min" objetivo="El lenguaje Ladder de la norma IEC 61131-3: contactos, bobinas y los primeros programas de enclavamiento." />, dur: 7, label: 'Apertura' },
  { C: S_What, dur: 13, label: '¿Qué es Ladder?' },
  { C: S_Elements, dur: 12, label: 'Contactos y bobinas' },
  { C: S_Translate, dur: 11, label: 'Booleana → Ladder' },
  { C: S_Motor, dur: 16, label: 'Arranque con sello' },
  { C: (p) => <ClosingM5 {...p} line="El sello de marcha en Ladder es el mismo circuito de relés de siempre — ahora en software, y reconfigurable." activity="Traduce el enclavamiento de una planta de pasteurización a Ladder en TIA Portal, simula con PLCSIM y verifica cada permisivo." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M5C7 = SCENES_M5C7;
