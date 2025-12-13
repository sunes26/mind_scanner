export const ko = {
  // Header
  header: {
    title: '속마음 스캐너',
    backToHome: '홈으로 돌아가기',
    confirmBack: '홈으로 돌아가시겠어요?\n현재 결과는 사라집니다.',
    confirmNavigation: '{section}을 보려면 홈화면으로 돌아가야 됩니다.\n현재 결과는 사라집니다.',
    howToUse: '사용법',
    faq: '자주 묻는 질문',
  },

  // Home Screen
  home: {
    badge: '대화 패턴을 10초 만에 분석',
    title: '카카오톡 대화 분석으로\n그 사람의\n진심을 알아보세요',
    subtitle: '카톡 대화 내용만 넣으면\nAI가 답장 속도, 감정선, 주도권까지\n완벽하게 분석해 드립니다.',
    privacy: '#서버저장NO #100%익명',
    uploadSection: {
      title: '대화 파일 업로드',
      subtitle: '.txt 파일만 지원합니다',
      dragOrClick: '파일을 드래그하거나 클릭',
      processing: '처리 중...',
      analyzeButton: '지금 바로 분석하기',
    },
    badges: {
      replyTime: '답장 평균 시간',
      personality: '대화 성향 분석',
      dominance: '대화 주도권 분석',
    },
    exportGuide: {
      title: '카카오톡 대화 내보내기 방법',
      mobile: {
        title: '모바일',
        step1: {
          title: '카카오톡 앱에서 대화방 열기',
          desc: '분석하고 싶은 1:1 대화방을 엽니다.',
        },
        step2: {
          title: '햄버거 메뉴 클릭',
          desc: '우측 상단의 ≡ (햄버거 메뉴) 버튼을 누릅니다.',
        },
        step3: {
          title: '톱니바퀴(설정) 클릭',
          desc: '메뉴에서 ⚙️ 톱니바퀴 아이콘을 누릅니다.',
        },
        step4: {
          title: '대화 내용 내보내기',
          desc: '"대화 내용 내보내기"를 선택합니다.',
        },
        step5: {
          title: '내보내기 방식 선택',
          desc: '"텍스트 메시지만 보내기" 또는 "모든 메시지 도큐멘트로 저장하기" 중 선택합니다.',
        },
        step6: {
          title: '파일 저장 후 업로드',
          desc: '저장된 .txt 파일을 위 업로드 창에 올려주세요!',
        },
      },
      pc: {
        title: 'PC',
        shortcut: {
          label: '빠른 방법 (추천)',
          desc: '대화창에서 Ctrl + S 키를 누르면 바로 대화 내보내기 창이 열립니다!',
        },
        step1: {
          title: 'PC 카카오톡 실행',
          desc: 'PC용 카카오톡을 실행하고 분석할 대화방을 엽니다.',
        },
        step2: {
          title: '대화 내보내기',
          desc: 'Ctrl + S를 누르거나, 우측 상단 ≡ 메뉴에서 "대화 내용 내보내기"를 클릭합니다.',
        },
        step3: {
          title: '저장 위치 선택',
          desc: '저장할 폴더를 선택하고 확인을 누릅니다. 자동으로 .txt 파일이 생성됩니다.',
        },
        step4: {
          title: '파일 업로드',
          desc: '생성된 .txt 파일을 위 업로드 창에 드래그하거나 클릭해서 선택하세요!',
        },
      },
    },
    faqSection: {
      title: '자주 묻는 질문',
      q1: {
        q: 'Q. 카톡 대화 분석은 정말 무료인가요?',
        a: '네, 속마음 스캐너는 기본적으로 무료로 제공됩니다. 카카오톡 대화 내용을 업로드하여 호감도와 심리를 무료로 분석해 보세요.',
      },
      q2: {
        q: 'Q. 개인정보는 안전한가요?',
        a: '네, 절대적으로 안전합니다. 모든 대화 내용은 서버에 저장되지 않으며, 분석 후 즉시 삭제됩니다. Stateless 아키텍처로 완벽한 익명성을 보장합니다.',
      },
      q3: {
        q: 'Q. 대화 패턴에서 무엇을 알 수 있나요?',
        a: 'AI가 답장 속도, 이모티콘 사용량, 대화 주도권, 질문 빈도 등을 종합적으로 분석하여 두 사람의 소통 방식과 관계 역학을 파악해드립니다.',
      },
      q4: {
        q: 'Q. 어떤 파일 형식을 지원하나요?',
        a: '카카오톡에서 내보낸 .txt 파일을 지원합니다. PC 카카오톡과 모바일 카카오톡 모두에서 내보낸 파일을 분석할 수 있습니다.',
      },
      q5: {
        q: 'Q. 분석 결과는 얼마나 정확한가요?',
        a: '최신 AI 기술을 활용하여 대화 패턴을 분석합니다. 대화량이 많을수록 더 정확한 분석 결과를 제공합니다. 다만, 결과는 참고용이며 실제 관계는 다양한 요소에 영향을 받습니다.',
      },
    },
    footer: {
      copyright: 'Mind Scanner © 2025. All Data Processed Locally.',
      madeBy: 'Made by',
      privacy: '개인정보처리방침',
      terms: '이용약관',
    },
  },

  // Loading Screen
  loading: {
    analyzing: '분석 중...',
    complete: '분석 완료!',
    messages: [
      '📂 대화 파일 로딩 중...',
      '📊 총 메시지 개수 계산 중...',
      '👥 참여자 정보 분석 중...',
      '🕐 타임스탬프 파싱 중...',
      '⏰ 24시간 활동 패턴 파악 중...',
      '⚡ 평균 답장 속도 계산 중...',
      '😊 이모티콘 사용 패턴 분석 중...',
      '💬 메시지 길이 통계 분석 중...',
      '❓ 질문 빈도 측정 중...',
      '📈 대화 주도권 분석 중...',
      '🎭 대화 스타일 파악 중...',
      '💡 소통 방식 분석 중...',
      '🔍 관계 역학 분석 중...',
      '🧠 AI 성향 타입 매칭 중...',
      '💭 상호 인식 패턴 분석 중...',
      '🎯 개별 맞춤 조언 생성 중...',
      '✍️ 최종 리포트 작성 중...',
    ],
  },

  // Result Screen
  result: {
    title: '분석 결과',
    score: '호감도 점수',
    relation: '관계 상태',
    dominance: '대화 주도권',
    retry: '다시 분석하기',
    share: '결과 공유하기',
    personalities: '성향 분석',
    mutualPerception: '상호 인식',
    attackTip: '공략 팁',
    thinkingAboutYou: '상대방이 나를 보는 시선',
    youThinkingAbout: '내가 상대방을 보는 시선',
  },

  // Result Screen (Detailed)
  resultScreen: {
    reportTitle: '분석 리포트',
    confirmRetry: '처음부터 다시 분석하시겠어요?\n현재 결과는 사라집니다.',
    retryButton: '다시하기',
    shareButton: '공유하기',

    scoreCard: {
      title: '종합 애정 지수',
      label: '종합 점수 {score}점',
    },

    dailyAvg: {
      title: '하루 평균 메시지',
      label: '하루 평균 {count}개의 메시지',
      almostDaily: '거의 매일 대화',
      veryActive: '매우 활발한 소통',
      active: '활발한 소통',
      steady: '꾸준한 소통',
      normal: '보통 수준의 소통',
      occasional: '가끔 연락하는 사이',
    },

    avgReply: {
      title: '평균 답장',
      immediately: '즉시',
      minutes: '{minutes}분',
      hours: '{hours}시간',
      days: '{days}일',
      lightning: '번개같은 속도 ⚡',
      lte: 'LTE급 속도',
      moderate: '적당한 페이스',
      relaxed: '여유로운 편',
      slow: '느긋한 스타일',
    },

    talkRatio: {
      title: '투머치 토커',
    },

    activityPattern: {
      title: '24시간 활동 패턴',
      midnight: '0시 ~ 6시 (새벽)',
      morning: '6시 ~ 12시 (오전)',
      afternoon: '12시 ~ 18시 (오후)',
      evening: '18시 ~ 24시 (저녁)',
      conversationCount: '대화량: {count}개',
    },

    interestScore: {
      title: '관심도 지수',
      points: '{score}점',
    },

    replyPatterns: {
      title: '답장 패턴 정밀 분석',
      messageRatio: '📊 메시지 비중',
      avgLength: '📝 평균 글자 수',
      avgLengthValue: '{length}자',
      questionCount: '❓ 질문 횟수',
      questionCountValue: '{count}회',
      laughCount: '🤣 ㅋㅋㅋ 사용',
      resultSummary: '{name}님의 대화 패턴 분석 결과입니다',
    },

    secretReport: {
      title: 'SECRET REPORT',
      personalitiesTitle: '두 사람의 대화 성향 분석',
      chatStyle: '대화 스타일',
      analyzing: '분석 중...',
      analyzingDescription: '채팅 기록과 여러 지표를 종합하여 대화 성향을 분석하고 있습니다.',
      mutualPerceptionTitle: '상호 인식 분석',
      howTheyThink: '{name}님을 어떻게 생각하는지',
      analyzingPerception: '대화 패턴을 분석하여 상호 인식을 파악하고 있습니다.',
      aiAdviceTitle: 'AI의 맞춤 조언',
      customStrategy: '맞춤 공략법',
      unlockTitle: '시크릿 리포트 해제',
      unlockDescription: '상세한 성향 분석과 AI 조언을 확인하세요',
      unlockButton: '광고 보고 무료 확인',
    },
  },

  // Error Messages
  errors: {
    fileEmpty: {
      title: '파일이 비어있어요',
      message: '카카오톡 대화 내용이 포함된 파일을 업로드해주세요.',
      suggestion: '최소 10개 이상의 대화 메시지가 필요합니다.',
    },
    fileFormat: {
      title: '올바른 파일 형식이 아니에요',
      message: '카카오톡에서 내보낸 .txt 파일만 분석할 수 있어요.',
      suggestion: '카카오톡 앱에서 대화를 내보내기 해주세요.',
    },
    fileTooLarge: {
      title: '파일이 너무 커요',
      message: '50MB 이하의 파일만 업로드할 수 있어요.',
      suggestion: '최근 대화만 포함된 파일로 다시 시도해주세요.',
    },
    parseError: {
      title: '대화 파일을 읽을 수 없어요',
      message: '카카오톡 대화 형식이 올바르지 않습니다.',
      suggestion: '카카오톡에서 내보낸 원본 파일인지 확인해주세요.',
    },
    notEnoughParticipants: {
      title: '참여자가 부족해요',
      message: '2명의 대화만 분석할 수 있어요.',
      suggestion: '1:1 대화방의 내용을 업로드해주세요.',
    },
    notEnoughMessages: {
      title: '메시지가 부족해요',
      message: '최소 10개 이상의 대화가 필요해요.',
      suggestion: '더 많은 대화가 포함된 파일을 업로드해주세요.',
    },
    apiError: {
      title: 'AI 분석 실패',
      message: 'AI 서버에서 응답을 받지 못했습니다.',
      suggestion: '잠시 후 다시 시도해주세요.',
    },
    retry: '다시 시도',
    goHome: '홈으로',
    retrying: '다시 시도 중...',
    retryButton: '다시 시도하기',
    goHomeButton: '처음으로 돌아가기',
    helpText: '문제가 계속되면 페이지를 새로고침해주세요 🔄',
  },

  // Export Guide
  exportGuide: {
    title: '카카오톡 대화 내보내기',
    step1: {
      title: '1. 대화방 열기',
      desc: '분석하고 싶은 대화방을 엽니다.',
    },
    step2: {
      title: '2. 메뉴 열기',
      desc: '우측 상단 ≡ 버튼을 누릅니다.',
    },
    step3: {
      title: '3. 대화 내보내기',
      desc: '대화 내보내기를 선택합니다.',
    },
    step4: {
      title: '4. 파일 저장',
      desc: 'txt 파일로 저장합니다.',
    },
  },

  // FAQ
  faq: {
    title: '자주 묻는 질문',
    q1: {
      q: '개인정보는 안전한가요?',
      a: '업로드된 파일은 분석 후 즉시 삭제되며, 어디에도 저장되지 않습니다.',
    },
    q2: {
      q: '정확한가요?',
      a: 'AI가 대화 패턴, 이모티콘 사용, 답장 속도 등 다양한 요소를 종합적으로 분석합니다.',
    },
    q3: {
      q: '몇 명의 대화를 분석할 수 있나요?',
      a: '현재는 1:1 대화만 분석 가능합니다.',
    },
    q4: {
      q: '최소 몇 개의 메시지가 필요한가요?',
      a: '최소 10개 이상의 메시지가 필요합니다. 더 많을수록 정확합니다.',
    },
  },

  // Common
  common: {
    close: '닫기',
    confirm: '확인',
    cancel: '취소',
    loading: '로딩 중...',
    error: '오류',
  },

  // Validation Errors (for HomeScreen validation)
  validationErrors: {
    maliciousContent: {
      title: '파일에 위험한 코드가 감지되었어요',
      message: '정상적인 카카오톡 대화 파일을 업로드해주세요.',
      suggestion: '카카오톡에서 다시 내보낸 파일을 사용해주세요.',
    },
    invalidTextFile: {
      title: '올바른 텍스트 파일이 아니에요',
      message: '카카오톡에서 내보낸 .txt 파일만 분석할 수 있어요.',
      suggestion: '파일이 손상되었거나 바이너리 파일일 수 있습니다. 카카오톡에서 다시 내보내주세요.',
    },
    nicknameTooLong: {
      title: '닉네임이 너무 길어요',
      message: '{maxLength}글자 이하의 닉네임만 분석할 수 있어요.',
      suggestion: '카카오톡 프로필 이름을 짧게 변경한 후 다시 내보내주세요.',
    },
    invalidMimeType: {
      title: '올바른 파일 형식이 아니에요',
      message: '텍스트 파일(.txt)만 분석할 수 있어요.',
      suggestion: '카카오톡에서 내보낸 .txt 파일을 사용해주세요.',
    },
    fileTooLarge: {
      title: '파일이 너무 커요',
      message: '{maxSize}MB 이하의 파일만 분석할 수 있어요.',
      suggestion: '더 짧은 기간의 대화를 내보내거나, 파일을 분할해주세요.',
    },
    fileReadError: {
      title: '파일을 읽을 수 없어요',
      message: '파일이 손상되었거나 읽을 수 없는 형식이에요.',
      suggestion: '다른 파일을 선택해주세요.',
    },
  },
}

export type Translation = typeof ko
