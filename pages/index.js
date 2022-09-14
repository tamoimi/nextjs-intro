import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

export default function Home({ results }) {
  // const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     const { results } = await (await fetch(`/api/movies`)).json();
  //     setMovies(results);
  //   })();
  // }, []);

  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}}`);
      // {
      //   pathname: `/movies/${id}`,
      //   query: {
      //     title
      //   },
      // },
      // `/movies/${id}`
    ; //mask 기능으로 보여주고 싶은 url 만 설정함
  };

  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div onClick={() => onClick(movie.id, movie.original_title)} className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000//api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}

// CSR
// 첫 렌더시 페이지만 로드, 다시 렌더하면서 데이터를 불러옴 (그래서 데이터가 검색엔진에 안걸림)
// 그러나 한번에 데이터를 불러오기 때문에 페이지 이동시 빠름

// SSR
// 첫 렌더시 데이터도 서버측에서 같이 로드, 렌더 한번이라 초기 로딩속도 빠름 (검색엔진에 걸림)
// 그러나 페이지를 불러올 때마다 중복 데이터를 불러와야 해서 페이지 이동시 느림

// getServerSideProps 이 이름은 절대 바뀔수 없다. -> server에서만(백엔드에서만) 작동하게 되고 절대로 client 에게 보여지지 않을것이다.

// client side redering / server side only redering
// 유저가 로딩 화면을 보게 하고 싶지 않다면 -> getServerSideProps를 사용한다.
