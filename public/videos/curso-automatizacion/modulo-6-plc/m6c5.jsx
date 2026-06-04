// m6c5.jsx — "El ciclo de scan del PLC: cómo ejecuta un programa"
// After m6-lib.jsx. Exports SCENES_M6C5.

// ── El ciclo de scan (lazo circular) ──────────────────────────────────────────
function S_Cycle({ start, dur }) {
  const t = useTime(); const s = start;
  const cx = 760, cy = 520, R = 230;
  const steps = [
    { label: '1 · Leer entradas', sub: '→ PII', a: TL6.grn },
    { label: '2 · Ejecutar OB1', sub: 'arriba ↓ abajo', a: TL6.cyan },
    { label: '3 · Escribir salidas', sub: 'desde PIO', a: TL6.amber },
    { label: '4 · Comunicaciones', sub: 'Profinet · Modbus', a: TL6.cyanLt },
    { label: '5 · Tareas del SO', sub: 'diagnóstico', a: TL6.mut },
  ];
  const active = Math.floor((t - s) * 1.4) % 5;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="El latido del PLC" y="9%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="17%" width={1500}>El PLC ejecuta su programa <span style={{ color: TL6.cyan }}>cíclica y deterministamente</span>.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={TL6.lineS} strokeWidth="2" strokeDasharray="6 8" opacity={clamp((t - (s + 1)) / 0.6, 0, 1)} />
        {steps.map((st, i) => {
          const ang = -Math.PI / 2 + (i / 5) * Math.PI * 2;
          const px = cx + Math.cos(ang) * R, py = cy + Math.sin(ang) * R;
          const ap = clamp((t - (s + 1.3 + i * 0.4)) / 0.5, 0, 1);
          const isOn = (t - s) > 4 && active === i;
          return (
            <g key={i} opacity={ap}>
              <circle cx={px} cy={py} r="13" fill={isOn ? st.a : TL6.paper} stroke={st.a} strokeWidth="3" />
              {isOn && <circle cx={px} cy={py} r="24" fill="none" stroke={st.a} strokeWidth="2" opacity="0.4" />}
              <rect x={px - 130} y={py - (py < cy ? 84 : -22)} width="260" height="60" rx="10" fill={TL6.paper} stroke={isOn ? st.a : TL6.lineS} strokeWidth={isOn ? 2 : 1.4} />
              <text x={px} y={py - (py < cy ? 84 : -22) + 27} fill={TL6.ink} fontFamily={DISP6} fontSize="21" fontWeight="700" textAnchor="middle">{st.label}</text>
              <text x={px} y={py - (py < cy ? 84 : -22) + 48} fill={st.a} fontFamily={MONO6} fontSize="14" textAnchor="middle">{st.sub}</text>
            </g>
          );
        })}
        <text x={cx} y={cy - 6} fill={TL6.mut} fontFamily={MONO6} fontSize="16" textAnchor="middle">SCAN</text>
        <text x={cx} y={cy + 22} fill={TL6.cyan} fontFamily={DISP6} fontSize="30" fontWeight="700" textAnchor="middle">1–50 ms</text>
      </svg>
    </SceneM6>
  );
}

// ── La imagen de proceso ──────────────────────────────────────────────────────
function S_Image({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="La imagen de proceso (PII / PIO)" y="11%" />
      <CapM6 start={s + 0.6} dur={2.4} size={46} weight={600} y="22%" width={1620}>Al iniciar el scan se toma una <span style={{ color: TL6.cyan }}>fotografía</span> de todas las entradas.</CapM6>
      <InfoCardM6 x={210} y={400} w={680} h={320} no={1} accent={TL6.red} title="Sin imagen" sub="Si la entrada cambia entre el rung 1 y el rung 50, la lógica del mismo scan sería inconsistente." appear={s + 1.4} t={t} />
      <InfoCardM6 x={1030} y={400} w={680} h={320} no={2} accent={TL6.grn} title="Con imagen" sub="Todo el programa lee de la PII (la foto fija); las salidas se escriben al final desde la PIO. Determinista." appear={s + 1.9} t={t} />
      <CapM6 start={s + 3.6} dur={dur - 3.9} size={25} weight={500} color={TL6.mut} y="80%" width={1620}>Cuidado: una señal más corta que un ciclo de scan puede <b style={{ color: TL6.red }}>pasar desapercibida</b> → usar interrupción de hardware.</CapM6>
    </SceneM6>
  );
}

// ── Bloques de organización (OB) ──────────────────────────────────────────────
function S_OBs({ start, dur }) {
  const t = useTime(); const s = start;
  const obs = [
    { k: 'OB1', d: 'Ciclo principal — se ejecuta en cada scan. Aquí vive el grueso del control.', a: TL6.cyan },
    { k: 'OB30–38', d: 'Interrupción cíclica — período fijo (1–100 ms). El lazo PID vive aquí.', a: TL6.grn },
    { k: 'OB40', d: 'Interrupción de hardware — reacciona a un flanco en < 1 ms.', a: TL6.amber },
    { k: 'OB100', d: 'Arranque — corre una sola vez al pasar de STOP a RUN. Inicializa.', a: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Bloques de organización" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="20%" width={1500}>Los puntos de entrada al programa.</CapM6>
      {obs.map((o, i) => (
        <InfoCardM6 key={i} x={210 + (i % 2) * 760} y={400 + Math.floor(i / 2) * 180} w={700} h={150} accent={o.a} title={o.k} sub={o.d} appear={s + 1.4 + i * 0.4} t={t} />
      ))}
    </SceneM6>
  );
}

// ── PID en interrupción + watchdog ────────────────────────────────────────────
function S_Watchdog({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Dos implicaciones críticas" y="12%" color={TL6.amber} />
      <CapM6 start={s + 0.6} dur={2.2} size={46} weight={600} y="22%" width={1620}>Lo que el ciclo de scan te obliga a recordar.</CapM6>
      <InfoCardM6 x={210} y={400} w={680} h={300} no={1} accent={TL6.grn} title="El PID necesita período fijo" sub="La integral y la derivada dependen del tiempo. En OB1 el tiempo varía → coloca PID_Compact en un OB de interrupción cíclica (p. ej. OB30, 100 ms)." appear={s + 1.4} t={t} />
      <InfoCardM6 x={1030} y={400} w={680} h={300} no={2} accent={TL6.red} title="Watchdog timer" sub="Si el scan supera el límite (p. ej. 150 ms) el PLC pasa a STOP automáticamente — te protege de un bucle infinito que colgaría el equipo." appear={s + 1.9} t={t} />
    </SceneM6>
  );
}

const SCENES_M6C5 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={5} title="El ciclo de scan del PLC" dudur="15–17 min" objetivo="Entender el ciclo determinista del PLC, la imagen de proceso, los OB y cuándo el scan puede ser un problema." />, dur: 7, label: 'Apertura' },
  { C: S_Cycle, dur: 15, label: 'El ciclo de scan' },
  { C: S_Image, dur: 13, label: 'La imagen de proceso' },
  { C: S_OBs, dur: 13, label: 'Bloques de organización' },
  { C: S_Watchdog, dur: 12, label: 'PID y watchdog' },
  { C: (p) => <ClosingM6 {...p} line="El PLC no improvisa: lee, ejecuta de arriba abajo, escribe y repite. Conocer ese ritmo es diseñar bien el programa." activity="Analiza 3 fragmentos de Ladder: ¿qué resulta ejecutándolos de arriba abajo? ¿cambia si inviertes el orden? ¿qué OB usas para un PID de 200 ms?" />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C5 = SCENES_M6C5;
