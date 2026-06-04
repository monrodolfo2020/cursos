// m6c7.jsx — "Lenguajes IEC 61131-3: Ladder, FBD, ST, SFC"
// After m6-lib.jsx. Exports SCENES_M6C7.

function S_Norm({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="El estándar mundial" y="13%" />
      <CapM6 start={s + 0.6} dur={2.4} size={50} weight={700} y="26%" width={1500}>IEC 61131-3 — cinco lenguajes para programar cualquier PLC.</CapM6>
      <StatM6 x={290} y={540} value="1993" label="Publicada · rev. 2013" accent={TL6.cyan} appear={s + 1.4} t={t} align="center" />
      <StatM6 x={760} y={540} value="5" unit="lenguajes" label="LD · FBD · ST · SFC · IL" accent={TL6.grn} appear={s + 1.8} t={t} align="center" />
      <StatM6 x={1240} y={540} value="parcial" label="Portabilidad real entre marcas" accent={TL6.amber} appear={s + 2.2} t={t} align="center" />
      <CapM6 start={s + 3.4} dur={dur - 3.7} size={25} weight={500} color={TL6.mut} y="82%" width={1500}>TIA Portal implementa los cinco y permite <b style={{ color: TL6.ink }}>mezclarlos</b> en un mismo proyecto.</CapM6>
    </SceneM6>
  );
}

function S_Five({ start, dur }) {
  const t = useTime(); const s = start;
  const langs = [
    { k: 'LD · Ladder', d: 'Circuitos de relés. Visual, ideal para enclavamientos y lógica discreta.', a: TL6.grn },
    { k: 'FBD · Bloques', d: 'Bloques conectados. Excelente para lazos y flujo de señales analógicas.', a: TL6.cyan },
    { k: 'ST · Texto', d: 'Tipo Pascal/C. El rey de cálculos, escalado y algoritmos complejos.', a: TL6.amber },
    { k: 'SFC · Grafcet', d: 'Pasos y transiciones. Perfecto para procesos batch y secuenciales.', a: TL6.cyanLt },
    { k: 'IL · Lista', d: 'Mnemónicos de bajo nivel (STL). Retirado en 2013, vive en equipos legacy.', a: TL6.dim },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Los cinco lenguajes" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="20%" width={1500}>Cada uno brilla en una tarea distinta.</CapM6>
      {langs.map((l, i) => (
        <div key={i} style={{ position: 'absolute', left: 150 + i * 330, top: 410, width: 300 }}>
          {(() => { const ap = pop6(t, s + 1.4 + i * 0.34, 0.5, 20); return (
            <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', borderRadius: 12, border: `1px solid ${TL6.lineS}`, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, boxShadow: TL6.shadow, padding: '24px 22px', height: 290, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 20, bottom: 20, width: 4, background: l.a, borderRadius: 3 }} />
              <div style={{ fontFamily: MONO6, fontSize: 22, fontWeight: 700, color: l.a }}>{l.k}</div>
              <div style={{ fontFamily: DISP6, fontSize: 19, color: TL6.mut, lineHeight: 1.4 }}>{l.d}</div>
            </div>
          ); })()}
        </div>
      ))}
    </SceneM6>
  );
}

function S_When({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    ['Enclavamientos y arranque/paro', 'Ladder (LD)'],
    ['Lazo PID y señales analógicas', 'FBD o ST'],
    ['Escalado y cálculos matemáticos', 'ST'],
    ['Secuencias batch por etapas', 'SFC'],
    ['Comunicaciones y strings', 'ST'],
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Guía práctica · cuándo usar cuál" y="13%" />
      <CapM6 start={s + 0.6} dur={2.2} size={46} weight={600} y="24%" width={1500}>La regla profesional: <span style={{ color: TL6.cyan }}>usa el lenguaje correcto para cada tarea</span>.</CapM6>
      <div style={{ position: 'absolute', left: '50%', top: '58%', transform: 'translate(-50%,-50%)', width: 1200 }}>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL6.lineS}`, boxShadow: TL6.shadow }}>
          {rows.map((r, i) => {
            const ap = clamp((t - (s + 1.6 + i * 0.4)) / 0.5, 0, 1);
            return (
              <div key={i} style={{ opacity: ap, display: 'grid', gridTemplateColumns: '1.6fr 1fr', background: i % 2 ? TL6.bg2 : TL6.paper, borderBottom: i < rows.length - 1 ? `1px solid ${TL6.line}` : 'none' }}>
                <div style={{ padding: '18px 28px', fontFamily: DISP6, fontSize: 21, color: TL6.ink }}>{r[0]}</div>
                <div style={{ padding: '18px 28px', fontFamily: MONO6, fontSize: 19, fontWeight: 600, color: TL6.grn, borderLeft: `1px solid ${TL6.line}` }}>{r[1]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneM6>
  );
}

function S_Structure({ start, dur }) {
  const t = useTime(); const s = start;
  const blocks = [
    { k: 'OB', d: 'Organization Block', sub: 'punto de entrada (OB1, OB30…)', a: TL6.cyan },
    { k: 'FB', d: 'Function Block', sub: 'con memoria propia → como una clase', a: TL6.grn },
    { k: 'FC', d: 'Function', sub: 'sin memoria → función estática', a: TL6.amber },
    { k: 'DB', d: 'Data Block', sub: 'datos → como la estructura de un objeto', a: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Los bloques de un programa TIA" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="21%" width={1500}>OB, FB, FC y DB — piensa orientado a objetos.</CapM6>
      {blocks.map((b, i) => (
        <InfoCardM6 key={i} x={210 + i * 388} y={420} w={350} h={290} title={b.k} sub={`${b.d} — ${b.sub}`} accent={b.a} appear={s + 1.4 + i * 0.4} t={t} />
      ))}
    </SceneM6>
  );
}

const SCENES_M6C7 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={7} seccion="Programación del PLC" title="Lenguajes IEC 61131-3" dudur="18–20 min" objetivo="Conocer los 5 lenguajes del estándar, sus fortalezas y en qué tipo de tarea conviene cada uno." />, dur: 7, label: 'Apertura' },
  { C: S_Norm, dur: 11, label: 'La norma IEC 61131-3' },
  { C: S_Five, dur: 14, label: 'Los cinco lenguajes' },
  { C: S_When, dur: 13, label: 'Cuándo usar cuál' },
  { C: S_Structure, dur: 12, label: 'OB · FB · FC · DB' },
  { C: (p) => <ClosingM6 {...p} line="No hay un lenguaje mejor: hay uno correcto para cada tarea. El profesional los combina dentro del mismo proyecto." activity="Toma un control de llenado escrito todo en Ladder: marca qué pasarías a ST, qué a SFC, y reescribe en ST un fragmento de escalado." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C7 = SCENES_M6C7;
