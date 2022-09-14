const API_KEY = process.env.API_KEY;

module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/form",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [{
      source: "/api/movies",
      destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    },
  {
    source: "/api/movies/:id",
    destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`
  }];
  },
};

// redirects : source는 원래 URL, destination 엔 새로운 URL 입력 (ex: 오래된 블로그 주소를 새로 업데이트 하는 경우)
// source 의 "/contact" 라는 경로를 입력하면 "/form" 이라는 새로운 경로로 redirect 된다.

// API KEY 숨기기 : API KEY는 본인의 고유한 것이기 때문에 인터넷에 노출시키면 안된다. 
// 그렇기 때문에 env 파일 안에 넣어서 작업한 후 깃에도 올라가지 않도록 항상 조심하는 것이 좋다!

// rewrite : rewrite 는 redirect 처럼 비슷한 기능을 가지지만 한가지 다른점은 URL이 바뀌지 않은 상태로 이동한다는 점이다.
// 그렇기 때문에 API 키나 특정한 경로를 감추고 싶을 때 사용할 수 있다. 

// git에 푸쉬 안되게 하기 : .env 파일을 .gitignore에 추가하기