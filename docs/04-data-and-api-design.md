# 데이터 및 API 설계

# Supabase 테이블

## 테이블명
sentiment_logs

---

# 컬럼 구조

| 컬럼명 | 타입 |
|---|---|
| id | uuid |
| input_text | text |
| sentiment | text |
| confidence | int |
| reason | text |
| created_at | timestamp |

---

# API 구조

## POST /analyze

감성 분석 요청 API

---

# 서버 처리 순서

1. 입력 검증
2. OpenAI 요청
3. 응답 정리
4. DB 저장
5. 클라이언트 반환

---

# 완료 기준

- DB 저장 성공
- API 응답 형식 유지
