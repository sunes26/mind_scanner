import type { Metadata } from 'next'
import Link from 'next/link'
import SampleReport from '@/components/SampleReport'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import JsonLd from '@/components/site/JsonLd'
import { SAMPLE_CHAT_TEXT } from '@/data/sampleChat'
import { buildSampleReport } from '@/data/sampleReport'
import { SITE_URL, absoluteUrl, pageSeo } from '@/config/seo'

const TITLE = '샘플 리포트 - 카카오톡 대화 분석 결과 예시'
const DESCRIPTION =
  '가상의 두 사람이 3주 동안 나눈 카카오톡 대화로 만든 분석 리포트 예시입니다. 메시지 비율, 평균 답장 시간, 질문 횟수, 선톡 횟수가 어떻게 계산되고 어떻게 읽는지 항목별로 설명합니다.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...pageSeo({ title: TITLE, description: DESCRIPTION, path: '/sample' }),
}

const PREVIEW_LINE_COUNT = 14

function formatReplyTime(minutes: number | undefined): string {
  if (minutes === undefined) return '-'
  if (minutes < 1) return '1분 미만'
  if (minutes < 60) return `약 ${minutes}분`
  return `약 ${Math.round(minutes / 60)}시간`
}

export default function SamplePage() {
  const { chatData, result } = buildSampleReport()
  const { p1, p2, analysis } = chatData
  const stats1 = analysis?.participants[p1]
  const stats2 = analysis?.participants[p2]
  const previewLines = SAMPLE_CHAT_TEXT.split('\n')
    .filter((line) => line.trim().length > 0)
    .slice(0, PREVIEW_LINE_COUNT)

  const percent = (count: number) => (chatData.total > 0 ? Math.round((count / chatData.total) * 100) : 0)

  const rows: { label: string; how: string; v1: string; v2: string }[] = [
    {
      label: '메시지 수 (비율)',
      how: '사진·이모티콘 스티커·입장 알림을 뺀 메시지를 사람별로 셉니다.',
      v1: `${chatData.countP1}개 (${percent(chatData.countP1)}%)`,
      v2: `${chatData.countP2}개 (${percent(chatData.countP2)}%)`,
    },
    {
      label: '평균 답장 시간',
      how: '상대 메시지 바로 다음에 보낸 내 메시지까지의 간격을 평균합니다. 24시간이 넘는 간격은 뺍니다.',
      v1: formatReplyTime(stats1?.avgReplyTime),
      v2: formatReplyTime(stats2?.avgReplyTime),
    },
    {
      label: '평균 글자 수',
      how: '보낸 글자 수 합계를 메시지 수로 나눕니다.',
      v1: `${stats1?.avgMessageLength ?? 0}자`,
      v2: `${stats2?.avgMessageLength ?? 0}자`,
    },
    {
      label: '질문 횟수',
      how: '물음표가 들어간 메시지를 셉니다. 물음표 없이 묻는 말은 세지 못합니다.',
      v1: `${stats1?.questionCount ?? 0}회`,
      v2: `${stats2?.questionCount ?? 0}회`,
    },
    {
      label: '대화 시작 횟수 (선톡)',
      how: '3시간 이상 대화가 없다가 처음 보낸 메시지를 대화 시작으로 셉니다.',
      v1: `${stats1?.firstMessageCount ?? 0}회`,
      v2: `${stats2?.firstMessageCount ?? 0}회`,
    },
    {
      label: '웃음 표현',
      how: 'ㅋㅋ, ㅎㅎ처럼 두 글자 이상 이어진 웃음 덩어리의 개수입니다. ㅋ의 길이는 재지 않습니다.',
      v1: `${stats1?.laughCount ?? 0}회`,
      v2: `${stats2?.laughCount ?? 0}회`,
    },
    {
      label: '이모지',
      how: '글자로 입력한 이모지만 셉니다. 카카오 이모티콘 스티커는 파일에 “이모티콘”이라고만 남아 제외됩니다.',
      v1: `${stats1?.emojiCount ?? 0}개`,
      v2: `${stats2?.emojiCount ?? 0}개`,
    },
    {
      label: '심야 메시지',
      how: '밤 11시부터 새벽 2시 사이에 보낸 메시지 수입니다.',
      v1: `${stats1?.lateNightMessages ?? 0}개`,
      v2: `${stats2?.lateNightMessages ?? 0}개`,
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${absoluteUrl('/sample')}#webpage`,
        url: absoluteUrl('/sample'),
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: 'ko-KR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '샘플 리포트', item: absoluteUrl('/sample') },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <section className="neo-card bg-white rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl text-black mb-4">샘플 리포트: 분석 결과는 이렇게 나옵니다</h1>
          <p className="text-gray-800 text-lg leading-relaxed">
            아래 리포트는 <strong>가상의 두 사람(지우, 민준)</strong>이 3주 동안 나눈 대화 {chatData.total}개로 만들었습니다.
            등장인물과 대화 내용은 모두 지어낸 것이고, 통계는 실제 서비스와 똑같은 방식으로 이 파일에서 계산했습니다.
            파일을 올리기 전에 어떤 결과를 받게 되는지 확인해 보세요.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/" className="neo-btn bg-[#FFD233] px-5 py-3 rounded-xl font-bold">
              내 대화 파일로 분석하기
            </Link>
            <a href="/sample/sample-chat.txt" download className="neo-btn bg-white px-5 py-3 rounded-xl font-bold">
              샘플 대화 파일(.txt) 내려받기
            </a>
          </div>
        </section>

        <section id="chat-file" className="neo-card bg-white rounded-2xl p-6 md:p-8" aria-labelledby="chat-file-heading">
          <h2 id="chat-file-heading" className="text-2xl text-black mb-3">
            1. 분석에 쓰인 대화 파일
          </h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            PC 카카오톡에서 대화를 내보내면 아래처럼 한 줄에 날짜, 시간, 보낸 사람, 내용이 들어 있는 텍스트 파일이
            만들어집니다. 속마음 스캐너는 이 형식을 읽어 누가 언제 무엇을 보냈는지 파악합니다.
          </p>
          <pre className="bg-gray-900 text-gray-100 text-xs md:text-sm rounded-xl p-4 overflow-x-auto leading-relaxed">
            {previewLines.join('\n')}
          </pre>
          <p className="text-sm text-gray-600 mt-3">
            전체 {chatData.total}개 메시지 중 앞부분입니다. 대화 기간은 {analysis?.totalDays ?? 0}일입니다.
          </p>
        </section>

        <section id="stats" className="neo-card bg-white rounded-2xl p-6 md:p-8" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="text-2xl text-black mb-3">
            2. 파일에서 계산한 통계와 계산 방법
          </h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            아래 숫자는 AI가 추정한 값이 아니라 파일을 그대로 센 결과입니다. 같은 파일을 올리면 언제나 같은 값이
            나옵니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-black text-sm md:text-base">
              <thead className="bg-[#FFD233]">
                <tr>
                  <th scope="col" className="border-2 border-black p-3 text-left">
                    항목
                  </th>
                  <th scope="col" className="border-2 border-black p-3 text-left">
                    {p1}
                  </th>
                  <th scope="col" className="border-2 border-black p-3 text-left">
                    {p2}
                  </th>
                  <th scope="col" className="border-2 border-black p-3 text-left">
                    계산 방법
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="border-2 border-black p-3 text-left font-bold">
                      {row.label}
                    </th>
                    <td className="border-2 border-black p-3 whitespace-nowrap">{row.v1}</td>
                    <td className="border-2 border-black p-3 whitespace-nowrap">{row.v2}</td>
                    <td className="border-2 border-black p-3 text-gray-700">{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="report" aria-labelledby="report-heading">
          <div className="neo-card bg-white rounded-2xl p-6 md:p-8 mb-6">
            <h2 id="report-heading" className="text-2xl text-black mb-3">
              3. 실제 리포트 화면
            </h2>
            <p className="text-gray-800 leading-relaxed">
              여기부터는 분석을 마쳤을 때 보게 되는 화면 그대로입니다. 그래프와 숫자는 위 통계로 그려지고,
              &lsquo;종합 애정 지수&rsquo;와 SECRET REPORT의 성향·진단·조언도 통계를 정해진 규칙으로 계산한 결과입니다.
              같은 파일을 올리면 언제나 같은 결과가 나옵니다. 실제 서비스에서는 맨 아래에서 원할 때만 AI 코멘트를
              추가로 받을 수 있습니다.
            </p>
          </div>
          <SampleReport result={result} chatData={chatData} />
        </section>

        <section className="neo-card bg-white rounded-2xl p-6 md:p-8" aria-labelledby="reading-heading">
          <h2 id="reading-heading" className="text-2xl text-black mb-4">
            4. 이 리포트를 읽는 법
          </h2>
          <div className="space-y-5 text-gray-800 leading-relaxed">
            <div>
              <h3 className="font-sans font-bold text-lg text-black">메시지 비율이 거의 반반이다</h3>
              <p>
                {p1} {percent(chatData.countP1)}%, {p2} {percent(chatData.countP2)}%로 한쪽이 일방적으로 말하는 대화가
                아닙니다. 비율이 크게 기울어 있다면 한 사람이 대화를 끌고 가고 있다는 뜻일 수 있지만, 말수가 적은
                성격일 수도 있으니 다른 지표와 함께 봅니다.
              </p>
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-black">대화는 민준이 더 자주 시작한다</h3>
              <p>
                선톡 횟수는 민준 {analysis?.participants['민준']?.firstMessageCount ?? 0}회, 지우{' '}
                {analysis?.participants['지우']?.firstMessageCount ?? 0}회입니다. 한쪽이 더 많이 시작하더라도 다른
                쪽도 꾸준히 먼저 말을 건다면 건강한 범위입니다. 한 사람만 계속 시작한다면 그때는 이야기를 나눠 볼
                만합니다.
              </p>
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-black">답장 시간은 평균보다 맥락을 본다</h3>
              <p>
                표의 평균 답장 시간은 {p1} {formatReplyTime(stats1?.avgReplyTime)}, {p2} {formatReplyTime(stats2?.avgReplyTime)}입니다. 대화를 읽어 보면 대부분 몇 분 안에 답하는데도 평균이 이렇게 길게 나오는 것은, 평균이 한두 번의 긴 공백에 크게 흔들리기 때문입니다. 야근한
                날이나 자는 시간처럼 이유가 분명한 공백은 관심과 무관하므로, 평소 패턴에서 벗어난 변화가 있는지를
                보는 편이 낫습니다.
              </p>
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-black">점수는 대화 습관을 요약한 숫자다</h3>
              <p>
                종합 애정 지수는 주고받는 균형, 답장 반응, 대화 참여, 감정 표현, 연락의 꾸준함, 최근 흐름을 종합해
                계산합니다. 대화가 얼마나 고르게, 활발하게 오가는지를 나타낼 뿐 상대의 마음을 재는 값은 아닙니다. 읽음
                여부, 사진, 통화, 실제로 만나서 보낸 시간은 파일에 없으므로 반영되지 않습니다. 결과가 마음에 걸린다면
                상대에게 직접 묻는 것이 가장 정확합니다.
              </p>
            </div>
          </div>
          <p className="mt-6 text-gray-800">
            지표를 더 자세히 알고 싶다면{' '}
            <Link href="/blog" className="underline text-blue-700">
              블로그의 지표별 해설
            </Link>
            을, 데이터가 어떻게 처리되는지는{' '}
            <Link href="/privacy" className="underline text-blue-700">
              개인정보처리방침
            </Link>
            을 참고하세요.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
