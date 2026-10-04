// app/blog/blogData.ts 의 slug 목록으로 app/blog/posts/registry.ts 를 만든다.
// 글을 추가한 뒤 실행: node scripts/generate-post-registry.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const blogData = readFileSync(join(root, 'app', 'blog', 'blogData.ts'), 'utf8')
const slugs = [...blogData.matchAll(/slug: '([^']+)'/g)].map((match) => match[1])

const identifier = (slug) => `post_${slug.replace(/[^a-zA-Z0-9]/g, '_')}`

const lines = [
  '// scripts/generate-post-registry.mjs 가 만든 파일. slug → 본문 컴포넌트·FAQ 연결.',
  "import type { ComponentType } from 'react'",
  "import type { PostFaqItem } from '@/components/blog/PostKit'",
  ...slugs.map((slug) => `import * as ${identifier(slug)} from './${slug}'`),
  '',
  'interface PostModule {',
  '  default: ComponentType',
  '  faq: PostFaqItem[]',
  '}',
  '',
  'const registry: Record<string, PostModule> = {',
  ...slugs.map((slug) => `  '${slug}': ${identifier(slug)},`),
  '}',
  '',
  'export function getPostModule(slug: string): PostModule | undefined {',
  '  return registry[slug]',
  '}',
  '',
]

writeFileSync(join(root, 'app', 'blog', 'posts', 'registry.ts'), lines.join('\n'), 'utf8')
process.stdout.write(`registry generated: ${slugs.length} posts\n`)
