import { CheckCircle2, Circle } from 'lucide-react';
import useProgressStore from '../../stores/progressStore';
import useAppStore from '../../stores/appStore';
import { getCourseBLevel } from '../../data/curriculum';

export default function ProgressBar() {
  const completedLessons = useProgressStore(s => s.completedLessons);
  const completeLesson = useProgressStore(s => s.completeLesson);
  const mode = useAppStore(s => s.mode);
  const selectedLesson = useAppStore(s => s.selectedLesson);
  const courseBLevel = useAppStore(s => s.courseBLevel);
  const courseBExample = useAppStore(s => s.courseBExample);

  if (mode === 'curriculum') {
    return <CourseAProgressBar
      completedLessons={completedLessons}
      completeLesson={completeLesson}
      selectedLesson={selectedLesson}
    />;
  }

  if (mode === 'courseB') {
    return <CourseBProgressBar
      courseBLevel={courseBLevel}
      courseBExample={courseBExample}
    />;
  }

  return null;
}

/* ── Course A 진행 바 ── */
function CourseAProgressBar({ completedLessons, completeLesson, selectedLesson }) {
  const act1 = { done: completedLessons.filter(n => n >= 1 && n <= 4).length, total: 4 };
  const act2 = { done: completedLessons.filter(n => n >= 5 && n <= 10).length, total: 6 };
  const act3 = { done: completedLessons.filter(n => n >= 11 && n <= 15).length, total: 5 };

  const isCurrentCompleted = completedLessons.includes(selectedLesson);

  return (
    <div className="hidden md:flex bg-bg-surface border-t border-border px-4 py-2 items-center gap-4 text-xs">
      <ActSegment label="Act 1" done={act1.done} total={act1.total} color="bg-cyan" />
      <div className="text-text-muted">→</div>
      <ActSegment label="Act 2" done={act2.done} total={act2.total} color="bg-orange" />
      <div className="text-text-muted">→</div>
      <ActSegment label="Act 3" done={act3.done} total={act3.total} color="bg-purple" />

      {/* 현재 차시 완료 토글 */}
      <button
        onClick={() => completeLesson(selectedLesson)}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all whitespace-nowrap ${
          isCurrentCompleted
            ? 'border-green/50 text-green bg-green/10'
            : 'border-border text-text-muted hover:border-cyan/50 hover:text-cyan'
        }`}
      >
        {isCurrentCompleted
          ? <CheckCircle2 size={12} />
          : <Circle size={12} />
        }
        <span className="font-medium">{selectedLesson}차시</span>
        <span>{isCurrentCompleted ? '완료' : '완료하기'}</span>
      </button>

      <div className="ml-auto text-text-muted font-mono">
        {completedLessons.length}/15 완료
      </div>
    </div>
  );
}

/* ── Course B 진행 바 ── */
function CourseBProgressBar({ courseBLevel, courseBExample }) {
  const LEVEL_NAMES = { 1: '탐험가', 2: '발명가', 3: '연구자', 4: '마스터' };
  const LEVEL_COLORS = { 1: 'bg-cyan', 2: 'bg-orange', 3: 'bg-purple', 4: 'bg-pink' };

  return (
    <div className="hidden md:flex bg-bg-surface border-t border-border px-4 py-2 items-center gap-4 text-xs">
      {[1, 2, 3, 4].map((lv, idx) => {
        const levelData = getCourseBLevel(lv);
        const projectCount = levelData?.examples?.length || 3;
        const isCurrentLevel = courseBLevel === lv;
        return (
          <div key={lv} className="contents">
            {idx > 0 && <div className="text-text-muted">→</div>}
            <div className="flex items-center gap-2 flex-1">
              <div className="text-text-secondary whitespace-nowrap">
                <span className={`font-medium ${isCurrentLevel ? 'text-text-primary' : 'text-text-secondary'}`}>
                  Lv.{lv}
                </span>
                <span className="text-text-muted ml-1 hidden lg:inline">{LEVEL_NAMES[lv]}</span>
              </div>
              <div className="flex-1 h-1.5 bg-bg-primary rounded-full overflow-hidden">
                <div
                  className={`h-full ${LEVEL_COLORS[lv]} rounded-full transition-all duration-500`}
                  style={{ width: isCurrentLevel ? `${((courseBExample !== null ? courseBExample + 1 : 0) / projectCount) * 100}%` : '0%' }}
                />
              </div>
              <span className="text-text-muted font-mono w-8 text-right">
                {isCurrentLevel && courseBExample !== null ? `${courseBExample + 1}/${projectCount}` : `0/${projectCount}`}
              </span>
            </div>
          </div>
        );
      })}

      {/* 현재 레벨 표시 */}
      <div className="ml-auto text-text-muted font-mono whitespace-nowrap">
        Lv.{courseBLevel} {LEVEL_NAMES[courseBLevel]}
      </div>
    </div>
  );
}

function ActSegment({ label, subtitle, done, total, color }) {
  const percent = total > 0 ? (done / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="text-text-secondary whitespace-nowrap">
        <span className="font-medium text-text-primary">{label}</span>
        <span className="text-text-muted ml-1 hidden lg:inline">{subtitle}</span>
      </div>
      <div className="flex-1 h-1.5 bg-bg-primary rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-text-muted font-mono w-8 text-right">{done}/{total}</span>
    </div>
  );
}
