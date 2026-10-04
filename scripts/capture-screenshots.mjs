// 블로그·OG용 스크린샷을 실제 화면에서 캡처한다.
// 사전 조건: 개발 서버 실행(npm run dev), Chrome 설치.
// 실행: node scripts/capture-screenshots.mjs [baseUrl]
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const BASE_URL = process.argv[2] ?? 'http://localhost:3000'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'images', 'blog')
const DEVICE_SCALE = 1.5
const ANIMATION_SETTLE_MS = 2500
const CLIP_PADDING = 12

mkdirSync(outDir, { recursive: true })

/** 여러 요소를 한 장에 담는 캡처 영역(문서 좌표)을 구한다 */
async function unionClip(page, locators) {
  const boxes = []
  for (const locator of locators) {
    await locator.scrollIntoViewIfNeeded()
    const box = await locator.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      return { x: rect.left + window.scrollX, y: rect.top + window.scrollY, width: rect.width, height: rect.height }
    })
    boxes.push(box)
  }
  const left = Math.min(...boxes.map((box) => box.x)) - CLIP_PADDING
  const top = Math.min(...boxes.map((box) => box.y)) - CLIP_PADDING
  const right = Math.max(...boxes.map((box) => box.x + box.width)) + CLIP_PADDING
  const bottom = Math.max(...boxes.map((box) => box.y + box.height)) + CLIP_PADDING
  return { x: Math.max(left, 0), y: Math.max(top, 0), width: right - Math.max(left, 0), height: bottom - Math.max(top, 0) }
}

/** 스크롤 진입 애니메이션이 모두 실행되도록 페이지를 끝까지 한 번 내린다 */
async function revealAll(page) {
  // 상단 고정 헤더가 캡처 영역을 덮지 않도록 고정을 푼다
  await page.addStyleTag({ content: 'header { position: static !important; }' })
  await page.evaluate(async () => {
    const step = window.innerHeight / 2
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(ANIMATION_SETTLE_MS)
}

const sizes = {}

async function save(page, name, clip) {
  const path = join(outDir, name)
  await page.screenshot({ path, clip, fullPage: true })
  sizes[name] = {
    width: Math.round(clip.width * DEVICE_SCALE),
    height: Math.round(clip.height * DEVICE_SCALE),
  }
  process.stdout.write(`saved ${name} ${sizes[name].width}x${sizes[name].height}\n`)
}

const browser = await chromium.launch({ channel: 'chrome' })

try {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: DEVICE_SCALE,
    locale: 'ko-KR',
  })
  const page = await context.newPage()

  // 홈
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await revealAll(page)
  await save(page, 'shot-home-upload.png', { x: 0, y: 0, width: 1280, height: 760 })
  await save(
    page,
    'shot-home-export-guide.png',
    await unionClip(page, [page.locator('section[aria-labelledby="export-guide-heading"]')]),
  )

  // 샘플 리포트
  await page.goto(`${BASE_URL}/sample`, { waitUntil: 'networkidle' })
  await revealAll(page)
  await save(page, 'shot-sample-chat-file.png', await unionClip(page, [page.locator('#chat-file')]))

  const cards = page.locator('#report .grid.lg\\:grid-cols-4').first().locator(':scope > *')
  const cardRange = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => cards.nth(from + index))
  await save(page, 'shot-sample-overview.png', await unionClip(page, cardRange(0, 2)))
  await save(page, 'shot-sample-ratio-time.png', await unionClip(page, cardRange(3, 5)))
  await save(page, 'shot-sample-reply-patterns.png', await unionClip(page, cardRange(6, 6)))
  await save(page, 'shot-sample-secret-report.png', await unionClip(page, cardRange(7, 7)))
  await context.close()

  // 기본 OG 이미지 (1200x630)
  const ogContext = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, locale: 'ko-KR' })
  const ogPage = await ogContext.newPage()
  await ogPage.goto(BASE_URL, { waitUntil: 'networkidle' })
  await ogPage.waitForTimeout(ANIMATION_SETTLE_MS)
  await ogPage.screenshot({ path: join(root, 'public', 'og-default.png'), clip: { x: 0, y: 0, width: 1200, height: 630 } })
  process.stdout.write('saved og-default.png 1200x630\n')
  await ogContext.close()
} finally {
  await browser.close()
}

// 캡처한 크기를 이미지 매니페스트에 반영
const manifestPath = join(root, 'components', 'blog', 'imageManifest.ts')
const manifest = readFileSync(manifestPath, 'utf8')
const entries = Object.entries(sizes)
  .map(([name, size]) => `  '${name}': { width: ${size.width}, height: ${size.height} },`)
  .join('\n')
const updated = manifest.replace(
  /\/\/ <screenshot-sizes>[\s\S]*?\/\/ <\/screenshot-sizes>/,
  `// <screenshot-sizes>\nexport const BLOG_IMAGE_SIZES: Record<string, ImageSize> = {\n${entries}\n}\n// </screenshot-sizes>`,
)
writeFileSync(manifestPath, updated, 'utf8')
process.stdout.write('image manifest updated\n')
