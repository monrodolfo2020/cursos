// m10c6.jsx — "Instrumentación para variables especiales: pH, conductividad y análisis"
// After m10-lib.jsx. Exports SCENES_M10C6.

// ── Medición de pH ────────────────────────────────────────────────────────────
function S_pH({ start, dur }) {
  const t = useTime(); const s = start;
  const cols = ['#ff4d4d', '#ff7a1f', '#f6b53a', '#bfd83a', '#3fd07a', '#2ee6c8', '#46c0ff', '#6b8cff', '#8b6bff', '#b34dff', '#ff4d9d'];
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="pH = −log₁₀ [H⁺]" y="9%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Una escala <span style={{ color: TL10.mag }}>logarítmica</span>: 1 unidad = 10× la concentración.</CapM10>
      <div style={{ position: 'absolute', left: '50%', top: 320, transform: 'translateX(-50%)', width: 1400 }}>
        <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: `1px solid ${TL10.lineS}` }}>
          {cols.map((c, i) => {
            const ap = clamp((t - (s + 1.2 + i * 0.08)) / 0.4, 0, 1);
            return <div key={i} style={{ flex: 1, height: 70, background: c, opacity: ap, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO10, fontSize: 18, fontWeight: 700, color: '#0a0d16' }}>{i}</div>;
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: MONO10, fontSize: 16, color: TL10.mut }}>
          <span style={{ color: '#ff7a1f' }}>◄ ÁCIDO</span><span style={{ color: TL10.grn }}>NEUTRO (7)</span><span style={{ color: TL10.iris }}>ALCALINO ►</span>
        </div>
      </div>
      <InfoCardM10 x={350} y={520} w={560} h={220} accent={TL10.mint} title="Electrodo de vidrio + referencia" sub="Genera un voltaje proporcional al pH. Ecuación de Nernst: 59,16 mV por unidad de pH a 25 °C." appear={s + 2.4} t={t} />
      <InfoCardM10 x={1010} y={520} w={560} h={220} accent={TL10.iris} title="Compensación de temperatura" sub="La respuesta cambia con la temperatura → ATC (Automatic Temperature Compensation) es imprescindible." appear={s + 2.9} t={t} />
    </SceneM10>
  );
}

// ── Por qué el control de pH es difícil ───────────────────────────────────────
function S_pHControl({ start, dur }) {
  const t = useTime(); const s = start;
  const reveal = clamp((t - s - 1.4) / 1.8, 0, 1);
  // titration S-curve
  const W = 760, H = 360, x0 = 160, y0 = 280;
  let path = `M ${x0} ${y0 + H * 0.42}`;
  const N = Math.round(60 * reveal);
  for (let i = 0; i <= N; i++) {
    const f = i / 60;
    const ph = 1 / (1 + Math.exp(-(f - 0.5) * 16)); // sigmoid 0..1
    path += ` L ${x0 + W * f} ${y0 + H * (1 - ph) * 0.84 + H * 0.08}`;
  }
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Por qué el pH es difícil de controlar" y="9%" color={TL10.mag} />
      <CapM10 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>La ganancia del proceso cambia drásticamente.</CapM10>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={160} y1={280} x2={160} y2={640} stroke={TL10.lineS} strokeWidth="2" />
        <line x1={160} y1={640} x2={920} y2={640} stroke={TL10.lineS} strokeWidth="2" />
        <text x={120} y={300} fill={TL10.mut} fontFamily={MONO10} fontSize="15" textAnchor="end">pH 14</text>
        <text x={120} y={645} fill={TL10.mut} fontFamily={MONO10} fontSize="15" textAnchor="end">pH 0</text>
        <text x={540} y={680} fill={TL10.mut} fontFamily={MONO10} fontSize="15" textAnchor="middle">reactivo añadido →</text>
        <path d={path} fill="none" stroke={TL10.mag} strokeWidth="3.4" strokeLinecap="round" />
        {reveal > 0.5 && <g opacity={clamp((reveal - 0.5) / 0.3, 0, 1)}><rect x={460} y={400} width={160} height={130} fill={TL10.magWash} stroke={TL10.mag} strokeWidth="1.5" strokeDasharray="6 5" rx="6" /><text x={540} y={390} fill={TL10.mag} fontFamily={MONO10} fontSize="15" textAnchor="middle">zona de alta ganancia</text></g>}
      </svg>
      <InfoCardM10 x={1050} y={310} w={700} h={185} accent={TL10.mag} title="Cerca de pH 7" sub="Una gotita de reactivo cambia el pH muchísimo → ganancia altísima. Un PID lineal oscila sin control." appear={s + 2.6} t={t} />
      <InfoCardM10 x={1050} y={520} w={700} h={185} accent={TL10.mint} title="La solución" sub="PID no lineal o de ganancia variable. Y calibrar el electrodo en 3 puntos: pendiente (59 mV/pH), cero (pH 7) y ATC." appear={s + 3.1} t={t} />
      <CapM10 start={s + 4.4} dur={dur - 4.7} size={22} weight={500} color={TL10.mut} y="92%" width={1560}>El gran enemigo del electrodo: la contaminación. Limpieza cada 1–4 semanas · vida útil 1–3 años — un consumible clave en plantas de agua.</CapM10>
    </SceneM10>
  );
}

// ── Conductividad ─────────────────────────────────────────────────────────────
function S_Conductivity({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Conductividad · iones disueltos" y="9%" color={TL10.iris} />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>De agua ultrapura a agua de mar.</CapM10>
      <TableM10 x={260} y={290} w={1400} t={t} appear={s + 1.2} accentCol={1}
        headers={['Aplicación', 'Conductividad', 'Uso']}
        colTemplate="1.4fr 1.2fr 1.6fr"
        rows={[
          ['Agua desionizada', '< 0.1 µS/cm', 'Farmacéutica, semiconductores'],
          ['Agua de proceso', '50–500 µS/cm', 'Proceso industrial normal'],
          ['Agua potable', '< 2500 µS/cm', 'Límite OMS'],
          ['Agua de mar', '~54.000 µS/cm', 'Referencia'],
        ]} />
      <CapM10 start={s + 3.8} dur={dur - 4.1} size={23} weight={500} color={TL10.mintLt} y="86%" width={1560}><b style={{ color: TL10.ink }}>Inductivo (toroidal)</b>: sin contacto, para fluidos corrosivos o sucios · <b style={{ color: TL10.ink }}>Conductivo</b>: más sensible a baja conductividad, requiere corriente alterna.</CapM10>
    </SceneM10>
  );
}

// ── Otros analizadores en línea ───────────────────────────────────────────────
function S_Analyzers({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM10 start={start} dur={dur}>
      <KickerM10 start={s + 0.3} dur={dur - 0.5} text="Análisis en línea · calidad del agua" y="9%" />
      <CapM10 start={s + 0.6} dur={2.0} size={44} weight={600} y="16%" width={1560}>Tres analizadores que cuidan el agua potable.</CapM10>
      <InfoCardM10 x={170} y={300} w={500} h={280} accent={TL10.mint} title="Oxígeno disuelto" sub="Aireación en tratamiento, acuicultura. Sensor óptico (luminiscente) → menos mantenimiento que el de membrana." appear={s + 1.3} t={t} />
      <InfoCardM10 x={710} y={300} w={500} h={280} accent={TL10.iris} title="Turbidez" sub="Partículas en suspensión (NTU). Luz dispersada a 90°. Potable: < 1 NTU en planta, < 0.3 en red." appear={s + 1.7} t={t} />
      <InfoCardM10 x={1250} y={300} w={500} h={280} accent={TL10.amber} title="Cloro residual" sub="Garantiza desinfección en toda la red. 0.2–1.0 mg/L (OPS/OMS). Amperométrico, sensible a pH y temperatura." appear={s + 2.1} t={t} />
      <CapM10 start={s + 3.4} dur={dur - 3.7} size={22} weight={500} color={TL10.magLt} y="88%" width={1560}>Todos con salida 4–20 mA y HART/Foundation Fieldbus para diagnóstico remoto. El control de cloro es un PID clásico: AT-501 → AIC-501 → dosificadora.</CapM10>
    </SceneM10>
  );
}

const SCENES_M10C6 = [
  { C: (p) => <TitleCardM10 {...p} claseNo={6} seccion="Análisis en línea" title="pH, conductividad y análisis en línea" dudur="14–16 min" objetivo="Comprender el principio de medición de pH, conductividad y otros parámetros de análisis en línea, sus requerimientos especiales de mantenimiento y su integración al control." />, dur: 7, label: 'Apertura' },
  { C: S_pH, dur: 14, label: 'Medición de pH' },
  { C: S_pHControl, dur: 14, label: 'Control de pH' },
  { C: S_Conductivity, dur: 12, label: 'Conductividad' },
  { C: S_Analyzers, dur: 13, label: 'Análisis en línea' },
  { C: (p) => <ClosingM10 {...p} line="Las variables analíticas son las más exigentes de la instrumentación: miden la química del proceso, se contaminan, derivan y obligan a calibrar. Dominarlas es dominar la calidad del producto." activity="Integra en el SCADA del curso analizadores simulados: crea tags de pH, turbidez, cloro y conductividad con sus alarmas según límites normativos de agua potable, arma un lazo de dosificación de cloro (AT-501 → AIC-501 → dosificadora) y pon prioridad Critical cuando algún parámetro supera el límite." />, dur: 8, label: 'Cierre del módulo' },
];
window.SCENES_M10C6 = SCENES_M10C6;
