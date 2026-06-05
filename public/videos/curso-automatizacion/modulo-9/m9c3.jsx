// m9c3.jsx — "Atmósferas peligrosas y clasificación de áreas (ATEX / Ex)"
// After m9-lib.jsx. Exports SCENES_M9C3.

// ── Triángulo del fuego + LIE/LSE ─────────────────────────────────────────────
function S_Triangle({ start, dur }) {
  const t = useTime(); const s = start;
  const verts = [
    { x: 700, y: 250, label: 'Combustible', sub: 'gas, vapor, polvo', a: TL9.org },
    { x: 540, y: 540, label: 'Oxidante', sub: 'oxígeno del aire', a: TL9.grn },
    { x: 860, y: 540, label: 'Ignición', sub: 'chispa, arco, calor', a: TL9.red },
  ];
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="El triángulo del fuego" y="9%" />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Solo podemos controlar <span style={{ color: TL9.red }}>una</span> de las tres.</CapM9>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {(() => { const ap = clamp((t - (s + 1.2)) / 0.6, 0, 1); return (
          <polygon points="700,270 555,525 845,525" fill="none" stroke={TL9.ylw} strokeWidth="3" opacity={ap} strokeLinejoin="round" />
        ); })()}
        {verts.map((v, i) => {
          const ap = pop9(t, s + 1.4 + i * 0.3, 0.5, 12);
          return (
            <g key={i} opacity={ap.op}>
              <circle cx={v.x} cy={v.y} r="16" fill={v.a} />
              <text x={v.x} y={v.y - (i === 0 ? 34 : -44)} fill={v.a} fontFamily={DISP9} fontSize="26" fontWeight="700" textAnchor="middle">{v.label}</text>
              <text x={v.x} y={v.y - (i === 0 ? 12 : -66)} fill={TL9.mut} fontFamily={MONO9} fontSize="15" textAnchor="middle">{v.sub}</text>
            </g>
          );
        })}
      </svg>
      <InfoCardM9 x={1080} y={290} w={660} h={170} accent={TL9.red} title="Solo controlamos la ignición" sub="El combustible y el oxígeno casi siempre están. Por eso el equipo eléctrico en zona peligrosa NO debe poder generar ignición." appear={s + 2.4} t={t} />
      <div style={{ position: 'absolute', left: 1080, top: 480, width: 660 }}>
        {(() => { const ap = pop9(t, s + 3.0, 0.55, 16); return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, background: TL9.paper, border: `1px solid ${TL9.lineS}`, borderRadius: 12, padding: '18px 22px' }}>
            <div style={{ fontFamily: MONO9, fontSize: 14, color: TL9.ylwLt, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Límites de inflamabilidad · LIE–LSE</div>
            {[['Metano', '5 %', '15 %'], ['Hidrógeno', '4 %', '75 %'], ['Gasolina (vapor)', '1.4 %', '7.6 %']].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderTop: i ? `1px solid ${TL9.line}` : 'none', fontFamily: MONO9, fontSize: 16, color: TL9.mut }}><span style={{ color: TL9.ink }}>{r[0]}</span><span>{r[1]} → {r[2]}</span></div>
            ))}
          </div>
        ); })()}
      </div>
      <CapM9 start={s + 4.2} dur={dur - 4.5} size={22} weight={500} color={TL9.mut} y="92%" width={1500}>Entre el LIE y el LSE la mezcla es explosiva. El riesgo no es el gas: es la mezcla con aire en el rango correcto.</CapM9>
    </SceneM9>
  );
}

// ── Zonas ATEX vs NEC ─────────────────────────────────────────────────────────
function S_Zones({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Clasificación de áreas peligrosas" y="9%" />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>¿Con qué frecuencia está presente la atmósfera?</CapM9>
      <TableM9 x={260} y={290} w={1400} t={t} appear={s + 1.2} accentCol={2}
        headers={['Zona ATEX', 'Definición', 'Equivalente NEC']}
        colTemplate="0.9fr 2fr 1.1fr"
        rowAccents={[TL9.red, TL9.org, TL9.ylw, TL9.red, TL9.org, TL9.ylw]}
        rows={[
          ['Zona 0', 'Atmósfera explosiva presente continuamente', 'Clase I Div 1'],
          ['Zona 1', 'Posible durante operación normal', 'Clase I Div 1'],
          ['Zona 2', 'Solo en condición anormal o breve tiempo', 'Clase I Div 2'],
          ['Zona 20', 'Polvo combustible continuo (silos)', 'Clase II Div 1'],
          ['Zona 21', 'Polvo posible en operación normal', 'Clase II Div 1'],
          ['Zona 22', 'Polvo no probable en operación normal', 'Clase II Div 2'],
        ]} />
      <CapM9 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL9.ylwLt} y="87%" width={1560}>Gases (0–1–2) y polvos (20–21–22). Cuanto menor el número, más exigente la protección requerida.</CapM9>
    </SceneM9>
  );
}

// ── Modos de protección Ex ────────────────────────────────────────────────────
function S_ExModes({ start, dur }) {
  const t = useTime(); const s = start;
  const modes = [
    { k: 'Ex d', name: 'Antideflagrante', d: 'La carcasa resiste la explosión interna; las llamas se enfrían al salir.', a: TL9.org },
    { k: 'Ex e', name: 'Seguridad aumentada', d: 'Sin fuentes de ignición + medidas extra. Cajas de bornes.', a: TL9.ylw },
    { k: 'Ex ia/ib', name: 'Seguridad intrínseca', d: 'Energía tan baja que ninguna chispa enciende. El modo de instrumentación.', a: TL9.grn },
    { k: 'Ex p', name: 'Presurizado', d: 'Carcasa llena de gas inerte a presión: el gas peligroso no entra.', a: TL9.ylwLt },
    { k: 'Ex m', name: 'Encapsulado', d: 'Los componentes con chispa se sellan en resina.', a: TL9.org },
    { k: 'Ex n', name: 'No-chispa (Zona 2)', d: 'En operación normal no genera chispa, arco ni calor.', a: TL9.mut },
  ];
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Cómo el equipo evita ser ignición" y="8%" color={TL9.org} />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="14%" width={1560}>Los modos de protección «Ex».</CapM9>
      <div style={{ position: 'absolute', left: 130, top: 250, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {modes.map((x, i) => {
          const ap = pop9(t, s + 1.1 + i * 0.26, 0.5, 18);
          const hi = i === 2;
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', background: `linear-gradient(160deg, ${TL9.paper}, ${TL9.bg2})`, border: `1px solid ${hi ? TL9.grn : TL9.lineS}`, borderRadius: 12, padding: '20px 24px', height: 185 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontFamily: MONO9, fontSize: 22, fontWeight: 700, color: x.a }}>{x.k}</span>
                <span style={{ fontFamily: DISP9, fontSize: 19, fontWeight: 700, color: TL9.ink }}>{x.name}</span>
              </div>
              <div style={{ fontFamily: DISP9, fontSize: 17, color: TL9.mut, marginTop: 10, lineHeight: 1.42 }}>{x.d}</div>
            </div>
          );
        })}
      </div>
      <CapM9 start={s + 3.9} dur={dur - 4.2} size={23} weight={500} color={TL9.grn} y="89%" width={1560}>La señal 4–20 mA de un transmisor en zona peligrosa <b style={{ color: TL9.ink }}>siempre</b> va por una barrera de seguridad intrínseca.</CapM9>
    </SceneM9>
  );
}

// ── Leer la marcación Ex ──────────────────────────────────────────────────────
function S_ExMark({ start, dur }) {
  const t = useTime(); const s = start;
  const parts = [
    { txt: 'Ex', d: 'Certificación de protección contra explosión', a: TL9.ylw },
    { txt: 'd', d: 'Modo de protección: antideflagrante (flameproof)', a: TL9.org },
    { txt: 'IIB', d: 'Grupo de gas: incluye etileno y similares', a: TL9.grn },
    { txt: 'T4', d: 'Clase de temperatura: superficie máx. 135 °C', a: TL9.red },
    { txt: 'Gb', d: 'Nivel de protección: apto para Zona 1', a: TL9.ylwLt },
  ];
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Leer la placa de un equipo Ex" y="10%" />
      <div style={{ position: 'absolute', left: '50%', top: 250, transform: 'translateX(-50%)', display: 'flex', gap: 14 }}>
        {parts.map((p, i) => {
          const ap = pop9(t, s + 1.0 + i * 0.3, 0.5, 16);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, minWidth: 110, padding: '20px 26px', borderRadius: 12, background: TL9.paper2, border: `2px solid ${p.a}`, fontFamily: MONO9, fontSize: 40, fontWeight: 700, color: p.a, textAlign: 'center' }}>{p.txt}</div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: '50%', top: 420, transform: 'translateX(-50%)', width: 1100 }}>
        {parts.map((p, i) => {
          const ap = pop9(t, s + 2.4 + i * 0.3, 0.5, 12);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 20, padding: '12px 0', borderBottom: `1px solid ${TL9.line}` }}>
              <span style={{ fontFamily: MONO9, fontSize: 22, fontWeight: 700, color: p.a, minWidth: 80 }}>{p.txt}</span>
              <span style={{ fontFamily: DISP9, fontSize: 21, color: TL9.mut }}>{p.d}</span>
            </div>
          );
        })}
      </div>
      <CapM9 start={s + 4.4} dur={dur - 4.7} size={23} weight={500} color={TL9.red} y="90%" width={1560}>Regla absoluta: <b style={{ color: TL9.ink }}>nunca</b> introduzcas un equipo sin certificación Ex en una zona clasificada — ni «por un momento».</CapM9>
    </SceneM9>
  );
}

const SCENES_M9C3 = [
  { C: (p) => <TitleCardM9 {...p} claseNo={3} seccion="Atmósferas Ex" title="Atmósferas peligrosas y clasificación de áreas" dudur="18–20 min" objetivo="Comprender qué son las atmósferas explosivas, el sistema de clasificación NEC/ATEX, los equipos certificados Ex y cómo identificar el área antes de entrar con equipo eléctrico." />, dur: 7, label: 'Apertura' },
  { C: S_Triangle, dur: 14, label: 'Triángulo del fuego' },
  { C: S_Zones, dur: 14, label: 'Zonas ATEX / NEC' },
  { C: S_ExModes, dur: 14, label: 'Modos de protección Ex' },
  { C: S_ExMark, dur: 13, label: 'Leer la marcación Ex' },
  { C: (p) => <ClosingM9 {...p} line="En una zona peligrosa, una chispa que no verías en tu casa puede destruir la planta. Por eso cada equipo lleva su marcación Ex — y por eso hay que saber leerla." activity="Sobre el plano de áreas de una refinería con Zonas 0, 1 y 2: lista los modos de protección válidos por zona, selecciona el equipo correcto de una lista de 10 instrumentos Ex, descarta los inadecuados y verifica si un motor T3 sirve para una Zona 1 con gasolina." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M9C3 = SCENES_M9C3;
