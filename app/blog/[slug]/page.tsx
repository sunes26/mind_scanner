import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, Tag, User, RefreshCw } from 'lucide-react'
import { getAllPosts, getPostBySlug, getRelatedPosts, isPublished, type BlogPost } from '../blogData'
import { getPostModule } from '../posts/registry'
import { PostFaq, type PostFaqItem } from '@/components/blog/PostKit'
import ResultPageAd from '@/components/ads/ResultPageAd'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import JsonLd from '@/components/site/JsonLd'
import { SITE_URL, absoluteUrl, pageSeo, siteConfig } from '@/config/seo'

// 예약 발행: 발행일이 지나면 재검증 시점에 자동으로 노출된다
export const revalidate = 3600

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPosts()
    .filter((post) => isPublished(post))
    .map((post) => ({ slug: post.slug }))
}

function getVisiblePost(slug: string): BlogPost | undefined {
  const post = getPostBySlug(slug)
  return post && isPublished(post) ? post : undefined
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getVisiblePost(params.slug)

  if (!post) {
    return { title: '글을 찾을 수 없습니다', robots: { index: false, follow: false } }
  }

  const seo = pageSeo({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: { url: post.cover.src, width: post.cover.width, height: post.cover.height, alt: post.cover.alt },
  })

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    ...seo,
    openGraph: {
      ...seo.openGraph,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [absoluteUrl('/about')],
    },
  }
}

function buildJsonLd(post: BlogPost, faq: PostFaqItem[]): Record<string, unknown> {
  const url = absoluteUrl(`/blog/${post.slug}`)
  const article = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.cover.src),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: 'ko-KR',
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    author: { '@type': 'Person', '@id': `${SITE_URL}/#publisher`, name: siteConfig.author.name, url: absoluteUrl('/about') },
    publisher: { '@type': 'Person', '@id': `${SITE_URL}/#publisher`, name: siteConfig.author.name, url: absoluteUrl('/about') },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: '블로그', item: absoluteUrl('/blog') },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }
  const faqPage =
    faq.length > 0
      ? [
          {
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          },
        ]
      : []

  return { '@context': 'https://schema.org', '@graph': [article, breadcrumb, ...faqPage] }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getVisiblePost(params.slug)
  const postModule = getPostModule(params.slug)

  if (!post || !postModule) {
    notFound()
  }

  const PostContent = postModule.default
  const faq = postModule.faq
  const related = getRelatedPosts(post.slug, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <JsonLd data={buildJsonLd(post, faq)} />
      <SiteHeader />

      <main>
        <article className="max-w-4xl mx-auto px-4 py-10">
          <nav aria-label="현재 위치" className="text-sm text-gray-600 mb-4">
            <Link href="/" className="underline hover:text-black">
              홈
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="underline hover:text-black">
              블로그
            </Link>
            <span className="mx-2">/</span>
            <span>{post.category}</span>
          </nav>

          <header className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
              <span className="bg-yellow-300 border-2 border-black px-3 py-1 rounded-lg font-bold flex items-center gap-1">
                <Tag className="w-4 h-4" aria-hidden="true" />
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time dateTime={post.date}>{post.date}</time>
              </span>
              {post.updated && post.updated !== post.date && (
                <span className="flex items-center gap-1 text-gray-600">
                  <RefreshCw className="w-4 h-4" aria-hidden="true" />
                  최종 수정 <time dateTime={post.updated}>{post.updated}</time>
                </span>
              )}
              <span className="flex items-center gap-1 text-gray-600">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {post.readTime}
              </span>
              <Link href="/about" className="flex items-center gap-1 text-gray-600 underline hover:text-black">
                <User className="w-4 h-4" aria-hidden="true" />
                {siteConfig.author.name}
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">{post.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{post.description}</p>
          </header>

          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 md:p-8 mb-8">
            <PostContent />
            <PostFaq items={faq} />
          </div>

          <div className="mb-8">
            <ResultPageAd type="banner" position="blog-post-body" />
          </div>

          <aside className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-black mb-2">글쓴이</h2>
            <p className="text-gray-700 leading-relaxed">
              {siteConfig.author.name} — 속마음 스캐너를 혼자 만들고 운영하는 개발자입니다. 확인할 수 없는 통계는 싣지
              않으며, 내용에 오류가 있으면{' '}
              <Link href="/about#contact" className="underline">
                알려 주세요
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                href="/"
                className="inline-block bg-yellow-300 border-2 border-black text-black px-5 py-2 rounded-xl font-bold hover:bg-yellow-400 transition-colors"
              >
                내 카톡 대화 분석하기
              </Link>
              <Link
                href="/sample"
              prefetch={false}
                className="inline-block bg-white border-2 border-black text-black px-5 py-2 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                샘플 리포트 보기
              </Link>
            </div>
          </aside>

          {related.length > 0 && (
            <section aria-labelledby="related-heading" className="mb-8">
              <h2 id="related-heading" className="text-2xl font-bold text-black mb-4">
                함께 읽으면 좋은 글
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl p-5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <span className="text-xs bg-yellow-200 border border-black px-2 py-0.5 rounded font-bold">
                      {item.category}
                    </span>
                    <p className="font-bold text-black mt-2 leading-snug">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.readTime} 읽기</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <ResultPageAd type="banner" position="blog-post-footer" />
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
