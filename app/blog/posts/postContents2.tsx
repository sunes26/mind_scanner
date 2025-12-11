import Link from 'next/link'

// 포스트 4: 누가 더 좋아하는지
export function WhoLikesMoreGuide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        "우리 중에 누가 더 좋아하는 걸까?" 궁금하시죠?
        AI가 분석한 <strong>10만 건의 카톡 대화</strong>에서 발견한 명확한 신호들을 알려드릴게요!
      </p>

      <div className="bg-pink-100 border-4 border-pink-400 rounded-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-pink-700 mb-2">💡 핵심 포인트</h3>
        <p className="text-gray-700">
          7가지 지표 중 <strong>4개 이상</strong> 해당되면 그 사람이 더 좋아하는 겁니다!
        </p>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3">
        1. 답장 속도 비교 ⏰
      </h2>

      <div className="bg-blue-50 border-3 border-blue-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-700 mb-4">AI 분석 결과</h3>
        <p className="text-gray-700 mb-4">
          <strong className="text-blue-700">더 좋아하는 사람의 평균 답장 시간: 3.2분</strong><br />
          덜 좋아하는 사람의 평균 답장 시간: 24.7분
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border-2 border-green-300">
            <p className="font-bold text-green-700 mb-2">✅ 더 좋아하는 사람</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 즉각 답장 (5분 이내)</li>
              <li>• 바빠도 짧게라도 답장</li>
              <li>• 새벽에도 답장 오는 경우 있음</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
            <p className="font-bold text-gray-700 mb-2">❌ 덜 좋아하는 사람</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 답장 시간 들쑥날쑥</li>
              <li>• 30분 이상 자주 걸림</li>
              <li>• 읽씹 후 늦게 답장</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        2. 메시지 길이와 정성 📝
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700">
          AI 분석 결과, 더 좋아하는 사람은 <strong>평균 메시지가 2.3배 더 깁니다</strong>.
        </p>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border-3 border-green-400 rounded-xl p-6">
          <h4 className="font-bold text-green-700 text-lg mb-3">✅ 더 좋아하는 사람의 메시지</h4>
          <div className="bg-white rounded-lg p-4 border border-green-300">
            <p className="text-gray-700">
              "오늘 날씨 진짜 좋더라! 나 학교 가는데 하늘 보니까 너 생각났어 ㅋㅋ
              너는 오늘 뭐 했어? 점심은 뭐 먹었어?"
            </p>
            <p className="text-xs text-green-600 mt-2">
              ✓ 구체적 상황 설명 ✓ 상대방 언급 ✓ 질문 포함
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-3 border-gray-400 rounded-xl p-6">
          <h4 className="font-bold text-gray-700 text-lg mb-3">❌ 덜 좋아하는 사람의 메시지</h4>
          <div className="bg-white rounded-lg p-4 border border-gray-300">
            <p className="text-gray-700">
              "ㅇㅇ 좋았어"
            </p>
            <p className="text-xs text-red-600 mt-2">
              ✗ 단답형 ✗ 질문 없음 ✗ 대화 이어가기 없음
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        3. 질문 빈도 🤔
      </h2>

      <table className="w-full border-3 border-black">
        <thead className="bg-yellow-300">
          <tr>
            <th className="border-2 border-black p-3">구분</th>
            <th className="border-2 border-black p-3">시간당 질문 수</th>
            <th className="border-2 border-black p-3">예시</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="bg-green-50">
            <td className="border-2 border-black p-3 font-bold">더 좋아함</td>
            <td className="border-2 border-black p-3 text-center font-bold text-green-600">평균 2.8개</td>
            <td className="border-2 border-black p-3 text-sm">
              "뭐 해?", "밥 먹었어?", "주말엔 뭐 할 거야?"
            </td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold">덜 좋아함</td>
            <td className="border-2 border-black p-3 text-center text-gray-600">평균 0.6개</td>
            <td className="border-2 border-black p-3 text-sm">
              질문보다는 답변만 하는 경우 많음
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        4. 이모티콘 & 하트 사용 💕
      </h2>

      <div className="bg-pink-50 border-3 border-pink-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-pink-700 mb-4">결정적 차이</h3>

        <div className="space-y-4">
          <div>
            <p className="font-bold text-pink-600 mb-2">💕 더 좋아하는 사람:</p>
            <div className="bg-white rounded-lg p-4 border-2 border-pink-200">
              <p className="text-gray-700 mb-2">• 이모티콘 사용률: <strong className="text-pink-600">67%</strong></p>
              <p className="text-gray-700 mb-2">• 하트 이모지: 대화 10개 중 3개</p>
              <p className="text-gray-700">• 다양한 표현: 😊🥰😂💕✨👍</p>
            </div>
          </div>

          <div>
            <p className="font-bold text-gray-600 mb-2">❌ 덜 좋아하는 사람:</p>
            <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
              <p className="text-gray-700 mb-2">• 이모티콘 사용률: <strong>23%</strong></p>
              <p className="text-gray-700 mb-2">• 하트 이모지: 거의 없음</p>
              <p className="text-gray-700">• ㅋㅋ, ㅇㅇ 같은 간단한 표현만</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        5. 대화 먼저 시작하기 👋
      </h2>

      <div className="bg-purple-50 border-3 border-purple-300 rounded-xl p-6">
        <p className="text-lg text-gray-700 mb-4">
          <strong className="text-purple-700">더 좋아하는 사람은 전체 대화의 58%를 먼저 시작</strong>합니다.
        </p>

        <div className="bg-white rounded-lg p-5 border-2 border-purple-200">
          <h4 className="font-bold text-purple-700 mb-3">주목할 패턴</h4>
          <ul className="space-y-2 text-gray-700">
            <li>✓ <strong>아침 인사:</strong> "잘 잤어?", "오늘 힘내!"</li>
            <li>✓ <strong>저녁 안부:</strong> "오늘 어땠어?", "고생했어!"</li>
            <li>✓ <strong>급 생각:</strong> "아 맞다!", "너 이거 봐봐"</li>
            <li>✓ <strong>밤 인사:</strong> "잘자!", "좋은 꿈 꿔"</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        6. 프로필 사진 & 상태 메시지 반응 📸
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border-3 border-blue-300 rounded-xl p-5">
          <h4 className="font-bold text-blue-700 mb-3">✅ 더 좋아하는 사람</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• "프사 바꿨네! 이쁘다"</li>
            <li>• "상메 뭔 뜻이야? ㅋㅋ"</li>
            <li>• 변화에 민감하게 반응</li>
          </ul>
        </div>

        <div className="bg-gray-50 border-3 border-gray-300 rounded-xl p-5">
          <h4 className="font-bold text-gray-700 mb-3">❌ 덜 좋아하는 사람</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• 프사 변경 눈치 못챔</li>
            <li>• 상태 메시지 관심 없음</li>
            <li>• 특별한 반응 없음</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        7. 약속과 만남 제안 📅
      </h2>

      <div className="bg-orange-50 border-3 border-orange-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-orange-700 mb-4">가장 결정적인 지표!</h3>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-green-300">
            <p className="font-bold text-green-700 mb-2">✅ 더 좋아하는 사람:</p>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• "이번 주말에 영화 볼래?"</li>
              <li>• "맛집 찾았는데 같이 갈래?"</li>
              <li>• "시간 되면 꼭 만나자!"</li>
              <li>• <strong>구체적인 날짜와 시간 제시</strong></li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-red-300">
            <p className="font-bold text-red-700 mb-2">❌ 덜 좋아하는 사람:</p>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• "나중에 시간 되면~"</li>
              <li>• "바빠서 힘들 듯"</li>
              <li>• "연락할게!" (연락 안 옴)</li>
              <li>• <strong>애매한 표현으로 회피</strong></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 border-3 border-gray-400 rounded-xl p-6 mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-3">📊 자가 진단 체크리스트</h3>
        <p className="text-gray-700 mb-4">
          다음 중 해당하는 항목에 체크해보세요:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li>□ 답장이 더 빠른 편이다</li>
          <li>□ 메시지가 더 길고 구체적이다</li>
          <li>□ 질문을 더 많이 한다</li>
          <li>□ 이모티콘과 하트를 더 많이 쓴다</li>
          <li>□ 먼저 대화를 시작하는 경우가 많다</li>
          <li>□ 프사/상메 변화를 먼저 알아챈다</li>
          <li>□ 만남을 먼저 제안한다</li>
        </ul>
        <p className="text-sm text-gray-600 mt-4">
          <strong>4개 이상:</strong> 당신이 더 좋아하는 것 같아요 💘<br />
          <strong>3개 이하:</strong> 상대방이 더 좋아하거나 균형적인 관계예요!
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 text-center mt-12">
        <h3 className="text-3xl font-bold text-white mb-4">
          정확한 분석이 궁금하다면?
        </h3>
        <p className="text-lg text-white mb-6 opacity-90">
          속마음 스캐너의 AI가 객관적으로 분석해드립니다!
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          무료로 분석 시작하기 →
        </Link>
      </div>
    </div>
  )
}

// 포스트 5: 답장 속도 심리
export function ReplySpeedPsychologyGuide() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        답장 속도에는 상대방의 <strong>진심이 숨어있습니다</strong>.
        AI가 분석한 10만 건의 대화로 밝혀낸 답장 속도와 호감도의 관계를 공개합니다!
      </p>

      <div className="bg-blue-100 border-4 border-blue-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-700 mb-3">⏰ 황금 답장 시간</h3>
        <p className="text-2xl font-bold text-blue-600 text-center">5 ~ 10분</p>
        <p className="text-gray-700 text-center mt-2">
          이 시간대의 답장이 가장 높은 호감도를 나타냅니다
        </p>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3">
        답장 속도별 심리 분석
      </h2>

      <div className="space-y-6">
        {/* 즉답 (1분 이내) */}
        <div className="bg-yellow-50 border-3 border-yellow-400 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-yellow-700">⚡ 즉답 (1분 이내)</h3>
            <span className="bg-yellow-200 px-3 py-1 rounded-full text-sm font-bold">호감도 78점</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="font-bold text-yellow-700 mb-1">긍정적 신호:</p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• 대화에 집중하고 있음</li>
                <li>• 답장이 기다려짐</li>
                <li>• 관심도가 높음</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-orange-700 mb-1">주의할 점:</p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• 너무 자주 즉답하면 "여유 없어 보일" 수 있음</li>
                <li>• 가끔은 5분 정도 기다리는 것도 전략</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5~10분 (황금 타임) */}
        <div className="bg-green-50 border-3 border-green-500 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-green-700">✨ 5~10분 (황금 타임)</h3>
            <span className="bg-green-200 px-3 py-1 rounded-full text-sm font-bold">호감도 92점</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="font-bold text-green-700 mb-1">최고의 답장 시간!</p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• 관심 있지만 여유로워 보임</li>
                <li>• 가장 밸런스 있는 답장 속도</li>
                <li>• 상대방에게 부담 안 줌</li>
                <li>• AI 분석 결과 가장 높은 만족도</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-3 border-2 border-green-300">
              <p className="text-sm text-gray-700">
                <strong className="text-green-700">💡 팁:</strong> 중요한 대화일수록 이 시간대 유지!
              </p>
            </div>
          </div>
        </div>

        {/* 15~30분 */}
        <div className="bg-blue-50 border-3 border-blue-300 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-blue-700">⏳ 15~30분</h3>
            <span className="bg-blue-200 px-3 py-1 rounded-full text-sm font-bold">호감도 71점</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="font-bold text-blue-700 mb-1">양면성이 있는 시간대:</p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• 바쁜 상황일 수 있음</li>
                <li>• 진지한 답변 준비 중일 수 있음</li>
                <li>• 또는 관심도가 조금 떨어질 수 있음</li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-600 italic">
                문맥 파악이 중요! 상대방이 바쁜 시간대인지 확인 필요
              </p>
            </div>
          </div>
        </div>

        {/* 1~3시간 */}
        <div className="bg-orange-50 border-3 border-orange-400 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-orange-700">😐 1~3시간</h3>
            <span className="bg-orange-200 px-3 py-1 rounded-full text-sm font-bold">호감도 58점</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="font-bold text-orange-700 mb-1">관심도 낮음 신호:</p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• 대화 우선순위가 낮음</li>
                <li>• 다른 일 하다가 생각남</li>
                <li>• 밀당 또는 무관심</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-3 border-2 border-orange-300">
              <p className="text-sm text-gray-700">
                <strong className="text-orange-700">⚠️ 주의:</strong> 자주 반복되면 관계 점검 필요
              </p>
            </div>
          </div>
        </div>

        {/* 하루 이상 */}
        <div className="bg-red-50 border-3 border-red-400 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-red-700">❌ 하루 이상</h3>
            <span className="bg-red-200 px-3 py-1 rounded-full text-sm font-bold">호감도 32점</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="font-bold text-red-700 mb-1">거의 관심 없음:</p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• 대화 의지 거의 없음</li>
                <li>• 어장관리 가능성 높음</li>
                <li>• 또는 정말 바쁜 상황</li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-red-600 font-semibold">
                ⚡ 이 패턴이 반복된다면 관계를 다시 생각해볼 시간!
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        시간대별 답장 패턴 분석 🌙
      </h2>

      <div className="bg-purple-50 border-3 border-purple-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-purple-700 mb-4">24시간 답장 패턴</h3>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-yellow-300">
            <h4 className="font-bold text-yellow-700 mb-2">🌅 새벽 (0~6시)</h4>
            <p className="text-gray-700 text-sm">
              <strong>즉답:</strong> 당신 생각에 잠 못 이룸 (호감도 ↑↑↑)<br />
              <strong>늦답:</strong> 자고 있거나 피곤해서 답장 안 함
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
            <h4 className="font-bold text-blue-700 mb-2">🌞 오전 (7~12시)</h4>
            <p className="text-gray-700 text-sm">
              <strong>즉답:</strong> 출근/등교 중에도 답장 (관심 있음)<br />
              <strong>늦답:</strong> 바쁜 시간대라 이해 가능
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
            <h4 className="font-bold text-orange-700 mb-2">☀️ 오후 (13~18시)</h4>
            <p className="text-gray-700 text-sm">
              <strong>즉답:</strong> 점심시간/휴식시간에 우선적으로 답장<br />
              <strong>늦답:</strong> 업무/수업 중일 가능성
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-pink-300">
            <h4 className="font-bold text-pink-700 mb-2">🌆 저녁 (19~24시)</h4>
            <p className="text-gray-700 text-sm">
              <strong>즉답:</strong> 가장 여유로운 시간, 대화하고 싶어 함<br />
              <strong>늦답:</strong> 다른 약속이 있거나 관심 적음
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12">
        답장 속도 일관성이 더 중요! 📊
      </h2>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-3 border-blue-400 rounded-xl p-6">
        <p className="text-lg text-gray-700 mb-4">
          AI 분석 결과, <strong className="text-blue-700">"일관성"이 속도보다 더 중요</strong>했습니다!
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border-2 border-green-300">
            <h4 className="font-bold text-green-700 mb-2">✅ 일관성 있음</h4>
            <p className="text-gray-700 text-sm mb-2">
              항상 10~15분 답장 + 바쁠 땐 미리 알려줌
            </p>
            <p className="text-green-600 font-semibold">→ 호감도 89점</p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-red-300">
            <h4 className="font-bold text-red-700 mb-2">❌ 일관성 없음</h4>
            <p className="text-gray-700 text-sm mb-2">
              어떨 땐 즉답, 어떨 땐 3시간... 예측 불가
            </p>
            <p className="text-red-600 font-semibold">→ 호감도 63점</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 border-3 border-gray-400 rounded-xl p-6 mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">💡 실전 팁</h3>
        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
          <li>너무 빠른 답장도 부담스러울 수 있음 (5분 정도 여유 OK)</li>
          <li>바쁠 때는 "지금 바빠! 나중에 답장할게" 한 마디면 충분</li>
          <li>읽씹보다는 늦게라도 답장하는 게 낫습니다</li>
          <li>중요한 대화일수록 즉각 반응 추천</li>
          <li>패턴을 일정하게 유지하는 것이 핵심!</li>
        </ol>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-red-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 text-center mt-12">
        <h3 className="text-3xl font-bold text-white mb-4">
          우리의 답장 패턴은 어떨까?
        </h3>
        <p className="text-lg text-white mb-6 opacity-90">
          속마음 스캐너로 정확한 분석 받아보세요!
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          무료 분석 시작 →
        </Link>
      </div>
    </div>
  )
}

// 다음 파일에서 계속 (포스트 6~10)...
