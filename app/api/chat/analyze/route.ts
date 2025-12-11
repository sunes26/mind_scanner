import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// 시스템 프롬프트 - 연애 심리 전문가 페르소나
const SYSTEM_PROMPT = `너는 "연애 심리 분석가 닥터 하트"야. 
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
- 답장 속도 차이
- 메시지 길이 차이
- 질문을 더 많이 하는 쪽
- 이모티콘/ㅋㅋ 사용량 (많이 쓰는 쪽이 더 관심 있음)

## 응답 규칙
- 반드시 지정된 JSON 형식으로만 응답
- 이모지를 적극 활용
- 한국어로 응답
- 분석 내용은 2-3문장으로 간결하게`

// 분석 요청 프롬프트 생성
function createAnalysisPrompt(data: {
  text: string
  p1: string
  p2: string
  countP1: number
  countP2: number
  analysisData?: string
}): string {
  const { text, p1, p2, countP1, countP2, analysisData } = data
  
  // 대화 샘플 추출 (최근 대화 위주)
  const recentChat = text.slice(-8000)
  
  return `## 분석 대상
- 참여자 1: "${p1}" (메시지 ${countP1}개)
- 참여자 2: "${p2}" (메시지 ${countP2}개)
- 총 메시지: ${countP1 + countP2}개

## 상세 분석 데이터
${analysisData || '(상세 데이터 없음)'}

## 대화 내용 샘플 (최근 대화)
\`\`\`
${recentChat}
\`\`\`

## 요청사항
위 데이터를 바탕으로 두 사람의 관계를 분석해줘.

반드시 아래 JSON 형식으로만 응답해:
{
  "score": (0-100 사이 정수, 호감도 점수),
  "relation": "(관계 상태를 재미있게 한 줄로 표현, 예: '🍭 달달한 썸 진행 중', '🔥 연인 확정 직전')",
  "summary": "(전체적인 관계 분석 요약, 2-3문장)",
  "dominance": "(주도권을 가진 사람 이름: ${p1} 또는 ${p2})",
  "dominanceReason": "(주도권 분석 이유, 데이터 기반으로 2문장)",
  "advice": "(현재 관계에서 주의할 점이나 조언, 2문장)",
  "attackTip": "(상대방 마음을 사로잡는 구체적인 공략 팁, 2-3문장)",
  "greenFlags": ["긍정 신호 1", "긍정 신호 2", "긍정 신호 3"],
  "redFlags": ["주의 신호 1", "주의 신호 2"] 
}

주의: JSON 형식만 응답하고, 다른 설명은 추가하지 마.`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, p1, p2, countP1, countP2, analysisData } = body

    if (!text) {
      return NextResponse.json(
        { error: '대화 내용이 필요합니다.' },
        { status: 400 }
      )
    }

    // API 키 확인
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured')
      // API 키가 없으면 목업 데이터 반환
      return NextResponse.json(generateMockResult(p1, p2, countP1, countP2))
    }

    const prompt = createAnalysisPrompt({
      text,
      p1,
      p2,
      countP1,
      countP2,
      analysisData,
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0].message.content
    
    if (!content) {
      throw new Error('Empty response from OpenAI')
    }

    const result = JSON.parse(content)

    // 응답 검증 및 기본값 설정
    const validatedResult = {
      score: Math.min(100, Math.max(0, result.score || 70)),
      relation: result.relation || '분석 중...',
      summary: result.summary || '',
      dominance: result.dominance || p1,
      dominanceReason: result.dominanceReason || result.advice || '',
      advice: result.advice || '',
      attackTip: result.attackTip || '',
      greenFlags: result.greenFlags || [],
      redFlags: result.redFlags || [],
    }

    return NextResponse.json(validatedResult)
    
  } catch (error) {
    console.error('Analysis error:', error)
    
    // 에러 발생 시 목업 데이터 반환
    const body = await request.json().catch(() => ({}))
    return NextResponse.json(
      generateMockResult(
        body.p1 || '사람1',
        body.p2 || '사람2',
        body.countP1 || 100,
        body.countP2 || 100
      )
    )
  }
}

// 목업 결과 생성 함수
function generateMockResult(p1: string, p2: string, countP1: number, countP2: number) {
  const total = countP1 + countP2
  const balance = 1 - Math.abs(countP1 - countP2) / total
  const baseScore = Math.floor(balance * 30) + 55
  const score = Math.min(95, baseScore + Math.floor(Math.random() * 15))
  
  const dominant = countP1 > countP2 ? p2 : p1
  const lessActive = countP1 > countP2 ? p1 : p2
  
  const relations = [
    '🍭 달달한 썸 진행 중',
    '💕 서로 호감 있는 사이',
    '🔥 연인 확정 직전',
    '👀 밀당 중인 관계',
    '💗 설레는 시작 단계',
  ]
  
  const tips = [
    `${dominant}님이 좋아하는 주제로 대화를 이끌어보세요. 공통 관심사를 찾으면 급진전!`,
    `밤 10시 이후 감성적인 대화를 시도해보세요. 이 시간대에 호감도가 2배로 올라갑니다!`,
    `가끔은 먼저 연락하지 말고 기다려보세요. 밀당의 기본은 '밀기'입니다!`,
    `이모티콘과 ㅋㅋㅋ를 적절히 섞어서 사용하세요. 너무 진지하면 부담스러워해요.`,
  ]
  
  return {
    score,
    relation: relations[Math.floor(Math.random() * relations.length)],
    summary: `${p1}님과 ${p2}님의 대화 패턴을 분석한 결과, 서로에게 호감이 있는 것으로 보입니다. 대화 빈도와 반응 속도가 좋은 편이에요.`,
    dominance: dominant,
    dominanceReason: `${lessActive}님이 대화를 더 많이 주도하고 있어요. ${dominant}님의 답장이 더 빠르고 이모티콘 사용이 많은 것으로 보아 관심이 높습니다.`,
    advice: `현재 좋은 흐름이에요! 하지만 너무 급하게 진도를 빼려 하지 마세요. 자연스러운 흐름이 중요합니다.`,
    attackTip: tips[Math.floor(Math.random() * tips.length)],
    greenFlags: [
      '답장 속도가 빠른 편',
      '대화가 끊기지 않고 이어짐',
      '서로 질문을 주고받음',
    ],
    redFlags: [
      '가끔 읽씹이 있음',
    ],
  }
}