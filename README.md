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
- [프로젝트 구조](#-프로젝트-구조)
- [배포](#-배포)
- [광고 시스템](#-광고-시스템)
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
- **Ad Network**: Google AdSense (수동 배치 전용, Auto Ads 비활성화)
- **Ad Types**: Display Banner, Native In-feed, In-article
- **Placement Strategy**: 14개 위치별 슬롯으로 리포트 분리 측정
- **Policy Compliance**: 콘텐츠가 있는 경로에만 AdSense 스크립트 로드

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

# Google Analytics (선택)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# === Google AdSense (선택) ===
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX

# 레거시(fallback) 슬롯 - 아래 위치별 슬롯 중 비어있는 position이 사용
NEXT_PUBLIC_ADSENSE_SLOT_RESULT=XXXXXXXXXX

# 위치별 광고 슬롯 (AdSense 콘솔 → 광고 단위 기준에서 개별 생성 후 입력)
# 비워두면 위 NEXT_PUBLIC_ADSENSE_SLOT_RESULT로 자동 fallback

# 홈 화면 (/)
NEXT_PUBLIC_ADSENSE_SLOT_HOME_HERO=
NEXT_PUBLIC_ADSENSE_SLOT_HOME_FAQ=

# 분석 결과 화면
NEXT_PUBLIC_ADSENSE_SLOT_RESULT_INTEREST=
NEXT_PUBLIC_ADSENSE_SLOT_RESULT_REPLY=
NEXT_PUBLIC_ADSENSE_SLOT_RESULT_SECRET=
NEXT_PUBLIC_ADSENSE_SLOT_RESULT_FOOTER=

# 블로그 목록 (/blog)
NEXT_PUBLIC_ADSENSE_SLOT_BLOG_LIST_HERO=
NEXT_PUBLIC_ADSENSE_SLOT_BLOG_LIST_FEED=

# 블로그 글 (/blog/[slug])
NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST_TOP=
NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST_BODY=
NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST_CTA=
NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST_FOOTER=

# 법적 고지
NEXT_PUBLIC_ADSENSE_SLOT_PRIVACY=
NEXT_PUBLIC_ADSENSE_SLOT_TERMS=
```

### 환경 변수 설명

| 변수명 | 필수 | 설명 |
|--------|------|------|
| `OPENAI_API_KEY` | ✅ | OpenAI API 키. [발급 받기](https://platform.openai.com/api-keys) |
| `NEXT_PUBLIC_KAKAO_APP_KEY` | ❌ | 카카오 공유 기능용 JavaScript 키 |
| `NEXT_PUBLIC_GA_ID` | ❌ | Google Analytics 측정 ID |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | ❌ | Google AdSense 클라이언트 ID (`ca-pub-*`) |
| `NEXT_PUBLIC_ADSENSE_SLOT_RESULT` | ❌ | 레거시 fallback 슬롯. 위치별 슬롯이 비어있을 때 사용됨 |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` (14개) | ❌ | 위치별 슬롯. 비워두면 `_RESULT`로 자동 fallback |

> 📘 **참고**:
> - `NEXT_PUBLIC_` 접두사가 붙은 변수는 클라이언트에서 접근 가능합니다
> - AdSense 슬롯은 점진적으로 채울 수 있습니다 — 하나씩 생성할 때마다 해당 위치만 분리 측정됨
> - 위치별 슬롯 14개의 역할은 [광고 시스템](#-광고-시스템) 섹션 참조

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
│   │   ├── og/               # Open Graph 이미지 생성 (Edge Runtime)
│   │   └── chat/             # 채팅 분석 (레거시)
│   ├── blog/                 # 블로그 (카카오톡 분석 가이드)
│   │   ├── page.tsx          # 블로그 목록
│   │   ├── [slug]/           # 블로그 글 (동적 라우트)
│   │   ├── blogData.ts       # 포스트 메타데이터
│   │   └── posts/            # 포스트 콘텐츠
│   ├── privacy/              # 개인정보처리방침
│   ├── terms/                # 이용약관
│   ├── layout.tsx            # 루트 레이아웃
│   ├── page.tsx              # 홈 페이지 (SPA: home/loading/result)
│   ├── not-found.tsx         # 404 페이지
│   ├── robots.ts             # robots.txt 생성
│   ├── sitemap.ts            # sitemap.xml 생성
│   └── globals.css           # 전역 스타일
├── components/               # React 컴포넌트
│   ├── ads/                  # 광고 컴포넌트
│   │   ├── AdSenseScript.tsx # 경로 기반 조건부 스크립트 로더
│   │   ├── AdUnit.tsx        # 기본 AdSense 광고 단위
│   │   └── ResultPageAd.tsx  # 위치별 position prop 지원
│   ├── Header.tsx            # 헤더
│   ├── HomeScreen.tsx        # 홈 화면 (파일 업로드 + 분석 미리보기 + 가이드 + FAQ + 블로그 아티클)
│   ├── LoadingScreen.tsx     # 로딩 화면 (광고 없음 - 정책)
│   ├── ResultScreen.tsx      # 분석 결과 화면 (Bento Grid)
│   ├── ErrorModal.tsx        # 에러 모달
│   ├── ShareCard.tsx         # 공유 카드 (이미지 생성용)
│   └── ShareModal.tsx        # 공유 모달
├── contexts/                 # React Context
│   └── LanguageContext.tsx   # 다국어 지원 (ko/en/ja/zh)
├── translations/             # 번역 파일
├── hooks/                    # Custom Hooks
│   ├── useCountUp.ts
│   └── useScrollAnimation.ts
├── utils/                    # 유틸리티 함수
│   ├── chatParser.ts         # 카카오톡 대화 파싱
│   ├── sanitize.ts           # 입력 검증 / XSS 방지
│   ├── validation.ts         # 유효성 검사
│   ├── animations.ts         # Framer Motion 애니메이션 설정
│   ├── language.ts           # 언어 감지
│   └── shareUtils.ts         # 공유 URL 생성
├── types/                    # TypeScript 타입 정의
│   └── index.ts
├── config/                   # 설정 파일
├── scripts/                  # 빌드/유지보수 스크립트
├── public/                   # 정적 파일
│   ├── icons/                # 아이콘
│   └── manifest.json         # PWA manifest
├── docs/                     # 문서
│   └── ADSENSE_SETUP.md      # AdSense 설정 가이드
├── middleware.ts             # Next.js 미들웨어 (Rate limiting)
├── next.config.mjs           # Next.js 설정 (redirects, headers)
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

## 📢 광고 시스템

### 개요

본 프로젝트는 **Google AdSense 수동 배치(Manual Placement)** 방식을 사용합니다.
Auto Ads는 정책 위반 리스크와 UX 제어 손실 때문에 사용하지 않습니다.

### 정책 준수 아키텍처

AdSense의 **"게시자 콘텐츠가 없는 화면에 광고" 정책**을 준수하기 위한 2중 방어 구조:

#### 1. 경로 기반 스크립트 게이팅

`components/ads/AdSenseScript.tsx`가 `usePathname()`으로 현재 경로를 검사하고,
콘텐츠가 있는 경로에서만 `adsbygoogle.js`를 로드합니다.

```typescript
const ADSENSE_ALLOWED_PATHS: readonly RegExp[] = [
  /^\/$/,                     // 홈
  /^\/blog(\/.*)?$/,          // 블로그 목록 및 포스트
  /^\/privacy(\/.*)?$/,       // 개인정보처리방침
  /^\/terms(\/.*)?$/,         // 이용약관
]
```

다음 경로는 AdSense 스크립트 자체가 로드되지 않습니다:
- `/_not-found` (404 페이지)
- `/api/*` (API 라우트)
- 리다이렉트 경로

#### 2. `/share/*` 서버 레벨 리다이렉트

`next.config.mjs`에서 `/share/:path*`를 `/`로 **301 영구 리다이렉트**합니다.
이전에는 `app/share/[id]/page.tsx`가 `redirect('/')` 한 줄만 있는 **순수 네비게이션 화면**이었으나,
정책 위반 소지가 있어 페이지 자체를 제거했습니다.

```javascript
// next.config.mjs
async redirects() {
  return [
    {
      source: '/share/:path*',
      destination: '/',
      permanent: true,
    },
  ]
}
```

> ⚠️ **트레이드오프**: 기존의 동적 OG 메타태그(공유 시 개인화된 점수 썸네일) 기능이 사라졌습니다.
> 추후 콘텐츠가 있는 랜딩 페이지로 복원 가능합니다.

### 위치별 슬롯 시스템

`components/ads/ResultPageAd.tsx`는 선택적 `position` prop으로 위치별 슬롯을 지원합니다.
AdSense 콘솔에서 위치별 광고 단위를 개별 생성하면 **리포트에서 위치별 수익을 분리 측정** 가능합니다.

```typescript
<ResultPageAd type="banner" position="home-hero" />
```

위치별 슬롯이 `.env`에 설정되지 않으면 레거시 `NEXT_PUBLIC_ADSENSE_SLOT_RESULT`로 자동 fallback되므로,
**점진적 전환**이 가능합니다. 한 번에 14개 슬롯을 전부 생성할 필요 없이 하나씩 채워 넣을 수 있습니다.

### 현재 광고 배치 현황 (총 13개)

| 페이지 | 광고 수 | Position | 위치 설명 |
|---|---:|---|---|
| `/` (홈) | 1 | `home-faq` | 블로그 아티클 섹션 아래 (native) |
| `/` (결과 화면) | 4 | `result-interest` | Interest Score 다음 (banner) |
| | | `result-reply` | Reply Patterns 다음 (native) |
| | | `result-secret` | SECRET REPORT 다음 (banner) |
| | | `result-footer` | Footer 바로 위 (native) |
| `/blog` (목록) | 2 | `blog-list-hero` | Hero 섹션 직후 (banner) |
| | | `blog-list-feed` | 6번째 카드 뒤 in-feed (native, col-span-full) |
| `/blog/[slug]` (글) | 4 | `blog-post-top` | Article Header와 Body 사이 (banner) |
| | | `blog-post-body` | Article Body 다음 (banner) |
| | | `blog-post-cta` | CTA 섹션 다음 (native) |
| | | `blog-post-footer` | Footer 위 (banner) |
| `/privacy` | 1 | `privacy` | 페이지 하단 (banner) |
| `/terms` | 1 | `terms` | 페이지 하단 (banner) |

**광고가 표시되지 않는 화면** (정책 준수):
- 로딩 화면 (SPA 내 `loading` state)
- 404 페이지
- 에러 모달, 공유 모달 (네비게이션 목적)
- 홈 히어로/업로드 섹션 직후 (`home-hero` 슬롯 제거 — 콘텐츠 없는 화면 정책 위반 소지)

### 새 광고 배치 추가하기

1. **AdSense 콘솔에서 광고 단위 생성**
   - 광고 → 광고 단위 기준 → 디스플레이 광고
   - 이름을 position 키와 동일하게 지정 (예: `home-hero`)

2. **환경변수 추가 또는 값 입력**
   - `.env.local`에 `NEXT_PUBLIC_ADSENSE_SLOT_<POSITION>=1234567890` 추가
   - 신규 position이라면 `ResultPageAd.tsx`의 `POSITION_SLOT_MAP`에도 추가

3. **JSX에 배치**
   ```tsx
   import ResultPageAd from '@/components/ads/ResultPageAd'

   <ResultPageAd type="banner" position="your-new-position" />
   ```

4. **⚠️ 정책 체크리스트**
   - [ ] 해당 경로가 `ADSENSE_ALLOWED_PATHS`에 포함되어 있는가?
   - [ ] 주변에 충분한 게시자 콘텐츠가 있는가?
   - [ ] 버튼/네비게이션 옆에 배치되어 실수 클릭을 유발하지 않는가?
   - [ ] 로딩/에러/404/리다이렉트 화면이 아닌가?

### AdSense 재검토 요청 시 필수 작업

1. **Vercel 환경변수 설정**
   - Dashboard → Settings → Environment Variables
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 추가
   - 위치별 슬롯은 선택 (fallback 동작)

2. **AdSense 콘솔에서 Auto Ads OFF**
   - 광고 → 사이트별 설정 → 해당 사이트 → **자동 광고 OFF**
   - ⚠️ 이 단계 누락 시 위 게이팅 구조와 무관하게 정책 위반 재발 가능

3. **배포 후 프로덕션 검증**
   ```
   /share/result?score=85    → / 로 301 리다이렉트 확인
   /존재하지않는경로            → DevTools Network 탭에서 adsbygoogle.js 없음 확인
   /                          → adsbygoogle.js 로드됨 확인
   ```

4. **정책 센터에서 "검토 요청" 제출**
   - AdSense 콘솔 → 정책 센터 → 해당 사이트 → "수정 완료 - 검토 요청"

### 검토 후 처리 가이드

재검토 결과는 **승인 / 재거부 / 대기** 세 가지 시나리오가 가능합니다.
각 시나리오별 대응 절차:

#### 🟢 시나리오 A: 검토 통과 (승인)

**1단계: 광고 실제 노출 확인 (배포 직후 ~ 며칠)**

승인 직후에도 광고가 바로 안 뜰 수 있습니다. Google이 사이트를 크롤링하고
광고를 매칭하는 데 **수 시간 ~ 2일** 걸립니다.

- 프로덕션 사이트를 **시크릿 모드**로 접속 (본인 계정은 노출 제한 걸릴 수 있음)
- `/`, `/blog`, `/blog/kakaotalk-export-guide` 등에서 광고 위치(14곳)에 실제 광고가 뜨는지 확인
- **3일 지나도 안 뜬다면** → AdSense 콘솔 → 광고 → 사이트에서 상태가 "준비됨"인지 확인

**2단계: 수익 최적화 (1~2주 데이터 축적 후)**

지금은 14개 광고가 1개 레거시 슬롯을 공유 중이라 위치별 수익을 알 수 없습니다.
**가장 중요한 3~5개 위치만 먼저 분리**하는 걸 권장:

우선 분리 대상 (수익 영향 순):
1. `blog-post-top` — 블로그 본문 상단 (수익 가능성 최고)
2. `home-faq` — 홈 블로그 섹션 아래 (노출 수 최대)
3. `result-secret` — 결과 화면 SECRET REPORT 다음 (몰입도 최고)
4. `blog-list-feed` — 블로그 목록 in-feed
5. `blog-post-body` — 블로그 본문 다음

각 위치별 작업 순서 (위치당 약 10분):

1. [AdSense 콘솔](https://www.google.com/adsense/) → 광고 → **광고 단위 기준** → "+광고 단위 만들기" → "디스플레이 광고"
2. 이름에 position 키(예: `mindscanner-blog-post-top`) 입력 → 생성 → **10자리 슬롯 ID 복사**
3. [Vercel Dashboard](https://vercel.com/dashboard) → 프로젝트 → **Settings** → **Environment Variables**
4. Key: `NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST_TOP`, Value: 복사한 슬롯 ID, Environment: **Production** → Save
5. 모든 슬롯 입력 완료 후 **Deployments** → 최신 배포 `...` → **Redeploy** (환경변수 반영에는 재배포 필수)

**3단계: 2주 후 리포트 분석**

- AdSense 콘솔 → **보고서** → "광고 단위" 기준으로 그룹화
- 각 위치별 **클릭수, CTR, RPM** 비교
- 수익 낮은 위치는 제거, 높은 위치는 유지 또는 근처에 추가 배치

**4단계: 지급 임계값 ($100) 도달 시**

- AdSense 콘솔 → **지급** → 지급 정보 입력 (은행 계좌, PIN 인증)
- PIN 인증: Google이 실물 우편 발송 (한국 기준 2~4주)
- 매월 21일경 잔액 $100 이상이면 자동 지급

#### 🔴 시나리오 B: 검토 재거부

**1단계: 정책 센터에서 정확한 위반 사유 확인**

AdSense 콘솔 → **정책 센터** → 사이트 클릭 → 위반 항목 상세 확인

- 같은 사유(게시자 콘텐츠 없는 화면)로 재거부 → 아직 수정이 덜 반영됐다는 뜻
- 다른 사유로 재거부 → 새로운 문제 발견됨

**2단계: 같은 사유로 재거부된 경우 체크리스트**

- [ ] **Auto Ads가 정말 꺼졌는가?** — 가장 흔한 재거부 원인. 토글이 회색(OFF) 상태여야 함
- [ ] **프로덕션에서 제외 경로 실제로 차단되는가?**
  1. 시크릿 모드로 `/존재하지않는경로` 접속
  2. DevTools → Network 탭에 `adsbygoogle` 필터
  3. **결과가 비어있어야 정상**. 로드되면 코드가 배포 안 됐거나 Auto Ads가 ON
- [ ] **`/share/*` 리다이렉트 정상 작동하는가?** — `/share/result?score=85` → `/`로 301 확인
- [ ] **새로 발견된 빈 화면이 있는가?** — 새로 추가한 페이지가 빈 화면인지 확인

**3단계: 다른 정책 사유로 재거부된 경우**

재거부 사유를 그대로 복사해 코드 작업자에게 전달. 사유별 대응:

| 사유 | 대응 방향 |
|---|---|
| 가치가 낮은 콘텐츠 | 블로그 포스트 품질/길이 개선, 중복 제거 |
| 저작권 침해 | 카카오톡 로고/이미지 사용 검토 |
| 사용자 유도 및 클릭 | 광고 근처 "클릭해주세요" 문구 제거 |
| 개인정보 관련 | `/privacy` 페이지 강화, 데이터 처리 방식 명시 |

#### 🟡 시나리오 C: 검토 결과 대기 (1~6주)

Google 재검토는 보통 **1~4주**, 길면 **6주** 걸립니다. 대기 중:

**할 것:**
- 기다리기 (독촉 방법 없음, Google 고객 지원 응답 거의 없음)
- **블로그 포스트 추가 작성** → 콘텐츠 가치 상승 → 검토 긍정적 영향
- SEO 최적화, SNS 유입 등으로 트래픽 상승

**하지 말 것:**
- ❌ **광고 코드 수정/삭제** (검토 중 코드 변경 시 기준이 흔들림)
- ❌ **반복적인 "검토 요청" 클릭** (오히려 처리 지연)
- ❌ **다른 광고 네트워크 동시 추가** (승인 후 고려)

**대기 중 할 수 있는 개선 작업 (광고 무관):**

1. **블로그 글 추가 작성** — 현재 10개 → 20개로 확장 시 SEO + 검토 통과율 상승
2. **[Google Search Console](https://search.google.com/search-console) 등록** — 사이트 인덱싱 관리
3. **[Naver Search Advisor](https://searchadvisor.naver.com/) 등록** — 한국 사용자 대상이라면 필수
4. **sitemap.xml 제출** — `app/sitemap.ts`가 자동 생성 중. Search Console에서 `/sitemap.xml` 등록

#### 📅 타임라인 요약

| 시점 | 작업 |
|---|---|
| 검토 결과 전 | 기다리기 + 블로그 글 추가 + Search Console 등록 |
| 승인 직후 | 프로덕션 광고 노출 확인 (시크릿 모드) |
| 승인 +1주 | 페이지 RPM 기준선 파악 |
| 승인 +2주 | 상위 5개 위치별 슬롯 생성 & Vercel 재배포 |
| 승인 +4주 | 리포트 분석 → 수익 낮은 위치 제거 |
| 수익 $100 도달 | 지급 정보 입력 + PIN 인증 (우편 2~4주) |
| 재거부 시 | 사유 확인 → Auto Ads 체크 → 프로덕션 검증 |

#### ⚠️ 검토 중 가장 중요한 원칙

**승인 나기 전까지는 AdSense 관련 코드/설정 건드리지 말 것.**
검토 중 기간에 관련 코드가 바뀌면 Google이 처음부터 검토를 다시 시작하거나 기준이 흔들릴 수 있습니다.
정책과 무관한 기능 개발(블로그 글 추가, 다국어 개선 등)은 괜찮습니다.

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
