import { useState, useEffect, useCallback } from 'react';
import {
  Plug, PlugZap, Download, Maximize, Minimize, Activity,
  Clock, Database, Zap, Wifi, WifiOff, Trash2, Monitor,
} from 'lucide-react';
import useSerialStore from '../../stores/serialStore';
import LiveChart from './LiveChart';
import DataStats from './DataStats';

/**
 * ExhibitionMode — full-screen kiosk-style IoT dashboard
 * for school exhibitions. Connects to Pico via Web Serial,
 * displays real-time charts, current values, and statistics.
 */
export default function ExhibitionMode() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Serial store
  const isConnected = useSerialStore(s => s.isConnected);
  const latestData = useSerialStore(s => s.latestData);
  const dataHistory = useSerialStore(s => s.dataHistory);
  const columnNames = useSerialStore(s => s.columnNames);
  const totalReadings = useSerialStore(s => s.totalReadings);
  const startTime = useSerialStore(s => s.startTime);
  const projectTitle = useSerialStore(s => s.projectTitle);
  const setProjectTitle = useSerialStore(s => s.setProjectTitle);
  const connect = useSerialStore(s => s.connect);
  const disconnect = useSerialStore(s => s.disconnect);
  const clearData = useSerialStore(s => s.clearData);
  const exportCSV = useSerialStore(s => s.exportCSV);

  // Clock timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  }, []);

  // Listen for fullscreen exit via Escape
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Connection duration
  const duration = startTime ? formatDuration(Date.now() - startTime) : '--:--:--';

  // Handle connect/disconnect
  const handleConnection = async () => {
    if (isConnected) {
      await disconnect();
    } else {
      try {
        await connect();
      } catch (err) {
        console.error('Serial connection error:', err);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-bg-primary exhibition-container">
      {/* ──────── Header Bar ──────── */}
      <header className="flex items-center gap-3 px-5 py-3 bg-bg-surface/80 border-b border-border/50 backdrop-blur-sm relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan/30 to-purple/30 flex items-center justify-center exhibition-logo-pulse">
            <Monitor size={20} className="text-cyan" />
          </div>
        </div>

        {/* Editable project title */}
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          className="bg-transparent text-lg font-bold text-text-primary border-none outline-none focus:ring-1 focus:ring-cyan/50 rounded px-2 py-0.5 min-w-0 flex-shrink"
          placeholder="프로젝트 이름 입력..."
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Connection status */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
            isConnected
              ? 'bg-green/10 text-green border border-green/30'
              : 'bg-red/10 text-red border border-red/30'
          }`}>
            {isConnected ? <Wifi size={13} /> : <WifiOff size={13} />}
            {isConnected ? '연결됨' : '미연결'}
            {isConnected && <span className="exhibition-status-dot" />}
          </div>
        </div>

        {/* Connect button */}
        <button
          onClick={handleConnection}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            isConnected
              ? 'bg-red/10 text-red border border-red/30 hover:bg-red/20'
              : 'bg-cyan/10 text-cyan border border-cyan/30 hover:bg-cyan/20 exhibition-connect-glow'
          }`}
        >
          {isConnected ? <PlugZap size={16} /> : <Plug size={16} />}
          {isConnected ? '연결 해제' : 'Pico 연결'}
        </button>

        {/* Clock */}
        <div className="flex items-center gap-1.5 text-text-secondary text-sm font-mono">
          <Clock size={14} />
          {currentTime.toLocaleTimeString('ko-KR')}
        </div>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="w-9 h-9 rounded-lg bg-bg-primary border border-border flex items-center justify-center text-text-secondary hover:text-cyan hover:border-cyan/50 transition-colors"
          title={isFullscreen ? '전체화면 종료' : '전체화면'}
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
      </header>

      {/* ──────── Main Content ──────── */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left: Live Chart (60%) */}
        <div className="flex-[3] flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-cyan" />
            <h2 className="text-sm font-semibold text-text-primary">실시간 데이터</h2>
            <span className="text-xs text-text-muted font-mono ml-auto">
              최근 {Math.min(dataHistory.length, 60)}개 데이터
            </span>
          </div>

          <div className="flex-1 rounded-2xl border border-border/50 bg-bg-primary overflow-hidden exhibition-chart-container">
            <LiveChart
              dataHistory={dataHistory}
              columnNames={columnNames}
              maxPoints={60}
            />
          </div>
        </div>

        {/* Right: Stats (40%) */}
        <div className="flex-[2] flex flex-col min-w-0 gap-4 overflow-y-auto exhibition-scrollbar">
          {/* Current Values & Statistics */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Database size={16} className="text-orange" />
              <h2 className="text-sm font-semibold text-text-primary">센서 값</h2>
            </div>

            <DataStats
              latestData={latestData}
              dataHistory={dataHistory}
              columnNames={columnNames}
            />
          </div>

          {/* AI Insight area */}
          <div className="rounded-2xl border border-border/50 bg-bg-surface/50 p-4 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-purple" />
              <h2 className="text-sm font-semibold text-text-primary">AI 인사이트</h2>
            </div>
            <div className="text-sm text-text-muted leading-relaxed">
              {dataHistory.length > 10
                ? generateInsight(latestData, columnNames, dataHistory)
                : 'Pico에서 데이터가 수집되면 AI가 센서 데이터를 분석하여 인사이트를 제공합니다.'
              }
            </div>
          </div>
        </div>
      </div>

      {/* ──────── Bottom Bar ──────── */}
      <footer className="flex items-center gap-4 px-5 py-2.5 bg-bg-surface/80 border-t border-border/50 backdrop-blur-sm text-xs">
        {/* Data count */}
        <div className="flex items-center gap-1.5 text-text-secondary">
          <Database size={13} />
          <span className="font-mono">
            <span className="text-cyan font-semibold">{totalReadings.toLocaleString()}</span> 데이터
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1.5 text-text-secondary">
          <Clock size={13} />
          <span className="font-mono">{duration}</span>
        </div>

        {/* Columns discovered */}
        {columnNames.length > 0 && (
          <div className="flex items-center gap-1.5 text-text-muted">
            <Activity size={13} />
            <span>{columnNames.length}개 채널</span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Clear data */}
        <button
          onClick={clearData}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-text-muted hover:text-red hover:bg-red/10 transition-colors"
        >
          <Trash2 size={13} />
          초기화
        </button>

        {/* Export CSV */}
        <button
          onClick={exportCSV}
          disabled={dataHistory.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan/10 text-cyan border border-cyan/30 hover:bg-cyan/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-medium"
        >
          <Download size={13} />
          CSV 내보내기
        </button>

        {/* Branding */}
        <div className="text-text-muted flex items-center gap-1">
          <span className="text-cyan font-bold">Pico</span>
          <span className="text-orange font-bold">Makers</span>
        </div>
      </footer>
    </div>
  );
}

/** Format milliseconds to HH:MM:SS */
function formatDuration(ms) {
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Generate a simple insight based on current data */
function generateInsight(latestData, columnNames, dataHistory) {
  if (columnNames.length === 0) return '';

  const insights = [];

  for (const col of columnNames) {
    const values = dataHistory.map(e => e[col]).filter(v => typeof v === 'number');
    if (values.length < 2) continue;

    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const current = latestData[col];
    const recent10 = values.slice(-10);
    const recent10Avg = recent10.reduce((a, b) => a + b, 0) / recent10.length;
    const older = values.slice(0, -10);
    const olderAvg = older.length > 0 ? older.reduce((a, b) => a + b, 0) / older.length : avg;

    if (typeof current === 'number') {
      const pctChange = olderAvg !== 0 ? ((recent10Avg - olderAvg) / Math.abs(olderAvg)) * 100 : 0;

      if (Math.abs(pctChange) > 5) {
        const direction = pctChange > 0 ? '상승' : '하락';
        insights.push(`${col}: 최근 ${direction} 추세 (${pctChange > 0 ? '+' : ''}${pctChange.toFixed(1)}%)`);
      } else {
        insights.push(`${col}: 안정적 (평균 ${avg.toFixed(1)})`);
      }
    }
  }

  return insights.length > 0
    ? insights.join('\n')
    : '데이터를 분석 중입니다...';
}
