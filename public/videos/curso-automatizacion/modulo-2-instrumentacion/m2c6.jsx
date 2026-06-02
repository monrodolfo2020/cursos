// m2c6.jsx — "Documentación industrial: P&ID, hojas de datos, tag numbers"
// After m1-lib.jsx + m2-lib.jsx. Exports SCENES_M2C6.

// Anatomía de un tag number
function S_Tag({ start, dur }) {
  const t = useTime(); const s = start;
  const ft = popL(t, s + 1.4, 0.7, 0);
  const part1 = popL(t, s + 2.6, 0.6, 16);
  const part2 = popL(t, s + 3.6, 0.6, 16);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Anatomía de un tag number" y="14%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.0} size={48} weight={600} y="26%" width={1500}>Cada instrumento tiene un nombre único.</CapL>
      {/* the tag */}
      <div style={{ position: 'absolute', left: '50%', top: '47%', transform: `translate(-50%,-50%) scale(${ft.sc})`, opacity: ft.op, display: 'flex', alignItems: 'baseline', gap: 4, fontFamily: MONOL, fontSize: 150, fontWeight: 600 }}>
        <span style={{ color: TEAL }}>FT</span>
        <span style={{ color: TL.dim }}>-</span>
        <span style={{ color: TL.clay }}>101</span>
      </div>
      {/* legs */}
      <div style={{ position: 'absolute', left: 'calc(50% - 230px)', top: '64%', transform: `translateY(${part1.ty}px)`, opacity: part1.op, textAlign: 'center', width: 360 }}>
        <div style={{ width: 2, height: 30, background: TEAL, margin: '0 auto 14px' }} />
        <div style={{ fontFamily: DISPL, fontSize: 26, fontWeight: 700, color: TEAL }}>Función</div>
        <div style={{ fontFamily: DISPL, fontSize: 19, color: TL.mut, lineHeight: 1.4, marginTop: 6 }}><b>F</b> = caudal (Flow) · <b>T</b> = transmisor</div>
      </div>
      <div style={{ position: 'absolute', left: 'calc(50% + 190px)', top: '64%', transform: `translateY(${part2.ty}px)`, opacity: part2.op, textAlign: 'center', width: 360 }}>
        <div style={{ width: 2, height: 30, background: TL.clay, margin: '0 auto 14px' }} />
        <div style={{ fontFamily: DISPL, fontSize: 26, fontWeight: 700, color: TL.clay }}>Lazo</div>
        <div style={{ fontFamily: DISPL, fontSize: 19, color: TL.mut, lineHeight: 1.4, marginTop: 6 }}>Número de lazo: el 101 de la planta</div>
      </div>
      <CapL start={s + 5.2} dur={dur - 5.5} size={28} weight={500} color={TL.mut} y="90%" width={1500}>
        «Transmisor de caudal del lazo 101». Un idioma que todos leen igual.
      </CapL>
    </SceneL>
  );
}

// Los tres documentos
function S_Docs({ start, dur }) {
  const t = useTime(); const s = start;
  const docs = [
    { k: 'P&ID', name: 'Plano del proceso', d: 'Muestra equipos, tuberías e instrumentos y cómo se conectan.', a: TEAL },
    { k: 'Hoja de datos', name: 'Datasheet', d: 'La ficha técnica de cada instrumento: rango, señal, material.', a: TL.blue },
    { k: 'Lista de tags', name: 'Index', d: 'El inventario: cada tag, su tipo y su ubicación.', a: TL.clay },
  ];
  const xs = [180, 800, 1420]; const w = 380;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Los tres documentos clave" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="22%" width={1500}>Una planta se entrega en papel antes que en acero.</CapL>
      {docs.map((it, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.45, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: 400, width: w, height: 340, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 46, height: 56, borderRadius: 4, border: `2px solid ${it.a}`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 10, left: 8, right: 8, height: 2, background: it.a, opacity: 0.6 }} />
              <div style={{ position: 'absolute', top: 18, left: 8, right: 14, height: 2, background: it.a, opacity: 0.4 }} />
              <div style={{ position: 'absolute', top: 26, left: 8, right: 10, height: 2, background: it.a, opacity: 0.4 }} />
            </div>
            <div style={{ fontFamily: DISPL, fontSize: 32, fontWeight: 700, color: TL.ink }}>{it.k}</div>
            <div style={{ fontFamily: MONOL, fontSize: 14, letterSpacing: '0.1em', color: it.a, textTransform: 'uppercase' }}>{it.name}</div>
            <div style={{ fontFamily: DISPL, fontSize: 19, color: TL.mut, lineHeight: 1.4, marginTop: 'auto' }}>{it.d}</div>
          </div>
        );
      })}
    </SceneL>
  );
}

const SCENES_M2C6 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={6} title="Documentación industrial" dudur="14–16 min" objetivo="Leer un tag number y conocer los documentos que describen toda planta: P&ID, datasheet, índice." />, dur: 7, label: 'Apertura' },
  { C: S_Tag, dur: 13, label: 'El tag number' },
  { C: S_Docs, dur: 12, label: 'Los 3 documentos' },
  { C: (p) => <ClosingM2 {...p} line="Antes de tocar un instrumento, lo conoces en papel. La documentación es la memoria de la planta." activity="Inventa 3 tags válidos para un tanque: un transmisor de nivel, uno de presión y una válvula." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M2C6 = SCENES_M2C6;
