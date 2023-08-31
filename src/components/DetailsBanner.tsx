import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api/fetch";
import DetailsSkeleton from "../components/Skeletons/DetailsSkeleton";
import Image from "../components/LazyLoadImage/Image";
import { useAppSelector } from "../hooks/reduxHook";
import dayjs from "dayjs";
import Button, { buttonVariant } from "../components/Button";
import CircleProgress from "../components/CircleProgress";
import { icons } from "../utils/icons";
import VideoPopup from "./VideoPopup";

type DetailsStateProps = {
  loading: boolean;
  details: {
    original_title: string;
    release_date: string;
    original_name: string;
    tagline: string;
    title: string;
    poster_path: string;
    vote_average: number;
    overview: string;
    status: string;
    runtime: number;
    genres: {
      id: number;
      name: string;
    }[];
  } | null;
};

type DetailsBannerProps = {
  crewInfo?: {
    name: string;
    department: string;
  }[];
  videos: {
    key: string;
    type: string;
  }[];
  loading: boolean;
  mediaType?: string;
  id?: string;
};
const DetailsBanner = ({
  mediaType,
  id,
  videos,
  crewInfo,
  loading,
}: DetailsBannerProps) => {
  const { url } = useAppSelector((state) => state.home);

  const [showTrailer, setShowTrailer] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [data, setData] = useState<DetailsStateProps>({
    details: null,
    loading: true,
  });
  const writers =
    crewInfo && !loading
      ? crewInfo
          .filter((c) => c.department === "Writing")
          .map((c) => c.name)
          .join(", ")
      : [];
  const directors =
    crewInfo && !loading
      ? crewInfo
          .filter((c) => c.department === "Directing")
          .map((c) => c.name)
          .join(", ")
      : [];
  const trailerVideoId =
    videos?.find((video) => video.type === "Trailer")?.key || "";
  useEffect(() => {
    const getDetails = () => {
      setData({
        ...data,
        loading: true,
      });
      fetchDataFromApi(`/${mediaType}/${id}`)
        .then((res) => {
          setTimeout(() => {
            setData({
              details: res.data,
              loading: false,
            });
          }, 300);
        })
        .catch(() => {
          setData({
            details: null,
            loading: true,
          });
        });
    };
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType, id]);

  const calcRuntime = (runtime: number = 0) => {
    if (!runtime || runtime === 0) return "NaN";
    const time = (runtime / 60).toString().split(".");
    const hours = time[0];
    const minute = +(+("0." + time[1]) * 60).toFixed(2);
    return `${hours}h ${minute}m`;
  };
  return !data.loading ? (
    <>
      <div className="details-banner lg:grid lg:grid-cols-3 gap-4">
        <div className="img h-[400px] lg:h-auto  rounded-md mb-4  lg:mb-0">
          <Image
            className="rounded-md h-full aspect-[1_/_1.5]"
            src={url.backdrop + data.details?.poster_path}
            alt={data.details?.title || data.details?.original_title}
          />
        </div>
        <div className="info col-span-2">
          <div className="header mb-5">
            <h3 className="title text-[1.4rem] sm:text-3xl">
              {`${
                data.details?.title ||
                data.details?.original_title ||
                data.details?.original_name
              } (${dayjs(data.details?.release_date).format("YYYY")})`}
            </h3>
            <span className="subtitle text-slate-500">
              {data.details?.tagline}
            </span>
          </div>
          <div className="tags flex gap-2 flex-wrap mb-10">
            {data.details?.genres.map((genre) => {
              return (
                <span
                  key={genre.id}
                  className={`text-sm ${buttonVariant({
                    bgColor: "primary",
                    size: "sm",
                  })}`}
                >
                  {genre.name}
                </span>
              );
            })}
          </div>
          <div className="play-and-rating flex gap-4 mb-10">
            <div className="w-[60px] sm:w-[75px]">
              <CircleProgress value={data.details?.vote_average || 0} />
            </div>
            <Button
              onClick={() => {
                setShowTrailer(true);
                setVideoId(trailerVideoId);
              }}
              className="flex group items-center gap-2 p-0 text-lg self-center"
            >
              <span className="text-[65px] sm:text-[80px] group-hover:text-primary transition-all">
                {icons.play}
              </span>{" "}
              Watch Trailer
            </Button>
          </div>
          <div className="overview">
            <h3 className="mb-4  text-[1.4rem] sm:text-3xl">Overview</h3>
            <p>{data.details?.overview}</p>
          </div>
          <hr className="my-5 border-third-light/20" />
          <div className="status">
            <ul className="flex  justify-between lg:justify-start lg:gap-10 ">
              <li>
                <h6>Status</h6>
                <span className="text-zinc-500">{data.details?.status}</span>
              </li>
              <li>
                {" "}
                <h6>Release Date</h6>
                <span className="text-zinc-500">
                  {data.details?.release_date || "Coming soon"}
                </span>
              </li>
              <li>
                <h6>Runtime</h6>
                <span className="text-zinc-500">
                  {calcRuntime(data.details?.runtime)}
                </span>
              </li>
            </ul>
          </div>

          {directors.length > 0 && (
            <>
              <hr className="my-5 border-third-light/20" />
              <div className="director flex gap-2">
                <span>Director:</span>
                <p className="text-zinc-500">{directors}</p>
              </div>
            </>
          )}

          {writers.length > 0 && (
            <>
              <hr className="my-5 border-third-light/20" />
              <div className="writing flex gap-2">
                <span>Writers:</span>
                <p className="text-zinc-500">{writers}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <VideoPopup
        videoId={videoId}
        setVideoId={setVideoId}
        show={showTrailer}
        setShow={setShowTrailer}
      />
    </>
  ) : (
    <DetailsSkeleton />
  );
};

export default DetailsBanner;
