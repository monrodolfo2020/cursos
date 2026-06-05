// m8c6.jsx — "Sistema de alarmas en Ignition (ISA-18.2 / EEMUA 191)"
// After m8-lib.jsx. Exports SCENES_M8C6.

// ── El alarm flood ────────────────────────────────────────────────────────────
function S_Flood({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="El mayor problema del HMI industrial" y="9%" color={TL8.red} />
      <CapM8 start={s + 0.6} dur={2.2} size={46} weight={600} y="18%" width={1560}>El <span style={{ color: TL8.red }}>alarm flood</span>: cientos de alarmas a la vez → el operador no puede.</CapM8>
      <InfoCardM8 x={180} y={400} w={500} h={250} accent={TL8.red} title="Three Mile Island · 1979" sub="Más de 100 alarmas en los primeros minutos. El operador no pudo identificar la causa real." appear={s + 1.4} t={t} />
      <InfoCardM8 x={710} y={400} w={500} h={250} accent={TL8.red} title="Texas City · 2005" sub="15 muertes. Entre las causas: un sistema de alarmas deficiente que ocultó el problema." appear={s + 1.8} t={t} />
      <div style={{ position: 'absolute', left: 1240, top: 400, width: 500, height: 250 }}>
        {(() => { const ap = pop8(t, s + 2.2, 0.55, 20); return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, height: '100%', background: `linear-gradient(160deg, ${TL8.paper}, ${TL8.bg2})`, border: `1px solid ${TL8.steel}`, borderRadius: 12, padding: '26px 24px', boxShadow: TL8.shadow, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: MONO8, fontSize: 13, letterSpacing: '0.14em', color: TL8.steel, textTransform: 'uppercase' }}>Meta EEMUA 191</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '10px 0 6px' }}>
              <span style={{ fontFamily: DISP8, fontSize: 56, fontWeight: 700, color: TL8.steel }}>&lt; 1</span>
              <span style={{ fontFamily: MONO8, fontSize: 18, color: TL8.mut }}>alarma / 10 min</span>
            </div>
            <div style={{ fontFamily: DISP8, fontSize: 18, color: TL8.mut, lineHeight: 1.4 }}>por operador en operación normal. Muchas plantas tienen 10–20× más.</div>
          </div>
        ); })()}
      </div>
      <CapM8 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL8.mut} y="82%" width={1560}>Las normas <b style={{ color: TL8.ink }}>ISA-18.2</b> y <b style={{ color: TL8.ink }}>EEMUA 191</b> definen tasas aceptables, prioridades, enrutamiento y KPIs de alarmas.</CapM8>
    </SceneM8>
  );
}

// ── Alarmas analógicas HH/H/L/LL ──────────────────────────────────────────────
function S_Analog({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  // level animates and crosses HH near the end
  const lvl = 2.0 + 1.7 * clamp((Math.sin(lt * 0.5 - 1) + 1) / 2, 0, 1);
  const bands = [
    { y0: 3.8, y1: 4.0, c: TL8.red, name: 'HH', d: '> 3.8 m · Critical' },
    { y0: 3.5, y1: 3.8, c: '#ff8a3d', name: 'H', d: '> 3.5 m · High' },
    { y0: 0.5, y1: 3.5, c: 'rgba(150,168,196,0.12)', name: '', d: '' },
    { y0: 0.2, y1: 0.5, c: TL8.yellow, name: 'L', d: '< 0.5 m · Medium' },
    { y0: 0.0, y1: 0.2, c: TL8.red, name: 'LL', d: '< 0.2 m · Critical' },
  ];
  const H = 520, x0 = 560, top = 240, toY = (v) => top + H * (1 - v / 4);
  const alarmHH = lvl > 3.8;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Alarmas analógicas · 4 umbrales" y="8%" />
      <CapM8 start={s + 0.6} dur={2.0} size={42} weight={600} y="14%" width={1560}>Cada tag analógico tiene hasta cuatro alarmas.</CapM8>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* scale column */}
        <rect x={x0} y={top} width={120} height={H} rx="10" fill={TL8.bg2} stroke={TL8.lineS} strokeWidth="1.6" />
        {bands.map((b, i) => {
          const ya = toY(b.y1), yb = toY(b.y0);
          const ap = clamp((t - (s + 1.2 + i * 0.25)) / 0.4, 0, 1);
          return <g key={i} opacity={ap}><rect x={x0 + 2} y={ya} width={116} height={yb - ya} fill={b.c} opacity={b.name ? 0.3 : 1} />{b.name && <line x1={x0} y1={yb} x2={x0 + 120} y2={yb} stroke={b.c} strokeWidth="2.5" />}</g>;
        })}
        {/* level fill */}
        <rect x={x0 + 2} y={toY(lvl)} width={116} height={top + H - toY(lvl)} fill={alarmHH ? TL8.red : TL8.steel} opacity="0.5" />
        <line x1={x0 - 8} y1={toY(lvl)} x2={x0 + 128} y2={toY(lvl)} stroke={alarmHH ? TL8.red : TL8.steel} strokeWidth="4" />
        <text x={x0 - 20} y={toY(lvl) + 6} fill={alarmHH ? TL8.red : TL8.steel} fontFamily={DISP8} fontSize="28" fontWeight="700" textAnchor="end">{lvl.toFixed(1)}</text>
        {/* labels */}
        {bands.filter(b => b.name).map((b, i) => { const yy = (toY(b.y1) + toY(b.y0)) / 2; return <g key={i}><text x={x0 + 145} y={yy - 4} fill={b.c} fontFamily={MONO8} fontSize="20" fontWeight="700">{b.name}</text><text x={x0 + 145} y={yy + 18} fill={TL8.mut} fontFamily={MONO8} fontSize="14">{b.d}</text></g>; })}
      </svg>
      {alarmHH && (
        <div style={{ position: 'absolute', left: 1080, top: 300, width: 620 }}>
          <div style={{ background: 'rgba(255,77,99,0.12)', border: `2px solid ${TL8.red}`, borderRadius: 12, padding: '24px 28px', boxShadow: `0 0 28px rgba(255,77,99,0.3)` }}>
            <div style={{ fontFamily: MONO8, fontSize: 14, letterSpacing: '0.18em', color: TL8.red, fontWeight: 700 }}>● CRITICAL · {Math.sin(t * 5) > 0 ? 'ACTIVA' : ''}</div>
            <div style={{ fontFamily: DISP8, fontSize: 30, fontWeight: 700, color: TL8.ink, marginTop: 10 }}>NIVEL CRÍTICO ALTO T-101</div>
            <div style={{ fontFamily: DISP8, fontSize: 19, color: TL8.mut, marginTop: 6 }}>LT101 &gt; 3.8 m → la alarma HH se dispara.</div>
          </div>
        </div>
      )}
      <CapM8 start={s + 1.2} dur={dur - 1.5} size={23} weight={500} color={TL8.mut} y="90%" width={1560}>HH y LL → Critical · H y L → High/Medium. Cada una con su mensaje claro para el operador.</CapM8>
    </SceneM8>
  );
}

// ── Histéresis · chattering ───────────────────────────────────────────────────
function S_Hysteresis({ start, dur }) {
  const t = useTime(); const s = start;
  const N = 70;
  const sig = [];
  for (let i = 0; i < N; i++) sig.push(0.5 + 0.06 * Math.sin(i * 0.9) + (i > 30 && i < 45 ? 0.03 * Math.sin(i * 3) : 0));
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="La histéresis (deadband de alarma)" y="9%" color={TL8.honey} />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Sin histéresis, una alarma <span style={{ color: TL8.red }}>parpadea</span> sin parar.</CapM8>
      <TrendM8 x={150} y={300} w={920} h={300} t={t} appear={s + 1.3} title="Nivel oscilando junto al umbral H = 3.5 m" live={false}
        series={[{ color: TL8.steel, data: sig }]} />
      <InfoCardM8 x={1130} y={310} w={620} h={170} accent={TL8.red} title="Chattering" sub="La alarma se activa y desactiva decenas de veces → inunda el journal y agota al operador." appear={s + 2.2} t={t} />
      <InfoCardM8 x={1130} y={500} w={620} h={170} accent={TL8.grn} title="Histéresis = 0.1 m" sub="Activa al subir a 3.5 m · desactiva solo al bajar a 3.4 m. Una alarma limpia, una sola vez." appear={s + 2.7} t={t} />
    </SceneM8>
  );
}

// ── Ciclo de vida + prioridades ───────────────────────────────────────────────
function S_Priorities({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Prioridades de alarma en Ignition" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>La prioridad define color, sonido y urgencia.</CapM8>
      <TableM8 x={260} y={290} w={1400} t={t} appear={s + 1.2} accentCol={3}
        headers={['Prioridad', 'Color', 'Sonido', 'Uso']}
        colTemplate="1fr 1.2fr 1.2fr 1.4fr"
        rows={[
          ['Diagnostic', 'Blanco', 'Sin sonido', 'Información del sistema SCADA'],
          ['Low', 'Cian', 'Sin sonido', 'Información al operador'],
          ['Medium', 'Amarillo', 'Suave', 'Requiere atención próxima'],
          ['High', 'Naranja', 'Continuo', 'Requiere atención inmediata'],
          ['Critical', 'Rojo parpadeante', 'Urgente', 'Acción inmediata requerida'],
        ]} />
      <CapM8 start={s + 4.0} dur={dur - 4.3} size={23} weight={500} color={TL8.steelLt} y="86%" width={1560}>Ciclo de vida: Normal → Activa/No reconocida → Activa/Reconocida → Inactiva/Reconocida → Normal. El operador puede <b style={{ color: TL8.ink }}>silenciar (shelve)</b> con justificación auditable.</CapM8>
    </SceneM8>
  );
}

// ── Vista de alarmas ──────────────────────────────────────────────────────────
function S_AlarmView({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Vista de gestión de alarmas" y="9%" color={TL8.coral} />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Alarm Status Table: lo activo, ahora.</CapM8>
      <AlarmTableM8 x={310} y={300} w={1300} t={t} appear={s + 1.2}
        rows={[
          { pri: 'CRITICAL', tag: 'LT101.HH', msg: 'Nivel crítico alto T-101', time: '14:32:05', ack: false },
          { pri: 'HIGH', tag: 'FCV301', msg: 'Válvula de vapor en falla', time: '14:35:12', ack: true },
          { pri: 'MEDIUM', tag: 'PDT201.H', msg: 'ΔP de filtro elevado', time: '14:38:40', ack: false },
          { pri: 'LOW', tag: 'SIS.Info', msg: 'Cambio de turno registrado', time: '15:00:00', ack: true },
        ]} />
      <div style={{ position: 'absolute', left: 310, top: 660, display: 'flex', gap: 14 }}>
        {['Reconocer', 'Reconocer todas', 'Silenciar', 'Ver historial'].map((b, i) => { const ap = clamp((t - (s + 3.2 + i * 0.2)) / 0.4, 0, 1); return <div key={i} style={{ opacity: ap, padding: '12px 24px', borderRadius: 9, background: i === 0 ? TL8.coral : TL8.paper, border: `1px solid ${i === 0 ? TL8.coral : TL8.lineS}`, fontFamily: DISP8, fontSize: 16, fontWeight: 600, color: i === 0 ? '#2a0d05' : TL8.mut }}>{b}</div>; })}
      </div>
      <CapM8 start={s + 4.2} dur={dur - 4.5} size={22} weight={500} color={TL8.mut} y="90%" width={1560}>El Alarm Journal Table guarda el histórico completo: clave para investigar qué ocurrió durante un incidente.</CapM8>
    </SceneM8>
  );
}

const SCENES_M8C6 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={6} seccion="Alarmas" title="Sistema de alarmas en Ignition" dudur="18–20 min" objetivo="Configurar el sistema de alarmas según ISA-18.2 y EEMUA 191: alarmas analógicas y digitales, prioridad, histéresis y la vista de gestión de alarmas." />, dur: 7, label: 'Apertura' },
  { C: S_Flood, dur: 13, label: 'El alarm flood' },
  { C: S_Analog, dur: 15, label: 'Alarmas HH/H/L/LL' },
  { C: S_Hysteresis, dur: 13, label: 'Histéresis' },
  { C: S_Priorities, dur: 13, label: 'Prioridades' },
  { C: S_AlarmView, dur: 14, label: 'Vista de alarmas' },
  { C: (p) => <ClosingM8 {...p} line="Una buena alarma le dice al operador qué pasa, qué tan grave es y qué hacer. Demasiadas alarmas no dicen nada — solo ruido en una emergencia." activity="Configura el sistema de alarmas completo: HH/H/L/LL para las 4 variables analógicas, alarmas digitales de fallos, histéresis en todas, prioridades correctas y la Vista de Alarmas. Simula activaciones desde el PLC y verifica el comportamiento." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M8C6 = SCENES_M8C6;
