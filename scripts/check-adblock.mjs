// 광고 차단 안내창(차단 해제 전까지 이용 불가)이 의도대로 동작하는지 확인한다.
// 실행: node scripts/check-adblock.mjs [baseUrl]
import { chromium } from 'playwright-core'

const BASE_URL = process.argv[2] ?? 'http://localhost:3000'
const DIALOG = '[role="alertdialog"][aria-labelledby="adblock-title"]'
const DETECTION_WAIT_MS = 7000
const COUPANG = 'ads-partners.coupang.com'
const GOOGLE_ADS = ['googlesyndication.com', 'doubleclick.net']
const HUMAN_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

/**
 * blockedHosts: 요청을 막을 호스트. surrogateHosts: 막지 않고 빈 파일로 바꿔치기할 호스트
 * (uBlock Origin이 구글 광고 스크립트에 쓰는 방식)
 */
async function runCase(browser, { blockedHosts = [], surrogateHosts = [], asHuman = true }) {
  const context = await browser.newContext({ locale: 'ko-KR', ...(asHuman ? { userAgent: HUMAN_USER_AGENT } : {}) })
  if (asHuman) {
    // 자동화 브라우저 표시를 지워 일반 방문자처럼 보이게 한다
    await context.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }))
  }
  const page = await context.newPage()
  const matches = (url, hosts) => hosts.some((host) => url.hostname.endsWith(host))
  await page.route(
    (url) => matches(url, blockedHosts) || matches(url, surrogateHosts),
    (route) =>
      matches(new URL(route.request().url()), blockedHosts)
        ? route.abort('blockedbyclient')
        : route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }),
  )
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(DETECTION_WAIT_MS)
  const shown = (await page.locator(DIALOG).count()) > 0

  let staysAfterEscape = null
  let hasDismissButton = null
  if (shown) {
    await page.keyboard.press('Escape')
    staysAfterEscape = (await page.locator(DIALOG).count()) > 0
    hasDismissButton = (await page.locator(`${DIALOG} button`).count()) !== 1
  }
  await context.close()
  return { shown, staysAfterEscape, hasDismissButton }
}

const browser = await chromium.launch({ channel: 'chrome' })
try {
  const noBlocker = await runCase(browser, {})
  const allBlocked = await runCase(browser, { blockedHosts: [COUPANG, ...GOOGLE_ADS] })
  const uBlockLike = await runCase(browser, { blockedHosts: [COUPANG], surrogateHosts: GOOGLE_ADS })
  const crawler = await runCase(browser, { blockedHosts: [COUPANG, ...GOOGLE_ADS], asHuman: false })

  const wall = (result) => result.shown && result.staysAfterEscape && !result.hasDismissButton
  const ok = !noBlocker.shown && wall(allBlocked) && wall(uBlockLike) && !crawler.shown
  process.stdout.write(
    [
      `차단 없음:                         shown=${noBlocker.shown}`,
      `광고 요청 전부 차단:               shown=${allBlocked.shown} Esc로 안 닫힘=${allBlocked.staysAfterEscape} 닫기 버튼 없음=${!allBlocked.hasDismissButton}`,
      `쿠팡만 차단, 구글은 빈 파일로 대체: shown=${uBlockLike.shown} Esc로 안 닫힘=${uBlockLike.staysAfterEscape} 닫기 버튼 없음=${!uBlockLike.hasDismissButton}`,
      `크롤러(자동화 브라우저):           shown=${crawler.shown}`,
      ok ? 'PASS' : 'FAIL',
      '',
    ].join('\n'),
  )
  process.exitCode = ok ? 0 : 1
} finally {
  await browser.close()
}
