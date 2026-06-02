// m3c1.jsx — "Termopares (J, K, T): efecto Seebeck"
// After m3-dark.jsx. Exports SCENES_M3C1.

// Efecto Seebeck: dos metales, una unión caliente, un voltaje
function S_Seebeck({ start, dur }) {
  const t = useTime(); const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const G = TEAL, R = TL.clay;
  const hotO = seg(2.0), coldO = seg(3.0), vO = seg(4.4);
  const heat = 0.5 + 0.5 * Math.sin(t * 4);
  const mV = (3.2 + 0.5 * Math.sin(t * 2)).toFixed(2);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="El efecto Seebeck" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="22%" width={1500}>Dos metales distintos generan voltaje con el calor.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* two wires meeting at a hot junction on the right */}
        <g opacity={seg(1.4)}>
          <path d="M 360 460 L 1300 540" stroke={G} strokeWidth="8" strokeLinecap="round" />
          <path d="M 360 700 L 1300 600" stroke={R} strokeWidth="8" strokeLinecap="round" />
          <circle cx="1300" cy="570" r="20" fill={TL.ink} />
        </g>
        {/* hot junction glow */}
        {hotO > 0.05 && <g opacity={hotO}>
          <circle cx="1300" cy="570" r={44 + heat * 10} fill={R} opacity={0.25 * heat} />
          <text x="1300" y="475" fill={R} fontFamily="Space Grotesk, sans-serif" fontSize="26" fontWeight="700" textAnchor="middle">Unión caliente</text>
          <text x="1300" y="505" fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle">+250 °C</text>
        </g>}
        {/* cold junction / measurement on left */}
        {coldO > 0.05 && <g opacity={coldO}>
          <rect x="240" y="460" width="120" height="240" rx="10" fill={TL.paper} stroke={TL.lineS} strokeWidth="2" />
          <text x="300" y="430" fill={G} fontFamily="Space Grotesk, sans-serif" fontSize="22" fontWeight="700" textAnchor="middle">Unión fría</text>
          <text x="300" y="740" fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">referencia</text>
        </g>}
        {/* voltage readout */}
        {vO > 0.05 && <g opacity={vO}>
          <text x="300" y="560" fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="44" fontWeight="700" textAnchor="middle">{mV}</text>
          <text x="300" y="600" fill={G} fontFamily="IBM Plex Mono, monospace" fontSize="20" textAnchor="middle">mV</text>
        </g>}
      </svg>
      <CapL start={s + 6.0} dur={dur - 6.3} size={30} weight={500} color={TL.mut} y="90%" width={1500}>
        A mayor diferencia de temperatura, mayor milivoltaje. Eso es un termopar.
      </CapL>
    </SceneL>
  );
}

// Tabla J / K / T
function S_Tipos({ start, dur }) {
  const t = useTime(); const s = start;
  const types = [
    { k: 'Tipo J', metals: 'Hierro / Constantán', range: '−40 a 750 °C', use: 'Hornos, plásticos', a: TEAL },
    { k: 'Tipo K', metals: 'Cromel / Alumel', range: '−200 a 1260 °C', use: 'El más usado, versátil', a: TL.clay },
    { k: 'Tipo T', metals: 'Cobre / Constantán', range: '−200 a 350 °C', use: 'Criogenia, alimentos', a: TL.blue },
  ];
  const xs = [180, 800, 1420]; const w = 380;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tres tipos, tres trabajos" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="22%" width={1500}>El metal define el rango y la aplicación.</CapL>
      {types.map((it, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.45, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: 400, width: w, height: 360, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: DISPL, fontSize: 44, fontWeight: 700, color: it.a }}>{it.k}</div>
            <div style={{ fontFamily: DISPL, fontSize: 21, color: TL.ink, lineHeight: 1.3 }}>{it.metals}</div>
            <div style={{ fontFamily: MONOL, fontSize: 17, color: it.a, letterSpacing: '0.02em' }}>{it.range}</div>
            <div style={{ fontFamily: DISPL, fontSize: 19, color: TL.mut, lineHeight: 1.35, marginTop: 'auto' }}>{it.use}</div>
            <BracketsL color={it.a} size={14} thick={1.5} inset={-1} />
          </div>
        );
      })}
    </SceneL>
  );
}

const SCENES_M3C1 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={1} title="Termopares (J, K, T)" dudur="16–18 min" objetivo="Entender el efecto Seebeck y elegir el tipo de termopar correcto para cada proceso." />, dur: 7, label: 'Apertura' },
  { C: S_Seebeck, dur: 14, label: 'Efecto Seebeck' },
  { C: S_Tipos, dur: 12, label: 'Tipos J · K · T' },
  { C: (p) => <ClosingM2 {...p} line="Un termopar convierte calor en milivoltios. Simple, robusto, en cada horno de la industria." activity="Investiga qué tipo de termopar usarías para medir 1000 °C en un horno y por qué." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C1 = SCENES_M3C1;
