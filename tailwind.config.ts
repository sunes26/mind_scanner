import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-jua)', 'sans-serif'],
        sans: ['var(--font-noto-sans-kr)', 'sans-serif'],
      },
      animation: {
        'heart-beat': 'heartBeat 1.5s infinite',
      },
      keyframes: {
        heartBeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
  // 프로덕션 빌드 최적화
  future: {
    hoverOnlyWhenSupported: true,
  },
}
export default config
