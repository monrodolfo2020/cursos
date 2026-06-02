// m3c4.jsx — "Tipos de presión: absoluta, manométrica, diferencial"
// After m3-dark.jsx. Exports SCENES_M3C4.

function S_Refs({ start, dur }) {
  const t = useTime(); const s = start;
  const G = TEAL, R = TL.clay, B = TL.blue;
  const x = 760, top = 280, bot = 820;
  const atm = 560; // atmospheric line
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tres referencias, tres presiones" y="9%" color={TEAL} />
      <CapL start={s + 0.7} dur={2.2} size={46} weight={600} y="18%" width={1500}>Todo depende de desde dónde mides.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* scale bar */}
        <g opacity={seg(1.2)}>
          <line x1={x} y1={top} x2={x} y2={bot} stroke={TL.lineS} strokeWidth="2" />
          <line x1={x - 16} y1={bot} x2={x + 16} y2={bot} stroke={TL.mut} strokeWidth="3" />
          <text x={x - 30} y={bot + 6} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="end">Vacío absoluto (0)</text>
          <line x1={x - 16} y1={atm} x2={x + 16} y2={atm} stroke={B} strokeWidth="3" strokeDasharray="6 5" />
          <text x={x - 30} y={atm + 6} fill={B} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="end">Presión atmosférica</text>
        </g>
        {/* absolute arrow (from vacuum up) */}
        {seg(2.4) > 0.05 && <g opacity={seg(2.4)}>
          <line x1={x + 120} y1={bot} x2={x + 120} y2={400} stroke={G} strokeWidth="3" />
          <polygon points={`${x + 114},410 ${x + 126},410 ${x + 120},394`} fill={G} />
          <text x={x + 140} y={580} fill={G} fontFamily="Space Grotesk, sans-serif" fontSize="22" fontWeight="700">Absoluta</text>
          <text x={x + 140} y={606} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="14">desde el vacío</text>
        </g>}
        {/* gauge arrow (from atmospheric up) */}
        {seg(3.6) > 0.05 && <g opacity={seg(3.6)}>
          <line x1={x + 360} y1={atm} x2={x + 360} y2={400} stroke={R} strokeWidth="3" />
          <polygon points={`${x + 354},410 ${x + 366},410 ${x + 360},394`} fill={R} />
          <text x={x + 380} y={470} fill={R} fontFamily="Space Grotesk, sans-serif" fontSize="22" fontWeight="700">Manométrica</text>
          <text x={x + 380} y={496} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="14">desde la atmósfera</text>
        </g>}
        {/* differential (between two points) */}
        {seg(4.8) > 0.05 && <g opacity={seg(4.8)}>
          <line x1={x + 620} y1={480} x2={x + 620} y2={640} stroke={TL.ink} strokeWidth="3" />
          <polygon points={`${x + 614},490 ${x + 626},490 ${x + 620},474`} fill={TL.ink} />
          <polygon points={`${x + 614},630 ${x + 626},630 ${x + 620},646`} fill={TL.ink} />
          <text x={x + 640} y={560} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="22" fontWeight="700">Diferencial</text>
          <text x={x + 640} y={586} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="14">entre dos puntos</text>
        </g>}
      </svg>
      <CapL start={s + 6.4} dur={dur - 6.7} size={30} weight={500} color={TL.mut} y="92%" width={1500}>
        Manométrica para el día a día; absoluta para el vacío; diferencial para caudal y nivel.
      </CapL>
    </SceneL>
  );
}

const SCENES_M3C4 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={4} title="Tipos de presión" dudur="12–14 min" objetivo="Distinguir presión absoluta, manométrica y diferencial — y cuándo se usa cada una." />, dur: 7, label: 'Apertura' },
  { C: S_Refs, dur: 14, label: 'Las 3 referencias' },
  { C: (p) => <ClosingM2 {...p} line="La presión siempre se mide respecto a algo. Saber respecto a qué lo cambia todo." activity="¿Un neumático marca presión absoluta o manométrica? Explica la diferencia con un ejemplo." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C4 = SCENES_M3C4;
