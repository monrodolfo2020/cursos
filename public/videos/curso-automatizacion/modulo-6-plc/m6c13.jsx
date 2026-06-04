// m6c13.jsx — "Factory IO + TIA Portal: simulación 3D"
// After m6-lib.jsx. Exports SCENES_M6C13.

function S_What({ start, dur }) {
  const t = useTime(); const s = start;
  const f = [
    { k: 'Planta 3D', d: 'Cintas, tanques, brazos y clasificadores con física realista.', a: TL6.cyan },
    { k: 'Se conecta al PLC', d: 'Drivers para PLC real o simulado (PLCSIM).', a: TL6.grn },
    { k: 'Escenas listas', d: 'Prediseñadas para practicar; demo gratis 30 días.', a: TL6.amber },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="¿Qué es Factory IO?" y="12%" />
      <CapM6 start={s + 0.6} dur={2.2} size={50} weight={700} y="23%" width={1500}>Una planta industrial virtual para tu PLC.</CapM6>
      {f.map((x, i) => (
        <InfoCardM6 key={i} x={230 + i * 500} y={420} w={450} h={290} no={i + 1} accent={x.a} title={x.k} sub={x.d} appear={s + 1.4 + i * 0.45} t={t} />
      ))}
    </SceneM6>
  );
}

function S_Scene({ start, dur }) {
  const t = useTime(); const s = start;
  const beltY = 520;
  const px = ((t - s) * 150) % 1500;
  const sensors = [
    { x: 700, h: 30, label: 'baja', a: TL6.grn },
    { x: 900, h: 60, label: 'media', a: TL6.cyan },
    { x: 1100, h: 90, label: 'alta', a: TL6.amber },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Escena: Sorting by Height" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={46} weight={600} y="19%" width={1560}>Clasificar piezas por altura con <span style={{ color: TL6.cyan }}>3 sensores</span> y <span style={{ color: TL6.amber }}>3 empujadores</span>.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* belt */}
        <rect x={300} y={beltY} width={1320} height={26} rx="8" fill={TL6.paper} stroke={TL6.lineS} strokeWidth="2" opacity={clamp((t - (s + 1)) / 0.5, 0, 1)} />
        {/* moving piece */}
        <g opacity={clamp((t - (s + 1.2)) / 0.5, 0, 1)}>
          <rect x={320 + px} y={beltY - 52} width="46" height="52" rx="5" fill={TL6.cyanWash} stroke={TL6.cyan} strokeWidth="2" />
        </g>
        {/* sensors */}
        {sensors.map((sn, i) => {
          const ap = clamp((t - (s + 1.6 + i * 0.4)) / 0.5, 0, 1);
          return (
            <g key={i} opacity={ap}>
              <line x1={sn.x} y1={beltY - 20} x2={sn.x} y2={beltY - 20 - sn.h} stroke={sn.a} strokeWidth="2" strokeDasharray="4 4" />
              <circle cx={sn.x} cy={beltY - 20 - sn.h} r="7" fill={sn.a} />
              <text x={sn.x} y={beltY - 30 - sn.h} fill={sn.a} fontFamily={MONO6} fontSize="14" textAnchor="middle">{sn.label}</text>
              {/* pusher + bin below */}
              <rect x={sn.x - 22} y={beltY + 60} width="44" height="30" rx="5" fill={TL6.paper} stroke={sn.a} strokeWidth="2" />
              <text x={sn.x} y={beltY + 80} fill={sn.a} fontFamily={MONO6} fontSize="13" textAnchor="middle">Q{i}</text>
              <ArrowM6 x1={sn.x} y1={beltY + 36} x2={sn.x} y2={beltY + 58} start={s + 2.0 + i * 0.4} t={t} color={sn.a} />
            </g>
          );
        })}
      </svg>
      <CapM6 start={s + 4.2} dur={dur - 4.5} size={24} weight={500} color={TL6.mut} y="88%" width={1560}>6 entradas (sensores) + 4 salidas (empujadores y cinta) → lógica secuencial con temporización, en 3D.</CapM6>
    </SceneM6>
  );
}

function S_Connect({ start, dur }) {
  const t = useTime(); const s = start;
  const cy = 500;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Conexión Factory IO ↔ PLCSIM" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="21%" width={1560}>Un driver une la planta 3D con el PLC simulado.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <BlockM6 x={250} y={cy} w={300} h={110} label="Factory IO" sub="planta 3D" accent={TL6.cyan} t={t} appear={s + 1.2} />
        <BlockM6 x={1100} y={cy} w={300} h={110} label="PLCSIM" sub="PLC simulado" accent={TL6.grn} t={t} appear={s + 1.6} led />
        <ArrowM6 x1={550} y1={cy + 35} x2={1100} y2={cy + 35} start={s + 2.0} t={t} color={TL6.cyan} label="sensores → I100.x" live />
        <ArrowM6 x1={1100} y1={cy + 75} x2={550} y2={cy + 75} start={s + 2.6} t={t} color={TL6.amber} label="Q100.x → actuadores" live />
        <text x={825} y={cy + 160} fill={TL6.dim} fontFamily={MONO6} fontSize="16" textAnchor="middle" opacity={clamp((t - (s + 3.2)) / 0.5, 0, 1)}>Driver: Siemens S7-PLCSIM Advanced</text>
      </svg>
      <CapM6 start={s + 4.0} dur={dur - 4.3} size={24} weight={500} color={TL6.mut} y="86%" width={1560}>Las señales I100.x / Q100.x son memoria del PLCSIM — un área aparte para no chocar con el proyecto real.</CapM6>
    </SceneM6>
  );
}

function S_Debug({ start, dur }) {
  const t = useTime(); const s = start;
  const tools = [
    { k: 'Monitor online', d: 'Contactos y bobinas en verde cuando están activos.', a: TL6.grn },
    { k: 'Watch Table', d: 'Todas las variables relevantes con su valor en vivo.', a: TL6.cyan },
    { k: 'Force Table', d: 'Forzar entradas para probar sin la planta 3D.', a: TL6.amber },
    { k: 'Breakpoints', d: 'Detener la ejecución y mirar el estado interno.', a: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Depurar con la planta 3D" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="20%" width={1500}>Las herramientas que te muestran la verdad.</CapM6>
      {tools.map((tl, i) => (
        <InfoCardM6 key={i} x={210 + (i % 2) * 760} y={400 + Math.floor(i / 2) * 175} w={700} h={150} accent={tl.a} title={tl.k} sub={tl.d} appear={s + 1.4 + i * 0.4} t={t} />
      ))}
    </SceneM6>
  );
}

const SCENES_M6C13 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={13} seccion="Práctica con software" title="Factory IO + TIA Portal" dudur="22–25 min" objetivo="Conectar una planta 3D al PLC simulado y programar la lógica de control de una escena real de clasificación." />, dur: 7, label: 'Apertura' },
  { C: S_What, dur: 12, label: '¿Qué es Factory IO?' },
  { C: S_Scene, dur: 14, label: 'Sorting by Height' },
  { C: S_Connect, dur: 13, label: 'La conexión' },
  { C: S_Debug, dur: 13, label: 'Depuración' },
  { C: (p) => <ClosingM6 {...p} line="Ver tu programa mover piezas en 3D cierra la brecha entre el código y la planta real — y enseña a depurar de verdad." activity="Completa el programa de clasificación, verifícalo online con Factory IO y añade un Watch Table con el total y el porcentaje de piezas por categoría." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C13 = SCENES_M6C13;
