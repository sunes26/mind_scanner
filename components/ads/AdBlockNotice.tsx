'use client'

import { useEffect, useRef, useState } from 'react'
import { ShieldAlert } from 'lucide-react'

// 광고 차단 프로그램이 감지되면 해제할 때까지 사이트 이용을 막는 안내창.
// 닫기 버튼이 없고, 차단을 끄고 새로고침해야 사라진다.

const CHECK_DELAY_MS = 600
const BAIT_SETTLE_MS = 150
const PROBE_TIMEOUT_MS = 5000

// 광고 차단 필터가 숨기는 대표적인 클래스 이름들
const BAIT_CLASS = 'adsbox ad-banner ad-placement adsbygoogle pub_300x250 text-ad'

// 차단 목록에 들어 있는 광고 스크립트 주소들. 첫 번째가 이 사이트가 실제로 쓰는 쿠팡 배너 스크립트다.
// 일부 차단 프로그램은 구글 광고 스크립트를 막는 대신 빈 파일로 바꿔치기해 요청이 성공한 것처럼 보이므로,
// "모두 막힘"이 아니라 "하나라도 막힘"을 차단으로 본다.
const AD_PROBE_URLS = [
  'https://ads-partners.coupang.com/g.js',
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
  'https://securepubads.g.doubleclick.net/tag/js/gpt.js',
]
// 네트워크 자체가 끊긴 것과 구별하기 위한 같은 사이트 요청
const CONTROL_URL = '/robots.txt'

// 검색엔진·광고 심사 크롤러와 자동화 브라우저에는 안내창을 띄우지 않는다
const BOT_PATTERN = /bot|crawl|spider|mediapartners|adsbot|lighthouse|yeti|headless|inspect/i

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

type ProbeResult = 'ok' | 'blocked' | 'timeout'

async function probe(url: string): Promise<ProbeResult> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS)
  try {
    await fetch(url, { method: 'GET', mode: 'no-cors', cache: 'no-store', signal: controller.signal })
    return 'ok'
  } catch (error: unknown) {
    // 시간 초과는 느린 네트워크일 수 있으므로 차단으로 보지 않는다
    return error instanceof DOMException && error.name === 'AbortError' ? 'timeout' : 'blocked'
  } finally {
    clearTimeout(timer)
  }
}

async function detectAdBlock(): Promise<boolean> {
  if (await isBaitHidden()) return true
  if (!navigator.onLine) return false

  const [control, ...ads] = await Promise.all([probe(CONTROL_URL), ...AD_PROBE_URLS.map(probe)])
  // 같은 사이트 요청까지 실패하면 네트워크 문제이므로 판단하지 않는다
  if (control !== 'ok') return false
  return ads.some((result) => result === 'blocked')
}

export default function AdBlockNotice() {
  const [blocked, setBlocked] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const reloadButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isAutomatedVisitor()) return

    let cancelled = false
    const timer = setTimeout(() => {
      detectAdBlock()
        .then((detected) => {
          if (!cancelled && detected) setBlocked(true)
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

  // 안내창이 떠 있는 동안: 배경 스크롤을 잠그고, 키보드 포커스가 안내창 밖으로 나가지 못하게 한다
  useEffect(() => {
    if (!blocked) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    reloadButtonRef.current?.focus()

    const keepFocusInside = (event: FocusEvent) => {
      if (dialogRef.current && event.target instanceof Node && !dialogRef.current.contains(event.target)) {
        reloadButtonRef.current?.focus()
      }
    }
    document.addEventListener('focusin', keepFocusInside)

    return () => {
      document.removeEventListener('focusin', keepFocusInside)
      document.body.style.overflow = previousOverflow
    }
  }, [blocked])

  if (!blocked) return null

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="adblock-title"
      aria-describedby="adblock-desc"
    >
      <div className="w-full max-w-md bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_black] rounded-2xl p-6 text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFD233] border-2 border-black mb-4"
          aria-hidden="true"
        >
          <ShieldAlert className="w-7 h-7 text-black" />
        </div>
        <h2 id="adblock-title" className="text-2xl text-black mb-3">
          광고 차단을 꺼 주세요
        </h2>
        <p id="adblock-desc" className="text-gray-700 leading-relaxed mb-4">
          속마음 스캐너는 광고 수익으로 무료로 운영됩니다. 이 사이트에서 광고 차단 프로그램을 끄면 바로 이용할 수
          있습니다.
        </p>
        <ol className="text-left text-sm text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl p-4 mb-5 space-y-1 list-decimal pl-8">
          <li>브라우저 오른쪽 위의 광고 차단 확장 프로그램 아이콘을 누릅니다.</li>
          <li>&ldquo;이 사이트에서 사용 안 함&rdquo; 또는 &ldquo;일시 중지&rdquo;를 선택합니다.</li>
          <li>아래 버튼으로 페이지를 새로고침합니다.</li>
        </ol>
        <button
          ref={reloadButtonRef}
          type="button"
          onClick={() => window.location.reload()}
          className="neo-btn w-full bg-[#FFD233] text-black px-5 py-3 rounded-xl font-bold"
        >
          차단을 껐어요, 새로고침
        </button>
        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          확장 프로그램이 없는데 이 화면이 보인다면, 브라우저의 광고 차단 기능(Brave 등)이나 광고를 막는 DNS·VPN·보안
          프로그램이 켜져 있는지 확인해 주세요.
        </p>
      </div>
    </div>
  )
}
