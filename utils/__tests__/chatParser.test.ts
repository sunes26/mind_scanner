import { describe, expect, it } from 'vitest'
import { analyzeChat, parseKakaoChat } from '@/utils/chatParser'

const line = (time: string, sender: string, content: string, day = 1) =>
  `2026년 9월 ${day}일 ${time}, ${sender} : ${content}`

function analyze(lines: string[]) {
  const { messages, participants } = parseKakaoChat(lines.join('\n'))
  return { messages, participants, analysis: analyzeChat(messages, participants) }
}

describe('parseKakaoChat', () => {
  it('PC 내보내기 형식의 메시지와 참여자를 읽는다', () => {
    const { messages, participants } = parseKakaoChat(
      [line('오후 7:12', '민준', '안녕'), line('오후 7:13', '지우', '안녕!')].join('\n'),
    )
    expect(messages).toHaveLength(2)
    expect(participants).toEqual(['민준', '지우'])
  })

  it('여러 줄 메시지의 둘째 줄부터를 같은 메시지에 이어 붙인다', () => {
    const { messages } = parseKakaoChat(
      [line('오후 7:12', '민준', '첫 줄'), '둘째 줄', '셋째 줄', line('오후 7:13', '지우', '응')].join('\n'),
    )
    expect(messages).toHaveLength(2)
    expect(messages[0].content).toBe('첫 줄\n둘째 줄\n셋째 줄')
  })

  it('파일 머리말처럼 메시지보다 앞에 오는 줄은 버린다', () => {
    const { messages } = parseKakaoChat(
      ['지우 님과 카카오톡 대화', '저장한 날짜 : 2026년 9월 22일 오전 10:00', line('오후 7:12', '민준', '안녕')].join('\n'),
    )
    expect(messages).toHaveLength(1)
    expect(messages[0].content).toBe('안녕')
  })

  it('"사진"만 있는 메시지는 시스템 메시지로, "사진"으로 끝나는 문장은 일반 메시지로 본다', () => {
    const { messages } = parseKakaoChat(
      [
        line('오후 7:12', '민준', '사진'),
        line('오후 7:13', '민준', '사진 3장'),
        line('오후 7:14', '지우', '어제 찍은 사진'),
        line('오후 7:15', '지우', '이모티콘'),
      ].join('\n'),
    )
    expect(messages.map((message) => message.isSystemMessage)).toEqual([true, true, false, true])
  })
})

describe('analyzeChat', () => {
  it('이모지를 글자 수가 아니라 개수로 센다', () => {
    const { analysis } = analyze([line('오후 7:12', '민준', '좋아요 😊😊'), line('오후 7:13', '지우', '네 ☀️')])
    expect(analysis.participants['민준'].emojiCount).toBe(2)
    expect(analysis.participants['지우'].emojiCount).toBe(1)
  })

  it('하트 이모지를 중복해서 세지 않는다', () => {
    const { analysis } = analyze([line('오후 7:12', '민준', '❤️ 💕'), line('오후 7:13', '지우', '응')])
    expect(analysis.participants['민준'].heartEmojiCount).toBe(2)
  })

  it('강조 부사는 애정 표현으로 세지 않고, 겹치는 단어를 두 번 세지 않는다', () => {
    const { analysis } = analyze([
      line('오후 7:12', '민준', '진짜 너무 완전 엄청 피곤해'),
      line('오후 7:13', '지우', '좋아해'),
    ])
    expect(analysis.participants['민준'].affectionWordCount).toBe(0)
    expect(analysis.participants['지우'].affectionWordCount).toBe(1)
  })

  it('같은 분 안에 온 답장도 답장 시간에 포함한다', () => {
    const { analysis } = analyze([
      line('오후 7:12', '민준', '뭐해?'),
      line('오후 7:12', '지우', '집이야'),
      line('오후 7:20', '민준', '그렇구나'),
      line('오후 7:30', '지우', '응'),
    ])
    // 지우의 답장 간격: 0분, 10분 → 평균 5분
    expect(analysis.participants['지우'].avgReplyTime).toBe(5)
  })

  it('3시간 이상 공백 뒤 첫 메시지를 대화 시작으로 센다', () => {
    const { analysis } = analyze([
      line('오전 9:00', '민준', '좋은 아침'),
      line('오전 9:05', '지우', '굿모닝'),
      line('오후 3:00', '지우', '점심 먹었어?'),
      line('오후 3:02', '민준', '응'),
    ])
    expect(analysis.participants['민준'].firstMessageCount).toBe(1)
    expect(analysis.participants['지우'].firstMessageCount).toBe(1)
  })
})

describe('parseKakaoChat: 메시지가 아닌 줄', () => {
  it('날짜 머리글과 입장 알림은 앞 메시지에 이어 붙이지 않는다', () => {
    const { messages } = parseKakaoChat(
      [
        line('오후 7:12', '민준', '안녕'),
        '2026년 9월 2일 수요일',
        '2026년 9월 2일 오후 2:01: 영희님이 들어왔습니다.',
        '--------------- 2026년 9월 3일 목요일 ---------------',
        line('오후 7:13', '지우', '응', 3),
      ].join('\n'),
    )
    expect(messages).toHaveLength(2)
    expect(messages[0].content).toBe('안녕')
  })
})
