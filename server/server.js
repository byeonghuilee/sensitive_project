const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// 환경 변수 로드
dotenv.config();

const openaiService = require('./services/openai-service');
const supabaseService = require('./services/supabase-service');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 감성 분석 API 엔드포인트
app.post('/analyze', async (req, res) => {
  const { text } = req.body;

  // 1. 입력 검증
  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: '텍스트를 입력해주세요.' });
  }

  if (text.length > 1000) {
    return res.status(400).json({ error: '텍스트는 1000자 이내로 입력해주세요.' });
  }

  try {
    // 2. OpenAI 감성 분석 요청
    const analysis = await openaiService.analyzeSentiment(text);

    // 3. Supabase DB 저장
    await supabaseService.logSentiment({
      input_text: text,
      sentiment: analysis.sentiment,
      confidence: analysis.confidence,
      reason: analysis.reason
    });

    // 4. 결과 반환
    res.json(analysis);
  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500).json({ error: '분석 중 오류가 발생했습니다.' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
