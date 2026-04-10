'use client'

import AdUnit from './AdUnit'

/**
 * 위치별 광고 슬롯 매핑
 *
 * AdSense 콘솔에서 위치별로 별도 광고 단위를 만들고 해당 슬롯 ID를
 * 환경변수에 넣어두면, 리포트에서 위치별 수익을 분리 측정 가능.
 *
 * 주의: Next.js가 NEXT_PUBLIC_* 값을 빌드 타임에 인라인하므로,
 * 아래 매핑은 반드시 정적 참조 형태로 작성해야 한다.
 * (`process.env[dynamicKey]` 같은 동적 접근은 동작 안 함)
 */
const POSITION_SLOT_MAP = {
  'home-hero': process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_HERO,
  'home-faq': process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_FAQ,
  'result-interest': process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT_INTEREST,
  'result-reply': process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT_REPLY,
  'result-secret': process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT_SECRET,
  'result-footer': process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT_FOOTER,
  'blog-list-hero': process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_LIST_HERO,
  'blog-list-feed': process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_LIST_FEED,
  'blog-post-top': process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST_TOP,
  'blog-post-body': process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST_BODY,
  'blog-post-cta': process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST_CTA,
  'blog-post-footer': process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST_FOOTER,
  'privacy': process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRIVACY,
  'terms': process.env.NEXT_PUBLIC_ADSENSE_SLOT_TERMS,
} as const

export type AdPosition = keyof typeof POSITION_SLOT_MAP

interface ResultPageAdProps {
  type: 'banner' | 'native'
  /**
   * 광고 위치 식별자. 지정하면 해당 위치 전용 슬롯을 사용하고,
   * 없으면 레거시 NEXT_PUBLIC_ADSENSE_SLOT_RESULT 로 fallback.
   */
  position?: AdPosition
}

export default function ResultPageAd({ type, position }: ResultPageAdProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  const positionSlot = position ? POSITION_SLOT_MAP[position] : undefined
  const slot = positionSlot || process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT

  if (type === 'banner') {
    return (
      <div className="my-4">
        {clientId && slot ? (
          <AdUnit
            slot={slot}
            format="horizontal"
            responsive={true}
            style={{ minHeight: '90px' }}
          />
        ) : (
          // 더미 배너 광고
          <div className="neo-box bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-400 mb-2">SPONSORED</p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎁</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-800">
                  연인에게 선물하기 좋은 아이템
                </p>
                <p className="text-xs text-gray-500">
                  쿠팡에서 인기 상품 보기 →
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Native 스타일 광고
  return (
    <div className="my-4">
      {clientId && slot ? (
        <AdUnit
          slot={slot}
          format="auto"
          responsive={true}
          className="neo-box rounded-xl overflow-hidden"
          style={{ minHeight: '120px' }}
        />
      ) : (
        // 더미 네이티브 광고
        <div className="neo-box bg-white rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-2xl">💝</span>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 uppercase mb-1">AD</p>
              <p className="text-sm font-bold text-gray-800 mb-1">
                썸남/썸녀에게 마음을 전하세요
              </p>
              <p className="text-xs text-gray-500 mb-2">
                센스있는 선물 추천받기
              </p>
              <button className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full font-bold">
                자세히 보기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
