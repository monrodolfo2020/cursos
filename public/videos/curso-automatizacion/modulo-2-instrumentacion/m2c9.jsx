// m2c9.jsx — "Instrumentos en campo vs instrumentos en sala de control"
// After m1-lib.jsx + m2-lib.jsx. Exports SCENES_M2C9.

function S_Dos({ start, dur }) {
  const t = useTime(); const s = start;
  const campo = ['Soportan calor, polvo y vibración', 'Carcasas selladas (IP65+)', 'A prueba de explosión', 'Transmisores, sensores, válvulas'];
  const sala = ['Ambiente limpio y climatizado', 'Pantallas SCADA y HMI', 'Controladores PLC / DCS', 'Operadores supervisando'];
  const L = popL(t, s + 1.6, 0.6, 24);
  const R = popL(t, s + 2.2, 0.6, 24);
  const colItems = (items, color, appear) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 22 }}>
      {items.map((it, i) => {
        const p = popL(t, appear + i * 0.22, 0.45, 12);
        return (
          <div key={i} style={{ opacity: p.op, transform: `translateY(${p.ty}px)`, display: 'flex', alignItems: 'center', gap: 14, fontFamily: DISPL, fontSize: 22, color: TL.ink }}>
            <span style={{ width: 9, height: 9, borderRadius: 9, background: color, flexShrink: 0 }} />{it}
          </div>
        );
      })}
    </div>
  );
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Dos mundos, un mismo lazo" y="9%" color={TEAL} />
      {/* field */}
      <div style={{ position: 'absolute', left: 130, top: 230, width: 740, opacity: L.op, transform: `translateY(${L.ty}px)` }}>
        <div style={{ fontFamily: MONOL, fontSize: 15, letterSpacing: '0.2em', color: TL.clay, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 9, height: 9, borderRadius: 9, background: TL.clay }} />Campo</div>
        <div style={{ fontFamily: DISPL, fontSize: 44, fontWeight: 700, color: TL.ink, margin: '10px 0 4px' }}>En la intemperie</div>
        <SlotL label="Instrumento de campo (transmisor en planta)" w={740} h={210} accent={TL.clay} />
        {colItems(campo, TL.clay, s + 2.0)}
      </div>
      {/* control room */}
      <div style={{ position: 'absolute', left: 1050, top: 230, width: 740, opacity: R.op, transform: `translateY(${R.ty}px)` }}>
        <div style={{ fontFamily: MONOL, fontSize: 15, letterSpacing: '0.2em', color: TEAL, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 9, height: 9, borderRadius: 9, background: TEAL }} />Sala de control</div>
        <div style={{ fontFamily: DISPL, fontSize: 44, fontWeight: 700, color: TL.ink, margin: '10px 0 4px' }}>Bajo techo</div>
        <SlotL label="Sala de control (SCADA / HMI)" w={740} h={210} accent={TEAL} />
        {colItems(sala, TEAL, s + 2.6)}
      </div>
      {/* divider with 4-20mA */}
      <div style={{ position: 'absolute', left: 960, top: 300, bottom: 230, width: 2, background: TL.lineS, transform: 'translateX(-50%)' }} />
      <CapL start={s + 6.0} dur={dur - 6.3} size={30} weight={500} color={TL.mut} y="93%" width={1500}>
        Los unen 4–20 mA y la red: el campo siente, la sala decide.
      </CapL>
    </SceneL>
  );
}

const SCENES_M2C9 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={9} title="Campo vs sala de control" dudur="12–14 min" objetivo="Distinguir los instrumentos de campo de los de sala de control y qué los conecta." />, dur: 7, label: 'Apertura' },
  { C: S_Dos, dur: 15, label: 'Los dos mundos' },
  { C: (p) => <ClosingM2 {...p} line="El campo es músculo y sentidos; la sala es cerebro. Un buen automatizador habla ambos idiomas." activity="Haz una lista de 5 instrumentos y clasifícalos: ¿van en campo o en sala de control?" />, dur: 9, label: 'Cierre' },
];
window.SCENES_M2C9 = SCENES_M2C9;
