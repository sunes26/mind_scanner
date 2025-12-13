import { Translation } from './ko'

export const en: Translation = {
  // Header
  header: {
    title: 'Mind Scanner',
    backToHome: 'Back to Home',
    confirmBack: 'Go back to home?\nCurrent results will be lost.',
    confirmNavigation: 'To view {section}, you need to return to home.\nCurrent results will be lost.',
    howToUse: 'How to Use',
    faq: 'FAQ',
  },

  // Home Screen
  home: {
    badge: 'Analyze chat patterns in 10 seconds',
    title: 'Discover Their\nTrue Feelings\nThrough Chat Analysis',
    subtitle: 'Just upload your chat history\nAI analyzes response speed, emotions, and conversation dynamics\nCompletely and accurately.',
    privacy: '#NoServerStorage #100%Anonymous',
    uploadSection: {
      title: 'Upload Chat File',
      subtitle: 'Only .txt files supported',
      dragOrClick: 'Drag file or click',
      processing: 'Processing...',
      analyzeButton: 'Analyze Now',
    },
    badges: {
      replyTime: 'Average Reply Time',
      personality: 'Chat Style Analysis',
      dominance: 'Conversation Lead Analysis',
    },
    exportGuide: {
      title: 'How to Export KakaoTalk Chat',
      mobile: {
        title: 'Mobile',
        step1: {
          title: 'Open Chat Room in KakaoTalk App',
          desc: 'Open the 1:1 chat you want to analyze.',
        },
        step2: {
          title: 'Click Menu Button',
          desc: 'Tap the ≡ (menu) button in the top right.',
        },
        step3: {
          title: 'Click Settings Icon',
          desc: 'Tap the ⚙️ settings icon in the menu.',
        },
        step4: {
          title: 'Export Chat',
          desc: 'Select "Export Chat".',
        },
        step5: {
          title: 'Choose Export Method',
          desc: 'Choose either "Send text messages only" or "Save all messages as document".',
        },
        step6: {
          title: 'Save and Upload File',
          desc: 'Upload the saved .txt file to the upload box above!',
        },
      },
      pc: {
        title: 'PC',
        shortcut: {
          label: 'Quick Method (Recommended)',
          desc: 'Press Ctrl + S in the chat window to open export dialog!',
        },
        step1: {
          title: 'Launch PC KakaoTalk',
          desc: 'Launch KakaoTalk for PC and open the chat to analyze.',
        },
        step2: {
          title: 'Export Chat',
          desc: 'Press Ctrl + S, or click ≡ menu and select "Export Chat".',
        },
        step3: {
          title: 'Choose Save Location',
          desc: 'Select folder and click OK. A .txt file will be created automatically.',
        },
        step4: {
          title: 'Upload File',
          desc: 'Drag the .txt file to the upload box above or click to select!',
        },
      },
    },
    faqSection: {
      title: 'Frequently Asked Questions',
      q1: {
        q: 'Q. Is chat analysis really free?',
        a: 'Yes, Mind Scanner is provided for free. Upload your KakaoTalk chat to analyze affection and psychology for free.',
      },
      q2: {
        q: 'Q. Is my privacy safe?',
        a: 'Yes, absolutely safe. All chat content is not stored on the server and is deleted immediately after analysis. Stateless architecture ensures perfect anonymity.',
      },
      q3: {
        q: 'Q. What can you learn from chat patterns?',
        a: 'AI comprehensively analyzes response speed, emoji usage, conversation dominance, question frequency, etc. to understand communication styles and relationship dynamics.',
      },
      q4: {
        q: 'Q. What file formats are supported?',
        a: '.txt files exported from KakaoTalk are supported. Files exported from both PC and mobile KakaoTalk can be analyzed.',
      },
      q5: {
        q: 'Q. How accurate are the analysis results?',
        a: 'We use the latest AI technology to analyze chat patterns. More conversations provide more accurate results. However, results are for reference and actual relationships are influenced by various factors.',
      },
    },
    footer: {
      copyright: 'Mind Scanner © 2025. All Data Processed Locally.',
      madeBy: 'Made by',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },

  // Loading Screen
  loading: {
    analyzing: 'Analyzing...',
    complete: 'Analysis Complete!',
    messages: [
      '📂 Loading chat file...',
      '📊 Counting total messages...',
      '👥 Analyzing participants...',
      '🕐 Parsing timestamps...',
      '⏰ Analyzing 24-hour activity patterns...',
      '⚡ Calculating average response time...',
      '😊 Analyzing emoji usage patterns...',
      '💬 Analyzing message length statistics...',
      '❓ Measuring question frequency...',
      '📈 Analyzing conversation dominance...',
      '🎭 Understanding chat styles...',
      '💡 Analyzing communication methods...',
      '🔍 Analyzing relationship dynamics...',
      '🧠 AI personality type matching...',
      '💭 Analyzing mutual perception patterns...',
      '🎯 Generating personalized advice...',
      '✍️ Writing final report...',
    ],
  },

  // Result Screen
  result: {
    title: 'Analysis Results',
    score: 'Affection Score',
    relation: 'Relationship Status',
    dominance: 'Conversation Lead',
    retry: 'Analyze Again',
    share: 'Share Results',
    personalities: 'Personality Analysis',
    mutualPerception: 'Mutual Perception',
    attackTip: 'Relationship Tips',
    thinkingAboutYou: 'How they see you',
    youThinkingAbout: 'How you see them',
  },

  // Result Screen (Detailed)
  resultScreen: {
    reportTitle: 'Analysis Report',
    confirmRetry: 'Start over with new analysis?\nCurrent results will be lost.',
    retryButton: 'Retry',
    shareButton: 'Share',

    scoreCard: {
      title: 'Overall Affection Index',
      label: 'Overall score {score} points',
    },

    dailyAvg: {
      title: 'Average Messages Per Day',
      label: 'Average {count} messages per day',
      almostDaily: 'Almost Daily Chat',
      veryActive: 'Very Active Communication',
      active: 'Active Communication',
      steady: 'Steady Communication',
      normal: 'Normal Level',
      occasional: 'Occasional Contact',
    },

    avgReply: {
      title: 'Avg Reply',
      immediately: 'Instant',
      minutes: '{minutes}min',
      hours: '{hours}hr',
      days: '{days}d',
      lightning: 'Lightning Fast ⚡',
      lte: 'LTE Speed',
      moderate: 'Moderate Pace',
      relaxed: 'Relaxed',
      slow: 'Easy Going',
    },

    talkRatio: {
      title: 'Too Much Talker',
    },

    activityPattern: {
      title: '24-Hour Activity Pattern',
      midnight: '0:00 ~ 6:00 (Midnight)',
      morning: '6:00 ~ 12:00 (Morning)',
      afternoon: '12:00 ~ 18:00 (Afternoon)',
      evening: '18:00 ~ 24:00 (Evening)',
      conversationCount: 'Messages: {count}',
    },

    interestScore: {
      title: 'Interest Score',
      points: '{score}pts',
    },

    replyPatterns: {
      title: 'Detailed Reply Pattern Analysis',
      messageRatio: '📊 Message Ratio',
      avgLength: '📝 Avg Length',
      avgLengthValue: '{length} chars',
      questionCount: '❓ Questions',
      questionCountValue: '{count} times',
      laughCount: '🤣 Laugh Usage',
      resultSummary: 'Chat pattern analysis results for {name}',
    },

    secretReport: {
      title: 'SECRET REPORT',
      personalitiesTitle: 'Chat Personality Analysis',
      chatStyle: 'Chat Style',
      analyzing: 'Analyzing...',
      analyzingDescription: 'Analyzing chat patterns and various indicators to determine conversation personality.',
      mutualPerceptionTitle: 'Mutual Perception Analysis',
      howTheyThink: 'How they think about {name}',
      analyzingPerception: 'Analyzing conversation patterns to understand mutual perception.',
      aiAdviceTitle: 'AI Personalized Advice',
      customStrategy: 'Custom Strategy',
      unlockTitle: 'Unlock Secret Report',
      unlockDescription: 'View detailed personality analysis and AI advice',
      unlockButton: 'Watch Ad to Unlock Free',
    },
  },

  // Error Messages
  errors: {
    fileEmpty: {
      title: 'File is Empty',
      message: 'Please upload a file containing chat messages.',
      suggestion: 'At least 10 messages are required.',
    },
    fileFormat: {
      title: 'Invalid File Format',
      message: 'Only .txt files exported from KakaoTalk can be analyzed.',
      suggestion: 'Please export the conversation from KakaoTalk app.',
    },
    fileTooLarge: {
      title: 'File Too Large',
      message: 'Only files under 50MB can be uploaded.',
      suggestion: 'Try again with a file containing only recent conversations.',
    },
    parseError: {
      title: 'Cannot Read Chat File',
      message: 'The chat file format is not valid.',
      suggestion: 'Please make sure it is an original file exported from KakaoTalk.',
    },
    notEnoughParticipants: {
      title: 'Not Enough Participants',
      message: 'Only 1:1 conversations can be analyzed.',
      suggestion: 'Please upload a one-on-one conversation.',
    },
    notEnoughMessages: {
      title: 'Not Enough Messages',
      message: 'At least 10 messages are required.',
      suggestion: 'Please upload a file with more conversations.',
    },
    apiError: {
      title: 'AI Analysis Failed',
      message: 'Failed to receive response from AI server.',
      suggestion: 'Please try again in a moment.',
    },
    retry: 'Try Again',
    goHome: 'Home',
    retrying: 'Retrying...',
    retryButton: 'Try Again',
    goHomeButton: 'Back to Home',
    helpText: 'If the problem persists, please refresh the page 🔄',
  },

  // Export Guide
  exportGuide: {
    title: 'How to Export KakaoTalk Chat',
    step1: {
      title: '1. Open Chat Room',
      desc: 'Open the conversation you want to analyze.',
    },
    step2: {
      title: '2. Open Menu',
      desc: 'Tap the ≡ button in the top right.',
    },
    step3: {
      title: '3. Export Chat',
      desc: 'Select "Export Chat".',
    },
    step4: {
      title: '4. Save File',
      desc: 'Save as a .txt file.',
    },
  },

  // FAQ
  faq: {
    title: 'Frequently Asked Questions',
    q1: {
      q: 'Is my privacy safe?',
      a: 'Uploaded files are deleted immediately after analysis and are not stored anywhere.',
    },
    q2: {
      q: 'How accurate is it?',
      a: 'AI comprehensively analyzes various factors including chat patterns, emoji usage, and response speed.',
    },
    q3: {
      q: 'How many people can be analyzed?',
      a: 'Currently only 1:1 conversations can be analyzed.',
    },
    q4: {
      q: 'How many messages are required?',
      a: 'At least 10 messages are required. More messages provide better accuracy.',
    },
  },

  // Common
  common: {
    close: 'Close',
    confirm: 'Confirm',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error',
  },

  // Validation Errors (for HomeScreen validation)
  validationErrors: {
    maliciousContent: {
      title: 'Dangerous Code Detected in File',
      message: 'Please upload a valid KakaoTalk chat file.',
      suggestion: 'Use a file exported directly from KakaoTalk.',
    },
    invalidTextFile: {
      title: 'Invalid Text File',
      message: 'Only .txt files exported from KakaoTalk can be analyzed.',
      suggestion: 'The file may be corrupted or in binary format. Please export again from KakaoTalk.',
    },
    nicknameTooLong: {
      title: 'Nickname Too Long',
      message: 'Only nicknames under {maxLength} characters can be analyzed.',
      suggestion: 'Shorten the KakaoTalk profile name and export again.',
    },
    invalidMimeType: {
      title: 'Invalid File Format',
      message: 'Only text files (.txt) can be analyzed.',
      suggestion: 'Please use a .txt file exported from KakaoTalk.',
    },
    fileTooLarge: {
      title: 'File Too Large',
      message: 'Only files under {maxSize}MB can be analyzed.',
      suggestion: 'Try exporting a shorter conversation period or split the file.',
    },
    fileReadError: {
      title: 'Cannot Read File',
      message: 'The file is corrupted or in an unreadable format.',
      suggestion: 'Please select a different file.',
    },
  },
}
