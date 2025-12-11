/**
 * 보안: 사용자 입력을 sanitize하여 XSS 공격 방지
 */

/**
 * HTML 특수 문자를 이스케이프하여 XSS 방지
 */
export function sanitizeHtml(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return input.replace(/[&<>"'/]/g, (char) => map[char])
}

/**
 * 사용자 이름을 sanitize (XSS 방지 + 길이 제한)
 */
export function sanitizeUserName(name: string): string {
  // 1. HTML 태그 제거
  const sanitized = sanitizeHtml(name)

  // 2. 길이 제한 (20자)
  const truncated = sanitized.slice(0, 20)

  // 3. 앞뒤 공백 제거
  return truncated.trim()
}

/**
 * 파일 내용에서 위험한 패턴 감지
 */
export function detectMaliciousContent(content: string): {
  isSafe: boolean
  reason?: string
} {
  const dangerousPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick=, onerror= 등
    /<iframe[\s\S]*?>/gi,
    /<object[\s\S]*?>/gi,
    /<embed[\s\S]*?>/gi,
    /eval\(/gi,
    /expression\(/gi,
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(content)) {
      return {
        isSafe: false,
        reason: `위험한 코드 패턴이 감지되었습니다: ${pattern.source}`,
      }
    }
  }

  return { isSafe: true }
}

/**
 * 파일이 실제 텍스트 파일인지 검증 (매직 넘버 체크)
 */
export function isValidTextFile(content: string): boolean {
  // 1. 길이 체크
  if (content.length === 0) return false

  // 2. 제어 문자 비율 체크 (정상적인 텍스트는 제어 문자가 거의 없음)
  const controlCharCount = (content.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g) || []).length
  const controlCharRatio = controlCharCount / content.length

  // 제어 문자가 5% 이상이면 바이너리 파일로 간주
  if (controlCharRatio > 0.05) return false

  // 3. 카카오톡 메시지 패턴 확인
  const hasKakaoPattern = /(\d{4}년|\d{4}\.)/.test(content.slice(0, 5000))

  return hasKakaoPattern
}

/**
 * 숫자 값 검증 및 범위 제한
 */
export function sanitizeNumber(
  value: number,
  min: number,
  max: number,
  defaultValue: number = 0
): number {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return defaultValue
  }

  return Math.min(max, Math.max(min, value))
}

/**
 * 퍼센트 값 안전하게 계산 (0으로 나누기 방지)
 */
export function safePercentage(
  numerator: number,
  denominator: number,
  decimals: number = 0
): number {
  if (denominator === 0 || !isFinite(denominator)) {
    return 0
  }

  const percentage = (numerator / denominator) * 100

  if (!isFinite(percentage)) {
    return 0
  }

  return Number(percentage.toFixed(decimals))
}

/**
 * 숫자를 사용자 친화적으로 포맷 (천 단위 콤마)
 */
export function formatNumber(num: number): string {
  if (!isFinite(num) || isNaN(num)) return '0'

  return num.toLocaleString('ko-KR')
}

/**
 * 백분율을 안전하게 표시 (소수점 제거, % 기호 포함)
 */
export function formatPercentage(percent: number): string {
  const safe = sanitizeNumber(percent, 0, 100, 0)
  return `${Math.round(safe)}%`
}
