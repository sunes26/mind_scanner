'use client'

import AdUnit from './AdUnit'

interface ResultPageAdProps {
  type: 'banner' | 'native'
}

export default function ResultPageAd({ type }: ResultPageAdProps) {
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

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