import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { pageSeo } from '@/config/seo'

const TITLE = '이용약관'
const DESCRIPTION = '속마음 스캐너의 이용약관입니다. 서비스 내용, 이용자의 의무, 면책 사항, 광고 게재에 관한 사항을 안내합니다.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...pageSeo({ title: TITLE, description: DESCRIPTION, path: '/terms' }),
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[2rem] p-6 md:p-8 space-y-8">
          <h1 className="font-display font-bold text-black text-3xl">이용약관</h1>

          <section>
            <p className="text-gray-600 mb-4">
              본 약관은 <strong>속마음 스캐너</strong>(이하 &ldquo;서비스&rdquo;)의 이용 조건 및 절차, 회원과 서비스 제공자의 권리, 의무 및 책임사항을 규정합니다.
            </p>
            <p className="text-sm text-gray-500">
              시행일자: 2025년 12월 11일 · 최종 개정: 2026년 10월 4일
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제1조 (목적)</h2>
            <p className="text-gray-700">
              본 약관은 Oceancode(이하 &ldquo;회사&rdquo;)가 제공하는 속마음 스캐너 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제2조 (정의)</h2>
            <ul className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>&ldquo;서비스&rdquo;</strong>란 회사가 제공하는 카카오톡 대화 통계 분석 서비스를 의미합니다.</li>
              <li><strong>&ldquo;이용자&rdquo;</strong>란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 의미합니다.</li>
              <li><strong>&ldquo;대화 파일&rdquo;</strong>이란 이용자가 분석을 위해 업로드하는 카카오톡 대화 텍스트 파일을 의미합니다.</li>
              <li><strong>&ldquo;분석 결과&rdquo;</strong>란 서비스가 대화 통계를 바탕으로 정해진 규칙에 따라 생성한 대화 분석 리포트를 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제3조 (약관의 게시 및 변경)</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>회사는 본 약관의 내용을 이용자가 쉽게 확인할 수 있도록 서비스 내에 게시합니다.</li>
              <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</li>
              <li>약관이 변경되는 경우, 변경된 약관은 웹사이트를 통해 공지되며, 공지 후 7일이 경과한 시점부터 효력이 발생합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제4조 (서비스의 제공)</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>회사는 이용자에게 다음과 같은 서비스를 제공합니다:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>카카오톡 대화 파일 업로드 및 분석</li>
                  <li>대화 통계 계산 및 규칙 기반의 참고용 종합 애정 지수 (0-100점)</li>
                  <li>관계 역학 및 대화 패턴 분석</li>
                  <li>규칙 기반 맞춤 조언 제공</li>
                  <li>이용자가 요청할 때만 제공되는 선택형 AI 코멘트</li>
                  <li>분석 결과 공유 기능</li>
                </ul>
              </li>
              <li>서비스는 연중무휴 24시간 제공을 원칙으로 합니다. 다만, 시스템 점검, 서버 장애 등의 경우 일시적으로 중단될 수 있습니다.</li>
              <li>회사는 서비스의 품질 향상을 위해 예고 없이 서비스의 내용을 변경할 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제5조 (서비스의 제한 및 중단)</h2>
            <p className="text-gray-700 mb-2">
              회사는 다음 각 호의 경우 서비스 제공을 제한하거나 중단할 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>서비스 설비의 보수, 점검, 교체 등 공사로 인한 부득이한 경우</li>
              <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지한 경우</li>
              <li>국가비상사태, 천재지변 등 불가항력적 사유가 있는 경우</li>
              <li>서비스 이용의 폭주 등으로 정상적인 서비스 제공이 불가능한 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제6조 (이용자의 의무)</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>이용자는 다음 행위를 하여서는 안 됩니다:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>타인의 개인정보를 도용하거나 부정하게 사용하는 행위</li>
                  <li>서비스의 운영을 고의로 방해하는 행위</li>
                  <li>공공질서 및 미풍양속에 위반되는 내용을 유포하는 행위</li>
                  <li>서비스를 상업적 목적으로 무단 사용하는 행위</li>
                  <li>자동화된 수단(봇, 크롤러 등)을 사용하여 서비스에 과부하를 일으키는 행위</li>
                  <li>서비스의 소스코드를 무단으로 복제, 수정, 배포하는 행위</li>
                </ul>
              </li>
              <li>이용자는 업로드하는 대화 파일에 대한 법적 권한을 보유해야 하며, 타인의 동의 없이 대화 내용을 업로드하여 발생하는 모든 법적 책임은 이용자에게 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제7조 (개인정보 보호)</h2>
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                <li>회사는 이용자의 개인정보를 중요시하며, 관련 법령을 준수합니다.</li>
                <li><strong>회사는 대화 파일과 분석 결과를 자체 데이터베이스에 저장하지 않습니다.</strong> 대화 내용과 참여자 이름은 이용자의 브라우저 밖으로 나가지 않으며, 서버에는 숫자 통계만 전달됩니다. 이용자가 선택 기능인 AI 코멘트를 요청한 경우에만 같은 숫자 통계가 OpenAI API로 전달됩니다.</li>
                <li>분석 결과는 화면에만 표시되며 페이지를 닫으면 사라집니다. 회사는 이를 수집하지 않습니다.</li>
                <li>대화 파일에는 상대방의 정보도 들어 있습니다. 파일은 이용자의 기기를 벗어나지 않지만, 이용자는 상대방의 사생활을 고려해 파일을 다뤄야 합니다.</li>
                <li>자세한 내용은 <Link href="/privacy" className="text-blue-600 underline">개인정보처리방침</Link>을 참조하세요.</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제8조 (저작권 및 지식재산권)</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>서비스에 포함된 모든 콘텐츠(텍스트, 그래픽, 로고, 이미지, 소프트웨어 등)의 저작권 및 지식재산권은 회사에 귀속됩니다.</li>
              <li>이용자는 회사의 사전 승인 없이 서비스의 콘텐츠를 복제, 수정, 배포, 전송할 수 없습니다.</li>
              <li>이용자가 생성한 분석 결과에 대한 저작권은 이용자에게 있습니다. 회사는 분석 결과를 수집하거나 보관하지 않습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제9조 (면책 조항)</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>회사는 천재지변, 전쟁, 파업, 정부의 명령 등 불가항력으로 인해 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
              <li>회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.</li>
              <li>회사는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.</li>
              <li><strong className="text-red-600">분석 결과는 통계에 기반한 참고 자료일 뿐이며, 실제 관계나 감정을 100% 보장하지 않습니다.</strong> 회사는 분석 결과의 정확성에 대해 법적 책임을 지지 않습니다.</li>
              <li>회사는 제3자 서비스(OpenAI, 쿠팡 파트너스, Google 등)의 장애나 오류로 인한 피해에 대해 책임을 지지 않습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제10조 (손해배상)</h2>
            <p className="text-gray-700">
              회사가 고의 또는 중대한 과실로 인해 이용자에게 손해를 입힌 경우, 관련 법령에 따라 손해배상 책임을 부담합니다. 다만, 배상 범위는 직접적이고 통상적인 손해로 제한됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제11조 (광고 게재)</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>회사는 서비스 운영을 위해 쿠팡 파트너스, Google AdSense 등 제3자 광고를 게재할 수 있습니다. 쿠팡 파트너스 활동으로 일정액의 수수료를 받을 수 있습니다.</li>
              <li>광고 클릭 시 외부 사이트로 이동할 수 있으며, 해당 사이트의 정책은 회사와 무관합니다.</li>
              <li>이용자는 브라우저 설정을 통해 광고 쿠키를 차단할 수 있으나, 일부 기능 이용이 제한될 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제12조 (분쟁 해결)</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>본 약관과 관련된 분쟁은 대한민국 법률에 따라 해석되고 적용됩니다.</li>
              <li>서비스 이용과 관련하여 발생한 분쟁에 대해서는 대한민국 법원을 관할 법원으로 합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">제13조 (문의 및 고객지원)</h2>
            <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4">
              <p className="text-gray-700 mb-2">서비스 이용 중 문의사항이 있으시면 아래로 연락해 주세요:</p>
              <p className="text-gray-700"><strong>회사명:</strong> Oceancode</p>
              <p className="text-gray-700"><strong>이메일:</strong> <a href="mailto:oceancode0321@gmail.com" className="text-blue-600 underline">oceancode0321@gmail.com</a></p>
              <p className="text-gray-700"><strong>웹사이트:</strong> <a href="http://oceancode.site/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">oceancode.site</a></p>
            </div>
          </section>

          <section className="border-t-2 border-black pt-6">
            <p className="text-center text-gray-500 text-sm">
              본 약관은 2025년 12월 11일부터 시행되었으며, 2026년 10월 4일에 개정되었습니다.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
