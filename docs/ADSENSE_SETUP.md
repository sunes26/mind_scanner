# Google AdSense 설정 가이드

## 📋 목차
1. [사전 준비](#사전-준비)
2. [AdSense 승인 받기](#adsense-승인-받기)
3. [승인 후 설정](#승인-후-설정)
4. [광고 단위 생성](#광고-단위-생성)
5. [환경 변수 설정](#환경-변수-설정)
6. [테스트 및 배포](#테스트-및-배포)
7. [수익 최적화](#수익-최적화)

---

## 🎯 사전 준비

### 1. 웹사이트 배포
AdSense 승인을 받으려면 먼저 사이트가 온라인에 배포되어 있어야 합니다.

**권장 배포 플랫폼:**
- ✅ **Vercel** (추천) - Next.js 최적화
- ✅ **Netlify**
- ✅ **AWS Amplify**

**Vercel 배포 방법:**
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 2. 도메인 연결
- 무료 도메인: `.vercel.app` (승인 가능하지만 권장하지 않음)
- **권장**: 커스텀 도메인 구매 (GoDaddy, Namecheap, Gabia 등)

### 3. 사이트 품질 확인
AdSense 승인을 위한 최소 요구사항:
- ✅ 충분한 콘텐츠 (10페이지 이상 권장)
- ✅ 고유한 콘텐츠 (복사/붙여넣기 금지)
- ✅ 개인정보 처리방침 페이지
- ✅ 이용약관 페이지
- ✅ 연락처 정보
- ✅ About 페이지
- ✅ 최소 6개월 이상 된 도메인 (권장)

---

## 📝 AdSense 승인 받기

### 1단계: AdSense 계정 생성
1. https://www.google.com/adsense 방문
2. Google 계정으로 로그인
3. "시작하기" 클릭

### 2단계: 사이트 등록
1. 웹사이트 URL 입력 (예: `https://mindscanner.com`)
2. 언어 선택: **한국어**
3. 국가/지역: **대한민국**

### 3단계: AdSense 코드 삽입
AdSense에서 제공하는 코드를 `<head>` 태그에 삽입합니다.

**이미 구현됨!**
`app/layout.tsx`에서 `<AdSenseScript />` 컴포넌트가 자동으로 처리합니다.

```typescript
// app/layout.tsx
<body className="min-h-screen flex flex-col">
  <AdSenseScript />  {/* ✅ 이미 추가됨 */}
  {children}
</body>
```

### 4단계: 승인 대기
- ⏱️ **소요 시간**: 보통 1-2주 (최대 4주)
- 📧 **알림**: 승인/거절 결과는 이메일로 통보
- 🔍 **확인**: AdSense 대시보드에서 상태 확인

### 승인이 거절된 경우
일반적인 거절 사유:
- ❌ 콘텐츠 부족
- ❌ 저품질 콘텐츠
- ❌ 정책 위반 (성인, 도박, 불법 콘텐츠 등)
- ❌ 트래픽 부족

**해결 방법:**
1. 콘텐츠 추가 (블로그 포스트, 가이드 등)
2. SEO 최적화
3. 30일 후 재신청

---

## ✅ 승인 후 설정

### 1단계: 클라이언트 ID 확인
1. AdSense 대시보드 로그인
2. **계정 → 설정 → 계정 정보** 이동
3. **게시자 ID** 복사 (형식: `ca-pub-XXXXXXXXXXXXXXXX`)

### 2단계: 광고 단위 생성
AdSense 대시보드에서 **광고 → 광고 단위** 메뉴로 이동

---

## 🎨 광고 단위 생성

이 앱에서는 **3가지 광고 단위**가 필요합니다.

### 1. 배너 광고 (결과 페이지용)

**생성 방법:**
1. **광고 → 개요 → 광고 단위 기준** 클릭
2. **디스플레이 광고** 선택
3. 설정:
   - **이름**: `MindScanner-Result-Banner`
   - **광고 크기**: 반응형
   - **광고 유형**: 텍스트 및 디스플레이 광고
4. **만들기** 클릭
5. **광고 코드** 팝업에서 `data-ad-slot="XXXXXXXXXX"` 값 복사

### 2. 네이티브 광고 (홈 페이지용)

**생성 방법:**
1. **광고 → 개요 → 광고 단위 기준** 클릭
2. **인피드 광고** 선택
3. 설정:
   - **이름**: `MindScanner-Home-Native`
   - **광고 크기**: 반응형
4. **만들기** 클릭
5. `data-ad-slot` 값 복사

### 3. 전면 광고 (SECRET REPORT 언락용)

**생성 방법:**
1. **광고 → 개요 → 광고 단위 기준** 클릭
2. **디스플레이 광고** 선택
3. 설정:
   - **이름**: `MindScanner-Interstitial`
   - **광고 크기**: 전체 화면 (336x280 권장)
4. **만들기** 클릭
5. `data-ad-slot` 값 복사

---

## 🔐 환경 변수 설정

### 로컬 개발 환경 (`.env.local`)

```bash
# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
NEXT_PUBLIC_ADSENSE_SLOT_RESULT=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_INTERSTITIAL=0987654321
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=5555555555
```

### Vercel 배포 환경

1. Vercel 대시보드 로그인
2. 프로젝트 선택
3. **Settings → Environment Variables** 이동
4. 각 변수 추가:

| 변수 이름 | 값 | 환경 |
|----------|-----|------|
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-pub-XXXXXXXX` | Production, Preview, Development |
| `NEXT_PUBLIC_ADSENSE_SLOT_RESULT` | `XXXXXXXXXX` | Production, Preview, Development |
| `NEXT_PUBLIC_ADSENSE_SLOT_INTERSTITIAL` | `XXXXXXXXXX` | Production, Preview, Development |

5. **Save** 클릭
6. **Redeploy** 클릭 (환경 변수 적용)

---

## 🧪 테스트 및 배포

### 1. 로컬 테스트

```bash
# .env.local 파일에 실제 AdSense ID 입력 후
npm run dev
```

브라우저에서 확인:
- 개발자 도구 → Console에서 에러 확인
- 광고가 로드되는지 확인 (실제 광고는 1-2시간 후 표시될 수 있음)

### 2. 프로덕션 빌드 테스트

```bash
npm run build
npm start
```

### 3. Vercel에 배포

```bash
git add .
git commit -m "Add AdSense integration"
git push origin main
```

Vercel이 자동으로 배포합니다.

### 4. 광고 표시 확인

**주의:**
- 광고가 즉시 표시되지 않을 수 있습니다 (최대 48시간 소요)
- 처음에는 빈 공간이나 플레이스홀더가 표시될 수 있습니다
- AdSense 크롤러가 사이트를 방문해야 광고가 활성화됩니다

---

## 💰 수익 최적화

### 1. 광고 배치 최적화

**현재 구현된 광고 위치:**
- ✅ 홈 화면 하단 (Native 광고)
- ✅ 결과 화면 하단 (Banner 광고)
- ✅ SECRET REPORT 언락 (Interstitial 광고)

**추가 권장 위치:**
- 📱 사이드바 (데스크톱)
- 📄 블로그 포스트 중간
- 🔝 헤더 아래 (배너)

### 2. 자동 광고 활성화

AdSense 대시보드에서:
1. **광고 → 개요 → 사이트별** 이동
2. 사이트 선택
3. **자동 광고** 토글 ON
4. 광고 로드 설정 조정

### 3. 광고 차단 감지

사용자가 광고 차단기를 사용하는 경우 메시지 표시:

```typescript
// 추후 구현 가능
if (adBlockDetected) {
  showMessage("광고 차단기를 사용 중이시네요! 광고 수익은 무료 서비스 운영에 사용됩니다.")
}
```

### 4. A/B 테스트

- 전면 광고 duration: 3초 vs 5초 vs 7초
- 광고 위치 변경
- 광고 크기 조정

### 5. Google Analytics 연동

```bash
npm install @next/third-parties
```

광고 클릭률, 노출수 등을 Analytics에서 추적

---

## 📊 수익 확인

### AdSense 대시보드
1. https://www.google.com/adsense 로그인
2. **보고서 → 개요** 이동
3. 수익, 클릭, 노출수 확인

### 지급 기준
- 💵 **최소 지급액**: $100 (약 130,000원)
- 📅 **지급 주기**: 월 1회 (다음 달 21-26일)
- 🏦 **지급 방법**: 은행 계좌 송금, Western Union

---

## 🚨 주의사항

### 금지 행위
- ❌ **자가 클릭**: 본인이 광고 클릭 금지
- ❌ **클릭 유도**: "광고를 클릭해주세요" 등 유도 금지
- ❌ **부정 클릭**: 봇, 자동 클릭 금지
- ❌ **콘텐츠 정책 위반**: 성인, 도박, 불법 콘텐츠

**위반 시:** 계정 영구 정지

### 정책 준수
- ✅ 개인정보 처리방침 명시
- ✅ 쿠키 동의 배너 (GDPR 준수)
- ✅ 광고 레이블 표시 ("AD", "광고" 등)

---

## 🆘 문제 해결

### 광고가 표시되지 않는 경우

1. **환경 변수 확인**
   ```bash
   # .env.local 파일 확인
   cat .env.local
   ```

2. **Console 에러 확인**
   - 브라우저 개발자 도구 → Console
   - AdSense 관련 에러 메시지 확인

3. **AdSense 계정 상태 확인**
   - AdSense 대시보드에서 계정 상태 확인
   - 정책 위반 알림 확인

4. **광고 차단기 비활성화**
   - 테스트 시 광고 차단기 끄기

5. **캐시 삭제**
   ```bash
   # Next.js 캐시 삭제
   rm -rf .next
   npm run build
   ```

### 수익이 낮은 경우

1. **트래픽 증가**
   - SEO 최적화
   - SNS 마케팅
   - 컨텐츠 마케팅

2. **클릭률 향상**
   - 광고 위치 최적화
   - A/B 테스트
   - 반응형 광고 사용

3. **고단가 키워드**
   - 금융, 보험, 부동산 등 고단가 키워드 타겟팅

---

## 📚 추가 리소스

- [Google AdSense 고객센터](https://support.google.com/adsense)
- [AdSense 정책](https://support.google.com/adsense/answer/48182)
- [광고 최적화 가이드](https://support.google.com/adsense/answer/17957)
- [AdSense 커뮤니티](https://support.google.com/adsense/community)

---

## ✅ 체크리스트

승인 후 해야 할 일:

- [ ] AdSense 클라이언트 ID 복사
- [ ] 배너 광고 단위 생성 및 슬롯 ID 복사
- [ ] 전면 광고 단위 생성 및 슬롯 ID 복사
- [ ] 네이티브 광고 단위 생성 및 슬롯 ID 복사
- [ ] `.env.local`에 ID 입력
- [ ] Vercel 환경 변수 설정
- [ ] 로컬에서 테스트
- [ ] 프로덕션 배포
- [ ] 광고 표시 확인 (48시간 대기)
- [ ] Google Analytics 연동
- [ ] 개인정보 처리방침 업데이트
- [ ] 쿠키 동의 배너 추가

---

**이 가이드를 따라하면 광고 시스템을 성공적으로 설정할 수 있습니다!** 🎉

문제가 발생하면 [GitHub Issues](https://github.com/yourusername/mind-scanner/issues)에 문의하세요.
