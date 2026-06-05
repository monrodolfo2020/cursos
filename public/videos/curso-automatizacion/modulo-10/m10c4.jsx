// m10c4.jsx — "Gemelos digitales e instrumentación virtual"
// After m10-lib.jsx. Exports SCENES_M10C4.

// ── Qué es un gemelo digital ──────────────────────────────────────────────────
function S_What({ start, dur }) {
  const t = useTime(); const s = start;
  const lvlR = 0.6 + 0.08 * Math.sin((t - s) * 0.9);
  const lvlT = lvlR + 0.015 * Math.sin((t - s) * 0.9 + 0.3);
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="No es una simulación genérica" y="9%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="17%" width={1620}>El gemelo modela <span style={{ color: TL10.mint }}>esa</span> bomba — con sus desgastes, su historial, sus medidas reales.</CapM10>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM10 x={350} y={420} w={320} h={140} label="PROCESO REAL" sub="sensores físicos" accent={TL10.amber} t={t} appear={s + 1.3} online />
        <NodeM10 x={1250} y={420} w={320} h={140} label="GEMELO DIGITAL" sub="modelo calibrado" accent={TL10.mint} t={t} appear={s + 1.6} online />
        <LinkM10 x1={670} y1={490} x2={1250} y2={490} start={s + 2.0} t={t} color={TL10.mag} label="mismos datos en tiempo real" back />
        <text x={510} y={600} fill={TL10.mut} fontFamily={MONO10} fontSize="17" textAnchor="middle" opacity={clamp((t - (s + 2.6)) / 0.5, 0, 1)}>nivel {(lvlR * 4).toFixed(2)} m</text>
        <text x={1410} y={600} fill={TL10.mintLt} fontFamily={MONO10} fontSize="17" textAnchor="middle" opacity={clamp((t - (s + 2.6)) / 0.5, 0, 1)}>nivel {(lvlT * 4).toFixed(2)} m</text>
      </svg>
      <CapM10 start={s + 3.8} dur={dur - 4.1} size={24} weight={500} color={TL10.magLt} y="78%" width={1560}>Una réplica digital interconectada con su contraparte real, que coexisten a lo largo de todo su ciclo de vida.</CapM10>
    </SceneM10>
  );
}

// ── Los 3 niveles ─────────────────────────────────────────────────────────────
function S_Levels({ start, dur }) {
  const t = useTime(); const s = start;
  const lv = [
    { n: '1', name: 'Gemelo de estado', d: 'Refleja el estado actual en tiempo real. Visualización 3D con datos del SCADA.', a: TL10.iris },
    { n: '2', name: 'Gemelo de rendimiento', d: 'Compara lo actual con lo óptimo esperado. Si la bomba gasta 5 % más → degradación.', a: TL10.mint },
    { n: '3', name: 'Gemelo predictivo', d: '«73 % de probabilidad de fallo en los próximos 45 días» según patrón y 500 bombas similares.', a: TL10.mag },
  ];
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Tres niveles de gemelo digital" y="9%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1500}>De ver, a comparar, a predecir.</CapM10>
      <div style={{ position: 'absolute', left: 200, top: 320, width: 1520, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {lv.map((x, i) => {
          const ap = pop10(t, s + 1.2 + i * 0.4, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', background: `linear-gradient(160deg, ${TL10.paper}, ${TL10.bg2})`, border: `1px solid ${i === 2 ? TL10.mag : TL10.lineS}`, borderRadius: 14, padding: '26px 24px', height: 300, boxShadow: TL10.shadowSm }}>
              <span style={{ width: 50, height: 50, borderRadius: 12, background: TL10.bg2, border: `1.5px solid ${x.a}`, color: x.a, fontFamily: DISP10, fontSize: 26, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{x.n}</span>
              <div style={{ fontFamily: DISP10, fontSize: 24, fontWeight: 700, color: TL10.ink, margin: '16px 0 12px', lineHeight: 1.1 }}>{x.name}</div>
              <div style={{ fontFamily: DISP10, fontSize: 18, color: TL10.mut, lineHeight: 1.44 }}>{x.d}</div>
            </div>
          );
        })}
      </div>
    </SceneM10>
  );
}

// ── Instrumentación virtual ───────────────────────────────────────────────────
function S_Virtual({ start, dur }) {
  const t = useTime(); const s = start;
  const ex = [
    ['🌡️', 'Temperatura interna del motor', 'Sin sensor: se calcula con corriente, voltaje y velocidad (±3 °C).'],
    ['🔧', 'Desgaste de válvula', 'Si tardar de 50→60 % pasó de 200 a 450 ms → empaquetadura desgastada.'],
    ['💧', 'Caudal sin caudalímetro', 'Con la curva de bomba + presiones + velocidad VFD (±5 %).'],
    ['🧪', 'Calidad del agua', 'Modelo que correlaciona turbidez, pH, temperatura y dosificación.'],
  ];
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Sensores que no existen físicamente" y="9%" color={TL10.mint} />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Medir variables que nadie instaló.</CapM10>
      <div style={{ position: 'absolute', left: 200, top: 320, width: 1520, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 22 }}>
        {ex.map((x, i) => {
          const ap = pop10(t, s + 1.2 + i * 0.3, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', gap: 20, alignItems: 'center', background: TL10.paper, border: `1px solid ${TL10.lineS}`, borderLeft: `4px solid ${TL10.mint}`, borderRadius: 12, padding: '22px 26px', height: 150 }}>
              <span style={{ fontSize: 34, flexShrink: 0 }}>{x[0]}</span>
              <div>
                <div style={{ fontFamily: DISP10, fontSize: 22, fontWeight: 700, color: TL10.ink }}>{x[1]}</div>
                <div style={{ fontFamily: DISP10, fontSize: 17, color: TL10.mut, marginTop: 5, lineHeight: 1.4 }}>{x[2]}</div>
              </div>
            </div>
          );
        })}
      </div>
      <CapM10 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL10.magLt} y="88%" width={1560}>No reemplaza a un caudalímetro calibrado — pero da estimación, respaldo y diagnóstico sin instalar nada.</CapM10>
    </SceneM10>
  );
}

// ── Caso planta de agua ───────────────────────────────────────────────────────
function S_WaterCase({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Gemelo digital · proyecto del curso" y="9%" color={TL10.mag} />
      <CapM10 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>Tres variables virtuales de la planta de agua.</CapM10>
      <InfoCardM10 x={170} y={310} w={500} h={300} accent={TL10.mint} title="Eficiencia de bombeo" sub="η = (ΔP · Q) / (√3 · V · I · cos φ). Calculada en vivo desde corriente, presiones y caudal." appear={s + 1.3} t={t} />
      <InfoCardM10 x={710} y={310} w={500} h={300} accent={TL10.iris} title="Vida útil del filtro" sub="Modelo de colmatación: correlaciona el ΔP de PDT-201 con el tiempo y el caudal → predice el backwash." appear={s + 1.7} t={t} />
      <InfoCardM10 x={1250} y={310} w={500} h={300} accent={TL10.amber} title="Demanda de cloro" sub="Correlaciona turbidez, temperatura y pH con la dosis necesaria → optimiza antes del análisis de laboratorio." appear={s + 2.1} t={t} />
      <CapM10 start={s + 3.4} dur={dur - 3.7} size={22} weight={500} color={TL10.mut} y="88%" width={1560}>Herramientas para empezar: Python + pandas + scikit-learn · MATLAB/Simulink · Azure Digital Twins · Node-RED + InfluxDB + Grafana.</CapM10>
    </SceneM10>
  );
}

const SCENES_M10C4 = [
  { C: (p) => <TitleCardM10 {...p} claseNo={4} seccion="Gemelos digitales" title="Gemelos digitales e instrumentación virtual" dudur="16–18 min" objetivo="Comprender el gemelo digital y cómo se construye desde la instrumentación, sus aplicaciones industriales actuales y las herramientas para empezar a trabajar con esta tecnología." />, dur: 7, label: 'Apertura' },
  { C: S_What, dur: 13, label: 'Qué es' },
  { C: S_Levels, dur: 13, label: 'Los 3 niveles' },
  { C: S_Virtual, dur: 14, label: 'Instrumentación virtual' },
  { C: S_WaterCase, dur: 13, label: 'Caso planta de agua' },
  { C: (p) => <ClosingM10 {...p} line="El gemelo digital convierte los datos que ya recoges en un modelo vivo del proceso — y te deja medir, predecir y optimizar sin instalar un solo sensor más." activity="Implementa en Python un modelo de eficiencia de bomba: exporta 1 h del Historian (corriente, presiones, caudal), calcula la eficiencia hidráulica en cada punto, grafica eficiencia vs caudal, halla el BEP y concluye si la bomba opera cerca o lejos de él." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M10C4 = SCENES_M10C4;
