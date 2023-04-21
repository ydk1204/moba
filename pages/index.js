import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className='h-[150vh]'>
      <div className='h-2/5'>
        <img src="/posterimage2.jpg" alt="main movie poster" className='h-full w-full object-cover' />
      </div>
    </div>
  )
}
