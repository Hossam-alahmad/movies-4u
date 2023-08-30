import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
import { fetchDataFromApi } from "../utils/api/fetch";
import Carousel from "./Carousel";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./Skeletons/MovieCardSkeleton";
import { useAppSelector } from "../hooks/reduxHook";

const Trending = () => {
  const { url, genres } = useAppSelector((state) => state.home);

  const [endpoint, setEndpoint] = useState<string>("day");
  const [apiResult, setApiResult] = useState({
    loading: true,
    data: [],
  });

  const changeTabHandler = (tab: string) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };
  useEffect(() => {
    const fetchTrendingMovies = () => {
      setApiResult({ ...apiResult, loading: true });
      fetchDataFromApi(`/trending/all/${endpoint}`)
        .then((res) => {
          setApiResult({ loading: false, data: res.data.results });
        })
        .catch((err) => {
          setApiResult({ loading: true, data: [] });
          console.log(err);
        });
    };
    fetchTrendingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);
  return (
    <div className="trending mb-4">
      <MoviesList
        changeTabHandler={changeTabHandler}
        title="Trending"
        tabData={["Day", "Week"]}
      />
      <Carousel>
        {!apiResult.loading
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            apiResult.data.map((item: any) => {
              const poster = url.poster + item.poster_path;
              return (
                <MovieCard
                  key={item.id}
                  {...item}
                  posterPath={poster}
                  genres={genres}
                  endpoint={endpoint}
                />
              );
            })
          : Array(5)
              .fill(1)
              .map((_item, index) => <MovieCardSkeleton key={index} />)}
      </Carousel>
    </div>
  );
};

export default Trending;
