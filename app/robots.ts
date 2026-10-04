import { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/seo'

// /_next/ 는 막지 않는다. CSS·JS가 거기 있어서 막으면 검색엔진이 페이지를 제대로 렌더링하지 못한다.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      // AI 검색·답변 엔진의 수집을 명시적으로 허용
      { userAgent: AI_CRAWLERS, allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
