// m11c5.jsx — "SCADA completo: vistas, alarmas y tendencias"
// After m11-lib.jsx. Exports SCENES_M11C5.

// ── Jerarquía de vistas ───────────────────────────────────────────────────────
function S_Hierarchy({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="La jerarquía de vistas (ISA-101)" y="9%" />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Tres niveles: general → área → diagnóstico.</CapM11>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM11 x={810} y={290} w={300} h={100} label="Vista General" sub="Nivel 1 · overview" accent={TL11.lime} t={t} appear={s + 1.2} />
        {['Captación', 'Tratamiento', 'Desinfección', 'Distribución'].map((a, i) => {
          const cx = 250 + i * 380 + 130;
          return <g key={i}><ArrowM11 x1={960} y1={390} x2={cx} y2={460} start={s + 1.6 + i * 0.15} t={t} color={TL11.dim} /><NodeM11 x={250 + i * 380} y={460} w={260} h={95} label={a} sub="Nivel 2 · área" accent={TL11.cyan} t={t} appear={s + 1.7 + i * 0.15} /></g>;
        })}
        {['Alarmas', 'Tendencias', 'Reportes', 'Secuencia'].map((a, i) => {
          const cx = 250 + i * 380 + 130;
          return <g key={i}><NodeM11 x={250 + i * 380} y={640} w={260} h={90} label={a} sub="Nivel 3 · diag." accent={TL11.gold} t={t} appear={s + 2.6 + i * 0.15} /></g>;
        })}
      </svg>
      <CapM11 start={s + 3.8} dur={dur - 4.1} size={22} weight={500} color={TL11.cyanLt} y="78%" width={1560}>Una barra de navegación global conecta todo. Cualquier dato a ≤ 3 clics — el principio ASM del Módulo 8.</CapM11>
    </SceneM11>
  );
}

// ── Vista General en vivo ─────────────────────────────────────────────────────
function S_Overview({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  const lvlCap = 0.6 + 0.04 * Math.sin(lt * 0.7);
  const cloro = 0.52 + 0.04 * Math.sin(lt * 0.5);
  const ph = 7.2 + 0.1 * Math.sin(lt * 0.4);
  const lvlTrat = 0.84;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Vista General · filosofía ASM" y="7%" color={TL11.lime} />
      <HMIFrameM11 x={160} y={210} w={1600} h={680} title="overview.view — Planta_Agua_SCADA" t={t} appear={s + 1.1} tabs={['General', 'Captación', 'Desinfección', 'Distribución']}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 50, background: '#1a2c28', borderBottom: `1px solid ${TL11.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', fontFamily: MONO11, fontSize: 14, color: TL11.mut }}>
          <span>PLANTA TRATAMIENTO AGUA POTABLE</span>
          <span style={{ color: TL11.grn }}>● ALARMAS: 0 · MODO AUTO</span>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 50, bottom: 56, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
          {/* Captación */}
          <div style={{ borderRight: `1px solid ${TL11.line}`, padding: '16px 14px', position: 'relative' }}>
            <div style={{ fontFamily: MONO11, fontSize: 11.5, letterSpacing: '0.12em', color: TL11.dim, textTransform: 'uppercase' }}>Captación</div>
            <svg width="100%" height="200" style={{ overflow: 'visible', marginTop: 10 }}><TankM11 x={40} y={20} w={110} h={150} level={lvlCap} accent={TL11.cyan} tag="T-101" valTxt={(lvlCap * 4).toFixed(1) + ' m'} t={t} appear={s + 1.8} /></svg>
            <LedM11 x={14} y={250} on={true} color={TL11.grn} label="P-101" sub="180 m³/h" t={t} appear={s + 2.4} />
          </div>
          {/* Mezcla */}
          <div style={{ borderRight: `1px solid ${TL11.line}`, padding: '16px 14px', position: 'relative' }}>
            <div style={{ fontFamily: MONO11, fontSize: 11.5, letterSpacing: '0.12em', color: TL11.dim, textTransform: 'uppercase' }}>Mezcla / Decant.</div>
            <svg width="100%" height="200" style={{ overflow: 'visible', marginTop: 10 }}><TankM11 x={40} y={20} w={110} h={150} level={0.6} accent={TL11.gold} tag="R-201" valTxt="1.8 m" t={t} appear={s + 2.0} /></svg>
            <div style={{ position: 'absolute', left: 14, top: 250, fontFamily: MONO11, fontSize: 14, color: TL11.gold }}>FCV-201: 35%</div>
            <div style={{ position: 'absolute', left: 14, top: 278, fontFamily: MONO11, fontSize: 13, color: TL11.mut }}>Turb: 12 NTU</div>
          </div>
          {/* Filtración */}
          <div style={{ borderRight: `1px solid ${TL11.line}`, padding: '16px 14px', position: 'relative' }}>
            <div style={{ fontFamily: MONO11, fontSize: 11.5, letterSpacing: '0.12em', color: TL11.dim, textTransform: 'uppercase' }}>Filtración</div>
            <LedM11 x={14} y={70} on={true} color={TL11.grn} label="F-401A" sub="ACTIVO" t={t} appear={s + 2.2} />
            <LedM11 x={14} y={130} on={false} color={TL11.grn} label="F-401B" sub="ESPERA" t={t} appear={s + 2.3} />
            <div style={{ position: 'absolute', left: 14, top: 200, fontFamily: MONO11, fontSize: 14, color: TL11.cyanLt }}>PDT: 0.18 bar</div>
          </div>
          {/* Desinfección */}
          <div style={{ borderRight: `1px solid ${TL11.line}`, padding: '16px 14px', position: 'relative' }}>
            <div style={{ fontFamily: MONO11, fontSize: 11.5, letterSpacing: '0.12em', color: TL11.dim, textTransform: 'uppercase' }}>Desinfección</div>
            <GaugeM11 x={6} y={26} value={cloro.toFixed(2)} frac={cloro / 1.0} unit="mg/L" label="Cloro AT-501" accent={TL11.grn} t={t} appear={s + 2.4} size={150} />
            <div style={{ position: 'absolute', left: 14, top: 230, fontFamily: MONO11, fontSize: 14, color: ph > 6.5 && ph < 8 ? TL11.grn : TL11.red }}>pH: {ph.toFixed(1)}</div>
          </div>
          {/* Distribución */}
          <div style={{ padding: '16px 14px', position: 'relative' }}>
            <div style={{ fontFamily: MONO11, fontSize: 11.5, letterSpacing: '0.12em', color: TL11.dim, textTransform: 'uppercase' }}>Distribución</div>
            <svg width="100%" height="200" style={{ overflow: 'visible', marginTop: 10 }}><TankM11 x={40} y={20} w={110} h={150} level={lvlTrat} accent={TL11.cyan} tag="T-601" valTxt={(lvlTrat * 5).toFixed(1) + ' m'} t={t} appear={s + 2.2} /></svg>
            <LedM11 x={14} y={250} on={true} color={TL11.grn} label="P-601A" sub="90 m³/h" t={t} appear={s + 2.6} />
          </div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 56, background: '#1a2c28', borderTop: `1px solid ${TL11.line}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 22px' }}>
          {[['ARRANCAR PLANTA', TL11.grn], ['PARO NORMAL', TL11.paper2], ['■ PARO EMERGENCIA', TL11.red], ['VER ALARMAS', TL11.paper2]].map((b, i) => <span key={i} style={{ fontFamily: DISP11, fontSize: 14.5, fontWeight: 600, color: i === 0 ? '#08110f' : (i === 2 ? '#fff' : TL11.mut), background: i === 0 ? TL11.grn : (i === 2 ? TL11.red : TL11.paper2), border: `1px solid ${i === 0 ? TL11.grn : (i === 2 ? TL11.red : TL11.lineS)}`, padding: '9px 18px', borderRadius: 8 }}>{b[0]}</span>)}
        </div>
      </HMIFrameM11>
      <CapM11 start={s + 4.6} dur={dur - 4.9} size={21} weight={500} color={TL11.mut} y="92%" width={1500}>Fondo gris ASM · el proceso de izquierda a derecha · valores de calidad en verde si están en norma, rojo si no.</CapM11>
    </SceneM11>
  );
}

// ── Alarmas configuradas ──────────────────────────────────────────────────────
function S_Alarms({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Alarmas con prioridad normativa" y="9%" color={TL11.red} />
      <CapM11 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>La calidad del agua manda en las prioridades.</CapM11>
      <TableM11 x={260} y={290} w={1400} t={t} appear={s + 1.2} accentCol={2}
        headers={['Condición', 'Mensaje', 'Prioridad']}
        colTemplate="1.2fr 2fr 1fr"
        rows={[
          ['AT-501 < 0.2 mg/L', 'Cloro insuficiente — agua no apta', 'Critical'],
          ['LT-101 < 0.3 m (LL)', 'Nivel mínimo — parar bomba', 'Critical'],
          ['AT-502 < 6.5 pH', 'pH bajo — ajustar neutralización', 'High'],
          ['PDT-401 > 0.35 bar', 'Filtro requiere retrolavado', 'Medium'],
          ['LT-101 señal Bad', 'Falla transmisor — verificar cable', 'High'],
        ]} />
      <CapM11 start={s + 4.2} dur={dur - 4.5} size={23} weight={500} color={TL11.cyanLt} y="87%" width={1560}>Histéresis de 0.1 m en niveles · alarmas de equipo (P101_Falla) y de instrumento (señal Bad) separadas. Cloro fuera de norma = Critical, siempre.</CapM11>
    </SceneM11>
  );
}

// ── Vista de secuencia (innovación) ───────────────────────────────────────────
function S_SeqView({ start, dur }) {
  const t = useTime(); const s = start;
  const steps = [
    { n: '0', label: 'Espera' }, { n: '1', label: 'Precond.' }, { n: '2', label: 'P-101' }, { n: '3', label: 'XV-111' }, { n: '4', label: 'LIC-101' },
    { n: '5', label: 'Coagulante' }, { n: '6', label: 'Filtros' }, { n: '7', label: 'Cloro' }, { n: '8', label: 'Distribución' }, { n: '9', label: 'Operación' },
  ];
  return (
    <SceneM11 start={start} dur={dur}>
      <KickerM11 start={s + 0.3} dur={dur - 0.5} text="Vista de secuencia · la innovación del proyecto" y="9%" color={TL11.lime} />
      <CapM11 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>El operador ve exactamente en qué paso está la planta.</CapM11>
      <SequencerM11 x={210} y={300} w={1500} steps={steps} active={7} t={t} appear={s + 1.0} perRow={5} />
      <div style={{ position: 'absolute', left: 210, top: 650, width: 1500 }}>
        {(() => { const ap = pop11(t, s + 2.2, 0.5, 14); return (
          <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, background: TL11.paper, border: `1px solid ${TL11.lineS}`, borderRadius: 12, padding: '22px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO11, fontSize: 16, color: TL11.mut }}>
              <span style={{ color: TL11.lime, fontWeight: 700 }}>PASO 7 / 9 — CLORO DOSIFICADO</span>
              <span>Tiempo en estado: 00:03:42</span>
            </div>
            <div style={{ marginTop: 12, fontFamily: DISP11, fontSize: 20, color: TL11.ink }}>Esperando AT-501 &gt; 0.2 mg/L · actual <b style={{ color: TL11.gold }}>0.14 mg/L</b> / requerido 0.20 mg/L</div>
          </div>
        ); })()}
      </div>
      <CapM11 start={s + 3.8} dur={dur - 4.1} size={22} weight={500} color={TL11.cyanLt} y="92%" width={1560}>Durante un arranque de 30 minutos, esta vista evita la pregunta «¿por qué no avanza?» — el operador lo ve.</CapM11>
    </SceneM11>
  );
}

const SCENES_M11C5 = [
  { C: (p) => <TitleCardM11 {...p} claseNo={5} seccion="Fase 3 · SCADA" fase="Fase 3" title="SCADA completo: vistas, alarmas y tendencias" dudur="40–45 min" objetivo="Construir el SCADA completo en Ignition con todas las vistas, alarmas y tendencias conectadas al PLC, aplicando la filosofía ASM y todo lo aprendido en el Módulo 8." />, dur: 7, label: 'Apertura' },
  { C: S_Hierarchy, dur: 13, label: 'Jerarquía de vistas' },
  { C: S_Overview, dur: 16, label: 'Vista General' },
  { C: S_Alarms, dur: 13, label: 'Alarmas' },
  { C: S_SeqView, dur: 14, label: 'Vista de secuencia' },
  { C: (p) => <ClosingM11 {...p} line="El SCADA es la cara visible de todo el trabajo: convierte 52 señales y miles de líneas de lógica en una sala de control que un operador real entiende de un vistazo." activity="Entrega el proyecto Ignition (.gwbk) con todas las vistas implementadas: General, 4 de área, alarmas, tendencias y la vista de secuencia — todas conectadas a los tags del PLC. Más capturas de cada vista funcionando y un video de 2–3 min navegando el SCADA." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M11C5 = SCENES_M11C5;
