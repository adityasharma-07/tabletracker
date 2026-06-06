import React from 'react';
import { AppHeader, BottomNav, MobileView } from '../components/MobileShell.jsx';

const SAMPLE_ALERTS = [
  { id: 1, type: 'open',   table: 'Table 15', hall: 'Yahentamitsi', time: '2 min ago', read: false },
  { id: 2, type: 'held',   table: 'Table 9',  hall: 'Yahentamitsi', time: '12 min ago', read: true },
  { id: 3, type: 'nearly', table: 'Table 3',  hall: '251 North',    time: '1 hr ago',  read: true },
];

const ALERT_CONFIG = {
  open:   { icon: '🟢', text: 'is now open!', color: 'var(--ok)' },
  held:   { icon: '⏱️', text: 'hold expired', color: 'var(--ink-3)' },
  nearly: { icon: '🟡', text: 'has a seat opening', color: 'var(--warn)' },
};

export default function AlertsScreen() {
  return (
    <MobileView>
      <AppHeader title="Alerts" subtitle="Your saved tables & notifications" />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {SAMPLE_ALERTS.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)', fontSize: 14 }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🔔</div>
            <div>No alerts yet.</div>
            <div style={{ marginTop: 6, fontSize: 13 }}>Set an alert on any table to be notified when it opens.</div>
          </div>
        ) : (
          SAMPLE_ALERTS.map((alert) => {
            const cfg = ALERT_CONFIG[alert.type] || ALERT_CONFIG.open;
            return (
              <div key={alert.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '14px 16px',
                borderBottom: '1px solid var(--line)',
                background: alert.read ? 'var(--surface)' : 'var(--ok-bg)',
              }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{cfg.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: alert.read ? 400 : 600 }}>
                    <strong style={{ color: cfg.color }}>{alert.table}</strong> {cfg.text}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
                    {alert.hall} · {alert.time}
                  </div>
                </div>
                {!alert.read && (
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: 'var(--ok)', flexShrink: 0, marginTop: 6,
                  }} />
                )}
              </div>
            );
          })
        )}
      </div>

      <BottomNav />
    </MobileView>
  );
}
