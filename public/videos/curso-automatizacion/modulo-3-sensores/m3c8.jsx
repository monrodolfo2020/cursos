// m3c8.jsx — "Sensores de nivel: ultrasónico, radar y flotador"
// After m3-dark.jsx. Exports SCENES_M3C8.

function S_Tres({ start, dur }) {
  const t = useTime(); const s = start;
  const G = TEAL, R = TL.clay, B = TL.blue;
  // mini tank drawings in three cards
  const ultra = (c, tt) => { const ph = (tt * 1.2) % 1; return (<g>
    <rect x="40" y="30" width="300" height="150" rx="6" fill="none" stroke={TL.lineS} strokeWidth="2" />
    <rect x="40" y="120" width="300" height="58" fill="rgba(60,160,110,0.14)" />
    <line x1="40" y1="120" x2="340" y2="120" stroke={c} strokeWidth="2" strokeDasharray="5 5" />
    <rect x="170" y="14" width="40" height="22" rx="3" fill={TL.paper} stroke={c} strokeWidth="2" />
    {[0,1,2].map(i=>{const f=((ph+i*0.33)%1);return <path key={i} d={`M ${190-22} ${36+f*80} Q 190 ${46+f*80} ${190+22} ${36+f*80}`} fill="none" stroke={c} strokeWidth="2" opacity={1-f} />;})}
  </g>); };
  const radar = (c) => (<g>
    <rect x="40" y="30" width="300" height="150" rx="6" fill="none" stroke={TL.lineS} strokeWidth="2" />
    <rect x="40" y="120" width="300" height="58" fill="rgba(176,80,70,0.14)" />
    <line x1="40" y1="120" x2="340" y2="120" stroke={c} strokeWidth="2" strokeDasharray="5 5" />
    <path d="M170 16 h40 l-8 22 h-24 z" fill={TL.paper} stroke={c} strokeWidth="2" strokeLinejoin="round" />
    <line x1="190" y1="40" x2="190" y2="118" stroke={c} strokeWidth="2.5" strokeDasharray="3 6" />
  </g>);
  const float = (c, tt) => { const fl = 6 * Math.sin(tt * 2); return (<g>
    <rect x="40" y="30" width="300" height="150" rx="6" fill="none" stroke={TL.lineS} strokeWidth="2" />
    <rect x="40" y="118" width="300" height="60" fill="rgba(120,180,120,0.14)" />
    <line x1="40" y1="118" x2="340" y2="118" stroke={c} strokeWidth="2" strokeDasharray="5 5" />
    <ellipse cx="190" cy={118 + fl} rx="26" ry="16" fill={TL.paper} stroke={c} strokeWidth="2.5" />
    <line x1="190" y1="40" x2="190" y2={102 + fl} stroke={c} strokeWidth="2" />
  </g>); };
  const cards = [
    { k: 'Ultrasónico', d: 'Mide el tiempo del eco de sonido hasta la superficie.', a: G, draw: ultra, x: 120 },
    { k: 'Radar', d: 'Igual que el ultrasónico, pero con microondas. Inmune a vapor.', a: R, draw: radar, x: 720 },
    { k: 'Flotador', d: 'Un cuerpo flota y sigue la superficie. Simple y mecánico.', a: B, draw: float, x: 1320 },
  ];
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tres formas de seguir la superficie" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="22%" width={1500}>Sin tocar el líquido, o casi.</CapL>
      {cards.map((c, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.45, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: c.x, top: 360, width: 480, height: 470, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 14, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: DISPL, fontSize: 30, fontWeight: 700, color: c.a }}>{c.k}</div>
            <svg viewBox="0 0 380 200" style={{ width: '100%', height: 200 }}>{c.draw(c.a, t)}</svg>
            <div style={{ fontFamily: DISPL, fontSize: 20, color: TL.mut, lineHeight: 1.4, marginTop: 'auto' }}>{c.d}</div>
            <BracketsL color={c.a} size={14} thick={1.5} inset={-1} />
          </div>
        );
      })}
    </SceneL>
  );
}

const SCENES_M3C8 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={8} title="Nivel: ultrasónico, radar y flotador" dudur="14–16 min" objetivo="Comparar tres tecnologías de nivel sin contacto directo y saber cuándo usar cada una." />, dur: 7, label: 'Apertura' },
  { C: S_Tres, dur: 14, label: 'Las 3 tecnologías' },
  { C: (p) => <ClosingM2 {...p} line="Vapor, espuma, polvo o turbulencia: cada condición pide una tecnología de nivel distinta." activity="Un silo de cemento con mucho polvo: ¿ultrasónico, radar o flotador? Explica por qué." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C8 = SCENES_M3C8;
