'use client'

import { useEffect, useRef, useState } from 'react'
import { ShieldAlert } from 'lucide-react'

// 광고 차단 프로그램이 감지되면 해제를 부탁하는 안내창.
// 강제로 막지는 않는다(닫으면 하루 동안 다시 묻지 않음).

const DISMISS_KEY = 'adblock-notice-dismissed-at'
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000
const CHECK_DELAY_MS = 1500
const BAIT_SETTLE_MS = 150
const PROBE_TIMEOUT_MS = 4000

// 광고 차단 필터가 숨기는 대표적인 클래스 이름들
const BAIT_CLASS = 'adsbox ad-banner ad-placement adsbygoogle pub_300x250 text-ad'
// 차단 목록에 거의 항상 들어 있는 광고 스크립트 주소
// 검색엔진·광고 심사 크롤러와 자동화 브라우저에는 안내창을 띄우지 않는다
const BOT_PATTERN = /bot|crawl|spider|mediapartners|adsbot|lighthouse|yeti|headless|inspect/i

const PROBE_URLS = [
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
  'https://ads-partners.coupang.com/g.js',
]

function isAutomatedVisitor(): boolean {
  return navigator.webdriver === true || BOT_PATTERN.test(navigator.userAgent)
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** 미끼 요소가 숨겨졌는지 확인 (화면 요소를 숨기는 방식의 차단 감지) */
async function isBaitHidden(): Promise<boolean> {
  const bait = document.createElement('div')
  bait.className = BAIT_CLASS
  bait.setAttribute('aria-hidden', 'true')
  bait.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:10px;height:10px;'
  bait.innerHTML = '&nbsp;'
  document.body.appendChild(bait)

  await wait(BAIT_SETTLE_MS)

  const style = window.getComputedStyle(bait)
  const hidden =
    !bait.isConnected || bait.offsetHeight === 0 || style.display === 'none' || style.visibility === 'hidden'
  bait.remove()
  return hidden
}

/** 광고 스크립트 요청이 막히는지 확인 (네트워크 요청을 막는 방식의 차단 감지) */
async function isRequestBlocked(url: string): Promise<boolean> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS)
  try {
    await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-store', signal: controller.signal })
    return false
  } catch (error: unknown) {
    // 시간 초과는 느린 네트워크일 수 있으므로 차단으로 보지 않는다
    return !(error instanceof DOMException && error.name === 'AbortError')
  } finally {
    clearTimeout(timer)
  }
}

async function detectAdBlock(): Promise<boolean> {
  if (await isBaitHidden()) return true
  // 오프라인이면 모든 요청이 실패하므로 판단하지 않는다
  if (!navigator.onLine) return false
  const results = await Promise.all(PROBE_URLS.map(isRequestBlocked))
  // 일시적인 네트워크 오류로 오탐하지 않도록 모든 주소가 막혔을 때만 차단으로 본다
  return results.every(Boolean)
}

function wasRecentlyDismissed(): boolean {
  try {
    const dismissedAt = Number(window.localStorage.getItem(DISMISS_KEY))
    return Number.isFinite(dismissedAt) && Date.now() - dismissedAt < DISMISS_DURATION_MS
  } catch {
    // 저장소 접근이 막힌 환경(시크릿 모드 등)에서는 매번 확인한다
    return false
  }
}

function rememberDismissal(): void {
  try {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()))
  } catch {
    // 저장에 실패하면 다음 방문 때 다시 안내될 뿐이므로 무시해도 된다
  }
}

export default function AdBlockNotice() {
  const [visible, setVisible] = useState(false)
  const reloadButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isAutomatedVisitor() || wasRecentlyDismissed()) return

    let cancelled = false
    const timer = setTimeout(() => {
      detectAdBlock()
        .then((blocked) => {
          if (!cancelled && blocked) setVisible(true)
        })
        .catch(() => {
          // 감지 자체가 실패하면 안내창을 띄우지 않는다
        })
    }, CHECK_DELAY_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  // 안내창이 떠 있는 동안: 배경 스크롤 잠금, Esc로 닫기, 닫힌 뒤 원래 포커스 복원
  useEffect(() => {
    if (!visible) return

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    reloadButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        rememberDismissal()
        setVisible(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [visible])

  if (!visible) return null

  const handleDismiss = () => {
    rememberDismissal()
    setVisible(false)
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="adblock-title"
      aria-describedby="adblock-desc"
    >
      <div className="w-full max-w-md bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_black] rounded-2xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFD233] border-2 border-black mb-4" aria-hidden="true">
          <ShieldAlert className="w-7 h-7 text-black" />
        </div>
        <h2 id="adblock-title" className="text-2xl text-black mb-3">
          광고 차단 프로그램이 켜져 있어요
        </h2>
        <p id="adblock-desc" className="text-gray-700 leading-relaxed mb-4">
          속마음 스캐너는 광고 수익으로 무료로 운영됩니다. 이 사이트에서만 광고 차단을 꺼 주시면 큰 도움이 됩니다.
        </p>
        <ol className="text-left text-sm text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl p-4 mb-5 space-y-1 list-decimal pl-8">
          <li>브라우저 오른쪽 위의 광고 차단 확장 프로그램 아이콘을 누릅니다.</li>
          <li>&ldquo;이 사이트에서 사용 안 함&rdquo; 또는 &ldquo;일시 중지&rdquo;를 선택합니다.</li>
          <li>아래 버튼으로 페이지를 새로고침합니다.</li>
        </ol>
        <div className="flex flex-col gap-2">
          <button
            ref={reloadButtonRef}
            type="button"
            onClick={() => window.location.reload()}
            className="neo-btn bg-[#FFD233] text-black px-5 py-3 rounded-xl font-bold"
          >
            차단을 껐어요, 새로고침
          </button>
          <button type="button" onClick={handleDismiss} className="text-sm text-gray-500 underline py-2">
            그냥 계속 볼게요
          </button>
        </div>
      </div>
    </div>
  )
}
