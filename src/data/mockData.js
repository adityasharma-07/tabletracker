export const DINING_HALLS = [
  {
    id: 'yahentamitsi',
    name: 'Yahentamitsi',
    shortName: 'Yahentamitsi',
    area: 'North Campus',
    walkMin: 4,
    status: 'warn',
    pct: 62,
    openTables: 9,
    totalTables: 26,
    hours: 'Open until 9:00 PM',
  },
  {
    id: '251north',
    name: '251 North',
    shortName: '251 North',
    area: 'North Campus',
    walkMin: 6,
    status: 'full',
    pct: 92,
    openTables: 2,
    totalTables: 30,
    hours: 'Open until 8:30 PM',
  },
  {
    id: 'south',
    name: 'South Campus Dining',
    shortName: 'South Dining',
    area: 'South Campus',
    walkMin: 8,
    status: 'ok',
    pct: 28,
    openTables: 18,
    totalTables: 24,
    hours: 'Open until 9:30 PM',
  },
  {
    id: 'stamp',
    name: 'The Stamp Food Court',
    shortName: 'The Stamp',
    area: 'Student Union',
    walkMin: 3,
    status: 'warn',
    pct: 55,
    openTables: 12,
    totalTables: 28,
    hours: 'Open until 10:00 PM',
  },
];

export const FLOOR_TABLES = [
  { id: '1',  status: 'full', shape: 'long',   seats: 8,  x: 8,  y: 8,  label: 'Table 1' },
  { id: '2',  status: 'full', shape: 'long',   seats: 8,  x: 26, y: 8,  label: 'Table 2' },
  { id: '3',  status: 'ok',   shape: 'long',   seats: 8,  x: 44, y: 8,  label: 'Table 3' },
  { id: '4',  status: 'warn', shape: 'long',   seats: 8,  x: 62, y: 8,  label: 'Table 4' },
  { id: '5',  status: 'ok',   shape: 'long',   seats: 8,  x: 80, y: 8,  label: 'Table 5' },
  { id: '6',  status: 'full', shape: 'round',  seats: 4,  x: 10, y: 30, label: 'Table 6' },
  { id: '7',  status: 'full', shape: 'round',  seats: 4,  x: 26, y: 30, label: 'Table 7' },
  { id: '8',  status: 'warn', shape: 'round',  seats: 4,  x: 42, y: 30, label: 'Table 8' },
  { id: '9',  status: 'ok',   shape: 'round',  seats: 4,  x: 58, y: 30, label: 'Table 9' },
  { id: '10', status: 'ok',   shape: 'round',  seats: 4,  x: 74, y: 30, label: 'Table 10' },
  { id: '11', status: 'ok',   shape: 'round',  seats: 4,  x: 88, y: 30, label: 'Table 11' },
  { id: '12', status: 'full', shape: 'square', seats: 4,  x: 10, y: 52, label: 'Table 12' },
  { id: '13', status: 'warn', shape: 'square', seats: 4,  x: 26, y: 52, label: 'Table 13' },
  { id: '14', status: 'full', shape: 'square', seats: 4,  x: 42, y: 52, label: 'Table 14' },
  { id: '15', status: 'ok',   shape: 'square', seats: 4,  x: 58, y: 52, label: 'Table 15' },
  { id: '16', status: 'ok',   shape: 'square', seats: 4,  x: 74, y: 52, label: 'Table 16' },
  { id: '17', status: 'ok',   shape: 'square', seats: 4,  x: 88, y: 52, label: 'Table 17' },
  { id: '18', status: 'warn', shape: 'round',  seats: 6,  x: 12, y: 74, label: 'Table 18' },
  { id: '19', status: 'ok',   shape: 'round',  seats: 6,  x: 30, y: 74, label: 'Table 19' },
  { id: '20', status: 'full', shape: 'round',  seats: 6,  x: 48, y: 74, label: 'Table 20' },
  { id: '21', status: 'ok',   shape: 'round',  seats: 6,  x: 66, y: 74, label: 'Table 21' },
  { id: '22', status: 'ok',   shape: 'round',  seats: 6,  x: 84, y: 74, label: 'Table 22' },
];

export const TABLE_ZONES = {
  windows: ['3', '4', '5'],
  center: ['8', '9', '10', '13', '14', '15'],
  entrance: ['18', '19', '20'],
  back: ['21', '22', '11', '16', '17'],
};

export const KIOSK_ZONES = [
  { name: 'Windows',    openTables: 5, status: 'ok',   where: 'Left side',     tables: ['3','4','5'] },
  { name: 'Center',     openTables: 4, status: 'ok',   where: 'Middle',        tables: ['9','10','15','16'] },
  { name: 'Entrance',   openTables: 1, status: 'warn', where: 'Near doors',    tables: ['19'] },
  { name: 'Back room',  openTables: 2, status: 'warn', where: 'Past the grill',tables: ['21','22'] },
];

export function getTableDetail(tableId) {
  const tbl = FLOOR_TABLES.find((t) => t.id === tableId);
  if (!tbl) return null;

  const seatsOpen = tbl.status === 'ok' ? tbl.seats : tbl.status === 'warn' ? Math.ceil(tbl.seats / 2) : 0;
  const minutesOpen = tbl.status !== 'full' ? Math.floor(Math.random() * 8) + 1 : 0;

  const zoneKey = Object.entries(TABLE_ZONES).find(([, ids]) => ids.includes(tableId))?.[0];
  const zoneLabel = { windows: 'By windows', center: 'Center section', entrance: 'Near entrance', back: 'Back room' }[zoneKey] ?? 'Main floor';

  return {
    ...tbl,
    seatsOpen,
    minutesOpen,
    zone: zoneLabel,
    walkSec: Math.floor(Math.random() * 60) + 15,
    accessFriendly: ['3','9','15','19','22'].includes(tableId),
  };
}
