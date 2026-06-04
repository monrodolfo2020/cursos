// m6c8.jsx — "Ladder avanzado: temporizadores y contadores"
// After m6-lib.jsx. Exports SCENES_M6C8.

function S_Why({ start, dur }) {
  const t = useTime(); const s = start;
  const ex = [
    'Esperar 30 s tras arrancar la bomba antes de abrir la descarga.',
    'Alarma solo si la presión es alta por más de 5 s (no un pico).',
    'Dosificar exactamente 1.5 s al detectar el envase.',
    'Avisar mantenimiento tras 500 h acumuladas de bomba.',
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="El tiempo es una dimensión del proceso" y="12%" />
      <CapM6 start={s + 0.6} dur={2.2} size={50} weight={700} y="23%" width={1500}>Sin temporizadores no hay secuencias.</CapM6>
      {ex.map((e, i) => (
        <InfoCardM6 key={i} x={210 + (i % 2) * 760} y={400 + Math.floor(i / 2) * 175} w={700} h={150} no={i + 1} accent={i % 2 ? TL6.amber : TL6.cyan} title="" sub={e} appear={s + 1.4 + i * 0.4} t={t} />
      ))}
    </SceneM6>
  );
}

function S_Timers({ start, dur }) {
  const t = useTime(); const s = start;
  const timers = [
    { k: 'TON', d: 'On-Delay', sub: 'Q se activa tras IN activo durante PT. Se resetea si IN cae antes.', a: TL6.grn },
    { k: 'TOF', d: 'Off-Delay', sub: 'Q activa al instante; permanece PT segundos tras caer IN.', a: TL6.cyan },
    { k: 'TP', d: 'Pulse', sub: 'Flanco en IN → pulso de duración fija PT, pase lo que pase.', a: TL6.amber },
    { k: 'TONR', d: 'Retentive', sub: 'Acumula tiempo aunque IN caiga; solo R lo resetea.', a: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Los cuatro temporizadores IEC" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="20%" width={1500}>TON, TOF, TP y TONR.</CapM6>
      {timers.map((tm, i) => (
        <div key={i} style={{ position: 'absolute', left: 200 + i * 388, top: 410, width: 350 }}>
          {(() => { const ap = pop6(t, s + 1.4 + i * 0.4, 0.5, 20); return (
            <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', borderRadius: 12, border: `1px solid ${TL6.lineS}`, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, boxShadow: TL6.shadow, padding: '26px 24px', height: 290, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: tm.a, borderRadius: 3 }} />
              <div style={{ fontFamily: MONO6, fontSize: 30, fontWeight: 700, color: tm.a }}>{tm.k}</div>
              <div style={{ fontFamily: DISP6, fontSize: 21, fontWeight: 600, color: TL6.ink }}>{tm.d}</div>
              <div style={{ fontFamily: DISP6, fontSize: 18, color: TL6.mut, lineHeight: 1.4 }}>{tm.sub}</div>
            </div>
          ); })()}
        </div>
      ))}
    </SceneM6>
  );
}

// ── Secuencia de arranque seguro (rungs que se energizan en orden) ────────────
function S_Sequence({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  // fases: motor on @1.5, t1(15s sim) done @3.8 → valve, t2 done @5.8 → control
  const motor = lt > 1.5;
  const valve = lt > 4.0;
  const ctrl = lt > 6.0;
  const x = 380, w = 980;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Secuencia de arranque seguro" y="9%" color={TL6.grn} />
      <CapM6 start={s + 0.6} dur={2.0} size={46} weight={600} y="17%" width={1560}>Motor → <span style={{ color: TL6.grn }}>15 s</span> → válvula → <span style={{ color: TL6.grn }}>5 s</span> → control.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <RungM6 x={x} y={360} w={w} t={t} appear={s + 1.2} rung={1} energized={motor}
          contacts={[{ x: x + 160, type: 'NO', label: 'Orden marcha', closed: motor }, { x: x + 420, type: 'NC', label: 'Paro', closed: true }]}
          coil={{ x: x + w - 60, label: 'Q0.0 Motor', on: motor }} />
        <RungM6 x={x} y={470} w={w} t={t} appear={s + 1.6} rung={2} energized={motor}
          contacts={[{ x: x + 200, type: 'NO', label: 'Q0.0', closed: motor }]}
          coil={{ x: x + w - 60, label: 'TON  PT 15s', on: valve }} />
        <RungM6 x={x} y={580} w={w} t={t} appear={s + 2.0} rung={3} energized={valve}
          contacts={[{ x: x + 200, type: 'NO', label: 'T1.Q', closed: valve }]}
          coil={{ x: x + w - 60, label: 'Q0.1 Válvula', on: valve }} />
        <RungM6 x={x} y={690} w={w} t={t} appear={s + 2.4} rung={4} energized={ctrl}
          contacts={[{ x: x + 200, type: 'NO', label: 'T2.Q', closed: ctrl }]}
          coil={{ x: x + w - 60, label: 'M0.0 Control', on: ctrl }} />
        {/* power rails */}
        <line x1={x - 50} y1={340} x2={x - 50} y2={730} stroke={TL6.lineS} strokeWidth="3" opacity={clamp((t - (s + 1)) / 0.5, 0, 1)} />
        <line x1={x + w + 50} y1={340} x2={x + w + 50} y2={730} stroke={TL6.lineS} strokeWidth="3" opacity={clamp((t - (s + 1)) / 0.5, 0, 1)} />
      </svg>
      <CapM6 start={s + 7.4} dur={dur - 7.7} size={25} weight={500} color={TL6.mut} y="88%" width={1560}>Cada bobina energizada (verde) habilita el temporizador del siguiente paso — así nace una secuencia.</CapM6>
    </SceneM6>
  );
}

function S_Counters({ start, dur }) {
  const t = useTime(); const s = start;
  const cs = [
    { k: 'CTU', d: 'Count Up', sub: 'Cada flanco en CU suma 1. Q=1 cuando CV ≥ PV.', ex: 'contar 1000 botellas', a: TL6.grn },
    { k: 'CTD', d: 'Count Down', sub: 'Carga PV y resta 1 por flanco. Q=1 cuando CV ≤ 0.', ex: 'piezas restantes', a: TL6.cyan },
    { k: 'CTUD', d: 'Up / Down', sub: 'Suma y resta. QU al tope, QD en cero.', ex: 'stock de almacén', a: TL6.amber },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Contadores" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="21%" width={1500}>Contar eventos: piezas, ciclos, lotes.</CapM6>
      {cs.map((c, i) => (
        <div key={i} style={{ position: 'absolute', left: 230 + i * 500, top: 410, width: 460 }}>
          {(() => { const ap = pop6(t, s + 1.4 + i * 0.45, 0.5, 22); return (
            <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', borderRadius: 12, border: `1px solid ${TL6.lineS}`, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, boxShadow: TL6.shadow, padding: '26px 26px', height: 300, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: c.a, borderRadius: 3 }} />
              <div style={{ fontFamily: MONO6, fontSize: 30, fontWeight: 700, color: c.a }}>{c.k}</div>
              <div style={{ fontFamily: DISP6, fontSize: 22, fontWeight: 600, color: TL6.ink }}>{c.d}</div>
              <div style={{ fontFamily: DISP6, fontSize: 18, color: TL6.mut, lineHeight: 1.4 }}>{c.sub}</div>
              <div style={{ marginTop: 'auto', fontFamily: MONO6, fontSize: 15, color: c.a }}>→ {c.ex}</div>
            </div>
          ); })()}
        </div>
      ))}
    </SceneM6>
  );
}

const SCENES_M6C8 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={8} seccion="Programación del PLC" title="Ladder avanzado: timers y contadores" dudur="20–22 min" objetivo="Dominar los bloques de temporización y contaje del PLC para construir secuencias y conteos industriales reales." />, dur: 7, label: 'Apertura' },
  { C: S_Why, dur: 12, label: '¿Por qué temporizadores?' },
  { C: S_Timers, dur: 13, label: 'TON · TOF · TP · TONR' },
  { C: S_Sequence, dur: 15, label: 'Secuencia de arranque' },
  { C: S_Counters, dur: 13, label: 'CTU · CTD · CTUD' },
  { C: (p) => <ClosingM6 {...p} line="Los temporizadores miden el tiempo del proceso; los contadores cuentan sus eventos. Juntos convierten lógica en secuencia." activity="Programa el arranque secuencial de la planta (bomba → 20 s → válvula → 10 s → agitador → PID) y un contador de horas de la bomba; simula todo en PLCSIM." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C8 = SCENES_M6C8;
