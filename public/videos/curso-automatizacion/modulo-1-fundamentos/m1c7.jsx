// m1c7.jsx — "Introducción a los semiconductores (diodos, transistores)"
// After m1-lib.jsx. Exports SCENES_M1C7.

function S_Diodo({ start, dur }) {
  const t = useTime(); const s = start;
  const fwd = popL(t, s + 1.6, 0.6, 20);
  const rev = popL(t, s + 4.2, 0.6, 20);
  const flow = -(t * 60) % 24;
  const B = TL.blue, C = TL.clay;
  const diodeSVG = (pass, color) => (
    <svg viewBox="0 0 640 200" style={{ width: '100%', height: 200 }}>
      <line x1="20" y1="100" x2="270" y2="100" stroke={TL.ink} strokeWidth="3" />
      <line x1="370" y1="100" x2="620" y2="100" stroke={TL.ink} strokeWidth="3" />
      {pass && <line x1="20" y1="100" x2="620" y2="100" stroke={color} strokeWidth="3" strokeDasharray="10 14" strokeDashoffset={flow} strokeLinecap="round" />}
      <polygon points="270,70 270,130 320,100" fill={pass ? color : 'none'} stroke={TL.ink} strokeWidth="3" strokeLinejoin="round" />
      <line x1="320" y1="70" x2="320" y2="130" stroke={TL.ink} strokeWidth="4" />
      <text x="320" y="170" fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="20" textAnchor="middle">{pass ? '→ conduce' : '✕ bloquea'}</text>
    </svg>
  );
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="El diodo: una válvula de un solo sentido" y="10%" />
      <CapL start={s + 0.7} dur={2.4} size={46} weight={600} y="19%" width={1500}>Deja pasar la corriente en una sola dirección.</CapL>
      <div style={{ position: 'absolute', left: 150, top: 380, width: 760, opacity: fwd.op, transform: `translateY(${fwd.ty}px)` }}>
        <div style={{ fontFamily: DISPL, fontSize: 28, fontWeight: 700, color: B, marginBottom: 12 }}>A favor → pasa</div>
        <div style={{ borderRadius: 12, background: TL.paper, border: `1px solid ${TL.lineS}`, boxShadow: TL.shadowSm, padding: '20px 26px' }}>{diodeSVG(true, B)}</div>
      </div>
      <div style={{ position: 'absolute', left: 1010, top: 380, width: 760, opacity: rev.op, transform: `translateY(${rev.ty}px)` }}>
        <div style={{ fontFamily: DISPL, fontSize: 28, fontWeight: 700, color: C, marginBottom: 12 }}>En contra → bloquea</div>
        <div style={{ borderRadius: 12, background: TL.paper, border: `1px solid ${TL.lineS}`, boxShadow: TL.shadowSm, padding: '20px 26px' }}>{diodeSVG(false, C)}</div>
      </div>
      <CapL start={s + 6.6} dur={dur - 6.9} size={30} weight={500} color={TL.mut} y="90%" width={1500}>
        Por eso protege circuitos y convierte AC en DC.
      </CapL>
    </SceneL>
  );
}

function S_Transistor({ start, dur }) {
  const t = useTime(); const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const B = TL.blue, C = TL.clay;
  // pulsing base signal toggles the big current
  const on = Math.sin(t * 1.6) > 0;
  const baseO = seg(1.4), mainO = seg(2.6);
  const flow = -(t * 70) % 24;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="El transistor: un interruptor sin partes móviles" y="9%" />
      <CapL start={s + 0.7} dur={2.4} size={46} weight={600} y="18%" width={1500}>Una señal pequeña controla una corriente grande.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* main line */}
        <g opacity={mainO}>
          <line x1="380" y1="560" x2="1540" y2="560" stroke="rgba(40,90,160,0.22)" strokeWidth="20" strokeLinecap="round" />
          {on && <line x1="380" y1="560" x2="1540" y2="560" stroke={B} strokeWidth="6" strokeLinecap="round" strokeDasharray="16 16" strokeDashoffset={flow} />}
          {/* gate body */}
          <circle cx="960" cy="560" r="56" fill={TL.paper} stroke={TL.ink} strokeWidth="3" />
          <text x="960" y="567" fill={on ? B : TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="22" fontWeight="600" textAnchor="middle">{on ? 'ON' : 'OFF'}</text>
        </g>
        {/* base control */}
        <g opacity={baseO}>
          <line x1="960" y1="380" x2="960" y2="504" stroke={C} strokeWidth="4" strokeDasharray="6 8" />
          <circle cx="960" cy="360" r="30" fill={TL.paper} stroke={C} strokeWidth="2.6" />
          <circle cx="960" cy="360" r="12" fill={on ? C : 'none'} stroke={C} strokeWidth="2" />
        </g>
      </svg>
      <div style={{ position: 'absolute', left: 960, top: 300, transform: 'translateX(-50%)', fontFamily: DISPL, fontSize: 22, fontWeight: 600, color: C, opacity: seg(1.8) }}>Señal de control (base)</div>
      <div style={{ position: 'absolute', left: 430, top: 600, fontFamily: DISPL, fontSize: 22, fontWeight: 600, color: TL.ink, opacity: seg(3.0) }}>Corriente de potencia</div>
      <CapL start={s + 6.6} dur={dur - 6.9} size={30} weight={500} color={TL.mut} y="90%" width={1500}>
        Es la base de toda la electrónica: amplifica y conmuta millones de veces por segundo.
      </CapL>
    </SceneL>
  );
}

const SCENES_M1C7 = [
  { C: (p) => <TitleCardL {...p} claseNo={7} title="Introducción a los semiconductores" dudur="14–16 min" objetivo="Entender qué hacen un diodo y un transistor — los ladrillos de toda la electrónica." />, dur: 7, label: 'Apertura' },
  { C: S_Diodo, dur: 13, label: 'El diodo' },
  { C: S_Transistor, dur: 13, label: 'El transistor' },
  { C: (p) => <ClosingL {...p} line="Diodos y transistores: piezas diminutas que hacen posible cada PLC y cada sensor." activity="Busca qué es un “puente rectificador” y explica cómo usa diodos para convertir AC en DC." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M1C7 = SCENES_M1C7;
