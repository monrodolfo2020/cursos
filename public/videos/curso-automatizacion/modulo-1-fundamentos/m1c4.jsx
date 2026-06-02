// m1c4.jsx — "Corriente continua vs corriente alterna"
// After m1-lib.jsx. Exports SCENES_M1C4.

function Wave({ x, y, w, h, kind, color, t, phase = 0 }) {
  const pts = [];
  const N = 120;
  for (let i = 0; i <= N; i++) {
    const px = x + (i / N) * w;
    let py;
    if (kind === 'dc') py = y;
    else py = y - (h / 2) * Math.sin((i / N) * Math.PI * 4 + t * 3 + phase);
    pts.push(`${px},${py}`);
  }
  return <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />;
}
function S_Ondas({ start, dur }) {
  const t = useTime(); const s = start;
  const dc = popL(t, s + 1.4, 0.6, 20);
  const ac = popL(t, s + 3.0, 0.6, 20);
  const axW = 760;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Dos formas de mover electrones" y="11%" />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="20%" width={1500}>La corriente fluye de dos maneras.</CapL>
      {/* DC panel */}
      <div style={{ position: 'absolute', left: 130, top: 360, width: 800, opacity: dc.op, transform: `translateY(${dc.ty}px)` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 14 }}>
          <span style={{ fontFamily: DISPL, fontSize: 40, fontWeight: 700, color: TL.blue }}>DC</span>
          <span style={{ fontFamily: DISPL, fontSize: 24, color: TL.mut }}>Corriente continua</span>
        </div>
        <div style={{ height: 240, borderRadius: 12, background: TL.paper, border: `1px solid ${TL.lineS}`, boxShadow: TL.shadowSm, position: 'relative' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 800 240" preserveAspectRatio="none">
            <line x1="20" y1="120" x2="780" y2="120" stroke={TL.line} strokeWidth="1" />
            <Wave x={20} y={120} w={760} h={0} kind="dc" color={TL.blue} t={t} />
          </svg>
        </div>
        <div style={{ marginTop: 12, fontFamily: DISPL, fontSize: 20, color: TL.mut }}>Siempre en el mismo sentido, a nivel constante.</div>
      </div>
      {/* AC panel */}
      <div style={{ position: 'absolute', left: 990, top: 360, width: 800, opacity: ac.op, transform: `translateY(${ac.ty}px)` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 14 }}>
          <span style={{ fontFamily: DISPL, fontSize: 40, fontWeight: 700, color: TL.clay }}>AC</span>
          <span style={{ fontFamily: DISPL, fontSize: 24, color: TL.mut }}>Corriente alterna</span>
        </div>
        <div style={{ height: 240, borderRadius: 12, background: TL.paper, border: `1px solid ${TL.lineS}`, boxShadow: TL.shadowSm, position: 'relative', overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 800 240" preserveAspectRatio="none">
            <line x1="20" y1="120" x2="780" y2="120" stroke={TL.line} strokeWidth="1" />
            <Wave x={20} y={120} w={760} h={150} kind="ac" color={TL.clay} t={t} />
          </svg>
        </div>
        <div style={{ marginTop: 12, fontFamily: DISPL, fontSize: 20, color: TL.mut }}>Cambia de sentido muchas veces por segundo.</div>
      </div>
    </SceneL>
  );
}

function S_Donde({ start, dur }) {
  const t = useTime(); const s = start;
  const dc = ['Baterías y celdas', 'Electrónica y sensores', 'Señal 4–20 mA', 'Paneles solares'];
  const ac = ['La red eléctrica', 'Motores industriales', 'Transformadores', 'Transporte a larga distancia'];
  const col = (title, items, x, color, appear) => (
    <div style={{ position: 'absolute', left: x, top: 340, width: 720 }}>
      <div style={{ fontFamily: DISPL, fontSize: 34, fontWeight: 700, color, marginBottom: 22 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map((it, i) => {
          const p = popL(t, appear + i * 0.3, 0.5, 16);
          return (
            <div key={i} style={{ opacity: p.op, transform: `translateY(${p.ty}px)`, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 22px', borderRadius: 10, background: TL.paper, border: `1px solid ${TL.lineS}`, boxShadow: TL.shadowSm }}>
              <span style={{ width: 10, height: 10, borderRadius: 10, background: color, flexShrink: 0 }} />
              <span style={{ fontFamily: DISPL, fontSize: 24, color: TL.ink }}>{it}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="¿Dónde vive cada una?" y="11%" />
      <CapL start={s + 0.8} dur={2.0} size={46} weight={600} y="20%" width={1500}>Cada corriente tiene su territorio.</CapL>
      {col('DC · Continua', dc, 150, TL.blue, s + 2.2)}
      {col('AC · Alterna', ac, 1050, TL.clay, s + 2.8)}
    </SceneL>
  );
}

const SCENES_M1C4 = [
  { C: (p) => <TitleCardL {...p} claseNo={4} title="Corriente continua vs corriente alterna" dudur="12–14 min" objetivo="Distinguir DC y AC, sus formas de onda y dónde se usa cada una en la industria." />, dur: 7, label: 'Apertura' },
  { C: S_Ondas, dur: 13, label: 'Las formas de onda' },
  { C: S_Donde, dur: 12, label: 'Dónde vive cada una' },
  { C: (p) => <ClosingL {...p} line="DC alimenta la inteligencia; AC mueve la fuerza. Toda planta necesita ambas." activity="Revisa 3 aparatos de tu casa y averigua si funcionan con DC, AC o con un convertidor entre ambas." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M1C4 = SCENES_M1C4;
