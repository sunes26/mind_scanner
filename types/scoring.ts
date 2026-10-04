// 브라우저 → 서버로 보내는 통계(숫자만)와, 서버가 돌려주는 채점 결과의 형태.
// 대화 원문과 이름은 여기에 들어가지 않는다. 두 사람은 역할 'A'(메시지가 더 많은 쪽), 'B'로만 구분한다.

export type Role = 'A' | 'B'

export interface PersonStatsInput {
  messageCount: number
  avgMessageLength: number
  emojiCount: number
  laughCount: number
  questionCount: number
  lateNightMessages: number
  /** 3시간 이상 공백 뒤 먼저 말을 건 횟수 */
  conversationStarts: number
  /** 3시간 이상 공백 직전 마지막 메시지를 보낸 횟수 */
  conversationEnds: number
  heartEmojiCount: number
  affectionWordCount: number
  /** 1분 안에 3개 이상 연달아 보낸 횟수 */
  burstCount: number
  /** 같은 대화 안(공백 3시간 이하)에서의 답장 시간 중앙값(분). 답장이 없으면 null */
  medianReplyMinutes: number | null
  /** 답장 가운데 5분 이내 비율 (0~1) */
  quickReplyRate: number
  replyCount: number
  /** 존댓말 어미로 끝난 메시지 비율 (0~1) */
  politeRate: number
  /** 만남·약속을 꺼내는 표현이 들어간 메시지 수 */
  planMessageCount: number
  /** 대화 기간을 반으로 나눴을 때 앞·뒤 절반의 메시지 수 */
  firstHalfMessages: number
  secondHalfMessages: number
}

export interface ScoringInput {
  /** 메시지가 하나라도 있었던 날 수 */
  activeDays: number
  /** 첫 메시지부터 마지막 메시지까지의 달력상 일수 */
  spanDays: number
  people: Record<Role, PersonStatsInput>
}

export type Level = 'high' | 'mid' | 'low'

export interface DimensionResult {
  key: 'balance' | 'responsiveness' | 'engagement' | 'expression' | 'continuity' | 'trend'
  label: string
  level: Level
  comment: string
}

export interface PersonalityResult {
  type: string
  traits: string[]
  description: string
}

export interface BalanceFinding {
  title: string
  text: string
  tone: 'good' | 'note'
}

/** 서버 응답. 문장 안의 {A}, {B}는 브라우저에서 실제 이름으로 바꾼다 */
export interface ScoringResult {
  score: number
  interestScore: number
  relation: string
  dominance: Role | 'balanced'
  dimensions: DimensionResult[]
  personalities: Record<Role, PersonalityResult>
  balance: BalanceFinding[]
  advice: Record<Role, string>
}
