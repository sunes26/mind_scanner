import { useEffect, useState } from 'react'

interface UseCountUpOptions {
  duration?: number
  delay?: number
  onComplete?: () => void
}

export function useCountUp(
  targetValue: number,
  options: UseCountUpOptions = {}
) {
  const { duration = 1500, delay = 0, onComplete } = options
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // easeOutCubic for smooth deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.floor(easeProgress * targetValue)

        setCount(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(targetValue) // Ensure exact final value
          if (onComplete) onComplete()
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timeout)
  }, [targetValue, duration, delay, onComplete])

  return count
}
