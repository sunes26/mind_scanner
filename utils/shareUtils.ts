export interface ShareData {
  score: number
  relation: string
  p1: string
  p2: string
}

// 공유 URL 생성. 결과 전용 페이지는 없으므로 홈 주소를 공유한다.
// (참여자 이름을 URL에 싣지 않는다)
export function generateShareUrl(_data: ShareData): string {
  return typeof window !== 'undefined' ? window.location.origin : 'https://www.mindscanner.site'
}

// OG 이미지 URL 생성. 참여자 이름은 넣지 않는다(이름이 서버·외부 서비스로 나가지 않게).
export function generateOgImageUrl(data: ShareData): string {
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://www.mindscanner.site'

  const params = new URLSearchParams({
    score: data.score.toString(),
    relation: data.relation,
  })

  return `${baseUrl}/api/og?${params.toString()}`
}

// 공유 텍스트 생성 (이름 없이)
export function generateShareText(data: ShareData): string {
  return `💘 [속마음 스캐너] 결과 공개!

우리의 애정 지수: ${data.score}%
${data.relation}

나도 분석하러 가기 👉`
}

const KAKAO_SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js'

interface KakaoSdk {
  isInitialized: () => boolean
  init: (appKey: string) => void
  Share: { sendDefault: (options: Record<string, unknown>) => void }
}

let kakaoSdkPromise: Promise<KakaoSdk> | null = null

/** 카카오 SDK를 처음 공유할 때 한 번만 불러온다 (모든 페이지에서 미리 받지 않는다) */
function loadKakaoSdk(): Promise<KakaoSdk> {
  const existing = (window as unknown as { Kakao?: KakaoSdk }).Kakao
  if (existing) return Promise.resolve(existing)

  if (!kakaoSdkPromise) {
    kakaoSdkPromise = new Promise<KakaoSdk>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = KAKAO_SDK_URL
      script.async = true
      script.onload = () => {
        const loaded = (window as unknown as { Kakao?: KakaoSdk }).Kakao
        if (loaded) resolve(loaded)
        else reject(new Error('Kakao SDK did not initialise'))
      }
      script.onerror = () => {
        // 다음 시도에서 다시 불러올 수 있게 비워 둔다
        kakaoSdkPromise = null
        script.remove()
        reject(new Error('Kakao SDK failed to load'))
      }
      document.head.appendChild(script)
    })
  }
  return kakaoSdkPromise
}

// 카카오톡 공유
export async function shareToKakao(data: ShareData): Promise<void> {
  if (typeof window === 'undefined') return

  const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY
  if (!appKey) {
    alert('카카오톡 공유가 설정되지 않았습니다. 링크 복사를 이용해 주세요.')
    return
  }

  let Kakao: KakaoSdk
  try {
    Kakao = await loadKakaoSdk()
  } catch {
    alert('카카오톡 공유를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')
    return
  }

  if (!Kakao.isInitialized()) {
    Kakao.init(appKey)
  }

  const shareUrl = generateShareUrl(data)
  const imageUrl = generateOgImageUrl(data)

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `우리의 애정 지수: ${data.score}%`,
      description: `${data.relation} - 속마음 스캐너로 분석한 결과에요!`,
      imageUrl: imageUrl,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: '나도 분석하기',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  })
}

// 트위터 공유
export function shareToTwitter(data: ShareData): void {
  if (typeof window === 'undefined') return
  
  const shareUrl = generateShareUrl(data)
  const text = generateShareText(data)
  
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
  
  window.open(twitterUrl, '_blank', 'width=600,height=400')
}

// 페이스북 공유
export function shareToFacebook(data: ShareData): void {
  if (typeof window === 'undefined') return
  
  const shareUrl = generateShareUrl(data)
  
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  
  window.open(facebookUrl, '_blank', 'width=600,height=400')
}

// 클립보드 복사
export async function copyToClipboard(data: ShareData): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  const shareUrl = generateShareUrl(data)
  const text = `${generateShareText(data)} ${shareUrl}`
  
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('클립보드 복사 실패:', err)
    return false
  }
}

// 네이티브 공유 (모바일)
export async function nativeShare(data: ShareData): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  const shareUrl = generateShareUrl(data)
  const text = generateShareText(data)
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${data.p1}님과 ${data.p2}님의 애정 지수`,
        text: text,
        url: shareUrl,
      })
      return true
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('공유 실패:', err)
      }
      return false
    }
  }
  
  return false
}

// 이미지 다운로드 (인스타그램 스토리용)
export async function downloadShareImage(
  data: ShareData,
  elementRef?: HTMLElement | null
): Promise<void> {
  if (typeof window === 'undefined') return

  try {
    // html-to-image를 사용하여 element를 이미지로 변환
    if (elementRef) {
      const { toPng } = await import('html-to-image')

      const dataUrl = await toPng(elementRef, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#FDF6E3',
      })

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `mind-scanner-${data.p1}-${data.p2}-${data.score}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // Fallback: OG 이미지 다운로드
      const imageUrl = generateOgImageUrl(data)
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `mind-scanner-${data.score}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  } catch (err) {
    console.error('이미지 다운로드 실패:', err)
    alert('이미지 다운로드에 실패했습니다.')
  }
}