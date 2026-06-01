// scenes-b.jsx — Escenas 6-10. Loaded after scenes-a.jsx. Exports to window.

// ═══════════════════════ SCENE 6 — RUTA DE APRENDIZAJE ═══════════════════════
function Scene6({ start, dur }) {
  const t = useTime();
  const s = start;
  const mods = [
    'Fundamentos', 'Instrumentación', 'Sensores', 'Actuadores', 'Control', 'PLC',
    'Redes Industriales', 'SCADA', 'Seguridad', 'Industria 4.0', 'Proyecto Final',
  ];
  // serpentine layout: 6 top (L→R), 5 bottom (R→L)
  const topY = 470, botY = 770;
  const topX = [200, 510, 820, 1130, 1440, 1750];
  const botX = [1620, 1290, 960, 630, 300];
  const pts = [
    ...topX.map(x => ({ x, y: topY })),
    ...botX.map(x => ({ x, y: botY })),
  ];
  // cumulative lengths
  const segLen = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    segLen.push(l); total += l;
  }
  const cum = [0];
  for (let i = 0; i < segLen.length; i++) cum.push(cum[i] + segLen[i]);
  const drawStart = s + 1.6, drawDur = 13.5;
  const dp = clamp((t - drawStart) / drawDur, 0, 1);
  const drawn = dp * total;
  const pathD = 'M ' + pts.map(p => `${p.x} ${p.y}`).join(' L ');
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Escena 06 · Lo que aprenderás" y="9%" />
      <Cap start={s + 0.7} dur={3.2} size={48} weight={600} y="20%" width={1500}>
        De cero hasta automatizar una planta industrial completa.
      </Cap>
      {/* base + drawn path */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <path d={pathD} fill="none" stroke={T.line} strokeWidth="2" strokeDasharray="2 8" />
        <path d={pathD} fill="none" stroke={T.cyan} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={`${total} ${total}`} strokeDashoffset={(1 - dp) * total}
          style={{ filter: `drop-shadow(0 0 5px ${T.cyan})` }} />
      </svg>
      {/* stations */}
      {pts.map((p, i) => {
        const f = cum[i] / total;
        const lit = drawn >= cum[i] - 6;
        const litT = drawStart + f * drawDur;
        const e = clamp((t - litT) / 0.45, 0, 1);
        const isLast = i === pts.length - 1;
        const col = isLast ? T.amber : T.cyan;
        const labelAbove = p.y === topY;
        return (
          <div key={i}>
            <div style={{
              position: 'absolute', left: p.x, top: p.y, transform: `translate(-50%,-50%) scale(${0.6 + 0.4 * e})`,
              width: isLast ? 34 : 26, height: isLast ? 34 : 26, borderRadius: '50%',
              border: `2px solid ${lit ? col : T.dim}`,
              background: lit ? col : 'rgba(10,16,26,0.9)',
              boxShadow: lit ? `0 0 16px ${col}` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, fontWeight: 600,
              color: lit ? '#06121e' : T.dim, transition: 'none',
            }}>{i + 1}</div>
            <div style={{
              position: 'absolute', left: p.x, top: p.y + (labelAbove ? -64 : 48),
              transform: 'translateX(-50%)', opacity: e, textAlign: 'center', whiteSpace: 'nowrap',
              fontFamily: isLast ? DISP : 'IBM Plex Mono, monospace',
              fontSize: isLast ? 24 : 16, fontWeight: isLast ? 700 : 500,
              letterSpacing: isLast ? '-0.01em' : '0.02em',
              color: isLast ? T.amber : T.ink,
            }}>{mods[i]}</div>
          </div>
        );
      })}
      <Cap start={s + 16.4} dur={dur - 16.7} size={50} weight={600} y="93%" color={T.cyan} width={1500}>
        Once etapas. Un solo destino: dominar la planta.
      </Cap>
    </Scene>
  );
}

// ═══════════════════════ SCENE 7 — HERRAMIENTAS ═══════════════════════
function ToolChip({ name, cat, x, y, appear, t, accent }) {
  const lt = t - appear;
  const e = Easing.easeOutBack(clamp(lt / 0.5, 0, 1));
  const op = clamp(lt / 0.4, 0, 1);
  return (
    <div style={{
      position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${0.8 + 0.2 * e})`, opacity: op,
      borderRadius: 6, border: `1px solid ${accent}`, background: 'rgba(12,20,32,0.92)',
      padding: '16px 24px', textAlign: 'center', minWidth: 200,
      boxShadow: `0 0 24px rgba(40,140,200,0.12)`,
    }}>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.2em', color: accent, marginBottom: 6 }}>{cat}</div>
      <div style={{ fontFamily: DISP, fontSize: 26, fontWeight: 600, color: T.ink, letterSpacing: '-0.01em' }}>{name}</div>
    </div>
  );
}
function Scene7({ start, dur }) {
  const t = useTime();
  const s = start;
  const tools = [
    { name: 'Tinkercad', cat: 'CIRCUITOS', x: 430, y: 430, a: T.cyan },
    { name: 'Draw.io', cat: 'DIAGRAMAS', x: 960, y: 360, a: T.cyan },
    { name: 'TIA Portal', cat: 'PLC', x: 1490, y: 430, a: T.amber },
    { name: 'Factory IO', cat: 'PLANTA VIRTUAL', x: 470, y: 720, a: T.cyan },
    { name: 'Ignition', cat: 'SCADA', x: 1450, y: 720, a: T.cyan },
    { name: 'MATLAB Online', cat: 'ANÁLISIS', x: 960, y: 790, a: T.amber },
  ];
  // connection mesh between selected pairs
  const links = [[0, 1], [1, 2], [0, 3], [2, 4], [3, 5], [5, 4], [1, 5]];
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Escena 07 · Tus herramientas" y="11%" />
      <Cap start={s + 0.8} dur={2.6} size={48} weight={600} y="20%" width={1500}>
        Herramientas profesionales usadas en la industria real.
      </Cap>
      {links.map((lk, i) => {
        const a = tools[lk[0]], b = tools[lk[1]];
        return <DrawLine key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} start={s + 2.6 + i * 0.12} dur={0.6} color={T.cyanD} width={1.4} dash="2 7" glow={false} />;
      })}
      {tools.map((tl, i) => (
        <ToolChip key={i} {...tl} accent={tl.a} appear={s + 2.0 + i * 0.22} t={t} />
      ))}
      <Cap start={s + 7.0} dur={2.4} size={40} weight={500} color={T.mut} y="93%" width={1500}>
        Simularás, diseñarás, programarás y supervisarás.
      </Cap>
      <Cap start={s + 9.6} dur={dur - 9.9} size={50} weight={600} y="93%" color={T.cyan} width={1500}>
        Accesibles para empezar tu aprendizaje hoy.
      </Cap>
    </Scene>
  );
}

// ═══════════════════════ SCENE 8 — PROYECTO FINAL (P&ID) ═══════════════════════
function Scene8({ start, dur }) {
  const t = useTime();
  const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const flow = -(t * 38) % 26; // moving dashes
  const C = T.cyan, A = T.amber;
  // reveals
  const tanks = seg(1.2), pipes = seg(2.6), pumps = seg(4.0), sensors = seg(5.4), plc = seg(7.0), scada = seg(8.6);
  const callout = (txt, x, y, a, anchor = 'middle') => {
    const o = seg(a, 0.5);
    return (
      <text x={x} y={y} fill={a === 0 ? C : (txt === 'PLC' || txt === 'SCADA' ? C : C)} opacity={o}
        fontFamily="IBM Plex Mono, monospace" fontSize="17" letterSpacing="2" textAnchor={anchor}
        style={{ textTransform: 'uppercase' }}>{txt}</text>
    );
  };
  const Tank = (x, y, w, h, label, op) => (
    <g opacity={op}>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="rgba(20,40,64,0.4)" stroke={C} strokeWidth="2.4" />
      <rect x={x} y={y + h * 0.45} width={w} height={h * 0.55 - 6} rx="8" fill="rgba(40,120,180,0.28)" />
      <line x1={x} y1={y + h * 0.45} x2={x + w} y2={y + h * 0.45} stroke={C} strokeWidth="1.6" strokeDasharray="3 5" opacity="0.7" />
      <text x={x + w / 2} y={y - 14} fill={T.mut} fontFamily="IBM Plex Mono, monospace" fontSize="14" textAnchor="middle" letterSpacing="1">{label}</text>
    </g>
  );
  const Pump = (cx, cy, op) => (
    <g opacity={op}>
      <circle cx={cx} cy={cy} r="26" fill="rgba(20,40,64,0.7)" stroke={A} strokeWidth="2.4" />
      <path d={`M ${cx} ${cy - 14} A 14 14 0 1 1 ${cx - 14} ${cy}`} fill="none" stroke={A} strokeWidth="2.4" />
      <polygon points={`${cx - 14},${cy - 5} ${cx - 14},${cy + 5} ${cx - 6},${cy}`} fill={A} />
    </g>
  );
  const Sensor = (cx, cy, tag, op) => (
    <g opacity={op}>
      <line x1={cx} y1={cy} x2={cx} y2={cy + 70} stroke={C} strokeWidth="1.4" strokeDasharray="2 5" opacity="0.6" />
      <circle cx={cx} cy={cy} r="22" fill="rgba(10,18,30,0.95)" stroke={C} strokeWidth="2" />
      <circle cx={cx} cy={cy} r="22" fill="none" stroke={C} strokeWidth="2" opacity={0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 4 + cx))} />
      <text x={cx} y={cy + 5} fill={C} fontFamily="IBM Plex Mono, monospace" fontSize="14" textAnchor="middle" fontWeight="600">{tag}</text>
    </g>
  );
  // pipe path: TankA bottom → pumpP1 → up → TankB → pumpP2 → TankC
  const pipe = `M 330 760 L 330 840 L 470 840 L 470 760 M 470 840 L 760 840 L 760 760
                M 1000 760 L 1000 840 L 1140 840 L 1140 760 M 1140 840 L 1430 840 L 1430 760`;
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Escena 08 · Proyecto final" y="9%" />
      <Cap start={s + 0.6} dur={3.4} size={46} weight={600} y="20%" width={1600}>
        Al terminar: diseñar, programar y supervisar una planta.
      </Cap>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* pipes with flow */}
        <path d={pipe} fill="none" stroke="rgba(120,165,220,0.25)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity={pipes} />
        <path d={pipe} fill="none" stroke={C} strokeWidth="4" strokeLinecap="round" strokeDasharray="14 12" strokeDashoffset={flow} opacity={pipes * 0.95} style={{ filter: `drop-shadow(0 0 4px ${C})` }} />
        {/* tanks */}
        {Tank(230, 560, 200, 200, 'POZO', tanks)}
        {Tank(660, 540, 200, 220, 'REACTOR', tanks)}
        {Tank(1330, 560, 200, 200, 'CLARIFICADO', tanks)}
        {/* pumps */}
        {Pump(470, 840, pumps)}
        {Pump(1140, 840, pumps)}
        {/* sensors */}
        {Sensor(405, 540, 'LT', sensors)}
        {Sensor(620, 840, 'FT', sensors)}
        {Sensor(845, 520, 'LT', sensors)}
        {Sensor(1290, 840, 'PT', sensors)}
        {/* PLC */}
        <g opacity={plc}>
          <rect x="840" y="836" width="220" height="118" rx="8" fill="rgba(20,40,64,0.85)" stroke={C} strokeWidth="2.4" />
          <text x="950" y="892" fill={T.ink} fontFamily={DISP} fontSize="34" fontWeight="700" textAnchor="middle">PLC</text>
          <text x="950" y="922" fill={T.mut} fontFamily="IBM Plex Mono, monospace" fontSize="13" textAnchor="middle" letterSpacing="2">CONTROLADOR</text>
          {[875, 905, 935, 965, 995, 1025].map((x, i) => (
            <rect key={i} x={x} y="842" width="16" height="6" rx="2" fill={C} opacity={0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 5 + i))} />
          ))}
          {/* signal lines from sensors to PLC */}
          {[[405, 562], [620, 818], [845, 542], [1290, 818]].map((p, i) => (
            <line key={i} x1={p[0]} y1={p[1]} x2={950} y2={836} stroke={A} strokeWidth="1.2" strokeDasharray="2 6" opacity={plc * 0.5} />
          ))}
        </g>
        {/* SCADA */}
        <g opacity={scada}>
          <rect x="1500" y="210" width="320" height="210" rx="10" fill="rgba(10,18,30,0.95)" stroke={C} strokeWidth="2.4" />
          <rect x="1518" y="228" width="284" height="158" rx="4" fill="rgba(20,40,64,0.5)" />
          <polyline points="1530,360 1560,330 1590,345 1620,300 1660,320 1700,275 1740,300 1790,255"
            fill="none" stroke={C} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
            opacity={0.6 + 0.4 * Math.sin(t * 2.5)} />
          {[1540, 1580, 1620].map((x, i) => <circle key={i} cx={x} cy="248" r="4" fill={[C, A, C][i]} />)}
          <text x="1660" y="410" fill={T.mut} fontFamily="IBM Plex Mono, monospace" fontSize="13" textAnchor="middle" letterSpacing="2">SCADA · SUPERVISIÓN</text>
          <line x1="1660" y1="420" x2="1060" y2="850" stroke={C} strokeWidth="1.4" strokeDasharray="3 6" opacity={scada * 0.5} />
        </g>
        {/* callouts */}
        {callout('Tanques', 330, 482, 1.6)}
        {callout('Bombas', 470, 905, 4.2)}
        {callout('Sensores', 760, 470, 5.8)}
      </svg>
      <Cap start={s + 10.0} dur={2.8} size={46} weight={500} color={T.mut} y="95%" width={1600}>
        Una planta de tratamiento de agua, construida paso a paso.
      </Cap>
      <Cap start={s + 13.2} dur={dur - 13.5} size={52} weight={600} color={T.cyan} y="95%" width={1600}>
        Todo conectado, como en la industria real.
      </Cap>
    </Scene>
  );
}

// ═══════════════════════ SCENE 9 — MOTIVACIONAL ═══════════════════════
function Scene9({ start, dur }) {
  const t = useTime();
  const s = start;
  const lt = t - s;
  const tiles = [
    { l: 'JÓVENES ESTUDIANDO' }, { l: 'SALA DE CONTROL' }, { l: 'INDUSTRIA 4.0' }, { l: 'GEMELO DIGITAL' }, { l: 'IA INDUSTRIAL' },
  ];
  const zoom = 1.05 + 0.06 * clamp(lt / dur, 0, 1);
  return (
    <Scene start={start} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 16, padding: 40, transform: `scale(${zoom})`, transformOrigin: 'center', alignItems: 'center', justifyContent: 'center' }}>
        {tiles.map((tl, i) => {
          const { op, sc } = pop(t, s + 0.15 + i * 0.12, 0.6, 0);
          return <div key={i} style={{ opacity: op * 0.85, transform: `scale(${sc})`, flex: 1 }}><Slot label={tl.l} w={340} h={620} accent={i % 2 ? T.amber : T.cyan} /></div>;
        })}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,11,18,0.5) 0%, rgba(7,11,18,0.35) 40%, rgba(7,11,18,0.9) 100%)' }} />
      <Kicker start={s + 0.4} dur={dur - 0.6} text="Escena 09 · Tu momento" y="14%" />
      <Cap start={s + 1.0} dur={2.6} size={50} weight={500} color={T.mut} y="46%" width={1400}>
        La automatización es una de las áreas de mayor crecimiento del mundo.
      </Cap>
      <Cap start={s + 3.8} dur={2.6} size={50} weight={500} color={T.mut} y="46%" width={1400}>
        Las empresas buscan a quien conecte el mundo físico con la tecnología.
      </Cap>
      <Cap start={s + 6.6} dur={2.0} size={56} weight={600} y="46%" width={1400}>
        No importa si hoy empiezas desde cero.
      </Cap>
      <Cap start={s + 8.8} dur={2.8} size={88} weight={700} color={T.amber} y="50%" width={1500}>
        Lo importante es dar el primer paso.
      </Cap>
      <Cap start={s + 11.8} dur={dur - 12.1} size={54} weight={600} y="62%">
        Y ese paso comienza ahora.
      </Cap>
    </Scene>
  );
}

// ═══════════════════════ SCENE 10 — CIERRE ═══════════════════════
function Skyline({ t, s }) {
  // geometric silhouette: tanks, towers, chimneys along the bottom; lights turn on
  const shapes = [
    { x: 120, w: 90, h: 150, r: 8 }, { x: 230, w: 60, h: 250, r: 30 }, { x: 310, w: 140, h: 120, r: 6 },
    { x: 470, w: 70, h: 200, r: 35 }, { x: 560, w: 110, h: 170, r: 6 }, { x: 700, w: 50, h: 300, r: 6 },
    { x: 770, w: 130, h: 140, r: 6 }, { x: 920, w: 80, h: 220, r: 40 }, { x: 1020, w: 120, h: 160, r: 6 },
    { x: 1160, w: 60, h: 270, r: 30 }, { x: 1240, w: 150, h: 130, r: 6 }, { x: 1410, w: 75, h: 210, r: 38 },
    { x: 1500, w: 120, h: 175, r: 6 }, { x: 1640, w: 55, h: 290, r: 6 }, { x: 1710, w: 110, h: 150, r: 6 },
  ];
  const baseY = 1080;
  return (
    <svg style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: '100%', overflow: 'visible' }}>
      {shapes.map((sh, i) => {
        const op = clamp((t - (s + 0.5 + i * 0.05)) / 0.5, 0, 1);
        const lights = [];
        const cols = Math.floor(sh.w / 26);
        const rows = Math.floor(sh.h / 30);
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          const li = (i * 7 + r * 3 + c) % 9;
          const on = t > s + 2.2 + li * 0.22;
          const lo = on ? (0.5 + 0.5 * Math.sin(t * 3 + i + r + c)) : 0;
          lights.push(<rect key={r + '-' + c} x={sh.x + 8 + c * 26} y={baseY - sh.h + 14 + r * 30} width="10" height="12" rx="1.5" fill={li % 5 === 0 ? T.amber : T.cyan} opacity={lo * 0.9} />);
        }
        return (
          <g key={i} opacity={op}>
            <rect x={sh.x} y={baseY - sh.h} width={sh.w} height={sh.h} rx={sh.r} fill="#0a1018" stroke="rgba(120,165,220,0.25)" strokeWidth="1.5" />
            {lights}
          </g>
        );
      })}
    </svg>
  );
}
function Scene10({ start, dur }) {
  const t = useTime();
  const s = start;
  const words = ['Aprender', 'Construir', 'Simular', 'Programar'];
  return (
    <Scene start={start} dur={dur}>
      <Skyline t={t} s={s} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 70% at 50% 38%, rgba(7,11,18,0.4) 30%, rgba(7,11,18,0.86) 100%)' }} />
      {/* logo slot */}
      {(() => {
        const { op, sc } = pop(t, s + 0.6, 0.7, 0);
        return (
          <div style={{ position: 'absolute', left: '50%', top: '20%', transform: `translate(-50%,-50%) scale(${sc})`, opacity: op }}>
            <Slot label="Logo del curso" w={130} h={130} accent={T.cyan} />
          </div>
        );
      })()}
      <Cap start={s + 1.4} dur={3.2} size={26} mono weight={500} color={T.cyan} y="33%" width={1500} ls="0.16em" upper>
        Curso Completo de Instrumentación y Automatización
      </Cap>
      <Cap start={s + 1.9} dur={2.8} size={88} weight={700} y="44%">Bienvenido.</Cap>
      {/* verbs appear left-to-right, then clear together before the finale */}
      {words.map((w, i) => {
        const a = s + 5.0 + i * 0.55;
        const out = s + 8.6;
        if (t < a - 0.02 || t > out + 0.5) return null;
        const op = clamp((t - a) / 0.4, 0, 1) * clamp((out + 0.45 - t) / 0.45, 0, 1);
        const e = Easing.easeOutBack(clamp((t - a) / 0.5, 0, 1));
        return (
          <div key={i} style={{
            position: 'absolute', left: `${22 + i * 16}%`, top: '50%',
            transform: `translate(-50%,-50%) scale(${0.8 + 0.2 * e})`, opacity: op,
            fontFamily: DISP, fontSize: 44, fontWeight: 600, color: i % 2 ? T.amber : T.ink, letterSpacing: '-0.01em',
          }}>{w}.</div>
        );
      })}
      <Cap start={s + 9.6} dur={dur - 9.9} size={120} weight={700} color={T.cyan} y="50%">
        Comencemos.
      </Cap>
    </Scene>
  );
}

Object.assign(window, { Scene6, Scene7, Scene8, Scene9, Scene10 });
