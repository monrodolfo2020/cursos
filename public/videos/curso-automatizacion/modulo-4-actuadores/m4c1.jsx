// m4c1.jsx — "Válvulas de control: el elemento final más universal"
// After m4-lib.jsx. Exports SCENES_M4C1.

// A control valve drawn in SVG: pipe + globe body + actuator dome + positioner.
// `open` 0..1 modulates the plug height and the flow dash density.
function ControlValve({ cx = 960, cy = 600, open = 0.6, t = 0, appear = 0, accent = TL4.blue }) {
  const e = Easing.easeOutCubic(clamp((t - appear) / 0.7, 0, 1));
  const plugY = cy - 86 - open * 40;     // plug rises as it opens
  const flow = -(t * 36) % 24;
  const dashGap = 28 - open * 16;        // tighter dashes = more flow
  return (
    <g opacity={e}>
      {/* pipe */}
      <path d={`M${cx - 600} ${cy} L${cx + 600} ${cy}`} fill="none" stroke="rgba(47,134,230,0.16)" strokeWidth="44" strokeLinecap="round" />
      <path d={`M${cx - 600} ${cy} L${cx - 90} ${cy}`} fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" strokeDasharray={`12 ${dashGap}`} strokeDashoffset={flow} />
      <path d={`M${cx + 90} ${cy} L${cx + 600} ${cy}`} fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" strokeDasharray={`12 ${dashGap}`} strokeDashoffset={flow} opacity={0.4 + open * 0.6} />
      {/* valve body (globe) */}
      <path d={`M${cx - 92} ${cy - 46} L${cx + 92} ${cy - 46} L${cx + 60} ${cy + 46} L${cx - 60} ${cy + 46} Z`} fill={TL4.paper} stroke={TL4.ink} strokeWidth="3" />
      {/* seat */}
      <line x1={cx - 30} y1={cy + 8} x2={cx + 30} y2={cy + 8} stroke={TL4.ink} strokeWidth="3" />
      {/* plug + stem */}
      <line x1={cx} y1={plugY} x2={cx} y2={cy + 6} stroke={TL4.ink} strokeWidth="5" />
      <path d={`M${cx - 22} ${cy + 6} L${cx + 22} ${cy + 6} L${cx + 12} ${cy - 14} L${cx - 12} ${cy - 14} Z`} fill={accent} stroke={TL4.ink} strokeWidth="2.5" />
      {/* stem up to actuator */}
      <line x1={cx} y1={cy - 46} x2={cx} y2={plugY - 4} stroke={TL4.ink} strokeWidth="5" />
      <line x1={cx} y1={cy - 130} x2={cx} y2={cy - 46} stroke={TL4.ink} strokeWidth="5" />
      {/* actuator diaphragm dome */}
      <path d={`M${cx - 96} ${cy - 150} Q${cx} ${cy - 232} ${cx + 96} ${cy - 150} L${cx + 96} ${cy - 130} L${cx - 96} ${cy - 130} Z`} fill={TL4.paper} stroke={TL4.ink} strokeWidth="3" />
      <line x1={cx - 70} y1={cy - 168} x2={cx + 70} y2={cy - 168} stroke={TL4.lineS} strokeWidth="2" />
      {/* positioner box */}
      <rect x={cx + 96} y={cy - 150} width="72" height="50" rx="6" fill={TL4.paper} stroke={accent} strokeWidth="2.6" />
      <text x={cx + 132} y={cy - 119} fill={accent} fontFamily="IBM Plex Mono, monospace" fontSize="16" fontWeight="700" textAnchor="middle">P</text>
    </g>
  );
}

function S_Universal({ start, dur }) {
  const t = useTime(); const s = start;
  const open = 0.32 + 0.34 * (0.5 + 0.5 * Math.sin((t - s) * 0.9));
  const sig = clamp((t - (s + 1.2)) / 0.8, 0, 1);
  const cx = 940, cy = 600;
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="El elemento final más universal" y="9%" />
      <CapM4 start={s + 0.7} dur={2.4} size={46} weight={600} y="17%" width={1500}>No abre o cierra: <span style={{color:TL4.orangeD}}>regula</span> el caudal de forma continua.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <ControlValve cx={cx} cy={cy} open={open} t={t} appear={s + 0.9} />
        {/* control signal into positioner */}
        {sig > 0.02 && <g opacity={sig}>
          <path d={`M${cx + 360} ${cy - 240} L${cx + 168} ${cy - 125}`} fill="none" stroke={TL4.orange} strokeWidth="4" strokeLinecap="round" strokeDasharray="12 10" strokeDashoffset={-(t * 40) % 22} />
          <text x={cx + 372} y={cy - 248} fill={TL4.orangeD} fontFamily="IBM Plex Mono, monospace" fontSize="20" fontWeight="600">4–20 mA</text>
          <text x={cx + 372} y={cy - 222} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15">señal del controlador</text>
        </g>}
        {/* opening readout */}
        <g opacity={clamp((t-(s+1.6))/0.6,0,1)}>
          <text x={cx} y={cy + 150} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="17" textAnchor="middle">Apertura del obturador</text>
          <text x={cx} y={cy + 190} fill={TL4.blueD} fontFamily="Space Grotesk, sans-serif" fontSize="40" fontWeight="700" textAnchor="middle">{Math.round(open * 100)}%</text>
        </g>
      </svg>
      <CapM4 start={s + 6.6} dur={dur - 6.9} size={29} weight={500} color={TL4.mut} y="92%" width={1500}>
        La señal posiciona el obturador en cualquier punto entre 0 y 100%.
      </CapM4>
    </SceneM4>
  );
}

function S_Parts({ start, dur }) {
  const t = useTime(); const s = start;
  const parts = [
    { n: 1, Icon: IcoActuator, title: 'Actuador', sub: 'La fuerza motriz: neumático, eléctrico o hidráulico.', acc: TL4.blue },
    { n: 2, Icon: IcoGaugeM4, title: 'Posicionador', sub: 'El controlador local que verifica la posición real.', acc: TL4.orange },
    { n: 3, Icon: IcoValve, title: 'Cuerpo de válvula', sub: 'Donde pasa el fluido y se regula el caudal.', acc: TL4.blueD },
  ];
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Tres partes, un solo conjunto" y="11%" />
      <CapM4 start={s + 0.6} dur={2.2} size={50} weight={700} y="20%" width={1500}>Toda válvula de control son tres piezas apiladas.</CapM4>
      {parts.map((p, i) => (
        <InfoCardM4 key={i} x={250 + i * 490} y={420} w={420} h={330} no={p.n} Icon={p.Icon} accent={p.acc} title={p.title} sub={p.sub} appear={s + 1.2 + i * 0.5} t={t} />
      ))}
      {/* connecting arrows top→down sense */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {[0, 1].map(i => (
          <g key={i} opacity={clamp((t - (s + 2.0 + i * 0.5)) / 0.5, 0, 1)}>
            <line x1={670 + i * 490} y1={585} x2={740 + i * 490} y2={585} stroke={TL4.dim} strokeWidth="3" strokeLinecap="round" />
            <polygon points={`${740 + i * 490},578 ${752 + i * 490},585 ${740 + i * 490},592`} fill={TL4.dim} />
          </g>
        ))}
      </svg>
    </SceneM4>
  );
}

function S_Types({ start, dur }) {
  const t = useTime(); const s = start;
  const cards = [
    { Icon: IcoValve, title: 'Globo', sub: 'Control continuo y preciso. La más usada en proceso.', acc: TL4.blue },
    { Icon: IcoValve, title: 'Mariposa', sub: 'Compacta y económica para diámetros grandes.', acc: TL4.orange },
    { Icon: IcoValve, title: 'Bola', sub: 'Estanqueidad total. On/off rápido (V-ball para control).', acc: TL4.blueD },
  ];
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Tipos de cuerpo" y="11%" />
      <CapM4 start={s + 0.6} dur={2.2} size={50} weight={700} y="20%" width={1500}>El cuerpo decide cómo se comporta el caudal.</CapM4>
      {cards.map((c, i) => (
        <InfoCardM4 key={i} x={250 + i * 490} y={420} w={420} h={320} Icon={c.Icon} accent={c.acc} title={c.title} sub={c.sub} appear={s + 1.2 + i * 0.45} t={t} />
      ))}
    </SceneM4>
  );
}

function S_Fail({ start, dur }) {
  const t = useTime(); const s = start;
  const modes = [
    { code: 'FC', title: 'Fail Closed', sub: 'Cierra al fallar. Fluidos peligrosos o combustibles.', open: 0, acc: TL4.blue },
    { code: 'FO', title: 'Fail Open', sub: 'Abre al fallar. Servicios de enfriamiento críticos.', open: 1, acc: TL4.orange },
    { code: 'FL', title: 'Fail Last', sub: 'Queda en su última posición. Ni abrir ni cerrar es seguro.', open: 0.55, acc: TL4.blueD },
  ];
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="¿Y si falla el aire o la señal?" y="10%" />
      <CapM4 start={s + 0.6} dur={2.4} size={48} weight={700} y="19%" width={1500}>La condición de falla se decide por <span style={{color:TL4.orangeD}}>seguridad</span>.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {modes.map((m, i) => {
          const cx = 430 + i * 540, cy = 560;
          const ap = clamp((t - (s + 1.2 + i * 0.5)) / 0.5, 0, 1);
          return (
            <g key={i} opacity={ap}>
              {/* mini valve */}
              <path d={`M${cx - 240} ${cy} L${cx + 240} ${cy}`} stroke="rgba(47,134,230,0.14)" strokeWidth="30" strokeLinecap="round" />
              <path d={`M${cx - 60} ${cy - 34} L${cx + 60} ${cy - 34} L${cx + 38} ${cy + 34} L${cx - 38} ${cy + 34} Z`} fill={TL4.paper} stroke={TL4.ink} strokeWidth="2.6" />
              <path d={`M${cx - 16} ${cy + 4} L${cx + 16} ${cy + 4} L${cx + 9} ${cy + 4 - (8 + m.open * 26)} L${cx - 9} ${cy + 4 - (8 + m.open * 26)} Z`} fill={m.acc} stroke={TL4.ink} strokeWidth="2" />
              {m.open > 0 && <path d={`M${cx + 70} ${cy} L${cx + 230} ${cy}`} stroke={m.acc} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" strokeDashoffset={-(t * 36) % 20} opacity={m.open} />}
              <text x={cx} y={cy - 90} fill={m.acc} fontFamily="Space Grotesk, sans-serif" fontSize="56" fontWeight="700" textAnchor="middle">{m.code}</text>
              <text x={cx} y={cy + 110} fill={TL4.ink} fontFamily="Space Grotesk, sans-serif" fontSize="26" fontWeight="600" textAnchor="middle">{m.title}</text>
              <foreignObject x={cx - 220} y={cy + 124} width="440" height="100">
                <div style={{ fontFamily: DISP4, fontSize: 19, color: TL4.mut, textAlign: 'center', lineHeight: 1.35 }}>{m.sub}</div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </SceneM4>
  );
}

const SCENES_M4C1 = [
  { C: (p) => <TitleCardM4 {...p} claseNo={1} title="Válvulas de control" dudur="20–22 min" objetivo="El elemento final más universal: tipos, partes, características de flujo y condición de falla." />, dur: 7, label: 'Apertura' },
  { C: S_Universal, dur: 13, label: 'Regula, no bloquea' },
  { C: S_Parts, dur: 12, label: 'Las 3 partes' },
  { C: S_Types, dur: 11, label: 'Tipos de cuerpo' },
  { C: S_Fail, dur: 13, label: 'Condición de falla' },
  { C: (p) => <ClosingM4 {...p} line="La válvula es el músculo del lazo: traduce una orden eléctrica en caudal real." activity="Para 8 aplicaciones, elige tipo de cuerpo, característica de flujo y condición de falla — justificando con seguridad." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M4C1 = SCENES_M4C1;
