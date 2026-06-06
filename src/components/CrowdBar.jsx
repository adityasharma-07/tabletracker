import React from 'react';

export function CrowdBar({ pct, status }) {
  const color = status === 'ok' ? 'var(--ok)' : status === 'warn' ? 'var(--warn)' : 'var(--full)';
  return (
    <div style={{
      width: '100%', height: 6,
      borderRadius: 999,
      background: 'var(--surface-3)',
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${pct}%`,
        height: '100%',
        background: color,
        borderRadius: 999,
        transition: 'width 0.6s ease',
      }} />
    </div>
  );
}
