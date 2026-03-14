import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Image, Loader2, Download } from 'lucide-react';
import useChatStore from '../../stores/chatStore';
import useAppStore from '../../stores/appStore';
import useProgressStore from '../../stores/progressStore';
import { callClaudeStream } from '../../lib/api';
import { buildSystemPrompt } from '../../lib/contextBuilder';
import { diagnoseError } from '../../data/errorPatterns';
import ChatMessage from './ChatMessage';
import SuggestedActions from './SuggestedActions';
import ErrorDiagnosis from './ErrorDiagnosis';

export default function ChatPanel() {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const messages = useChatStore(s => s.messages);
  const isLoading = useChatStore(s => s.isLoading);
  const addMessage = useChatStore(s => s.addMessage);
  const updateLastMessage = useChatStore(s => s.updateLastMessage);
  const setLoading = useChatStore(s => s.setLoading);
  const clearChat = useChatStore(s => s.clearChat);
  const exportChat = useChatStore(s => s.exportChat);
  const getApiMessages = useChatStore(s => s.getApiMessages);

  const mode = useAppStore(s => s.mode);
  const selectedLesson = useAppStore(s => s.selectedLesson);
  const courseBLevel = useAppStore(s => s.courseBLevel);
  const activeSensors = useAppStore(s => s.activeSensors);
  const shieldMode = useAppStore(s => s.shieldMode);
  const addActiveSensor = useAppStore(s => s.addActiveSensor);

  const learnedTerms = useProgressStore(s => s.learnedTerms);
  const completedSensors = useProgressStore(s => s.completedSensors);
  const completedLessons = useProgressStore(s => s.completedLessons);

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 에러 진단
  const errorDiag = input.length > 10 ? diagnoseError(input) : null;

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    setInput('');
    addMessage({ role: 'user', text });
    addMessage({ role: 'assistant', text: '' });
    setLoading(true);

    try {
      const systemPrompt = buildSystemPrompt({
        mode,
        selectedLesson,
        courseBLevel,
        activeSensors,
        shieldMode,
        learnedTerms,
        completedSensors,
        completedLessons,
      });

      const apiMessages = getApiMessages();
      // 마지막 빈 assistant 메시지 제거 후 API 호출
      const cleanMessages = apiMessages.slice(0, -1);

      const result = await callClaudeStream(
        cleanMessages,
        systemPrompt,
        (chunk) => updateLastMessage(chunk),
      );

      updateLastMessage(result);

      // AI 응답에서 센서 추가 감지
      parseSensorAdditions(result);
    } catch (err) {
      updateLastMessage(`오류가 발생했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  // AI 응답에서 센서 관련 키워드 감지하여 자동 추가
  function parseSensorAdditions(text) {
    const sensorMentions = {
      'DHT20': /DHT20|온습도\s*센서/i,
      'SCD41': /SCD41|CO2\s*센서/i,
      'LIGHT': /빛\s*센서|조도\s*센서|light\s*sensor/i,
      'OLED': /OLED|디스플레이|SSD1306/i,
      'ULTRASONIC': /초음파\s*센서|ultrasonic/i,
      'BUZZER': /부저|buzzer/i,
      'PULSE': /심박\s*센서|pulse\s*sensor/i,
      'LED': /LED\s*(?!bar)/i,
      'LED_BAR': /LED\s*바|LED\s*bar/i,
      'BUTTON': /버튼|button/i,
      'MOISTURE': /토양\s*수분|moisture/i,
      'SOUND': /소리\s*센서|sound\s*sensor/i,
    };

    // "연결", "추가", "배선" 키워드와 함께 언급된 센서만 감지
    const actionKeywords = /연결|추가|배선|사용|쓰|꽂/;
    if (!actionKeywords.test(text)) return;

    for (const [sensorId, pattern] of Object.entries(sensorMentions)) {
      if (pattern.test(text) && !activeSensors.includes(sensorId)) {
        // 차시에서 사용하는 센서이거나 AI가 언급한 경우
        addActiveSensor(sensorId);
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSuggestion(text) {
    setInput(text);
    textareaRef.current?.focus();
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} isLatest={i === messages.length - 1} />
        ))}
        {isLoading && messages[messages.length - 1]?.text === '' && (
          <div className="flex items-center gap-2 text-text-muted text-sm px-3">
            <Loader2 size={14} className="animate-spin text-cyan" />
            생각하는 중...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 에러 진단 프리뷰 */}
      {errorDiag && (
        <div className="px-4 pb-2">
          <ErrorDiagnosis error={errorDiag} />
        </div>
      )}

      {/* 추천 질문 */}
      {messages.length <= 2 && !isLoading && (
        <SuggestedActions onSelect={handleSuggestion} />
      )}

      {/* 입력 영역 */}
      <div className="border-t border-border p-3 bg-bg-surface">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="질문을 입력하세요... (에러 메시지를 그대로 붙여넣기해도 돼요)"
            rows={1}
            className="flex-1 bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-cyan/50 transition-colors"
            style={{ maxHeight: '120px' }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
          />
          <div className="flex gap-1.5">
            <button
              onClick={() => clearChat(mode, { courseBLevel, selectedLesson })}
              className="p-2.5 rounded-xl text-text-muted hover:text-red hover:bg-red/10 transition-colors"
              title="대화 초기화"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={exportChat}
              className="p-2.5 rounded-xl text-text-muted hover:text-cyan hover:bg-cyan/10 transition-colors"
              title="바이브 코딩 로그 내보내기"
            >
              <Download size={18} />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-cyan text-bg-primary font-medium hover:bg-cyan-dim transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
