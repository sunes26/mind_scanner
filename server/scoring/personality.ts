import type { PersonStatsInput, PersonalityResult } from '@/types/scoring'
import { share } from './dimensions'

// 한 사람의 통계에서 가장 두드러진 특징을 골라 대화 성향 유형을 정한다.
// 각 유형은 "기준값 대비 얼마나 두드러지는가(salience)"로 비교하며, 1 이상이어야 후보가 된다.

interface Candidate {
  type: string
  trait: string
  salience: number
  describe: () => string
}

const per100 = (count: number, messages: number): number => (messages > 0 ? (count / messages) * 100 : 0)
const round = (value: number): number => Math.round(value)

const FALLBACK: Omit<Candidate, 'salience'> = {
  type: '균형 잡힌 안정형',
  trait: '치우침 없는 말투',
  describe: () =>
    '어느 한 가지가 유난히 튀지 않고 고르게 대화합니다. 질문, 답장, 리액션이 비슷한 비중으로 섞여 있어 상대가 편하게 느끼기 쉬운 스타일입니다.',
}

function buildCandidates(self: PersonStatsInput, other: PersonStatsInput): Candidate[] {
  const messages = self.messageCount
  const questionsPer100 = per100(self.questionCount, messages)
  const reactionsPer100 = per100(self.laughCount + self.emojiCount, messages)
  const startShare = share(self.conversationStarts, other.conversationStarts)
  const lengthRatio = other.avgMessageLength > 0 ? self.avgMessageLength / other.avgMessageLength : 1
  const lateNightPer100 = per100(self.lateNightMessages, messages)
  const affectionPer100 = per100(self.affectionWordCount + self.heartEmojiCount, messages)
  const burstsPer100 = per100(self.burstCount, messages)
  const plansPer100 = per100(self.planMessageCount, messages)
  const replyMinutes = self.medianReplyMinutes

  return [
    {
      type: '궁금한 게 많은 질문형',
      trait: '질문으로 대화를 이어감',
      salience: questionsPer100 / 30,
      describe: () =>
        `메시지 100개 중 ${round(questionsPer100)}개꼴로 물음표가 들어 있습니다. 상대의 하루와 생각을 자주 묻고, 대답을 듣고 다시 묻는 식으로 대화를 이어 갑니다.`,
    },
    {
      type: '리액션이 풍부한 공감형',
      trait: '웃음과 이모지가 많음',
      salience: reactionsPer100 / 35,
      describe: () =>
        `웃음 표현과 이모지가 메시지 100개당 ${round(reactionsPer100)}번 나옵니다. 상대의 말에 바로 반응을 돌려주어, 대화가 일방적으로 느껴지지 않게 만드는 스타일입니다.`,
    },
    {
      type: '먼저 챙기는 리드형',
      trait: '먼저 말을 거는 편',
      salience: self.conversationStarts + other.conversationStarts >= 4 ? startShare / 0.6 : 0,
      describe: () =>
        `대화가 끊겼다가 다시 시작될 때 ${round(startShare * 100)}%는 이쪽에서 먼저 말을 걸었습니다. 안부를 묻거나 화제를 꺼내며 대화를 여는 역할을 맡고 있습니다.`,
    },
    {
      type: '정성 가득 장문형',
      trait: '한 번에 길게 씀',
      // 상대보다 길다는 이유만으로 장문형이 되지 않도록, 절대 길이가 어느 정도 될 때만 비율을 본다
      salience: Math.max(self.avgMessageLength / 28, self.avgMessageLength >= 15 ? lengthRatio / 1.5 : 0),
      describe: () =>
        `메시지 하나가 평균 ${round(self.avgMessageLength)}자입니다. 생각을 한 번에 정리해 보내는 편이라, 짧게 여러 번 보내는 상대와는 리듬이 다르게 느껴질 수 있습니다.`,
    },
    {
      type: '간결한 핵심형',
      trait: '짧고 빠르게 말함',
      salience: self.avgMessageLength > 0 ? 9 / self.avgMessageLength : 0,
      describe: () =>
        `메시지 하나가 평균 ${round(self.avgMessageLength)}자로 짧습니다. 길게 설명하기보다 핵심만 주고받는 스타일이며, 짧다고 해서 관심이 적다는 뜻은 아닙니다.`,
    },
    {
      type: '바로바로 칼답형',
      trait: '답장이 빠름',
      salience: replyMinutes !== null && self.replyCount >= 5 ? (3 / Math.max(replyMinutes, 0.5)) * self.quickReplyRate : 0,
      describe: () =>
        `대화가 이어지는 동안 답장의 ${round(self.quickReplyRate * 100)}%가 5분 안에 왔습니다. 대화에 들어오면 흐름을 끊지 않고 붙어 있는 편입니다.`,
    },
    {
      type: '느긋한 마이페이스형',
      trait: '자기 속도로 답함',
      salience: replyMinutes !== null && self.replyCount >= 5 ? replyMinutes / 30 : 0,
      describe: () =>
        `대화 중 답장 간격의 중간값이 약 ${round(replyMinutes ?? 0)}분입니다. 바로 답하기보다 자기 일을 하다가 여유가 생길 때 답하는 스타일로 보입니다.`,
    },
    {
      type: '밤에 깊어지는 올빼미형',
      trait: '늦은 밤에 활발함',
      salience: lateNightPer100 / 25,
      describe: () =>
        `메시지 100개 중 ${round(lateNightPer100)}개가 밤 11시에서 새벽 2시 사이에 보낸 것입니다. 하루를 마친 뒤 느긋하게 이야기하는 시간을 좋아하는 편입니다.`,
    },
    {
      type: '마음을 말로 하는 표현형',
      trait: '다정한 말을 아끼지 않음',
      salience: affectionPer100 / 8,
      describe: () =>
        `다정한 표현이나 하트가 메시지 100개당 ${round(affectionPer100)}번 나옵니다. 좋다는 마음을 돌려 말하지 않고 글로 직접 전하는 편입니다.`,
    },
    {
      type: '생각나는 대로 연타형',
      trait: '연달아 여러 개 보냄',
      salience: burstsPer100 / 6,
      describe: () =>
        `한 번에 세 개 이상 연달아 보낸 경우가 ${self.burstCount}번 있습니다. 떠오르는 대로 나눠 보내는 스타일이어서 대화에 속도감이 있습니다.`,
    },
    {
      type: '약속을 만드는 실행형',
      trait: '만남을 먼저 제안함',
      salience: self.planMessageCount > other.planMessageCount ? plansPer100 / 6 : 0,
      describe: () =>
        `만나자거나 시간을 묻는 메시지가 ${self.planMessageCount}번으로 상대보다 많습니다. 대화를 대화로 끝내지 않고 실제 만남으로 이어가려는 편입니다.`,
    },
  ]
}

const TRAIT_COUNT = 3
/** 보조 특징으로 보여 줄 최소 두드러짐 */
const TRAIT_MIN_SALIENCE = 0.7
// 함께 나올 수 없는 유형 쌍 (하나가 대표 유형이면 다른 하나는 특징에서 뺀다)
const OPPOSITES: Record<string, string> = {
  '정성 가득 장문형': '간결한 핵심형',
  '간결한 핵심형': '정성 가득 장문형',
  '바로바로 칼답형': '느긋한 마이페이스형',
  '느긋한 마이페이스형': '바로바로 칼답형',
}

export function classifyPersonality(self: PersonStatsInput, other: PersonStatsInput): PersonalityResult {
  if (self.messageCount === 0) {
    return { type: FALLBACK.type, traits: [FALLBACK.trait], description: FALLBACK.describe() }
  }

  const ranked = buildCandidates(self, other)
    .filter((candidate) => Number.isFinite(candidate.salience))
    .sort((a, b) => b.salience - a.salience)
  const [top] = ranked
  const main = top && top.salience >= 1 ? top : { ...FALLBACK, salience: 1 }
  const supporting = ranked
    .filter(
      (candidate) =>
        candidate.type !== main.type &&
        candidate.type !== OPPOSITES[main.type] &&
        candidate.salience >= TRAIT_MIN_SALIENCE,
    )
    .map((candidate) => candidate.trait)

  return { type: main.type, traits: [main.trait, ...supporting].slice(0, TRAIT_COUNT), description: main.describe() }
}
