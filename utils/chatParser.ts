import { ChatAnalysis, ParticipantStats, ParsedMessage } from '@/types'

/**
 * 카카오톡 대화 내용을 파싱하는 유틸리티
 * PC 버전과 모바일 버전 모두 지원
 */

// 정규식 패턴들
const PATTERNS = {
  // PC 버전: "2024년 1월 1일 오후 2:00, 홍길동 : 메시지"
  PC_MESSAGE: /(\d{4}년 \d{1,2}월 \d{1,2}일 [오전오후]+ \d{1,2}:\d{2}),\s*(.+?)\s*:\s*(.+)/,

  // 모바일 버전 (점 구분자): "2025. 11. 5. 오후 3:50, 홍길동 : 메시지"
  MOBILE_DOT_MESSAGE: /(\d{4}\.\s*\d{1,2}\.\s*\d{1,2}\.\s*[오전오후]+\s*\d{1,2}:\d{2}),\s*(.+?)\s*:\s*(.+)/,

  // 모바일 버전 (대괄호): "[홍길동] [오후 2:00] 메시지"
  MOBILE_MESSAGE: /\[(.+?)\]\s*\[([오전오후]+\s*\d{1,2}:\d{2})\]\s*(.+)/,
  
  // 날짜 구분선: "------------------- 2024년 1월 1일 월요일 -------------------"
  DATE_LINE: /^-+\s*(\d{4}년 \d{1,2}월 \d{1,2}일)/,
  
  // 날짜로 시작하는 줄 (날짜 머리글, "2024년 1월 1일 오후 2:01: OO님이 들어왔습니다" 같은 알림)
  DATE_START: /^\d{4}[년.]\s*\d{1,2}[월.]\s*\d{1,2}/,

  // 날짜만: "2024년 1월 1일" 또는 "2024. 1. 1."
  DATE_ONLY: /(\d{4})[년.]\s*(\d{1,2})[월.]\s*(\d{1,2})[일.]?/,
  
  // 시간: "오후 2:00" 또는 "오전 11:30"
  TIME: /([오전오후]+)\s*(\d{1,2}):(\d{2})/,
  
  // 시스템 메시지 패턴
  SYSTEM_MESSAGES: [
    /님이 들어왔습니다/,
    /님이 나갔습니다/,
    /님을 초대했습니다/,
    /채팅방을 나갔습니다/,
    /^사진(\s*\d+장)?$/,
    /^동영상$/,
    /^파일:/,
    /^이모티콘$/,
    /삭제된 메시지입니다/,
  ],
  
  // 웃음 표현
  LAUGH: /[ㅋㅎ]{2,}|ㅋ{2,}|ㅎ{2,}|lol|LOL|ㄱㅋ{2,}/g,
}

// 이모지로 세는 코드 포인트 범위 [시작, 끝]
const EMOJI_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x1f000, 0x1f3fa], // 기호·음식·활동 등 (피부색 변경자 0x1F3FB-0x1F3FF 제외)
  [0x1f400, 0x1faff], // 동물·사람·표정·사물 등
  [0x2600, 0x27bf], // 날씨·기타 기호·딩벳
  [0x231a, 0x231b],
  [0x23e9, 0x23f3],
  [0x23f8, 0x23fa],
  [0x25aa, 0x25ab],
  [0x25b6, 0x25b6],
  [0x25c0, 0x25c0],
  [0x25fb, 0x25fe],
  [0x2934, 0x2935],
  [0x2b05, 0x2b07],
  [0x2b1b, 0x2b1c],
  [0x2b50, 0x2b50],
  [0x2b55, 0x2b55],
  [0x3030, 0x3030],
  [0x303d, 0x303d],
  [0x3297, 0x3297],
  [0x3299, 0x3299],
]

// 하트·애정 표현으로 보는 이모지
const HEART_CODE_POINTS: ReadonlySet<number> = new Set([
  0x2763, 0x2764, 0x2665, // ❣ ❤ ♥
  0x1f493, 0x1f495, 0x1f496, 0x1f497, 0x1f498, 0x1f49d, 0x1f49e, // 💓💕💖💗💘💝💞
  0x1f60d, 0x1f970, 0x1f618, 0x1f63b, 0x1f48b, // 😍🥰😘😻💋
])

/** 문자열을 코드 포인트 배열로 (서로게이트 쌍을 한 글자로 취급) */
function toCodePoints(content: string): number[] {
  return Array.from(content, (char) => char.codePointAt(0) ?? 0)
}

function isEmojiCodePoint(codePoint: number): boolean {
  return EMOJI_RANGES.some(([start, end]) => codePoint >= start && codePoint <= end)
}

/**
 * 이모지 개수 세기 (이모지 하나를 1로 센다)
 */
function countEmojis(content: string): number {
  return toCodePoints(content).filter(isEmojiCodePoint).length
}

/**
 * 하트/사랑 이모지 개수 세기
 */
function countHeartEmojis(content: string): number {
  return toCodePoints(content).filter((codePoint) => HEART_CODE_POINTS.has(codePoint)).length
}

/**
 * 애정 표현 단어 개수 세기
 */
function countAffectionWords(content: string): number {
  // 서로 포함 관계인 단어(좋아/좋아해 등)는 짧은 쪽 하나만 둔다.
  // '진짜', '너무' 같은 강조 부사는 애정 표현이 아니므로 넣지 않는다.
  const affectionWords = [
    '사랑', '좋아', '보고싶', '보고파', '그리워', '그립', '이뻐', '이쁘', '예쁘',
    '귀여워', '귀엽', '멋있', '멋져', '매력', '설레', '두근', '반했', '반해',
  ]

  let count = 0
  for (const word of affectionWords) {
    const regex = new RegExp(word, 'g')
    const matches = content.match(regex)
    if (matches) {
      count += matches.length
    }
  }

  return count
}

/**
 * 시간 문자열을 Date 객체로 변환
 */
function parseTime(timeStr: string, baseDate?: Date): Date {
  const match = timeStr.match(PATTERNS.TIME)
  if (!match) return new Date()
  
  const [, ampm, hourStr, minuteStr] = match
  let hour = parseInt(hourStr)
  const minute = parseInt(minuteStr)
  
  if (ampm === '오후' && hour !== 12) {
    hour += 12
  } else if (ampm === '오전' && hour === 12) {
    hour = 0
  }
  
  const date = baseDate ? new Date(baseDate) : new Date()
  date.setHours(hour, minute, 0, 0)
  return date
}

/**
 * 날짜 문자열을 Date 객체로 변환
 */
function parseDate(dateStr: string): Date {
  const match = dateStr.match(PATTERNS.DATE_ONLY)
  if (!match) return new Date()
  
  const [, year, month, day] = match
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

/**
 * 시스템 메시지인지 확인
 */
function isSystemMessage(content: string): boolean {
  return PATTERNS.SYSTEM_MESSAGES.some(pattern => pattern.test(content))
}

/**
 * 메시지에서 웃음 표현 개수 세기
 */
function countLaughs(content: string): number {
  const matches = content.match(PATTERNS.LAUGH)
  return matches ? matches.length : 0
}

/**
 * 시간대 분류 (0-5: night, 6-11: morning, 12-17: afternoon, 18-23: evening)
 */
function getTimeSlot(hour: number): 'morning' | 'afternoon' | 'evening' | 'night' {
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 24) return 'evening'
  return 'night'
}

/**
 * 심야 시간인지 확인 (23시 ~ 02시)
 */
function isLateNight(hour: number): boolean {
  return hour >= 23 || hour < 2
}

/**
 * 카카오톡 대화 내용 파싱
 */
export function parseKakaoChat(rawText: string): {
  messages: ParsedMessage[]
  participants: string[]
} {
  const lines = rawText.split('\n')
  const messages: ParsedMessage[] = []
  let currentDate = new Date()
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue
    
    // 날짜 구분선 확인
    const dateLine = trimmedLine.match(PATTERNS.DATE_LINE)
    if (dateLine) {
      currentDate = parseDate(dateLine[1])
      continue
    }
    
    // PC 버전 메시지 파싱
    const pcMatch = trimmedLine.match(PATTERNS.PC_MESSAGE)
    if (pcMatch) {
      const [, dateTimeStr, sender, content] = pcMatch
      const dateMatch = dateTimeStr.match(PATTERNS.DATE_ONLY)
      const timeMatch = dateTimeStr.match(PATTERNS.TIME)

      if (dateMatch && timeMatch) {
        const msgDate = parseDate(dateTimeStr)
        const timestamp = parseTime(dateTimeStr, msgDate)

        messages.push({
          timestamp,
          sender: sender.trim(),
          content: content.trim(),
          isSystemMessage: isSystemMessage(content)
        })
      }
      continue
    }

    // 모바일 버전 (점 구분자) 메시지 파싱
    const mobileDotMatch = trimmedLine.match(PATTERNS.MOBILE_DOT_MESSAGE)
    if (mobileDotMatch) {
      const [, dateTimeStr, sender, content] = mobileDotMatch
      const dateMatch = dateTimeStr.match(PATTERNS.DATE_ONLY)
      const timeMatch = dateTimeStr.match(PATTERNS.TIME)

      if (dateMatch && timeMatch) {
        const msgDate = parseDate(dateTimeStr)
        const timestamp = parseTime(dateTimeStr, msgDate)

        messages.push({
          timestamp,
          sender: sender.trim(),
          content: content.trim(),
          isSystemMessage: isSystemMessage(content)
        })
      }
      continue
    }

    // 모바일 버전 (대괄호) 메시지 파싱
    const mobileMatch = trimmedLine.match(PATTERNS.MOBILE_MESSAGE)
    if (mobileMatch) {
      const [, sender, timeStr, content] = mobileMatch
      const timestamp = parseTime(timeStr, currentDate)
      
      messages.push({
        timestamp,
        sender: sender.trim(),
        content: content.trim(),
        isSystemMessage: isSystemMessage(content)
      })
      continue
    }

    // 어떤 형식에도 맞지 않는 줄은 직전 메시지의 다음 줄(여러 줄 메시지)로 본다.
    // 첫 메시지보다 앞에 오는 파일 머리말은 붙일 대상이 없으므로 버려진다.
    // 단, 날짜 줄이나 "…님이 들어왔습니다" 같은 알림 줄은 메시지의 일부가 아니므로 붙이지 않는다.
    if (PATTERNS.DATE_START.test(trimmedLine)) {
      currentDate = parseDate(trimmedLine)
      continue
    }
    if (/^-{3,}/.test(trimmedLine) || isSystemMessage(trimmedLine)) continue

    const lastIndex = messages.length - 1
    if (lastIndex >= 0) {
      const last = messages[lastIndex]
      messages[lastIndex] = { ...last, content: `${last.content}\n${trimmedLine}` }
    }
  }
  
  // 참여자 목록 추출 (시스템 메시지 제외)
  const participantSet = new Set<string>()
  messages.forEach(msg => {
    if (!msg.isSystemMessage) {
      participantSet.add(msg.sender)
    }
  })
  
  const participants = Array.from(participantSet)
  
  return { messages, participants }
}

/**
 * 대화 분석 수행
 */
export function analyzeChat(messages: ParsedMessage[], participants: string[]): ChatAnalysis {
  // 시스템 메시지 제외
  const userMessages = messages.filter(m => !m.isSystemMessage)
  
  // 참여자별 통계 초기화
  const participantStats: { [name: string]: ParticipantStats } = {}
  participants.forEach(name => {
    participantStats[name] = {
      messageCount: 0,
      totalCharacters: 0,
      avgMessageLength: 0,
      emojiCount: 0,
      laughCount: 0,
      questionCount: 0,
      exclamationCount: 0,
      lateNightMessages: 0,
      firstMessageCount: 0,
      heartEmojiCount: 0,
      affectionWordCount: 0,
      consecutiveMessageCount: 0,
    }
  })
  
  // 시간대별 분포
  const timeDistribution = {
    morning: 0,
    afternoon: 0,
    evening: 0,
    night: 0,
  }
  
  // 대화 시작 횟수
  const conversationStarters: { [name: string]: number } = {}
  participants.forEach(name => {
    conversationStarters[name] = 0
  })
  
  // 날짜별 그룹핑 (대화 시작 분석용)
  const dateGroups: { [date: string]: ParsedMessage[] } = {}
  
  // 메시지 분석
  userMessages.forEach((msg, index) => {
    const stats = participantStats[msg.sender]
    if (!stats) return
    
    // 기본 통계
    stats.messageCount++
    stats.totalCharacters += msg.content.length
    stats.emojiCount += countEmojis(msg.content)
    stats.laughCount += countLaughs(msg.content)
    stats.questionCount += (msg.content.match(/\?/g) || []).length
    stats.exclamationCount += (msg.content.match(/!/g) || []).length
    stats.heartEmojiCount += countHeartEmojis(msg.content)
    stats.affectionWordCount += countAffectionWords(msg.content)
    
    // 시간 관련
    const hour = msg.timestamp.getHours()
    if (isLateNight(hour)) {
      stats.lateNightMessages++
    }
    
    // 시간대 분포
    const timeSlot = getTimeSlot(hour)
    timeDistribution[timeSlot]++
    
    // 날짜별 그룹핑
    const dateKey = msg.timestamp.toDateString()
    if (!dateGroups[dateKey]) {
      dateGroups[dateKey] = []
    }
    dateGroups[dateKey].push(msg)
  })
  
  // 평균 메시지 길이 계산
  participants.forEach(name => {
    const stats = participantStats[name]
    if (stats.messageCount > 0) {
      stats.avgMessageLength = Math.round(stats.totalCharacters / stats.messageCount)
    }
  })
  
  // 대화 시작자 분석 (각 날짜의 첫 메시지 또는 3시간 이상 공백 후 첫 메시지)
  let lastMessageTime: Date | null = null
  userMessages.forEach(msg => {
    const timeDiff = lastMessageTime 
      ? (msg.timestamp.getTime() - lastMessageTime.getTime()) / (1000 * 60) 
      : Infinity
    
    // 3시간(180분) 이상 공백이면 새 대화 시작으로 간주
    if (timeDiff > 180) {
      conversationStarters[msg.sender] = (conversationStarters[msg.sender] || 0) + 1
      if (participantStats[msg.sender]) {
        participantStats[msg.sender].firstMessageCount++
      }
    }
    
    lastMessageTime = msg.timestamp
  })
  
  // 답장 시간 계산 (주요 2명에 대해서만)
  if (participants.length >= 2) {
    const replyTimes: { [name: string]: number[] } = {}
    participants.slice(0, 2).forEach(name => {
      replyTimes[name] = []
    })
    
    for (let i = 1; i < userMessages.length; i++) {
      const prev = userMessages[i - 1]
      const curr = userMessages[i]
      
      // 다른 사람이 보낸 경우에만 답장 시간 계산
      if (prev.sender !== curr.sender && replyTimes[curr.sender]) {
        const diff = (curr.timestamp.getTime() - prev.timestamp.getTime()) / (1000 * 60)
        // 24시간 이내의 답장만 계산. 카카오톡 기록은 분 단위라 같은 분 안의 답장은 0분이다.
        if (diff >= 0 && diff < 1440) {
          replyTimes[curr.sender].push(diff)
        }
      }
    }
    
    // 평균 답장 시간 계산
    participants.slice(0, 2).forEach(name => {
      const times = replyTimes[name]
      if (times.length > 0) {
        const avg = times.reduce((a, b) => a + b, 0) / times.length
        participantStats[name].avgReplyTime = Math.round(avg)
      }
    })
  }

  // 연속 메시지 분석 (1분 내 3개 이상 연속으로 보낸 메시지)
  for (let i = 0; i < userMessages.length; i++) {
    const current = userMessages[i]
    let consecutiveCount = 1

    // 앞으로 연속된 메시지 찾기
    for (let j = i + 1; j < userMessages.length; j++) {
      const next = userMessages[j]

      // 같은 사람이고, 1분(60초) 이내이면 연속 메시지
      if (next.sender === current.sender) {
        const timeDiff = (next.timestamp.getTime() - current.timestamp.getTime()) / 1000
        if (timeDiff <= 60) {
          consecutiveCount++
        } else {
          break
        }
      } else {
        break
      }
    }

    // 3개 이상 연속이면 카운트
    if (consecutiveCount >= 3 && participantStats[current.sender]) {
      participantStats[current.sender].consecutiveMessageCount++
      i += consecutiveCount - 1 // 이미 센 메시지는 건너뛰기
    }
  }

  // 날짜 수 계산
  const uniqueDates = new Set(userMessages.map(m => m.timestamp.toDateString()))
  
  return {
    totalMessages: userMessages.length,
    totalDays: uniqueDates.size,
    participants: participantStats,
    timeDistribution,
    conversationStarters,
  }
}

/**
 * 분석 결과를 사람이 읽기 쉬운 형태로 요약
 */
export function generateAnalysisSummary(analysis: ChatAnalysis, p1: string, p2: string): string {
  const stats1 = analysis.participants[p1]
  const stats2 = analysis.participants[p2]
  
  if (!stats1 || !stats2) return ''
  
  const lines: string[] = []
  
  // 메시지 비율
  const total = stats1.messageCount + stats2.messageCount
  const ratio1 = Math.round((stats1.messageCount / total) * 100)
  const ratio2 = 100 - ratio1
  lines.push(`메시지 비율: ${p1} ${ratio1}% vs ${p2} ${ratio2}%`)
  
  // 평균 메시지 길이
  lines.push(`평균 메시지 길이: ${p1} ${stats1.avgMessageLength}자 vs ${p2} ${stats2.avgMessageLength}자`)
  
  // 웃음 표현
  lines.push(`웃음 표현(ㅋㅎ): ${p1} ${stats1.laughCount}회 vs ${p2} ${stats2.laughCount}회`)
  
  // 이모지
  lines.push(`이모지 사용: ${p1} ${stats1.emojiCount}회 vs ${p2} ${stats2.emojiCount}회`)
  
  // 질문
  lines.push(`질문 횟수: ${p1} ${stats1.questionCount}회 vs ${p2} ${stats2.questionCount}회`)
  
  // 먼저 연락
  lines.push(`먼저 연락: ${p1} ${stats1.firstMessageCount}회 vs ${p2} ${stats2.firstMessageCount}회`)
  
  // 심야 메시지
  lines.push(`심야 메시지(23시~02시): ${p1} ${stats1.lateNightMessages}회 vs ${p2} ${stats2.lateNightMessages}회`)
  
  // 답장 속도
  if (stats1.avgReplyTime !== undefined && stats2.avgReplyTime !== undefined) {
    lines.push(`평균 답장 시간: ${p1} ${stats1.avgReplyTime}분 vs ${p2} ${stats2.avgReplyTime}분`)
  }
  
  return lines.join('\n')
}