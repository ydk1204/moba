import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

export default function Home({ result }) {
  const [posterPath, setPostersPath] = useState([]);

  // 포스터 이미지 가져오기 & 박스오피스 순위는 10위까지 고정
  const getPoster = (name) => {
  posterPath.length !== 10 && fetch("http://localhost:3000/data/search_movie.json")
  // fetch(`https://api.themoviedb.org/3/search/movie?API_KEY&language=ko&query=${name}&include_adult=true&page=1`)
    .then((result) => result.json())
    .then((res) => setPostersPath((prev) => [...prev, res.results[0].poster_path]))
    .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    // movie 이름만 추출
    const arr = [];
    result?.map((movie) => {
      arr.push(movie.movieNm);
    })

    // 이름을 기반으로 thmb api 사용해 포스터 이미지 가져오기
    arr?.map((name) => {
      getPoster(name);
    })

    return;
  }, []);

  return (
    <div className='h-[150vh]'>
      {/* 메인 화면 주요 영화 포스터 */}
      <div className='h-2/5 -z-50'>
        <img src="/posterimage2.jpg" alt="main movie poster" className='h-full w-full object-cover' />
      </div>
      <section className='relative inset-x-0 -top-20 w-full h-20 z-40 flex justify-center bg-rose-700/80'>
        <div className='bg-white w-1/2 h-full rounded-t-md flex justify-center'>
          <p className='mt-8 font-bold text-4xl'>국내 박스오피스 순위</p>
        </div>
      </section>
      <div>
        {result?.map((movie) => (
          <div key={movie.rank}>
            <p>{movie.movieNm}</p>
            <img src={`https://image.tmdb.org/t/p/w${400}${posterPath[movie.rank - 1]}`} alt="poster" />
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const { boxOfficeResult } = await (await fetch("http://localhost:3000/data/daily_boxoffice.json")).json();
  return {
    props: {
      result: boxOfficeResult.dailyBoxOfficeList
    }
  }
}
