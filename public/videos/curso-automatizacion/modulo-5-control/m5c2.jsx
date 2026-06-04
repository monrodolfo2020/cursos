// m5c2.jsx — "Diagrama de bloques de un sistema de control"
// After m5-lib.jsx. Exports SCENES_M5C2.

function S_Elements({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="El lenguaje del control" y="10%" />
      <CapM5 start={s + 0.6} dur={2.2} size={48} weight={700} y="19%" width={1500}>Tres símbolos describen cualquier lazo.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* block */}
        <g opacity={clamp((t-(s+1.2))/0.5,0,1)}>
          <ArrowM5 x1={210} y1={500} x2={300} y2={500} start={s+1.2} t={t} color={TL5.ink} />
          <rect x={300} y={452} width={170} height={96} rx="12" fill={TL5.paper} stroke={TL5.indigo} strokeWidth="2.6" />
          <text x={385} y={508} fill={TL5.ink} fontFamily={DISP5} fontSize="30" fontWeight="700" textAnchor="middle">G(s)</text>
          <ArrowM5 x1={470} y1={500} x2={560} y2={500} start={s+1.4} t={t} color={TL5.ink} />
          <text x={385} y={600} fill={TL5.mut} fontFamily={DISP5} fontSize="20" textAnchor="middle">Bloque de función</text>
          <text x={385} y={628} fill={TL5.dim} fontFamily={MONO5} fontSize="15" textAnchor="middle">salida = G(s)·entrada</text>
        </g>
        {/* sum */}
        <g opacity={clamp((t-(s+1.9))/0.5,0,1)}>
          <ArrowM5 x1={760} y1={500} x2={836} y2={500} start={s+1.9} t={t} color={TL5.ink} />
          <SumM5 cx={866} cy={500} t={t} appear={s+2.0} />
          <ArrowM5 x1={896} y1={500} x2={980} y2={500} start={s+2.2} t={t} color={TL5.ink} />
          <ArrowM5 x1={866} y1={580} x2={866} y2={530} start={s+2.3} t={t} color={TL5.amberD} />
          <text x={866} y={620} fill={TL5.mut} fontFamily={DISP5} fontSize="20" textAnchor="middle">Punto de suma</text>
          <text x={866} y={648} fill={TL5.dim} fontFamily={MONO5} fontSize="15" textAnchor="middle">error = SP − PV</text>
        </g>
        {/* branch */}
        <g opacity={clamp((t-(s+2.6))/0.5,0,1)}>
          <line x1={1180} y1={500} x2={1340} y2={500} stroke={TL5.ink} strokeWidth="3" />
          <circle cx={1260} cy={500} r="6" fill={TL5.indigoD} />
          <line x1={1260} y1={500} x2={1260} y2={580} stroke={TL5.ink} strokeWidth="3" />
          <polygon points="1340,500 1326,494 1326,506" fill={TL5.ink} />
          <polygon points="1260,580 1254,566 1266,566" fill={TL5.ink} />
          <text x={1260} y={620} fill={TL5.mut} fontFamily={DISP5} fontSize="20" textAnchor="middle">Punto de ramificación</text>
          <text x={1260} y={648} fill={TL5.dim} fontFamily={MONO5} fontSize="15" textAnchor="middle">la señal va a dos destinos</text>
        </g>
      </svg>
    </SceneM5>
  );
}

function S_FullLoop({ start, dur }) {
  const t = useTime(); const s = start;
  const cy = 470;
  const blocks = [
    { x: 430, w: 175, label: 'Gc(s)', sub: 'controlador', acc: TL5.amber, ap: 1.4 },
    { x: 680, w: 165, label: 'Gv(s)', sub: 'válvula', acc: TL5.indigo, ap: 1.7 },
    { x: 1010, w: 165, label: 'Gp(s)', sub: 'proceso', acc: TL5.indigoD, ap: 2.1 },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="El lazo completo en funciones de transferencia" y="8%" />
      <CapM5 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1600}>Cada componente físico es una <span style={{color:TL5.indigoD}}>caja</span> G(s).</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <ArrowM5 x1={170} y1={cy + 48} x2={266} y2={cy + 48} start={s + 1.0} t={t} color={TL5.ink} label="R(s)" />
        <SumM5 cx={296} cy={cy + 48} t={t} appear={s + 1.1} />
        <ArrowM5 x1={326} y1={cy + 48} x2={430} y2={cy + 48} start={s + 1.3} t={t} color={TL5.indigoD} label="E(s)" />
        {blocks.map((b, i) => <BlockM5 key={i} x={b.x} y={cy} w={b.w} h={96} label={b.label} sub={b.sub} accent={b.acc} t={t} appear={s + b.ap} />)}
        <ArrowM5 x1={605} y1={cy + 48} x2={680} y2={cy + 48} start={s + 1.6} t={t} color={TL5.ink} />
        {/* disturbance sum before process */}
        <SumM5 cx={920} cy={cy + 48} t={t} appear={s + 1.9} signs={['+', '+']} />
        <ArrowM5 x1={845} y1={cy + 48} x2={890} y2={cy + 48} start={s + 1.85} t={t} color={TL5.ink} />
        <ArrowM5 x1={920} y1={cy - 60} x2={920} y2={cy + 18} start={s + 2.0} t={t} color={TL5.red} label="D(s)" />
        <ArrowM5 x1={950} y1={cy + 48} x2={1010} y2={cy + 48} start={s + 2.05} t={t} color={TL5.ink} />
        <line x1={1175} y1={cy + 48} x2={1420} y2={cy + 48} stroke={TL5.ink} strokeWidth="3" opacity={clamp((t-(s+2.3))/0.4,0,1)} />
        <polygon points={`1420,${cy+48} 1406,${cy+42} 1406,${cy+54}`} fill={TL5.ink} opacity={clamp((t-(s+2.3))/0.4,0,1)} />
        <text x={1400} y={cy + 30} fill={TL5.ink} fontFamily={MONO5} fontSize="17" fontWeight="600" textAnchor="end" opacity={clamp((t-(s+2.3))/0.4,0,1)}>Y(s) = PV</text>
        <circle cx={1310} cy={cy + 48} r="6" fill={TL5.indigoD} opacity={clamp((t-(s+2.6))/0.4,0,1)} />
        {/* feedback Gm */}
        <g opacity={clamp((t - (s + 2.8)) / 0.6, 0, 1)}>
          <path d={`M1310 ${cy + 48} L1310 ${cy + 200} L296 ${cy + 200} L296 ${cy + 78}`} fill="none" stroke={TL5.indigo} strokeWidth="3" strokeLinecap="round" strokeDasharray="12 10" strokeDashoffset={(t * 34) % 22} />
          <rect x={720} y={cy + 168} width={170} height={64} rx="10" fill={TL5.paper} stroke={TL5.indigo} strokeWidth="2.4" />
          <text x={805} y={cy + 196} fill={TL5.ink} fontFamily={DISP5} fontSize="24" fontWeight="700" textAnchor="middle">Gm(s)</text>
          <text x={805} y={cy + 218} fill={TL5.mut} fontFamily={MONO5} fontSize="14" textAnchor="middle">sensor + tx</text>
          <text x={500} y={cy + 188} fill={TL5.indigo} fontFamily={MONO5} fontSize="15" textAnchor="middle">B(s)</text>
          <polygon points={`296,${cy + 78} 290,${cy + 92} 302,${cy + 92}`} fill={TL5.indigo} />
        </g>
      </svg>
    </SceneM5>
  );
}

function S_Dynamics({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  const reveal = clamp((lt - 1.0) / 3.2, 0, 1);
  // first order: 1-e^{-5u}; dead time: shifted; second order underdamped: overshoot
  const first = (u) => 0.92 * (1 - Math.exp(-4.2 * u));
  const dead = (u) => u < 0.18 ? 0 : 0.92 * (1 - Math.exp(-4.2 * (u - 0.18)));
  const second = (u) => { const wn = 7, z = 0.28; if (u <= 0) return 0; const wd = wn * Math.sqrt(1 - z * z); return 0.92 * (1 - Math.exp(-z * wn * u) * (Math.cos(wd * u) + (z * wn / wd) * Math.sin(wd * u))); };
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="3 comportamientos dinámicos" y="8%" />
      <CapM5 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1600}>Cómo responde una «caja» ante un escalón.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <ChartM5 x={250} y={350} w={760} h={420} t={t} reveal={reveal} sp={0.92} spLabel="valor final"
          series={[
            { fn: first, color: TL5.indigo, width: 5, label: '1er orden' },
            { fn: dead, color: TL5.amber, width: 4, dash: '2 0', label: 'tiempo muerto' },
            { fn: second, color: TL5.red, width: 4, label: '2º orden' },
          ]} />
        {/* 63.2% marker for first order */}
        {reveal > 0.4 && <g opacity={clamp((reveal-0.4)/0.2,0,1)}>
          <line x1={250} y1={350 + 420 - 0.632 * 420} x2={1010} y2={350 + 420 - 0.632 * 420} stroke={TL5.indigoD} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
          <text x={1018} y={350 + 420 - 0.632 * 420 + 5} fill={TL5.indigoD} fontFamily={MONO5} fontSize="14">63.2% en t=τ</text>
        </g>}
      </svg>
      <div style={{position:'absolute', right:'7%', top:'34%', width:480}}>
        {[
          {n:'1er orden', d:'Sube exponencial a su valor. Ganancia K y constante τ.', c:TL5.indigo, a:2.4},
          {n:'Tiempo muerto θ', d:'No responde hasta pasado un retardo. Difícil de controlar.', c:TL5.amberD, a:3.0},
          {n:'2º orden', d:'Tiene inercia: puede sobrepasar y oscilar.', c:TL5.red, a:3.6},
        ].map((it,i)=>{
          const ap = pop5(t, s+it.a, 0.5, 14);
          return <div key={i} style={{marginBottom:18, opacity:ap.op, transform:`translateY(${ap.ty}px)`, background:TL5.paper, border:`1px solid ${TL5.lineS}`, borderLeft:`4px solid ${it.c}`, borderRadius:10, boxShadow:TL5.shadowSm, padding:'16px 22px'}}>
            <div style={{fontFamily:DISP5, fontSize:24, fontWeight:700, color:it.c}}>{it.n}</div>
            <div style={{fontFamily:DISP5, fontSize:17, color:TL5.mut, marginTop:4, lineHeight:1.35}}>{it.d}</div>
          </div>;
        })}
      </div>
    </SceneM5>
  );
}

const SCENES_M5C2 = [
  { C: (p) => <TitleCardM5 {...p} claseNo={2} title="Diagrama de bloques del control" dudur="15–17 min" objetivo="El lenguaje gráfico del control: bloques, sumadores y ramas; y los 3 comportamientos dinámicos básicos." />, dur: 7, label: 'Apertura' },
  { C: S_Elements, dur: 12, label: 'Los 3 elementos' },
  { C: S_FullLoop, dur: 15, label: 'El lazo completo' },
  { C: S_Dynamics, dur: 15, label: 'Dinámica de procesos' },
  { C: (p) => <ClosingM5 {...p} line="El diagrama de bloques deja ver el flujo de información sin abrir ninguna caja." activity="Dibuja el diagrama de bloques de 3 lazos (nivel, temperatura, caudal) e identifica cada bloque con su componente físico real." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M5C2 = SCENES_M5C2;
