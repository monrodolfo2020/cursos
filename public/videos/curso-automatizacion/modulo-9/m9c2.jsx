// m9c2.jsx — "Normas y procedimientos: LOTO y trabajo en altura"
// After m9-lib.jsx. Exports SCENES_M9C2.

// ── Por qué LOTO ──────────────────────────────────────────────────────────────
function S_WhyLoto({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="El equipo se opera desde el PLC" y="11%" color={TL9.red} />
      <CapM9 start={s + 0.6} dur={2.4} size={46} weight={600} y="22%" width={1620}>Alguien puede arrancar la bomba <span style={{ color: TL9.red }}>sin saber</span> que estás dentro de ella.</CapM9>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM9 x={250} y={460} w={360} h={120} label="Sala de control" sub="operador · PLC" accent={TL9.org} t={t} appear={s + 1.4} />
        <ArrowM9 x1={610} y1={520} x2={1100} y2={520} start={s + 1.9} t={t} color={TL9.red} label="arranque remoto" />
        <NodeM9 x={1100} y={460} w={360} h={120} label="Bomba P-101" sub="mantenedor dentro" accent={TL9.red} t={t} appear={s + 2.1} />
      </svg>
      <CapM9 start={s + 3.6} dur={dur - 3.9} size={25} weight={500} color={TL9.ylwLt} y="78%" width={1560}>Con <b style={{ color: TL9.ink }}>LOTO</b> bien implementado es <b style={{ color: TL9.grn }}>físicamente imposible</b> energizar el equipo mientras el candado está puesto.</CapM9>
    </SceneM9>
  );
}

// ── Las 6 fuentes de energía ──────────────────────────────────────────────────
function S_Energies({ start, dur }) {
  const t = useTime(); const s = start;
  const en = [
    { ic: '⚡', name: 'Eléctrica', d: 'Desconectar el interruptor y poner candado.', a: TL9.ylw },
    { ic: '💨', name: 'Neumática', d: 'Cerrar el aire, ventear la presión residual.', a: TL9.org },
    { ic: '🛢️', name: 'Hidráulica', d: 'Cerrar válvulas, liberar presión acumulada.', a: TL9.org },
    { ic: '⚙️', name: 'Mecánica', d: 'Bloquear partes móviles: resortes, volantes.', a: TL9.ylwLt },
    { ic: '🔥', name: 'Térmica', d: 'Enfriar a temperatura segura antes de entrar.', a: TL9.red },
    { ic: '☣️', name: 'Química', d: 'Purgar y ventear tuberías con sustancias.', a: TL9.grn },
  ];
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Toda fuente de energía debe aislarse" y="8%" />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="14%" width={1560}>No basta cortar la electricidad: son seis.</CapM9>
      <div style={{ position: 'absolute', left: 200, top: 250, width: 1520, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {en.map((x, i) => {
          const ap = pop9(t, s + 1.1 + i * 0.28, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', display: 'flex', gap: 18, alignItems: 'center', background: TL9.paper, border: `1px solid ${TL9.lineS}`, borderLeft: `4px solid ${x.a}`, borderRadius: 12, padding: '20px 24px', height: 130 }}>
              <span style={{ fontSize: 34, flexShrink: 0 }}>{x.ic}</span>
              <div>
                <div style={{ fontFamily: DISP9, fontSize: 23, fontWeight: 700, color: TL9.ink }}>{x.name}</div>
                <div style={{ fontFamily: DISP9, fontSize: 16.5, color: TL9.mut, marginTop: 4, lineHeight: 1.35 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
      <CapM9 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL9.ylwLt} y="88%" width={1560}>La energía residual mata: condensadores cargados, presión atrapada, masas que pueden caer por gravedad.</CapM9>
    </SceneM9>
  );
}

// ── Los 7 pasos LOTO ──────────────────────────────────────────────────────────
function S_Steps({ start, dur }) {
  const t = useTime(); const s = start;
  const steps = [
    ['1', 'Preparación', 'Identificar TODAS las fuentes · notificar afectados'],
    ['2', 'Apagar', 'Parar el equipo por el procedimiento normal'],
    ['3', 'Aislar', 'Interruptor OFF / válvula cerrada + candado + etiqueta'],
    ['4', 'Energía residual', 'Descargar condensadores, ventear presión, bloquear masas'],
    ['5', 'Verificar (Try Out)', 'Intentar arrancar → DEBE NO RESPONDER · medir 0 V'],
    ['6', 'Trabajar', 'Cada persona, SU PROPIO candado'],
    ['7', 'Restaurar', 'Retirar herramientas y candados · reenergizar'],
  ];
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Procedimiento LOTO · OSHA 29 CFR 1910.147" y="8%" color={TL9.ylw} />
      <CapM9 start={s + 0.6} dur={2.0} size={42} weight={600} y="14%" width={1560}>Siete pasos, sin saltarse ninguno.</CapM9>
      <div style={{ position: 'absolute', left: '50%', top: 240, transform: 'translateX(-50%)', width: 1300 }}>
        {steps.map((x, i) => {
          const ap = pop9(t, s + 1.1 + i * 0.28, 0.5, 14);
          const crit = i === 4;
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 22, marginBottom: 11, background: TL9.paper, border: `1px solid ${crit ? TL9.red : TL9.lineS}`, borderRadius: 11, padding: '15px 24px' }}>
              <span style={{ width: 44, height: 44, borderRadius: 10, background: crit ? TL9.redWash : TL9.ylwWash, border: `1.5px solid ${crit ? TL9.red : TL9.ylw}`, color: crit ? TL9.red : TL9.ylw, fontFamily: DISP9, fontSize: 23, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{x[0]}</span>
              <span style={{ fontFamily: DISP9, fontSize: 22, fontWeight: 700, color: TL9.ink, minWidth: 250 }}>{x[1]}</span>
              <span style={{ fontFamily: MONO9, fontSize: 15.5, color: crit ? TL9.ylwLt : TL9.mut }}>{x[2]}</span>
            </div>
          );
        })}
      </div>
      <CapM9 start={s + 4.0} dur={dur - 4.3} size={22} weight={500} color={TL9.mut} y="93%" width={1560}>Nadie retira el candado de otro: solo su propietario. Si hay 3 técnicos → 3 candados, cada uno con su propia llave.</CapM9>
    </SceneM9>
  );
}

// ── Trabajo en altura ─────────────────────────────────────────────────────────
function S_Height({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM9 start={start} dur={dur}>
      <KickerM9 start={s + 0.3} dur={dur - 0.5} text="Trabajo en altura · > 1.8 m" y="9%" color={TL9.org} />
      <CapM9 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Una caída de 2 metros puede ser fatal.</CapM9>
      <InfoCardM9 x={160} y={300} w={500} h={270} accent={TL9.ylw} no={1} title="Arnés de cuerpo completo" sub="Distribuye la carga del impacto por todo el cuerpo al caer." appear={s + 1.3} t={t} />
      <InfoCardM9 x={700} y={300} w={500} h={270} accent={TL9.org} no={2} title="Línea de vida (Lanyard)" sub="Une el arnés al anclaje. Absorbe energía y reduce la fuerza de impacto." appear={s + 1.7} t={t} />
      <InfoCardM9 x={1240} y={300} w={500} h={270} accent={TL9.grn} no={3} title="Punto de anclaje" sub="Debe soportar ≥ 2.270 kg (22 kN). Solo estructuras certificadas." appear={s + 2.1} t={t} />
      <div style={{ position: 'absolute', left: '50%', top: 620, transform: 'translateX(-50%)', width: 1480 }}>
        {(() => { const ap = pop9(t, s + 2.8, 0.55, 18); return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 22, background: TL9.redWash, border: `1px solid ${TL9.red}`, borderRadius: 12, padding: '22px 28px', boxShadow: TL9.shadowSm }}>
            <span style={{ fontFamily: MONO9, fontSize: 14, letterSpacing: '0.16em', color: TL9.red, fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Síndrome del arnés</span>
            <span style={{ fontFamily: DISP9, fontSize: 20, color: TL9.ink, lineHeight: 1.4 }}>Tras una caída detenida, colgar inmóvil comprime los vasos de las piernas. En <b style={{ color: TL9.red }}>10–15 min</b> hay daño grave → SIEMPRE rescatar en menos de 15 minutos.</span>
          </div>
        ); })()}
      </div>
    </SceneM9>
  );
}

const SCENES_M9C2 = [
  { C: (p) => <TitleCardM9 {...p} claseNo={2} seccion="LOTO y altura" title="LOTO y trabajo en altura" dudur="18–20 min" objetivo="Dominar el procedimiento LOTO (Lockout/Tagout) para mantenimiento seguro, la norma OSHA 1910.147 y los fundamentos del trabajo seguro en altura." />, dur: 7, label: 'Apertura' },
  { C: S_WhyLoto, dur: 13, label: 'Por qué LOTO' },
  { C: S_Energies, dur: 13, label: 'Las 6 energías' },
  { C: S_Steps, dur: 15, label: 'Los 7 pasos' },
  { C: S_Height, dur: 14, label: 'Trabajo en altura' },
  { C: (p) => <ClosingM9 {...p} line="El candado LOTO no es burocracia: es la barrera física entre tu vida y un arranque accidental. Y en altura, tu arnés solo sirve si está bien anclado." activity="Con el procedimiento de mantenimiento de una bomba: identifica las fuentes de energía a aislar, escribe el procedimiento LOTO paso a paso, diseña la etiqueta LOTO con todos sus campos y determina si requiere permiso de trabajo en altura." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M9C2 = SCENES_M9C2;
