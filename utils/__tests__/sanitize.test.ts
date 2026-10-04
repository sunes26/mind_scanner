import { describe, expect, it } from 'vitest'
import { detectMaliciousContent, sanitizeUserName } from '@/utils/sanitize'

describe('detectMaliciousContent', () => {
  it('링크의 쿼리스트링을 위험한 코드로 오탐하지 않는다', () => {
    const chat = [
      '2026년 9월 1일 오후 7:12, 민준 : https://example.com/?utm_content=abc&conversation_id=12',
      '2026년 9월 1일 오후 7:13, 지우 : position=3 이고 option = 2 래',
    ].join('\n')
    expect(detectMaliciousContent(chat).isSafe).toBe(true)
  })

  it('개발 얘기에 나오는 eval( 이나 javascript: 같은 글자는 막지 않는다', () => {
    expect(detectMaliciousContent('민준 : eval(code) 쓰지 말고 javascript: 링크도 쓰지 마').isSafe).toBe(true)
  })

  it('script 태그와 태그 안의 이벤트 핸들러는 막는다', () => {
    expect(detectMaliciousContent('<script>alert(1)</script>').isSafe).toBe(false)
    expect(detectMaliciousContent('<img src=x onerror=alert(1)>').isSafe).toBe(false)
    expect(detectMaliciousContent('<iframe src="https://evil.example">').isSafe).toBe(false)
  })

  it('같은 입력으로 여러 번 호출해도 결과가 같다', () => {
    const payload = '<script>alert(1)</script>'
    expect(detectMaliciousContent(payload).isSafe).toBe(false)
    expect(detectMaliciousContent(payload).isSafe).toBe(false)
  })
})

describe('sanitizeUserName', () => {
  it('일반 이름은 그대로 둔다', () => {
    expect(sanitizeUserName('지우')).toBe('지우')
  })

  it('기호가 들어간 이름을 HTML 엔티티로 바꾸지 않는다', () => {
    expect(sanitizeUserName('톰&제리')).toBe('톰&제리')
    expect(sanitizeUserName("민준's")).toBe("민준's")
  })

  it('꺾쇠와 제어 문자는 지우고 앞뒤 공백을 정리한다', () => {
    expect(sanitizeUserName('  <b>지우</b>\u0000 ')).toBe('b지우/b')
  })

  it('20자로 자른다', () => {
    expect(sanitizeUserName('가'.repeat(30))).toHaveLength(20)
  })
})
