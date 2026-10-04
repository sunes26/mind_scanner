// 블로그 포스트 메타데이터
// 본문은 app/blog/posts/<slug>.tsx, 등록은 app/blog/posts/registry.ts

export interface BlogImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  /** 발행일 (YYYY-MM-DD, KST). 미래 날짜면 그날까지 노출되지 않는다 */
  date: string
  /** 최종 수정일 (YYYY-MM-DD) */
  updated?: string
  category: string
  keywords: string[]
  readTime: string
  cover: BlogImage
}

const FIG_W = 1200
const FIG_H = 675

function fig(name: string, alt: string): BlogImage {
  return { src: `/images/blog/${name}.png`, alt, width: FIG_W, height: FIG_H }
}

const REVISED = '2026-10-04'

const allPosts: BlogPost[] = [
  {
    slug: 'kakaotalk-export-guide',
    title: '카카오톡 대화 내보내기 방법 (PC·모바일) 단계별 가이드',
    description: 'PC와 모바일(안드로이드·아이폰)에서 카카오톡 대화를 .txt 파일로 내보내는 방법을 단계별로 설명하고, 파일이 저장되는 위치와 자주 막히는 지점을 정리했습니다.',
    date: '2025-10-15',
    updated: REVISED,
    category: '사용 가이드',
    keywords: ['카카오톡 대화 내보내기', '카톡 대화 백업', '카카오톡 txt 파일'],
    readTime: '6분',
    cover: fig('fig-export-mobile', '모바일 카카오톡에서 대화 내용을 내보내는 6단계'),
  },
  {
    slug: 'how-to-distinguish-some-vs-eojang',
    title: '카톡으로 썸인지 어장인지 구별하는 방법 5가지',
    description: '답장의 일관성, 질문, 약속으로 이어지는지 등 카톡 대화에서 확인할 수 있는 5가지 신호로 썸과 어장관리의 차이를 살펴봅니다.',
    date: '2025-10-22',
    updated: REVISED,
    category: '연애 심리',
    keywords: ['썸 어장 구별', '카톡 심리 분석', '어장관리 특징'],
    readTime: '7분',
    cover: fig('fig-some-vs-eojang', '썸과 어장관리의 카톡 신호 비교'),
  },
  {
    slug: 'ai-analyzed-reply-patterns',
    title: '호감이 느껴지는 카톡 답장 패턴 10가지',
    description: '빠른 답장보다 중요한 것은 질문과 공감, 이야기를 이어가는 방식입니다. 호감이 전해지는 답장의 공통점 10가지를 예시와 함께 정리했습니다.',
    date: '2025-11-01',
    updated: REVISED,
    category: '연애 팁',
    keywords: ['카톡 답장 패턴', '호감도 높이는 법', '카톡 연애 팁'],
    readTime: '8분',
    cover: fig('fig-metrics-overview', '속마음 스캐너가 계산하는 대화 지표 6가지'),
  },
  {
    slug: 'who-likes-more-kakaotalk',
    title: '카톡 대화로 누가 더 좋아하는지 알 수 있을까?',
    description: '선톡 비율, 메시지 길이, 질문 빈도처럼 카톡에서 실제로 셀 수 있는 지표로 관계의 균형을 읽는 방법과 그 한계를 설명합니다.',
    date: '2025-11-08',
    updated: REVISED,
    category: '연애 심리',
    keywords: ['누가 더 좋아하는지', '카톡 호감도', '관계 주도권'],
    readTime: '8분',
    cover: fig('fig-initiative-balance', '선톡 비율과 대화 주도권의 균형'),
  },
  {
    slug: 'reply-speed-psychology',
    title: '답장 속도로 보는 호감도 - 속도보다 일관성',
    description: '칼답이면 호감, 늦답이면 무관심일까요? 답장 속도를 해석할 때 평균보다 일관성과 맥락을 봐야 하는 이유를 설명합니다.',
    date: '2025-11-15',
    updated: REVISED,
    category: '연애 심리',
    keywords: ['카톡 답장 속도', '답장 심리', '칼답 의미'],
    readTime: '7분',
    cover: fig('fig-reply-speed', '답장 속도 해석: 평균보다 일관성'),
  },
  {
    slug: 'emoticon-usage-psychology',
    title: '이모티콘 사용량으로 알아보는 상대방 마음',
    description: '이모티콘을 많이 쓰면 호감일까요? 이모티콘이 텍스트 대화에서 하는 역할과, 사용량을 해석할 때 주의할 점을 정리했습니다.',
    date: '2025-11-22',
    updated: REVISED,
    category: '연애 심리',
    keywords: ['이모티콘 심리', '카톡 이모티콘 의미', '이모지 호감'],
    readTime: '7분',
    cover: fig('fig-emoticon-laugh', '이모티콘과 ㅋㅋ로 보는 감정 표현 강도'),
  },
  {
    slug: 'kkk-count-analysis',
    title: 'ㅋㅋㅋ 개수의 의미 - ㅋ 하나와 여러 개의 차이',
    description: 'ㅋ 하나, ㅋㅋ, ㅋㅋㅋㅋㅋ는 어떻게 다르게 읽힐까요? 웃음 표현의 길이가 전달하는 온도와, 개수만으로 판단하면 안 되는 이유를 설명합니다.',
    date: '2025-11-29',
    updated: REVISED,
    category: '연애 팁',
    keywords: ['ㅋㅋㅋ 개수 의미', '카톡 ㅋ 심리', '웃음 표현'],
    readTime: '6분',
    cover: fig('fig-emoticon-laugh', '이모티콘과 ㅋㅋ로 보는 감정 표현 강도'),
  },
  {
    slug: 'mildang-vs-real-love',
    title: '밀당 vs 진심, 카톡으로 구별하는 법',
    description: '상대가 밀당을 하는 건지 정말 바쁜 건지 헷갈릴 때, 카톡 대화에서 확인할 수 있는 차이와 직접 물어보는 방법을 정리했습니다.',
    date: '2025-12-03',
    updated: REVISED,
    category: '연애 심리',
    keywords: ['밀당 구별법', '카톡 밀당', '바쁜 건지 관심 없는 건지'],
    readTime: '8분',
    cover: fig('fig-mildang-vs-busy', '밀당과 진짜 바쁨을 구별하는 체크 포인트'),
  },
  {
    slug: 'conversation-analysis-sites-2025',
    title: '카카오톡 대화 분석 서비스 고르는 기준 6가지',
    description: '카톡 대화 분석 서비스를 쓰기 전에 확인해야 할 개인정보 처리 방식, 분석 방법, 비용, 결과의 한계를 6가지 기준으로 정리했습니다.',
    date: '2025-12-07',
    updated: REVISED,
    category: '도구 추천',
    keywords: ['카톡 대화 분석 사이트', '카카오톡 분석 무료', '대화 분석 서비스 비교'],
    readTime: '8분',
    cover: fig('fig-privacy-checklist', '대화 분석 서비스 사용 전 개인정보 체크리스트'),
  },
  {
    slug: 'kakaotalk-psychology-top10',
    title: '카카오톡 대화에서 읽을 수 있는 연애 심리 10가지',
    description: '자기 노출의 상호성, 반응성, 단순 노출 효과처럼 관계 심리학의 개념이 카톡 대화에서 어떻게 나타나는지 10가지로 정리했습니다.',
    date: '2025-12-11',
    updated: REVISED,
    category: '연애 심리',
    keywords: ['카톡 심리 분석', '연애 심리', '대화 패턴'],
    readTime: '10분',
    cover: fig('fig-interpretation-caution', '대화 지표를 해석할 때의 3가지 원칙'),
  },
  {
    slug: 'kakaotalk-export-troubleshooting',
    title: '카카오톡 대화 내보내기가 안 될 때: 원인과 해결 방법',
    description: '내보내기 메뉴가 안 보이거나, 파일이 어디에 저장됐는지 모르겠거나, 분석기에 올렸는데 오류가 날 때 확인할 항목을 순서대로 정리했습니다.',
    date: '2026-10-05',
    category: '사용 가이드',
    keywords: ['카카오톡 대화 내보내기 오류', '카톡 내보내기 안됨', '카톡 txt 파일 위치'],
    readTime: '7분',
    cover: fig('fig-export-troubleshoot', '카카오톡 대화 내보내기 문제 해결 순서'),
  },
  {
    slug: 'how-affinity-score-works',
    title: '속마음 스캐너의 점수는 어떻게 만들어질까? 지표별 해설',
    description: '답장 간격, 메시지 길이, 질문 횟수, 선톡 횟수처럼 속마음 스캐너가 대화 파일에서 실제로 세는 항목과 세는 규칙, 점수가 살펴보는 여섯 가지 영역, 선택 기능인 AI 코멘트를 설명합니다.',
    date: '2026-10-07',
    category: '사용 가이드',
    keywords: ['호감도 점수 원리', '카톡 분석 원리', '속마음 스캐너 사용법'],
    readTime: '8분',
    cover: fig('fig-metrics-overview', '속마음 스캐너가 계산하는 대화 지표 6가지'),
  },
  {
    slug: 'read-receipt-ignored-what-to-do',
    title: '읽씹·안읽씹을 당했을 때 해석하는 법과 다음 메시지',
    description: '읽고 답이 없을 때와 아예 읽지 않을 때는 무엇이 다를까요? 섣불리 결론 내리지 않고 상황을 확인하는 방법과 다음 메시지 예시를 정리했습니다.',
    date: '2026-10-09',
    category: '연애 심리',
    keywords: ['읽씹 심리', '안읽씹 이유', '읽씹 대처법'],
    readTime: '8분',
    cover: fig('fig-reply-speed', '답장 속도 해석: 평균보다 일관성'),
  },
  {
    slug: 'first-message-after-meeting',
    title: '소개팅 후 첫 카톡, 언제 무엇을 보낼까',
    description: '소개팅이 끝난 뒤 첫 연락의 타이밍과 내용, 애프터를 제안하는 문장, 답이 미지근할 때의 대처를 예시와 함께 정리했습니다.',
    date: '2026-10-12',
    category: '연애 팁',
    keywords: ['소개팅 후 카톡', '소개팅 애프터 연락', '첫 카톡 예시'],
    readTime: '7분',
    cover: fig('fig-first-message-timeline', '소개팅 후 연락 타임라인'),
  },
  {
    slug: 'conversation-starter-ratio',
    title: '선톡 비율로 보는 관계 균형: 항상 내가 먼저 연락한다면',
    description: '대화를 누가 먼저 시작하는지는 관계의 균형을 보여주는 지표입니다. 선톡 비율을 세는 방법과 한쪽으로 기울었을 때 해볼 수 있는 것을 설명합니다.',
    date: '2026-10-14',
    category: '연애 심리',
    keywords: ['선톡 비율', '먼저 연락하는 사람', '대화 주도권'],
    readTime: '7분',
    cover: fig('fig-initiative-balance', '선톡 비율과 대화 주도권의 균형'),
  },
  {
    slug: 'question-frequency-interest',
    title: '질문이 많은 사람과 대답만 하는 사람: 질문 빈도가 말해주는 것',
    description: '질문은 상대에 대한 관심을 드러내는 가장 직접적인 행동입니다. 카톡에서 질문 빈도를 읽는 방법과 대화를 이어가는 질문의 유형을 정리했습니다.',
    date: '2026-10-16',
    category: '연애 심리',
    keywords: ['카톡 질문 빈도', '관심 있는 사람 질문', '대화 이어가는 법'],
    readTime: '7분',
    cover: fig('fig-metrics-overview', '속마음 스캐너가 계산하는 대화 지표 6가지'),
  },
  {
    slug: 'late-night-chat-meaning',
    title: '새벽 카톡의 의미: 심야 대화가 늘어날 때',
    description: '밤늦게 이어지는 대화는 친밀감의 신호일까요, 그냥 생활 패턴일까요? 시간대별 대화량을 해석하는 방법과 주의할 점을 설명합니다.',
    date: '2026-10-19',
    category: '연애 심리',
    keywords: ['새벽 카톡 의미', '밤늦게 연락하는 심리', '시간대별 대화 패턴'],
    readTime: '6분',
    cover: fig('fig-interpretation-caution', '대화 지표를 해석할 때의 3가지 원칙'),
  },
  {
    slug: 'message-length-balance',
    title: '장문과 단답: 메시지 길이 불균형을 읽는 법',
    description: '나는 길게 쓰는데 상대는 단답이라면 관심이 없는 걸까요? 평균 글자 수 차이를 해석하는 기준과 대화 방식 차이를 좁히는 방법을 정리했습니다.',
    date: '2026-10-21',
    category: '연애 심리',
    keywords: ['카톡 단답 심리', '장문 카톡', '메시지 길이 차이'],
    readTime: '7분',
    cover: fig('fig-message-length', '장문과 단답: 메시지 길이 불균형'),
  },
  {
    slug: 'chat-analysis-privacy-checklist',
    title: '카톡 대화 분석 서비스를 쓰기 전 개인정보 체크리스트',
    description: '대화 파일에는 상대방의 개인정보도 들어 있습니다. 분석 서비스에 올리기 전에 확인할 것과, 속마음 스캐너가 대화를 처리하는 과정을 그대로 설명합니다.',
    date: '2026-10-23',
    category: '사용 가이드',
    keywords: ['카톡 분석 개인정보', '대화 분석 안전한가', '카카오톡 대화 유출'],
    readTime: '8분',
    cover: fig('fig-data-flow', '속마음 스캐너의 대화 데이터 처리 흐름'),
  },
  {
    slug: 'long-distance-couple-kakaotalk',
    title: '장거리 연애의 카톡 습관: 연락 빈도보다 중요한 것',
    description: '장거리 커플에게 메신저는 관계의 대부분이 오가는 공간입니다. 연락 횟수에 매달리지 않고 대화의 질을 지키는 습관을 정리했습니다.',
    date: '2026-10-26',
    category: '연애 팁',
    keywords: ['장거리 연애 연락', '장거리 커플 카톡', '롱디 대화'],
    readTime: '8분',
    cover: fig('fig-long-distance-habits', '장거리 커플의 카톡 습관 4가지'),
  },
  {
    slug: 'texting-anxiety-overthinking',
    title: '답장을 기다리며 불안할 때: 카톡 과몰입에서 벗어나는 법',
    description: '답장이 올 때까지 휴대폰을 계속 확인하게 된다면, 불안이 커지는 과정을 이해하고 끊어내는 구체적인 방법이 필요합니다.',
    date: '2026-10-28',
    category: '연애 심리',
    keywords: ['답장 기다리는 불안', '카톡 과몰입', '연락 집착'],
    readTime: '8분',
    cover: fig('fig-anxiety-loop', '답장 불안이 커지는 과정과 끊는 지점'),
  },
  {
    slug: 'friend-group-chat-analysis',
    title: '친구 사이나 단톡방 대화도 분석할 수 있을까? 활용법과 한계',
    description: '속마음 스캐너는 두 사람의 대화를 기준으로 만들어졌습니다. 친구·가족 대화나 단톡방 파일을 넣었을 때 어떻게 처리되는지 설명합니다.',
    date: '2026-10-30',
    category: '사용 가이드',
    keywords: ['단톡방 분석', '친구 카톡 분석', '그룹 채팅 분석'],
    readTime: '6분',
    cover: fig('fig-metrics-overview', '속마음 스캐너가 계산하는 대화 지표 6가지'),
  },
  {
    slug: 'ai-chat-analysis-limits',
    title: '카톡 대화 분석 결과를 어디까지 믿어도 될까: 통계와 AI 코멘트의 한계',
    description: '숫자 통계와 규칙으로 만든 점수가 알려 주는 것과 알려 주지 못하는 것, 점수 계산에서 AI를 뺀 이유, 선택 기능인 AI 코멘트의 한계, 결과를 현실적으로 활용하는 방법을 설명합니다.',
    date: '2026-11-02',
    category: '사용 가이드',
    keywords: ['카톡 분석 정확도', '대화 분석 신뢰도', 'AI 연애 분석 한계'],
    readTime: '8분',
    cover: fig('fig-data-flow', '속마음 스캐너의 대화 데이터 처리 흐름'),
  },
  {
    slug: 'reconnect-after-conversation-fades',
    title: '대화가 뜸해졌을 때 다시 이어가는 카톡',
    description: '연락이 자연스럽게 줄어든 상대에게 다시 말을 거는 일은 부담스럽습니다. 부담을 줄이는 첫 문장과 피해야 할 문장을 정리했습니다.',
    date: '2026-11-04',
    category: '연애 팁',
    keywords: ['연락 끊긴 후 카톡', '오랜만에 연락', '대화 다시 시작'],
    readTime: '7분',
    cover: fig('fig-reconnect-message', '오랜만에 다시 연락할 때 첫 문장의 3요소'),
  },
  {
    slug: 'couple-chat-habits-long-term',
    title: '오래 만난 커플의 카톡이 줄어드는 이유와 점검법',
    description: '사귄 지 오래될수록 카톡이 짧아지는 것은 자연스러운 변화일 수 있습니다. 걱정해야 할 변화와 그렇지 않은 변화를 구별하는 기준을 정리했습니다.',
    date: '2026-11-06',
    category: '연애 팁',
    keywords: ['커플 카톡 줄어듦', '권태기 카톡', '오래된 커플 연락'],
    readTime: '8분',
    cover: fig('fig-message-length', '장문과 단답: 메시지 길이 불균형'),
  },
]

export const categories = ['전체', '사용 가이드', '연애 심리', '연애 팁', '도구 추천']

/** 오늘 날짜 (KST, YYYY-MM-DD) */
export function todayKst(now: Date = new Date()): string {
  return new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

export function isPublished(post: BlogPost, now: Date = new Date()): boolean {
  return post.date <= todayKst(now)
}

/** 발행된 글만, 최신순 */
export function getPublishedPosts(now: Date = new Date()): BlogPost[] {
  return allPosts
    .filter((post) => isPublished(post, now))
    .sort((a, b) => b.date.localeCompare(a.date))
}

/** 예약 글 포함 전체 (정적 경로 생성용) */
export function getAllPosts(): BlogPost[] {
  return allPosts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return []
  const published = getPublishedPosts().filter((post) => post.slug !== slug)
  const sameCategory = published.filter((post) => post.category === current.category)
  const others = published.filter((post) => post.category !== current.category)
  return [...sameCategory, ...others].slice(0, limit)
}
