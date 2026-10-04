import { NextRequest, NextResponse } from 'next/server'
import { createOpenAI } from '@spanlens/sdk/openai'
import { analyzeStats } from '@/server/scoring'
import { parseScoringInput } from '@/server/scoring/schema'
import type { PersonStatsInput, Role, ScoringInput, ScoringResult } from '@/types/scoring'

// 선택 기능: 사용자가 버튼을 눌렀을 때만 호출되는 AI 코멘트.
// 모델에는 숫자 통계와 규칙 기반 진단만 전달한다. 대화 원문과 이름은 서버에 오지 않으므로 전달할 수도 없다.

const MODEL = 'gpt-4o-mini'
const REQUEST_TIMEOUT_MS = 12_000

// Vercel 함수 실행 시간 상한(초)
export const maxDuration = 20
const MAX_OUTPUT_TOKENS = 300
const MAX_COMMENT_LENGTH = 600

const SYSTEM_PROMPT = `너는 두 사람의 메신저 대화 통계를 보고 짧은 코멘트를 쓰는 도우미다.
- 주어진 숫자와 진단만 근거로 쓴다. 대화 내용은 보지 못했으므로 내용에 대해 지어내지 않는다.
- 두 사람은 "A님", "B님"으로만 부른다.
- 상대의 속마음이나 관계의 결말을 단정하지 않는다. "~로 보입니다", "~일 수 있습니다"처럼 쓴다.
- 점수, 배점, 계산 방식은 언급하지 않는다.
- 존댓말로 3~4문장. 목록이나 제목 없이 이어지는 글로 쓴다. 이모지는 쓰지 않는다.
- 마지막 문장은 두 사람이 해볼 수 있는 구체적인 행동 하나로 끝낸다.`

function describePerson(role: Role, person: PersonStatsInput): string {
  const reply = person.medianReplyMinutes === null ? '없음' : `${person.medianReplyMinutes}분`
  return [
    `${role}님: 메시지 ${person.messageCount}개`,
    `평균 ${person.avgMessageLength}자`,
    `질문 ${person.questionCount}회`,
    `먼저 말 건 횟수 ${person.conversationStarts}회`,
    `대화 중 답장 간격 중간값 ${reply}`,
    `5분 내 답장 비율 ${Math.round(person.quickReplyRate * 100)}%`,
    `웃음 표현 ${person.laughCount}회`,
    `이모지 ${person.emojiCount}개`,
    `약속을 꺼낸 메시지 ${person.planMessageCount}개`,
    `심야 메시지 ${person.lateNightMessages}개`,
  ].join(', ')
}

function buildPrompt(stats: ScoringInput, result: ScoringResult): string {
  const levelText = { high: '높음', mid: '보통', low: '낮음' } as const
  return [
    `대화 기간 ${stats.spanDays}일 중 ${stats.activeDays}일 대화.`,
    describePerson('A', stats.people.A),
    describePerson('B', stats.people.B),
    `항목별 수준: ${result.dimensions.map((dimension) => `${dimension.label} ${levelText[dimension.level]}`).join(', ')}`,
    `대화 성향: A님 ${result.personalities.A.type}, B님 ${result.personalities.B.type}`,
    `눈에 띄는 점: ${result.balance.map((finding) => finding.text.replace(/\{([AB])\}/g, '$1')).join(' ')}`,
    '위 내용을 바탕으로 두 사람의 대화를 한 단락으로 요약해 줘.',
  ].join('\n')
}

/** 길이 제한에 걸려 문장이 중간에 끊겼으면 마지막으로 끝난 문장까지만 남긴다 */
function trimToSentence(text: string): string {
  const limited = Array.from(text).slice(0, MAX_COMMENT_LENGTH).join('')
  if (/[.!?。]$/.test(limited)) return limited
  const lastEnd = Math.max(limited.lastIndexOf('.'), limited.lastIndexOf('!'), limited.lastIndexOf('?'))
  return lastEnd > 0 ? limited.slice(0, lastEnd + 1) : limited
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!process.env.SPANLENS_API_KEY) {
    return NextResponse.json({ error: 'AI 코멘트를 사용할 수 없습니다.' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '요청 형식이 올바르지 않습니다.' }, { status: 400 })
  }

  const stats = parseScoringInput((body as { stats?: unknown } | null)?.stats)
  if (!stats) {
    return NextResponse.json({ error: '통계 값이 올바르지 않습니다.' }, { status: 400 })
  }

  try {
    const result = analyzeStats(stats)
    // 실패 시 자동 재시도하지 않는다(재시도마다 비용이 들고 실행 시간이 길어진다)
    const openai = createOpenAI({ timeout: REQUEST_TIMEOUT_MS, maxRetries: 0 })
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildPrompt(stats, result) },
      ],
      temperature: 0.6,
      max_tokens: MAX_OUTPUT_TOKENS,
    })

    const comment = completion.choices[0]?.message?.content?.trim()
    if (!comment) {
      return NextResponse.json({ error: 'AI 코멘트를 만들지 못했습니다.' }, { status: 502 })
    }
    return NextResponse.json({ comment: trimToSentence(comment) })
  } catch (error: unknown) {
    console.error('[analyze/comment] failed:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'AI 코멘트를 만들지 못했습니다.' }, { status: 502 })
  }
}
