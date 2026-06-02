// ia-scenes-a.jsx — Capítulos 1-5 de "IA para la Vida Real". After ia-lib.jsx.

function ipop(t, appear, d = 0.7, rise = 22) {
  const lt = t - appear;
  if (lt < 0) return { op: 0, sc: 0.94, ty: rise };
  const e = Easing.easeOutCubic(clamp(lt / d, 0, 1));
  return { op: e, sc: 0.94 + 0.06 * e, ty: (1 - e) * rise };
}

// ═══════════ 1 · EL MUNDO YA CAMBIÓ ═══════════
function C1({ start, dur }) {
  const t = useTime();
  const s = start;
  const miles = ['Radio', 'Televisión', 'Computadora', 'Internet', 'Teléfono', 'Inteligencia Artificial'];
  const xs = [220, 520, 820, 1120, 1420, 1720];
  const y = 540;
  const drawStart = s + 14, drawDur = 8.5;
  const dp = clamp((t - drawStart) / drawDur, 0, 1);
  const frontX = xs[0] + (xs[xs.length - 1] - xs[0]) * dp;
  const showTL = t > s + 13;
  return (
    <Section start={start} dur={dur}>
      <Kicker start={s + 0.5} dur={dur - 0.8} text="El mundo ya cambió" />
      {/* Phase A — narration */}
      <Cap start={s + 1.2} dur={3.6} size={86} y="46%" width={1500}>Cada generación vivió su propia revolución.</Cap>
      <Cap start={s + 5.2} dur={3.2} size={70} y="46%" color={IA.soft} width={1400}>La radio. La televisión. Internet.</Cap>
      <Cap start={s + 8.8} dur={3.8} size={86} y="46%" width={1400}>Y hoy vivimos algo aún más extraordinario.</Cap>
      {/* Phase B — timeline */}
      {showTL && (
        <>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <line x1={xs[0]} y1={y} x2={xs[5]} y2={y} stroke={IA.line} strokeWidth="1.5" strokeDasharray="2 7" />
            <line x1={xs[0]} y1={y} x2={frontX} y2={y} stroke={IA.gold} strokeWidth="2" strokeLinecap="round" />
          </svg>
          {xs.map((cx, i) => {
            const f = (cx - xs[0]) / (xs[5] - xs[0]);
            const litT = drawStart + f * drawDur;
            const e = clamp((t - litT) / 0.5, 0, 1);
            const isAI = i === 5;
            if (isAI) {
              return (
                <div key={i}>
                  <Orb x={cx} y={y} r={46} t={t} appear={litT} intensity={1.1} />
                  <div style={{ position: 'absolute', left: cx, top: y + 116, transform: 'translateX(-50%)', opacity: e, textAlign: 'center', width: 200, lineHeight: 1.04, fontFamily: SERIF, fontSize: 30, fontWeight: 600, color: IA.gold }}>{miles[i]}</div>
                </div>
              );
            }
            return (
              <div key={i}>
                <div style={{ position: 'absolute', left: cx, top: y, transform: `translate(-50%,-50%) scale(${0.5 + 0.5 * e})`, width: 16, height: 16, borderRadius: '50%', background: e > 0.5 ? IA.gold : 'transparent', border: `2px solid ${e > 0.2 ? IA.gold : IA.dim}`, opacity: 0.4 + 0.6 * e }} />
                <div style={{ position: 'absolute', left: cx, top: y + (i % 2 ? 40 : -56), transform: 'translateX(-50%)', opacity: e, textAlign: 'center', whiteSpace: 'nowrap', fontFamily: SANS, fontSize: 17, letterSpacing: '0.04em', color: IA.soft }}>{miles[i]}</div>
              </div>
            );
          })}
        </>
      )}
      <Cap start={s + 22.6} dur={3.0} size={104} y="30%" weight={600} color={IA.ink}>La inteligencia artificial.</Cap>
      <Cap start={s + 25.8} dur={dur - 26} size={40} sans weight={600} y="82%" color={IA.gold} ls="0.06em">
        La próxima gran revolución ya comenzó.
      </Cap>
    </Section>
  );
}

// ═══════════ 2 · LA IA YA ESTÁ EN TU VIDA ═══════════
function C2({ start, dur }) {
  const t = useTime();
  const s = start;
  const cards = [
    { l: 'Buscar una receta', x: 230 }, { l: 'Planear un viaje', x: 575 }, { l: 'Aprender un idioma', x: 920 },
    { l: 'Explorar la historia', x: 1265 }, { l: 'Escribir tus recuerdos', x: 1610 },
  ];
  const cw = 280, cy = 560, ox = 960, oy = 330;
  const words = ['Aprender', 'Crear', 'Organizar', 'Descubrir'];
  return (
    <Section start={start} dur={dur}>
      <Kicker start={s + 0.4} dur={dur - 0.7} text="La IA ya está en tu vida" y="9%" />
      <Cap start={s + 1.0} dur={3.0} size={74} y="20%" color={IA.soft} width={1500}>No pertenece al futuro.</Cap>
      <Cap start={s + 3.6} dur={2.6} size={104} y="20%" weight={600}>Ya está aquí.</Cap>
      <Orb x={ox} y={oy} r={64} t={t} appear={s + 5.6} />
      {cards.map((c, i) => {
        const a = s + 6.4 + i * 0.4;
        const { op, ty } = ipop(t, a, 0.6, 22);
        const px = c.x + (cw / 2);
        return (
          <div key={i}>
            <Draw x1={ox} y1={oy + 40} x2={px} y2={cy} start={a - 0.1} dur={0.7} dash="2 7" />
            <div style={{ position: 'absolute', left: c.x, top: cy, width: cw, opacity: op, transform: `translateY(${ty}px)` }}>
              <Photo label={`Fotografía — ${c.l.toLowerCase()}`} w={cw} h={188} />
              <div style={{ marginTop: 12, textAlign: 'center', fontFamily: SERIF, fontSize: 26, fontWeight: 600, color: IA.ink }}>{c.l}</div>
            </div>
          </div>
        );
      })}
      <Cap start={s + 14.0} dur={3.2} size={56} y="90%" color={IA.soft} width={1500}>
        Millones la usan cada día para aprender, crear y resolver.
      </Cap>
      {/* keywords */}
      {t > s + 17.6 && (
        <div style={{ position: 'absolute', left: '50%', top: '90%', transform: 'translate(-50%,-50%)', display: 'flex', gap: 80, alignItems: 'baseline' }}>
          {words.map((w, i) => {
            const { op, ty } = ipop(t, s + 17.8 + i * 0.45, 0.5, 14);
            return <span key={i} style={{ opacity: op, transform: `translateY(${ty}px)`, fontFamily: SERIF, fontSize: 58, fontWeight: 600, color: i % 2 ? IA.gold : IA.ink }}>{w}</span>;
          })}
        </div>
      )}
    </Section>
  );
}

// ═══════════ 3 · ROMPIENDO LOS MITOS ═══════════
function Myth({ text, start, t }) {
  const lt = t - start;
  if (lt < -0.02 || lt > 5.2) return null;
  const inE = Easing.easeOutCubic(clamp(lt / 0.7, 0, 1));
  const strike = clamp((lt - 2.4) / 0.6, 0, 1);
  const out = clamp((lt - 3.6) / 1.0, 0, 1);
  const op = inE * (1 - out);
  const blur = out * 8;
  const ty = -out * 30;
  return (
    <div style={{ position: 'absolute', left: '50%', top: '46%', transform: `translate(-50%,calc(-50% + ${ty}px))`, opacity: op, filter: blur ? `blur(${blur}px)` : 'none', textAlign: 'center', width: 1500 }}>
      <span style={{ position: 'relative', fontFamily: SERIF, fontSize: 76, fontWeight: 500, fontStyle: 'italic', color: IA.soft, lineHeight: 1.1 }}>
        «{text}»
        <span style={{ position: 'absolute', left: '-2%', top: '52%', width: `${strike * 104}%`, height: 3, background: IA.gold, boxShadow: `0 0 10px ${IA.gold}`, transformOrigin: 'left' }} />
      </span>
    </div>
  );
}
function C3({ start, dur }) {
  const t = useTime();
  const s = start;
  return (
    <Section start={start} dur={dur}>
      <Kicker start={s + 0.4} dur={dur - 0.7} text="Rompiendo los mitos" />
      <Cap start={s + 1.0} dur={3.0} size={64} y="46%" color={IA.soft} width={1400}>Existen muchos mitos sobre la IA.</Cap>
      <Myth text="La IA es solo para programadores" start={s + 4.6} t={t} />
      <Myth text="La IA reemplazará a las personas" start={s + 9.4} t={t} />
      <Myth text="Soy demasiado mayor para aprender" start={s + 14.2} t={t} />
      <Cap start={s + 19.6} dur={4.0} size={88} y="44%" width={1500}>
        Si puedes hacer una pregunta, puedes usar inteligencia artificial.
      </Cap>
      <Cap start={s + 24.0} dur={dur - 24.2} size={42} sans weight={700} y="80%" color={IA.gold} ls="0.06em">
        No necesitas programar.
      </Cap>
    </Section>
  );
}

// ═══════════ 4 · TU TUTOR PERSONAL ═══════════
function C4({ start, dur }) {
  const t = useTime();
  const s = start;
  const ox = 960, oy = 480;
  const chips = [
    { l: 'Historia', dx: -360, dy: -180 }, { l: 'Fotografía', dx: 360, dy: -180 },
    { l: 'Nutrición', dx: -360, dy: 180 }, { l: 'Idiomas', dx: 360, dy: 180 },
  ];
  return (
    <Section start={start} dur={dur}>
      <Kicker start={s + 0.4} dur={dur - 0.7} text="Una nueva forma de aprender" y="11%" />
      <Orb x={ox} y={oy} r={82} t={t} appear={s + 1.0} intensity={1.15} />
      {chips.map((c, i) => {
        const a = s + 2.0 + i * 0.45;
        const { op, sc } = ipop(t, a, 0.6, 0);
        const cx = ox + c.dx, cy = oy + c.dy;
        return (
          <div key={i}>
            <Draw x1={ox} y1={oy} x2={cx} y2={cy} start={a - 0.1} dur={0.7} dash="2 7" />
            <div style={{ position: 'absolute', left: cx, top: cy, transform: `translate(-50%,-50%) scale(${sc})`, opacity: op, fontFamily: SERIF, fontSize: 40, fontWeight: 600, color: IA.ink, padding: '14px 30px', border: `1px solid ${IA.line}`, borderRadius: 100, background: 'rgba(255,255,255,0.04)', whiteSpace: 'nowrap' }}>{c.l}</div>
          </div>
        );
      })}
      <Cap start={s + 5.0} dur={3.4} size={64} y="84%" color={IA.soft} width={1500}>
        Imagina un profesor disponible las 24 horas. Paciente.
      </Cap>
      <Cap start={s + 8.8} dur={3.4} size={70} y="84%" width={1500}>Capaz de explicar cualquier tema, a tu ritmo.</Cap>
      <Cap start={s + 12.6} dur={dur - 12.9} size={42} sans weight={700} y="84%" color={IA.gold} ls="0.06em">Tu tutor personal.</Cap>
    </Section>
  );
}

// ═══════════ 5 · UNA NUEVA FORMA DE CREAR ═══════════
function C5({ start, dur }) {
  const t = useTime();
  const s = start;
  const cards = [
    { l: 'Escribir un libro', x: 270 }, { l: 'Diseñar presentaciones', x: 670 },
    { l: 'Organizar tus fotos', x: 1070 }, { l: 'Grabar tus videos', x: 1470 },
  ];
  const cw = 340, cy = 380;
  const words = ['Escribir', 'Diseñar', 'Investigar', 'Crear', 'Compartir'];
  return (
    <Section start={start} dur={dur}>
      <Kicker start={s + 0.4} dur={dur - 0.7} text="Una nueva forma de crear" y="9%" />
      <Cap start={s + 0.9} dur={3.2} size={68} y="20%" width={1500}>Transforma tus ideas en proyectos reales.</Cap>
      {cards.map((c, i) => {
        const { op, ty } = ipop(t, s + 3.4 + i * 0.4, 0.6, 24);
        return (
          <div key={i} style={{ position: 'absolute', left: c.x, top: cy, width: cw, opacity: op, transform: `translateY(${ty}px)` }}>
            <Photo label={`Fotografía — ${c.l.toLowerCase()}`} w={cw} h={230} />
            <div style={{ marginTop: 14, textAlign: 'center', fontFamily: SERIF, fontSize: 28, fontWeight: 600, color: IA.ink }}>{c.l}</div>
          </div>
        );
      })}
      {t > s + 8.6 && (
        <div style={{ position: 'absolute', left: '50%', top: '86%', transform: 'translate(-50%,-50%)', display: 'flex', gap: 60, alignItems: 'baseline' }}>
          {words.map((w, i) => {
            const { op, ty } = ipop(t, s + 8.8 + i * 0.4, 0.5, 14);
            return <span key={i} style={{ opacity: op, transform: `translateY(${ty}px)`, fontFamily: SERIF, fontSize: 52, fontWeight: 600, color: i % 2 ? IA.gold : IA.ink }}>{w}</span>;
          })}
        </div>
      )}
    </Section>
  );
}

Object.assign(window, { C1, C2, C3, C4, C5 });
