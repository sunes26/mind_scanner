// scripts/generate-post-registry.mjs 가 만든 파일. slug → 본문 컴포넌트·FAQ 연결.
import type { ComponentType } from 'react'
import type { PostFaqItem } from '@/components/blog/PostKit'
import * as post_kakaotalk_export_guide from './kakaotalk-export-guide'
import * as post_how_to_distinguish_some_vs_eojang from './how-to-distinguish-some-vs-eojang'
import * as post_ai_analyzed_reply_patterns from './ai-analyzed-reply-patterns'
import * as post_who_likes_more_kakaotalk from './who-likes-more-kakaotalk'
import * as post_reply_speed_psychology from './reply-speed-psychology'
import * as post_emoticon_usage_psychology from './emoticon-usage-psychology'
import * as post_kkk_count_analysis from './kkk-count-analysis'
import * as post_mildang_vs_real_love from './mildang-vs-real-love'
import * as post_conversation_analysis_sites_2025 from './conversation-analysis-sites-2025'
import * as post_kakaotalk_psychology_top10 from './kakaotalk-psychology-top10'
import * as post_kakaotalk_export_troubleshooting from './kakaotalk-export-troubleshooting'
import * as post_how_affinity_score_works from './how-affinity-score-works'
import * as post_read_receipt_ignored_what_to_do from './read-receipt-ignored-what-to-do'
import * as post_first_message_after_meeting from './first-message-after-meeting'
import * as post_conversation_starter_ratio from './conversation-starter-ratio'
import * as post_question_frequency_interest from './question-frequency-interest'
import * as post_late_night_chat_meaning from './late-night-chat-meaning'
import * as post_message_length_balance from './message-length-balance'
import * as post_chat_analysis_privacy_checklist from './chat-analysis-privacy-checklist'
import * as post_long_distance_couple_kakaotalk from './long-distance-couple-kakaotalk'
import * as post_texting_anxiety_overthinking from './texting-anxiety-overthinking'
import * as post_friend_group_chat_analysis from './friend-group-chat-analysis'
import * as post_ai_chat_analysis_limits from './ai-chat-analysis-limits'
import * as post_reconnect_after_conversation_fades from './reconnect-after-conversation-fades'
import * as post_couple_chat_habits_long_term from './couple-chat-habits-long-term'

interface PostModule {
  default: ComponentType
  faq: PostFaqItem[]
}

const registry: Record<string, PostModule> = {
  'kakaotalk-export-guide': post_kakaotalk_export_guide,
  'how-to-distinguish-some-vs-eojang': post_how_to_distinguish_some_vs_eojang,
  'ai-analyzed-reply-patterns': post_ai_analyzed_reply_patterns,
  'who-likes-more-kakaotalk': post_who_likes_more_kakaotalk,
  'reply-speed-psychology': post_reply_speed_psychology,
  'emoticon-usage-psychology': post_emoticon_usage_psychology,
  'kkk-count-analysis': post_kkk_count_analysis,
  'mildang-vs-real-love': post_mildang_vs_real_love,
  'conversation-analysis-sites-2025': post_conversation_analysis_sites_2025,
  'kakaotalk-psychology-top10': post_kakaotalk_psychology_top10,
  'kakaotalk-export-troubleshooting': post_kakaotalk_export_troubleshooting,
  'how-affinity-score-works': post_how_affinity_score_works,
  'read-receipt-ignored-what-to-do': post_read_receipt_ignored_what_to_do,
  'first-message-after-meeting': post_first_message_after_meeting,
  'conversation-starter-ratio': post_conversation_starter_ratio,
  'question-frequency-interest': post_question_frequency_interest,
  'late-night-chat-meaning': post_late_night_chat_meaning,
  'message-length-balance': post_message_length_balance,
  'chat-analysis-privacy-checklist': post_chat_analysis_privacy_checklist,
  'long-distance-couple-kakaotalk': post_long_distance_couple_kakaotalk,
  'texting-anxiety-overthinking': post_texting_anxiety_overthinking,
  'friend-group-chat-analysis': post_friend_group_chat_analysis,
  'ai-chat-analysis-limits': post_ai_chat_analysis_limits,
  'reconnect-after-conversation-fades': post_reconnect_after_conversation_fades,
  'couple-chat-habits-long-term': post_couple_chat_habits_long_term,
}

export function getPostModule(slug: string): PostModule | undefined {
  return registry[slug]
}
