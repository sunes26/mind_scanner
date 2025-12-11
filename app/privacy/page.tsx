import type { Metadata } from 'next'
import Link from 'next/link'
import { Home } from 'lucide-react'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '속마음 스캐너의 개인정보 처리방침입니다. 사용자의 개인정보 보호와 관련된 정책을 확인하세요.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[2rem] overflow-hidden">
        {/* Header */}
        <header className="p-6 flex justify-between items-center border-b-2 border-black bg-yellow-300">
          <h1 className="font-display font-bold text-black text-2xl">개인정보처리방침</h1>
          <Link
            href="/"
            className="neo-button bg-white text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100"
          >
            <Home className="w-5 h-5" />
            홈으로
          </Link>
        </header>

        {/* Content */}
        <div className="p-8 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          <section>
            <p className="text-gray-600 mb-4">
              <strong>속마음 스캐너</strong>(이하 "서비스")는 사용자의 개인정보를 중요시하며, 개인정보 보호법을 준수하고 있습니다.
            </p>
            <p className="text-sm text-gray-500">
              시행일자: 2025년 12월 11일
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">1. 수집하는 개인정보 항목</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">가. 자동 수집 정보</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>IP 주소</li>
                  <li>쿠키</li>
                  <li>서비스 이용 기록</li>
                  <li>기기 정보 (브라우저 종류, OS 등)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">나. 서비스 이용 시 수집되는 정보</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li><strong>대화 내용:</strong> 업로드된 카카오톡 대화 파일은 <span className="text-red-600 font-bold">서버에 저장되지 않으며</span>, 분석 후 즉시 삭제됩니다.</li>
                  <li>분석 결과는 브라우저의 로컬 스토리지에만 임시 저장됩니다.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">2. 개인정보의 수집 및 이용 목적</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>서비스 제공:</strong> AI 기반 카카오톡 대화 분석 및 결과 제공</li>
              <li><strong>서비스 개선:</strong> 사용 패턴 분석을 통한 서비스 품질 향상</li>
              <li><strong>부정 이용 방지:</strong> 비정상적인 접근 및 남용 방지</li>
              <li><strong>광고 제공:</strong> Google AdSense를 통한 맞춤형 광고 제공</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">3. 개인정보의 보유 및 이용 기간</h2>
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <p className="text-gray-700 font-semibold">
                <strong className="text-blue-600">중요:</strong> 속마음 스캐너는 <span className="underline">완전한 Stateless 아키텍처</span>를 사용합니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                <li>업로드된 대화 파일은 <strong>서버에 저장되지 않습니다</strong></li>
                <li>분석은 실시간으로 처리되며, 처리 후 <strong>즉시 삭제</strong>됩니다</li>
                <li>분석 결과는 <strong>사용자의 브라우저에만</strong> 임시 저장됩니다</li>
                <li>로그 데이터는 서비스 운영을 위해 <strong>최대 30일간</strong> 보관 후 삭제됩니다</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">4. 개인정보의 제3자 제공</h2>
            <p className="text-gray-700 mb-4">
              속마음 스캐너는 원칙적으로 사용자의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>OpenAI (GPT API):</strong> 대화 분석을 위해 익명화된 대화 내용이 전송됩니다. OpenAI의 <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">개인정보 처리방침</a>을 참고하세요.</li>
              <li><strong>Google AdSense:</strong> 광고 제공을 위해 쿠키 및 기기 정보가 수집될 수 있습니다. Google의 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">개인정보처리방침</a>을 참고하세요.</li>
              <li>법령에 의해 요구되는 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">5. 개인정보의 파기</h2>
            <p className="text-gray-700 mb-2">
              개인정보는 수집 및 이용 목적이 달성되면 지체 없이 파기합니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li><strong>업로드된 파일:</strong> 분석 완료 즉시 삭제 (서버에 미저장)</li>
              <li><strong>로그 데이터:</strong> 30일 경과 후 자동 삭제</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">6. 사용자의 권리</h2>
            <p className="text-gray-700 mb-2">
              사용자는 다음과 같은 권리를 행사할 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>개인정보 열람 요구</li>
              <li>개인정보 정정 요구</li>
              <li>개인정보 삭제 요구</li>
              <li>개인정보 처리 정지 요구</li>
            </ul>
            <p className="text-gray-600 mt-4">
              권리 행사는 <a href="mailto:oceancode0321@gmail.com" className="text-blue-600 underline">oceancode0321@gmail.com</a>으로 문의해 주세요.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">7. 쿠키 사용</h2>
            <p className="text-gray-700 mb-2">
              속마음 스캐너는 다음 목적으로 쿠키를 사용합니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>서비스 이용 통계 분석</li>
              <li>광고 개인화</li>
              <li>사용자 경험 개선</li>
            </ul>
            <p className="text-gray-600 mt-2">
              사용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있으나, 이 경우 일부 서비스 이용이 제한될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">8. 개인정보 보호책임자</h2>
            <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4">
              <p className="text-gray-700"><strong>회사명:</strong> Oceancode</p>
              <p className="text-gray-700"><strong>이메일:</strong> <a href="mailto:oceancode0321@gmail.com" className="text-blue-600 underline">oceancode0321@gmail.com</a></p>
              <p className="text-gray-700"><strong>웹사이트:</strong> <a href="http://oceancode.site/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">oceancode.site</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">9. 개인정보처리방침 변경</h2>
            <p className="text-gray-700">
              이 개인정보처리방침은 2025년 12월 11일부터 적용되며, 법령 및 정책에 따라 변경될 수 있습니다. 변경 시 웹사이트를 통해 공지합니다.
            </p>
          </section>

          <section className="border-t-2 border-black pt-6">
            <p className="text-center text-gray-500 text-sm">
              문의사항이 있으시면 <a href="mailto:oceancode0321@gmail.com" className="text-blue-600 underline">oceancode0321@gmail.com</a>으로 연락해 주세요.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
