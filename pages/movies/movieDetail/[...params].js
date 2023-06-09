import { useRouter } from 'next/router';
import Seo from '../../../components/all/Seo.js';
import { useEffect, useState } from 'react';
import { genres } from '../../../public/data/tmdb_movie_gerne.json';
import MovieCard from '../../../components/movieBox/MovieCard.js';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from '../../../components/scrollBox/Arrow.js';
import "react-horizontal-scrolling-menu/dist/styles.css";
import styled from 'styled-components';

export default function Detail({params}) {
  const router = useRouter();
  const [title] = params || [];
  const { data, movieNumber, name } = router.query;
  const objDatas = data && JSON.parse(data)
  const objData = Array.isArray(objDatas) === true ? objDatas[0] : objDatas;
  const movieGerne = objData && Object.keys(objData).length > 0 ? objData.genre_ids : [];

  const [detailData, setDetailData] = useState([])
  const [videoKey, setVideoKey] = useState("")
  const [movieGenreList, setMovieGenreList] = useState([]);
  const [similar, setSimilar] = useState([])

  const genreCheck = () => {
    movieGerne.map((gen) => {
      for (let i of genres) {
        if (i.id === gen) setMovieGenreList((prev) => [...prev, i.name])
      }
    })
  }

  // 비슷한 영화 찾기 => 여기서 쓰는 movieNumber는 tmdb에서 사용되는 api를 쓰기 위해서 tmdb의 영화 넘버를 따로 찾아서 써야댐
  // 위의 movieNumber는 kobic에서 쓰이는 넘버임
  const similarMovie = (movieNumber) => {
    fetch("http://localhost:3000/data/tmdb_movie_similar.json")
      .then((result) => result.json())
      .then((res) => {
        const { results } = res;
        setSimilar((prev) => [...prev, results]);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    movieNumber && fetch("http://localhost:3000/data/kobic_detailMovie.json")
    .then((result) => result.json())
      .then((res) => {
        const { movieInfoResult } = res; 
        setDetailData((prev) => [...prev, movieInfoResult.movieInfo])
    })
      .catch((error) => console.log("error", error));
    movieGenreList.length == 0 && genreCheck();
  }, [movieNumber])

  useEffect(() => {
    similarMovie(objData?.id);
  }, [data])

  // 영화 예고편
  useEffect(() => {
    // 예고편이 없는 경우 대비해야 댐
    objData.id && fetch("http://localhost:3000/data/movie_video.json")
      .then((result) => result.json())
      .then((res) => {
        const { results } = res;
        setVideoKey((prev) => results[0].key);
      })
      .catch((error) => console.log("error", error));
  }, [objData]);

  
  return (
    <div>
      <Seo title={title} />
      {objData ? 
        <div className={`
          w-full h-[150rem] pt-64 text-white
          before:content-[""] before:w-full before:h-[150rem]
          before:bg-gradient-to-t before:from-[#0A1B2A] before:via-black/70  before:to-[#0A1B2A]
          before:top-0 before:left-0
          before:absolute
          `}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${objData.backdrop_path})`,
            backgroundSize: `cover`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
        <div className='relative h-full flex flex-col items-center'>
          <div className='w-[70rem] flex justify-center'>
              <div className='h-fit w-fit border-2 border-rose-500 rounded-md overflow-hidden mr-[4rem]'>
                <img src={`https://image.tmdb.org/t/p/w${300}${objData.poster_path}`} alt="poster" />
              </div>
              <div className='w-[40rem] h-full leading-relaxed'>
                <h1 className='text-4xl font-medium'>{name}</h1>
                <h3 className='text-xl text-gray-400 mb-4'>{objData.original_title}</h3>
                {detailData.length > 0 ? 
                  <div className='h-full'>
                    <h3 className='text-xl border-b'>감독</h3>
                    <p className='h-[2rem] bg-black/50 flex items-center mb-2'>{detailData[0].directors[0].peopleNm}</p>
                    <h3 className='text-xl border-b'>개봉년도</h3>  
                    <p className='h-[2rem] bg-black/50 flex items-center mb-2'>{detailData[0].openDt}</p>
                    <h3 className='text-xl border-b'>상영시간</h3>
                    <p className='h-[2rem] bg-black/50 flex items-center mb-2'>{detailData[0].showTm}분</p>
                    <h3 className='text-xl border-b'>장르</h3>
                    <p className='h-[2rem] bg-black/50 flex items-center mb-2'>장르 : {
                        movieGenreList.map((gen, idx) => (
                          <span className='mr-1' key={idx}>{gen}{
                            idx !== movieGenreList.length - 1 ? ',' : ''
                          }</span>
                      ))
                    }</p>
                    <h3 className='text-xl border-b'>상영 타입</h3>
                      <div className='grid gap-3 overflow-scroll 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 place-items-center bg-black/50 h-[15rem] rounded-md mb-2'>
                      {
                        detailData[0].showTypes.map((type, idx) => (
                          <div className='w-[8rem] h-[6rem] bg-white/90 flex flex-col items-center justify-center rounded-lg text-black' key={idx}>
                            <img className='w-[4rem]' src={`http://localhost:3000/Info_Icons/${type.showTypeNm}.png`} alt="showTypes Icon" />
                            {type.showTypeNm}
                          </div>
                      ))}
                      </div>
                    <h3 className='text-xl border-b'>개요</h3>
                    <p className='h-[15rem] px-3 overflow-scroll bg-black/50 flex items-center mb-2'>{objData.overview}</p>
                    <h3 className='mb-1 text-xl border-b'>예고편</h3>
                    <div className='h-[25rem] mb-2'>
                      <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoKey}?autoplay=0`}></iframe>  
                    </div>
                    
                  </div>
                : <></>
                    }
                  </div>
            </div>
            <h3 className='mt-20 text-3xl border-b w-[63rem] text-center'>비슷한 영화</h3>
            <div className='w-[63rem] h-[30rem] bg-black/50 flex items-center rounded-md mb-10'>
              <div className='container relative '>
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel}>
                {similar && similar[0]?.map((movie, idx) => (
                  <MovieCard key={idx} itemId={movie.title} name={movie.title} pathList={movie} poster_path={movie.poster_path} openDt={movie.release_date} overview={movie.overview} />
                ))}
                </ScrollMenu>
              </div>
            </div>
        </div>
        </div>
        :
      <div></div>
      }
    </div>
  );
}

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    }
  }
}

