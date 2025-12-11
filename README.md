# 속마음 스캐너 💘

> AI가 카카오톡 대화를 분석하여 두 사람의 관계와 호감도를 측정하는 웹 애플리케이션

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[🌐 데모 보기](#) | [📖 문서](#-문서) | [🤝 기여하기](#-기여하기)

---

## 📖 목차

- [소개](#-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [환경 변수 설정](#-환경-변수-설정)
- [개발 가이드](#-개발-가이드)
- [배포](#-배포)
- [프로젝트 구조](#-프로젝트-구조)
- [문서](#-문서)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)

---

## 🎯 소개

**속마음 스캐너**는 카카오톡 대화 내용을 AI로 분석하여 두 사람의 관계 역학, 호감도, 대화 패턴을 측정하는 무료 웹 서비스입니다.

### 특징
- 🔒 **완벽한 개인정보 보호**: 모든 분석은 클라이언트에서 처리되며 서버에 저장되지 않습니다
- 🚀 **빠른 분석**: 10초 이내 실시간 분석
- 🎨 **Neo-Brutalism 디자인**: 트렌디하고 독특한 UI/UX
- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원
- 🤖 **AI 기반 분석**: OpenAI GPT를 활용한 정교한 심리 분석

---

## ✨ 주요 기능

### 1. 📊 종합 분석 리포트
- **호감도 점수** (0-100점): AI가 대화 패턴을 종합하여 계산
- **관계 역학**: 두 사람의 관계 유형 및 주도권 분석
- **대화 통계**: 메시지 수, 답장 속도, 이모티콘 사용량 등

### 2. 💬 상세 대화 분석
- **답장 패턴**: 평균 답장 시간, 즉답률
- **24시간 활동 패턴**: 대화가 가장 활발한 시간대
- **감정 표현**: ㅋㅋㅋ, 이모지 사용 빈도
- **관심도 지수**: 질문, 메시지 길이 기반 관심도 측정

### 3. 🎭 심리 프로필
- **대화 성향 분석**: 12가지 성향 타입 자동 매칭
- **상호 인식**: 서로를 어떻게 생각하는지 분석
- **AI 맞춤 조언**: 각 사람에게 맞는 개별 공략법

### 4. 🔓 SECRET REPORT
- 광고 시청 후 잠금 해제
- 더 깊이 있는 심리 분석
- AI가 제공하는 프리미엄 인사이트

### 5. 🎁 공유 기능
- 분석 결과를 이미지로 저장
- 카카오톡 공유
- SNS 공유 최적화 (Open Graph)

---

## 🛠 기술 스택

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)

### Backend
- **API Routes**: Next.js API Routes
- **AI**: [OpenAI API](https://openai.com/) (GPT-4o-mini)
- **Rate Limiting**: Custom middleware

### Deployment
- **Hosting**: [Vercel](https://vercel.com/)
- **CDN**: Vercel Edge Network
- **Analytics**: Google Analytics (optional)

### Ads
- **Ad Network**: Google AdSense
- **Ad Types**: Display, Native, Interstitial

---

## 🚀 시작하기

### 사전 요구사항

- **Node.js** 18.x 이상
- **npm** 또는 **yarn**
- **OpenAI API Key** (필수)
- **Google AdSense** (선택, 수익화 시)

### 설치

```bash
# 저장소 클론
git clone https://github.com/yourusername/mind-scanner.git
cd mind-scanner

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 API 키 입력

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 🔐 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```bash
# OpenAI API (필수)
OPENAI_API_KEY=sk-proj-your-api-key-here

# Kakao JavaScript Key (선택)
NEXT_PUBLIC_KAKAO_APP_KEY=your-kakao-app-key

# Google AdSense (선택)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_RESULT=XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_INTERSTITIAL=XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=XXXXXXXXXX
```

### 환경 변수 설명

| 변수명 | 필수 | 설명 |
|--------|------|------|
| `OPENAI_API_KEY` | ✅ | OpenAI API 키. [발급 받기](https://platform.openai.com/api-keys) |
| `NEXT_PUBLIC_KAKAO_APP_KEY` | ❌ | 카카오 공유 기능용 JavaScript 키 |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | ❌ | Google AdSense 클라이언트 ID |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` | ❌ | 각 광고 단위별 슬롯 ID |

> 📘 **참고**: `NEXT_PUBLIC_` 접두사가 붙은 변수는 클라이언트에서 접근 가능합니다.

---

## 💻 개발 가이드

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
npm start
```

### 린트 실행

```bash
npm run lint
```

### 타입 체크

```bash
npx tsc --noEmit
```

---

## 📁 프로젝트 구조

```
mind-scanner/
├── app/                      # Next.js App Router
│   ├── api/                  # API 라우트
│   │   ├── analyze/          # AI 분석 API
│   │   ├── og/               # Open Graph 이미지 생성
│   │   └── chat/             # 채팅 분석 (레거시)
│   ├── layout.tsx            # 루트 레이아웃
│   ├── page.tsx              # 홈 페이지
│   ├── globals.css           # 전역 스타일
│   └── share/                # 공유 페이지
├── components/               # React 컴포넌트
│   ├── ads/                  # 광고 컴포넌트
│   │   ├── AdSenseScript.tsx
│   │   ├── AdUnit.tsx
│   │   ├── InterstitialAd.tsx
│   │   └── ResultPageAd.tsx
│   ├── Header.tsx            # 헤더
│   ├── HomeScreen.tsx        # 홈 화면
│   ├── LoadingScreen.tsx     # 로딩 화면
│   ├── ResultScreen.tsx      # 결과 화면
│   ├── ErrorModal.tsx        # 에러 모달
│   └── ShareModal.tsx        # 공유 모달
├── hooks/                    # Custom Hooks
│   ├── useCountUp.ts
│   └── useScrollAnimation.ts
├── utils/                    # 유틸리티 함수
│   ├── chatParser.ts         # 대화 파싱
│   ├── sanitize.ts           # 입력 검증
│   ├── validation.ts         # 유효성 검사
│   ├── animations.ts         # 애니메이션 설정
│   └── shareUtils.ts         # 공유 유틸
├── types/                    # TypeScript 타입 정의
│   └── index.ts
├── public/                   # 정적 파일
│   ├── icons/                # 아이콘
│   └── manifest.json         # PWA manifest
├── docs/                     # 문서
│   └── ADSENSE_SETUP.md      # AdSense 설정 가이드
├── middleware.ts             # Next.js 미들웨어 (Rate limiting)
├── next.config.mjs           # Next.js 설정
├── tailwind.config.ts        # Tailwind CSS 설정
└── tsconfig.json             # TypeScript 설정
```

---

## 🚢 배포

### Vercel 배포 (권장)

1. **GitHub 저장소에 푸시**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Vercel에 연결**
   - [Vercel](https://vercel.com/) 로그인
   - "New Project" 클릭
   - GitHub 저장소 선택
   - 환경 변수 입력
   - Deploy 클릭

3. **환경 변수 설정**
   - Vercel 대시보드 → Settings → Environment Variables
   - `.env.local`의 모든 변수 추가
   - Production, Preview, Development 체크

4. **커스텀 도메인 연결** (선택)
   - Settings → Domains
   - 도메인 입력 및 DNS 설정

---

## 📚 문서

- [📝 AdSense 설정 가이드](docs/ADSENSE_SETUP.md)
- [🔧 API 문서](docs/API.md) _(작성 예정)_
- [🎨 디자인 가이드](docs/DESIGN.md) _(작성 예정)_
- [🧪 테스트 가이드](docs/TESTING.md) _(작성 예정)_

---

## 🤝 기여하기

기여를 환영합니다! 다음 방법으로 기여할 수 있습니다:

### 기여 방법

1. **Fork** 이 저장소
2. **Feature 브랜치** 생성 (`git checkout -b feature/AmazingFeature`)
3. **변경사항 커밋** (`git commit -m 'Add some AmazingFeature'`)
4. **브랜치에 푸시** (`git push origin feature/AmazingFeature`)
5. **Pull Request** 생성

### 코딩 컨벤션

- **TypeScript** 사용
- **ESLint** 규칙 준수
- **Prettier** 포매팅 적용
- **의미있는 커밋 메시지** 작성

---

## 📄 라이선스

이 프로젝트는 **MIT License** 하에 배포됩니다.

---

## 👥 제작자

**Oceancode**

- 💼 Website: [http://oceancode.site/](http://oceancode.site/)
- 📧 Email: oceancode0321@gmail.com

---

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 프로젝트들에 의존합니다:

- [Next.js](https://nextjs.org/)
- [OpenAI](https://openai.com/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Chart.js](https://www.chartjs.org/)

---

<div align="center">

**속마음 스캐너와 함께 관계의 진실을 발견하세요! **

Made with by Oceancode

[⬆ 맨 위로 이동](#속마음-스캐너-)

</div>
