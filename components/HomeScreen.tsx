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
import { useLanguage } from '@/contexts/LanguageContext'
import { blogPosts } from '@/app/blog/blogData'

interface HomeScreenProps {
  onFileUpload: (data: ChatData) => void
  onError: (error: AppError) => void
}

export default function HomeScreen({ onFileUpload, onError }: HomeScreenProps) {
  const { t } = useLanguage()
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
        title: t.validationErrors.maliciousContent.title,
        message: t.validationErrors.maliciousContent.message,
        suggestion: t.validationErrors.maliciousContent.suggestion,
        canRetry: false
      })
      return null
    }

    // 3. 보안: 텍스트 파일 형식 검증
    if (!isValidTextFile(text)) {
      onError({
        type: 'FILE_FORMAT',
        title: t.validationErrors.invalidTextFile.title,
        message: t.validationErrors.invalidTextFile.message,
        suggestion: t.validationErrors.invalidTextFile.suggestion,
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
        title: t.validationErrors.nicknameTooLong.title,
        message: t.validationErrors.nicknameTooLong.message.replace('{maxLength}', MESSAGE_VALIDATION.MAX_NAME_LENGTH.toString()),
        suggestion: t.validationErrors.nicknameTooLong.suggestion,
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
        title: t.validationErrors.invalidMimeType.title,
        message: t.validationErrors.invalidMimeType.message,
        suggestion: t.validationErrors.invalidMimeType.suggestion,
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
          title: t.validationErrors.fileTooLarge.title,
          message: t.validationErrors.fileTooLarge.message.replace('{maxSize}', (FILE_VALIDATION.MAX_SIZE / 1024 / 1024).toString()),
          suggestion: t.validationErrors.fileTooLarge.suggestion,
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
        title: t.validationErrors.fileReadError.title,
        message: t.validationErrors.fileReadError.message,
        suggestion: t.validationErrors.fileReadError.suggestion,
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
            {t.home.badge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl leading-tight font-black text-black whitespace-pre-line">
            {t.home.title}
          </h1>
        </div>

        <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-lg mx-auto md:mx-0 whitespace-pre-line">
          {t.home.subtitle}
        </p>

        <p className="inline-block mt-2 font-bold text-black border-b-2 border-[#FFD233]">
          {t.home.privacy}
        </p>

        {/* Desktop Features */}
        <ul className="hidden md:flex flex-wrap gap-3" aria-label="분석 기능 목록">
          <li className="neo-badge px-3 py-1 bg-white rounded-full text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full border border-black" aria-hidden="true"></span> {t.home.badges.replyTime}
          </li>
          <li className="neo-badge px-3 py-1 bg-white rounded-full text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full border border-black" aria-hidden="true"></span> {t.home.badges.personality}
          </li>
          <li className="neo-badge px-3 py-1 bg-white rounded-full text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full border border-black" aria-hidden="true"></span> {t.home.badges.dominance}
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
                <h2 id="upload-heading" className="text-2xl font-bold font-display">{t.home.uploadSection.title}</h2>
                <p className="text-xs text-gray-500 mt-1">{t.home.uploadSection.subtitle}</p>
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
                  <div className="w-8 h-8 border-4 border-[#4D96FF] border-t-transparent rounded-full animate-spin mb-2" role="status" aria-label={t.home.uploadSection.processing} />
                  <p className="font-bold text-gray-500">{t.home.uploadSection.processing}</p>
                </>
              ) : (
                <>
                  <div className="bg-white p-3 rounded-full border-2 border-black mb-2 group-hover:scale-110 transition shadow-sm z-10" aria-hidden="true">
                    <FileText className="w-6 h-6 text-black" />
                  </div>
                  <p className="font-bold text-gray-500 group-hover:text-[#4D96FF] z-10">
                    {t.home.uploadSection.dragOrClick}
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
                aria-label={t.home.uploadSection.analyzeButton}
                className="neo-btn w-full bg-black text-white py-4 rounded-xl text-lg flex justify-center items-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-transform font-bold"
              >
                <Sparkles className="w-5 h-5 text-[#FFD233]" aria-hidden="true" /> {t.home.uploadSection.analyzeButton}
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* 분석 미리보기 섹션 */}
      <section className="border-t-2 border-black pt-12" aria-labelledby="features-heading">
        <h2 id="features-heading" className="font-display text-3xl text-black mb-4 text-center">이런 결과를 확인할 수 있어요</h2>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">카카오톡 대화 파일 하나로 AI가 심층 분석한 결과를 확인하세요. 답장 패턴부터 숨겨진 심리까지 낱낱이 파헤쳐 드립니다.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="neo-card bg-white p-6 rounded-xl text-center">
            <div className="text-4xl mb-3" aria-hidden="true">💘</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">호감도 점수</h3>
            <p className="text-sm text-gray-600 leading-relaxed">답장 속도, 메시지 길이, 질문 빈도를 종합해 0~100점으로 상대방의 호감도를 정밀하게 측정합니다.</p>
          </div>
          <div className="neo-card bg-white p-6 rounded-xl text-center">
            <div className="text-4xl mb-3" aria-hidden="true">💬</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">답장 패턴 분석</h3>
            <p className="text-sm text-gray-600 leading-relaxed">시간대별 답장 속도, 즉답률, 늦은 답장 패턴을 분석해 상대방의 관심도와 진심을 파악합니다.</p>
          </div>
          <div className="neo-card bg-white p-6 rounded-xl text-center">
            <div className="text-4xl mb-3" aria-hidden="true">⚡</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">대화 주도권</h3>
            <p className="text-sm text-gray-600 leading-relaxed">먼저 말 걸기 횟수, 대화 시작·종료 패턴으로 두 사람의 관계에서 누가 더 적극적인지 분석합니다.</p>
          </div>
          <div className="neo-card bg-white p-6 rounded-xl text-center">
            <div className="text-4xl mb-3" aria-hidden="true">🔍</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">숨겨진 심리 보고서</h3>
            <p className="text-sm text-gray-600 leading-relaxed">AI가 대화 전체를 종합해 상대방의 성향, 감정 상태, 관계의 온도를 비밀 리포트로 정리해 드립니다.</p>
          </div>
        </div>
      </section>

      {/* How to Export Guide */}
      <section className="border-t-2 border-black pt-12" aria-labelledby="export-guide-heading">
        <h2 id="export-guide-heading" className="font-display text-3xl text-black mb-8 text-center">{t.home.exportGuide.title}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Mobile Guide */}
          <div className="neo-card bg-gradient-to-br from-yellow-50 to-orange-50 p-6 sm:p-8 rounded-2xl border-4 border-black">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">📱</div>
              <h4 className="font-display text-2xl font-bold text-gray-800">{t.home.exportGuide.mobile.title}</h4>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t.home.exportGuide.mobile.step1.title}</h4>
                  <p className="text-sm text-gray-600">{t.home.exportGuide.mobile.step1.desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t.home.exportGuide.mobile.step2.title}</h4>
                  <p className="text-sm text-gray-600">{t.home.exportGuide.mobile.step2.desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t.home.exportGuide.mobile.step3.title}</h4>
                  <p className="text-sm text-gray-600">{t.home.exportGuide.mobile.step3.desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t.home.exportGuide.mobile.step4.title}</h4>
                  <p className="text-sm text-gray-600">{t.home.exportGuide.mobile.step4.desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  5
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t.home.exportGuide.mobile.step5.title}</h4>
                  <p className="text-sm text-gray-600">{t.home.exportGuide.mobile.step5.desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFD233] rounded-full flex items-center justify-center font-bold border-2 border-black">
                  6
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t.home.exportGuide.mobile.step6.title}</h4>
                  <p className="text-sm text-gray-600">{t.home.exportGuide.mobile.step6.desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* PC Guide */}
          <div className="neo-card bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-2xl border-4 border-black">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">💻</div>
              <h4 className="font-display text-2xl font-bold text-gray-800">{t.home.exportGuide.pc.title}</h4>
            </div>

            {/* 단축키 팁 */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl mb-6 border-2 border-black">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">⚡</span>
                <span className="font-bold text-sm">{t.home.exportGuide.pc.shortcut.label}</span>
              </div>
              <p className="text-sm leading-relaxed">
                {t.home.exportGuide.pc.shortcut.desc}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4D96FF] rounded-full flex items-center justify-center font-bold border-2 border-black text-white">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t.home.exportGuide.pc.step1.title}</h4>
                  <p className="text-sm text-gray-600">{t.home.exportGuide.pc.step1.desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4D96FF] rounded-full flex items-center justify-center font-bold border-2 border-black text-white">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t.home.exportGuide.pc.step2.title}</h4>
                  <p className="text-sm text-gray-600">{t.home.exportGuide.pc.step2.desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4D96FF] rounded-full flex items-center justify-center font-bold border-2 border-black text-white">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t.home.exportGuide.pc.step3.title}</h4>
                  <p className="text-sm text-gray-600">{t.home.exportGuide.pc.step3.desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4D96FF] rounded-full flex items-center justify-center font-bold border-2 border-black text-white">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t.home.exportGuide.pc.step4.title}</h4>
                  <p className="text-sm text-gray-600">{t.home.exportGuide.pc.step4.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t-2 border-black pt-12 mt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="font-display text-3xl text-black mb-8 text-center">{t.home.faqSection.title}</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="neo-card bg-white p-6 rounded-xl">
            <h4 className="font-bold text-lg text-gray-800 mb-2">{t.home.faqSection.q1.q}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.home.faqSection.q1.a}
            </p>
          </div>

          <div className="neo-card bg-white p-6 rounded-xl">
            <h4 className="font-bold text-lg text-gray-800 mb-2">{t.home.faqSection.q2.q}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.home.faqSection.q2.a}
            </p>
          </div>

          <div className="neo-card bg-white p-6 rounded-xl">
            <h4 className="font-bold text-lg text-gray-800 mb-2">{t.home.faqSection.q3.q}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.home.faqSection.q3.a}
            </p>
          </div>

          <div className="neo-card bg-white p-6 rounded-xl">
            <h4 className="font-bold text-lg text-gray-800 mb-2">{t.home.faqSection.q4.q}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.home.faqSection.q4.a}
            </p>
          </div>

          <div className="neo-card bg-white p-6 rounded-xl md:col-span-2">
            <h4 className="font-bold text-lg text-gray-800 mb-2">{t.home.faqSection.q5.q}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.home.faqSection.q5.a}
            </p>
          </div>
        </div>
      </section>

      {/* 블로그 아티클 섹션 */}
      <section className="border-t-2 border-black pt-12" aria-labelledby="articles-heading">
        <div className="flex items-center justify-between mb-8">
          <h2 id="articles-heading" className="font-display text-3xl text-black">연애 심리 & 카톡 분석 가이드</h2>
          <a href="/blog" className="neo-badge px-4 py-2 bg-white rounded-full text-sm font-bold hover:bg-gray-50 transition-colors whitespace-nowrap">전체 보기 →</a>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {blogPosts.slice(0, 3).map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="neo-card bg-white p-6 rounded-xl hover:shadow-lg transition-shadow block group">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#FFD233] text-black text-xs font-bold px-2 py-1 rounded-full border border-black">{post.category}</span>
                <span className="text-xs text-gray-400">{post.readTime} 읽기</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#4D96FF] transition-colors leading-snug line-clamp-2">{post.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{post.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 광고 삽입 - 블로그 아티클 아래 (콘텐츠 충분한 위치) */}
      <div className="mt-8">
        <ResultPageAd type="native" position="home-faq" />
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center pb-8 border-t-2 border-black pt-8">
        <div className="space-y-2">
          <p className="text-gray-400 text-sm font-mono">
            {t.home.footer.copyright}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>{t.home.footer.madeBy}</span>
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
              {t.home.footer.privacy}
            </a>
            <span>•</span>
            <a
              href="/terms"
              className="hover:text-gray-600 transition-colors underline"
            >
              {t.home.footer.terms}
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}
