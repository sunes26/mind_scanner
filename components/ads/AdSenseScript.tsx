'use client'

import Script from 'next/script'

export default function AdSenseScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  // 광고 ID가 없으면 스크립트 로드 안 함
  if (!clientId) {
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