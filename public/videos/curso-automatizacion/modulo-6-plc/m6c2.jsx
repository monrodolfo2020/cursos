// m6c2.jsx — "Partes del PLC: CPU, módulos de E/S, fuente y rack"
// After m6-lib.jsx. Exports SCENES_M6C2.

// ── CPU module illustration with callouts ─────────────────────────────────────
function S_CPU({ start, dur }) {
  const t = useTime(); const s = start;
  const mx = 760, my = 360, mw = 400, mh = 420;
  const calls = [
    { ty: my + 60, side: 'L', label: '14 entradas DI', sub: 'I0.0–I1.5 · 24 VDC' },
    { ty: my + 150, side: 'L', label: '10 salidas DO', sub: 'Q0.0–Q1.1 · transistor' },
    { ty: my + 60, side: 'R', label: '2 entradas AI', sub: 'IW64, IW66 · 0–10 V' },
    { ty: my + 150, side: 'R', label: 'Puerto Ethernet', sub: 'RJ45 · Profinet' },
    { ty: my + 240, side: 'R', label: 'Memory Card', sub: 'programa (Flash)' },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="La CPU del curso" y="9%" />
      <CapM6 start={s + 0.6} dur={2.2} size={50} weight={700} y="18%" width={1500}>Siemens S7-1214C — el corazón del sistema.</CapM6>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {(() => { const ap = pop6(t, s + 1.2, 0.6, 16); return (
          <g opacity={ap.op} transform={`translate(0 ${ap.ty})`}>
            <rect x={mx} y={my} width={mw} height={mh} rx="14" fill={TL6.paper} stroke={TL6.cyan} strokeWidth="2.4" />
            {/* terminal rows */}
            {[0, 1].map(r => Array.from({ length: 7 }).map((_, i) => (
              <rect key={r + '-' + i} x={mx + 26 + i * 50} y={r === 0 ? my + 28 : my + mh - 50} width="34" height="22" rx="4" fill={TL6.bg2} stroke={TL6.lineS} strokeWidth="1.2" />
            )))}
            {/* status leds */}
            <LedM6 cx={mx + 40} cy={my + 110} r="7" color={TL6.grn} on t={t} />
            <LedM6 cx={mx + 40} cy={my + 140} r="7" color={TL6.red} on={false} t={t} />
            {/* ethernet port */}
            <rect x={mx + mw - 64} y={my + 130} width="40" height="34" rx="4" fill={TL6.bg} stroke={TL6.cyanD} strokeWidth="2" />
            {/* memory card slot */}
            <rect x={mx + mw - 64} y={my + 224} width="40" height="22" rx="3" fill={TL6.bg} stroke={TL6.amber} strokeWidth="2" />
            <text x={mx + mw / 2} y={my + mh / 2 + 8} fill={TL6.mut} fontFamily={MONO6} fontSize="18" fontWeight="600" textAnchor="middle" opacity="0.7">CPU 1214C</text>
          </g>
        ); })()}
        {calls.map((c, i) => {
          const ap = clamp((t - (s + 2.2 + i * 0.4)) / 0.5, 0, 1);
          const x0 = c.side === 'L' ? mx : mx + mw;
          const x1 = c.side === 'L' ? mx - 230 : mx + mw + 230;
          const tx = c.side === 'L' ? mx - 250 : mx + mw + 30;
          return (
            <g key={i} opacity={ap}>
              <line x1={x0} y1={c.ty} x2={x1} y2={c.ty} stroke={TL6.lineS} strokeWidth="1.5" />
              <circle cx={x0} cy={c.ty} r="4" fill={TL6.cyan} />
              <text x={tx} y={c.ty - 4} fill={TL6.ink} fontFamily={DISP6} fontSize="22" fontWeight="700" textAnchor={c.side === 'L' ? 'end' : 'start'}>{c.label}</text>
              <text x={tx} y={c.ty + 18} fill={TL6.mut} fontFamily={MONO6} fontSize="14" textAnchor={c.side === 'L' ? 'end' : 'start'}>{c.sub}</text>
            </g>
          );
        })}
      </svg>
      <CapM6 start={s + 5.0} dur={dur - 5.3} size={24} weight={500} color={TL6.mut} y="90%" width={1500}>Fuente integrada (85–264 VAC) y bus lateral para agregar módulos de señal a la derecha.</CapM6>
    </SceneM6>
  );
}

// ── LEDs de estado + modos de operación ───────────────────────────────────────
function S_Modes({ start, dur }) {
  const t = useTime(); const s = start;
  const modes = [
    { k: 'STOP', d: 'No ejecuta el programa; E/S en estado seguro. Para programar y configurar.', a: TL6.amber },
    { k: 'STARTUP', d: 'Ejecuta el OB100 una vez al arrancar, antes de pasar a RUN.', a: TL6.cyan },
    { k: 'RUN', d: 'Ejecuta el programa cíclicamente. Operación normal.', a: TL6.grn },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="LEDs de estado y modos" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={50} weight={700} y="20%" width={1500}>El frente de la CPU te dice qué está pasando.</CapM6>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <LedM6 cx={420} cy={470} r="11" color={TL6.grn} on t={t} label="RUN / STOP" sub="verde / amarillo" />
        <LedM6 cx={420} cy={540} r="11" color={TL6.red} on blink t={t} label="ERROR" sub="error de HW o programa" />
        <LedM6 cx={420} cy={610} r="11" color={TL6.amber} on={false} t={t} label="MAINT" sub="mantenimiento" />
        <LedM6 cx={420} cy={680} r="11" color={TL6.cyan} on blink t={t} label="Rx / Tx" sub="comunicación Ethernet" />
      </svg>
      {modes.map((m, i) => (
        <InfoCardM6 key={i} x={820} y={400 + i * 110} w={900} h={92} no={i + 1} accent={m.a} title={m.k} sub={m.d} appear={s + 1.8 + i * 0.5} t={t} />
      ))}
    </SceneM6>
  );
}

// ── Módulos de señal ──────────────────────────────────────────────────────────
function S_Modules({ start, dur }) {
  const t = useTime(); const s = start;
  const mods = [
    { k: 'SM 1221', d: 'Entradas digitales', x: '8 / 16 DI · 24 VDC', a: TL6.grn },
    { k: 'SM 1222', d: 'Salidas digitales', x: 'DO relé o transistor', a: TL6.amber },
    { k: 'SM 1223', d: 'Combinado DI/DO', x: '8 DI + 8 DO', a: TL6.cyan },
    { k: 'SM 1231', d: 'Entradas analógicas', x: '4/8 ch · 0–27648', a: TL6.cyanLt },
    { k: 'SM 1232', d: 'Salidas analógicas', x: '2/4 ch · 4–20 mA', a: TL6.grnD },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Módulos de señal (SM)" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="21%" width={1560}>Se montan a la derecha de la CPU sobre perfil DIN.</CapM6>
      {mods.map((m, i) => (
        <div key={i} style={{ position: 'absolute', left: 150 + i * 330, top: 420, width: 300 }}>
          {(() => { const ap = pop6(t, s + 1.4 + i * 0.34, 0.5, 20); return (
            <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', borderRadius: 12, border: `1px solid ${TL6.lineS}`, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, boxShadow: TL6.shadow, padding: '24px 22px', height: 250, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 20, bottom: 20, width: 4, background: m.a, borderRadius: 3 }} />
              <div style={{ display: 'flex', gap: 4 }}>{Array.from({ length: 4 }).map((_, k) => <span key={k} style={{ width: 7, height: 7, borderRadius: 4, background: k < 2 ? m.a : '#2a3346' }} />)}</div>
              <div style={{ fontFamily: MONO6, fontSize: 25, fontWeight: 700, color: m.a, letterSpacing: '0.04em' }}>{m.k}</div>
              <div style={{ fontFamily: DISP6, fontSize: 21, fontWeight: 600, color: TL6.ink }}>{m.d}</div>
              <div style={{ marginTop: 'auto', fontFamily: MONO6, fontSize: 15, color: TL6.mut }}>{m.x}</div>
            </div>
          ); })()}
        </div>
      ))}
      <CapM6 start={s + 4.4} dur={dur - 4.7} size={24} weight={500} color={TL6.mut} y="88%" width={1560}>El bus lateral lleva 5 VDC, datos de configuración y señales de E/S entre todos los módulos.</CapM6>
    </SceneM6>
  );
}

// ── Configuración de hardware ─────────────────────────────────────────────────
function S_Config({ start, dur }) {
  const t = useTime(); const s = start;
  const slots = [
    { k: 'CPU 1214C', dir: '14DI+10DO+2AI', a: TL6.cyan },
    { k: 'SM 1221', dir: 'I2.0–I2.7', a: TL6.grn },
    { k: 'SM 1222', dir: 'Q2.0–Q2.7', a: TL6.amber },
    { k: 'SM 1231', dir: 'IW96–IW102', a: TL6.cyanLt },
    { k: 'SM 1232', dir: 'QW96, QW98', a: TL6.grnD },
    { k: 'CM 1241', dir: 'Modbus RTU', a: TL6.mut },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Configuración de hardware en TIA Portal" y="13%" />
      <CapM6 start={s + 0.6} dur={2.4} size={46} weight={600} y="24%" width={1620}>El software debe saber <span style={{ color: TL6.cyan }}>exactamente</span> cómo está armado el rack — o habrá errores.</CapM6>
      <div style={{ position: 'absolute', left: '50%', top: '54%', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'stretch', gap: 0, borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL6.lineS}`, boxShadow: TL6.shadow }}>
        {slots.map((sl, i) => {
          const ap = pop6(t, s + 1.6 + i * 0.34, 0.5, 0);
          return (
            <div key={i} style={{ opacity: ap.op, width: 250, background: i === 0 ? TL6.paper2 : TL6.paper, borderLeft: i ? `1px solid ${TL6.lineS}` : 'none', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: MONO6, fontSize: 12, color: TL6.dim, letterSpacing: '0.2em' }}>SLOT {i}</div>
              <div style={{ display: 'flex', gap: 3, marginBottom: 2 }}>{Array.from({ length: 5 }).map((_, k) => <span key={k} style={{ width: 6, height: 22, borderRadius: 2, background: k < 3 ? sl.a : '#2a3346', opacity: k < 3 ? 0.8 : 1 }} />)}</div>
              <div style={{ fontFamily: DISP6, fontSize: 22, fontWeight: 700, color: TL6.ink }}>{sl.k}</div>
              <div style={{ fontFamily: MONO6, fontSize: 14, color: sl.a }}>{sl.dir}</div>
            </div>
          );
        })}
      </div>
      <CapM6 start={s + 4.6} dur={dur - 4.9} size={25} weight={500} color={TL6.mut} y="80%" width={1560}>TIA Portal asigna las direcciones (I, Q, IW, QW) automáticamente; tú verificas que coincidan con el cableado real.</CapM6>
    </SceneM6>
  );
}

const SCENES_M6C2 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={2} title="Partes del PLC" dudur="16–18 min" objetivo="Reconocer físicamente cada componente de un PLC modular y saber interpretar su configuración de hardware." />, dur: 7, label: 'Apertura' },
  { C: S_CPU, dur: 15, label: 'La CPU S7-1214C' },
  { C: S_Modes, dur: 13, label: 'LEDs y modos de operación' },
  { C: S_Modules, dur: 13, label: 'Módulos de señal' },
  { C: S_Config, dur: 14, label: 'Configuración de hardware' },
  { C: (p) => <ClosingM6 {...p} line="El hardware se especifica por módulos; la configuración en software es el espejo exacto del rack físico." activity="Con la lista de E/S de la planta (22 DI, 8 AI, 14 DO, 4 AO), selecciona los módulos, arma la configuración de hardware y documenta la tabla de direcciones." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C2 = SCENES_M6C2;
