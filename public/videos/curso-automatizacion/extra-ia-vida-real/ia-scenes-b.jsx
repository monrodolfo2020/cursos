// ia-scenes-b.jsx — Capítulos 6-10 de "IA para la Vida Real". After ia-scenes-a.jsx.

// ═══════════ 6 · LOS AGENTES INTELIGENTES ═══════════
function C6({ start, dur }) {
  const t = useTime();
  const s = start;
  const ox = 960, oy = 480;
  const agents = [
    { l: 'Investiga', sub: 'busca y reúne', x: 960, y: 250 },
    { l: 'Organiza', sub: 'ordena la información', x: 1360, y: 480 },
    { l: 'Resume', sub: 'destila lo esencial', x: 960, y: 710 },
    { l: 'Planifica', sub: 'traza el camino', x: 560, y: 480 },
  ];
  return (
    <Section start={start} dur={dur}>
      <Kicker start={s + 0.4} dur={dur - 0.7} text="Los agentes inteligentes" y="9%" />
      <Cap start={s + 1.0} dur={3.4} size={66} y="18%" color={IA.soft} width={1500}>La siguiente evolución de la IA: los agentes.</Cap>
      {/* collaboration ring */}
      {agents.map((a, i) => {
        const b = agents[(i + 1) % 4];
        return <Draw key={'r' + i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} start={s + 7.5 + i * 0.2} dur={0.7} dash="2 8" color="rgba(170,185,210,0.22)" />;
      })}
      {/* spokes to center */}
      {agents.map((a, i) => <Draw key={'k' + i} x1={ox} y1={oy} x2={a.x} y2={a.y} start={s + 4.6 + i * 0.3} dur={0.6} dash="2 7" />)}
      <Orb x={ox} y={oy} r={56} t={t} appear={s + 4.0} />
      {agents.map((a, i) => {
        const ap = s + 4.4 + i * 0.4;
        const lt = t - ap;
        const e = Easing.easeOutCubic(clamp(lt / 0.6, 0, 1));
        if (lt < -0.02) return null;
        return (
          <div key={i} style={{ position: 'absolute', left: a.x, top: a.y, transform: `translate(-50%,-50%) scale(${0.9 + 0.1 * e})`, opacity: e, textAlign: 'center', width: 240, padding: '16px 18px', borderRadius: 14, border: `1px solid ${IA.line}`, background: 'rgba(255,255,255,0.05)' }}>
            <div style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 600, color: IA.ink }}>{a.l}</div>
            <div style={{ fontFamily: SANS, fontSize: 15, color: IA.soft, marginTop: 2 }}>{a.sub}</div>
          </div>
        );
      })}
      <Cap start={s + 13.4} dur={3.6} size={58} y="90%" color={IA.soft} width={1500}>Sistemas que realizan tareas completas, de principio a fin.</Cap>
      <Cap start={s + 17.4} dur={dur - 17.7} size={42} sans weight={700} y="90%" color={IA.gold} ls="0.06em">Los asistentes del futuro.</Cap>
    </Section>
  );
}

// ═══════════ 7 · LAS HERRAMIENTAS ═══════════
function ToolCard({ name, use, x, y, appear, t }) {
  const lt = t - appear;
  const e = Easing.easeOutCubic(clamp(lt / 0.6, 0, 1));
  if (lt < -0.02) return null;
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: 380, opacity: e, transform: `translateY(${(1 - e) * 20}px)`,
      display: 'flex', alignItems: 'center', gap: 18, padding: '20px 24px', borderRadius: 16,
      border: `1px solid ${IA.line}`, background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
    }}>
      <div style={{ flexShrink: 0, width: 54, height: 54, borderRadius: '50%', border: `1px solid ${IA.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontSize: 30, fontWeight: 600, color: IA.gold, background: 'rgba(220,190,130,0.08)' }}>{name[0]}</div>
      <div>
        <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 700, color: IA.ink, letterSpacing: '-0.01em' }}>{name}</div>
        <div style={{ fontFamily: SANS, fontSize: 16, color: IA.soft, marginTop: 2 }}>{use}</div>
      </div>
    </div>
  );
}
function C7({ start, dur }) {
  const t = useTime();
  const s = start;
  const tools = [
    { name: 'ChatGPT', use: 'Conversar y resolver' }, { name: 'Claude', use: 'Escribir y razonar' },
    { name: 'Gemini', use: 'Buscar e integrar' }, { name: 'Perplexity', use: 'Investigar con fuentes' },
    { name: 'NotebookLM', use: 'Estudiar tus documentos' }, { name: 'Gamma', use: 'Crear presentaciones' },
    { name: 'Make', use: 'Automatizar tareas' },
  ];
  // 4 top, 3 bottom (centered)
  const row1 = [80, 540, 1000, 1460], row2 = [310, 770, 1230];
  const pos = [
    { x: row1[0], y: 360 }, { x: row1[1], y: 360 }, { x: row1[2], y: 360 }, { x: row1[3], y: 360 },
    { x: row2[0], y: 560 }, { x: row2[1], y: 560 }, { x: row2[2], y: 560 },
  ];
  return (
    <Section start={start} dur={dur}>
      <Kicker start={s + 0.4} dur={dur - 0.7} text="Las herramientas que aprenderás" y="11%" />
      <Cap start={s + 0.9} dur={3.0} size={66} y="22%" width={1500}>No cientos de aplicaciones. Solo las correctas.</Cap>
      {tools.map((tl, i) => <ToolCard key={i} {...tl} x={pos[i].x} y={pos[i].y} appear={s + 3.4 + i * 0.3} t={t} />)}
      <Cap start={s + 9.0} dur={3.0} size={54} y="78%" color={IA.soft} width={1500}>Aprenderás cuál usar para cada necesidad.</Cap>
      <Cap start={s + 12.2} dur={dur - 12.5} size={42} sans weight={700} y="78%" color={IA.gold} ls="0.06em">Y muchas de ellas son gratuitas.</Cap>
    </Section>
  );
}

// ═══════════ 8 · EL PODER DEL PROMPTING ═══════════
function Bubble({ side, text, kind, w = 560, glow = false }) {
  const me = kind === 'q';
  return (
    <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', marginBottom: 16 }}>
      <div style={{
        maxWidth: w, padding: '16px 22px', borderRadius: me ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        background: me ? 'rgba(255,255,255,0.08)' : (glow ? 'rgba(220,190,130,0.14)' : 'rgba(255,255,255,0.05)'),
        border: `1px solid ${me ? IA.panelB : (glow ? IA.line : 'rgba(255,255,255,0.08)')}`,
        boxShadow: glow ? `0 0 26px rgba(220,190,130,0.18)` : 'none',
        fontFamily: SANS, fontSize: 21, lineHeight: 1.45, color: me ? IA.soft : IA.ink, textAlign: 'left',
      }}>{text}</div>
    </div>
  );
}
function C8({ start, dur }) {
  const t = useTime();
  const s = start;
  const L = ipop(t, s + 3.0, 0.6, 20), R1 = ipop(t, s + 6.2, 0.6, 20), R2 = ipop(t, s + 6.8, 0.6, 20);
  return (
    <Section start={start} dur={dur}>
      <Kicker start={s + 0.4} dur={dur - 0.7} text="El poder del prompting" y="10%" />
      <Cap start={s + 0.9} dur={2.4} size={62} y="20%" width={1500}>La misma IA, dos preguntas distintas.</Cap>
      {/* left — simple */}
      <div style={{ position: 'absolute', left: 150, top: 360, width: 700, opacity: L.op, transform: `translateY(${L.ty}px)` }}>
        <div style={{ fontFamily: SANS, fontSize: 17, letterSpacing: '0.16em', textTransform: 'uppercase', color: IA.soft, marginBottom: 22 }}>Pregunta simple</div>
        <Bubble kind="q" text="¿Qué como hoy?" w={360} />
        <Bubble kind="a" text="Una ensalada." w={360} />
      </div>
      {/* divider */}
      <div style={{ position: 'absolute', left: 960, top: 340, bottom: 220, width: 1, background: IA.line }} />
      <div style={{ position: 'absolute', left: 960, top: '52%', transform: 'translate(-50%,-50%)', width: 56, height: 56, borderRadius: '50%', border: `1px solid ${IA.line}`, background: IA.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontSize: 18, color: IA.gold, opacity: clamp((t - s - 5.5) / 0.5, 0, 1) }}>→</div>
      {/* right — better */}
      <div style={{ position: 'absolute', left: 1070, top: 360, width: 700 }}>
        <div style={{ fontFamily: SANS, fontSize: 17, letterSpacing: '0.16em', textTransform: 'uppercase', color: IA.gold, marginBottom: 22, opacity: R1.op }}>Pregunta mejor</div>
        <div style={{ opacity: R1.op, transform: `translateY(${R1.ty}px)` }}><Bubble kind="q" text="Soy diabético y vivo solo. Sugiéreme una cena ligera con lo que tengo: pollo, arroz y verduras." w={620} /></div>
        <div style={{ opacity: R2.op, transform: `translateY(${R2.ty}px)` }}><Bubble kind="a" glow text="Salteado de pollo y verduras con un poco de arroz. Bajo en azúcar, listo en 20 minutos — y te dejo la lista del súper." w={620} /></div>
      </div>
      <Cap start={s + 10.5} dur={3.4} size={52} y="88%" color={IA.soft} width={1600}>La calidad de las respuestas depende de tus preguntas.</Cap>
      <Cap start={s + 14.2} dur={dur - 14.5} size={42} sans weight={700} y="88%" color={IA.gold} ls="0.05em">Preguntar mejor = mejores resultados.</Cap>
    </Section>
  );
}

// ═══════════ 9 · TU TRANSFORMACIÓN ═══════════
function C9({ start, dur }) {
  const t = useTime();
  const s = start;
  const lt = t - s;
  const photos = [
    'Persona mayor usando una tablet', 'Creando un proyecto propio', 'Enseñando a otros', 'Explorando nuevas ideas',
  ];
  const zoom = 1.04 + 0.05 * clamp(lt / dur, 0, 1);
  return (
    <Section start={start} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 18, padding: 56, alignItems: 'center', justifyContent: 'center', transform: `scale(${zoom})`, transformOrigin: 'center' }}>
        {photos.map((p, i) => {
          const { op } = ipop(t, s + 0.3 + i * 0.18, 0.8, 0);
          return <div key={i} style={{ opacity: op * 0.9, flex: 1 }}><Photo label={`Fotografía — ${p.toLowerCase()}`} w={420} h={640} /></div>;
        })}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,22,52,0.55) 0%, rgba(8,22,52,0.30) 42%, rgba(5,15,37,0.92) 100%)' }} />
      <Kicker start={s + 0.4} dur={dur - 0.7} text="Tu transformación" y="13%" />
      <Cap start={s + 1.4} dur={3.0} size={72} y="46%" width={1400}>No importa tu edad ni tu experiencia.</Cap>
      <Cap start={s + 4.6} dur={3.2} size={84} y="46%" width={1500}>Nunca hubo mejor momento para aprender.</Cap>
      <Cap start={s + 8.2} dur={4.0} size={66} y="46%" color={IA.soft} width={1500}>La IA no trata sobre tecnología.</Cap>
      <Cap start={s + 12.4} dur={dur - 12.7} size={94} y="50%" weight={600} color={IA.gold} italic width={1500}>
        Trata sobre ampliar lo humano.
      </Cap>
    </Section>
  );
}

// ═══════════ 10 · CIERRE ═══════════
function C10({ start, dur }) {
  const t = useTime();
  const s = start;
  const lt = t - s;
  const horizonY = 770;
  const rise = Easing.easeOutCubic(clamp((lt - 1) / 4, 0, 1));
  const photo = (() => { const inE = clamp((lt - 2) / 1.0, 0, 1); const out = clamp((lt - 7.0) / 1.2, 0, 1); return inE * (1 - out); })();
  // title appears, then settles; never overlaps the lines below
  const titleA = s + 9.0, titleE = Easing.easeOutCubic(clamp((t - titleA) / 1.3, 0, 1));
  const titleOut = clamp((s + dur - t) / 0.8, 0, 1);
  const titleVisible = t >= titleA - 0.02 && t <= s + dur;
  return (
    <Section start={start} dur={dur} drift={false}>
      {/* warm horizon glow */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: horizonY - 380, height: 480, background: `radial-gradient(ellipse 60% 100% at 50% 100%, rgba(220,190,130,${0.30 * rise}), transparent 70%)` }} />
      {/* soft hills */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <ellipse cx="540" cy={horizonY + 250} rx="980" ry="300" fill="#0a1c40" opacity="0.9" />
        <ellipse cx="1500" cy={horizonY + 270} rx="900" ry="280" fill="#081634" opacity="0.95" />
        <line x1="0" y1={horizonY} x2="1920" y2={horizonY} stroke={IA.line} strokeWidth="1" opacity={rise} />
      </svg>
      {/* rising sun */}
      <Orb x={960} y={horizonY} r={66} t={t} appear={s + 1.0} intensity={1.3} />
      {/* walking-toward photo — early, fades out before the title arrives */}
      {photo > 0.01 && (
        <div style={{ position: 'absolute', left: '50%', top: '44%', transform: 'translate(-50%,-50%)', opacity: photo * 0.9 }}>
          <Photo label="Personas caminando hacia nuevas oportunidades" w={560} h={170} />
        </div>
      )}
      <Cap start={s + 4.6} dur={3.2} size={66} y="42%" color={IA.soft} width={1500}>Bienvenido.</Cap>
      {/* course title — the hero */}
      {titleVisible && (
        <div style={{ position: 'absolute', left: '50%', top: '37%', transform: `translate(-50%,-50%) translateY(${(1 - titleE) * 20}px)`, opacity: titleE * titleOut, textAlign: 'center' }}>
          <div style={{ fontFamily: SERIF, fontSize: 118, fontWeight: 600, color: IA.ink, lineHeight: 0.98, letterSpacing: '-0.01em' }}>Inteligencia Artificial</div>
          <div style={{ fontFamily: SERIF, fontSize: 62, fontWeight: 500, fontStyle: 'italic', color: IA.gold, marginTop: 8 }}>para la Vida Real</div>
        </div>
      )}
      {/* single rotating line below the title */}
      <Cap start={s + 11.0} dur={3.6} size={26} sans weight={600} y="57%" color={IA.gold} ls="0.26em">COMPRENDER · USAR · APROVECHAR</Cap>
      <Cap start={s + 15.0} dur={4.0} size={46} y="57%" color={IA.soft} width={1500}>Tu viaje comienza ahora.</Cap>
      <Cap start={s + 20.0} dur={dur - 20.2} size={40} sans weight={700} y="57%" color={IA.gold} ls="0.06em">Bienvenido al futuro.</Cap>
    </Section>
  );
}

Object.assign(window, { C6, C7, C8, C9, C10 });
