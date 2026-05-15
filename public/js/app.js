document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loading = document.getElementById('loading');
    const resultCard = document.getElementById('resultCard');
    const errorArea = document.getElementById('errorArea');
    const charCount = document.getElementById('currentCharCount');

    // 입력창 글자수 체크
    textInput.addEventListener('input', () => {
        const length = textInput.value.length;
        charCount.textContent = length;
        if (length > 0) {
            errorArea.style.display = 'none';
        }
    });

    // 분석 버튼 클릭 이벤트
    analyzeBtn.addEventListener('click', async () => {
        const text = textInput.value.trim();

        if (!text) {
            showError('텍스트를 입력해주세요.');
            return;
        }

        // UI 상태 변경
        setLoading(true);
        resetResult();

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '분석 중 오류가 발생했습니다.');
            }

            showResult(data);
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    });

    // 다시 하기 버튼
    document.getElementById('resetBtn').addEventListener('click', () => {
        textInput.value = '';
        charCount.textContent = '0';
        resetResult();
        textInput.focus();
    });

    function setLoading(isLoading) {
        loading.style.display = isLoading ? 'flex' : 'none';
        analyzeBtn.disabled = isLoading;
        if (isLoading) {
            resultCard.style.display = 'none';
            errorArea.style.display = 'none';
        }
    }

    function showResult(data) {
        const sentimentBadge = document.getElementById('sentimentBadge');
        const confidenceFill = document.getElementById('confidenceFill');
        const confidenceText = document.getElementById('confidenceText');
        const reasonText = document.getElementById('reasonText');

        sentimentBadge.textContent = data.sentiment;
        
        // 감성에 따른 배지 색상 변경
        if (data.sentiment === '긍정') {
            sentimentBadge.style.background = '#10b981'; // 초록
        } else if (data.sentiment === '부정') {
            sentimentBadge.style.background = '#ef4444'; // 빨강
        } else {
            sentimentBadge.style.background = '#38bdf8'; // 파랑 (중립)
        }

        confidenceText.textContent = `${data.confidence}%`;
        reasonText.textContent = data.reason;

        resultCard.style.display = 'block';
        
        // 애니메이션 효과를 위해 약간의 지연 후 게이지 채움
        setTimeout(() => {
            confidenceFill.style.width = `${data.confidence}%`;
        }, 100);
    }

    function resetResult() {
        resultCard.style.display = 'none';
        document.getElementById('confidenceFill').style.width = '0';
    }

    function showError(message) {
        errorArea.textContent = message;
        errorArea.style.display = 'block';
    }
});
