const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * 텍스트의 감성을 분석합니다.
 * @param {string} text - 분석할 텍스트
 * @returns {Promise<{sentiment: string, confidence: number, reason: string}>}
 */
async function analyzeSentiment(text) {
  const prompt = `
    다음 텍스트의 감성을 분석하여 반드시 아래 JSON 형식으로만 응답하세요.
    JSON 형식:
    {
      "sentiment": "긍정" | "부정" | "중립",
      "confidence": 0-100 사이의 숫자,
      "reason": "분석 이유 (한국어)"
    }

    텍스트: "${text}"
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "당신은 감성 분석 전문가입니다. 응답은 반드시 지정된 JSON 형식이어야 합니다." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    // 유효성 검사 (AGENTS.md 규칙 준수)
    const validSentiments = ["긍정", "부정", "중립"];
    if (!validSentiments.includes(result.sentiment)) {
      result.sentiment = "중립";
    }

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  analyzeSentiment
};
