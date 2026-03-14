import { create } from 'zustand';

// localStorage 키
const STORAGE_KEY = 'pico-makers-progress';

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedLessons: state.completedLessons,
      courseBUnlocked: state.courseBUnlocked,
      learnedTerms: state.learnedTerms,
      completedSensors: state.completedSensors,
      lastLesson: state.lastLesson,
    }));
  } catch { /* 무시 */ }
}

const saved = loadProgress();

const useProgressStore = create((set, get) => ({
  // 완료한 차시 번호 배열
  completedLessons: saved?.completedLessons || [],

  // Course B 해금된 레벨
  courseBUnlocked: saved?.courseBUnlocked || 0,

  // 배운 용어 목록
  learnedTerms: saved?.learnedTerms || [],

  // 완료한 센서 ID 목록
  completedSensors: saved?.completedSensors || [],

  // 마지막 학습 차시
  lastLesson: saved?.lastLesson || null,

  // 차시 완료 표시
  completeLesson: (num) => {
    set((s) => {
      const newState = {
        completedLessons: s.completedLessons.includes(num)
          ? s.completedLessons
          : [...s.completedLessons, num],
        lastLesson: num,
      };
      // Act 3 완료 시 Course B 해금
      if (num === 15 && !s.completedLessons.includes(15)) {
        newState.courseBUnlocked = Math.max(s.courseBUnlocked, 1);
      }
      setTimeout(() => saveProgress(get()), 0);
      return newState;
    });
  },

  // Course B 레벨 해금
  unlockCourseB: (level) => {
    set((s) => {
      const newState = { courseBUnlocked: Math.max(s.courseBUnlocked, level) };
      setTimeout(() => saveProgress(get()), 0);
      return newState;
    });
  },

  // 용어 학습 기록
  addLearnedTerm: (term) => {
    set((s) => {
      if (s.learnedTerms.includes(term)) return s;
      const newState = { learnedTerms: [...s.learnedTerms, term] };
      setTimeout(() => saveProgress(get()), 0);
      return newState;
    });
  },

  // 센서 완료 기록
  completeSensor: (sensorId) => {
    set((s) => {
      if (s.completedSensors.includes(sensorId)) return s;
      const newState = { completedSensors: [...s.completedSensors, sensorId] };
      setTimeout(() => saveProgress(get()), 0);
      return newState;
    });
  },

  // 진행률 계산 (%)
  getProgress: () => {
    const { completedLessons } = get();
    return Math.round((completedLessons.length / 15) * 100);
  },

  // Act별 진행률
  getActProgress: (act) => {
    const { completedLessons } = get();
    const ranges = { act1: [1,4], act2: [5,10], act3: [11,15] };
    const [start, end] = ranges[act] || [0,0];
    const total = end - start + 1;
    const done = completedLessons.filter(n => n >= start && n <= end).length;
    return { done, total, percent: Math.round((done / total) * 100) };
  },

  // 초기화
  resetProgress: () => {
    set({
      completedLessons: [],
      courseBUnlocked: 0,
      learnedTerms: [],
      completedSensors: [],
      lastLesson: null,
    });
    localStorage.removeItem(STORAGE_KEY);
  },
}));

export default useProgressStore;
