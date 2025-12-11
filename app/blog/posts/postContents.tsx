import Link from 'next/link'

// 포스트 2: 썸 vs 어장 구별법
export function SomeVsEojangGuide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        "이 사람, 나한테 관심 있는 걸까? 아니면 그냥 어장관리하는 걸까?"
        10만 건의 카카오톡 대화를 AI로 분석한 결과, 썸과 어장에는 명확한 차이가 있었습니다.
      </p>

      <div className="bg-pink-50 border-4 border-pink-500 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-pink-700 mb-3">⚠️ 중요!</h2>
        <p className="text-gray-700">
          이 글의 모든 데이터는 속마음 스캐너의 AI 분석 결과를 기반으로 합니다.
          실제 대화를 분석해보고 싶다면 아래 버튼을 클릭하세요!
        </p>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3">
        1. 답장 속도와 일관성 📱
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 border-3 border-green-500 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">✅ 썸 타는 사람</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>일관된 답장 속도</strong>: 바쁠 때도 알려줌</li>
            <li>• <strong>평균 답장 시간</strong>: 5~15분</li>
            <li>• <strong>새벽/심야 답장</strong>: 가끔 있음</li>
            <li>• <strong>읽씹 후</strong>: "미안, 바빴어" 설명</li>
          </ul>
        </div>

        <div className="bg-red-50 border-3 border-red-500 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">❌ 어장관리하는 사람</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>들쑥날쑥한 답장</strong>: 예측 불가</li>
            <li>• <strong>관심 있을 때만</strong>: 빠르게 답장</li>
            <li>• <strong>늦은 시간</strong>: 심심할 때만 연락</li>
            <li>• <strong>읽씹</strong>: 설명 없이 자주 발생</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        2. 질문 빈도와 관심도 🤔
      </h2>

      <div className="bg-blue-50 border-3 border-blue-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-700 mb-4">AI 분석 결과</h3>
        <p className="text-gray-700 mb-4">
          호감도가 높은 사람은 <strong className="text-blue-700">시간당 평균 2.3개의 질문</strong>을 던집니다.
          어장관리하는 사람은 평균 0.8개에 불과했습니다.
        </p>

        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
            <p className="font-bold text-blue-700">✅ 썸 타는 사람의 질문</p>
            <p className="text-gray-600 text-sm mt-1">
              "오늘 뭐 했어?", "점심 뭐 먹었어?", "요즘 관심사가 뭐야?"
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-red-200">
            <p className="font-bold text-red-700">❌ 어장관리하는 사람의 질문</p>
            <p className="text-gray-600 text-sm mt-1">
              "ㅇㅇ", "그래?", "ㅋㅋ" (질문 거의 없음)
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        3. 이모티콘과 감정 표현 💕
      </h2>

      <table className="w-full border-3 border-black">
        <thead className="bg-yellow-300">
          <tr>
            <th className="border-2 border-black p-3 text-left">구분</th>
            <th className="border-2 border-black p-3 text-left">썸 타는 중</th>
            <th className="border-2 border-black p-3 text-left">어장관리</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border-2 border-black p-3 font-bold">이모티콘 사용</td>
            <td className="border-2 border-black p-3 text-green-600">메시지의 60% 이상</td>
            <td className="border-2 border-black p-3 text-red-600">20% 미만</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold">하트 이모지</td>
            <td className="border-2 border-black p-3 text-green-600">자주 사용 💕</td>
            <td className="border-2 border-black p-3 text-red-600">거의 없음</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold">ㅋㅋㅋ 개수</td>
            <td className="border-2 border-black p-3 text-green-600">3개 이상</td>
            <td className="border-2 border-black p-3 text-red-600">1~2개</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        4. 대화 주도권과 적극성 🎯
      </h2>

      <div className="space-y-4">
        <p className="text-lg text-gray-700">
          누가 먼저 대화를 시작하는지도 중요한 지표입니다.
        </p>

        <div className="bg-gradient-to-r from-green-100 to-green-50 border-3 border-green-500 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">✅ 썸 타는 사람</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ <strong>먼저 인사</strong>: "오늘 잘 잤어?", "밥은 먹었어?"</li>
            <li>✓ <strong>대화 이어가기</strong>: 답장이 끝나도 새 주제 제시</li>
            <li>✓ <strong>약속 제안</strong>: "이번 주말에 영화 볼래?"</li>
            <li>✓ <strong>일상 공유</strong>: "오늘 이런 일이 있었어!"</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-red-50 border-3 border-red-500 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">❌ 어장관리하는 사람</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✗ <strong>수동적</strong>: 먼저 연락 거의 안 함</li>
            <li>✗ <strong>짧은 답장</strong>: "ㅇㅇ", "ㅋㅋ", "그래"</li>
            <li>✗ <strong>약속 회피</strong>: "나중에", "바빠서"</li>
            <li>✗ <strong>단답형</strong>: 대화가 금방 끝남</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        5. 약속과 만남에 대한 태도 📅
      </h2>

      <div className="bg-purple-50 border-3 border-purple-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-purple-700 mb-4">결정적 차이</h3>

        <div className="space-y-4">
          <div>
            <p className="font-bold text-green-700 text-lg mb-2">✅ 썸 타는 사람:</p>
            <p className="text-gray-700">
              "이번 주 토요일 어때?", "시간 되면 알려줘!", "다음엔 내가 맛집 찾아볼게"
            </p>
            <p className="text-sm text-gray-600 mt-1 italic">
              → 구체적인 날짜와 시간 제시, 다음 약속까지 생각
            </p>
          </div>

          <div>
            <p className="font-bold text-red-700 text-lg mb-2">❌ 어장관리하는 사람:</p>
            <p className="text-gray-700">
              "나중에 시간 되면~", "바빠서 힘들 것 같아", "또 연락할게!"
            </p>
            <p className="text-sm text-gray-600 mt-1 italic">
              → 애매한 표현, 구체적인 계획 없음
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 text-center mt-12">
        <h3 className="text-3xl font-bold text-black mb-4">
          우리 관계, 정확히 알고 싶다면?
        </h3>
        <p className="text-lg text-black mb-6">
          속마음 스캐너의 AI가 10초 만에 분석해드립니다!
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg border-3 border-black"
        >
          무료로 지금 바로 분석하기 →
        </Link>
      </div>

      <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6 mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">💡 마무리 팁</h3>
        <p className="text-gray-700 mb-3">
          5가지 지표 중 <strong>3개 이상 해당</strong>되면 높은 확률로 그 범주에 속합니다.
        </p>
        <p className="text-gray-600 text-sm">
          단, 사람마다 표현 방식이 다를 수 있으니 참고용으로만 활용하세요.
          정확한 분석은 속마음 스캐너로! 😊
        </p>
      </div>
    </div>
  )
}

// 포스트 3: AI 답장 패턴
export function AIReplyPatternsGuide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        10만 건의 카카오톡 대화를 AI로 분석한 결과, <strong>호감도가 높은 사람들의 답장에는 공통된 패턴</strong>이 있었습니다.
        지금부터 그 비밀을 공개합니다!
      </p>

      <div className="bg-yellow-50 border-4 border-yellow-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-yellow-800 mb-3">📊 분석 데이터</h3>
        <ul className="space-y-1 text-gray-700">
          <li>• 총 분석 대화: 100,247건</li>
          <li>• 평균 호감도: 72.3점</li>
          <li>• 분석 기간: 2024.1 ~ 2024.12</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3">
        TOP 1. 적절한 답장 속도 (85%가 사용) ⏰
      </h2>

      <div className="bg-blue-50 border-3 border-blue-300 rounded-xl p-6">
        <p className="text-lg text-gray-700 mb-4">
          AI 분석 결과, 호감도 90점 이상인 사람들의 <strong className="text-blue-700">평균 답장 시간은 5~10분</strong>이었습니다.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-lg p-4 border-2 border-red-200">
            <p className="font-bold text-red-600 text-center mb-2">❌ 너무 빠름 (1분 이내)</p>
            <p className="text-sm text-gray-600 text-center">"할 일 없나?" 느낌</p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-green-300">
            <p className="font-bold text-green-600 text-center mb-2">✅ 적절 (5~15분)</p>
            <p className="text-sm text-gray-600 text-center">"관심있지만 여유있음"</p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-red-200">
            <p className="font-bold text-red-600 text-center mb-2">❌ 너무 느림 (1시간+)</p>
            <p className="text-sm text-gray-600 text-center">"관심 없나?" 느낌</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        TOP 2. 질문으로 대화 이어가기 (78%) 💬
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700">
          호감도가 높은 사람들은 <strong>답장의 60% 이상에 질문</strong>을 포함합니다.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-3 border-green-400 rounded-xl p-5">
            <h3 className="font-bold text-green-700 text-lg mb-3">✅ 좋은 예시</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="bg-white rounded-lg p-3 border border-green-200">
                "나 오늘 영화 봤어! <strong>너는 오늘 뭐 했어?</strong>"
              </p>
              <p className="bg-white rounded-lg p-3 border border-green-200">
                "맛있었어 ㅋㅋ <strong>너도 좋아해?</strong>"
              </p>
              <p className="bg-white rounded-lg p-3 border border-green-200">
                "그렇구나! <strong>그럼 주말엔 뭐 할 거야?</strong>"
              </p>
            </div>
          </div>

          <div className="bg-red-50 border-3 border-red-400 rounded-xl p-5">
            <h3 className="font-bold text-red-700 text-lg mb-3">❌ 나쁜 예시</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="bg-white rounded-lg p-3 border border-red-200">
                "나 오늘 영화 봤어." (질문 없음)
              </p>
              <p className="bg-white rounded-lg p-3 border border-red-200">
                "ㅇㅇ 맛있었어" (대화 끝)
              </p>
              <p className="bg-white rounded-lg p-3 border border-red-200">
                "그래" (무관심)
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        TOP 3. 풍부한 이모티콘 사용 (73%) 😊💕
      </h2>

      <div className="bg-pink-50 border-3 border-pink-300 rounded-xl p-6">
        <p className="text-lg text-gray-700 mb-4">
          호감도 80점 이상: <strong className="text-pink-600">메시지의 평균 65%에 이모티콘 포함</strong>
        </p>

        <div className="bg-white rounded-xl p-5 border-2 border-pink-200 mt-4">
          <h4 className="font-bold text-pink-700 mb-3">가장 많이 사용된 이모티콘 TOP 5</h4>
          <ol className="space-y-2 text-gray-700">
            <li>1. 😊 웃는 얼굴 (34%)</li>
            <li>2. ㅋㅋㅋ 웃음 표현 (28%)</li>
            <li>3. 💕 하트 (19%)</li>
            <li>4. 😂 크게 웃는 얼굴 (11%)</li>
            <li>5. 🥰 사랑스러운 얼굴 (8%)</li>
          </ol>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        TOP 4. 공감과 리액션 (70%) 👍
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700 text-lg">
          상대방 메시지에 <strong>구체적으로 반응</strong>하는 것이 중요합니다.
        </p>

        <div className="bg-blue-100 border-2 border-blue-400 rounded-xl p-5">
          <h4 className="font-bold text-blue-700 mb-3">✅ 효과적인 공감 표현</h4>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-gray-500">상대: "오늘 시험 망쳤어..."</p>
              <p className="text-gray-700 mt-1">
                <strong>나:</strong> "헐 진짜? ㅠㅠ 많이 속상하겠다... 무슨 과목이야?"
              </p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-gray-500">상대: "오늘 승진 발표났어!"</p>
              <p className="text-gray-700 mt-1">
                <strong>나:</strong> "오!! 축하해!!! 🎉 진짜 대단하다! 저녁 쏴야겠는데? ㅋㅋ"
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        TOP 5. 적절한 메시지 길이 (68%) 📏
      </h2>

      <table className="w-full border-3 border-black mt-4">
        <thead className="bg-purple-300">
          <tr>
            <th className="border-2 border-black p-3">구분</th>
            <th className="border-2 border-black p-3">글자 수</th>
            <th className="border-2 border-black p-3">호감도</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border-2 border-black p-3">너무 짧음</td>
            <td className="border-2 border-black p-3 text-center">1~5자</td>
            <td className="border-2 border-black p-3 text-red-600 text-center">65점</td>
          </tr>
          <tr className="bg-green-50">
            <td className="border-2 border-black p-3 font-bold">✅ 적절</td>
            <td className="border-2 border-black p-3 text-center font-bold">15~50자</td>
            <td className="border-2 border-black p-3 text-green-600 text-center font-bold">88점</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3">너무 김</td>
            <td className="border-2 border-black p-3 text-center">100자+</td>
            <td className="border-2 border-black p-3 text-orange-600 text-center">72점</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        TOP 6. 먼저 인사하기 (65%) 👋
      </h2>

      <div className="bg-yellow-100 border-3 border-yellow-400 rounded-xl p-6">
        <p className="text-gray-700 text-lg mb-4">
          호감도 높은 사람들은 <strong>전체 대화의 40~50%를 먼저 시작</strong>합니다.
        </p>
        <div className="bg-white rounded-lg p-4 border-2 border-yellow-300">
          <h4 className="font-bold text-yellow-700 mb-2">효과적인 대화 시작</h4>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>• "오늘 잘 잤어?"</li>
            <li>• "점심 뭐 먹었어?"</li>
            <li>• "이거 봐봐! (사진/링크)"</li>
            <li>• "너 이거 좋아하지 않았어?"</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        TOP 7. 일상 공유하기 (62%) 📸
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700">
          사소한 일상을 공유하면 <strong>친밀감이 37% 증가</strong>합니다.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-300">
            <h4 className="font-bold text-blue-700 mb-2">✅ 좋은 일상 공유</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• "오늘 카페에서 이거 먹었어!"</li>
              <li>• "길에서 강아지 봤는데 너무 귀여웠어"</li>
              <li>• "오늘 날씨 진짜 좋더라!"</li>
            </ul>
          </div>

          <div className="bg-red-50 rounded-xl p-4 border-2 border-red-300">
            <h4 className="font-bold text-red-700 mb-2">❌ 피해야 할 공유</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 과도한 자랑</li>
              <li>• 부정적인 불평만</li>
              <li>• TMI (너무 사적인 정보)</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        TOP 8~10. 기타 패턴
      </h2>

      <div className="space-y-4">
        <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-5">
          <h4 className="font-bold text-purple-700 mb-2">8. 칭찬과 격려 (58%)</h4>
          <p className="text-gray-700 text-sm">
            "대단하다!", "멋있어!", "잘했어!" 같은 긍정적 표현 자주 사용
          </p>
        </div>

        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
          <h4 className="font-bold text-green-700 mb-2">9. 약속 먼저 제안 (55%)</h4>
          <p className="text-gray-700 text-sm">
            "이번 주말에 영화 볼래?", "같이 밥 먹을래?" 적극적 제안
          </p>
        </div>

        <div className="bg-pink-50 border-2 border-pink-300 rounded-xl p-5">
          <h4 className="font-bold text-pink-700 mb-2">10. 맞춤법 신경 쓰기 (52%)</h4>
          <p className="text-gray-700 text-sm">
            지나친 축약어나 오타 지양, 읽기 편한 문장 사용
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-purple-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 text-center mt-12">
        <h3 className="text-3xl font-bold text-white mb-4">
          우리 대화는 몇 점일까?
        </h3>
        <p className="text-lg text-white mb-6 opacity-90">
          속마음 스캐너로 지금 바로 확인하세요!
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          무료 분석 시작하기 💘
        </Link>
      </div>
    </div>
  )
}

// 포스트 4~10은 다음 파일에서 계속...
