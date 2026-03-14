import SENSORS from '../data/sensors';

/**
 * 여러 센서의 MicroPython 코드를 통합하는 유틸리티
 * 구조: imports → 설정 → 함수 정의 → while True 루프
 */
export function combineCode(activeSensors, shieldMode) {
  if (activeSensors.length === 0) return null;
  if (activeSensors.length === 1) {
    const sensor = SENSORS[activeSensors[0]];
    const modeData = shieldMode ? sensor?.shield : sensor?.direct;
    return modeData?.code || null;
  }

  const parts = activeSensors.map(id => {
    const sensor = SENSORS[id];
    if (!sensor) return null;
    const modeData = shieldMode ? sensor.shield : sensor.direct;
    if (!modeData?.code) return null;
    return { id, name: sensor.name, icon: sensor.icon, code: modeData.code };
  }).filter(Boolean);

  if (parts.length === 0) return null;

  // 각 코드를 파싱
  const parsed = parts.map(p => parseCode(p));

  // 병합
  const merged = mergeCodeParts(parsed);
  return merged;
}

function parseCode(part) {
  const lines = part.code.split('\n');
  const imports = [];
  const setup = [];
  const functions = [];
  const loopBody = [];

  let section = 'top'; // top → setup → function → loop
  let funcBuffer = [];
  let inFunction = false;
  let inLoop = false;
  let loopIndent = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();

    // import 문
    if (trimmed.startsWith('from ') || trimmed.startsWith('import ')) {
      imports.push(trimmed);
      continue;
    }

    // 빈 줄 / 주석 (top 영역)
    if (section === 'top' && (trimmed === '' || trimmed.startsWith('#'))) {
      // 주석은 setup에 추가
      if (trimmed.startsWith('#')) setup.push(line);
      continue;
    }

    // while True 감지
    if (trimmed.startsWith('while True:') || trimmed.startsWith('while True :')) {
      section = 'loop';
      inLoop = true;
      loopIndent = null;
      continue;
    }

    // def 함수 감지
    if (trimmed.startsWith('def ')) {
      section = 'function';
      inFunction = true;
      funcBuffer = [line];
      continue;
    }

    if (inFunction) {
      // 함수 내부 (들여쓰기가 있는 동안)
      if (trimmed === '' || line.startsWith('    ') || line.startsWith('\t')) {
        funcBuffer.push(line);
      } else {
        // 함수 끝
        functions.push(funcBuffer.join('\n'));
        inFunction = false;
        funcBuffer = [];
        // 이 줄은 다시 처리
        if (trimmed.startsWith('while True')) {
          section = 'loop';
          inLoop = true;
          loopIndent = null;
        } else {
          setup.push(line);
        }
      }
      continue;
    }

    if (inLoop) {
      // while True 내부
      if (loopIndent === null && trimmed !== '') {
        loopIndent = line.length - trimmed.length;
      }
      loopBody.push(line);
      continue;
    }

    // 그 외는 setup
    if (trimmed !== '') {
      section = 'setup';
    }
    setup.push(line);
  }

  // 남은 함수 버퍼
  if (funcBuffer.length > 0) {
    functions.push(funcBuffer.join('\n'));
  }

  return {
    id: part.id,
    name: part.name,
    icon: part.icon,
    imports,
    setup: setup.filter(l => l.trim() !== ''),
    functions,
    loopBody: loopBody.filter(l => l.trim() !== ''),
  };
}

function mergeCodeParts(parts) {
  // 1. import 병합
  const machineImports = new Set();
  const otherImports = new Set();

  for (const part of parts) {
    for (const imp of part.imports) {
      const machineMatch = imp.match(/^from machine import (.+)$/);
      if (machineMatch) {
        machineMatch[1].split(',').map(s => s.trim()).forEach(s => machineImports.add(s));
      } else {
        otherImports.add(imp);
      }
    }
  }

  const lines = [];

  // imports
  if (machineImports.size > 0) {
    lines.push(`from machine import ${[...machineImports].join(', ')}`);
  }
  for (const imp of otherImports) {
    lines.push(imp);
  }

  // 2. 센서별 setup
  for (const part of parts) {
    lines.push('');
    lines.push(`# ── ${part.icon} ${part.name} 설정 ──`);
    for (const line of part.setup) {
      lines.push(line);
    }
  }

  // 3. 함수 정의
  for (const part of parts) {
    if (part.functions.length > 0) {
      lines.push('');
      for (const fn of part.functions) {
        lines.push(fn);
      }
    }
  }

  // 4. while True 루프
  lines.push('');
  lines.push('# ── 메인 루프 ──');
  lines.push('while True:');
  for (const part of parts) {
    if (part.loopBody.length > 0) {
      lines.push(`    # ${part.icon} ${part.name}`);
      for (const line of part.loopBody) {
        lines.push(line);
      }
      lines.push('');
    }
  }
  // 마지막 빈 줄 제거
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  // time.sleep 통합 — 마지막에 하나만
  const result = lines.join('\n');
  return result;
}
