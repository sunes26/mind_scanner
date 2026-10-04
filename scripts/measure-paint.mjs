// 첫 화면이 그려지는 시점(FCP)과 그 전의 긴 작업을 여러 번 재서 중앙값을 낸다.
// CPU를 4배 느리게 해 중급 휴대폰에 가깝게 잰다.
// 실행: node scripts/measure-paint.mjs [baseUrl] [path...]
import { chromium } from 'playwright-core'

const BASE_URL = process.argv[2] ?? 'http://localhost:3000'
const PATHS = process.argv.length > 3 ? process.argv.slice(3) : ['/', '/blog/kakaotalk-export-guide']
const RUNS = 5
const CPU_SLOWDOWN = 4

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)]

async function measure(browser, path, { javaScriptEnabled }) {
  const context = await browser.newContext({
    viewport: { width: 412, height: 823 },
    deviceScaleFactor: 2,
    isMobile: true,
    locale: 'ko-KR',
    javaScriptEnabled,
  })
  const page = await context.newPage()
  const client = await context.newCDPSession(page)
  await client.send('Emulation.setCPUThrottlingRate', { rate: CPU_SLOWDOWN })
  await page.addInitScript(() => {
    window.__longTasks = []
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__longTasks.push([Math.round(entry.startTime), Math.round(entry.duration)])
    }).observe({ type: 'longtask', buffered: true })
  })
  await page.goto(`${BASE_URL}${path}`, { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  const result = await page.evaluate(() => {
    const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null
    const fonts = performance.getEntriesByType('resource').filter((entry) => entry.name.endsWith('.woff2'))
    return {
      fcp,
      fontCount: fonts.length,
      fontKb: Math.round(fonts.reduce((sum, entry) => sum + (entry.transferSize || 0), 0) / 1024),
      longTasksBeforeFcp: (window.__longTasks ?? []).filter(([start]) => fcp === null || start < fcp),
    }
  })
  await context.close()
  return result
}

const browser = await chromium.launch({ channel: 'chrome' })
try {
  for (const path of PATHS) {
    for (const javaScriptEnabled of [true, false]) {
      const runs = []
      for (let index = 0; index < RUNS; index += 1) runs.push(await measure(browser, path, { javaScriptEnabled }))
      const last = runs[runs.length - 1]
      process.stdout.write(
        `${path.padEnd(32)} JS ${javaScriptEnabled ? 'on ' : 'off'} | FCP 중앙값 ${Math.round(median(runs.map((run) => run.fcp ?? 0)))}ms | 글꼴 ${last.fontCount}개 ${last.fontKb}KB | FCP 이전 긴 작업 ${JSON.stringify(last.longTasksBeforeFcp)}\n`,
      )
    }
  }
} finally {
  await browser.close()
}
