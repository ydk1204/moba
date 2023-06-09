import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex items-center justify-center text-white'>
      <p>요청하신 페이지를 불러올 수 없습니다.</p>
      <button>
        <Link href="/" legacyBehavior>
          메인 페이지로 이동
        </Link>
      </button>
    </div>
  )
}