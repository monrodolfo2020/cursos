// m1c8.jsx — "Laboratorio virtual: simulador de circuitos (Tinkercad / Falstad)"
// After m1-lib.jsx. Exports SCENES_M1C8.

function S_Tools({ start, dur }) {
  const t = useTime(); const s = start;
  const tools = [
    { name: 'Tinkercad Circuits', cat: 'ONLINE · SIN INSTALAR', d: 'Arma circuitos con componentes reales y código Arduino, todo en el navegador.', a: TL.blue },
    { name: 'Falstad', cat: 'SIMULADOR DE SEÑALES', d: 'Visualiza voltaje y corriente moviéndose por el circuito en tiempo real.', a: TL.clay },
  ];
  const xs = [220, 1010]; const w = 690;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tu primer laboratorio, sin riesgos" y="12%" />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="22%" width={1500}>Dos simuladores gratuitos para experimentar.</CapL>
      {tools.map((tl, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.5, 0.6, 24);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: 400, width: w, height: 320, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 14, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '34px 36px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontFamily: MONOL, fontSize: 14, letterSpacing: '0.18em', color: tl.a, fontWeight: 600 }}>{tl.cat}</div>
            <div style={{ fontFamily: DISPL, fontSize: 44, fontWeight: 700, color: TL.ink, letterSpacing: '-0.01em' }}>{tl.name}</div>
            <div style={{ fontFamily: DISPL, fontSize: 24, color: TL.mut, lineHeight: 1.4, marginTop: 'auto' }}>{tl.d}</div>
            <BracketsL color={tl.a} size={16} thick={1.5} inset={-1} />
          </div>
        );
      })}
    </SceneL>
  );
}

// Demo: encender un LED
function S_LED({ start, dur }) {
  const t = useTime(); const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const B = TL.blue, C = TL.clay;
  const x0 = 460, x1 = 1460, yT = 380, yB = 700;
  const wireO = seg(1.2), partsO = seg(2.4), litO = seg(4.0);
  const flow = -(t * 60) % 26;
  const glow = litO * (0.6 + 0.4 * Math.sin(t * 4));
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Demo: encender un LED" y="10%" />
      <CapL start={s + 0.7} dur={2.2} size={44} weight={600} y="19%" width={1500}>Pila, resistencia y LED — tu primer circuito.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <g opacity={wireO}>
          <path d={`M ${x0} ${yT} H ${x1} V ${yB} H ${x0} V ${yT}`} fill="none" stroke={TL.ink} strokeWidth="3" strokeLinejoin="round" />
          {litO > 0.05 && <path d={`M ${x0} ${yT} H ${x1} V ${yB} H ${x0} V ${yT}`} fill="none" stroke={B} strokeWidth="3" strokeLinecap="round" strokeDasharray="8 16" strokeDashoffset={flow} />}
        </g>
        {/* battery */}
        <g opacity={partsO}>
          <line x1={x0} y1={yT + 100} x2={x0} y2={yT + 130} stroke={TL.ink} strokeWidth="3" />
          <line x1={x0 - 26} y1={yT + 130} x2={x0 + 26} y2={yT + 130} stroke={TL.ink} strokeWidth="5" />
          <line x1={x0 - 14} y1={yT + 150} x2={x0 + 14} y2={yT + 150} stroke={TL.ink} strokeWidth="3" />
          <line x1={x0 - 26} y1={yT + 170} x2={x0 + 26} y2={yT + 170} stroke={TL.ink} strokeWidth="5" />
          <line x1={x0} y1={yT + 170} x2={x0} y2={yB - 100} stroke={TL.ink} strokeWidth="3" />
          <text x={x0 - 46} y={yT + 150} fill={C} fontFamily="Space Grotesk, sans-serif" fontSize="26" fontWeight="700" textAnchor="end">9 V</text>
        </g>
        {/* resistor (top) */}
        <g opacity={partsO}>
          <path d={`M ${x0 + 260} ${yT} l 14 0 l 8 -18 l 16 36 l 16 -36 l 16 36 l 8 -18 l 14 0`} fill="none" stroke={TL.ink} strokeWidth="3" strokeLinejoin="round" />
          <text x={x0 + 330} y={yT - 30} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="24" fontWeight="700" textAnchor="middle">330 Ω</text>
        </g>
        {/* LED (right side) */}
        <g opacity={partsO}>
          {glow > 0.05 && <circle cx={x1} cy={(yT + yB) / 2} r="46" fill={C} opacity={glow * 0.4} />}
          <polygon points={`${x1 - 22},${(yT + yB) / 2 - 22} ${x1 - 22},${(yT + yB) / 2 + 22} ${x1 + 14},${(yT + yB) / 2}`} fill={litO > 0.5 ? C : 'none'} stroke={TL.ink} strokeWidth="3" strokeLinejoin="round" />
          <line x1={x1 + 14} y1={(yT + yB) / 2 - 22} x2={x1 + 14} y2={(yT + yB) / 2 + 22} stroke={TL.ink} strokeWidth="3" />
        </g>
      </svg>
      {/* readout */}
      <div style={{ position: 'absolute', left: '50%', top: 540, transform: 'translate(-50%,-50%)', opacity: litO, textAlign: 'center', padding: '18px 38px', borderRadius: 12, background: TL.paper, border: `1px solid ${TL.lineS}`, boxShadow: TL.shadow }}>
        <div style={{ fontFamily: MONOL, fontSize: 16, color: TL.mut }}>I ≈ (9 − 2) ÷ 330</div>
        <div style={{ fontFamily: DISPL, fontSize: 40, fontWeight: 700, color: B }}>≈ 21 mA</div>
      </div>
      <CapL start={s + 6.4} dur={dur - 6.7} size={30} weight={500} color={TL.mut} y="92%" width={1500}>
        La resistencia limita la corriente para que el LED no se queme.
      </CapL>
    </SceneL>
  );
}

const SCENES_M1C8 = [
  { C: (p) => <TitleCardL {...p} claseNo={8} title="Laboratorio virtual de circuitos" dudur="16–18 min" objetivo="Montar y simular tu primer circuito en Tinkercad y Falstad — sin componentes físicos." />, dur: 7, label: 'Apertura' },
  { C: S_Tools, dur: 12, label: 'Los simuladores' },
  { C: S_LED, dur: 13, label: 'Demo: el LED' },
  { C: (p) => <ClosingL {...p} line="Simular es aprender sin miedo a equivocarte. Aquí empieza tu práctica." activityLabel="Práctica" activity="Arma en Tinkercad el circuito de LED + resistencia, enciéndelo y mide la corriente real." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M1C8 = SCENES_M1C8;
