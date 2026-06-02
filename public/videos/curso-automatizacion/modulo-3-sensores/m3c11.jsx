// m3c11.jsx — "Caudalímetros: electromagnético, Coriolis, vórtex"
// After m3-dark.jsx. Exports SCENES_M3C11.

function S_Flow3({ start, dur }) {
  const t = useTime(); const s = start;
  const G = TEAL, R = TL.clay, B = TL.blue;
  const mag = (c, tt) => { const flow = -(tt * 50) % 24; return (<g>
    <line x1="40" y1="100" x2="340" y2="100" stroke={TL.lineS} strokeWidth="40" strokeLinecap="round" opacity="0.3" />
    <line x1="40" y1="100" x2="340" y2="100" stroke={c} strokeWidth="3" strokeDasharray="14 10" strokeDashoffset={flow} />
    <circle cx="190" cy="50" r="16" fill="none" stroke={c} strokeWidth="2.5" />
    <text x="190" y="56" fill={c} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle">N</text>
    <circle cx="190" cy="150" r="16" fill="none" stroke={c} strokeWidth="2.5" />
    <text x="190" y="156" fill={c} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle">S</text>
  </g>); };
  const cori = (c, tt) => { const w = 8 * Math.sin(tt * 4); return (<g>
    <path d={`M 60 100 C 120 ${40 + w}, 260 ${40 - w}, 320 100`} fill="none" stroke={c} strokeWidth="3.5" />
    <path d={`M 60 100 C 120 ${160 - w}, 260 ${160 + w}, 320 100`} fill="none" stroke={c} strokeWidth="3.5" />
    <text x="190" y="190" fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="14" textAnchor="middle">tubo en U vibrando</text>
  </g>); };
  const vor = (c, tt) => { const flow = (tt * 1.2) % 1; return (<g>
    <line x1="40" y1="100" x2="340" y2="100" stroke={TL.lineS} strokeWidth="40" strokeLinecap="round" opacity="0.25" />
    <rect x="150" y="80" width="16" height="40" fill={c} />
    {[0,1,2,3].map(i=>{const f=((flow+i*0.25)%1); const x=170+f*150; const yy=100+12*Math.sin(f*12);return <circle key={i} cx={x} cy={yy} r="6" fill="none" stroke={c} strokeWidth="2" opacity={1-f} />;})}
  </g>); };
  const cards = [
    { k: 'Electromagnético', d: 'Mide el voltaje que induce el líquido al cruzar un campo magnético. Solo conductivos.', a: G, draw: mag, x: 120 },
    { k: 'Coriolis', d: 'Un tubo vibra; el flujo lo tuerce. Mide masa directa: el más preciso.', a: R, draw: cori, x: 720 },
    { k: 'Vórtex', d: 'Un obstáculo crea remolinos; su frecuencia da el caudal. Versátil.', a: B, draw: vor, x: 1320 },
  ];
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tres tecnologías sin estrangular el flujo" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="22%" width={1500}>Cuando la placa orificio no basta.</CapL>
      {cards.map((c, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.45, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: c.x, top: 360, width: 480, height: 470, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 14, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: DISPL, fontSize: 28, fontWeight: 700, color: c.a }}>{c.k}</div>
            <svg viewBox="0 0 380 200" style={{ width: '100%', height: 190 }}>{c.draw(c.a, t)}</svg>
            <div style={{ fontFamily: DISPL, fontSize: 19, color: TL.mut, lineHeight: 1.4, marginTop: 'auto' }}>{c.d}</div>
            <BracketsL color={c.a} size={14} thick={1.5} inset={-1} />
          </div>
        );
      })}
    </SceneL>
  );
}

const SCENES_M3C11 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={11} title="Caudalímetros modernos" dudur="16–18 min" objetivo="Comparar caudalímetros electromagnético, Coriolis y vórtex, y saber cuándo usar cada uno." />, dur: 7, label: 'Apertura' },
  { C: S_Flow3, dur: 14, label: 'Las 3 tecnologías' },
  { C: (p) => <ClosingM2 {...p} line="Del Coriolis de precisión al magnético robusto: hay un caudalímetro para cada fluido y presupuesto." activity="Necesitas medir caudal másico de un producto viscoso con altísima precisión. ¿Cuál eliges?" />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C11 = SCENES_M3C11;
