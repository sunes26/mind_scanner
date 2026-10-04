import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getImageSize } from './imageManifest'

// 블로그 본문에서 공통으로 쓰는 블록들.
// 본문 파일(app/blog/posts/<slug>.tsx)은 이 컴포넌트들과 기본 HTML 태그만 사용한다.

export interface PostFaqItem {
  q: string
  a: string
}

interface PostImageProps {
  /** public/images/blog 안의 파일명 (확장자 포함) */
  name: string
  alt: string
  caption?: string
}

export function PostImage({ name, alt, caption }: PostImageProps) {
  const { width, height } = getImageSize(name)
  return (
    <figure className="my-8">
      <Image
        src={`/images/blog/${name}`}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 896px) 100vw, 832px"
        className="w-full h-auto rounded-xl border-2 border-black"
      />
      {caption && <figcaption className="text-sm text-gray-500 text-center mt-2">{caption}</figcaption>}
    </figure>
  )
}

/** 글 맨 위 요약 박스 — 질문에 대한 답을 2~4문장으로 먼저 준다 */
export function Summary({ children }: { children: ReactNode }) {
  return (
    <div className="bg-yellow-50 border-2 border-black rounded-xl p-5">
      <p className="font-bold text-black mb-2">한눈에 보기</p>
      <div className="text-gray-800 leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-2xl md:text-3xl font-bold text-black border-b-4 border-black pb-3 mt-12 scroll-mt-24">
      {children}
    </h2>
  )
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-xl font-bold text-black mt-8">{children}</h3>
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-gray-800 leading-relaxed">{children}</p>
}

type CalloutTone = 'info' | 'tip' | 'warn'

const CALLOUT_STYLE: Record<CalloutTone, string> = {
  info: 'bg-blue-50 border-blue-400',
  tip: 'bg-green-50 border-green-500',
  warn: 'bg-orange-50 border-orange-400',
}

export function Callout({ tone = 'info', title, children }: { tone?: CalloutTone; title?: string; children: ReactNode }) {
  return (
    <div className={`border-2 rounded-xl p-5 ${CALLOUT_STYLE[tone]}`}>
      {title && <p className="font-bold text-black mb-2">{title}</p>}
      <div className="text-gray-800 leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

export function List({ ordered = false, children }: { ordered?: boolean; children: ReactNode }) {
  const className = `${ordered ? 'list-decimal' : 'list-disc'} pl-6 space-y-2 text-gray-800 leading-relaxed`
  return ordered ? <ol className={className}>{children}</ol> : <ul className={className}>{children}</ul>
}

type ChatSide = 'me' | 'them'

/** 카톡 말풍선 예시. 실제 대화가 아닌 설명용 예시임을 caption으로 밝힌다 */
export function ChatExample({ lines, caption }: { lines: { side: ChatSide; text: string }[]; caption?: string }) {
  return (
    <figure className="my-6">
      <div className="bg-[#B2C7D9] border-2 border-black rounded-xl p-4 space-y-2">
        {lines.map((line, index) => (
          <div key={index} className={`flex ${line.side === 'me' ? 'justify-end' : 'justify-start'}`}>
            <span
              className={`max-w-[80%] px-3 py-2 rounded-xl text-sm text-black ${
                line.side === 'me' ? 'bg-[#FEE500]' : 'bg-white'
              }`}
            >
              {line.text}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="text-sm text-gray-500 text-center mt-2">{caption ?? '설명을 위해 만든 예시 대화입니다.'}</figcaption>
    </figure>
  )
}

export function CompareTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-2 border-black text-sm md:text-base">
        <thead className="bg-yellow-300">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="border-2 border-black p-3 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={`border-2 border-black p-3 ${cellIndex === 0 ? 'font-bold' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** 참고한 개념·문헌. 확인 가능한 것만 적는다 */
export function Sources({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <section className="mt-12 border-t-2 border-gray-200 pt-6">
      <h2 className="text-lg font-bold text-black mb-3">참고</h2>
      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="underline hover:text-black">
                {item.label}
              </a>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function PostLink({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <Link href={`/blog/${slug}`} className="text-blue-700 underline hover:text-blue-900">
      {children}
    </Link>
  )
}

export function SampleLink({ children }: { children: ReactNode }) {
  return (
    <Link href="/sample" className="text-blue-700 underline hover:text-blue-900">
      {children}
    </Link>
  )
}

/** 본문 하단 FAQ. 같은 데이터가 FAQPage JSON-LD로도 출력된다 */
export function PostFaq({ items }: { items: PostFaqItem[] }) {
  if (items.length === 0) return null
  return (
    <section className="mt-12" aria-labelledby="post-faq-heading">
      <h2 id="post-faq-heading" className="text-2xl md:text-3xl font-bold text-black border-b-4 border-black pb-3">
        자주 묻는 질문
      </h2>
      <dl className="mt-6 space-y-5">
        {items.map((item) => (
          <div key={item.q} className="bg-gray-50 border-2 border-gray-300 rounded-xl p-5">
            <dt className="font-bold text-black">{item.q}</dt>
            <dd className="text-gray-800 leading-relaxed mt-2">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
