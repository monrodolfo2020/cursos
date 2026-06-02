// m3c7.jsx — "Medición de nivel por presión hidrostática"
// After m3-dark.jsx. Exports SCENES_M3C7.

function S_Hidro({ start, dur }) {
  const t = useTime(); const s = start;
  const G = TEAL, R = TL.clay, B = TL.blue;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const tankX = 520, tankY = 300, tankW = 360, tankH = 460;
  const surf = tankY + 120;
  const baseY = tankY + tankH;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="El peso del líquido se vuelve nivel" y="9%" color={TEAL} />
      <CapL start={s + 0.7} dur={2.2} size={46} weight={600} y="18%" width={1500}>A más altura de columna, más presión en el fondo.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <g opacity={seg(1.2)}>
          <rect x={tankX} y={tankY} width={tankW} height={tankH} rx="14" fill="none" stroke={TL.ink} strokeWidth="2.6" />
          <rect x={tankX} y={surf} width={tankW} height={baseY - surf - 3} rx="6" fill="rgba(60,160,110,0.16)" />
          <line x1={tankX} y1={surf} x2={tankX + tankW} y2={surf} stroke={G} strokeWidth="2" strokeDasharray="5 5" />
        </g>
        {/* height bracket */}
        {seg(2.4) > 0.05 && <g opacity={seg(2.4)}>
          <line x1={tankX - 50} y1={surf} x2={tankX - 50} y2={baseY} stroke={B} strokeWidth="2" />
          <polygon points={`${tankX - 56},${surf + 10} ${tankX - 44},${surf + 10} ${tankX - 50},${surf}`} fill={B} />
          <polygon points={`${tankX - 56},${baseY - 10} ${tankX - 44},${baseY - 10} ${tankX - 50},${baseY}`} fill={B} />
          <text x={tankX - 70} y={(surf + baseY) / 2} fill={B} fontFamily="Space Grotesk, sans-serif" fontSize="40" fontWeight="700" textAnchor="end">h</text>
        </g>}
        {/* DP transmitter at bottom */}
        {seg(3.4) > 0.05 && <g opacity={seg(3.4)}>
          <line x1={tankX + tankW} y1={baseY - 30} x2={tankX + tankW + 120} y2={baseY - 30} stroke={R} strokeWidth="8" strokeLinecap="round" />
          <circle cx={tankX + tankW + 160} cy={baseY - 30} r={40} fill={TL.paper} stroke={R} strokeWidth="2.6" />
          <text x={tankX + tankW + 160} y={baseY - 36} fill={TL.ink} fontFamily="IBM Plex Mono, monospace" fontSize="16" fontWeight="600" textAnchor="middle">LT</text>
          <text x={tankX + tankW + 160} y={baseY - 16} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="13" textAnchor="middle">301</text>
        </g>}
      </svg>
      {/* formula */}
      {seg(4.4) > 0.05 && (() => { const p = seg(4.4); return (
        <div style={{ position: 'absolute', left: 1180, top: 420, width: 600, opacity: p }}>
          <div style={{ borderRadius: 14, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '28px 32px' }}>
            <div style={{ fontFamily: MONOL, fontSize: 46, fontWeight: 600, color: TEAL }}>P = ρ · g · h</div>
            <div style={{ fontFamily: DISPL, fontSize: 19, color: TL.mut, lineHeight: 1.5, marginTop: 14 }}>
              <b style={{ color: TL.ink }}>ρ</b> densidad · <b style={{ color: TL.ink }}>g</b> gravedad · <b style={{ color: TL.ink }}>h</b> altura.<br />Conoces ρ y g → la presión te da la altura.
            </div>
          </div>
        </div>
      ); })()}
      <CapL start={s + 7.0} dur={dur - 7.3} size={30} weight={500} color={TL.mut} y="93%" width={1500}>
        Por eso una celda DP en el fondo del tanque mide su nivel.
      </CapL>
    </SceneL>
  );
}

const SCENES_M3C7 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={7} title="Nivel por presión hidrostática" dudur="14–16 min" objetivo="Entender cómo la presión en el fondo de un tanque revela la altura del líquido." />, dur: 7, label: 'Apertura' },
  { C: S_Hidro, dur: 14, label: 'P = ρgh' },
  { C: (p) => <ClosingM2 {...p} line="El método de nivel más usado del mundo no mide altura: mide peso de columna." activity="Si un tanque tiene 3 m de agua (ρ=1000), ¿qué presión mide la celda en el fondo? Calcúlalo." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C7 = SCENES_M3C7;
