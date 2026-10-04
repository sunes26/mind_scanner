import { describe, expect, it } from 'vitest'
import { buildSampleReport } from '@/data/sampleReport'

describe('샘플 리포트 데이터', () => {
  it('가상의 대화에서 두 사람의 통계를 계산한다', () => {
    const data = buildSampleReport().chatData
    expect([data.p1, data.p2].sort()).toEqual(['민준', '지우'])
    expect(data.total).toBe(data.countP1 + data.countP2)
    expect(data.total).toBeGreaterThan(150)
  })
})
