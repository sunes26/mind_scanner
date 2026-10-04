import Link from 'next/link'
import { COPYRIGHT_TEXT, siteConfig } from '@/config/seo'

const FOOTER_LINKS = [
  { href: '/', label: '카톡 대화 분석' },
  { href: '/sample', label: '샘플 리포트' },
  { href: '/blog', label: '블로그' },
  { href: '/about', label: '서비스 소개' },
  { href: '/about#contact', label: '문의' },
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/terms', label: '이용약관' },
] as const

export default function SiteFooter() {
  return (
    <footer className="mt-16 bg-white border-t-4 border-black py-8">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
        <nav aria-label="사이트 링크" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-600">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} prefetch={false} className="underline hover:text-black transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-gray-500 leading-relaxed">
          대화 내용은 브라우저 밖으로 나가지 않고, 서버에는 숫자 통계만 전달되며 DB에 저장하지 않습니다.{' '}
          <Link href="/privacy" className="underline">
            자세히
          </Link>
        </p>
        <p className="text-xs text-gray-500">
          문의{' '}
          <a href={`mailto:${siteConfig.author.email}`} className="underline hover:text-black">
            {siteConfig.author.email}
          </a>
        </p>
        <p className="text-gray-400 text-xs">{COPYRIGHT_TEXT}</p>
      </div>
    </footer>
  )
}
