import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
  Brain, Sparkles, Volume2, VolumeX, Loader2, RefreshCw, ToggleLeft, ToggleRight,
} from 'lucide-react';

/**
 * AIInsightPanel — Claude API 기반 AI 인사이트 + TTS 읽기 기능
 *
 * Props:
 *   latestData    — { key: value } 현재 센서 값
 *   dataHistory   — 시계열 데이터 배열
 *   columnNames   — 센서 키 이름 배열
 *
 * Ref methods:
 *   triggerAIAnalysis() — 외부에서 AI 분석 실행 (음성 명령 등)
 */
const AIInsightPanel = forwardRef(function AIInsightPanel({ latestData = {}, dataHistory = [], columnNames = [] }, ref) {
  const [insightText, setInsightText] = useState('');
  const [isAIMode, setIsAIMode] = useState(true);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const autoTimerRef = useRef(null);
  const lastAutoFetchRef = useRef(0);
  const fetchAIInsightRef = useRef(null);
  const abortRef = useRef(null);
  const lastRuleUpdateRef = useRef(0);

  // ── 규칙 기반 인사이트 (기본 분석) ──────────────────────
  const generateRuleBasedInsight = useCallback(() => {
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
    return insights.length > 0 ? insights.join('\n') : '데이터를 분석 중입니다...';
  }, [latestData, columnNames, dataHistory]);

  // ── Claude API 인사이트 ───────────────────────────────
  const fetchAIInsight = useCallback(async () => {
    if (dataHistory.length < 10 || columnNames.length === 0) return;

    // Cancel any in-flight request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoadingAI(true);
    setAiError(null);

    try {
      // 최근 30~60개 데이터 포인트 수집
      const recentData = dataHistory.slice(-60);

      // 각 센서의 통계 요약 작성
      const statsSummary = columnNames.map(col => {
        const values = recentData.map(e => e[col]).filter(v => typeof v === 'number');
        if (values.length === 0) return null;
        const min = Math.min(...values);
        const max = Math.max(...values);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const current = latestData[col];
        const recent5 = values.slice(-5);
        const recent5Str = recent5.map(v => v.toFixed(1)).join(', ');
        return `${col}: 현재=${typeof current === 'number' ? current.toFixed(1) : 'N/A'}, 평균=${avg.toFixed(1)}, 최소=${min.toFixed(1)}, 최대=${max.toFixed(1)}, 최근5개=[${recent5Str}], 총 ${values.length}개 데이터`;
      }).filter(Boolean).join('\n');

      const systemPrompt = `당신은 IoT 센서 데이터 분석 전문가입니다. 학생의 전시 프로젝트 센서 데이터를 분석하여 한국어로 간단하고 흥미로운 인사이트를 제공하세요.

규칙:
- 3~4문장으로 간결하게 요약
- 데이터의 패턴, 추세, 이상치를 설명
- 과학적이지만 학생이 이해할 수 있는 쉬운 표현 사용
- 필요하면 환경이나 건강 관련 팁도 포함
- 마크다운 서식 사용 금지, 순수 텍스트만`;

      const userMessage = `다음은 실시간 IoT 센서 데이터 요약입니다:\n\n${statsSummary}\n\n이 데이터를 분석하여 인사이트를 제공해주세요.`;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userMessage }],
          system: systemPrompt,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`API 오류 (${res.status})`);
      }

      // SSE 스트리밍 응답 처리
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                setInsightText(fullText);
              }
            } catch {}
          }
        }
      }

      // Flush remaining buffer content after stream ends
      if (buffer.trim()) {
        const remainingLines = buffer.split('\n');
        for (const line of remainingLines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                setInsightText(fullText);
              }
            } catch {}
          }
        }
      }

      if (!fullText) {
        setInsightText(generateRuleBasedInsight());
      }

      lastAutoFetchRef.current = Date.now();
    } catch (err) {
      if (err.name === 'AbortError') return; // Cancelled — ignore
      console.error('AI Insight error:', err);
      setAiError(err.message);
      // 폴백: 규칙 기반 인사이트
      setInsightText(generateRuleBasedInsight());
    } finally {
      setIsLoadingAI(false);
    }
  }, [dataHistory, columnNames, latestData, generateRuleBasedInsight]);

  // Ref를 통한 외부 호출 지원 (음성 명령 등)
  fetchAIInsightRef.current = fetchAIInsight;

  useImperativeHandle(ref, () => ({
    triggerAIAnalysis: () => {
      setIsAIMode(true);
      fetchAIInsightRef.current?.();
    },
  }), []);

  // ── 모드에 따른 인사이트 업데이트 ───────────────────────
  useEffect(() => {
    if (!isAIMode) {
      setInsightText(generateRuleBasedInsight());
    }
  }, [isAIMode, generateRuleBasedInsight]);

  // 기본 분석 모드에서 데이터 변경 시 자동 업데이트 (5초 쓰로틀)
  useEffect(() => {
    if (!isAIMode && dataHistory.length > 10) {
      const now = Date.now();
      if (now - lastRuleUpdateRef.current >= 5000) {
        lastRuleUpdateRef.current = now;
        setInsightText(generateRuleBasedInsight());
      }
    }
  }, [isAIMode, dataHistory.length, generateRuleBasedInsight]);

  // AI 모드에서 자동 갱신 (60초마다, 데이터 충분할 때)
  useEffect(() => {
    if (!isAIMode) return;

    autoTimerRef.current = setInterval(() => {
      const now = Date.now();
      if (
        now - lastAutoFetchRef.current >= 60_000 &&
        !isLoadingAI
      ) {
        fetchAIInsightRef.current?.();
      }
    }, 10_000); // 10초마다 체크, 60초 이상 지났으면 실행

    return () => clearInterval(autoTimerRef.current);
  }, [isAIMode, isLoadingAI]);

  // ── TTS: 인사이트 음성으로 읽기 ──────────────────────
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;

    // 이미 읽고 있으면 중지
    window.speechSynthesis.cancel();

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // 한국어 음성 선택 시도
    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find(v => v.lang.startsWith('ko'));
    if (koVoice) utterance.voice = koVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  // 컴포넌트 언마운트 시 TTS 및 fetch 정리
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  const hasTTS = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const hasEnoughData = dataHistory.length > 10;
  const displayText = insightText || (hasEnoughData
    ? (isAIMode ? 'AI 분석 버튼을 눌러 인사이트를 받아보세요.' : generateRuleBasedInsight())
    : 'Pico에서 데이터가 수집되면 AI가 센서 데이터를 분석하여 인사이트를 제공합니다.');

  return (
    <div className="rounded-2xl border border-border/50 bg-bg-surface/50 p-4 flex-shrink-0">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-3">
        {isAIMode ? (
          <Brain size={16} className="text-purple" />
        ) : (
          <Sparkles size={16} className="text-purple" />
        )}
        <h2 className="text-sm font-semibold text-text-primary">
          {isAIMode ? 'AI 인사이트' : '기본 분석'}
        </h2>

        {/* 모드 토글 */}
        <button
          onClick={() => setIsAIMode(!isAIMode)}
          className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium text-text-muted hover:text-text-secondary transition-colors"
          title={isAIMode ? '기본 분석으로 전환' : 'AI 분석으로 전환'}
        >
          {isAIMode ? (
            <ToggleRight size={16} className="text-purple" />
          ) : (
            <ToggleLeft size={16} className="text-text-muted" />
          )}
          {isAIMode ? 'AI' : '기본'}
        </button>

        {/* AI 분석 버튼 (AI 모드일 때만) */}
        {isAIMode && (
          <button
            onClick={fetchAIInsight}
            disabled={isLoadingAI || !hasEnoughData}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-purple/10 text-purple border border-purple/30 hover:bg-purple/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="AI 분석 실행"
          >
            {isLoadingAI ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <RefreshCw size={12} />
            )}
            AI 분석
          </button>
        )}

        {/* TTS 버튼 */}
        {hasTTS && insightText && (
          <button
            onClick={() => isSpeaking ? stopSpeaking() : speak(insightText)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              isSpeaking
                ? 'bg-orange/10 text-orange border border-orange/30 hover:bg-orange/20'
                : 'bg-bg-primary text-text-muted border border-border hover:text-cyan hover:border-cyan/30'
            }`}
            title={isSpeaking ? '음성 중지' : '음성으로 듣기'}
          >
            {isSpeaking ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
        )}
      </div>

      {/* 인사이트 내용 */}
      <div className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap">
        {isLoadingAI && !insightText ? (
          <div className="flex items-center gap-2 text-purple">
            <Loader2 size={14} className="animate-spin" />
            <span>AI가 데이터를 분석하고 있습니다...</span>
          </div>
        ) : (
          displayText
        )}
      </div>

      {/* 에러 메시지 */}
      {aiError && (
        <div className="mt-2 text-xs text-red/70">
          API 연결 오류 — 기본 분석으로 전환됨
        </div>
      )}

      {/* TTS 말하는 중 표시 */}
      {isSpeaking && (
        <div className="mt-2 flex items-center gap-2 text-xs text-orange">
          <div className="flex gap-0.5">
            <span className="inline-block w-1 h-3 bg-orange rounded-full exhibition-voice-bar" style={{ animationDelay: '0ms' }} />
            <span className="inline-block w-1 h-3 bg-orange rounded-full exhibition-voice-bar" style={{ animationDelay: '150ms' }} />
            <span className="inline-block w-1 h-3 bg-orange rounded-full exhibition-voice-bar" style={{ animationDelay: '300ms' }} />
            <span className="inline-block w-1 h-3 bg-orange rounded-full exhibition-voice-bar" style={{ animationDelay: '150ms' }} />
          </div>
          음성 출력 중...
        </div>
      )}
    </div>
  );
});

export default AIInsightPanel;
