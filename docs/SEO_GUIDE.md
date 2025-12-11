# SEO 최적화 가이드

## 📋 목차
1. [적용된 SEO 최적화](#적용된-seo-최적화)
2. [메타데이터 및 구조화 데이터](#메타데이터-및-구조화-데이터)
3. [사이트맵 및 Robots.txt](#사이트맵-및-robotstxt)
4. [성능 최적화](#성능-최적화)
5. [검색 엔진 등록](#검색-엔진-등록)
6. [SEO 체크리스트](#seo-체크리스트)
7. [추가 개선 사항](#추가-개선-사항)

---

## ✅ 적용된 SEO 최적화

### 1. 메타데이터 최적화
- ✅ **Title 태그**: 키워드 최적화 (60자 이내)
- ✅ **Description**: 설명적이고 매력적인 메타 설명 (160자 이내)
- ✅ **Keywords**: 관련 키워드 17개 추가
- ✅ **Open Graph**: 소셜 미디어 공유 최적화
- ✅ **Twitter Cards**: 트위터 공유 최적화
- ✅ **Canonical URL**: 중복 콘텐츠 방지
- ✅ **Author & Publisher**: 제작자 및 발행자 정보

### 2. 구조화된 데이터 (JSON-LD)
- ✅ **WebSite Schema**: 웹사이트 정보
- ✅ **SoftwareApplication Schema**: 앱 정보 및 기능 목록
- ✅ **Organization Schema**: 회사 정보 및 연락처
- ✅ **FAQPage Schema**: 자주 묻는 질문 6개
- ✅ **BreadcrumbList Schema**: 탐색 경로
- ✅ **SearchAction**: 검색 기능 (향후 구현 가능)

### 3. 사이트맵 및 Robots.txt
- ✅ **Sitemap.xml**: 자동 생성 (`/sitemap.xml`)
  - 메인 페이지 (우선순위 1.0)
  - 개인정보처리방침 (우선순위 0.5)
  - 이용약관 (우선순위 0.5)
- ✅ **Robots.txt**: 크롤러 제어 (`/robots.txt`)
  - Google, Naver 크롤러 최적화
  - API 라우트 차단
  - 중복 콘텐츠 차단 (/share/)

### 4. 법적 페이지
- ✅ **개인정보처리방침** (`/privacy`)
  - AdSense 승인에 필수
  - 사용자 신뢰도 향상
- ✅ **이용약관** (`/terms`)
  - 서비스 정책 명시
  - 법적 보호

### 5. 성능 최적화
- ✅ **이미지 최적화**: WebP 포맷 사용
- ✅ **Gzip 압축**: 활성화
- ✅ **보안 헤더**: X-Frame-Options, CSP 등
- ✅ **SWC 컴파일러**: 빠른 빌드 및 번들 크기 감소
- ✅ **소스맵 비활성화**: 프로덕션 보안 강화

### 6. 내부 링크
- ✅ Footer에 정책 페이지 링크 추가
- ✅ 404 페이지에서 홈으로 복귀 링크

---

## 📊 메타데이터 및 구조화 데이터

### Open Graph 메타 태그
```html
<meta property="og:type" content="website">
<meta property="og:locale" content="ko_KR">
<meta property="og:url" content="https://mindscanner.com">
<meta property="og:site_name" content="속마음 스캐너">
<meta property="og:title" content="너와 나의 속마음 스캐너 💘">
<meta property="og:description" content="우리 사이, 썸일까? 10초 만에 카톡 대화 분석!">
<meta property="og:image" content="/api/og?score=85&relation=💕 썸 타는 중">
```

### JSON-LD 구조화 데이터
위치: `app/layout.tsx`

주요 스키마:
1. **WebSite**: 웹사이트 기본 정보
2. **SoftwareApplication**: 앱 기능 및 평점
3. **Organization**: Oceancode 회사 정보
4. **FAQPage**: 자주 묻는 질문
5. **BreadcrumbList**: 네비게이션 경로

---

## 🗺️ 사이트맵 및 Robots.txt

### Sitemap.xml
위치: `/sitemap.xml` (자동 생성)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mindscanner.com</loc>
    <lastmod>2025-01-XX</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mindscanner.com/privacy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://mindscanner.com/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### Robots.txt
위치: `/robots.txt` (자동 생성)

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /share/
Crawl-delay: 1

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /share/

User-agent: Yeti
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /share/

Sitemap: https://mindscanner.com/sitemap.xml
```

---

## ⚡ 성능 최적화

### Next.js 설정 (next.config.mjs)

#### 1. 이미지 최적화
```javascript
images: {
  formats: ['image/webp'],  // WebP 포맷 사용
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

#### 2. 보안 헤더
```javascript
headers: [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
]
```

#### 3. 압축 및 최적화
- Gzip 압축: ✅
- SWC 컴파일러: ✅
- React Strict Mode: ✅
- 소스맵 비활성화: ✅

### 빌드 결과
```
Route (app)                  Size     First Load JS
┌ ○ /                        130 kB   212 kB
├ ○ /privacy                 181 B    88.9 kB
└ ○ /terms                   181 B    88.9 kB
```

**평가:**
- ✅ 메인 페이지: 212 kB (권장: < 300 kB)
- ✅ 정책 페이지: 88.9 kB (매우 가벼움)
- ✅ 전체 번들 크기 최적화됨

---

## 🔍 검색 엔진 등록

### 1. Google Search Console
1. https://search.google.com/search-console 방문
2. 속성 추가 → 도메인 입력
3. 소유권 확인:
   - **방법 1**: HTML 파일 업로드
   - **방법 2**: `app/layout.tsx`의 `verification.google` 주석 해제 후 인증 코드 입력

   ```typescript
   verification: {
     google: 'YOUR_GOOGLE_VERIFICATION_CODE',
   }
   ```
4. Sitemap 제출: `https://mindscanner.com/sitemap.xml`

### 2. 네이버 서치어드바이저
1. https://searchadvisor.naver.com 방문
2. 사이트 등록
3. 소유권 확인:
   ```typescript
   verification: {
     other: {
       'naver-site-verification': 'YOUR_NAVER_VERIFICATION_CODE',
     },
   }
   ```
4. 사이트맵 제출

### 3. Bing Webmaster Tools
1. https://www.bing.com/webmasters 방문
2. 사이트 추가
3. Sitemap 제출

---

## ✅ SEO 체크리스트

### 기본 SEO
- [x] Title 태그 최적화 (60자 이내)
- [x] Meta Description 최적화 (160자 이내)
- [x] Keywords 메타 태그 추가
- [x] Open Graph 태그
- [x] Twitter Cards 태그
- [x] Canonical URL 설정
- [x] Favicon 및 Apple Touch Icon
- [x] Robots.txt 생성
- [x] Sitemap.xml 생성

### 구조화 데이터
- [x] WebSite Schema
- [x] SoftwareApplication Schema
- [x] Organization Schema
- [x] FAQPage Schema
- [x] BreadcrumbList Schema

### 법적 페이지
- [x] 개인정보처리방침
- [x] 이용약관
- [x] Footer 링크 추가

### 성능
- [x] 이미지 최적화 (WebP)
- [x] Gzip 압축
- [x] 보안 헤더
- [x] 번들 크기 최적화
- [x] 404 페이지 커스터마이징

### 접근성
- [x] Semantic HTML
- [x] Alt 텍스트 (이미지)
- [x] ARIA 레이블 (필요시)
- [x] 키보드 네비게이션
- [x] 모바일 반응형

### 검색 엔진 등록
- [ ] Google Search Console
- [ ] 네이버 서치어드바이저
- [ ] Bing Webmaster Tools
- [ ] Sitemap 제출

---

## 🚀 추가 개선 사항

### 1. 콘텐츠 추가
- [ ] **블로그 섹션**: SEO에 매우 유리
  - "카톡 대화 분석으로 보는 연애 심리 TOP 10"
  - "썸과 어장의 차이, AI가 알려드립니다"
  - "호감도 높이는 카톡 대화법"
- [ ] **사용 후기**: 사용자 리뷰 섹션
- [ ] **통계 페이지**: "지금까지 XX건의 대화 분석"

### 2. 기술적 SEO
- [ ] **Schema.org Review**: 사용자 리뷰 구조화 데이터
- [ ] **Video Schema**: 사용법 영상이 있다면
- [ ] **Local Business Schema**: 회사 위치 정보 (선택)
- [ ] **Breadcrumbs**: 시각적 breadcrumb UI 추가

### 3. 외부 링크 (백링크)
- [ ] 소셜 미디어 프로필 생성
  - Instagram: @mindscanner
  - Twitter: @mindscanner
  - Facebook Page
- [ ] 커뮤니티 홍보
  - 에브리타임
  - 오픈채팅
  - 네이버 카페
- [ ] 언론 보도 자료 배포

### 4. Core Web Vitals 개선
- [ ] **LCP (Largest Contentful Paint)**: < 2.5초
  - 현재: 우수 (이미지 최적화 완료)
- [ ] **FID (First Input Delay)**: < 100ms
  - 현재: 우수 (SPA 구조)
- [ ] **CLS (Cumulative Layout Shift)**: < 0.1
  - 확인 필요: 광고 로딩 시 레이아웃 이동 최소화

### 5. 국제화 (선택)
- [ ] 영어 버전 추가 (`/en`)
- [ ] `hreflang` 태그 추가
- [ ] 다국어 sitemap

---

## 📈 SEO 모니터링

### Google Search Console 주요 지표
1. **검색 노출수**: 검색 결과에 노출된 횟수
2. **클릭수**: 실제 사이트 방문 횟수
3. **CTR (클릭률)**: 클릭수 / 노출수
4. **평균 순위**: 검색 결과에서의 평균 위치

### Google Analytics (권장)
```bash
npm install @next/third-parties
```

`app/layout.tsx`에 추가:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

<body>
  <GoogleAnalytics gaId="G-XXXXXXXXXX" />
  {children}
</body>
```

### 주요 검색 키워드 목표
1. **메인 키워드**:
   - 카톡 대화 분석
   - 카카오톡 분석
   - 썸 테스트
   - 호감도 테스트

2. **롱테일 키워드**:
   - 카톡으로 누가 더 좋아하는지 알 수 있나요
   - 카톡 대화 AI 분석 무료
   - 어장관리 구별법
   - 썸남 썸녀 구별

---

## 🔧 개발자 도구

### SEO 분석 도구
1. **Google Lighthouse**: Chrome DevTools → Lighthouse
   - 성능, 접근성, SEO 점수 확인
2. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Core Web Vitals 측정
3. **Schema Markup Validator**: https://validator.schema.org/
   - JSON-LD 구조화 데이터 검증
4. **Rich Results Test**: https://search.google.com/test/rich-results
   - Google 리치 결과 미리보기

### SEO 체크 명령어
```bash
# 빌드 후 bundle 크기 확인
npm run build

# 로컬에서 프로덕션 모드 실행
npm run build && npm start

# sitemap 확인
curl http://localhost:3000/sitemap.xml

# robots.txt 확인
curl http://localhost:3000/robots.txt
```

---

## 📝 배포 후 체크리스트

### Vercel 배포 시
1. [ ] 환경 변수 설정 확인
2. [ ] 커스텀 도메인 연결
3. [ ] HTTPS 활성화 (자동)
4. [ ] Sitemap 접근 확인: `https://yourdomain.com/sitemap.xml`
5. [ ] Robots.txt 확인: `https://yourdomain.com/robots.txt`
6. [ ] Open Graph 이미지 확인: https://www.opengraph.xyz/

### SEO 등록
1. [ ] Google Search Console에 sitemap 제출
2. [ ] 네이버 서치어드바이저에 sitemap 제출
3. [ ] Bing Webmaster Tools에 sitemap 제출
4. [ ] Google Analytics 연동 (선택)

---

## 🎯 성공 지표

### 1개월 후 목표
- Google 검색 노출: 100+ 회
- 유기적 트래픽: 50+ 방문/일
- 평균 세션 시간: 2분 이상
- 이탈률: < 60%

### 3개월 후 목표
- 주요 키워드 1페이지 랭킹 (10위 이내)
- 유기적 트래픽: 500+ 방문/일
- 백링크: 10+ 개
- 도메인 권위: 20+

---

## 🆘 문제 해결

### Sitemap이 표시되지 않는 경우
```bash
# 빌드 후 확인
npm run build
npm start
curl http://localhost:3000/sitemap.xml
```

### Google Search Console에서 "발견됨 - 색인 생성 안 됨"
- 원인: 새 사이트는 크롤링에 시간이 걸림
- 해결: URL 검사 → 색인 생성 요청

### 검색 결과에 나타나지 않음
- 시간 필요: 보통 1-4주 소요
- 백링크 확보: 다른 사이트에서 링크 걸기
- 콘텐츠 추가: 블로그 포스트 작성

---

## 📚 참고 자료

- [Next.js SEO 가이드](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google 검색 센터](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Web.dev SEO](https://web.dev/learn/seo/)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)

---

**SEO는 장기적인 전략입니다. 꾸준한 콘텐츠 업데이트와 모니터링이 중요합니다!** 🚀
