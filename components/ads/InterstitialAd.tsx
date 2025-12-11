'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Volume2, VolumeX } from 'lucide-react'

interface InterstitialAdProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  duration?: number // 광고 표시 시간 (초)
}

export default function InterstitialAd({ 
  isOpen, 
  onClose, 
  onComplete,
  duration = 5 
}: InterstitialAdProps) {
  const [countdown, setCountdown] = useState(duration)
  const [canSkip, setCanSkip] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_INTERSTITIAL

  // 카운트다운 타이머
  useEffect(() => {
    if (!isOpen) {
      setCountdown(duration)
      setCanSkip(false)
      return
    }

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCanSkip(true)
    }
  }, [isOpen, countdown, duration])

  // 광고 완료 처리
  const handleComplete = useCallback(() => {
    onComplete()
    onClose()
  }, [onComplete, onClose])

  // 스킵 처리
  const handleSkip = useCallback(() => {
    if (canSkip) {
      handleComplete()
    }
  }, [canSkip, handleComplete])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50">
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-xs uppercase tracking-wider">
            Advertisement
          </span>
          {/* 음소거 토글 */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-white/60 hover:text-white p-1"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* 스킵/카운트다운 버튼 */}
        <button
          onClick={handleSkip}
          disabled={!canSkip}
          className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
            canSkip
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canSkip ? (
            <>
              <X className="w-4 h-4" />
              건너뛰기
            </>
          ) : (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs">
                {countdown}
              </div>
              <span>{countdown}초 후 닫기 가능</span>
            </>
          )}
        </button>
      </div>

      {/* Ad Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {clientId && slot ? (
          // 실제 AdSense 광고
          <div className="w-full max-w-2xl">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', height: '400px' }}
              data-ad-client={clientId}
              data-ad-slot={slot}
              data-ad-format="rectangle"
            />
          </div>
        ) : (
          // 더미 광고 UI
          <div className="w-full max-w-lg">
            <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl p-1">
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">💘</div>
                <h3 className="font-display text-2xl text-black mb-2">
                  속마음 스캐너
                </h3>
                <p className="text-gray-600 mb-4">
                  AI가 분석하는 당신의 연애 심리
                </p>
                <div className="bg-yellow-100 border-2 border-black rounded-lg p-4 inline-block">
                  <p className="text-sm font-bold text-black">
                    🎁 프리미엄 분석을 무료로!
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    광고 시청 감사합니다
                  </p>
                </div>
              </div>
            </div>

            {/* 프로그레스 바 */}
            <div className="mt-4 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-1000"
                style={{ width: `${((duration - countdown) / duration) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 text-center">
        <p className="text-white/40 text-xs">
          광고 수익은 서비스 운영에 사용됩니다 🙏
        </p>
      </div>
    </div>
  )
}