import Link from 'next/link'
import {useRouter} from 'next/router';
import { useState } from 'react';

export default function Card({ rank = undefined, name, pathList, number = undefined, poster_path, openDt, overview, originalName = undefined }) {
  const [movieNm, setMovieNm] = useState(0)
  const router = useRouter();
  // const onPosterClick = (title) => { router.push(`/movies/movieDetail/${title}`) };

  const checkMovieNumber = async () => {
    // fetch(`http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=f5eef3421c602c6cb7ea224104795888&movieNm=${originalName}`)
    fetch(`http://localhost:3000/data/kobic_search_movie.json`)
      .then((result) => result.json())
      .then((res) => {
        const { movieListResult } = res;
        const movieNumber = movieListResult.movieList[0];
        setMovieNm(movieNumber.movieCd);
      })
  }
  number === undefined && checkMovieNumber();

  return (
    <Link key={rank === undefined ? movieNm : rank} href={{
    pathname: `/movies/movieDetail/${name}`,
    query:
    {
      data: JSON.stringify(pathList),
      movieNumber: movieNm
    },
    }}
    as={`/movies/movieDetail/${name}`}
    // onClick={() => onPosterClick(name)}
    legacyBehavior>
      <div before={`${rank === undefined ? "" : rank}`}
      className='
      relative flex flex-col w-[18rem] h-[28.3rem] overflow-hidden bg-rose-600/80 text-white
      rounded-lg items-center justify-center group mx-2
      hover:bg-[#0A1B2A] hover:text-white transition-all duration-300
      before:content-[attr(before)] before:w-full before:h-full 
      before:bg-gradient-to-b before:from-black/30
      before:top-0 before:left-0 before:text-3xl before:pl-3 before:pt-3
      before:absolute before:text-white ellipsis
      '>
        <div className='flex flex-col items-center justify-start h-full'>
          <img src={`https://image.tmdb.org/t/p/w${342}${poster_path}`} className='w-full h-[26.8rem]' alt="poster" />
          <p className='text-center pt-[0.1em] h-[25px]'>{name}</p>
        </div>
        <div className='
            absolute top-[95%] left-0 w-[18rem] h-0 opacity-0 bg-rose-600/90
            group-hover:opacity-100 group-hover:top-0 group-hover:left-0
            group-hover:w-[18rem] group-hover:h-[95%] transition-all duration-300 text-white
            flex flex-col items-center text-center py-2
            '>
          <h3 className='w-full text-2xl font-bold'>개봉일</h3>
          <p className='w-full text-lg'>{openDt}</p>
          <div className='border border-white w-full my-2'></div>
          <h3 className='w-full text-2xl'>개요</h3>
          <p className='w-full text-start px-4 ellipsis h-[6em]'>{overview}</p>
        </div>
      </div>
    </Link>
  )
}