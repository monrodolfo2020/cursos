// m6c3.jsx — "Entradas y salidas digitales: conexión y cableado"
// After m6-lib.jsx. Exports SCENES_M6C3.

// ── El camino de una entrada digital ──────────────────────────────────────────
function S_InputCycle({ start, dur }) {
  const t = useTime(); const s = start;
  const cy = 480;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="El camino de una señal de entrada" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="20%" width={1560}>Del campo al bit — con <span style={{ color: TL6.cyan }}>aislamiento galvánico</span> en medio.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <BlockM6 x={120} y={cy} w={210} h={96} label="Sensor" sub="24 VDC / contacto" accent={TL6.grn} t={t} appear={s + 1.2} />
        <ArrowM6 x1={330} y1={cy + 48} x2={440} y2={cy + 48} start={s + 1.5} t={t} color={TL6.grn} live />
        <BlockM6 x={440} y={cy} w={230} h={96} label="Optoacoplador" sub="aísla campo ↔ PLC" accent={TL6.cyan} t={t} appear={s + 1.7} />
        <ArrowM6 x1={670} y1={cy + 48} x2={780} y2={cy + 48} start={s + 2.0} t={t} color={TL6.cyan} label="bit 0/1" />
        <BlockM6 x={780} y={cy} w={210} h={96} label="PII" sub="imagen de entradas" accent={TL6.cyanLt} t={t} appear={s + 2.2} />
        <ArrowM6 x1={990} y1={cy + 48} x2={1100} y2={cy + 48} start={s + 2.5} t={t} color={TL6.mut} />
        <BlockM6 x={1100} y={cy} w={230} h={96} label="Ladder" sub="contacto NA / NC" accent={TL6.amber} t={t} appear={s + 2.7} led />
      </svg>
      <CapM6 start={s + 3.8} dur={dur - 4.1} size={25} weight={500} color={TL6.mut} y="80%" width={1560}>El optoacoplador frena ruido y diferencias de potencial del campo, y su filtro (0.1–20 ms) elimina rebotes de contactos.</CapM6>
    </SceneM6>
  );
}

// ── El dilema NPN vs PNP / Sinking vs Sourcing ────────────────────────────────
function S_NPNvPNP({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="La confusión más cara de la industria" y="9%" color={TL6.amber} />
      <CapM6 start={s + 0.6} dur={2.2} size={50} weight={700} y="18%" width={1500}>NPN vs PNP — Sinking vs Sourcing.</CapM6>
      <InfoCardM6 x={210} y={360} w={620} h={300} accent={TL6.cyan} title="Sensor NPN · Sinking" sub="Al activarse conecta la carga al negativo (0 V): “absorbe” la corriente. Necesita pull-up a +24 V." appear={s + 1.2} t={t} />
      <InfoCardM6 x={1090} y={360} w={620} h={300} accent={TL6.grn} title="Sensor PNP · Sourcing" sub="Al activarse entrega +24 V a la entrada: “suministra” la corriente. Lo más común en Europa y Latinoamérica." appear={s + 1.7} t={t} />
      <div style={{ position: 'absolute', left: '50%', top: '74%', transform: 'translateX(-50%)', textAlign: 'center', opacity: clamp((t - (s + 3.0)) / 0.6, 0, 1) }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, padding: '18px 30px', borderRadius: 12, border: `1px solid ${TL6.grn}`, background: TL6.grnWash }}>
          <span style={{ fontFamily: MONO6, fontSize: 14, letterSpacing: '0.2em', color: TL6.grn, fontWeight: 700 }}>REGLA</span>
          <span style={{ fontFamily: DISP6, fontSize: 26, color: TL6.ink }}>Siemens S7-1200/1500 tiene entradas <b style={{ color: TL6.grn }}>sinking → aceptan sensores PNP</b>.</span>
        </div>
      </div>
    </SceneM6>
  );
}

// ── Tipos de salida digital ───────────────────────────────────────────────────
function S_Outputs({ start, dur }) {
  const t = useTime(); const s = start;
  const outs = [
    { k: 'Transistor PNP', pro: 'Rápido (µs), silencioso, larga vida.', con: 'Solo DC 24 V · máx 0.5 A.', use: 'solenoides 24 V, pilotos', a: TL6.cyan },
    { k: 'Relé', pro: 'Universal AC/DC, mayor corriente (2–10 A).', con: 'Lento (10–20 ms), vida limitada.', use: 'cargas 220 VAC', a: TL6.amber },
    { k: 'Triac', pro: 'Cargas AC sin partes mecánicas.', con: 'Solo AC, no maneja DC.', use: 'cargas AC rápidas', a: TL6.grn },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Tipos de salida digital" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={50} weight={700} y="20%" width={1500}>Cómo el PLC energiza una carga.</CapM6>
      {outs.map((o, i) => (
        <div key={i} style={{ position: 'absolute', left: 230 + i * 500, top: 400, width: 460 }}>
          {(() => { const ap = pop6(t, s + 1.4 + i * 0.45, 0.55, 22); return (
            <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', borderRadius: 12, border: `1px solid ${TL6.lineS}`, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, boxShadow: TL6.shadow, padding: '26px 26px', height: 330, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: o.a, borderRadius: 3 }} />
              <div style={{ fontFamily: DISP6, fontSize: 28, fontWeight: 700, color: TL6.ink }}>{o.k}</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><span style={{ color: TL6.grn, fontFamily: MONO6, fontSize: 18, fontWeight: 700 }}>+</span><span style={{ fontFamily: DISP6, fontSize: 19, color: TL6.mut, lineHeight: 1.35 }}>{o.pro}</span></div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><span style={{ color: TL6.red, fontFamily: MONO6, fontSize: 18, fontWeight: 700 }}>−</span><span style={{ fontFamily: DISP6, fontSize: 19, color: TL6.mut, lineHeight: 1.35 }}>{o.con}</span></div>
              <div style={{ marginTop: 'auto', fontFamily: MONO6, fontSize: 15, color: o.a, letterSpacing: '0.04em' }}>→ {o.use}</div>
            </div>
          ); })()}
        </div>
      ))}
      <CapM6 start={s + 4.6} dur={dur - 4.9} size={24} weight={500} color={TL6.mut} y="88%" width={1560}>Si la carga pide más corriente, la salida activa un <b style={{ color: TL6.ink }}>relé de interfaz</b> que maneja la carga final.</CapM6>
    </SceneM6>
  );
}

// ── Errores de cableado comunes ───────────────────────────────────────────────
function S_Errors({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    ['Sensor NPN en entrada sourcing', 'Entrada siempre activa', 'Cambiar a sensor PNP'],
    ['Polaridad invertida (3 hilos)', 'El sensor nunca responde', 'Corregir marrón ↔ azul'],
    ['Carga AC en salida transistor', 'La salida se daña', 'Usar relé de interfaz'],
    ['Común M del DI sin 0 V', 'Entradas flotantes erráticas', 'Conectar M al 0 V de la fuente'],
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Errores de cableado más comunes" y="12%" color={TL6.red} />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="22%" width={1500}>Reconócelos y ahórrate horas de diagnóstico.</CapM6>
      <div style={{ position: 'absolute', left: '50%', top: '56%', transform: 'translate(-50%,-50%)', width: 1560 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.1fr 1.1fr', gap: 0, borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL6.lineS}`, boxShadow: TL6.shadow }}>
          {['Error', 'Síntoma', 'Solución'].map((h, i) => (
            <div key={i} style={{ background: TL6.paper2, padding: '16px 24px', fontFamily: MONO6, fontSize: 14, letterSpacing: '0.16em', textTransform: 'uppercase', color: i === 2 ? TL6.grn : TL6.cyan, fontWeight: 700, borderBottom: `1px solid ${TL6.lineS}` }}>{h}</div>
          ))}
          {rows.map((r, ri) => r.map((cell, ci) => {
            const ap = clamp((t - (s + 1.6 + ri * 0.45)) / 0.5, 0, 1);
            return (
              <div key={ri + '-' + ci} style={{ opacity: ap, background: ri % 2 ? TL6.bg2 : TL6.paper, padding: '18px 24px', fontFamily: ci === 0 ? MONO6 : DISP6, fontSize: ci === 0 ? 17 : 19, fontWeight: ci === 2 ? 600 : 400, color: ci === 0 ? TL6.ink : (ci === 2 ? TL6.grn : TL6.mut), borderBottom: ri < rows.length - 1 ? `1px solid ${TL6.line}` : 'none', lineHeight: 1.3 }}>{cell}</div>
            );
          }))}
        </div>
      </div>
    </SceneM6>
  );
}

const SCENES_M6C3 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={3} title="Entradas y salidas digitales" dudur="18–20 min" objetivo="Conectar sensores y actuadores al PLC, entender el dilema Sinking/Sourcing y resolver los errores de cableado más comunes." />, dur: 7, label: 'Apertura' },
  { C: S_InputCycle, dur: 13, label: 'El camino de la entrada' },
  { C: S_NPNvPNP, dur: 14, label: 'NPN vs PNP' },
  { C: S_Outputs, dur: 14, label: 'Tipos de salida' },
  { C: S_Errors, dur: 13, label: 'Errores de cableado' },
  { C: (p) => <ClosingM6 {...p} line="El optoacoplador protege; el tipo de sensor (PNP/NPN) define el cableado; el tipo de salida define qué carga puedes mover." activity="Sobre un tablero con 12 DI y 8 DO mezclando sensores PNP, contactos secos y cargas de 24 V y 220 V: identifica los módulos, completa 5 conexiones y corrige 3 errores deliberados." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C3 = SCENES_M6C3;
