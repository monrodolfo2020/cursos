// m6c14.jsx — "Proyecto PLC 1: Control de nivel de tanque con bomba y válvula"
// After m6-lib.jsx. Exports SCENES_M6C14.

function S_System({ start, dur }) {
  const t = useTime(); const s = start;
  const tankX = 760, tankY = 360, tankW = 360, tankH = 380;
  const fill = 0.62;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="El sistema · tanque T-101" y="9%" />
      <CapM6 start={s + 0.6} dur={2.2} size={46} weight={600} y="17%" width={1560}>Mantener el nivel en <span style={{ color: TL6.cyan }}>SP = 2.5 m</span> con bomba y válvula.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {(() => { const ap = pop6(t, s + 1.2, 0.6, 16); return (
          <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
            {/* tank */}
            <rect x={tankX} y={tankY} width={tankW} height={tankH} rx="10" fill="none" stroke={TL6.lineS} strokeWidth="2.5" />
            <rect x={tankX + 4} y={tankY + tankH * (1 - fill)} width={tankW - 8} height={tankH * fill - 4} rx="6" fill={TL6.cyanWash} />
            <line x1={tankX} y1={tankY + tankH * (1 - fill)} x2={tankX + tankW} y2={tankY + tankH * (1 - fill)} stroke={TL6.cyan} strokeWidth="2.5" />
            {/* SP line */}
            <line x1={tankX} y1={tankY + tankH * 0.375} x2={tankX + tankW} y2={tankY + tankH * 0.375} stroke={TL6.amber} strokeWidth="2" strokeDasharray="8 6" />
            <text x={tankX + tankW + 10} y={tankY + tankH * 0.375 + 5} fill={TL6.amber} fontFamily={MONO6} fontSize="16" fontWeight="600">SP 2.5m</text>
          </g>
        ); })()}
        {/* LT-101 */}
        <g opacity={clamp((t - (s + 1.8)) / 0.5, 0, 1)}>
          <circle cx={tankX - 70} cy={tankY + 180} r="34" fill={TL6.paper} stroke={TL6.cyan} strokeWidth="2.4" />
          <text x={tankX - 70} y={tankY + 175} fill={TL6.cyan} fontFamily={MONO6} fontSize="15" fontWeight="700" textAnchor="middle">LT</text>
          <text x={tankX - 70} y={tankY + 193} fill={TL6.cyan} fontFamily={MONO6} fontSize="13" textAnchor="middle">101</text>
          <line x1={tankX - 36} y1={tankY + 180} x2={tankX} y2={tankY + 180} stroke={TL6.cyan} strokeWidth="2" />
        </g>
        {/* switches */}
        <g opacity={clamp((t - (s + 2.2)) / 0.5, 0, 1)}>
          <LedM6 cx={tankX + tankW + 24} cy={tankY + tankH - 26} r="8" color={TL6.red} on={false} t={t} label="LSLL 0.2m" />
          <LedM6 cx={tankX + tankW + 24} cy={tankY + 26} r="8" color={TL6.red} on={false} t={t} label="LSHH 3.8m" />
        </g>
        {/* pump in */}
        <g opacity={clamp((t - (s + 2.6)) / 0.5, 0, 1)}>
          <circle cx={tankX - 180} cy={tankY + 60} r="30" fill={TL6.paper} stroke={TL6.grn} strokeWidth="2.4" />
          <text x={tankX - 180} y={tankY + 66} fill={TL6.grn} fontFamily={MONO6} fontSize="14" fontWeight="700" textAnchor="middle">P-101</text>
          <ArrowM6 x1={tankX - 150} y1={tankY + 60} x2={tankX + 20} y2={tankY + 60} start={s + 2.8} t={t} color={TL6.grn} live />
        </g>
        {/* valve out */}
        <g opacity={clamp((t - (s + 3.0)) / 0.5, 0, 1)}>
          <ArrowM6 x1={tankX + tankW - 20} y1={tankY + tankH - 40} x2={tankX + tankW + 160} y2={tankY + tankH - 40} start={s + 3.2} t={t} color={TL6.amber} live />
          <polygon points={`${tankX + tankW + 90},${tankY + tankH - 56} ${tankX + tankW + 90},${tankY + tankH - 24} ${tankX + tankW + 118},${tankY + tankH - 40}`} fill={TL6.paper} stroke={TL6.amber} strokeWidth="2.2" />
          <text x={tankX + tankW + 104} y={tankY + tankH - 70} fill={TL6.amber} fontFamily={MONO6} fontSize="14" fontWeight="700" textAnchor="middle">FCV-101</text>
        </g>
      </svg>
      <CapM6 start={s + 4.4} dur={dur - 4.7} size={24} weight={500} color={TL6.mut} y="90%" width={1560}>LT-101 (0–4 m) → IW96 · bomba P-101 → Q0.0 · válvula FCV-101 → QW96. El PID mueve la válvula.</CapM6>
    </SceneM6>
  );
}

function S_Interlock({ start, dur }) {
  const t = useTime(); const s = start;
  const x = 360, w = 1080;
  const run = (t - s) > 2.5;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Lógica de enclavamientos · OB1" y="9%" />
      <CapM6 start={s + 0.6} dur={2.0} size={46} weight={600} y="17%" width={1560}>La bomba solo arranca con <span style={{ color: TL6.grn }}>todos los permisivos</span>.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={x - 50} y1={420} x2={x - 50} y2={640} stroke={TL6.lineS} strokeWidth="3" opacity={clamp((t - (s + 1)) / 0.5, 0, 1)} />
        <line x1={x + w + 50} y1={420} x2={x + w + 50} y2={640} stroke={TL6.lineS} strokeWidth="3" opacity={clamp((t - (s + 1)) / 0.5, 0, 1)} />
        <RungM6 x={x} y={450} w={w} t={t} appear={s + 1.2} rung={1} energized={run}
          contacts={[{ x: x + 130, type: 'NO', label: 'Cmd_Start', closed: run }, { x: x + 360, type: 'NC', label: 'Cmd_Stop', closed: true }, { x: x + 580, type: 'NC', label: 'LSLL101', closed: true }, { x: x + 800, type: 'NC', label: 'Falla', closed: true }]}
          coil={{ x: x + w - 50, label: 'P101_DO', on: run }} />
        <RungM6 x={x} y={580} w={w} t={t} appear={s + 1.6} rung={2} energized={run}
          contacts={[{ x: x + 200, type: 'NO', label: 'P101_Run', closed: run }]}
          coil={{ x: x + w - 50, label: 'sello', on: run }} />
      </svg>
      <CapM6 start={s + 4.0} dur={dur - 4.3} size={24} weight={500} color={TL6.mut} y="80%" width={1560}>Nivel bajo-bajo, paro o falla de guardamotor abren el rung y detienen la bomba al instante.</CapM6>
    </SceneM6>
  );
}

function S_PID({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '// OB30 · interrupción cíclica 100 ms', c: TL6.dim },
    { txt: 'PID_Nivel(', c: TL6.cyan },
    { txt: '  Setpoint := SP_Nivel,   // 2.5 m', c: TL6.ink },
    { txt: '  Input    := LT101_EU,   // PV', c: TL6.ink },
    { txt: '  Output   => CV_FCV101,  // 0-100%', c: TL6.grn },
    { txt: '  Mode     := 3);         // Auto', c: TL6.amber },
    { txt: '', c: TL6.ink },
    { txt: 'AO_FCV101(CV_Value := CV_FCV101,', c: TL6.cyan },
    { txt: '          Enable := TRUE,', c: TL6.ink },
    { txt: '          Raw_Out => QW96);', c: TL6.ink },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="El lazo PID de nivel · OB30" y="9%" />
      <CapM6 start={s + 0.6} dur={2.0} size={46} weight={600} y="17%" width={1500}>PID_Compact en interrupción cíclica → válvula.</CapM6>
      <CodeM6 x={130} y={300} w={900} title="ST · OB30" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.0, 0, 1)} />
      <InfoCardM6 x={1110} y={350} w={660} h={170} accent={TL6.grn} title="Período fijo" sub="OB30 garantiza los 100 ms que el PID necesita para integral y derivada correctas." appear={s + 2.6} t={t} />
      <InfoCardM6 x={1110} y={540} w={660} h={170} accent={TL6.cyan} title="CV → salida analógica" sub="El FB AO_Output limita 0–100 % y escala a 0–27648 hacia QW96 (4–20 mA)." appear={s + 3.1} t={t} />
    </SceneM6>
  );
}

function S_Tune({ start, dur }) {
  const t = useTime(); const s = start;
  const gx = 360, gy = 420, gw = 1180, gh = 320;
  const prog = clamp((t - (s + 1.4)) / 3.5, 0, 1);
  const pts = [];
  for (let i = 0; i <= 100; i++) {
    const u = i / 100; if (u > prog) break;
    const y = 1 - Math.exp(-u * 4.5) * Math.cos(u * 6) * (1 - u * 0.2);
    pts.push(`${gx + u * gw},${gy + gh - clamp(y, 0, 1.1) * gh * 0.8 - 20}`);
  }
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Auto-tune y Trace" y="9%" color={TL6.grn} />
      <CapM6 start={s + 0.6} dur={2.0} size={46} weight={600} y="17%" width={1560}>El PLC sintoniza solo; tú observas la respuesta.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <rect x={gx} y={gy} width={gw} height={gh} rx="10" fill={TL6.paper} stroke={TL6.lineS} strokeWidth="1.6" opacity={clamp((t - (s + 1)) / 0.5, 0, 1)} />
        <line x1={gx} y1={gy + gh * 0.2} x2={gx + gw} y2={gy + gh * 0.2} stroke={TL6.amber} strokeWidth="2" strokeDasharray="9 7" opacity={clamp((t - (s + 1.2)) / 0.5, 0, 1)} />
        <text x={gx + gw - 8} y={gy + gh * 0.2 - 10} fill={TL6.amber} fontFamily={MONO6} fontSize="16" fontWeight="600" textAnchor="end" opacity={clamp((t - (s + 1.2)) / 0.5, 0, 1)}>SP</text>
        <polyline points={pts.join(' ')} fill="none" stroke={TL6.grn} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <text x={gx + 14} y={gy + gh - 14} fill={TL6.grn} fontFamily={MONO6} fontSize="15">PV_Nivel</text>
      </svg>
      <CapM6 start={s + 4.6} dur={dur - 4.9} size={24} weight={500} color={TL6.mut} y="90%" width={1560}>Auto-tune calcula Kp, Ti, Td; el Trace grafica PV y CV; una perturbación (SP 2.5→3.0 m) prueba el lazo.</CapM6>
    </SceneM6>
  );
}

const SCENES_M6C14 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={14} seccion="Proyecto integrador 1" title="Proyecto 1: control de nivel" dudur="28–30 min" objetivo="Implementar de punta a punta el control de nivel de un tanque: escalado, enclavamientos, lazo PID, alarmas y ajuste en simulación." />, dur: 7, label: 'Apertura' },
  { C: S_System, dur: 15, label: 'El sistema' },
  { C: S_Interlock, dur: 13, label: 'Enclavamientos' },
  { C: S_PID, dur: 14, label: 'Lazo PID · OB30' },
  { C: S_Tune, dur: 13, label: 'Auto-tune y Trace' },
  { C: (p) => <ClosingM6 {...p} line="Un proyecto completo: leer el nivel, proteger con enclavamientos, controlar con PID y verlo estabilizarse en el Trace." activity="Entrega el proyecto TIA (.zap), las capturas del Trace del lazo PID, la tabla de variables y los parámetros Kp, Ti, Td sintonizados con su justificación." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C14 = SCENES_M6C14;
