✅ 핵심 기능
음성 명령으로 택시 호출 (Voice API 활용)

현재 위치 자동 감지 (Geolocation API)

접근성 강화 UI (스크린 리더 호환, 큰 버튼 등)

운전기사와의 간단한 음성 또는 자동 메시지 전송

음성 안내로 택시 도착 알림

긴급 호출 버튼 (SOS)

🧩 기술 구성 요소
기능	기술 도구
위치 추적	navigator.geolocation (JavaScript 내장 API)
음성 인식	Web Speech API (SpeechRecognition)
음성 출력	Web Speech API (SpeechSynthesis)
택시 API 연동	Kakao Mobility API, T-map API, 또는 우버 API 등 외부 호출 API
접근성 향상	WAI-ARIA 속성, <button> 사용, 스크린 리더 최적화
UI 프레임워크	React.js (컴포넌트 구조), 또는 간단한 HTML/CSS + Vanilla JS
