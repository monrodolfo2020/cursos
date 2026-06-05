// m10c1.jsx — "Protocolo HART en profundidad: diagnóstico y configuración remota"
// After m10-lib.jsx. Exports SCENES_M10C1.

// ── HART = FSK sobre 4-20 mA ──────────────────────────────────────────────────
function S_FSK({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Highway Addressable Remote Transducer" y="9%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1620}>Una señal <span style={{ color: TL10.mag }}>digital</span> que viaja sobre el <span style={{ color: TL10.amber }}>4–20 mA</span>, sin estorbarlo.</CapM10>
      <ScopeM10 x={150} y={300} w={920} t={t} appear={s + 1.2} title="Señal del lazo" />
      <InfoCardM10 x={1130} y={310} w={620} h={180} accent={TL10.amber} title="Analógica 4–20 mA" sub="El valor de proceso sigue viajando como siempre: el control no se entera del HART." appear={s + 2.2} t={t} />
      <InfoCardM10 x={1130} y={520} w={620} h={180} accent={TL10.mag} title="Digital FSK 1200/2200 Hz" sub="Comunicación bidireccional con el instrumento mientras opera. Mismo par de cables." appear={s + 2.7} t={t} />
      <CapM10 start={s + 4.0} dur={dur - 4.3} size={22} weight={500} color={TL10.mintLt} y="92%" width={1560}>HART 5 punto a punto · HART 6 multi-drop y burst · <b style={{ color: TL10.ink }}>HART 7</b> con WirelessHART y mejor diagnóstico.</CapM10>
    </SceneM10>
  );
}

// ── Estructura de comandos ────────────────────────────────────────────────────
function S_Commands({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="La estructura de comandos HART" y="9%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Tres familias de comandos.</CapM10>
      <div style={{ position: 'absolute', left: 150, top: 290, display: 'flex', flexDirection: 'column', gap: 14, width: 560 }}>
        {[['Universales', 'Los soportan TODOS los dispositivos', TL10.mag], ['Práctica común', 'Los soporta la mayoría', TL10.mint], ['Específicos del fabricante', 'Requieren el DD del fabricante', TL10.iris]].map((x, i) => {
          const ap = pop10(t, s + 1.2 + i * 0.35, 0.5, 16);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, background: TL10.paper, border: `1px solid ${TL10.lineS}`, borderLeft: `4px solid ${x[2]}`, borderRadius: 11, padding: '18px 24px' }}>
              <div style={{ fontFamily: DISP10, fontSize: 23, fontWeight: 700, color: x[2] }}>{x[0]}</div>
              <div style={{ fontFamily: DISP10, fontSize: 17, color: TL10.mut, marginTop: 4 }}>{x[1]}</div>
            </div>
          );
        })}
      </div>
      <TableM10 x={770} y={290} w={1000} t={t} appear={s + 2.0} accentCol={0}
        headers={['CMD', 'Función universal']}
        colTemplate="0.5fr 1.6fr"
        rows={[
          ['0', 'Identidad: fabricante, modelo, n.º de serie'],
          ['1', 'Leer variable primaria (PV) con unidades'],
          ['3', 'Leer PV, corriente y hasta 4 variables'],
          ['35', 'Escribir rango LRV/URV (re-rango remoto)'],
          ['44', 'Escribir unidades de la PV'],
          ['48', 'Leer estado de diagnóstico adicional'],
        ]} />
    </SceneM10>
  );
}

// ── 4 variables dinámicas ─────────────────────────────────────────────────────
function S_Variables({ start, dur }) {
  const t = useTime(); const s = start;
  const vars = [
    { k: 'PV', name: 'Flujo másico', v: 'kg/h', d: 'va en el 4–20 mA', a: TL10.amber },
    { k: 'SV', name: 'Densidad', v: 'kg/m³', d: 'solo por HART', a: TL10.mint },
    { k: 'TV', name: 'Temperatura', v: '°C', d: 'solo por HART', a: TL10.iris },
    { k: 'QV', name: 'Flujo volumétrico', v: 'm³/h', d: 'calculado', a: TL10.mag },
  ];
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Cuatro variables en un solo cable" y="9%" color={TL10.mint} />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Un transmisor Coriolis transmite cuatro a la vez.</CapM10>
      <div style={{ position: 'absolute', left: 130, top: 320, width: 1660, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
        {vars.map((x, i) => {
          const ap = pop10(t, s + 1.2 + i * 0.35, 0.5, 22);
          return (
            <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', background: `linear-gradient(160deg, ${TL10.paper}, ${TL10.bg2})`, border: `1px solid ${i === 0 ? TL10.amber : TL10.lineS}`, borderRadius: 12, padding: '24px 22px', height: 230, boxShadow: TL10.shadowSm }}>
              <div style={{ fontFamily: MONO10, fontSize: 24, fontWeight: 700, color: x.a }}>{x.k}</div>
              <div style={{ fontFamily: DISP10, fontSize: 23, fontWeight: 700, color: TL10.ink, margin: '12px 0 6px' }}>{x.name}</div>
              <div style={{ fontFamily: MONO10, fontSize: 17, color: x.a }}>{x.v}</div>
              <div style={{ fontFamily: DISP10, fontSize: 16, color: TL10.mut, marginTop: 10 }}>{x.d}</div>
            </div>
          );
        })}
      </div>
      <CapM10 start={s + 3.8} dur={dur - 4.1} size={24} weight={500} color={TL10.magLt} y="86%" width={1560}>Un cable lleva el flujo másico analógicamente <b style={{ color: TL10.ink }}>y</b> permite leer densidad, temperatura y volumen por HART — sin cables extra.</CapM10>
    </SceneM10>
  );
}

// ── Diagnóstico CMD 48 ────────────────────────────────────────────────────────
function S_Diag({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '> CMD 48 · diagnóstico extendido', c: TL10.dim },
    { txt: 'Sensor fuera de rango ......... NO', c: TL10.grn },
    { txt: 'Fallo del sensor .............. NO', c: TL10.grn },
    { txt: 'Temperatura transmisor ... 42.3 °C', c: TL10.ink },
    { txt: 'Eventos de sobrepresión ...... 28', c: TL10.amber },
    { txt: 'Contador de encendidos ...... 847', c: TL10.ink },
    { txt: 'Horas de servicio ...... 14.283 h', c: TL10.mag },
    { txt: 'Último error com. .... hace 3 días', c: TL10.mut },
  ];
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="El instrumento se diagnostica solo" y="9%" color={TL10.mag} />
      <CapM10 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>HART transformó el mantenimiento de instrumentación.</CapM10>
      <CodeM10 x={150} y={300} w={900} title="AMS Device Manager · CMD 48" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 2.8, 0, 1)} />
      <InfoCardM10 x={1110} y={300} w={640} h={185} accent={TL10.amber} title="28 sobrepresiones" sub="El instrumento registró el historial de eventos → algo en el proceso necesita revisión." appear={s + 2.8} t={t} />
      <InfoCardM10 x={1110} y={510} w={640} h={185} accent={TL10.mint} title="Re-rango sin ir al campo" sub="CMD 35 escribe nuevo LRV/URV · CMD 43 ajusta el cero en línea · CMD 44 cambia unidades — todo remoto." appear={s + 3.3} t={t} />
    </SceneM10>
  );
}

// ── WirelessHART ──────────────────────────────────────────────────────────────
function S_Wireless({ start, dur }) {
  const t = useTime(); const s = start;
  const nodes = [[330, 360], [520, 300], [430, 520], [640, 470], [760, 340], [560, 620]];
  const gw = [980, 460];
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="WirelessHART · IEC 62591" y="9%" color={TL10.iris} />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>El mismo protocolo, sin cables, en malla.</CapM10>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {nodes.map((n, i) => {
          const e = clamp((t - (s + 1.4 + i * 0.15)) / 0.6, 0, 1);
          return <g key={i}><line x1={n[0]} y1={n[1]} x2={gw[0]} y2={gw[1]} stroke={TL10.mintWash} strokeWidth="2" opacity={e} strokeDasharray="6 6" /></g>;
        })}
        {nodes.map((n, i) => { const ap = pop10(t, s + 1.4 + i * 0.15, 0.5, 0); const pulse = 0.6 + 0.4 * Math.sin(t * 2 + i); return <g key={i} opacity={ap.op}><circle cx={n[0]} cy={n[1]} r="22" fill={TL10.paper} stroke={TL10.mint} strokeWidth="2.4" /><circle cx={n[0]} cy={n[1]} r="7" fill={TL10.mint} opacity={pulse} /></g>; })}
        <NodeM10 x={gw[0] - 80} y={gw[1] - 55} w={290} h={110} label="Gateway" sub="→ Modbus / OPC-UA" accent={TL10.mag} t={t} appear={s + 2.4} online />
      </svg>
      <div style={{ position: 'absolute', left: 1330, top: 320, width: 440, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[['2.4 GHz', 'banda ISM, malla auto-organizada'], ['AES-128', 'más segura que muchas WiFi'], ['5–10 años', 'batería de litio de larga vida']].map((x, i) => {
          const ap = pop10(t, s + 2.8 + i * 0.3, 0.5, 16);
          return <div key={i} style={{ opacity: ap.op, transform: `translateY(${ap.ty}px)`, background: TL10.paper, border: `1px solid ${TL10.lineS}`, borderRadius: 11, padding: '16px 22px' }}><div style={{ fontFamily: MONO10, fontSize: 22, fontWeight: 700, color: TL10.iris }}>{x[0]}</div><div style={{ fontFamily: DISP10, fontSize: 16.5, color: TL10.mut, marginTop: 4 }}>{x[1]}</div></div>;
        })}
      </div>
      <CapM10 start={s + 4.4} dur={dur - 4.7} size={22} weight={500} color={TL10.mut} y="90%" width={1560}>Ideal para puntos sin cableado fácil, equipos rotativos y plantas antiguas donde tender cable es carísimo.</CapM10>
    </SceneM10>
  );
}

const SCENES_M10C1 = [
  { C: (p) => <TitleCardM10 {...p} claseNo={1} seccion="HART avanzado" title="HART en profundidad" dudur="18–20 min" objetivo="Dominar HART más allá de lo básico: la estructura de comandos, las variables dinámicas, el diagnóstico avanzado de instrumentos inteligentes y la configuración remota." />, dur: 7, label: 'Apertura' },
  { C: S_FSK, dur: 14, label: 'FSK sobre 4–20 mA' },
  { C: S_Commands, dur: 14, label: 'Estructura de comandos' },
  { C: S_Variables, dur: 13, label: '4 variables dinámicas' },
  { C: S_Diag, dur: 14, label: 'Diagnóstico CMD 48' },
  { C: S_Wireless, dur: 13, label: 'WirelessHART' },
  { C: (p) => <ClosingM10 {...p} line="HART convirtió cada transmisor en una fuente de datos: no solo mide el proceso, también te cuenta su propia salud y se deja configurar sin que muevas un pie del campo." activity="Con la hoja de datos de un transmisor Rosemount 3051 y su respuesta de CMD 0 y CMD 48: interpreta todos los campos de diagnóstico, identifica qué mantenimiento requiere y decide si necesita calibración inmediata o puede esperar al próximo turno." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M10C1 = SCENES_M10C1;
