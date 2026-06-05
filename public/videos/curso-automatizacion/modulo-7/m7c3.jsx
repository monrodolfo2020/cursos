// m7c3.jsx — "PROFIBUS y PROFINET: los estándares Siemens"
// After m7-lib.jsx. Exports SCENES_M7C3.

// ── PROFIBUS: historia y variantes ────────────────────────────────────────────
function S_Profibus({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="PROFIBUS · Process Field Bus" y="10%" />
      <CapM7 start={s + 0.6} dur={2.2} size={48} weight={600} y="20%" width={1560}>Alemania, 1987 — el bus de campo más instalado del mundo.</CapM7>
      <InfoCardM7 x={250} y={400} w={640} h={290} accent={TL7.amber} title="PROFIBUS DP" sub="Decentralized Periphery. PLC ↔ E/S remotas, VFDs, válvulas. Hasta 12 Mbps y 126 participantes. El más usado en proceso y manufactura." appear={s + 1.4} t={t} />
      <InfoCardM7 x={1030} y={400} w={640} h={290} accent={TL7.grn} title="PROFIBUS PA" sub="Process Automation. Para instrumentos en zonas ATEX: 31.25 kbps con alimentación por el mismo par. Se une a DP por un acoplador DP/PA." appear={s + 1.9} t={t} />
      <CapM7 start={s + 3.6} dur={dur - 3.9} size={24} weight={500} color={TL7.mut} y="83%" width={1560}>Más de <b style={{ color: TL7.ink }}>40 millones de nodos</b> instalados — millones seguirán en servicio por décadas como legacy.</CapM7>
    </SceneM7>
  );
}

// ── Velocidad vs distancia + GSD ──────────────────────────────────────────────
function S_SpeedDistance({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="PROFIBUS DP · física y configuración" y="9%" />
      <CapM7 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>A más velocidad, menos distancia por segmento.</CapM7>
      <TableM7 x={130} y={300} w={840} t={t} appear={s + 1.2} accentCol={1}
        headers={['Velocidad', 'Distancia / segmento']}
        colTemplate="1fr 1.2fr"
        rows={[['9.6 kbps', '1200 m'], ['93.75 kbps', '1200 m'], ['500 kbps', '400 m'], ['1.5 Mbps', '200 m'], ['3–12 Mbps', '100 m']]} />
      <InfoCardM7 x={1010} y={300} w={780} h={170} accent={TL7.vio} title="RS-485 con terminación" sub="Conector DB9 · resistencias en ambos extremos del bus, sin ellas es inestable · cableado lineal, nunca estrella." appear={s + 2.0} t={t} />
      <InfoCardM7 x={1010} y={490} w={780} h={170} accent={TL7.cyan} title="Archivo GSD" sub="Cada dispositivo trae su GSD del fabricante: describe a TIA Portal sus E/S y parámetros. Sin GSD, el PLC no puede configurarlo." appear={s + 2.6} t={t} />
      <CapM7 start={s + 3.6} dur={dur - 3.9} size={23} weight={500} color={TL7.mut} y="84%" width={1560}>Para más distancia → repetidores PROFIBUS (cada uno regenera la señal).</CapM7>
    </SceneM7>
  );
}

// ── Por qué PROFINET reemplaza a PROFIBUS ─────────────────────────────────────
function S_WhyProfinet({ start, dur }) {
  const t = useTime(); const s = start;
  const reasons = [
    { k: 'Ethernet estándar', d: 'Infraestructura mundial · menos capacitación.', a: TL7.cyan },
    { k: '100 Mbps – 1 Gbps', d: 'vs máximo 12 Mbps de PROFIBUS.', a: TL7.vio },
    { k: 'Sin límite de distancia', d: 'Con switches · topología flexible.', a: TL7.grn },
    { k: 'Un solo cable', d: 'Datos + config + diagnóstico + internet.', a: TL7.amber },
  ];
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="PROFINET · PROFIBUS sobre Ethernet" y="10%" />
      <CapM7 start={s + 0.6} dur={2.2} size={48} weight={700} y="20%" width={1500}>Por qué PROFINET está reemplazando a PROFIBUS.</CapM7>
      {reasons.map((r, i) => (
        <InfoCardM7 key={i} x={210 + i * 388} y={420} w={350} h={280} no={i + 1} accent={r.a} title={r.k} sub={r.d} appear={s + 1.4 + i * 0.4} t={t} />
      ))}
    </SceneM7>
  );
}

// ── RT vs IRT + nombre de dispositivo ─────────────────────────────────────────
function S_RTIRT({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Dos variantes según la exigencia de tiempo" y="11%" />
      <CapM7 start={s + 0.6} dur={2.2} size={46} weight={600} y="21%" width={1560}>PROFINET <span style={{ color: TL7.cyan }}>RT</span> para proceso · <span style={{ color: TL7.pink }}>IRT</span> para movimiento.</CapM7>
      <InfoCardM7 x={250} y={400} w={640} h={250} accent={TL7.cyan} title="PROFINET RT" sub="Real-Time: ciclos 1–10 ms con priorización de tramas (802.1Q). Switches industriales estándar. El 90 % de las aplicaciones." appear={s + 1.4} t={t} />
      <InfoCardM7 x={1030} y={400} w={640} h={250} accent={TL7.pink} title="PROFINET IRT" sub="Isochronous Real-Time: ciclos < 1 ms, jitter < 1 µs. Requiere switches con hardware de sincronización. Robots, ejes sincronizados." appear={s + 1.9} t={t} />
      <CapM7 start={s + 3.6} dur={dur - 3.9} size={24} weight={500} color={TL7.mut} y="78%" width={1620}>En PROFINET cada dispositivo tiene un <b style={{ color: TL7.cyan }}>nombre de texto</b> ("bomba-captacion-vfd"), no un número — si cambia la IP, el PLC la reasigna sola por DCP.</CapM7>
    </SceneM7>
  );
}

// ── Comparativa ───────────────────────────────────────────────────────────────
function S_Compare({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM7 start={start} dur={dur}>
      <KickerM7 start={s + 0.3} dur={dur - 0.5} text="Comparativa lado a lado" y="9%" />
      <CapM7 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>PROFIBUS DP vs PROFINET RT vs IRT.</CapM7>
      <TableM7 x={210} y={290} w={1500} t={t} appear={s + 1.2} accentCol={2}
        headers={['Característica', 'PROFIBUS DP', 'PROFINET RT', 'PROFINET IRT']}
        colTemplate="1.3fr 1fr 1fr 1fr"
        rows={[
          ['Velocidad', 'hasta 12 Mbps', '100 Mbps', '100 Mbps'],
          ['Ciclo típico', '2–10 ms', '1–10 ms', '< 1 ms'],
          ['Topología', 'bus lineal', 'flexible', 'flexible'],
          ['Distancia', '100–1200 m', 'sin límite', 'sin límite'],
          ['Dispositivos', '126', 'sin límite', 'sin límite'],
          ['Config.', 'archivo GSD', 'GSDML', 'GSDML'],
          ['Estado', 'legacy activo', 'estándar actual', 'motion control'],
        ]} />
    </SceneM7>
  );
}

const SCENES_M7C3 = [
  { C: (p) => <TitleCardM7 {...p} claseNo={3} title="PROFIBUS y PROFINET" dudur="18–20 min" objetivo="Comprender PROFIBUS DP como bus de campo dominante, por qué PROFINET lo reemplaza y cómo configurar ambos en TIA Portal." />, dur: 7, label: 'Apertura' },
  { C: S_Profibus, dur: 12, label: 'PROFIBUS y variantes' },
  { C: S_SpeedDistance, dur: 13, label: 'Física y GSD' },
  { C: S_WhyProfinet, dur: 12, label: '¿Por qué PROFINET?' },
  { C: S_RTIRT, dur: 13, label: 'RT vs IRT' },
  { C: S_Compare, dur: 13, label: 'Comparativa' },
  { C: (p) => <ClosingM7 {...p} line="PROFIBUS dominó el campo durante 30 años; PROFINET lleva esa potencia a Ethernet — más rápido, flexible y fácil de mantener." activity="Sobre un proyecto PROFIBUS DP existente (3 ET200M y 2 VFDs): analiza la arquitectura actual, propón la migración a PROFINET con su nueva topología, identifica qué equipos se reemplazan y estima tiempo y ventajas." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M7C3 = SCENES_M7C3;
