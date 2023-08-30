import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api/fetch";
import Carousel from "./Carousel";
import MovieCard from "./MovieCard";
import { useAppSelector } from "../hooks/reduxHook";

type SimilarProps = {
  mediaType?: string;
  id?: string;
};

const Similar = ({ id, mediaType }: SimilarProps) => {
  const { url } = useAppSelector((state) => state.home);
  const [details, setDetails] = useState({
    data: [],
    loading: true,
  });
  useEffect(() => {
    const getSimilarShow = () => {
      setDetails({
        ...details,
        loading: true,
      });
      fetchDataFromApi(`/${mediaType}/${id}/similar`)
        .then((res) => {
          setDetails({
            data: res.data?.results,
            loading: false,
          });
        })
        .catch(() => {
          setDetails({
            data: [],
            loading: false,
          });
        });
    };
    getSimilarShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mediaType]);
  return (
    !details.loading && (
      <div className="similar mb-10">
        <h3 className="mb-4">
          Similar {mediaType === "tv" ? "Tv Show" : "Movies"}
        </h3>
        <Carousel>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            details.data.map((item: any) => {
              const poster = url.poster + item.poster_path;
              return (
                <MovieCard
                  endpoint={mediaType}
                  key={item.id}
                  {...item}
                  posterPath={poster}
                />
              );
            })
          }
        </Carousel>
      </div>
    )
  );
};

export default Similar;
