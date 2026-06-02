// m1c3.jsx — "Ley de Ohm y circuitos eléctricos básicos"
// After m1-lib.jsx. Exports SCENES_M1C3.

// El triángulo de Ohm
function S_Ohm({ start, dur }) {
  const t = useTime(); const s = start;
  const cx = 700, cy = 540, R = 170;
  const V = popL(t, s + 1.4, 0.6, 0);
  const I = popL(t, s + 2.0, 0.6, 0);
  const Rr = popL(t, s + 2.6, 0.6, 0);
  const forms = [
    { lbl: 'V = I × R', d: 'el voltaje', a: TL.blue, app: s + 4.0 },
    { lbl: 'I = V ÷ R', d: 'la corriente', a: TL.clay, app: s + 5.0 },
    { lbl: 'R = V ÷ I', d: 'la resistencia', a: TL.blue, app: s + 6.0 },
  ];
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="La ley más importante" y="10%" />
      <CapL start={s + 0.7} dur={2.4} size={48} weight={600} y="19%" width={1500}>Tres magnitudes, una sola relación.</CapL>
      {/* triangle */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <path d={`M ${cx} ${cy - R} L ${cx - R} ${cy + R * 0.7} L ${cx + R} ${cy + R * 0.7} Z`} fill={TL.paper} stroke={TL.ink} strokeWidth="2.6" opacity={V.op} style={{ filter: 'drop-shadow(0 8px 20px rgba(30,55,90,0.10))' }} />
        <line x1={cx - R + 30} y1={cy + R * 0.2} x2={cx + R - 30} y2={cy + R * 0.2} stroke={TL.lineS} strokeWidth="2" opacity={I.op} />
      </svg>
      <div style={{ position: 'absolute', left: cx, top: cy - R * 0.55, transform: 'translate(-50%,-50%)', opacity: V.op, fontFamily: DISPL, fontSize: 76, fontWeight: 700, color: TL.blue }}>V</div>
      <div style={{ position: 'absolute', left: cx - R * 0.5, top: cy + R * 0.42, transform: 'translate(-50%,-50%)', opacity: I.op, fontFamily: DISPL, fontSize: 64, fontWeight: 700, color: TL.clay }}>I</div>
      <div style={{ position: 'absolute', left: cx + R * 0.5, top: cy + R * 0.42, transform: 'translate(-50%,-50%)', opacity: Rr.op, fontFamily: DISPL, fontSize: 64, fontWeight: 700, color: TL.ink }}>R</div>
      {/* forms */}
      <div style={{ position: 'absolute', left: 1130, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {forms.map((f, i) => {
          const p = popL(t, f.app, 0.5, 16);
          return (
            <div key={i} style={{ opacity: p.op, transform: `translateY(${p.ty}px)`, display: 'flex', alignItems: 'baseline', gap: 18 }}>
              <span style={{ fontFamily: MONOL, fontSize: 46, fontWeight: 600, color: f.a }}>{f.lbl}</span>
              <span style={{ fontFamily: DISPL, fontSize: 22, color: TL.mut }}>para hallar {f.d}</span>
            </div>
          );
        })}
      </div>
      <CapL start={s + 7.6} dur={dur - 7.9} size={30} weight={500} color={TL.mut} y="88%" width={1500}>
        Tapa la que buscas con el dedo y la fórmula aparece sola.
      </CapL>
    </SceneL>
  );
}

// Circuito básico
function S_Circuito({ start, dur }) {
  const t = useTime(); const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const B = TL.blue, C = TL.clay;
  const x0 = 520, x1 = 1400, yT = 360, yB = 720;
  const dash = -(t * 60) % 26;
  const wireO = seg(1.2), partsO = seg(2.4), valsO = seg(4.0);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="La ley en acción" y="11%" />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="21%" width={1500}>Una pila, una resistencia, una corriente.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* wires */}
        <g opacity={wireO}>
          <path d={`M ${x0} ${yT} H ${x1} V ${yB} H ${x0} V ${yT}`} fill="none" stroke={TL.ink} strokeWidth="3" strokeLinejoin="round" />
          <path d={`M ${x0} ${yT} H ${x1} V ${yB} H ${x0} V ${yT}`} fill="none" stroke={B} strokeWidth="3" strokeLinecap="round" strokeDasharray="8 16" strokeDashoffset={dash} opacity={partsO} />
        </g>
        {/* battery (left side) */}
        <g opacity={partsO}>
          <line x1={x0} y1={yT + 90} x2={x0} y2={yT + 130} stroke={TL.ink} strokeWidth="3" />
          <line x1={x0 - 26} y1={yT + 130} x2={x0 + 26} y2={yT + 130} stroke={TL.ink} strokeWidth="5" />
          <line x1={x0 - 14} y1={yT + 150} x2={x0 + 14} y2={yT + 150} stroke={TL.ink} strokeWidth="3" />
          <line x1={x0 - 26} y1={yT + 170} x2={x0 + 26} y2={yT + 170} stroke={TL.ink} strokeWidth="5" />
          <line x1={x0} y1={yT + 170} x2={x0} y2={yB - 90} stroke={TL.ink} strokeWidth="3" />
          <text x={x0 - 50} y={yT + 145} fill={C} fontFamily="Space Grotesk, sans-serif" fontSize="30" fontWeight="700" textAnchor="end">12 V</text>
        </g>
        {/* resistor (right side) */}
        <g opacity={partsO}>
          <path d={`M ${x1} ${yT + 70} l 0 14 l -22 8 l 44 16 l -44 16 l 44 16 l -22 8 l 0 14`} transform={`translate(0,20)`} fill="none" stroke={TL.ink} strokeWidth="3" strokeLinejoin="round" />
          <text x={x1 + 50} y={yT + 150} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="30" fontWeight="700">6 Ω</text>
        </g>
      </svg>
      {/* result */}
      <div style={{ position: 'absolute', left: '50%', top: 540, transform: 'translate(-50%,-50%)', opacity: valsO, textAlign: 'center', padding: '24px 44px', borderRadius: 12, background: TL.paper, border: `1px solid ${TL.lineS}`, boxShadow: TL.shadow }}>
        <div style={{ fontFamily: MONOL, fontSize: 18, color: TL.mut, letterSpacing: '0.1em' }}>I = V ÷ R = 12 ÷ 6</div>
        <div style={{ fontFamily: DISPL, fontSize: 56, fontWeight: 700, color: B, marginTop: 6 }}>2 amperes</div>
      </div>
      <CapL start={s + 6.4} dur={dur - 6.7} size={30} weight={500} color={TL.mut} y="90%" width={1500}>
        Conoce dos valores y siempre podrás calcular el tercero.
      </CapL>
    </SceneL>
  );
}

const SCENES_M1C3 = [
  { C: (p) => <TitleCardL {...p} claseNo={3} title="Ley de Ohm y circuitos básicos" dudur="14–16 min" objetivo="Dominar la relación entre voltaje, corriente y resistencia — la base de toda la electricidad." />, dur: 7, label: 'Apertura' },
  { C: S_Ohm, dur: 14, label: 'El triángulo' },
  { C: S_Circuito, dur: 12, label: 'En acción' },
  { C: (p) => <ClosingL {...p} line="V = I × R. Tres letras que explican cómo se comporta cualquier circuito." activity="Con la ley de Ohm: si una resistencia de 10 Ω recibe 5 V, ¿cuánta corriente circula? Resuélvelo." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M1C3 = SCENES_M1C3;
