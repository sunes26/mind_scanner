import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Home, Calendar, Clock, Tag, ArrowLeft, User } from 'lucide-react'
import { blogPosts, getPostBySlug, getPostsByCategory } from '../blogData'
import ResultPageAd from '@/components/ads/ResultPageAd'
import {
  SomeVsEojangGuide as SomeVsEojangContent,
  AIReplyPatternsGuide as AIReplyPatternsContent,
} from '../posts/postContents'
import {
  WhoLikesMoreGuide as WhoLikesMoreContent,
  ReplySpeedPsychologyGuide as ReplySpeedPsychologyContent,
} from '../posts/postContents2'
import {
  EmoticonPsychologyGuide as EmoticonPsychologyContent,
  KKKAnalysisGuide as KKKAnalysisContent,
} from '../posts/postContents3'
import {
  MildangVsRealGuide as MildangVsRealContent,
  AnalysisSitesGuide as AnalysisSitesContent,
  PsychologyTop10Guide as PsychologyTop10Content,
} from '../posts/postContents4'

// 정적 경로 생성 (빌드 시)
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// 메타데이터 생성
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // 실제 포스트 콘텐츠는 여기에 작성
  // 현재는 템플릿 구조만 제공
  const PostContent = getPostContent(params.slug)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b-4 border-black shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/blog" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">블로그 목록</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Home className="w-5 h-5" />
            <span className="font-semibold">홈</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <header className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 mb-8">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            <span className="bg-yellow-300 border-2 border-black px-3 py-1 rounded-lg font-bold flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <User className="w-4 h-4" />
              Oceancode
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed">
            {post.description}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.keywords.map((keyword) => (
              <span
                key={keyword}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-md"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </header>

        {/* Article Body */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <PostContent />
          </div>
        </div>

        {/* 광고 1 - Article Body 다음 */}
        <div className="mb-8">
          <ResultPageAd type="banner" position="blog-post-body" />
        </div>

        {/* CTA Section - 간소화 */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 text-center mb-8">
          <p className="text-gray-700 mb-3">
            직접 카톡 대화를 분석해보고 싶으신가요?
          </p>
          <Link
            href="/"
            className="inline-block bg-yellow-300 border-2 border-black text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors"
          >
            속마음 스캐너로 분석하기 →
          </Link>
        </div>

        {/* 광고 2 - CTA 다음 */}
        <div className="mb-8">
          <ResultPageAd type="native" position="blog-post-cta" />
        </div>

        {/* Related Posts */}
        <RelatedPosts currentSlug={params.slug} category={post.category} />
      </article>

      {/* 광고 3 - Footer 위 */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <ResultPageAd type="banner" position="blog-post-footer" />
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t-4 border-black py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
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
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mt-2">
              <Link href="/about" className="hover:text-gray-600 transition-colors underline">
                서비스 소개
              </Link>
              <span>•</span>
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

// 각 포스트의 실제 콘텐츠 컴포넌트
function getPostContent(slug: string) {
  // 여기에 각 포스트의 실제 콘텐츠를 작성
  // 추후 MDX나 별도 파일로 관리 가능

  const contentMap: Record<string, () => JSX.Element> = {
    'kakaotalk-export-guide': KakaoTalkExportGuide,
    'how-to-distinguish-some-vs-eojang': SomeVsEojangGuide,
    'ai-analyzed-reply-patterns': AIReplyPatternsGuide,
    'who-likes-more-kakaotalk': WhoLikesMoreGuide,
    'reply-speed-psychology': ReplySpeedPsychologyGuide,
    'emoticon-usage-psychology': EmoticonPsychologyGuide,
    'kkk-count-analysis': KKKAnalysisGuide,
    'mildang-vs-real-love': MildangVsRealGuide,
    'conversation-analysis-sites-2025': AnalysisSitesGuide,
    'kakaotalk-psychology-top10': PsychologyTop10Guide,
  }

  return contentMap[slug] || DefaultPostContent
}

// 포스트 콘텐츠 템플릿들 (각각 별도 파일로 분리 가능)
function KakaoTalkExportGuide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        카카오톡 대화를 분석하려면 먼저 대화 내용을 텍스트 파일(.txt)로 내보내야 합니다.
        이 가이드에서는 PC와 모바일에서 카톡 대화를 내보내는 방법을 상세히 설명합니다.
      </p>

      <h2 className="text-2xl font-bold text-black border-b-2 border-black pb-2">
        📱 모바일에서 카톡 대화 내보내기 (iOS/Android)
      </h2>

      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-black mb-3">1단계: 대화방 열기</h3>
        <p>분석하고 싶은 1:1 대화방 또는 그룹 채팅방을 엽니다.</p>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-black mb-3">2단계: 메뉴 열기</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>우측 상단의 <strong>≡ (햄버거 메뉴)</strong> 버튼을 탭합니다.</li>
          <li>또는 대화방 이름을 탭합니다.</li>
        </ul>
      </div>

      <div className="bg-pink-50 border-2 border-pink-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-black mb-3">3단계: 대화 내보내기</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>설정</strong> (톱니바퀴 아이콘) 탭</li>
          <li><strong>대화 내용 내보내기</strong> 선택</li>
          <li><strong>텍스트로 저장</strong> 또는 <strong>텍스트 파일로 내보내기</strong> 선택</li>
          <li>저장 위치 선택 (파일 앱, 드라이브 등)</li>
        </ul>
      </div>

      <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-black mb-3">✅ 완료!</h3>
        <p>생성된 .txt 파일을 속마음 스캐너에 업로드하면 분석이 시작됩니다.</p>
      </div>

      <h2 className="text-2xl font-bold text-black border-b-2 border-black pb-2 mt-12">
        💻 PC에서 카톡 대화 내보내기 (Windows/Mac)
      </h2>

      <div className="space-y-4">
        <p>PC 카카오톡에서는 더 간편하게 대화를 내보낼 수 있습니다:</p>

        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li className="font-semibold">PC 카카오톡 실행</li>
          <li className="font-semibold">대화방 선택</li>
          <li className="font-semibold">우측 상단 <code>☰</code> 메뉴 클릭</li>
          <li className="font-semibold">"대화 내용 내보내기" 선택</li>
          <li className="font-semibold">저장 경로 선택 후 저장</li>
        </ol>
      </div>

      <div className="bg-purple-50 border-4 border-purple-500 rounded-xl p-6 mt-8">
        <h3 className="text-xl font-bold text-purple-700 mb-3">💡 팁</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>PC 버전이 모바일보다 빠르고 편리합니다</li>
          <li>대화량이 많으면 파일 크기가 클 수 있으니 확인하세요 (권장: 10MB 이하)</li>
          <li>사진이나 동영상은 포함되지 않고 텍스트만 저장됩니다</li>
        </ul>
      </div>

      <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6 mt-12 text-center">
        <h3 className="text-xl font-bold text-green-800 mb-2">파일 준비 완료!</h3>
        <p className="text-gray-700 mb-3 text-sm">
          내보내기가 완료된 .txt 파일을 속마음 스캐너에 업로드하면 AI가 대화 패턴을 분석합니다.
        </p>
      </div>
    </div>
  )
}

// 관련 포스트 컴포넌트
function RelatedPosts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const related = getPostsByCategory(category)
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 2)

  if (related.length === 0) return null

  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold text-black mb-4">관련 글</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {related.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl p-5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <span className="text-xs bg-yellow-200 border border-black px-2 py-0.5 rounded font-bold">
              {p.category}
            </span>
            <p className="font-bold text-black mt-2 leading-snug text-sm">{p.title}</p>
            <p className="text-gray-500 text-xs mt-1">{p.readTime} 읽기</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

// 포스트 콘텐츠 매핑 함수들
function SomeVsEojangGuide() {
  return <SomeVsEojangContent />
}

function AIReplyPatternsGuide() {
  return <AIReplyPatternsContent />
}

function WhoLikesMoreGuide() {
  return <WhoLikesMoreContent />
}

function ReplySpeedPsychologyGuide() {
  return <ReplySpeedPsychologyContent />
}

function EmoticonPsychologyGuide() {
  return <EmoticonPsychologyContent />
}

function KKKAnalysisGuide() {
  return <KKKAnalysisContent />
}

function MildangVsRealGuide() {
  return <MildangVsRealContent />
}

function AnalysisSitesGuide() {
  return <AnalysisSitesContent />
}

function PsychologyTop10Guide() {
  return <PsychologyTop10Content />
}

function DefaultPostContent({ title }: { title?: string }) {
  return (
    <div className="space-y-6 text-center py-12">
      <div className="text-6xl mb-4">📝</div>
      <h2 className="text-2xl font-bold text-black">콘텐츠 준비 중입니다</h2>
      <p className="text-gray-600 text-lg">
        {title ? `"${title}" 포스트의 상세 내용은 곧 업데이트될 예정입니다.` : '이 포스트의 내용은 곧 추가될 예정입니다.'}
      </p>
      <p className="text-gray-500">
        지금은 속마음 스캐너로 직접 분석해보는 것은 어떨까요?
      </p>
      <Link
        href="/"
        className="inline-block bg-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-600 transition-colors mt-6"
      >
        무료로 분석하러 가기
      </Link>
    </div>
  )
}
