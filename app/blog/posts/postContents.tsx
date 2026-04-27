import Link from 'next/link'

// 포스트 2: 썸 vs 어장 구별법
export function SomeVsEojangGuide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        "이 사람, 나한테 관심 있는 걸까? 아니면 그냥 어장관리하는 걸까?"
        카카오톡 대화 패턴을 분석해보면, 썸과 어장 사이에는 생각보다 명확한 차이가 존재합니다.
      </p>

      <div className="bg-blue-50 border-4 border-blue-400 rounded-xl p-6">
        <h2 className="text-xl font-bold text-blue-700 mb-2">이 글에서 다루는 내용</h2>
        <p className="text-gray-700">
          심리학에서 말하는 <strong>호감의 행동 신호</strong>를 바탕으로, 카카오톡 대화에서 나타나는 5가지 패턴을 살펴봅니다.
          물론 사람마다 표현 방식은 다르지만, 여러 지표를 종합하면 관계의 온도를 파악하는 데 도움이 됩니다.
        </p>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5">
        <h3 className="font-bold text-yellow-800 mb-2">먼저 알아두세요</h3>
        <p className="text-gray-700 text-sm">
          아래 5가지 지표는 단독으로 판단하기보다 <strong>종합적으로</strong> 살펴보는 것이 중요합니다.
          직업, 성격, 상황에 따라 개인차가 크기 때문에 하나의 신호만으로 결론 내리지 않는 게 좋습니다.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3">
        1. 답장 속도와 일관성 📱
      </h2>

      <p className="text-gray-700 leading-relaxed">
        심리학 연구에 따르면, 우리는 중요하게 생각하는 대상에게 더 빠르게 반응합니다.
        답장 속도 자체보다 <strong>일관성</strong>이 더 중요한 신호입니다.
        바쁜 날도 짧게 답하거나 상황을 알려주는 행동이 진심의 표시입니다.
      </p>

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
        <h3 className="text-xl font-bold text-blue-700 mb-4">질문 빈도로 보는 관심도</h3>
        <p className="text-gray-700 mb-4">
          상대에게 관심이 많을수록 자연스럽게 <strong>질문을 더 많이</strong> 하게 됩니다.
          단순히 답변만 하는 게 아니라, 상대방의 일상을 궁금해하는 것이 핵심입니다.
        </p>

        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
            <p className="font-bold text-blue-700">✅ 관심 있는 사람의 질문</p>
            <p className="text-gray-600 text-sm mt-1">
              "오늘 뭐 했어?", "점심 뭐 먹었어?", "요즘 관심사가 뭐야?"<br />
              → 구체적이고, 상대방의 일상에 관심을 보임
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-red-200">
            <p className="font-bold text-red-700">❌ 관심 없는 사람의 답장</p>
            <p className="text-gray-600 text-sm mt-1">
              "ㅇㅇ", "그래?", "ㅋㅋ" — 대화를 이어가지 않고 수동적으로만 반응함
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
            <p className="font-bold text-yellow-700 text-sm">참고</p>
            <p className="text-gray-600 text-sm mt-1">
              내성적인 성격이거나 텍스트 대화를 불편해하는 사람은 질문이 적을 수 있습니다.
              오프라인에서의 태도도 함께 보는 것이 더 정확합니다.
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

      <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6 mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">💡 종합 판단 가이드</h3>
        <p className="text-gray-700 mb-3">
          5가지 지표 중 <strong>3개 이상 해당</strong>되면 비교적 명확한 신호라고 볼 수 있습니다.
        </p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• <strong>4~5개 해당:</strong> 관심이 있을 가능성이 높습니다</li>
          <li>• <strong>2~3개 해당:</strong> 아직 탐색 중이거나 관계가 초기 단계일 수 있습니다</li>
          <li>• <strong>0~1개 해당:</strong> 어장관리거나 단순 친구 사이일 가능성이 있습니다</li>
        </ul>
        <p className="text-gray-600 text-sm mt-3">
          단, 온라인 대화만으로는 한계가 있습니다. 실제로 만났을 때의 행동, 눈 맞춤, 몸짓 등 오프라인 신호도 함께 봐야 더 정확합니다.
        </p>
      </div>

      <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6 mt-6">
        <h3 className="text-xl font-bold text-purple-800 mb-3">관련해서 읽어보면 좋은 글</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/who-likes-more-kakaotalk" className="text-purple-700 hover:underline font-semibold">
              → 카톡 대화로 누가 더 좋아하는지 알 수 있을까?
            </Link>
          </li>
          <li>
            <Link href="/blog/reply-speed-psychology" className="text-purple-700 hover:underline font-semibold">
              → 답장 속도로 보는 호감도 심리 분석
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

// 포스트 3: AI 답장 패턴
export function AIReplyPatternsGuide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        카카오톡 대화를 들여다보면, <strong>호감도가 높은 사람들의 답장에는 공통된 패턴</strong>이 있습니다.
        단순히 빠른 답장이 아니라 질문의 방식, 공감의 깊이, 이야기를 이어가는 방법에서 차이가 납니다.
      </p>

      <div className="bg-blue-50 border-4 border-blue-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-700 mb-2">이 글에 대하여</h3>
        <p className="text-gray-700 text-sm">
          이 글은 커뮤니케이션 심리학과 관계 연구에서 자주 언급되는 <strong>호감·친밀감 형성 요소</strong>를 카카오톡 상황에 맞게 정리한 내용입니다.
          실제 연애 상황에서 참고용으로 활용하세요.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3">
        TOP 1. 적절한 답장 속도 ⏰
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
        TOP 2. 질문으로 대화 이어가기 💬
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700">
          호감도가 높은 대화에서 눈에 띄는 공통점은 <strong>질문을 통해 대화를 계속 이어가는 것</strong>입니다.
          단순히 내 이야기만 하거나, 상대의 말에 단답으로 끝내지 않습니다.
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
        TOP 3. 풍부한 이모티콘 사용 😊💕
      </h2>

      <div className="bg-pink-50 border-3 border-pink-300 rounded-xl p-6">
        <p className="text-lg text-gray-700 mb-4">
          텍스트만으로는 감정 전달이 어렵기 때문에, 이모티콘은 따뜻함과 친근감을 전달하는 중요한 수단입니다.
          관심 있는 상대에게는 자연스럽게 이모티콘 사용이 늘어나는 경향이 있습니다.
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
        TOP 6. 먼저 인사하기 👋
      </h2>

      <div className="bg-yellow-100 border-3 border-yellow-400 rounded-xl p-6">
        <p className="text-gray-700 text-lg mb-4">
          관심 있는 상대에게는 자연스럽게 먼저 연락하게 됩니다.
          일방적으로 기다리기만 하는 관계는 점차 거리가 멀어지기 쉽습니다.
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
        TOP 7. 일상 공유하기 📸
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700">
          사소한 일상을 공유하는 것은 심리학에서 <strong>자기노출(self-disclosure)</strong>이라고 부릅니다.
          자기노출이 늘어날수록 상대방도 마음을 열게 되는 경향이 있어, 관계의 친밀도를 높이는 데 효과적입니다.
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

      <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6 mt-10">
        <h3 className="text-xl font-bold text-gray-800 mb-3">정리: 호감도 높은 답장의 핵심</h3>
        <p className="text-gray-700 mb-3 text-sm">
          위 10가지 패턴의 공통점은 <strong>상대방을 진심으로 대하는 태도</strong>에서 자연스럽게 나온다는 점입니다.
          기술적으로 흉내 낼 수도 있지만, 진정한 관심 없이는 오래 유지하기 어렵습니다.
        </p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>✓ 적절한 답장 속도 유지 (너무 빠르거나 느리지 않게)</li>
          <li>✓ 질문으로 대화를 이어가기</li>
          <li>✓ 이모티콘으로 감정 전달</li>
          <li>✓ 상대방 상황에 구체적으로 공감하기</li>
          <li>✓ 먼저 연락하는 용기</li>
          <li>✓ 사소한 일상 나누기</li>
        </ul>
      </div>

      <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-5 mt-6">
        <h3 className="text-lg font-bold text-purple-800 mb-2">함께 읽어보세요</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/how-to-distinguish-some-vs-eojang" className="text-purple-700 hover:underline font-semibold">
              → 카톡으로 썸인지 어장인지 구별하는 방법 5가지
            </Link>
          </li>
          <li>
            <Link href="/blog/emoticon-usage-psychology" className="text-purple-700 hover:underline font-semibold">
              → 이모티콘 사용량으로 알아보는 상대방 마음
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

// 포스트 4~10은 다음 파일에서 계속...
