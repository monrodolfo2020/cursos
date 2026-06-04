// m5c6.jsx — "Álgebra booleana y compuertas lógicas"
// After m5-lib.jsx. Exports SCENES_M5C6.

// truth-table chip
function TruthTable({ x, y, cols, rows, hi }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols.length}, 64px)`, gap: 0, background: TL5.paper, border: `1px solid ${TL5.lineS}`, borderRadius: 10, overflow: 'hidden', boxShadow: TL5.shadowSm }}>
        {cols.map((c, i) => <div key={'h' + i} style={{ padding: '10px 0', textAlign: 'center', fontFamily: MONO5, fontSize: 17, fontWeight: 700, color: i === cols.length - 1 ? TL5.indigoD : TL5.mut, background: TL5.indigoWash, borderBottom: `1px solid ${TL5.lineS}` }}>{c}</div>)}
        {rows.map((r, ri) => r.map((v, ci) => (
          <div key={ri + '-' + ci} style={{ padding: '9px 0', textAlign: 'center', fontFamily: MONO5, fontSize: 17, fontWeight: ci === r.length - 1 ? 700 : 400, color: ci === r.length - 1 ? (v === 1 ? TL5.ok : TL5.dim) : TL5.ink, background: ci === r.length - 1 && v === 1 ? 'rgba(34,160,107,0.10)' : 'transparent', borderTop: ri ? `1px solid ${TL5.line}` : 'none' }}>{v}</div>
        )))}
      </div>
    </div>
  );
}

function S_Three({ start, dur }) {
  const t = useTime(); const s = start;
  const gates = [
    { type: 'AND', name: 'AND', expr: 'Y = A · B', desc: 'Solo 1 si TODOS son 1', rows: [[0,0,0],[0,1,0],[1,0,0],[1,1,1]], acc: TL5.indigo },
    { type: 'OR', name: 'OR', expr: 'Y = A + B', desc: 'Solo 1 si ALGÚN input es 1', rows: [[0,0,0],[0,1,1],[1,0,1],[1,1,1]], acc: TL5.amber },
    { type: 'NOT', name: 'NOT', expr: 'Y = Ā', desc: 'Invierte el valor', rows: [[0,1],[1,0]], acc: TL5.indigoD },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Las 3 operaciones fundamentales" y="9%" />
      <CapM5 start={s + 0.6} dur={2.0} size={48} weight={700} y="17%" width={1500}>Toda la lógica del PLC nace de aquí.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {gates.map((g, i) => (
          <g key={i} opacity={clamp((t - (s + 1.2 + i * 0.5)) / 0.5, 0, 1)} transform={`translate(${200 + i * 540} 380)`}>
            <LogicGateM5 x={120} y={0} type={g.type} scale={1.5} color={g.acc} />
            <line x1={60} y1={30} x2={120} y2={30} stroke={TL5.ink} strokeWidth="2.6" />
            {g.type !== 'NOT' && <line x1={60} y1={75} x2={120} y2={75} stroke={TL5.ink} strokeWidth="2.6" />}
            <text x={48} y={36} fill={TL5.mut} fontFamily={MONO5} fontSize="20" textAnchor="end">A</text>
            {g.type !== 'NOT' && <text x={48} y={81} fill={TL5.mut} fontFamily={MONO5} fontSize="20" textAnchor="end">B</text>}
            <line x1={g.type==='NOT'?255:255} y1={g.type==='NOT'?52:52} x2={300} y2={52} stroke={TL5.ink} strokeWidth="2.6" />
            <text x={315} y={58} fill={g.acc} fontFamily={MONO5} fontSize="20" fontWeight="700">Y</text>
          </g>
        ))}
      </svg>
      {gates.map((g, i) => (
        <div key={i} style={{ position: 'absolute', left: 200 + i * 540, top: 520, width: 360, opacity: clamp((t - (s + 1.6 + i * 0.5)) / 0.5, 0, 1) }}>
          <div style={{ fontFamily: DISP5, fontSize: 30, fontWeight: 700, color: g.acc }}>{g.name}</div>
          <div style={{ fontFamily: MONO5, fontSize: 22, color: TL5.ink, margin: '4px 0' }}>{g.expr}</div>
          <div style={{ fontFamily: DISP5, fontSize: 17, color: TL5.mut }}>{g.desc}</div>
        </div>
      ))}
      {gates.map((g, i) => (
        <div key={'tt'+i} style={{ opacity: clamp((t - (s + 2.0 + i * 0.5)) / 0.5, 0, 1) }}>
          <TruthTable x={200 + i * 540} y={660} cols={g.type === 'NOT' ? ['A', 'Y'] : ['A', 'B', 'Y']} rows={g.rows} />
        </div>
      ))}
    </SceneM5>
  );
}

function S_Derived({ start, dur }) {
  const t = useTime(); const s = start;
  const gates = [
    { type: 'NAND', name: 'NAND', desc: '0 solo si todos son 1. Universal.', acc: TL5.indigo },
    { type: 'NOR', name: 'NOR', desc: '1 solo si todos son 0. Universal.', acc: TL5.amber },
    { type: 'XOR', name: 'XOR', desc: '1 si los inputs son distintos.', acc: TL5.indigoD },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Compuertas derivadas" y="13%" />
      <CapM5 start={s + 0.6} dur={2.0} size={48} weight={700} y="23%" width={1500}>Combinaciones que aparecen todo el tiempo.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {gates.map((g, i) => (
          <g key={i} opacity={clamp((t - (s + 1.2 + i * 0.45)) / 0.5, 0, 1)} transform={`translate(${260 + i * 500} 470)`}>
            <LogicGateM5 x={100} y={0} type={g.type} scale={1.7} color={g.acc} />
          </g>
        ))}
      </svg>
      {gates.map((g, i) => (
        <div key={i} style={{ position: 'absolute', left: 250 + i * 500, top: 620, width: 380, textAlign: 'center', opacity: clamp((t - (s + 1.6 + i * 0.45)) / 0.5, 0, 1) }}>
          <div style={{ fontFamily: DISP5, fontSize: 32, fontWeight: 700, color: g.acc }}>{g.name}</div>
          <div style={{ fontFamily: DISP5, fontSize: 19, color: TL5.mut, marginTop: 6, lineHeight: 1.35 }}>{g.desc}</div>
        </div>
      ))}
    </SceneM5>
  );
}

function S_DeMorgan({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Leyes de DeMorgan" y="9%" />
      <CapM5 start={s + 0.6} dur={2.0} size={44} weight={600} y="17%" width={1600}>La herramienta clave para invertir enclavamientos.</CapM5>
      <div style={{position:'absolute', left:'50%', top:'34%', transform:'translateX(-50%)', textAlign:'center'}}>
        {[
          {e:'A · B  =  Ā + B̄', a:1.2},
          {e:'A + B  =  Ā · B̄', a:1.7},
        ].map((it,i)=>{
          const ap = pop5(t, s+it.a, 0.5, 16);
          return <div key={i} style={{opacity:ap.op, transform:`translateY(${ap.ty}px)`, fontFamily:MONO5, fontSize:48, fontWeight:600, color:TL5.indigoD, margin:'14px 0', background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderRadius:12, boxShadow:TL5.shadowSm, padding:'18px 40px', display:'inline-block'}}>
            <span style={{textDecoration:'overline'}}>{it.e.split('=')[0]}</span>=<span>{it.e.split('=')[1]}</span>
          </div>;
        })}
      </div>
      <div style={{position:'absolute', left:'50%', top:'66%', transform:'translateX(-50%)', width:1200, opacity:clamp((t-(s+2.6))/0.6,0,1)}}>
        <div style={{background:TL5.amberWash, border:`1px solid ${TL5.amber}`, borderRadius:12, padding:'24px 32px'}}>
          <div style={{fontFamily:MONO5, fontSize:14, letterSpacing:'0.14em', color:TL5.amberD, textTransform:'uppercase'}}>Aplicación en el PLC</div>
          <div style={{fontFamily:MONO5, fontSize:23, color:TL5.ink, marginTop:10, lineHeight:1.6}}>
            PARO = LSL + PSH + TSHH<br/>
            MARCHA = <span style={{textDecoration:'overline'}}>PARO</span> = <span style={{textDecoration:'overline'}}>LSL</span> · <span style={{textDecoration:'overline'}}>PSH</span> · <span style={{textDecoration:'overline'}}>TSHH</span> = <b style={{color:TL5.ok}}>nivel OK Y presión OK Y temperatura OK</b>
          </div>
        </div>
      </div>
    </SceneM5>
  );
}

const SCENES_M5C6 = [
  { C: (p) => <TitleCardM5 {...p} claseNo={6} title="Álgebra booleana y compuertas" dudur="16–18 min" objetivo="El fundamento matemático de la lógica de control: AND, OR, NOT, las derivadas y las leyes de DeMorgan." />, dur: 7, label: 'Apertura' },
  { C: S_Three, dur: 15, label: 'AND · OR · NOT' },
  { C: S_Derived, dur: 11, label: 'NAND · NOR · XOR' },
  { C: S_DeMorgan, dur: 13, label: 'DeMorgan' },
  { C: (p) => <ClosingM5 {...p} line="Cada enclavamiento de seguridad es una expresión booleana implementada en el PLC." activity="Recibe 5 enclavamientos descritos en palabras: escribe la expresión, la tabla de verdad, simplifica con DeMorgan y dibuja las compuertas." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M5C6 = SCENES_M5C6;
