// m6c6.jsx — "Sistemas de numeración: binario, hexadecimal y BCD"
// After m6-lib.jsx. Exports SCENES_M6C6.

// ── Binario posicional ────────────────────────────────────────────────────────
function S_Binary({ start, dur }) {
  const t = useTime(); const s = start;
  const bits = [0, 1, 0, 0, 1, 1, 0, 1]; // 77
  const powers = ['128', '64', '32', '16', '8', '4', '2', '1'];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Sistema binario · base 2" y="13%" />
      <CapM6 start={s + 0.6} dur={2.2} size={50} weight={700} y="24%" width={1500}>Todo dato en el PLC es, por dentro, binario.</CapM6>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {powers.map((p, i) => (
          <text key={i} x={560 + i * 100 + 25} y={430} fill={TL6.dim} fontFamily={MONO6} fontSize="18" textAnchor="middle" opacity={clamp((t - (s + 1.2)) / 0.6, 0, 1)}>{p}</text>
        ))}
        <BitsM6 x={560} y={450} bits={bits} accent={TL6.cyan} t={t} appear={s + 1.4} cell={100} />
      </svg>
      <div style={{ position: 'absolute', left: '50%', top: '72%', transform: 'translateX(-50%)', textAlign: 'center', opacity: clamp((t - (s + 2.6)) / 0.6, 0, 1) }}>
        <div style={{ fontFamily: MONO6, fontSize: 30, color: TL6.ink }}>0100 1101₂ = 64 + 8 + 4 + 1 = <b style={{ color: TL6.grn }}>77₁₀</b></div>
      </div>
    </SceneM6>
  );
}

// ── Bit, byte, word + memoria ─────────────────────────────────────────────────
function S_Units({ start, dur }) {
  const t = useTime(); const s = start;
  const units = [
    { k: 'Bit', d: '1 dígito (0/1)', ej: 'I0.0  ·  Q2.3  ·  M10.5', a: TL6.grn },
    { k: 'Byte', d: '8 bits → 0–255', ej: 'IB0  ·  QB2  ·  MB10', a: TL6.cyan },
    { k: 'Word', d: '16 bits → 0–65535', ej: 'IW0  ·  QW2  ·  MW10', a: TL6.amber },
    { k: 'DWord', d: '32 bits → enteros / float', ej: 'ID0  ·  QD2  ·  MD10', a: TL6.cyanLt },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Cómo el PLC organiza su memoria" y="11%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="21%" width={1500}>Del bit a la doble palabra.</CapM6>
      {units.map((u, i) => (
        <div key={i} style={{ position: 'absolute', left: 200 + i * 388, top: 410, width: 350 }}>
          {(() => { const ap = pop6(t, s + 1.4 + i * 0.4, 0.5, 20); return (
            <div style={{ opacity: ap.op, transform: `translateY(${ap.ty}px) scale(${ap.sc})`, transformOrigin: 'center top', borderRadius: 12, border: `1px solid ${TL6.lineS}`, background: `linear-gradient(160deg, ${TL6.paper}, ${TL6.bg2})`, boxShadow: TL6.shadow, padding: '26px 24px', height: 280, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 4, background: u.a, borderRadius: 3 }} />
              <div style={{ display: 'flex', gap: 4 }}>{Array.from({ length: i === 0 ? 1 : (i === 1 ? 8 : 16) }).slice(0, 16).map((_, k) => <span key={k} style={{ width: i > 1 ? 8 : 13, height: 13, borderRadius: 3, background: u.a, opacity: 0.85 }} />)}</div>
              <div style={{ fontFamily: DISP6, fontSize: 30, fontWeight: 700, color: TL6.ink }}>{u.k}</div>
              <div style={{ fontFamily: MONO6, fontSize: 17, color: u.a }}>{u.d}</div>
              <div style={{ marginTop: 'auto', fontFamily: MONO6, fontSize: 16, color: TL6.mut }}>{u.ej}</div>
            </div>
          ); })()}
        </div>
      ))}
      <CapM6 start={s + 4.4} dur={dur - 4.7} size={24} weight={500} color={TL6.mut} y="86%" width={1500}>IW0 contiene los bytes IB0 e IB1 — los bits I0.0…I1.7. Todo encaja como cajas dentro de cajas.</CapM6>
    </SceneM6>
  );
}

// ── Hexadecimal ───────────────────────────────────────────────────────────────
function S_Hex({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="Sistema hexadecimal · base 16" y="10%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={600} y="19%" width={1560}>1 dígito hex = <span style={{ color: TL6.cyan }}>exactamente 4 bits</span>. Por eso el PLC lo ama.</CapM6>
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <BitsM6 x={420} y={420} bits={[1, 0, 1, 1]} accent={TL6.cyan} t={t} appear={s + 1.2} cell={86} />
        <BitsM6 x={820} y={420} bits={[0, 1, 1, 0]} accent={TL6.cyan} t={t} appear={s + 1.4} cell={86} />
        <text x={620} y={560} fill={TL6.grn} fontFamily={MONO6} fontSize="46" fontWeight="700" textAnchor="middle" opacity={clamp((t - (s + 1.8)) / 0.5, 0, 1)}>B</text>
        <text x={1020} y={560} fill={TL6.grn} fontFamily={MONO6} fontSize="46" fontWeight="700" textAnchor="middle" opacity={clamp((t - (s + 2.0)) / 0.5, 0, 1)}>6</text>
        <text x={820} y={620} fill={TL6.mut} fontFamily={MONO6} fontSize="22" textAnchor="middle" opacity={clamp((t - (s + 2.2)) / 0.5, 0, 1)}>1011 0110₂  =  B6₁₆  =  182₁₀</text>
      </svg>
      <div style={{ position: 'absolute', left: '50%', top: '78%', transform: 'translateX(-50%)', textAlign: 'center', opacity: clamp((t - (s + 3.0)) / 0.6, 0, 1) }}>
        <div style={{ fontFamily: MONO6, fontSize: 26, color: TL6.ink, background: TL6.paper, border: `1px solid ${TL6.lineS}`, borderRadius: 10, padding: '16px 22px' }}>El máximo analógico Siemens: 27648₁₀ = <b style={{ color: TL6.amber }}>W#16#6C00</b></div>
      </div>
    </SceneM6>
  );
}

// ── BCD y representación en TIA ───────────────────────────────────────────────
function S_BCD({ start, dur }) {
  const t = useTime(); const s = start;
  const reps = [
    { k: 'Decimal', v: '182', a: TL6.mut },
    { k: 'Hexadecimal', v: '16#B6', a: TL6.cyan },
    { k: 'Binario', v: '2#1011 0110', a: TL6.grn },
    { k: 'BCD (147)', v: '0001 0100 0111', a: TL6.amber },
  ];
  return (
    <SceneM6 start={start} dur={dur}>
      <KickerM6 start={s + 0.3} dur={dur - 0.5} text="BCD y la notación de TIA Portal" y="12%" />
      <CapM6 start={s + 0.6} dur={2.2} size={48} weight={700} y="23%" width={1560}>Un mismo valor, cuatro maneras de escribirlo.</CapM6>
      {reps.map((r, i) => (
        <InfoCardM6 key={i} x={210 + (i % 2) * 760} y={400 + Math.floor(i / 2) * 170} w={700} h={140} accent={r.a} title={r.v} sub={r.k === 'BCD (147)' ? 'BCD: cada dígito decimal en 4 bits — para displays de 7 segmentos y encoders.' : r.k} appear={s + 1.4 + i * 0.4} t={t} />
      ))}
    </SceneM6>
  );
}

const SCENES_M6C6 = [
  { C: (p) => <TitleCardM6 {...p} claseNo={6} title="Sistemas de numeración" dudur="14–16 min" objetivo="Dominar binario, hexadecimal y BCD y su aplicación directa: registros, direcciones de memoria y códigos de error." />, dur: 7, label: 'Apertura' },
  { C: S_Binary, dur: 12, label: 'Binario posicional' },
  { C: S_Units, dur: 13, label: 'Bit · byte · word' },
  { C: S_Hex, dur: 13, label: 'Hexadecimal' },
  { C: S_BCD, dur: 12, label: 'BCD y notación TIA' },
  { C: (p) => <ClosingM6 {...p} line="Binario es cómo piensa el PLC; hexadecimal es cómo nos lo muestra; BCD es cómo habla con displays. Saber traducir es leer su mente." activity="Realiza 15 conversiones con contexto de PLC: pasa un raw analógico a hex, interpreta un código de error en hexadecimal y arma una palabra de estado de 16 bits." />, dur: 8, label: 'Cierre' },
];
window.SCENES_M6C6 = SCENES_M6C6;
