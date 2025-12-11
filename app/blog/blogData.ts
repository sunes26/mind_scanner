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
    date: '2025-12-11',
    category: '사용 가이드',
    keywords: ['카카오톡 대화 내보내기', '카톡 대화 백업', '카카오톡 txt 파일'],
    readTime: '5분',
  },
  {
    slug: 'how-to-distinguish-some-vs-eojang',
    title: '카톡으로 썸인지 어장인지 구별하는 방법 5가지',
    description: 'AI 분석 데이터로 밝혀낸 썸과 어장의 결정적 차이! 답장 패턴, 이모티콘 사용, 질문 빈도 등 5가지 지표로 확실하게 구별하세요.',
    date: '2025-12-11',
    category: '연애 심리',
    keywords: ['썸 어장 구별', '카톡 심리 분석', '어장관리 특징'],
    readTime: '7분',
  },
  {
    slug: 'ai-analyzed-reply-patterns',
    title: 'AI가 분석한 호감도 높은 카톡 답장 패턴 TOP 10',
    description: '10만 건의 대화를 분석한 결과, 호감도가 높은 사람들의 답장에는 공통적인 패턴이 있었습니다. 지금 바로 확인하세요!',
    date: '2025-12-11',
    category: '연애 팁',
    keywords: ['카톡 답장 패턴', '호감도 높이는 법', '카톡 연애 팁'],
    readTime: '6분',
  },
  {
    slug: 'who-likes-more-kakaotalk',
    title: '카톡 대화로 누가 더 좋아하는지 알 수 있을까?',
    description: '답장 속도, 메시지 길이, 질문 빈도... AI가 분석한 "더 좋아하는 사람"의 7가지 특징을 공개합니다.',
    date: '2025-12-11',
    category: '연애 심리',
    keywords: ['누가 더 좋아하는지', '카톡 호감도', '관계 주도권'],
    readTime: '8분',
  },
  {
    slug: 'reply-speed-psychology',
    title: '답장 속도로 보는 호감도 - 카톡 심리 분석',
    description: '즉답? 늦답? 답장 속도에 숨겨진 심리를 파헤칩니다. 시간대별 답장 패턴으로 상대방의 진심을 알아보세요.',
    date: '2025-12-11',
    category: '연애 심리',
    keywords: ['카톡 답장 속도', '답장 심리', '즉답 의미'],
    readTime: '5분',
  },
  {
    slug: 'emoticon-usage-psychology',
    title: '이모티콘 사용량으로 알아보는 상대방 마음',
    description: '이모티콘을 많이 쓰면 호감이 있다? AI 분석으로 밝혀진 이모티콘과 호감도의 상관관계를 알려드립니다.',
    date: '2025-12-11',
    category: '연애 심리',
    keywords: ['이모티콘 심리', '카톡 이모티콘 의미', '이모티콘 호감도'],
    readTime: '5분',
  },
  {
    slug: 'kkk-count-analysis',
    title: 'ㅋㅋㅋ 개수로 보는 진심도 분석 - 몇 개가 적당할까?',
    description: 'ㅋ 1개 vs ㅋㅋㅋ 3개 vs ㅋㅋㅋㅋㅋㅋ 6개... AI가 분석한 ㅋ 개수별 감정 차이를 공개합니다!',
    date: '2025-12-11',
    category: '연애 팁',
    keywords: ['ㅋㅋㅋ 개수 의미', '카톡 ㅋ 심리', '웃음 표현 분석'],
    readTime: '4분',
  },
  {
    slug: 'mildang-vs-real-love',
    title: '밀당 vs 진심, 카톡으로 구별하는 법',
    description: '상대방이 밀당하는 건지, 진심으로 바쁜 건지 헷갈리나요? AI가 알려주는 확실한 구별법!',
    date: '2025-12-11',
    category: '연애 심리',
    keywords: ['밀당 구별법', '카톡 밀당', '진심 구별'],
    readTime: '7분',
  },
  {
    slug: 'conversation-analysis-sites-2025',
    title: '카카오톡 대화 분석 무료 사이트 추천 (2025년)',
    description: '2025년 최신! 무료로 사용할 수 있는 카톡 대화 분석 사이트를 비교 분석했습니다. 속마음 스캐너가 1위인 이유는?',
    date: '2025-12-11',
    category: '도구 추천',
    keywords: ['카톡 분석 사이트', '대화 분석 도구', '무료 카톡 분석'],
    readTime: '6분',
  },
  {
    slug: 'kakaotalk-psychology-top10',
    title: '카카오톡 대화 분석으로 보는 연애 심리 TOP 10',
    description: '10만 건의 카톡 대화를 분석해서 발견한 놀라운 연애 심리 패턴 10가지를 공개합니다!',
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
