// m6c9.jsx — "Comparadores, operaciones matemáticas y movimiento de datos"
// After m6-lib.jsx. Exports SCENES_M6C9.

function S_Types({ start, dur }) {
  const t = useTime(); const s = start;
  const rows = [
    ['BOOL', '1 bit', 'señales digitales, estados'],
    ['INT', '16 bits ±', '-32768 … +32767'],
    ['DINT', '32 bits ±', 'enteros grandes'],
    ['REAL', '32 bits IEEE', 'temperatura, presión, caudal'],
    ['WORD', '16 bits', 'registros, raw analógico'],
    ['TIME', '32 bits', 'duraciones T#…'],
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Tipos de datos en TIA Portal" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="21%" width={1560}>Antes de operar, conoce <span style={{ color: TL6.cyan }}>cómo</span> guarda el dato el PLC.</CapM6>
      <div style={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%,-50%)', width: 1240 }}>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${TL6.lineS}`, boxShadow: TL6.shadow }}>
          {rows.map((r, i) => {
            const ap = clamp((t - (s + 1.5 + i * 0.32)) / 0.5, 0, 1);
            return (
              <div key={i} style={{ opacity: ap, display: 'grid', gridTemplateColumns: '0.7fr 0.9fr 1.6fr', background: i % 2 ? TL6.bg2 : TL6.paper, borderBottom: i < rows.length - 1 ? `1px solid ${TL6.line}` : 'none' }}>
                <div style={{ padding: '15px 26px', fontFamily: MONO6, fontSize: 21, fontWeight: 700, color: TL6.cyan }}>{r[0]}</div>
                <div style={{ padding: '15px 26px', fontFamily: MONO6, fontSize: 18, color: TL6.ink, borderLeft: `1px solid ${TL6.line}` }}>{r[1]}</div>
                <div style={{ padding: '15px 26px', fontFamily: DISP6, fontSize: 19, color: TL6.mut, borderLeft: `1px solid ${TL6.line}` }}>{r[2]}</div>
              </div>
            );
          })}
        </div>
      </div>
      <CapM6 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL6.red} y="88%" width={1500}>Regla crítica: nunca mezcles tipos sin conversión explícita.</CapM6>
    </SceneM6>
  );
}

function S_Compare({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '// Alarma de temperatura alta', c: TL6.dim },
    { txt: 'IF TT101 >= 85.0 THEN', c: TL6.cyan },
    { txt: '   Alarma_Temp_Alta := TRUE;', c: TL6.ink },
    { txt: 'END_IF;', c: TL6.cyan },
    { txt: '', c: TL6.ink },
    { txt: '// Control ON/OFF de bomba por nivel', c: TL6.dim },
    { txt: 'Bomba_ON  := (LT101 < 1.5);', c: TL6.grn },
    { txt: 'Bomba_OFF := (LT101 >= 3.5);', c: TL6.amber },
    { txt: '', c: TL6.ink },
    { txt: '// Señal analógica válida', c: TL6.dim },
    { txt: 'Senal_OK := (IW96 >= 0)', c: TL6.cyanLt },
    { txt: '         AND (IW96 <= 27648);', c: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Operaciones de comparación" y="9%" />
      <CapM6 start={s + 0.6} dur={2.2} size={46} weight={600} y="17%" width={1500}>Comparar = tomar decisiones: <span style={{ color: TL6.cyan }}>=, ≥, &lt;, ≤</span>.</CapM6>
      <CodeM6 x={120} y={300} w={920} title="ST · comparadores" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.4, 0, 1)} />
      <InfoCardM6 x={1110} y={360} w={660} h={150} accent={TL6.cyan} title="En Ladder" sub="Los bloques CMP (==, >=, <) abren paso al rung cuando se cumple la condición." appear={s + 2.6} t={t} />
      <InfoCardM6 x={1110} y={540} w={660} h={170} accent={TL6.grn} title="Aplicación típica" sub="Disparar alarmas por umbral, controlar ON/OFF por nivel, validar el rango de una señal analógica." appear={s + 3.1} t={t} />
    </SceneM6>
  );
}

function S_Math({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: '// Caudal másico = volumétrico × densidad', c: TL6.dim },
    { txt: 'Caudal_Masico := Q_FT101 * Densidad;', c: TL6.cyan },
    { txt: '', c: TL6.ink },
    { txt: '// Caudal desde ΔP de placa orificio', c: TL6.dim },
    { txt: 'Q_FT201 := SQRT(DP_FT201 * K_Orif);', c: TL6.grn },
    { txt: '', c: TL6.ink },
    { txt: '// Limitar la salida de control 0–100 %', c: TL6.dim },
    { txt: 'CV := MIN(100.0, MAX(0.0, CV));', c: TL6.amber },
    { txt: '', c: TL6.ink },
    { txt: '// Error absoluto para diagnóstico', c: TL6.dim },
    { txt: 'Err := ABS(SP - PV);', c: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Operaciones matemáticas" y="9%" />
      <CapM6 start={s + 0.6} dur={2.2} size={46} weight={600} y="17%" width={1500}>ST hace el cálculo que en Ladder sería engorroso.</CapM6>
      <CodeM6 x={150} y={310} w={900} title="ST · matemáticas" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 3.0, 0, 1)} />
      <InfoCardM6 x={1120} y={360} w={640} h={150} accent={TL6.grn} title="Funciones de librería" sub="SQRT, LN, SIN, COS, ABS, MIN/MAX — listas para usar en cualquier expresión." appear={s + 2.6} t={t} />
      <InfoCardM6 x={1120} y={540} w={640} h={170} accent={TL6.cyan} title="MOVE / asignación" sub="Copiar valores entre variables: cargar recetas (SP de temperatura, tiempo, velocidad) de un solo golpe." appear={s + 3.1} t={t} />
    </SceneM6>
  );
}

function S_Convert({ start, dur }) {
  const t = useTime(); const s = start;
  const lines = [
    { txt: 'PV_Real := INT_TO_REAL(IW96);', c: TL6.cyan },
    { txt: 'QW80    := REAL_TO_INT(CV);', c: TL6.grn },
    { txt: '', c: TL6.ink },
    { txt: '// ⚠ La trampa del desbordamiento INT', c: TL6.amber },
    { txt: '200 * 200 = 40000  > 32767  ✗', c: TL6.red },
    { txt: '', c: TL6.ink },
    { txt: '// Solución: convertir a DINT antes', c: TL6.dim },
    { txt: 'R := INT_TO_DINT(a) * INT_TO_DINT(b);', c: TL6.grn },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Conversión de tipos" y="10%" color={TL6.amber} />
      <CapM6 start={s + 0.6} dur={2.2} size={46} weight={600} y="19%" width={1560}>El PLC <span style={{ color: TL6.red }}>no</span> convierte solo — y ahí está la trampa.</CapM6>
      <CodeM6 x={170} y={350} w={840} title="ST · conversión" lines={lines} t={t} appear={s + 1.2} reveal={clamp((t - (s + 1.6)) / 2.6, 0, 1)} />
      <InfoCardM6 x={1080} y={400} w={680} h={300} no={1} accent={TL6.red} title="Error más común" sub="Multiplicar dos INT y guardar en INT: si el producto supera 32767 el resultado es basura. Convierte a DINT antes de multiplicar." appear={s + 2.6} t={t} />
    </SceneM6>
  );
}

const SCENES_M6C9 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={9} seccion="Programación del PLC" title="Comparadores, matemáticas y datos" dudur="18–20 min" objetivo="Programar comparaciones, cálculos y movimiento de datos, y entender los tipos de dato del PLC sin caer en sus trampas." />, dur: 7, label: 'Apertura' },
  { C: S_Types, dur: 12, label: 'Tipos de datos' },
  { C: S_Compare, dur: 14, label: 'Comparadores' },
  { C: S_Math, dur: 14, label: 'Matemáticas en ST' },
  { C: S_Convert, dur: 12, label: 'Conversión y desbordamiento' },
  { C: (p) => <ClosingM6 {...p} line="Comparar decide, calcular transforma, convertir traduce. Respeta los tipos de dato y el PLC nunca te mentirá." activity="Implementa en ST el escalado de las 4 entradas, el caudal másico del agua, la verificación de rangos y los bits de alarma de cada variable." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C9 = SCENES_M6C9;
