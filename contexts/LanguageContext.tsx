'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { SupportedLanguage } from '@/utils/language'
import { getTranslation, Translation } from '@/translations'

interface LanguageContextType {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('ko')
  const [t, setT] = useState<Translation>(getTranslation('ko'))

  // 브라우저 언어 자동 감지는 하지 않는다. 서버가 렌더링한 한국어 본문이
  // 하이드레이션 후 영어로 바뀌면 검색엔진이 혼합 언어 페이지로 인식한다.

  const handleSetLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang)
    setT(getTranslation(lang))
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
