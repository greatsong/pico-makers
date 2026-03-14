import SENSORS from '../data/sensors';

// I2C 공유 핀 (SDA/SCL은 공유 가능)
const I2C_SHARED_PINS = new Set(['SDA', 'SCL']);

/**
 * 활성 센서들의 핀 충돌을 감지합니다.
 * @param {string[]} activeSensors - 활성 센서 ID 배열
 * @param {boolean} shieldMode - Grove Shield 모드 여부
 * @returns {{ conflicts: Array<{pin, gp, sensors}>, warnings: string[] }}
 */
export function detectPinConflicts(activeSensors, shieldMode) {
  const pinUsage = new Map(); // GP번호 → [{sensorId, pinName}]
  const i2cAddresses = new Map(); // I2C 주소 → [sensorId]
  const conflicts = [];
  const warnings = [];

  for (const sensorId of activeSensors) {
    const sensor = SENSORS[sensorId];
    if (!sensor) continue;

    // I2C 주소 충돌 체크
    if (sensor.protocol === 'I2C' && sensor.address) {
      const addr = sensor.address.toLowerCase();
      if (!i2cAddresses.has(addr)) {
        i2cAddresses.set(addr, []);
      }
      i2cAddresses.get(addr).push(sensorId);
    }

    const modeData = shieldMode ? sensor.shield : sensor.direct;
    if (!modeData) continue;

    for (const pin of modeData.pins) {
      if (pin.gp === null) continue; // VCC/GND는 공유 OK

      const gpKey = pin.gp;
      if (!pinUsage.has(gpKey)) {
        pinUsage.set(gpKey, []);
      }
      pinUsage.get(gpKey).push({ sensorId, pinName: pin.sensor });
    }
  }

  // GP핀 충돌 검사
  for (const [gp, users] of pinUsage) {
    if (users.length <= 1) continue;

    // I2C SDA/SCL은 공유 가능 (같은 버스)
    const allI2C = users.every(u => I2C_SHARED_PINS.has(u.pinName));
    if (allI2C) continue;

    conflicts.push({
      pin: `GP${gp}`,
      gp,
      sensors: users.map(u => u.sensorId),
      pinNames: users.map(u => u.pinName),
    });
  }

  // I2C 주소 충돌 검사
  for (const [addr, sensors] of i2cAddresses) {
    if (sensors.length > 1) {
      warnings.push(`I2C 주소 충돌! ${addr}를 사용하는 센서: ${sensors.join(', ')}`);
    }
  }

  // ADC 핀 사용 경고
  const adcPins = [26, 27, 28];
  for (const gp of adcPins) {
    const users = pinUsage.get(gp);
    if (users && users.length > 0) {
      const nonADC = users.filter(u => {
        const sensor = SENSORS[u.sensorId];
        return sensor && sensor.protocol !== '아날로그';
      });
      if (nonADC.length > 0) {
        // This is fine, just informational
      }
    }
  }

  return { conflicts, warnings };
}

/**
 * 사용 중인 핀 맵 생성
 * @returns {Map<number, {sensorId, pinName, color}>}
 */
export function buildPinMap(activeSensors, shieldMode) {
  const pinMap = new Map();

  for (const sensorId of activeSensors) {
    const sensor = SENSORS[sensorId];
    if (!sensor) continue;

    const modeData = shieldMode ? sensor.shield : sensor.direct;
    if (!modeData) continue;

    for (const pin of modeData.pins) {
      if (pin.gp === null && !pin.picoName?.includes('3.3V') && !pin.picoName?.includes('GND')) continue;

      pinMap.set(pin.pico, {
        sensorId,
        sensorName: sensor.name,
        pinName: pin.sensor,
        picoName: pin.picoName,
        color: pin.wire,
        label: pin.label,
      });
    }
  }

  return pinMap;
}
