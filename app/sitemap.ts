import { MetadataRoute } from 'next'
import { getPublishedPosts } from './blog/blogData'
import { absoluteUrl } from '@/config/seo'

export const revalidate = 3600

// 정적 페이지의 실제 최종 수정일. 내용을 고치면 함께 갱신한다.
const STATIC_PAGES = [
  { path: '/', lastModified: '2026-10-04' },
  { path: '/sample', lastModified: '2026-10-04' },
  { path: '/about', lastModified: '2026-10-04' },
  { path: '/privacy', lastModified: '2026-10-04' },
  { path: '/terms', lastModified: '2026-10-04' },
] as const

const BLOG_LAUNCH_DATE = '2025-10-15'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts()
  const latestPostDate = posts.reduce((latest, post) => {
    const modified = post.updated ?? post.date
    return modified > latest ? modified : latest
  }, BLOG_LAUNCH_DATE)

  return [
    ...STATIC_PAGES.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: new Date(page.lastModified),
    })),
    { url: absoluteUrl('/blog'), lastModified: new Date(latestPostDate) },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updated ?? post.date),
    })),
  ]
}
