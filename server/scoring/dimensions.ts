import type { DimensionResult, Level, PersonStatsInput, ScoringInput } from '@/types/scoring'
import type { ScoringConfig } from './config'

// 통계를 6개 항목의 0~1 값으로 바꾼다. 항목을 어떻게 합쳐 점수로 만드는지는 config(환경 변수)가 정한다.

export type DimensionKey = DimensionResult['key']
export type DimensionValues = Record<DimensionKey, number>

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value))
const mean = (values: number[]): number => values.reduce((sum, value) => sum + value, 0) / values.length
const perMessage = (count: number, messages: number): number => (messages > 0 ? count / messages : 0)

/** 두 값이 같을수록 1, 한쪽으로 쏠릴수록 0 */
export function symmetry(a: number, b: number): number {
  return a + b === 0 ? 0.5 : 1 - Math.abs(a - b) / (a + b)
}

/** 한쪽이 차지하는 비율 (0~1). 둘 다 0이면 0.5 */
export function share(a: number, b: number): number {
  return a + b === 0 ? 0.5 : a / (a + b)
}

const REPLY_HALF_MINUTES = 15
/** 답장이 이보다 적으면 답장 속도를 판단하지 않는다 */
export const MIN_REPLIES = 5
function replyScore(person: PersonStatsInput): number {
  if (person.medianReplyMinutes === null || person.replyCount < MIN_REPLIES) return 0.5
  const speed = 1 / (1 + person.medianReplyMinutes / REPLY_HALF_MINUTES)
  return 0.6 * speed + 0.4 * person.quickReplyRate
}

export function computeDimensions(input: ScoringInput): DimensionValues {
  const { A, B } = input.people
  const totalMessages = A.messageCount + B.messageCount

  const balance = mean([
    symmetry(A.messageCount, B.messageCount),
    symmetry(A.messageCount * A.avgMessageLength, B.messageCount * B.avgMessageLength),
    symmetry(A.questionCount, B.questionCount),
    symmetry(A.conversationStarts, B.conversationStarts),
  ])

  const responsiveness = mean([replyScore(A), replyScore(B)])

  const engagement = mean([
    clamp01(totalMessages / input.activeDays / 40),
    clamp01(perMessage(A.questionCount + B.questionCount, totalMessages) / 0.3),
    clamp01((A.conversationStarts + B.conversationStarts) / input.spanDays / 1.5),
    clamp01(perMessage(A.planMessageCount + B.planMessageCount, totalMessages) / 0.06),
  ])

  const expression = mean([
    clamp01(perMessage(A.laughCount + B.laughCount, totalMessages) / 0.3),
    clamp01(perMessage(A.emojiCount + B.emojiCount, totalMessages) / 0.2),
    clamp01(
      perMessage(A.affectionWordCount + B.affectionWordCount + A.heartEmojiCount + B.heartEmojiCount, totalMessages) /
        0.08,
    ),
  ])

  const continuity = clamp01(input.activeDays / input.spanDays)

  const firstHalf = A.firstHalfMessages + B.firstHalfMessages
  const secondHalf = A.secondHalfMessages + B.secondHalfMessages
  const trend = firstHalf === 0 ? 0.5 : clamp01(secondHalf / firstHalf - 0.5)

  return { balance, responsiveness, engagement, expression, continuity, trend }
}

/** 항목 값을 비중대로 합쳐 0~1로 만든다 */
export function combine(values: DimensionValues, weights: ScoringConfig['weights']): number {
  const keys = Object.keys(values) as DimensionKey[]
  const totalWeight = keys.reduce((sum, key) => sum + weights[key], 0)
  if (totalWeight === 0) return mean(keys.map((key) => values[key]))
  return keys.reduce((sum, key) => sum + values[key] * weights[key], 0) / totalWeight
}

const DIMENSION_TEXT: Record<DimensionKey, { label: string; comments: Record<Level, string> }> = {
  balance: {
    label: '주고받는 균형',
    comments: {
      high: '메시지, 질문, 먼저 말 걸기가 두 사람에게 고르게 나뉘어 있습니다.',
      mid: '대체로 주고받지만 한쪽이 조금 더 끌고 가는 부분이 있습니다.',
      low: '대화의 여러 부분이 한 사람에게 쏠려 있습니다.',
    },
  },
  responsiveness: {
    label: '답장 반응',
    comments: {
      high: '대화가 이어지는 동안 서로 답이 빠르게 오갑니다.',
      mid: '답장 간격이 보통 수준입니다.',
      low: '대화 중에도 답장 간격이 긴 편입니다.',
    },
  },
  engagement: {
    label: '대화 참여',
    comments: {
      high: '질문과 먼저 말 걸기, 약속 얘기가 활발합니다.',
      mid: '대화는 꾸준하지만 질문이나 약속 얘기는 많지 않습니다.',
      low: '대화량과 질문이 적어 서로를 알아갈 재료가 부족합니다.',
    },
  },
  expression: {
    label: '감정 표현',
    comments: {
      high: '웃음과 이모지, 다정한 말이 자주 나옵니다.',
      mid: '감정 표현이 적당히 섞여 있습니다.',
      low: '웃음이나 이모지 같은 감정 표현이 드문 편입니다.',
    },
  },
  continuity: {
    label: '연락의 꾸준함',
    comments: {
      high: '대화가 끊기는 날이 드물 만큼 꾸준히 연락했습니다.',
      mid: '대화가 없는 날이 종종 섞여 있습니다.',
      low: '대화가 없는 날이 꽤 많은 편입니다.',
    },
  },
  trend: {
    label: '최근 흐름',
    comments: {
      high: '기간의 뒤쪽으로 갈수록 대화가 늘어나는 편입니다.',
      mid: '앞쪽과 뒤쪽의 대화량이 크게 다르지 않습니다.',
      low: '기간의 뒤쪽으로 갈수록 대화가 줄어드는 편입니다.',
    },
  },
}

export function toLevel(value: number, config: Pick<ScoringConfig, 'levelHigh' | 'levelMid'>): Level {
  if (value >= config.levelHigh) return 'high'
  return value >= config.levelMid ? 'mid' : 'low'
}

export function describeDimensions(values: DimensionValues, config: ScoringConfig): DimensionResult[] {
  return (Object.keys(DIMENSION_TEXT) as DimensionKey[]).map((key) => {
    const level = toLevel(values[key], config)
    return { key, label: DIMENSION_TEXT[key].label, level, comment: DIMENSION_TEXT[key].comments[level] }
  })
}
