interface JsonLdProps {
  data: Record<string, unknown>
}

/** 구조화 데이터(JSON-LD) 출력. `<` 와 줄 구분 문자를 이스케이프해 script 태그가 조기 종료되지 않게 한다 */
export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
