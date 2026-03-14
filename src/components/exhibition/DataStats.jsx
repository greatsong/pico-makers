import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus, Thermometer, Droplets, Wind, Activity } from 'lucide-react';

/**
 * Series colors — same as LiveChart.
 */
const SERIES_COLORS = [
  '#22d3ee', // cyan
  '#fb923c', // orange
  '#4ade80', // green
  '#a78bfa', // purple
  '#f87171', // red
  '#facc15', // yellow
  '#f472b6', // pink
  '#38bdf8', // sky
];

/**
 * Map common sensor key names to icons.
 */
const KEY_ICONS = {
  T: Thermometer,
  temp: Thermometer,
  temperature: Thermometer,
  H: Droplets,
  humi: Droplets,
  humidity: Droplets,
  CO2: Wind,
  co2: Wind,
  AQI: Activity,
  aqi: Activity,
};

/**
 * Map common sensor key names to units.
 */
const KEY_UNITS = {
  T: '\u00B0C',
  temp: '\u00B0C',
  temperature: '\u00B0C',
  H: '%',
  humi: '%',
  humidity: '%',
  CO2: 'ppm',
  co2: 'ppm',
  AQI: '',
  aqi: '',
};

/**
 * DataStats — shows current values, min/max/avg and trend for each sensor.
 *
 * Props:
 *   latestData   — { key: value } current readings
 *   dataHistory  — array of { key: value, _ts } entries
 *   columnNames  — ordered array of key names
 */
export default function DataStats({ latestData = {}, dataHistory = [], columnNames = [] }) {
  // Calculate statistics per column
  const stats = useMemo(() => {
    return columnNames.map((col, idx) => {
      const values = dataHistory
        .map(e => e[col])
        .filter(v => typeof v === 'number');

      if (values.length === 0) {
        return { col, idx, min: 0, max: 0, avg: 0, trend: 'flat', current: latestData[col] ?? '--' };
      }

      const min = Math.min(...values);
      const max = Math.max(...values);
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const current = latestData[col];

      // Trend: compare current vs avg
      let trend = 'flat';
      if (typeof current === 'number') {
        const diff = current - avg;
        const threshold = (max - min) * 0.05 || 0.1;
        if (diff > threshold) trend = 'up';
        else if (diff < -threshold) trend = 'down';
      }

      return { col, idx, min, max, avg, trend, current };
    });
  }, [columnNames, dataHistory, latestData]);

  if (columnNames.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-muted text-sm">
        Pico를 연결하면 센서 데이터가 여기에 표시됩니다
      </div>
    );
  }

  return (
    <div className="grid gap-3 p-1">
      {stats.map(({ col, idx, min, max, avg, trend, current }) => {
        const color = SERIES_COLORS[idx % SERIES_COLORS.length];
        const IconComponent = KEY_ICONS[col] || Activity;
        const unit = KEY_UNITS[col] || '';
        const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

        return (
          <div
            key={col}
            className="relative bg-bg-primary/60 rounded-xl p-4 border border-border/50 overflow-hidden group transition-all duration-300 hover:border-opacity-80"
            style={{ borderColor: `${color}30` }}
          >
            {/* Background glow */}
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
              style={{ background: color }}
            />

            {/* Header row */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: `${color}20` }}
              >
                <IconComponent size={16} style={{ color }} />
              </div>
              <span className="text-sm font-medium text-text-secondary">{col}</span>
              <div className="ml-auto flex items-center gap-1">
                <TrendIcon
                  size={14}
                  style={{ color: trend === 'up' ? '#4ade80' : trend === 'down' ? '#f87171' : '#64748b' }}
                />
              </div>
            </div>

            {/* Current value — large */}
            <div className="flex items-baseline gap-1 mb-3">
              <span
                className="text-3xl font-bold font-mono tabular-nums exhibition-value-update"
                style={{ color }}
              >
                {typeof current === 'number' ? formatValue(current) : '--'}
              </span>
              {unit && (
                <span className="text-sm text-text-muted font-medium">{unit}</span>
              )}
            </div>

            {/* Min / Max / Avg bar */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-text-muted">
              <span>
                <span className="text-text-secondary">Min </span>
                <span className="text-text-primary">{formatValue(min)}</span>
              </span>
              <span className="text-border">|</span>
              <span>
                <span className="text-text-secondary">Avg </span>
                <span className="text-text-primary">{formatValue(avg)}</span>
              </span>
              <span className="text-border">|</span>
              <span>
                <span className="text-text-secondary">Max </span>
                <span className="text-text-primary">{formatValue(max)}</span>
              </span>
            </div>

            {/* Mini bar showing where current value sits between min and max */}
            {typeof current === 'number' && max !== min && (
              <div className="mt-2 h-1 bg-bg-elevated rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    background: color,
                    width: `${Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100))}%`,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function formatValue(n) {
  if (typeof n !== 'number' || isNaN(n)) return '--';
  if (Math.abs(n) >= 1000) return n.toFixed(0);
  if (Math.abs(n) >= 100) return n.toFixed(1);
  return n.toFixed(1);
}
