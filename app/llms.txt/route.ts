import { getPublishedPosts } from '@/app/blog/blogData'
import { SITE_URL, absoluteUrl, siteConfig } from '@/config/seo'

export const revalidate = 3600

// AI 답변 엔진을 위한 사이트 요약 (llmstxt.org 형식)
export function GET(): Response {
  const posts = getPublishedPosts()
  const lines = [
    `# ${siteConfig.name} (${siteConfig.nameEn})`,
    '',
    `> ${siteConfig.description}`,
    '',
    `${siteConfig.name}는 1인 개발자 ${siteConfig.author.name}가 만들어 운영하는 무료 웹 도구입니다(광고 포함, 회원가입 없음).`,
    '',
    '## 동작 방식',
    '',
    '- 입력: 카카오톡에서 내보낸 .txt 대화 파일 (두 사람의 대화 기준, 메시지 20개 이상).',
    '- 브라우저에서 계산하는 통계: 메시지 수와 비율, 평균 글자 수, 평균 답장 시간, 답장 간격의 중간값, 5분 내 답장 비율, 질문 횟수, 먼저 말 건 횟수(3시간 이상 공백 뒤 첫 메시지), 마지막 메시지를 보낸 횟수, 이모지·웃음 표현 횟수, 약속을 꺼낸 메시지 수, 존댓말 비율, 시간대별 대화량, 대화 기간 앞·뒤 절반의 메시지 수.',
    '- 점수와 진단: 브라우저가 보낸 숫자 통계를 서버가 고정된 규칙으로 계산합니다(AI 아님). 종합 애정 지수(0~100), 관심도 지수, 항목별 진단 6개(높음/보통/낮음), 대화 성향 유형, 관계 균형 진단, 맞춤 조언. 같은 파일은 항상 같은 결과이며 계산식은 공개하지 않습니다.',
    '- AI 코멘트(선택): 리포트의 버튼을 누를 때만 같은 숫자 통계가 OpenAI API(gpt-4o-mini)로 전달되어 3~4문장 코멘트를 받습니다.',
    '- 데이터 처리: 대화 내용과 참여자 이름은 브라우저 밖으로 나가지 않으며 서버에는 숫자 통계만 전달됩니다. 자체 DB에 저장하지 않고 회원가입도 없습니다.',
    '- 한계: 읽음 여부, 사진·카카오 이모티콘 스티커, 통화·만남은 분석에 포함되지 않습니다. 결과는 관계에 대한 판정이 아닙니다.',
    '',
    '## 주요 페이지',
    '',
    `- [카톡 대화 분석](${SITE_URL}): 대화 파일 업로드와 내보내기 방법`,
    `- [샘플 리포트](${absoluteUrl('/sample')}): 가상의 대화로 만든 분석 결과 예시와 항목별 읽는 법`,
    `- [서비스 소개](${absoluteUrl('/about')}): 만든 이유, 분석 방법, 한계, 문의처`,
    `- [개인정보처리방침](${absoluteUrl('/privacy')})`,
    '',
    '## 블로그',
    '',
    ...posts.map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description}`),
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
