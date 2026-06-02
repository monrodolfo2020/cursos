// m2c1.jsx — "¿Qué es la instrumentación? Historia y evolución"
// After m1-lib.jsx + m2-lib.jsx. Exports SCENES_M2C1.

// Qué hace un instrumento: medir → convertir → transmitir
function S_Que({ start, dur }) {
  const t = useTime(); const s = start;
  const steps = [
    { k: 'Medir', d: 'Percibe la variable física del proceso.', Icon: IcoGauge, a: TEAL },
    { k: 'Convertir', d: 'La traduce a una señal eléctrica.', Icon: IcoChipL, a: TL.blue },
    { k: 'Transmitir', d: 'La envía al sistema de control.', Icon: IcoFlow, a: TL.clay },
  ];
  const xs = [220, 800, 1380]; const w = 360, cy = 560;
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Qué hace, exactamente, un instrumento" y="13%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={50} weight={600} y="24%" width={1500}>Todo instrumento hace tres cosas.</CapL>
      {[0, 1].map(i => {
        const ax = xs[i] + w, bx = xs[i + 1];
        const e = clamp((t - (s + 2.6 + (i + 1) * 0.5)) / 0.4, 0, 1);
        return (
          <svg key={i} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <line x1={ax - 18} y1={cy} x2={ax - 18 + (bx - ax + 18) * e} y2={cy} stroke={TEAL} strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" opacity="0.8" />
            <polygon points={`${bx - 12},${cy - 6} ${bx - 4},${cy} ${bx - 12},${cy + 6}`} fill={TEAL} opacity={e} />
          </svg>
        );
      })}
      {steps.map((st, i) => {
        const { op, sc, ty } = popL(t, s + 2.4 + i * 0.5, 0.55, 22);
        return (
          <div key={i} style={{ position: 'absolute', left: xs[i], top: cy - 130, width: w, height: 260, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, borderRadius: 12, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadow, padding: '28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <st.Icon c={st.a} t={t} />
            <div style={{ fontFamily: DISPL, fontSize: 36, fontWeight: 700, color: TL.ink }}>{st.k}</div>
            <div style={{ fontFamily: DISPL, fontSize: 20, color: TL.mut, lineHeight: 1.35 }}>{st.d}</div>
            <BracketsL color={st.a} size={14} thick={1.5} inset={-1} />
          </div>
        );
      })}
      <CapL start={s + 5.6} dur={dur - 5.9} size={32} weight={500} color={TL.mut} y="88%" width={1500}>
        Medir lo invisible y volverlo un número que el sistema entiende.
      </CapL>
    </SceneL>
  );
}

// Línea de tiempo de la evolución
function S_Historia({ start, dur }) {
  const t = useTime(); const s = start;
  const eras = [
    { yr: '1900s', name: 'Neumática', sig: '3–15 psi', d: 'Señales con aire a presión.', a: TL.mut },
    { yr: '1950s', name: 'Analógica', sig: '4–20 mA', d: 'La corriente eléctrica estándar.', a: TL.blue },
    { yr: '1990s', name: 'Digital', sig: 'HART · Fieldbus', d: 'Datos digitales sobre el cable.', a: TEAL },
    { yr: 'Hoy', name: 'Inteligente', sig: 'IIoT · inalámbrico', d: 'Instrumentos que se diagnostican solos.', a: TL.clay },
  ];
  const n = eras.length, x0 = 240, gapX = (1920 - 480) / (n - 1), cy = 540;
  const drawStart = s + 1.6, drawDur = 7;
  const dp = clamp((t - drawStart) / drawDur, 0, 1);
  const frontX = x0 + dp * gapX * (n - 1);
  return (
    <SceneL start={start} dur={dur}>
      <KickerL start={s + 0.3} dur={dur - 0.5} text="Un siglo de evolución" y="11%" color={TEAL} />
      <CapL start={s + 0.8} dur={2.2} size={48} weight={600} y="21%" width={1500}>Del aire a presión a la nube.</CapL>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={x0} y1={cy} x2={x0 + gapX * (n - 1)} y2={cy} stroke={TL.lineS} strokeWidth="2" strokeDasharray="2 8" />
        <line x1={x0} y1={cy} x2={frontX} y2={cy} stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {eras.map((er, i) => {
        const x = x0 + i * gapX;
        const f = i / (n - 1);
        const litT = drawStart + f * drawDur;
        const { op, sc, ty } = popL(t, litT, 0.5, 0);
        const lit = frontX >= x - 6;
        const above = i % 2 === 0;
        return (
          <div key={i}>
            <div style={{ position: 'absolute', left: x, top: cy, transform: `translate(-50%,-50%) scale(${sc})`, opacity: op, width: 22, height: 22, borderRadius: '50%', border: `3px solid ${lit ? er.a : TL.dim}`, background: lit ? er.a : TL.paper, boxShadow: lit ? `0 0 0 5px ${TL.paper}` : 'none' }} />
            <div style={{ position: 'absolute', left: x, top: cy + (above ? -210 : 56), width: 300, transform: `translateX(-50%) translateY(${ty}px)`, opacity: op, textAlign: 'center' }}>
              <div style={{ borderRadius: 10, border: `1px solid ${TL.lineS}`, background: TL.paper, boxShadow: TL.shadowSm, padding: '16px 18px' }}>
                <div style={{ fontFamily: MONOL, fontSize: 13, letterSpacing: '0.16em', color: er.a, fontWeight: 600 }}>{er.yr}</div>
                <div style={{ fontFamily: DISPL, fontSize: 28, fontWeight: 700, color: TL.ink, marginTop: 4 }}>{er.name}</div>
                <div style={{ fontFamily: MONOL, fontSize: 16, color: er.a, marginTop: 6 }}>{er.sig}</div>
                <div style={{ fontFamily: DISPL, fontSize: 16, color: TL.mut, marginTop: 8, lineHeight: 1.3 }}>{er.d}</div>
              </div>
            </div>
          </div>
        );
      })}
      <CapL start={s + 9.2} dur={dur - 9.5} size={30} weight={500} color={TL.mut} y="90%" width={1500}>
        Hoy un transmisor moderno hace lo que antes ocupaba una sala entera.
      </CapL>
    </SceneL>
  );
}

const SCENES_M2C1 = [
  { C: (p) => <TitleCardM2 {...p} claseNo={1} title="¿Qué es la instrumentación?" dudur="14–16 min" objetivo="Entender qué hace un instrumento y cómo la medición industrial evolucionó en un siglo." />, dur: 7, label: 'Apertura' },
  { C: S_Que, dur: 12, label: 'Qué hace' },
  { C: S_Historia, dur: 14, label: 'Historia' },
  { C: (p) => <ClosingM2 {...p} line="Instrumentar es darle sentidos a la planta: ojos, oídos y voz para el proceso." activity="Investiga cómo era un transmisor neumático y compáralo con un transmisor inteligente actual." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M2C1 = SCENES_M2C1;
