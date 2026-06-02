// m3c9.jsx — "Sensores capacitivos de nivel"
// After m3-dark.jsx. Exports SCENES_M3C9.

function S_Capac({ start, dur }) {
  const t = useTime(); const s = start;
  const G = TEAL, R = TL.clay;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const tankX = 480, tankY = 300, tankW = 380, tankH = 460;
  const level = tankY + 200 + 60 * Math.sin(t * 0.8);
  const baseY = tankY + tankH;
  const probeX = tankX + tankW / 2;
  // capacitance proportional to submerged length
  const subFrac = clamp((baseY - level) / (baseY - (tankY + 40)), 0, 1);
  const pF = (40 + subFrac * 180).toFixed(0);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="El tanque como condensador" y="10%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="20%" width={1500}>La sonda y la pared forman un capacitor.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <g opacity={seg(1.2)}>
          <rect x={tankX} y={tankY} width={tankW} height={tankH} rx="14" fill="none" stroke={TL.ink} strokeWidth="2.6" />
          <rect x={tankX} y={level} width={tankW} height={baseY - level - 3} rx="6" fill="rgba(60,160,110,0.16)" />
          <line x1={tankX} y1={level} x2={tankX + tankW} y2={level} stroke={G} strokeWidth="2" strokeDasharray="5 5" />
        </g>
        {/* probe */}
        {seg(2.0) > 0.05 && <g opacity={seg(2.0)}>
          <line x1={probeX} y1={tankY - 40} x2={probeX} y2={baseY - 30} stroke={R} strokeWidth="7" strokeLinecap="round" />
          <rect x={probeX - 30} y={tankY - 70} width="60" height="36" rx="6" fill={TL.paper} stroke={R} strokeWidth="2.4" />
          {/* dielectric field lines between probe and wall */}
          {[0.2,0.4,0.6,0.8].map((f,i)=>{const y=level+(baseY-level)*f; return <g key={i}>
            <line x1={probeX} y1={y} x2={tankX+6} y2={y} stroke={G} strokeWidth="1.4" strokeDasharray="2 5" opacity="0.6" />
            <line x1={probeX} y1={y} x2={tankX+tankW-6} y2={y} stroke={G} strokeWidth="1.4" strokeDasharray="2 5" opacity="0.6" />
          </g>;})}
        </g>}
      </svg>
      {/* readout */}
      {seg(3.2) > 0.05 && (() => { const p = seg(3.2); return (
        <div style={{ position: 'absolute', left: 1180, top: 440, width: 600, opacity: p }}>
          <div style={{ borderRadius: 14, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '28px 32px' }}>
            <div style={{ fontFamily: DISPL, fontSize: 22, fontWeight: 700, color: TEAL, marginBottom: 10 }}>Capacitancia ∝ nivel</div>
            <div style={{ fontFamily: MONOL, fontSize: 40, fontWeight: 600, color: TL.ink }}>{pF} pF</div>
            <div style={{ fontFamily: DISPL, fontSize: 19, color: TL.mut, lineHeight: 1.4, marginTop: 12 }}>Cuanto más sube el líquido, más capacitancia mide la sonda.</div>
          </div>
        </div>
      ); })()}
      <CapL start={s + 6.0} dur={dur - 6.3} size={30} weight={500} color={TL.mut} y="93%" width={1500}>
        Ideal para líquidos, granos y sólidos — sin partes móviles.
      </CapL>
    </SceneL>
  );
}

const SCENES_M3C9 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={9} title="Sensores capacitivos de nivel" dudur="12–14 min" objetivo="Entender cómo la capacitancia entre una sonda y el tanque revela el nivel del producto." />, dur: 7, label: 'Apertura' },
  { C: S_Capac, dur: 13, label: 'El capacitor' },
  { C: (p) => <ClosingM2 {...p} line="Convertir un tanque en un condensador gigante: ingenio puro para medir sin tocar." activity="¿Por qué un sensor capacitivo necesita recalibrarse si cambia el tipo de líquido? Investiga." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C9 = SCENES_M3C9;
