import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect, useCallback, useState } from 'react';

// 과부하 방지를 위한 쓰로틀 함수
const throttle = (callback, waitTime) => {
  let timerId = null;
  return (e) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, e);
      timerId = null;
    }, waitTime);
  };
};

export default function NavBar() {
  // navbar의 높이를 확인
  const navRef = useRef();
  // 색 변경을 위한 트리거
  const [changeColor, setChhangeColor] = useState(false);

  // 스크롤 함수 => 스크롤 위치를 확인해서 navbar와 비교
  const onScroll = useCallback(e => {
    const { pageYOffset, scrollY } = window;
    if (scrollY > navRef.current?.clientHeight) setChhangeColor(prev => true)
    else setChhangeColor(prev => false)
  }, []);

  // 쓰로틀 함수에 스크롤 함수 할당, 지연 시간은 100ms
  const throttleScroll = throttle(onScroll, 100);

  useEffect(() => {
    //window scroll시 스크롤 함수(쓰로틀이 첨가된) 이벤트 추가
    window.addEventListener("scroll", throttleScroll, { passive: true });
    // 마운트가 끝났을 때 불필요한 메모리 사용을 방지하기 위해 이벤트 제거
    return () => {
       window.removeEventListener("scroll", throttleScroll, { passive: true });
    }
  }, []);

  return (
    <nav ref={navRef} className={`fixed w-full h-14 inset-x-0 top-0 z-[1000] transition duration-150 ease-in ${changeColor ? 'bg-rose-700/90 text-white' : 'bg-rose-400/90'}`}>
      <div className='flex justify-center items-center h-full'>
        <Link href="/" legacyBehavior>
          <a className='flex justify-center items-center h-full'>
            <div className={`mr-2`}>
              <Image src="/logo.png" alt='logo image' width={48} height={48} />
            </div> 
            <div className='ml-2'>
              <p className='font-bold text-4xl \'>MoBa</p>
            </div>
          </a>
        </Link>
      </div>
    </nav>
  )
}