import useAppStore from '../../stores/appStore';
import { buildPinMap } from '../../lib/pinConflict';
import SENSORS from '../../data/sensors';

// Pico 2 WH 핀 레이아웃 (물리 핀 1~40)
const LEFT_PINS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const RIGHT_PINS = [40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21];

const PIN_LABELS = {
  1: 'GP0', 2: 'GP1', 3: 'GND', 4: 'GP2', 5: 'GP3',
  6: 'GP4', 7: 'GP5', 8: 'GND', 9: 'GP6', 10: 'GP7',
  11: 'GP8', 12: 'GP9', 13: 'GND', 14: 'GP10', 15: 'GP11',
  16: 'GP12', 17: 'GP13', 18: 'GND', 19: 'GP14', 20: 'GP15',
  21: 'GP16', 22: 'GP17', 23: 'GND', 24: 'GP18', 25: 'GP19',
  26: 'GP20', 27: 'GP21', 28: 'GND', 29: 'GP22', 30: 'RUN',
  31: 'GP26/A0', 32: 'GP27/A1', 33: 'GND', 34: 'GP28/A2',
  35: 'ADC_VREF', 36: '3V3', 37: '3V3_EN', 38: 'GND', 39: 'VSYS', 40: 'VBUS',
};

export default function PinMapView() {
  const activeSensors = useAppStore(s => s.activeSensors);
  const shieldMode = useAppStore(s => s.shieldMode);
  const pinMap = buildPinMap(activeSensors, shieldMode);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-text-primary">Pico 2 WH 핀 맵</h3>
      <p className="text-[10px] text-text-muted">색상 점은 현재 사용 중인 핀을 나타냅니다</p>

      {/* 핀 맵 시각화 */}
      <div className="bg-bg-primary rounded-xl p-4 border border-border">
        <div className="flex justify-center gap-6">
          {/* 왼쪽 핀 */}
          <div className="space-y-0.5">
            {LEFT_PINS.map(pin => (
              <PinRow key={pin} pin={pin} side="left" pinMap={pinMap} />
            ))}
          </div>

          {/* 보드 중앙 */}
          <div className="w-16 bg-bg-elevated rounded-lg border border-border flex items-center justify-center">
            <div className="text-[8px] text-text-muted text-center font-mono leading-tight">
              Pico<br />2 WH
            </div>
          </div>

          {/* 오른쪽 핀 */}
          <div className="space-y-0.5">
            {RIGHT_PINS.map(pin => (
              <PinRow key={pin} pin={pin} side="right" pinMap={pinMap} />
            ))}
          </div>
        </div>
      </div>

      {/* 범례 */}
      {activeSensors.length > 0 && (
        <div className="space-y-1">
          <h4 className="text-xs text-text-secondary font-medium">사용 중인 센서</h4>
          {activeSensors.map(id => {
            const s = SENSORS[id];
            if (!s) return null;
            return (
              <div key={id} className="flex items-center gap-2 text-xs">
                <span>{s.icon}</span>
                <span className="text-text-primary">{s.name}</span>
                <span className="text-text-muted font-mono">({s.protocol})</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PinRow({ pin, side, pinMap }) {
  const label = PIN_LABELS[pin] || `${pin}`;
  const used = pinMap.get(pin);
  const isGnd = label.includes('GND');
  const isPower = label.includes('3V3') || label.includes('VBUS') || label.includes('VSYS');

  return (
    <div className={`flex items-center gap-1.5 h-5 ${side === 'right' ? 'flex-row-reverse' : ''}`}>
      <span className={`text-[9px] font-mono w-16 ${
        side === 'right' ? 'text-left' : 'text-right'
      } ${
        used ? 'text-cyan font-bold' : isGnd ? 'text-text-muted' : isPower ? 'text-red' : 'text-text-secondary'
      }`}>
        {label}
      </span>
      <div className={`w-3 h-3 rounded-full border ${
        used
          ? 'border-transparent'
          : isGnd
            ? 'border-text-muted/30 bg-text-muted/10'
            : isPower
              ? 'border-red/30 bg-red/10'
              : 'border-border bg-bg-surface'
      }`}
        style={used ? { backgroundColor: used.color } : {}}
        title={used ? `${used.sensorName}: ${used.pinName}` : label}
      />
      <span className={`text-[8px] font-mono ${side === 'right' ? 'text-right' : 'text-left'} w-4`}>
        {pin}
      </span>
    </div>
  );
}
