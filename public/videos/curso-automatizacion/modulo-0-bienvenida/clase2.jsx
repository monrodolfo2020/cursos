// clase2.jsx — "¿Qué es la automatización industrial y qué no es?"
// After clase-lib.jsx. Exports SCENES_C2 + meta to window.

// 3 ramas que se confunden
function S2_Ramas({ start, dur }) {
  const t = useTime(); const s = start;
  const cards = [
    { no: 1, Icon: IcoCPU, c: T.cyan, title: 'Automatización industrial', sub: 'Controla procesos físicos: temperatura, presión, nivel, caudal.', tag: 'ESTE CURSO', x: 175 },
    { no: 2, Icon: IcoRobot, c: T.mut, title: 'Robótica industrial', sub: 'Movimiento mecánico programado: brazos robóticos, AGVs.', x: 780 },
    { no: 3, Icon: IcoChip, c: T.mut, title: 'Electrónica embebida / IoT', sub: 'Microcontroladores: Arduino, Raspberry Pi, sensores conectados.', x: 1385 },
  ];
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Tres ramas que se confunden" y="12%" />
      <Cap start={s + 0.9} dur={2.6} size={52} weight={500} color={T.mut} y="23%" width={1500}>
        No todo lo que parece automatización lo es.
      </Cap>
      {cards.map((c, i) => (
        <div key={i}>
          <InfoCard x={c.x} y={360} w={360} h={320} no={c.no} Icon={c.Icon} iconColor={c.c} title={c.title} sub={c.sub} appear={s + 2.2 + i * 0.5} t={t} />
          {c.tag && (() => { const p = pop(t, s + 3.0, 0.5, 0); return (
            <div style={{ position: 'absolute', left: c.x + 16, top: 336, opacity: p.op, transform: `scale(${p.sc})`, transformOrigin: 'left center', fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', color: '#0a121e', background: T.amber, padding: '7px 12px', borderRadius: 3 }}>★ {c.tag}</div>
          ); })()}
        </div>
      ))}
      <Cap start={s + 5.2} dur={dur - 5.5} size={40} weight={500} y="76%" color={T.ink} width={1500}>
        Este curso se enfoca en el <span style={{ color: T.cyan, fontWeight: 700 }}>control de procesos</span> — el corazón de la industria.
      </Cap>
    </Scene>
  );
}

// 4 pilares
function Pillar2({ no, title, sub, Icon, iconColor, x, appear, t }) {
  const { op, sc, ty } = pop(t, appear, 0.55, 22);
  return (
    <div style={{ position: 'absolute', left: x, top: 380, width: 332, height: 360, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 6, border: `1px solid ${T.lineS}`, background: 'linear-gradient(180deg, rgba(20,34,54,0.65), rgba(12,20,32,0.5))', padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: '0.24em', color: T.dim }}>0{no}</div>
        <div><Icon c={iconColor} t={t} /></div>
        <div style={{ fontFamily: DISP, fontSize: 40, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ fontFamily: DISP, fontSize: 20, fontWeight: 400, color: T.mut, lineHeight: 1.35 }}>{sub}</div>
        <Brackets color={iconColor} size={14} thick={1.5} inset={-1} />
      </div>
    </div>
  );
}
function S2_Pilares({ start, dur }) {
  const t = useTime(); const s = start;
  const xs = [200, 590, 980, 1370];
  const aps = [s + 2.6, s + 4.0, s + 5.4, s + 6.8];
  const cy = 560;
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="El motor de todo sistema" y="13%" />
      <Cap start={s + 0.8} dur={1.9} size={60} weight={600} y="24%" width={1500}>Los 4 pilares de la automatización.</Cap>
      {[0, 1, 2].map(i => {
        const ax = xs[i] + 332, bx = xs[i + 1];
        const show = t > aps[i + 1] - 0.2; const e = clamp((t - (aps[i + 1] - 0.2)) / 0.5, 0, 1);
        return show ? (
          <svg key={i} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <line x1={ax + 4} y1={cy} x2={ax + 4 + (bx - ax - 8) * e} y2={cy} stroke={T.cyan} strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" opacity="0.8" />
            <polygon points={`${bx - 10},${cy - 6} ${bx - 2},${cy} ${bx - 10},${cy + 6}`} fill={T.cyan} opacity={e} />
          </svg>
        ) : null;
      })}
      <Pillar2 no={1} title="Medir" sub="Sensores capturan la variable del proceso." Icon={IcoSensor} iconColor={T.cyan} x={xs[0]} appear={aps[0]} t={t} />
      <Pillar2 no={2} title="Decidir" sub="El controlador analiza y calcula." Icon={IcoCPU} iconColor={T.cyan} x={xs[1]} appear={aps[1]} t={t} />
      <Pillar2 no={3} title="Actuar" sub="Válvulas y motores ejecutan la acción." Icon={IcoValve} iconColor={T.amber} x={xs[2]} appear={aps[2]} t={t} />
      <Pillar2 no={4} title="Supervisar" sub="El operador vigila desde el SCADA." Icon={IcoMonitor} iconColor={T.cyan} x={xs[3]} appear={aps[3]} t={t} />
      <Cap start={s + 8.4} dur={dur - 8.7} size={34} weight={500} color={T.mut} y="88%" width={1500}>
        Medir → Decidir → Actuar → Supervisar. Un ciclo que nunca se detiene.
      </Cap>
    </Scene>
  );
}

// Grados de automatización
function S2_Grados({ start, dur }) {
  const t = useTime(); const s = start;
  const items = [
    { k: 'Parcial', d: 'Algunas tareas automáticas, otras manuales.', fill: 0.4 },
    { k: 'Total', d: 'El proceso completo opera sin intervención.', fill: 1.0 },
    { k: 'Flexible', d: 'Se reconfigura para distintos productos.', fill: 0.7 },
  ];
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="No es todo o nada" y="16%" />
      <Cap start={s + 0.8} dur={2.2} size={56} weight={600} y="27%" width={1500}>Tres grados de automatización.</Cap>
      <div style={{ position: 'absolute', left: 0, right: 0, top: '52%', transform: 'translateY(-50%)', display: 'flex', gap: 40, justifyContent: 'center' }}>
        {items.map((it, i) => {
          const p = pop(t, s + 2.6 + i * 0.6, 0.6, 24);
          const fillE = clamp((t - (s + 3.0 + i * 0.6)) / 0.9, 0, 1) * it.fill;
          return (
            <div key={i} style={{ width: 420, opacity: p.op, transform: `translateY(${p.ty}px) scale(${p.sc})` }}>
              <div style={{ position: 'relative', height: 220, borderRadius: 6, border: `1px solid ${T.lineS}`, overflow: 'hidden', background: 'rgba(12,20,32,0.5)' }}>
                <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: `${fillE * 100}%`, background: `linear-gradient(180deg, ${i === 1 ? T.amber : T.cyan}33, ${i === 1 ? T.amber : T.cyan}10)`, borderTop: `2px solid ${i === 1 ? T.amber : T.cyan}` }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISP, fontSize: 46, fontWeight: 700, color: T.ink }}>{it.k}</div>
              </div>
              <div style={{ marginTop: 16, fontFamily: DISP, fontSize: 21, color: T.mut, textAlign: 'center', lineHeight: 1.35 }}>{it.d}</div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
}

// Mitos (strike mechanic)
function MitoLine({ text, verdict, start, t }) {
  const lt = t - start;
  if (lt < -0.02 || lt > 4.6) return null;
  const inE = Easing.easeOutCubic(clamp(lt / 0.6, 0, 1));
  const strike = clamp((lt - 1.8) / 0.6, 0, 1);
  const vAppear = clamp((lt - 2.6) / 0.5, 0, 1);
  const out = clamp((lt - 3.6) / 1.0, 0, 1);
  const op = inE * (1 - out);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: '44%', transform: `translateY(${-out * 26}px)`, opacity: op, textAlign: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block', fontFamily: DISP, fontSize: 70, fontWeight: 500, fontStyle: 'italic', color: T.mut }}>
        «{text}»
        <span style={{ position: 'absolute', left: '-2%', top: '54%', width: `${strike * 104}%`, height: 4, background: T.red, boxShadow: `0 0 10px ${T.red}` }} />
      </div>
      <div style={{ marginTop: 30, opacity: vAppear, fontFamily: DISP, fontSize: 36, fontWeight: 600, color: T.cyan }}>{verdict}</div>
    </div>
  );
}
function S2_Mitos({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Mitos, con honestidad" y="13%" />
      <MitoLine text="La automatización quita empleos" verdict="Transforma el trabajo: del esfuerzo manual a la supervisión inteligente." start={s + 1.2} t={t} />
      <MitoLine text="Es solo para grandes empresas" verdict="Hoy existen soluciones accesibles para plantas de cualquier tamaño." start={s + 6.0} t={t} />
      <MitoLine text="Es demasiado cara" verdict="El retorno llega en eficiencia, seguridad y calidad." start={s + 10.8} t={t} />
    </Scene>
  );
}

const SCENES_C2 = [
  { C: (p) => <TitleCard {...p} claseNo={2} title="¿Qué es la automatización industrial y qué no es?" dudur="15–18 min" objetivo="Diferenciar automatización, robótica y control de procesos — sin confundirlos nunca más." />, dur: 7, label: 'Apertura' },
  { C: S2_Ramas, dur: 11, label: 'Tres ramas' },
  { C: S2_Pilares, dur: 13, label: 'Los 4 pilares' },
  { C: S2_Grados, dur: 10, label: 'Grados' },
  { C: S2_Mitos, dur: 16, label: 'Mitos' },
  { C: (p) => <Closing {...p} line="La automatización no reemplaza al humano: lo eleva a supervisor de sistemas inteligentes." activity="Investiga un caso real: ¿la automatización creó o destruyó empleos? Comparte tu opinión en el foro." />, dur: 9, label: 'Cierre' },
];
window.SCENES_C2 = SCENES_C2;
