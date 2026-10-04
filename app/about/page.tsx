import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, ExternalLink, Brain, Shield, AlertCircle, Code, Calculator } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import JsonLd from '@/components/site/JsonLd'
import { SITE_URL, absoluteUrl, pageSeo, siteConfig } from '@/config/seo'

const TITLE = '서비스 소개'
const DESCRIPTION =
  '속마음 스캐너를 만든 이유, 대화 파일에서 계산하는 항목, 점수와 진단을 만드는 방식, 분석의 한계, 대화 데이터 처리 방식, 문의처를 설명합니다.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...pageSeo({ title: TITLE, description: DESCRIPTION, path: '/about' }),
}

const CARD_CLASS = 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 md:p-8'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${absoluteUrl('/about')}#webpage`,
      url: absoluteUrl('/about'),
      name: `${siteConfig.name} ${TITLE}`,
      description: DESCRIPTION,
      inLanguage: 'ko-KR',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#publisher` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: TITLE, item: absoluteUrl('/about') },
      ],
    },
  ],
}

export default function AboutPage() {
  const { author } = siteConfig

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <div className={CARD_CLASS}>
          <h1 className="text-4xl font-bold text-black mb-4">서비스 소개</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            속마음 스캐너는 카카오톡에서 내보낸 대화 파일(.txt)로 두 사람의 대화 통계를 계산하고, 그 통계를 바탕으로
            정해진 규칙에 따라 애정 지수와 대화 성향을 진단해 주는 무료 웹 도구입니다. 대화 내용은 브라우저 밖으로
            나가지 않습니다. 이 페이지에서는 만든 이유, 계산 방식, 한계, 데이터 처리 방식을 있는 그대로 설명합니다.
          </p>
        </div>

        <section className={CARD_CLASS}>
          <h2 className="text-2xl font-bold text-black mb-4">왜 만들었나요?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            안녕하세요, 1인 개발자 {author.name}입니다. 저도 카톡 대화를 보며 &ldquo;이 사람이 나를 좋아하는 걸까?&rdquo;를
            되풀이해 고민한 적이 있습니다. 친구들에게 물어봐도 &ldquo;그냥 좋아하는 것 같은데?&rdquo; 같은 감상밖에 돌아오지
            않았습니다.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            그래서 답장 시간, 질문 횟수, 누가 먼저 말을 거는지처럼 <strong>실제로 셀 수 있는 것</strong>을 세어 보면 적어도
            막연한 느낌보다는 나은 참고 자료가 되지 않을까 생각했습니다. 그것이 속마음 스캐너의 시작입니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            2025년 10월에 처음 공개했고, 혼자 기획·개발·운영하고 있습니다.
          </p>
        </section>

        <section className={CARD_CLASS}>
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <Calculator className="w-6 h-6" aria-hidden="true" /> 파일에서 직접 계산하는 것
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            아래 항목은 추정이 아니라 대화 파일을 그대로 센 값입니다. 계산은 이용자의 브라우저에서 이루어집니다.
          </p>
          <ul className="space-y-2 text-gray-700 list-disc pl-6">
            <li><strong>메시지 수와 비율</strong>: 두 사람이 각각 보낸 메시지 수</li>
            <li><strong>평균 답장 시간</strong>: 상대 메시지 다음에 보낸 내 메시지까지의 간격 평균(24시간 초과 제외)</li>
            <li>
              <strong>답장 간격의 중간값</strong>: 대화 중 답장 간격의 가운데 값. 3시간 넘는 공백은 답장이 아니라 새
              대화로 봅니다.
            </li>
            <li><strong>5분 내 답장 비율</strong>: 상대 메시지를 받고 5분 안에 답한 비율</li>
            <li><strong>평균 글자 수</strong>: 메시지 하나의 평균 길이</li>
            <li><strong>질문 횟수</strong>: 물음표가 들어간 메시지 수</li>
            <li><strong>대화 시작 횟수</strong>: 3시간 이상 공백 뒤 먼저 말을 건 횟수</li>
            <li><strong>마지막 메시지</strong>: 대화의 마지막 메시지를 보낸 횟수</li>
            <li><strong>이모지·웃음 표현</strong>: 글자로 입력한 이모지 수, ㅋㅋ·ㅎㅎ 횟수</li>
            <li><strong>약속을 꺼낸 메시지 수</strong>: 만남이나 일정을 제안하는 표현이 든 메시지 수</li>
            <li><strong>존댓말 비율</strong>: 존댓말로 쓴 메시지의 비율</li>
            <li><strong>시간대별 대화량</strong>: 새벽·오전·오후·저녁 분포와 심야(밤 11시~새벽 2시) 메시지 수</li>
            <li><strong>대화 기간의 앞·뒤 절반</strong>: 앞쪽 절반과 뒤쪽 절반 기간의 메시지 수(최근 흐름 비교)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            실제 결과 화면은{' '}
            <Link href="/sample" className="underline text-blue-700">
              샘플 리포트
            </Link>
            에서 볼 수 있습니다.
          </p>
        </section>

        <section className={CARD_CLASS}>
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6" aria-hidden="true" /> 점수와 진단은 어떻게 만드나요
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            종합 애정 지수(0~100), 관심도 지수, 항목별 진단, 대화 성향 유형, 관계 균형 진단, 맞춤 조언은 AI가 쓰지 않고
            <strong> 정해진 규칙으로 서버가 계산</strong>합니다. 브라우저가 보낸 숫자 통계만 사용하므로 같은 파일은 항상
            같은 결과를 내고, 결과도 거의 바로 나옵니다.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            항목별 진단은 주고받는 균형, 답장 반응, 대화 참여, 감정 표현, 연락의 꾸준함, 최근 흐름 여섯 가지를 각각
            높음·보통·낮음으로 보여 줍니다. 정확한 계산식과 가중치는 공개하지 않습니다. 이 부분은 측정이라기보다 통계를
            해석하는 하나의 기준으로 봐 주세요.
          </p>
          <p className="text-gray-700 leading-relaxed">
            AI는 선택 기능입니다. 리포트 맨 아래의 &ldquo;AI 코멘트 받기&rdquo; 버튼을 눌렀을 때만 같은 숫자 통계가
            OpenAI의 <strong>gpt-4o-mini</strong> 모델에 전달되어 3~4문장의 코멘트를 받습니다. 이때도 대화 내용과 이름은
            전달되지 않습니다.
          </p>
        </section>

        <section className={CARD_CLASS}>
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-orange-500" aria-hidden="true" /> 분석의 한계
          </h2>
          <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-5 mb-4">
            <p className="text-gray-700 leading-relaxed">
              분석 결과는 <strong>참고 자료</strong>입니다. 상대의 마음을 판정하지 못하며, 연애 상담이나 심리 전문
              서비스를 대신할 수 없습니다.
            </p>
          </div>
          <ul className="space-y-3 text-gray-700 list-disc pl-6">
            <li>내보내기 파일에는 읽음 여부가 없어 읽씹·안읽씹은 알 수 없습니다.</li>
            <li>사진, 동영상, 카카오 이모티콘 스티커는 통계에서 제외됩니다.</li>
            <li>통화, 만남, 표정과 목소리 같은 오프라인 요소는 반영되지 않습니다.</li>
            <li>성격, 직업, 생활 패턴에 따라 답장 시간 같은 지표는 크게 달라집니다.</li>
            <li>메시지가 20개 미만이면 분석하지 않으며, 대화가 짧을수록 통계가 불안정합니다.</li>
            <li>두 사람의 대화를 기준으로 만들었습니다. 단톡방 파일은 메시지가 가장 많은 두 사람만 분석합니다.</li>
          </ul>
        </section>

        <section className={CARD_CLASS}>
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-600" aria-hidden="true" /> 대화 데이터는 어떻게 처리되나요?
          </h2>
          <ul className="space-y-2 text-gray-700 list-disc pl-6">
            <li>파일은 브라우저에서 읽고, 통계도 브라우저에서 계산합니다. 대화 내용과 참여자 이름은 브라우저 밖으로 나가지 않습니다.</li>
            <li>서버에는 숫자 통계(횟수와 비율, 두 사람은 A와 B로 표시)만 전달되며, 서버가 규칙으로 점수와 진단을 계산합니다.</li>
            <li>&ldquo;AI 코멘트 받기&rdquo; 버튼을 누를 때만 같은 숫자 통계가 OpenAI API로 전달됩니다. 대화 내용과 이름은 전달되지 않습니다.</li>
            <li>속마음 스캐너는 통계와 결과를 자체 DB에 저장하지 않습니다. 회원가입도 없습니다.</li>
            <li>결과는 화면에만 표시되고 페이지를 닫으면 사라집니다.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            자세한 내용은{' '}
            <Link href="/privacy" className="underline text-blue-700">
              개인정보처리방침
            </Link>
            에 적어 두었습니다.
          </p>
        </section>

        <section className={CARD_CLASS}>
          <h2 className="text-2xl font-bold text-black mb-4">운영과 광고</h2>
          <p className="text-gray-700 leading-relaxed">
            서비스는 무료이며 운영비는 광고로 충당합니다. 페이지의 쿠팡 배너는 쿠팡 파트너스 활동의 일환으로, 이에 따른
            일정액의 수수료를 제공받습니다. 광고는 분석 결과나 블로그 글의 내용에 영향을 주지 않습니다.
          </p>
        </section>

        <section id="contact" className={`${CARD_CLASS} scroll-mt-24`}>
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" aria-hidden="true" /> 만든 사람 · 문의
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {author.role} <strong>{author.name}</strong>가 혼자 만들고 운영합니다. 오류 제보, 블로그 글의 잘못된 내용,
            개인정보 관련 문의, 제안 모두 아래 이메일로 보내 주세요. 보통 며칠 안에 답장드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <a
              href={`mailto:${author.email}`}
              className="flex items-center gap-2 bg-gray-100 border-2 border-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {author.email}
            </a>
            <a
              href={author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-100 border-2 border-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              oceancode.site
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
