// m3c13.jsx — Medidores de turbina (axial, paddlewheel, K-factor, API RP 551)
// After m3-dark.jsx. Exports SCENES_M3C13.

// ── Scene 2: Principle ────────────────────────────────────────────────────────
function S_TurbinePrinciple({ start, dur }) {
  const t = useTime(); const s = start;
  const rotAngle = (t * 110) % 360; // rotor rotation

  // Turbine rotor SVG: pipe cross-section + spinning blades + pickup coil
  function TurbineDiagram({ cx, cy, r = 70, blades = 6 }) {
    const pts = Array.from({ length: blades }, (_, i) => {
      const a = (rotAngle + i * (360 / blades)) * Math.PI / 180;
      return { x: cx + Math.cos(a) * r * 0.82, y: cy + Math.sin(a) * r * 0.82 };
    });
    return (
      <g>
        {/* pipe bore */}
        <circle cx={cx} cy={cy} r={r + 22} fill="none" stroke={TL.lineS} strokeWidth="24" />
        <circle cx={cx} cy={cy} r={r - 10} fill={TL.bg2} />
        {/* flow arrows */}
        {[-50, 0, 50].map((dy, i) => (
          <line key={i} x1={cx - r - 60} y1={cy + dy * 0.5} x2={cx - r - 18} y2={cy + dy * 0.5}
            stroke={TEAL} strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="10 6" strokeDashoffset={-((t * 28) % 16)} opacity="0.6" />
        ))}
        <polygon points={`${cx - r - 20},${cy - 7} ${cx - r - 5},${cy} ${cx - r - 20},${cy + 7}`} fill={TEAL} opacity="0.7" />
        {/* blades */}
        {pts.map((p, i) => (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke={TEAL} strokeWidth="3.5" strokeLinecap="round" />
        ))}
        {/* hub */}
        <circle cx={cx} cy={cy} r={12} fill={TEAL} opacity="0.9" />
        {/* pickup coil */}
        <rect x={cx + r + 12} y={cy - 20} width={36} height={40} rx="5"
          fill="none" stroke={TL.clay} strokeWidth="2" />
        <text x={cx + r + 30} y={cy + 5} textAnchor="middle"
          fill={TL.clay} fontSize="13" fontFamily="IBM Plex Mono, monospace" fontWeight="600">f</text>
        <line x1={cx + r + 48} y1={cy} x2={cx + r + 80} y2={cy}
          stroke={TL.clay} strokeWidth="2" strokeDasharray="6 4"
          strokeDashoffset={-((t * 22) % 10)} />
        <text x={cx + r + 100} y={cy + 5} textAnchor="middle"
          fill={TL.clay} fontSize="16" fontFamily="IBM Plex Mono, monospace" fontWeight="700">pulsos</text>
      </g>
    );
  }

  const eq = popL(t, s + 4.5, 0.7, 20);
  const note = popL(t, s + 7.0, 0.7, 16);

  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="API RP 551 · Principio de operación" y="9%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.5} size={50} weight={600} y="18%" width={1700}>
        La turbina convierte velocidad de fluido en pulsos eléctricos.
      </CapL>
      {/* Diagram */}
      <div style={{ position: 'absolute', left: 80, top: 260 }}>
        <svg viewBox="0 0 640 280" width="560" height="245">
          <TurbineDiagram cx={320} cy={140} r={80} blades={6} />
          <text x={100} y={240} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="14" textAnchor="middle">flujo →</text>
          <text x={530} y={240} fill={TL.clay} fontFamily="IBM Plex Mono, monospace" fontSize="14" textAnchor="middle">sensor inductivo</text>
        </svg>
      </div>
      {/* Equation */}
      <div style={{ position: 'absolute', right: 80, top: 280, opacity: eq.op, transform: `translateY(${eq.ty}px)` }}>
        <div style={{ background: TL.paper, border: `1px solid ${TL.lineS}`, borderRadius: 12, padding: '28px 36px', width: 560, boxShadow: TL.shadow }}>
          <div style={{ fontFamily: MONOL, fontSize: 13, letterSpacing: '0.2em', color: TL.mut, marginBottom: 16, textTransform: 'uppercase' }}>Ecuación fundamental</div>
          <div style={{ fontFamily: MONOL, fontSize: 46, fontWeight: 700, color: TEAL, letterSpacing: '-0.01em', marginBottom: 20 }}>Q = f / K</div>
          {[
            { s: 'Q', d: 'Caudal volumétrico (m³/h, L/min)' },
            { s: 'f', d: 'Frecuencia de pulsos (Hz)' },
            { s: 'K', d: 'Factor K del medidor (pulsos/m³) — calibrado en fábrica' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '6px 0', borderTop: `1px solid ${TL.line}`, alignItems: 'baseline' }}>
              <span style={{ fontFamily: MONOL, fontSize: 18, fontWeight: 700, color: TEAL, width: 18, flexShrink: 0 }}>{r.s}</span>
              <span style={{ fontFamily: DISPL, fontSize: 17, color: TL.mut }}>{r.d}</span>
            </div>
          ))}
        </div>
      </div>
      {/* API note */}
      <div style={{ position: 'absolute', left: 80, bottom: 60, opacity: note.op, transform: `translateY(${note.ty}px)` }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: TL.paper, border: `1px solid ${TL.lineS}`, borderRadius: 8, padding: '12px 20px' }}>
          <span style={{ fontFamily: MONOL, fontSize: 11, color: TEAL, letterSpacing: '0.18em', textTransform: 'uppercase', flexShrink: 0 }}>API RP 551</span>
          <span style={{ fontFamily: DISPL, fontSize: 18, color: TL.ink }}>
            El factor K debe verificarse periódicamente mediante calibración in-situ o en laboratorio certificado.
          </span>
        </div>
      </div>
    </SceneL>
  );
}

// ── Scene 3: Types ────────────────────────────────────────────────────────────
function S_TurbineTypes({ start, dur }) {
  const t = useTime(); const s = start;
  const types = [
    {
      no: '01', title: 'Turbina axial — líquidos', accent: TEAL,
      sub: 'El tipo más preciso. El fluido empuja las paletas axialmente. Precisión ±0.1–0.5% del caudal. Rangeabilidad 10:1 a 20:1. Ideal para líquidos limpios de baja viscosidad: agua, hidrocarburos ligeros, solventes, productos refinados.',
    },
    {
      no: '02', title: 'Turbina axial — gas', accent: TL.clay,
      sub: 'Alta velocidad de rotación (miles de RPM). Cojinetes de precisión para alta vida útil. Estándar para medición fiscal de gas natural (AGA-7). Requiere gas limpio y seco. Presiones hasta 70 bar.',
    },
    {
      no: '03', title: 'Medidor de inserción (paddlewheel)', accent: TL.blue,
      sub: 'Tipo de paleta tangencial insertada en la tubería. Económico, instalación sin cortar la línea. Menor exactitud (±1–3%). Usado para agua de proceso, sistemas de enfriamiento y monitoreo (no fiscal). Gran diámetro de tubería.',
    },
  ];
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tipos principales — API RP 551 Tabla 5-1" y="9%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={46} weight={600} y="18%">Tres familias de medidores de turbina.</CapL>
      {types.map((tp, i) => {
        const { op, sc, ty } = popL(t, s + 2.2 + i * 0.5, 0.55, 24);
        return (
          <InfoCardL key={i}
            x={75 + i * 595} y={295}
            w={556} h={340}
            no={tp.no} accent={tp.accent}
            title={tp.title} sub={tp.sub}
            appear={s + 2.2 + i * 0.5} t={t}
          />
        );
      })}
    </SceneL>
  );
}

// ── Scene 4: API RP 551 installation & selection ──────────────────────────────
function S_TurbineAPI({ start, dur }) {
  const t = useTime(); const s = start;
  const pros = [
    'Alta exactitud: ±0.1–0.5% caudal',
    'Excelente rangeabilidad 10:1 a 20:1',
    'Señal de alta frecuencia → fácil integración',
    'Sin obstrucción en el flujo (baja ΔP)',
    'Estándar para medición fiscal (AGA-7)',
  ];
  const cons = [
    'Partes móviles → desgaste de cojinetes',
    'Sensible a cambios bruscos de viscosidad',
    'Requiere fluido limpio (sin sólidos)',
    'No funciona con fluidos corrosivos sin selección especial',
    'Necesita rectos aguas arriba/abajo',
  ];
  const pi = popL(t, s + 1.0, 0.6, 22);
  const pc = popL(t, s + 1.8, 0.6, 22);
  const pr = popL(t, s + 2.6, 0.6, 22);

  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Instalación y criterios API RP 551 §5.7" y="9%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.0} size={44} weight={600} y="17%">Ventajas, limitaciones e instalación.</CapL>
      {/* Pros */}
      <div style={{ position: 'absolute', left: 75, top: 270, width: 540, opacity: pi.op, transform: `translateY(${pi.ty}px)` }}>
        <div style={{ fontFamily: MONOL, fontSize: 11, letterSpacing: '0.2em', color: TEAL, marginBottom: 12, textTransform: 'uppercase' }}>✓ Ventajas</div>
        {pros.map((p, i) => (
          <div key={i} style={{ fontFamily: DISPL, fontSize: 19, color: TL.ink, padding: '7px 0', borderBottom: `1px solid ${TL.line}`, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: TEAL, flexShrink: 0, marginTop: 2 }}>+</span><span>{p}</span>
          </div>
        ))}
      </div>
      {/* Cons */}
      <div style={{ position: 'absolute', left: 660, top: 270, width: 540, opacity: pc.op, transform: `translateY(${pc.ty}px)` }}>
        <div style={{ fontFamily: MONOL, fontSize: 11, letterSpacing: '0.2em', color: TL.clay, marginBottom: 12, textTransform: 'uppercase' }}>✗ Limitaciones</div>
        {cons.map((p, i) => (
          <div key={i} style={{ fontFamily: DISPL, fontSize: 19, color: TL.ink, padding: '7px 0', borderBottom: `1px solid ${TL.line}`, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: TL.clay, flexShrink: 0, marginTop: 2 }}>−</span><span>{p}</span>
          </div>
        ))}
      </div>
      {/* Pipe requirements */}
      <div style={{ position: 'absolute', right: 75, top: 270, width: 520, opacity: pr.op, transform: `translateY(${pr.ty}px)` }}>
        <div style={{ fontFamily: MONOL, fontSize: 11, letterSpacing: '0.2em', color: TL.blue, marginBottom: 12, textTransform: 'uppercase' }}>Diámetros rectos (API RP 551)</div>
        {[
          { dir: 'Aguas arriba (upstream)', val: '≥ 20D', note: 'Sin perturbaciones' },
          { dir: 'Aguas abajo (downstream)', val: '≥ 5D', note: 'Antes de válvula/codo' },
          { dir: 'Con acondicionador de flujo', val: '≥ 10D', note: 'Reducible con flow conditioner' },
        ].map((r, i) => (
          <div key={i} style={{ padding: '8px 12px', marginBottom: 8, background: TL.paper, borderRadius: 7, border: `1px solid ${TL.lineS}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
              <span style={{ fontFamily: DISPL, fontSize: 18, color: TL.ink }}>{r.dir}</span>
              <span style={{ fontFamily: MONOL, fontSize: 22, fontWeight: 700, color: TL.blue }}>{r.val}</span>
            </div>
            <span style={{ fontFamily: MONOL, fontSize: 12, color: TL.dim }}>{r.note}</span>
          </div>
        ))}
      </div>
    </SceneL>
  );
}

const SCENES_M3C13 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={13} title="Medidores de turbina" dudur="14–16 min" objetivo="Comprender el principio de operación, tipos y requisitos de instalación de los medidores de turbina según API RP 551." />, dur: 7, label: 'Apertura' },
  { C: S_TurbinePrinciple, dur: 14, label: 'Principio y ecuación' },
  { C: S_TurbineTypes,     dur: 14, label: 'Tipos axial e inserción' },
  { C: S_TurbineAPI,       dur: 12, label: 'Instalación API RP 551' },
  { C: (p) => <ClosingM2 {...p} line="Los medidores de turbina son la referencia en medición fiscal de gas natural y productos refinados." activity="Un operador reporta que el factor K de la turbina cambió 0.3% respecto a la última calibración. ¿Investiga o acepta el desvío?" />, dur: 9, label: 'Cierre' },
];
window.SCENES_M3C13 = SCENES_M3C13;
