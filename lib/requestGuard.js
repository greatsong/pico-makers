// Vercel 서버리스 API 공통 보호 — 로그인이 없는 서비스라 키 남용을 줄이는 최소 장치
// 같은 출처 검사는 다른 사이트의 브라우저 호출만 막는다. curl 처럼 Origin 을 위조하는 호출은 횟수 제한으로 줄인다.
// 횟수 제한은 함수 인스턴스별 메모리 기준이라 근사치다. 학교 NAT 뒤 학급 전체가 한 IP 를 쓰므로 한도를 넉넉히 둔다.
import dns from 'node:dns/promises';
import net from 'node:net';

const WINDOW_MS = 60_000;
const hits = new Map(); // ip → 최근 요청 시각 목록

function clientIp(req) {
  const fwd = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || req.socket?.remoteAddress || 'unknown';
}

export function isSameOrigin(req) {
  const origin = req.headers.origin;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === String(host).split(',')[0].trim();
  } catch {
    return false;
  }
}

export function overLimit(ip, limit, now = Date.now()) {
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}

/** 통과하면 true. 막으면 응답을 보내고 false 를 돌려준다. */
export function guardRequest(req, res, { limit = 120, maxBytes = 300_000 } = {}) {
  if (!isSameOrigin(req)) {
    res.status(403).json({ error: '허용되지 않은 요청입니다.' });
    return false;
  }
  if (overLimit(clientIp(req), limit)) {
    res.status(429).json({ error: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.' });
    return false;
  }
  if (JSON.stringify(req.body ?? '').length > maxBytes) {
    res.status(413).json({ error: '요청이 너무 큽니다.' });
    return false;
  }
  return true;
}

/** 사설·예약 대역 IP 인지 판정한다. 판정할 수 없으면 차단 쪽으로 본다. */
export function isBlockedIp(ip) {
  const v = net.isIP(ip);
  if (v === 4) {
    const [a, b] = ip.split('.').map(Number);
    return a === 0 || a === 10 || a === 127 || a >= 224
      || (a === 100 && b >= 64 && b <= 127)
      || (a === 169 && b === 254)
      || (a === 172 && b >= 16 && b <= 31)
      || (a === 192 && b === 168)
      || (a === 192 && b === 0)
      || (a === 198 && (b === 18 || b === 19));
  }
  if (v === 6) {
    const s = ip.toLowerCase();
    const mapped = s.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isBlockedIp(mapped[1]);
    return s === '::' || s === '::1' || s.startsWith('::ffff:') || /^f[cd]/.test(s) || /^fe[89ab]/.test(s) || s.startsWith('ff');
  }
  return true;
}

/** 주소의 이름이 가리키는 IP 전부를 검사한다. 사설 대역이 하나라도 있으면 throw. */
export async function assertPublicHost(hostname, lookup = dns.lookup) {
  const name = hostname.replace(/^\[|\]$/g, '');
  const addrs = net.isIP(name) ? [{ address: name }] : await lookup(name, { all: true });
  if (!addrs.length || addrs.some((a) => isBlockedIp(a.address))) {
    throw new Error('내부 네트워크 주소에 대한 접근은 차단됩니다.');
  }
}
