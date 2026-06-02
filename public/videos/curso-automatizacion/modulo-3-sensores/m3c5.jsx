// m3c5.jsx — "Sensores capacitivos, piezoresistivos y piezoeléctricos"
// After m3-dark.jsx. Exports SCENES_M3C5.

function PrincipleCard({ x, title, sub, accent, t, appear, draw }) {
  const { op, sc, ty } = popL(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: 360, width: 480, height: 480, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 14, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '30px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontFamily: DISPL, fontSize: 30, fontWeight: 700, color: accent }}>{title}</div>
      <svg viewBox="0 0 380 200" style={{ width: '100%', height: 200 }}>{draw(accent, t)}</svg>
      <div style={{ fontFamily: DISPL, fontSize: 20, color: TL.mut, lineHeight: 1.4, marginTop: 'auto' }}>{sub}</div>
      <BracketsL color={accent} size={14} thick={1.5} inset={-1} />
    </div>
  );
}
function S_Principios({ start, dur }) {
  const t = useTime(); const s = start;
  const G = TEAL, R = TL.clay, B = TL.blue;
  const cap = (c, tt) => { const d = 6 * Math.sin(tt * 2); return (<g>
    <line x1="80" y1="40" x2="300" y2="40" stroke={c} strokeWidth="4" />
    <line x1="80" y1={120 + d} x2="300" y2={120 + d} stroke={c} strokeWidth="4" strokeDasharray="2 0" />
    <text x="190" y="170" fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">membrana ↔ placa</text>
    {[110,150,190,230,270].map((x,i)=><line key={i} x1={x} y1="44" x2={x} y2={116+d} stroke={c} strokeWidth="1.5" opacity="0.5" />)}
  </g>); };
  const pres = (c) => (<g>
    <rect x="120" y="60" width="140" height="70" rx="4" fill="none" stroke={c} strokeWidth="2.5" />
    <path d="M120 95 h28 v-16 h28 v32 h28 v-16 h28" fill="none" stroke={c} strokeWidth="2.5" strokeLinejoin="round" />
    <text x="190" y="165" fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">puente de galgas</text>
  </g>);
  const piezo = (c, tt) => { const spark = 0.5 + 0.5 * Math.sin(tt * 4); return (<g>
    <polygon points="150,50 230,50 250,110 130,110" fill="none" stroke={c} strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="190" y1="30" x2="190" y2="50" stroke={c} strokeWidth="3" />
    <polygon points="184,36 196,36 190,24" fill={c} />
    <text x="190" y="150" fill={c} fontFamily="IBM Plex Mono, monospace" fontSize="18" textAnchor="middle" opacity={0.4 + 0.6 * spark}>+ carga</text>
    <text x="190" y="178" fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="14" textAnchor="middle">cristal</text>
  </g>); };
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tres formas de sentir la presión" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="22%" width={1500}>El mismo objetivo, tres principios físicos.</CapL>
      <PrincipleCard x={120} title="Capacitivo" sub="La presión mueve una membrana y cambia la capacitancia. Muy preciso." accent={G} t={t} appear={s + 2.2} draw={cap} />
      <PrincipleCard x={720} title="Piezoresistivo" sub="La deformación cambia la resistencia de un puente de galgas. Robusto." accent={R} t={t} appear={s + 2.7} draw={pres} />
      <PrincipleCard x={1320} title="Piezoeléctrico" sub="El cristal genera carga al comprimirse. Ideal para presiones dinámicas." accent={B} t={t} appear={s + 3.2} draw={piezo} />
    </SceneL>
  );
}

const SCENES_M3C5 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={5} title="Sensores de presión" dudur="14–16 min" objetivo="Comparar los tres principios de medición de presión: capacitivo, piezoresistivo y piezoeléctrico." />, dur: 7, label: 'Apertura' },
  { C: S_Principios, dur: 14, label: 'Tres principios' },
  { C: (p) => <ClosingM2 {...p} line="Detrás de cada transmisor de presión hay un principio físico distinto. Conocerlo te hace mejor técnico." activity="¿Qué sensor elegirías para medir la explosión de un motor (presión muy rápida)? Justifícalo." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C5 = SCENES_M3C5;
