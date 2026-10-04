import { z } from 'zod'
import type { ScoringInput } from '@/types/scoring'

// 브라우저가 보낸 통계 검증. 숫자 범위만 받으며, 문자열(이름·원문)은 스키마에 없어 들어올 수 없다.

const MAX_MESSAGES = 300_000
const MAX_DAYS = 36_500

const count = z.number().int().min(0).max(MAX_MESSAGES)
const rate = z.number().min(0).max(1)

const personSchema = z
  .object({
    messageCount: count,
    avgMessageLength: z.number().min(0).max(300_000),
    emojiCount: count,
    laughCount: count,
    questionCount: count,
    lateNightMessages: count,
    conversationStarts: count,
    conversationEnds: count,
    heartEmojiCount: count,
    affectionWordCount: count,
    burstCount: count,
    medianReplyMinutes: z.number().min(0).max(180).nullable(),
    quickReplyRate: rate,
    replyCount: count,
    politeRate: rate,
    planMessageCount: count,
    firstHalfMessages: count,
    secondHalfMessages: count,
  })
  .strict()

export const scoringInputSchema = z
  .object({
    activeDays: z.number().int().min(1).max(MAX_DAYS),
    spanDays: z.number().int().min(1).max(MAX_DAYS),
    people: z.object({ A: personSchema, B: personSchema }).strict(),
  })
  .strict()

export function parseScoringInput(data: unknown): ScoringInput | null {
  const parsed = scoringInputSchema.safeParse(data)
  return parsed.success ? parsed.data : null
}
