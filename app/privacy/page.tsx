import type { Metadata } from 'next'
import Image from 'next/image'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { pageSeo, siteConfig } from '@/config/seo'

const TITLE = '개인정보처리방침'
const DESCRIPTION =
  '속마음 스캐너가 대화 파일을 어떻게 처리하는지 설명합니다. 대화 내용은 브라우저 밖으로 나가지 않으며, 서버에는 숫자 통계만 전달되고, 아무것도 저장하지 않는다는 점을 안내합니다.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...pageSeo({ title: TITLE, description: DESCRIPTION, path: '/privacy' }),
}

const H2_CLASS = 'text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2'
const LINK_CLASS = 'text-blue-600 underline'

export default function PrivacyPage() {
  const email = siteConfig.author.email

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[2rem] p-6 md:p-8 space-y-8">
          <h1 className="font-display font-bold text-black text-3xl">개인정보처리방침</h1>

          <section>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>속마음 스캐너</strong>(이하 &ldquo;서비스&rdquo;)는 1인 개발자 {siteConfig.author.name}가 운영합니다. 이
              문서는 서비스가 대화 파일과 이용 기록을 어떻게 다루는지 있는 그대로 설명합니다.
            </p>
            <p className="text-sm text-gray-500">시행일자: 2025년 12월 11일 · 최종 개정: 2026년 10월 4일</p>
          </section>

          <section>
            <h2 className={H2_CLASS}>1. 대화 파일은 이렇게 처리됩니다</h2>
            <Image
              src="/images/blog/fig-data-flow.png"
              alt="대화 파일 처리 흐름: 브라우저에서 통계를 계산하고, 서버가 숫자 통계만 받아 점수와 진단을 계산하며, 결과는 화면에만 표시된다. 선택 기능으로 버튼을 누를 때만 숫자 통계가 OpenAI API로 전달된다"
              width={1200}
              height={675}
              sizes="(max-width: 896px) 100vw, 832px"
              className="w-full h-auto rounded-xl border-2 border-black mb-4"
            />
            <ol className="list-decimal pl-6 text-gray-700 space-y-2 leading-relaxed">
              <li>
                올린 파일은 <strong>브라우저 안에서</strong> 읽고, 메시지 수·답장 시간·질문 횟수 같은 통계도 브라우저에서
                계산합니다. <strong>대화 내용과 참여자 이름은 브라우저 밖으로 나가지 않습니다.</strong>
              </li>
              <li>
                브라우저는 서비스 서버에 <strong>숫자 통계(횟수와 비율)만</strong> 보냅니다. 두 사람은 이름 없이 A와 B로
                구분됩니다.
              </li>
              <li>
                서버는 이 숫자로 종합 애정 지수, 항목별 진단, 대화 성향 유형, 맞춤 조언을 <strong>정해진 규칙으로
                계산</strong>합니다. AI를 쓰지 않으며, 같은 파일은 항상 같은 결과를 냅니다.
              </li>
              <li>
                리포트 맨 아래의 <strong>&ldquo;AI 코멘트 받기&rdquo; 버튼을 눌렀을 때만</strong> 같은 숫자 통계가{' '}
                <strong>OpenAI API(모델 gpt-4o-mini)</strong>로 전달되어 3~4문장의 코멘트를 받습니다. 이 호출은 API
                사용량과 오류를 확인하기 위한 모니터링 도구(Spanlens)를 거칩니다. 대화 내용과 이름은 이때도 전달되지
                않습니다.
              </li>
              <li>
                서비스는 통계와 분석 결과를 <strong>자체 데이터베이스나 파일로 저장하지 않습니다.</strong> 결과는
                화면에만 표시되고 페이지를 닫으면 사라집니다. 회원가입이 없으므로 이용자를 식별하는 계정 정보도 없습니다.
              </li>
            </ol>
            <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-4 mt-4">
              <p className="text-gray-800 leading-relaxed">
                <strong>알아 두세요.</strong> 대화 파일에는 상대방의 정보도 함께 들어 있습니다. 파일은 이용자의 기기를
                벗어나지 않지만, 내보낸 파일을 다른 사람에게 공유하거나 보관할 때는 상대방의 사생활도 고려해 주세요.
                AI 코멘트를 요청하면 숫자 통계가 OpenAI와 모니터링 도구로 전달되며, 이들은 각자의 정책에 따라 요청
                기록을 일정 기간 보관할 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className={H2_CLASS}>2. 수집하는 정보</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black text-sm md:text-base">
                <thead className="bg-yellow-300">
                  <tr>
                    <th scope="col" className="border-2 border-black p-3 text-left">항목</th>
                    <th scope="col" className="border-2 border-black p-3 text-left">목적</th>
                    <th scope="col" className="border-2 border-black p-3 text-left">보관</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="border-2 border-black p-3">숫자 통계(횟수·비율, 참여자는 A와 B로 표시)</td>
                    <td className="border-2 border-black p-3">점수와 진단 계산, 요청 시 AI 코멘트 생성</td>
                    <td className="border-2 border-black p-3">서비스는 저장하지 않음. AI 코멘트 요청 시 처리 업체의 보관은 4번 항목 참고</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-3">IP 주소</td>
                    <td className="border-2 border-black p-3">과도한 요청 차단(분당 요청 수 제한)</td>
                    <td className="border-2 border-black p-3">서버 메모리에 수 분간 유지 후 삭제</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-3">접속 기록, 브라우저·기기 정보, 쿠키</td>
                    <td className="border-2 border-black p-3">방문 통계, 광고 표시, 오류 확인</td>
                    <td className="border-2 border-black p-3">각 제공 업체의 정책에 따름</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className={H2_CLASS}>3. 이용 목적</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>카카오톡 대화 분석 결과 제공</li>
              <li>방문 통계를 통한 서비스 개선</li>
              <li>비정상적인 접근과 남용 방지</li>
              <li>광고 게재를 통한 운영비 충당</li>
            </ul>
          </section>

          <section>
            <h2 className={H2_CLASS}>4. 처리 위탁 및 외부 서비스</h2>
            <p className="text-gray-700 mb-4">서비스는 아래 외부 업체를 이용합니다. 대화 내용은 어떤 외부 업체에도 전달되지 않습니다.</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 leading-relaxed">
              <li>
                <strong>OpenAI</strong> — 선택 기능인 AI 코멘트 생성. 이용자가 &ldquo;AI 코멘트 받기&rdquo; 버튼을 눌렀을 때만 숫자 통계가 전달되며, 대화 내용과 이름은 전달되지 않습니다.{' '}
                <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                  개인정보 처리방침
                </a>
              </li>
              <li>
                <strong>Spanlens</strong> — OpenAI API 호출의 사용량·오류 모니터링. AI 코멘트 요청 시 호출이 이 도구를 거치며, 숫자 통계만 전달됩니다.
              </li>
              <li>
                <strong>Vercel</strong> — 웹사이트 호스팅과 방문 통계(Vercel Analytics). 접속 기록이 처리됩니다.
              </li>
              <li>
                <strong>Google Analytics</strong> — 방문 통계. 쿠키와 기기 정보가 수집될 수 있습니다.{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                  개인정보처리방침
                </a>
              </li>
              <li>
                <strong>쿠팡 파트너스</strong> — 광고 배너. 배너를 통해 쿠팡이 쿠키를 사용할 수 있으며, 서비스는 이를 통해
                일정액의 수수료를 받습니다.
              </li>
              <li>
                <strong>Google AdSense</strong> — 광고 게재 시 Google이 쿠키를 사용해 맞춤 광고를 표시할 수 있습니다.{' '}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                  광고 설정
                </a>
                에서 맞춤 광고를 끌 수 있습니다.
              </li>
              <li>
                <strong>카카오</strong> — 결과 공유 기능(카카오톡 공유)을 사용할 때 카카오 SDK가 동작합니다.
              </li>
            </ul>
            <p className="text-gray-700 mt-4">이 밖에 법령에 따라 요구되는 경우를 제외하고 개인정보를 외부에 제공하지 않습니다.</p>
          </section>

          <section>
            <h2 className={H2_CLASS}>5. 보유 기간과 파기</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>대화 내용과 분석 결과: 서비스가 저장하지 않으므로 파기할 대상이 없습니다.</li>
              <li>요청 수 제한용 IP 기록: 수 분 뒤 서버 메모리에서 삭제됩니다.</li>
              <li>외부 업체가 보관하는 기록: 각 업체의 보관 기간이 지나면 해당 업체에서 삭제됩니다.</li>
            </ul>
          </section>

          <section>
            <h2 className={H2_CLASS}>6. 이용자의 권리</h2>
            <p className="text-gray-700 leading-relaxed">
              이용자는 개인정보의 열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다. 서비스는 계정이나 대화 기록을 보관하지
              않으므로 대부분의 경우 삭제할 정보가 남아 있지 않지만, 문의는{' '}
              <a href={`mailto:${email}`} className={LINK_CLASS}>
                {email}
              </a>
              로 보내 주시면 확인해 답변드립니다.
            </p>
          </section>

          <section>
            <h2 className={H2_CLASS}>7. 쿠키</h2>
            <p className="text-gray-700 leading-relaxed">
              방문 통계와 광고 표시를 위해 쿠키가 사용됩니다. 브라우저 설정에서 쿠키를 거부할 수 있으며, 거부해도 대화
              분석 기능은 그대로 사용할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className={H2_CLASS}>8. 개인정보 보호책임자</h2>
            <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4 text-gray-700 space-y-1">
              <p>
                <strong>운영자:</strong> {siteConfig.author.name} ({siteConfig.author.role})
              </p>
              <p>
                <strong>이메일:</strong>{' '}
                <a href={`mailto:${email}`} className={LINK_CLASS}>
                  {email}
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className={H2_CLASS}>9. 방침의 변경</h2>
            <p className="text-gray-700 leading-relaxed">
              이 방침은 2025년 12월 11일부터 적용되었고, 2026년 10월 4일에 분석 방식 변경(대화 내용 전송 중단, 규칙 기반 계산, 선택형
              AI 코멘트)에 맞춰 데이터 처리 흐름과 외부 서비스 설명을 개정했습니다. 이후 변경이 있으면 이 페이지에 개정일과 함께 알립니다.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
