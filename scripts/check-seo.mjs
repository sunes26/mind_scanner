// 실행 중인 서버의 주요 페이지에서 SEO 필수 요소를 점검한다.
// 실행: node scripts/check-seo.mjs [baseUrl]
const BASE_URL = process.argv[2] ?? 'http://localhost:3000'
const SITE_URL = 'https://www.mindscanner.site'

const PAGES = ['/', '/sample', '/blog', '/about', '/privacy', '/terms']
const TITLE_MAX = 60
const DESCRIPTION_MIN = 50
const DESCRIPTION_MAX = 160

const pick = (html, regex) => html.match(regex)?.[1]
const count = (html, regex) => (html.match(regex) ?? []).length

let failures = 0
const fail = (path, message) => {
  failures += 1
  process.stdout.write(`  FAIL ${path}: ${message}\n`)
}

async function checkPage(path) {
  const response = await fetch(`${BASE_URL}${path}`)
  const html = await response.text()
  if (response.status !== 200) return fail(path, `status ${response.status}`)

  const title = pick(html, /<title>([^<]*)<\/title>/)
  const description = pick(html, /<meta name="description" content="([^"]*)"/)
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/)
  const ogUrl = pick(html, /<meta property="og:url" content="([^"]*)"/)
  const ogImage = pick(html, /<meta property="og:image" content="([^"]*)"/)
  const expected = path === '/' ? SITE_URL : `${SITE_URL}${path}`
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
  const types = jsonLdBlocks.flatMap((block) => {
    try {
      const data = JSON.parse(block)
      return (data['@graph'] ?? [data]).map((node) => node['@type'])
    } catch {
      fail(path, 'JSON-LD parse error')
      return []
    }
  })

  if (!title) fail(path, 'no title')
  else if ([...title].length > TITLE_MAX) fail(path, `title too long (${[...title].length})`)
  if (title && count(title, /속마음 스캐너/g) > 1) fail(path, 'brand duplicated in title')
  if (!description) fail(path, 'no description')
  else if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX)
    fail(path, `description length ${description.length}`)
  if (canonical !== expected && canonical !== `${expected}/`) fail(path, `canonical ${canonical}`)
  if (ogUrl !== expected && ogUrl !== `${expected}/`) fail(path, `og:url ${ogUrl}`)
  if (!ogImage) fail(path, 'no og:image')
  if (count(html, /<h1[\s>]/g) !== 1) fail(path, `h1 count ${count(html, /<h1[\s>]/g)}`)
  if (!html.includes('google-adsense-account')) fail(path, 'no adsense meta')
  if (count(html, /<img /g) > count(html, /<img [^>]*alt="[^"]+"/g)) fail(path, 'img without alt')

  process.stdout.write(
    `${path.padEnd(48)} title=${[...(title ?? '')].length} desc=${description?.length ?? 0} h1=${count(html, /<h1[\s>]/g)} img=${count(html, /<img /g)} ld=[${types.join(',')}]\n`,
  )
}

for (const path of PAGES) await checkPage(path)

const sitemap = await (await fetch(`${BASE_URL}/sitemap.xml`)).text()
const postPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => url.includes('/blog/'))
  .map((url) => url.replace(SITE_URL, ''))
for (const path of postPaths) await checkPage(path)

for (const path of ['/robots.txt', '/sitemap.xml', '/ads.txt', '/llms.txt', '/feed.xml', '/og-default.png']) {
  const response = await fetch(`${BASE_URL}${path}`)
  if (response.status !== 200) fail(path, `status ${response.status}`)
  else process.stdout.write(`${path.padEnd(48)} 200 ${response.headers.get('content-type')}\n`)
}

process.stdout.write(failures === 0 ? '\nALL CHECKS PASSED\n' : `\n${failures} FAILURE(S)\n`)
process.exitCode = failures === 0 ? 0 : 1
