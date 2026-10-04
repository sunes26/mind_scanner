import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
  robots: { index: false, follow: true },
}

const LINKS = [
  { href: '/', label: '카톡 대화 분석하기' },
  { href: '/sample', label: '샘플 리포트 보기' },
  { href: '/blog', label: '블로그 글 보기' },
] as const

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[2rem] p-8 text-center">
          <h1 className="font-display text-3xl text-black mb-3">페이지를 찾을 수 없어요</h1>
          <p className="text-gray-600 mb-8">주소가 바뀌었거나 아직 공개되지 않은 페이지입니다.</p>
          <ul className="space-y-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block bg-[#FFD233] border-2 border-black px-5 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
