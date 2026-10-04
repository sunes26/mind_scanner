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

const MAX_USER_NAME_LENGTH = 20

/**
 * 대화 참여자 이름 정리: 꺾쇠·제어 문자 제거, 공백 정리, 길이 제한.
 * 화면 출력 시의 이스케이프는 React가 하므로 여기서 HTML 엔티티로 바꾸지 않는다.
 * (엔티티로 바꾸면 메시지의 보낸 사람 이름과 달라져 통계가 연결되지 않는다)
 */
export function sanitizeUserName(name: string): string {
  return name
    .replace(/[<>\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, MAX_USER_NAME_LENGTH)
}

// 대화 파일은 화면에 HTML로 넣지 않으므로, 실제 마크업 형태만 막는다.
// 'utm_content=' 같은 링크나 'eval(' 같은 일상적인 글자는 막지 않는다.
const DANGEROUS_PATTERNS: ReadonlyArray<RegExp> = [
  /<script[\s>]/i,
  /<iframe[\s>]/i,
  /<object[\s>]/i,
  /<embed[\s>]/i,
  /<[a-z][^>]*\son[a-z]+\s*=/i, // 태그 안의 onclick=, onerror= 등
]

/**
 * 파일 내용에서 위험한 패턴 감지
 */
export function detectMaliciousContent(content: string): {
  isSafe: boolean
  reason?: string
} {
  const matched = DANGEROUS_PATTERNS.find((pattern) => pattern.test(content))
  if (matched) {
    return {
      isSafe: false,
      reason: `위험한 코드 패턴이 감지되었습니다: ${matched.source}`,
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
