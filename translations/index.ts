import { ko } from './ko'
import { en } from './en'
import { SupportedLanguage } from '@/utils/language'

export const translations = {
  ko,
  en,
}

export function getTranslation(lang: SupportedLanguage) {
  return translations[lang]
}

export type { Translation } from './ko'
