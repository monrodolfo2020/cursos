// m11c8.jsx — "Presentación final y evaluación" (cierre del curso)
// After m11-lib.jsx. Exports SCENES_M11C8.

// ── Estructura de la presentación ─────────────────────────────────────────────
function S_Pitch({ start, dur }) {
  const t = useTime(); const s = start;
  const parts = [
    ['1', 'El problema', 'Qué planta, qué necesidad de automatización · 2 min'],
    ['2', 'La solución', 'Arquitectura, hardware y red elegidos · 3 min'],
    ['3', 'Demo en vivo', 'Arranque de planta en PLCSIM + SCADA · 5 min'],
    ['4', 'Gestión de fallos', 'Provocar una alarma y resolverla · 3 min'],
    ['5', 'Resultados', 'Pruebas FAT, KPIs, decisiones de diseño · 2 min'],
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Defender el proyecto · 15 minutos" y="9%" />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1500}>Saber hacerlo no basta: hay que saber contarlo.</CapM11>
      <div style={{ position: 'absolute', left: '50%', top: 300, transform: 'translateX(-50%)', width: 1300 }}>
        {parts.map((x, i) => {
          const ap = pop11(t, s + 1.2 + i * 0.3, 0.5, 14);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 22, marginBottom: 13, background: i === 2 ? TL11.limeWash : TL11.paper, border: `1px solid ${i === 2 ? TL11.lime : TL11.lineS}`, borderRadius: 11, padding: '16px 26px' }}>
              <span style={{ width: 40, height: 40, borderRadius: 9, background: TL11.bg2, border: `1.5px solid ${TL11.lime}`, color: TL11.lime, fontFamily: DISP11, fontSize: 21, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{x[0]}</span>
              <span style={{ fontFamily: DISP11, fontSize: 23, fontWeight: 700, color: TL11.ink, minWidth: 240 }}>{x[1]}</span>
              <span style={{ fontFamily: DISP11, fontSize: 17.5, color: TL11.mut }}>{x[2]}</span>
            </div>
          );
        })}
      </div>
      <CapM11 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL11.cyanLt} y="90%" width={1560}>La <b style={{ color: TL11.ink }}>demo en vivo</b> es el corazón: nada convence como ver la planta arrancar sola y manejar un fallo frente al evaluador.</CapM11>
    </SceneM11>
  );
}

// ── Rúbrica de evaluación ─────────────────────────────────────────────────────
function S_Rubric({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Cómo se evalúa el proyecto" y="9%" color={TL11.gold} />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Cinco dimensiones, una calificación integral.</CapM11>
      <TableM11 x={310} y={290} w={1300} t={t} appear={s + 1.2} accentCol={1}
        headers={['Dimensión', 'Peso']}
        colTemplate="2.4fr 1fr"
        rows={[
          ['Funcionamiento del sistema (PLC + SCADA integrados)', '30 %'],
          ['Calidad de ingeniería (diseño, lazos, seguridad)', '25 %'],
          ['Documentación técnica profesional', '20 %'],
          ['Pruebas y verificación (FAT, SCADA)', '15 %'],
          ['Presentación y defensa', '10 %'],
        ]} />
      <CapM11 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL11.cyanLt} y="86%" width={1560}>No premia el código bonito: premia el <b style={{ color: TL11.ink }}>sistema completo</b> que funciona, está documentado y se defiende con criterio.</CapM11>
    </SceneM11>
  );
}

// ── El portafolio final ───────────────────────────────────────────────────────
function S_Portfolio({ start, dur }) {
  const t = useTime(); const s = start;
  const items = [
    { ic: '🏭', t: 'Proyecto TIA Portal', d: 'PLC programado, probado y simulado' },
    { ic: '🖥️', t: 'SCADA Ignition', d: 'Vistas, alarmas, tendencias, reportes' },
    { ic: '📐', t: 'Paquete de ingeniería', d: 'P&ID, FDS, manuales, informe técnico' },
    { ic: '🎬', t: 'Video demostrativo', d: 'La planta funcionando de punta a punta' },
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Lo que tienes al terminar" y="9%" color={TL11.lime} />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Un portafolio que muestras a cualquier empleador.</CapM11>
      <div style={{ position: 'absolute', left: 200, top: 320, width: 1520, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 22 }}>
        {items.map((x, i) => {
          const ap = pop11(t, s + 1.2 + i * 0.3, 0.5, 18);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', gap: 20, alignItems: 'center', background: TL11.paper, border: `1px solid ${TL11.lineS}`, borderLeft: `4px solid ${TL11.lime}`, borderRadius: 12, padding: '22px 26px', height: 140 }}>
              <span style={{ fontSize: 38, flexShrink: 0 }}>{x.ic}</span>
              <div>
                <div style={{ fontFamily: DISP11, fontSize: 23, fontWeight: 700, color: TL11.ink }}>{x.t}</div>
                <div style={{ fontFamily: DISP11, fontSize: 17, color: TL11.mut, marginTop: 4 }}>{x.d}</div>
              </div>
            </div>
          );
        })}
      </div>
      <CapM11 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL11.cyanLt} y="88%" width={1560}>No un ejercicio académico — un sistema real, completo y funcionando, con todas las piezas integradas.</CapM11>
    </SceneM11>
  );
}

// ── Cierre del curso ──────────────────────────────────────────────────────────
function S_Finale({ start, dur }) {
  const t = useTime(); const s = start;
  const mods = ['Sensores', 'Señales', 'PLC', 'Control', 'Redes', 'SCADA', 'Seguridad', 'Avanzada', 'Proyecto'];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="11 módulos · un automatizador" y="14%" color={TL11.lime} />
      <CapM11 start={s + 0.7} dur={3.0} size={56} weight={700} y="32%" width={1620} color={TL11.ink}>Empezaste midiendo una señal. Terminas <span style={{ color: TL11.lime }}>automatizando una planta entera</span>.</CapM11>
      <div style={{ position: 'absolute', left: '50%', top: '56%', transform: 'translateX(-50%)', display: 'flex', flexWrap: 'wrap', gap: 12, width: 1400, justifyContent: 'center' }}>
        {mods.map((m, i) => {
          const ap = pop11(t, s + 2.0 + i * 0.18, 0.5, 14);
          return <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, padding: '12px 24px', borderRadius: 30, background: TL11.paper, border: `1.5px solid ${i === mods.length - 1 ? TL11.lime : TL11.lineS}`, fontFamily: MONO11, fontSize: 17, fontWeight: 600, color: i === mods.length - 1 ? TL11.lime : TL11.mut }}>{m}</div>;
        })}
      </div>
      <CapM11 start={s + 4.6} dur={dur - 4.9} size={26} weight={500} color={TL11.cyanLt} y="78%" width={1560}>El conocimiento ya es tuyo. Ahora ve a construir cosas que funcionen — de forma segura, documentada y bien hecha.</CapM11>
    </SceneM11>
  );
}

const SCENES_M11C8 = [
  { C: (p) => <TitleCardM11 {...p} claseNo={8} seccion="Fase 4 · Entrega" fase="Fase 4" title="Presentación final y evaluación" dudur="25–28 min" objetivo="Presentar y defender el proyecto completo ante un evaluador, conocer la rúbrica de evaluación y consolidar el portafolio profesional que cierra el curso." />, dur: 7, label: 'Apertura' },
  { C: S_Pitch, dur: 13, label: 'La presentación' },
  { C: S_Rubric, dur: 12, label: 'Rúbrica' },
  { C: S_Portfolio, dur: 13, label: 'El portafolio' },
  { C: S_Finale, dur: 13, label: 'Cierre del curso' },
  { C: (p) => <ClosingM11 {...p} line="Felicidades: completaste el curso. Lo que tienes ahora no es un certificado — es la capacidad real de tomar un proceso y hacerlo funcionar solo, con seguridad y criterio profesional." activity="Presenta tu proyecto en 15 minutos con demo en vivo, defiende tus decisiones de diseño ante las preguntas del evaluador y publica tu portafolio. Bienvenido a la profesión de la automatización industrial." />, dur: 9, label: 'Cierre del curso' },
];
window.SCENES_M11C8 = SCENES_M11C8;
