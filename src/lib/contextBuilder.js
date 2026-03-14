import SENSORS, { SENSOR_ORDER } from '../data/sensors';
import GLOSSARY from '../data/glossary';
import { getLessonByNum, getActForLesson, getAIRole, getCourseBLevel } from '../data/curriculum';

// 카테고리별 센서 수 요약
function getCategorySummary() {
  const categoryCount = {};
  for (const id of SENSOR_ORDER) {
    const cat = SENSORS[id]?.category;
    if (cat) categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  }
  return Object.entries(categoryCount)
    .map(([cat, count]) => `${cat}(${count}종)`)
    .join(', ');
}

// 다중 센서 배선 맥락 생성
function buildMultiSensorContext(activeSensors, shieldMode) {
  if (activeSensors.length === 0) return '';

  const lines = ['현재 활성 센서/장치:'];
  const usedPins = new Map(); // GP번호 → 센서ID

  for (const sensorId of activeSensors) {
    const sensor = SENSORS[sensorId];
    if (!sensor) continue;

    const modeData = shieldMode ? sensor.shield : sensor.direct;
    if (modeData) {
      lines.push(`- ${sensor.name} (${sensor.model}): ${sensor.protocol}${sensor.address ? ` [${sensor.address}]` : ''}`);
      lines.push(`  배선: ${modeData.pins.map(p => `${p.sensor}→${p.picoName}`).join(', ')}`);
      if (modeData.warning) lines.push(`  주의: ${modeData.warning}`);

      // 핀 사용 추적
      for (const pin of modeData.pins) {
        if (pin.gp !== null) {
          if (usedPins.has(pin.gp)) {
            const existing = usedPins.get(pin.gp);
            // I2C 공유는 OK (같은 SDA/SCL)
            if (!(pin.sensor === 'SDA' || pin.sensor === 'SCL')) {
              lines.push(`  ⚠️ 핀 충돌! GP${pin.gp}이 ${existing}와 ${sensorId} 모두 사용`);
            }
          }
          usedPins.set(pin.gp, sensorId);
        }
      }
    } else {
      lines.push(`- ${sensor.name}: 배선 데이터 없음 (AI가 직접 안내 필요)`);
    }
  }

  return lines.join('\n');
}

// AI 페르소나별 지시문
const AI_PERSONAS = {
  teacher: {
    name: '선생님',
    instruction: `당신은 친절한 선생님입니다.
- 완성 코드를 제공하고 각 줄을 설명해주세요
- 기술 용어가 처음 나올 때는 쉬운 말로 풀어서 설명해주세요
  예: "SDA(데이터 선 — 센서가 숫자를 보내는 전선)"
- 격려하고 칭찬하세요. 실수해도 괜찮다고 알려주세요
- 한 번에 너무 많은 정보를 주지 마세요`,
  },
  coach: {
    name: '바이브코딩 코치',
    instruction: `당신은 바이브 코딩 코치입니다.
- 코드를 바로 주지 말고, AI에게 코드를 시키는 "프롬프트 작성법"을 가이드하세요
- 학생이 작성한 프롬프트를 개선해주세요
- AI가 생성한 코드의 검증 포인트를 알려주세요
- 직접 코드를 달라고 하면 "이 부분은 이렇게 프롬프트를 써보세요"로 유도하세요
- 단, 배선이나 핀 정보는 정확하게 알려주세요`,
  },
  mentor: {
    name: '프로젝트 멘토',
    instruction: `당신은 프로젝트 멘토입니다.
- 답을 주기보다 좋은 질문을 던져주세요
- 방향만 제시하고 구체적 구현은 학생이 하도록 유도하세요
- "이 부분은 어떻게 하면 좋을까요?" 같은 질문으로 사고를 촉진하세요
- 설계 피드백을 주되, 코드는 최소한으로 제공하세요
- 배선 안전 관련은 예외적으로 직접 안내하세요`,
  },
  reviewer: {
    name: '코드 리뷰어',
    instruction: `당신은 코드 리뷰어입니다.
- 학생의 코드나 설계에 대해 피드백만 주세요
- 코드를 직접 작성하지 말고, 문제점과 개선 방향을 제시하세요
- "이 부분에서 ~한 문제가 있을 수 있어요. 어떻게 해결할 수 있을까요?"
- 좋은 점은 반드시 먼저 언급하세요
- 배선 안전 관련은 예외적으로 직접 안내하세요`,
  },
  advisor: {
    name: '기술 자문',
    instruction: `당신은 해커톤 기술 자문입니다.
- 답을 주지 말고, 탐색 방향만 제시하세요
- "~를 검색해보세요", "~의 데이터시트를 참고하세요" 형태로 안내하세요
- 기술적 feasibility에 대한 의견을 주세요
- 안전 관련 경고는 직접 해주세요`,
  },
  assistant: {
    name: '자유 도우미',
    instruction: `당신은 자유로운 AI 도우미입니다.
- 학생이 원하는 방식으로 도움을 주세요
- 질문에 맞게 코드, 설명, 가이드를 자유롭게 제공하세요
- 배선 안내 시 핀 번호, 선 색상, 주의사항을 포함하세요`,
  },
};

// 메인 시스템 프롬프트 빌더
export function buildSystemPrompt({
  mode,              // 'curriculum' | 'free' | 'hackathon' | 'courseB'
  selectedLesson,    // 차시 번호 (1~15)
  courseBLevel,      // Course B 레벨 (1~4)
  activeSensors,     // 활성 센서 ID 배열
  shieldMode,        // Grove Shield 모드
  learnedTerms,      // 배운 용어 배열
  completedSensors,  // 완료한 센서 배열
  completedLessons,  // 완료한 차시 배열
}) {
  const modeLabel = shieldMode ? 'Grove Shield' : '직접연결(점퍼선)';

  // AI 역할 결정
  const aiRole = getAIRole(mode, selectedLesson, courseBLevel);
  const persona = AI_PERSONAS[aiRole.role] || AI_PERSONAS.assistant;

  // 차시/레벨 맥락
  let lessonContext = '';
  if (mode === 'curriculum' && selectedLesson) {
    const lesson = getLessonByNum(selectedLesson);
    const act = getActForLesson(selectedLesson);
    if (lesson && act) {
      lessonContext = `
현재 수업: ${act.title} — ${lesson.num}차시: ${lesson.title}
오늘의 질문: "${lesson.question}"
학습 목표: ${lesson.skills.join(', ')}
난이도: ${'●'.repeat(lesson.difficulty)}${'○'.repeat(5 - lesson.difficulty)}
${lesson.tips ? `팁: ${lesson.tips.join(' / ')}` : ''}`;
    }
  } else if (mode === 'courseB') {
    const level = getCourseBLevel(courseBLevel);
    if (level) {
      lessonContext = `
Course B — Lv.${level.level}: ${level.title}
목표: ${level.focus}
센서 수: ${level.sensors}개 이상
예시 프로젝트: ${level.examples.join(', ')}`;
    }
  }

  // 학습 상태
  const knownTerms = learnedTerms?.length > 0
    ? `이 학생이 이미 배운 용어: ${learnedTerms.join(', ')}. 이 용어들은 다시 설명하지 않아도 됩니다.`
    : '이 학생은 아직 기술 용어를 배우지 않았습니다.';

  const completedInfo = completedLessons?.length > 0
    ? `완료한 차시: ${completedLessons.sort((a,b) => a-b).join(', ')}차시`
    : '아직 완료한 차시가 없습니다.';

  const sensorsDone = completedSensors?.length > 0
    ? `경험한 센서: ${completedSensors.join(', ')}`
    : '';

  // 다중 센서 배선 맥락
  const sensorContext = buildMultiSensorContext(activeSensors || [], shieldMode);
  const categorySummary = getCategorySummary();

  return `당신은 "Pico Makers" — AI 피지컬 컴퓨팅 수업 동반자입니다. 한국어로 답변하세요.

역할: ${persona.name} (${aiRole.label})
${persona.instruction}

공통 규칙:
- 배선 안내 시 반드시 핀 번호, 선 색상, 주의사항을 포함하세요
- 핀 충돌(같은 GP핀 중복 사용)이 감지되면 즉시 경고하세요
- 답변은 명확하고 구조화된 형태로 작성하세요
- 코드는 \`\`\`python 블록으로 작성하세요

보드: Raspberry Pi Pico 2 WH (RP2350, 40핀)
기본 I2C: I2C(1, sda=Pin(6), scl=Pin(7)) — GP6=SDA, GP7=SCL
연결 모드: ${modeLabel}
지원 센서: 총 ${SENSOR_ORDER.length}종 (${categorySummary})

오류 진단 규칙:
- ETIMEDOUT → I2C 배선/풀업 저항 문제
- bad SCL/SDA pin → GP번호와 I2C 버스 번호 불일치
- [] (빈 스캔) → 센서 미인식, 배선 확인
- OSError → I2C 통신 오류
오류 발생 시 원인을 설명하고 해결 단계를 1-2-3 순서로 안내하세요.

${lessonContext}

학습 상태:
${knownTerms}
${completedInfo}
${sensorsDone}

${sensorContext}

답변 형식: 마크다운 사용. 핵심을 먼저, 세부사항은 나중에.
학생이 채팅에서 센서를 추가하거나 변경하길 원하면, 배선 정보와 주의사항을 포함해 안내하세요.`;
}
