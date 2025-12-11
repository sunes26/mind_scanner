import { MetadataRoute } from 'next'
import { blogPosts } from './blog/blogData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mindscanner.site'
  const currentDate = new Date()

  // 블로그 포스트 sitemap 엔트리 생성
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    // 메인 페이지 (최우선)
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // 블로그 목록 페이지
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // 개별 블로그 포스트들
    ...blogEntries,
    // 개인정보처리방침
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // 이용약관
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // 404 페이지는 sitemap에서 제외
  ]
}