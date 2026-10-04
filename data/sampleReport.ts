import type { AnalysisResult, ChatData } from '@/types'
import { analyzeStats } from '@/server/scoring'
import { buildScoringInput } from '@/utils/chatFeatures'
import { analyzeChat, parseKakaoChat } from '@/utils/chatParser'
import { toAnalysisResult } from '@/utils/resultMapping'
import { SAMPLE_CHAT_TEXT } from './sampleChat'

// /sample 페이지용 데이터. 실제 서비스와 같은 파서·채점 로직으로 가상의 대화 파일을 분석한다.
// 서버 컴포넌트에서만 불러 쓴다(채점 로직이 브라우저 번들에 들어가지 않게).

export interface SampleReport {
  chatData: ChatData
  result: AnalysisResult
}

export function buildSampleReport(): SampleReport {
  const { messages, participants } = parseKakaoChat(SAMPLE_CHAT_TEXT)
  const userMessages = messages.filter((message) => !message.isSystemMessage)
  const baseAnalysis = analyzeChat(userMessages, participants)

  const [p1, p2] = [...participants].sort(
    (a, b) => (baseAnalysis.participants[b]?.messageCount ?? 0) - (baseAnalysis.participants[a]?.messageCount ?? 0),
  )
  const analysis = analyzeChat(userMessages, [p1, p2])
  const countP1 = analysis.participants[p1]?.messageCount ?? 0
  const countP2 = analysis.participants[p2]?.messageCount ?? 0
  const scoringInput = buildScoringInput(userMessages, analysis, p1, p2)

  return {
    chatData: { p1, p2, countP1, countP2, total: countP1 + countP2, analysis, scoringInput },
    result: toAnalysisResult(analyzeStats(scoringInput), p1, p2),
  }
}
