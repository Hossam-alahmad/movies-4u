import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api/fetch";
import MovieCard from "../components/MovieCard";
import { useAppSelector } from "../hooks/reduxHook";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCardSkeleton from "../components/Skeletons/MovieCardSkeleton";

type DetailsStateProps = {
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: any[];
    total_pages: number;
  };
  loading: boolean;
};

const SearchResult = () => {
  const { query } = useParams();
  const { url } = useAppSelector((state) => state.home);
  const [pageNum, setPageNum] = useState(1);
  const [details, setDetails] = useState<DetailsStateProps>(
    {} as DetailsStateProps
  );

  useEffect(() => {
    const getFirstQueryResults = () => {
      setDetails({
        ...details,
        loading: true,
      });
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
        .then((res) => {
          setDetails({
            data: res.data,
            loading: false,
          });
          setPageNum((prev) => prev + 1);
        })
        .catch(() => {
          setDetails({
            data: {
              results: [],
              total_pages: 1,
            },
            loading: false,
          });
        });
    };
    getFirstQueryResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getNextQueryResults = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if (details.data) {
          setDetails({
            data: {
              ...details.data,
              results: [...details.data.results, ...res.data.results],
            },
            loading: false,
          });
        } else {
          setDetails({
            data: res.data,
            loading: false,
          });
        }
        setPageNum((prev) => prev + 1);
      })
      .catch(() => {
        setDetails({
          data: {
            results: [],
            total_pages: 1,
          },
          loading: false,
        });
      });
  };
  return (
    <div className="results pt-20 pb-6 px-4 text-secondary">
      <div className="container mx-auto">
        <h4 className="mb-4">Results of '{query}'</h4>
        {!details.loading ? (
          details.data.results.length > 0 ? (
            <InfiniteScroll
              loader={null}
              next={getNextQueryResults}
              hasMore={details.data?.total_pages > pageNum}
              dataLength={details.data?.results?.length || 0}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  details.data?.results?.map((item: any) => {
                    const poster = url.poster + item.poster_path;
                    return (
                      <MovieCard
                        className="w-[100%_!important]"
                        key={item.id}
                        posterPath={poster}
                        {...item}
                      />
                    );
                  })
                }
              </div>
            </InfiniteScroll>
          ) : (
            <h4 className="text-center my-28 md:my-[200px]">
              Sorry No Results found
            </h4>
          )
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Array(15)
              .fill(0)
              .map((_item, index) => (
                <MovieCardSkeleton
                  className="w-[100%_!important]"
                  key={index}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
