import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api/fetch";

import DetailsBanner from "../components/DetailsBanner";
import TopCasts from "../components/TopCasts";
import OfficalVideos from "../components/OfficalVideos";
import Similar from "../components/Similar";

const Details = () => {
  const { mediaType, id } = useParams();
  const [credits, setCredits] = useState({
    details: {
      crew: [],
      cast: [],
    },
    loading: true,
  });
  const [videos, setVideos] = useState({
    data: [],
    loading: true,
  });
  useEffect(() => {
    const getDetails = () => {
      setCredits({
        ...credits,
        loading: true,
      });
      fetchDataFromApi(`/${mediaType}/${id}/credits`)
        .then((res) => {
          setTimeout(() => {
            setCredits({
              details: res.data,
              loading: false,
            });
          });
        })
        .catch(() => {
          setCredits({
            details: { crew: [], cast: [] },
            loading: true,
          });
        });

      fetchDataFromApi(`/${mediaType}/${id}/videos`)
        .then((res) => {
          setVideos({
            data: res.data?.results,
            loading: false,
          });
        })
        .catch(() => {
          setVideos({
            data: [],
            loading: false,
          });
        });
    };

    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType, id]);

  return (
    <div className="details  pt-20 pb-6 px-4 text-secondary">
      <div className="container mx-auto">
        <DetailsBanner
          crewInfo={credits.details.crew}
          loading={credits.loading}
          videos={videos.data}
          mediaType={mediaType}
          id={id}
        />
        <TopCasts loading={credits.loading} casts={credits.details.cast} />
        <OfficalVideos loading={videos.loading} videos={videos.data} />
        <Similar mediaType={mediaType} id={id} />
      </div>
    </div>
  );
};

export default Details;
