module.exports = {
  reactStrictMode: true,
  async redirects(){
    return[
      {
        source:"/contact",
        destination:"/form",
        permanent: false,
      }
    ]
  }
};