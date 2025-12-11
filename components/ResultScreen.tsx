'use client'

import { useEffect, useState } from 'react'
import { RotateCcw, Share2, MessageSquare, Zap, PieChart, Clock, Heart, Lock, Key } from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, Filler } from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { AnalysisResult, ChatData } from '@/types'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useCountUp } from '@/hooks/useCountUp'
import {
  fadeIn,
  slideDown,
  staggerContainer,
  staggerItem,
  chartAnimation,
  scrollReveal,
} from '@/utils/animations'
import { safePercentage, sanitizeNumber } from '@/utils/sanitize'
import InterstitialAd from '@/components/ads/InterstitialAd'
import ResultPageAd from '@/components/ads/ResultPageAd'

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, Filler)

interface ResultScreenProps {
  result: AnalysisResult
  chatData: ChatData
  onRetry: () => void
  onShare: () => void
}

export default function ResultScreen({ result, chatData, onRetry, onShare }: ResultScreenProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<'p1' | 'p2'>('p1')
  const [showInterstitialAd, setShowInterstitialAd] = useState(false)

  useEffect(() => {
    const duration = 1500
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentScore = Math.floor(progress * result.score)
      setDisplayScore(currentScore)
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [result.score])

  const handleUnlock = () => {
    setShowInterstitialAd(true)
  }

  const handleAdComplete = () => {
    setIsUnlocked(true)
  }

  // Calculate real statistics
  const p1Stats = chatData.analysis?.participants[chatData.p1]
  const p2Stats = chatData.analysis?.participants[chatData.p2]
  const totalMessages = chatData.total

  // 보안: 0으로 나누기 방지
  const p1Percentage = safePercentage(chatData.countP1, totalMessages, 0)
  const p2Percentage = safePercentage(chatData.countP2, totalMessages, 0)

  // Calculate values for count animations
  const totalDays = Math.max(chatData.analysis?.totalDays || 1, 1)
  const avgPerDay = sanitizeNumber(Math.round(totalMessages / totalDays), 0, Number.MAX_SAFE_INTEGER, 0)

  // Count up animations
  const animatedAvgPerDay = useCountUp(avgPerDay, { duration: 1500, delay: 300 })
  const animatedTotalMessages = useCountUp(totalMessages, { duration: 1500, delay: 400 })

  // Get time distribution (실제 데이터만 사용)
  const timeDistribution = chatData.analysis?.timeDistribution
  const hasTimeData = timeDistribution && (
    timeDistribution.morning > 0 ||
    timeDistribution.afternoon > 0 ||
    timeDistribution.evening > 0 ||
    timeDistribution.night > 0
  )

  // Calculate stats for selected person
  const selectedStats = selectedPerson === 'p1' ? p1Stats : p2Stats
  const selectedName = selectedPerson === 'p1' ? chatData.p1 : chatData.p2

  // Calculate laugh ratio (실제 데이터만 사용)
  const p1Laugh = p1Stats?.laughCount || 0
  const p2Laugh = p2Stats?.laughCount || 0
  const totalLaugh = p1Laugh + p2Laugh

  // 보안: 0으로 나누기 방지
  const p1LaughPercent = safePercentage(p1Laugh, totalLaugh, 0)
  const p2LaughPercent = safePercentage(p2Laugh, totalLaugh, 0)

  // Calculate interest score (관심도 지수) - 비율 기반
  const calculateInterest = (stats: any, messageCount: number, messagePercent: number) => {
    if (messageCount === 0) return 0

    // 보안: 0으로 나누기 방지
    const questionRatio = messageCount > 0 ? (stats?.questionCount || 0) / messageCount : 0
    const emojiRatio = messageCount > 0 ? (stats?.emojiCount || 0) / messageCount : 0
    const avgLength = sanitizeNumber(stats?.avgMessageLength || 0, 0, 1000, 0)

    // 점수 계산 (0-100)
    const questionScore = Math.min(questionRatio * 150, 15) // 질문 많으면 관심 높음 (최대 15점)
    const emojiScore = Math.min(emojiRatio * 200, 15) // 이모지 많으면 감정표현 풍부 (최대 15점)
    const lengthScore = Math.min(avgLength / 3, 20) // 긴 메시지 = 성의있음 (최대 20점)
    const balanceScore = 50 - Math.abs(50 - messagePercent) // 균형잡힌 대화 (최대 50점)

    const totalScore = questionScore + emojiScore + lengthScore + balanceScore
    return sanitizeNumber(Math.round(totalScore), 0, 100, 0)
  }

  const p1Interest = calculateInterest(p1Stats, chatData.countP1, p1Percentage)
  const p2Interest = calculateInterest(p2Stats, chatData.countP2, p2Percentage)
  const avgInterest = sanitizeNumber(Math.round((p1Interest + p2Interest) / 2), 0, 100, 0)

  // Chart.js data and options for donut chart
  const chartData = {
    labels: [chatData.p1, chatData.p2],
    datasets: [
      {
        data: [p1Percentage, p2Percentage],
        backgroundColor: ['#4D96FF', '#FF6B6B'],
        borderColor: '#000000',
        borderWidth: 3,
        hoverOffset: 4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}% (${context.parsed === p1Percentage ? chatData.countP1 : chatData.countP2}개)`
          }
        }
      }
    },
    cutout: '60%',
  }

  // 24-hour activity chart data (실제 데이터가 있을 때만)
  const timeChartData = hasTimeData && timeDistribution ? {
    labels: ['0시', '6시', '12시', '18시', '24시'],
    datasets: [
      {
        label: '대화량',
        data: [
          timeDistribution.night,
          timeDistribution.morning,
          timeDistribution.afternoon,
          timeDistribution.evening,
          timeDistribution.night
        ],
        borderColor: '#000000',
        backgroundColor: 'rgba(255, 210, 51, 0.5)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#000000',
        pointBorderColor: '#000000',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  } : null

  const timeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        padding: 12,
        callbacks: {
          title: function(context: any) {
            const label = context[0].label
            const timeRanges: { [key: string]: string } = {
              '0시': '0시 ~ 6시 (새벽)',
              '6시': '6시 ~ 12시 (오전)',
              '12시': '12시 ~ 18시 (오후)',
              '18시': '18시 ~ 24시 (저녁)',
              '24시': '0시 ~ 6시 (새벽)'
            }
            return timeRanges[label] || label
          },
          label: function(context: any) {
            return `대화량: ${context.parsed.y}개`
          }
        }
      }
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#000',
          font: {
            size: 12,
            weight: 'bold' as const,
          }
        }
      }
    }
  }

  return (
    <motion.section
      className="w-full max-w-6xl py-8"
      role="main"
      aria-labelledby="report-title"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Top Action Bar */}
      <header className="flex justify-between items-center mb-8">
        <h1 id="report-title" className="text-3xl font-display">분석 리포트</h1>
        <nav className="flex gap-3" aria-label="분석 리포트 액션">
          <button
            onClick={() => {
              if (window.confirm('처음부터 다시 분석하시겠어요?\n현재 결과는 사라집니다.')) {
                onRetry()
              }
            }}
            aria-label="새로운 대화 파일로 다시 분석하기"
            className="neo-btn bg-white px-4 py-2 rounded-lg text-sm hover:bg-gray-100 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" /> 다시하기
          </button>
          <button
            onClick={onShare}
            aria-label="분석 결과 공유하기"
            className="neo-btn bg-[#4D96FF] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3d84ff] flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" aria-hidden="true" /> 공유하기
          </button>
        </nav>
      </header>

      {/* Bento Grid - Fixed Layout */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Row 1 - Score Card (Larger) + 2 Medium Cards */}
        {/* Score Card (2 columns) */}
        <motion.section
          role="region"
          aria-labelledby="score-heading"
          className="neo-card p-4 sm:p-6 rounded-[2rem] flex flex-col justify-center items-center text-center relative overflow-hidden lg:col-span-2 min-h-[300px]"
          style={{ backgroundColor: '#FFD233' }}
          variants={staggerItem}
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:16px_16px]" aria-hidden="true"></div>
          <div className="z-10">
            <h2 id="score-heading" className="bg-black text-white px-4 py-1 rounded-full text-sm font-bold border-2 border-white shadow-md mb-4 inline-block">
              종합 애정 지수
            </h2>
            <div className="flex justify-center items-end gap-1 my-2" aria-label={`종합 점수 ${displayScore}점`}>
              <span className="font-black text-7xl md:text-8xl lg:text-9xl text-black drop-shadow-[6px_6px_0px_white]" aria-hidden="true">
                {displayScore}
              </span>
              <span className="font-bold text-3xl md:text-4xl lg:text-5xl text-black mb-4" aria-hidden="true">%</span>
            </div>
            <p className="mt-4 bg-white border-3 border-black text-black text-lg md:text-xl lg:text-2xl font-bold py-3 px-6 md:px-8 rounded-2xl shadow-[6px_6px_0px_0px_black] inline-block transform -rotate-1">
              {result.relation}
            </p>
          </div>
        </motion.section>

        {/* Daily Average Messages (1 column) */}
        <motion.section
          role="region"
          aria-labelledby="daily-avg-heading"
          className="neo-card bg-white p-4 sm:p-6 rounded-2xl flex flex-col justify-center items-center text-center lg:col-span-1"
          variants={staggerItem}
        >
          <div className="bg-gray-100 p-3 rounded-full mb-3 border-2 border-black" aria-hidden="true">
            <MessageSquare className="w-6 h-6 text-gray-600" />
          </div>
          <h3 id="daily-avg-heading" className="text-sm font-bold text-gray-500 mb-1">하루 평균 메시지</h3>
          <p className="font-display text-4xl" aria-label={`하루 평균 ${animatedAvgPerDay}개의 메시지`}>
            {animatedAvgPerDay}
          </p>
          <span className="text-xs bg-lime-100 text-lime-700 px-2 py-0.5 rounded border border-lime-300 mt-2 font-bold">
            {(() => {
              const totalDays = chatData.analysis?.totalDays || 1
              const avgPerDay = totalMessages / totalDays

              if (avgPerDay >= 100) return '거의 매일 대화'
              if (avgPerDay >= 50) return '매우 활발한 소통'
              if (avgPerDay >= 20) return '활발한 소통'
              if (avgPerDay >= 10) return '꾸준한 소통'
              if (avgPerDay >= 5) return '보통 수준의 소통'
              return '가끔 연락하는 사이'
            })()}
          </span>
        </motion.section>

        {/* Average Reply (1 column) */}
        <motion.section
          role="region"
          aria-labelledby="reply-time-heading"
          className="neo-card bg-white p-4 sm:p-6 rounded-2xl flex flex-col justify-center items-center text-center lg:col-span-1"
          variants={staggerItem}
        >
          <div className="bg-blue-100 p-3 rounded-full mb-3 border-2 border-black">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm font-bold text-gray-500 mb-1">평균 답장</p>
          <p className="font-display text-4xl text-[#4D96FF]">
            {(() => {
              const p1Avg = p1Stats?.avgReplyTime || 0
              const p2Avg = p2Stats?.avgReplyTime || 0
              const avgReply = p1Avg && p2Avg ? Math.round((p1Avg + p2Avg) / 2) : 0

              if (avgReply === 0) return '즉시'
              if (avgReply < 60) return `${avgReply}분`
              if (avgReply < 1440) return `${Math.round(avgReply / 60)}시간`
              return `${Math.round(avgReply / 1440)}일`
            })()}
          </p>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200 mt-2">
            {(() => {
              const p1Avg = p1Stats?.avgReplyTime || 0
              const p2Avg = p2Stats?.avgReplyTime || 0
              const avgReply = p1Avg && p2Avg ? Math.round((p1Avg + p2Avg) / 2) : 0

              if (avgReply < 5) return '번개같은 속도 ⚡'
              if (avgReply < 30) return 'LTE급 속도'
              if (avgReply < 120) return '적당한 페이스'
              if (avgReply < 1440) return '여유로운 편'
              return '느긋한 스타일'
            })()}
          </span>
        </motion.section>

        {/* Row 2 - Small Donut Charts + Wide Area Chart */}
        {/* Talk Ratio (Smaller, 1 column) */}
        <motion.div
          className="neo-card bg-white p-4 sm:p-6 rounded-2xl lg:col-span-1"
          variants={staggerItem}
        >
          <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
            <PieChart className="w-5 h-5" /> 투머치 토커
          </h3>
          <div className="h-40 sm:h-48 lg:h-56 relative">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="mt-4 flex justify-between text-sm font-bold px-2">
            <span className="text-[#FF6B6B]">{chatData.p2} {p2Percentage}%</span>
            <span className="text-[#4D96FF]">{chatData.p1} {p1Percentage}%</span>
          </div>
        </motion.div>

        {/* 24-hour Activity Pattern (Wider with Area Chart, 2 columns) - 데이터 있을 때만 표시 */}
        {hasTimeData && timeChartData && (
          <motion.div
            className="neo-card bg-white p-4 sm:p-6 rounded-2xl lg:col-span-2"
            variants={staggerItem}
          >
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
              <Clock className="w-5 h-5" /> 24시간 활동 패턴
            </h3>
            <div className="h-48 sm:h-56 lg:h-64 relative">
              <Line data={timeChartData} options={timeChartOptions} />
            </div>
          </motion.div>
        )}

        {/* Interest Score (관심도 지수) */}
        <motion.div
          className="neo-card bg-white p-4 rounded-2xl lg:col-span-1"
          variants={staggerItem}
        >
          <h3 className="flex items-center gap-2 text-base font-bold mb-3">
            <Heart className="w-4 h-4" /> 관심도 지수
          </h3>
          <div className="h-40 sm:h-48 relative flex flex-col items-center justify-center">
            {/* Heart icon */}
            <div className="text-5xl mb-3 animate-heart-beat">💝</div>

            {/* Score */}
            <div className="font-display text-5xl font-bold text-pink-600 mb-6">
              {avgInterest}점
            </div>

            {/* Progress bar */}
            <div className="w-full px-4">
              <div className="bg-gray-200 h-6 rounded-full overflow-hidden border-2 border-black">
                <div
                  className="bg-gradient-to-r from-pink-400 to-pink-600 h-full transition-all duration-1000 rounded-full"
                  style={{ width: `${Math.min(avgInterest, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Row 3 - Reply Patterns (Full Width, 4 columns) */}
        <motion.div
          className="neo-card bg-white p-4 sm:p-6 rounded-2xl lg:col-span-4"
          variants={staggerItem}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              답장 패턴 정밀 분석
            </h3>

            {/* Person Toggle */}
            <div role="tablist" aria-label="답장 패턴 분석 대상 선택" className="bg-gray-100 p-1 rounded-lg flex text-sm font-bold border-2 border-black/10">
              <button
                role="tab"
                aria-selected={selectedPerson === 'p1'}
                aria-controls="answer-patterns-panel"
                aria-label={`${chatData.p1}의 답장 패턴 보기`}
                onClick={() => setSelectedPerson('p1')}
                className={`px-6 py-1.5 rounded-md transition-all ${
                  selectedPerson === 'p1'
                    ? 'bg-white border-2 border-black shadow-sm text-black'
                    : 'text-gray-500 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                {chatData.p1}
              </button>
              <button
                role="tab"
                aria-selected={selectedPerson === 'p2'}
                aria-controls="answer-patterns-panel"
                aria-label={`${chatData.p2}의 답장 패턴 보기`}
                onClick={() => setSelectedPerson('p2')}
                className={`px-6 py-1.5 rounded-md transition-all ${
                  selectedPerson === 'p2'
                    ? 'bg-white border-2 border-black shadow-sm text-black'
                    : 'text-gray-500 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                {chatData.p2}
              </button>
            </div>
          </div>

          <div id="answer-patterns-panel" role="tabpanel" aria-label={`${selectedName}의 답장 패턴 상세 정보`} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className={`text-center p-4 rounded-xl border-2 border-black/10 ${
              selectedPerson === 'p1' ? 'bg-red-50' : 'bg-blue-50'
            }`}>
              <div className="text-xs text-gray-500 mb-1">📊 메시지 비중</div>
              <div className={`font-display text-3xl ${selectedPerson === 'p1' ? 'text-red-600' : 'text-blue-600'}`}>
                {selectedPerson === 'p1' ? p1Percentage : p2Percentage}%
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl border-2 border-black/10">
              <div className="text-xs text-gray-500 mb-1">📝 평균 글자 수</div>
              <div className="font-display text-3xl text-gray-700">
                {Math.round(selectedStats?.avgMessageLength || 30)}자
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl border-2 border-black/10">
              <div className="text-xs text-gray-500 mb-1">❓ 질문 횟수</div>
              <div className="font-display text-3xl text-gray-700">
                {selectedStats?.questionCount || 0}회
              </div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl border-2 border-black/10">
              <div className="text-xs text-gray-500 mb-1">🤣 ㅋㅋㅋ 사용</div>
              <div className="font-display text-3xl text-yellow-600">
                {selectedPerson === 'p1' ? p1Laugh : p2Laugh}
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <span className="font-bold">{selectedName}</span>님의 대화 패턴 분석 결과입니다
          </div>
        </motion.div>

        {/* SECRET REPORT (Full Width, 4 columns) */}
        <motion.div
          className="neo-card bg-gradient-to-br from-gray-900 to-black p-0 rounded-[2rem] lg:col-span-4 text-white overflow-hidden flex flex-col"
          variants={staggerItem}
        >
          <div className="p-5 border-b-2 border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
            <h3 className="flex items-center gap-2 text-[#FFD233] text-xl font-bold">
              <Key className="w-5 h-5" /> SECRET REPORT
            </h3>
          </div>

          <div className="p-8 relative flex-1 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            <div className={`space-y-6 ${!isUnlocked ? 'blur-secret opacity-40' : ''}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-6 bg-[#FFD233] rounded-full"></div>
                  <h4 className="text-[#FFD233] font-bold text-lg">두 사람의 대화 성향 분석</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5 rounded-xl border-2 border-blue-500/30 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                      {chatData.p1}
                    </div>
                    <p className="text-sm text-blue-300 font-bold mb-2">대화 스타일</p>
                    <p className="text-xl font-bold text-white mb-3">
                      {result.personalities?.[chatData.p1]?.type || '분석 중...'}
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed border-t border-white/10 pt-3">
                      {result.personalities?.[chatData.p1]?.description || '채팅 기록과 여러 지표를 종합하여 대화 성향을 분석하고 있습니다.'}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-5 rounded-xl border-2 border-red-500/30 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                      {chatData.p2}
                    </div>
                    <p className="text-sm text-red-300 font-bold mb-2">대화 스타일</p>
                    <p className="text-xl font-bold text-white mb-3">
                      {result.personalities?.[chatData.p2]?.type || '분석 중...'}
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed border-t border-white/10 pt-3">
                      {result.personalities?.[chatData.p2]?.description || '채팅 기록과 여러 지표를 종합하여 대화 성향을 분석하고 있습니다.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-6 bg-[#FFD233] rounded-full"></div>
                  <h4 className="text-[#FFD233] font-bold text-lg">상호 인식 분석</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5 rounded-xl border-2 border-blue-500/30 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                      {chatData.p1}
                    </div>
                    <p className="text-sm text-blue-300 font-bold mb-2">
                      {chatData.p2}님을 어떻게 생각하는지
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed border-t border-white/10 pt-3">
                      {result.mutualPerception?.[chatData.p1]?.youThinkingAbout || '대화 패턴을 분석하여 상호 인식을 파악하고 있습니다.'}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-5 rounded-xl border-2 border-red-500/30 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                      {chatData.p2}
                    </div>
                    <p className="text-sm text-red-300 font-bold mb-2">
                      {chatData.p1}님을 어떻게 생각하는지
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed border-t border-white/10 pt-3">
                      {result.mutualPerception?.[chatData.p2]?.youThinkingAbout || '대화 패턴을 분석하여 상호 인식을 파악하고 있습니다.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-6 bg-[#FFD233] rounded-full"></div>
                  <h4 className="text-[#FFD233] font-bold text-lg">AI의 맞춤 조언</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5 rounded-xl border-2 border-blue-500/30 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                      {chatData.p1}
                    </div>
                    <p className="text-sm text-blue-300 font-bold mb-2">맞춤 공략법</p>
                    <p className="text-xs text-gray-300 leading-relaxed border-t border-white/10 pt-3">
                      {typeof result.attackTip === 'object' ? result.attackTip[chatData.p1] : result.attackTip}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-5 rounded-xl border-2 border-red-500/30 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                      {chatData.p2}
                    </div>
                    <p className="text-sm text-red-300 font-bold mb-2">맞춤 공략법</p>
                    <p className="text-xs text-gray-300 leading-relaxed border-t border-white/10 pt-3">
                      {typeof result.attackTip === 'object' ? result.attackTip[chatData.p2] : result.attackTip}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!isUnlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/80 backdrop-blur-md">
                <div className="bg-gradient-to-br from-white to-gray-100 text-black p-8 rounded-2xl border-4 border-[#FFD233] shadow-[0_0_60px_rgba(255,210,51,0.4)] w-[90%] max-w-sm text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFD233] to-[#FFA500] rounded-full border-4 border-black flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Lock className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">시크릿 리포트 해제</h4>
                  <p className="text-sm text-gray-600 mb-6 font-bold">
                    상세한 성향 분석과 AI 조언을 확인하세요
                  </p>
                  <button
                    onClick={handleUnlock}
                    className="neo-btn w-full bg-gradient-to-r from-black to-gray-800 text-white py-4 rounded-xl text-base flex items-center justify-center gap-2 hover:from-gray-800 hover:to-black transition shadow-lg"
                  >
                    <span className="text-[#FFD233]">▶</span> 광고 보고 무료 확인
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* 광고 삽입 - 결과 페이지 중간 */}
      <ResultPageAd type="banner" />

      {/* Footer */}
      <footer className="mt-12 text-center pb-8">
        <div className="space-y-2">
          <p className="text-gray-400 text-sm font-mono">
            Mind Scanner © 2025. All Data Processed Locally.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Made by</span>
            <a
              href="http://oceancode.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#4D96FF] hover:underline"
            >
              Oceancode
            </a>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <a
              href="mailto:oceancode0321@gmail.com"
              className="hover:text-gray-600 transition-colors flex items-center gap-1"
            >
              <span>📧</span>
              oceancode0321@gmail.com
            </a>
            <span>•</span>
            <a
              href="http://oceancode.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors flex items-center gap-1"
            >
              <span>🌐</span>
              oceancode.site
            </a>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mt-2">
            <a
              href="/privacy"
              className="hover:text-gray-600 transition-colors underline"
            >
              개인정보처리방침
            </a>
            <span>•</span>
            <a
              href="/terms"
              className="hover:text-gray-600 transition-colors underline"
            >
              이용약관
            </a>
          </div>
        </div>
      </footer>

      {/* 전면 광고 (SECRET REPORT 언락용) */}
      <InterstitialAd
        isOpen={showInterstitialAd}
        onClose={() => setShowInterstitialAd(false)}
        onComplete={handleAdComplete}
        duration={5}
      />
    </motion.section>
  )
}
