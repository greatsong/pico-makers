import dotenv from 'dotenv';
dotenv.config({ override: true });
import express from 'express';
import cors from 'cors';
import { streamClaudeResponse } from '../lib/claudeStream.js';

const app = express();
const PORT = 4020;

const ALLOWED_ORIGINS = [
  'http://localhost:4019',
  'https://pico-makers.vercel.app',
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS 정책에 의해 차단되었습니다.'));
    }
  },
}));
app.use(express.json({ limit: '10mb' }));

// Claude API 스트리밍 프록시
app.post('/api/chat', async (req, res) => {
  const { messages, system } = req.body;
  try {
    await streamClaudeResponse({ messages, system }, res);
  } catch (error) {
    console.error('Claude API 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// URL 분석
app.post('/api/fetch-url', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PicoMakers/1.0)' },
    });
    const html = await response.text();
    const textContent = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 5000);

    const analysisResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        system: `당신은 Raspberry Pi Pico 2 WH 전문가입니다. 웹페이지 내용을 분석해서 Pico 관련 정보를 안내하세요. 한국어로 답변하세요.`,
        messages: [{ role: 'user', content: `이 웹페이지를 분석해주세요:\n\nURL: ${url}\n\n${textContent}` }],
      }),
    });
    const analysisData = await analysisResponse.json();
    res.json({ analysis: analysisData.content?.[0]?.text || '분석할 수 없습니다.' });
  } catch (error) {
    console.error('URL 분석 오류:', error);
    res.status(500).json({ error: 'URL을 분석할 수 없습니다.' });
  }
});

// 이미지 분석
app.post('/api/analyze-image', async (req, res) => {
  const { image, mediaType, sensorContext } = req.body;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        system: `당신은 Raspberry Pi Pico 2 WH 배선 전문가입니다. 배선 사진을 분석해서 피드백을 주세요.\n\n${sensorContext || ''}\n\n한국어로 답변하세요.`,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: image } },
            { type: 'text', text: '이 배선이 맞는지 확인해주세요!' },
          ],
        }],
      }),
    });
    const data = await response.json();
    res.json({ analysis: data.content?.[0]?.text || '분석할 수 없습니다.' });
  } catch (error) {
    console.error('이미지 분석 오류:', error);
    res.status(500).json({ error: '이미지를 분석할 수 없습니다.' });
  }
});

app.listen(PORT, () => {
  console.log(`Pico Makers API: http://localhost:${PORT}`);
});
