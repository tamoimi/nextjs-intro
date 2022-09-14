import { useRouter } from "next/router";
import Seo from "../../components/Seo";

export default function Detail({ params }) {
  const router = useRouter();
  const [title, id] = params || [];
  return (
    <div>
      <Seo title={title}/>
      <h4>{title}</h4>
      <img src={`https://image.tmdb.org/t/p/w500$/{movie.poster_path}`} />
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}

// pages 하위에 파일명을 [...이름].js 와 같이 설정하면 어떤 URL이라도 잡을 수 있다
// 이를 이용해 영화 제목을 URL에 넣고, URL에서 정보를 받아 About 페이지에 뿌려줄 수 있음
