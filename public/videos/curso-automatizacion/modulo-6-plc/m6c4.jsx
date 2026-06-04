// m6c4.jsx — "Entradas y salidas analógicas: escalado y acondicionamiento"
// After m6-lib.jsx. Exports SCENES_M6C4.

// ── La cadena de conversión ───────────────────────────────────────────────────
function S_Chain({ start, dur }) {
  const t = useTime(); const s = start;
  const cy = 470;
  const steps = [
    { x: 110, label: 'Variable', sub: '75 °C', a: TL6.grn },
    { x: 410, label: 'Sensor', sub: 'PT100 / Tx', a: TL6.grn },
    { x: 710, label: '4–20 mA', sub: '12 mA', a: TL6.amber },
    { x: 1010, label: 'Módulo AI', sub: 'ADC · SM1231', a: TL6.cyan },
    { x: 1330, label: 'Registro', sub: 'IW96 = 16620', a: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Del mundo físico al número" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="21%" width={1560}>La cadena de conversión <span style={{ color: TL6.cyan }}>analógica → digital</span>.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {steps.map((st, i) => <BlockM6 key={i} x={st.x} y={cy} w={210} h={92} label={st.label} sub={st.sub} accent={st.a} t={t} appear={s + 1.2 + i * 0.4} />)}
        {steps.slice(0, -1).map((st, i) => <ArrowM6 key={i} x1={st.x + 210} y1={cy + 46} x2={steps[i + 1].x} y2={cy + 46} start={s + 1.5 + i * 0.4} t={t} color={TL6.mut} live />)}
      </svg>
      <CapM6 start={s + 4.0} dur={dur - 4.3} size={26} weight={500} color={TL6.mut} y="80%" width={1560}>El programa toma ese número crudo (raw) y lo <b style={{ color: TL6.ink }}>escala</b> de vuelta a 75.0 °C.</CapM6>
    </SceneM6>
  );
}

// ── El número mágico 27648 ────────────────────────────────────────────────────
function S_Magic({ start, dur }) {
  const t = useTime(); const s = start;
  const x0 = 360, x1 = 1560, ty = 540;
  const marks = [
    { p: 0.0, mA: '4 mA', raw: '0', sub: 'vacío', a: TL6.grn },
    { p: 0.5, mA: '12 mA', raw: '13824', sub: 'mitad', a: TL6.cyan },
    { p: 1.0, mA: '20 mA', raw: '27648', sub: 'lleno', a: TL6.amber },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="El número mágico de Siemens" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={52} weight={700} y="22%" width={1500}>4–20 mA siempre cae entre <span style={{ color: TL6.cyan }}>0 y 27648</span>.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={x0} y1={ty} x2={x1} y2={ty} stroke={TL6.lineS} strokeWidth="4" strokeLinecap="round" />
        <line x1={x0} y1={ty} x2={x0 + (x1 - x0) * clamp((t - (s + 1.2)) / 1.4, 0, 1)} y2={ty} stroke={TL6.cyan} strokeWidth="6" strokeLinecap="round" />
        {marks.map((m, i) => {
          const mx = x0 + (x1 - x0) * m.p;
          const ap = clamp((t - (s + 1.6 + i * 0.5)) / 0.5, 0, 1);
          return (
            <g key={i} opacity={ap}>
              <circle cx={mx} cy={ty} r="11" fill={m.a} />
              <text x={mx} y={ty - 36} fill={m.a} fontFamily={MONO6} fontSize="30" fontWeight="700" textAnchor="middle">{m.mA}</text>
              <text x={mx} y={ty + 56} fill={TL6.ink} fontFamily={MONO6} fontSize="34" fontWeight="700" textAnchor="middle">{m.raw}</text>
              <text x={mx} y={ty + 86} fill={TL6.dim} fontFamily={MONO6} fontSize="16" textAnchor="middle">{m.sub}</text>
            </g>
          );
        })}
        {/* subrange / fault */}
        <g opacity={clamp((t - (s + 4.0)) / 0.6, 0, 1)}>
          <text x={x0 - 30} y={ty - 36} fill={TL6.red} fontFamily={MONO6} fontSize="17" fontWeight="600" textAnchor="end">&lt; 3.6 mA</text>
          <text x={x0 - 30} y={ty - 14} fill={TL6.red} fontFamily={MONO6} fontSize="15" textAnchor="end">raw &lt; 0 → fallo cable</text>
        </g>
      </svg>
      <CapM6 start={s + 4.8} dur={dur - 5.1} size={25} weight={500} color={TL6.mut} y="86%" width={1500}>Cada mA equivale a 1728 cuentas. Por eso 4–20 mA empieza en 4 y no en 0: <b style={{ color: TL6.red }}>0 mA = cable cortado</b>.</CapM6>
    </SceneM6>
  );
}

// ── NORM_X / SCALE_X en código ────────────────────────────────────────────────
function S_Code({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '// PT-201: presión 0–10 bar, 4–20 mA → IW96', c: TL6.dim },
    { txt: '', c: TL6.ink },
    { txt: '// 1) Normalizar raw → 0.0 … 1.0', c: TL6.dim },
    { txt: 'NORM_X(IN := INT_TO_REAL(IW96),', c: TL6.cyan },
    { txt: '       MIN := 0.0, MAX := 27648.0,', c: TL6.ink },
    { txt: '       OUT => Norm_PT201);', c: TL6.ink },
    { txt: '', c: TL6.ink },
    { txt: '// 2) Escalar a unidades de ingeniería', c: TL6.dim },
    { txt: 'SCALE_X(IN := Norm_PT201,', c: TL6.grn },
    { txt: '        MIN := 0.0, MAX := 10.0,', c: TL6.ink },
    { txt: '        OUT => Presion_PT201);  // bar', c: TL6.amber },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Escalado en TIA Portal" y="9%" />
      <CapM6 start={s + 0.6} dur={2.2} size={46} weight={600} y="17%" width={1500}>Dos bloques: <span style={{ color: TL6.cyan }}>NORM_X</span> normaliza, <span style={{ color: TL6.grn }}>SCALE_X</span> escala.</CapM6>
      <CodeM6 x={120} y={310} w={920} title="Structured Text (ST)" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.2, 0, 1)} />
      <div style={{ position: 'absolute', left: 1110, top: 360, width: 660 }}>
        <InfoCardM6 x={0} y={0} w={660} h={150} accent={TL6.cyan} title="NORM_X" sub="Lleva el raw (0–27648) a un REAL entre 0.0 y 1.0 — independiente de las unidades." appear={s + 2.6} t={t} />
        <InfoCardM6 x={0} y={180} w={660} h={150} accent={TL6.grn} title="SCALE_X" sub="Lleva ese 0.0–1.0 al rango físico del transmisor (LRV–URV): 0–10 bar." appear={s + 3.1} t={t} />
        <div style={{ position: 'absolute', top: 350, width: 660, textAlign: 'center', opacity: clamp((t - (s + 3.8)) / 0.6, 0, 1) }}>
          <div style={{ fontFamily: MONO6, fontSize: 22, color: TL6.ink, background: TL6.paper, border: `1px solid ${TL6.lineS}`, borderRadius: 10, padding: '16px 18px' }}>raw 16620 → <b style={{ color: TL6.amber }}>6.01 bar</b></div>
        </div>
      </div>
    </SceneM6>
  );
}

// ── Detección de fallos y filtro ──────────────────────────────────────────────
function S_Fault({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '// Cable cortado → corriente cae a 0 mA', c: TL6.dim },
    { txt: 'IF IW96 < 0 THEN', c: TL6.red },
    { txt: '   Fallo_PT201 := TRUE;', c: TL6.ink },
    { txt: 'END_IF;', c: TL6.red },
    { txt: '', c: TL6.ink },
    { txt: '// Filtro de primer orden (suaviza ruido)', c: TL6.dim },
    { txt: 'PV_filt := 0.2 * PV_raw', c: TL6.cyan },
    { txt: '        + 0.8 * PV_filt;', c: TL6.cyan },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Diagnóstico del lazo analógico" y="10%" color={TL6.amber} />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="20%" width={1560}>El programa también <span style={{ color: TL6.red }}>vigila</span> y <span style={{ color: TL6.cyan }}>limpia</span> la señal.</CapM6>
      <CodeM6 x={150} y={350} w={760} title="ST · diagnóstico" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 2.6, 0, 1)} />
      <div style={{ position: 'absolute', left: 990, top: 380, width: 760 }}>
        <InfoCardM6 x={0} y={0} w={760} h={140} accent={TL6.red} title="Wire-break (raw < 0)" sub="0 mA no es “mínimo”: es cable cortado. El subrango de Siemens lo delata con un raw negativo." appear={s + 2.4} t={t} />
        <InfoCardM6 x={0} y={170} w={760} h={140} accent={TL6.cyan} title="Filtro α (paso bajo)" sub="α = 0.2 suaviza el caudal ruidoso; α cerca de 1 = sin filtro, cerca de 0 = muy lento." appear={s + 2.9} t={t} />
      </div>
    </SceneM6>
  );
}

const SCENES_M6C4 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={4} title="Entradas y salidas analógicas" dudur="18–20 min" objetivo="Programar el escalado completo de señales 4–20 mA, entender la conversión ADC/DAC y diagnosticar fallos del lazo." />, dur: 7, label: 'Apertura' },
  { C: S_Chain, dur: 12, label: 'La cadena de conversión' },
  { C: S_Magic, dur: 14, label: 'El número 27648' },
  { C: S_Code, dur: 15, label: 'NORM_X / SCALE_X' },
  { C: S_Fault, dur: 13, label: 'Fallos y filtro' },
  { C: (p) => <ClosingM6 {...p} line="Escalar es traducir: un raw entre 0 y 27648 se vuelve un número con unidades — y un raw negativo es una alarma." activity="Escala las 4 entradas analógicas del proyecto (LT-101, FT-101, TT-301, PT-401), agrega detección de cable cortado y un filtro de primer orden al caudal." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C4 = SCENES_M6C4;
