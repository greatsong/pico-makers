import { create } from 'zustand';

function getWelcomeMsg(mode = 'curriculum', context = {}) {
  if (mode === 'courseB') {
    const levelNames = { 1: '탐험가', 2: '발명가', 3: '연구자', 4: '마스터' };
    const lv = context.courseBLevel || 1;
    return {
      role: 'assistant',
      text: `**Course B — Lv.${lv} ${levelNames[lv] || ''}** 모드입니다! 🚀

AI 피지컬 컴퓨팅 **프로젝트 도전** 과정에 오신 것을 환영합니다.

**시작하기:**
- 우측 **팁 탭**에서 **예시 프로젝트**를 선택하면 센서가 자동 로드됩니다
- **코드 탭**에서 교재와 동일한 기본 코드를 복사할 수 있어요
- 기본 코드를 실행해본 뒤, AI에게 **응용/확장**을 요청하세요
- 에러가 나면 메시지를 **그대로 붙여넣기**하세요

교재에서 프로젝트를 확인한 뒤, 도전해보세요!`,
      metadata: { mode: 'courseB', level: lv },
    };
  }

  if (mode === 'exhibition') {
    return {
      role: 'assistant',
      text: `**전시 모드**입니다!\n\nPico를 USB로 연결한 뒤 **"Pico 연결"** 버튼을 누르세요.\n\n실시간 데이터가 대시보드에 표시됩니다.`,
      metadata: { mode: 'exhibition' },
    };
  }

  if (mode === 'free') {
    return {
      role: 'assistant',
      text: `**자유 모드**입니다! ⚡

원하는 센서를 자유롭게 탐색하세요.

- 우측 **배선 패널**에서 센서를 추가하면 배선도가 표시됩니다
- **코드 탭**에서 선택한 센서의 예제 코드를 확인하세요
- 무엇이든 자유롭게 질문하세요!`,
      metadata: { mode: 'free' },
    };
  }

  if (mode === 'hackathon') {
    return {
      role: 'assistant',
      text: `**해커톤 모드**입니다! 🏆

AI는 **방향만 제시**하고, 코드는 직접 작성합니다.

- 프로젝트 아이디어를 먼저 구상해보세요
- AI에게 "이런 프로젝트를 만들고 싶어요"라고 말해보세요
- 힌트는 주지만, 완성 코드는 직접 도전!`,
      metadata: { mode: 'hackathon' },
    };
  }

  // curriculum (기본)
  const lessonNum = context.selectedLesson || 1;
  return {
    role: 'assistant',
    text: `**Pico Makers**에 오신 것을 환영합니다!

AI 피지컬 컴퓨팅 수업의 **AI 동반자**입니다.

**시작하기:**
- 상단에서 **차시를 선택**하면 해당 수업 맥락으로 도움을 드립니다
- 배선이 헷갈리면 우측 **배선 패널**을 확인하세요
- 에러가 나면 메시지를 **그대로 붙여넣기**하세요

지금 **${lessonNum}차시**부터 시작해볼까요?`,
    metadata: { lesson: lessonNum, act: 'act1' },
  };
}

const useChatStore = create((set, get) => ({
  messages: [getWelcomeMsg()],
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

  clearChat: (mode, context) => set({ messages: [getWelcomeMsg(mode, context)] }),

  // 모드 변경 시 환영 메시지 교체
  resetForMode: (mode, context) => set({ messages: [getWelcomeMsg(mode, context)] }),

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
