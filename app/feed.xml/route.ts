import { getPublishedPosts } from '@/app/blog/blogData'
import { SITE_URL, absoluteUrl, siteConfig } from '@/config/seo'

export const revalidate = 3600

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// 블로그 RSS 피드 (네이버 서치어드바이저 등 제출용)
export function GET(): Response {
  const items = getPublishedPosts()
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`)
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <category>${escapeXml(post.category)}</category>`,
        `      <pubDate>${new Date(`${post.date}T00:00:00+09:00`).toUTCString()}</pubDate>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteConfig.name} 블로그`)}</title>
    <link>${absoluteUrl('/blog')}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko-KR</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
