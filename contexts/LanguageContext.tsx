'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SupportedLanguage, detectLanguage } from '@/utils/language'
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

  useEffect(() => {
    // Detect browser language on mount
    const detectedLang = detectLanguage()
    setLanguage(detectedLang)
    setT(getTranslation(detectedLang))
  }, [])

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
