'use client'

import { ScanLine } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeaderProps {
  currentScreen?: 'home' | 'loading' | 'result'
  onNavigateHome?: () => void
}

export default function Header({ currentScreen = 'home', onNavigateHome }: HeaderProps) {
  const { t } = useLanguage()

  const handleNavigationClick = (sectionId: string, sectionName: string) => {
    // 결과 화면에서는 확인창 표시
    if (currentScreen === 'result') {
      if (window.confirm(t.header.confirmNavigation.replace('{section}', sectionName))) {
        if (onNavigateHome) {
          onNavigateHome()
        }
      }
      return
    }

    // 홈 화면에서는 스크롤
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FFD233] border-b-4 border-black" role="banner">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center max-w-6xl">
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            if (currentScreen === 'result' && onNavigateHome) {
              if (window.confirm(t.header.confirmBack)) {
                onNavigateHome()
              }
            } else {
              window.location.reload()
            }
          }}
          aria-label={t.header.backToHome}
        >
          <div className="bg-white border-2 border-black rounded-full p-1.5 shadow-[2px_2px_0px_0px_black]" aria-hidden="true">
            <ScanLine className="text-black w-6 h-6" />
          </div>
          <span className="text-2xl text-black tracking-wide mt-1 font-display">
            {t.header.title}
          </span>
        </button>

        <nav className="hidden md:flex gap-4" aria-label="메인 네비게이션">
          <button
            className="font-bold hover:underline"
            aria-label={t.header.howToUse}
            onClick={() => handleNavigationClick('export-guide-heading', t.header.howToUse)}
          >
            {t.header.howToUse}
          </button>
          <button
            className="font-bold hover:underline"
            aria-label={t.header.faq}
            onClick={() => handleNavigationClick('faq-heading', t.header.faq)}
          >
            {t.header.faq}
          </button>
        </nav>
      </div>
    </header>
  )
}
