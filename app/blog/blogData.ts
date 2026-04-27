// 블로그 포스트 데이터
export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  keywords: string[]
  readTime: string
  image?: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'kakaotalk-export-guide',
    title: '카카오톡 대화 내보내기 방법 (PC/모바일) - 2025년 최신',
    description: 'PC와 모바일에서 카카오톡 대화를 내보내는 방법을 스크린샷과 함께 상세히 설명합니다. 5분이면 누구나 쉽게 따라할 수 있어요!',
    date: '2025-10-15',
    category: '사용 가이드',
    keywords: ['카카오톡 대화 내보내기', '카톡 대화 백업', '카카오톡 txt 파일'],
    readTime: '5분',
  },
  {
    slug: 'how-to-distinguish-some-vs-eojang',
    title: '카톡으로 썸인지 어장인지 구별하는 방법 5가지',
    description: '답장 패턴, 이모티콘 사용, 질문 빈도 등 카톡 대화에서 나타나는 5가지 신호로 썸과 어장의 차이를 구별하는 방법을 알아보세요.',
    date: '2025-10-22',
    category: '연애 심리',
    keywords: ['썸 어장 구별', '카톡 심리 분석', '어장관리 특징'],
    readTime: '7분',
  },
  {
    slug: 'ai-analyzed-reply-patterns',
    title: '호감도 높은 카톡 답장 패턴 TOP 10',
    description: '카카오톡 대화 패턴을 분석해보면 호감도가 높은 사람들의 답장에는 공통적인 특징이 있습니다. 어떤 패턴들인지 알아보세요.',
    date: '2025-11-01',
    category: '연애 팁',
    keywords: ['카톡 답장 패턴', '호감도 높이는 법', '카톡 연애 팁'],
    readTime: '6분',
  },
  {
    slug: 'who-likes-more-kakaotalk',
    title: '카톡 대화로 누가 더 좋아하는지 알 수 있을까?',
    description: '답장 속도, 메시지 길이, 질문 빈도 등 카톡 대화 속에 숨겨진 "더 좋아하는 사람"의 7가지 특징을 알아봅니다.',
    date: '2025-11-08',
    category: '연애 심리',
    keywords: ['누가 더 좋아하는지', '카톡 호감도', '관계 주도권'],
    readTime: '8분',
  },
  {
    slug: 'reply-speed-psychology',
    title: '답장 속도로 보는 호감도 - 카톡 심리 분석',
    description: '즉답? 늦답? 답장 속도에 숨겨진 심리를 파헤칩니다. 시간대별 답장 패턴으로 상대방의 진심을 알아보세요.',
    date: '2025-11-15',
    category: '연애 심리',
    keywords: ['카톡 답장 속도', '답장 심리', '즉답 의미'],
    readTime: '5분',
  },
  {
    slug: 'emoticon-usage-psychology',
    title: '이모티콘 사용량으로 알아보는 상대방 마음',
    description: '이모티콘을 많이 쓰면 호감이 있다? 카톡 대화에서 이모티콘과 호감도가 어떤 관계인지 심리학적으로 살펴봅니다.',
    date: '2025-11-22',
    category: '연애 심리',
    keywords: ['이모티콘 심리', '카톡 이모티콘 의미', '이모티콘 호감도'],
    readTime: '5분',
  },
  {
    slug: 'kkk-count-analysis',
    title: 'ㅋㅋㅋ 개수로 보는 진심도 분석 - 몇 개가 적당할까?',
    description: 'ㅋ 1개 vs ㅋㅋㅋ 3개 vs ㅋㅋㅋㅋㅋㅋ 6개... 카톡에서 ㅋ 개수가 감정 표현에 어떤 의미를 담고 있는지 분석합니다.',
    date: '2025-11-29',
    category: '연애 팁',
    keywords: ['ㅋㅋㅋ 개수 의미', '카톡 ㅋ 심리', '웃음 표현 분석'],
    readTime: '4분',
  },
  {
    slug: 'mildang-vs-real-love',
    title: '밀당 vs 진심, 카톡으로 구별하는 법',
    description: '상대방이 밀당하는 건지, 진심으로 바쁜 건지 헷갈리나요? 카톡 대화 패턴으로 밀당과 진심을 구별하는 방법을 알아보세요.',
    date: '2025-12-03',
    category: '연애 심리',
    keywords: ['밀당 구별법', '카톡 밀당', '진심 구별'],
    readTime: '7분',
  },
  {
    slug: 'conversation-analysis-sites-2025',
    title: '카카오톡 대화 분석 무료 사이트 추천 (2025년)',
    description: '2025년 무료로 사용할 수 있는 카톡 대화 분석 사이트들을 직접 사용해보고 기능, 정확도, 개인정보 보호 측면을 비교했습니다.',
    date: '2025-12-07',
    category: '도구 추천',
    keywords: ['카톡 분석 사이트', '대화 분석 도구', '무료 카톡 분석'],
    readTime: '6분',
  },
  {
    slug: 'kakaotalk-psychology-top10',
    title: '카카오톡 대화 분석으로 보는 연애 심리 TOP 10',
    description: '카카오톡 대화에서 발견할 수 있는 연애 심리 패턴 10가지를 심리학적 배경과 함께 알아봅니다.',
    date: '2025-12-11',
    category: '연애 심리',
    keywords: ['카톡 심리 분석', '연애 심리', '대화 패턴'],
    readTime: '10분',
  },
]

// 카테고리별 필터링
export const categories = ['전체', '사용 가이드', '연애 심리', '연애 팁', '도구 추천']

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === '전체') return blogPosts
  return blogPosts.filter(post => post.category === category)
}
