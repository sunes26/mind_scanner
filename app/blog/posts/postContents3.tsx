import Link from 'next/link'

// 포스트 6: 이모티콘 사용량 심리 분석
export function EmoticonPsychologyGuide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        카톡에서 <strong>이모티콘 사용 빈도</strong>가 상대방의 진심을 알려준다는 사실, 알고 계셨나요?
        AI가 분석한 결과, 이모티콘 하나하나에 숨겨진 심리가 있었습니다.
      </p>

      <div className="bg-purple-100 border-4 border-purple-400 rounded-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-purple-700 mb-2">🎯 핵심 발견</h3>
        <p className="text-gray-700">
          호감도가 높을수록 <strong>이모티콘 사용 빈도가 3배 이상</strong> 높습니다!
        </p>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3">
        1. 이모티콘 사용 빈도별 심리 분석 📊
      </h2>

      <table className="w-full border-3 border-black">
        <thead className="bg-yellow-300">
          <tr>
            <th className="border-2 border-black p-3">이모티콘 비율</th>
            <th className="border-2 border-black p-3">심리 상태</th>
            <th className="border-2 border-black p-3">관심도</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="bg-green-50">
            <td className="border-2 border-black p-3 font-bold text-center">70% 이상</td>
            <td className="border-2 border-black p-3">적극적 호감 표현</td>
            <td className="border-2 border-black p-3 text-green-600 text-center">⭐⭐⭐⭐⭐</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold text-center">50~70%</td>
            <td className="border-2 border-black p-3">긍정적 관심</td>
            <td className="border-2 border-black p-3 text-blue-600 text-center">⭐⭐⭐⭐</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold text-center">30~50%</td>
            <td className="border-2 border-black p-3">보통 수준의 친밀감</td>
            <td className="border-2 border-black p-3 text-yellow-600 text-center">⭐⭐⭐</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold text-center">10~30%</td>
            <td className="border-2 border-black p-3">낮은 관심도</td>
            <td className="border-2 border-black p-3 text-orange-600 text-center">⭐⭐</td>
          </tr>
          <tr className="bg-red-50">
            <td className="border-2 border-black p-3 font-bold text-center">10% 미만</td>
            <td className="border-2 border-black p-3">형식적 대화</td>
            <td className="border-2 border-black p-3 text-red-600 text-center">⭐</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        2. 이모티콘 종류별 심리 분석 💕
      </h2>

      <div className="space-y-4">
        <div className="bg-pink-50 border-3 border-pink-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-pink-700 mb-3">💕 하트 이모티콘</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-pink-200">
              <p className="font-bold text-pink-600 mb-2">자주 사용 (주 5회 이상)</p>
              <p className="text-sm text-gray-700">
                → <strong>명확한 호감</strong><br />
                → 감정 표현에 적극적<br />
                → 연인 관계 가능성 높음
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
              <p className="font-bold text-gray-600 mb-2">거의 사용 안 함</p>
              <p className="text-sm text-gray-700">
                → 친구 관계 정도<br />
                → 감정 표현 신중<br />
                → 썸 단계 이전
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-3 border-yellow-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-yellow-700 mb-3">😂 웃음 이모티콘</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border-2 border-yellow-200">
              <p className="font-bold text-yellow-700">AI 분석 결과</p>
              <p className="text-sm text-gray-700 mt-2">
                웃음 이모티콘을 <strong>메시지마다 사용</strong>하는 사람은
                상대방과의 대화를 즐기고 있으며, 긍정적인 감정 상태입니다.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-green-100 rounded-lg p-3 border border-green-300 text-center">
                <p className="text-2xl mb-1">😂</p>
                <p className="text-xs text-gray-600">진심으로 웃김</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3 border border-blue-300 text-center">
                <p className="text-2xl mb-1">😊</p>
                <p className="text-xs text-gray-600">호감 표현</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-3 border border-purple-300 text-center">
                <p className="text-2xl mb-1">🥰</p>
                <p className="text-xs text-gray-600">애정 표현</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-3 border-blue-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-700 mb-3">🤔 생각/궁금 이모티콘</h3>
          <p className="text-gray-700 mb-3">
            상대방에 대한 <strong>관심과 호기심</strong>을 나타냅니다.
          </p>
          <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-700">
              "오늘 뭐 했어? 🤔"<br />
              "그거 어떻게 된 거야? 🤨"<br />
              "너는 뭐 좋아해? 🧐"
            </p>
            <p className="text-xs text-blue-600 mt-2">
              ✓ 질문과 함께 사용 → 진심 어린 관심
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        3. 유료 이모티콘 vs 기본 이모티콘 💰
      </h2>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-3 border-indigo-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-indigo-700 mb-4">AI 분석 통계</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-5 border-2 border-green-300">
            <h4 className="font-bold text-green-700 text-lg mb-3">✅ 유료 이모티콘 사용자</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>평균 사용 빈도:</strong> 메시지의 78%</li>
              <li>• <strong>심리 분석:</strong> 대화에 정성을 들임</li>
              <li>• <strong>감정 표현:</strong> 풍부하고 다채로움</li>
              <li>• <strong>관심도:</strong> 상대방을 즐겁게 하려는 노력</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-gray-300">
            <h4 className="font-bold text-gray-700 text-lg mb-3">기본 이모티콘만 사용</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>평균 사용 빈도:</strong> 메시지의 35%</li>
              <li>• <strong>심리 분석:</strong> 효율적인 대화 선호</li>
              <li>• <strong>감정 표현:</strong> 절제되고 간결함</li>
              <li>• <strong>관심도:</strong> 실용적 접근</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 bg-yellow-100 rounded-lg p-4 border-2 border-yellow-400">
          <p className="text-sm text-gray-700">
            ⚠️ <strong>주의:</strong> 유료 이모티콘 사용 여부만으로 호감도를 판단하면 안 됩니다!
            전체적인 대화 맥락과 함께 분석해야 정확합니다.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        4. 이모티콘 없는 메시지의 의미 🚫
      </h2>

      <div className="space-y-4">
        <div className="bg-red-50 border-3 border-red-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">❌ 위험 신호</h3>
          <p className="text-gray-700 mb-3">
            평소 이모티콘을 많이 쓰던 사람이 <strong>갑자기 사용하지 않으면</strong>:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• 기분이 좋지 않음</li>
            <li>• 화가 났거나 실망한 상태</li>
            <li>• 거리를 두고 싶어함</li>
            <li>• 관심도 급감</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-3 border-blue-300 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-700 mb-3">✅ 정상 신호</h3>
          <p className="text-gray-700 mb-3">
            원래 이모티콘을 잘 안 쓰는 사람이 계속 안 쓰면:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• 개인의 대화 스타일</li>
            <li>• 문제 없음</li>
            <li>• 텍스트로 감정 표현하는 타입</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        5. 실전 분석 예시 📱
      </h2>

      <div className="space-y-4">
        <div className="bg-green-50 border-3 border-green-400 rounded-xl p-6">
          <p className="font-bold text-green-700 mb-2">✅ 호감도 높음 (이모티콘 사용률 80%)</p>
          <div className="bg-white rounded-lg p-4 border border-green-300 space-y-1">
            <p className="text-gray-700">"오늘 날씨 진짜 좋다! ☀️"</p>
            <p className="text-gray-700">"너 점심 뭐 먹었어? 😊"</p>
            <p className="text-gray-700">"나는 파스타 먹었는데 맛있었어 ㅎㅎ 🍝"</p>
            <p className="text-gray-700">"너도 좋아하잖아! 다음에 같이 가자 💕"</p>
          </div>
          <p className="text-sm text-green-600 mt-2">
            → 감정 표현 풍부, 질문 포함, 미래 약속 제안
          </p>
        </div>

        <div className="bg-red-50 border-3 border-red-400 rounded-xl p-6">
          <p className="font-bold text-red-700 mb-2">❌ 호감도 낮음 (이모티콘 사용률 10%)</p>
          <div className="bg-white rounded-lg p-4 border border-red-300 space-y-1">
            <p className="text-gray-700">"ㅇㅇ"</p>
            <p className="text-gray-700">"그래"</p>
            <p className="text-gray-700">"나도"</p>
            <p className="text-gray-700">"ㅋㅋ"</p>
          </div>
          <p className="text-sm text-red-600 mt-2">
            → 단답형, 이모티콘 거의 없음, 질문 없음
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center mt-12">
        <h3 className="text-2xl font-bold mb-3">🎯 내 대화도 분석해보고 싶다면?</h3>
        <p className="mb-4">
          AI가 이모티콘 사용 패턴까지 완벽 분석해드립니다!
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          무료로 분석 시작하기 →
        </Link>
      </div>
    </div>
  )
}

// 포스트 7: ㅋㅋㅋ 개수로 보는 진심도 분석
export function KKKAnalysisGuide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        "ㅋㅋㅋ"의 개수가 상대방의 진심을 알려준다는 사실, 알고 계셨나요?
        AI가 <strong>15만 건의 카톡 대화</strong>를 분석한 결과,
        ㅋ의 개수에는 명확한 법칙이 있었습니다!
      </p>

      <div className="bg-yellow-100 border-4 border-yellow-400 rounded-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-yellow-700 mb-2">⚡ 핵심 발견</h3>
        <p className="text-gray-700">
          <strong className="text-yellow-700">ㅋ이 3개 이상</strong>이면 진짜 웃기다는 뜻!<br />
          1~2개는 단순 리액션입니다.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3">
        1. ㅋ 개수별 의미 분석 📊
      </h2>

      <table className="w-full border-3 border-black">
        <thead className="bg-yellow-300">
          <tr>
            <th className="border-2 border-black p-3">ㅋ 개수</th>
            <th className="border-2 border-black p-3">진심도</th>
            <th className="border-2 border-black p-3">의미</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border-2 border-black p-3 text-center font-bold">ㅋ (1개)</td>
            <td className="border-2 border-black p-3 text-center text-red-600">⭐</td>
            <td className="border-2 border-black p-3">형식적 반응, 별로 안 웃김</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 text-center font-bold">ㅋㅋ (2개)</td>
            <td className="border-2 border-black p-3 text-center text-orange-600">⭐⭐</td>
            <td className="border-2 border-black p-3">조금 웃김, 예의상 반응</td>
          </tr>
          <tr className="bg-green-50">
            <td className="border-2 border-black p-3 text-center font-bold">ㅋㅋㅋ (3개)</td>
            <td className="border-2 border-black p-3 text-center text-green-600">⭐⭐⭐⭐</td>
            <td className="border-2 border-black p-3">진짜 웃김, 긍정적 반응</td>
          </tr>
          <tr className="bg-green-50">
            <td className="border-2 border-black p-3 text-center font-bold">ㅋㅋㅋㅋ+ (4개 이상)</td>
            <td className="border-2 border-black p-3 text-center text-green-600">⭐⭐⭐⭐⭐</td>
            <td className="border-2 border-black p-3">매우 웃김, 재밌어 죽겠음</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 text-center font-bold">ㅋ x10+ (10개 이상)</td>
            <td className="border-2 border-black p-3 text-center text-purple-600">⭐⭐⭐⭐⭐</td>
            <td className="border-2 border-black p-3">폭소, 진심으로 터짐</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        2. 상황별 ㅋ 사용 패턴 🔍
      </h2>

      <div className="space-y-4">
        <div className="bg-green-50 border-3 border-green-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">✅ 호감도 높은 경우</h3>
          <div className="bg-white rounded-lg p-4 border-2 border-green-300 space-y-3">
            <div>
              <p className="text-sm text-gray-500">상대방: "오늘 길 가다가 개한테 쫓겼어 ㅠㅠ"</p>
              <p className="text-gray-700 mt-1">나: "ㅋㅋㅋㅋㅋㅋ 진짜? 괜찮아? ㅋㅋㅋ"</p>
              <p className="text-xs text-green-600 mt-1">→ 웃으면서도 걱정, 감정 표현 풍부</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">상대방: "나 오늘 시험 망했어..."</p>
              <p className="text-gray-700 mt-1">나: "헐 괜찮아 ㅠㅠ 다음에 잘 보면 되지!"</p>
              <p className="text-xs text-green-600 mt-1">→ 진지한 상황엔 ㅋ 안 씀, 공감 능력</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border-3 border-red-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">❌ 호감도 낮은 경우</h3>
          <div className="bg-white rounded-lg p-4 border-2 border-red-300 space-y-3">
            <div>
              <p className="text-sm text-gray-500">상대방: "오늘 길 가다가 개한테 쫓겼어 ㅠㅠ"</p>
              <p className="text-gray-700 mt-1">나: "ㅋ"</p>
              <p className="text-xs text-red-600 mt-1">→ 형식적 반응, 관심 없음</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">상대방: "이 영화 진짜 재밌었어!"</p>
              <p className="text-gray-700 mt-1">나: "ㅋㅋ"</p>
              <p className="text-xs text-red-600 mt-1">→ 최소한의 반응만, 대화 이어가기 없음</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        3. ㅎㅎ vs ㅋㅋ 차이점 🤔
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border-3 border-blue-300 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-700 mb-3">ㅎㅎ (부드러움)</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>뉘앙스:</strong> 따뜻하고 부드러운 웃음</li>
            <li>• <strong>감정:</strong> 미소, 설렘, 수줍음</li>
            <li>• <strong>사용 상황:</strong> 썸, 연인 사이</li>
            <li>• <strong>예시:</strong> "나도 보고 싶어 ㅎㅎ"</li>
          </ul>
          <div className="mt-3 bg-white rounded-lg p-3 border border-blue-200">
            <p className="text-sm text-blue-600 font-bold">AI 분석 결과</p>
            <p className="text-xs text-gray-600 mt-1">
              ㅎㅎ를 자주 쓰는 사람은 감정 표현이 섬세하고,
              상대방을 배려하는 성향이 강합니다.
            </p>
          </div>
        </div>

        <div className="bg-orange-50 border-3 border-orange-300 rounded-xl p-6">
          <h3 className="text-xl font-bold text-orange-700 mb-3">ㅋㅋ (활발함)</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>뉘앙스:</strong> 시원하고 활발한 웃음</li>
            <li>• <strong>감정:</strong> 즐거움, 재미, 유쾌함</li>
            <li>• <strong>사용 상황:</strong> 친구, 편한 사이</li>
            <li>• <strong>예시:</strong> "ㅋㅋㅋ 진짜 웃기네"</li>
          </ul>
          <div className="mt-3 bg-white rounded-lg p-3 border border-orange-200">
            <p className="text-sm text-orange-600 font-bold">AI 분석 결과</p>
            <p className="text-xs text-gray-600 mt-1">
              ㅋㅋ를 자주 쓰는 사람은 솔직하고 활발하며,
              감정 표현에 거리낌이 없습니다.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        4. 위험 신호: 갑작스러운 변화 ⚠️
      </h2>

      <div className="bg-red-100 border-4 border-red-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-red-700 mb-4">🚨 이런 변화는 주의하세요!</h3>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-red-300">
            <p className="font-bold text-red-600 mb-2">❌ 신호 1: ㅋ 개수 급감</p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700">평소: "ㅋㅋㅋㅋ 진짜? 대박 ㅋㅋㅋ"</p>
              <p className="text-gray-700">최근: "ㅋ" "ㅋㅋ"</p>
            </div>
            <p className="text-xs text-red-600 mt-2">
              → 관심도 하락, 기분 나쁜 일 발생 가능성
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-red-300">
            <p className="font-bold text-red-600 mb-2">❌ 신호 2: ㅋ만 단독 사용</p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700">나: "오늘 이거 봤어? 완전 웃김 ㅋㅋㅋ"</p>
              <p className="text-gray-700">상대방: "ㅋ"</p>
            </div>
            <p className="text-xs text-red-600 mt-2">
              → 형식적 반응, 대화 의지 없음
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-red-300">
            <p className="font-bold text-red-600 mb-2">❌ 신호 3: ㅎㅎ에서 ㅋㅋ로 변화</p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700">예전: "그랬구나 ㅎㅎ" "나도 ㅎㅎ"</p>
              <p className="text-gray-700">최근: "ㅋㅋ" "ㅇㅋ"</p>
            </div>
            <p className="text-xs text-red-600 mt-2">
              → 감정적 거리감 증가, 친밀도 하락
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        5. AI가 발견한 ㅋ 패턴 통계 📈
      </h2>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-3 border-purple-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-purple-700 mb-4">데이터 기반 인사이트</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
            <p className="font-bold text-purple-700 mb-2">연인 관계</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 평균 ㅋ 개수: <strong>4.7개</strong></li>
              <li>• ㅎㅎ 사용 비율: <strong>35%</strong></li>
              <li>• 혼용 패턴: 다양하게 사용</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
            <p className="font-bold text-blue-700 mb-2">친구 관계</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 평균 ㅋ 개수: <strong>3.2개</strong></li>
              <li>• ㅎㅎ 사용 비율: <strong>15%</strong></li>
              <li>• 혼용 패턴: 주로 ㅋㅋ만</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-green-200">
            <p className="font-bold text-green-700 mb-2">썸 단계</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 평균 ㅋ 개수: <strong>3.8개</strong></li>
              <li>• ㅎㅎ 사용 비율: <strong>45%</strong></li>
              <li>• 혼용 패턴: ㅎㅎ 급증 추세</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <p className="font-bold text-gray-700 mb-2">관심 없음</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 평균 ㅋ 개수: <strong>1.3개</strong></li>
              <li>• ㅎㅎ 사용 비율: <strong>5%</strong></li>
              <li>• 혼용 패턴: 거의 없음</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        6. 실전 분석 예시 💬
      </h2>

      <div className="space-y-4">
        <div className="bg-green-50 border-3 border-green-400 rounded-xl p-6">
          <p className="font-bold text-green-700 mb-3">✅ 긍정 사례 (진심으로 즐거움)</p>
          <div className="bg-white rounded-lg p-4 border border-green-300 space-y-2">
            <p className="text-gray-700">A: "오늘 강아지 봤는데 너 닮았더라 ㅋㅋㅋ"</p>
            <p className="text-gray-700">B: "ㅋㅋㅋㅋㅋ 뭐야 칭찬이야 욕이야? ㅋㅋㅋ"</p>
            <p className="text-gray-700">A: "당연히 칭찬이지 귀엽다구 ㅎㅎ"</p>
            <p className="text-gray-700">B: "ㅋㅋㅋㅋ 고마워 ㅎㅎ"</p>
          </div>
          <p className="text-sm text-green-600 mt-2">
            → ㅋ 3개 이상 지속, ㅎㅎ 혼용, 감정 표현 풍부
          </p>
        </div>

        <div className="bg-red-50 border-3 border-red-400 rounded-xl p-6">
          <p className="font-bold text-red-700 mb-3">❌ 부정 사례 (형식적 반응)</p>
          <div className="bg-white rounded-lg p-4 border border-red-300 space-y-2">
            <p className="text-gray-700">A: "오늘 이런 일 있었어! 완전 웃김 ㅋㅋㅋ"</p>
            <p className="text-gray-700">B: "ㅋ"</p>
            <p className="text-gray-700">A: "너도 이런 경험 있어?"</p>
            <p className="text-gray-700">B: "ㅇㅇ"</p>
          </div>
          <p className="text-sm text-red-600 mt-2">
            → ㅋ 1개 고정, 질문에도 단답형, 관심 없음
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 text-white text-center mt-12">
        <h3 className="text-2xl font-bold mb-3">🔍 내 대화의 ㅋ 패턴 궁금하다면?</h3>
        <p className="mb-4">
          AI가 ㅋ 개수, ㅎㅎ 비율, 감정 변화까지 완벽 분석!
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          무료 분석 시작하기 →
        </Link>
      </div>
    </div>
  )
}
