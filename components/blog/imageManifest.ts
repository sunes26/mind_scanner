// 블로그 이미지의 실제 픽셀 크기. scripts/capture-screenshots.mjs 가 스크린샷 항목을 갱신한다.
// 여기에 없는 이미지는 도식 기본 크기(1200x675)로 취급한다.

export interface ImageSize {
  width: number
  height: number
}

export const DEFAULT_IMAGE_SIZE: ImageSize = { width: 1200, height: 675 }

// <screenshot-sizes>
export const BLOG_IMAGE_SIZES: Record<string, ImageSize> = {
  'shot-home-upload.png': { width: 1920, height: 1140 },
  'shot-home-export-guide.png': { width: 1764, height: 996 },
  'shot-sample-chat-file.png': { width: 1716, height: 825 },
  'shot-sample-overview.png': { width: 1716, height: 513 },
  'shot-sample-ratio-time.png': { width: 1716, height: 573 },
  'shot-sample-reply-patterns.png': { width: 1716, height: 417 },
  'shot-sample-secret-report.png': { width: 1716, height: 1682 },
}
// </screenshot-sizes>

export function getImageSize(name: string): ImageSize {
  return BLOG_IMAGE_SIZES[name] ?? DEFAULT_IMAGE_SIZE
}
