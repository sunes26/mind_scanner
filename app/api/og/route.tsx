import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // URL 파라미터에서 데이터 추출
    const score = searchParams.get('score') || '75'
    const relation = searchParams.get('relation') || '💕 썸 타는 중'
    const p1 = searchParams.get('p1') || '나'
    const p2 = searchParams.get('p2') || '상대방'

    // 점수에 따른 배경색 결정
    const scoreNum = parseInt(score)
    let bgColor = '#EC4899' // pink
    let subColor = '#F472B6'
    if (scoreNum >= 90) {
      bgColor = '#EF4444' // red (hot)
      subColor = '#F87171'
    } else if (scoreNum >= 80) {
      bgColor = '#EC4899' // pink
      subColor = '#F472B6'
    } else if (scoreNum >= 70) {
      bgColor = '#8B5CF6' // purple
      subColor = '#A78BFA'
    } else if (scoreNum >= 60) {
      bgColor = '#3B82F6' // blue
      subColor = '#60A5FA'
    } else {
      bgColor = '#6B7280' // gray
      subColor = '#9CA3AF'
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FDF6E3',
            backgroundImage: 'radial-gradient(#E0E0E0 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* Main Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              border: '4px solid black',
              borderRadius: '32px',
              boxShadow: '8px 8px 0px 0px black',
              padding: '40px 60px',
              maxWidth: '90%',
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#FBBF24',
                  border: '3px solid black',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>💘 속마음 스캐너</span>
              </div>
            </div>

            {/* Names */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  border: '2px solid black',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                {p1}
              </div>
              <span style={{ fontSize: '32px' }}>💕</span>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#EC4899',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  border: '2px solid black',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                {p2}
              </div>
            </div>

            {/* Score */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: bgColor,
                borderRadius: '24px',
                padding: '24px 48px',
                border: '4px solid black',
                boxShadow: '6px 6px 0px 0px black',
                marginBottom: '24px',
              }}
            >
              <span style={{ color: 'white', fontSize: '24px', marginBottom: '8px' }}>
                애정 지수
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span
                  style={{
                    color: 'white',
                    fontSize: '96px',
                    fontWeight: 'bold',
                    textShadow: '4px 4px 0px rgba(0,0,0,0.3)',
                  }}
                >
                  {score}
                </span>
                <span
                  style={{
                    color: 'white',
                    fontSize: '36px',
                    fontWeight: 'bold',
                    marginLeft: '4px',
                  }}
                >
                  %
                </span>
              </div>
            </div>

            {/* Relation Tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                border: '3px solid black',
                borderRadius: '16px',
                padding: '12px 24px',
                boxShadow: '4px 4px 0px 0px black',
              }}
            >
              <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{relation}</span>
            </div>

            {/* CTA */}
            <div
              style={{
                display: 'flex',
                marginTop: '24px',
                color: '#6B7280',
                fontSize: '18px',
              }}
            >
              나도 분석하러 가기 👉 mindscanner.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error(e)
    return new Response('Failed to generate image', { status: 500 })
  }
}