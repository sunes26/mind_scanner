import type { Metadata } from 'next'
import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Tag } from 'lucide-react'
import { getPublishedPosts } from './blogData'
import ResultPageAd from '@/components/ads/ResultPageAd'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import JsonLd from '@/components/site/JsonLd'
import { SITE_URL, absoluteUrl, pageSeo } from '@/config/seo'

// 예약 글이 발행일에 맞춰 목록에 나타나도록 주기적으로 재생성한다
export const revalidate = 3600

const TITLE = '카카오톡 대화 분석 가이드와 연애 심리 블로그'
const DESCRIPTION =
  '카카오톡 대화 내보내기 방법, 답장 속도·선톡 비율 같은 대화 지표를 읽는 법, 썸과 연애에서 자주 생기는 카톡 고민을 다룹니다.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...pageSeo({ title: TITLE, description: DESCRIPTION, path: '/blog' }),
}

const AD_AFTER_INDEX = 5

export default function BlogPage() {
  const posts = getPublishedPosts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${absoluteUrl('/blog')}#blog`,
        url: absoluteUrl('/blog'),
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: 'ko-KR',
        publisher: { '@id': `${SITE_URL}/#publisher` },
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: absoluteUrl(`/blog/${post.slug}`),
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '블로그', item: absoluteUrl('/blog') },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 md:p-8 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">카카오톡 대화 분석 가이드 &amp; 연애 심리</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            대화 파일을 내보내는 방법부터 답장 속도, 선톡 비율, 메시지 길이 같은 지표를 읽는 법까지 정리합니다. 속마음
            스캐너를 만든 개발자가 직접 쓰며, 확인할 수 없는 통계는 싣지 않습니다.
          </p>
        </section>

        <section aria-label="글 목록" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Fragment key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  width={post.cover.width}
                  height={post.cover.height}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto border-b-2 border-black"
                  priority={index < 3}
                />
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                    <span className="bg-yellow-300 border border-black px-2 py-0.5 rounded font-bold flex items-center gap-1 text-black">
                      <Tag className="w-3 h-3" aria-hidden="true" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-bold text-lg text-black mb-2 group-hover:text-pink-600 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>
                  <div className="mt-auto flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                </div>
              </Link>
              {index === AD_AFTER_INDEX && (
                <div className="col-span-full">
                  <ResultPageAd type="banner" position="blog-list-feed" />
                </div>
              )}
            </Fragment>
          ))}
        </section>

        <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold mb-3">내 대화로 직접 확인해 보기</h2>
          <p className="text-gray-700 mb-6">
            카카오톡에서 내보낸 .txt 파일을 올리면 답장 시간, 메시지 비율, 질문 횟수 등을 계산해 보여 줍니다.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-block bg-yellow-300 border-2 border-black text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors"
            >
              카톡 대화 분석하기
            </Link>
            <Link
              href="/sample"
              prefetch={false}
              className="inline-block bg-white border-2 border-black text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              샘플 리포트 보기
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
