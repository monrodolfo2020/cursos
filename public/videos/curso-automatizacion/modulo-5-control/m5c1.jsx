// m5c1.jsx — "Sistemas de control: lazo abierto vs lazo cerrado"
// After m5-lib.jsx. Exports SCENES_M5C1.

function S_ThreeEl({ start, dur }) {
  const t = useTime(); const s = start;
  const els = [
    { title: 'Sensor', sub: 'Mide la variable de proceso.', word: 'MIDE', acc: TL5.indigo },
    { title: 'Controlador', sub: 'Compara y decide la acción.', word: 'DECIDE', acc: TL5.amber },
    { title: 'Actuador', sub: 'Ejecuta el cambio físico.', word: 'ACTÚA', acc: TL5.indigoD },
  ];
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Todo control tiene 3 elementos" y="14%" />
      <CapM5 start={s + 0.6} dur={2.2} size={52} weight={700} y="24%" width={1500}>Medir, decidir, actuar.</CapM5>
      {els.map((e, i) => (
        <InfoCardM5 key={i} x={300 + i * 470} y={420} w={400} h={300} title={e.title} sub={e.sub} accent={e.acc} appear={s + 1.2 + i * 0.5} t={t} />
      ))}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {els.map((e, i) => (
          <text key={i} x={500 + i * 470} y={690} fill={e.acc} fontFamily={MONO5} fontSize="20" fontWeight="700" textAnchor="middle" opacity={clamp((t - (s + 1.6 + i * 0.5)) / 0.5, 0, 1)} letterSpacing="0.18em">{e.word}</text>
        ))}
        {[0, 1].map(i => (
          <ArrowM5 key={i} x1={700 + i * 470} y1={780} x2={770 + i * 470} y2={780} start={s + 2.0 + i * 0.4} t={t} color={TL5.dim} />
        ))}
      </svg>
    </SceneM5>
  );
}

function S_Open({ start, dur }) {
  const t = useTime(); const s = start;
  const cy = 470;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Lazo abierto" y="9%" color={TL5.amberD} />
      <CapM5 start={s + 0.6} dur={2.2} size={46} weight={600} y="17%" width={1560}>Actúa <span style={{color:TL5.amberD}}>sin verificar</span> el resultado. No hay retroalimentación.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <ArrowM5 x1={170} y1={cy + 48} x2={310} y2={cy + 48} start={s + 1.0} t={t} color={TL5.ink} label="SP" />
        <BlockM5 x={310} y={cy} w={210} h={96} label="Controlador" t={t} appear={s + 1.2} accent={TL5.amber} />
        <ArrowM5 x1={520} y1={cy + 48} x2={640} y2={cy + 48} start={s + 1.5} t={t} color={TL5.ink} />
        <BlockM5 x={640} y={cy} w={210} h={96} label="Actuador" t={t} appear={s + 1.6} accent={TL5.indigo} />
        <ArrowM5 x1={850} y1={cy + 48} x2={970} y2={cy + 48} start={s + 1.9} t={t} color={TL5.ink} />
        <BlockM5 x={970} y={cy} w={210} h={96} label="Proceso" t={t} appear={s + 2.0} accent={TL5.indigoD} />
        <ArrowM5 x1={1180} y1={cy + 48} x2={1360} y2={cy + 48} start={s + 2.3} t={t} color={TL5.ink} label="Salida" />
        {/* crossed-out feedback */}
        <g opacity={clamp((t - (s + 3.0)) / 0.6, 0, 1)}>
          <path d={`M1265 ${cy + 48} L1265 ${cy + 200} L600 ${cy + 200} L600 ${cy + 96}`} fill="none" stroke={TL5.dim} strokeWidth="2.4" strokeDasharray="8 8" opacity="0.55" />
          <line x1={900} y1={cy + 170} x2={965} y2={cy + 230} stroke={TL5.red} strokeWidth="4" strokeLinecap="round" />
          <line x1={965} y1={cy + 170} x2={900} y2={cy + 230} stroke={TL5.red} strokeWidth="4" strokeLinecap="round" />
          <text x={933} y={cy + 268} fill={TL5.red} fontFamily={MONO5} fontSize="17" fontWeight="600" textAnchor="middle">la salida no se mide</text>
        </g>
      </svg>
      <div style={{position:'absolute', left:'50%', top:'80%', transform:'translateX(-50%)', textAlign:'center', opacity:clamp((t-(s+4.2))/0.6,0,1)}}>
        <div style={{fontFamily:DISP5, fontSize:26, color:TL5.mut, lineHeight:1.4}}>Ej.: lavadora que abre vapor <b style={{color:TL5.ink}}>45 min exactos</b> — sin medir la temperatura real.</div>
      </div>
    </SceneM5>
  );
}

function S_Closed({ start, dur }) {
  const t = useTime(); const s = start;
  const cy = 460;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Lazo cerrado · feedback" y="9%" />
      <CapM5 start={s + 0.6} dur={2.2} size={46} weight={600} y="17%" width={1560}>Mide la salida y <span style={{color:TL5.indigoD}}>corrige el error</span> continuamente.</CapM5>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <ArrowM5 x1={140} y1={cy + 48} x2={236} y2={cy + 48} start={s + 1.0} t={t} color={TL5.ink} label="SP" />
        <SumM5 cx={266} cy={cy + 48} t={t} appear={s + 1.1} />
        <ArrowM5 x1={296} y1={cy + 48} x2={400} y2={cy + 48} start={s + 1.3} t={t} color={TL5.indigoD} label="error" />
        <BlockM5 x={400} y={cy} w={190} h={96} label="Controlador" sub="PID" t={t} appear={s + 1.4} accent={TL5.amber} />
        <ArrowM5 x1={590} y1={cy + 48} x2={690} y2={cy + 48} start={s + 1.7} t={t} color={TL5.ink} />
        <BlockM5 x={690} y={cy} w={180} h={96} label="Actuador" t={t} appear={s + 1.8} accent={TL5.indigo} />
        <ArrowM5 x1={870} y1={cy + 48} x2={970} y2={cy + 48} start={s + 2.0} t={t} color={TL5.ink} />
        <BlockM5 x={970} y={cy} w={180} h={96} label="Proceso" t={t} appear={s + 2.1} accent={TL5.indigoD} />
        <ArrowM5 x1={1150} y1={cy + 48} x2={1380} y2={cy + 48} start={s + 2.4} t={t} color={TL5.ink} label="PV" />
        {/* disturbance */}
        <g opacity={clamp((t - (s + 3.4)) / 0.5, 0, 1)}>
          <ArrowM5 x1={1060} y1={cy - 110} x2={1060} y2={cy} start={s + 3.4} t={t} color={TL5.red} />
          <text x={1060} y={cy - 124} fill={TL5.red} fontFamily={MONO5} fontSize="17" fontWeight="600" textAnchor="middle">perturbación</text>
        </g>
        {/* feedback loop */}
        <g opacity={clamp((t - (s + 2.8)) / 0.6, 0, 1)}>
          <path d={`M1290 ${cy + 96} L1290 ${cy + 230} L266 ${cy + 230} L266 ${cy + 78}`} fill="none" stroke={TL5.indigo} strokeWidth="3" strokeLinecap="round" strokeDasharray="12 10" strokeDashoffset={(t * 34) % 22} />
          <rect x={700} y={cy + 200} width={160} height={60} rx="10" fill={TL5.paper} stroke={TL5.indigo} strokeWidth="2.4" />
          <text x={780} y={cy + 237} fill={TL5.ink} fontFamily={DISP5} fontSize="22" fontWeight="700" textAnchor="middle">Sensor</text>
          <polygon points={`280,${cy + 78} 274,${cy + 92} 286,${cy + 92}`} fill={TL5.indigo} />
        </g>
      </svg>
      <CapM5 start={s + 5.4} dur={dur - 5.7} size={26} weight={500} color={TL5.mut} y="86%" width={1500}>El error = SP − PV mueve al actuador hasta que PV ≈ SP, pase lo que pase.</CapM5>
    </SceneM5>
  );
}

function S_Fwd({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM5 start={start} dur={dur}>
      <KickerM5 start={s + 0.3} dur={dur - 0.5} text="Reactivo vs proactivo" y="12%" />
      <CapM5 start={s + 0.6} dur={2.2} size={50} weight={700} y="22%" width={1500}>Feedback corrige <i>después</i>; feedforward corrige <i>antes</i>.</CapM5>
      <InfoCardM5 x={300} y={420} w={560} h={340} no={1} accent={TL5.indigo} title="Feedback" sub="Reacciona cuando la perturbación ya movió la PV. Es el PID. Imprescindible." appear={s + 1.2} t={t} />
      <InfoCardM5 x={1060} y={420} w={560} h={340} no={2} accent={TL5.amber} title="Feedforward" sub="Mide la perturbación y corrige antes de que aparezca el error. Siempre acompaña al feedback." appear={s + 1.7} t={t} />
    </SceneM5>
  );
}

const SCENES_M5C1 = [
  { C: (p) => <TitleCardM5 {...p} claseNo={1} title="Lazo abierto vs lazo cerrado" dudur="16–18 min" objetivo="Las dos arquitecturas base del control: cuándo basta actuar a ciegas y cuándo hay que cerrar el lazo." />, dur: 7, label: 'Apertura' },
  { C: S_ThreeEl, dur: 11, label: 'Sensor·Controlador·Actuador' },
  { C: S_Open, dur: 14, label: 'Lazo abierto' },
  { C: S_Closed, dur: 16, label: 'Lazo cerrado' },
  { C: S_Fwd, dur: 11, label: 'Feedback vs feedforward' },
  { C: (p) => <ClosingM5 {...p} line="El lazo cerrado no necesita saber la causa de la perturbación: la ve en la PV y la corrige." activity="Analiza 8 sistemas, clasifícalos como abierto o cerrado, identifica sensor/controlador/actuador y convierte los abiertos en cerrados." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M5C1 = SCENES_M5C1;
