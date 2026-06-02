// m2c7.jsx — "Simbología ISA-5.1"
// After m1-lib.jsx + m2-lib.jsx. Exports SCENES_M2C7.

// Los globos: ubicación por la línea
function S_Globos({ start, dur }) {
  const t = useTime(); const s = start;
  const balloons = [
    { kind: 'field', name: 'Campo', d: 'Sin línea: montado en el proceso.', cx: 300 },
    { kind: 'panel', name: 'Sala de control', d: 'Línea sólida: accesible al operador.', cx: 760 },
    { kind: 'rear', name: 'Detrás del panel', d: 'Línea punteada: no accesible.', cx: 1220 },
    { kind: 'local', name: 'Panel local', d: 'Doble línea: tablero en planta.', cx: 1680 },
  ];
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="La forma dice dónde está" y="12%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="23%" width={1500}>El globo te dice la ubicación del instrumento.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {balloons.map((b, i) => {
          const e = clamp((t - (s + 2.2 + i * 0.5)) / 0.55, 0, 1);
          return e > 0.02 ? <g key={i} opacity={e} transform={`scale(${0.85 + 0.15 * e})`} transform-origin={`${b.cx} 520`} style={{ transformBox: 'fill-box' }}>
            <ISABalloon cx={b.cx} cy={520} r={60} code="FT" tag="101" kind={b.kind} accent={TEAL} t={t} />
          </g> : null;
        })}
      </svg>
      {balloons.map((b, i) => {
        const { op, ty } = popL(t, s + 2.5 + i * 0.5, 0.5, 14);
        return (
          <div key={i} style={{ position: 'absolute', left: b.cx, top: 640, transform: `translateX(-50%) translateY(${ty}px)`, opacity: op, width: 320, textAlign: 'center' }}>
            <div style={{ fontFamily: DISPL, fontSize: 26, fontWeight: 700, color: TL.ink }}>{b.name}</div>
            <div style={{ fontFamily: DISPL, fontSize: 18, color: TL.mut, lineHeight: 1.35, marginTop: 6 }}>{b.d}</div>
          </div>
        );
      })}
    </SceneL>
  );
}

// Las letras: primera = variable, siguientes = función
function S_Letras({ start, dur }) {
  const t = useTime(); const s = start;
  const firsts = [['F', 'Flujo'], ['L', 'Nivel'], ['P', 'Presión'], ['T', 'Temperatura'], ['A', 'Análisis']];
  const next = [['T', 'Transmisor'], ['I', 'Indicador'], ['C', 'Controlador'], ['V', 'Válvula'], ['E', 'Elemento']];
  const col = (title, items, x, color, appear, sub) => (
    <div style={{ position: 'absolute', left: x, top: 360, width: 620 }}>
      <div style={{ fontFamily: DISPL, fontSize: 30, fontWeight: 700, color, marginBottom: 6 }}>{title}</div>
      <div style={{ fontFamily: MONOL, fontSize: 14, letterSpacing: '0.08em', color: TL.mut, textTransform: 'uppercase', marginBottom: 18 }}>{sub}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, i) => {
          const p = popL(t, appear + i * 0.18, 0.45, 12);
          return (
            <div key={i} style={{ opacity: p.op, transform: `translateY(${p.ty}px)`, display: 'flex', alignItems: 'center', gap: 18, padding: '12px 20px', borderRadius: 8, background: TL.paper, border: `1px solid ${TL.lineS}`, boxShadow: TL.shadowSm }}>
              <span style={{ width: 46, height: 46, borderRadius: 8, background: color, color: '#fff', fontFamily: MONOL, fontSize: 24, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{it[0]}</span>
              <span style={{ fontFamily: DISPL, fontSize: 24, color: TL.ink }}>{it[1]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Las letras: un código que se lee" y="9%" color={TEAL} />
      {col('1ª letra → variable', firsts, 220, TEAL, s + 1.4, 'qué se mide')}
      {col('2ª/3ª letra → función', next, 1080, TL.clay, s + 2.6, 'qué hace')}
      <CapL start={s + 5.4} dur={dur - 5.7} size={30} weight={600} color={TL.ink} y="90%" width={1500}>
        Así, <b style={{ color: TEAL }}>L</b><b style={{ color: TL.clay }}>IC</b> = controlador indicador de nivel.
      </CapL>
    </SceneL>
  );
}

const SCENES_M2C7 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={7} title="Simbología ISA-5.1" dudur="16–18 min" objetivo="Leer los globos de instrumento y el código de letras de la norma internacional ISA-5.1." />, dur: 7, label: 'Apertura' },
  { C: S_Globos, dur: 13, label: 'Los globos' },
  { C: S_Letras, dur: 13, label: 'El código de letras' },
  { C: (p) => <ClosingM2 {...p} line="ISA-5.1 es el alfabeto de los diagramas: con él, cualquier ingeniero del mundo te entiende." activity="Descifra estos tags: PT-205, LIC-101 y FV-310. Escribe qué es cada uno." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M2C7 = SCENES_M2C7;
