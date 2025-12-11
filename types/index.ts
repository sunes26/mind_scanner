export interface ChatData {
  rawText: string
  p1: string
  p2: string
  countP1: number
  countP2: number
  total: number
  analysis?: ChatAnalysis
}

export interface ChatAnalysis {
  totalMessages: number
  totalDays: number
  participants: {
    [name: string]: ParticipantStats
  }
  timeDistribution: {
    morning: number
    afternoon: number
    evening: number
    night: number
  }
  conversationStarters: {
    [name: string]: number
  }
}

export interface ParticipantStats {
  messageCount: number
  totalCharacters: number
  avgMessageLength: number
  emojiCount: number
  laughCount: number
  questionCount: number
  exclamationCount: number
  lateNightMessages: number
  avgReplyTime?: number
  firstMessageCount: number
  heartEmojiCount: number // 하트/사랑 이모지
  affectionWordCount: number // 애정 표현 단어
  consecutiveMessageCount: number // 연속 메시지 (버블링)
}

export interface AnalysisResult {
  score: number
  relation: string
  advice: string
  dominance: string
  attackTip: string | { [key: string]: string }
  summary?: string
  redFlags?: string[]
  greenFlags?: string[]
  personalities?: {
    [name: string]: {
      type: string
      traits: string[]
      description: string
    }
  }
  mutualPerception?: {
    [name: string]: {
      thinkingAboutYou: string
      youThinkingAbout: string
    }
  }
}

export type ScreenType = 'home' | 'loading' | 'result' | 'error'

export interface ParsedMessage {
  timestamp: Date
  sender: string
  content: string
  isSystemMessage: boolean
}

// 에러 타입 정의
export type ErrorType = 
  | 'FILE_FORMAT'      // 파일 형식 오류
  | 'FILE_EMPTY'       // 빈 파일
  | 'PARSE_ERROR'      // 파싱 오류
  | 'NOT_ENOUGH_PARTICIPANTS' // 참여자 부족
  | 'NOT_ENOUGH_MESSAGES'     // 메시지 부족
  | 'API_ERROR'        // API 오류
  | 'NETWORK_ERROR'    // 네트워크 오류
  | 'UNKNOWN'          // 알 수 없는 오류

export interface AppError {
  type: ErrorType
  title: string
  message: string
  suggestion?: string
  canRetry?: boolean
}

// 에러 메시지 매핑
export const ERROR_MESSAGES: Record<ErrorType, Omit<AppError, 'type'>> = {
  FILE_FORMAT: {
    title: '파일 형식 오류',
    message: '카카오톡에서 내보낸 .txt 파일만 분석할 수 있어요.',
    suggestion: '카카오톡 PC 버전에서 채팅방 → 메뉴(☰) → 대화 내보내기를 선택해주세요.',
    canRetry: false,
  },
  FILE_EMPTY: {
    title: '빈 파일이에요',
    message: '파일에 내용이 없거나 읽을 수 없어요.',
    suggestion: '다른 파일을 선택하거나, 대화 내용이 있는 채팅방을 내보내주세요.',
    canRetry: false,
  },
  PARSE_ERROR: {
    title: '대화 내용을 찾을 수 없어요',
    message: '카카오톡 대화 형식을 인식하지 못했어요.',
    suggestion: '카카오톡에서 직접 내보낸 파일인지 확인해주세요. 다른 메신저나 편집된 파일은 분석이 어려워요.',
    canRetry: false,
  },
  NOT_ENOUGH_PARTICIPANTS: {
    title: '참여자가 부족해요',
    message: '최소 2명 이상의 대화가 필요해요.',
    suggestion: '1:1 채팅방 또는 그룹 채팅방의 대화를 내보내주세요.',
    canRetry: false,
  },
  NOT_ENOUGH_MESSAGES: {
    title: '대화가 너무 적어요',
    message: '정확한 분석을 위해 최소 20개 이상의 메시지가 필요해요.',
    suggestion: '더 많은 대화가 있는 채팅방을 선택하거나, 시간이 지난 후 다시 시도해주세요.',
    canRetry: false,
  },
  API_ERROR: {
    title: 'AI 분석 실패',
    message: 'AI 서버에서 응답을 받지 못했어요.',
    suggestion: '잠시 후 다시 시도해주세요. 문제가 계속되면 새로고침 후 다시 시도해주세요.',
    canRetry: true,
  },
  NETWORK_ERROR: {
    title: '네트워크 오류',
    message: '인터넷 연결을 확인해주세요.',
    suggestion: 'Wi-Fi 또는 데이터 연결 상태를 확인하고 다시 시도해주세요.',
    canRetry: true,
  },
  UNKNOWN: {
    title: '알 수 없는 오류',
    message: '예상치 못한 문제가 발생했어요.',
    suggestion: '페이지를 새로고침하고 다시 시도해주세요.',
    canRetry: true,
  },
}