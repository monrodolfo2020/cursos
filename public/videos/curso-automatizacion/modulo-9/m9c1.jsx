// m9c1.jsx — "Riesgos eléctricos: corriente, voltaje y el cuerpo humano"
// After m9-lib.jsx. Exports SCENES_M9C1.

// ── El mito de los 24 V ───────────────────────────────────────────────────────
function S_Myth({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="El mito más peligroso" y="11%" color={TL9.red} />
      <CapM9 start={s + 0.6} dur={2.4} size={50} weight={600} y="22%" width={1620}>«Con 24 voltios no pasa nada.» <span style={{ color: TL9.red }}>Falso.</span></CapM9>
      <div style={{ position: 'absolute', left: '50%', top: 380, transform: 'translateX(-50%)', textAlign: 'center' }}>
        {(() => { const ap = pop9(t, s + 1.4, 0.6, 18); return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, fontFamily: MONO9, fontSize: 56, fontWeight: 700, color: TL9.ylw, letterSpacing: '0.02em' }}>I = V / R<span style={{ fontSize: 26, color: TL9.mut }}>&nbsp;cuerpo</span></div>
        ); })()}
      </div>
      <div style={{ position: 'absolute', left: '50%', top: 510, transform: 'translateX(-50%)', display: 'flex', gap: 22 }}>
        {[['24 V · piel seca', '100 kΩ', '0.24 mA', 'inofensivo', TL9.grn], ['24 V · piel húmeda', '1 kΩ', '24 mA', 'fibrilación', TL9.red]].map((x, i) => {
          const ap = pop9(t, s + 2.0 + i * 0.4, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, width: 440, background: TL9.paper, border: `1px solid ${x[4]}`, borderRadius: 14, padding: '22px 28px', boxShadow: TL9.shadowSm }}>
              <div style={{ fontFamily: MONO9, fontSize: 15, color: TL9.mut, letterSpacing: '0.08em' }}>{x[0]} · R={x[1]}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 10, whiteSpace: 'nowrap' }}>
                <span style={{ fontFamily: DISP9, fontSize: 46, fontWeight: 700, color: x[4] }}>{x[2]}</span>
                <span style={{ fontFamily: DISP9, fontSize: 19, fontWeight: 600, color: x[4] }}>{x[3]}</span>
              </div>
            </div>
          );
        })}
      </div>
      <CapM9 start={s + 3.8} dur={dur - 4.1} size={25} weight={500} color={TL9.ylwLt} y="86%" width={1560}>El voltaje no mata: mata la <b style={{ color: TL9.ink }}>corriente que atraviesa el cuerpo</b>. El voltaje solo decide cuánta corriente puede forzar.</CapM9>
    </SceneM9>
  );
}

// ── Efectos de la corriente ───────────────────────────────────────────────────
function S_Effects({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Lo que la corriente le hace al cuerpo" y="9%" />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>De un hormigueo a la muerte, en miliamperios.</CapM9>
      <TableM9 x={260} y={290} w={1400} t={t} appear={s + 1.2} accentCol={2}
        headers={['Corriente', 'Efecto en el cuerpo', 'Peligro']}
        colTemplate="0.8fr 1.9fr 1fr"
        rowAccents={[TL9.grn, TL9.grn, TL9.org, TL9.red, TL9.red, TL9.red]}
        rows={[
          ['1 mA', 'Hormigueo leve, apenas perceptible', 'Ninguno'],
          ['5 mA', 'Sensación clara, molesta', 'Bajo'],
          ['10–20 mA', 'Contracción muscular · no puede soltar', 'No-let-go'],
          ['30–50 mA', 'Fibrilación posible, dificultad respiratoria', 'Muy alto'],
          ['100 mA', 'Fibrilación casi segura (pecho a pecho)', 'Casi fatal'],
          ['1 A', 'Quemaduras internas, paro cardíaco', 'Fatal'],
        ]} />
      <CapM9 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL9.orgWash ? TL9.org : TL9.org} y="87%" width={1560}>La <b style={{ color: TL9.ink }}>corriente de no soltar</b>: desde ~10 mA los músculos se contraen y la víctima no puede soltar el conductor. Por eso el límite de seguridad es 30 mA.</CapM9>
    </SceneM9>
  );
}

// ── Trayecto de la corriente ──────────────────────────────────────────────────
function S_Path({ start, dur }) {
  const t = useTime(); const s = start;
  const flash = Math.sin(t * 6) > 0;
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="El trayecto importa tanto como la magnitud" y="9%" color={TL9.org} />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Si la corriente cruza el corazón → fibrilación.</CapM9>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* simple body silhouette */}
        {(() => { const ap = pop9(t, s + 1.2, 0.6, 16); const cx = 700; return (
          <g opacity={ap.op}>
            <circle cx={cx} cy={300} r="34" fill="none" stroke={TL9.mut} strokeWidth="3" />
            <line x1={cx} y1={334} x2={cx} y2={560} stroke={TL9.mut} strokeWidth="3" />
            {/* arms */}
            <line x1={cx} y1={400} x2={cx - 130} y2={500} stroke={TL9.mut} strokeWidth="3" />
            <line x1={cx} y1={400} x2={cx + 130} y2={500} stroke={TL9.mut} strokeWidth="3" />
            {/* legs */}
            <line x1={cx} y1={560} x2={cx - 80} y2={720} stroke={TL9.mut} strokeWidth="3" />
            <line x1={cx} y1={560} x2={cx + 80} y2={720} stroke={TL9.mut} strokeWidth="3" />
            {/* heart */}
            <text x={cx + 18} y={445} fontSize="34" opacity={flash ? 1 : 0.5}>❤️</text>
            {/* danger path: right hand -> left foot */}
            <line x1={cx + 130} y1={500} x2={cx - 80} y2={720} stroke={TL9.red} strokeWidth="5" strokeDasharray="10 8" opacity={clamp((t - (s + 2.0)) / 0.6, 0, 1) * (flash ? 1 : 0.6)} />
            <text x={cx + 150} y={505} fill={TL9.red} fontFamily={MONO9} fontSize="18" fontWeight="700">mano D</text>
            <text x={cx - 150} y={730} fill={TL9.red} fontFamily={MONO9} fontSize="18" fontWeight="700" textAnchor="end">pie I</text>
          </g>
        ); })()}
      </svg>
      <InfoCardM9 x={1090} y={300} w={640} h={180} accent={TL9.red} title="Mano a pie / mano a mano" sub="La corriente atraviesa el corazón → el trayecto de máximo riesgo de fibrilación ventricular." appear={s + 2.4} t={t} />
      <InfoCardM9 x={1090} y={500} w={640} h={190} accent={TL9.grn} title="Regla: una mano en el bolsillo" sub="Al trabajar cerca de electricidad, mantén una mano en el bolsillo: si hay contacto, la corriente no cruza el pecho." appear={s + 2.9} t={t} />
    </SceneM9>
  );
}

// ── Riesgos eléctricos en planta ──────────────────────────────────────────────
function S_Hazards({ start, dur }) {
  const t = useTime(); const s = start;
  const hz = [
    { ic: '⚡', name: 'Contacto directo', d: 'Tocar un conductor energizado: terminales expuestas, cable dañado.', a: TL9.ylw },
    { ic: '🔌', name: 'Contacto indirecto', d: 'Tocar una carcasa con falla de aislamiento. Se previene con tierra.', a: TL9.org },
    { ic: '💥', name: 'Arco eléctrico', d: 'Explosión de energía: hasta 20.000 °C. Quemaduras, ceguera, muerte.', a: TL9.red },
    { ic: '🌩️', name: 'Sobretensión', d: 'Rayos y maniobras: pulsos de miles de voltios dañan y electrocutan.', a: TL9.ylwLt },
    { ic: '👣', name: 'Voltaje de paso', d: 'En falla a tierra, el suelo tiene potenciales: choca sin tocar nada.', a: TL9.org },
  ];
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Cinco riesgos específicos en planta" y="8%" />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="14%" width={1560}>Saber reconocerlos es el primer EPP.</CapM9>
      <div style={{ position: 'absolute', left: 130, top: 270, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 18 }}>
        {hz.map((x, i) => {
          const ap = pop9(t, s + 1.1 + i * 0.3, 0.5, 20);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
              <div style={{ position: 'relative', background: `linear-gradient(160deg, ${TL9.paper}, ${TL9.bg2})`, border: `1px solid ${x.a === TL9.red ? TL9.red : TL9.lineS}`, borderRadius: 12, padding: '22px 18px', height: 340, boxShadow: TL9.shadowSm }}>
                <div style={{ fontSize: 32, lineHeight: 1 }}>{x.ic}</div>
                <div style={{ fontFamily: DISP9, fontSize: 21, fontWeight: 700, color: x.a, margin: '16px 0 12px', lineHeight: 1.1 }}>{x.name}</div>
                <div style={{ fontFamily: DISP9, fontSize: 16.5, color: TL9.mut, lineHeight: 1.44 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
      <CapM9 start={s + 3.9} dur={dur - 4.2} size={23} weight={500} color={TL9.ylwLt} y="88%" width={1560}>El arco eléctrico se rige por la <b style={{ color: TL9.ink }}>NFPA 70E</b>: un estudio calcula la energía incidente de cada tablero y define el EPP requerido.</CapM9>
    </SceneM9>
  );
}

const SCENES_M9C1 = [
  { C: (p) => <TitleCardM9 {...p} claseNo={1} seccion="Riesgo eléctrico" title="Riesgos eléctricos y el cuerpo humano" dudur="18–20 min" objetivo="Comprender los efectos fisiológicos reales de la corriente, por qué el voltaje solo no define el peligro y cómo reconocer el riesgo eléctrico en una planta." />, dur: 7, label: 'Apertura' },
  { C: S_Myth, dur: 14, label: 'El mito de los 24 V' },
  { C: S_Effects, dur: 14, label: 'Efectos de la corriente' },
  { C: S_Path, dur: 13, label: 'El trayecto' },
  { C: S_Hazards, dur: 13, label: '5 riesgos en planta' },
  { C: (p) => <ClosingM9 {...p} line="La electricidad no perdona la ignorancia. Entender que es la corriente —no el voltaje— la que mata, y por dónde viaja, ya te hace más seguro que la mayoría." activity="Analiza 6 fotos de situaciones reales en planta: identifica todos los riesgos eléctricos presentes, clasifica cada uno por tipo (directo, indirecto, arco, sobretensión, voltaje de paso) y propón medidas preventivas específicas." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M9C1 = SCENES_M9C1;
