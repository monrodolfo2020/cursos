// m11c1.jsx — "Definición del proyecto y P&ID final"
// After m11-lib.jsx. Exports SCENES_M11C1.

// ── El proceso: recorrido del agua ────────────────────────────────────────────
function S_Process({ start, dur }) {
  const t = useTime(); const s = start;
  const stages = [
    { tag: 'T-101', name: 'Captación', sub: 'agua cruda', a: TL11.cyan },
    { tag: 'R-201', name: 'Mezcla rápida', sub: 'coagulante', a: TL11.gold },
    { tag: 'D-301', name: 'Decantador', sub: 'sedimenta', a: TL11.mut },
    { tag: 'F-401', name: 'Filtros A/B', sub: 'arena', a: TL11.lime },
    { tag: 'T-501', name: 'Cloración', sub: 'desinfección', a: TL11.grn },
    { tag: 'T-601', name: 'Agua tratada', sub: 'distribución', a: TL11.cyan },
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Planta de tratamiento de agua potable" y="11%" />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="20%" width={1620}>El recorrido del agua: de la fuente al grifo.</CapM11>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {stages.map((st, i) => {
          if (i === stages.length - 1) return null;
          return <LinkM11 key={i} x1={160 + i * 290 + 230} y1={500} x2={160 + (i + 1) * 290} y2={500} start={s + 1.6 + i * 0.3} t={t} color={TL11.cyan} packets />;
        })}
        {stages.map((st, i) => (
          <NodeM11 key={i} x={160 + i * 290} y={440} w={230} h={120} label={st.tag} sub={`${st.name} · ${st.sub}`} accent={st.a} t={t} appear={s + 1.3 + i * 0.28} />
        ))}
      </svg>
      <CapM11 start={s + 4.0} dur={dur - 4.3} size={24} weight={500} color={TL11.cyanLt} y="76%" width={1560}>Seis etapas, cinco bombas, cuatro lazos de control · <b style={{ color: TL11.ink }}>52 señales</b> de campo. Todo lo aprendido converge aquí.</CapM11>
    </SceneM11>
  );
}

// ── Anatomía de un tag ISA 5.1 ────────────────────────────────────────────────
function S_ISA({ start, dur }) {
  const t = useTime(); const s = start;
  const parts = [
    { c: 'A', d: 'Análisis — variable medida (calidad/química)', a: TL11.gold },
    { c: 'T', d: 'Transmisor — la función del instrumento', a: TL11.cyan },
    { c: '502', d: 'Número de lazo — pH a la salida del contacto', a: TL11.lime },
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Nomenclatura ISA 5.1" y="10%" />
      <CapM11 start={s + 0.6} dur={2.0} size={46} weight={600} y="19%" width={1560}>Cada tag cuenta una historia: <span style={{ color: TL11.lime }}>AT-502</span>.</CapM11>
      <div style={{ position: 'absolute', left: '50%', top: 330, transform: 'translateX(-50%)', display: 'flex', gap: 14 }}>
        {parts.map((p, i) => {
          const ap = pop11(t, s + 1.2 + i * 0.35, 0.5, 16);
          return <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, minWidth: 130, padding: '22px 30px', borderRadius: 12, background: TL11.paper2, border: `2px solid ${p.a}`, fontFamily: MONO11, fontSize: 44, fontWeight: 700, color: p.a, textAlign: 'center' }}>{p.c}</div>;
        })}
      </div>
      <div style={{ position: 'absolute', left: '50%', top: 500, transform: 'translateX(-50%)', width: 1100 }}>
        {parts.map((p, i) => {
          const ap = pop11(t, s + 2.2 + i * 0.3, 0.5, 12);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 22, padding: '14px 0', borderBottom: `1px solid ${TL11.line}` }}>
              <span style={{ fontFamily: MONO11, fontSize: 26, fontWeight: 700, color: p.a, minWidth: 90 }}>{p.c}</span>
              <span style={{ fontFamily: DISP11, fontSize: 21, color: TL11.mut }}>{p.d}</span>
            </div>
          );
        })}
      </div>
      <CapM11 start={s + 3.9} dur={dur - 4.2} size={23} weight={500} color={TL11.cyanLt} y="90%" width={1560}>Antes de diseñar nada, verificar que los 52 tags sigan el estándar. El P&ID es el plano maestro del proyecto.</CapM11>
    </SceneM11>
  );
}

// ── Los 4 lazos de control ────────────────────────────────────────────────────
function S_Loops({ start, dur }) {
  const t = useTime(); const s = start;
  const loops = [
    { id: 'LIC-101', name: 'Nivel T-101', d: 'LT-101 → VFD P-101 · cascada · SP 2.5 m', a: TL11.cyan },
    { id: 'FFC-201', name: 'Dosis coagulante', d: 'FT-101 × factor → FCV-201 · ratio control', a: TL11.gold },
    { id: 'AIC-501', name: 'Cloro residual', d: 'AT-501 → FY-501 · feedback lento · SP 0.5 mg/L', a: TL11.grn },
    { id: 'FIC-601', name: 'Caudal distribución', d: 'FT-601 → FCV-601 · feedback rápido · SP demanda', a: TL11.lime },
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Los cuatro lazos de control" y="9%" color={TL11.cyan} />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1500}>Cada lazo, una estrategia distinta.</CapM11>
      <div style={{ position: 'absolute', left: 130, top: 320, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
        {loops.map((x, i) => {
          const ap = pop11(t, s + 1.2 + i * 0.35, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', background: `linear-gradient(160deg, ${TL11.paper}, ${TL11.bg2})`, border: `1px solid ${TL11.lineS}`, borderRadius: 12, padding: '24px 22px', height: 250, boxShadow: TL11.shadowSm }}>
              <div style={{ fontFamily: MONO11, fontSize: 21, fontWeight: 700, color: x.a }}>{x.id}</div>
              <div style={{ fontFamily: DISP11, fontSize: 23, fontWeight: 700, color: TL11.ink, margin: '12px 0 14px' }}>{x.name}</div>
              <div style={{ fontFamily: DISP11, fontSize: 16.5, color: TL11.mut, lineHeight: 1.44 }}>{x.d}</div>
            </div>
          );
        })}
      </div>
    </SceneM11>
  );
}

// ── Enclavamientos de seguridad ───────────────────────────────────────────────
function S_Interlocks({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Enclavamientos de seguridad en el P&ID" y="9%" color={TL11.red} />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Las protecciones que el PLC nunca ignora.</CapM11>
      <TableM11 x={260} y={290} w={1400} t={t} appear={s + 1.2} accentCol={0}
        headers={['Condición', 'Acción de seguridad']}
        colTemplate="1.2fr 1.8fr"
        rows={[
          ['LSLL-101', 'Parar P-101 — protección de cavitación'],
          ['LSHH-101', 'Cerrar XV-111 — evitar desbordamiento'],
          ['ESD-001', 'Parar TODAS las bombas — emergencia global'],
          ['OLS-601A + OLS-601B', 'Alarma crítica — sin bomba de distribución'],
          ['PDT-401 > 0.35 bar', 'Iniciar retrolavado del filtro activo'],
        ]} />
      <CapM11 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL11.cyanLt} y="87%" width={1560}>Se marcan con el símbolo ISA del rombo. Cada uno se traducirá en lógica del PLC en la Clase 11.3 — y son intocables sin rol de Ingeniero.</CapM11>
    </SceneM11>
  );
}

// ── Conteo de señales ─────────────────────────────────────────────────────────
function S_Signals({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="El alcance del proyecto, en números" y="13%" />
      <div style={{ position: 'absolute', left: 0, right: 0, top: '42%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', gap: 90 }}>
        {[['24', 'DI', 'entradas digitales', TL11.cyan], ['14', 'DO', 'salidas digitales', TL11.lime], ['10', 'AI', 'entradas analógicas', TL11.gold], ['4', 'AO', 'salidas analógicas', TL11.grn]].map((x, i) => {
          const ap = pop11(t, s + 0.9 + i * 0.3, 0.6, 20);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, textAlign: 'center' }}>
              <div style={{ fontFamily: DISP11, fontSize: 110, fontWeight: 700, color: x[3], lineHeight: 0.9, letterSpacing: '-0.03em' }}>{x[0]}</div>
              <div style={{ fontFamily: MONO11, fontSize: 24, fontWeight: 700, color: TL11.ink, marginTop: 10, letterSpacing: '0.1em' }}>{x[1]}</div>
              <div style={{ fontFamily: DISP11, fontSize: 16, color: TL11.mut, marginTop: 4 }}>{x[2]}</div>
            </div>
          );
        })}
      </div>
      <CapM11 start={s + 2.6} dur={dur - 2.9} size={30} weight={600} color={TL11.limeLt} y="74%" width={1560}>24 + 14 + 10 + 4 = <b style={{ color: TL11.lime }}>52 señales</b> que dimensionan el hardware, la red y todo lo que sigue.</CapM11>
    </SceneM11>
  );
}

const SCENES_M11C1 = [
  { C: (p) => <TitleCardM11 {...p} claseNo={1} seccion="Fase 1 · Ingeniería" fase="Fase 1" title="Definición del proyecto y P&ID final" dudur="28–30 min" objetivo="Revisar y completar el P&ID de la planta de tratamiento de agua, verificar todos los tags según ISA 5.1 y producir el documento de ingeniería base que guiará todo el desarrollo." />, dur: 7, label: 'Apertura' },
  { C: S_Process, dur: 14, label: 'El proceso' },
  { C: S_ISA, dur: 14, label: 'Nomenclatura ISA 5.1' },
  { C: S_Loops, dur: 13, label: 'Los 4 lazos' },
  { C: S_Interlocks, dur: 13, label: 'Enclavamientos' },
  { C: S_Signals, dur: 12, label: 'Conteo de señales' },
  { C: (p) => <ClosingM11 {...p} line="El P&ID no es un dibujo: es el contrato técnico de todo el proyecto. Si está bien hecho, cada decisión posterior — hardware, programa, SCADA — ya tiene su respuesta aquí." activity="Entrega el P&ID completo (A3/PDF) con todos los tags ISA 5.1, los 4 lazos de control dibujados y los enclavamientos marcados con el rombo ISA, más la lista de instrumentos (Excel) y un párrafo descriptivo por lazo." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M11C1 = SCENES_M11C1;
