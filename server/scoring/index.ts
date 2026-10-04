import type { Role, ScoringInput, ScoringResult } from '@/types/scoring'
import { adviseFor, diagnoseBalance } from './balance'
import { getScoringConfig, type ScoringConfig } from './config'
import { combine, computeDimensions, describeDimensions, share } from './dimensions'
import { classifyPersonality } from './personality'

// 통계(숫자)만으로 점수·성향·진단·조언을 만든다. AI를 쓰지 않으며 같은 입력에는 항상 같은 결과가 나온다.

const RELATION_BANDS: { min: number; label: string }[] = [
  { min: 90, label: '호흡이 아주 잘 맞는 사이' },
  { min: 80, label: '서로 호감이 분명한 사이' },
  { min: 70, label: '좋은 흐름으로 가까워지는 중' },
  { min: 60, label: '호감은 보이지만 더 알아가는 중' },
  { min: 50, label: '아직은 탐색하는 단계' },
  { min: 40, label: '아직 거리가 느껴지는 대화' },
  { min: 0, label: '가벼운 연락을 주고받는 사이' },
]

const DOMINANCE_MARGIN = 0.58

function decideDominance(input: ScoringInput): Role | 'balanced' {
  const { A, B } = input.people
  const lead =
    (share(A.conversationStarts, B.conversationStarts) +
      share(A.questionCount, B.questionCount) +
      share(A.planMessageCount, B.planMessageCount)) /
    3
  if (lead >= DOMINANCE_MARGIN) return 'A'
  return lead <= 1 - DOMINANCE_MARGIN ? 'B' : 'balanced'
}

export function analyzeStats(input: ScoringInput, config: ScoringConfig = getScoringConfig()): ScoringResult {
  const values = computeDimensions(input)
  const combined = combine(values, config.weights)
  const score = Math.round(config.scoreFloor + (config.scoreCeiling - config.scoreFloor) * combined)
  const interest =
    config.interestEngagementShare * values.engagement + (1 - config.interestEngagementShare) * values.expression
  const { A, B } = input.people

  return {
    score,
    interestScore: Math.round(interest * 100),
    relation: RELATION_BANDS.find((band) => score >= band.min)?.label ?? RELATION_BANDS[RELATION_BANDS.length - 1].label,
    dominance: decideDominance(input),
    dimensions: describeDimensions(values, config),
    personalities: { A: classifyPersonality(A, B), B: classifyPersonality(B, A) },
    balance: diagnoseBalance(input),
    advice: { A: adviseFor('A', input), B: adviseFor('B', input) },
  }
}
