import React, { useState, useEffect } from 'react';
import { FLOOR_TABLES, KIOSK_ZONES } from '../data/mockData.js';
import { StatusBadge } from '../components/StatusBadge.jsx';

const KIOSK_TABLES = [
  { id: '1',  status: 'full', shape: 'long',   seats: 8, x: 6,  y: 10, label: 'Table 1' },
  { id: '2',  status: 'full', shape: 'long',   seats: 8, x: 22, y: 10, label: 'Table 2' },
  { id: '3',  status: 'ok',   shape: 'long',   seats: 8, x: 38, y: 10, label: 'Table 3' },
  { id: '4',  status: 'warn', shape: 'long',   seats: 8, x: 54, y: 10, label: 'Table 4' },
  { id: '5',  status: 'ok',   shape: 'long',   seats: 8, x: 70, y: 10, label: 'Table 5' },
  { id: '6',  status: 'ok',   shape: 'long',   seats: 8, x: 86, y: 10, label: 'Table 6' },
  { id: '7',  status: 'full', shape: 'round',  seats: 4, x: 8,  y: 30, label: 'Table 7' },
  { id: '8',  status: 'full', shape: 'round',  seats: 4, x: 22, y: 30, label: 'Table 8' },
  { id: '9',  status: 'warn', shape: 'round',  seats: 4, x: 36, y: 30, label: 'Table 9' },
  { id: '10', status: 'ok',   shape: 'round',  seats: 4, x: 50, y: 30, label: 'Table 10' },
  { id: '11', status: 'ok',   shape: 'round',  seats: 4, x: 64, y: 30, label: 'Table 11' },
  { id: '12', status: 'ok',   shape: 'round',  seats: 4, x: 78, y: 30, label: 'Table 12' },
  { id: '13', status: 'ok',   shape: 'round',  seats: 4, x: 90, y: 30, label: 'Table 13' },
  { id: '14', status: 'full', shape: 'square', seats: 4, x: 8,  y: 55, label: 'Table 14' },
  { id: '15', status: 'warn', shape: 'square', seats: 4, x: 22, y: 55, label: 'Table 15' },
  { id: '16', status: 'full', shape: 'square', seats: 4, x: 36, y: 55, label: 'Table 16' },
  { id: '17', status: 'ok',   shape: 'square', seats: 4, x: 50, y: 55, label: 'Table 17' },
  { id: '18', status: 'ok',   shape: 'square', seats: 4, x: 64, y: 55, label: 'Table 18' },
  { id: '19', status: 'ok',   shape: 'square', seats: 4, x: 78, y: 55, label: 'Table 19' },
  { id: '20', status: 'ok',   shape: 'square', seats: 4, x: 90, y: 55, label: 'Table 20' },
  { id: '21', status: 'warn', shape: 'round',  seats: 6, x: 12, y: 78, label: 'Table 21' },
  { id: '22', status: 'ok',   shape: 'round',  seats: 6, x: 28, y: 78, label: 'Table 22' },
  { id: '23', status: 'full', shape: 'round',  seats: 6, x: 44, y: 78, label: 'Table 23' },
  { id: '24', status: 'ok',   shape: 'round',  seats: 6, x: 60, y: 78, label: 'Table 24' },
  { id: '25', status: 'ok',   shape: 'round',  seats: 6, x: 76, y: 78, label: 'Table 25' },
  { id: '26', status: 'ok',   shape: 'round',  seats: 6, x: 90, y: 78, label: 'Table 26' },
];

const ST = {
  ok:   { bg: 'var(--ok-bg)',   border: 'var(--ok-border)',   color: 'var(--ok)' },
  warn: { bg: 'var(--warn-bg)', border: 'var(--warn-border)', color: 'var(--warn)' },
  full: { bg: 'var(--full-bg)', border: 'var(--full-border)', color: 'var(--full)' },
};

const SHAPE_DIM = {
  long:   { width: 72, height: 36, borderRadius: 8 },
  round:  { width: 52, height: 52, borderRadius: '50%' },
  square: { width: 52, height: 52, borderRadius: 10 },
};

function KioskMap({ tables }) {
  return (
    <div style={{
      position: 'relative', flex: 1,
      background: 'var(--surface-2)',
      borderRadius: 'var(--radius)',
      border: '1.5px solid var(--line)',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent 0 23px, var(--line) 23px 24px),
          repeating-linear-gradient(90deg, transparent 0 23px, var(--line) 23px 24px)
        `,
        opacity: 0.4, pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', top: 10, left: 16, fontSize: 13, color: 'var(--ink-4)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        Windows ↔
      </div>
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', fontSize: 13, color: 'var(--ink-4)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
        ▲ You are here
      </div>
      {tables.map((tbl) => {
        const dim = SHAPE_DIM[tbl.shape] || SHAPE_DIM.square;
        const st = ST[tbl.status] || ST.full;
        return (
          <div key={tbl.id} style={{
            position: 'absolute',
            left: `${tbl.x * 0.9 + 3}%`,
            top: `${tbl.y * 0.92 + 2}%`,
            transform: 'translate(-50%, -50%)',
            ...dim,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `2.5px solid ${st.border}`,
            background: st.bg, color: st.color,
            fontSize: 13, fontWeight: 700,
          }}>
            {tbl.id}
          </div>
        );
      })}
    </div>
  );
}

function StatCard({ n, label, status }) {
  const st = ST[status] || ST.full;
  return (
    <div style={{
      flex: 1, textAlign: 'center',
      padding: '16px 8px',
      background: st.bg,
      border: `1.5px solid ${st.border}`,
      borderRadius: 'var(--radius-sm)',
    }}>
      <div style={{ fontSize: 48, fontWeight: 800, color: st.color, lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

function Legend() {
  const items = [
    { status: 'ok',   label: 'Open',        color: 'var(--ok)' },
    { status: 'warn', label: 'Some seats',  color: 'var(--warn)' },
    { status: 'full', label: 'Full',        color: 'var(--full)' },
  ];
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
      {items.map(({ status, label, color }) => (
        <span key={status} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, color: 'var(--ink-2)' }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: color }} />
          {label}
        </span>
      ))}
    </div>
  );
}

function MapBoard({ tables }) {
  const open = tables.filter((t) => t.status === 'ok').length;
  const some = tables.filter((t) => t.status === 'warn').length;
  const full = tables.filter((t) => t.status === 'full').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 24, gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1, letterSpacing: -0.5 }}>Yahentamitsi Dining</div>
          <div style={{ fontSize: 15, color: 'var(--ink-3)', marginTop: 4 }}>Live seating · updated 4s ago</div>
        </div>
        <StatusBadge status="warn" label="38% full" style={{ fontSize: 16, padding: '5px 16px' }} />
      </div>

      {/* Summary stats */}
      <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
        <StatCard n={open} label="tables open" status="ok" />
        <StatCard n={some} label="some seats" status="warn" />
        <StatCard n={full} label="full" status="full" />
      </div>

      {/* Map */}
      <KioskMap tables={tables} />

      {/* Legend */}
      <div style={{ flexShrink: 0 }}>
        <Legend />
      </div>
    </div>
  );
}

function ZoneBoard({ tables }) {
  const open = tables.filter((t) => t.status === 'ok').length;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 24, gap: 16 }}>
      {/* Header */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1, letterSpacing: -0.5 }}>Find a seat — Yahentamitsi</div>
        <div style={{ fontSize: 16, color: 'var(--ink-3)', marginTop: 6 }}>Open tables by area · right now</div>
      </div>

      {/* Zone cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
        {KIOSK_ZONES.map((zone) => {
          const st = ST[zone.status] || ST.full;
          return (
            <div key={zone.name} style={{
              display: 'flex', alignItems: 'center', gap: 18,
              padding: '18px 20px',
              background: st.bg,
              border: `1.5px solid ${st.border}`,
              borderRadius: 'var(--radius)',
            }}>
              <div style={{ fontSize: 56, fontWeight: 900, color: st.color, lineHeight: 1, width: 72, textAlign: 'center' }}>
                {zone.openTables}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)' }}>{zone.name}</div>
                <div style={{ fontSize: 15, color: 'var(--ink-3)', marginTop: 2 }}>{zone.where}</div>
              </div>
              <StatusBadge status={zone.status} label={zone.status === 'ok' ? 'Plenty of room' : 'A few left'} style={{ fontSize: 15, padding: '5px 14px' }} />
            </div>
          );
        })}
      </div>

      {/* Mini map */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <KioskMap tables={tables} />
      </div>
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
}

const VIEWS = [
  { key: 'map',   label: 'Map board' },
  { key: 'zones', label: 'Zone counts' },
];

export default function KioskBoard() {
  const [view, setView] = useState('map');

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: 'var(--surface)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Kiosk top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 24px',
        background: 'var(--ink)', color: '#fff',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>TableTracker</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>· Yahentamitsi Dining Hall</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* View toggle */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: 3, gap: 3 }}>
            {VIEWS.map((v) => (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                style={{
                  padding: '5px 14px', borderRadius: 6,
                  background: view === v.key ? '#fff' : 'transparent',
                  color: view === v.key ? 'var(--ink)' : 'rgba(255,255,255,0.7)',
                  fontSize: 13, fontWeight: 600,
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
          <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)' }}><Clock /></span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {view === 'map' ? <MapBoard tables={KIOSK_TABLES} /> : <ZoneBoard tables={KIOSK_TABLES} />}
      </div>
    </div>
  );
}
