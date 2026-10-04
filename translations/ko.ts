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
    badge: '답장 시간·선톡 비율·대화 성향 분석',
    title: '카카오톡 대화 분석\n숫자로 보는\n우리 사이',
    subtitle: '카카오톡에서 내보낸 대화 파일을 올리면 답장 시간, 메시지 비율, 질문 횟수를 계산하고, 이를 바탕으로 애정 지수와 대화 성향을 진단해 드립니다. 대화 내용은 브라우저 밖으로 나가지 않습니다.',
    privacy: '#대화내용전송없음 #회원가입없음',
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
          desc: '"텍스트만 보내기"를 선택합니다. 버전에 따라 메뉴 이름이 조금 다를 수 있어요.',
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
        a: '네, 무료입니다. 회원가입 없이 바로 쓸 수 있고, 운영비는 페이지에 표시되는 광고로 충당합니다.',
      },
      q2: {
        q: 'Q. 개인정보는 안전한가요?',
        a: '대화 파일은 브라우저에서 읽고 통계도 브라우저에서 계산하므로, 대화 내용과 참여자 이름은 브라우저 밖으로 나가지 않습니다. 서버에는 횟수와 비율 같은 숫자 통계만 전달되고, 점수와 진단은 서버가 정해진 규칙으로 계산합니다. 속마음 스캐너는 아무것도 저장하지 않으며 결과는 페이지를 닫으면 사라집니다. 리포트 맨 아래의 "AI 코멘트 받기" 버튼을 누를 때만 같은 숫자 통계가 OpenAI API로 전달됩니다.',
      },
      q3: {
        q: 'Q. 대화 패턴에서 무엇을 알 수 있나요?',
        a: '두 사람의 메시지 비율, 평균 답장 시간, 평균 글자 수, 질문 횟수, 누가 먼저 대화를 시작하는지, 시간대별 대화량을 볼 수 있습니다. 이 통계를 바탕으로 종합 애정 지수, 항목별 진단, 대화 성향 유형, 맞춤 조언을 정해진 규칙으로 계산해 보여 드립니다.',
      },
      q4: {
        q: 'Q. 어떤 파일 형식을 지원하나요?',
        a: '카카오톡에서 내보낸 .txt 파일을 지원합니다. PC 카카오톡과 모바일 카카오톡 모두에서 내보낸 파일을 분석할 수 있습니다.',
      },
      q5: {
        q: 'Q. 분석 결과는 얼마나 정확한가요?',
        a: '메시지 수, 답장 시간, 질문 횟수 같은 통계는 파일에서 그대로 센 값입니다. 종합 점수와 성향 진단은 이 통계를 정해진 규칙으로 해석한 것이라 같은 파일은 항상 같은 결과가 나오지만, 참고용으로 봐 주세요. 읽음 여부, 사진, 통화, 실제 만남은 반영되지 않습니다.',
      },
    },
    footer: {
      copyright: '© 2025–2026 속마음 스캐너 (Mind Scanner)',
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
      '🧠 대화 성향 유형 분류 중...',
      '💭 관계 균형 진단 중...',
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
      title: '대화 중 답장',
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
      starterCount: '🙋 먼저 말 건 횟수',
      starterCountValue: '{count}회',
      lateNightCount: '🌙 심야 메시지',
      lateNightCountValue: '{count}개',
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
      aiAdviceTitle: '맞춤 조언',
      dimensionsTitle: '항목별 진단',
      balanceTitle: '관계 균형 진단',
      levels: { high: '높음', mid: '보통', low: '낮음' },
      aiCommentTitle: 'AI 한 줄 코멘트',
      aiCommentDescription: '숫자 통계만 AI에게 보내 요약 문장을 받습니다. 대화 내용과 이름은 전송되지 않습니다.',
      aiCommentButton: 'AI 코멘트 받기',
      aiCommentLoading: '작성 중...',
      aiCommentError: 'AI 코멘트를 받지 못했어요. 잠시 후 다시 시도해 주세요.',
      customStrategy: '이렇게 해 보세요',
      unlockTitle: '시크릿 리포트 해제',
      unlockDescription: '상세한 성향 분석과 맞춤 조언을 확인하세요',
      unlockButton: '광고 보고 무료 확인',
    },
  },

  // Error Messages
  errors: {
    fileEmpty: {
      title: '파일이 비어있어요',
      message: '카카오톡 대화 내용이 포함된 파일을 업로드해주세요.',
      suggestion: '최소 20개 이상의 대화 메시지가 필요합니다.',
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
      message: '최소 20개 이상의 대화가 필요해요.',
      suggestion: '더 많은 대화가 포함된 파일을 업로드해주세요.',
    },
    apiError: {
      title: '분석 실패',
      message: '서버에서 분석 결과를 받지 못했습니다.',
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
      a: '대화 내용과 이름은 브라우저 밖으로 나가지 않고, 서버에는 숫자 통계만 전달됩니다. 아무것도 저장하지 않습니다. 선택 기능인 AI 코멘트를 누를 때만 숫자 통계가 OpenAI API로 전달됩니다.',
    },
    q2: {
      q: '정확한가요?',
      a: '답장 속도, 메시지 비율, 감정 표현, 연락의 꾸준함 등 여러 통계를 정해진 규칙으로 종합합니다. 참고용이며 상대의 마음을 판정하지는 않습니다.',
    },
    q3: {
      q: '몇 명의 대화를 분석할 수 있나요?',
      a: '현재는 1:1 대화만 분석 가능합니다.',
    },
    q4: {
      q: '최소 몇 개의 메시지가 필요한가요?',
      a: '최소 20개 이상의 메시지가 필요합니다. 더 많을수록 정확합니다.',
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
