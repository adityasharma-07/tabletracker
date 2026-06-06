import React from 'react';

const CONFIG = {
  ok:   { label: 'Open',       color: 'var(--ok)',   bg: 'var(--ok-bg)',   border: 'var(--ok-border)' },
  warn: { label: 'Some seats', color: 'var(--warn)', bg: 'var(--warn-bg)', border: 'var(--warn-border)' },
  full: { label: 'Full',       color: 'var(--full)', bg: 'var(--full-bg)', border: 'var(--full-border)' },
};

export function StatusDot({ status, size = 10 }) {
  const c = CONFIG[status] || CONFIG.full;
  return (
    <span style={{
      display: 'inline-block',
      width: size, height: size,
      borderRadius: '50%',
      background: c.color,
      flexShrink: 0,
    }} />
  );
}

export function StatusBadge({ status, label, style }) {
  const c = CONFIG[status] || CONFIG.full;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '3px 10px',
      fontSize: 13,
      fontWeight: 600,
      borderRadius: 999,
      background: c.bg,
      color: c.color,
      border: `1.5px solid ${c.border}`,
      whiteSpace: 'nowrap',
      ...style,
    }}>
      <StatusDot status={status} size={7} />
      {label ?? c.label}
    </span>
  );
}
