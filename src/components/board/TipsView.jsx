import { useState } from 'react';
import { Lightbulb, AlertTriangle, BookOpen, CheckCircle, Cable, Zap, Info, ChevronDown } from 'lucide-react';
import useAppStore from '../../stores/appStore';
import { getLessonByNum, getActForLesson, getCourseBLevel } from '../../data/curriculum';
import { detectPinConflicts } from '../../lib/pinConflict';
import SENSORS from '../../data/sensors';

export default function TipsView() {
  const mode = useAppStore(s => s.mode);
  const selectedLesson = useAppStore(s => s.selectedLesson);
  const courseBLevel = useAppStore(s => s.courseBLevel);
  const activeSensors = useAppStore(s => s.activeSensors);
  const shieldMode = useAppStore(s => s.shieldMode);

  return (
    <div className="space-y-4">
      {/* 모드별 상단 팁 */}
      {mode === 'curriculum' && <LessonTips lessonNum={selectedLesson} />}
      {mode === 'courseB' && <CourseBTips level={courseBLevel} />}
      {mode !== 'curriculum' && mode !== 'courseB' && <GeneralTips />}

      {/* 센서 조합 팁 — 센서가 있으면 항상 표시 */}
      {activeSensors.length > 0 && (
        <SensorComboTips
          activeSensors={activeSensors}
          shieldMode={shieldMode}
        />
      )}
    </div>
  );
}

/* ── 센서 조합 팁 (새로 추가) ── */
function SensorComboTips({ activeSensors, shieldMode }) {
  const { conflicts, warnings } = detectPinConflicts(activeSensors, shieldMode);

  // 센서별 정보 수집
  const sensorInfos = activeSensors.map(id => {
    const sensor = SENSORS[id];
    if (!sensor) return null;
    const modeData = shieldMode ? sensor.shield : sensor.direct;
    return { sensor, modeData };
  }).filter(Boolean);

  // 프로토콜별 그룹
  const protocols = {};
  sensorInfos.forEach(({ sensor }) => {
    const p = sensor.protocol;
    if (!protocols[p]) protocols[p] = [];
    protocols[p].push(sensor);
  });

  // Grove 관련 정보
  const groveCount = sensorInfos.filter(({ sensor }) => sensor.grove).length;
  const nonGroveCount = sensorInfos.length - groveCount;

  return (
    <>
      {/* 핀 충돌 경고 */}
      {conflicts.length > 0 && (
        <div className="bg-red/10 border border-red/30 rounded-xl p-3 animate-pulse">
          <div className="flex items-center gap-1.5 text-xs text-red font-medium mb-2">
            <Zap size={12} />
            핀 충돌 감지!
          </div>
          <ul className="space-y-1">
            {conflicts.map((c, i) => (
              <li key={i} className="text-xs text-text-secondary">
                <span className="text-red font-mono">{c.pin}</span>을 {c.sensors.map(id => SENSORS[id]?.name).join(', ')}이(가) 동시에 사용합니다
              </li>
            ))}
          </ul>
        </div>
      )}
      {warnings.length > 0 && (
        <div className="bg-orange/10 border border-orange/30 rounded-xl p-3">
          <ul className="space-y-1">
            {warnings.map((w, i) => (
              <li key={i} className="text-xs text-orange flex gap-2">
                <AlertTriangle size={10} className="flex-shrink-0 mt-0.5" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 현재 센서 조합 요약 */}
      <div className="bg-bg-primary rounded-xl border border-border p-3">
        <div className="flex items-center gap-1.5 text-xs text-cyan font-medium mb-2">
          <Cable size={12} />
          현재 센서 조합 ({activeSensors.length}개)
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {sensorInfos.map(({ sensor }) => (
            <span key={sensor.id} className="px-2 py-0.5 bg-bg-surface rounded-full text-[10px] border border-border flex items-center gap-1">
              <span>{sensor.icon}</span>
              <span className="text-text-primary">{sensor.name}</span>
              <span className="text-text-muted font-mono">({sensor.protocol})</span>
            </span>
          ))}
        </div>

        {/* 프로토콜 요약 */}
        <div className="flex flex-wrap gap-2 text-[10px] text-text-muted">
          {Object.entries(protocols).map(([proto, sensors]) => (
            <span key={proto}>
              {proto}: {sensors.length}개
            </span>
          ))}
        </div>
      </div>

      {/* Grove 연결 안내 */}
      {shieldMode && groveCount > 0 && (
        <div className="bg-bg-primary rounded-xl border border-border p-3">
          <div className="flex items-center gap-1.5 text-xs text-green font-medium mb-2">
            <Info size={12} />
            Grove Shield 연결
          </div>
          <ul className="space-y-1.5">
            {sensorInfos.map(({ sensor, modeData }) => {
              if (!sensor.grove || !modeData?.grovePort) return null;
              return (
                <li key={sensor.id} className="text-xs text-text-secondary flex items-start gap-2">
                  <span className="flex-shrink-0">{sensor.icon}</span>
                  <span>
                    <span className="text-text-primary">{sensor.name}</span>
                    {' → '}
                    <span className="text-cyan font-mono">{modeData.grovePort.name}</span>
                    <span className="text-text-muted"> ({modeData.grovePort.type})</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* 센서별 경고/노트 */}
      {sensorInfos.some(({ modeData }) => modeData?.warning || modeData?.note) && (
        <div className="bg-bg-primary rounded-xl border border-border p-3">
          <div className="flex items-center gap-1.5 text-xs text-orange font-medium mb-2">
            <Lightbulb size={12} />
            센서별 주의사항
          </div>
          <ul className="space-y-2">
            {sensorInfos.map(({ sensor, modeData }) => {
              if (!modeData?.warning && !modeData?.note) return null;
              return (
                <li key={sensor.id} className="text-xs">
                  <div className="flex items-center gap-1 text-text-primary mb-0.5">
                    <span>{sensor.icon}</span> {sensor.name}
                  </div>
                  {modeData.warning && (
                    <div className="flex gap-1.5 text-orange ml-5">
                      <AlertTriangle size={10} className="flex-shrink-0 mt-0.5" />
                      {modeData.warning}
                    </div>
                  )}
                  {modeData.note && (
                    <div className="text-text-muted ml-5">
                      {modeData.note}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Direct 모드 경고 */}
      {!shieldMode && nonGroveCount > 0 && (
        <div className="bg-orange/5 border border-orange/20 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs text-orange font-medium mb-1">
            <AlertTriangle size={12} />
            Direct 모드 주의
          </div>
          <ul className="text-[10px] text-text-secondary space-y-1 mt-1.5">
            <li>• 배선 변경 전 반드시 USB를 분리하세요</li>
            <li>• 3.3V와 GND를 절대 직접 연결하지 마세요</li>
            <li>• I2C 센서는 4.7kΩ 풀업 저항이 필요할 수 있어요</li>
            {Object.keys(protocols).includes('I2C') && (
              <li>• I2C 센서끼리는 SDA/SCL 라인을 공유할 수 있어요</li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

/* ── 차시별 팁 ── */
function LessonTips({ lessonNum }) {
  const lesson = getLessonByNum(lessonNum);
  const act = getActForLesson(lessonNum);
  if (!lesson) return null;

  return (
    <>
      {/* 오늘의 질문 */}
      <div className="bg-cyan/10 border border-cyan/30 rounded-xl p-4">
        <div className="flex items-center gap-2 text-cyan text-xs font-medium mb-2">
          <BookOpen size={14} />
          {lesson.num}차시: {lesson.title}
        </div>
        <p className="text-sm text-text-primary font-medium">"{lesson.question}"</p>
      </div>

      {/* AI 역할 */}
      <div className="bg-bg-primary rounded-xl border border-border p-3">
        <div className="text-xs text-text-muted mb-1">AI 역할</div>
        <div className="text-sm font-medium text-orange">
          {act?.aiRole === 'teacher' && '친절한 선생님 — 완성 코드 + 줄별 설명'}
          {act?.aiRole === 'coach' && '바이브코딩 코치 — 프롬프트 작성법 가이드'}
          {act?.aiRole === 'mentor' && '프로젝트 멘토 — 방향 제시, 답은 직접'}
        </div>
      </div>

      {/* 학습 목표 */}
      <div className="bg-bg-primary rounded-xl border border-border p-3">
        <div className="flex items-center gap-1.5 text-xs text-text-muted mb-2">
          <CheckCircle size={12} />
          학습 목표
        </div>
        <div className="flex flex-wrap gap-1.5">
          {lesson.skills.map((skill, i) => (
            <span key={i} className="px-2 py-0.5 bg-bg-surface rounded-full text-[10px] text-text-secondary border border-border">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 팁 */}
      {lesson.tips && lesson.tips.length > 0 && (
        <div className="bg-bg-primary rounded-xl border border-border p-3">
          <div className="flex items-center gap-1.5 text-xs text-orange mb-2">
            <Lightbulb size={12} />
            주의사항 & 팁
          </div>
          <ul className="space-y-1">
            {lesson.tips.map((tip, i) => (
              <li key={i} className="text-xs text-text-secondary flex gap-2">
                <AlertTriangle size={10} className="flex-shrink-0 mt-1 text-orange" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 난이도 */}
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <span>난이도:</span>
        <span className="text-orange">
          {'●'.repeat(lesson.difficulty)}{'○'.repeat(5 - lesson.difficulty)}
        </span>
        <span className="ml-auto">{lesson.duration}분</span>
      </div>
    </>
  );
}

function CourseBTips({ level }) {
  const levelData = getCourseBLevel(level);
  if (!levelData) return null;

  const [showTimeline, setShowTimeline] = useState(false);
  const [showEval, setShowEval] = useState(false);

  return (
    <>
      {/* 레벨 헤더 */}
      <div className="bg-orange/10 border border-orange/30 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-orange text-xs font-medium mb-1">
              Course B — Lv.{levelData.level}: {levelData.title}
            </div>
            <p className="text-sm text-text-primary font-medium">{levelData.focus}</p>
          </div>
          <div className="text-right">
            <div className="text-orange text-lg font-bold">
              {'●'.repeat(levelData.difficulty)}{'○'.repeat(5 - levelData.difficulty)}
            </div>
            <div className="text-[10px] text-text-muted">{levelData.hours}시간</div>
          </div>
        </div>
        {levelData.prerequisite && (
          <div className="text-[10px] text-text-muted mt-2">
            선수학습: {levelData.prerequisite}
          </div>
        )}
        {levelData.textbookUrl && (
          <a
            href={`https://greatsong.github.io/ai-physical-computing${levelData.textbookUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-[10px] text-cyan hover:underline"
          >
            <BookOpen size={10} />
            교재에서 자세히 보기 →
          </a>
        )}
      </div>

      {/* 필수 요구사항 */}
      <div className="bg-bg-primary rounded-xl border border-border p-3">
        <div className="flex items-center gap-1.5 text-xs text-text-muted mb-2">
          <CheckCircle size={12} />
          필수 요구사항
        </div>
        <ul className="space-y-1">
          {levelData.requirements?.map((req, i) => (
            <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
              <span className="text-orange mt-0.5">•</span>
              {typeof req === 'string' ? req : req}
            </li>
          ))}
        </ul>
      </div>

      {/* 예시 프로젝트 — 클릭 가능 */}
      <div className="bg-bg-primary rounded-xl border border-border p-3">
        <div className="text-xs text-text-muted mb-2">예시 프로젝트 (센서 클릭 → 자동 추가)</div>
        <div className="space-y-2">
          {levelData.examples.map((ex, i) => {
            const exObj = typeof ex === 'string' ? { name: ex } : ex;
            return (
              <CourseBExample key={i} example={exObj} exampleIndex={i} />
            );
          })}
        </div>
      </div>

      {/* 타임라인 */}
      {levelData.timeline && (
        <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="w-full px-3 py-2 flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-text-primary"
          >
            ⏱ 시간 배분 가이드
            <ChevronDown size={12} className={`ml-auto transition-transform ${showTimeline ? 'rotate-180' : ''}`} />
          </button>
          {showTimeline && (
            <div className="px-3 pb-3 space-y-1.5 border-t border-border/50 pt-2">
              {levelData.timeline.map((step, i) => (
                <div key={i} className="flex gap-2 text-[10px]">
                  <span className="text-cyan font-mono w-20 flex-shrink-0">{step.time}</span>
                  <div className="flex-1">
                    <div className="text-text-primary">{step.task}</div>
                    {step.picoMakers && (
                      <div className="text-text-muted mt-0.5">
                        💡 Pico Makers: {step.picoMakers}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 평가 기준 */}
      {levelData.evaluation && (
        <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
          <button
            onClick={() => setShowEval(!showEval)}
            className="w-full px-3 py-2 flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-text-primary"
          >
            📊 평가 기준
            <ChevronDown size={12} className={`ml-auto transition-transform ${showEval ? 'rotate-180' : ''}`} />
          </button>
          {showEval && (
            <div className="px-3 pb-3 space-y-2 border-t border-border/50 pt-2">
              {levelData.evaluation.essential && (
                <div>
                  <div className="text-[10px] text-red font-medium mb-1">필수</div>
                  {levelData.evaluation.essential.map((item, i) => (
                    <div key={i} className="text-[10px] text-text-secondary ml-3">• {item}</div>
                  ))}
                </div>
              )}
              {levelData.evaluation.good && (
                <div>
                  <div className="text-[10px] text-orange font-medium mb-1">우수</div>
                  {levelData.evaluation.good.map((item, i) => (
                    <div key={i} className="text-[10px] text-text-secondary ml-3">• {item}</div>
                  ))}
                </div>
              )}
              {levelData.evaluation.excellent && (
                <div>
                  <div className="text-[10px] text-cyan font-medium mb-1">탁월</div>
                  {levelData.evaluation.excellent.map((item, i) => (
                    <div key={i} className="text-[10px] text-text-secondary ml-3">• {item}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ── Course B 예시 프로젝트 카드 ── */
function CourseBExample({ example, exampleIndex }) {
  const addActiveSensor = useAppStore(s => s.addActiveSensor);
  const setActiveSensors = useAppStore(s => s.setActiveSensors);
  const activeSensors = useAppStore(s => s.activeSensors);
  const setCourseBExample = useAppStore(s => s.setCourseBExample);
  const courseBExample = useAppStore(s => s.courseBExample);
  const isSelected = courseBExample === exampleIndex;

  function loadSensors() {
    if (!example.sensors) return;
    // 센서를 예제의 것으로 교체
    setActiveSensors(example.sensors);
    // 예제 인덱스 저장
    setCourseBExample(exampleIndex);
  }

  return (
    <div className={`rounded-lg p-2 transition-colors ${isSelected ? 'bg-cyan/10 border border-cyan/30' : 'bg-bg-surface/50'}`}>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${isSelected ? 'text-cyan' : 'text-text-primary'}`}>
          {isSelected && '✓ '}{example.name}
        </span>
        {example.sensors && (
          <button
            onClick={loadSensors}
            className={`text-[9px] px-2 py-0.5 rounded transition-colors ${
              isSelected
                ? 'bg-cyan/20 text-cyan font-medium'
                : 'bg-cyan/10 text-cyan hover:bg-cyan/20'
            }`}
          >
            {isSelected ? '선택됨' : '센서 로드'}
          </button>
        )}
      </div>
      {example.desc && (
        <div className="text-[10px] text-text-muted mt-1">{example.desc}</div>
      )}
      {example.sensors && (
        <div className="flex flex-wrap gap-1 mt-1">
          {example.sensors.map(id => (
            <span key={id} className="text-[9px] px-1.5 py-0.5 bg-bg-primary rounded border border-border font-mono">
              {SENSORS[id]?.icon} {SENSORS[id]?.name || id}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function GeneralTips() {
  return (
    <>
      <div className="bg-bg-primary rounded-xl border border-border p-4">
        <h3 className="text-sm font-medium text-cyan mb-3">일반 도움말</h3>
        <ul className="space-y-2 text-xs text-text-secondary">
          <li className="flex gap-2">
            <span className="text-cyan">1.</span>
            왼쪽 채팅에서 AI에게 자유롭게 질문하세요
          </li>
          <li className="flex gap-2">
            <span className="text-cyan">2.</span>
            에러가 나면 에러 메시지를 그대로 붙여넣기하세요
          </li>
          <li className="flex gap-2">
            <span className="text-cyan">3.</span>
            배선 탭에서 센서를 추가/제거할 수 있어요
          </li>
          <li className="flex gap-2">
            <span className="text-cyan">4.</span>
            핀맵 탭에서 현재 핀 사용 현황을 확인하세요
          </li>
          <li className="flex gap-2">
            <span className="text-cyan">5.</span>
            코드 탭에서 통합 코드를 복사하세요
          </li>
        </ul>
      </div>

      <div className="bg-orange/10 border border-orange/30 rounded-xl p-3">
        <div className="flex items-center gap-1.5 text-xs text-orange font-medium mb-1">
          <AlertTriangle size={12} />
          배선 안전 수칙
        </div>
        <ul className="text-xs text-text-secondary space-y-1 mt-2">
          <li>• 배선 변경 시 항상 USB를 먼저 뽑으세요</li>
          <li>• 5V를 3.3V 핀에 연결하면 보드가 손상될 수 있어요</li>
          <li>• 같은 핀을 두 곳에 사용하면 충돌이 생겨요</li>
        </ul>
      </div>
    </>
  );
}
