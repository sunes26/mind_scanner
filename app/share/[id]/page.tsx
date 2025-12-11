import { Metadata } from 'next'
import { redirect } from 'next/navigation'

interface SharePageProps {
  params: { id: string }
  searchParams: { 
    score?: string
    relation?: string
    p1?: string
    p2?: string
  }
}

// 동적 메타데이터 생성
export async function generateMetadata({ searchParams }: SharePageProps): Promise<Metadata> {
  const score = searchParams.score || '75'
  const relation = searchParams.relation || '썸 타는 중'
  const p1 = searchParams.p1 || '나'
  const p2 = searchParams.p2 || '상대방'

  const title = `${p1}님과 ${p2}님의 애정 지수: ${score}%`
  const description = `${relation} - 속마음 스캐너로 우리 사이를 분석해봤어요! 나도 분석하러 가기 💘`

  // OG 이미지 URL 생성
  const ogImageUrl = `/api/og?score=${encodeURIComponent(score)}&relation=${encodeURIComponent(relation)}&p1=${encodeURIComponent(p1)}&p2=${encodeURIComponent(p2)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${p1}님과 ${p2}님의 속마음 스캐너 결과`,
        },
      ],
      type: 'website',
      siteName: '속마음 스캐너',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default function SharePage({ searchParams }: SharePageProps) {
  // 공유 페이지 접속 시 메인 페이지로 리다이렉트
  // (OG 메타태그는 위에서 이미 설정됨)
  redirect('/')
}