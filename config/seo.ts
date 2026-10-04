// 사이트 전역 설정 — URL·브랜드·연락처는 여기 한 곳에서만 관리한다
import type { Metadata } from 'next'

export const SITE_URL = 'https://www.mindscanner.site'

export const siteConfig = {
  name: '속마음 스캐너',
  nameEn: 'Mind Scanner',
  title: '속마음 스캐너 - 카톡 대화 분석',
  description:
    '카카오톡 대화 파일(.txt)을 올리면 답장 속도·메시지 길이·질문 빈도·대화 시작 비율을 계산하고, 규칙으로 애정 지수와 대화 성향을 진단하는 무료 도구입니다. 대화 내용은 브라우저 밖으로 나가지 않습니다.',
  url: SITE_URL,
  locale: 'ko_KR',
  launchedAt: '2025-10-15',
  author: {
    name: 'Oceancode',
    role: '1인 개발자',
    url: 'http://oceancode.site/',
    email: 'oceancode0321@gmail.com',
  },
  // AdSense 게시자 ID (ads.txt, google-adsense-account 메타 태그에 사용)
  adsensePublisherId: 'ca-pub-2394800264580446',
} as const

export const COPYRIGHT_TEXT = `© 2025–${new Date().getFullYear()} ${siteConfig.name} (${siteConfig.nameEn}) · Made by ${siteConfig.author.name}`

/** 사이트 내부 경로를 절대 URL로 변환 */
export function absoluteUrl(path = '/'): string {
  if (path === '/' || path === '') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

type OpenGraph = NonNullable<Metadata['openGraph']>

export interface OgImage {
  url: string
  width: number
  height: number
  alt: string
}

export const DEFAULT_OG_IMAGE: OgImage = {
  url: '/og-default.png',
  width: 1200,
  height: 630,
  alt: '속마음 스캐너 - 카카오톡 대화 분석',
}

interface PageSeoInput {
  title: string
  description: string
  /** 사이트 내부 경로 ('/blog' 등) */
  path: string
  image?: OgImage
}

/**
 * 페이지별 canonical + Open Graph + Twitter 메타데이터.
 * Next는 openGraph를 얕게 병합하므로, 페이지가 openGraph를 지정할 때는
 * 공통 필드(siteName·locale·images)를 매번 함께 넣어야 한다.
 */
export function pageSeo({ title, description, path, image = DEFAULT_OG_IMAGE }: PageSeoInput): Pick<Metadata, 'alternates' | 'openGraph' | 'twitter'> {
  const openGraph: OpenGraph = {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title,
    description,
    url: path,
    images: [image],
  }
  return {
    alternates: { canonical: path },
    openGraph,
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  }
}
