import { streamClaudeResponse } from '../lib/claudeStream.js';
import { guardRequest } from '../lib/requestGuard.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!guardRequest(req, res)) return;

  const { messages, system } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 100) {
    return res.status(400).json({ error: '메시지 형식이 올바르지 않습니다.' });
  }

  try {
    await streamClaudeResponse({ messages, system }, res);
  } catch (error) {
    console.error('Claude API 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}
