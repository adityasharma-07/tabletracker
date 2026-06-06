import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DINING_HALLS } from '../data/mockData.js';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { CrowdBar } from '../components/CrowdBar.jsx';
import { AppHeader, BottomNav, MobileView } from '../components/MobileShell.jsx';

function UpdateTag({ secs = 4 }) {
  return (
    <span style={{ fontSize: 11, color: 'var(--ink-4)', display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)', display: 'inline-block' }} />
      Updated {secs}s ago
    </span>
  );
}

function HallCard({ hall, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '14px 16px',
        background: 'var(--surface)',
        border: '1.5px solid var(--line)',
        borderRadius: 'var(--radius)',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: 'var(--shadow-sm)',
        width: '100%',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.2, marginBottom: 2 }}>{hall.name}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{hall.area} · {hall.walkMin} min walk · {hall.hours}</div>
        </div>
        <StatusBadge status={hall.status} />
      </div>
      <CrowdBar pct={hall.pct} status={hall.status} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)' }}>
        <span>
          <strong style={{ color: hall.status === 'ok' ? 'var(--ok)' : hall.status === 'warn' ? 'var(--warn)' : 'var(--full)', fontWeight: 600 }}>
            {hall.openTables}
          </strong> open tables of {hall.totalTables}
        </span>
        <span style={{ color: 'var(--ink-4)' }}>{hall.pct}% full</span>
      </div>
    </button>
  );
}

export default function HallPicker() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = DINING_HALLS.filter((h) =>
    h.name.toLowerCase().includes(query.toLowerCase()) ||
    h.area.toLowerCase().includes(query.toLowerCase())
  );

  const openHalls = DINING_HALLS.filter((h) => h.status === 'ok');
  const bestHall = openHalls.sort((a, b) => a.walkMin - b.walkMin)[0];

  return (
    <MobileView>
      <AppHeader
        title="Where to eat?"
        subtitle={<UpdateTag />}
        right={
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>Live</span>
          </div>
        }
      />

      {/* Search */}
      <div style={{ padding: '12px 16px 8px', borderBottom: '1px solid var(--line)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--surface-2)',
          border: '1.5px solid var(--line)',
          borderRadius: 'var(--radius-sm)',
          padding: '8px 12px',
        }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="var(--ink-3)" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="6.5" cy="6.5" r="4.5" /><path d="m10.5 10.5 3 3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dining halls…"
            style={{
              flex: 1, border: 'none', background: 'none', outline: 'none',
              fontSize: 15, color: 'var(--ink)', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Best option banner */}
      {bestHall && !query && (
        <div
          onClick={() => navigate(`/map/${bestHall.id}`)}
          style={{
            margin: '12px 16px 0',
            padding: '10px 14px',
            background: 'var(--ok-bg)',
            border: '1.5px solid var(--ok-border)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex', alignItems: 'center', gap: 10,
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 18 }}>✦</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ok)' }}>Closest with seats</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{bestHall.name} · {bestHall.openTables} open · {bestHall.walkMin} min walk</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--ok)" strokeWidth="2" strokeLinecap="round">
            <path d="M3 7h8M8 4l3 3-3 3" />
          </svg>
        </div>
      )}

      {/* Hall list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--ink-3)', fontSize: 14, paddingTop: 40 }}>No results for "{query}"</div>
        ) : (
          filtered.map((hall) => (
            <HallCard key={hall.id} hall={hall} onClick={() => navigate(`/map/${hall.id}`)} />
          ))
        )}
      </div>

      <BottomNav />
    </MobileView>
  );
}
