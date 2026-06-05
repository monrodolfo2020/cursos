// m10c2.jsx — "Foundation Fieldbus e IO-Link: buses de campo modernos"
// After m10-lib.jsx. Exports SCENES_M10C2.

// ── La visión de Foundation Fieldbus ──────────────────────────────────────────
function S_FFvision({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Foundation Fieldbus · la visión radical" y="9%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="17%" width={1620}>Llevar el control <span style={{ color: TL10.mint }}>al campo</span>, no centralizarlo en el PLC.</CapM10>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* traditional */}
        <text x={520} y={360} fill={TL10.dim} fontFamily={MONO10} fontSize="16" textAnchor="middle" opacity={clamp((t - (s + 1.2)) / 0.5, 0, 1)}>TRADICIONAL · el PID vive en el PLC</text>
        <NodeM10 x={150} y={390} w={180} h={90} label="Sensor" accent={TL10.mut} t={t} appear={s + 1.2} />
        <ArrowM10 x1={330} y1={435} x2={430} y2={435} start={s + 1.5} t={t} color={TL10.dim} />
        <NodeM10 x={430} y={385} w={180} h={100} label="PLC" sub="PID" accent={TL10.amber} t={t} appear={s + 1.4} />
        <ArrowM10 x1={610} y1={435} x2={710} y2={435} start={s + 1.7} t={t} color={TL10.dim} />
        <NodeM10 x={710} y={390} w={180} h={90} label="Válvula" accent={TL10.mut} t={t} appear={s + 1.6} />
      </svg>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <text x={1300} y={360} fill={TL10.mint} fontFamily={MONO10} fontSize="16" textAnchor="middle" opacity={clamp((t - (s + 2.4)) / 0.5, 0, 1)}>FOUNDATION FIELDBUS · el PID vive en el campo</text>
        <NodeM10 x={1040} y={385} w={230} h={100} label="Transmisor" sub="AI + PID" accent={TL10.mag} t={t} appear={s + 2.4} />
        <LinkM10 x1={1270} y1={435} x2={1490} y2={435} start={s + 2.7} t={t} color={TL10.mint} label="bus FF · 1 cable" back />
        <NodeM10 x={1490} y={385} w={230} h={100} label="Válvula" sub="AO" accent={TL10.iris} t={t} appear={s + 2.8} />
      </svg>
      <CapM10 start={s + 4.0} dur={dur - 4.3} size={23} weight={500} color={TL10.magLt} y="82%" width={1560}>Si el controlador central falla, el proceso <b style={{ color: TL10.ink }}>sigue corriendo</b> con el control distribuido en los instrumentos.</CapM10>
    </SceneM10>
  );
}

// ── Bloques funcionales FF ────────────────────────────────────────────────────
function S_FFblocks({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Bloques funcionales en el instrumento" y="9%" color={TL10.mint} />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Lazo de caudal completo, sin tocar el DCS.</CapM10>
      <TableM10 x={300} y={290} w={1320} t={t} appear={s + 1.2} accentCol={2}
        headers={['Bloque', 'Función', 'Dónde vive']}
        colTemplate="1fr 1.8fr 1.4fr"
        rows={[
          ['AI', 'Leer el sensor y escalar la señal', 'Transmisor'],
          ['PID', 'Algoritmo de control', 'Transmisor o válvula'],
          ['AO', 'Mover el actuador', 'Posicionador'],
          ['Characterizer', 'Linealizar sensor no lineal', 'Instrumento'],
        ]} />
      <CapM10 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL10.mintLt} y="86%" width={1560}>H1: 31.25 kbps · hasta 32 dispositivos y 1900 m por segmento · alimentación en el bus · determinista (macrocycle). Para refinería y petroquímica de gran escala.</CapM10>
    </SceneM10>
  );
}

// ── IO-Link · el USB industrial ───────────────────────────────────────────────
function S_IOLink({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="IO-Link · el USB de la automatización" y="9%" color={TL10.iris} />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>La «última milla»: del sensor tonto al mundo digital.</CapM10>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM10 x={200} y={460} w={240} h={120} label="PLC / CPU" sub="PROFINET" accent={TL10.amber} t={t} appear={s + 1.2} />
        <LinkM10 x1={440} y1={520} x2={640} y2={520} start={s + 1.5} t={t} color={TL10.iris} />
        <NodeM10 x={640} y={450} w={260} h={140} label="IO-Link Master" sub="4 / 8 / 16 puertos" accent={TL10.mag} t={t} appear={s + 1.6} />
        {[['Distancia', 350], ['Temperatura', 460], ['Solenoide', 570], ['Nivel', 680]].map((p, i) => {
          const ap = clamp((t - (s + 2.2 + i * 0.2)) / 0.5, 0, 1);
          return (
            <g key={i} opacity={ap}>
              <line x1={900} y1={520} x2={1100} y2={p[1]} stroke={TL10.mintWash} strokeWidth="2.5" />
              <rect x={1100} y={p[1] - 28} width={300} height={56} rx="10" fill={TL10.paper} stroke={TL10.mint} strokeWidth="2" />
              <text x={1120} y={p[1] + 7} fill={TL10.ink} fontFamily={MONO10} fontSize="16">Puerto {i + 1} · {p[0]}</text>
            </g>
          );
        })}
      </svg>
      <CapM10 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL10.mut} y="88%" width={1560}>Punto a punto (no bus compartido) · cable M12 estándar de 3 hilos · hasta 20 m · sin direcciones, plug and play · IEC 61131-9.</CapM10>
    </SceneM10>
  );
}

// ── Lo que IO-Link hace posible ───────────────────────────────────────────────
function S_IOLinkBenefits({ start, dur }) {
  const t = useTime(); const s = start;
  const b = [
    { ic: '🎛️', name: 'Parámetros remotos', d: 'Cambiar el punto de conmutación desde el PLC/SCADA, sin ir al campo.', a: TL10.mag },
    { ic: '🆔', name: 'Autoidentificación', d: 'El Master lee fabricante, modelo y firmware al conectar. Alarma si lo cambian.', a: TL10.mint },
    { ic: '🩺', name: 'Diagnósticos', d: 'Temperatura interna, contador de operaciones, calidad de detección, suciedad.', a: TL10.iris },
    { ic: '🔁', name: 'Plug and Play', d: 'Al reemplazar por el mismo modelo, el Master le descarga los parámetros. Cero ajuste.', a: TL10.amber },
  ];
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Lo que IO-Link hace posible" y="9%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1500}>Un sensor que habla, no solo que conmuta.</CapM10>
      <div style={{ position: 'absolute', left: 200, top: 320, width: 1520, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 22 }}>
        {b.map((x, i) => {
          const ap = pop10(t, s + 1.2 + i * 0.3, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', gap: 20, alignItems: 'center', background: TL10.paper, border: `1px solid ${TL10.lineS}`, borderLeft: `4px solid ${x.a}`, borderRadius: 12, padding: '22px 26px', height: 150 }}>
              <span style={{ fontSize: 36, flexShrink: 0 }}>{x.ic}</span>
              <div>
                <div style={{ fontFamily: DISP10, fontSize: 23, fontWeight: 700, color: TL10.ink }}>{x.name}</div>
                <div style={{ fontFamily: DISP10, fontSize: 17, color: TL10.mut, marginTop: 5, lineHeight: 1.4 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SceneM10>
  );
}

// ── Comparativa convencional vs IO-Link ───────────────────────────────────────
function S_Compare({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Convencional vs IO-Link" y="9%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Más caro el sensor, más barata la instalación.</CapM10>
      <TableM10 x={260} y={290} w={1400} t={t} appear={s + 1.2} accentCol={2}
        headers={['Característica', 'Convencional', 'IO-Link']}
        colTemplate="1.3fr 1.3fr 1.4fr"
        rows={[
          ['Información', 'Solo el valor', 'Valor + diagnóstico + identidad'],
          ['Configuración', 'Tornillo en campo', 'Remota desde PLC/SCADA'],
          ['Cable', 'Par trenzado blindado', 'M12 estándar sin blindaje'],
          ['Reemplazo', 'Requiere ajuste', 'Plug and Play automático'],
          ['Diagnóstico preventivo', 'No disponible', 'Sí — detección temprana'],
        ]} />
      <CapM10 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL10.mintLt} y="87%" width={1560}>El sensor cuesta 20–40 % más, pero el cable simple y el comisionado nulo bajan el <b style={{ color: TL10.ink }}>costo total de instalación</b>.</CapM10>
    </SceneM10>
  );
}

const SCENES_M10C2 = [
  { C: (p) => <TitleCardM10 {...p} claseNo={2} seccion="Buses de campo" title="Foundation Fieldbus e IO-Link" dudur="18–20 min" objetivo="Comprender Foundation Fieldbus como la evolución del bus de campo con control en el instrumento, conocer IO-Link como el estándar de la última milla y cuándo usar cada uno." />, dur: 7, label: 'Apertura' },
  { C: S_FFvision, dur: 14, label: 'La visión de FF' },
  { C: S_FFblocks, dur: 12, label: 'Bloques funcionales' },
  { C: S_IOLink, dur: 14, label: 'IO-Link' },
  { C: S_IOLinkBenefits, dur: 13, label: 'Lo que habilita' },
  { C: S_Compare, dur: 13, label: 'Comparativa' },
  { C: (p) => <ClosingM10 {...p} line="Foundation Fieldbus llevó el control al campo desde arriba; IO-Link digitalizó el sensor más humilde desde abajo. Dos respuestas a la misma pregunta: ¿cuánta inteligencia ponemos en el borde?" activity="Compara dos diseños para una línea con 24 sensores de posición y 8 de temperatura: calcula el costo total de instalación (cable, mano de obra, comisionado) para la solución convencional vs IO-Link y justifica cuál recomiendas." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M10C2 = SCENES_M10C2;
