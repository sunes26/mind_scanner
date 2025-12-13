'use client'

import { AlertTriangle, FileWarning, WifiOff, RefreshCw, Home, HelpCircle } from 'lucide-react'
import { AppError, ErrorType } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface ErrorModalProps {
  error: AppError | null
  onRetry?: () => void
  onGoHome: () => void
  isRetrying?: boolean
}

// 에러 타입별 아이콘
const ErrorIcons: Record<ErrorType, React.ReactNode> = {
  FILE_FORMAT: <FileWarning className="w-12 h-12 text-orange-500" />,
  FILE_EMPTY: <FileWarning className="w-12 h-12 text-gray-500" />,
  PARSE_ERROR: <HelpCircle className="w-12 h-12 text-yellow-500" />,
  NOT_ENOUGH_PARTICIPANTS: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
  NOT_ENOUGH_MESSAGES: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
  API_ERROR: <AlertTriangle className="w-12 h-12 text-red-500" />,
  NETWORK_ERROR: <WifiOff className="w-12 h-12 text-red-500" />,
  UNKNOWN: <AlertTriangle className="w-12 h-12 text-red-500" />,
}

// 에러 타입별 배경색
const ErrorColors: Record<ErrorType, string> = {
  FILE_FORMAT: 'bg-orange-50 border-orange-200',
  FILE_EMPTY: 'bg-gray-50 border-gray-200',
  PARSE_ERROR: 'bg-yellow-50 border-yellow-200',
  NOT_ENOUGH_PARTICIPANTS: 'bg-yellow-50 border-yellow-200',
  NOT_ENOUGH_MESSAGES: 'bg-yellow-50 border-yellow-200',
  API_ERROR: 'bg-red-50 border-red-200',
  NETWORK_ERROR: 'bg-red-50 border-red-200',
  UNKNOWN: 'bg-red-50 border-red-200',
}

export default function ErrorModal({ error, onRetry, onGoHome, isRetrying }: ErrorModalProps) {
  const { t } = useLanguage()

  if (!error) return null

  const icon = ErrorIcons[error.type]
  const colorClass = ErrorColors[error.type]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-10 animate-bounce-in">
        {/* Header */}
        <div className={`p-6 border-b-2 border-black ${colorClass}`}>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-white rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              {icon}
            </div>
            <h3 className="font-display text-2xl text-black mb-2">
              {error.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {error.message}
            </p>
          </div>
        </div>

        {/* Suggestion */}
        {error.suggestion && (
          <div className="p-4 bg-gray-50 border-b-2 border-black">
            <div className="flex items-start gap-2">
              <span className="text-lg">💡</span>
              <p className="text-sm text-gray-700 leading-relaxed">
                {error.suggestion}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="p-4 space-y-3">
          {error.canRetry && onRetry && (
            <button
              onClick={onRetry}
              disabled={isRetrying}
              className="neo-button w-full bg-pink-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRetrying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t.errors.retrying}
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  {t.errors.retryButton}
                </>
              )}
            </button>
          )}
          
          <button
            onClick={onGoHome}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
              error.canRetry
                ? 'bg-white text-gray-600 border-2 border-gray-300 hover:border-black hover:text-black'
                : 'neo-button bg-pink-500 text-white hover:bg-pink-600'
            }`}
          >
            <Home className="w-5 h-5" />
            {t.errors.goHomeButton}
          </button>
        </div>

        {/* Help Text */}
        <div className="px-4 pb-4">
          <p className="text-center text-xs text-gray-400">
            {t.errors.helpText}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          50% {
            transform: scale(1.02) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}