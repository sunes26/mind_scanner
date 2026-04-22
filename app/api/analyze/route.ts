import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { isValidAnalysisResult, validateEnvironmentVariables, API_TIMEOUTS } from '@/utils/validation'
import { sanitizeNumber } from '@/utils/sanitize'
import { SupportedLanguage } from '@/utils/language'

// 보안: 환경 변수 검증
const envCheck = validateEnvironmentVariables()
if (!envCheck.isValid) {
  console.error('Missing required environment variables:', envCheck.missingVars)
  throw new Error(`Missing environment variables: ${envCheck.missingVars.join(', ')}`)
}

const openai = new OpenAI({
  apiKey: process.env.SPANLENS_API_KEY,
  baseURL: 'https://spanlens-server.vercel.app/proxy/openai/v1',
  timeout: API_TIMEOUTS.ANALYSIS,
})

// 시스템 프롬프트 - 연애 심리 전문가 페르소나 (언어별)
function getSystemPrompt(lang: SupportedLanguage): string {
  if (lang === 'ko') {
    return `너는 "연애 심리 분석가 닥터 하트"야.
10년간 수천 건의 연애 상담을 해온 전문가로, 카카오톡 대화 패턴만 보고도 두 사람의 관계를 정확히 파악할 수 있어.

## 분석 원칙
1. 데이터 기반: 제공된 통계 수치를 근거로 분석해
2. 재미있게: MZ세대가 좋아할 만한 유머와 밈을 섞어서 표현해
3. 구체적으로: 막연한 조언이 아닌 실행 가능한 팁을 제공해
4. 긍정적으로: 어떤 결과든 희망적인 메시지를 담아

## 호감도 점수 기준 (0-100)
- 90-100: 💍 결혼각, 완벽한 케미
- 80-89: 💕 연인 확정 직전, 고백만 남음
- 70-79: 💗 썸 타는 중, 좋은 흐름
- 60-69: 💛 호감은 있음, 조금 더 노력 필요
- 50-59: 🤔 애매함, 방향 설정 필요
- 40-49: 😅 한쪽만 관심 있을 수도
- 0-39: 💔 친구 사이에 가까움

## 주도권 판단 기준
- 먼저 연락하는 횟수
- 답장 속도 차이 (빠를수록 관심 높음)
- 메시지 길이 차이
- 질문을 더 많이 하는 쪽
- 이모티콘/ㅋㅋ 사용량 (많이 쓰는 쪽이 더 관심 있음)

## 응답 규칙
- 반드시 지정된 JSON 형식으로만 응답
- 이모지를 적극 활용
- 한국어로 응답
- 분석 내용은 2-3문장으로 간결하게`
  }

  // English version
  return `You are "Dr. Heart", a relationship psychology analyst.
With 10 years of experience analyzing thousands of conversations, you can accurately assess relationships just by examining chat patterns.

## Analysis Principles
1. Data-driven: Base your analysis on the provided statistics
2. Engaging: Use relatable language and insights
3. Specific: Provide actionable tips, not vague advice
4. Positive: Include hopeful messages regardless of the results

## Affection Score Criteria (0-100)
- 90-100: 💍 Perfect chemistry, marriage material
- 80-89: 💕 Almost dating, just need to confess
- 70-79: 💗 Dating phase, good flow
- 60-69: 💛 Some interest, needs more effort
- 50-59: 🤔 Ambiguous, needs direction
- 40-49: 😅 One-sided interest possible
- 0-39: 💔 Just friends

## Dominance Criteria
- Who initiates conversations more
- Reply speed difference (faster = more interested)
- Message length difference
- Who asks more questions
- Emoji/laughter usage (more = more interested)

## Response Rules
- Respond ONLY in the specified JSON format
- Use emojis actively
- Respond in English
- Keep analysis concise (2-3 sentences)`
}

// 분석 요청 프롬프트 생성
function createAnalysisPrompt(data: {
  rawText: string
  p1: string
  p2: string
  analysis?: any
  lang?: SupportedLanguage
}): string {
  const { rawText, p1, p2, analysis, lang = 'ko' } = data

  // 대화 샘플 추출 (최근 대화 위주)
  const recentChat = rawText.slice(-5000)

  let analysisText = ''
  if (analysis?.participants) {
    const p1Stats = analysis.participants[p1]
    const p2Stats = analysis.participants[p2]

    // 답장 시간을 읽기 쉬운 형식으로 변환
    const formatReplyTime = (minutes: number) => {
      if (lang === 'ko') {
        if (minutes === 0) return '즉시'
        if (minutes < 60) return `${minutes}분`
        if (minutes < 1440) return `${Math.round(minutes / 60)}시간`
        return `${Math.round(minutes / 1440)}일`
      } else {
        if (minutes === 0) return 'instant'
        if (minutes < 60) return `${minutes}min`
        if (minutes < 1440) return `${Math.round(minutes / 60)}hr`
        return `${Math.round(minutes / 1440)}day`
      }
    }

    const p1Reply = formatReplyTime(p1Stats?.avgReplyTime || 0)
    const p2Reply = formatReplyTime(p2Stats?.avgReplyTime || 0)

    const p1LaughRatio = ((p1Stats?.laughCount || 0) / (p1Stats?.messageCount || 1)).toFixed(2)
    const p2LaughRatio = ((p2Stats?.laughCount || 0) / (p2Stats?.messageCount || 1)).toFixed(2)

    if (lang === 'ko') {
      analysisText = `
참여자 통계:
- ${p1}: 메시지 ${p1Stats?.messageCount || 0}개, 평균 길이 ${p1Stats?.avgMessageLength?.toFixed(1) || 0}자, 이모지 ${p1Stats?.emojiCount || 0}개, 웃음 ${p1Stats?.laughCount || 0}개 (메시지당 ${p1LaughRatio}), 평균 답장 ${p1Reply}
  → 하트 이모지 ${p1Stats?.heartEmojiCount || 0}개, 애정 표현 ${p1Stats?.affectionWordCount || 0}회, 연속 메시지 ${p1Stats?.consecutiveMessageCount || 0}회
- ${p2}: 메시지 ${p2Stats?.messageCount || 0}개, 평균 길이 ${p2Stats?.avgMessageLength?.toFixed(1) || 0}자, 이모지 ${p2Stats?.emojiCount || 0}개, 웃음 ${p2Stats?.laughCount || 0}개 (메시지당 ${p2LaughRatio}), 평균 답장 ${p2Reply}
  → 하트 이모지 ${p2Stats?.heartEmojiCount || 0}개, 애정 표현 ${p2Stats?.affectionWordCount || 0}회, 연속 메시지 ${p2Stats?.consecutiveMessageCount || 0}회
총 대화: ${analysis.totalMessages || 0}개 (${analysis.totalDays || 0}일간)
`
    } else {
      analysisText = `
Participant Statistics:
- ${p1}: ${p1Stats?.messageCount || 0} messages, avg length ${p1Stats?.avgMessageLength?.toFixed(1) || 0} chars, ${p1Stats?.emojiCount || 0} emojis, ${p1Stats?.laughCount || 0} laughs (${p1LaughRatio} per msg), avg reply ${p1Reply}
  → ${p1Stats?.heartEmojiCount || 0} heart emojis, ${p1Stats?.affectionWordCount || 0} affection words, ${p1Stats?.consecutiveMessageCount || 0} consecutive msgs
- ${p2}: ${p2Stats?.messageCount || 0} messages, avg length ${p2Stats?.avgMessageLength?.toFixed(1) || 0} chars, ${p2Stats?.emojiCount || 0} emojis, ${p2Stats?.laughCount || 0} laughs (${p2LaughRatio} per msg), avg reply ${p2Reply}
  → ${p2Stats?.heartEmojiCount || 0} heart emojis, ${p2Stats?.affectionWordCount || 0} affection words, ${p2Stats?.consecutiveMessageCount || 0} consecutive msgs
Total conversation: ${analysis.totalMessages || 0} messages (${analysis.totalDays || 0} days)
`
    }
  }

  if (lang === 'ko') {
    return `## 분석 대상
- 참여자 1: "${p1}"
- 참여자 2: "${p2}"

## 상세 분석 데이터
${analysisText || '(상세 데이터 없음)'}

## 대화 내용 샘플 (최근 대화)
\`\`\`
${recentChat}
\`\`\`

## 요청사항
위 데이터를 바탕으로 두 사람의 관계를 분석해줘.

반드시 아래 JSON 형식으로만 응답해:
{
  "score": (0-100 사이 정수, 호감도 점수),
  "dominance": "${p1} 또는 ${p2}",
  "attackTip": {
    "${p1}": "(${p1}에게 맞는 구체적인 공략 조언 2-3문장)",
    "${p2}": "(${p2}에게 맞는 구체적인 공략 조언 2-3문장)"
  },
  "personalities": {
    "${p1}": {
      "type": "(대화 패턴 기반 성향 타입, 예: 적극적인 리더형, 감성적인 공감형 등)",
      "traits": ["특징1", "특징2", "특징3"],
      "description": "(3문장. 대화 패턴, 감정 표현, 관계 스타일 설명)"
    },
    "${p2}": {
      "type": "(대화 패턴 기반 성향 타입)",
      "traits": ["특징1", "특징2", "특징3"],
      "description": "(3문장. 대화 패턴, 감정 표현, 관계 스타일 설명)"
    }
  },
  "mutualPerception": {
    "${p1}": {
      "thinkingAboutYou": "(${p2}가 ${p1}를 어떻게 보는지 3문장)",
      "youThinkingAbout": "(${p1}가 ${p2}를 어떻게 보는지 3문장)"
    },
    "${p2}": {
      "thinkingAboutYou": "(${p1}가 ${p2}를 어떻게 보는지 3문장)",
      "youThinkingAbout": "(${p2}가 ${p1}를 어떻게 보는지 3문장)"
    }
  }
}

중요: 유효한 JSON만 응답. 줄바꿈 금지. 따옴표는 작은따옴표로 대체.`
  }

  // English version
  return `## Analysis Target
- Participant 1: "${p1}"
- Participant 2: "${p2}"

## Detailed Analysis Data
${analysisText || '(No detailed data)'}

## Conversation Sample (Recent messages)
\`\`\`
${recentChat}
\`\`\`

## Request
Analyze the relationship between these two people based on the data above.

Respond ONLY in the following JSON format:
{
  "score": (integer between 0-100, affection score),
  "dominance": "${p1} or ${p2}",
  "attackTip": {
    "${p1}": "(Specific relationship advice for ${p1} in 2-3 sentences)",
    "${p2}": "(Specific relationship advice for ${p2} in 2-3 sentences)"
  },
  "personalities": {
    "${p1}": {
      "type": "(Personality type based on chat patterns, e.g., Proactive Leader, Empathetic Listener)",
      "traits": ["trait1", "trait2", "trait3"],
      "description": "(3 sentences describing chat patterns, emotional expression, relationship style)"
    },
    "${p2}": {
      "type": "(Personality type based on chat patterns)",
      "traits": ["trait1", "trait2", "trait3"],
      "description": "(3 sentences describing chat patterns, emotional expression, relationship style)"
    }
  },
  "mutualPerception": {
    "${p1}": {
      "thinkingAboutYou": "(How ${p2} perceives ${p1} in 3 sentences)",
      "youThinkingAbout": "(How ${p1} perceives ${p2} in 3 sentences)"
    },
    "${p2}": {
      "thinkingAboutYou": "(How ${p1} perceives ${p2} in 3 sentences)",
      "youThinkingAbout": "(How ${p2} perceives ${p1} in 3 sentences)"
    }
  }
}

Important: Respond with valid JSON only. No line breaks. Use single quotes instead of double quotes in text.`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { rawText, p1, p2, analysis, language = 'ko' } = body
    const lang: SupportedLanguage = language

    // 보안: 입력 데이터 검증
    if (!rawText || typeof rawText !== 'string') {
      return NextResponse.json(
        { error: '유효하지 않은 대화 내용입니다.' },
        { status: 400 }
      )
    }

    if (!p1 || !p2 || typeof p1 !== 'string' || typeof p2 !== 'string') {
      return NextResponse.json(
        { error: '유효하지 않은 참여자 정보입니다.' },
        { status: 400 }
      )
    }

    if (rawText.length === 0 || rawText.length > 500000) {
      return NextResponse.json(
        { error: '대화 내용의 길이가 유효하지 않습니다.' },
        { status: 400 }
      )
    }

    if (p1.length === 0 || p2.length === 0 || p1.length > 50 || p2.length > 50) {
      return NextResponse.json(
        { error: '참여자 이름의 길이가 유효하지 않습니다.' },
        { status: 400 }
      )
    }

    // API 키 확인 — 디버그 로그 포함
    console.log('[DEBUG] SPANLENS_API_KEY present:', !!process.env.SPANLENS_API_KEY)
    console.log('[DEBUG] SPANLENS_API_KEY length:', (process.env.SPANLENS_API_KEY || '').length)
    console.log('[DEBUG] SPANLENS_API_KEY prefix:', (process.env.SPANLENS_API_KEY || '').slice(0, 12))
    console.log('[DEBUG] openai baseURL:', openai.baseURL)
    if (!process.env.SPANLENS_API_KEY) {
      console.log('[DEBUG] FALLBACK: Spanlens API key not configured, returning mock data')
      return NextResponse.json(generateMockResult(p1, p2, analysis, lang))
    }

    const prompt = createAnalysisPrompt({
      rawText,
      p1,
      p2,
      analysis,
      lang,
    })

    console.log('[DEBUG] Calling OpenAI via baseURL:', openai.baseURL)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: getSystemPrompt(lang),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0].message.content

    if (!content) {
      throw new Error('Empty response from OpenAI')
    }

    let result
    try {
      result = JSON.parse(content)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Content:', content)
      // JSON 파싱 실패 시 Mock 데이터로 fallback
      return NextResponse.json(generateMockResult(p1, p2, analysis, lang))
    }

    // 보안: 응답 구조 검증
    if (!isValidAnalysisResult(result)) {
      console.error('Invalid analysis result structure, falling back to mock data')
      return NextResponse.json(generateMockResult(p1, p2, analysis, lang))
    }

    // 보안: 점수 범위 검증
    const score = sanitizeNumber(result.score, 0, 100, 70)

    const validatedResult = {
      score,
      relation: getRelationByScore(score, lang), // AI 생성 대신 점수 기반 랜덤 선택
      dominance: result.dominance || p1,
      attackTip: result.attackTip || '',
      personalities: result.personalities || {},
      mutualPerception: result.mutualPerception || {},
    }

    return NextResponse.json(validatedResult)

  } catch (error) {
    // [DEBUG] 전체 에러 구조 출력 — 원인 파악용
    console.error('[DEBUG] Analysis error type:', error?.constructor?.name)
    console.error('[DEBUG] Analysis error message:', error instanceof Error ? error.message : String(error))
    console.error('[DEBUG] Analysis error stack:', error instanceof Error ? error.stack : 'no stack')
    if (error && typeof error === 'object') {
      console.error('[DEBUG] Analysis error keys:', Object.keys(error))
      console.error('[DEBUG] Analysis error JSON:', JSON.stringify(error, Object.getOwnPropertyNames(error)))
    }

    // 에러 발생 시 목업 데이터 반환
    const body = await request.json().catch(() => ({}))
    return NextResponse.json(
      generateMockResult(
        body.p1 || '사람1',
        body.p2 || '사람2',
        body.analysis,
        body.language || 'ko'
      )
    )
  }
}

// 점수 구간별 관계 텍스트 생성 함수
function getRelationByScore(score: number, lang: SupportedLanguage = 'ko'): string {
  if (lang === 'ko') {
    const relations90to100 = [
      '서로에게 매우 중요한 존재',
      '최고 수준의 상호 교감',
      '깊은 신뢰가 형성된 관계',
      '완벽한 대화 케미스트리',
    ]

    const relations80to89 = [
      '서로에게 높은 관심을 보이는 사이',
      '편안하고 긍정적인 관계',
      '활발한 소통이 이루어지는 사이',
      '상호 호감이 확실한 관계',
    ]

    const relations70to79 = [
      '안정적으로 소통하는 관계',
      '서로에게 관심이 있는 사이',
      '균형 잡힌 대화 패턴',
      '점점 가까워지고 있는 중',
    ]

    const relations60to69 = [
      '관계 발전 가능성이 있는 사이',
      '서로를 파악해가는 단계',
      '조금 더 노력이 필요한 관계',
      '아직 탐색 중인 사이',
    ]

    const relations50to59 = [
      '한쪽이 더 적극적인 관계',
      '관심도에 온도차가 있는 사이',
      '소통 균형이 필요한 관계',
      '방향 설정이 필요한 단계',
    ]

    const relations40to49 = [
      '소극적인 소통 패턴',
      '한쪽의 일방적인 관심',
      '대화가 자주 끊기는 사이',
      '적극성이 부족한 관계',
    ]

    const relations0to39 = [
      '평범한 지인 관계',
      '소통이 제한적인 사이',
      '친구 이상의 관심은 없는 듯',
      '형식적인 대화가 많은 관계',
    ]

    let selectedArray: string[]

    if (score >= 90) selectedArray = relations90to100
    else if (score >= 80) selectedArray = relations80to89
    else if (score >= 70) selectedArray = relations70to79
    else if (score >= 60) selectedArray = relations60to69
    else if (score >= 50) selectedArray = relations50to59
    else if (score >= 40) selectedArray = relations40to49
    else selectedArray = relations0to39

    return selectedArray[Math.floor(Math.random() * selectedArray.length)]
  }

  // English version
  const relations90to100 = [
    'Very important to each other',
    'Highest level of mutual connection',
    'Deep trust has been established',
    'Perfect conversation chemistry',
  ]

  const relations80to89 = [
    'Showing high interest in each other',
    'Comfortable and positive relationship',
    'Active communication happening',
    'Clear mutual affection',
  ]

  const relations70to79 = [
    'Stable communication pattern',
    'Interested in each other',
    'Balanced conversation flow',
    'Getting closer gradually',
  ]

  const relations60to69 = [
    'Potential for relationship growth',
    'Getting to know each other phase',
    'Needs a bit more effort',
    'Still exploring each other',
  ]

  const relations50to59 = [
    'One side more proactive',
    'Temperature difference in interest',
    'Communication balance needed',
    'Direction setting required',
  ]

  const relations40to49 = [
    'Passive communication pattern',
    'One-sided interest',
    'Conversation often breaks off',
    'Lacks proactivity',
  ]

  const relations0to39 = [
    'Casual acquaintance relationship',
    'Limited communication',
    'No romantic interest apparent',
    'Mostly formal conversations',
  ]

  let selectedArray: string[]

  if (score >= 90) selectedArray = relations90to100
  else if (score >= 80) selectedArray = relations80to89
  else if (score >= 70) selectedArray = relations70to79
  else if (score >= 60) selectedArray = relations60to69
  else if (score >= 50) selectedArray = relations50to59
  else if (score >= 40) selectedArray = relations40to49
  else selectedArray = relations0to39

  return selectedArray[Math.floor(Math.random() * selectedArray.length)]
}

// 목업 결과 생성 함수
function generateMockResult(p1: string, p2: string, analysis?: any, lang: SupportedLanguage = 'ko') {
  const countP1 = analysis?.participants?.[p1]?.messageCount || 100
  const countP2 = analysis?.participants?.[p2]?.messageCount || 100
  const total = countP1 + countP2
  const balance = 1 - Math.abs(countP1 - countP2) / total
  const baseScore = Math.floor(balance * 30) + 55
  const score = Math.min(95, baseScore + Math.floor(Math.random() * 15))

  const dominant = countP1 > countP2 ? p2 : p1
  const lessActive = countP1 > countP2 ? p1 : p2

  const tips = [
    `${dominant}님이 좋아하는 주제로 대화를 이끌어보세요. 공통 관심사를 찾으면 급진전!`,
    `밤 10시 이후 감성적인 대화를 시도해보세요. 이 시간대에 호감도가 2배로 올라갑니다!`,
    `가끔은 먼저 연락하지 말고 기다려보세요. 밀당의 기본은 '밀기'입니다!`,
    `이모티콘과 ㅋㅋㅋ를 적절히 섞어서 사용하세요. 너무 진지하면 부담스러워해요.`,
  ]

  // 다양한 성향 타입 풀 (12가지)
  const personalityTypes = [
    {
      type: '적극적인 리더형',
      activeTraits: ['먼저 대화를 시작하는 편', '주도적으로 계획을 세움', '결정을 빠르게 내림'],
      passiveTraits: ['상대방을 잘 따라줌', '리드를 받아주는 편', '유연하게 맞춰줌'],
      activeDesc: (name: string) => `${name}님은 관계에서 주도권을 가지고 이끌어가는 적극적인 리더형입니다. 대화를 먼저 시작하는 경우가 많고, 만남이나 데이트 계획을 주도적으로 제안하는 경향이 있어요. 자신의 의견을 명확하고 솔직하게 표현하며, 상대방과의 관계를 발전시키기 위해 적극적으로 노력합니다. 결정을 내릴 때도 빠르고 확신 있게 행동하며, 관계의 방향성을 명확히 하려는 성향이 강합니다. 다소 주도적이지만, 상대방의 의견도 존중하며 균형을 맞추려 노력하는 모습을 보입니다.`,
      passiveDesc: (name: string) => `${name}님은 상대방의 페이스에 맞춰 편안한 관계를 만들어가는 유연한 스타일입니다. 무리하게 관계를 밀어붙이지 않고, 자연스러운 흐름에 몸을 맡기는 것을 선호해요. 상대방이 주도할 때 잘 따라주고, 리드를 받아주는 것에 거부감이 없으며, 오히려 그런 관계가 편안하다고 느낍니다. 갈등 상황에서도 맞서기보다는 유연하게 대처하며, 상대방의 기분과 상황을 고려해 자신을 맞추는 경향이 있어요. 관계의 안정성과 편안함을 중시하는 성향입니다.`
    },
    {
      type: '감성적인 로맨티스트',
      activeTraits: ['감정 표현이 풍부함', '분위기를 중시함', '특별한 순간을 만듦'],
      passiveTraits: ['감수성이 풍부함', '상대방의 감정에 공감함', '은은한 표현을 선호함'],
      activeDesc: (name: string) => `${name}님은 로맨틱한 순간과 감성적인 교감을 중요하게 여기는 감성파입니다. 대화할 때 감정 표현이 풍부하고, 분위기를 중시하며 특별한 순간을 만들어내는 데 관심이 많아요. 상대방에게 작은 선물이나 따뜻한 말로 감동을 주려 하며, 감성적인 메시지나 이모티콘을 자주 사용합니다. 관계에서 깊이와 의미를 추구하며, 피상적인 만남보다는 진심 어린 교감을 원해요. 때로는 너무 감성적이어서 상처받기 쉽지만, 그만큼 상대방에게 진심을 다하는 성향입니다.`,
      passiveDesc: (name: string) => `${name}님은 조용히 감정을 느끼고 표현하는 섬세한 감성파입니다. 작은 것에서도 의미를 찾고, 진심 어린 교감을 소중히 여기며, 상대방의 감정 변화에 민감하게 반응해요. 대화할 때 공감 능력이 뛰어나며, 상대방의 기분을 잘 헤아리고 맞춰주는 편입니다. 은은하고 섬세한 표현을 선호하며, 과도하게 드러내기보다는 조용히 마음을 전달하는 방식을 택해요. 감수성이 풍부해 상대방의 작은 배려에도 크게 감동하고, 그 마음을 오래 기억합니다.`
    },
    {
      type: '밝은 에너자이저',
      activeTraits: ['긍정 에너지가 넘침', '재미있는 대화를 이끔', '분위기를 밝게 만듦'],
      passiveTraits: ['밝은 에너지를 받아줌', '함께 웃고 즐김', '긍정적으로 반응함'],
      activeDesc: (name: string) => `${name}님은 주변을 밝게 만드는 긍정 에너지가 넘치는 에너자이저입니다. 대화할 때 활기차고 재미있는 이야기를 잘 꺼내며, 분위기를 띄우는 능력이 탁월해요. 이모티콘과 ㅋㅋㅋ를 많이 사용하며, 상대방이 힘들 때도 긍정적인 에너지로 기운을 북돋아줍니다. 함께 있으면 시간이 빠르게 가고, 웃음이 끊이지 않는 즐거운 분위기를 만들어요. 때로는 진지한 순간에도 유머를 섞어 부담을 덜어주며, 관계를 가볍고 즐겁게 유지하는 데 탁월한 능력을 보입니다.`,
      passiveDesc: (name: string) => `${name}님은 상대방의 밝은 에너지를 잘 받아주고 함께 즐기는 스타일입니다. 긍정적으로 반응하며 리액션이 좋아서, 상대방이 이야기하는 재미를 느끼게 만들어요. 함께 웃고 즐기는 것을 좋아하며, 무거운 분위기보다는 가벼운 대화를 선호합니다. 상대방의 농담에 잘 웃어주고, ㅋㅋㅋ로 활발하게 반응하며 대화에 생기를 더해요. 편안하고 긍정적인 분위기 속에서 자연스럽게 관계를 발전시켜 나가며, 스트레스 없이 즐거운 시간을 보내는 것을 중시합니다.`
    },
    {
      type: '신중한 분석가',
      activeTraits: ['생각이 깊음', '신중하게 판단함', '관찰력이 뛰어남'],
      passiveTraits: ['경청을 잘함', '상황을 파악함', '침착하게 대응함'],
      activeDesc: (name: string) => `${name}님은 관계를 신중하게 분석하고 발전시켜나가는 사고형 스타일입니다. 대화할 때 생각이 깊고, 상대방의 말과 행동을 주의 깊게 관찰하며 의미를 파악하려 노력해요. 즉흥적인 결정보다는 충분히 고민한 후 신중하게 행동하며, 관찰력이 뛰어나 상대방의 숨은 의도나 감정까지 읽어냅니다. 깊이 있는 대화를 선호하며, 피상적인 만남보다는 진지하고 의미 있는 교류를 추구해요. 분석적인 성향 때문에 때로는 고민이 많지만, 그만큼 신중하고 안정적인 관계를 만들어갑니다.`,
      passiveDesc: (name: string) => `${name}님은 차분하게 상황을 관찰하며 대응하는 침착한 스타일입니다. 경청을 잘하며, 상대방의 말을 끝까지 들어주고 상황을 정확히 파악하는 능력이 있어요. 급하게 서두르지 않고 관계가 자연스럽게 익어가길 기다리며, 성급한 판단이나 행동을 지양합니다. 상대방의 페이스를 존중하고 맞춰주는 편이며, 안정적이고 예측 가능한 관계를 선호해요. 갈등 상황에서도 감정적으로 반응하기보다는 침착하게 대처하며, 논리적이고 합리적인 해결책을 찾으려 노력합니다.`
    },
    {
      type: '따뜻한 공감형',
      activeTraits: ['공감 능력이 뛰어남', '위로를 잘함', '배려심이 많음'],
      passiveTraits: ['감정을 잘 읽음', '조용히 지지함', '편안함을 줌'],
      activeDesc: (name: string) => `${name}님은 상대방의 마음을 잘 헤아리는 따뜻한 공감형입니다. 공감 능력이 뛰어나 상대방의 감정을 빠르게 이해하고, 필요한 순간에 진심 어린 위로와 격려를 건네요. 배려심이 많아 상대방이 불편하지 않도록 세심하게 신경 쓰며, 작은 것 하나까지 챙기는 모습을 보입니다. 대화할 때 상대방의 고민을 잘 들어주고, 공감하는 말을 많이 하며 정서적 안정감을 제공해요. 다른 사람의 아픔에 민감하게 반응하며, 힘이 되어주고 싶어하는 따뜻한 마음을 가지고 있습니다.`,
      passiveDesc: (name: string) => `${name}님은 말없이도 상대방의 감정을 이해하는 섬세한 공감형입니다. 조용히 지지해주며, 곁에 있는 것만으로도 안정감을 주는 존재예요. 상대방의 감정을 잘 읽고, 편안한 분위기를 만들어주며, 필요할 때 조용히 다가가 위로를 건넵니다. 과도하게 간섭하거나 조언하기보다는, 상대방이 원하는 방식으로 지지해주는 것을 선호해요. 감정적으로 안정적이고 편안한 존재로 인식되며, 함께 있으면 마음이 편해지는 사람입니다. 배려심이 깊어 상대방의 작은 불편함도 놓치지 않고 챙겨줍니다.`
    },
    {
      type: '유머러스한 분위기메이커',
      activeTraits: ['웃음 코드가 잘 맞음', '재치있는 표현을 함', '즐거운 분위기 조성'],
      passiveTraits: ['유머를 잘 받아줌', 'ㅋㅋㅋ를 많이 씀', '같이 즐거워함'],
      activeDesc: (name: string) => `${name}님은 유머와 재치로 관계를 즐겁게 만드는 분위기메이커입니다. 웃음 코드가 잘 맞고, 재치있는 표현으로 대화를 재미있게 이끌어가는 능력이 탁월해요. 어색한 분위기를 순식간에 풀어버리며, 무거운 순간에도 적절한 유머로 긴장을 완화시킵니다. 대화가 끊이지 않도록 재미있는 이야기거리를 잘 찾아내며, 상대방을 웃게 만드는 것에서 즐거움을 느껴요. 함께 있으면 웃음이 끊이지 않고, 시간 가는 줄 모르게 즐거운 시간을 보낼 수 있습니다. 관계를 가볍고 즐겁게 유지하는 데 탁월한 재능이 있습니다.`,
      passiveDesc: (name: string) => `${name}님은 상대방의 유머를 잘 받아주며 함께 즐기는 반응형 스타일입니다. 리액션이 매우 좋아서 대화 상대가 이야기하는 재미를 느끼게 만들고, ㅋㅋㅋ를 많이 사용해 긍정적인 에너지를 전달해요. 상대방의 농담에 진심으로 웃어주고, 함께 즐거워하며 분위기를 밝게 만듭니다. 유머 감각이 있어 적절한 타이밍에 재치있는 반응을 보이며, 대화를 더욱 재미있게 만들어요. 가벼운 분위기를 즐기고, 웃음이 있는 관계를 선호하며, 함께 있으면 자연스럽게 기분이 좋아지는 사람입니다.`
    },
    {
      type: '쿨한 독립형',
      activeTraits: ['자기만의 공간을 중시함', '독립적인 성향', '적절한 거리 유지'],
      passiveTraits: ['상대방의 자유를 존중함', '집착하지 않음', '여유로운 태도'],
      activeDesc: (name: string) => `${name}님은 자신만의 시간과 공간을 소중히 여기는 독립적인 쿨가이/걸입니다. 관계에서도 적절한 거리감을 유지하며, 서로의 자유와 개인 시간을 존중하는 것을 중요하게 생각해요. 매일 붙어있기보다는 각자의 생활을 유지하면서 만날 때 더욱 즐겁게 만나는 스타일을 선호합니다. 집착하지 않고 여유로운 태도를 보이며, 상대방에게 부담을 주지 않으려 노력해요. 독립적인 성향 때문에 때로는 냉정해 보일 수 있지만, 실제로는 건강하고 성숙한 관계를 추구하는 것입니다.`,
      passiveDesc: (name: string) => `${name}님은 상대방에게 집착하지 않고 여유로운 관계를 추구하는 쿨한 스타일입니다. 상대방의 자유를 존중하며, 서로의 개인 시간을 인정하고 건강한 거리를 유지해요. 답장이 늦어도 재촉하지 않고, 만남을 강요하지 않으며, 상대방의 페이스를 이해하고 맞춰줍니다. 부담스러운 관계보다는 가볍고 편안한 관계를 선호하며, 각자의 생활을 존중하는 것을 당연하게 여겨요. 여유로운 태도 때문에 무관심해 보일 수 있지만, 실제로는 성숙하고 건강한 관계 방식을 추구하는 것입니다.`
    },
    {
      type: '헌신적인 케어형',
      activeTraits: ['상대방을 세심하게 챙김', '헌신적인 태도', '배려가 몸에 밴 스타일'],
      passiveTraits: ['조용히 신경씀', '필요할 때 도움을 줌', '은근히 챙기는 편'],
      activeDesc: (name: string) => `${name}님은 상대방을 위해 헌신하고 세심하게 챙기는 케어형 스타일입니다. 배려가 몸에 배어 있어 작은 부분까지 신경 쓰며, 상대방이 편안하고 행복하도록 최선을 다해요. 식사는 했는지, 잘 들어갔는지, 피곤하지 않은지 등 사소한 것까지 챙기며 관심을 표현합니다. 상대방의 필요를 먼저 파악하고 도움을 제공하며, 때로는 자신의 일보다 상대방을 우선시하는 경향이 있어요. 헌신적인 태도로 관계에 깊이 투자하며, 상대방이 안정감과 사랑을 느낄 수 있도록 노력합니다.`,
      passiveDesc: (name: string) => `${name}님은 티 내지 않고 조용히 상대방을 배려하는 은근한 케어형입니다. 필요한 순간에 은근히 챙겨주며 안정감을 제공하고, 과도하게 드러내지 않지만 항상 신경 쓰고 있어요. 상대방이 힘들 때 조용히 다가가 도움을 주고, 부담스럽지 않은 선에서 배려를 표현합니다. 말보다는 행동으로 마음을 전달하며, 작은 배려가 쌓여 큰 감동을 주는 스타일이에요. 상대방이 편안하게 느낄 수 있도록 세심하게 신경 쓰며, 조용히 지지해주는 든든한 존재입니다.`
    },
    {
      type: '진지한 대화형',
      activeTraits: ['깊이 있는 대화를 선호함', '진지한 주제를 즐김', '의미 있는 교류 추구'],
      passiveTraits: ['진지한 분위기에 잘 맞춤', '깊은 생각을 나눔', '표면적 대화 지양'],
      activeDesc: (name: string) => `${name}님은 가벼운 대화보다 깊이 있고 진지한 주제를 즐기는 지적인 대화형입니다. 서로의 생각과 가치관, 철학을 나누며 의미 있는 교류를 추구하고, 표면적인 잡담보다는 본질적인 이야기를 선호해요. 대화할 때 진지하게 경청하며, 상대방의 의견을 깊이 있게 탐구하고 이해하려 노력합니다. 지적 호기심이 많아 다양한 주제에 관심이 있고, 토론이나 깊은 대화를 통해 상대방과 더 가까워지길 원해요. 가벼운 관계보다는 정신적으로 교감할 수 있는 깊이 있는 관계를 중시합니다.`,
      passiveDesc: (name: string) => `${name}님은 진지한 대화 분위기에 잘 맞춰주고 깊은 생각을 나누는 스타일입니다. 표면적인 대화보다 의미 있는 주제를 선호하며, 상대방의 깊은 이야기에 잘 반응하고 공감해요. 가벼운 잡담보다는 서로의 가치관이나 생각을 나누는 대화에서 더 편안함을 느끼며, 진지한 분위기를 부담스러워하지 않습니다. 상대방의 진지한 이야기를 경청하고, 자신의 생각도 솔직하게 나누며 깊은 교감을 만들어가요. 피상적인 관계보다는 정신적으로 연결된 깊이 있는 관계를 추구합니다.`
    },
    {
      type: '자유로운 자연인',
      activeTraits: ['구속받지 않는 자유로움', '즉흥적인 성향', '틀에 박히지 않음'],
      passiveTraits: ['편안한 관계 추구', '부담 없는 태도', '자연스러운 흐름 선호'],
      activeDesc: (name: string) => `${name}님은 틀에 박히지 않고 자유롭게 관계를 이어가는 자유로운 영혼입니다. 즉흥적이고 자연스러운 만남을 즐기며, 정해진 룰이나 계획에 얽매이지 않는 것을 선호해요. 부담 없는 관계를 추구하며, 형식보다는 진정성을 중시하고, 인위적인 것보다 자연스러운 흐름을 따라가는 것을 좋아합니다. 만남의 빈도나 방식에 구애받지 않고, 그때그때의 기분과 상황에 따라 유연하게 대처해요. 자유로운 성향 때문에 때로는 예측하기 어렵지만, 그만큼 진정성 있고 편안한 관계를 만들어갑니다.`,
      passiveDesc: (name: string) => `${name}님은 편안하고 부담 없는 관계를 추구하는 자연스러운 스타일입니다. 자연스러운 흐름을 따라가며 강요하지 않는 태도를 보이고, 상대방의 페이스를 존중하며 맞춰줘요. 정해진 규칙이나 약속에 얽매이기보다는, 그때그때 편안한 방식으로 관계를 이어가는 것을 선호합니다. 부담스러운 요구나 기대를 하지 않으며, 서로에게 자유를 주는 관계를 추구해요. 편안함을 중시하기 때문에 억지로 만들어지는 분위기를 싫어하며, 자연스럽게 이어지는 관계를 가장 소중히 여깁니다.`
    },
    {
      type: '세심한 관찰자',
      activeTraits: ['작은 변화도 잘 알아챔', '섬세한 관찰력', '디테일을 중시함'],
      passiveTraits: ['조용히 지켜봄', '상황 파악을 잘함', '눈치가 빠른 편'],
      activeDesc: (name: string) => `${name}님은 상대방의 작은 변화와 감정까지 섬세하게 포착하는 디테일의 달인입니다. 관찰력이 뛰어나 상대방의 말투, 표정, 행동 패턴을 주의 깊게 살피며, 숨은 의미나 감정까지 읽어내요. 디테일을 중시하기 때문에 상대방의 작은 변화도 놓치지 않고, "오늘 좀 피곤해 보이네", "기분 안 좋은 일 있었어?" 같은 세심한 질문을 건넵니다. 상대방이 말하지 않아도 눈치로 파악하는 능력이 있어, 필요한 순간에 적절한 배려나 위로를 제공해요. 섬세한 관찰을 통해 상대방을 깊이 이해하려 노력합니다.`,
      passiveDesc: (name: string) => `${name}님은 조용히 지켜보며 상황을 파악하는 눈치 빠른 관찰자입니다. 말을 많이 하지 않더라도 분위기를 잘 읽고, 상대방의 감정 상태나 상황을 정확히 파악하는 능력이 있어요. 상황 판단이 빠르고 눈치가 있어서, 어색한 순간이나 불편한 분위기를 재빨리 감지하고 적절히 대처합니다. 조용히 지켜보는 것을 선호하지만, 필요한 순간에는 정확한 판단으로 도움을 주는 신뢰할 수 있는 존재예요. 과도하게 나서지 않지만, 항상 상황을 파악하고 있어 안정감을 줍니다.`
    },
    {
      type: '열정적인 도전가',
      activeTraits: ['새로운 시도를 즐김', '모험을 두려워하지 않음', '열정이 넘침'],
      passiveTraits: ['도전을 응원함', '새로운 경험에 열려있음', '긍정적인 마인드'],
      activeDesc: (name: string) => `${name}님은 새로운 것에 도전하고 모험을 즐기는 열정 넘치는 도전가입니다. 안정적인 것보다 새로운 경험을 추구하며, 관계에서도 다양한 시도를 통해 활기를 불어넣어요. 열정이 넘치고 에너지가 많아서, 함께 있으면 지루할 틈이 없고 항상 새로운 일이 벌어집니다. 모험을 두려워하지 않고 적극적으로 도전하며, 실패를 두려워하기보다는 배움의 기회로 삼는 긍정적인 마인드를 가지고 있어요. 관계에서도 루틴에 빠지지 않고 계속해서 새로운 경험을 함께 만들어가며 성장하려 합니다.`,
      passiveDesc: (name: string) => `${name}님은 상대방의 도전을 응원하고 새로운 경험에 열려있는 지지형 도전가입니다. 긍정적인 마인드로 상대방의 새로운 시도를 격려하고, 함께 성장해 나가는 것을 즐거워해요. 변화를 두려워하지 않고 새로운 경험에 열린 자세를 보이며, 상대방이 제안하는 새로운 활동이나 만남 방식을 기꺼이 받아들입니다. 안정보다는 성장과 발전을 중시하며, 함께 도전하고 경험을 쌓아가는 역동적인 관계를 선호해요. 긍정적인 에너지로 상대방에게 용기를 주고, 함께 나아가는 든든한 파트너가 됩니다.`
    }
  ]

  // 랜덤하게 타입 선택
  const type1 = personalityTypes[Math.floor(Math.random() * personalityTypes.length)]
  const type2 = personalityTypes[Math.floor(Math.random() * personalityTypes.length)]
  const isP1Active = countP1 > countP2

  const personalities = {
    [p1]: {
      type: type1.type,
      traits: isP1Active ? type1.activeTraits : type1.passiveTraits,
      description: isP1Active ? type1.activeDesc(p1) : type1.passiveDesc(p1)
    },
    [p2]: {
      type: type2.type,
      traits: !isP1Active ? type2.activeTraits : type2.passiveTraits,
      description: !isP1Active ? type2.activeDesc(p2) : type2.passiveDesc(p2)
    }
  }

  // 상호 인식 분석 (상대방이 나를 어떻게 생각하는지 / 내가 상대방을 어떻게 생각하는지)
  const perceptionTemplates = [
    {
      // 긍정적이고 관심 많은 경우
      thinkingAboutYou: (name: string) => `${name}님은 당신과의 대화를 매우 즐기고 있습니다. 답장 속도가 빠르고, 대화가 끝날 것 같으면 새로운 화제를 꺼내며 대화를 이어가려는 노력이 뚜렷하게 보여요. 특히 당신이 보낸 메시지에 질문으로 답하는 경우가 많아 관심이 높다는 신호입니다. 감정적으로는 호감을 넘어 설레는 단계로 접어든 것으로 보이며, 당신과 더 가까워지고 싶어하는 마음이 대화 곳곳에서 느껴집니다.`,
      youThinkingAbout: (name: string) => `당신은 ${name}님에게 상당한 관심을 가지고 있습니다. 먼저 대화를 시작하는 빈도가 높고, 상대방의 일상에 대한 질문을 자주 하는 패턴이 보여요. 메시지 길이도 상대방보다 긴 편이며, 이모티콘과 ㅋㅋㅋ를 많이 사용해 친근한 분위기를 만들려고 노력하고 있습니다. 대화가 끊기면 불안해하는 듯한 모습도 엿보이며, 상대방의 답장을 기다리는 시간에도 신경을 많이 쓰고 있는 것 같아요.`
    },
    {
      // 편안하고 친근한 경우
      thinkingAboutYou: (name: string) => `${name}님은 당신을 매우 편안한 존재로 여기고 있어요. 일상적인 소소한 이야기도 부담 없이 나누며, 특별히 꾸미지 않은 솔직한 모습을 보여줍니다. 답장 시간이 일정하지 않아도 서로 이해하는 분위기이며, 대화의 주제가 깊이 있거나 가벼워도 자연스럽게 받아들여요. 신뢰감이 쌓여 있어 감정적인 이야기도 종종 공유하는 편이며, 당신을 '편한 사람'으로 분류하고 있을 가능성이 높습니다.`,
      youThinkingAbout: (name: string) => `당신은 ${name}님과 있을 때 가장 자연스러운 모습을 보이고 있어요. 억지로 대화를 이어가려 하지 않아도 편안하게 침묵을 즐길 수 있고, 특별한 이벤트 없이도 일상을 공유하는 것만으로 만족하는 것 같습니다. 상대방에게 좋은 인상을 주려는 과도한 노력보다는, 있는 그대로의 모습을 보여주며 진정성 있는 관계를 만들어가고 있어요. 이런 편안함은 오래 지속될 수 있는 좋은 관계의 기반입니다.`
    },
    {
      // 조심스럽고 신중한 경우
      thinkingAboutYou: (name: string) => `${name}님은 당신에게 조심스럽게 접근하고 있습니다. 답장은 하지만 너무 빠르지도, 너무 늦지도 않은 적절한 타이밍을 유지하며, 감정을 노출하기보다는 사실 위주의 대화를 선호하는 경향이 보여요. 아직 당신을 완전히 신뢰하지는 않지만, 서서히 벽을 허물고 가까워지려는 노력이 느껴집니다. 시간이 지나면서 점차 개인적인 이야기를 꺼내기 시작할 것으로 보이며, 관계 발전 속도는 느리지만 안정적일 것 같습니다.`,
      youThinkingAbout: (name: string) => `당신은 ${name}님에게 신중하게 다가가고 있어요. 너무 빠르게 친해지는 것을 경계하면서도, 조금씩 관심을 표현하는 모습이 보입니다. 상대방의 반응을 살피며 한 발짝씩 다가가는 전략을 취하고 있으며, 거절당할 위험을 최소화하려는 방어적인 태도도 일부 엿보여요. 관계를 발전시키고 싶은 마음은 있지만, 확신이 서기 전까지는 감정을 숨기며 안전한 거리를 유지하려는 것 같습니다.`
    },
    {
      // 관심은 있지만 거리감이 있는 경우
      thinkingAboutYou: (name: string) => `${name}님은 당신에게 관심은 있지만, 명확한 거리를 두고 있습니다. 답장이 불규칙하고, 때로는 짧은 대답으로 대화를 마무리하려는 경향이 보여요. 깊은 감정 교류보다는 표면적인 대화를 유지하며, 당신이 적극적으로 다가올 때는 한 발짝 물러서는 패턴이 관찰됩니다. 아직 당신에 대한 확신이 서지 않았거나, 다른 관심사가 있을 수도 있어요. 현재로서는 '친구' 이상의 감정은 없는 것으로 보이며, 관계 발전을 위해서는 시간과 인내가 필요할 것 같습니다.`,
      youThinkingAbout: (name: string) => `당신은 ${name}님을 좋아하지만, 그 마음을 숨기려고 애쓰는 모습이 역력합니다. 먼저 연락하고 싶지만 참는 경우가 많고, 답장을 받으면 기쁘지만 티를 내지 않으려 노력해요. 밀당을 시도하며 적절한 거리를 유지하려 하지만, 속마음은 더 가까워지고 싶어하는 것이 대화 패턴에서 드러납니다. 거절당하는 것이 두려워 방어적인 태도를 취하고 있으며, 상대방이 먼저 관심을 보여주기를 기다리는 수동적인 자세가 보여요.`
    },
    {
      // 서로 끌리는 경우
      thinkingAboutYou: (name: string) => `${name}님은 당신에게 강하게 끌리고 있습니다. 답장이 거의 즉각적으로 오며, 당신의 작은 농담에도 크게 웃어주고, 당신이 보낸 메시지 하나하나에 정성껏 반응합니다. 대화가 끝날 기미가 보이면 새로운 주제를 꺼내며 계속 이어가려 하고, 당신의 일상에 깊은 관심을 보이며 세세한 부분까지 기억하고 있어요. 감정적으로 상당히 투자하고 있으며, 당신과의 관계를 발전시키고 싶어하는 마음이 대화 곳곳에서 느껴집니다. 이는 매우 긍정적인 신호이며, 다음 단계로 나아갈 준비가 되어 있는 것으로 보입니다.`,
      youThinkingAbout: (name: string) => `당신은 ${name}님에게 완전히 빠져있는 상태입니다. 상대방의 메시지를 손꼽아 기다리고, 답장이 오면 즉시 확인하며, 대화가 끝나면 아쉬워하는 모습이 역력해요. 메시지를 보낼 때도 여러 번 읽어보며 신중하게 작성하고, 상대방이 좋아할 만한 주제를 찾으려 노력합니다. ㅋㅋㅋ와 이모티콘을 적극 활용해 분위기를 띄우려 하고, 상대방의 작은 반응에도 크게 기뻐하는 모습이 보여요. 감정이 고조된 상태이며, 관계를 한 단계 발전시키고 싶어하는 욕구가 강한 것으로 분석됩니다.`
    },
    {
      // 친구 이상의 감정이 생기는 경우
      thinkingAboutYou: (name: string) => `${name}님은 당신을 단순한 친구 이상으로 인식하기 시작했습니다. 최근 대화 패턴을 보면 관심의 깊이와 질이 달라지고 있어요. 예전보다 개인적인 질문이 늘어났고, 당신의 감정 상태에 더 신경 쓰는 모습이 보입니다. 심야 시간대 대화가 증가했고, 감성적인 주제를 꺼내는 빈도도 높아졌어요. 아직 고백이나 명확한 표현은 없지만, 조금씩 마음의 변화가 일어나고 있으며, 당신을 특별한 존재로 여기기 시작한 것으로 보입니다. 이 시기가 관계의 중요한 전환점이 될 수 있습니다.`,
      youThinkingAbout: (name: string) => `당신도 ${name}님을 친구 이상으로 의식하고 있습니다. 대화할 때 더욱 신경 쓰게 되고, 상대방에게 좋은 인상을 남기려는 노력이 이전보다 뚜렷해졌어요. 상대방의 사소한 말에도 의미를 부여하고, 혹시 나를 어떻게 생각할까 고민하는 시간이 늘어났습니다. 대화 주제도 점차 깊어지고 있으며, 상대방과의 공통점을 찾으려는 노력과 함께 특별한 추억을 만들고 싶어하는 욕구가 생겼어요. 감정이 친구에서 연인 사이의 경계선에서 흔들리고 있는 상태입니다.`
    }
  ]

  // 실제 데이터 기반 상호 인식 분석 함수
  function generatePerceptionAnalysis(person: string, target: string, personStats: any, targetStats: any, personCount: number, targetCount: number) {
    const totalMessages = personCount + targetCount
    const personRatio = Math.round((personCount / totalMessages) * 100)

    const personFirstMsg = personStats?.firstMessageCount || 0
    const targetFirstMsg = targetStats?.firstMessageCount || 0

    const personAvgReply = personStats?.avgReplyTime || 0
    const targetAvgReply = targetStats?.avgReplyTime || 0

    const personLaugh = personStats?.laughCount || 0
    const targetLaugh = targetStats?.laughCount || 0

    const personQuestion = personStats?.questionCount || 0
    const targetQuestion = targetStats?.questionCount || 0

    const personInstant = personStats?.instantReplyRate || 0

    // 관계성 분석: 관심도, 소통 스타일, 감정 표현
    let analysis = ''

    // 1. 관심도 및 주도성 분석 (대화 시작 + 메시지 비율)
    if (personFirstMsg > targetFirstMsg * 1.3 && personRatio > 55) {
      analysis += `대화에서 주도적인 역할을 하며 ${target}님과의 소통을 중요하게 여기는 모습이 뚜렷합니다. `
      if (personAvgReply < 30) {
        analysis += `빠른 답장 속도는 ${target}님의 메시지를 기다리고 있음을 보여주며, 관계에 대한 높은 관심을 나타냅니다. `
      }
    } else if (personFirstMsg > targetFirstMsg) {
      analysis += `${target}님에게 먼저 연락하는 경우가 많아 관계 유지에 적극적인 태도를 보입니다. `
      if (personAvgReply < 60) {
        analysis += `적당한 답장 속도로 대화에 성실하게 임하고 있으며, `
      }
    } else {
      analysis += `대화는 상대방이 더 자주 시작하지만, 한번 시작된 대화에는 적극적으로 참여하는 편입니다. `
      if (personRatio > 50) {
        analysis += `실제 메시지 비중을 보면 대화를 이끌어가려는 노력이 보이며, `
      }
    }

    // 2. 감정 표현 및 분위기 조성 (웃음 + 질문)
    const laughRatio = targetLaugh > 0 ? personLaugh / targetLaugh : 1
    const questionRatio = targetQuestion > 0 ? personQuestion / targetQuestion : 1

    if (laughRatio > 1.5 && questionRatio > 1.3) {
      analysis += `${target}님과의 대화를 즐겁게 유지하려는 노력이 돋보이며, 많은 질문을 통해 상대방에 대해 더 알고 싶어하는 호기심도 크게 나타납니다. `
    } else if (laughRatio > 1.3) {
      analysis += `상대방보다 더 자주 웃음을 표현하며 편안하고 즐거운 분위기를 만들려고 노력합니다. `
      if (questionRatio > 1) {
        analysis += `질문을 통해 대화를 이어가며 ${target}님에 대한 관심을 보여주고 있습니다. `
      }
    } else if (questionRatio > 1.5) {
      analysis += `${target}님에 대한 호기심이 많아 질문을 자주 던지며, 상대방을 더 깊이 알아가고 싶어하는 마음이 엿보입니다. `
    } else if (laughRatio > 0.7 && questionRatio > 0.7) {
      analysis += `감정 표현과 질문의 균형이 잘 맞아 대화에서 서로 배려하는 관계로 보입니다. `
    }

    // 3. 답장 패턴 및 소통 스타일
    if (personInstant > 40) {
      analysis += `즉답률이 높아 ${target}님의 메시지에 즉각적으로 반응하며, 대화를 놓치지 않으려는 모습에서 관계에 대한 진심이 느껴집니다.`
    } else if (personAvgReply > 0 && personAvgReply < 30) {
      analysis += `빠른 답장으로 ${target}님과의 소통을 우선시하는 태도를 보이고 있습니다.`
    } else if (personAvgReply >= 30 && personAvgReply < 120) {
      analysis += `신중하게 답장을 작성하는 스타일로, ${target}님에게 신경 쓰며 대화하는 모습이 보입니다.`
    } else if (personAvgReply >= 120) {
      analysis += `답장 시간은 다소 여유 있지만, 대화 내용을 보면 관계를 소중히 여기고 있음을 알 수 있습니다.`
    }

    return analysis.trim()
  }

  // AI 맞춤 공략법 생성 함수
  function generateAttackTip(person: string, target: string, personStats: any, targetStats: any, personCount: number, targetCount: number, personalityType: string) {
    const totalMessages = personCount + targetCount
    const personRatio = Math.round((personCount / totalMessages) * 100)
    const targetRatio = 100 - personRatio

    const personFirstMsg = personStats?.firstMessageCount || 0
    const targetFirstMsg = targetStats?.firstMessageCount || 0
    const personAvgReply = personStats?.avgReplyTime || 0
    const targetAvgReply = targetStats?.avgReplyTime || 0
    const personInstant = personStats?.instantReplyRate || 0
    const targetInstant = targetStats?.instantReplyRate || 0
    const personLaugh = personStats?.laughCount || 0
    const targetLaugh = targetStats?.laughCount || 0
    const personQuestion = personStats?.questionCount || 0
    const targetQuestion = targetStats?.questionCount || 0

    let tip = ''

    // 1. 성향별 기본 접근법
    if (personalityType.includes('적극적인 관심형') || personalityType.includes('열정적인 소통형')) {
      tip += `${target}님은 관심과 애정 표현에 긍정적으로 반응하는 타입입니다. `
      if (personFirstMsg < targetFirstMsg) {
        tip += `상대방이 먼저 연락하는 걸 기다리기보다는, 먼저 연락해서 관심을 표현하면 효과적입니다. `
      }
      if (targetInstant > 30) {
        tip += `빠르게 답장하는 스타일이므로 적극적인 대화로 호감을 높일 수 있어요. `
      }
    } else if (personalityType.includes('쿨한 독립형') || personalityType.includes('자유로운 자연인')) {
      tip += `${target}님은 개인 공간과 자유를 중시하는 타입입니다. `
      if (targetAvgReply > 60) {
        tip += `답장 시간이 다소 여유로운 편이므로, 너무 자주 연락하거나 재촉하지 말고 적절한 거리를 유지하세요. `
      }
      tip += `집착하거나 부담을 주기보다는 여유롭고 쿨한 태도로 접근하는 것이 효과적입니다. `
    } else if (personalityType.includes('따뜻한 공감형') || personalityType.includes('헌신적인 케어형')) {
      tip += `${target}님은 감정적 교감을 중시하는 따뜻한 타입입니다. `
      if (targetQuestion > personQuestion) {
        tip += `상대방이 질문을 많이 하는 편이므로, 솔직하게 마음을 나누고 공감해주는 대화가 중요합니다. `
      }
      tip += `진심 어린 관심과 세심한 배려를 보여주면 마음을 열게 됩니다. `
    } else if (personalityType.includes('유머러스한 분위기메이커')) {
      tip += `${target}님은 즐겁고 유쾌한 관계를 선호하는 타입입니다. `
      if (targetLaugh > totalMessages * 0.3) {
        tip += `웃음이 많은 편이므로 유머와 재치로 즐거운 분위기를 만들면 효과적이에요. `
      }
      tip += `무거운 주제보다는 가볍고 재미있는 대화로 관계를 발전시키세요. `
    } else if (personalityType.includes('진지한 대화형') || personalityType.includes('신중한 분석형')) {
      tip += `${target}님은 깊이 있는 대화와 진정성을 중시하는 타입입니다. `
      if (personStats?.avgMessageLength < targetStats?.avgMessageLength) {
        tip += `상대방보다 짧은 메시지를 보내는 편이므로, 좀 더 구체적이고 진지한 내용으로 대화하면 좋습니다. `
      }
      tip += `가벼운 잡담보다는 의미 있는 주제로 깊이 있게 소통하는 것이 효과적입니다. `
    }

    // 2. 답장 패턴 기반 조언
    if (targetInstant < 20 && targetAvgReply > 60) {
      tip += `답장이 느린 편이지만 이는 신중한 성격 때문일 수 있으니, 재촉하지 말고 기다려주는 여유를 가지세요. `
    } else if (targetInstant > 50) {
      tip += `즉답률이 높아 대화를 중요하게 생각하므로, 빠르게 답장하면서 호흡을 맞추면 좋은 인상을 줄 수 있습니다. `
    }

    // 3. 관심도 불균형 해결
    const initiativeGap = Math.abs(personFirstMsg - targetFirstMsg)
    if (initiativeGap > 20) {
      if (personFirstMsg > targetFirstMsg * 2) {
        tip += `현재 대화를 너무 자주 먼저 시작하고 있어요. 상대방이 먼저 연락할 기회를 주고, 관심의 균형을 맞추는 것이 중요합니다. `
      } else if (targetFirstMsg > personFirstMsg * 2) {
        tip += `상대방이 먼저 연락하는 경우가 많으니, 가끔은 먼저 연락해서 관심을 표현하면 더 좋은 관계로 발전할 수 있어요. `
      }
    }

    // 4. 감정 표현 조언
    const laughGap = Math.abs(personLaugh - targetLaugh) / totalMessages
    if (laughGap > 0.2) {
      if (personLaugh < targetLaugh * 0.5) {
        tip += `상대방이 즐거운 분위기를 만들려 노력하고 있으니, 더 적극적으로 반응하고 웃음으로 화답해주세요. `
      }
    }

    // 5. 최종 조언
    tip += `진심을 담아 꾸준히 소통하되, 상대방의 페이스를 존중하며 천천히 관계를 발전시켜 나가세요.`

    return tip.trim()
  }

  // 두 사람의 통계 데이터
  const p1Stats = analysis?.participants?.[p1]
  const p2Stats = analysis?.participants?.[p2]

  const mutualPerception = {
    [p1]: {
      thinkingAboutYou: '', // 사용 안 함
      youThinkingAbout: generatePerceptionAnalysis(p1, p2, p1Stats, p2Stats, countP1, countP2)
    },
    [p2]: {
      thinkingAboutYou: '', // 사용 안 함
      youThinkingAbout: generatePerceptionAnalysis(p2, p1, p2Stats, p1Stats, countP2, countP1)
    }
  }

  // 각 사람별 맞춤 공략법 생성
  const attackTips = {
    [p1]: generateAttackTip(p1, p2, p1Stats, p2Stats, countP1, countP2, personalities[p1].type),
    [p2]: generateAttackTip(p2, p1, p2Stats, p1Stats, countP2, countP1, personalities[p2].type)
  }

  return {
    score,
    relation: getRelationByScore(score, lang),
    summary: lang === 'ko'
      ? `${p1}님과 ${p2}님의 대화 패턴을 분석한 결과, 서로에게 호감이 있는 것으로 보입니다. 대화 빈도와 반응 속도가 좋은 편이에요.`
      : `Analysis of ${p1} and ${p2}'s conversation patterns shows mutual interest. Communication frequency and response speed are good.`,
    dominance: dominant,
    advice: lang === 'ko'
      ? `현재 좋은 흐름이에요! 하지만 너무 급하게 진도를 빼려 하지 마세요. ${lessActive}님이 대화를 더 많이 주도하고 있어요.`
      : `Things are going well! But don't rush the relationship. ${lessActive} is leading the conversations more.`,
    attackTip: attackTips,
    greenFlags: lang === 'ko' ? [
      '답장 속도가 빠른 편',
      '대화가 끊기지 않고 이어짐',
      '서로 질문을 주고받음',
    ] : [
      'Fast response speed',
      'Continuous conversation flow',
      'Mutual question exchange',
    ],
    redFlags: lang === 'ko' ? [
      '가끔 읽씹이 있음',
    ] : [
      'Occasional read-without-reply',
    ],
    personalities,
    mutualPerception,
  }
}
