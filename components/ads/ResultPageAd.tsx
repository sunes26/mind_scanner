'use client'

import CoupangBanner from './CoupangBanner'

export type AdPosition =
  | 'home-hero' | 'home-faq'
  | 'result-interest' | 'result-reply' | 'result-secret' | 'result-footer'
  | 'blog-list-hero' | 'blog-list-feed'
  | 'blog-post-top' | 'blog-post-body' | 'blog-post-cta' | 'blog-post-footer'
  | 'privacy' | 'terms'

interface ResultPageAdProps {
  type: 'banner' | 'native'
  position?: AdPosition
}

export default function ResultPageAd({ type }: ResultPageAdProps) {
  return (
    <div className="my-4">
      <CoupangBanner variant={type === 'banner' ? 'wide' : 'rect'} />
    </div>
  )
}
