'use client'

import { HeartCrack, Gift } from 'lucide-react'

interface AdBannerProps {
  side: 'left' | 'right'
}

export default function AdBanner({ side }: AdBannerProps) {
  if (side === 'left') {
    return (
      <aside className="hidden xl:flex flex-col gap-4 w-[160px] h-[600px] sticky top-10">
        <div className="neo-box w-full h-full bg-pink-100 flex flex-col items-center justify-between p-4 overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-black text-white text-[10px] px-2 py-0.5 font-bold">AD</div>
          <div className="text-center mt-4">
            <HeartCrack className="w-10 h-10 text-pink-500 mx-auto mb-2" />
            <p className="font-display text-xl text-black leading-tight">헤어진 연인<br />재회 비법</p>
          </div>
          <div className="w-full h-px bg-black/10"></div>
          <div className="text-center">
            <p className="text-xs text-gray-500 font-bold mb-1">성공률 99%</p>
            <button className="neo-button w-full bg-white text-xs py-2 px-1 font-bold">상담하기</button>
          </div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-300 rounded-full border-2 border-black z-0"></div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="hidden xl:flex flex-col gap-4 w-[160px] h-[600px] sticky top-10">
      <div className="neo-box w-full h-full bg-blue-100 flex flex-col items-center justify-between p-4 overflow-hidden relative">
        <div className="absolute top-0 left-0 bg-black text-white text-[10px] px-2 py-0.5 font-bold">AD</div>
        <div className="text-center mt-4">
          <Gift className="w-10 h-10 text-blue-500 mx-auto mb-2" />
          <p className="font-display text-xl text-black leading-tight">센스있는<br />선물 추천</p>
        </div>
        <div className="w-full h-px bg-black/10"></div>
        <div className="flex-1 flex flex-col justify-center items-center gap-2 w-full">
          <div className="w-full aspect-square bg-white border-2 border-black rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-2xl">🎁</span>
          </div>
          <div className="w-full aspect-square bg-white border-2 border-black rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-2xl">💐</span>
          </div>
        </div>
        <button className="neo-button w-full bg-yellow-400 text-xs py-2 px-1 font-bold mt-2">구경가기</button>
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-300 rounded-full border-2 border-black z-0"></div>
      </div>
    </aside>
  )
}
