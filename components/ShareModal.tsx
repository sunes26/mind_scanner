'use client'

import { useState, useEffect, useRef } from 'react'
import {
  X,
  MessageCircle,
  Twitter,
  Facebook,
  Instagram,
  Link2,
  Download,
  Share2,
  Check
} from 'lucide-react'
import { ShareData, shareToKakao, shareToTwitter, shareToFacebook, copyToClipboard, downloadShareImage, nativeShare } from '@/utils/shareUtils'
import ShareCard from './ShareCard'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  shareData: ShareData
}

export default function ShareModal({ isOpen, onClose, shareData }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  const shareCardRef = useRef<HTMLDivElement>(null)

  // 클라이언트에서만 navigator.share 확인
  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  if (!isOpen) return null

  const handleCopy = async () => {
    const success = await copyToClipboard(shareData)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = async () => {
    setDownloading(true)
    await downloadShareImage(shareData, shareCardRef.current)
    setDownloading(false)
  }

  const handleNativeShare = async () => {
    const success = await nativeShare(shareData)
    if (success) {
      onClose()
    }
  }

  const shareButtons = [
    {
      name: '카카오톡',
      icon: MessageCircle,
      color: 'bg-yellow-400',
      textColor: 'text-black',
      onClick: () => shareToKakao(shareData),
    },
    {
      name: '트위터',
      icon: Twitter,
      color: 'bg-sky-500',
      textColor: 'text-white',
      onClick: () => shareToTwitter(shareData),
    },
    {
      name: '페이스북',
      icon: Facebook,
      color: 'bg-blue-600',
      textColor: 'text-white',
      onClick: () => shareToFacebook(shareData),
    },
    {
      name: '인스타 저장',
      icon: Instagram,
      color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
      textColor: 'text-white',
      onClick: handleDownload,
      loading: downloading,
    },
  ]

  return (
    <>
      {/* Hidden ShareCard for image generation */}
      <div className="fixed -left-[9999px] -top-[9999px]">
        <ShareCard ref={shareCardRef} shareData={shareData} />
      </div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      
      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-10">
        {/* Header */}
        <div className="bg-pink-500 p-4 border-b-2 border-black flex items-center justify-between">
          <h3 className="font-display text-xl text-white flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            결과 공유하기
          </h3>
          <button 
            onClick={onClose}
            className="bg-white border-2 border-black rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="p-4 bg-gray-50 border-b-2 border-black">
          <div className="neo-box rounded-xl p-4 bg-white text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="bg-blue-500 text-white text-sm px-2 py-0.5 rounded-full border border-black">
                {shareData.p1}
              </span>
              <span>💕</span>
              <span className="bg-pink-500 text-white text-sm px-2 py-0.5 rounded-full border border-black">
                {shareData.p2}
              </span>
            </div>
            <p className="font-display text-3xl text-pink-500 mb-1">{shareData.score}%</p>
            <p className="text-sm font-bold">{shareData.relation}</p>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="p-4 space-y-3">
          {/* Native Share (Mobile) */}
          {canNativeShare && (
            <button
              onClick={handleNativeShare}
              className="neo-button w-full bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              공유하기
            </button>
          )}

          {/* Social Buttons Grid */}
          <div className="grid grid-cols-4 gap-2">
            {shareButtons.map((btn) => (
              <button
                key={btn.name}
                onClick={btn.onClick}
                disabled={btn.loading}
                className={`${btn.color} ${btn.textColor} p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col items-center gap-1 disabled:opacity-50`}
              >
                {btn.loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <btn.icon className="w-6 h-6" />
                )}
                <span className="text-[10px] font-bold">{btn.name}</span>
              </button>
            ))}
          </div>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            className={`neo-button w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
              copied 
                ? 'bg-green-400 text-black' 
                : 'bg-white text-black hover:bg-gray-50'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                복사 완료!
              </>
            ) : (
              <>
                <Link2 className="w-5 h-5" />
                링크 복사하기
              </>
            )}
          </button>

          {/* Download Image */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-gray-500 hover:text-black hover:bg-gray-100 transition border-2 border-dashed border-gray-300 hover:border-black disabled:opacity-50"
          >
            {downloading ? (
              <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            이미지로 저장하기
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <p className="text-center text-xs text-gray-400">
            친구들에게 공유하고 반응을 확인해보세요! 🎉
          </p>
        </div>
      </div>
      </div>
    </>
  )
}