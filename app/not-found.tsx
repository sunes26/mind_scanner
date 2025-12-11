import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="w-full max-w-md bg-white h-[90vh] max-h-[850px] border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[2rem] overflow-hidden relative flex flex-col z-10">
      {/* Header */}
      <header className="p-4 flex justify-center items-center border-b-2 border-black bg-yellow-300 shrink-0">
        <h1 className="font-display font-bold text-black text-xl">속마음 스캐너</h1>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-8xl mb-4">💔</div>
        <h2 className="font-display text-3xl text-black mb-2">페이지를 찾을 수 없어요</h2>
        <p className="text-gray-600 mb-8">
          찾으시는 페이지가 존재하지 않거나<br />
          이동되었을 수 있어요.
        </p>
        
        <Link 
          href="/"
          className="neo-button bg-pink-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-pink-600"
        >
          <Home className="w-5 h-5" />
          홈으로 돌아가기
        </Link>

        <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 max-w-xs">
          <p className="text-sm text-gray-600 flex items-start gap-2">
            <Search className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              카톡 대화를 분석하고 싶다면<br />
              홈에서 .txt 파일을 업로드해주세요!
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}