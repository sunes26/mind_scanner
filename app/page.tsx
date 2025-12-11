'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import HomeScreen from '@/components/HomeScreen'
import LoadingScreen from '@/components/LoadingScreen'
import ResultScreen from '@/components/ResultScreen'
import ErrorModal from '@/components/ErrorModal'
import ShareModal from '@/components/ShareModal'
import { ChatData, AnalysisResult, AppError } from '@/types'

type Screen = 'home' | 'loading' | 'result'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [chatData, setChatData] = useState<ChatData | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<AppError | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)

  const handleFileUpload = (data: ChatData) => {
    setChatData(data)
    setCurrentScreen('loading')
  }

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result)
    setCurrentScreen('result')
  }

  const handleError = (error: AppError) => {
    setError(error)
    setCurrentScreen('home')
  }

  const handleRetry = () => {
    setCurrentScreen('home')
    setChatData(null)
    setAnalysisResult(null)
    setError(null)
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  return (
    <>
      <Header currentScreen={currentScreen} onNavigateHome={handleRetry} />
      <main className="flex-1 w-full flex flex-col items-center justify-center p-4 min-h-[calc(100vh-64px)]">
        {currentScreen === 'home' && (
          <HomeScreen
            onFileUpload={handleFileUpload}
            onError={handleError}
          />
        )}

        {currentScreen === 'loading' && chatData && (
          <LoadingScreen
            chatData={chatData}
            onComplete={handleAnalysisComplete}
            onError={handleError}
          />
        )}

        {currentScreen === 'result' && analysisResult && chatData && (
          <ResultScreen
            result={analysisResult}
            chatData={chatData}
            onRetry={handleRetry}
            onShare={handleShare}
          />
        )}
      </main>

      {error && (
        <ErrorModal
          error={error}
          onRetry={handleRetry}
          onGoHome={handleRetry}
        />
      )}

      {showShareModal && analysisResult && chatData && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          shareData={{
            score: analysisResult.score,
            relation: analysisResult.relation,
            p1: chatData.p1,
            p2: chatData.p2,
          }}
        />
      )}
    </>
  )
}
