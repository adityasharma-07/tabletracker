import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HallPicker from './screens/HallPicker.jsx';
import FloorMapScreen from './screens/FloorMapScreen.jsx';
import TableDetail from './screens/TableDetail.jsx';
import KioskBoard from './screens/KioskBoard.jsx';
import AlertsScreen from './screens/AlertsScreen.jsx';

// Mobile shell wrapper — constrains to phone-width on desktop
function MobileWrapper({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      background: '#e5e7eb',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 430,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 8px 48px rgba(0,0,0,0.12)',
        position: 'relative',
      }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Kiosk — full viewport, no mobile wrapper */}
      <Route path="/kiosk" element={<KioskBoard />} />

      {/* Mobile app */}
      <Route path="/*" element={
        <MobileWrapper>
          <Routes>
            <Route path="/" element={<Navigate to="/halls" replace />} />
            <Route path="/halls" element={<HallPicker />} />
            <Route path="/map/:hallId" element={<FloorMapScreen />} />
            <Route path="/map" element={<Navigate to="/halls" replace />} />
            <Route path="/table/:tableId" element={<TableDetail />} />
            <Route path="/alerts" element={<AlertsScreen />} />
          </Routes>
        </MobileWrapper>
      } />
    </Routes>
  );
}
