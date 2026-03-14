import { useState } from 'react';
import { Plus, X, AlertTriangle, Cable, ChevronDown, Check, Package } from 'lucide-react';
import useAppStore from '../../stores/appStore';
import SENSORS, { SENSOR_ORDER, CATEGORIES } from '../../data/sensors';
import { detectPinConflicts } from '../../lib/pinConflict';

export default function MultiWiring() {
  const activeSensors = useAppStore(s => s.activeSensors);
  const shieldMode = useAppStore(s => s.shieldMode);
  const addActiveSensor = useAppStore(s => s.addActiveSensor);
  const removeActiveSensor = useAppStore(s => s.removeActiveSensor);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const { conflicts, warnings } = detectPinConflicts(activeSensors, shieldMode);

  return (
    <div className="space-y-4">
      {/* 핀 충돌 경고 */}
      {(conflicts.length > 0 || warnings.length > 0) && (
        <div className="bg-red/10 border border-red/30 rounded-xl p-3 animate-conflict">
          <div className="flex items-center gap-2 text-red text-xs font-medium mb-2">
            <AlertTriangle size={14} />
            핀 충돌 감지!
          </div>
          {conflicts.map((c, i) => (
            <div key={i} className="text-xs text-text-secondary mb-1">
              <span className="text-red font-mono font-bold">{c.pin}</span>
              {' — '}
              {c.sensors.map(id => SENSORS[id]?.name).join(', ')}에서 동시 사용
            </div>
          ))}
          {warnings.map((w, i) => (
            <div key={i} className="text-xs text-orange">{w}</div>
          ))}
        </div>
      )}

      {/* Grove Shield 포트맵 (Shield 모드일 때만) */}
      {shieldMode && activeSensors.length > 0 && (
        <GroveShieldMap activeSensors={activeSensors} />
      )}

      {/* 준비물 체크리스트 */}
      {activeSensors.length > 0 && (
        <PrepChecklist activeSensors={activeSensors} shieldMode={shieldMode} />
      )}

      {/* 활성 센서 배선 카드 */}
      {activeSensors.length === 0 ? (
        <div className="text-center py-8 text-text-muted text-sm">
          센서가 없습니다. 아래 버튼으로 추가하세요.
        </div>
      ) : (
        activeSensors.map(sensorId => (
          <SensorWiringCard
            key={sensorId}
            sensorId={sensorId}
            shieldMode={shieldMode}
            onRemove={() => removeActiveSensor(sensorId)}
            hasConflict={conflicts.some(c => c.sensors.includes(sensorId))}
          />
        ))
      )}

      {/* 센서 추가 버튼 */}
      <div className="relative">
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl border border-dashed border-border text-text-secondary text-xs font-medium hover:border-cyan/50 hover:text-cyan transition-colors"
        >
          <Plus size={14} />
          센서 추가
        </button>

        {showAddMenu && (
          <SensorAddMenu
            activeSensors={activeSensors}
            onAdd={(id) => { addActiveSensor(id); setShowAddMenu(false); }}
            onClose={() => setShowAddMenu(false)}
          />
        )}
      </div>
    </div>
  );
}

/* ── Grove Shield 포트 맵 ── */
function GroveShieldMap({ activeSensors }) {
  // Grove Shield 포트 레이아웃
  const PORTS = [
    { name: 'D16', type: '디지털', position: 'left' },
    { name: 'D18', type: '디지털', position: 'left' },
    { name: 'D20', type: '디지털', position: 'left' },
    { name: 'A0', type: '아날로그', position: 'left' },
    { name: 'A1', type: '아날로그', position: 'left' },
    { name: 'A2', type: '아날로그', position: 'right' },
    { name: 'I2C0', type: 'I2C', position: 'right' },
    { name: 'I2C1', type: 'I2C', position: 'right' },
    { name: 'UART0', type: 'UART', position: 'right' },
    { name: 'UART1', type: 'UART', position: 'right' },
  ];

  // 어떤 센서가 어떤 포트를 쓰는지
  const portUsage = {};
  activeSensors.forEach(id => {
    const sensor = SENSORS[id];
    if (!sensor?.shield?.grovePort) return;
    const port = sensor.shield.grovePort;
    portUsage[port.name] = { sensor, port };
  });

  const leftPorts = PORTS.filter(p => p.position === 'left');
  const rightPorts = PORTS.filter(p => p.position === 'right');

  return (
    <div className="bg-bg-primary rounded-xl border border-border p-3">
      <div className="text-xs font-medium text-green mb-2 flex items-center gap-1.5">
        🛡️ Grove Shield 포트 연결
      </div>

      <div className="flex justify-center gap-4">
        {/* 왼쪽 포트 */}
        <div className="space-y-1">
          {leftPorts.map(port => {
            const usage = portUsage[port.name];
            return (
              <GrovePort key={port.name} port={port} usage={usage} />
            );
          })}
        </div>

        {/* Shield 보드 중앙 */}
        <div className="w-20 bg-bg-elevated rounded-lg border border-border flex items-center justify-center">
          <div className="text-[8px] text-text-muted text-center font-mono leading-tight">
            Grove<br />Shield<br />for<br />Pico
          </div>
        </div>

        {/* 오른쪽 포트 */}
        <div className="space-y-1">
          {rightPorts.map(port => {
            const usage = portUsage[port.name];
            return (
              <GrovePort key={port.name} port={port} usage={usage} side="right" />
            );
          })}
        </div>
      </div>

      <div className="text-[9px] text-text-muted mt-2 text-center">
        색상 표시된 포트에 Grove 케이블을 연결하세요
      </div>
    </div>
  );
}

function GrovePort({ port, usage, side = 'left' }) {
  const typeColor = {
    'I2C': '#00ff88',
    '아날로그': '#ffaa00',
    '디지털': '#00ccff',
    'UART': '#ff88ff',
  }[port.type] || '#888';

  return (
    <div className={`flex items-center gap-1.5 h-7 ${side === 'right' ? 'flex-row-reverse' : ''}`}>
      <span className={`text-[9px] font-mono w-12 ${side === 'right' ? 'text-left' : 'text-right'}`}
        style={{ color: usage ? typeColor : '#555', fontWeight: usage ? 'bold' : 'normal' }}
      >
        {port.name}
      </span>
      <div
        className={`w-8 h-4 rounded-sm border flex items-center justify-center ${
          usage ? 'border-transparent' : 'border-border/50 bg-bg-surface'
        }`}
        style={usage ? {
          backgroundColor: usage.port.color || typeColor,
          opacity: 0.8,
        } : {}}
        title={usage ? `${usage.sensor.name}` : `${port.name} (${port.type}) — 비어있음`}
      >
        {usage && <span className="text-[7px]">{usage.sensor.icon}</span>}
      </div>
      {usage && (
        <span className={`text-[8px] text-text-secondary truncate max-w-[60px] ${side === 'right' ? 'text-right' : ''}`}>
          {usage.sensor.name}
        </span>
      )}
    </div>
  );
}

/* ── 준비물 체크리스트 ── */
function PrepChecklist({ activeSensors, shieldMode }) {
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState(new Set());

  const items = [];

  // 공통
  items.push({ icon: '🔋', name: 'USB 케이블', qty: '1개' });

  if (shieldMode) {
    items.push({ icon: '🛡️', name: 'Grove Shield (장착 확인)', qty: '1개' });
    items.push({ icon: '🔌', name: 'Grove 4핀 케이블', qty: `${activeSensors.length}개` });
  } else {
    items.push({ icon: '🍞', name: '브레드보드', qty: '1개' });

    // 점퍼선 수 계산
    let totalWires = 0;
    const wireColors = [];
    let needsPullup = false;

    activeSensors.forEach(id => {
      const sensor = SENSORS[id];
      const modeData = sensor?.direct;
      if (!modeData?.pins) return;
      totalWires += modeData.pins.length;
      modeData.pins.forEach(p => wireColors.push(p.wire));
      if (modeData.warning?.includes('풀업')) needsPullup = true;
    });

    items.push({
      icon: '🔗', name: '점퍼선 (수-수)', qty: `${totalWires}개`,
      colors: wireColors,
    });

    if (needsPullup) {
      items.push({ icon: '⚡', name: '4.7kΩ 풀업 저항', qty: '2개', highlight: true });
    }
  }

  // 센서 모듈들
  activeSensors.forEach(id => {
    const s = SENSORS[id];
    if (!s) return;
    items.push({ icon: s.icon, name: s.name + ' 모듈', qty: '1개' });
  });

  function toggleCheck(i) {
    const next = new Set(checked);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setChecked(next);
  }

  const remaining = items.length - checked.size;
  const allDone = remaining === 0;

  return (
    <div className={`rounded-xl border overflow-hidden ${
      allDone ? 'bg-green/5 border-green/30' : 'bg-bg-primary border-border'
    }`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
      >
        <Package size={12} className={allDone ? 'text-green' : 'text-orange'} />
        {allDone
          ? '✅ 준비물 완료!'
          : `📋 준비물 체크리스트 — ${remaining}개 남음`
        }
        <span className="ml-auto flex items-center gap-1.5">
          <span className="text-[10px] text-text-muted">{checked.size}/{items.length}</span>
          <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {/* 진행 바 */}
      <div className="h-0.5 bg-bg-surface">
        <div
          className={`h-full transition-all duration-300 ${allDone ? 'bg-green' : 'bg-orange'}`}
          style={{ width: `${(checked.size / items.length) * 100}%` }}
        />
      </div>

      {open && (
        <div className="px-3 pb-3 space-y-1 pt-2">
          {items.map((item, i) => {
            const done = checked.has(i);
            return (
              <div
                key={i}
                onClick={() => toggleCheck(i)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs cursor-pointer transition-all ${
                  done
                    ? 'bg-green/10 opacity-60'
                    : item.highlight
                      ? 'bg-orange/10 border border-orange/20'
                      : 'bg-bg-surface/50 hover:bg-bg-surface'
                }`}
              >
                {/* 체크박스 */}
                <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                  done ? 'bg-green border-green text-bg-primary' : 'border-border'
                }`}>
                  {done && <Check size={10} />}
                </div>

                <span className={`text-sm flex-shrink-0 ${done ? 'grayscale' : ''}`}>{item.icon}</span>
                <span className={`flex-1 ${
                  done
                    ? 'text-text-muted line-through'
                    : item.highlight
                      ? 'text-orange font-medium'
                      : 'text-text-primary'
                }`}>
                  {item.name}
                </span>
                <span className="text-text-muted text-[10px] font-mono">×{item.qty}</span>
                {/* 와이어 색상 표시 */}
                {item.colors && (
                  <div className="flex gap-0.5 ml-1">
                    {item.colors.slice(0, 8).map((c, ci) => (
                      <div key={ci} className="w-4 h-1.5 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                    {item.colors.length > 8 && (
                      <span className="text-[8px] text-text-muted">+{item.colors.length - 8}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {items.some(i => i.highlight) && (
            <div className="text-[10px] text-text-muted bg-orange/5 rounded-lg p-2 mt-1">
              💡 <span className="text-orange">4.7kΩ 저항 찾는 법:</span> 색띠{' '}
              <span className="text-yellow-400">노랑</span>-
              <span className="text-purple-400">보라</span>-
              <span className="text-red">빨강</span>-
              <span className="text-yellow-600">금</span> 순서
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── 센서 배선 카드 ── */
function SensorWiringCard({ sensorId, shieldMode, onRemove, hasConflict }) {
  const [expanded, setExpanded] = useState(true);
  const [checked, setChecked] = useState(new Set());
  const sensor = SENSORS[sensorId];
  if (!sensor) return null;

  const modeData = shieldMode ? sensor.shield : sensor.direct;

  function toggleCheck(i) {
    const next = new Set(checked);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setChecked(next);
  }

  const allChecked = modeData?.pins && checked.size === modeData.pins.length;

  return (
    <div className={`rounded-xl border overflow-hidden ${
      hasConflict ? 'border-red/50 bg-red/5' :
      allChecked ? 'border-green/30 bg-green/5' :
      'border-border bg-bg-primary/50'
    }`}>
      {/* 센서 헤더 */}
      <div className="flex items-center gap-2 px-3 py-2.5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <span className="text-lg">{sensor.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">{sensor.name}</span>
            {allChecked && <Check size={12} className="text-green" />}
          </div>
          <div className="text-[10px] text-text-muted font-mono">
            {sensor.protocol}{sensor.address ? ` [${sensor.address}]` : ''}
            {sensor.grove && <span className="ml-1 text-green">Grove</span>}
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="p-1 rounded text-text-muted hover:text-red transition-colors"
        >
          <X size={14} />
        </button>
        <ChevronDown size={14} className={`text-text-muted transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </div>

      {/* 배선 상세 */}
      {expanded && modeData && (
        <div className="px-3 pb-3 border-t border-border/50">
          {/* Grove Shield 모드 — 간편 안내 */}
          {shieldMode && modeData.grovePort && (
            <div className="mt-2 mb-2 bg-green/10 border border-green/20 rounded-lg p-2.5">
              <div className="text-xs font-medium text-green mb-1">
                🔌 {modeData.grovePort.name} 포트에 연결
              </div>
              <div className="text-[10px] text-text-secondary">
                Grove 4핀 케이블로 센서 모듈과 Shield의{' '}
                <span className="text-cyan font-mono font-bold">{modeData.grovePort.name}</span>{' '}
                ({modeData.grovePort.type}) 포트를 연결하세요.
                <span className="text-text-muted"> 딸각 소리가 나면 제대로 끼워진 거예요!</span>
              </div>
            </div>
          )}

          {/* 노트 */}
          {modeData.note && !(shieldMode && modeData.grovePort) && (
            <div className="text-[10px] text-text-muted mt-2 mb-2">{modeData.note}</div>
          )}

          {/* 핀 연결 목록 — 체크박스 포함 */}
          <div className="space-y-0.5 mt-1">
            <div className="text-[10px] text-text-muted mb-1">
              {shieldMode ? '실제 핀 매핑 (참고용)' : '배선 순서 (체크하며 연결하세요)'}
            </div>
            {modeData.pins.map((pin, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 text-xs px-2 py-1 rounded-md cursor-pointer transition-colors ${
                  checked.has(i) ? 'bg-green/10' : 'hover:bg-bg-surface/50'
                }`}
                onClick={() => toggleCheck(i)}
              >
                {/* 체크박스 */}
                <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                  checked.has(i)
                    ? 'bg-green border-green text-bg-primary'
                    : 'border-border'
                }`}>
                  {checked.has(i) && <Check size={10} />}
                </div>

                {/* 와이어 색상 */}
                <div className="flex items-center gap-1">
                  <div
                    className="w-6 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: pin.wire }}
                  />
                  <span className="text-[9px] text-text-muted w-6">{pin.label}</span>
                </div>

                {/* 연결 정보 */}
                <span className="text-text-secondary font-mono w-8">{pin.sensor}</span>
                <span className="text-text-muted">→</span>
                <span className="text-cyan font-mono font-medium">{pin.picoName}</span>
                <span className="text-text-muted ml-auto text-[10px]">핀{pin.pico}</span>
              </div>
            ))}
          </div>

          {/* 진행 표시 */}
          {modeData.pins.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 bg-bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-green rounded-full transition-all"
                  style={{ width: `${(checked.size / modeData.pins.length) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-text-muted">
                {checked.size}/{modeData.pins.length}
              </span>
            </div>
          )}

          {/* 경고 */}
          {modeData.warning && (
            <div className="mt-2 flex items-start gap-1.5 text-[10px] text-orange bg-orange/10 rounded-lg p-2">
              <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
              {modeData.warning}
            </div>
          )}

          {/* 완료 메시지 */}
          {allChecked && (
            <div className="mt-2 text-[10px] text-green bg-green/10 rounded-lg p-2 text-center font-medium">
              ✅ {sensor.name} 배선 완료! USB를 연결하고 코드를 업로드하세요.
            </div>
          )}
        </div>
      )}

      {/* 배선 데이터 없는 경우 */}
      {expanded && !modeData && (
        <div className="px-3 pb-3 border-t border-border/50">
          <div className="text-xs text-text-muted mt-2">
            이 센서는 배선 데이터가 준비되지 않았습니다. AI에게 질문하면 안내받을 수 있어요.
          </div>
        </div>
      )}
    </div>
  );
}

/* ── 센서 추가 메뉴 ── */
function SensorAddMenu({ activeSensors, onAdd, onClose }) {
  const [filter, setFilter] = useState('');

  const availableSensors = SENSOR_ORDER.filter(id => {
    if (activeSensors.includes(id)) return false;
    if (!filter) return true;
    const s = SENSORS[id];
    return s.name.includes(filter) || s.id.toLowerCase().includes(filter.toLowerCase()) || s.category.includes(filter);
  });

  // 카테고리별 그룹핑
  const grouped = {};
  for (const id of availableSensors) {
    const cat = SENSORS[id].category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(id);
  }

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute bottom-full mb-1 left-0 right-0 bg-bg-elevated border border-border rounded-xl shadow-xl z-20 max-h-[300px] overflow-y-auto">
        <div className="sticky top-0 bg-bg-elevated p-2 border-b border-border">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="센서 검색..."
            className="w-full px-3 py-1.5 bg-bg-primary border border-border rounded-lg text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan/50"
            autoFocus
          />
        </div>
        {Object.entries(grouped).map(([cat, sensors]) => (
          <div key={cat}>
            <div className="px-3 py-1 text-[10px] text-text-muted font-bold uppercase bg-bg-surface/50">
              {CATEGORIES[cat]?.icon} {cat}
            </div>
            {sensors.map(id => {
              const s = SENSORS[id];
              return (
                <button
                  key={id}
                  onClick={() => onAdd(id)}
                  className="w-full px-3 py-2 flex items-center gap-2 text-xs hover:bg-bg-surface transition-colors"
                >
                  <span>{s.icon}</span>
                  <span className="text-text-primary">{s.name}</span>
                  {s.grove && <span className="text-[9px] text-green">Grove</span>}
                  <span className="ml-auto text-text-muted font-mono text-[10px]">{s.protocol}</span>
                </button>
              );
            })}
          </div>
        ))}
        {availableSensors.length === 0 && (
          <div className="p-4 text-center text-text-muted text-xs">검색 결과 없음</div>
        )}
      </div>
    </>
  );
}
