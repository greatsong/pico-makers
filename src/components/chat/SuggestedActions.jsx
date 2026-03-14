import { MessageCircleQuestion } from 'lucide-react';
import useAppStore from '../../stores/appStore';
import { getLessonByNum, getCourseBLevel } from '../../data/curriculum';

export default function SuggestedActions({ onSelect }) {
  const mode = useAppStore(s => s.mode);
  const selectedLesson = useAppStore(s => s.selectedLesson);
  const courseBLevel = useAppStore(s => s.courseBLevel);

  let questions = [];

  if (mode === 'curriculum') {
    const lesson = getLessonByNum(selectedLesson);
    questions = lesson?.suggestedQuestions || [];
  } else if (mode === 'courseB') {
    const level = getCourseBLevel(courseBLevel);
    questions = level?.suggestedQuestions || [];
  } else if (mode === 'free') {
    questions = [
      '사용할 수 있는 센서 목록을 보여주세요',
      'DHT20 온습도 센서 배선을 알려주세요',
      '초음파 센서로 거리 측정하는 코드를 알려주세요',
    ];
  } else {
    questions = [
      '프로젝트 아이디어를 브레인스토밍하고 싶어요',
      '사용 가능한 센서 조합을 추천해주세요',
      '프로젝트 설계 방법을 알려주세요',
    ];
  }

  if (questions.length === 0) return null;

  return (
    <div className="px-4 pb-2">
      <div className="flex items-center gap-1.5 text-text-muted text-xs mb-2">
        <MessageCircleQuestion size={12} />
        추천 질문
      </div>
      <div className="flex flex-wrap gap-1.5">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="px-3 py-1.5 rounded-full text-xs text-text-secondary bg-bg-surface border border-border hover:border-cyan/50 hover:text-cyan transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
