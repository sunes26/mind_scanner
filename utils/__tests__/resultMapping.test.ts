import { describe, expect, it } from 'vitest'
import { fillModelNames, fillRoleTokens } from '@/utils/resultMapping'

describe('fillRoleTokens', () => {
  it('자리표시자를 이름으로 바꾼다', () => {
    expect(fillRoleTokens('{A}님이 {B}님에게', '지우', '민준')).toBe('지우님이 민준님에게')
  })

  it('이름이 A, B이거나 자리표시자처럼 생겨도 다시 치환하지 않는다', () => {
    expect(fillRoleTokens('{A}님이 먼저 말을 걸었습니다.', 'B', 'A')).toBe('B님이 먼저 말을 걸었습니다.')
    expect(fillRoleTokens('{A}님', '{B}', '민준')).toBe('{B}님')
    expect(fillRoleTokens('{A}님', 'Team A', '민준')).toBe('Team A님')
    expect(fillRoleTokens('{A}님', '철수B', '민준')).toBe('철수B님')
  })
})

describe('fillModelNames', () => {
  it('AI가 쓴 "A님", "B님"을 이름으로 바꾼다', () => {
    expect(fillModelNames('A님은 질문이 많고, B님은 답이 빠릅니다.', '지우', '민준')).toBe(
      '지우님은 질문이 많고, 민준님은 답이 빠릅니다.',
    )
  })

  it('이름이 서로의 역할 글자와 같아도 한 번만 치환한다', () => {
    expect(fillModelNames('A님과 B님', 'B', 'A')).toBe('B님과 A님')
  })

  it('다른 영문·숫자에 붙은 글자는 바꾸지 않는다', () => {
    expect(fillModelNames('PLAN B님 얘기가 아니라 planA님', '지우', '민준')).toBe('PLAN 민준님 얘기가 아니라 planA님')
  })
})
