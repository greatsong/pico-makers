import { create } from 'zustand';
import { getSensorsForLesson, getCourseBLevel } from '../data/curriculum';
import useChatStore from './chatStore';

const useAppStore = create((set, get) => ({
  // 프로젝트 모드: 'curriculum' | 'free' | 'hackathon' | 'courseB' | 'exhibition'
  mode: 'curriculum',

  // 현재 차시 (1~15, Course A)
  selectedLesson: 1,

  // Course B 레벨 (1~4)
  courseBLevel: 1,

  // Course B 선택된 예제 인덱스 (null = 미선택)
  courseBExample: null,

  // 활성 센서 목록 (배선도에 표시)
  activeSensors: ['DHT20'],

  // 연결 모드
  shieldMode: true,

  // 우측 패널 탭: 'wiring' | 'pinmap' | 'code' | 'tips'
  rightTab: 'wiring',

  // 모바일 패널: 'chat' | 'tools'
  mobilePanel: 'chat',

  // 모드 변경 → 센서 + 환영 메시지 자동 업데이트
  setMode: (mode) => {
    const state = get();
    const updates = { mode };

    if (mode === 'exhibition') {
      // 전시 모드 — 센서 변경 없이 모드만 전환
      set(updates);
      useChatStore.getState().resetForMode(mode, {});
      return;
    }

    if (mode === 'courseB') {
      // Course B 첫 번째 예제의 센서를 기본 로드
      const levelData = getCourseBLevel(state.courseBLevel);
      if (levelData?.examples?.[0]?.sensors) {
        updates.activeSensors = levelData.examples[0].sensors;
        updates.courseBExample = 0;
      }
      updates.rightTab = 'tips'; // 팁 탭으로 자동 전환
    } else if (mode === 'curriculum') {
      const sensors = getSensorsForLesson(state.selectedLesson);
      if (sensors.length > 0) updates.activeSensors = sensors;
      updates.courseBExample = null;
    } else {
      updates.courseBExample = null;
    }

    set(updates);

    // 환영 메시지 교체
    useChatStore.getState().resetForMode(mode, {
      courseBLevel: state.courseBLevel,
      selectedLesson: state.selectedLesson,
    });
  },

  // 차시 변경 → 해당 차시 센서 자동 로드
  setLesson: (num) => {
    const sensors = getSensorsForLesson(num);
    set({
      selectedLesson: num,
      activeSensors: sensors.length > 0 ? sensors : get().activeSensors,
    });
  },

  // Course B 레벨 변경 → 센서 + 환영 메시지 자동 업데이트
  setCourseBLevel: (level) => {
    const levelData = getCourseBLevel(level);
    const updates = { courseBLevel: level, courseBExample: null };

    if (levelData?.examples?.[0]?.sensors) {
      updates.activeSensors = levelData.examples[0].sensors;
      updates.courseBExample = 0;
    }

    set(updates);

    // 환영 메시지 교체
    useChatStore.getState().resetForMode('courseB', { courseBLevel: level });
  },

  // Course B 예제 선택
  setCourseBExample: (index) => set({ courseBExample: index }),

  // 센서 추가
  addActiveSensor: (sensorId) => set((s) => {
    if (s.activeSensors.includes(sensorId)) return s;
    return { activeSensors: [...s.activeSensors, sensorId] };
  }),

  // 센서 제거
  removeActiveSensor: (sensorId) => set((s) => ({
    activeSensors: s.activeSensors.filter(id => id !== sensorId),
  })),

  // 센서 목록 직접 설정
  setActiveSensors: (sensors) => set({ activeSensors: sensors }),

  // 연결 모드 토글
  toggleShieldMode: () => set((s) => ({ shieldMode: !s.shieldMode })),
  setShieldMode: (mode) => set({ shieldMode: mode }),

  // 패널 전환
  setRightTab: (tab) => set({ rightTab: tab }),
  setMobilePanel: (panel) => set({ mobilePanel: panel }),
}));

export default useAppStore;
