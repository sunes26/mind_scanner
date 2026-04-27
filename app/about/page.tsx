import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, Mail, ExternalLink, Brain, Shield, AlertCircle, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: '서비스 소개 - 속마음 스캐너',
  description: '속마음 스캐너를 만든 이유, 사용 AI 기술, 분석 방법론, 그리고 개인정보 처리 방식을 솔직하게 설명합니다.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b-4 border-black shadow-lg sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-semibold">홈으로</span>
          </Link>
          <Link href="/blog" className="font-semibold text-gray-600 hover:text-black transition-colors">
            블로그
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        {/* Hero */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-black mb-4">서비스 소개</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            속마음 스캐너는 카카오톡 대화 파일(.txt)을 AI로 분석해 두 사람의 대화 패턴과 감정 신호를 파악하는 도구입니다.
            이 페이지에서는 서비스를 만든 이유, 기술 방식, 분석의 한계를 솔직하게 설명합니다.
          </p>
        </div>

        {/* 만든 이유 */}
        <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <span>💡</span> 왜 만들었나요?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            안녕하세요, 1인 개발자 Oceancode입니다. 저도 한때 카톡 대화를 보며 "이 사람이 나를 좋아하는 걸까?"를 반복해서 고민한 경험이 있습니다.
            친구들에게 물어봐도 "그냥 좋아하는 것 같은데?"라는 주관적인 답변밖에 돌아오지 않았죠.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            그래서 생각했습니다. AI가 답장 속도, 이모티콘 빈도, 질문 패턴 같은 <strong>객관적인 지표</strong>를 분석한다면
            어느 정도 참고가 될 수 있지 않을까? 그게 속마음 스캐너의 시작입니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            2025년 10월에 처음 출시했고, 이후 사용자 피드백을 반영해 꾸준히 개선하고 있습니다.
          </p>
        </section>

        {/* AI 기술 */}
        <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6" /> 어떤 AI를 사용하나요?
          </h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5">
              <h3 className="font-bold text-blue-800 mb-2">OpenAI GPT-4o 기반</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                분석에는 OpenAI의 GPT-4o 모델을 사용합니다. 대화 파일을 업로드하면 텍스트가 GPT-4o로 전달되어 분석됩니다.
                OpenAI는 API 사용 시 데이터를 모델 학습에 사용하지 않습니다.
              </p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-5">
              <h3 className="font-bold text-gray-800 mb-2">분석하는 항목</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• <strong>답장 속도</strong>: 상대방과 나의 평균 답장 시간 비교</li>
                <li>• <strong>메시지 길이</strong>: 누가 더 길고 구체적인 메시지를 보내는지</li>
                <li>• <strong>질문 빈도</strong>: 상대방에게 더 많이 질문하는 쪽은 누구인지</li>
                <li>• <strong>이모티콘·ㅋㅋ 빈도</strong>: 감정 표현의 양과 종류</li>
                <li>• <strong>대화 시작 비율</strong>: 누가 먼저 대화를 여는지</li>
                <li>• <strong>시간대별 패턴</strong>: 주로 어느 시간대에 대화하는지</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 분석의 한계 */}
        <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-orange-500" /> 분석의 한계
          </h2>
          <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-5 mb-4">
            <p className="text-orange-800 font-bold mb-2">중요한 고지사항</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              속마음 스캐너의 분석 결과는 <strong>참고용 AI 분석</strong>입니다. 실제 감정이나 관계를 100% 반영하지 않으며,
              연애 상담이나 심리 전문 서비스를 대체할 수 없습니다.
            </p>
          </div>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold mt-0.5">⚠</span>
              <span>텍스트 대화만 분석하므로 표정, 목소리, 행동 같은 오프라인 요소는 반영되지 않습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold mt-0.5">⚠</span>
              <span>성격이 내성적이거나 바쁜 직업군에 따라 답장 속도 등의 지표가 크게 달라질 수 있습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold mt-0.5">⚠</span>
              <span>대화 기간이 짧거나 메시지 수가 적을수록 정확도가 떨어집니다. 최소 200개 이상의 메시지를 권장합니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold mt-0.5">⚠</span>
              <span>AI 분석은 패턴 인식에 기반하며, 개별 상황의 맥락을 완전히 파악하는 데 한계가 있습니다.</span>
            </li>
          </ul>
        </section>

        {/* 개인정보 보호 */}
        <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-600" /> 개인정보는 안전한가요?
          </h2>
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5 mb-4">
            <p className="text-green-800 font-bold mb-1">핵심 원칙: 서버에 저장하지 않습니다</p>
            <p className="text-gray-700 text-sm">
              업로드된 카카오톡 대화 파일은 분석 후 즉시 폐기됩니다. 서버 데이터베이스에 저장되지 않습니다.
            </p>
          </div>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>완전한 <strong>Stateless 아키텍처</strong>: 요청 처리 후 데이터 즉시 삭제</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>분석 결과는 브라우저 로컬 스토리지에만 저장 (사용자 기기에만 보관)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>제3자에게 대화 내용 판매 또는 공유 없음</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold mt-0.5">ℹ</span>
              <span>분석을 위해 OpenAI API로 익명화된 텍스트가 전송됩니다. 자세한 내용은 개인정보처리방침을 참고해 주세요.</span>
            </li>
          </ul>
        </section>

        {/* 제작자 */}
        <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" /> 만든 사람
          </h2>
          <div className="flex flex-col gap-3">
            <p className="text-gray-700">
              1인 개발자 <strong>Oceancode</strong>가 혼자 기획, 개발, 운영합니다.
              사용자의 피드백과 제안을 항상 환영합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="mailto:oceancode0321@gmail.com"
                className="flex items-center gap-2 bg-gray-100 border-2 border-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                <Mail className="w-4 h-4" />
                oceancode0321@gmail.com
              </a>
              <a
                href="http://oceancode.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-100 border-2 border-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                <ExternalLink className="w-4 h-4" />
                oceancode.site
              </a>
            </div>
          </div>
        </section>

        {/* Footer Nav */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 pb-8">
          <Link href="/" className="hover:text-black transition-colors">홈</Link>
          <span>•</span>
          <Link href="/blog" className="hover:text-black transition-colors">블로그</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-black transition-colors">개인정보처리방침</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-black transition-colors">이용약관</Link>
        </div>
      </main>
    </div>
  )
}
