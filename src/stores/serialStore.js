import { create } from 'zustand';
import { SerialConnection } from '../lib/serialConnection';

const MAX_HISTORY = 500;

const useSerialStore = create((set, get) => ({
  // Connection state
  isConnected: false,
  serialConnection: null,

  // Real-time data
  latestData: {},          // latest parsed values
  dataHistory: [],         // last 500 data points with timestamps
  columnNames: [],         // ordered list of data keys discovered

  // Stats
  totalReadings: 0,
  startTime: null,

  // Project title for exhibition header
  projectTitle: 'IoT 환경 모니터링',

  // Column names for CSV mode
  csvColumns: [],

  // Actions ────────────────────────────────────

  setProjectTitle: (title) => set({ projectTitle: title }),

  setCsvColumns: (cols) => {
    const { serialConnection } = get();
    if (serialConnection) serialConnection.setColumns(cols);
    set({ csvColumns: cols });
  },

  connect: async () => {
    let { serialConnection } = get();

    if (!serialConnection) {
      serialConnection = new SerialConnection();

      // Wire up callbacks
      serialConnection.onData((parsed) => {
        const { dataHistory, columnNames, totalReadings } = get();

        // Discover new column names
        const newKeys = Object.keys(parsed);
        const mergedNames = [...columnNames];
        for (const k of newKeys) {
          if (!mergedNames.includes(k)) mergedNames.push(k);
        }

        // Append to history
        const entry = { ...parsed, _ts: Date.now() };
        const updated = [...dataHistory, entry];
        if (updated.length > MAX_HISTORY) updated.shift();

        set({
          latestData: parsed,
          dataHistory: updated,
          columnNames: mergedNames,
          totalReadings: totalReadings + 1,
        });
      });

      serialConnection.onStatus((connected) => {
        set({ isConnected: connected });
      });

      // Apply CSV columns if already set
      const { csvColumns } = get();
      if (csvColumns.length > 0) serialConnection.setColumns(csvColumns);

      set({ serialConnection });
    }

    await serialConnection.connect();
    set({ startTime: Date.now() });
  },

  disconnect: async () => {
    const { serialConnection } = get();
    if (serialConnection) {
      await serialConnection.disconnect();
    }
    set({ isConnected: false });
  },

  clearData: () => set({
    latestData: {},
    dataHistory: [],
    columnNames: [],
    totalReadings: 0,
    startTime: null,
  }),

  /** Export data history to CSV file download */
  exportCSV: () => {
    const { dataHistory, columnNames, projectTitle } = get();
    if (dataHistory.length === 0) return;

    const header = ['timestamp', ...columnNames].join(',');
    const rows = dataHistory.map(entry => {
      const ts = new Date(entry._ts).toISOString();
      const vals = columnNames.map(k => entry[k] ?? '');
      return [ts, ...vals].join(',');
    });

    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    a.download = `${projectTitle}-${dateStr}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  },
}));

export default useSerialStore;
