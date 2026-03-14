import { useState } from 'react';
import { ChevronDown, Zap, BookOpen, Trophy, Rocket, Shield, Plug, Monitor } from 'lucide-react';
import useAppStore from '../../stores/appStore';
import useProgressStore from '../../stores/progressStore';
import { ALL_LESSONS, CURRICULUM, getLessonByNum, getActForLesson } from '../../data/curriculum';

const MODE_OPTIONS = [
  { id: 'curriculum', label: '교재 연동', icon: BookOpen, color: 'text-cyan' },
  { id: 'free', label: '자유 모드', icon: Zap, color: 'text-green' },
  { id: 'courseB', label: 'Course B', icon: Trophy, color: 'text-orange' },
  { id: 'hackathon', label: '해커톤', icon: Rocket, color: 'text-purple' },
  { id: 'exhibition', label: '전시', icon: Monitor, color: 'text-pink' },
];

export default function LessonHeader() {
  const [showLessonPicker, setShowLessonPicker] = useState(false);
  const [showModePicker, setShowModePicker] = useState(false);
  const mode = useAppStore(s => s.mode);
  const setMode = useAppStore(s => s.setMode);
  const selectedLesson = useAppStore(s => s.selectedLesson);
  const setLesson = useAppStore(s => s.setLesson);
  const courseBLevel = useAppStore(s => s.courseBLevel);
  const setCourseBLevel = useAppStore(s => s.setCourseBLevel);
  const shieldMode = useAppStore(s => s.shieldMode);
  const toggleShieldMode = useAppStore(s => s.toggleShieldMode);
  const completedLessons = useProgressStore(s => s.completedLessons);

  const currentLesson = getLessonByNum(selectedLesson);
  const currentAct = getActForLesson(selectedLesson);
  const currentMode = MODE_OPTIONS.find(m => m.id === mode);

  return (
    <header className="bg-bg-surface border-b border-border px-4 py-2.5 flex items-center gap-3 relative z-30">
      {/* 로고 */}
      <div className="flex items-center gap-2 mr-2">
        <div className="w-8 h-8 rounded-lg bg-cyan/20 flex items-center justify-center">
          <Zap size={18} className="text-cyan" />
        </div>
        <span className="font-bold text-sm hidden sm:block">
          <span className="text-cyan">Pico</span>
          <span className="text-orange"> Makers</span>
        </span>
      </div>

      {/* 모드 선택 */}
      <div className="relative">
        <button
          onClick={() => { setShowModePicker(!showModePicker); setShowLessonPicker(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:border-cyan/50 transition-colors ${currentMode?.color}`}
        >
          {currentMode && <currentMode.icon size={14} />}
          {currentMode?.label}
          <ChevronDown size={12} />
        </button>
        {showModePicker && (
          <div className="absolute top-full mt-1 left-0 bg-bg-elevated border border-border rounded-lg shadow-xl py-1 min-w-[140px]">
            {MODE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => { setMode(opt.id); setShowModePicker(false); }}
                className={`w-full px-3 py-2 flex items-center gap-2 text-xs hover:bg-bg-surface transition-colors ${
                  mode === opt.id ? opt.color : 'text-text-secondary'
                }`}
              >
                <opt.icon size={14} />
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 차시 선택 (교재 연동 모드) */}
      {mode === 'curriculum' && (
        <div className="relative flex-1 min-w-0">
          <button
            onClick={() => { setShowLessonPicker(!showLessonPicker); setShowModePicker(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-primary border border-border hover:border-cyan/50 transition-colors max-w-full"
          >
            <span className="text-cyan font-mono text-xs font-bold whitespace-nowrap">
              {selectedLesson}차시
            </span>
            <span className="text-sm truncate">{currentLesson?.title}</span>
            <ChevronDown size={12} className="text-text-secondary flex-shrink-0" />
          </button>

          {showLessonPicker && (
            <div className="absolute top-full mt-1 left-0 bg-bg-elevated border border-border rounded-lg shadow-xl py-1 w-[320px] max-h-[60vh] overflow-y-auto">
              {['act1', 'act2', 'act3'].map(actKey => {
                const act = CURRICULUM.courseA[actKey];
                return (
                  <div key={actKey}>
                    <div className="px-3 py-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider bg-bg-surface">
                      {act.title}
                    </div>
                    {act.lessons.map(lesson => {
                      const isCompleted = completedLessons.includes(lesson.num);
                      const isActive = selectedLesson === lesson.num;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => { setLesson(lesson.num); setShowLessonPicker(false); }}
                          className={`w-full px-3 py-2 flex items-center gap-2 text-xs transition-colors ${
                            isActive ? 'bg-cyan/10 text-cyan' : 'hover:bg-bg-surface text-text-primary'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCompleted ? 'bg-green text-bg-primary' : 'bg-bg-primary text-text-secondary border border-border'
                          }`}>
                            {isCompleted ? '✓' : lesson.num}
                          </span>
                          <span className="truncate">{lesson.title}</span>
                          <span className="ml-auto text-text-muted">
                            {'●'.repeat(lesson.difficulty)}{'○'.repeat(5 - lesson.difficulty)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Course B 레벨 선택 */}
      {mode === 'courseB' && (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map(lv => (
            <button
              key={lv}
              onClick={() => setCourseBLevel(lv)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                courseBLevel === lv
                  ? 'bg-orange/20 text-orange border border-orange/50'
                  : 'text-text-secondary hover:text-text-primary border border-border'
              }`}
            >
              Lv.{lv}
            </button>
          ))}
        </div>
      )}

      {/* 자유 모드 라벨 */}
      {mode === 'free' && (
        <span className="text-xs text-text-secondary">센서를 자유롭게 탐색하세요</span>
      )}

      {/* 해커톤 라벨 */}
      {mode === 'hackathon' && (
        <span className="text-xs text-text-secondary">AI는 방향만 제시합니다</span>
      )}

      {/* 전시 모드 라벨 */}
      {mode === 'exhibition' && (
        <span className="text-xs text-text-secondary">실시간 IoT 대시보드</span>
      )}

      {/* 우측: Shield 토글 */}
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={toggleShieldMode}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            shieldMode
              ? 'border-green/50 text-green bg-green/10'
              : 'border-orange/50 text-orange bg-orange/10'
          }`}
        >
          {shieldMode ? <Shield size={14} /> : <Plug size={14} />}
          <span className="hidden sm:inline">{shieldMode ? 'Shield' : '직접연결'}</span>
        </button>
      </div>

      {/* 클릭 바깥 닫기 */}
      {(showLessonPicker || showModePicker) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => { setShowLessonPicker(false); setShowModePicker(false); }}
        />
      )}
    </header>
  );
}
