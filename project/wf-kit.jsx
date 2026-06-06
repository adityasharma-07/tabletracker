// wf-kit.jsx — low-fi sketchy wireframe primitives for TableTracker.
// Exports components to window so the screens file can use them.
// Visual language: hand-drawn ink outlines (Patrick Hand), Caveat margin
// notes, and ONE meaningful use of color — the green/amber/red seat status.

const INK = '#2b2723';

const stCls = (s) => (s === 'ok' ? 'st-ok' : s === 'warn' ? 'st-warn' : s === 'full' ? 'st-full' : '');
const stWord = (s) => (s === 'ok' ? 'Open' : s === 'warn' ? 'Some seats' : 'Full');

// ── Device frames ────────────────────────────────────────────
function Phone({ children }) {
  return (
    <div className="wf phone">
      <div className="notch" />
      <div className="statusbar">
        <span>9:41</span>
        <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <i className="sig" /><i className="batt" />
        </span>
      </div>
      <div className="screen">{children}</div>
    </div>
  );
}

function Kiosk({ children }) {
  return <div className="wf kiosk">{children}</div>;
}

// ── App bar (phone header) ───────────────────────────────────
function AppBar({ title, sub, back }) {
  return (
    <div className="appbar">
      {back && <span className="back">‹</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="appbar-t">{title}</div>
        {sub && <div className="appbar-s">{sub}</div>}
      </div>
    </div>
  );
}

// ── Buttons ──────────────────────────────────────────────────
function Btn({ children, primary, full, sm, style }) {
  return (
    <div className={'btn' + (primary ? ' primary' : '') + (full ? ' full' : '') + (sm ? ' sm' : '')} style={style}>
      {children}
    </div>
  );
}

// ── Pills / dots / tags ──────────────────────────────────────
function Pill({ st, children, style }) {
  return <span className={'pill ' + stCls(st)} style={style}>{children}</span>;
}
function Dot({ st, big }) {
  return <i className={'dot ' + stCls(st) + (big ? ' big' : '')} />;
}
function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

// ── Crowd / fill meter ───────────────────────────────────────
function Crowd({ pct = 50, st }) {
  return (
    <div className="crowd">
      <i className={stCls(st)} style={{ width: pct + '%' }} />
    </div>
  );
}

// ── Sketchy search box ───────────────────────────────────────
function SearchBox({ placeholder }) {
  return (
    <div className="search sk">
      <i className="mag" />
      <span className="ph">{placeholder}</span>
    </div>
  );
}

// ── Divider ──────────────────────────────────────────────────
function Divider() { return <div className="dash" />; }

// ── Margin annotation (handwritten, toggleable) ──────────────
function Anno({ children, style }) {
  return <div className="anno" style={style}>{children}</div>;
}

// ── A table shape on a floor map (absolutely positioned) ─────
function Tbl({ st, shape = 'round', n, style }) {
  return (
    <div className={'tbl ' + shape + ' ' + stCls(st)} style={style}>
      <span>{n}</span>
    </div>
  );
}

// ── Legend ───────────────────────────────────────────────────
function Legend({ compact }) {
  const some = compact ? 'Some' : 'Some seats';
  return (
    <div className={'legend' + (compact ? ' compact' : '')}>
      <span className="leg"><Dot st="ok" /> Open</span>
      <span className="leg"><Dot st="warn" /> {some}</span>
      <span className="leg"><Dot st="full" /> Full</span>
    </div>
  );
}

Object.assign(window, {
  WF_INK: INK, stCls, stWord,
  Phone, Kiosk, AppBar, Btn, Pill, Dot, Tag, Crowd, SearchBox, Divider, Anno, Tbl, Legend,
});
