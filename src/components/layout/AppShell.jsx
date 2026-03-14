import { useState } from 'react';
import { MessageSquare, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import useAppStore from '../../stores/appStore';
import LessonHeader from '../curriculum/LessonHeader';
import ChatPanel from '../chat/ChatPanel';
import RightPanel from './RightPanel';
import ProgressBar from '../curriculum/ProgressBar';

export default function AppShell() {
  const mobilePanel = useAppStore(s => s.mobilePanel);
  const setMobilePanel = useAppStore(s => s.setMobilePanel);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  return (
    <div className="h-dvh flex flex-col bg-bg-primary text-text-primary overflow-hidden">
      {/* 헤더 */}
      <LessonHeader />

      {/* 메인 콘텐츠 — 3패널 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 좌측: AI 채팅 */}
        <div className={`
          flex-1 min-w-0 flex flex-col
          ${mobilePanel === 'tools' ? 'hidden md:flex' : 'flex'}
        `}>
          <ChatPanel />
        </div>

        {/* 우측: 배선/코드/진행 */}
        <div className={`
          ${rightCollapsed ? 'w-0' : 'w-full md:w-[480px]'}
          transition-all duration-300 border-l border-border
          ${mobilePanel === 'chat' ? 'hidden md:flex' : 'flex'}
          flex-col relative overflow-hidden
        `}>
          {/* 접기/펼치기 버튼 */}
          <button
            onClick={() => setRightCollapsed(!rightCollapsed)}
            className="hidden md:flex absolute -left-3 top-4 z-10 w-6 h-6 bg-bg-surface border border-border rounded-full items-center justify-center text-text-secondary hover:text-cyan transition-colors"
          >
            {rightCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>

          {!rightCollapsed && <RightPanel />}
        </div>
      </div>

      {/* 하단: 진행 바 */}
      <ProgressBar />

      {/* 모바일 하단 탭 전환 */}
      <div className="md:hidden flex border-t border-border bg-bg-surface">
        <button
          onClick={() => setMobilePanel('chat')}
          className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
            mobilePanel === 'chat' ? 'text-cyan bg-bg-primary' : 'text-text-secondary'
          }`}
        >
          <MessageSquare size={18} />
          AI 채팅
        </button>
        <button
          onClick={() => setMobilePanel('tools')}
          className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
            mobilePanel === 'tools' ? 'text-cyan bg-bg-primary' : 'text-text-secondary'
          }`}
        >
          <Cpu size={18} />
          배선 & 코드
        </button>
      </div>
    </div>
  );
}
