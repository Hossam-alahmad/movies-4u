import { Link } from "react-router-dom";
import Image from "./LazyLoadImage/Image";
import dayjs from "dayjs";
import { buttonVariant } from "./Button";
import { twMerge } from "tailwind-merge";

type MovieCardProps = {
  id: number;
  endpoint: string;
  title: string;
  release_date: string;
  name: string;
  first_air_date: string;
  posterPath: string;
  genres: [{ id: number; name: string }];
  genre_ids: number[];
  media_type: string;
  className?: string;
};

const MovieCard = ({
  id,
  title,
  release_date,
  name,
  first_air_date,
  posterPath,
  genres,
  genre_ids,
  endpoint,
  media_type,
  className,
}: MovieCardProps) => {
  return (
    <div
      className={`movie-card relative cursor-pointer text-secondary ${twMerge(
        " w-[120px] md:w-[calc(25%_-_10px)] shrink-0",
        className
      )}`}
    >
      <Link to={`/${media_type || endpoint}/${id}`}>
        <div className="relative  w-full aspect-[1_/_1.5] bg-cover bg-center mb-5 overflow-hidden rounded-md">
          <Image
            src={posterPath}
            alt={posterPath}
            className="rounded-md shadow-md hover:scale-105"
          />
          <div className="tags  absolute -left-2 bottom-0 p-4 hidden lg:flex flex-wrap-reverse gap-4">
            {genres &&
              genre_ids
                ?.map((id: number) => {
                  return (
                    <div
                      key={id}
                      className={twMerge(
                        buttonVariant({
                          bgColor: "primary",
                          size: "sm",
                          className: "text-xs p-2",
                        })
                      )}
                    >
                      {genres[id]?.name}
                    </div>
                  );
                })
                .slice(0, 3)}
          </div>
        </div>
        <div className="info flex flex-col">
          <span className="text-sm md:text-lg mb-1 overflow-hidden truncate">
            {title || name}
          </span>
          <span className="text-xs md:text-sm  text-zinc-400">
            {dayjs(release_date || first_air_date).format("MMM D, YYYY")}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
