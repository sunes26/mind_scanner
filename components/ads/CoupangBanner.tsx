'use client'

import { useEffect, useRef, useState } from 'react'

const COUPANG_PARTNERS_ID = 1006093
const TRACKING_CODE = 'AF8748009'
const WIDE_MAX_WIDTH = 680
const RECT_MAX_WIDTH = 300

export type CoupangBannerVariant = 'wide' | 'rect'

interface CoupangBannerProps {
  variant: CoupangBannerVariant
  className?: string
}

interface BannerSize {
  width: number
  height: number
}

function getBannerSize(variant: CoupangBannerVariant, containerWidth: number): BannerSize {
  if (variant === 'rect') {
    return { width: Math.min(RECT_MAX_WIDTH, containerWidth), height: 250 }
  }

  const width = Math.min(WIDE_MAX_WIDTH, containerWidth)
  return { width, height: width >= 480 ? 140 : 100 }
}

function buildAdDocument({ width, height }: BannerSize): string {
  const options = JSON.stringify({
    id: COUPANG_PARTNERS_ID,
    template: 'carousel',
    trackingCode: TRACKING_CODE,
    width: String(width),
    height: String(height),
    tsource: '',
  })

  return [
    '<!doctype html><html><head><meta charset="utf-8"></head>',
    '<body style="margin:0;overflow:hidden">',
    '<script src="https://ads-partners.coupang.com/g.js"><\/script>',
    `<script>new PartnersCoupang.G(${options});<\/script>`,
    '</body></html>',
  ].join('')
}

export default function CoupangBanner({ variant, className = '' }: CoupangBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<BannerSize | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const containerWidth = container.clientWidth || WIDE_MAX_WIDTH
    setSize(getBannerSize(variant, containerWidth))
  }, [variant])

  const placeholderHeight = variant === 'rect' ? 250 : 100

  return (
    <div ref={containerRef} className={`flex flex-col items-center ${className}`}>
      {size ? (
        <iframe
          srcDoc={buildAdDocument(size)}
          width={size.width}
          height={size.height}
          style={{ border: 0, display: 'block' }}
          scrolling="no"
          title="쿠팡 파트너스 광고"
          loading="lazy"
        />
      ) : (
        <div style={{ minHeight: `${placeholderHeight}px` }} aria-hidden="true" />
      )}
      <p className="text-[10px] text-gray-400 mt-1 text-center">
        이 광고는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  )
}
