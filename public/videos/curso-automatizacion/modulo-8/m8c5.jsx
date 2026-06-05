// m8c5.jsx — "Diseño de sinópticos: filosofía ASM y componentes Perspective"
// After m8-lib.jsx. Exports SCENES_M8C5.

// ── La filosofía ASM ──────────────────────────────────────────────────────────
function S_Intro({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Por qué el diseño importa" y="13%" color={TL8.red} />
      <StatM8 x="50%" y="40%" value="42" unit="%" label="de los incidentes en planta: error del operador por mala información en el HMI" accent={TL8.red} appear={s + 1.0} t={t} align="center" />
      <CapM8 start={s + 2.6} dur={dur - 2.9} size={32} weight={500} color={TL8.mut} y="68%" width={1500}>La filosofía <b style={{ color: TL8.coral }}>ASM</b> (Abnormal Situation Management): la interfaz debe ayudar a detectar problemas <span style={{ color: TL8.ink }}>antes</span> de que se vuelvan emergencias.</CapM8>
    </SceneM8>
  );
}

// ── Los 6 principios ASM ──────────────────────────────────────────────────────
function S_Principles({ start, dur }) {
  const t = useTime(); const s = start;
  const p = [
    ['1', 'Jerarquía de pantallas', 'Overview → Unit → Equipment → Diagnostic. Cualquier dato en ≤ 3 clics.'],
    ['2', 'Gris para lo normal', 'Color brillante SOLO para lo anormal. En un sinóptico gris, lo rojo salta.'],
    ['3', 'Información contextual', 'Mostrar el rango normal junto al valor: 75 °C (60–85 °C).'],
    ['4', 'Tendencia en pantalla', 'Mini-sparklines: ¿sube, baja o estable? sin salir de la vista.'],
    ['5', 'Sin decoración', 'Sin tuberías «animadas», gradientes ni logos que distraen.'],
    ['6', 'Consistencia', 'Mismo color = mismo significado en toda la planta. Navegación igual.'],
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Seis principios ASM" y="8%" />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="14%" width={1500}>Cada pixel debe tener un propósito informativo.</CapM8>
      <div style={{ position: 'absolute', left: 130, top: 250, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {p.map((x, i) => {
          const ap = pop8(t, s + 1.1 + i * 0.28, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderRadius: 12, padding: '22px 24px', height: 215 }}>
              <span style={{ fontFamily: DISP8, fontSize: 30, fontWeight: 700, color: TL8.coral }}>{x[0]}</span>
              <div style={{ fontFamily: DISP8, fontSize: 22, fontWeight: 700, color: TL8.ink, margin: '8px 0 10px' }}>{x[1]}</div>
              <div style={{ fontFamily: DISP8, fontSize: 17, color: TL8.mut, lineHeight: 1.42 }}>{x[2]}</div>
            </div>
          );
        })}
      </div>
    </SceneM8>
  );
}

// ── Gris vs color · la clave ──────────────────────────────────────────────────
function S_GrayDemo({ start, dur }) {
  const t = useTime(); const s = start;
  const Panel = ({ x, asm }) => {
    const ap = pop8(t, s + (asm ? 1.7 : 1.2), 0.55, 20);
    const cells = asm
      ? [TL8.mut, TL8.mut, TL8.mut, TL8.red, TL8.mut, TL8.mut, TL8.mut, TL8.mut, TL8.mut]
      : [TL8.steel, TL8.honey, TL8.grn, TL8.red, TL8.coral, TL8.steel, TL8.honey, TL8.grn, TL8.coral];
    return (
      <div style={{ position: 'absolute', left: x, top: 320, width: 640, opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top' }}>
        <div style={{ fontFamily: MONO8, fontSize: 15, letterSpacing: '0.16em', textTransform: 'uppercase', color: asm ? TL8.grn : TL8.red, fontWeight: 700, marginBottom: 14 }}>{asm ? '✓ Filosofía ASM' : '✕ Exceso de color'}</div>
        <div style={{ background: asm ? '#23262d' : '#1c2029', border: `1px solid ${TL8.lineS}`, borderRadius: 12, padding: 26, boxShadow: TL8.shadow }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {cells.map((c, i) => {
              const blink = c === TL8.red && Math.sin(t * 5) > 0;
              return (
                <div key={i} style={{ height: 90, borderRadius: 8, background: asm ? '#2c303a' : TL8.bg2, border: `2px solid ${c === TL8.red && blink ? TL8.red : (asm ? 'rgba(150,168,196,0.2)' : c)}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: c === TL8.red ? `0 0 ${blink ? 18 : 8}px ${TL8.red}` : 'none' }}>
                  <span style={{ width: 14, height: 14, borderRadius: 8, background: c, marginBottom: 8 }} />
                  <span style={{ fontFamily: MONO8, fontSize: 13, color: c === TL8.red ? TL8.red : (asm ? TL8.mut : c) }}>{c === TL8.red ? 'ALARMA' : 'normal'}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="La misma planta, dos diseños" y="10%" />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="18%" width={1560}>¿Dónde está la alarma? Encuéntrala en cada panel.</CapM8>
      <Panel x={180} asm={false} />
      <Panel x={1100} asm={true} />
      <CapM8 start={s + 3.6} dur={dur - 3.9} size={25} weight={500} color={TL8.steelLt} y="88%" width={1560}>En el sinóptico colorido todo «llama la atención» → nada destaca. En el gris, la anomalía es <b style={{ color: TL8.red }}>imposible de no ver</b>.</CapM8>
    </SceneM8>
  );
}

// ── Vista General (Nivel 1) del proyecto ──────────────────────────────────────
function S_GeneralView({ start, dur }) {
  const t = useTime(); const s = start;
  const lvlIn = 0.6 + 0.04 * Math.sin((t - s) * 0.8);
  const lvlOut = 0.82 + 0.03 * Math.sin((t - s) * 0.6 + 1);
  const temp = 75 + 2 * Math.sin((t - s) * 0.5);
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Vista General · Nivel 1 · proyecto del curso" y="7%" color={TL8.coral} />
      <CapM8 start={s + 0.6} dur={1.8} size={40} weight={600} y="13%" width={1560}>El proceso de izquierda a derecha, de un vistazo.</CapM8>
      <HMIFrameM8 x={160} y={230} w={1600} h={660} title="Vista_General — Perspective" t={t} appear={s + 1.1} tabs={['General', 'Captación', 'Reactor', 'Salida']}>
        {/* header strip */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 50, background: '#23262d', borderBottom: `1px solid ${TL8.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', fontFamily: MONO8, fontSize: 14, color: TL8.mut }}>
          <span>PLANTA TRATAMIENTO DE AGUA</span>
          <span style={{ color: TL8.grn }}>● OPERACIÓN</span>
        </div>
        {/* three area columns */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 50, bottom: 0, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          {/* Captación */}
          <div style={{ borderRight: `1px solid ${TL8.line}`, padding: '20px 24px', position: 'relative' }}>
            <div style={{ fontFamily: MONO8, fontSize: 13, letterSpacing: '0.16em', color: TL8.dim, textTransform: 'uppercase' }}>Captación</div>
            <svg width="100%" height="280" style={{ overflow: 'visible', marginTop: 16 }}>
              <TankM8 x={60} y={30} w={130} h={180} level={lvlIn} accent={TL8.steel} tag="T-101" valTxt={(lvlIn * 4).toFixed(1) + ' m'} t={t} appear={s + 1.8} />
            </svg>
            <LedM8 x={24} y={330} on={true} color={TL8.grn} label="Bomba P-101" sub="CORRIENDO" t={t} appear={s + 2.6} />
            <div style={{ position: 'absolute', left: 24, top: 388, fontFamily: MONO8, fontSize: 15, color: TL8.honey }}>FT-101: 95 m³/h</div>
          </div>
          {/* Tratamiento */}
          <div style={{ borderRight: `1px solid ${TL8.line}`, padding: '20px 24px', position: 'relative' }}>
            <div style={{ fontFamily: MONO8, fontSize: 13, letterSpacing: '0.16em', color: TL8.dim, textTransform: 'uppercase' }}>Tratamiento</div>
            <GaugeM8 x={70} y={40} value={temp.toFixed(0)} frac={temp / 100} unit="°C" label="Reactor R-301" sub="SP 75 °C" accent={TL8.honey} t={t} appear={s + 2.2} size={180} />
            <LedM8 x={24} y={330} on={true} color={TL8.grn} label="Agitador AG-301" sub="ON" t={t} appear={s + 2.8} />
            <div style={{ position: 'absolute', left: 24, top: 388, fontFamily: MONO8, fontSize: 15, color: TL8.mut }}>FCV-301: 45 % · ΔP filtro OK</div>
          </div>
          {/* Distribución */}
          <div style={{ padding: '20px 24px', position: 'relative' }}>
            <div style={{ fontFamily: MONO8, fontSize: 13, letterSpacing: '0.16em', color: TL8.dim, textTransform: 'uppercase' }}>Distribución</div>
            <svg width="100%" height="280" style={{ overflow: 'visible', marginTop: 16 }}>
              <TankM8 x={60} y={30} w={130} h={180} level={lvlOut} accent={TL8.steel} tag="T-401" valTxt={(lvlOut * 5).toFixed(1) + ' m'} t={t} appear={s + 2.0} />
            </svg>
            <div style={{ position: 'absolute', left: 24, top: 330, fontFamily: MONO8, fontSize: 15, color: TL8.honey }}>FT-401: 85 m³/h</div>
            <div style={{ position: 'absolute', left: 24, top: 366, fontFamily: MONO8, fontSize: 15, color: TL8.honey }}>PT-401: 4.2 bar</div>
          </div>
        </div>
      </HMIFrameM8>
      <CapM8 start={s + 4.6} dur={dur - 4.9} size={21} weight={500} color={TL8.mut} y="92%" width={1500}>Fondo gris (filosofía ASM) · valores en rango sin color de alarma · todo enlazado a tags reales del PLC.</CapM8>
    </SceneM8>
  );
}

const SCENES_M8C5 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={5} seccion="Sinópticos ASM" title="Diseño de sinópticos: filosofía ASM" dudur="20–22 min" objetivo="Diseñar sinópticos industriales de alta calidad con la filosofía ASM, dominar los componentes de Perspective y construir las vistas principales del SCADA." />, dur: 7, label: 'Apertura' },
  { C: S_Intro, dur: 11, label: 'La filosofía ASM' },
  { C: S_Principles, dur: 14, label: 'Los 6 principios' },
  { C: S_GrayDemo, dur: 13, label: 'Gris vs color' },
  { C: S_GeneralView, dur: 16, label: 'Vista General Nivel 1' },
  { C: (p) => <ClosingM8 {...p} line="Un buen sinóptico no es bonito: es legible bajo presión. El gris no es aburrido — es el silencio sobre el que la alarma puede gritar." activity="Construye la Vista General completa en Perspective: fondo gris ASM, esquema del proceso con tanques y equipos, 4 indicadores con zonas de color, 2 LEDs de bomba, 5 valores con unidades y un banner de alarmas — todo enlazado a los tags del PLC." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M8C5 = SCENES_M8C5;
