// m9c4.jsx — "EPP, primeros auxilios eléctricos y ergonomía industrial"
// After m9-lib.jsx. Exports SCENES_M9C4.

// ── Jerarquía de controles ────────────────────────────────────────────────────
function S_Hierarchy({ start, dur }) {
  const t = useTime(); const s = start;
  const ctrl = [
    { name: 'Eliminación', d: 'Quitar el riesgo por completo', a: TL9.grn, w: 1.0 },
    { name: 'Sustitución', d: 'Reemplazar por algo menos peligroso', a: TL9.grn, w: 0.86 },
    { name: 'Controles de ingeniería', d: 'Aislar a las personas del riesgo', a: TL9.ylw, w: 0.72 },
    { name: 'Controles administrativos', d: 'Procedimientos, señalización, turnos', a: TL9.org, w: 0.58 },
    { name: 'EPP', d: 'La última línea — no la primera', a: TL9.red, w: 0.44 },
  ];
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="El EPP es la última defensa" y="9%" />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>El EPP no elimina el riesgo: reduce el daño.</CapM9>
      <div style={{ position: 'absolute', left: '50%', top: 290, transform: 'translateX(-50%)', width: 1100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        {ctrl.map((x, i) => {
          const ap = pop9(t, s + 1.2 + i * 0.35, 0.5, 14);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, width: `${x.w * 100}%`, display: 'flex', alignItems: 'center', gap: 20, background: TL9.paper, border: `1px solid ${TL9.lineS}`, borderLeft: `5px solid ${x.a}`, borderRadius: 10, padding: '16px 26px' }}>
              <span style={{ fontFamily: MONO9, fontSize: 14, fontWeight: 700, color: x.a, minWidth: 24 }}>{i + 1}</span>
              <span style={{ fontFamily: DISP9, fontSize: 22, fontWeight: 700, color: TL9.ink, minWidth: 320 }}>{x.name}</span>
              <span style={{ fontFamily: DISP9, fontSize: 17, color: TL9.mut }}>{x.d}</span>
            </div>
          );
        })}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 6, fontFamily: MONO9, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: TL9.dim }}>
          <span style={{ color: TL9.grn }}>↑ más efectivo</span><span style={{ color: TL9.red }}>menos efectivo ↓</span>
        </div>
      </div>
    </SceneM9>
  );
}

// ── EPP eléctrico: guantes y arco ─────────────────────────────────────────────
function S_PPE({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="EPP para trabajo eléctrico" y="8%" color={TL9.ylw} />
      <CapM9 start={s + 0.6} dur={2.0} size={42} weight={600} y="14%" width={1560}>Solo los guantes dieléctricos aíslan — nunca el cuero.</CapM9>
      <div style={{ position: 'absolute', left: 150, top: 230 }}>
        <div style={{ fontFamily: MONO9, fontSize: 14, color: TL9.ylwLt, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Guantes dieléctricos</div>
      </div>
      <TableM9 x={150} y={270} w={780} t={t} appear={s + 1.2} accentCol={2}
        headers={['Clase', 'Prueba', 'Uso máx.']}
        colTemplate="1fr 1.2fr 1.2fr"
        rows={[
          ['00', '2.500 V', '500 V'],
          ['0', '5.000 V', '1.000 V'],
          ['1', '10.000 V', '7.500 V'],
          ['2', '20.000 V', '17.000 V'],
        ]} />
      <div style={{ position: 'absolute', left: 990, top: 230 }}>
        <div style={{ fontFamily: MONO9, fontSize: 14, color: TL9.ylwLt, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Arco eléctrico · NFPA 70E</div>
      </div>
      <TableM9 x={990} y={270} w={780} t={t} appear={s + 1.6} accentCol={1}
        headers={['Categoría', 'Energía', 'EPP']}
        colTemplate="1fr 1.1fr 1.4fr"
        rowAccents={[TL9.ylw, TL9.org, TL9.org, TL9.red]}
        rows={[
          ['CAT 1', '1.2–4 cal/cm²', 'Ropa FR, casco, gafas'],
          ['CAT 2', '4–8 cal/cm²', 'Traje FR 8, careta de arco'],
          ['CAT 3', '8–25 cal/cm²', 'Traje FR 25, guantes'],
          ['CAT 4', '25–40 cal/cm²', 'Traje FR 40, careta'],
        ]} />
      <CapM9 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL9.mut} y="88%" width={1560}>Casco clase E (hasta 20 kV) · calzado dieléctrico · para 480/600 VAC en tableros: guantes Clase 0 o 1. <b style={{ color: TL9.red }}>&gt; 40 cal/cm²: no trabajar.</b></CapM9>
    </SceneM9>
  );
}

// ── Primeros auxilios ante electrocución ──────────────────────────────────────
function S_FirstAid({ start, dur }) {
  const t = useTime(); const s = start;
  const steps = [
    ['Desconectar primero', 'Abrir el breaker o separar con material NO conductor. Nunca con las manos.'],
    ['Llamar a emergencias', 'Activar emergencia de planta + 911. Dar ubicación y estado.'],
    ['Evaluar', 'Respuesta y respiración. No mover si hay sospecha espinal.'],
    ['RCP si no respira', '30 compresiones + 2 ventilaciones · 100–120/min.'],
    ['DEA', 'La electrocución causa fibrilación. El DEA da instrucciones de voz.'],
  ];
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Accidente eléctrico · primeros auxilios" y="8%" color={TL9.red} />
      <CapM9 start={s + 0.6} dur={2.2} size={42} weight={600} y="15%" width={1620}><span style={{ color: TL9.red }}>NO toques</span> a la víctima si sigue en contacto con la fuente.</CapM9>
      <div style={{ position: 'absolute', left: '50%', top: 290, transform: 'translateX(-50%)', width: 1320 }}>
        {steps.map((x, i) => {
          const ap = pop9(t, s + 1.3 + i * 0.32, 0.5, 14);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 22, marginBottom: 12, background: TL9.paper, border: `1px solid ${i === 0 ? TL9.red : TL9.lineS}`, borderRadius: 11, padding: '16px 26px' }}>
              <span style={{ width: 44, height: 44, borderRadius: 10, background: i === 0 ? TL9.redWash : TL9.ylwWash, border: `1.5px solid ${i === 0 ? TL9.red : TL9.ylw}`, color: i === 0 ? TL9.red : TL9.ylw, fontFamily: DISP9, fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ fontFamily: DISP9, fontSize: 22, fontWeight: 700, color: TL9.ink, minWidth: 320 }}>{x[0]}</span>
              <span style={{ fontFamily: DISP9, fontSize: 17.5, color: TL9.mut, lineHeight: 1.3 }}>{x[1]}</span>
            </div>
          );
        })}
      </div>
      <CapM9 start={s + 4.0} dur={dur - 4.3} size={22} weight={500} color={TL9.ylwLt} y="92%" width={1560}>El error fatal más común: agarrar a la víctima y recibir la misma descarga → dos víctimas en vez de una.</CapM9>
    </SceneM9>
  );
}

// ── Ergonomía ─────────────────────────────────────────────────────────────────
function S_Ergonomics({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Ergonomía · lesiones que no matan pero incapacitan" y="9%" color={TL9.grn} />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>La técnica correcta de levantamiento.</CapM9>
      <InfoCardM9 x={170} y={300} w={500} h={250} accent={TL9.org} title="Posturas forzadas" sub="Brazos sobre el hombro, agachado en confinado, cuello inclinado por horas." appear={s + 1.3} t={t} />
      <InfoCardM9 x={710} y={300} w={500} h={250} accent={TL9.red} title="Esfuerzo excesivo" sub="Levantar > 25 kg sin ayuda mecánica o aplicar fuerza a conexiones apretadas." appear={s + 1.7} t={t} />
      <InfoCardM9 x={1250} y={300} w={500} h={250} accent={TL9.ylw} title="Movimientos repetitivos" sub="Cientos de terminales con destornillador o la pistola de impacto todo el día." appear={s + 2.1} t={t} />
      <div style={{ position: 'absolute', left: '50%', top: 600, transform: 'translateX(-50%)', width: 1480 }}>
        {(() => { const ap = pop9(t, s + 2.8, 0.55, 18); return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 22, background: TL9.grnWash, border: `1px solid ${TL9.grn}`, borderRadius: 12, padding: '22px 28px' }}>
            <span style={{ fontFamily: MONO9, fontSize: 14, letterSpacing: '0.14em', color: TL9.grn, fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Al levantar</span>
            <span style={{ fontFamily: DISP9, fontSize: 19.5, color: TL9.ink, lineHeight: 1.4 }}>Dobla las <b style={{ color: TL9.grn }}>rodillas</b>, no la espalda · carga pegada al cuerpo · gira con los pies, no con la cintura. Máx. sin ayuda: 25 kg (h) / 15 kg (m).</span>
          </div>
        ); })()}
      </div>
    </SceneM9>
  );
}

const SCENES_M9C4 = [
  { C: (p) => <TitleCardM9 {...p} claseNo={4} seccion="EPP y auxilios" title="EPP, primeros auxilios y ergonomía" dudur="16–18 min" objetivo="Conocer el EPP para trabajo industrial y eléctrico, el protocolo de primeros auxilios ante accidente eléctrico y los principios de ergonomía para prevenir lesiones." />, dur: 7, label: 'Apertura' },
  { C: S_Hierarchy, dur: 13, label: 'Jerarquía de controles' },
  { C: S_PPE, dur: 14, label: 'EPP eléctrico' },
  { C: S_FirstAid, dur: 14, label: 'Primeros auxilios' },
  { C: S_Ergonomics, dur: 13, label: 'Ergonomía' },
  { C: (p) => <ClosingM9 {...p} line="El EPP es lo último que te protege cuando todo lo demás falló. Y saber qué hacer en los primeros minutos de un accidente eléctrico puede ser la diferencia entre una vida y dos muertes." activity="Evalúa ergonómicamente la instalación de un tablero de PLC a 2.1 m de altura: identifica todos los riesgos ergonómicos, propón las medidas de control y especifica el EPP completo para la tarea." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M9C4 = SCENES_M9C4;
