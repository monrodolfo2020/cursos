// m3c14.jsx — Selección de medidores de caudal según API RP 551
// After m3-dark.jsx. Exports SCENES_M3C14.

// ── Scene 2: Selection matrix ─────────────────────────────────────────────────
function S_SelectionMatrix({ start, dur }) {
  const t = useTime(); const s = start;

  const headers = ['Medidor', 'Líquido limpio', 'Gas / Vapor', 'Viscoso', 'Slurry / Sucio', 'Medición fiscal'];
  const rows = [
    { name: 'Placa orificio', vals: ['✓ Bien', '✓ Bien', '⚠ Compensa', '✗ No', '✓ Con orificio'], c: TL.clay },
    { name: 'Turbina axial', vals: ['✓✓ Excelente', '✓✓ Fiscal', '⚠ Solo baja η', '✗ No', '✓✓ AGA-7/9'], c: TEAL },
    { name: 'Electromagnético', vals: ['✓✓ Excelente', '✗ No (no conductor)', '✓ Con revestimiento', '✓ Ideal', '✓ Con calib.'], c: TL.blue },
    { name: 'Vórtex', vals: ['✓ Bien', '✓ Bien', '⚠ Reynolds mín.', '✗ No', '✓ Preciso'], c: TL.blue },
    { name: 'Coriolis', vals: ['✓✓ Mejor de todos', '✓✓ Excelente', '✓✓ Sin límite η', '⚠ Si no atasca', '✓✓ ISO 10790'], c: 'oklch(60% 0.18 27)' },
    { name: 'Ultrasónico', vals: ['✓ Clamp-on sin corte', '✓ Fiscal (AGA-9)', '⚠ Perfil limpio', '✗ No (ruido)', '✓✓ Fiscal gas'], c: TL.mut },
    { name: 'Rotámetro', vals: ['✓ Simple', '✓ Simple', '✓ Con float adecuado', '⚠ Posición vert.', '✗ Sólo indicación'], c: TL.dim },
  ];

  const { op: headerOp, ty: headerTy } = popL(t, s + 1.0, 0.6, 20);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="API RP 551 — Tabla de selección de medidores" y="8%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={44} weight={600} y="16%">Elige el medidor correcto según el fluido.</CapL>
      <div style={{ position: 'absolute', left: 60, top: 220, right: 60 }}>
        {/* Header */}
        <div style={{ display: 'flex', gap: 0, opacity: headerOp, transform: `translateY(${headerTy}px)`, marginBottom: 6 }}>
          {headers.map((h, i) => (
            <div key={i} style={{
              flex: i === 0 ? '0 0 220px' : 1,
              fontFamily: MONOL, fontSize: 11, letterSpacing: '0.14em', color: TEAL,
              textTransform: 'uppercase', padding: '6px 8px',
              borderBottom: `2px solid ${TL.lineS}`
            }}>{h}</div>
          ))}
        </div>
        {/* Rows */}
        {rows.map((row, ri) => {
          const { op, ty } = popL(t, s + 1.4 + ri * 0.28, 0.4, 12);
          return (
            <div key={ri} style={{ display: 'flex', gap: 0, opacity: op, transform: `translateY(${ty}px)`, marginBottom: 2 }}>
              <div style={{ flex: '0 0 220px', fontFamily: DISPL, fontSize: 16, fontWeight: 700, color: row.c, padding: '7px 8px', borderBottom: `1px solid ${TL.line}`, display: 'flex', alignItems: 'center' }}>{row.name}</div>
              {row.vals.map((v, vi) => (
                <div key={vi} style={{
                  flex: 1, fontFamily: DISPL, fontSize: 14, color: v.startsWith('✓✓') ? TEAL : v.startsWith('✓') ? TL.ink : v.startsWith('✗') ? TL.clay : TL.mut,
                  padding: '7px 8px', borderBottom: `1px solid ${TL.line}`,
                  background: v.startsWith('✓✓') ? 'rgba(110,210,150,0.06)' : v.startsWith('✗') ? 'rgba(220,80,50,0.06)' : 'transparent',
                }}>{v}</div>
              ))}
            </div>
          );
        })}
      </div>
    </SceneL>
  );
}

// ── Scene 3: Upstream / downstream pipe requirements ─────────────────────────
function S_InstallReqs({ start, dur }) {
  const t = useTime(); const s = start;
  const meters = [
    { name: 'Placa orificio', up: 20, dn: 5, note: 'Con codo simple. Tabla AGA-3 / ISO 5167' },
    { name: 'Turbina axial', up: 20, dn: 5, note: 'Mínimo 20D aguas arriba sin perturbaciones' },
    { name: 'Vórtex',         up: 15, dn: 5, note: 'Preferible acondicionador de flujo a 10D' },
    { name: 'Electromagnético', up: 10, dn: 5, note: 'Menor sensibilidad al perfil de flujo' },
    { name: 'Ultrasónico',    up: 20, dn: 5, note: 'Patented flow conditioner ≈ 10D equivalente' },
    { name: 'Coriolis',       up: 0,  dn: 0, note: 'No requiere tramo recto — medición directa de masa' },
  ];
  const maxUp = 22;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tramos rectos requeridos — API RP 551 §5.3.2" y="9%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={42} weight={600} y="18%">Distancias aguas arriba y abajo (en diámetros D).</CapL>
      <div style={{ position: 'absolute', left: 80, top: 260, right: 80 }}>
        {meters.map((m, i) => {
          const { op, ty } = popL(t, s + 1.6 + i * 0.36, 0.5, 16);
          const upW = (m.up / maxUp) * 560;
          const dnW = (m.dn / maxUp) * 560;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12, opacity: op, transform: `translateY(${ty}px)` }}>
              <div style={{ width: 200, fontFamily: DISPL, fontSize: 17, fontWeight: 600, color: TL.ink, flexShrink: 0 }}>{m.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
                {/* upstream bar */}
                <div style={{ width: 460, height: 26, background: TL.bg2, borderRadius: 4, position: 'relative' }}>
                  {m.up > 0 && <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: Math.max(upW, 6), background: TEAL, borderRadius: 4, opacity: 0.75 }} />}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONOL, fontSize: 14, fontWeight: 700, color: TL.ink }}>
                    {m.up > 0 ? `${m.up}D aguas arriba` : '0D — sin requisito'}
                  </div>
                </div>
                {/* flow symbol */}
                <span style={{ fontFamily: MONOL, fontSize: 18, color: TL.clay }}>⇒</span>
                {/* meter box */}
                <div style={{ width: 50, height: 26, background: TL.clay, borderRadius: 4, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: MONOL, fontSize: 10, color: '#fff', letterSpacing: 0, fontWeight: 700 }}>FT</span>
                </div>
                <span style={{ fontFamily: MONOL, fontSize: 18, color: TL.clay }}>⇒</span>
                {/* downstream bar */}
                <div style={{ width: 160, height: 26, background: TL.bg2, borderRadius: 4, position: 'relative' }}>
                  {m.dn > 0 && <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: Math.max((m.dn / maxUp) * 160, 6), background: TL.blue, borderRadius: 4, opacity: 0.75 }} />}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONOL, fontSize: 14, fontWeight: 700, color: TL.ink }}>{m.dn > 0 ? `${m.dn}D abajo` : '0D'}</div>
                </div>
              </div>
              <div style={{ width: 380, fontFamily: DISPL, fontSize: 14, color: TL.mut, flexShrink: 0 }}>{m.note}</div>
            </div>
          );
        })}
      </div>
    </SceneL>
  );
}

// ── Scene 4: Fiscal metering / API RP 551 custody transfer ───────────────────
function S_FiscalMetering({ start, dur }) {
  const t = useTime(); const s = start;
  const standards = [
    { std: 'AGA-7', meter: 'Turbina — Gas', desc: 'Requisitos de diseño, instalación, calibración y prueba de campo para medidores de turbina en gas natural. Define el factor K y la corrección por temperatura/presión (Fpv).' },
    { std: 'AGA-9', meter: 'Ultrasónico — Gas', desc: 'Requisitos para caudalímetros ultrasónicos en gas natural. Especifica el número mínimo de trayectorias y criterios de diagnóstico de diagnóstico de velocidad de sonido.' },
    { std: 'ISO 10790', meter: 'Coriolis', desc: 'Requisitos de instalación y operación para medidores Coriolis en gas y líquido. Define incertidumbre máxima para medición fiscal (±0.1% masa).' },
    { std: 'API MPMS 5.3', meter: 'Desplazamiento positivo', desc: 'Para medición fiscal de líquidos (crudo, productos refinados). Requisitos de exactitud, viscosidad y temperatura de prueba.' },
  ];
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Medición fiscal y transferencia de custodia" y="9%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={44} weight={600} y="18%">API RP 551 y las normas de referencia fiscal.</CapL>
      {standards.map((st, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.5, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: 75 + (i % 2) * 920, top: 300 + Math.floor(i / 2) * 230, width: 840, opacity: op, transform: `translateY(${ty}px) scale(${sc})` }}>
            <div style={{ background: TL.paper, border: `1px solid ${TL.lineS}`, borderRadius: 10, padding: '18px 22px', position: 'relative', height: 200 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: TEAL, borderRadius: '10px 0 0 10px' }} />
              <div style={{ paddingLeft: 14 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontFamily: MONOL, fontSize: 20, fontWeight: 700, color: TEAL }}>{st.std}</span>
                  <span style={{ fontFamily: DISPL, fontSize: 15, color: TL.dim, background: TL.bg2, padding: '2px 10px', borderRadius: 4 }}>{st.meter}</span>
                </div>
                <div style={{ fontFamily: DISPL, fontSize: 18, color: TL.mut, lineHeight: 1.45 }}>{st.desc}</div>
              </div>
            </div>
          </div>
        );
      })}
    </SceneL>
  );
}

const SCENES_M3C14 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={14} title="Selección de medidores según API RP 551" dudur="16–18 min" objetivo="Seleccionar el tipo de medidor de caudal correcto según el fluido, la exactitud requerida y los requisitos de API RP 551 para medición fiscal." />, dur: 7, label: 'Apertura' },
  { C: S_SelectionMatrix, dur: 16, label: 'Tabla de selección' },
  { C: S_InstallReqs,     dur: 14, label: 'Tramos rectos' },
  { C: S_FiscalMetering,  dur: 12, label: 'Medición fiscal' },
  { C: (p) => <ClosingM2 {...p} line="La selección del medidor correcto no es solo exactitud: considera el fluido, la instalación, los costos y el estándar fiscal aplicable." activity="Necesitas medir caudal de gas natural húmedo para transferencia de custodia. El Coriolis tiene alto costo. ¿Qué medidor y estándar seleccionas? ¿Qué precauciones adicionales?" />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C14 = SCENES_M3C14;
