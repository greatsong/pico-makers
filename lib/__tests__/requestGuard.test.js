import test from 'node:test';
import assert from 'node:assert/strict';
import { isSameOrigin, overLimit, guardRequest } from '../requestGuard.js';

const fakeRes = () => ({ code: 0, status(c) { this.code = c; return this; }, json() { return this; } });
const same = { origin: 'https://a.vercel.app', host: 'a.vercel.app', 'x-forwarded-for': '1.2.3.4' };

test('같은 출처만 통과한다', () => {
  assert.equal(isSameOrigin({ headers: { origin: 'https://pico-makers.vercel.app', host: 'pico-makers.vercel.app' } }), true);
  assert.equal(isSameOrigin({ headers: { origin: 'https://evil.example', host: 'pico-makers.vercel.app' } }), false);
  assert.equal(isSameOrigin({ headers: { host: 'pico-makers.vercel.app' } }), false);
});

test('한도를 넘으면 막고 시간이 지나면 풀린다', () => {
  const ip = 'limit-test';
  for (let i = 0; i < 3; i++) assert.equal(overLimit(ip, 3, 1000), false);
  assert.equal(overLimit(ip, 3, 1000), true);
  assert.equal(overLimit(ip, 3, 70_000), false);
});

test('guardRequest 는 다른 출처를 403 으로 막는다', () => {
  const res = fakeRes();
  assert.equal(guardRequest({ headers: { origin: 'https://evil.example', host: 'a.vercel.app' }, body: {} }, res), false);
  assert.equal(res.code, 403);
  const ok = fakeRes();
  assert.equal(guardRequest({ headers: same, body: { m: 1 } }, ok), true);
  assert.equal(ok.code, 0);
});

test('크기는 UTF-8 바이트로 잰다', () => {
  const res = fakeRes();
  assert.equal(guardRequest({ headers: { ...same, 'x-forwarded-for': '5.6.7.8' }, body: { m: '가'.repeat(400) } }, res, { maxBytes: 1000 }), false);
  assert.equal(res.code, 413);
});

test('chat 은 빈 메시지를 거절하고 긴 대화는 통과시킨다', async (t) => {
  const { default: handler } = await import('../../api/chat.js');
  const empty = fakeRes();
  await handler({ method: 'POST', headers: { ...same, 'x-forwarded-for': '9.9.9.9' }, body: { messages: [] } }, empty);
  assert.equal(empty.code, 400);

  // 화면은 전체 대화를 보낸다. 300개가 가드를 지나 제공사 호출까지 가는지 본다(호출은 가짜)
  let called = 0;
  t.mock.method(globalThis, 'fetch', async () => { called += 1; return { ok: false, status: 503, json: async () => ({}) }; });
  const long = fakeRes();
  const messages = Array.from({ length: 300 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: '가'.repeat(500) }));
  await handler({ method: 'POST', headers: { ...same, 'x-forwarded-for': '9.9.9.10' }, body: { messages } }, long);
  assert.equal(called, 1);
  assert.equal(long.code, 503);
});
