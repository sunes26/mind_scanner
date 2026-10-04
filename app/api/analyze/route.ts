import { NextRequest, NextResponse } from 'next/server'
import { analyzeStats } from '@/server/scoring'
import { parseScoringInput } from '@/server/scoring/schema'

// 대화 통계(숫자)만 받아 점수·성향·진단을 계산한다.
// 대화 원문과 이름은 받지 않으며, AI를 호출하지 않는다.

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '요청 형식이 올바르지 않습니다.' }, { status: 400 })
  }

  const stats = parseScoringInput((body as { stats?: unknown } | null)?.stats)
  if (!stats) {
    return NextResponse.json({ error: '통계 값이 올바르지 않습니다.' }, { status: 400 })
  }

  try {
    return NextResponse.json(analyzeStats(stats))
  } catch (error: unknown) {
    console.error('[analyze] scoring failed:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: '분석에 실패했습니다.', message: '잠시 후 다시 시도해주세요.' }, { status: 500 })
  }
}
