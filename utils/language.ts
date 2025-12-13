/**
 * 브라우저 언어 감지 유틸리티
 */

export type SupportedLanguage = 'ko' | 'en'

/**
 * 브라우저 언어를 감지하여 지원하는 언어 코드 반환
 * 한국어면 'ko', 그 외는 'en' 반환
 */
export function detectLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') {
    return 'ko' // 서버 사이드는 기본값
  }

  const browserLang = navigator.language || (navigator as any).userLanguage

  // 한국어 체크 (ko, ko-KR 등)
  if (browserLang.toLowerCase().startsWith('ko')) {
    return 'ko'
  }

  return 'en'
}

/**
 * 언어 코드를 전체 이름으로 변환
 */
export function getLanguageName(lang: SupportedLanguage): string {
  return lang === 'ko' ? '한국어' : 'English'
}
