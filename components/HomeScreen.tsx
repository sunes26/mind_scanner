'use client'

import { useCallback, useState } from 'react'
import { UploadCloud, FileText, Sparkles } from 'lucide-react'
import { ChatData, AppError, ERROR_MESSAGES } from '@/types'
import { parseKakaoChat, analyzeChat } from '@/utils/chatParser'
import { detectMaliciousContent, isValidTextFile, sanitizeUserName } from '@/utils/sanitize'
import {
  FILE_VALIDATION,
  MESSAGE_VALIDATION,
  isValidFileSize,
  isValidFileExtension,
  isValidMimeType
} from '@/utils/validation'
import ResultPageAd from '@/components/ads/ResultPageAd'

interface HomeScreenProps {
  onFileUpload: (data: ChatData) => void
  onError: (error: AppError) => void
}

export default function HomeScreen({ onFileUpload, onError }: HomeScreenProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const validateAndParseFile = useCallback((text: string): ChatData | null => {
    // 1. 기본 유효성 검사
    if (!text || text.trim().length === 0) {
      onError({
        type: 'FILE_EMPTY',
        ...ERROR_MESSAGES.FILE_EMPTY
      })
      return null
    }

    if (text.length < FILE_VALIDATION.MIN_CONTENT_LENGTH) {
      onError({
        type: 'FILE_EMPTY',
        ...ERROR_MESSAGES.FILE_EMPTY
      })
      return null
    }

    // 2. 보안: 악성 코드 패턴 감지
    const securityCheck = detectMaliciousContent(text)
    if (!securityCheck.isSafe) {
      onError({
        type: 'PARSE_ERROR',
        title: '파일에 위험한 코드가 감지되었어요',
        message: '정상적인 카카오톡 대화 파일을 업로드해주세요.',
        suggestion: '카카오톡에서 다시 내보낸 파일을 사용해주세요.',
        canRetry: false
      })
      return null
    }

    // 3. 보안: 텍스트 파일 형식 검증
    if (!isValidTextFile(text)) {
      onError({
        type: 'FILE_FORMAT',
        title: '올바른 텍스트 파일이 아니에요',
        message: '카카오톡에서 내보낸 .txt 파일만 분석할 수 있어요.',
        suggestion: '파일이 손상되었거나 바이너리 파일일 수 있습니다. 카카오톡에서 다시 내보내주세요.',
        canRetry: false
      })
      return null
    }

    const slicedText = text.length > FILE_VALIDATION.MAX_CONTENT_LENGTH
      ? text.slice(-FILE_VALIDATION.MAX_CONTENT_LENGTH)
      : text
    const { messages, participants } = parseKakaoChat(slicedText)

    if (messages.length === 0) {
      onError({
        type: 'PARSE_ERROR',
        ...ERROR_MESSAGES.PARSE_ERROR
      })
      return null
    }

    if (participants.length < MESSAGE_VALIDATION.MIN_PARTICIPANTS) {
      onError({
        type: 'NOT_ENOUGH_PARTICIPANTS',
        ...ERROR_MESSAGES.NOT_ENOUGH_PARTICIPANTS
      })
      return null
    }

    const userMessages = messages.filter(m => !m.isSystemMessage)
    if (userMessages.length < MESSAGE_VALIDATION.MIN_COUNT) {
      onError({
        type: 'NOT_ENOUGH_MESSAGES',
        ...ERROR_MESSAGES.NOT_ENOUGH_MESSAGES
      })
      return null
    }

    const messageCounts: { [name: string]: number } = {}
    messages.forEach(msg => {
      if (!msg.isSystemMessage) {
        messageCounts[msg.sender] = (messageCounts[msg.sender] || 0) + 1
      }
    })

    const sortedParticipants = Object.entries(messageCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name)

    // 4. 보안: 사용자 이름 sanitize
    const rawP1 = sortedParticipants[0]
    const rawP2 = sortedParticipants[1]

    const p1 = sanitizeUserName(rawP1)
    const p2 = sanitizeUserName(rawP2)

    // 5. 이름 길이 검증
    if (rawP1.length > MESSAGE_VALIDATION.MAX_NAME_LENGTH || rawP2.length > MESSAGE_VALIDATION.MAX_NAME_LENGTH) {
      onError({
        type: 'PARSE_ERROR',
        title: '닉네임이 너무 길어요',
        message: `${MESSAGE_VALIDATION.MAX_NAME_LENGTH}글자 이하의 닉네임만 분석할 수 있어요.`,
        suggestion: '카카오톡 프로필 이름을 짧게 변경한 후 다시 내보내주세요.',
        canRetry: false
      })
      return null
    }

    const analysis = analyzeChat(messages, [p1, p2])

    return {
      rawText: slicedText,
      p1,
      p2,
      countP1: messageCounts[rawP1] || 0,
      countP2: messageCounts[rawP2] || 0,
      total: userMessages.length,
      analysis,
    }
  }, [onError])

  const handleFile = useCallback((file: File) => {
    // 1. 보안: 파일 확장자 검증
    if (!isValidFileExtension(file.name)) {
      onError({
        type: 'FILE_FORMAT',
        ...ERROR_MESSAGES.FILE_FORMAT
      })
      return
    }

    // 2. 보안: MIME 타입 검증
    if (!isValidMimeType(file.type)) {
      onError({
        type: 'FILE_FORMAT',
        title: '올바른 파일 형식이 아니에요',
        message: '텍스트 파일(.txt)만 분석할 수 있어요.',
        suggestion: '카카오톡에서 내보낸 .txt 파일을 사용해주세요.',
        canRetry: false,
      })
      return
    }

    // 3. 보안: 파일 크기 검증
    if (!isValidFileSize(file.size)) {
      if (file.size < FILE_VALIDATION.MIN_SIZE) {
        onError({
          type: 'FILE_EMPTY',
          ...ERROR_MESSAGES.FILE_EMPTY
        })
      } else {
        onError({
          type: 'FILE_FORMAT',
          title: '파일이 너무 커요',
          message: `${FILE_VALIDATION.MAX_SIZE / 1024 / 1024}MB 이하의 파일만 분석할 수 있어요.`,
          suggestion: '더 짧은 기간의 대화를 내보내거나, 파일을 분할해주세요.',
          canRetry: false,
        })
      }
      return
    }

    setIsProcessing(true)

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const chatData = validateAndParseFile(text)

        if (chatData) {
          onFileUpload(chatData)
        }
      } catch (err) {
        console.error('File processing error:', err)
        onError({
          type: 'UNKNOWN',
          ...ERROR_MESSAGES.UNKNOWN
        })
      } finally {
        setIsProcessing(false)
      }
    }

    reader.onerror = () => {
      setIsProcessing(false)
      onError({
        type: 'FILE_FORMAT',
        title: '파일을 읽을 수 없어요',
        message: '파일이 손상되었거나 읽을 수 없는 형식이에요.',
        suggestion: '다른 파일을 선택해주세요.',
        canRetry: false,
      })
    }

    reader.readAsText(file)
  }, [onFileUpload, onError, validateAndParseFile])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  return (
    <section className="w-full max-w-6xl fade-in py-8 space-y-12" role="main">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Left: Hero Text */}
      <header className="text-center md:text-left space-y-8">
        <div className="inline-block">
          <span className="inline-block bg-[#FF6B6B] text-white px-4 py-1.5 rounded-full border-2 border-black text-sm md:text-base font-bold shadow-[4px_4px_0px_0px_black] transform -rotate-2 mb-4">
            대화 패턴을 10초 만에 분석
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl leading-tight font-black text-black">
            카카오톡 대화 분석으로<br />
            그 사람의<br />
            <span className="text-[#4D96FF] relative inline-block">
              진심
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FFD233] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>을 알아보세요
          </h1>
        </div>

        <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
          카톡 대화 내용만 넣으면 <br className="md:hidden" />AI가 답장 속도, 감정선, 주도권까지 <br />
          완벽하게 분석해 드립니다.
        </p>

        <p className="inline-block mt-2 font-bold text-black border-b-2 border-[#FFD233]">
          #서버저장NO #100%익명
        </p>

        {/* Desktop Features */}
        <ul className="hidden md:flex flex-wrap gap-3" aria-label="분석 기능 목록">
          <li className="neo-badge px-3 py-1 bg-white rounded-full text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full border border-black" aria-hidden="true"></span> 답장 평균 시간
          </li>
          <li className="neo-badge px-3 py-1 bg-white rounded-full text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full border border-black" aria-hidden="true"></span> 대화 성향 분석
          </li>
          <li className="neo-badge px-3 py-1 bg-white rounded-full text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full border border-black" aria-hidden="true"></span> 대화 주도권 분석
          </li>
        </ul>
      </header>

      {/* Right: Upload Box */}
      <section className="w-full max-w-md mx-auto md:ml-auto" aria-labelledby="upload-heading">
        <div className="neo-card bg-white p-8 rounded-[2.5rem] relative overflow-hidden transform hover:-translate-y-1 transition duration-300">
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#FFD233] rounded-full opacity-20 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-[#4D96FF] rounded-full opacity-20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 id="upload-heading" className="text-2xl font-bold font-display">대화 파일 업로드</h2>
                <p className="text-xs text-gray-500 mt-1">.txt 파일만 지원합니다</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-xl border-2 border-black/5" aria-hidden="true">
                <UploadCloud className="w-6 h-6 text-black" />
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              aria-label="카카오톡 대화 파일 업로드 영역. 파일을 드래그하거나 클릭하여 업로드하세요."
              aria-disabled={isProcessing}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => !isProcessing && document.getElementById('file-input')?.click()}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !isProcessing) {
                  e.preventDefault()
                  document.getElementById('file-input')?.click()
                }
              }}
              className={`border-3 border-dashed rounded-2xl h-40 flex flex-col items-center justify-center cursor-pointer transition group relative ${
                isDragging
                  ? 'bg-blue-50 border-[#4D96FF]'
                  : isProcessing
                    ? 'bg-gray-50 border-gray-300 cursor-wait'
                    : 'bg-gray-50 border-gray-300 hover:bg-blue-50 hover:border-[#4D96FF]'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-8 h-8 border-4 border-[#4D96FF] border-t-transparent rounded-full animate-spin mb-2" role="status" aria-label="파일 처리 중" />
                  <p className="font-bold text-gray-500">처리 중...</p>
                </>
              ) : (
                <>
                  <div className="bg-white p-3 rounded-full border-2 border-black mb-2 group-hover:scale-110 transition shadow-sm z-10" aria-hidden="true">
                    <FileText className="w-6 h-6 text-black" />
                  </div>
                  <p className="font-bold text-gray-500 group-hover:text-[#4D96FF] z-10">
                    파일을 드래그하거나 클릭
                  </p>
                </>
              )}
              <input
                type="file"
                id="file-input"
                accept=".txt"
                className="hidden"
                disabled={isProcessing}
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                aria-label="카카오톡 대화 텍스트 파일 선택"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={() => !isProcessing && document.getElementById('file-input')?.click()}
                disabled={isProcessing}
                aria-label="대화 파일 분석 시작하기"
                className="neo-btn w-full bg-black text-white py-4 rounded-xl text-lg flex justify-center items-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-transform font-bold"
              >
                <Sparkles className="w-5 h-5 text-[#FFD233]" aria-hidden="true" /> 지금 바로 분석하기
              </button>
            </div>
          </div>
        </div>

        <ul className="mt-6 flex justify-center gap-4 text-xs text-gray-500 font-bold opacity-70" aria-label="보안 및 성능 특징">
          <li className="flex items-center gap-1">개인정보 보호</li>
          <li className="flex items-center gap-1">3초 빠른 분석</li>
        </ul>
      </section>
      </div>

      {/* How to Export Guide */}
      <section className="border-t-2 border-black pt-12" aria-labelledby="export-guide-heading">
        <h2 id="export-guide-heading" className="font-display text-3xl text-black mb-8 text-center">카카오톡 대화 내보내기 방법</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Mobile Guide */}
          <div className="neo-card bg-gradient-to-br from-yellow-50 to-orange-50 p-6 sm:p-8 rounded-2xl border-4 border-black">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">📱</div>
              <h4 className="font-display text-2xl font-bold text-gray-800">모바일</h4>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">카카오톡 앱에서 대화방 열기</h4>
                  <p className="text-sm text-gray-600">분석하고 싶은 1:1 대화방을 엽니다.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">햄버거 메뉴 클릭</h4>
                  <p className="text-sm text-gray-600">우측 상단의 <span className="font-bold">≡</span> (햄버거 메뉴) 버튼을 누릅니다.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">톱니바퀴(설정) 클릭</h4>
                  <p className="text-sm text-gray-600">메뉴에서 <span className="font-bold">⚙️ 톱니바퀴</span> 아이콘을 누릅니다.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">대화 내용 내보내기</h4>
                  <p className="text-sm text-gray-600"><span className="font-bold">"대화 내용 내보내기"</span>를 선택합니다.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  5
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">내보내기 방식 선택</h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">"텍스트 메시지만 보내기"</span> 또는
                    <span className="font-bold"> "모든 메시지 도큐멘트로 저장하기"</span> 중 선택합니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  6
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">파일 저장 후 업로드</h4>
                  <p className="text-sm text-gray-600">저장된 .txt 파일을 위 업로드 창에 올려주세요!</p>
                </div>
              </div>
            </div>
          </div>

          {/* PC Guide */}
          <div className="neo-card bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-2xl border-4 border-black">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">💻</div>
              <h4 className="font-display text-2xl font-bold text-gray-800">PC</h4>
            </div>

            {/* 단축키 팁 */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl mb-6 border-2 border-black">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">⚡</span>
                <span className="font-bold text-sm">빠른 방법 (추천)</span>
              </div>
              <p className="text-sm leading-relaxed">
                대화창에서 <kbd className="px-2 py-1 bg-white text-blue-600 rounded font-bold text-xs border border-blue-300">Ctrl</kbd> + <kbd className="px-2 py-1 bg-white text-blue-600 rounded font-bold text-xs border border-blue-300">S</kbd> 키를 누르면 바로 대화 내보내기 창이 열립니다!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4D96FF] rounded-full flex items-center justify-center font-bold border-2 border-black text-white">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">PC 카카오톡 실행</h4>
                  <p className="text-sm text-gray-600">PC용 카카오톡을 실행하고 분석할 대화방을 엽니다.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4D96FF] rounded-full flex items-center justify-center font-bold border-2 border-black text-white">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">대화 내보내기</h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Ctrl + S</span>를 누르거나,
                    우측 상단 <span className="font-bold">≡</span> 메뉴에서
                    <span className="font-bold"> "대화 내용 내보내기"</span>를 클릭합니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4D96FF] rounded-full flex items-center justify-center font-bold border-2 border-black text-white">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">저장 위치 선택</h4>
                  <p className="text-sm text-gray-600">저장할 폴더를 선택하고 <span className="font-bold">확인</span>을 누릅니다. 자동으로 .txt 파일이 생성됩니다.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4D96FF] rounded-full flex items-center justify-center font-bold border-2 border-black text-white">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">파일 업로드</h4>
                  <p className="text-sm text-gray-600">생성된 .txt 파일을 위 업로드 창에 드래그하거나 클릭해서 선택하세요!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t-2 border-black pt-12 mt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="font-display text-3xl text-black mb-8 text-center">자주 묻는 질문</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="neo-card bg-white p-6 rounded-xl">
            <h4 className="font-bold text-lg text-gray-800 mb-2">Q. 카톡 대화 분석은 정말 무료인가요?</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              네, 속마음 스캐너는 기본적으로 무료로 제공됩니다. 카카오톡 대화 내용을 업로드하여 호감도와 심리를 무료로 분석해 보세요.
            </p>
          </div>

          <div className="neo-card bg-white p-6 rounded-xl">
            <h4 className="font-bold text-lg text-gray-800 mb-2">Q. 개인정보는 안전한가요?</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              네, 절대적으로 안전합니다. 모든 대화 내용은 서버에 저장되지 않으며, 분석 후 즉시 삭제됩니다. Stateless 아키텍처로 완벽한 익명성을 보장합니다.
            </p>
          </div>

          <div className="neo-card bg-white p-6 rounded-xl">
            <h4 className="font-bold text-lg text-gray-800 mb-2">Q. 대화 패턴에서 무엇을 알 수 있나요?</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              AI가 답장 속도, 이모티콘 사용량, 대화 주도권, 질문 빈도 등을 종합적으로 분석하여 두 사람의 소통 방식과 관계 역학을 파악해드립니다.
            </p>
          </div>

          <div className="neo-card bg-white p-6 rounded-xl">
            <h4 className="font-bold text-lg text-gray-800 mb-2">Q. 어떤 파일 형식을 지원하나요?</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              카카오톡에서 내보낸 .txt 파일을 지원합니다. PC 카카오톡과 모바일 카카오톡 모두에서 내보낸 파일을 분석할 수 있습니다.
            </p>
          </div>

          <div className="neo-card bg-white p-6 rounded-xl md:col-span-2">
            <h4 className="font-bold text-lg text-gray-800 mb-2">Q. 분석 결과는 얼마나 정확한가요?</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              최신 AI 기술을 활용하여 대화 패턴을 분석합니다. 대화량이 많을수록 더 정확한 분석 결과를 제공합니다. 다만, 결과는 참고용이며 실제 관계는 다양한 요소에 영향을 받습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 광고 삽입 - FAQ 아래 */}
      <div className="mt-8">
        <ResultPageAd type="native" />
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center pb-8 border-t-2 border-black pt-8">
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
    </section>
  )
}
