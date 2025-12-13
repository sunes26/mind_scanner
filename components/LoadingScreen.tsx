'use client'

import { useEffect, useState } from 'react'
import { ChatData, AnalysisResult, AppError } from '@/types'
import { detectLanguage } from '@/utils/language'
import { useLanguage } from '@/contexts/LanguageContext'

interface LoadingScreenProps {
  chatData: ChatData
  onComplete: (result: AnalysisResult) => void
  onError: (error: AppError) => void
}

export default function LoadingScreen({ chatData, onComplete, onError }: LoadingScreenProps) {
  const { t } = useLanguage()
  const loadingMessages = t.loading.messages

  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [detailText, setDetailText] = useState(loadingMessages[0])

  useEffect(() => {
    let currentStep = 0
    const interval = setInterval(() => {
      setDetailText(loadingMessages[currentStep])
      setProgress(((currentStep + 1) / loadingMessages.length) * 100)
      currentStep++

      // 멘트가 끝나면 처음부터 다시 반복
      if (currentStep >= loadingMessages.length) {
        currentStep = 0
      }
    }, 2000)

    // 즉시 분석 시작 (멘트와 병렬로)
    performAnalysis(interval)

    return () => clearInterval(interval)
  }, [])

  const performAnalysis = async (interval: NodeJS.Timeout) => {
    try {
      // Detect user's language
      const language = detectLanguage()

      // Call actual AI analysis API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rawText: chatData.rawText,
          p1: chatData.p1,
          p2: chatData.p2,
          analysis: chatData.analysis,
          language, // Add language parameter
        }),
      })

      if (!response.ok) {
        // Rate limit 에러 처리
        if (response.status === 429) {
          const errorData = await response.json()
          clearInterval(interval)
          onError({
            type: 'API_ERROR',
            title: '요청 한도 초과',
            message: errorData.message || '너무 많은 요청을 보냈습니다.',
            suggestion: `${errorData.retryAfter || 60}초 후에 다시 시도해주세요.`,
            canRetry: true
          })
          return
        }
        throw new Error('API request failed')
      }

      const result: AnalysisResult = await response.json()

      // 멘트 interval 즉시 중단
      clearInterval(interval)

      // 분석 완료 메시지 표시
      setDetailText(`✨ ${t.loading.complete}`)
      setProgress(100)

      // 1초 후 결과 화면으로 전환
      setTimeout(() => {
        onComplete(result)
      }, 1000)
    } catch (error) {
      console.error('Analysis error:', error)
      clearInterval(interval)
      onError({
        type: 'API_ERROR',
        title: 'AI 분석 실패',
        message: 'AI 서버에서 응답을 받지 못했습니다.',
        suggestion: '잠시 후 다시 시도해주세요. 문제가 계속되면 새로고침 후 다시 시도해주세요.',
        canRetry: true
      })
    }
  }

  return (
    <section
      role="status"
      aria-live="polite"
      aria-label="대화 분석 진행 중"
      className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[60] flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <div className="relative w-40 h-40 mx-auto mb-8" aria-hidden="true">
          <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-black rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-6xl animate-bounce">💘</div>
        </div>

        <h2 className="text-3xl md:text-4xl font-display mb-4 px-4" aria-live="polite">
          {detailText}
        </h2>

        <div className="w-full max-w-80 px-4 mx-auto">
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`분석 진행률 ${progress}%`}
            className="bg-gray-200 rounded-full h-6 border-3 border-black overflow-hidden"
          >
            <div
              className="bg-[#FFD233] h-full transition-all duration-300 border-r-2 border-black"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}
