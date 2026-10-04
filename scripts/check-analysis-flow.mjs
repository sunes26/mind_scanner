// 샘플 대화 파일을 실제로 업로드해 결과 화면까지 가는지, 서버로 무엇이 전송되는지 확인한다.
// 실행: node scripts/check-analysis-flow.mjs [baseUrl]
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const BASE_URL = process.argv[2] ?? 'http://localhost:3000'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const samplePath = join(root, 'public', 'sample', 'sample-chat.txt')
const NAMES = ['지우', '민준']
// 대화 원문에만 있는 단어들. 서버 요청에 하나라도 있으면 원문이 새어 나간 것이다.
const CHAT_WORDS = ['파스타', '마라탕', '클라이밍']

const browser = await chromium.launch({ channel: 'chrome' })
try {
  const page = await browser.newPage({ locale: 'ko-KR' })
  const apiRequests = []
  page.on('request', (request) => {
    if (request.url().includes('/api/')) {
      apiRequests.push({ url: new URL(request.url()).pathname, body: request.postData() ?? '' })
    }
  })

  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await page.locator('input[type="file"]').setInputFiles(samplePath)
  const analyzeButton = page.getByRole('button', { name: '지금 바로 분석하기' })
  if (await analyzeButton.isEnabled().catch(() => false)) await analyzeButton.click().catch(() => {})

  await page.locator('#report-title').waitFor({ timeout: 20000 })
  await page.waitForTimeout(2500)
  const text = await page.locator('main').innerText()

  const checks = {
    '결과 화면 표시': text.includes('종합 애정 지수'),
    '항목별 진단 표시': text.includes('항목별 진단') && text.includes('주고받는 균형'),
    '관계 균형 진단 표시': text.includes('관계 균형 진단'),
    '성향 유형에 이름 표시': NAMES.every((name) => text.includes(name)),
    '이름 자리표시자가 남지 않음': !/\{[AB]\}/.test(text),
    'AI 코멘트 버튼 표시': text.includes('AI 코멘트 받기'),
    '분석 요청은 /api/analyze 한 번뿐': apiRequests.length === 1 && apiRequests[0].url === '/api/analyze',
    '요청에 이름이 없음': apiRequests.every((request) => NAMES.every((name) => !request.body.includes(name))),
    '요청에 대화 원문이 없음': apiRequests.every((request) => CHAT_WORDS.every((word) => !request.body.includes(word))),
  }

  const scoreMatch = text.match(/종합 애정 지수\s*(\d+)/)
  process.stdout.write(`score shown: ${scoreMatch?.[1] ?? '?'} | request bytes: ${apiRequests[0]?.body.length ?? 0}\n`)
  let failed = 0
  for (const [name, ok] of Object.entries(checks)) {
    if (!ok) failed += 1
    process.stdout.write(`${ok ? 'PASS' : 'FAIL'} ${name}\n`)
  }
  await page.screenshot({ path: join(root, '.next', 'analysis-flow.png'), fullPage: true })
  process.exitCode = failed === 0 ? 0 : 1
} finally {
  await browser.close()
}
