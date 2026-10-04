import type { ChatAnalysis, ParsedMessage } from '@/types'
import type { PersonStatsInput, Role, ScoringInput } from '@/types/scoring'

// 채점에 쓰는 추가 통계를 브라우저에서 계산한다. 결과는 숫자뿐이며 원문·이름은 포함하지 않는다.

/** 이 시간(분) 이상 대화가 없으면 새 대화가 시작된 것으로 본다 */
export const CONVERSATION_GAP_MINUTES = 180
const QUICK_REPLY_MINUTES = 5
const MS_PER_MINUTE = 60 * 1000
const MS_PER_DAY = 24 * 60 * MS_PER_MINUTE

// 존댓말로 끝나는 메시지. 끝의 문장부호·웃음(ㅋㅋ)·이모지를 떼어 낸 뒤 어미를 본다.
// "필요", "중요"처럼 우연히 "요"로 끝나는 말을 피하려고 "요" 앞 글자를 제한한다.
const TRAILING_NOISE = /[^가-힣a-zA-Z0-9]+$/
const POLITE_ENDING = /([어아해세셔네군예에까래게데나가지구고워와려죠]요|니다|죠)$/

function isPolite(content: string): boolean {
  return POLITE_ENDING.test(content.replace(TRAILING_NOISE, ''))
}

// 만남·약속을 꺼내는 표현
const PLAN_PATTERN = /만나|만날|보자|볼까|볼래|갈래|갈까|가자|같이 (가|먹|보)|언제 (시간|돼|되)|시간 (돼|되|괜찮)|주말에|약속/

interface Reply {
  sender: string
  minutes: number
}

function minutesBetween(earlier: Date, later: Date): number {
  return (later.getTime() - earlier.getTime()) / MS_PER_MINUTE
}

function median(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 1 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

/** 두 시각 사이의 달력상 일수(첫날 포함). 시각이 아니라 날짜로 센다 */
function calendarSpanDays(first: Date, last: Date): number {
  const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  return Math.max(1, Math.round((startOfDay(last) - startOfDay(first)) / MS_PER_DAY) + 1)
}

function ratio(count: number, total: number): number {
  return total > 0 ? count / total : 0
}

/** 같은 대화 안에서 상대 메시지 바로 다음에 보낸 답장들 */
function collectReplies(messages: ParsedMessage[]): Reply[] {
  return messages.flatMap((message, index) => {
    if (index === 0) return []
    const previous = messages[index - 1]
    if (previous.sender === message.sender) return []
    const minutes = minutesBetween(previous.timestamp, message.timestamp)
    return minutes >= 0 && minutes <= CONVERSATION_GAP_MINUTES ? [{ sender: message.sender, minutes }] : []
  })
}

/** 긴 공백 직전에 마지막으로 말한 사람들 (파일의 맨 마지막 메시지는 제외) */
function collectConversationEnders(messages: ParsedMessage[]): string[] {
  return messages.flatMap((message, index) => {
    const next = messages[index + 1]
    if (!next) return []
    return minutesBetween(message.timestamp, next.timestamp) > CONVERSATION_GAP_MINUTES ? [message.sender] : []
  })
}

function buildPersonInput(
  name: string,
  messages: ParsedMessage[],
  analysis: ChatAnalysis,
  replies: Reply[],
  enders: string[],
  midpoint: number,
): PersonStatsInput {
  const base = analysis.participants[name]
  const own = messages.filter((message) => message.sender === name)
  const ownReplies = replies.filter((reply) => reply.sender === name).map((reply) => reply.minutes)
  const medianReply = median(ownReplies)
  const firstHalfMessages = own.filter((message) => message.timestamp.getTime() <= midpoint).length

  return {
    messageCount: base?.messageCount ?? 0,
    avgMessageLength: base?.avgMessageLength ?? 0,
    emojiCount: base?.emojiCount ?? 0,
    laughCount: base?.laughCount ?? 0,
    questionCount: base?.questionCount ?? 0,
    lateNightMessages: base?.lateNightMessages ?? 0,
    conversationStarts: base?.firstMessageCount ?? 0,
    conversationEnds: enders.filter((sender) => sender === name).length,
    heartEmojiCount: base?.heartEmojiCount ?? 0,
    affectionWordCount: base?.affectionWordCount ?? 0,
    burstCount: base?.consecutiveMessageCount ?? 0,
    medianReplyMinutes: medianReply === null ? null : Math.round(medianReply * 10) / 10,
    quickReplyRate: ratio(ownReplies.filter((minutes) => minutes <= QUICK_REPLY_MINUTES).length, ownReplies.length),
    replyCount: ownReplies.length,
    politeRate: ratio(own.filter((message) => isPolite(message.content)).length, own.length),
    planMessageCount: own.filter((message) => PLAN_PATTERN.test(message.content)).length,
    firstHalfMessages,
    secondHalfMessages: own.length - firstHalfMessages,
  }
}

/**
 * 두 사람의 메시지(시스템 메시지 제외, 시간순)와 기본 통계로 서버에 보낼 채점 입력을 만든다.
 * nameA가 역할 'A', nameB가 역할 'B'가 된다.
 */
export function buildScoringInput(
  messages: ParsedMessage[],
  analysis: ChatAnalysis,
  nameA: string,
  nameB: string,
): ScoringInput {
  const userMessages = messages.filter((message) => !message.isSystemMessage)
  const firstTime = userMessages[0]?.timestamp.getTime() ?? 0
  const lastTime = userMessages[userMessages.length - 1]?.timestamp.getTime() ?? firstTime
  const midpoint = firstTime + (lastTime - firstTime) / 2
  const replies = collectReplies(userMessages)
  const enders = collectConversationEnders(userMessages)
  const names: Record<Role, string> = { A: nameA, B: nameB }

  return {
    activeDays: analysis.totalDays,
    spanDays: Math.max(analysis.totalDays, calendarSpanDays(new Date(firstTime), new Date(lastTime))),
    people: {
      A: buildPersonInput(names.A, userMessages, analysis, replies, enders, midpoint),
      B: buildPersonInput(names.B, userMessages, analysis, replies, enders, midpoint),
    },
  }
}
