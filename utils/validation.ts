/**
 * 파일 검증 규칙
 */
export const FILE_VALIDATION = {
  MIN_SIZE: 50, // 50 bytes
  MAX_SIZE: 50 * 1024 * 1024, // 50 MB
  MIN_CONTENT_LENGTH: 50,
  MAX_CONTENT_LENGTH: 300000,
  ALLOWED_EXTENSIONS: ['.txt'],
  ALLOWED_MIME_TYPES: ['text/plain', ''],
} as const

/**
 * 메시지 검증 규칙
 */
export const MESSAGE_VALIDATION = {
  MIN_COUNT: 20,
  MIN_PARTICIPANTS: 2,
  MAX_NAME_LENGTH: 20,
} as const

/**
 * 활동 레벨 임계값
 */
export const ACTIVITY_THRESHOLDS = {
  VERY_ACTIVE: 100,
  ACTIVE: 50,
  MODERATE: 20,
  LIGHT: 10,
  RARE: 5,
} as const

/**
 * 파일 크기가 유효한지 검증
 */
export function isValidFileSize(size: number): boolean {
  return size >= FILE_VALIDATION.MIN_SIZE && size <= FILE_VALIDATION.MAX_SIZE
}

/**
 * 파일 확장자가 유효한지 검증
 */
export function isValidFileExtension(filename: string): boolean {
  const lowerName = filename.toLowerCase()
  return FILE_VALIDATION.ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext))
}

/**
 * MIME 타입이 유효한지 검증
 */
export function isValidMimeType(mimeType: string): boolean {
  return (FILE_VALIDATION.ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)
}
