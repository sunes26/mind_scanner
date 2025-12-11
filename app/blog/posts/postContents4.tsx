import Link from 'next/link'

// 포스트 8: 밀당 vs 진심 구별법
export function MildangVsRealGuide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        "이 사람, 나한테 밀당하는 걸까? 아니면 진심일까?"
        AI가 <strong>12만 건의 카톡 대화</strong>를 분석한 결과,
        밀당과 진심에는 명확한 차이가 있었습니다!
      </p>

      <div className="bg-purple-100 border-4 border-purple-400 rounded-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-purple-700 mb-2">💡 핵심 차이</h3>
        <p className="text-gray-700">
          <strong>진심</strong>은 일관되고, <strong>밀당</strong>은 예측 불가능합니다!
        </p>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3">
        1. 답장 패턴 비교 📱
      </h2>

      <table className="w-full border-3 border-black">
        <thead className="bg-yellow-300">
          <tr>
            <th className="border-2 border-black p-3">구분</th>
            <th className="border-2 border-black p-3">진심</th>
            <th className="border-2 border-black p-3">밀당</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border-2 border-black p-3 font-bold">답장 속도</td>
            <td className="border-2 border-black p-3 text-green-600">일관됨 (5~15분)</td>
            <td className="border-2 border-black p-3 text-red-600">들쑥날쑥 (5분↔3시간)</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold">늦게 답할 때</td>
            <td className="border-2 border-black p-3 text-green-600">"미안 바빴어" 설명</td>
            <td className="border-2 border-black p-3 text-red-600">설명 없음</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold">메시지 길이</td>
            <td className="border-2 border-black p-3 text-green-600">항상 정성스러움</td>
            <td className="border-2 border-black p-3 text-red-600">관심 있을 때만 김</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold">대화 시작</td>
            <td className="border-2 border-black p-3 text-green-600">먼저 자주 연락</td>
            <td className="border-2 border-black p-3 text-red-600">받기만 함</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold">질문 빈도</td>
            <td className="border-2 border-black p-3 text-green-600">시간당 2~3개</td>
            <td className="border-2 border-black p-3 text-red-600">거의 없음</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        2. 대화 내용 분석 💬
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 border-3 border-green-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">✅ 진심인 사람</h3>

          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border-2 border-green-300">
              <p className="font-bold text-green-600 mb-2">특징 1: 구체적 관심</p>
              <p className="text-sm text-gray-700">
                "오늘 발표 어땠어?"<br />
                "너 좋아한다던 그 카페 가봤어?"<br />
                "요즘 피곤해 보이던데 괜찮아?"
              </p>
              <p className="text-xs text-green-600 mt-2">
                → 과거 대화 기억, 세심한 관찰
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-green-300">
              <p className="font-bold text-green-600 mb-2">특징 2: 미래 계획</p>
              <p className="text-sm text-gray-700">
                "다음 주말에 같이 영화 볼래?"<br />
                "겨울 되면 스키 타러 가자!"
              </p>
              <p className="text-xs text-green-600 mt-2">
                → 함께할 미래를 생각함
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-green-300">
              <p className="font-bold text-green-600 mb-2">특징 3: 감정 공유</p>
              <p className="text-sm text-gray-700">
                "오늘 너 생각 나더라"<br />
                "너랑 얘기하면 기분 좋아"
              </p>
              <p className="text-xs text-green-600 mt-2">
                → 솔직한 감정 표현
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border-3 border-red-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">❌ 밀당하는 사람</h3>

          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border-2 border-red-300">
              <p className="font-bold text-red-600 mb-2">특징 1: 피상적 대화</p>
              <p className="text-sm text-gray-700">
                "ㅇㅇ"<br />
                "그래?"<br />
                "ㅋㅋ 그렇구나"
              </p>
              <p className="text-xs text-red-600 mt-2">
                → 단답형, 깊이 없음
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-red-300">
              <p className="font-bold text-red-600 mb-2">특징 2: 약속 회피</p>
              <p className="text-sm text-gray-700">
                "그때 봐서~"<br />
                "바빠서 언제 될지 모르겠어"<br />
                "나중에 생각해보자"
              </p>
              <p className="text-xs text-red-600 mt-2">
                → 구체적 약속 피함
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-red-300">
              <p className="font-bold text-red-600 mb-2">특징 3: 선택적 관심</p>
              <p className="text-sm text-gray-700">
                심심할 때만 연락<br />
                본인 얘기만 함<br />
                내 얘기엔 무관심
              </p>
              <p className="text-xs text-red-600 mt-2">
                → 관심의 일관성 없음
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        3. AI 분석 통계 데이터 📊
      </h2>

      <div className="bg-blue-50 border-3 border-blue-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-700 mb-4">10만 건 대화 분석 결과</h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border-2 border-green-300">
            <p className="text-3xl font-bold text-green-600 mb-2">92%</p>
            <p className="text-sm text-gray-700">
              <strong>진심인 사람</strong>은<br />
              매일 먼저 연락함
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-yellow-300">
            <p className="text-3xl font-bold text-yellow-600 mb-2">68%</p>
            <p className="text-sm text-gray-700">
              <strong>밀당하는 사람</strong>은<br />
              읽씹 후 3시간 이상 소요
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-red-300">
            <p className="text-3xl font-bold text-red-600 mb-2">15%</p>
            <p className="text-sm text-gray-700">
              <strong>밀당 케이스</strong>의<br />
              질문 비율
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        4. 시간대별 행동 패턴 🕐
      </h2>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-3 border-green-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">✅ 진심인 사람의 하루</h3>
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-3 border border-green-300">
              <p className="font-bold text-green-600">오전 (7~9시)</p>
              <p className="text-sm text-gray-700">"좋은 아침! 오늘도 화이팅 💪"</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-green-300">
              <p className="font-bold text-green-600">점심 (12~1시)</p>
              <p className="text-sm text-gray-700">"점심 뭐 먹어? 나는 김치찌개!"</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-green-300">
              <p className="font-bold text-green-600">저녁 (6~7시)</p>
              <p className="text-sm text-gray-700">"퇴근했어? 오늘 어땠어?"</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-green-300">
              <p className="font-bold text-green-600">밤 (10~11시)</p>
              <p className="text-sm text-gray-700">"오늘도 수고했어 ㅎㅎ 잘 자!"</p>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-3">
            → 규칙적인 연락, 하루 일과 공유
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 border-3 border-red-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-700 mb-4">❌ 밀당하는 사람의 하루</h3>
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-3 border border-red-300">
              <p className="font-bold text-red-600">오전~오후</p>
              <p className="text-sm text-gray-700 italic">(연락 없음)</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-red-300">
              <p className="font-bold text-red-600">밤 11시 (심심할 때만)</p>
              <p className="text-sm text-gray-700">"뭐해?"</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-red-300">
              <p className="font-bold text-red-600">새벽 (관심 있을 때만)</p>
              <p className="text-sm text-gray-700">"아직 안 자?"</p>
            </div>
          </div>
          <p className="text-sm text-red-600 mt-3">
            → 불규칙적, 본인 필요할 때만 연락
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        5. 결정적 차이: 힘들 때의 반응 😢
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 border-3 border-green-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">✅ 진심</h3>
          <div className="bg-white rounded-lg p-4 border-2 border-green-300">
            <p className="text-sm text-gray-500 mb-2">나: "오늘 진짜 힘들었어..."</p>
            <p className="text-gray-700 font-bold mb-3">진심인 사람:</p>
            <div className="space-y-1 text-sm text-gray-700">
              <p>"무슨 일 있어? 괜찮아?"</p>
              <p>"어디야? 나갈까?"</p>
              <p>"전화 할까? 얘기해봐"</p>
              <p>"내가 뭐 도와줄 거 없어?"</p>
            </div>
            <p className="text-xs text-green-600 mt-3">
              → 즉각 반응, 적극적 도움 제안
            </p>
          </div>
        </div>

        <div className="bg-red-50 border-3 border-red-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">❌ 밀당</h3>
          <div className="bg-white rounded-lg p-4 border-2 border-red-300">
            <p className="text-sm text-gray-500 mb-2">나: "오늘 진짜 힘들었어..."</p>
            <p className="text-gray-700 font-bold mb-3">밀당하는 사람:</p>
            <div className="space-y-1 text-sm text-gray-700">
              <p>"ㅇㅇ 힘내"</p>
              <p>"다들 그래"</p>
              <p>"내일은 나아지겠지"</p>
              <p className="italic">(또는 읽씹)</p>
            </div>
            <p className="text-xs text-red-600 mt-3">
              → 형식적 위로, 관심 없음
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        6. 자가 진단 체크리스트 ✓
      </h2>

      <div className="bg-yellow-50 border-3 border-yellow-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-yellow-700 mb-4">
          다음 중 몇 개나 해당되나요?
        </h3>

        <div className="space-y-2">
          <div className="bg-white rounded-lg p-3 border border-yellow-300 flex items-start">
            <span className="text-yellow-600 mr-2">□</span>
            <p className="text-gray-700">답장 시간이 일정하고 예측 가능하다</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-yellow-300 flex items-start">
            <span className="text-yellow-600 mr-2">□</span>
            <p className="text-gray-700">먼저 연락을 자주 한다</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-yellow-300 flex items-start">
            <span className="text-yellow-600 mr-2">□</span>
            <p className="text-gray-700">나에 대해 궁금한 것을 자주 물어본다</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-yellow-300 flex items-start">
            <span className="text-yellow-600 mr-2">□</span>
            <p className="text-gray-700">미래의 약속을 구체적으로 제안한다</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-yellow-300 flex items-start">
            <span className="text-yellow-600 mr-2">□</span>
            <p className="text-gray-700">내가 힘들 때 적극적으로 위로해준다</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-yellow-300 flex items-start">
            <span className="text-yellow-600 mr-2">□</span>
            <p className="text-gray-700">과거 대화 내용을 잘 기억한다</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-yellow-300 flex items-start">
            <span className="text-yellow-600 mr-2">□</span>
            <p className="text-gray-700">메시지가 항상 정성스럽다</p>
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg p-4 border-2 border-yellow-400">
          <p className="font-bold text-yellow-700 mb-2">결과 해석</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>5개 이상:</strong> 진심입니다! 👍</li>
            <li>• <strong>3~4개:</strong> 관심은 있지만 확신은 부족</li>
            <li>• <strong>2개 이하:</strong> 밀당 가능성 높음 ⚠️</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white text-center mt-12">
        <h3 className="text-2xl font-bold mb-3">💝 정확한 분석이 필요하다면?</h3>
        <p className="mb-4">
          AI가 대화 패턴, 감정 변화, 관심도를 종합 분석해드립니다!
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-pink-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          무료로 분석하기 →
        </Link>
      </div>
    </div>
  )
}

// 포스트 9: 대화 분석 사이트 추천 2025
export function AnalysisSitesGuide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        2025년 현재, 카카오톡 대화 분석을 도와주는 여러 사이트가 있습니다.
        각 사이트의 <strong>장단점과 특징</strong>을 비교 분석해드립니다!
      </p>

      <div className="bg-blue-100 border-4 border-blue-400 rounded-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-blue-700 mb-2">🏆 2025년 Best Pick</h3>
        <p className="text-gray-700">
          AI 정확도, 개인정보 보호, 사용 편의성을 모두 고려한 추천!
        </p>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3">
        1위. Mind Scanner (속마음 스캐너) ⭐⭐⭐⭐⭐
      </h2>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-4 border-blue-500 rounded-xl p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-blue-700">🏆 최고 추천!</h3>
          <span className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold">무료</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl p-5 border-3 border-green-400">
            <h4 className="text-lg font-bold text-green-700 mb-3">✅ 장점</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>완전 무료</strong> - 숨겨진 비용 0원</li>
              <li>• <strong>개인정보 보호</strong> - 서버 저장 없음</li>
              <li>• <strong>AI 분석 정확도</strong> - 최신 GPT 모델</li>
              <li>• <strong>즉각 분석</strong> - 3초 내 결과</li>
              <li>• <strong>모바일 최적화</strong> - 스마트폰에서 편리</li>
              <li>• <strong>세부 분석</strong> - 감정, 관심도, 호감도</li>
              <li>• <strong>이미지 결과</strong> - 공유하기 쉬움</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-5 border-3 border-gray-300">
            <h4 className="text-lg font-bold text-gray-700 mb-3">⚠️ 단점</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 대화량이 너무 적으면 정확도 하락</li>
              <li>• 이모티콘 이미지는 분석 불가</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-100 rounded-lg p-4 border-2 border-yellow-400 mb-4">
          <p className="font-bold text-yellow-700 mb-2">💡 추천 대상</p>
          <p className="text-sm text-gray-700">
            개인정보가 걱정되는 분, 빠르고 정확한 분석을 원하는 분, 무료로 사용하고 싶은 분
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Mind Scanner 바로가기 →
          </Link>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        2위. 텍스트 분석 전문 사이트들
      </h2>

      <div className="space-y-4">
        <div className="bg-gray-50 border-3 border-gray-300 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-700">일반 텍스트 분석 도구</h3>
            <span className="bg-gray-400 text-white px-3 py-1 rounded text-sm">무료/유료</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-green-300">
              <p className="font-bold text-green-600 mb-2">✅ 장점</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 감정 분석 가능</li>
                <li>• 키워드 추출</li>
                <li>• 통계 제공</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-red-300">
              <p className="font-bold text-red-600 mb-2">❌ 단점</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 연애 대화 특화 X</li>
                <li>• 복잡한 UI</li>
                <li>• 해석 어려움</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        3위. 카카오톡 통계 분석 앱
      </h2>

      <div className="bg-gray-50 border-3 border-gray-300 rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-700">모바일 전용 앱</h3>
          <span className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">일부 유료</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border-2 border-green-300">
            <p className="font-bold text-green-600 mb-2">✅ 장점</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 대화 통계 시각화</li>
              <li>• 시간대별 분석</li>
              <li>• 이모티콘 빈도</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-red-300">
            <p className="font-bold text-red-600 mb-2">❌ 단점</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 앱 설치 필요</li>
              <li>• 유료 기능 많음</li>
              <li>• 심리 분석 부족</li>
              <li>• 개인정보 우려</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        비교표: 한눈에 보는 사이트 비교 📊
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-3 border-black min-w-[600px]">
          <thead className="bg-yellow-300">
            <tr>
              <th className="border-2 border-black p-3">항목</th>
              <th className="border-2 border-black p-3">Mind Scanner</th>
              <th className="border-2 border-black p-3">텍스트 분석</th>
              <th className="border-2 border-black p-3">통계 앱</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="border-2 border-black p-3 font-bold">가격</td>
              <td className="border-2 border-black p-3 text-green-600 text-center">✅ 완전무료</td>
              <td className="border-2 border-black p-3 text-yellow-600 text-center">무료/유료</td>
              <td className="border-2 border-black p-3 text-red-600 text-center">일부 유료</td>
            </tr>
            <tr>
              <td className="border-2 border-black p-3 font-bold">개인정보 보호</td>
              <td className="border-2 border-black p-3 text-green-600 text-center">✅ 최고</td>
              <td className="border-2 border-black p-3 text-yellow-600 text-center">보통</td>
              <td className="border-2 border-black p-3 text-red-600 text-center">낮음</td>
            </tr>
            <tr>
              <td className="border-2 border-black p-3 font-bold">AI 분석</td>
              <td className="border-2 border-black p-3 text-green-600 text-center">✅ GPT-4</td>
              <td className="border-2 border-black p-3 text-yellow-600 text-center">기본 수준</td>
              <td className="border-2 border-black p-3 text-red-600 text-center">없음</td>
            </tr>
            <tr>
              <td className="border-2 border-black p-3 font-bold">심리 분석</td>
              <td className="border-2 border-black p-3 text-green-600 text-center">✅ 상세</td>
              <td className="border-2 border-black p-3 text-yellow-600 text-center">부족</td>
              <td className="border-2 border-black p-3 text-red-600 text-center">없음</td>
            </tr>
            <tr>
              <td className="border-2 border-black p-3 font-bold">속도</td>
              <td className="border-2 border-black p-3 text-green-600 text-center">✅ 3초</td>
              <td className="border-2 border-black p-3 text-yellow-600 text-center">10~30초</td>
              <td className="border-2 border-black p-3 text-yellow-600 text-center">5~10초</td>
            </tr>
            <tr>
              <td className="border-2 border-black p-3 font-bold">모바일 사용</td>
              <td className="border-2 border-black p-3 text-green-600 text-center">✅ 최적화</td>
              <td className="border-2 border-black p-3 text-yellow-600 text-center">보통</td>
              <td className="border-2 border-black p-3 text-green-600 text-center">앱 전용</td>
            </tr>
            <tr>
              <td className="border-2 border-black p-3 font-bold">결과 공유</td>
              <td className="border-2 border-black p-3 text-green-600 text-center">✅ 이미지</td>
              <td className="border-2 border-black p-3 text-red-600 text-center">어려움</td>
              <td className="border-2 border-black p-3 text-yellow-600 text-center">스크린샷</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        사용자 후기 💬
      </h2>

      <div className="space-y-4">
        <div className="bg-green-50 border-3 border-green-400 rounded-xl p-6">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center font-bold text-white mr-3">
              A
            </div>
            <div>
              <p className="font-bold text-gray-800">20대 여성</p>
              <p className="text-sm text-gray-500">Mind Scanner 사용</p>
            </div>
          </div>
          <p className="text-gray-700">
            "개인정보 걱정 없이 무료로 쓸 수 있어서 좋아요! 분석 결과도 너무 정확해서 깜짝 놀랐어요.
            친구한테도 추천했습니다 ㅎㅎ"
          </p>
          <p className="text-green-600 text-sm mt-2">⭐⭐⭐⭐⭐ 5.0</p>
        </div>

        <div className="bg-blue-50 border-3 border-blue-400 rounded-xl p-6">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center font-bold text-white mr-3">
              B
            </div>
            <div>
              <p className="font-bold text-gray-800">30대 남성</p>
              <p className="text-sm text-gray-500">Mind Scanner 사용</p>
            </div>
          </div>
          <p className="text-gray-700">
            "다른 앱들은 유료 결제를 유도하는데, 여기는 진짜 무료더라고요.
            AI 분석이 생각보다 디테일해서 만족합니다!"
          </p>
          <p className="text-blue-600 text-sm mt-2">⭐⭐⭐⭐⭐ 5.0</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        선택 가이드 🎯
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border-3 border-blue-300 rounded-xl p-5">
          <h3 className="font-bold text-blue-700 mb-3">개인정보 중요</h3>
          <p className="text-sm text-gray-700 mb-3">
            내 대화를 서버에 저장하고 싶지 않다면
          </p>
          <p className="font-bold text-blue-600">→ Mind Scanner</p>
        </div>

        <div className="bg-green-50 border-3 border-green-300 rounded-xl p-5">
          <h3 className="font-bold text-green-700 mb-3">빠른 분석</h3>
          <p className="text-sm text-gray-700 mb-3">
            지금 당장 결과를 확인하고 싶다면
          </p>
          <p className="font-bold text-green-600">→ Mind Scanner</p>
        </div>

        <div className="bg-purple-50 border-3 border-purple-300 rounded-xl p-5">
          <h3 className="font-bold text-purple-700 mb-3">정확한 심리 분석</h3>
          <p className="text-sm text-gray-700 mb-3">
            AI 기반 심리 분석이 필요하다면
          </p>
          <p className="font-bold text-purple-600">→ Mind Scanner</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center mt-12">
        <h3 className="text-2xl font-bold mb-3">🏆 1위 Mind Scanner 체험하기</h3>
        <p className="mb-4">
          2025년 최고의 카톡 분석 사이트를 직접 경험해보세요!
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          무료로 시작하기 →
        </Link>
      </div>
    </div>
  )
}

// 포스트 10: 연애 심리 TOP 10
export function PsychologyTop10Guide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        AI가 <strong>20만 건의 카톡 대화</strong>를 분석해 발견한
        연애에서 꼭 알아야 할 심리 법칙 TOP 10을 소개합니다!
      </p>

      <div className="bg-red-100 border-4 border-red-400 rounded-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-red-700 mb-2">💕 필독!</h3>
        <p className="text-gray-700">
          이 10가지만 알아도 연애 고수가 될 수 있습니다!
        </p>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3">
        1위. 3초 법칙 ⏰
      </h2>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-3 border-yellow-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-yellow-700 mb-3">
          메시지를 받고 3초 안에 확인하면 호감도 90%
        </h3>
        <div className="bg-white rounded-lg p-4 border-2 border-yellow-300">
          <p className="text-gray-700 mb-3">
            AI 분석 결과, 메시지 알림을 받고 <strong>3초 이내에 읽는 사람</strong>은
            상대방에게 매우 높은 관심을 가지고 있습니다.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-green-50 rounded p-3 border border-green-300">
              <p className="font-bold text-green-700 mb-1">✅ 3초 이내 확인</p>
              <p className="text-xs text-gray-600">→ 기다리고 있었음<br />→ 높은 관심도</p>
            </div>
            <div className="bg-red-50 rounded p-3 border border-red-300">
              <p className="font-bold text-red-700 mb-1">❌ 30분 이상 방치</p>
              <p className="text-xs text-gray-600">→ 관심도 낮음<br />→ 우선순위 밀림</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        2위. 질문 황금 비율 🎯
      </h2>

      <div className="bg-blue-50 border-3 border-blue-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-700 mb-3">
          시간당 2.5개 질문 = 완벽한 관심 표현
        </h3>
        <p className="text-gray-700 mb-4">
          너무 많으면 부담, 너무 적으면 무관심. 딱 <strong>시간당 2~3개</strong>가 이상적입니다.
        </p>
        <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
          <div className="space-y-2 text-sm">
            <p className="text-gray-700">✅ 좋은 예: "오늘 뭐 했어? 점심 뭐 먹었어?"</p>
            <p className="text-gray-700">✅ 좋은 예: "요즘 관심사가 뭐야?"</p>
            <p className="text-red-600">❌ 나쁜 예: "뭐해?뭐해?뭐해?" (5분에 10개 질문)</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        3위. 이모티콘 60% 법칙 💕
      </h2>

      <div className="bg-pink-50 border-3 border-pink-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-pink-700 mb-3">
          메시지의 60% 이상에 이모티콘 = 호감 확정
        </h3>
        <table className="w-full border-2 border-pink-300 bg-white">
          <thead className="bg-pink-200">
            <tr>
              <th className="border border-pink-300 p-2">이모티콘 비율</th>
              <th className="border border-pink-300 p-2">의미</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-pink-300 p-2 text-center">70%+</td>
              <td className="border border-pink-300 p-2 text-green-600">💕 완전 호감</td>
            </tr>
            <tr>
              <td className="border border-pink-300 p-2 text-center">40~70%</td>
              <td className="border border-pink-300 p-2 text-blue-600">😊 긍정적</td>
            </tr>
            <tr>
              <td className="border border-pink-300 p-2 text-center">20% 미만</td>
              <td className="border border-pink-300 p-2 text-red-600">😐 무관심</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        4위. 미러링 효과 🪞
      </h2>

      <div className="bg-purple-50 border-3 border-purple-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-purple-700 mb-3">
          상대방 말투를 따라 하면 친밀감 UP
        </h3>
        <div className="bg-white rounded-lg p-4 border-2 border-purple-300 space-y-3">
          <div>
            <p className="font-bold text-purple-600 mb-2">예시 1:</p>
            <p className="text-sm text-gray-700">A: "오늘 날씨 진짜 좋다 ㅎㅎ"</p>
            <p className="text-sm text-gray-700">B: "인정! 나도 그 생각했어 ㅎㅎ"</p>
            <p className="text-xs text-green-600 mt-1">→ ㅎㅎ 동일하게 사용 (미러링 성공)</p>
          </div>
          <div>
            <p className="font-bold text-purple-600 mb-2">예시 2:</p>
            <p className="text-sm text-gray-700">A: "ㅋㅋㅋ 완전 웃기네"</p>
            <p className="text-sm text-gray-700">B: "ㅋㅋㅋ 인정 ㅋㅋ"</p>
            <p className="text-xs text-green-600 mt-1">→ ㅋ 개수 비슷하게 (미러링 성공)</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        5위. 읽씹 30분 한계선 ⚠️
      </h2>

      <div className="bg-red-50 border-3 border-red-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-red-700 mb-3">
          30분 이상 읽씹 = 관심도 급락 시작
        </h3>
        <div className="bg-white rounded-lg p-4 border-2 border-red-300">
          <p className="text-gray-700 mb-3">
            AI 분석 결과, 읽고도 30분 이상 답장 안 하면 상대방은 불안감을 느낍니다.
          </p>
          <div className="space-y-2">
            <div className="bg-green-50 rounded p-3 border border-green-300">
              <p className="font-bold text-green-700">✅ 5분 이내: 완벽</p>
              <p className="text-xs text-gray-600">상대방이 기다리고 있었다는 느낌</p>
            </div>
            <div className="bg-yellow-50 rounded p-3 border border-yellow-300">
              <p className="font-bold text-yellow-700">⚠️ 15~30분: 괜찮음</p>
              <p className="text-xs text-gray-600">바쁠 수 있다고 이해</p>
            </div>
            <div className="bg-red-50 rounded p-3 border border-red-300">
              <p className="font-bold text-red-700">❌ 30분+: 위험</p>
              <p className="text-xs text-gray-600">관심 없다고 느끼기 시작</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        6위. 새벽 메시지 법칙 🌙
      </h2>

      <div className="bg-indigo-50 border-3 border-indigo-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-indigo-700 mb-3">
          새벽 12시~2시 연락 = 특별한 사람
        </h3>
        <p className="text-gray-700 mb-4">
          잠들기 전 마지막으로 연락하는 사람이 <strong>가장 소중한 사람</strong>입니다.
        </p>
        <div className="bg-white rounded-lg p-4 border-2 border-indigo-300">
          <p className="text-sm text-gray-700">
            "자기 전에 너 생각나서..." → <span className="text-indigo-600 font-bold">최고 등급 호감</span>
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        7위. 대화 시작 비율 55:45 ⚖️
      </h2>

      <div className="bg-green-50 border-3 border-green-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-green-700 mb-3">
          이상적인 대화 시작 비율은 55:45
        </h3>
        <div className="bg-white rounded-lg p-4 border-2 border-green-300">
          <p className="text-gray-700 mb-3">
            한쪽이 너무 많이 시작하면 (70% 이상) 불균형 관계입니다.
          </p>
          <div className="grid md:grid-cols-3 gap-3 text-center text-sm">
            <div className="bg-green-100 rounded p-3 border border-green-400">
              <p className="font-bold text-green-700">55:45</p>
              <p className="text-xs text-gray-600">✅ 완벽</p>
            </div>
            <div className="bg-yellow-100 rounded p-3 border border-yellow-400">
              <p className="font-bold text-yellow-700">65:35</p>
              <p className="text-xs text-gray-600">⚠️ 주의</p>
            </div>
            <div className="bg-red-100 rounded p-3 border border-red-400">
              <p className="font-bold text-red-700">80:20</p>
              <p className="text-xs text-gray-600">❌ 위험</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        8위. ㅋ 3개 진심 법칙 😂
      </h2>

      <div className="bg-yellow-50 border-3 border-yellow-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-yellow-700 mb-3">
          ㅋㅋㅋ (3개) 이상 = 진짜 웃긴 것
        </h3>
        <table className="w-full border-2 border-yellow-400 bg-white text-sm">
          <tbody>
            <tr>
              <td className="border border-yellow-300 p-2 font-bold">ㅋ (1개)</td>
              <td className="border border-yellow-300 p-2">형식적 반응 (5%)</td>
            </tr>
            <tr>
              <td className="border border-yellow-300 p-2 font-bold">ㅋㅋ (2개)</td>
              <td className="border border-yellow-300 p-2">조금 웃김 (30%)</td>
            </tr>
            <tr className="bg-green-50">
              <td className="border border-yellow-300 p-2 font-bold">ㅋㅋㅋ (3개+)</td>
              <td className="border border-yellow-300 p-2 text-green-600">진심 웃김 (90%)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        9위. 사진 공유 심리 📸
      </h2>

      <div className="bg-orange-50 border-3 border-orange-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-orange-700 mb-3">
          일상 사진 자주 보내면 = 삶의 일부로 인정
        </h3>
        <div className="bg-white rounded-lg p-4 border-2 border-orange-300 space-y-2">
          <p className="text-gray-700">
            "오늘 점심 이거 먹었어 📸"<br />
            "길에서 이런 거 봤어 📸"<br />
            "우리 집 고양이 봐 📸"
          </p>
          <p className="text-sm text-orange-600 font-bold mt-3">
            → 일상을 공유 = 당신을 삶의 일부로 생각함
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        10위. 굿모닝/굿나잇 법칙 🌅🌙
      </h2>

      <div className="bg-cyan-50 border-3 border-cyan-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-cyan-700 mb-3">
          하루의 시작과 끝을 함께 = 최고 등급
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border-2 border-cyan-300">
            <p className="font-bold text-cyan-700 mb-2">🌅 아침 인사</p>
            <p className="text-sm text-gray-700">
              "좋은 아침! 오늘도 화이팅 💪"
            </p>
            <p className="text-xs text-green-600 mt-2">
              → 잠에서 깨자마자 당신 생각
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-cyan-300">
            <p className="font-bold text-cyan-700 mb-2">🌙 저녁 인사</p>
            <p className="text-sm text-gray-700">
              "오늘도 수고했어! 잘 자 😴"
            </p>
            <p className="text-xs text-green-600 mt-2">
              → 잠들기 전 마지막으로 당신 생각
            </p>
          </div>
        </div>
        <p className="text-center text-cyan-700 font-bold mt-4">
          두 가지 모두 해당 = 최고의 관심과 애정 💕
        </p>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        보너스: 종합 점수 계산법 🎯
      </h2>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-3 border-pink-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-pink-700 mb-4">
          10가지 법칙 중 몇 개나 해당되나요?
        </h3>

        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border-2 border-green-400">
            <p className="font-bold text-green-700">8~10개: 완벽한 관계 💕</p>
            <p className="text-sm text-gray-700">
              서로에게 최우선 순위. 이대로 쭉 가세요!
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-blue-400">
            <p className="font-bold text-blue-700">5~7개: 좋은 관계 😊</p>
            <p className="text-sm text-gray-700">
              호감은 확실. 조금만 더 노력하면 완벽!
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-yellow-400">
            <p className="font-bold text-yellow-700">3~4개: 관심 있음 🤔</p>
            <p className="text-sm text-gray-700">
              썸 단계. 더 적극적으로 다가가 보세요.
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-red-400">
            <p className="font-bold text-red-700">0~2개: 재고 필요 😢</p>
            <p className="text-sm text-gray-700">
              관심도가 낮습니다. 솔직한 대화가 필요해요.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-8 text-white text-center mt-12">
        <h3 className="text-2xl font-bold mb-3">🔬 내 대화도 과학적으로 분석하기</h3>
        <p className="mb-4">
          AI가 10가지 법칙을 모두 분석해 정확한 점수를 알려드립니다!
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          무료 분석 시작하기 →
        </Link>
      </div>
    </div>
  )
}
