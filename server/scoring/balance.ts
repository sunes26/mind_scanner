import type { BalanceFinding, PersonStatsInput, Role, ScoringInput } from '@/types/scoring'
import { MIN_REPLIES, share } from './dimensions'

// 두 사람 사이의 차이를 문장으로 정리한다(관계 균형 진단)와 사람별 조언.
// 문장 속 {A}, {B}는 브라우저에서 실제 이름으로 바뀐다.

const SKEW_THRESHOLD = 0.62
const MAX_FINDINGS = 4
/** 약속 얘기가 이만큼은 있어야 한쪽만 제안한다고 말한다 */
const MIN_PLAN_MESSAGES = 3
const MIN_STARTS = 4
const MIN_QUESTIONS = 8
const percent = (value: number): number => Math.round(value * 100)

interface Scored {
  weight: number
  finding: BalanceFinding
}

function leader(shareOfA: number): Role {
  return shareOfA >= 0.5 ? 'A' : 'B'
}

function skewOf(shareOfA: number): number {
  return Math.max(shareOfA, 1 - shareOfA)
}

function shareFinding(
  shareOfA: number,
  minTotal: boolean,
  texts: { title: string; skewed: (who: Role, pct: number) => string; even: string },
): Scored | null {
  if (!minTotal) return null
  const skew = skewOf(shareOfA)
  return skew >= SKEW_THRESHOLD
    ? { weight: skew, finding: { title: texts.title, text: texts.skewed(leader(shareOfA), percent(skew)), tone: 'note' } }
    : { weight: 0.5 - (skew - 0.5), finding: { title: texts.title, text: texts.even, tone: 'good' } }
}

function replyFinding(a: PersonStatsInput, b: PersonStatsInput): Scored | null {
  if (a.medianReplyMinutes === null || b.medianReplyMinutes === null) return null
  if (a.replyCount < MIN_REPLIES || b.replyCount < MIN_REPLIES) return null
  const slower: Role = a.medianReplyMinutes >= b.medianReplyMinutes ? 'A' : 'B'
  const slow = Math.max(a.medianReplyMinutes, b.medianReplyMinutes)
  const fast = Math.min(a.medianReplyMinutes, b.medianReplyMinutes)
  if (slow >= 10 && slow >= fast * 3) {
    return {
      weight: 0.8,
      finding: {
        title: '답장 속도',
        text: `대화 중 답장 간격은 {${slower}}님 쪽이 더 깁니다(중간값 약 ${Math.round(slow)}분 대 ${Math.round(fast)}분). 생활 패턴 차이일 수 있으니 평소와 달라졌는지를 함께 보세요.`,
        tone: 'note',
      },
    }
  }
  return {
    weight: 0.3,
    finding: { title: '답장 속도', text: '대화가 이어지는 동안 두 사람의 답장 속도는 비슷합니다.', tone: 'good' },
  }
}

function politenessFinding(a: PersonStatsInput, b: PersonStatsInput): Scored | null {
  const polite: Role = a.politeRate > b.politeRate ? 'A' : 'B'
  const politeRate = Math.max(a.politeRate, b.politeRate)
  const casualRate = Math.min(a.politeRate, b.politeRate)
  // 한쪽은 대부분 존댓말, 다른 쪽은 대부분 반말일 때만 말한다
  if (politeRate < 0.6 || casualRate > 0.25) return null
  return {
    weight: 0.6,
    finding: {
      title: '말투',
      text: `{${polite}}님은 존댓말을 주로 쓰고 상대는 반말에 가깝습니다. 나이나 관계에 따른 차이일 수 있지만, 말을 놓는 속도가 서로 다르다는 신호이기도 합니다.`,
      tone: 'note',
    },
  }
}

function trendFinding(a: PersonStatsInput, b: PersonStatsInput): Scored | null {
  const first = a.firstHalfMessages + b.firstHalfMessages
  const second = a.secondHalfMessages + b.secondHalfMessages
  if (first < 10) return null
  const change = second / first - 1
  if (change <= -0.3) {
    return {
      weight: 0.9,
      finding: {
        title: '최근 흐름',
        text: `대화 기간의 뒤쪽 절반은 앞쪽보다 메시지가 ${percent(-change)}% 적습니다. 바빠진 시기인지, 연락이 줄어드는 중인지 살펴볼 만합니다.`,
        tone: 'note',
      },
    }
  }
  if (change >= 0.3) {
    return {
      weight: 0.7,
      finding: {
        title: '최근 흐름',
        text: `대화 기간의 뒤쪽 절반은 앞쪽보다 메시지가 ${percent(change)}% 많습니다. 시간이 갈수록 대화가 늘고 있습니다.`,
        tone: 'good',
      },
    }
  }
  return null
}

export function diagnoseBalance(input: ScoringInput): BalanceFinding[] {
  const { A, B } = input.people

  const candidates: (Scored | null)[] = [
    shareFinding(share(A.conversationStarts, B.conversationStarts), A.conversationStarts + B.conversationStarts >= 4, {
      title: '먼저 말 걸기',
      skewed: (who, pct) =>
        `대화가 끊겼다가 다시 시작될 때 ${pct}%는 {${who}}님이 먼저 말을 걸었습니다. 한쪽이 계속 시작하는 구조가 오래가면 시작하는 쪽이 지치기 쉽습니다.`,
      even: '대화를 먼저 여는 역할을 두 사람이 번갈아 맡고 있습니다.',
    }),
    shareFinding(share(A.questionCount, B.questionCount), A.questionCount + B.questionCount >= 8, {
      title: '질문',
      skewed: (who, pct) =>
        `질문의 ${pct}%가 {${who}}님에게서 나왔습니다. 한 사람이 묻고 다른 사람이 답하는 형태에 가깝습니다.`,
      even: '서로에게 묻는 양이 비슷합니다. 궁금해하는 마음이 양쪽에서 오갑니다.',
    }),
    shareFinding(
      share(A.messageCount * A.avgMessageLength, B.messageCount * B.avgMessageLength),
      A.messageCount + B.messageCount >= 20,
      {
        title: '말의 양',
        skewed: (who, pct) =>
          `전체 글자 수의 ${pct}%를 {${who}}님이 썼습니다. 말수 차이는 성격일 수 있으니, 질문이나 약속으로 이어지는지와 함께 보는 것이 좋습니다.`,
        even: '두 사람이 쓴 글의 양이 비슷합니다.',
      },
    ),
    shareFinding(share(A.conversationEnds, B.conversationEnds), A.conversationEnds + B.conversationEnds >= 4, {
      title: '대화의 마지막',
      skewed: (who, pct) =>
        `대화가 끊기기 직전 마지막 메시지의 ${pct}%는 {${who}}님이 보낸 것입니다. 답을 받지 못하고 끝나는 쪽이 주로 한 사람이라는 뜻입니다.`,
      even: '대화를 마무리하는 쪽이 한 사람으로 정해져 있지 않습니다.',
    }),
    replyFinding(A, B),
    politenessFinding(A, B),
    trendFinding(A, B),
  ]

  return candidates
    .filter((candidate): candidate is Scored => candidate !== null)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, MAX_FINDINGS)
    .map((candidate) => candidate.finding)
}

/** 한 사람에게 주는 조언: 상대에 비해 가장 덜 하고 있는 것 하나를 짚는다 */
export function adviseFor(role: Role, input: ScoringInput): string {
  const self = input.people[role]
  const other = input.people[role === 'A' ? 'B' : 'A']
  const otherRole: Role = role === 'A' ? 'B' : 'A'

  const options: { gap: number; text: string }[] = [
    {
      gap: self.conversationStarts + other.conversationStarts >= 4 ? 0.5 - share(self.conversationStarts, other.conversationStarts) : 0,
      text: `대화를 여는 쪽이 주로 {${otherRole}}님입니다. 이번 주에는 먼저 안부를 물어보세요. 내용이 대단하지 않아도, 먼저 말을 걸었다는 사실이 상대에게 전해집니다.`,
    },
    {
      gap: self.questionCount + other.questionCount >= 8 ? 0.5 - share(self.questionCount, other.questionCount) : 0,
      text: `질문은 {${otherRole}}님이 더 많이 하고 있습니다. 상대가 한 말에서 한 가지를 골라 되물어 보세요. 대답만 할 때보다 대화가 훨씬 길게 이어집니다.`,
    },
    {
      gap:
        self.medianReplyMinutes !== null &&
        other.medianReplyMinutes !== null &&
        self.replyCount >= MIN_REPLIES &&
        other.replyCount >= MIN_REPLIES &&
        self.medianReplyMinutes >= 10
          ? Math.min(0.5, (self.medianReplyMinutes - other.medianReplyMinutes) / 120)
          : 0,
      text: `대화 중 답장이 {${otherRole}}님보다 늦는 편입니다. 바로 답하기 어려울 때는 “지금 바빠서 이따 답할게” 한마디만 남겨도 기다리는 쪽의 마음이 달라집니다.`,
    },
    {
      gap: other.avgMessageLength >= self.avgMessageLength * 2 && self.avgMessageLength < 12 ? 0.3 : 0,
      text: `{${otherRole}}님이 길게 쓰는 데 비해 답이 짧은 편입니다. 길이를 맞출 필요는 없지만, 상대 메시지에서 한 대목을 짚어 반응해 주면 성의가 전해집니다.`,
    },
    {
      gap: other.planMessageCount >= MIN_PLAN_MESSAGES && self.planMessageCount === 0 ? 0.25 : 0,
      text: `만남을 제안하는 쪽이 {${otherRole}}님뿐입니다. 다음에는 가고 싶은 곳이나 날짜를 먼저 꺼내 보세요.`,
    },
  ]

  const best = options.reduce((top, option) => (option.gap > top.gap ? option : top), { gap: 0.12, text: '' })
  if (best.text) return best.text

  const hasEnoughData =
    self.conversationStarts + other.conversationStarts >= MIN_STARTS &&
    self.questionCount + other.questionCount >= MIN_QUESTIONS
  return hasEnoughData
    ? `지금의 주고받는 흐름이 좋습니다. 먼저 말 걸기와 질문을 {${otherRole}}님과 비슷한 만큼 하고 있으니, 이 균형을 유지하면서 대화에서 나온 얘기를 실제 만남으로 이어가 보세요.`
    : '아직 대화가 많지 않아 뚜렷한 차이를 말하기 어렵습니다. 대화가 더 쌓인 뒤 다시 분석하면 누가 먼저 말을 거는지, 질문은 누가 더 하는지가 드러납니다.'
}
