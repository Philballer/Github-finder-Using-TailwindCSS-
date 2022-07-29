function Home() {
  return (
    <div>
      <h1>Home here</h1>
      {process.env.REACT_APP_GITHUB_TOKEN}
    </div>
  );
}

export default Home;
