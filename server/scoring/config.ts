import { z } from 'zod'

// 채점 가중치와 기준값.
// 실제 운영 값은 저장소에 두지 않고 환경 변수 SCORING_CONFIG(JSON)로 넣는다.
// 환경 변수가 없으면 아래의 중립 기본값(모든 항목 동일 비중)으로 동작한다.

const unit = z.number().min(0).max(1)

const scoringConfigSchema = z.object({
  /** 항목별 비중. 합이 1이 아니어도 내부에서 정규화한다 */
  weights: z.object({
    balance: unit,
    responsiveness: unit,
    engagement: unit,
    expression: unit,
    continuity: unit,
    trend: unit,
  }),
  /** 0~1 종합값을 점수로 옮길 때의 최저·최고 점수 */
  scoreFloor: z.number().min(0).max(100),
  scoreCeiling: z.number().min(0).max(100),
  /** 관심도 지수에서 참여(engagement)가 차지하는 비중. 나머지는 표현(expression) */
  interestEngagementShare: unit,
  /** 항목 수준을 높음/보통으로 나누는 경계 */
  levelHigh: unit,
  levelMid: unit,
})
  .refine((config) => config.levelHigh > config.levelMid, { message: 'levelHigh must be greater than levelMid' })
  .refine((config) => config.scoreCeiling > config.scoreFloor, { message: 'scoreCeiling must be greater than scoreFloor' })

export type ScoringConfig = z.infer<typeof scoringConfigSchema>

const NEUTRAL_CONFIG: ScoringConfig = {
  weights: { balance: 1, responsiveness: 1, engagement: 1, expression: 1, continuity: 1, trend: 1 },
  scoreFloor: 0,
  scoreCeiling: 100,
  interestEngagementShare: 0.5,
  levelHigh: 0.66,
  levelMid: 0.4,
}

let cachedConfig: ScoringConfig | null = null

export function parseScoringConfig(raw: string | undefined): ScoringConfig {
  if (!raw) return NEUTRAL_CONFIG
  try {
    return scoringConfigSchema.parse(JSON.parse(raw))
  } catch {
    // 설정이 잘못되면 서비스가 멈추지 않도록 기본값으로 동작한다.
    // 오류 내용에는 설정값 일부가 섞일 수 있으므로 기록하지 않는다.
    console.error('[scoring] SCORING_CONFIG 값이 올바르지 않아 기본값을 사용합니다.')
    return NEUTRAL_CONFIG
  }
}

export function getScoringConfig(): ScoringConfig {
  if (!cachedConfig) {
    if (!process.env.SCORING_CONFIG && process.env.NODE_ENV === 'production') {
      console.warn('[scoring] SCORING_CONFIG 가 설정되지 않아 기본 비중으로 계산합니다.')
    }
    cachedConfig = parseScoringConfig(process.env.SCORING_CONFIG)
  }
  return cachedConfig
}
