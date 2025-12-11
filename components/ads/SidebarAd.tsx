'use client'

import { useEffect, useState } from 'react'
import AdUnit from './AdUnit'

interface SidebarAdProps {
  side: 'left' | 'right'
}

export default function SidebarAd({ side }: SidebarAdProps) {
  const [isVisible, setIsVisible] = useState(false)
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR

  // 화면 크기 체크 (xl 이상에서만 표시)
  useEffect(() => {
    const checkWidth = () => {
      setIsVisible(window.innerWidth >= 1280)
    }
    
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  if (!isVisible) return null

  return (
    <aside 
      className={`hidden xl:flex flex-col items-center gap-4 ${
        side === 'left' ? 'order-first' : 'order-last'
      }`}
      style={{ width: '160px' }}
    >
      {/* 광고 레이블 */}
      <div className="w-full">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">
          Advertisement
        </span>
      </div>

      {/* 광고 유닛 */}
      {slot ? (
        <AdUnit
          slot={slot}
          format="vertical"
          responsive={false}
          style={{ width: '160px', height: '600px' }}
        />
      ) : (
        // 광고 ID 없을 때 더미 UI
        <div className="w-[160px] h-[600px] bg-gradient-to-b from-gray-100 to-gray-200 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-4">
          <div className="w-12 h-12 bg-gray-300 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-gray-500 text-xl">📢</span>
          </div>
          <p className="text-xs text-gray-500 text-center font-bold mb-2">
            광고 영역
          </p>
          <p className="text-[10px] text-gray-400 text-center">
            이 공간에<br />광고가 표시됩니다
          </p>
        </div>
      )}

      {/* 추가 광고 슬롯 */}
      <div className="mt-4">
        {slot ? (
          <AdUnit
            slot={slot}
            format="rectangle"
            responsive={false}
            style={{ width: '160px', height: '250px' }}
          />
        ) : (
          <div className="w-[160px] h-[250px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-xs">AD</span>
          </div>
        )}
      </div>
    </aside>
  )
}