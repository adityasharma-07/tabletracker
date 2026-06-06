import React from 'react';

const SHAPE_STYLE = {
  long:   { width: 60, height: 32, borderRadius: 8 },
  round:  { width: 40, height: 40, borderRadius: '50%' },
  square: { width: 40, height: 40, borderRadius: 8 },
};

const STATUS_STYLE = {
  ok:   { background: 'var(--ok-bg)',   borderColor: 'var(--ok)',   color: 'var(--ok)' },
  warn: { background: 'var(--warn-bg)', borderColor: 'var(--warn)', color: 'var(--warn)' },
  full: { background: 'var(--full-bg)', borderColor: 'var(--full)', color: 'var(--full)' },
};

export function FloorMap({ tables, onTableClick, filterFn, selectedId }) {
  return (
    <div style={{
      position: 'relative',
      flex: 1,
      background: 'var(--surface-2)',
      borderRadius: 'var(--radius)',
      border: '1.5px solid var(--line)',
      overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent 0 23px, var(--line) 23px 24px),
          repeating-linear-gradient(90deg, transparent 0 23px, var(--line) 23px 24px)
        `,
        opacity: 0.4,
        pointerEvents: 'none',
      }} />

      {/* Room markers */}
      <div style={{ position: 'absolute', top: 8, left: 12, fontSize: 11, color: 'var(--ink-4)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        Windows ↔
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: 'var(--ink-4)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
        <span>▲</span> Entrance
      </div>

      {tables.map((tbl) => {
        const shape = SHAPE_STYLE[tbl.shape] || SHAPE_STYLE.square;
        const st = STATUS_STYLE[tbl.status] || STATUS_STYLE.full;
        const dimmed = filterFn ? !filterFn(tbl) : false;
        const selected = tbl.id === selectedId;

        return (
          <button
            key={tbl.id}
            onClick={() => !dimmed && onTableClick?.(tbl)}
            style={{
              position: 'absolute',
              left: `${tbl.x}%`,
              top: `${tbl.y}%`,
              transform: 'translate(-50%, -50%)',
              ...shape,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${st.borderColor}`,
              background: dimmed ? 'var(--surface-3)' : st.background,
              borderColor: dimmed ? 'var(--line)' : st.borderColor,
              color: dimmed ? 'var(--ink-4)' : st.color,
              fontSize: 11,
              fontWeight: 600,
              cursor: dimmed ? 'default' : 'pointer',
              opacity: dimmed ? 0.35 : 1,
              transition: 'all 0.15s ease',
              boxShadow: selected ? `0 0 0 3px ${st.borderColor}` : 'var(--shadow-sm)',
              outline: 'none',
            }}
          >
            {tbl.id}
          </button>
        );
      })}
    </div>
  );
}

export function FloorMapLegend({ compact }) {
  const items = [
    { status: 'ok',   label: 'Open' },
    { status: 'warn', label: compact ? 'Some' : 'Some seats' },
    { status: 'full', label: 'Full' },
  ];
  const dotColor = { ok: 'var(--ok)', warn: 'var(--warn)', full: 'var(--full)' };
  return (
    <div style={{ display: 'flex', gap: compact ? 10 : 16, alignItems: 'center', flexWrap: 'nowrap' }}>
      {items.map(({ status, label }) => (
        <span key={status} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: compact ? 12 : 13, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>
          <span style={{ width: compact ? 8 : 10, height: compact ? 8 : 10, borderRadius: '50%', background: dotColor[status], flexShrink: 0 }} />
          {label}
        </span>
      ))}
    </div>
  );
}
