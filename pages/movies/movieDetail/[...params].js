import { useRouter } from 'next/router';
import Seo from '../../../components/all/Seo.js';
import { useEffect, useState } from 'react';

export default function Detail({params}) {
  const router = useRouter();
  const [title] = params || [];
  const { data, movieNumber } = router.query;
  const objData = data && JSON.parse(data)

  const [detailData, setDetailData] = useState([])

  useEffect(() => {
    movieNumber && fetch("http://localhost:3000/data/kobic_detailMovie.json")
    .then((result) => result.json())
      .then((res) => {
        const { movieInfoResult } = res; 
      setDetailData((prev) => [...prev, movieInfoResult.movieInfo])
    })
      .catch((error) => console.log("error", error));
  }, [movieNumber])

  console.log(detailData);
  
  return (
    <div>
      <Seo title={title} />
      {objData ? 
        <div className={`w-full h-screen mt-64 flex justify-center text-white`}>
        <div className='h-fit w-fit border-2 border-rose-500 rounded-md overflow-hidden mr-[4rem]'>
          <img src={`https://image.tmdb.org/t/p/w${300}${objData[0].poster_path}`} alt="poster" />
        </div>
        <div className=''>
          <h1 className='text-4xl font-medium'>{title}</h1>
          <h3 className='text-xl text-gray-400'>{objData[0].original_title}</h3>
          {detailData.length > 0 ? 
            <div>
              <p>감독 : {detailData[0].directors[0].peopleNm}</p>
              <p>개봉년도 : {detailData[0].openDt}</p>
              <p>상영시간 : {detailData[0].showTm}분</p>
              <p>장르 : {detailData[0].genres[0].genreNm}</p>
              {detailData[0].showTypes.map((type, idx) => (
                <div key={idx}>{type.showTypeGroupNm} {type.showTypeNm}</div>
              ))}
                <p>개요 : {objData[0].overview }</p>
            </div>
            : <></>
          }
        </div>
      </div>
        :
      <div></div>
      }
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    }
  }
}