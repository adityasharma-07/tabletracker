// mobile-screens.jsx — TableTracker phone wireframes.
// Each screen has multiple distinct directions. Exports to window.

// Shared sample floor layout (table id, status, shape, x%, y%)
const FLOOR = [
  ['1','full','long',8,8],['2','full','long',26,8],['3','ok','long',44,8],['4','warn','long',62,8],['5','ok','long',80,8],
  ['6','full','round',10,30],['7','full','round',26,30],['8','warn','round',42,30],['9','ok','round',58,30],['10','ok','round',74,30],['11','ok','round',88,30],
  ['12','full','square',10,52],['13','warn','square',26,52],['14','full','square',42,52],['15','ok','square',58,52],['16','ok','square',74,52],['17','ok','square',88,52],
  ['18','warn','round',12,74],['19','ok','round',30,74],['20','full','round',48,74],['21','ok','round',66,74],['22','ok','round',84,74],
];

function FloorMap({ data = FLOOR, highlight }) {
  return (
    <div className="maparea">
      {/* entrance marker */}
      <div style={{ position:'absolute', bottom:4, left:'50%', transform:'translateX(-50%)', fontSize:12, color:'var(--ink-soft)' }}>▲ entrance</div>
      <div style={{ position:'absolute', top:6, left:10, fontSize:12, color:'var(--ink-soft)' }}>windows ▢▢▢</div>
      {data.map(([n, st, shape, x, y]) => {
        const dim = highlight && st !== 'ok';
        return (
          <div key={n} className={'tbl ' + shape + ' ' + window.stCls(st)}
            style={{ left: x + '%', top: y + '%', opacity: dim ? 0.32 : 1,
                     boxShadow: highlight && st==='ok' ? '0 0 0 3px rgba(79,157,105,0.35)' : 'none' }}>
            <span>{n}</span>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// HALL PICKER — Direction A: scannable card list w/ crowd meters
// ============================================================
function HallList() {
  const halls = [
    ['Yahentamitsi', 'North Campus', 38, 'warn', '38% full'],
    ['251 North', 'North Campus', 86, 'full', 'Packed'],
    ['South Campus Dining', 'South Campus', 22, 'ok', 'Open'],
    ['The Stamp Food Court', 'Student Union', 61, 'warn', 'Busy'],
  ];
  return (
    <Phone>
      <AppBar title="Where to eat?" sub="Live seating · updated 4s ago" />
      <SearchBox placeholder="Search dining halls" />
      <div className="scrollcol" style={{ padding: '2px 12px', gap: 10, overflow: 'visible' }}>
        {halls.map(([name, area, pct, st, label]) => (
          <div key={name} className="card" style={{ marginBottom: 10, display:'flex', flexDirection:'column', gap:7 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:18, lineHeight:1.1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{name}</div>
                <div style={{ fontSize:13, color:'var(--ink-soft)' }}>{area} · 4 min walk</div>
              </div>
              <Pill st={st} style={{ flex:'none' }}>{label}</Pill>
            </div>
            <Crowd pct={pct} st={st} />
            <div style={{ fontSize:13, color:'var(--ink-soft)' }}>{Math.round((100-pct)/9)} open tables right now</div>
          </div>
        ))}
      </div>
      <Anno style={{ top: 150, right: -120, width: 110 }}>crowd bar = how full at a glance</Anno>
    </Phone>
  );
}

// ============================================================
// HALL PICKER — Direction B: campus map w/ status pins
// ============================================================
function HallMap() {
  const pins = [
    ['Yahentamitsi','warn',30,26],['251 North','full',58,20],
    ['South Dining','ok',40,70],['Stamp','warn',72,54],
  ];
  return (
    <Phone>
      <AppBar title="Campus" sub="Tap a hall to see seats" />
      <div className="maparea" style={{ margin: 10 }}>
        <div style={{ position:'absolute', inset:0, padding:10, fontSize:12, color:'var(--ink-soft)' }}>campus map placeholder</div>
        {/* a couple of 'paths' */}
        <div style={{ position:'absolute', left:'30%', top:'28%', width:'42%', height:2, background:'var(--line)' }} />
        <div style={{ position:'absolute', left:'40%', top:'30%', width:2, height:'40%', background:'var(--line)' }} />
        {pins.map(([name, st, x, y]) => (
          <div key={name} style={{ position:'absolute', left:x+'%', top:y+'%', transform:'translate(-50%,-100%)', textAlign:'center' }}>
            <Dot st={st} big />
            <div style={{ fontSize:12, marginTop:2, maxWidth:80, lineHeight:1 }}>{name}</div>
          </div>
        ))}
      </div>
      <Legend />
      <div style={{ padding: '0 12px 12px' }}>
        <div className="card" style={{ display:'flex', alignItems:'center', gap:10 }}>
          <Dot st="ok" big />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:16 }}>Closest with seats</div>
            <div style={{ fontSize:13, color:'var(--ink-soft)' }}>South Dining · 6 open · 5 min</div>
          </div>
          <Btn sm>Go</Btn>
        </div>
      </div>
      <Anno style={{ top: 70, left: -96, width: 86 }}>pin color = hall status</Anno>
    </Phone>
  );
}

// ============================================================
// FLOOR MAP — Direction A: pure map, tap a table
// ============================================================
function MapPure() {
  return (
    <Phone>
      <AppBar back title="Yahentamitsi" sub="Level 1 · 9 tables open" />
      <Legend compact />
      <FloorMap />
      <div style={{ padding:'4px 12px 12px', display:'flex', gap:8 }}>
        <Btn primary full>Find me a seat ✦</Btn>
        <Btn sm>↻</Btn>
      </div>
      <Anno style={{ top: 250, right: -118, width: 110 }}>tap any green table for details</Anno>
    </Phone>
  );
}

// ============================================================
// FLOOR MAP — Direction B: map + bottom sheet ranked list
// ============================================================
function MapSheet() {
  const open = [
    ['Table 15','square','2 min · center','4 seats','ok'],
    ['Table 19','round','near entrance','6 seats','ok'],
    ['Table 5','long','by windows','8 seats','ok'],
  ];
  return (
    <Phone>
      <AppBar back title="Yahentamitsi" sub="Level 1" />
      <div style={{ flex:'0 0 200px', display:'flex', flexDirection:'column' }}>
        <FloorMap />
      </div>
      <div style={{ borderTop:'2px solid var(--ink)', borderRadius:'16px 16px 0 0', marginTop:-10, background:'var(--paper)', flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ width:42, height:4, background:'var(--line)', borderRadius:9, margin:'7px auto 3px' }} />
        <div className="seclabel" style={{ marginBottom:4 }}>Nearest open · 9 total</div>
        <div style={{ overflow:'hidden' }}>
          {open.map(([t, shape, where, seats, st]) => (
            <div key={t} className="row">
              <Dot st={st} big />
              <div className="grow">
                <div className="ttl">{t}</div>
                <div className="meta">{where} · {seats}</div>
              </div>
              <Btn sm>View</Btn>
            </div>
          ))}
        </div>
      </div>
      <Anno style={{ top: 120, left: -104, width: 92 }}>map + list, best of both</Anno>
    </Phone>
  );
}

// ============================================================
// FLOOR MAP — Direction C: filter chips highlight matches
// ============================================================
function MapFilter() {
  return (
    <Phone>
      <AppBar back title="Yahentamitsi" sub="Showing seats for 4+" />
      <div style={{ display:'flex', gap:7, padding:'2px 12px 6px' }}>
        <Btn sm primary>Group 4+</Btn>
        <Btn sm>Windows</Btn>
        <Btn sm>♿ Step-free</Btn>
      </div>
      <FloorMap highlight />
      <div style={{ padding:'2px 12px 12px', fontSize:13, color:'var(--ink-soft)', textAlign:'center' }}>
        3 tables fit a group of 4+ · others dimmed
      </div>
      <Anno style={{ top: 200, right: -116, width: 108 }}>filters dim what doesn't match</Anno>
    </Phone>
  );
}

// ============================================================
// TABLE DETAIL — Direction A: detail card + actions
// ============================================================
function DetailCard() {
  return (
    <Phone>
      <AppBar back title="Table 15" sub="Center section" />
      <div style={{ padding:'4px 14px', display:'flex', flexDirection:'column', gap:12 }}>
        <div className="card" style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div className="tbl square st-ok" style={{ position:'static', width:54, height:54, fontSize:16 }}><span>15</span></div>
          <div style={{ flex:1 }}>
            <Pill st="ok">Open now</Pill>
            <div style={{ fontSize:15, marginTop:6 }}>4 seats free of 4</div>
            <div style={{ fontSize:13, color:'var(--ink-soft)' }}>Open for 3 min</div>
          </div>
        </div>
        <div>
          <div className="seclabel" style={{ padding:0, marginBottom:6 }}>Details</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:15 }}>
            {[['Seats','4 · square'],['Walk from entrance','~30 sec'],['Near','drinks station'],['Step-free access','yes']].map(([k,v])=>(
              <div key={k} style={{ display:'flex', gap:10, alignItems:'baseline' }}>
                <span style={{ flex:1, minWidth:0, color:'var(--ink-soft)' }}>{k}</span>
                <span style={{ flex:'none', whiteSpace:'nowrap' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        <Btn primary full>Hold for 5 min</Btn>
        <Btn full>Notify me if it fills</Btn>
      </div>
      <Anno style={{ top: 300, right: -110, width: 100 }}>V2: hold a seat while you walk over</Anno>
    </Phone>
  );
}

// ============================================================
// TABLE DETAIL — Direction B: mini-map context + alert
// ============================================================
function DetailMap() {
  const mini = [['15','ok','square',58,52],['14','full','square',42,52],['16','ok','square',74,52],['9','ok','round',58,30],['21','ok','round',66,74]];
  return (
    <Phone>
      <AppBar back title="Table 19" sub="Near entrance" />
      <div style={{ flex:'0 0 170px', display:'flex' }}>
        <FloorMap data={mini.map(d=> d[0]==='19'?d:d)} highlight />
      </div>
      <div style={{ padding:'6px 14px', display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div className="tbl round st-ok" style={{ position:'static', width:48, height:48 }}><span>19</span></div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:17 }}>6 seats · round</div>
            <div style={{ fontSize:13, color:'var(--ink-soft)' }}>Open 1 min · fills fast at noon</div>
          </div>
          <Pill st="ok">Open</Pill>
        </div>
        <div className="card" style={{ display:'flex', alignItems:'center', gap:8, fontSize:14 }}>
          <span style={{ fontSize:18 }}>⚠︎</span>
          <span>Busy area — grab it soon. We'll ping you if a quieter table opens.</span>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <Btn primary style={{ flex:1 }}>Route here</Btn>
          <Btn style={{ flex:1 }}>Set alert</Btn>
        </div>
      </div>
      <Anno style={{ top: 60, left: -98, width: 88 }}>see the table in context</Anno>
    </Phone>
  );
}

Object.assign(window, {
  FLOOR, FloorMap,
  HallList, HallMap, MapPure, MapSheet, MapFilter, DetailCard, DetailMap,
});
