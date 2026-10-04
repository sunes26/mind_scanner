import { describe, expect, it } from 'vitest'
import type { PersonStatsInput, ScoringInput } from '@/types/scoring'
import { SAMPLE_CHAT_TEXT } from '@/data/sampleChat'
import { buildScoringInput } from '@/utils/chatFeatures'
import { analyzeChat, parseKakaoChat } from '@/utils/chatParser'
import { analyzeStats } from '../index'
import { parseScoringConfig } from '../config'
import { parseScoringInput } from '../schema'

const person = (overrides: Partial<PersonStatsInput> = {}): PersonStatsInput => ({
  messageCount: 100,
  avgMessageLength: 15,
  emojiCount: 10,
  laughCount: 20,
  questionCount: 20,
  lateNightMessages: 5,
  conversationStarts: 10,
  conversationEnds: 10,
  heartEmojiCount: 1,
  affectionWordCount: 4,
  burstCount: 2,
  medianReplyMinutes: 3,
  quickReplyRate: 0.7,
  replyCount: 60,
  politeRate: 0.5,
  planMessageCount: 4,
  firstHalfMessages: 50,
  secondHalfMessages: 50,
  ...overrides,
})

const input = (a: Partial<PersonStatsInput> = {}, b: Partial<PersonStatsInput> = {}): ScoringInput => ({
  activeDays: 20,
  spanDays: 21,
  people: { A: person(a), B: person(b) },
})

const config = parseScoringConfig(undefined)

function sampleInput(): ScoringInput {
  const { messages } = parseKakaoChat(SAMPLE_CHAT_TEXT)
  const analysis = analyzeChat(messages, ['지우', '민준'])
  return buildScoringInput(messages, analysis, '지우', '민준')
}

describe('analyzeStats', () => {
  it('같은 입력에는 항상 같은 결과를 낸다', () => {
    expect(analyzeStats(input(), config)).toEqual(analyzeStats(input(), config))
  })

  it('점수는 0~100 사이 정수다', () => {
    const extremes = [
      input(),
      input({ messageCount: 1, questionCount: 0, conversationStarts: 0 }, { messageCount: 500 }),
      input({ medianReplyMinutes: null, replyCount: 0 }, { medianReplyMinutes: null, replyCount: 0 }),
    ]
    for (const each of extremes) {
      const { score, interestScore } = analyzeStats(each, config)
      expect(Number.isInteger(score)).toBe(true)
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(100)
      expect(interestScore).toBeGreaterThanOrEqual(0)
      expect(interestScore).toBeLessThanOrEqual(100)
    }
  })

  it('고르게 주고받는 대화가 한쪽으로 쏠린 대화보다 점수가 높다', () => {
    const even = analyzeStats(input(), config)
    const skewed = analyzeStats(
      input(
        { messageCount: 180, questionCount: 38, conversationStarts: 19 },
        { messageCount: 20, questionCount: 2, conversationStarts: 1, medianReplyMinutes: 60, quickReplyRate: 0.05 },
      ),
      config,
    )
    expect(even.score).toBeGreaterThan(skewed.score)
  })

  it('먼저 말 걸기가 쏠려 있으면 진단과 조언에 반영한다', () => {
    const result = analyzeStats(input({ conversationStarts: 18 }, { conversationStarts: 2 }), config)
    expect(result.balance.some((finding) => finding.title === '먼저 말 걸기' && finding.tone === 'note')).toBe(true)
    expect(result.advice.B).toContain('{A}님')
    expect(result.dominance).toBe('A')
  })

  it('두드러진 특징으로 성향 유형을 정하고, 없으면 안정형으로 둔다', () => {
    const result = analyzeStats(
      input({ questionCount: 60 }, { questionCount: 5, laughCount: 5, emojiCount: 2, affectionWordCount: 0 }),
      config,
    )
    expect(result.personalities.A.type).toBe('궁금한 게 많은 질문형')
    expect(result.personalities.A.traits).toHaveLength(3)

    const plain = person({
      questionCount: 10,
      laughCount: 5,
      emojiCount: 2,
      affectionWordCount: 0,
      heartEmojiCount: 0,
      burstCount: 0,
      planMessageCount: 0,
      medianReplyMinutes: 8,
      quickReplyRate: 0.3,
    })
    expect(analyzeStats({ activeDays: 20, spanDays: 21, people: { A: plain, B: plain } }, config).personalities.A.type).toBe(
      '균형 잡힌 안정형',
    )
  })

  it('결과 문장에 이름 대신 역할 표시만 쓴다', () => {
    const text = JSON.stringify(analyzeStats(sampleInput(), config))
    expect(text).not.toMatch(/지우|민준/)
  })

  it('샘플 대화는 호감이 분명한 구간의 점수를 받는다', () => {
    const result = analyzeStats(sampleInput(), config)
    expect(result.score).toBeGreaterThanOrEqual(55)
    expect(result.dimensions).toHaveLength(6)
    expect(result.balance.length).toBeGreaterThan(0)
  })
})

describe('parseScoringInput', () => {
  it('올바른 통계는 통과시킨다', () => {
    expect(parseScoringInput(sampleInput())).not.toBeNull()
  })

  it('이름·원문 같은 추가 필드나 범위를 벗어난 값은 거부한다', () => {
    const valid = input()
    expect(parseScoringInput({ ...valid, rawText: '안녕' })).toBeNull()
    expect(parseScoringInput({ ...valid, people: { ...valid.people, A: { ...valid.people.A, name: '지우' } } })).toBeNull()
    expect(parseScoringInput(input({ quickReplyRate: 2 }))).toBeNull()
    expect(parseScoringInput(input({ messageCount: -1 }))).toBeNull()
    expect(parseScoringInput(null)).toBeNull()
  })
})

describe('parseScoringConfig', () => {
  it('환경 변수가 없거나 잘못되면 기본값으로 동작한다', () => {
    expect(parseScoringConfig(undefined).scoreCeiling).toBe(100)
    expect(parseScoringConfig('{not json').scoreCeiling).toBe(100)
  })

  it('환경 변수의 값을 적용한다', () => {
    const custom = parseScoringConfig(
      JSON.stringify({
        weights: { balance: 1, responsiveness: 0, engagement: 0, expression: 0, continuity: 0, trend: 0 },
        scoreFloor: 30,
        scoreCeiling: 90,
        interestEngagementShare: 0.5,
        levelHigh: 0.7,
        levelMid: 0.4,
      }),
    )
    const result = analyzeStats(input(), custom)
    // 균형만 반영: 완전히 대칭인 입력이므로 최고점
    expect(result.score).toBe(90)
  })
})

describe('analyzeStats: 근거가 약할 때', () => {
  it('짧은 메시지를 상대보다 길다는 이유만으로 장문형으로 분류하지 않는다', () => {
    const result = analyzeStats(input({ avgMessageLength: 10 }, { avgMessageLength: 4 }), config)
    expect(result.personalities.A.type).not.toBe('정성 가득 장문형')
  })

  it('대표 유형과 반대되는 특징을 함께 보여 주지 않는다', () => {
    const result = analyzeStats(input({ avgMessageLength: 40 }, { avgMessageLength: 5 }), config)
    expect(result.personalities.A.type).toBe('정성 가득 장문형')
    expect(result.personalities.A.traits).not.toContain('짧고 빠르게 말함')
  })

  it('약속 얘기가 한 번뿐이면 한쪽만 제안한다고 말하지 않는다', () => {
    const result = analyzeStats(input({ planMessageCount: 0 }, { planMessageCount: 1 }), config)
    expect(result.advice.A).not.toContain('만남을 제안하는 쪽')
  })

  it('대화가 적으면 균형이 좋다고 단정하지 않는다', () => {
    const sparse = { conversationStarts: 1, questionCount: 2, planMessageCount: 0 }
    const result = analyzeStats(input(sparse, sparse), config)
    expect(result.advice.A).toContain('아직 대화가 많지 않아')
  })

  it('존댓말 차이는 한쪽이 대부분 존댓말, 다른 쪽이 대부분 반말일 때만 말한다', () => {
    const mild = analyzeStats(input({ politeRate: 0.45 }, { politeRate: 0.02 }), config)
    expect(mild.balance.some((finding) => finding.title === '말투')).toBe(false)
  })

  it('잘못된 설정(최저점이 최고점보다 큼)은 기본값으로 대체한다', () => {
    const broken = parseScoringConfig(
      JSON.stringify({
        weights: { balance: 1, responsiveness: 1, engagement: 1, expression: 1, continuity: 1, trend: 1 },
        scoreFloor: 90,
        scoreCeiling: 10,
        interestEngagementShare: 0.5,
        levelHigh: 0.66,
        levelMid: 0.4,
      }),
    )
    expect(broken.scoreFloor).toBe(0)
  })
})
