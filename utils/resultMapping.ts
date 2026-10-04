import type { AnalysisResult } from '@/types'
import type { Role, ScoringResult } from '@/types/scoring'

// 서버 결과는 역할(A/B)로만 쓰여 있다. 이름은 브라우저만 알고 있으므로 여기서 채워 넣는다.
// 치환은 항상 한 번의 패스로 끝낸다. 이름 자체가 "A"나 "B님"이어도 다시 치환되지 않게 하기 위해서다.

function namesByRole(nameA: string, nameB: string): Record<Role, string> {
  return { A: nameA, B: nameB }
}

/** 서버가 만든 문장의 {A}, {B} 자리표시자를 실제 이름으로 바꾼다 */
export function fillRoleTokens(text: string, nameA: string, nameB: string): string {
  const names = namesByRole(nameA, nameB)
  return text.replace(/\{([AB])\}/g, (_match, role: Role) => names[role])
}

/** AI가 쓴 문장의 "A님", "B님"을 실제 이름으로 바꾼다 (다른 영문·숫자에 붙은 A/B는 건드리지 않는다) */
export function fillModelNames(text: string, nameA: string, nameB: string): string {
  const names = namesByRole(nameA, nameB)
  return text.replace(/(^|[^A-Za-z0-9])([AB])님/g, (_match, before: string, role: Role) => `${before}${names[role]}님`)
}

export function toAnalysisResult(scoring: ScoringResult, nameA: string, nameB: string): AnalysisResult {
  const fill = (text: string) => fillRoleTokens(text, nameA, nameB)
  const names = namesByRole(nameA, nameB)

  return {
    score: scoring.score,
    interestScore: scoring.interestScore,
    relation: scoring.relation,
    advice: '',
    dominance: scoring.dominance === 'balanced' ? '' : names[scoring.dominance],
    attackTip: { [nameA]: fill(scoring.advice.A), [nameB]: fill(scoring.advice.B) },
    personalities: {
      [nameA]: { ...scoring.personalities.A, description: fill(scoring.personalities.A.description) },
      [nameB]: { ...scoring.personalities.B, description: fill(scoring.personalities.B.description) },
    },
    dimensions: scoring.dimensions,
    balance: scoring.balance.map((finding) => ({ ...finding, text: fill(finding.text) })),
  }
}
