import { describe, expect, it } from 'vitest'
import { buildScoringInput } from '@/utils/chatFeatures'
import { analyzeChat, parseKakaoChat } from '@/utils/chatParser'

const line = (day: number, time: string, sender: string, content: string) =>
  `2026년 9월 ${day}일 ${time}, ${sender} : ${content}`

function build(lines: string[]) {
  const { messages } = parseKakaoChat(lines.join('\n'))
  const analysis = analyzeChat(messages, ['지우', '민준'])
  return buildScoringInput(messages, analysis, '지우', '민준')
}

describe('buildScoringInput', () => {
  const input = build([
    line(1, '오후 7:00', '민준', '오늘 뭐 했어요?'),
    line(1, '오후 7:02', '지우', '집에서 쉬었어요'),
    line(1, '오후 7:12', '민준', '주말에 영화 볼까요?'),
    line(1, '오후 7:13', '지우', '좋아'),
    line(3, '오전 9:00', '지우', '좋은 아침'),
    line(3, '오전 9:40', '민준', '굿모닝이에요 ㅎㅎ'),
  ])

  it('이름과 원문 없이 숫자만 담는다', () => {
    expect(JSON.stringify(input)).not.toMatch(/지우|민준|영화/)
  })

  it('같은 대화 안의 답장으로 중앙값과 빠른 답장 비율을 구한다', () => {
    // 지우의 답장: 2분, 1분 → 중앙값 1.5분, 모두 5분 이내
    expect(input.people.A.medianReplyMinutes).toBe(1.5)
    expect(input.people.A.quickReplyRate).toBe(1)
    // 민준의 답장: 10분, 40분 → 중앙값 25분, 5분 이내 없음
    expect(input.people.B.medianReplyMinutes).toBe(25)
    expect(input.people.B.quickReplyRate).toBe(0)
  })

  it('3시간 넘는 공백 뒤의 메시지는 답장이 아니라 대화 시작으로, 공백 직전 메시지는 대화의 끝으로 센다', () => {
    expect(input.people.A.replyCount).toBe(2)
    expect(input.people.A.conversationStarts).toBe(1)
    expect(input.people.B.conversationStarts).toBe(1)
    expect(input.people.A.conversationEnds).toBe(1)
    expect(input.people.B.conversationEnds).toBe(0)
  })

  it('존댓말 비율과 약속을 꺼낸 메시지 수를 센다', () => {
    expect(input.people.B.politeRate).toBe(1)
    expect(input.people.A.politeRate).toBeCloseTo(1 / 3)
    expect(input.people.B.planMessageCount).toBe(1)
    expect(input.people.A.planMessageCount).toBe(0)
  })

  it('대화 기간과 앞·뒤 절반의 메시지 수를 구한다', () => {
    expect(input.spanDays).toBe(3)
    expect(input.activeDays).toBe(2)
    expect(input.people.A.firstHalfMessages + input.people.A.secondHalfMessages).toBe(3)
    expect(input.people.B.firstHalfMessages).toBe(2)
    expect(input.people.B.secondHalfMessages).toBe(1)
  })
})

describe('buildScoringInput: 경계 사례', () => {
  it('자정을 걸친 짧은 대화도 달력 날짜로 일수를 센다', () => {
    const input = build([line(1, '오후 11:00', '민준', '자?'), line(2, '오전 1:00', '지우', '아직')])
    expect(input.spanDays).toBe(2)
    expect(input.activeDays).toBe(2)
  })

  it('"필요", "중요"처럼 요로 끝나는 말이나 "~니까"를 존댓말로 세지 않는다', () => {
    const input = build([
      line(1, '오후 7:00', '지우', '그건 필요'),
      line(1, '오후 7:01', '지우', '이게 더 중요'),
      line(1, '오후 7:02', '지우', '바쁘니까ㅋㅋ'),
      line(1, '오후 7:03', '민준', '알겠어요 ㅎㅎ'),
      line(1, '오후 7:04', '민준', '감사합니다!'),
    ])
    expect(input.people.A.politeRate).toBe(0)
    expect(input.people.B.politeRate).toBe(1)
  })
})
