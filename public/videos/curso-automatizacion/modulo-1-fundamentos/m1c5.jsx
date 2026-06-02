// m1c5.jsx — "Potencia eléctrica y consumo energético"
// After m1-lib.jsx. Exports SCENES_M1C5.

function S_Potencia({ start, dur }) {
  const t = useTime(); const s = start;
  const f = popL(t, s + 1.4, 0.7, 0);
  const ex = popL(t, s + 3.4, 0.6, 18);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="La fórmula de la potencia" y="14%" />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="25%" width={1500}>¿Cuánta energía mueve un circuito por segundo?</CapL>
      {/* formula */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%,-50%) scale(${f.sc})`, opacity: f.op, display: 'flex', alignItems: 'center', gap: 28 }}>
        {[['P', 'Potencia', 'watt (W)', TL.blue], ['=', '', '', TL.mut], ['V', 'Voltaje', 'volt', TL.ink], ['×', '', '', TL.mut], ['I', 'Corriente', 'ampere', TL.clay]].map((it, i) => (
          it[0] === '=' || it[0] === '×'
            ? <span key={i} style={{ fontFamily: DISPL, fontSize: 80, fontWeight: 400, color: TL.mut }}>{it[0]}</span>
            : <div key={i} style={{ textAlign: 'center', padding: '24px 30px', borderRadius: 14, background: TL.paper, border: `1px solid ${TL.lineS}`, boxShadow: TL.shadow, minWidth: 200 }}>
                <div style={{ fontFamily: DISPL, fontSize: 80, fontWeight: 700, color: it[3], lineHeight: 1 }}>{it[0]}</div>
                <div style={{ fontFamily: DISPL, fontSize: 22, fontWeight: 600, color: TL.ink, marginTop: 10 }}>{it[1]}</div>
                <div style={{ fontFamily: MONOL, fontSize: 14, color: TL.mut, marginTop: 3 }}>{it[2]}</div>
              </div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: '50%', top: '78%', transform: 'translate(-50%,-50%)', opacity: ex.op, fontFamily: MONOL, fontSize: 30, color: TL.ink }}>
        12 V × 2 A = <b style={{ color: TL.blue }}>24 watts</b>
      </div>
    </SceneL>
  );
}

function S_Consumo({ start, dur }) {
  const t = useTime(); const s = start;
  const items = [
    { name: 'Sensor', w: 2, kwh: '0.05', frac: 0.02 },
    { name: 'Foco LED', w: 9, kwh: '0.2', frac: 0.06 },
    { name: 'Computadora', w: 200, kwh: '4.8', frac: 0.22 },
    { name: 'Bomba pequeña', w: 750, kwh: '18', frac: 0.55 },
    { name: 'Motor industrial', w: 5500, kwh: '132', frac: 1.0 },
  ];
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Energía = potencia × tiempo" y="10%" />
      <CapL start={s + 0.8} dur={2.4} size={46} weight={600} y="19%" width={1500}>El consumo se mide en kilovatios-hora.</CapL>
      <div style={{ position: 'absolute', left: '50%', top: '56%', transform: 'translate(-50%,-50%)', width: 1300, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((it, i) => {
          const appear = s + 2.2 + i * 0.4;
          const p = popL(t, appear, 0.5, 14);
          const grow = clamp((t - (appear + 0.2)) / 0.8, 0, 1) * it.frac;
          const big = i === items.length - 1;
          const color = big ? TL.clay : TL.blue;
          return (
            <div key={i} style={{ opacity: p.op, transform: `translateY(${p.ty}px)`, display: 'flex', alignItems: 'center', gap: 22 }}>
              <div style={{ width: 240, fontFamily: DISPL, fontSize: 26, fontWeight: 600, color: TL.ink, textAlign: 'right' }}>{it.name}</div>
              <div style={{ flex: 1, height: 46, borderRadius: 8, background: TL.paper, border: `1px solid ${TL.line}`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${grow * 100}%`, background: color, borderRadius: 8, opacity: 0.85 }} />
                <div style={{ position: 'absolute', left: 16, top: 0, height: '100%', display: 'flex', alignItems: 'center', fontFamily: MONOL, fontSize: 15, color: TL.ink, fontWeight: 600 }}>{it.w} W</div>
              </div>
              <div style={{ width: 150, fontFamily: MONOL, fontSize: 18, color, fontWeight: 600 }}>{it.kwh} kWh/día</div>
            </div>
          );
        })}
      </div>
      <CapL start={s + 5.0} dur={dur - 5.3} size={30} weight={500} color={TL.mut} y="90%" width={1500}>
        Un motor consume en un día lo que un sensor en años. Por eso medimos.
      </CapL>
    </SceneL>
  );
}

const SCENES_M1C5 = [
  { C: (p) => <TitleCardL {...p} claseNo={5} title="Potencia eléctrica y consumo energético" dudur="12–14 min" objetivo="Entender qué es la potencia, cómo se calcula y cómo se mide el consumo de energía." />, dur: 7, label: 'Apertura' },
  { C: S_Potencia, dur: 12, label: 'P = V × I' },
  { C: S_Consumo, dur: 13, label: 'El consumo' },
  { C: (p) => <ClosingL {...p} line="Potencia es energía por segundo. Medirla es el primer paso para ahorrarla." activity="Busca la etiqueta de potencia (W) de tu refrigerador y estima su consumo diario en kWh." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M1C5 = SCENES_M1C5;
