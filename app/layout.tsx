import type { Metadata } from 'next'
import Script from 'next/script'
import { Noto_Sans_KR, Jua } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/contexts/LanguageContext'
import AdBlockNotice from '@/components/ads/AdBlockNotice'
import JsonLd from '@/components/site/JsonLd'
import { DEFAULT_OG_IMAGE, SITE_URL, siteConfig } from '@/config/seo'
import './globals.css'

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

// 전 페이지 공통 메타데이터. canonical·og:url·제목·설명은 각 페이지가 직접 지정한다.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '카카오톡 대화 분석 - 답장 속도·선톡 비율로 보는 대화 패턴 | 속마음 스캐너',
    template: '%s | 속마음 스캐너',
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name, url: `${SITE_URL}/about` }],
  creator: siteConfig.author.name,
  publisher: siteConfig.name,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
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
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Google Search Console 인증 코드 발급 후 활성화
    other: {
      'naver-site-verification': 'ca7d9e9325192484a6872107f38420227b08f97f',
      // AdSense 사이트 소유 확인
      'google-adsense-account': siteConfig.adsensePublisherId,
    },
  },
  category: 'entertainment',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

// 전 페이지 공통 구조화 데이터: 사이트와 운영자 정보만 둔다.
// FAQ·글·경로(breadcrumb) 데이터는 해당 내용이 실제로 보이는 페이지에서 출력한다.
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: siteConfig.name,
      alternateName: siteConfig.nameEn,
      description: siteConfig.description,
      inLanguage: 'ko-KR',
      publisher: { '@id': `${SITE_URL}/#publisher` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#publisher`,
      name: siteConfig.author.name,
      description: `${siteConfig.name}를 만들고 운영하는 ${siteConfig.author.role}`,
      url: `${SITE_URL}/about`,
      email: siteConfig.author.email,
      sameAs: [siteConfig.author.url],
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
        <JsonLd data={siteJsonLd} />

        {/* 카카오 SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          strategy="lazyOnload"
        />

        {/* Favicon */}
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
          <AdBlockNotice />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}