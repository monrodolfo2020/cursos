// m1c1.jsx — "Unidades del Sistema Internacional aplicadas a la industria"
// After m1-lib.jsx. Exports SCENES_M1C1.

function UnitCard({ sym, mag, unit, x, y, w = 250, appear, t, accent = TL.blue }) {
  const { op, sc, ty } = popL(t, appear, 0.5, 20);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: 180, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 10, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadowSm, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 16 }}>
      <div style={{ fontFamily: DISPL, fontSize: 58, fontWeight: 700, color: accent, lineHeight: 1 }}>{sym}</div>
      <div style={{ fontFamily: DISPL, fontSize: 22, fontWeight: 600, color: TL.ink }}>{mag}</div>
      <div style={{ fontFamily: MONOL, fontSize: 13, color: TL.mut, letterSpacing: '0.04em' }}>{unit}</div>
    </div>
  );
}

function S_Base({ start, dur }) {
  const t = useTime(); const s = start;
  const units = [
    { sym: 'm', mag: 'Longitud', unit: 'metro' },
    { sym: 'kg', mag: 'Masa', unit: 'kilogramo' },
    { sym: 's', mag: 'Tiempo', unit: 'segundo' },
    { sym: 'A', mag: 'Corriente', unit: 'ampere', a: TL.clay },
    { sym: 'K', mag: 'Temperatura', unit: 'kelvin', a: TL.clay },
    { sym: 'mol', mag: 'Sustancia', unit: 'mol' },
    { sym: 'cd', mag: 'Luz', unit: 'candela' },
  ];
  // 4 top, 3 bottom centered
  const row1X = [220, 660, 1100, 1540], row2X = [440, 880, 1320];
  const pos = units.map((_, i) => i < 4 ? { x: row1X[i], y: 340 } : { x: row2X[i - 4], y: 560 });
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Las 7 unidades base del SI" y="11%" />
      <CapL start={s + 0.8} dur={2.4} size={48} weight={600} y="20%" width={1500}>Todo se mide con siete unidades fundamentales.</CapL>
      {units.map((u, i) => <UnitCard key={i} {...u} accent={u.a || TL.blue} x={pos[i].x} y={pos[i].y} w={250} appear={s + 2.2 + i * 0.28} t={t} />)}
      <CapL start={s + 5.4} dur={dur - 5.7} size={32} weight={500} color={TL.mut} y="80%" width={1500}>
        En la industria, dos brillan sobre todas: el <b style={{ color: TL.clay }}>ampere</b> y el <b style={{ color: TL.clay }}>kelvin</b>.
      </CapL>
    </SceneL>
  );
}

function S_Derivadas({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    { mag: 'Presión', unit: 'Pascal', sym: 'Pa', Icon: IcoGauge },
    { mag: 'Temperatura', unit: 'Grado Celsius', sym: '°C', Icon: IcoThermo, a: TL.clay },
    { mag: 'Caudal', unit: 'Metro cúbico / hora', sym: 'm³/h', Icon: IcoFlow },
    { mag: 'Potencia', unit: 'Watt', sym: 'W', Icon: IcoBolt, a: TL.clay },
    { mag: 'Voltaje', unit: 'Volt', sym: 'V', Icon: IcoResistor },
  ];
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="De lo fundamental a la planta" y="11%" />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="20%" width={1500}>Las unidades que verás cada día.</CapL>
      <div style={{ position: 'absolute', left: '50%', top: '58%', transform: 'translate(-50%,-50%)', width: 1200, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {rows.map((r, i) => {
          const { op, ty } = popL(t, s + 2.2 + i * 0.4, 0.5, 16);
          const accent = r.a || TL.blue;
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${ty}px)`, display: 'flex', alignItems: 'center', gap: 22, padding: '16px 26px', borderRadius: 10, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadowSm }}>
              <r.Icon c={accent} t={t} />
              <div style={{ fontFamily: DISPL, fontSize: 30, fontWeight: 700, color: TL.ink, width: 280 }}>{r.mag}</div>
              <div style={{ flex: 1, fontFamily: DISPL, fontSize: 22, color: TL.mut }}>{r.unit}</div>
              <div style={{ fontFamily: MONOL, fontSize: 30, fontWeight: 600, color: accent, minWidth: 110, textAlign: 'right' }}>{r.sym}</div>
            </div>
          );
        })}
      </div>
    </SceneL>
  );
}

function S_Prefijos({ start, dur }) {
  const t = useTime(); const s = start;
  const pre = [
    { p: 'n', e: '10⁻⁹', n: 'nano' },
    { p: 'µ', e: '10⁻⁶', n: 'micro' },
    { p: 'm', e: '10⁻³', n: 'mili' },
    { p: '—', e: '10⁰', n: 'base', base: true },
    { p: 'k', e: '10³', n: 'kilo' },
    { p: 'M', e: '10⁶', n: 'mega' },
    { p: 'G', e: '10⁹', n: 'giga' },
  ];
  const n = pre.length, x0 = 180, gapX = (1920 - 360) / (n - 1), cy = 540;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="La escalera de prefijos" y="14%" />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="25%" width={1500}>Del microvolt al megawatt, una sola lógica.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={x0} y1={cy} x2={x0 + gapX * (n - 1)} y2={cy} stroke={TL.lineS} strokeWidth="2" />
      </svg>
      {pre.map((pr, i) => {
        const x = x0 + i * gapX;
        const { op, sc, ty } = popL(t, s + 2.0 + i * 0.28, 0.5, 16);
        const accent = pr.base ? TL.clay : TL.blue;
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: cy, transform: `translate(-50%,-50%) scale(${sc})`, opacity: op }}>
            <div style={{ width: 92, height: 92, borderRadius: '50%', background: pr.base ? TL.clay : TL.paper, border: `2px solid ${accent}`, boxShadow: TL.shadowSm, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPL, fontSize: 40, fontWeight: 700, color: pr.base ? '#fff' : accent }}>{pr.p}</div>
            <div style={{ position: 'absolute', left: '50%', top: 108, transform: `translateX(-50%) translateY(${ty}px)`, textAlign: 'center', whiteSpace: 'nowrap' }}>
              <div style={{ fontFamily: MONOL, fontSize: 17, fontWeight: 600, color: TL.ink }}>{pr.e}</div>
              <div style={{ fontFamily: DISPL, fontSize: 18, color: TL.mut, marginTop: 2 }}>{pr.n}</div>
            </div>
          </div>
        );
      })}
      <CapL start={s + 4.8} dur={dur - 5.1} size={32} weight={500} color={TL.mut} y="84%" width={1500}>
        Cada salto, mil veces. Memoriza la escalera y dominas las magnitudes.
      </CapL>
    </SceneL>
  );
}

const SCENES_M1C1 = [
  { C: (p) => <TitleCardL {...p} claseNo={1} title="Unidades del SI aplicadas a la industria" dudur="12–14 min" objetivo="Hablar el idioma universal de la medición: las unidades que toda planta usa." />, dur: 7, label: 'Apertura' },
  { C: S_Base, dur: 11, label: 'Las 7 base' },
  { C: S_Derivadas, dur: 12, label: 'Unidades de planta' },
  { C: S_Prefijos, dur: 12, label: 'Prefijos' },
  { C: (p) => <ClosingL {...p} line="Una medición sin unidad no significa nada. El SI es el lenguaje que todos compartimos." activity="Toma 3 instrumentos de tu casa y anota qué magnitud miden y en qué unidad del SI lo expresan." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M1C1 = SCENES_M1C1;
