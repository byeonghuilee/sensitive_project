const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 분석 결과를 DB에 저장합니다.
 * @param {object} logData - 저장할 데이터 객체
 */
async function logSentiment(logData) {
  try {
    const { data, error } = await supabase
      .from('sentiment_logs')
      .insert([logData]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Supabase Save Error:', error);
    // 로깅 실패가 전체 서비스 중단으로 이어지지 않도록 에러만 출력
    return null;
  }
}

module.exports = {
  logSentiment
};
