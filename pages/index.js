import Image from 'next/image';
// import styles from '../styles/globals.css';
import { useState, useEffect } from 'react';

export default function Home({ result, pathList }) {
  const [posterPath, setPostersPath] = useState([]);
  const [overView, setOverView] = useState([]);

  // 포스터 이미지 가져오기 & 박스오피스 순위는 10위까지 고정
  const getPoster = (name) => {
  posterPath.length !== 10 && fetch("http://localhost:3000/data/search_movie.json")
  // fetch(`https://api.themoviedb.org/3/search/movie?API_KEY&language=ko&query=${name}&include_adult=true&page=1`)
    .then((result) => result.json())
    .then((res) => {
      setPostersPath((prev) => [...prev, res.results[0].poster_path])
      setOverView((prev) => [...prev, res.results[0].overview])
    })
    .catch((error) => console.log("error", error));
  }

  console.log(pathList)

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
    <div className='h-full'>
      {/* 메인 화면 주요 영화 포스터 */}
      <section className='w-full'>
        
        {/* <div className='w-full h-32rem overflow-hidden'>
          <img src="/posterimage2.jpg" alt="main movie poster" className='w-full 2xl:h-[65rem] sm:h-[50rem] h-full md:object-cover object-fill' />
        </div> */}
        <div className={`w-full h-[45rem] overflow-hidden
        before:content-[""] before:w-full before:h-[45rem] 
        before:bg-gradient-to-r before:from-[#0A1B2A] before:via-black/5 before:to-[#0A1B2A]
        before:top-0 before:left-0
        before:absolute`}>
          <img src="/posterimage2.jpg" alt="main movie poster" className='w-full h-full object-cover' />
        </div>
      </section>
      <section>
        {/* 박스오피스 제목 */}
        <div className='relative inset-x-0 -top-20 w-full h-20 z-40 flex justify-center'>
          <div className='bg-[#0A1B2A] w-1/2 h-full rounded-t-md flex justify-center'>
            <h1 className='mt-8 text-white font-bold md:text-4xl sm:text-2xl'>국내 박스오피스 순위</h1>
          </div>
        </div>
        
        {/* 박스 오피스 순위 목록 boxOffice list */}
        <div className='grid gap-4 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-2 place-items-center'>
          {result?.map((movie) => (
            <div key={movie.rank}
              before={`${movie.rank}`}
              className='
              relative flex flex-col w-fit overflow-hidden bg-rose-600/80 text-white
              rounded-lg items-center justify-center group 
              hover:bg-[#0A1B2A] hover:text-white transition-all duration-300
              before:content-[attr(before)] before:w-full before:h-full 
              before:bg-gradient-to-b before:from-black/30
              before:top-0 before:left-0 before:text-3xl before:pl-3 before:pt-3
              before:absolute before:text-white
              '>
              <img src={`https://image.tmdb.org/t/p/w${300}${pathList[0].poster_path}`} alt="poster" />
              <p className='text-center'>{movie.movieNm}</p>
              <div className='
                  absolute top-[95%] left-0 w-full h-0 opacity-0 bg-rose-600/90
                  group-hover:opacity-100 group-hover:top-0 group-hover:left-0
                  group-hover:h-[95%] transition-all duration-300 text-white
                  flex flex-col items-center text-center py-2
                  '>
                <h3 className='w-full text-2xl font-bold'>개봉일</h3>
                <p className='w-full text-lg'>{movie.openDt}</p>
                <div className='border border-white w-full my-2'></div>
                <h3 className='w-full text-2xl '>개요</h3>
                <p className='w-full text-start px-4'>{pathList[0].overview}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  )
}

export async function getPosterPath() {
  const { results } = await (await fetch("http://localhost:3000/data/search_movie.json")).json();
  return results;
}

export async function getStaticProps() {
  const list = [];
  const path = [];
  const { boxOfficeResult } = await (await fetch("http://localhost:3000/data/daily_boxoffice.json")).json();
  const data = await boxOfficeResult.dailyBoxOfficeList;
  // data?.map((movie) => {
  //   path.push(getPosterPath(movie.movieNm));
  // });
  const { results } = await (await fetch("http://localhost:3000/data/search_movie.json")).json();

  return {
    props: {
      result: boxOfficeResult.dailyBoxOfficeList,
      pathList : results
    }
  }
}

