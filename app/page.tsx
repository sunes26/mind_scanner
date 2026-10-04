import type { Metadata } from 'next'
import HomeClient from '@/components/HomeClient'
import SiteFooter from '@/components/site/SiteFooter'
import JsonLd from '@/components/site/JsonLd'
import { getPublishedPosts } from './blog/blogData'
import { ko } from '@/translations/ko'
import { SITE_URL, pageSeo, siteConfig } from '@/config/seo'

// 최신 글 목록이 예약 발행에 맞춰 갱신되도록 주기적으로 재생성한다
export const revalidate = 3600

const TITLE = '카카오톡 대화 분석 - 답장 시간·선톡 비율로 보는 대화 패턴 | 속마음 스캐너'
const HOME_POST_COUNT = 6

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: siteConfig.description,
  ...pageSeo({ title: TITLE, description: siteConfig.description, path: '/' }),
}

// 화면에 보이는 FAQ(translations/ko.ts)와 같은 문구로 구조화 데이터를 만든다
const faqItems = [
  ko.home.faqSection.q1,
  ko.home.faqSection.q2,
  ko.home.faqSection.q3,
  ko.home.faqSection.q4,
  ko.home.faqSection.q5,
].map((item) => ({ q: item.q.replace(/^Q\.\s*/, ''), a: item.a }))

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#app`,
      name: siteConfig.name,
      alternateName: siteConfig.nameEn,
      url: SITE_URL,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      inLanguage: 'ko-KR',
      description: siteConfig.description,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      featureList: [
        '메시지 수와 비율',
        '평균 답장 시간',
        '평균 글자 수',
        '질문 횟수',
        '대화 시작(선톡) 횟수',
        '시간대별 대화량',
        '종합 애정 지수와 항목별 진단(규칙 기반)',
        '대화 성향 유형과 맞춤 조언',
        '선택형 AI 코멘트(숫자 통계만 전송)',
      ],
      author: { '@id': `${SITE_URL}/#publisher` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
}

export default function HomePage() {
  const latestPosts = getPublishedPosts().slice(0, HOME_POST_COUNT)

  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HomeClient latestPosts={latestPosts} />
      <SiteFooter />
    </>
  )
}
