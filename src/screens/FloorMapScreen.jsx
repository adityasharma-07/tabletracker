import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DINING_HALLS, FLOOR_TABLES } from '../data/mockData.js';
import { FloorMap, FloorMapLegend } from '../components/FloorMap.jsx';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { AppHeader, BottomNav, MobileView } from '../components/MobileShell.jsx';

const FILTERS = [
  { key: 'all',     label: 'All tables',   fn: () => true },
  { key: 'open',    label: 'Open',         fn: (t) => t.status === 'ok' },
  { key: '4plus',   label: 'Seats 4+',     fn: (t) => t.seats >= 4 },
  { key: '6plus',   label: 'Seats 6+',     fn: (t) => t.seats >= 6 },
];

function NearestList({ tables, onSelect }) {
  const open = tables.filter((t) => t.status === 'ok').slice(0, 4);
  if (!open.length) return null;
  const shapeLabel = { round: 'Round', square: 'Square', long: 'Long' };
  return (
    <div style={{
      borderTop: '1px solid var(--line)',
      background: 'var(--surface)',
      flexShrink: 0,
    }}>
      <div style={{
        padding: '8px 16px 4px',
        fontSize: 11, fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: 'var(--ink-3)',
      }}>
        Nearest open · {tables.filter((t) => t.status === 'ok').length} total
      </div>
      {open.map((tbl) => (
        <button
          key={tbl.id}
          onClick={() => onSelect(tbl)}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 16px',
            borderTop: '1px solid var(--line)',
            background: 'none', border: 'none', width: '100%', textAlign: 'left',
            cursor: 'pointer',
            transition: 'background 0.1s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
        >
          <span style={{
            width: 10, height: 10, borderRadius: '50%',
            background: 'var(--ok)', flexShrink: 0,
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{tbl.label}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
              {shapeLabel[tbl.shape]} · {tbl.seats} seats
            </div>
          </div>
          <span style={{
            fontSize: 12, color: 'var(--ok)', fontWeight: 600,
            padding: '3px 8px', background: 'var(--ok-bg)',
            borderRadius: 999, border: '1px solid var(--ok-border)',
          }}>View →</span>
        </button>
      ))}
    </div>
  );
}

export default function FloorMapScreen() {
  const { hallId } = useParams();
  const navigate = useNavigate();
  const hall = DINING_HALLS.find((h) => h.id === hallId) || DINING_HALLS[0];
  const [activeFilter, setActiveFilter] = useState('all');
  const [showList, setShowList] = useState(true);

  const currentFilter = FILTERS.find((f) => f.key === activeFilter) || FILTERS[0];
  const filterFn = activeFilter === 'all' ? null : currentFilter.fn;

  const openCount = FLOOR_TABLES.filter((t) => t.status === 'ok').length;
  const matchCount = FLOOR_TABLES.filter(currentFilter.fn).length;

  return (
    <MobileView>
      <AppHeader
        onBack
        title={hall.name}
        subtitle={`Level 1 · ${openCount} open tables`}
        right={<StatusBadge status={hall.status} />}
      />

      {/* Filter chips */}
      <div style={{
        display: 'flex', gap: 6, padding: '10px 16px 10px',
        overflowX: 'auto', flexShrink: 0,
        borderBottom: '1px solid var(--line)',
      }}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            style={{
              padding: '5px 12px',
              borderRadius: 999,
              border: `1.5px solid ${activeFilter === f.key ? 'var(--ok)' : 'var(--line)'}`,
              background: activeFilter === f.key ? 'var(--ok-bg)' : 'var(--surface)',
              color: activeFilter === f.key ? 'var(--ok)' : 'var(--ink-2)',
              fontSize: 13, fontWeight: activeFilter === f.key ? 600 : 400,
              whiteSpace: 'nowrap', cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Map */}
      <div style={{ flex: showList ? '0 0 220px' : 1, padding: '10px 14px', display: 'flex', minHeight: 0 }}>
        <FloorMap
          tables={FLOOR_TABLES}
          filterFn={filterFn}
          onTableClick={(tbl) => navigate(`/table/${tbl.id}?from=${hallId}`)}
        />
      </div>

      {/* Legend + info row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '4px 14px 6px', flexShrink: 0,
      }}>
        <FloorMapLegend compact />
        {activeFilter !== 'all' && (
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>
            {matchCount} match{matchCount !== 1 ? 'es' : ''}
          </span>
        )}
        <button
          onClick={() => setShowList((v) => !v)}
          style={{
            fontSize: 12, color: 'var(--ok)', fontWeight: 600,
            padding: '3px 8px', background: 'var(--ok-bg)',
            borderRadius: 999, border: '1px solid var(--ok-border)',
          }}
        >
          {showList ? 'Hide list' : 'Show list'}
        </button>
      </div>

      {/* Quick action */}
      {!showList && (
        <div style={{ padding: '0 14px 12px', flexShrink: 0 }}>
          <button
            onClick={() => {
              const best = FLOOR_TABLES.find((t) => t.status === 'ok');
              if (best) navigate(`/table/${best.id}?from=${hallId}`);
            }}
            style={{
              width: '100%', padding: '12px',
              background: 'var(--ok)', color: '#fff',
              border: 'none', borderRadius: 'var(--radius-sm)',
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            ✦ Find me a seat
          </button>
        </div>
      )}

      {/* Nearest open list */}
      {showList && (
        <NearestList
          tables={FLOOR_TABLES}
          onSelect={(tbl) => navigate(`/table/${tbl.id}?from=${hallId}`)}
        />
      )}

      <BottomNav />
    </MobileView>
  );
}
