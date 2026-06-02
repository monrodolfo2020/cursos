// m2c10.jsx — "Práctica: Dibuja tu primer P&ID en draw.io"
// After m1-lib.jsx + m2-lib.jsx. Exports SCENES_M2C10.

// Build the P&ID step by step (the practice)
function S_Build({ start, dur }) {
  const t = useTime(); const s = start;
  const seg = (a, d = 0.6) => Easing.easeOutCubic(clamp((t - (s + a)) / d, 0, 1));
  const B = TL.blue, C = TL.clay;
  const tankX = 480, tankY = 360, tankW = 280, tankH = 320;
  const lvl = tankY + tankH * 0.42;
  const ctrlX = 1180, ctrlY = 380;
  const valveX = 1320, valveY = 740;
  const steps = [
    { a: 1.4, label: '1 · Coloca el tanque' },
    { a: 3.0, label: '2 · Añade el transmisor (LT)' },
    { a: 4.6, label: '3 · Dibuja la señal al control' },
    { a: 6.0, label: '4 · Pon el controlador (LIC)' },
    { a: 7.4, label: '5 · Conecta la válvula (LV)' },
  ];
  let cur = steps[0].label;
  for (const st of steps) if (t >= s + st.a) cur = st.label;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tu primer P&ID, paso a paso" y="8%" color={TEAL} />
      {/* current step pill */}
      <div style={{ position: 'absolute', left: '50%', top: '16%', transform: 'translate(-50%,-50%)', fontFamily: MONOL, fontSize: 20, fontWeight: 600, color: TEAL, letterSpacing: '0.04em', padding: '12px 26px', borderRadius: 100, background: TL.paper, border: `1px solid ${TL.lineS}`, boxShadow: TL.shadowSm }}>{cur}</div>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {seg(7.4) > 0.05 && <ProcessPipe d={`M ${valveX} ${valveY + 30} V 900 H ${tankX + 60} V ${tankY + tankH}`} start={s + 7.4} t={t} color={B} />}
        <g opacity={seg(1.4)}>
          <rect x={tankX} y={tankY} width={tankW} height={tankH} rx="12" fill={TL.paper} stroke={TL.ink} strokeWidth="2.6" />
          <rect x={tankX} y={lvl} width={tankW} height={tankY + tankH - lvl - 4} rx="8" fill="rgba(232,150,70,0.20)" />
          <line x1={tankX} y1={lvl} x2={tankX + tankW} y2={lvl} stroke={B} strokeWidth="2" strokeDasharray="4 5" />
          <text x={tankX + tankW / 2} y={tankY - 16} fill={TL.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">TK-101</text>
        </g>
        {seg(3.0) > 0.05 && <ISABalloon cx={tankX + tankW} cy={lvl} r={40} code="LT" tag="101" kind="field" accent={TEAL} t={t} />}
        {seg(4.6) > 0.05 && <SignalPath d={`M ${tankX + tankW + 40} ${lvl} H ${ctrlX - 64}`} start={s + 4.6} t={t} color={TEAL} />}
        {seg(6.0) > 0.05 && <ISABalloon cx={ctrlX} cy={ctrlY} r={56} code="LIC" tag="101" kind="panel" accent={TEAL} t={t} />}
        {seg(7.0) > 0.05 && <SignalPath d={`M ${ctrlX} ${ctrlY + 56} V ${valveY - 100}`} start={s + 7.0} t={t} color={C} />}
        {seg(7.4) > 0.05 && (
          <g opacity={seg(7.4)}>
            <ISABalloon cx={valveX} cy={valveY - 64} r={32} code="LV" tag="101" kind="field" accent={C} t={t} />
            <path d={`M ${valveX - 34} ${valveY - 26} L ${valveX + 34} ${valveY + 26} L ${valveX + 34} ${valveY - 26} L ${valveX - 34} ${valveY + 26} Z`} fill={TL.paper} stroke={TL.ink} strokeWidth="2.6" strokeLinejoin="round" />
          </g>
        )}
      </svg>
      <CapL start={s + 9.0} dur={dur - 9.3} size={30} weight={500} color={TL.mut} y="93%" width={1500}>
        Cinco elementos y tienes un lazo de nivel completo en draw.io.
      </CapL>
    </SceneL>
  );
}

// Checklist de la práctica
function S_Check({ start, dur }) {
  const t = useTime(); const s = start;
  const items = ['Abre draw.io y crea un lienzo', 'Dibuja el tanque TK-101', 'Añade LT-101 en el costado', 'Traza la señal punteada al LIC-101', 'Conecta la válvula LV-101', 'Exporta tu P&ID como imagen'];
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Tu entregable" y="12%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="22%" width={1500}>Sigue la lista y entrégalo.</CapL>
      <div style={{ position: 'absolute', left: '50%', top: '58%', transform: 'translate(-50%,-50%)', width: 980, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map((it, i) => {
          const appear = s + 2.2 + i * 0.4;
          const { op, ty } = popL(t, appear, 0.45, 14);
          const checked = t > appear + 0.4;
          const ce = clamp((t - (appear + 0.4)) / 0.3, 0, 1);
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${ty}px)`, display: 'flex', alignItems: 'center', gap: 20, padding: '16px 24px', borderRadius: 10, border: `1px solid ${checked ? TEAL : TL.line}`, background: TL.paper, boxShadow: TL.shadowSm }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, border: `2px solid ${checked ? TEAL : TL.dim}`, background: checked ? TEAL : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {checked && <svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 12 L10 18 L20 6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset={(1 - ce) * 30} /></svg>}
              </div>
              <span style={{ fontFamily: DISPL, fontSize: 26, fontWeight: 500, color: checked ? TL.ink : TL.mut }}>{it}</span>
            </div>
          );
        })}
      </div>
    </SceneL>
  );
}

const SCENES_M2C10 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={10} title="Práctica: dibuja tu primer P&ID" dudur="20–25 min" objetivo="Construir, paso a paso, un lazo de nivel completo en draw.io — tu primer diagrama real." />, dur: 7, label: 'Apertura' },
  { C: S_Build, dur: 16, label: 'Paso a paso' },
  { C: S_Check, dur: 13, label: 'Checklist' },
  { C: (p) => <ClosingM2 {...p} line="Acabas de cerrar el Módulo 2: ya sabes medir, documentar y dibujar la instrumentación de una planta." activityLabel="Entrega" activity="Sube tu P&ID del lazo LT/LIC/LV-101 hecho en draw.io al foro del curso." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M2C10 = SCENES_M2C10;
