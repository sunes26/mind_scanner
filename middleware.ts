import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting using in-memory store (for development/small scale)
// For production, consider using Redis or Upstash
const rateLimit = new Map<string, { count: number; resetTime: number }>()

// Configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10 // 10 requests per minute

function getRateLimitKey(request: NextRequest): string {
  // Use IP address or fallback to a random identifier
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'anonymous'
  return `rate-limit:${ip}`
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = rateLimit.get(key)

  if (!record || now > record.resetTime) {
    // New window
    const resetTime = now + RATE_LIMIT_WINDOW
    rateLimit.set(key, { count: 1, resetTime })
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetTime }
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetTime: record.resetTime }
  }

  // Increment count
  record.count++
  rateLimit.set(key, record)
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count, resetTime: record.resetTime }
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  rateLimit.forEach((value, key) => {
    if (now > value.resetTime) {
      rateLimit.delete(key)
    }
  })
}, RATE_LIMIT_WINDOW)

export function middleware(request: NextRequest) {
  // Only apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/analyze')) {
    const key = getRateLimitKey(request)
    const { allowed, remaining, resetTime } = checkRateLimit(key)

    if (!allowed) {
      return NextResponse.json(
        {
          error: '요청 한도를 초과했습니다',
          message: '잠시 후 다시 시도해주세요',
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': String(resetTime),
          },
        }
      )
    }

    // Add rate limit headers to successful responses
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS_PER_WINDOW))
    response.headers.set('X-RateLimit-Remaining', String(remaining))
    response.headers.set('X-RateLimit-Reset', String(resetTime))
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
