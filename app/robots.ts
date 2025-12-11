import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mindscanner.com' // 실제 도메인으로 변경 필요

  return {
    rules: [
      // 모든 검색엔진 크롤러 허용
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // API 라우트 차단
          '/_next/', // Next.js 내부 파일 차단
          '/share/', // 동적 공유 페이지 차단 (중복 콘텐츠 방지)
        ],
        crawlDelay: 1, // 크롤링 딜레이 (초)
      },
      // Google 크롤러 특별 설정
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/share/'],
      },
      // 네이버 크롤러 특별 설정
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: ['/api/', '/_next/', '/share/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}