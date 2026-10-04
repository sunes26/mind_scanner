'use client'

import { useRouter } from 'next/navigation'
import ResultScreen from '@/components/ResultScreen'
import type { AnalysisResult, ChatData } from '@/types'

interface SampleReportProps {
  result: AnalysisResult
  chatData: ChatData
}

/** /sample 페이지에 실제 결과 화면을 그대로 끼워 넣는다 */
export default function SampleReport({ result, chatData }: SampleReportProps) {
  const router = useRouter()

  return (
    <ResultScreen
      result={result}
      chatData={chatData}
      onRetry={() => router.push('/')}
      onShare={() => router.push('/')}
      embedded
    />
  )
}
