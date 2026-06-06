import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NavTab({ icon, label, path }) {
  const loc = useLocation();
  const nav = useNavigate();
  const active = loc.pathname.startsWith(path);
  return (
    <button
      onClick={() => nav(path)}
      style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        padding: '8px 4px 10px',
        color: active ? 'var(--ok)' : 'var(--ink-3)',
        fontSize: 11, fontWeight: active ? 600 : 500,
        transition: 'color 0.15s',
        background: 'none', border: 'none', cursor: 'pointer',
      }}
    >
      <span style={{ fontSize: 20, lineHeight: 1 }}>{icon}</span>
      {label}
    </button>
  );
}

export function BottomNav() {
  return (
    <nav style={{
      display: 'flex',
      borderTop: '1px solid var(--line)',
      background: 'var(--surface)',
      boxShadow: '0 -1px 0 var(--line)',
      flexShrink: 0,
    }}>
      <NavTab icon="🏠" label="Halls" path="/halls" />
      <NavTab icon="🗺️" label="Map" path="/map" />
      <NavTab icon="🔔" label="Alerts" path="/alerts" />
    </nav>
  );
}

export function AppHeader({ title, subtitle, onBack, right }) {
  const nav = useNavigate();
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 16px 12px',
      borderBottom: '1px solid var(--line)',
      background: 'var(--surface)',
      flexShrink: 0,
    }}>
      {onBack && (
        <button
          onClick={() => nav(-1)}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--surface-2)', border: '1px solid var(--line)',
            fontSize: 18, color: 'var(--ink-2)', flexShrink: 0,
          }}
        >‹</button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{subtitle}</div>
        )}
      </div>
      {right}
    </header>
  );
}

export function MobileView({ children }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--surface)',
      overflow: 'hidden',
    }}>
      {children}
    </div>
  );
}
