import { twMerge } from "tailwind-merge";
import Skeleton from "./Skeleton";

type MovieCardSkeletonProps = {
  className?: string;
};
const MovieCardSkeleton = ({ className }: MovieCardSkeletonProps) => {
  return (
    <div
      className={`${twMerge(
        "h-[250px] w-[120px] md:w-1/4 md:h-[350px] lg:w-1/5 lg:h-[450px] shrink-0",
        className
      )} movie-card cursor-pointer  text-secondary `}
    >
      <Skeleton className="w-full h-3/4 mb-2" />
      <div className="h-full flex flex-col gap-4">
        <Skeleton className="w-full h-[15px]" />
        <Skeleton className="w-full h-[15px] " />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
