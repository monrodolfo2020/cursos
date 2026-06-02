// clase3.jsx — "Los personajes del mundo industrial"
// After clase-lib.jsx. Exports SCENES_C3.

function RoleCard3({ tag, role, desc, x, y, appear, t, accent }) {
  const { op, sc, ty } = pop(t, appear, 0.5, 20);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 470, height: 158, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 6, border: `1px solid ${T.lineS}`, background: 'linear-gradient(180deg, rgba(20,34,54,0.6), rgba(12,20,32,0.45))', padding: '20px 26px', display: 'flex', flexDirection: 'column', gap: 7, justifyContent: 'center' }}>
      <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', color: accent }}>{tag}</div>
      <div style={{ fontFamily: DISP, fontSize: 29, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{role}</div>
      <div style={{ fontFamily: DISP, fontSize: 17, fontWeight: 400, color: T.mut, lineHeight: 1.3 }}>{desc}</div>
      <div style={{ position: 'absolute', left: 0, top: 20, bottom: 20, width: 3, background: accent, borderRadius: 3 }} />
    </div>
  );
}
function S3_Roles({ start, dur }) {
  const t = useTime(); const s = start;
  const roles = [
    { tag: 'CAMPO', role: 'Operador de campo', desc: 'Maneja equipos, toma lecturas, reporta.', a: T.cyan },
    { tag: 'SALA DE CONTROL', role: 'Operador de sala', desc: 'Supervisa el SCADA y responde alarmas.', a: T.cyan },
    { tag: 'INSTRUMENTACIÓN', role: 'Técnico instrumentista', desc: 'Instala, calibra y mantiene sensores.', a: T.amber },
    { tag: 'ELÉCTRICO', role: 'Electricista industrial', desc: 'Cableado, motores y tableros.', a: T.cyan },
    { tag: 'CONTROL', role: 'Ing. de automatización', desc: 'Diseña la lógica del PLC y el SCADA.', a: T.amber },
    { tag: 'PROCESOS', role: 'Ing. de procesos', desc: 'Define qué debe pasar y sus variables.', a: T.cyan },
  ];
  const positions = roles.map((_, i) => ({ x: 250 + (i % 3) * 490, y: 330 + Math.floor(i / 3) * 200 }));
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="El ecosistema humano de una planta" y="11%" />
      <Cap start={s + 0.8} dur={2.6} size={50} weight={600} y="20%" width={1500}>Una planta funciona por el trabajo coordinado de muchos.</Cap>
      {roles.map((r, i) => <RoleCard3 key={i} {...r} accent={r.a} x={positions[i].x} y={positions[i].y} appear={s + 2.4 + i * 0.34} t={t} />)}
      <Cap start={s + 6.6} dur={dur - 6.9} size={32} weight={500} color={T.mut} y="88%" width={1500}>
        Y por encima de todos, el gerente de planta vigila los KPIs desde el SCADA.
      </Cap>
    </Scene>
  );
}

// Pirámide ISA-95
function S3_Piramide({ start, dur }) {
  const t = useTime(); const s = start;
  const levels = [
    { n: 'Nivel 4', name: 'Empresa', sub: 'ERP · planeación de negocio', w: 360 },
    { n: 'Nivel 3', name: 'Planeación', sub: 'MES · gestión de producción', w: 560 },
    { n: 'Nivel 2', name: 'Supervisión', sub: 'SCADA · sala de control', w: 760 },
    { n: 'Nivel 1', name: 'Control', sub: 'PLC · DCS', w: 960 },
    { n: 'Nivel 0', name: 'Campo', sub: 'Sensores · actuadores', w: 1160 },
  ];
  const cx = 960, topY = 250, lh = 116, gap = 6;
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="La pirámide de automatización · ISA-95" y="8%" />
      {levels.map((lv, i) => {
        const appear = s + 1.2 + i * 0.55;
        const { op, ty } = pop(t, appear, 0.55, 26);
        const y = topY + i * (lh + gap);
        const isControl = lv.name === 'Control' || lv.name === 'Campo';
        const accent = i >= 3 ? T.cyan : (i === 2 ? T.amber : T.mut);
        return (
          <div key={i} style={{ position: 'absolute', left: cx, top: y, width: lv.w, height: lh, transform: `translateX(-50%) translateY(${ty}px)`, opacity: op,
            borderRadius: 4, border: `1px solid ${T.lineS}`, background: `linear-gradient(180deg, rgba(20,34,54,${0.4 + i * 0.06}), rgba(12,20,32,0.4))`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 36px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', color: accent }}>{lv.n}</span>
              <span style={{ fontFamily: DISP, fontSize: 34, fontWeight: 700, color: T.ink }}>{lv.name}</span>
            </div>
            <span style={{ fontFamily: MONO, fontSize: 15, color: T.mut, letterSpacing: '0.04em' }}>{lv.sub}</span>
          </div>
        );
      })}
      <Cap start={s + 4.8} dur={dur - 5.1} size={30} weight={500} color={T.mut} y="90%" width={1500}>
        El dato sube de campo a empresa. Las decisiones bajan de vuelta.
      </Cap>
    </Scene>
  );
}

// ¿Dónde encajas?
function S3_Encaje({ start, dur }) {
  const t = useTime(); const s = start;
  const hi = pop(t, s + 2.6, 0.7, 0);
  return (
    <Scene start={start} dur={dur}>
      <Kicker start={s + 0.3} dur={dur - 0.5} text="¿Dónde encajas tú?" y="16%" />
      <Cap start={s + 0.8} dur={2.2} size={52} weight={500} color={T.mut} y="30%" width={1500}>
        El perfil que construirás en este curso vive justo aquí:
      </Cap>
      <div style={{ position: 'absolute', left: '50%', top: '52%', transform: `translate(-50%,-50%) scale(${hi.sc})`, opacity: hi.op, textAlign: 'center', padding: '40px 70px', borderRadius: 10, border: `1.5px solid ${T.amber}`, background: 'radial-gradient(circle, rgba(60,46,20,0.5), rgba(10,16,26,0.6))', boxShadow: `0 0 50px rgba(200,150,60,0.2)` }}>
        <div style={{ fontFamily: MONO, fontSize: 15, letterSpacing: '0.24em', color: T.amber, marginBottom: 14 }}>CONTROL · INSTRUMENTACIÓN</div>
        <div style={{ fontFamily: DISP, fontSize: 64, fontWeight: 700, color: T.ink, lineHeight: 1.05 }}>Automatizador<br />e Instrumentista</div>
        <Brackets color={T.amber} size={22} thick={2} inset={14} />
      </div>
      <Cap start={s + 4.6} dur={dur - 4.9} size={32} weight={500} color={T.mut} y="80%" width={1500}>
        Trabajan en plantas, integradoras, fabricantes de equipos y consultoras.
      </Cap>
    </Scene>
  );
}

const SCENES_C3 = [
  { C: (p) => <TitleCard {...p} claseNo={3} title="Los personajes del mundo industrial" dudur="12–14 min" objetivo="Conocer los perfiles de una planta y saber exactamente dónde encaja un automatizador." />, dur: 7, label: 'Apertura' },
  { C: S3_Roles, dur: 12, label: 'El ecosistema' },
  { C: S3_Piramide, dur: 12, label: 'Pirámide ISA-95' },
  { C: S3_Encaje, dur: 10, label: 'Dónde encajas' },
  { C: (p) => <Closing {...p} line="Cada perfil es una pieza. Tú serás quien le da inteligencia al proceso." activity="Investiga en LinkedIn a alguien que trabaje en automatización o instrumentación y comparte lo que aprendiste." />, dur: 9, label: 'Cierre' },
];
window.SCENES_C3 = SCENES_C3;
