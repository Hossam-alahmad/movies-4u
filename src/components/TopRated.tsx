import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
import { fetchDataFromApi } from "../utils/api/fetch";
import Carousel from "./Carousel";
import MovieCard from "./MovieCard";
import { useAppSelector } from "../hooks/reduxHook";
import MovieCardSkeleton from "./Skeletons/MovieCardSkeleton";

const TopRated = () => {
  const { url, genres } = useAppSelector((state) => state.home);
  const [endpoint, setEndpoint] = useState<string>("movie");
  const [apiResult, setApiResult] = useState({
    loading: true,
    data: [],
  });

  const changeTabHandler = (tab: string) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
  useEffect(() => {
    const fetchTrendingMovies = () => {
      setApiResult({ ...apiResult, loading: true });
      fetchDataFromApi(`/${endpoint}/top_rated`)
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
    <div className="top-rated mb-4">
      <MoviesList
        changeTabHandler={changeTabHandler}
        title="Top Rated"
        tabData={["Movies", "TV"]}
      />
      {/*
      
      {!loading
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.map((item: any) => {
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
              .map((item, index) => <MovieCardSkeleton key={index} />)}
      */}
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

export default TopRated;
