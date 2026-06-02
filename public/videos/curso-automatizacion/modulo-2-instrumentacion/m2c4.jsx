// m2c4.jsx — "Señales estándar: 4-20 mA, 0-10 V, HART"
// After m1-lib.jsx + m2-lib.jsx. Exports SCENES_M2C4.

// La escala 4-20 mA y el "cero vivo"
function S_420({ start, dur }) {
  const t = useTime(); const s = start;
  const x0 = 320, x1 = 1600, y = 480;
  const draw = Easing.easeOutCubic(clamp((t - (s + 1.4)) / 1.2, 0, 1));
  const marks = [
    { mA: 4, pct: '0 %', label: 'Mínimo', x: x0 },
    { mA: 8, pct: '25 %', x: x0 + (x1 - x0) * 0.25 },
    { mA: 12, pct: '50 %', x: x0 + (x1 - x0) * 0.5 },
    { mA: 16, pct: '75 %', x: x0 + (x1 - x0) * 0.75 },
    { mA: 20, pct: '100 %', label: 'Máximo', x: x1 },
  ];
  const liveZ = popL(t, s + 4.4, 0.7, 0);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="El estándar universal: 4–20 mA" y="12%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="24%" width={1500}>La corriente que habla toda la industria.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={x0} y1={y} x2={x0 + (x1 - x0) * draw} y2={y} stroke={TEAL} strokeWidth="6" strokeLinecap="round" />
        {marks.map((m, i) => {
          const vis = draw >= (m.x - x0) / (x1 - x0) - 0.01;
          return vis ? (
            <g key={i}>
              <line x1={m.x} y1={y - 16} x2={m.x} y2={y + 16} stroke={TL.ink} strokeWidth="3" />
              <text x={m.x} y={y - 36} fill={TL.ink} fontFamily="Space Grotesk, sans-serif" fontSize="30" fontWeight="700" textAnchor="middle">{m.mA} mA</text>
              <text x={m.x} y={y + 54} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="18" textAnchor="middle">{m.pct}</text>
              {m.label && <text x={m.x} y={y + 84} fill={TEAL} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle" letterSpacing="1">{m.label}</text>}
            </g>
          ) : null;
        })}
      </svg>
      {/* live zero callout */}
      <div style={{ position: 'absolute', left: 320, top: 660, transform: 'translateX(-10%)', width: 760, opacity: liveZ.op, transform: `translate(-10%, ${liveZ.ty}px)` }}>
        <div style={{ borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadowSm, padding: '22px 26px' }}>
          <div style={{ fontFamily: DISPL, fontSize: 26, fontWeight: 700, color: TEAL, marginBottom: 8 }}>¿Por qué empieza en 4 y no en 0?</div>
          <div style={{ fontFamily: DISPL, fontSize: 21, color: TL.mut, lineHeight: 1.4 }}>El “cero vivo”: si la señal cae a 0 mA, sabes que el cable se rompió — no que el proceso está en cero.</div>
        </div>
      </div>
    </SceneL>
  );
}

// Tres estándares comparados
function S_Tres({ start, dur }) {
  const t = useTime(); const s = start;
  const std = [
    { k: '4–20 mA', type: 'Analógica · corriente', d: 'Inmune al ruido y a la caída de tensión. El rey de la planta.', pro: 'Robusta a distancia', a: TEAL },
    { k: '0–10 V', type: 'Analógica · voltaje', d: 'Simple y barata, pero pierde precisión en cables largos.', pro: 'Fácil y económica', a: TL.blue },
    { k: 'HART', type: 'Digital + analógica', d: 'Datos digitales montados sobre los 4–20 mA: diagnóstico y configuración.', pro: 'Lo mejor de ambos', a: TL.clay },
  ];
  const xs = [180, 800, 1420]; const w = 380;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tres estándares que convivirás" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="22%" width={1500}>Cada señal, su momento.</CapL>
      {std.map((it, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.45, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: 400, width: w, height: 360, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: DISPL, fontSize: 42, fontWeight: 700, color: it.a }}>{it.k}</div>
            <div style={{ fontFamily: MONOL, fontSize: 14, letterSpacing: '0.08em', color: TL.mut, textTransform: 'uppercase' }}>{it.type}</div>
            <div style={{ fontFamily: DISPL, fontSize: 20, color: TL.mut, lineHeight: 1.4 }}>{it.d}</div>
            <div style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: DISPL, fontSize: 18, fontWeight: 600, color: it.a }}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: it.a }} />{it.pro}
            </div>
            <BracketsL color={it.a} size={14} thick={1.5} inset={-1} />
          </div>
        );
      })}
    </SceneL>
  );
}

const SCENES_M2C4 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={4} title="Señales estándar de instrumentación" dudur="14–16 min" objetivo="Entender 4–20 mA, 0–10 V y HART: por qué existen y cuándo se usa cada una." />, dur: 7, label: 'Apertura' },
  { C: S_420, dur: 14, label: '4–20 mA' },
  { C: S_Tres, dur: 12, label: 'Los 3 estándares' },
  { C: (p) => <ClosingM2 {...p} line="4–20 mA no es un capricho: es el idioma robusto con el que se entiende toda la planta." activity="Investiga qué significa el “cero vivo” y por qué mejora la seguridad de un lazo de control." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M2C4 = SCENES_M2C4;
