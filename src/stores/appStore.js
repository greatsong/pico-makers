import { create } from 'zustand';
import { getSensorsForLesson } from '../data/curriculum';

const useAppStore = create((set, get) => ({
  // 프로젝트 모드: 'curriculum' | 'free' | 'hackathon' | 'courseB'
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

  // 모드 변경
  setMode: (mode) => set({ mode }),

  // 차시 변경 → 해당 차시 센서 자동 로드
  setLesson: (num) => {
    const sensors = getSensorsForLesson(num);
    set({
      selectedLesson: num,
      activeSensors: sensors.length > 0 ? sensors : get().activeSensors,
    });
  },

  // Course B 레벨 변경
  setCourseBLevel: (level) => set({ courseBLevel: level, courseBExample: null }),

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
