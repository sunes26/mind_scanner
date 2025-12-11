import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, Calendar, Clock, Tag } from 'lucide-react'
import { blogPosts, categories } from './blogData'

export const metadata: Metadata = {
  title: '블로그 - 카카오톡 대화 분석 가이드 & 연애 심리',
  description: '카카오톡 대화 분석으로 알아보는 연애 심리, 썸 vs 어장 구별법, 호감도 높이는 카톡 팁 등 유용한 정보를 제공합니다.',
  keywords: ['카톡 대화 분석', '연애 심리', '썸 어장 구별', '카톡 팁', '호감도 테스트'],
  openGraph: {
    title: '카카오톡 대화 분석 블로그 - 속마음 스캐너',
    description: 'AI가 알려주는 연애 심리와 카톡 대화 분석 팁',
    type: 'website',
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b-4 border-black shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Home className="w-6 h-6" />
              <h1 className="font-display font-bold text-2xl">속마음 스캐너 블로그</h1>
            </Link>
            <p className="text-gray-600 text-sm mt-1">카카오톡 대화 분석 & 연애 심리 가이드</p>
          </div>
          <Link
            href="/"
            className="neo-button bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors"
          >
            분석 시작하기
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">
            카카오톡 대화 분석으로 알아보는
            <br />
            <span className="text-pink-500">연애 심리 & 실전 팁</span>
          </h2>
          <p className="text-gray-600 text-lg">
            AI가 10만 건의 대화를 분석해서 발견한 연애의 법칙을 공개합니다.
            <br />
            썸인지 어장인지, 누가 더 좋아하는지 궁금하다면 지금 바로 확인하세요!
          </p>
        </section>

        {/* Category Filter - 추후 구현 가능 */}
        {/* <section className="mb-8">
          <div className="flex gap-3 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                className="neo-button bg-white border-2 border-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                {category}
              </button>
            ))}
          </div>
        </section> */}

        {/* Blog Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200"
            >
              {/* Category Badge */}
              <div className="bg-yellow-300 border-b-2 border-black px-4 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </span>
                  <span className="text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-black mb-3 group-hover:text-pink-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.keywords.slice(0, 2).map((keyword) => (
                    <span
                      key={keyword}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Read More */}
              <div className="px-6 pb-6">
                <div className="text-pink-500 font-semibold text-sm group-hover:underline">
                  자세히 보기 →
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-pink-500 to-purple-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 mt-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            우리 관계, 지금 바로 분석해보세요!
          </h3>
          <p className="text-lg mb-6 opacity-90">
            카카오톡 대화 파일만 있으면 10초 만에 호감도 점수 확인 가능
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            무료로 분석 시작하기 💘
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t-4 border-black py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="space-y-2">
            <p className="text-gray-400 text-sm font-mono">
              Mind Scanner © 2025. All Data Processed Locally.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span>Made by</span>
              <a
                href="http://oceancode.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#4D96FF] hover:underline"
              >
                Oceancode
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <a href="mailto:oceancode0321@gmail.com" className="hover:text-gray-600 transition-colors">
                oceancode0321@gmail.com
              </a>
              <span>•</span>
              <a href="http://oceancode.site/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">
                oceancode.site
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mt-2">
              <Link href="/privacy" className="hover:text-gray-600 transition-colors underline">
                개인정보처리방침
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-gray-600 transition-colors underline">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
