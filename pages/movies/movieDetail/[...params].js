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
  const { data, movieNumber } = router.query;
  const objData = data && JSON.parse(data)
  const movieGerne = objData.length > 0 ? objData[0].genre_ids : [];

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
    genreCheck();
  }, [movieNumber])

  useEffect(() => {
    similarMovie(objData.id);
  }, [data])

  // 영화 예고편
  useEffect(() => {
    // 예고편이 없는 경우 대비해야 댐
    objData.length > 0 && fetch("http://localhost:3000/data/movie_video.json")
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
          w-full h-[200rem] pt-64 text-white
          before:content-[""] before:w-full before:h-[200rem] 
          before:bg-gradient-to-t before:from-[#0A1B2A] before:via-black/70  before:to-[#0A1B2A]
          before:top-0 before:left-0
          before:absolute
          `}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${objData[0].backdrop_path})`,
            backgroundSize: `cover`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
        <div className='relative h-full flex justify-center'>
          <div className='h-fit w-fit border-2 border-rose-500 rounded-md overflow-hidden mr-[4rem]'>
            <img src={`https://image.tmdb.org/t/p/w${300}${objData[0].poster_path}`} alt="poster" />
          </div>
          <div className='w-[40rem] h-full'>
            <h1 className='text-4xl font-medium'>{title}</h1>
            <h3 className='text-xl text-gray-400'>{objData[0].original_title}</h3>
            {detailData.length > 0 ? 
              <div className='h-full'>
                <p>감독 : {detailData[0].directors[0].peopleNm}</p>
                <p>개봉년도 : {detailData[0].openDt}</p>
                <p>상영시간 : {detailData[0].showTm}분</p>
                <p>장르 : {
                    movieGenreList.map((gen, idx) => (
                      <span key={idx}>{gen}</span>
                  ))
                }</p>
                {detailData[0].showTypes.map((type, idx) => (
                  <div key={idx}>{type.showTypeGroupNm} {type.showTypeNm}</div>
                ))}
                <p>개요 : {objData[0].overview}</p>
                <p>예고편</p>
                <iframe width="100%" height="10%" src={`https://www.youtube.com/embed/${videoKey}?autoplay=0`}></iframe>  
                    <div className='container'>
                      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel} Header={<div>HEADER</div>}
                        Footer={<div>FOOTER</div>}>
                      {similar && similar[0].map((movie, idx) => (
                        <MovieCard key={idx} itemId={movie.title} name={movie.title} pathList={movie} poster_path={movie.poster_path} openDt={movie.release_date} overview={movie.overview} />
                      ))}
                    </ScrollMenu>
                  </div>
                </div>
            : <></>
            }
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

