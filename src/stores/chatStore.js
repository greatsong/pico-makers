import { create } from 'zustand';

const WELCOME_MSG = {
  role: 'assistant',
  text: `**Pico Makers**에 오신 것을 환영합니다!

AI 피지컬 컴퓨팅 수업의 **AI 동반자**입니다.

**시작하기:**
- 상단에서 **차시를 선택**하면 해당 수업 맥락으로 도움을 드립니다
- 배선이 헷갈리면 우측 **배선 패널**을 확인하세요
- 에러가 나면 메시지를 **그대로 붙여넣기**하세요

지금 **1차시: 센서로 세상 읽기**부터 시작해볼까요?`,
  metadata: { lesson: 1, act: 'act1' },
};

const useChatStore = create((set, get) => ({
  messages: [WELCOME_MSG],
  isLoading: false,

  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),

  updateLastMessage: (text, metadata) => set((s) => {
    const msgs = [...s.messages];
    if (msgs.length > 0) {
      msgs[msgs.length - 1] = {
        ...msgs[msgs.length - 1],
        text,
        ...(metadata ? { metadata: { ...msgs[msgs.length - 1].metadata, ...metadata } } : {}),
      };
    }
    return { messages: msgs };
  }),

  setLoading: (loading) => set({ isLoading: loading }),

  clearChat: () => set({ messages: [WELCOME_MSG] }),

  getApiMessages: () => {
    return get().messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({
        role: m.role,
        content: m.text,
      }));
  },

  // 채팅 기록 내보내기 (바이브 코딩 로그용)
  exportChat: () => {
    const msgs = get().messages;
    const lines = [];
    const now = new Date();
    lines.push(`# 바이브 코딩 로그`);
    lines.push(`날짜: ${now.toLocaleDateString('ko-KR')} ${now.toLocaleTimeString('ko-KR')}`);
    lines.push('');

    let promptCount = 0;
    msgs.forEach((m) => {
      if (m.role === 'user') {
        promptCount++;
        lines.push(`## 프롬프트 #${promptCount}`);
        lines.push(m.text);
        lines.push('');
      } else if (m.role === 'assistant') {
        lines.push(`### AI 응답`);
        lines.push(m.text);
        lines.push('');
        lines.push('---');
        lines.push('');
      }
    });

    lines.push(`총 ${promptCount}개 프롬프트 사용`);

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vibe-coding-log-${now.toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  },
}));

export default useChatStore;
