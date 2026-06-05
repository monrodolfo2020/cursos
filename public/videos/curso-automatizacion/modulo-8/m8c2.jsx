// m8c2.jsx — "Ignition SCADA: instalación, arquitectura y primer proyecto"
// After m8-lib.jsx. Exports SCENES_M8C2.

// ── Por qué Ignition · comparativa ────────────────────────────────────────────
function S_Why({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="El mercado SCADA" y="8%" />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="14%" width={1560}>¿Por qué <span style={{ color: TL8.coral }}>Ignition</span> para este curso?</CapM8>
      <TableM8 x={210} y={250} w={1500} t={t} appear={s + 1.2} accentCol={3}
        headers={['Software', 'Licenciamiento', 'Precio aprox.', 'Popularidad']}
        colTemplate="1fr 1.3fr 1fr 1.1fr"
        rows={[
          ['Ignition', 'Por servidor · sin límite', '$3k–$8k', 'Creciendo rápido'],
          ['WonderWare / AVEVA', 'Por tag', '$10k–$50k+', 'Líder histórico'],
          ['FactoryTalk View', 'Cliente + servidor', '$5k–$20k+', 'USA · Rockwell'],
          ['iFIX', 'Por tag y cliente', '$8k–$30k+', 'Legacy'],
          ['Ignition (Trial)', 'Gratis 2 h · reiniciable', '$0 para aprender', 'Perfecto educación'],
        ]} />
      <CapM8 start={s + 4.0} dur={dur - 4.3} size={23} weight={500} color={TL8.steelLt} y="86%" width={1620}>Trial ilimitado (reinicia y vuelven las 2 h) · <b style={{ color: TL8.ink }}>sin límite de tags ni clientes</b> · web y multiplataforma · <b style={{ color: TL8.coral }}>OPC-UA nativo</b> hacia el PLC.</CapM8>
    </SceneM8>
  );
}

// ── Instalación · pasos ───────────────────────────────────────────────────────
function S_Install({ start, dur }) {
  const t = useTime(); const s = start;
  const steps = [
    ['1', 'Descargar', 'inductiveautomation.com → Ignition 8.1.x'],
    ['2', 'Instalar', 'Tipo Standard · puerto 8088 por defecto'],
    ['3', 'Gateway', 'http://localhost:8088 → crear admin'],
    ['4', 'Start Trial', 'Activar modo de prueba de 2 horas'],
    ['5', 'Módulos', 'OPC-UA · Perspective · Vision · Reporting'],
  ];
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Instalación del Gateway" y="9%" color={TL8.steel} />
      <CapM8 start={s + 0.6} dur={2.0} size={46} weight={600} y="17%" width={1500}>De cero a Gateway corriendo en cinco pasos.</CapM8>
      <div style={{ position: 'absolute', left: '50%', top: 350, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', gap: 13, width: 1240 }}>
        {steps.map((x, i) => {
          const ap = pop8(t, s + 1.2 + i * 0.4, 0.5, 16);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, display: 'flex', alignItems: 'center', gap: 22, background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderRadius: 11, padding: '16px 24px' }}>
              <span style={{ width: 46, height: 46, borderRadius: 10, background: TL8.coralWash, border: `1.5px solid ${TL8.coral}`, color: TL8.coral, fontFamily: DISP8, fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{x[0]}</span>
              <span style={{ fontFamily: DISP8, fontSize: 24, fontWeight: 700, color: TL8.ink, minWidth: 200 }}>{x[1]}</span>
              <span style={{ fontFamily: MONO8, fontSize: 17, color: TL8.mut }}>{x[2]}</span>
            </div>
          );
        })}
      </div>
      <CapM8 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL8.mut} y="88%" width={1500}>Requisitos: Windows / Linux / macOS · 8 GB RAM recomendado · puertos 8088 (HTTP) y 8043 (HTTPS) libres.</CapM8>
    </SceneM8>
  );
}

// ── Arquitectura de Ignition ──────────────────────────────────────────────────
function S_Arch({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Arquitectura de Ignition" y="9%" />
      <CapM8 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>El <span style={{ color: TL8.coral }}>Gateway</span> es el servidor central: todo pasa por él.</CapM8>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <NodeM8 x={810} y={300} w={300} h={130} label="GATEWAY" sub="servicio · localhost:8088" accent={TL8.coral} t={t} appear={s + 1.2} online />
        {/* PLC below */}
        <LinkM8 x1={960} y1={430} x2={960} y2={540} start={s + 1.7} t={t} color={TL8.honey} packets={false} />
        <NodeM8 x={810} y={540} w={300} h={100} label="PLCs" sub="OPC-UA · Modbus" accent={TL8.honey} t={t} appear={s + 1.9} />
        {/* Designer left */}
        <ArrowM8 x1={810} y1={365} x2={560} y2={365} start={s + 2.3} t={t} color={TL8.dim} dashed />
        <NodeM8 x={240} y={310} w={320} h={110} label="Designer" sub="desarrollo visual" accent={TL8.steel} t={t} appear={s + 2.3} />
        {/* Clients right */}
        <ArrowM8 x1={1110} y1={365} x2={1360} y2={365} start={s + 2.7} t={t} color={TL8.dim} dashed />
        <NodeM8 x={1360} y={310} w={320} h={110} label="Clientes" sub="navegador · Perspective" accent={TL8.grn} t={t} appear={s + 2.7} />
        {/* Tag DB + Historian below gateway sides */}
      </svg>
      <div style={{ position: 'absolute', left: '50%', top: 730, transform: 'translateX(-50%)', display: 'flex', gap: 18 }}>
        {[['Tag Database', 'todas las variables del proceso', TL8.steel], ['Tag Historian', 'historial en base de datos SQL', TL8.honey]].map((x, i) => {
          const ap = pop8(t, s + 3.4 + i * 0.3, 0.5, 16);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, width: 420, background: TL8.paper, border: `1px solid ${TL8.lineS}`, borderLeft: `4px solid ${x[2]}`, borderRadius: 11, padding: '16px 22px' }}>
              <div style={{ fontFamily: DISP8, fontSize: 21, fontWeight: 700, color: TL8.ink }}>{x[0]}</div>
              <div style={{ fontFamily: DISP8, fontSize: 16.5, color: TL8.mut, marginTop: 3 }}>{x[1]}</div>
            </div>
          );
        })}
      </div>
    </SceneM8>
  );
}

// ── Primer proyecto + Designer ────────────────────────────────────────────────
function S_FirstProject({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM8 start={start} dur={dur}>
      <KickerM8 start={s + 0.3} dur={dur - 0.5} text="Primer proyecto · el Designer" y="8%" color={TL8.grn} />
      <CapM8 start={s + 0.6} dur={2.0} size={42} weight={600} y="14%" width={1560}>Proyecto «Planta_Agua_SCADA» en Perspective.</CapM8>
      <HMIFrameM8 x={250} y={250} w={1180} h={640} title="Ignition Designer — Planta_Agua_SCADA" t={t} appear={s + 1.2} tabs={['Perspective', 'Tags', 'Alarmas']}>
        {/* Project browser */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 250, background: TL8.bg2, borderRight: `1px solid ${TL8.line}`, padding: '16px 14px', fontFamily: MONO8, fontSize: 14, color: TL8.mut }}>
          <div style={{ color: TL8.dim, letterSpacing: '0.1em', fontSize: 11.5, textTransform: 'uppercase', marginBottom: 10 }}>Project Browser</div>
          {['📁 Views', '   • Vista_General', '📁 Tags', '📁 Alarmas', '📁 Scripts', '📁 Reportes'].map((x, i) => <div key={i} style={{ padding: '5px 0', color: i === 1 ? TL8.coral : TL8.mut }}>{x}</div>)}
        </div>
        {/* canvas mock */}
        <div style={{ position: 'absolute', left: 250, right: 230, top: 0, bottom: 0, padding: 24 }}>
          <div style={{ fontFamily: DISP8, fontSize: 22, fontWeight: 700, color: TL8.ink, letterSpacing: '0.04em' }}>PLANTA DE TRATAMIENTO DE AGUA</div>
          <div style={{ display: 'flex', gap: 18, marginTop: 28 }}>
            {[['Nivel', TL8.steel], ['Temp', TL8.honey], ['Caudal', TL8.steel], ['Presión', TL8.honey]].map((g, i) => {
              const ap = clamp((t - (s + 2.4 + i * 0.25)) / 0.4, 0, 1);
              return <div key={i} style={{ opacity: ap, width: 120, height: 120, borderRadius: 60, border: `5px solid ${g[1]}`, borderRightColor: TL8.bg2, borderBottomColor: TL8.bg2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: MONO8, fontSize: 12, color: TL8.dim }}>{g[0]}</span></div>;
            })}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
            {['Arrancar', 'Parar', 'Alarmas'].map((b, i) => { const ap = clamp((t - (s + 3.6 + i * 0.2)) / 0.4, 0, 1); return <div key={i} style={{ opacity: ap, padding: '12px 26px', borderRadius: 9, background: i === 0 ? TL8.grn : i === 1 ? TL8.paper2 : TL8.coralWash, border: `1px solid ${i === 2 ? TL8.coral : TL8.lineS}`, fontFamily: DISP8, fontSize: 16, fontWeight: 600, color: i === 0 ? '#06200f' : TL8.ink }}>{b}</div>; })}
          </div>
        </div>
        {/* property editor */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 230, background: TL8.bg2, borderLeft: `1px solid ${TL8.line}`, padding: '16px 14px', fontFamily: MONO8, fontSize: 12.5, color: TL8.dim }}>
          <div style={{ letterSpacing: '0.1em', fontSize: 11.5, textTransform: 'uppercase', marginBottom: 10 }}>Property Editor</div>
          {['value: —', 'min: 0', 'max: 4.0', 'color: steel'].map((x, i) => <div key={i} style={{ padding: '6px 0', borderBottom: `1px solid ${TL8.line}` }}>{x}</div>)}
        </div>
      </HMIFrameM8>
      <CapM8 start={s + 4.6} dur={dur - 4.9} size={22} weight={500} color={TL8.mut} y="90%" width={1500}>Aún sin datos reales — solo la estructura visual. La conexión al PLC llega en la Clase 8.4.</CapM8>
    </SceneM8>
  );
}

const SCENES_M8C2 = [
  { C: (p) => <TitleCardM8 {...p} claseNo={2} seccion="Ignition SCADA" title="Ignition: instalación y primer proyecto" dudur="20–22 min" objetivo="Instalar Ignition de Inductive Automation, comprender su arquitectura de módulos, crear el primer proyecto y navegar el Designer." />, dur: 7, label: 'Apertura' },
  { C: S_Why, dur: 15, label: 'Por qué Ignition' },
  { C: S_Install, dur: 14, label: 'Instalación' },
  { C: S_Arch, dur: 14, label: 'Arquitectura' },
  { C: S_FirstProject, dur: 15, label: 'Primer proyecto' },
  { C: (p) => <ClosingM8 {...p} line="Con el Gateway corriendo y el primer proyecto creado, ya tienes el lienzo donde vivirá el SCADA de toda la planta." activity="Instala Ignition, crea el proyecto del curso y arma la primera Vista: banner de la planta, 4 gauges, 2 indicadores y 3 botones — todo aún sin datos. Luego boceta en papel la jerarquía completa de pantallas (Niveles 1 a 3)." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M8C2 = SCENES_M8C2;
