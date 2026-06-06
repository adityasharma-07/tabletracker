// kiosk-screens.jsx — TableTracker entrance-board wireframes (large display).
// Designed to be read from a few feet away while walking in.

const KFLOOR = [
  ['1','full','long',6,10],['2','full','long',22,10],['3','ok','long',38,10],['4','warn','long',54,10],['5','ok','long',70,10],['6','ok','long',86,10],
  ['7','full','round',8,34],['8','full','round',22,34],['9','warn','round',36,34],['10','ok','round',50,34],['11','ok','round',64,34],['12','ok','round',78,34],['13','ok','round',90,34],
  ['14','full','square',8,58],['15','warn','square',22,58],['16','full','square',36,58],['17','ok','square',50,58],['18','ok','square',64,58],['19','ok','square',78,58],['20','ok','square',90,58],
  ['21','warn','round',12,80],['22','ok','round',28,80],['23','full','round',44,80],['24','ok','round',60,80],['25','ok','round',76,80],['26','ok','round',90,80],
];

function KFloorMap({ data = KFLOOR, big }) {
  return (
    <div className="maparea" style={{ margin: 0 }}>
      <div style={{ position:'absolute', bottom:6, left:'50%', transform:'translateX(-50%)', fontSize:15, color:'var(--ink-soft)' }}>▲ you are here</div>
      <div style={{ position:'absolute', top:8, left:12, fontSize:14, color:'var(--ink-soft)' }}>windows ▢▢▢▢</div>
      {data.map(([n, st, shape, x, y]) => (
        <div key={n} className={'tbl ' + shape + ' ' + window.stCls(st)}
          style={{ left:(x*0.9+3)+'%', top:(y*0.92+2)+'%', width: big?54:46, height: big?54:46, fontSize: big?17:14,
                   borderWidth: 2.5 }}>
          <span>{n}</span>
        </div>
      ))}
    </div>
  );
}

function KStat({ n, label, st }) {
  return (
    <div className="card" style={{ flex:1, textAlign:'center', padding:'12px 6px', display:'flex', flexDirection:'column', gap:2 }}>
      <div style={{ fontSize:44, lineHeight:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
        <Dot st={st} big /> {n}
      </div>
      <div style={{ fontSize:15, color:'var(--ink-soft)' }}>{label}</div>
    </div>
  );
}

// ============================================================
// KIOSK — Direction A: big board, map dominant + summary strip
// ============================================================
function KioskBoard() {
  return (
    <Kiosk>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'16px 22px 6px' }}>
        <div style={{ minWidth:0 }}>
          <div style={{ fontSize:32, lineHeight:1, whiteSpace:'nowrap' }}>Yahentamitsi Dining</div>
          <div style={{ fontSize:16, color:'var(--ink-soft)', whiteSpace:'nowrap' }}>Live seating · updated 4s ago</div>
        </div>
        <Pill st="warn" style={{ fontSize:18, padding:'4px 16px', flex:'none' }}>38% full</Pill>
      </div>
      <div style={{ display:'flex', gap:10, padding:'8px 22px 4px' }}>
        <KStat n="12" label="tables open" st="ok" />
        <KStat n="5" label="some seats" st="warn" />
        <KStat n="9" label="full" st="full" />
      </div>
      <div style={{ flex:1, margin:'10px 22px', display:'flex' }}>
        <KFloorMap big />
      </div>
      <div style={{ display:'flex', justifyContent:'center', padding:'0 0 14px' }}>
        <Legend />
      </div>
      <Anno style={{ top: 120, right: -118, width: 110 }}>read it from the doorway</Anno>
    </Kiosk>
  );
}

// ============================================================
// KIOSK — Direction B: zone-counts board (glanceable from far)
// ============================================================
function KioskZones() {
  const zones = [
    ['Windows', 5, 'ok', 'left side'],
    ['Center', 4, 'ok', 'middle'],
    ['Entrance', 1, 'warn', 'by doors'],
    ['Back room', 2, 'warn', 'past the bar'],
  ];
  return (
    <Kiosk>
      <div style={{ padding:'18px 24px 8px' }}>
        <div style={{ fontSize:32 }}>Find a seat — Yahentamitsi</div>
        <div style={{ fontSize:17, color:'var(--ink-soft)' }}>Open tables by area · right now</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:12, padding:'4px 24px' }}>
        {zones.map(([z, n, st, where]) => (
          <div key={z} className="card" style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 18px' }}>
            <div style={{ fontSize:52, lineHeight:1, width:70, textAlign:'center' }}>{n}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:24 }}>{z}</div>
              <div style={{ fontSize:16, color:'var(--ink-soft)' }}>{where}</div>
            </div>
            <Pill st={st} style={{ fontSize:18, padding:'5px 16px' }}>{st==='ok'?'plenty':'a few'}</Pill>
          </div>
        ))}
      </div>
      <div style={{ flex:1, margin:'12px 24px', display:'flex', minHeight:0 }}>
        <KFloorMap />
      </div>
      <Anno style={{ top: 180, left: -110, width: 100 }}>big numbers win from a distance</Anno>
    </Kiosk>
  );
}

Object.assign(window, { KFLOOR, KFloorMap, KStat, KioskBoard, KioskZones });
