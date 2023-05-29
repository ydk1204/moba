import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='flex justify-center mt-20 w-full h-fit bg-rose-700/90 relative inset-x-0 bottom-0'>
      <nav className='flex py-2 text-white flex-col items-center md:flex-row md:items-start'>
        <div className='md:mr-16 md:w-fit m-0 w-full'>
          <img src="/logo.png" alt="logo Image" className={`w-28`} />
        </div>
        <div className='md:mr-16 md:w-fit m-0 w-full'>
          <h3 className='font-bold text-lg pb-2'>사이트 제작자</h3>
          <ul>YDK</ul>
          <ul><a className='text-rose-200 after:content-["_↗"] ...' href="https://github.com/ydk1204"
                target='_blank'>Git hub</a></ul>
        </div>
        <div className='md:mr-16 md:w-fit m-0 w-full'>
          <h3 className='font-bold text-lg pb-2'>사용 API</h3>
          <ul><a className='text-rose-200 after:content-["_↗"] ...' href="https://kobis.or.kr/kobisopenapi/homepg/main/main.do"
                target='_blank'>THE MOVIE DB API</a></ul>
          <ul><a className='text-rose-200 after:content-["_↗"] ...' href="https://www.themoviedb.org/"
                target='_blank'>Kofic(영화진흥위원회) API</a></ul>
        </div>
        <div className='md:w-fit w-full'>
          <h3 className='font-bold text-lg pb-2'>문의</h3>
          <ul>ejrbdi@gmail.com</ul>
        </div>
      </nav>

    </footer>
  )
}