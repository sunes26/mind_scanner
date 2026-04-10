'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

/**
 * AdSense 정책: "게시자 콘텐츠가 없는 화면에 광고" 위반 방지
 *
 * 콘텐츠가 충분한 페이지에서만 AdSense 스크립트를 로드한다.
 * 404(not-found), 리다이렉트 페이지, API 라우트 등 빈 화면에는
 * 스크립트 자체가 로드되지 않아 자동 광고가 삽입될 수 없다.
 */
const ADSENSE_ALLOWED_PATHS: readonly RegExp[] = [
  /^\/$/,
  /^\/blog(\/.*)?$/,
  /^\/privacy(\/.*)?$/,
  /^\/terms(\/.*)?$/,
]

function isAdSenseAllowed(pathname: string | null): boolean {
  if (!pathname) {
    return false
  }

  return ADSENSE_ALLOWED_PATHS.some((pattern) => pattern.test(pathname))
}

export default function AdSenseScript() {
  const pathname = usePathname()
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  // 광고 ID가 없거나 콘텐츠가 부족한 경로라면 스크립트 로드 안 함
  if (!clientId || !isAdSenseAllowed(pathname)) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
      onError={(e) => {
        console.error('AdSense script failed to load:', e)
      }}
    />
  )
}
