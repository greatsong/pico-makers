import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Plug, PlugZap, Download, Maximize, Minimize, Activity,
  Clock, Database, Wifi, WifiOff, Trash2, Monitor,
} from 'lucide-react';
import useSerialStore from '../../stores/serialStore';
import LiveChart from './LiveChart';
import DataStats from './DataStats';
import AIInsightPanel from './AIInsightPanel';
import VoiceControl from './VoiceControl';

/**
 * ExhibitionMode — full-screen kiosk-style IoT dashboard
 * for school exhibitions. Connects to Pico via Web Serial,
 * displays real-time charts, current values, statistics,
 * AI-powered insights (Claude API), and voice interaction (Web Speech API).
 */
export default function ExhibitionMode() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Ref for AIInsightPanel to trigger AI analysis from voice commands
  const aiInsightRef = useRef(null);

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

  // Voice command handler
  const handleVoiceCommand = useCallback((commandType) => {
    switch (commandType) {
      case 'analyze':
        // AIInsightPanel의 AI 분석 트리거
        aiInsightRef.current?.triggerAIAnalysis();
        break;
      case 'clearData':
        clearData();
        break;
      case 'exportCSV':
        exportCSV();
        break;
      case 'fullscreen':
        toggleFullscreen();
        break;
      default:
        break;
    }
  }, [clearData, exportCSV, toggleFullscreen]);

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

        {/* Voice Control buttons (STT + auto-announce) */}
        <VoiceControl
          onCommand={handleVoiceCommand}
          latestData={latestData}
          columnNames={columnNames}
          isConnected={isConnected}
        />

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

          {/* AI Insight Panel — Claude API + 규칙 기반 + TTS */}
          <AIInsightPanel
            ref={aiInsightRef}
            latestData={latestData}
            dataHistory={dataHistory}
            columnNames={columnNames}
          />
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
