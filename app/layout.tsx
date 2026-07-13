import type { Metadata } from 'next'
import Script from 'next/script'
import { Noto_Sans_KR, Jua } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

const BASE_URL = 'https://mindscanner.site'

// 폰트 최적화
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  preload: true,
  variable: '--font-noto-sans-kr',
})

const jua = Jua({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: true,
  variable: '--font-jua',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '카카오톡 대화 분석 AI - 채팅 심리와 호감도 무료 측정 | 속마음 스캐너',
    template: '%s | 속마음 스캐너',
  },
  description: '카카오톡 대화 파일(.txt)만 업로드하면 AI가 채팅 패턴을 분석해 드립니다. 답장 속도·이모티콘·대화 주도권으로 호감도와 진심 무료 측정.',
  keywords: [
    '카카오톡 대화 분석',
    '카카오톡 채팅 분석',
    '카톡 대화 분석',
    '채팅 분석',
    '대화 분석',
    '카카오톡 분석',
    '카톡 분석기',
    '카톡 심리 분석',
    '호감도 테스트',
    '썸 테스트',
    '연애 심리 테스트',
    '어장관리 구별',
    'AI 연애 상담',
    '썸남 썸녀',
    '연애 감정 분석',
    '밀당 분석',
    '누가 더 좋아하는지',
    '무료 연애 테스트',
  ],
  authors: [{ name: 'MindScanner Team', url: 'http://oceancode.site/' }],
  creator: 'Oceancode',
  publisher: 'MindScanner',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    siteName: '속마음 스캐너',
    title: '카카오톡 대화 분석 AI - 채팅 패턴으로 진심 확인 | 속마음 스캐너',
    description: '카카오톡 대화 파일 업로드만으로 AI가 채팅 심리를 분석해 드립니다. 호감도·진심·관계 주도권 무료 측정.',
    images: [
      {
        url: '/api/og?score=85&relation=💕 썸 타는 중',
        width: 1200,
        height: 630,
        alt: '속마음 스캐너 - AI 카톡 대화 분석',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '너와 나의 속마음 스캐너 💘',
    description: '우리 사이, 썸일까? AI가 카톡 대화를 분석해드려요!',
    images: ['/api/og?score=85&relation=💕 썸 타는 중'],
    creator: '@mindscanner',
    site: '@mindscanner',
  },
  verification: {
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Google Search Console 인증 코드 발급 후 활성화
    other: {
      'naver-site-verification': 'ca7d9e9325192484a6872107f38420227b08f97f',
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: 'entertainment',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

// JSON-LD 구조화된 데이터
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // 웹사이트 정보
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: '속마음 스캐너',
      description: 'AI 카카오톡 대화 분석 도구. 채팅 패턴·답장 속도·이모티콘으로 호감도와 진심을 무료로 측정합니다.',
      inLanguage: 'ko-KR',
      publisher: {
        '@id': `${BASE_URL}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    // 소프트웨어 애플리케이션 정보
    {
      '@type': 'SoftwareApplication',
      '@id': `${BASE_URL}/#app`,
      name: '속마음 스캐너',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Web Browser',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KRW',
        availability: 'https://schema.org/InStock',
      },
      description: '카카오톡 대화 내용을 AI가 분석하여 두 사람의 호감도와 심리를 분석해주는 무료 웹 어플리케이션입니다.',
      featureList: [
        '호감도 점수 측정 (0-100점)',
        '관계 역학 및 주도권 분석',
        '대화 통계 분석 (메시지 수, 답장 속도)',
        '24시간 활동 패턴 분석',
        '감정 표현 분석 (이모지, ㅋㅋㅋ 빈도)',
        'AI 기반 맞춤 조언',
        '완벽한 개인정보 보호',
      ],
      author: {
        '@id': `${BASE_URL}/#organization`,
      },
    },
    // 조직 정보
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Oceancode',
      url: 'http://oceancode.site/',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon.svg`,
        width: '512',
        height: '512',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'oceancode0321@gmail.com',
        contactType: 'customer service',
        availableLanguage: ['Korean', 'English'],
      },
      sameAs: [
        'http://oceancode.site/',
      ],
    },
    // FAQ 구조화 데이터
    {
      '@type': 'FAQPage',
      '@id': `${BASE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: '카톡 대화 분석은 정말 무료인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, 속마음 스캐너는 기본적으로 무료로 제공됩니다. 카카오톡 대화 내용을 업로드하여 호감도와 심리를 무료로 분석해 보세요.',
          },
        },
        {
          '@type': 'Question',
          name: '개인정보는 안전한가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, 절대적으로 안전합니다. 모든 대화 내용은 서버에 저장되지 않으며, 분석 후 즉시 삭제됩니다. Stateless 아키텍처로 완벽한 익명성을 보장합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '누가 더 좋아하는지 알 수 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '물론입니다. AI가 답장 속도, 이모티콘 사용량, 대화 주도권, 질문 빈도 등을 종합적으로 분석하여 두 사람 중 누가 더 호감이 높은지 정확히 알려드립니다.',
          },
        },
        {
          '@type': 'Question',
          name: '어떤 파일 형식을 지원하나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '카카오톡에서 내보낸 .txt 파일을 지원합니다. PC 카카오톡과 모바일 카카오톡 모두에서 내보낸 파일을 분석할 수 있습니다.',
          },
        },
        {
          '@type': 'Question',
          name: '분석 결과는 얼마나 정확한가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '최신 AI 기술을 활용하여 대화 패턴을 분석합니다. 대화량이 많을수록 더 정확한 분석 결과를 제공합니다. 다만, 결과는 참고용이며 실제 관계는 다양한 요소에 영향을 받습니다.',
          },
        },
        {
          '@type': 'Question',
          name: '분석 시간은 얼마나 걸리나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '대부분의 경우 10초 이내에 분석이 완료됩니다. 대화량이 매우 많은 경우 최대 30초 정도 소요될 수 있습니다.',
          },
        },
      ],
    },
    // 빵부스러기 (Breadcrumb) 구조화 데이터
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '홈',
          item: BASE_URL,
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${jua.variable}`}>
      <head>
        {/* JSON-LD 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* 카카오 SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          strategy="lazyOnload"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* 테마 색상 */}
        <meta name="theme-color" content="#FBBF24" />
        <meta name="msapplication-TileColor" content="#FBBF24" />

      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        </LanguageProvider>
      </body>
    </html>
  )
}