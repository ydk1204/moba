import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='mt-20'>
      <nav className='flex justify-center bg-rose-700/90'>
        <div>
          <Image src="/logo.png" alt='logo image' width={70} height={70} />
        </div>
        <div>
          <h3>사이트 제작자</h3>
          <ul>YDK</ul>
          <ul>Git hub</ul>
        </div>
        <div>
          <h3>사용 API</h3>
          <ul>THE MOVIE DB API</ul>
          <ul>Kofic(영화진흥위원회) API</ul>
        </div>
        <div>
          <h3>문의</h3>
          <ul>ejrbdi@gmail.com</ul>
        </div>
      </nav>

    </footer>
  )
}