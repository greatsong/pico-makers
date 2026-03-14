import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

/**
 * VoiceControl — Web Speech API 기반 음성 제어 및 자동 알림
 *
 * 기능:
 * 1. STT (Speech-to-Text): 한국어 음성 명령 인식
 *    - "분석해줘" / "AI 분석" → AI 인사이트 트리거
 *    - "데이터 초기화" → 데이터 클리어
 *    - "CSV 저장" / "내보내기" → CSV 내보내기
 *    - "전체 화면" → 전체화면 토글
 * 2. 자동 음성 알림: 센서 값 이상 감지 시 TTS 알림
 *
 * Props:
 *   onCommand       — (commandType: string) => void  명령 콜백
 *   latestData      — { key: value } 현재 센서 값
 *   columnNames     — 센서 키 이름 배열
 *   isConnected     — 시리얼 연결 상태
 *
 * ※ Web Speech API는 Chrome/Edge에서 가장 잘 지원됩니다.
 */

// 센서별 경고 임계값
const ALERT_THRESHOLDS = {
  CO2:  { high: 1000, unit: 'ppm', label: 'CO2 농도' },
  co2:  { high: 1000, unit: 'ppm', label: 'CO2 농도' },
  T:    { high: 35, low: 5, unit: '도', label: '온도' },
  temp: { high: 35, low: 5, unit: '도', label: '온도' },
  temperature: { high: 35, low: 5, unit: '도', label: '온도' },
  H:    { high: 85, low: 20, unit: '%', label: '습도' },
  humi: { high: 85, low: 20, unit: '%', label: '습도' },
  humidity: { high: 85, low: 20, unit: '%', label: '습도' },
};

export default function VoiceControl({ onCommand, latestData = {}, columnNames = [], isConnected = false }) {
  const [isListening, setIsListening] = useState(false);
  const [autoAnnounce, setAutoAnnounce] = useState(false);
  const [lastTranscript, setLastTranscript] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [browserSupported, setBrowserSupported] = useState(true);

  const recognitionRef = useRef(null);
  const lastAlertTimeRef = useRef({});   // 센서별 마지막 알림 시각 (중복 방지)
  const feedbackTimerRef = useRef(null);

  // ── 브라우저 지원 확인 ─────────────────────────────────
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setBrowserSupported(false);
    }
  }, []);

  // ── 피드백 표시 헬퍼 ──────────────────────────────────
  const showCommandFeedback = useCallback((msg) => {
    setFeedbackMsg(msg);
    setShowFeedback(true);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => setShowFeedback(false), 3000);
  }, []);

  // ── 음성 명령 처리 ────────────────────────────────────
  const processCommand = useCallback((transcript) => {
    const text = transcript.trim().toLowerCase();
    setLastTranscript(transcript);

    if (text.includes('분석') || text.includes('ai') || text.includes('인사이트')) {
      onCommand('analyze');
      showCommandFeedback('AI 분석을 실행합니다');
    } else if (text.includes('초기화') || text.includes('리셋') || text.includes('클리어')) {
      onCommand('clearData');
      showCommandFeedback('데이터를 초기화합니다');
    } else if (text.includes('csv') || text.includes('저장') || text.includes('내보내기') || text.includes('다운로드')) {
      onCommand('exportCSV');
      showCommandFeedback('CSV 파일을 저장합니다');
    } else if (text.includes('전체') || text.includes('풀스크린') || text.includes('화면')) {
      onCommand('fullscreen');
      showCommandFeedback('전체 화면을 전환합니다');
    } else {
      showCommandFeedback(`"${transcript}" — 인식된 명령이 없습니다`);
    }
  }, [onCommand, showCommandFeedback]);

  // ── STT 시작/중지 ─────────────────────────────────────
  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      processCommand(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.warn('STT error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        showCommandFeedback('마이크 권한이 필요합니다');
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [processCommand, showCommandFeedback]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  // ── 자동 음성 알림 ────────────────────────────────────
  useEffect(() => {
    if (!autoAnnounce || !isConnected || !window.speechSynthesis) return;

    for (const col of columnNames) {
      const threshold = ALERT_THRESHOLDS[col];
      if (!threshold) continue;

      const value = latestData[col];
      if (typeof value !== 'number') continue;

      const now = Date.now();
      const lastAlert = lastAlertTimeRef.current[col] || 0;

      // 같은 센서에 대해 30초 이내 중복 알림 방지
      if (now - lastAlert < 30_000) continue;

      let alertMsg = null;

      if (threshold.high !== undefined && value > threshold.high) {
        alertMsg = `주의! ${threshold.label}가 ${value.toFixed(1)}${threshold.unit}으로 ${threshold.high}${threshold.unit}을 초과했습니다.`;
      } else if (threshold.low !== undefined && value < threshold.low) {
        alertMsg = `주의! ${threshold.label}가 ${value.toFixed(1)}${threshold.unit}으로 ${threshold.low}${threshold.unit} 미만입니다.`;
      }

      if (alertMsg) {
        lastAlertTimeRef.current[col] = now;
        const utterance = new SpeechSynthesisUtterance(alertMsg);
        utterance.lang = 'ko-KR';
        utterance.rate = 1.0;
        utterance.pitch = 1.1;

        const voices = window.speechSynthesis.getVoices();
        const koVoice = voices.find(v => v.lang.startsWith('ko'));
        if (koVoice) utterance.voice = koVoice;

        window.speechSynthesis.speak(utterance);
      }
    }
  }, [autoAnnounce, latestData, columnNames, isConnected]);

  // ── 정리 ──────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  if (!browserSupported) {
    return null; // Speech API 미지원 브라우저에서는 렌더링하지 않음
  }

  const hasTTS = 'speechSynthesis' in window;

  return (
    <>
      {/* ── 헤더에 들어갈 버튼들 ── */}
      <div className="flex items-center gap-1.5">
        {/* 마이크 버튼 (STT) */}
        <button
          onClick={() => isListening ? stopListening() : startListening()}
          className={`relative w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 ${
            isListening
              ? 'bg-red/10 border-red/50 text-red exhibition-mic-pulse'
              : 'bg-bg-primary border-border text-text-secondary hover:text-cyan hover:border-cyan/50'
          }`}
          title={isListening ? '음성 인식 중지' : '음성 명령 (한국어)'}
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          {isListening && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red rounded-full exhibition-status-dot" />
          )}
        </button>

        {/* 자동 음성 알림 토글 */}
        {hasTTS && (
          <button
            onClick={() => setAutoAnnounce(!autoAnnounce)}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 ${
              autoAnnounce
                ? 'bg-orange/10 border-orange/50 text-orange'
                : 'bg-bg-primary border-border text-text-secondary hover:text-orange hover:border-orange/50'
            }`}
            title={autoAnnounce ? '자동 음성 알림 끄기' : '자동 음성 알림 켜기'}
          >
            {autoAnnounce ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        )}
      </div>

      {/* ── 음성 피드백 오버레이 ── */}
      {showFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-elevated/95 border border-border shadow-lg backdrop-blur-sm">
            {isListening ? (
              <div className="flex gap-0.5 items-center">
                <span className="inline-block w-1 h-4 bg-red rounded-full exhibition-voice-bar" style={{ animationDelay: '0ms' }} />
                <span className="inline-block w-1 h-4 bg-red rounded-full exhibition-voice-bar" style={{ animationDelay: '150ms' }} />
                <span className="inline-block w-1 h-4 bg-red rounded-full exhibition-voice-bar" style={{ animationDelay: '300ms' }} />
              </div>
            ) : (
              <Mic size={14} className="text-cyan" />
            )}
            <span className="text-sm text-text-primary">{feedbackMsg}</span>
          </div>
        </div>
      )}

      {/* ── 리스닝 인디케이터 ── */}
      {isListening && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red/10 border border-red/30 backdrop-blur-sm">
            <div className="flex gap-0.5 items-center">
              <span className="inline-block w-1.5 h-4 bg-red rounded-full exhibition-voice-bar" style={{ animationDelay: '0ms' }} />
              <span className="inline-block w-1.5 h-4 bg-red rounded-full exhibition-voice-bar" style={{ animationDelay: '100ms' }} />
              <span className="inline-block w-1.5 h-4 bg-red rounded-full exhibition-voice-bar" style={{ animationDelay: '200ms' }} />
              <span className="inline-block w-1.5 h-4 bg-red rounded-full exhibition-voice-bar" style={{ animationDelay: '300ms' }} />
              <span className="inline-block w-1.5 h-4 bg-red rounded-full exhibition-voice-bar" style={{ animationDelay: '200ms' }} />
            </div>
            <span className="text-sm text-red font-medium">음성 인식 중...</span>
          </div>
        </div>
      )}
    </>
  );
}
