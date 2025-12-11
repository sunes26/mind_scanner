import { Variants } from 'framer-motion'

// 페이드인 애니메이션
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// 위에서 아래로 슬라이드
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// 아래에서 위로 슬라이드
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// 스케일 애니메이션 (작아지다가 커짐)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1], // 바운스 효과
    },
  },
}

// 스태거 컨테이너 (자식 요소들 순차 애니메이션)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// 스태거 아이템
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// 차트 애니메이션 (스케일 + 페이드)
export const chartAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.3,
    },
  },
}

// 카드 애니메이션 (좌에서 우로)
export const cardSlideIn: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// 숫자 카운팅 애니메이션 헬퍼 함수
export function useCountAnimation(
  targetValue: number,
  duration: number = 1500,
  onUpdate: (value: number) => void
) {
  const startTime = Date.now()

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // easeOutCubic
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    const currentValue = Math.floor(easeProgress * targetValue)

    onUpdate(currentValue)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      onUpdate(targetValue) // 정확한 최종값
    }
  }

  requestAnimationFrame(animate)
}

// 스크롤 시 나타나는 애니메이션 (Intersection Observer용)
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.5,
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}

// 프로그레스 바 애니메이션
export const progressBar: Variants = {
  hidden: { width: 0 },
  visible: (custom: number) => ({
    width: `${custom}%`,
    transition: {
      duration: 1.5,
      ease: 'easeOut',
      delay: 0.3,
    },
  }),
}
