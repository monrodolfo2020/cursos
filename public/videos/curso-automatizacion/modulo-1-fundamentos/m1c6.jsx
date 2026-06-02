// m1c6.jsx — "Señales eléctricas: voltaje, corriente, resistencia"
// After m1-lib.jsx. Exports SCENES_M1C6.

// Analogía hidráulica
function S_Analogia({ start, dur }) {
  const t = useTime(); const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const B = TL.blue, C = TL.clay;
  const flow = -(t * 40) % 24;
  const tankO = seg(1.2), pipeO = seg(2.4), narrowO = seg(4.0);
  // reservoir top-left high, pipe down and across with a narrow section
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Piénsalo como agua en tuberías" y="9%" />
      <CapL start={s + 0.7} dur={2.4} size={46} weight={600} y="18%" width={1500}>Tres ideas, una analogía que nunca falla.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* reservoir */}
        <g opacity={tankO}>
          <rect x="200" y="330" width="220" height="180" rx="10" fill={TL.paper} stroke={TL.ink} strokeWidth="2.6" />
          <rect x="200" y="370" width="220" height="136" rx="6" fill="rgba(60,130,200,0.20)" />
          <line x1="200" y1="370" x2="420" y2="370" stroke={B} strokeWidth="2" strokeDasharray="4 5" />
        </g>
        {/* pipe path with narrow section */}
        <g opacity={pipeO}>
          <path d="M 420 470 H 760 L 900 470 L 1040 470 H 1560" fill="none" stroke="rgba(40,90,160,0.22)" strokeWidth="34" strokeLinecap="round" />
          {/* narrow section overlay */}
          <rect x="820" y="458" width="160" height="24" rx="8" fill={TL.bg} opacity={narrowO} />
          <path d="M 420 470 H 760 L 900 470 L 1040 470 H 1560" fill="none" stroke={B} strokeWidth="6" strokeLinecap="round" strokeDasharray="14 14" strokeDashoffset={flow} />
        </g>
      </svg>
      {/* labels */}
      {(() => { const p = seg(2.8); return (
        <div style={{ position: 'absolute', left: 310, top: 250, transform: 'translateX(-50%)', opacity: p, textAlign: 'center' }}>
          <div style={{ fontFamily: DISPL, fontSize: 30, fontWeight: 700, color: B }}>Voltaje</div>
          <div style={{ fontFamily: DISPL, fontSize: 18, color: TL.mut }}>la presión del agua</div>
        </div>
      ); })()}
      {(() => { const p = seg(3.6); return (
        <div style={{ position: 'absolute', left: 1300, top: 380, transform: 'translateX(-50%)', opacity: p, textAlign: 'center' }}>
          <div style={{ fontFamily: DISPL, fontSize: 30, fontWeight: 700, color: TL.ink }}>Corriente</div>
          <div style={{ fontFamily: DISPL, fontSize: 18, color: TL.mut }}>el caudal que circula</div>
        </div>
      ); })()}
      {(() => { const p = seg(4.4); return (
        <div style={{ position: 'absolute', left: 900, top: 560, transform: 'translateX(-50%)', opacity: p, textAlign: 'center' }}>
          <div style={{ fontFamily: DISPL, fontSize: 30, fontWeight: 700, color: C }}>Resistencia</div>
          <div style={{ fontFamily: DISPL, fontSize: 18, color: TL.mut }}>el estrechamiento</div>
        </div>
      ); })()}
      <CapL start={s + 6.2} dur={dur - 6.5} size={30} weight={500} color={TL.mut} y="90%" width={1500}>
        Más presión, más caudal. Más estrechez, menos caudal. Eso es la ley de Ohm.
      </CapL>
    </SceneL>
  );
}

function S_Trio({ start, dur }) {
  const t = useTime(); const s = start;
  const trio = [
    { q: 'Voltaje', sym: 'V', unit: 'volt', d: 'El empuje que mueve las cargas.', Icon: IcoBolt, a: TL.blue },
    { q: 'Corriente', sym: 'I', unit: 'ampere', d: 'La cantidad de carga que fluye.', Icon: IcoFlow, a: TL.clay },
    { q: 'Resistencia', sym: 'R', unit: 'ohm (Ω)', d: 'La oposición a ese flujo.', Icon: IcoResistor, a: TL.blue },
  ];
  const xs = [260, 800, 1340]; const w = 320;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Las tres señales, en limpio" y="13%" />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="24%" width={1500}>Cada una con su símbolo y su unidad.</CapL>
      {trio.map((it, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.45, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: 420, width: w, height: 330, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <it.Icon c={it.a} t={t} />
              <span style={{ fontFamily: DISPL, fontSize: 52, fontWeight: 700, color: it.a }}>{it.sym}</span>
            </div>
            <div style={{ fontFamily: DISPL, fontSize: 32, fontWeight: 700, color: TL.ink }}>{it.q}</div>
            <div style={{ fontFamily: MONOL, fontSize: 16, color: it.a, letterSpacing: '0.04em' }}>{it.unit}</div>
            <div style={{ fontFamily: DISPL, fontSize: 20, color: TL.mut, lineHeight: 1.4, marginTop: 'auto' }}>{it.d}</div>
          </div>
        );
      })}
    </SceneL>
  );
}

const SCENES_M1C6 = [
  { C: (p) => <TitleCardL {...p} claseNo={6} title="Señales: voltaje, corriente, resistencia" dudur="12–14 min" objetivo="Comprender las tres señales eléctricas básicas con una analogía que jamás olvidarás." />, dur: 7, label: 'Apertura' },
  { C: S_Analogia, dur: 14, label: 'Analogía del agua' },
  { C: S_Trio, dur: 12, label: 'Las tres señales' },
  { C: (p) => <ClosingL {...p} line="Voltaje, corriente y resistencia: las tres siempre van juntas, como el agua y sus tuberías." activity="Dibuja la analogía del agua con tus propias palabras y explícala a alguien que no sepa de electricidad." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M1C6 = SCENES_M1C6;
