// m4c6.jsx — "Relés, contactores y arrancadores de motor"
// After m4-lib.jsx. Exports SCENES_M4C6.

function S_Relay({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  const on = (Math.sin(lt * 1.1) > 0) ? 1 : 0;          // toggling energization
  const e = clamp((on ? (lt) : 1), 0, 1);
  const pull = on; // 1 energized
  const cx = 680, cy = 540;
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="El interruptor controlado" y="9%" />
      <CapM4 start={s + 0.6} dur={2.2} size={44} weight={600} y="17%" width={1500}>Una bobina mueve los contactos: el relé <span style={{color:TL4.orangeD}}>amplifica</span> la señal del PLC.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* coil */}
        <rect x={cx-120} y={cy-40} width="80" height="120" rx="8" fill={TL4.paper} stroke={TL4.ink} strokeWidth="3" />
        {[0,1,2,3,4].map(i=>(<line key={i} x1={cx-120} y1={cy-28+i*30} x2={cx-40} y2={cy-28+i*30} stroke={pull?TL4.orange:TL4.dim} strokeWidth="3" opacity={pull?0.9:0.5} />))}
        <text x={cx-80} y={cy+108} fill={pull?TL4.orangeD:TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="middle" fontWeight="600">bobina 24 VDC</text>
        {/* magnetic glow */}
        {pull===1 && <circle cx={cx-80} cy={cy+20} r="70" fill="none" stroke={TL4.orange} strokeWidth="2" opacity={0.3+0.3*Math.sin(t*6)} />}
        {/* armature pivot */}
        <circle cx={cx+30} cy={cy-30} r="6" fill={TL4.ink} />
        <line x1={cx+30} y1={cy-30} x2={cx+30+ (pull? 150:140)} y2={cy-30 + (pull? 36 : -6)} stroke={TL4.ink} strokeWidth="6" strokeLinecap="round" />
        {/* contacts: common at pivot-arm tip; NO below, NC above */}
        <circle cx={cx+30+150} cy={cy-30+36} r="6" fill={pull?TL4.blue:TL4.dim} />
        {/* NC terminal (top) */}
        <line x1={cx+200} y1={cy-70} x2={cx+260} y2={cy-70} stroke={TL4.ink} strokeWidth="3" />
        <text x={cx+270} y={cy-64} fill={pull?TL4.dim:TL4.blueD} fontFamily="IBM Plex Mono, monospace" fontSize="18" fontWeight={pull?400:700}>NC {pull?'(abierto)':'(cerrado)'}</text>
        {/* NO terminal (bottom) */}
        <line x1={cx+200} y1={cy+6} x2={cx+260} y2={cy+6} stroke={TL4.ink} strokeWidth="3" />
        <text x={cx+270} y={cy+12} fill={pull?TL4.blueD:TL4.dim} fontFamily="IBM Plex Mono, monospace" fontSize="18" fontWeight={pull?700:400}>NO {pull?'(cerrado)':'(abierto)'}</text>
        {/* state badge */}
        <rect x={cx-150} y={cy-150} width="200" height="48" rx="24" fill={pull?TL4.orangeWash:'rgba(155,176,198,0.15)'} stroke={pull?TL4.orange:TL4.lineS} strokeWidth="2" />
        <text x={cx-50} y={cy-118} fill={pull?TL4.orangeD:TL4.mut} fontFamily="Space Grotesk, sans-serif" fontSize="24" fontWeight="700" textAnchor="middle">{pull?'ENERGIZADA':'EN REPOSO'}</text>
      </svg>
    </SceneM4>
  );
}

function S_RelayVsContactor({ start, dur }) {
  const t = useTime(); const s = start;
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="Relé vs contactor" y="11%" />
      <CapM4 start={s + 0.6} dur={2.2} size={50} weight={700} y="20%" width={1500}>El mismo principio, distinta liga de potencia.</CapM4>
      <InfoCardM4 x={300} y={420} w={560} h={350} no={1} Icon={IcoRelay} accent={TL4.blue} title="Relé de interfaz" sub="Bobina 24 VDC, contactos de pocos amperes. Amplifica, aísla e invierte la lógica del PLC." appear={s+1.2} t={t} />
      <InfoCardM4 x={1060} y={420} w={560} h={350} no={2} Icon={IcoRelay} accent={TL4.orange} title="Contactor" sub="Maniobra motores bajo carga: contactos de potencia, cámaras de arco y millones de ciclos." appear={s+1.7} t={t} />
    </SceneM4>
  );
}

function S_SealIn({ start, dur }) {
  const t = useTime(); const s = start;
  const lt = t - s;
  // cycle: 0-3 idle, press START at 3, latch; STOP at 8, drop. loop ~10s
  const cyc = lt % 10;
  const running = (cyc >= 3 && cyc < 8);
  const pressStart = (cyc >= 3 && cyc < 3.6);
  const pressStop = (cyc >= 8 && cyc < 8.6);
  const live = (n) => running ? TL4.orange : TL4.dim;
  const x0 = 560, xc = 1180, yTop = 430, yBot = 720;
  return (
    <SceneM4 start={start} dur={dur}>
      <KickerM4 start={s + 0.3} dur={dur - 0.5} text="El sello de marcha (self-holding)" y="9%" />
      <CapM4 start={s + 0.6} dur={2.0} size={42} weight={600} y="16%" width={1560}>Un contacto auxiliar del propio contactor <span style={{color:TL4.orangeD}}>se sostiene</span> solo.</CapM4>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* rails */}
        <line x1={x0} y1={yTop} x2={x0} y2={yBot} stroke={TL4.ink} strokeWidth="3" />
        <text x={x0-12} y={yTop-14} fill={TL4.blueD} fontFamily="IBM Plex Mono, monospace" fontSize="16" textAnchor="end">+24V</text>
        <line x1={xc+260} y1={yTop} x2={xc+260} y2={yBot} stroke={TL4.ink} strokeWidth="3" />
        <text x={xc+272} y={yBot+24} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="16">0V</text>
        {/* top branch: STOP(NC) -> START(NO) -> coil */}
        <line x1={x0} y1={yTop} x2={x0+90} y2={yTop} stroke={running?TL4.orange:TL4.ink} strokeWidth="3" />
        {/* STOP NC */}
        <line x1={x0+90} y1={yTop} x2={x0+150} y2={pressStop?yTop-18:yTop} stroke={pressStop?TL4.dim:(running?TL4.orange:TL4.ink)} strokeWidth="3" />
        <line x1={x0+150} y1={yTop} x2={x0+210} y2={yTop} stroke={running&&!pressStop?TL4.orange:TL4.ink} strokeWidth="3" />
        <text x={x0+150} y={yTop-26} fill={TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">PARO (NC)</text>
        {/* START NO */}
        <line x1={x0+210} y1={yTop} x2={x0+300} y2={yTop} stroke={running&&!pressStop?TL4.orange:TL4.ink} strokeWidth="3" />
        <line x1={x0+300} y1={yTop} x2={x0+360} y2={pressStart?yTop:yTop-20} stroke={pressStart?TL4.orange:TL4.dim} strokeWidth="3" />
        <circle cx={x0+300} cy={yTop} r="4" fill={TL4.ink} /><circle cx={x0+360} cy={yTop} r="4" fill={TL4.ink} />
        <text x={x0+330} y={yTop-26} fill={pressStart?TL4.orangeD:TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">MARCHA (NO)</text>
        <line x1={x0+360} y1={yTop} x2={xc} y2={yTop} stroke={running&&!pressStop?TL4.orange:TL4.ink} strokeWidth="3" />
        {/* coil KM1 */}
        <circle cx={xc+130} cy={yTop} r="34" fill={TL4.paper} stroke={running?TL4.orange:TL4.ink} strokeWidth="3" />
        <text x={xc+130} y={yTop+6} fill={running?TL4.orangeD:TL4.ink} fontFamily="IBM Plex Mono, monospace" fontSize="20" fontWeight="700" textAnchor="middle">KM1</text>
        <line x1={xc} y1={yTop} x2={xc+96} y2={yTop} stroke={running&&!pressStop?TL4.orange:TL4.ink} strokeWidth="3" />
        <line x1={xc+164} y1={yTop} x2={xc+260} y2={yTop} stroke={running?TL4.orange:TL4.ink} strokeWidth="3" />
        {/* seal-in branch: aux NO of KM parallel to START */}
        <line x1={x0+210} y1={yTop} x2={x0+210} y2={yBot} stroke={running?TL4.orange:TL4.ink} strokeWidth="3" />
        <line x1={x0+210} y1={yBot} x2={x0+300} y2={yBot} stroke={running?TL4.orange:TL4.ink} strokeWidth="3" />
        {/* aux contact (closed when running) */}
        <line x1={x0+300} y1={yBot} x2={x0+360} y2={running?yBot:yBot-20} stroke={running?TL4.orange:TL4.dim} strokeWidth="3" />
        <circle cx={x0+300} cy={yBot} r="4" fill={TL4.ink} /><circle cx={x0+360} cy={yBot} r="4" fill={TL4.ink} />
        <text x={x0+330} y={yBot+34} fill={running?TL4.orangeD:TL4.mut} fontFamily="IBM Plex Mono, monospace" fontSize="15" textAnchor="middle">aux. KM1 (sello)</text>
        <line x1={x0+360} y1={yBot} x2={x0+360} y2={yTop} stroke={running?TL4.orange:TL4.ink} strokeWidth="3" />
        {/* flowing dots when running */}
        {running && <circle cx={x0+90+((t*120)%((xc+130)-(x0+90)))} cy={yTop} r="5" fill={TL4.orange} />}
      </svg>
      <div style={{position:'absolute', left:'50%', bottom:'7%', transform:'translateX(-50%)', textAlign:'center'}}>
        <div style={{display:'inline-block', padding:'12px 30px', borderRadius:30, background:running?TL4.orangeWash:'rgba(155,176,198,0.15)', border:`1px solid ${running?TL4.orange:TL4.lineS}`, fontFamily:DISP4, fontSize:26, fontWeight:700, color:running?TL4.orangeD:TL4.mut}}>
          {pressStop?'PARO → se corta el sello':running?'Motor en marcha — sello activo':'En reposo — pulsa MARCHA'}
        </div>
      </div>
    </SceneM4>
  );
}

const SCENES_M4C6 = [
  { C: (p) => <TitleCardM4 {...p} claseNo={6} title="Relés, contactores y arrancadores" dudur="16–18 min" objetivo="Del relé de interfaz al contactor de potencia, y el circuito de mando con sello de marcha." />, dur: 7, label: 'Apertura' },
  { C: S_Relay, dur: 13, label: 'El relé' },
  { C: S_RelayVsContactor, dur: 11, label: 'Relé vs contactor' },
  { C: S_SealIn, dur: 16, label: 'Sello de marcha' },
  { C: (p) => <ClosingM4 {...p} line="El sello de marcha es el circuito de control de todo motor industrial — y el PLC lo recrea en software." activity="Diseña el circuito de potencia y mando de un arranque directo de 15 kW con control, confirmación y falla al PLC." />, dur: 9, label: 'Cierre' },
];
window.SCENES_M4C6 = SCENES_M4C6;
