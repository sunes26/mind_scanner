import { AnalysisResult } from '@/types'

/**
 * 보안: API 응답 검증 및 타입 가드
 */

/**
 * AnalysisResult 타입 가드
 */
export function isValidAnalysisResult(data: unknown): data is AnalysisResult {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  const result = data as Record<string, unknown>

  // 필수 필드 검증
  if (typeof result.score !== 'number' || result.score < 0 || result.score > 100) {
    console.error('Invalid score:', result.score)
    return false
  }

  if (typeof result.relation !== 'string' || result.relation.length === 0) {
    console.error('Invalid relation:', result.relation)
    return false
  }

  if (typeof result.dominance !== 'string') {
    console.error('Invalid dominance:', result.dominance)
    return false
  }

  // attackTip은 string 또는 object
  if (
    typeof result.attackTip !== 'string' &&
    (typeof result.attackTip !== 'object' || result.attackTip === null)
  ) {
    console.error('Invalid attackTip:', result.attackTip)
    return false
  }

  // personalities 검증 (optional)
  if (result.personalities !== undefined) {
    if (typeof result.personalities !== 'object' || result.personalities === null) {
      console.error('Invalid personalities:', result.personalities)
      return false
    }
  }

  // mutualPerception 검증 (optional)
  if (result.mutualPerception !== undefined) {
    if (typeof result.mutualPerception !== 'object' || result.mutualPerception === null) {
      console.error('Invalid mutualPerception:', result.mutualPerception)
      return false
    }
  }

  return true
}

/**
 * 파일 검증 규칙
 */
export const FILE_VALIDATION = {
  MIN_SIZE: 50, // 50 bytes
  MAX_SIZE: 50 * 1024 * 1024, // 50 MB
  MIN_CONTENT_LENGTH: 50,
  MAX_CONTENT_LENGTH: 300000,
  ALLOWED_EXTENSIONS: ['.txt'],
  ALLOWED_MIME_TYPES: ['text/plain', ''],
} as const

/**
 * 메시지 검증 규칙
 */
export const MESSAGE_VALIDATION = {
  MIN_COUNT: 20,
  MIN_PARTICIPANTS: 2,
  MAX_NAME_LENGTH: 20,
} as const

/**
 * API 타임아웃
 */
export const API_TIMEOUTS = {
  FILE_PROCESSING: 1000,
  ANALYSIS: 30000,
  UPLOAD: 10000,
} as const

/**
 * 활동 레벨 임계값
 */
export const ACTIVITY_THRESHOLDS = {
  VERY_ACTIVE: 100,
  ACTIVE: 50,
  MODERATE: 20,
  LIGHT: 10,
  RARE: 5,
} as const

/**
 * 파일 크기가 유효한지 검증
 */
export function isValidFileSize(size: number): boolean {
  return size >= FILE_VALIDATION.MIN_SIZE && size <= FILE_VALIDATION.MAX_SIZE
}

/**
 * 파일 확장자가 유효한지 검증
 */
export function isValidFileExtension(filename: string): boolean {
  const lowerName = filename.toLowerCase()
  return FILE_VALIDATION.ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext))
}

/**
 * MIME 타입이 유효한지 검증
 */
export function isValidMimeType(mimeType: string): boolean {
  return (FILE_VALIDATION.ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)
}

/**
 * 환경 변수 검증
 */
export function validateEnvironmentVariables(): {
  isValid: boolean
  missingVars: string[]
} {
  const requiredVars = ['OPENAI_API_KEY']
  const missingVars: string[] = []

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName)
    }
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
  }
}
