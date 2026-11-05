import test from 'node:test';
import assert from 'node:assert/strict';
import { isSameOrigin, overLimit, isBlockedIp, assertPublicHost, guardRequest } from '../requestGuard.js';

const fakeRes = () => ({ code: 0, status(c) { this.code = c; return this; }, json() { return this; } });

test('같은 출처만 통과한다', () => {
  assert.equal(isSameOrigin({ headers: { origin: 'https://pico-makers.vercel.app', host: 'pico-makers.vercel.app' } }), true);
  assert.equal(isSameOrigin({ headers: { origin: 'https://evil.example', host: 'pico-makers.vercel.app' } }), false);
  assert.equal(isSameOrigin({ headers: { host: 'pico-makers.vercel.app' } }), false);
});

test('한도를 넘으면 막는다', () => {
  const ip = 'limit-test';
  for (let i = 0; i < 3; i++) assert.equal(overLimit(ip, 3, 1000), false);
  assert.equal(overLimit(ip, 3, 1000), true);
  assert.equal(overLimit(ip, 3, 70_000), false);
});

test('사설·예약 대역을 차단한다', () => {
  for (const ip of ['127.0.0.1', '10.0.0.1', '172.16.0.1', '192.168.0.1', '169.254.169.254', '100.64.0.1', '0.0.0.0', '::1', 'fc00::1', 'fe80::1', '::ffff:127.0.0.1', 'not-an-ip']) {
    assert.equal(isBlockedIp(ip), true, ip);
  }
  for (const ip of ['8.8.8.8', '1.1.1.1', '2606:4700:4700::1111']) assert.equal(isBlockedIp(ip), false, ip);
});

test('이름이 내부 IP 로 풀리면 막는다', async () => {
  await assert.rejects(assertPublicHost('rebind.example', async () => [{ address: '8.8.8.8' }, { address: '10.0.0.5' }]));
  await assert.doesNotReject(assertPublicHost('ok.example', async () => [{ address: '8.8.8.8' }]));
  await assert.rejects(assertPublicHost('[::1]'));
});

test('guardRequest 는 다른 출처를 403 으로 막는다', () => {
  const res = fakeRes();
  assert.equal(guardRequest({ headers: { origin: 'https://evil.example', host: 'a.vercel.app' }, body: {} }, res), false);
  assert.equal(res.code, 403);
  const ok = fakeRes();
  assert.equal(guardRequest({ headers: { origin: 'https://a.vercel.app', host: 'a.vercel.app', 'x-forwarded-for': '1.2.3.4' }, body: { m: 1 } }, ok), true);
  assert.equal(ok.code, 0);
});
