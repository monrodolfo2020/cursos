// scenes-a.jsx — Escenas 1-5. Loaded after video-lib.jsx. Exports to window.

// entry helper: returns {op, sc, ty} for an element appearing at `appear`
function pop(t, appear, d = 0.5, rise = 18) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.92, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  const eb = Easing.easeOutBack(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.92 + 0.08 * eb, ty: (1 - e) * rise };
}

// ── small geometric pictograms ───────────────────────────────────────────────
function IconSensor({ c = T.cyan, t = 0 }) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 3);
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="40" r="6" fill={c} />
      {[14, 22, 30].map((r, i) => (
        <path key={i} d={`M ${32 - r} 40 A ${r} ${r} 0 0 1 ${32 + r} 40`} stroke={c} strokeWidth="2.4"
          opacity={0.85 - i * 0.18 + pulse * 0.15} fill="none" strokeLinecap="round" />
      ))}
    </svg>
  );
}
function IconCPU({ c = T.cyan }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="20" y="20" width="24" height="24" rx="3" stroke={c} strokeWidth="2.6" />
      <rect x="28" y="28" width="8" height="8" rx="1.5" fill={c} />
      {[26, 32, 38].map((p, i) => (<g key={i}>
        <line x1={p} y1="14" x2={p} y2="20" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
        <line x1={p} y1="44" x2={p} y2="50" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
        <line x1="14" y1={p} x2="20" y2={p} stroke={c} strokeWidth="2.4" strokeLinecap="round" />
        <line x1="44" y1={p} x2="50" y2={p} stroke={c} strokeWidth="2.4" strokeLinecap="round" />
      </g>))}
    </svg>
  );
}
function IconValve({ c = T.amber, t = 0 }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <line x1="8" y1="32" x2="24" y2="32" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="40" y1="32" x2="56" y2="32" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24 22 L40 42 M40 22 L24 42 Z" stroke={c} strokeWidth="2.6" fill="none" strokeLinejoin="round" />
      <line x1="24" y1="22" x2="24" y2="42" stroke={c} strokeWidth="2.6" />
      <line x1="40" y1="22" x2="40" y2="42" stroke={c} strokeWidth="2.6" />
      <line x1="32" y1="32" x2="32" y2="16" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
      <rect x="26" y="11" width="12" height="6" rx="1.5" fill={c} />
    </svg>
  );
}
function IconMonitor({ c = T.cyan, t = 0 }) {
  const b = 0.6 + 0.4 * Math.sin(t * 2.4);
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="12" y="14" width="40" height="28" rx="3" stroke={c} strokeWidth="2.6" />
      <polyline points="18,34 26,28 32,32 40,22 46,26" stroke={c} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={b} />
      <line x1="26" y1="42" x2="26" y2="48" stroke={c} strokeWidth="2.6" />
      <line x1="38" y1="42" x2="38" y2="48" stroke={c} strokeWidth="2.6" />
      <line x1="20" y1="48" x2="44" y2="48" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

// ═══════════════════════ SCENE 1 — APERTURA ═══════════════════════
function Scene1({ start, dur }) {
  const t = useTime();
  const s = start;
  const tiles = [
    { l: 'REFINERÍA', x: 0, y: 0 }, { l: 'PLANTA DE AGUA', x: 1, y: 0 }, { l: 'LÍNEA DE PRODUCCIÓN', x: 2, y: 0 },
    { l: 'ROBOT INDUSTRIAL', x: 0, y: 1 }, { l: 'SALA DE CONTROL', x: 1, y: 1 }, { l: 'PANTALLA SCADA', x: 2, y: 1 },
  ];
  const lt = t - s;
  const gridZoom = 1 + 0.07 * clamp(lt / dur, 0, 1);
  const cw = 500, ch = 320, gap = 20;
  const gw = cw * 3 + gap * 2, gh = ch * 2 + gap;
  return (
    <Scene start={start} dur={dur}>
      {/* montage mosaic */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: gw, height: gh, transform: `scale(${gridZoom})`, transformOrigin: 'center' }}>
          {tiles.map((tl, i) => {
            const a = s + 0.15 + i * 0.13;
            const { op, sc } = pop(t, a, 0.6, 0);
            return (
              <div key={i} style={{
                position: 'absolute', left: tl.x * (cw + gap), top: tl.y * (ch + gap),
                opacity: op * 0.9, transform: `scale(${sc})`,
              }}>
                <Slot label={tl.l} tag={`CH·0${i + 1}`} w={cw} h={ch} accent={i % 4 === 2 ? T.amber : T.cyan} />
              </div>
            );
          })}
        </div>
      </div>
      {/* darkening scrim for legibility */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(7,11,18,0.55) 30%, rgba(7,11,18,0.88) 100%)' }} />

      <Kicker start={s + 0.4} dur={dur - 0.6} text="Módulo 00 · Bienvenida" y="16%" />

      <Cap start={s + 1.0} dur={2.4} size={46} weight={500} color={T.mut} width={1200}>
        Cada día usas cientos de productos sin pensar cómo llegaron a ti.
      </Cap>
      <Cap start={s + 3.5} dur={1.5} size={70} y="50%">El agua que bebes.</Cap>
      <Cap start={s + 5.0} dur={1.5} size={70} y="50%">La energía de tu hogar.</Cap>
      <Cap start={s + 6.5} dur={1.5} size={70} y="50%">Los medicamentos que te cuidan.</Cap>
      <Cap start={s + 8.0} dur={1.6} size={70} y="50%">Los alimentos que consumes.</Cap>
      <Cap start={s + 9.9} dur={2.4} size={52} weight={500} color={T.mut} width={1150}>
        Detrás de todo existe un mundo invisible que mantiene viva nuestra sociedad.
      </Cap>
      <Cap start={s + 12.6} dur={2.9} size={104} weight={700} color={T.cyan} y="48%">
        La industria de procesos.
      </Cap>
      <Cap start={s + 15.6} dur={dur - 15.8} size={56} weight={500} y="62%">Y hoy entras en ella.</Cap>
    </Scene>
  );
}

// ═══════════════════════ SCENE 2 — ¿POR QUÉ IMPORTA? ═══════════════════════
function Side({ side, label, color, items, slotLabel, t, appear }) {
  const left = side === 'L';
  const { op, ty } = pop(t, appear, 0.6, 24);
  return (
    <div style={{
      position: 'absolute', top: 110, bottom: 200, width: 740,
      left: left ? 130 : 'auto', right: left ? 'auto' : 130,
      opacity: op, transform: `translateY(${ty}px)`,
      display: 'flex', flexDirection: 'column', gap: 22,
    }}>
      <div style={{ fontFamily: MONO, fontSize: 16, letterSpacing: '0.26em', color, textTransform: 'uppercase', display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ width: 9, height: 9, borderRadius: 9, background: color, boxShadow: `0 0 10px ${color}` }} />
        {label}
      </div>
      <Slot label={slotLabel} w={740} h={300} accent={color} fill={left ? 'repeating-linear-gradient(125deg,#1a1216 0 11px,#140e10 11px 22px)' : undefined} />
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {items.map((it, i) => {
          const ci = pop(t, appear + 0.4 + i * 0.18, 0.4, 8);
          return (
            <span key={i} style={{
              opacity: ci.op, transform: `translateY(${ci.ty}px)`,
              fontFamily: MONO, fontSize: 15, letterSpacing: '0.08em', color: T.ink,
              padding: '10px 16px', border: `1px solid ${color}`, borderRadius: 3,
              background: 'rgba(10,16,26,0.6)',
            }}>{it}</span>
          );
        })}
      </div>
    </div>
  );
}
function Scene2({ start, dur }) {
  const t = useTime();
  const s = start;
  const lt = t - s;
  // divider sweep position
  const sweep = clamp((lt - 0.6) / 1.0, 0, 1);
  const dx = 960;
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Escena 02 · El porqué" y="9%" />
      <Side side="L" label="Antes — Manual" color={T.red} slotLabel="Operador en tareas manuales"
        items={['ERRORES', 'RETRASOS', 'INCONSISTENCIA']} t={t} appear={s + 1.4} />
      <Side side="R" label="Hoy — Automatizado" color={T.cyan} slotLabel="Sensores · PLC · Supervisión"
        items={['PRECISIÓN', 'SEGURIDAD', 'EFICIENCIA']} t={t} appear={s + 2.2} />
      {/* divider */}
      <div style={{
        position: 'absolute', left: dx - 1, top: 90, width: 2, height: `${sweep * (1080 - 290)}px`,
        background: `linear-gradient(${T.cyan}, transparent)`, boxShadow: `0 0 12px ${T.cyan}`, opacity: 0.8,
      }} />
      <Cap start={s + 6.0} dur={2.2} size={46} weight={500} color={T.mut} y="84%" width={1300}>
        Los procesos crecieron. La producción aumentó. La precisión se volvió crítica.
      </Cap>
      <Cap start={s + 8.4} dur={2.4} size={58} y="84%" width={1300}>
        La automatización nació para resolver ese desafío.
      </Cap>
      <Cap start={s + 11.0} dur={dur - 11.4} size={62} weight={600} y="84%" color={T.cyan} width={1300}>
        Más producción · Más seguridad · Más calidad.
      </Cap>
    </Scene>
  );
}

// ═══════════════════════ SCENE 3 — CUATRO PILARES ═══════════════════════
function Pillar({ no, title, sub, Icon, iconColor, x, appear, t, last }) {
  const { op, sc, ty } = pop(t, appear, 0.55, 22);
  const w = 332, h = 340;
  return (
    <div style={{
      position: 'absolute', left: x, top: 400, width: w, height: h,
      opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center top',
    }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%', borderRadius: 6,
        border: `1px solid ${T.lineS}`, background: 'linear-gradient(180deg, rgba(20,34,54,0.65), rgba(12,20,32,0.5))',
        padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 14, backdropFilter: 'blur(2px)',
      }}>
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: '0.24em', color: T.dim }}>0{no}</div>
        <div style={{ marginTop: 4 }}><Icon c={iconColor} t={t} /></div>
        <div style={{ fontFamily: DISP, fontSize: 38, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ fontFamily: DISP, fontSize: 20, fontWeight: 400, color: T.mut, lineHeight: 1.35 }}>{sub}</div>
        <Brackets color={iconColor} size={14} thick={1.5} inset={-1} />
      </div>
    </div>
  );
}
function Scene3({ start, dur }) {
  const t = useTime();
  const s = start;
  const xs = [200, 590, 980, 1370];
  const appears = [s + 3.0, s + 5.4, s + 7.8, s + 10.2];
  const cy = 570;
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.4} dur={dur - 0.6} text="Escena 03 · ¿Qué es?" y="13%" />
      <Cap start={s + 0.9} dur={2.0} size={62} weight={600} y="25%" width={1500}>
        Que un proceso opere por sí mismo.
      </Cap>
      <Cap start={s + 2.4} dur={dur - 2.6} size={28} weight={500} color={T.mut} y="35%">
        Cuatro pilares sostienen todo sistema automatizado
      </Cap>
      {/* connecting arrows between pillars */}
      {[0, 1, 2].map(i => {
        const ax = xs[i] + 332, bx = xs[i + 1];
        const show = t > appears[i + 1] - 0.2;
        const e = clamp((t - (appears[i + 1] - 0.2)) / 0.5, 0, 1);
        return show ? (
          <svg key={i} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <line x1={ax + 4} y1={cy} x2={ax + 4 + (bx - ax - 8) * e} y2={cy} stroke={T.cyan} strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" opacity="0.8" />
            <polygon points={`${bx - 10},${cy - 6} ${bx - 2},${cy} ${bx - 10},${cy + 6}`} fill={T.cyan} opacity={e} />
          </svg>
        ) : null;
      })}
      <Pillar no={1} title="Medir" sub="Sensores capturan información del proceso." Icon={IconSensor} iconColor={T.cyan} x={xs[0]} appear={appears[0]} t={t} />
      <Pillar no={2} title="Decidir" sub="Un controlador analiza los datos." Icon={IconCPU} iconColor={T.cyan} x={xs[1]} appear={appears[1]} t={t} />
      <Pillar no={3} title="Actuar" sub="Válvulas, motores y bombas ejecutan." Icon={IconValve} iconColor={T.amber} x={xs[2]} appear={appears[2]} t={t} />
      <Pillar no={4} title="Supervisar" sub="Operadores monitorean desde SCADA." Icon={IconMonitor} iconColor={T.cyan} x={xs[3]} appear={appears[3]} t={t} />
      <Cap start={s + 13.2} dur={dur - 13.5} size={50} weight={600} y="86%" color={T.cyan} width={1500}>
        La columna vertebral de la industria moderna.
      </Cap>
    </Scene>
  );
}

// ═══════════════════════ SCENE 4 — INDUSTRIAS ═══════════════════════
function Scene4({ start, dur }) {
  const t = useTime();
  const s = start;
  const cx = 960, cy = 540, R = 360;
  const inds = ['Petróleo y Gas', 'Alimentos y Bebidas', 'Agua Potable', 'Minería', 'Farmacéutica', 'Energía Eléctrica', 'Papel y Celulosa'];
  const n = inds.length;
  const nodes = inds.map((name, i) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { name, x: cx + Math.cos(ang) * R, y: cy + Math.sin(ang) * R, ang };
  });
  const centerPop = pop(t, s + 0.6, 0.6, 0);
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Escena 04 · Dónde vive" y="9%" />
      {/* radial connectors */}
      {nodes.map((nd, i) => (
        <DrawLine key={'l' + i} x1={cx} y1={cy} x2={nd.x} y2={nd.y} start={s + 1.4 + i * 0.18} dur={0.6} color={i % 3 === 1 ? T.amber : T.cyanD} width={1.6} dash="2 6" glow={false} />
      ))}
      {/* center hub */}
      <div style={{
        position: 'absolute', left: cx, top: cy, transform: `translate(-50%,-50%) scale(${centerPop.sc})`, opacity: centerPop.op,
        width: 220, height: 220, borderRadius: '50%', border: `1.5px solid ${T.cyan}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        background: 'radial-gradient(circle, rgba(20,40,64,0.85), rgba(10,16,26,0.6))',
        boxShadow: `0 0 40px rgba(40,140,200,0.25)`,
      }}>
        <div style={{ fontFamily: DISP, fontSize: 26, fontWeight: 700, color: T.ink, lineHeight: 1.1 }}>Automati&shy;zación</div>
      </div>
      {/* industry chips */}
      {nodes.map((nd, i) => {
        const { op, sc } = pop(t, s + 1.7 + i * 0.18, 0.5, 0);
        return (
          <div key={'c' + i} style={{
            position: 'absolute', left: nd.x, top: nd.y, transform: `translate(-50%,-50%) scale(${sc})`, opacity: op,
            fontFamily: MONO, fontSize: 16, letterSpacing: '0.04em', color: T.ink, whiteSpace: 'nowrap',
            padding: '12px 18px', borderRadius: 3, border: `1px solid ${T.lineS}`,
            background: 'rgba(10,18,30,0.85)',
          }}>
            <span style={{ color: i % 3 === 1 ? T.amber : T.cyan, marginRight: 8 }}>◦</span>{nd.name}
          </div>
        );
      })}
      <Cap start={s + 8.6} dur={2.2} size={48} weight={500} color={T.mut} y="93%" width={1400}>
        Está presente en prácticamente todas las industrias.
      </Cap>
      <Cap start={s + 11.0} dur={dur - 11.3} size={52} weight={600} y="93%" color={T.cyan} width={1500}>
        Donde haya un proceso que controlar, hay algo que automatizar.
      </Cap>
    </Scene>
  );
}

// ═══════════════════════ SCENE 5 — PROFESIONALES ═══════════════════════
function RoleCard({ tag, role, desc, x, y, appear, t, accent }) {
  const { op, sc, ty } = pop(t, appear, 0.5, 20);
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: 470, height: 168,
      opacity: op, transform: `translateY(${ty}px) scale(${sc})`,
      borderRadius: 6, border: `1px solid ${T.lineS}`, background: 'linear-gradient(180deg, rgba(20,34,54,0.6), rgba(12,20,32,0.45))',
      padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center',
    }}>
      <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em', color: accent }}>{tag}</div>
      <div style={{ fontFamily: DISP, fontSize: 30, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{role}</div>
      <div style={{ fontFamily: DISP, fontSize: 18, fontWeight: 400, color: T.mut, lineHeight: 1.3 }}>{desc}</div>
      <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 3, background: accent, borderRadius: 3 }} />
    </div>
  );
}
function Scene5({ start, dur }) {
  const t = useTime();
  const s = start;
  const roles = [
    { tag: 'CAMPO', role: 'Operador', desc: 'Supervisa la operación día a día.', a: T.cyan },
    { tag: 'INSTRUMENTACIÓN', role: 'Instrumentista', desc: 'Mantiene sensores y transmisores.', a: T.cyan },
    { tag: 'ENERGÍA', role: 'Electricista industrial', desc: 'Garantiza la energía de la planta.', a: T.amber },
    { tag: 'PROCESOS', role: 'Ingeniero de procesos', desc: 'Diseña cómo opera la planta.', a: T.cyan },
    { tag: 'CONTROL', role: 'Ing. de automatización', desc: 'Crea la inteligencia que controla todo.', a: T.amber },
    { tag: 'SUPERVISIÓN', role: 'Operador SCADA', desc: 'Monitorea desde la sala de control.', a: T.cyan },
  ];
  const cols = [310, 810, 1310 - 30];
  const gx = [300, 800, 1300 - 20];
  const positions = roles.map((_, i) => ({ x: 250 + (i % 3) * 490, y: 300 + Math.floor(i / 3) * 210 }));
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="Escena 05 · Quién la hace posible" y="11%" />
      <Cap start={s + 0.8} dur={3.0} size={50} weight={600} y="20%" width={1500}>
        Una planta funciona por el trabajo coordinado de muchos.
      </Cap>
      {roles.map((r, i) => (
        <RoleCard key={i} {...r} accent={r.a} x={positions[i].x} y={positions[i].y} appear={s + 2.2 + i * 0.32} t={t} />
      ))}
      <Cap start={s + 12.0} dur={dur - 12.3} size={52} weight={600} y="90%" color={T.cyan} width={1500}>
        Descubrirás cómo convertirte en uno de ellos.
      </Cap>
    </Scene>
  );
}

Object.assign(window, { Scene1, Scene2, Scene3, Scene4, Scene5 });
