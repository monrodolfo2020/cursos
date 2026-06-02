// m3c10.jsx — "Placa orificio y tubo Venturi"
// After m3-dark.jsx. Exports SCENES_M3C10.

function S_Orificio({ start, dur }) {
  const t = useTime(); const s = start;
  const G = TEAL, R = TL.clay;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const y = 500, pipeT = y - 70, pipeB = y + 70;
  const plateX = 960;
  const flow = -(t * 60) % 30;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Estrangula el flujo, mide la caída" y="9%" color={TEAL} />
      <CapL start={s + 0.7} dur={2.2} size={46} weight={600} y="18%" width={1500}>El caudal nace de una diferencia de presión.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* pipe */}
        <g opacity={seg(1.2)}>
          <line x1={300} y1={pipeT} x2={1620} y2={pipeT} stroke={TL.ink} strokeWidth="3" />
          <line x1={300} y1={pipeB} x2={1620} y2={pipeB} stroke={TL.ink} strokeWidth="3" />
          {/* flow dashes */}
          <line x1={320} y1={y} x2={1600} y2={y} stroke={G} strokeWidth="4" strokeDasharray="18 14" strokeDashoffset={flow} opacity="0.7" />
          {/* orifice plate */}
          <rect x={plateX - 10} y={pipeT} width="20" height="46" fill={R} />
          <rect x={plateX - 10} y={pipeB - 46} width="20" height="46" fill={R} />
        </g>
        {/* pressure taps */}
        {seg(2.4) > 0.05 && <g opacity={seg(2.4)}>
          <line x1={plateX - 120} y1={pipeT} x2={plateX - 120} y2={300} stroke={TL.mut} strokeWidth="2" />
          <text x={plateX - 120} y={285} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="24" fontWeight="700" textAnchor="middle">P₁</text>
          <line x1={plateX + 120} y1={pipeT} x2={plateX + 120} y2={300} stroke={TL.mut} strokeWidth="2" />
          <text x={plateX + 120} y={285} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="24" fontWeight="700" textAnchor="middle">P₂</text>
        </g>}
        {/* pressure profile curve */}
        {seg(3.6) > 0.05 && <g opacity={seg(3.6)}>
          <path d={`M 320 720 L ${plateX - 60} 720 Q ${plateX} 720 ${plateX + 30} 800 Q ${plateX + 90} 770 ${plateX + 200} 745 L 1600 745`} fill="none" stroke={R} strokeWidth="3" />
          <text x={420} y={700} fill={R} fontFamily="IBM Plex Mono, monospace" fontSize="16">presión a lo largo de la tubería</text>
        </g>}
      </svg>
      {seg(4.6) > 0.05 && (() => { const p = seg(4.6); return (
        <div style={{ position: 'absolute', left: '50%', top: '38%', transform: 'translate(-50%,-50%)', opacity: p, fontFamily: MONOL, fontSize: 34, fontWeight: 600, color: TEAL, background: TL.paper, padding: '14px 30px', borderRadius: 10, border: `1px solid ${TL.lineS}`, boxShadow: TL.shadow }}>Q ∝ √(P₁ − P₂)</div>
      ); })()}
      <CapL start={s + 6.6} dur={dur - 6.9} size={30} weight={500} color={TL.mut} y="92%" width={1500}>
        El Venturi hace lo mismo más suave: menos pérdida, mayor costo.
      </CapL>
    </SceneL>
  );
}

const SCENES_M3C10 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={10} title="Placa orificio y tubo Venturi" dudur="14–16 min" objetivo="Entender la medición de caudal por presión diferencial: el método más extendido de la industria." />, dur: 7, label: 'Apertura' },
  { C: S_Orificio, dur: 14, label: 'Placa orificio' },
  { C: (p) => <ClosingM2 {...p} line="Estrechar el paso y medir la caída: física de Bernoulli puesta a trabajar en cada tubería." activity="¿Por qué el caudal es proporcional a la RAÍZ de ΔP y no a ΔP directo? Investiga Bernoulli." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C10 = SCENES_M3C10;
