# 프로젝트 초기 설정

# 목표

프로젝트 실행 가능한 기본 환경 구성.

---

# 설치 패키지

```bash
npm init -y
npm install express cors dotenv openai @supabase/supabase-js
```

---

# 개발 서버 실행

```bash
node server/server.js
```

---

# 환경 변수

.env 파일 생성:

```env
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

---

# 폴더 구조

```text
public/
server/
docs/
```

---

# 완료 기준

- 서버 실행 성공
- 환경 변수 정상 로딩
- 기본 HTML 페이지 출력
