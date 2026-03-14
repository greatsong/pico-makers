import { useState } from 'react';
import { Copy, Check, Layers, ChevronDown, BookOpen } from 'lucide-react';
import useAppStore from '../../stores/appStore';
import SENSORS from '../../data/sensors';
import { combineCode } from '../../lib/codeCombiner';
import { getCourseBLevel } from '../../data/curriculum';

export default function CodeView() {
  const activeSensors = useAppStore(s => s.activeSensors);
  const shieldMode = useAppStore(s => s.shieldMode);
  const mode = useAppStore(s => s.mode);
  const courseBLevel = useAppStore(s => s.courseBLevel);
  const courseBExample = useAppStore(s => s.courseBExample);
  const [viewMode, setViewMode] = useState('combined'); // 'combined' | 'individual'

  // Course B 프로젝트 템플릿 코드 가져오기
  const projectTemplate = (() => {
    if (mode !== 'courseB' || courseBExample === null) return null;
    const levelData = getCourseBLevel(courseBLevel);
    if (!levelData?.examples?.[courseBExample]) return null;
    return levelData.examples[courseBExample];
  })();

  if (activeSensors.length === 0 && !projectTemplate) {
    return (
      <div className="text-center py-8 text-text-muted text-sm">
        센서를 추가하면 예제 코드가 표시됩니다.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Course B 프로젝트 템플릿 코드 */}
      {projectTemplate?.code && (
        <ProjectTemplateCard template={projectTemplate} level={courseBLevel} />
      )}

      {/* 뷰 모드 토글 */}
      {activeSensors.length > 1 && (
        <div className="flex gap-1 bg-bg-primary rounded-lg p-1 border border-border">
          <button
            onClick={() => setViewMode('combined')}
            className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
              viewMode === 'combined'
                ? 'bg-cyan/20 text-cyan'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Layers size={12} />
            통합 코드
          </button>
          <button
            onClick={() => setViewMode('individual')}
            className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
              viewMode === 'individual'
                ? 'bg-cyan/20 text-cyan'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <ChevronDown size={12} />
            센서별 코드
          </button>
        </div>
      )}

      {/* 통합 코드 */}
      {(viewMode === 'combined' && activeSensors.length > 1) ? (
        <CombinedCodeCard activeSensors={activeSensors} shieldMode={shieldMode} />
      ) : (
        activeSensors.map(sensorId => (
          <SensorCodeCard key={sensorId} sensorId={sensorId} shieldMode={shieldMode} />
        ))
      )}
    </div>
  );
}

function ProjectTemplateCard({ template, level }) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(template.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const sensorNames = template.sensors
    ?.map(id => SENSORS[id])
    .filter(Boolean)
    .map(s => `${s.icon} ${s.name}`) || [];

  return (
    <div className="rounded-xl border border-orange/30 overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 py-2 bg-orange/10 border-b border-orange/20">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm font-medium text-orange">
            <BookOpen size={14} />
            {template.name}
            <span className="text-[10px] text-text-muted font-mono">
              Lv.{level} 기본 코드
            </span>
          </div>
          <div className="text-[10px] text-text-muted mt-0.5 truncate">
            {sensorNames.join(' + ')}
          </div>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded text-text-muted hover:text-orange transition-colors"
          >
            <ChevronDown size={14} className={`transition-transform ${collapsed ? '-rotate-90' : ''}`} />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded text-text-muted hover:text-orange transition-colors"
          >
            {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* 안내 */}
      <div className="px-3 py-1.5 bg-orange/5 border-b border-border text-[10px] text-orange">
        교재와 동일한 기본 코드입니다. 응용/확장은 AI에게 요청하세요!
      </div>

      {/* 코드 */}
      {!collapsed && (
        <div className="relative">
          <pre className="!m-0 !rounded-none p-3 text-[11px] leading-5 overflow-x-auto">
            <code>
              {template.code.split('\n').map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-text-muted w-6 text-right mr-3 select-none flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className={`flex-1 ${
                    line.startsWith('# ──') ? 'text-orange/70 font-medium' :
                    line.startsWith('#') ? 'text-text-muted' : ''
                  }`}>
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}

function CombinedCodeCard({ activeSensors, shieldMode }) {
  const [copied, setCopied] = useState(false);
  const combined = combineCode(activeSensors, shieldMode);

  if (!combined) {
    return (
      <div className="rounded-xl border border-border p-4 text-center">
        <p className="text-xs text-text-muted">코드를 가진 센서가 없습니다.</p>
      </div>
    );
  }

  const sensorNames = activeSensors
    .map(id => SENSORS[id])
    .filter(Boolean)
    .map(s => `${s.icon} ${s.name}`);

  function handleCopy() {
    navigator.clipboard.writeText(combined);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-cyan/30 overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 py-2 bg-cyan/10 border-b border-cyan/20">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm font-medium text-cyan">
            <Layers size={14} />
            통합 코드
            <span className="text-[10px] text-text-muted font-mono">
              {shieldMode ? 'Shield' : 'Direct'}
            </span>
          </div>
          <div className="text-[10px] text-text-muted mt-0.5 truncate">
            {sensorNames.join(' + ')}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded text-text-muted hover:text-cyan transition-colors flex-shrink-0"
        >
          {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
        </button>
      </div>

      {/* 안내 */}
      <div className="px-3 py-1.5 bg-orange/5 border-b border-border text-[10px] text-orange">
        자동 병합된 코드입니다. AI에게 "이 코드 확인해줘"라고 요청하면 더 정확해요!
      </div>

      {/* 코드 */}
      <div className="relative">
        <pre className="!m-0 !rounded-none p-3 text-[11px] leading-5 overflow-x-auto">
          <code>
            {combined.split('\n').map((line, i) => (
              <div key={i} className="flex">
                <span className="text-text-muted w-6 text-right mr-3 select-none flex-shrink-0">
                  {i + 1}
                </span>
                <span className={`flex-1 ${line.startsWith('# ──') ? 'text-cyan/70 font-medium' : ''}`}>
                  {line}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

function SensorCodeCard({ sensorId, shieldMode }) {
  const [copied, setCopied] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const sensor = SENSORS[sensorId];
  if (!sensor) return null;

  const modeData = shieldMode ? sensor.shield : sensor.direct;
  if (!modeData?.code) {
    return (
      <div className="rounded-xl border border-border p-3">
        <div className="flex items-center gap-2 text-sm font-medium mb-2">
          <span>{sensor.icon}</span>
          {sensor.name}
        </div>
        <p className="text-xs text-text-muted">예제 코드가 아직 준비되지 않았습니다.</p>
      </div>
    );
  }

  function handleCopy() {
    navigator.clipboard.writeText(modeData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 py-2 bg-bg-surface border-b border-border">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{sensor.icon}</span>
          {sensor.name}
          <span className="text-[10px] text-text-muted font-mono">
            {shieldMode ? 'Shield' : 'Direct'}
          </span>
        </div>
        <div className="flex gap-1">
          {modeData.annotations && (
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                showAnnotations ? 'bg-cyan/20 text-cyan' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              설명 {showAnnotations ? 'ON' : 'OFF'}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1 rounded text-text-muted hover:text-cyan transition-colors"
          >
            {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* 코드 */}
      <div className="relative">
        <pre className="!m-0 !rounded-none p-3 text-[11px] leading-5 overflow-x-auto">
          <code>
            {modeData.code.split('\n').map((line, i) => {
              const annotation = showAnnotations
                ? modeData.annotations?.find(a => a.line === i + 1)
                : null;
              return (
                <div key={i} className="flex">
                  <span className="text-text-muted w-6 text-right mr-3 select-none flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="flex-1">
                    {line}
                    {annotation && (
                      <span className="text-cyan/60 ml-2">← {annotation.text}</span>
                    )}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
