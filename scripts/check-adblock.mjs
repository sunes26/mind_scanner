// 광고 차단 안내창이 차단 환경의 일반 방문자에게만 뜨는지 확인한다.
// 실행: node scripts/check-adblock.mjs [baseUrl]
import { chromium } from 'playwright-core'

const BASE_URL = process.argv[2] ?? 'http://localhost:3000'
const DIALOG = '[role="dialog"][aria-labelledby="adblock-title"]'
const DETECTION_WAIT_MS = 7000
const BLOCKED_HOSTS = ['googlesyndication.com', 'ads-partners.coupang.com']
const HUMAN_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

async function runCase(browser, { blockAds, asHuman }) {
  const context = await browser.newContext({ locale: 'ko-KR', ...(asHuman ? { userAgent: HUMAN_USER_AGENT } : {}) })
  if (asHuman) {
    // 자동화 브라우저 표시를 지워 일반 방문자처럼 보이게 한다
    await context.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }))
  }
  const page = await context.newPage()
  if (blockAds) {
    await page.route(
      (url) => BLOCKED_HOSTS.some((host) => url.hostname.endsWith(host)),
      (route) => route.abort('blockedbyclient'),
    )
  }
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(DETECTION_WAIT_MS)
  const shown = (await page.locator(DIALOG).count()) > 0

  let closesOnEscape = null
  let staysDismissed = null
  if (shown) {
    await page.keyboard.press('Escape')
    closesOnEscape = (await page.locator(DIALOG).count()) === 0
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(DETECTION_WAIT_MS)
    staysDismissed = (await page.locator(DIALOG).count()) === 0
  }
  await context.close()
  return { shown, closesOnEscape, staysDismissed }
}

const browser = await chromium.launch({ channel: 'chrome' })
try {
  const human = await runCase(browser, { blockAds: false, asHuman: true })
  const humanBlocked = await runCase(browser, { blockAds: true, asHuman: true })
  const botBlocked = await runCase(browser, { blockAds: true, asHuman: false })
  const ok =
    !human.shown && humanBlocked.shown && humanBlocked.closesOnEscape && humanBlocked.staysDismissed && !botBlocked.shown
  process.stdout.write(
    [
      `visitor, no blocker:   shown=${human.shown}`,
      `visitor, blocker:      shown=${humanBlocked.shown} escape=${humanBlocked.closesOnEscape} staysDismissed=${humanBlocked.staysDismissed}`,
      `automated, blocker:    shown=${botBlocked.shown}`,
      ok ? 'PASS' : 'FAIL',
      '',
    ].join('\n'),
  )
  process.exitCode = ok ? 0 : 1
} finally {
  await browser.close()
}
