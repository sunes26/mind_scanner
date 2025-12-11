'use client'

import { useEffect, useRef, useState } from 'react'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function AdUnit({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = '',
  style = {}
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  useEffect(() => {
    // 광고 ID가 없으면 로드 안 함
    if (!clientId || !slot) {
      setHasError(true)
      return
    }

    // 이미 로드되었으면 스킵
    if (isLoaded) return

    try {
      // adsbygoogle 배열 초기화
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setIsLoaded(true)
      }
    } catch (err) {
      console.error('AdSense error:', err)
      setHasError(true)
    }
  }, [clientId, slot, isLoaded])

  // 광고를 표시할 수 없는 경우 대체 UI
  if (hasError || !clientId || !slot) {
    return (
      <div 
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
        style={{ minHeight: '100px', ...style }}
      >
        <span className="text-gray-400 text-xs">AD</span>
      </div>
    )
  }

  return (
    <div className={className} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}