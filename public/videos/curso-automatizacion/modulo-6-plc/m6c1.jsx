// m6c1.jsx — "¿Qué es un PLC? Historia, arquitectura y tipos"
// After m6-lib.jsx. Exports SCENES_M6C1.

// ── Escena: el problema que resolvió el PLC ───────────────────────────────────
function S_Problem({ start, dur }) {
  const t = useTime(); const s = start;
  const probs = [
    { k: 'Rigidez', d: 'Cambiar el proceso exigía recablear el panel físicamente.' },
    { k: 'Tamaño', d: 'Cientos o miles de relés y kilómetros de cable.' },
    { k: 'Mantenimiento', d: 'Hallar una falla entre cientos de relés: horas o días.' },
    { k: 'Confiabilidad', d: 'Los relés mecánicos se desgastan y fallan.' },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Antes del PLC · años 60" y="11%" color={TL6.red} />
      <CapM6 start={s + 0.6} dur={2.4} size={50} weight={600} y="21%" width={1560}>El control se hacía con <span style={{ color: TL6.red }}>paneles de relés electromagnéticos</span>.</CapM6>
      {probs.map((p, i) => (
        <InfoCardM6 key={i} x={210 + i * 388} y={430} w={350} h={300} no={i + 1} accent={TL6.red} title={p.k} sub={p.d} appear={s + 1.4 + i * 0.4} t={t} />
      ))}
      <CapM6 start={s + 4.6} dur={dur - 4.9} size={28} weight={500} color={TL6.mut} y="82%" width={1500}>Y el costo de instalación y mantenimiento era altísimo.</CapM6>
    </SceneM6>
  );
}

// ── Escena: el nacimiento del PLC ─────────────────────────────────────────────
function S_Birth({ start, dur }) {
  const t = useTime(); const s = start;
  const beats = [
    { y: 380, yr: '1968', tx: 'General Motors convoca un concurso para reemplazar sus paneles de relés.', a: TL6.cyan },
    { y: 540, yr: '1969', tx: 'Bedford Associates (hoy Modicon) entrega el primer PLC: el Modicon 084.', a: TL6.grn },
    { y: 700, yr: '—', tx: 'Dick Morley queda en la historia como el padre del PLC.', a: TL6.amber },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="El nacimiento del PLC" y="9%" />
      <CapM6 start={s + 0.6} dur={2.2} size={52} weight={700} y="19%" width={1500}>Una idea que cambió la industria para siempre.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={300} y1={360} x2={300} y2={740} stroke={TL6.lineS} strokeWidth="2" opacity={clamp((t - (s + 1)) / 0.6, 0, 1)} />
        {beats.map((b, i) => {
          const ap = clamp((t - (s + 1.4 + i * 0.7)) / 0.6, 0, 1);
          return (
            <g key={i} opacity={ap} transform={`translate(${(1 - ap) * -20} 0)`}>
              <circle cx={300} cy={b.y} r="9" fill={b.a} />
              <circle cx={300} cy={b.y} r="18" fill="none" stroke={b.a} strokeWidth="1.5" opacity="0.4" />
              <text x={250} y={b.y + 8} fill={b.a} fontFamily={MONO6} fontSize="30" fontWeight="700" textAnchor="end">{b.yr}</text>
              <text x={350} y={b.y + 8} fill={TL6.ink} fontFamily={DISP6} fontSize="27" fontWeight="500">{b.tx}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ position: 'absolute', left: '50%', top: '86%', transform: 'translateX(-50%)', textAlign: 'center', opacity: clamp((t - (s + 4.6)) / 0.6, 0, 1) }}>
        <div style={{ fontFamily: DISP6, fontSize: 27, color: TL6.mut, lineHeight: 1.4, maxWidth: 1360 }}>GM lo quería <b style={{ color: TL6.ink }}>programable por electricistas</b> — por eso nació el lenguaje <b style={{ color: TL6.grn }}>Ladder</b>, que imitaba sus diagramas de relés.</div>
      </div>
    </SceneM6>
  );
}

// ── Escena: arquitectura interna ──────────────────────────────────────────────
function S_Arch({ start, dur }) {
  const t = useTime(); const s = start;
  const cx = 860, cy = 470;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Arquitectura interna del PLC" y="8%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="16%" width={1560}>Una computadora industrial: <span style={{ color: TL6.cyan }}>lee, decide, actúa</span> — en ciclos.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* CPU center */}
        <BlockM6 x={cx - 130} y={cy - 70} w={260} h={140} label="CPU" sub="ejecuta el programa" accent={TL6.cyan} t={t} appear={s + 1.2} led />
        <text x={cx} y={cy + 118} fill={TL6.dim} fontFamily={MONO6} fontSize="15" textAnchor="middle" opacity={clamp((t - (s + 1.6)) / 0.5, 0, 1)}>+ memoria · scan 1–50 ms</text>
        {/* field inputs (left) */}
        <BlockM6 x={cx - 560} y={cy - 150} w={250} h={88} label="Entradas DI/AI" sub="sensores · 4–20 mA" accent={TL6.grn} t={t} appear={s + 2.0} />
        <ArrowM6 x1={cx - 310} y1={cy - 106} x2={cx - 130} y2={cy - 30} start={s + 2.4} t={t} color={TL6.grn} live />
        {/* outputs (right) */}
        <BlockM6 x={cx + 310} y={cy - 150} w={250} h={88} label="Salidas DO/AO" sub="actuadores · válvulas" accent={TL6.amber} t={t} appear={s + 2.6} />
        <ArrowM6 x1={cx + 130} y1={cy - 30} x2={cx + 310} y2={cy - 106} start={s + 3.0} t={t} color={TL6.amber} live />
        {/* power supply bottom */}
        <BlockM6 x={cx - 280} y={cy + 150} w={250} h={84} label="Fuente" sub="110/220 VAC → 24 VDC" accent={TL6.red} t={t} appear={s + 3.4} />
        <ArrowM6 x1={cx - 155} y1={cy + 150} x2={cx - 90} y2={cy + 70} start={s + 3.7} t={t} color={TL6.dim} />
        {/* comms */}
        <BlockM6 x={cx + 30} y={cy + 150} w={250} h={84} label="Comunicación" sub="Profinet · Modbus" accent={TL6.cyanD} t={t} appear={s + 3.8} />
        <ArrowM6 x1={cx + 155} y1={cy + 150} x2={cx + 90} y2={cy + 70} start={s + 4.1} t={t} color={TL6.dim} />
      </svg>
      <CapM6 start={s + 5.2} dur={dur - 5.5} size={26} weight={500} color={TL6.mut} y="90%" width={1560}>Todo se monta sobre un <b style={{ color: TL6.ink }}>rack</b> cuyo backplane lleva datos y alimentación entre módulos.</CapM6>
    </SceneM6>
  );
}

// ── Escena: tipos de PLC ──────────────────────────────────────────────────────
function S_Types({ start, dur }) {
  const t = useTime(); const s = start;
  const types = [
    { k: 'Nano / Micro', io: '8–40 E/S', ej: 'LOGO!, Zelio, Micro800', cost: '$100–500', a: TL6.grn },
    { k: 'Compacto', io: '14–100 E/S', ej: 'S7-1200, CompactLogix', cost: '$500–3k', a: TL6.cyan },
    { k: 'Modular (rack)', io: 'E/S ilimitada', ej: 'S7-1500, ControlLogix', cost: '$3k–50k+', a: TL6.amber },
    { k: 'Safety PLC', io: 'SIL 2 / SIL 3', ej: 'S7-1500F, GuardLogix', cost: 'redundante', a: TL6.red },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Tipos de PLC según capacidad" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={50} weight={700} y="20%" width={1500}>Del LOGO! de tablero al rack de planta.</CapM6>
      {types.map((tp, i) => (
        <div key={i} style={{ position: 'absolute', left: 200 + i * 388, top: 410, width: 350 }}>
          {(() => { const ap = pop6(t, s + 1.4 + i * 0.4, 0.55, 22); return (
            <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', borderRadius: 12, border: `1px solid ${TL6.lineS}`, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, boxShadow: TL6.shadow, padding: '26px 24px', height: 320, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: tp.a, borderRadius: 3 }} />
              <div style={{ fontFamily: DISP6, fontSize: 28, fontWeight: 700, color: TL6.ink }}>{tp.k}</div>
              <div style={{ fontFamily: MONO6, fontSize: 26, fontWeight: 600, color: tp.a }}>{tp.io}</div>
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontFamily: DISP6, fontSize: 17, color: TL6.mut, lineHeight: 1.35 }}>{tp.ej}</div>
                <div style={{ fontFamily: MONO6, fontSize: 15, color: TL6.dim, letterSpacing: '0.04em' }}>{tp.cost} USD</div>
              </div>
            </div>
          ); })()}
        </div>
      ))}
      <CapM6 start={s + 4.4} dur={dur - 4.7} size={25} weight={500} color={TL6.mut} y="88%" width={1500}>Este curso usa <b style={{ color: TL6.cyan }}>Siemens S7-1200/1500 + TIA Portal</b> — todo simulable, sin hardware.</CapM6>
    </SceneM6>
  );
}

const SCENES_M6C1 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={1} title="¿Qué es un PLC?" dudur="16–18 min" objetivo="Por qué fue inventado, cómo está organizado por dentro y qué tipos existen para elegir el adecuado." />, dur: 7, label: 'Apertura' },
  { C: S_Problem, dur: 13, label: 'El problema de los relés' },
  { C: S_Birth, dur: 13, label: 'El nacimiento · 1968–69' },
  { C: S_Arch, dur: 16, label: 'Arquitectura interna' },
  { C: S_Types, dur: 13, label: 'Tipos de PLC' },
  { C: (p) => <ClosingM6 {...p} line="El PLC es una computadora robusta que lee sensores, ejecuta un programa y manda a los actuadores — de forma cíclica y determinista." activity="Compara 3 PLCs de distintos fabricantes para una planta de tratamiento de agua (45 DI, 12 AI, 28 DO, 6 AO, Modbus y Profinet) y justifica tu elección." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C1 = SCENES_M6C1;
