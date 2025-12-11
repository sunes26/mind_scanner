'use client'

import { forwardRef } from 'react'
import { ShareData } from '@/utils/shareUtils'

interface ShareCardProps {
  shareData: ShareData
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ shareData }, ref) => {
  // 점수에 따른 색상 결정
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-red-400 to-red-600'
    if (score >= 80) return 'from-pink-400 to-pink-600'
    if (score >= 70) return 'from-purple-400 to-purple-600'
    if (score >= 60) return 'from-blue-400 to-blue-600'
    return 'from-gray-400 to-gray-600'
  }

  return (
    <div
      ref={ref}
      className="w-[600px] h-[800px] bg-gradient-to-br from-yellow-50 to-orange-50 p-8 flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'radial-gradient(#E0E0E0 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Main Card */}
      <div className="neo-card bg-white p-12 rounded-3xl w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="neo-box bg-yellow-400 px-6 py-3 rounded-xl mb-8">
          <span className="font-display text-2xl font-bold">💘 속마음 스캐너</span>
        </div>

        {/* Names */}
        <div className="flex items-center gap-4 mb-8">
          <div className="neo-badge bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-bold">
            {shareData.p1}
          </div>
          <span className="text-4xl">💕</span>
          <div className="neo-badge bg-pink-500 text-white px-6 py-2 rounded-full text-lg font-bold">
            {shareData.p2}
          </div>
        </div>

        {/* Score */}
        <div className={`neo-card bg-gradient-to-br ${getScoreColor(shareData.score)} text-white px-12 py-8 rounded-2xl mb-6 text-center`}>
          <p className="text-xl mb-2 font-bold">애정 지수</p>
          <div className="flex items-baseline justify-center">
            <span className="font-display text-8xl font-bold" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}>
              {shareData.score}
            </span>
            <span className="text-4xl font-bold ml-2">%</span>
          </div>
        </div>

        {/* Relation */}
        <div className="neo-box bg-white px-8 py-4 rounded-xl transform rotate-1">
          <p className="font-bold text-2xl text-center">{shareData.relation}</p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-2">나도 분석하러 가기 👇</p>
          <p className="font-bold text-lg">mindscanner.com</p>
        </div>
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'

export default ShareCard
