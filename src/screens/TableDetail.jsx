import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { DINING_HALLS, FLOOR_TABLES, getTableDetail } from '../data/mockData.js';
import { FloorMap } from '../components/FloorMap.jsx';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { AppHeader, BottomNav, MobileView } from '../components/MobileShell.jsx';

function InfoRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '9px 0',
      borderBottom: '1px solid var(--line)',
    }}>
      <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{value}</span>
    </div>
  );
}

function HoldModal({ onClose, onConfirm }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'flex-end',
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface)', borderRadius: '20px 20px 0 0',
          padding: '20px 20px 32px', width: '100%',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ width: 40, height: 4, borderRadius: 999, background: 'var(--line)', margin: '0 auto 16px' }} />
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Hold this seat?</div>
        <div style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 20, lineHeight: 1.5 }}>
          We'll reserve this table for 5 minutes while you make your way over. Your spot will be released automatically.
        </div>
        <button
          onClick={onConfirm}
          style={{
            width: '100%', padding: '13px', marginBottom: 10,
            background: 'var(--ok)', color: '#fff',
            border: 'none', borderRadius: 'var(--radius-sm)',
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Yes, hold for 5 min
        </button>
        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '13px',
            background: 'var(--surface-2)', color: 'var(--ink-2)',
            border: '1.5px solid var(--line)', borderRadius: 'var(--radius-sm)',
            fontSize: 15, fontWeight: 500, cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function TableDetail() {
  const { tableId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fromHall = searchParams.get('from') || 'yahentamitsi';

  const hall = DINING_HALLS.find((h) => h.id === fromHall) || DINING_HALLS[0];
  const detail = getTableDetail(tableId);
  const [held, setHeld] = useState(false);
  const [alerted, setAlerted] = useState(false);
  const [showHold, setShowHold] = useState(false);

  if (!detail) {
    return (
      <MobileView>
        <AppHeader onBack title="Table not found" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-3)' }}>
          This table doesn't exist.
        </div>
        <BottomNav />
      </MobileView>
    );
  }

  const shapeLabel = { round: 'Round', square: 'Square', long: 'Long / booth' };

  const nearbyTableIds = FLOOR_TABLES
    .filter((t) => t.id !== tableId)
    .slice(0, 6)
    .map((t) => t.id);

  const miniTables = FLOOR_TABLES.filter((t) => t.id === tableId || nearbyTableIds.includes(t.id));

  return (
    <MobileView>
      <AppHeader
        onBack
        title={detail.label}
        subtitle={detail.zone}
        right={<StatusBadge status={detail.status} />}
      />

      {/* Mini-map context strip */}
      <div style={{ height: 130, padding: '10px 14px 0', flexShrink: 0, display: 'flex' }}>
        <FloorMap
          tables={miniTables}
          selectedId={tableId}
          onTableClick={(tbl) => {
            if (tbl.id !== tableId) navigate(`/table/${tbl.id}?from=${fromHall}`);
          }}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        {/* Status card */}
        <div style={{
          margin: '14px 0 6px',
          padding: '14px',
          background: detail.status === 'ok' ? 'var(--ok-bg)' : detail.status === 'warn' ? 'var(--warn-bg)' : 'var(--full-bg)',
          borderRadius: 'var(--radius-sm)',
          border: `1.5px solid ${detail.status === 'ok' ? 'var(--ok-border)' : detail.status === 'warn' ? 'var(--warn-border)' : 'var(--full-border)'}`,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          {/* Table shape icon */}
          <div style={{
            width: 48, height: 48, flexShrink: 0,
            borderRadius: detail.shape === 'round' ? '50%' : detail.shape === 'long' ? 10 : 8,
            background: '#fff',
            border: `2.5px solid ${detail.status === 'ok' ? 'var(--ok)' : detail.status === 'warn' ? 'var(--warn)' : 'var(--full)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700,
            color: detail.status === 'ok' ? 'var(--ok)' : detail.status === 'warn' ? 'var(--warn)' : 'var(--full)',
          }}>
            {detail.id}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>
              {detail.status === 'ok'
                ? `${detail.seatsOpen} of ${detail.seats} seats free`
                : detail.status === 'warn'
                  ? `${detail.seatsOpen} seats remaining`
                  : 'All seats taken'}
            </div>
            {detail.status !== 'full' && (
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                Open for {detail.minutesOpen} min
              </div>
            )}
          </div>
        </div>

        {/* Busy area alert */}
        {detail.status === 'ok' && detail.zone === 'Near entrance' && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '10px 12px', marginBottom: 6,
            background: 'var(--warn-bg)', borderRadius: 'var(--radius-sm)',
            border: '1.5px solid var(--warn-border)',
            fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.4,
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
            <span>Busy area — grab it soon. We'll ping you if a quieter spot opens up.</span>
          </div>
        )}

        {/* Details */}
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 2 }}>
            Details
          </div>
          <InfoRow label="Shape" value={shapeLabel[detail.shape] || detail.shape} />
          <InfoRow label="Seats" value={detail.seats} />
          <InfoRow label="Section" value={detail.zone} />
          <InfoRow label="Walk from entrance" value={`~${detail.walkSec}s`} />
          <InfoRow label="Step-free access" value={detail.accessFriendly ? 'Yes' : 'No'} />
        </div>

        {/* Actions */}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {held ? (
            <div style={{
              padding: '12px 14px',
              background: 'var(--ok-bg)', border: '1.5px solid var(--ok-border)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 14, color: 'var(--ok)', fontWeight: 600,
            }}>
              ✓ Held for 5 min — head over now!
            </div>
          ) : (
            <button
              onClick={() => detail.status !== 'full' && setShowHold(true)}
              disabled={detail.status === 'full'}
              style={{
                width: '100%', padding: '13px',
                background: detail.status === 'full' ? 'var(--surface-3)' : 'var(--ok)',
                color: detail.status === 'full' ? 'var(--ink-4)' : '#fff',
                border: 'none', borderRadius: 'var(--radius-sm)',
                fontSize: 15, fontWeight: 600,
                cursor: detail.status === 'full' ? 'not-allowed' : 'pointer',
              }}
            >
              Hold for 5 min
            </button>
          )}
          <button
            onClick={() => setAlerted((v) => !v)}
            style={{
              width: '100%', padding: '13px',
              background: alerted ? 'var(--ok-bg)' : 'var(--surface)',
              color: alerted ? 'var(--ok)' : 'var(--ink-2)',
              border: `1.5px solid ${alerted ? 'var(--ok-border)' : 'var(--line)'}`,
              borderRadius: 'var(--radius-sm)',
              fontSize: 15, fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {alerted ? "🔔 Alert set — we'll notify you" : 'Notify me when it opens'}
          </button>
        </div>
      </div>

      <BottomNav />

      {showHold && (
        <HoldModal
          onClose={() => setShowHold(false)}
          onConfirm={() => { setHeld(true); setShowHold(false); }}
        />
      )}
    </MobileView>
  );
}
