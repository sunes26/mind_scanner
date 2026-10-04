import Link from 'next/link'
import { ScanLine } from 'lucide-react'
import { siteConfig } from '@/config/seo'

const NAV_ITEMS = [
  { href: '/sample', label: '샘플 리포트' },
  { href: '/blog', label: '블로그' },
  { href: '/about', label: '소개' },
] as const

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#FFD233] border-b-4 border-black">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center max-w-6xl">
        <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.name} 홈`}>
          <span className="bg-white border-2 border-black rounded-full p-1.5 shadow-[2px_2px_0px_0px_black]" aria-hidden="true">
            <ScanLine className="text-black w-6 h-6" />
          </span>
          <span className="text-2xl text-black tracking-wide mt-1 font-display">{siteConfig.name}</span>
        </Link>
        <nav className="flex gap-3 md:gap-5 text-sm md:text-base" aria-label="주요 메뉴">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} className="font-bold hover:underline whitespace-nowrap">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
