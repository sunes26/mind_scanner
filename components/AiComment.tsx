'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { ScoringInput } from '@/types/scoring'
import { fillModelNames } from '@/utils/resultMapping'

interface AiCommentProps {
  stats: ScoringInput
  nameA: string
  nameB: string
}

type Status = 'idle' | 'loading' | 'done' | 'error'

/** 버튼을 눌렀을 때만 AI 코멘트를 요청한다. 서버에는 숫자 통계만 간다 */
export default function AiComment({ stats, nameA, nameB }: AiCommentProps) {
  const { t } = useLanguage()
  const text = t.resultScreen.secretReport
  const [status, setStatus] = useState<Status>('idle')
  const [comment, setComment] = useState('')

  const requestComment = async () => {
    setStatus('loading')
    try {
      const response = await fetch('/api/analyze/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stats }),
      })
      if (!response.ok) throw new Error(`comment request failed: ${response.status}`)

      const data: { comment?: unknown } = await response.json()
      if (typeof data.comment !== 'string' || data.comment.length === 0) throw new Error('empty comment')

      setComment(fillModelNames(data.comment, nameA, nameB))
      setStatus('done')
    } catch {
      // 코멘트는 부가 기능이므로 실패해도 리포트는 그대로 두고 안내만 한다
      setStatus('error')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-6 bg-[#FFD233] rounded-full"></div>
        <h4 className="text-[#FFD233] font-bold text-lg">{text.aiCommentTitle}</h4>
      </div>
      <div className="bg-white/5 p-5 rounded-xl border border-white/10">
        {status === 'done' ? (
          <p role="status" className="text-sm text-gray-200 leading-relaxed">{comment}</p>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs text-gray-300 leading-relaxed flex-1">{text.aiCommentDescription}</p>
            <button
              type="button"
              onClick={requestComment}
              disabled={status === 'loading'}
              className="neo-btn bg-[#FFD233] text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              {status === 'loading' ? text.aiCommentLoading : text.aiCommentButton}
            </button>
          </div>
        )}
        {status === 'error' && (
          <p role="alert" className="text-xs text-red-300 mt-3">
            {text.aiCommentError}
          </p>
        )}
      </div>
    </div>
  )
}
