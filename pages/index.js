import { useState, useEffect } from 'react';
import Seo from '../components/all/Seo.js';
import MovieCard from '../components/movieBox/MovieCard.js';

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
      <Seo title="Home" />
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
          {result?.map((movie, idx) => (
            <MovieCard key={idx} rank={movie.rank} name={movie.movieNm} pathList={pathList} number={movie.movieCd} poster_path={pathList[0].poster_path} openDt={movie.openDt} overview={pathList[0].overview} />
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

